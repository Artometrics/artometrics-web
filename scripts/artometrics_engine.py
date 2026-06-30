#!/usr/bin/env python3
"""Artometrics article engine v2 — smarter metrics, merges, charts, and prose."""

from __future__ import annotations

import json
import re
import textwrap
import gc
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio
import requests

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src/content/blog"
PUBLIC = ROOT / "public"
TT_BASE = "https://raw.githubusercontent.com/rfordatascience/tidytuesday/main"

ART_HIGHLIGHT = "#C0392B"
ART_SECONDARY = "#2C3E6B"
ART_MID = "#6B6B6B"
ART_CREAM = "#F2F0EB"
ART_DARK = "#1C1C1E"

PREMIUM_SLUGS = {
    "pokemon",
    "anime",
    "franchise",
    "coffee-the-artometrics-of-java",
    "caesar-the-psychonomics-of-emperor-julius",
    "imperial",
    "readmitted",
    "giant-the-artometrics-of-a-san-francisco-dynasty",
    "warrior-the-artometrics-of-a-golden-state-dynasty",
    "h3-the-artometrics-of-a-youtube-dynasty",
    "pixar-films",
}

METRIC_WORDS = (
    "score",
    "rating",
    "rank",
    "revenue",
    "votes",
    "vote",
    "price",
    "calories",
    "points",
    "gross",
    "budget",
    "runtime",
    "run_time",
    "minutes",
    "percent",
    "rate",
    "income",
    "wage",
    "salary",
    "population",
    "attendance",
    "visits",
    "duration",
    "stars",
    "abv",
    "ibu",
    "plays",
    "listeners",
    "streams",
    "metacritic",
    "tomatoes",
    "expectancy",
    "waste",
    "tonnes",
    "tons",
    "gdp",
    "turnout",
    "enrollment",
    "tuition",
    "deaths",
    "injuries",
    "fatal",
    "magnitude",
    "depth",
    "length",
    "width",
    "height",
    "weight",
    "age",
    "year_built",
)

LABEL_WORDS = (
    "name",
    "title",
    "film",
    "movie",
    "show",
    "artist",
    "song",
    "album",
    "country",
    "state",
    "city",
    "park",
    "restaurant",
    "game",
    "brand",
    "company",
    "franchise",
    "character",
    "emperor",
    "guest",
    "guest_star",
    "museum",
    "station",
    "pizza",
    "beer",
    "wine",
    "ramen",
    "airline",
    "university",
    "major",
    "language",
    "family",
    "site",
    "heritage",
)

BANNED_METRIC_NAMES = {
    "number",
    "id",
    "index",
    "row",
    "unnamed",
    "gnis_id",
    "production_code",
    "episode_number",
    "page",
    "image",
    "gvkey",
    "line_num",
    "song_line",
    "gutenberg_id",
    "release_year",
    "year",
    "week",
    "episode",
}

CHART_W = 960
CHART_H = 540
PALETTE = [ART_HIGHLIGHT, ART_SECONDARY, "#457B9D", "#6A4C93", "#2E7D32", "#AD1457", ART_MID, "#8D6E63"]


@dataclass
class DatasetSpec:
    slug: str
    title: str
    tt_date: str
    csv_name: str | None = None
    tags: list[str] = None
    csv_sep: str | None = None
    extra_csv: list[str] | None = None
    merge_on: str | None = None

    def __post_init__(self) -> None:
        if self.tags is None:
            self.tags = ["culture"]


def human_label(col: str) -> str:
    c = re.sub(r"_+", " ", str(col)).strip()
    c = re.sub(r"\s+", " ", c)
    return c[:1].upper() + c[1:]


def fmt_num(value: Any) -> str:
    if isinstance(value, (int, float, np.floating, np.integer)) and not pd.isna(value):
        v = float(value)
        if abs(v) >= 1000:
            return f"{v:,.0f}"
        if abs(v) >= 100:
            return f"{v:.0f}"
        if abs(v) >= 10:
            return f"{v:.1f}"
        return f"{v:.2f}"
    return str(value)


def is_stringish(series: pd.Series) -> bool:
    return not pd.api.types.is_numeric_dtype(series) and not pd.api.types.is_datetime64_any_dtype(series)


def clean_df(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df = df.loc[:, [c for c in df.columns if not str(c).lower().startswith("unnamed")]]
    df = df.loc[:, ~df.columns.duplicated()]
    return df.dropna(how="all")


def load_table(url: str, csv_sep: str | None = None) -> pd.DataFrame:
    read_kwargs: dict[str, Any] = {"on_bad_lines": "skip", "engine": "python", "encoding": "utf-8"}
    if csv_sep:
        read_kwargs["sep"] = csv_sep

    def _read() -> pd.DataFrame:
        if url.endswith(".xlsx"):
            return pd.read_excel(url)
        if url.endswith(".gz"):
            return pd.read_csv(url, compression="gzip", **read_kwargs)
        return pd.read_csv(url, **read_kwargs)

    try:
        return _read()
    except UnicodeDecodeError:
        read_kwargs["encoding"] = "latin-1"
        return _read()


def list_folder_files(tt_date: str) -> list[str]:
    year = tt_date[:4]
    api = f"https://api.github.com/repos/rfordatascience/tidytuesday/contents/data/{year}/{tt_date}?ref=main"
    resp = requests.get(api, timeout=30, headers={"User-Agent": "artometrics-v2"})
    resp.raise_for_status()
    return [
        x["name"]
        for x in resp.json()
        if x["type"] == "file"
        and (x["name"].endswith(".csv") or x["name"].endswith(".csv.gz") or x["name"].endswith(".xlsx"))
    ]


def is_sequential_index(series: pd.Series) -> bool:
    if not pd.api.types.is_numeric_dtype(series):
        return False
    vals = series.dropna().astype(float)
    if len(vals) < 5:
        return False
    uniq = np.sort(vals.unique())
    if len(uniq) != len(vals):
        return False
    return bool(np.allclose(uniq, np.arange(1, len(uniq) + 1)) or np.allclose(uniq, np.arange(0, len(uniq))))


def is_bad_metric(col: str, series: pd.Series) -> bool:
    low = str(col).lower()
    if low in BANNED_METRIC_NAMES:
        return True
    if re.match(r"^\d{4}(-\d{2})?$", low):
        return True
    if low.endswith("_id") or low == "id":
        return True
    if is_sequential_index(series):
        return True
    if pd.api.types.is_numeric_dtype(series) and series.nunique(dropna=True) <= 1:
        return True
    return False


def pick_columns(df: pd.DataFrame) -> dict[str, Any]:
    cols = list(df.columns)
    lower = {c: str(c).lower() for c in cols}

    numeric = [
        c
        for c in cols
        if pd.api.types.is_numeric_dtype(df[c])
        and df[c].notna().sum() >= 5
        and not is_bad_metric(c, df[c])
        and not str(c).startswith("_art_")
    ]

    def metric_score(c: str) -> int:
        l = lower[c]
        score = 0
        for i, w in enumerate(METRIC_WORDS):
            if w in l:
                score += 100 - i
        if "count" in l or l.endswith("_n"):
            score += 10
        if "year" in l and df[c].between(1800, 2100).mean() > 0.8:
            score -= 50
        return score

    numeric = sorted(numeric, key=metric_score, reverse=True)
    metric = numeric[0] if numeric else None
    metric2 = numeric[1] if len(numeric) > 1 else None

    priority_labels = ("guest_star", "guest", "name", "artist", "song", "film", "title", "character", "emperor")
    label = next((c for c in cols if lower[c] in priority_labels), None)
    if not label:
        label = next((c for c in cols if any(w in lower[c] for w in LABEL_WORDS)), None)
    if not label:
        label = next(
            (c for c in cols if is_stringish(df[c]) and 2 < df[c].nunique() <= max(30, len(df) // 3)),
            None,
        )

    date_col = next((c for c in cols if any(w in lower[c] for w in ("date", "released", "aired", "published"))), None)
    year_col = next((c for c in cols if lower[c] in ("year", "release_year", "pub_year") or lower[c].endswith("_year")), None)
    if not year_col and "season" in lower.values():
        season_col = next(c for c in cols if lower[c] == "season")
        coerced = pd.to_numeric(df[season_col], errors="coerce")
        if coerced.notna().sum() >= len(df) * 0.4 and coerced.nunique(dropna=True) <= 50:
            df = df.copy()
            df["_art_season"] = coerced
            year_col = "_art_season"
        elif df[season_col].nunique(dropna=True) <= 50:
            df = df.copy()
            df["_art_season"] = df[season_col].astype(str)
            year_col = "_art_season"

    if date_col:
        parsed = pd.to_datetime(df[date_col], errors="coerce")
        if parsed.notna().sum() > len(df) * 0.4:
            df = df.copy()
            df["_art_year"] = parsed.dt.year
            year_col = "_art_year"
    elif year_col:
        if year_col.startswith("_art_"):
            pass
        elif pd.api.types.is_numeric_dtype(df[year_col]):
            df = df.copy()
            df["_art_year"] = pd.to_numeric(df[year_col], errors="coerce")
            year_col = "_art_year"
        else:
            coerced = pd.to_numeric(df[year_col], errors="coerce")
            if coerced.notna().sum() >= len(df) * 0.4:
                df = df.copy()
                df["_art_year"] = coerced
                year_col = "_art_year"

    category = next(
        (
            c
            for c in cols
            if is_stringish(df[c]) and 1 < df[c].nunique(dropna=True) <= 20 and c != label
        ),
        None,
    )
    category2 = next(
        (
            c
            for c in cols
            if is_stringish(df[c]) and 1 < df[c].nunique(dropna=True) <= 12 and c not in {label, category}
        ),
        None,
    )

    if year_col and year_col in numeric:
        numeric = [c for c in numeric if c != year_col]
        numeric = sorted(numeric, key=metric_score, reverse=True)
        metric = numeric[0] if numeric else None
        metric2 = numeric[1] if len(numeric) > 1 else None

    return {
        "df": df,
        "metric": metric,
        "metric2": metric2,
        "label": label,
        "year": year_col,
        "category": category,
        "category2": category2,
    }


def art_title(html: str) -> dict:
    return dict(
        text=f"<b>{html}</b>",
        font=dict(family="DM Sans, Helvetica, sans-serif", size=15, color=ART_DARK),
        x=0.5,
        xanchor="center",
        automargin=True,
    )


def base_layout(title_html: str, height: int = CHART_H) -> dict:
    return dict(
        title=art_title(title_html),
        paper_bgcolor=ART_CREAM,
        plot_bgcolor=ART_CREAM,
        font=dict(family="DM Sans, Helvetica, sans-serif", color=ART_DARK, size=12),
        margin=dict(l=72, r=32, t=88, b=60),
        height=height,
        hovermode="closest",
    )


def chart_title(main: str, accent: str = "") -> str:
    if accent:
        return f"{main}<br><span style='color:#C0392B'>{accent}</span>"
    return main


def palette(n: int) -> list[str]:
    return [PALETTE[i % len(PALETTE)] for i in range(max(n, 1))]


def bar_gradient(n: int) -> list[str]:
    if n <= 1:
        return [ART_HIGHLIGHT]
    return [ART_SECONDARY if i < n - 1 else ART_HIGHLIGHT for i in range(n)]


def axis_style(title: str = "", grid: bool = True) -> dict[str, Any]:
    return dict(
        title=title,
        showgrid=grid,
        gridcolor="#E0DDD6",
        linecolor=ART_MID,
        tickfont=dict(color=ART_MID, size=11),
        zeroline=False,
    )


def finalize(fig: go.Figure, title_html: str, *, x_title: str = "", y_title: str = "", legend: bool = False) -> go.Figure:
    layout = base_layout(title_html)
    layout["showlegend"] = legend
    layout["xaxis"] = axis_style(x_title, grid=True)
    layout["yaxis"] = axis_style(y_title, grid=True)
    if legend:
        layout["legend"] = dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            x=0.5,
            xanchor="center",
            font=dict(size=10, color=ART_DARK),
        )
    fig.update_layout(**layout)
    return fig


def save_chart(fig: go.Figure, json_path: Path, png_path: Path) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    json_path.write_text(pio.to_json(fig), encoding="utf-8")
    fig.write_image(str(png_path), width=CHART_W, height=CHART_H, scale=2)


def download_dataset(spec: DatasetSpec) -> tuple[pd.DataFrame, str]:
    year = spec.tt_date[:4]
    folder = f"{TT_BASE}/data/{year}/{spec.tt_date}"
    files = list_folder_files(spec.tt_date)
    if not files:
        raise FileNotFoundError(spec.tt_date)

    load_order = []
    if spec.csv_name and spec.csv_name in files:
        load_order.append(spec.csv_name)
    for f in sorted(files, key=lambda x: (0 if x.endswith(".csv") and not x.endswith(".gz") else 1, -len(x))):
        if f not in load_order:
            load_order.append(f)

    tables: list[tuple[str, pd.DataFrame]] = []
    primary_url = ""
    for fname in load_order:
        url = f"{folder}/{fname}"
        try:
            tables.append((fname, clean_df(load_table(url, spec.csv_sep if fname == spec.csv_name else None))))
            if not primary_url:
                primary_url = url
        except Exception:
            continue

    if not tables:
        raise FileNotFoundError(spec.tt_date)

    tables.sort(key=lambda t: len(t[1]), reverse=True)
    df = tables[0][1]
    for fname, other in tables[1:]:
        shared = [c for c in df.columns if c in other.columns and c.lower() not in BANNED_METRIC_NAMES]
        if not shared:
            continue
        key = spec.merge_on if spec.merge_on in shared else max(shared, key=lambda c: other[c].isin(df[c]).sum())
        try:
            left = df.drop_duplicates(subset=[key], keep="first")
            right = other.drop_duplicates(subset=[key], keep="first")
            df = left.merge(right, on=key, how="left", suffixes=("", f"_{fname.split('.')[0]}"))
        except Exception:
            pass

    if len(df) > 100_000:
        df = df.sample(100_000, random_state=7).reset_index(drop=True)

    return df, primary_url or f"{folder}/"


def build_count_charts(df: pd.DataFrame, spec: DatasetSpec, meta: dict[str, Any]) -> list[dict[str, Any]]:
    """Fallback charts when no numeric metric exists — use record counts."""
    label = meta["label"]
    year = meta["year"]
    category = meta["category"]
    charts: list[dict[str, Any]] = []

    if year and df[year].notna().sum() >= 3:
        yearly = df.groupby(year).size().reset_index(name="count").sort_values(year)
        fig = go.Figure(go.Bar(x=yearly[year].astype(str), y=yearly["count"], marker_color=ART_SECONDARY))
        layout = base_layout(f"RECORDS BY {human_label(year).upper()}")
        layout["xaxis"] = dict(title=human_label(year))
        layout["yaxis"] = dict(title="Count", gridcolor="#E0DDD6")
        fig.update_layout(**layout)
        charts.append(chart_entry("chart1_volume", "chart-1-volume", "CHART 1 — VOLUME", "Records By Period", fig, [
            f"Activity peaks in **{yearly.loc[yearly['count'].idxmax(), year]}** with **{int(yearly['count'].max()):,}** records.",
            "Period-level counts reveal when the dataset's subject matter intensified.",
        ]))

    if label:
        counts = df[label].astype(str).value_counts().head(12)
        fig = go.Figure(go.Bar(x=counts.values[::-1], y=counts.index.astype(str)[::-1], orientation="h", marker_color=ART_HIGHLIGHT))
        layout = base_layout(f"MOST FREQUENT {human_label(label).upper()}")
        layout["xaxis"] = dict(title="Appearances", gridcolor="#E0DDD6")
        fig.update_layout(**layout)
        charts.append(chart_entry("chart2_leaders", "chart-2-leaders", "CHART 2 — LEADERS", f"Top {human_label(label)}", fig, [
            f"**{counts.index[0]}** appears **{int(counts.iloc[0]):,}** times — the most recurring name in the file.",
            f"The top dozen account for a visible share of all **{len(df):,}** rows.",
        ]))

    if category and category != label:
        cat_counts = df[category].astype(str).value_counts().head(10)
        fig = go.Figure(go.Bar(x=cat_counts.index, y=cat_counts.values, marker_color=ART_SECONDARY))
        layout = base_layout(f"DISTRIBUTION BY {human_label(category).upper()}")
        layout["xaxis"] = dict(title=human_label(category))
        layout["yaxis"] = dict(title="Count", gridcolor="#E0DDD6")
        fig.update_layout(**layout)
        charts.append(chart_entry("chart3_category", "chart-3-category", "CHART 3 — CATEGORY", human_label(category), fig, [
            f"**{cat_counts.index[0]}** is the largest bucket with **{int(cat_counts.iloc[0]):,}** records.",
            "Category concentration shows where editorial attention should focus first.",
        ]))

    if label and year:
        cross = df.groupby([year, label], observed=True).size().reset_index(name="count")
        top_labels = df[label].astype(str).value_counts().head(5).index
        cross = cross[cross[label].astype(str).isin(top_labels)]
        if len(cross) >= 4:
            fig = go.Figure()
            for i, name in enumerate(top_labels):
                sub = cross[cross[label].astype(str) == name].sort_values(year)
                fig.add_trace(go.Scatter(x=sub[year], y=sub["count"], mode="lines+markers", name=str(name)[:20],
                                         line=dict(color=[ART_HIGHLIGHT, ART_SECONDARY, ART_MID][i % 3])))
            layout = base_layout(f"TOP {human_label(label).upper()} OVER TIME")
            layout["xaxis"] = dict(title=human_label(year))
            layout["yaxis"] = dict(title="Count", gridcolor="#E0DDD6")
            layout["showlegend"] = True
            fig.update_layout(**layout)
            charts.append(chart_entry("chart4_timeline", "chart-4-timeline", "CHART 4 — TIMELINE", "Leaders Over Time", fig, [
                "The leading names do not move in lockstep — some fade as others surge.",
                "Tracking counts over time separates sustained presence from one-off spikes.",
            ]))

    if label:
        freq = df[label].astype(str).value_counts()
        fig = go.Figure(go.Histogram(x=freq.values, nbinsx=min(20, max(5, int(freq.nunique() / 3))), marker_color=ART_SECONDARY))
        layout = base_layout(f"FREQUENCY DISTRIBUTION — {human_label(label).upper()}")
        layout["xaxis"] = dict(title="Appearances per entity")
        layout["yaxis"] = dict(title="Entities", gridcolor="#E0DDD6")
        fig.update_layout(**layout)
        charts.append(chart_entry("chart5_frequency", "chart-5-frequency", "CHART 5 — FREQUENCY", "Appearance Spread", fig, [
            f"Most {human_label(label).lower()} entities appear only once; a small head revisits repeatedly.",
            "This power-law shape is typical of guest lists, credits, and catalog-style tables.",
        ]))

    if len(charts) < 5:
        extra_col = next(
            (c for c in df.columns if c not in {label, year, "_art_season", "_art_year"} and is_stringish(df[c]) and df[c].nunique() > 3),
            None,
        )
        if extra_col:
            top = df[extra_col].astype(str).value_counts().head(10)
            fig = go.Figure(go.Bar(x=top.index.astype(str), y=top.values, marker_color=ART_MID))
            layout = base_layout(f"TOP {human_label(extra_col).upper()}")
            layout["xaxis"] = dict(title=human_label(extra_col))
            layout["yaxis"] = dict(title="Count", gridcolor="#E0DDD6")
            fig.update_layout(**layout)
            charts.append(chart_entry("chart_extra_mix", "chart-extra-mix", f"CHART {len(charts)+1} — MIX", human_label(extra_col), fig, [
                f"**{top.index[0]}** is the most repeated {human_label(extra_col).lower()} in the extract.",
                "Secondary dimensions add context when the primary table has no numeric score column.",
            ]))

    return charts[:5]


def build_charts(df: pd.DataFrame, spec: DatasetSpec, meta: dict[str, Any]) -> list[dict[str, Any]]:
    metric = meta["metric"]
    if not metric:
        return build_count_charts(df, spec, meta)

    metric2 = meta["metric2"]
    label = meta["label"]
    year = meta["year"]
    category = meta["category"]
    ml = human_label(metric)
    m2l = human_label(metric2) if metric2 else ""
    vals = df[metric].dropna()
    charts: list[dict[str, Any]] = []

    # Chart 1 — category landscape (more insightful than raw row counts)
    if category and df[category].nunique(dropna=True) >= 2:
        counts = df[category].astype(str).value_counts().head(10).sort_values()
        colors = palette(len(counts))
        fig = go.Figure(
            go.Bar(
                x=counts.values,
                y=counts.index.astype(str),
                orientation="h",
                marker=dict(color=colors, line=dict(color=ART_DARK, width=0.4)),
                hovertemplate="<b>%{y}</b><br>%{x:,} records<extra></extra>",
            )
        )
        finalize(
            fig,
            chart_title(f"WHERE {spec.title.upper()} CONCENTRATES", human_label(category)),
            x_title="Records",
            y_title="",
        )
        charts.append(
            chart_entry(
                "chart1_landscape",
                "chart-1-landscape",
                "CHART 1 — LANDSCAPE",
                f"{human_label(category)} Mix",
                fig,
                [
                    f"**{counts.index[-1]}** dominates with **{int(counts.iloc[-1]):,}** records — the structural center of gravity.",
                    f"Beyond the top ten sit **{max(df[category].nunique() - 10, 0)}** additional {human_label(category).lower()} buckets in the long tail.",
                ],
            )
        )
    elif year and df[[year, metric]].dropna().shape[0] >= 4:
        series = df[[year, metric]].dropna().groupby(year)[metric].median().reset_index().sort_values(year)
        fig = go.Figure()
        fig.add_trace(
            go.Scatter(
                x=series[year],
                y=series[metric],
                mode="lines+markers",
                fill="tozeroy",
                fillcolor="rgba(192, 57, 43, 0.12)",
                line=dict(color=ART_HIGHLIGHT, width=3),
                marker=dict(size=9, color=ART_SECONDARY, line=dict(width=1, color=ART_CREAM)),
                hovertemplate="Year %{x}<br>Median: %{y}<extra></extra>",
            )
        )
        finalize(fig, chart_title(f"MEDIAN {ml.upper()} OVER TIME", spec.title), x_title="Year", y_title=f"Median {ml}")
        charts.append(
            chart_entry(
                "chart1_trend",
                "chart-1-trend",
                "CHART 1 — TREND",
                f"Median {ml} Over Time",
                fig,
                [
                    f"The median {ml.lower()} opens at **{fmt_num(series[metric].iloc[0])}** and closes at **{fmt_num(series[metric].iloc[-1])}** across the series.",
                    "Filled trend lines expose direction without letting single outliers steer the narrative.",
                ],
            )
        )

    # Chart 2 — momentum timeline
    if year and df[[year, metric]].dropna().shape[0] >= 4 and charts and charts[-1]["id"] != "chart1_trend":
        series = df[[year, metric]].dropna().groupby(year)[metric].median().reset_index().sort_values(year)
        fig = go.Figure(
            go.Scatter(
                x=series[year],
                y=series[metric],
                mode="lines+markers",
                line=dict(color=ART_HIGHLIGHT, width=2.8),
                marker=dict(size=8, color=ART_SECONDARY),
                hovertemplate="Year %{x}<br>Median: %{y}<extra></extra>",
            )
        )
        direction = "rising" if series[metric].iloc[-1] > series[metric].iloc[0] else "falling"
        finalize(fig, chart_title(f"{direction.upper()} MEDIAN {ml.upper()}", "STRUCTURAL SLOPE"), x_title="Year", y_title=f"Median {ml}")
        charts.append(
            chart_entry(
                "chart2_timeline",
                "chart-2-timeline",
                "CHART 2 — TIMELINE",
                f"Median {ml} Over Time",
                fig,
                [
                    f"Median {ml.lower()} is **{direction}** from **{fmt_num(series[metric].iloc[0])}** to **{fmt_num(series[metric].iloc[-1])}**.",
                    "Annual medians filter noise and show the slope the raw rows hide.",
                ],
            )
        )

    # Chart 3 — distribution with color
    if len(vals) >= 8:
        if category and df[[category, metric]].dropna().shape[0] >= 12:
            top_cats = df[category].astype(str).value_counts().head(5).index
            sub = df[df[category].astype(str).isin(top_cats)]
            fig = go.Figure()
            for i, cat in enumerate(top_cats):
                cat_vals = sub.loc[sub[category].astype(str) == cat, metric].dropna()
                if len(cat_vals) < 3:
                    continue
                fig.add_trace(
                    go.Box(
                        y=cat_vals,
                        name=str(cat)[:18],
                        marker_color=palette(len(top_cats))[i],
                        line=dict(color=ART_DARK, width=0.6),
                        boxmean="sd",
                    )
                )
            if fig.data:
                finalize(
                    fig,
                    chart_title(f"HOW {ml.upper()} SPLITS", f"BY {human_label(category).upper()}"),
                    y_title=ml,
                    legend=True,
                )
                charts.append(
                    chart_entry(
                        "chart3_distribution",
                        "chart-3-distribution",
                        "CHART 3 — DISTRIBUTION",
                        f"{ml} by {human_label(category)}",
                        fig,
                        [
                            f"Category boxes reveal whether {ml.lower()} consensus is shared or contested across tiers.",
                            "Wide whiskers flag categories where outliers — not averages — drive reputation.",
                        ],
                    )
                )
        if not any(c["id"] == "chart3_distribution" for c in charts):
            hist, edges = np.histogram(vals, bins=min(20, max(8, int(vals.nunique() / 2))))
            centers = (edges[:-1] + edges[1:]) / 2
            fig = go.Figure(
                go.Bar(
                    x=centers,
                    y=hist,
                    marker=dict(color=bar_gradient(len(centers)), line=dict(color=ART_DARK, width=0.3)),
                    hovertemplate=f"{ml}: %{{x}}<br>Count: %{{y}}<extra></extra>",
                )
            )
            skew = "right-skewed" if vals.mean() > vals.median() * 1.05 else "relatively symmetric"
            finalize(fig, chart_title(f"DISTRIBUTION OF {ml.upper()}", "FULL SAMPLE"), x_title=ml, y_title="Frequency")
            charts.append(
                chart_entry(
                    "chart3_distribution",
                    "chart-3-distribution",
                    "CHART 3 — DISTRIBUTION",
                    f"{ml} Distribution",
                    fig,
                    [
                        f"Median **{fmt_num(vals.median())}** vs mean **{fmt_num(vals.mean())}** — the shape is {skew}.",
                        f"The top decile begins at **{fmt_num(vals.quantile(0.9))}**; that tail is where franchise-defining cases live.",
                    ],
                )
            )

    # Chart 4 — ranked leaders
    if label and df[[label, metric]].dropna().shape[0] >= 3:
        ranked = (
            df[[label, metric]]
            .dropna()
            .groupby(label, observed=True)[metric]
            .median()
            .sort_values(ascending=False)
            .head(12)
            .sort_values()
        )
        if len(ranked) >= 3:
            fig = go.Figure(
                go.Bar(
                    x=ranked.values,
                    y=ranked.index.astype(str),
                    orientation="h",
                    marker=dict(color=bar_gradient(len(ranked)), line=dict(color=ART_DARK, width=0.4)),
                    hovertemplate="<b>%{y}</b><br>%{x}<extra></extra>",
                )
            )
            finalize(fig, chart_title(f"LEADERS BY {ml.upper()}", human_label(label)), x_title=f"Median {ml}")
            charts.append(
                chart_entry(
                    "chart4_leaders",
                    "chart-4-leaders",
                    "CHART 4 — LEADERS",
                    f"Top {human_label(label)}",
                    fig,
                    [
                        f"**{ranked.index[-1]}** leads at **{fmt_num(ranked.iloc[-1])}** — **{fmt_num(ranked.median())}** marks the median among the top dozen.",
                        "Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.",
                    ],
                )
            )

    # Chart 5 — relationship or category compare
    if metric2 and df[[metric, metric2]].dropna().shape[0] >= 8:
        plot = df[[metric, metric2] + ([label] if label else []) + ([category] if category else [])].dropna()
        if len(plot) > 2500:
            plot = plot.sample(2500, random_state=7)
        color_col = category if category and category in plot.columns else None
        if color_col:
            cats = plot[color_col].astype(str).value_counts().head(6).index
            plot = plot[plot[color_col].astype(str).isin(cats)]
            fig = go.Figure()
            for i, cat in enumerate(cats):
                sub = plot[plot[color_col].astype(str) == cat]
                fig.add_trace(
                    go.Scatter(
                        x=sub[metric],
                        y=sub[metric2],
                        mode="markers",
                        name=str(cat)[:16],
                        marker=dict(color=palette(len(cats))[i], size=8, opacity=0.72, line=dict(width=0.4, color=ART_DARK)),
                        hovertemplate=f"{ml}: %{{x}}<br>{m2l}: %{{y}}<extra></extra>",
                    )
                )
            finalize(fig, chart_title(f"{ml.upper()} VS {m2l.upper()}", "COLORED BY CATEGORY"), x_title=ml, y_title=m2l, legend=True)
        else:
            fig = go.Figure(
                go.Scatter(
                    x=plot[metric],
                    y=plot[metric2],
                    mode="markers",
                    text=plot[label].astype(str) if label and label in plot.columns else None,
                    marker=dict(color=ART_SECONDARY, size=8, opacity=0.55, line=dict(width=0.5, color=ART_DARK)),
                    hovertemplate=f"{ml}: %{{x}}<br>{m2l}: %{{y}}<extra></extra>",
                )
            )
            finalize(fig, chart_title(f"{ml.upper()} VS {m2l.upper()}", "JOINT DISTRIBUTION"), x_title=ml, y_title=m2l)
        charts.append(
            chart_entry(
                "chart5_scatter",
                "chart-5-relationship",
                "CHART 5 — RELATIONSHIP",
                f"{ml} vs {m2l}",
                fig,
                [
                    f"Joint plot of **{ml.lower()}** and **{m2l.lower()}** surfaces clusters the averages erase.",
                    "Outlying points are candidates for follow-up — they are the archetypes, not the noise.",
                ],
            )
        )
    elif category and category != label and df[[category, metric]].dropna().shape[0] >= 8:
        top_cats = df[category].astype(str).value_counts().head(8).index
        sub = df[df[category].astype(str).isin(top_cats)]
        med = sub.groupby(category, observed=True)[metric].median().sort_values(ascending=False)
        fig = go.Figure(
            go.Bar(
                x=med.index.astype(str),
                y=med.values,
                marker=dict(color=palette(len(med)), line=dict(color=ART_DARK, width=0.4)),
                hovertemplate="<b>%{x}</b><br>Median: %{y}<extra></extra>",
            )
        )
        finalize(fig, chart_title(f"MEDIAN {ml.upper()}", f"BY {human_label(category).upper()}"), x_title=human_label(category), y_title=f"Median {ml}")
        charts.append(
            chart_entry(
                "chart5_category_compare",
                "chart-5-category-compare",
                "CHART 5 — CATEGORY COMPARE",
                f"{ml} by {human_label(category)}",
                fig,
                [
                    f"**{med.index[0]}** posts the highest median {ml.lower()} (**{fmt_num(med.iloc[0])}**); **{med.index[-1]}** trails at **{fmt_num(med.iloc[-1])}**.",
                    "Category medians separate structural tiers faster than row-level anecdotes.",
                ],
            )
        )

    seen_ids: set[str] = set()
    unique: list[dict[str, Any]] = []
    for ch in charts:
        if ch["id"] not in seen_ids:
            seen_ids.add(ch["id"])
            unique.append(ch)
    charts = unique

    idx = 1
    while len(charts) < 5 and metric:
        cid = f"chart_pad_{idx}"
        if cid in seen_ids:
            idx += 1
            continue
        fig = go.Figure(
            go.Box(
                y=vals,
                marker_color=ART_SECONDARY,
                line_color=ART_HIGHLIGHT,
                boxmean="sd",
                fillcolor="rgba(44, 62, 107, 0.15)",
            )
        )
        finalize(fig, chart_title(f"SPREAD OF {ml.upper()}", "INTERQUARTILE VIEW"), y_title=ml)
        charts.append(
            chart_entry(
                cid,
                f"chart-pad-{idx}",
                f"CHART {len(charts)+1} — SPREAD",
                f"{ml} Spread",
                fig,
                [
                    f"The middle half runs **{fmt_num(vals.quantile(0.25))}** to **{fmt_num(vals.quantile(0.75))}**.",
                    "Tight boxes mean consensus; long whiskers mean extremes own the narrative.",
                ],
            )
        )
        seen_ids.add(cid)
        idx += 1

    return charts[:5]


def chart_entry(cid, sid, title, caption, fig, prose) -> dict[str, Any]:
    return dict(id=cid, section_id=sid, section_title=title, caption=caption, fig=fig, prose=prose)


def build_facts(df: pd.DataFrame, meta: dict[str, Any], spec: DatasetSpec) -> list[tuple[str, str]]:
    facts: list[tuple[str, str]] = [(f"{len(df):,}", "Records in the working dataset")]
    metric = meta["metric"]
    if metric:
        vals = df[metric].dropna()
        facts.append((fmt_num(vals.median()), f"Median {human_label(metric)}"))
        facts.append((fmt_num(vals.max()), f"Highest observed {human_label(metric)}"))
    if meta["label"] and metric:
        top = df[[meta["label"], metric]].dropna().sort_values(metric, ascending=False).head(1)
        if len(top):
            facts.append((str(top.iloc[0][meta["label"]])[:28], f"Top {human_label(meta['label'])} by {human_label(metric)}"))
    if meta["year"]:
        yrs = pd.to_numeric(df[meta["year"]], errors="coerce").dropna()
        if len(yrs) >= 2:
            facts.append((f"{int(yrs.min())}–{int(yrs.max())}", "Year span covered in the file"))
        elif len(yrs) == 1:
            facts.append((str(int(yrs.iloc[0])), f"Period in {human_label(meta['year'])}"))
    if meta["category"]:
        dom = df[meta["category"]].astype(str).value_counts().index[0]
        facts.append((str(dom)[:28], f"Most common {human_label(meta['category'])}"))
    return facts[:6]


def build_intro(spec: DatasetSpec, df: pd.DataFrame, meta: dict[str, Any]) -> list[str]:
    metric = meta.get("metric")
    ml = human_label(metric) if metric else "the core signal"
    return [
        f"This report analyzes the TidyTuesday <strong>{spec.tt_date}</strong> release on <strong>{spec.title}</strong> — "
        f"<strong>{len(df):,}</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution "
        f"looks like when you stop quoting anecdotes and start counting.",
        f"Five charts track <strong>{ml}</strong> across time, category, and named entities. Where a companion file exists in the repo, "
        f"it is joined before analysis so reception, geography, or metadata columns are not left on the table.",
    ]


def chart_html(slug: str, chart: dict[str, Any]) -> str:
    return f"""<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/{slug}/charts/{chart['id']}.plotly.json" data-fallback="/images/content/articles/{slug}/charts/{chart['id']}.png" role="img" aria-label="{chart['caption']}"></div>
  <figcaption class="art-chart-caption">{chart['caption']}</figcaption>
</figure>"""


def render_article(spec: DatasetSpec, df: pd.DataFrame, meta: dict[str, Any], charts: list[dict], source_url: str) -> str:
    intro = build_intro(spec, df, meta)
    facts = build_facts(df, meta, spec)
    toc = [
        ("fast-facts", "FAST FACTS"),
        ("dataset-context", "DATASET CONTEXT"),
    ] + [(c["section_id"], c["section_title"]) for c in charts] + [
        ("limitations", "LIMITATIONS"),
        ("conclusion", "CONCLUSION"),
        ("references", "REFERENCES"),
        ("editors-note", "EDITOR'S NOTE"),
    ]
    toc_html = "\n".join(f'  <li><a href="#{sid}" id="toc-{sid}">{label}</a></li>' for sid, label in toc)
    facts_html = "\n".join(
        f'  <div class="fact-box"><span class="fact-number">{n}</span><span class="fact-label">{l}</span></div>'
        for n, l in facts
    )
    body = [f"<p class=\"art-p\">{intro[0]}</p>", f"<p class=\"art-p\">{intro[1]}</p>"]
    body += [
        '<h2 id="fast-facts" class="anchored">FAST FACTS</h2>',
        f'<div class="facts-grid">\n{facts_html}\n</div>',
        '<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>',
        f"<p>The source is the TidyTuesday release from <strong>{spec.tt_date}</strong> (R for Data Science community). "
        f"This working file contains <strong>{len(df):,}</strong> rows and <strong>{len(df.columns)}</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>",
        "<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. "
        "Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>",
    ]
    for ch in charts:
        body.append(f'<h2 id="{ch["section_id"]}" class="anchored">{ch["section_title"]}</h2>')
        body.append(chart_html(spec.slug, ch))
        for p in ch["prose"]:
            body.append(f'<p class="art-p">{p}</p>')
    body += [
        '<h2 id="limitations" class="anchored">LIMITATIONS</h2>',
        "<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. "
        "Merged tables may fan out or duplicate rows when join keys are imperfect.</p>"
        "<p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>",
        '<h2 id="conclusion" class="anchored">CONCLUSION</h2>',
        f"<p>Measured end to end, <strong>{spec.title}</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p>"
        "<p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>",
        '<h2 id="references" class="anchored">REFERENCES</h2>',
        f'<p>Data Science Learning Community. ({spec.tt_date[:4]}). <em>TidyTuesday: {spec.title}</em>. '
        f'<a href="{source_url}" target="_blank" rel="noopener noreferrer">{source_url}</a></p>',
        '<h2 id="editors-note" class="anchored">EDITOR\'S NOTE</h2>',
        '<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. '
        "Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>",
        '<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/'
        f'{spec.tt_date[:4]}/{spec.tt_date}" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>',
    ]
    return f"""<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
{toc_html}
  </ul>
</nav>
<main class="art-article-main">
{chr(10).join(body)}
</main>
</div>"""


def write_article(spec: DatasetSpec, force: bool = True) -> bool:
    if spec.slug in PREMIUM_SLUGS and not force:
        print(f"skip premium {spec.slug}")
        return False

    try:
        df, source_url = download_dataset(spec)
    except Exception as exc:
        print(f"FAIL download {spec.slug}: {exc}")
        return False

    if len(df) < 3:
        print(f"FAIL tiny {spec.slug}")
        return False

    meta = pick_columns(df)
    df = meta["df"]
    if not meta["metric"] and not meta["category"] and not meta["label"]:
        print(f"FAIL no signal {spec.slug}")
        return False

    charts = build_charts(df, spec, meta)
    if len(charts) < 5:
        print(f"FAIL charts {spec.slug} ({len(charts)})")
        return False

    slug = spec.slug
    chart_json_dir = PUBLIC / "data/articles" / slug / "charts"
    chart_img_dir = PUBLIC / "images/content/articles" / slug / "charts"
    data_dir = PUBLIC / "data/articles" / slug
    data_dir.mkdir(parents=True, exist_ok=True)
    df.head(8000).to_csv(data_dir / "dataset.csv", index=False)

    for ch in charts:
        save_chart(ch["fig"], chart_json_dir / f"{ch['id']}.plotly.json", chart_img_dir / f"{ch['id']}.png")

    hero_dir = PUBLIC / "images/content/articles" / slug
    hero_dir.mkdir(parents=True, exist_ok=True)
    hero_png = chart_img_dir / f"{charts[0]['id']}.png"
    if hero_png.exists():
        (hero_dir / "hero.png").write_bytes(hero_png.read_bytes())

    desc = textwrap.shorten(build_intro(spec, df, meta)[0].replace("<strong>", "").replace("</strong>", ""), width=190, placeholder="...")
    title_short = spec.title.split(":")[0] if ":" in spec.title else spec.title
    frontmatter = f"""---
title: "{spec.title.upper()}: The Artometrics of {title_short}"
slug: {slug}
pubDate: {date(2026, 6, 15).isoformat()}
description: "{desc.replace('"', '\\"')}"
heroImage: /images/content/articles/{slug}/hero.png
tags: [{', '.join(spec.tags)}]
draft: false
---"""

    body = render_article(spec, df, meta, charts, source_url)
    (BLOG_DIR / f"{slug}.md").write_text(f"{frontmatter}\n{body}\n", encoding="utf-8")
    print(f"OK {slug} ({len(charts)} charts, {len(df)} rows, metric={meta['metric']})")
    gc.collect()
    return True


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Regenerate one Artometrics article")
    parser.add_argument("slug", help="Article slug to regenerate")
    parser.add_argument("--title", required=True)
    parser.add_argument("--tt-date", required=True)
    parser.add_argument("--csv-name", default=None)
    parser.add_argument("--csv-sep", default=None)
    parser.add_argument("--tags", default="culture")
    args = parser.parse_args()
    spec = DatasetSpec(
        slug=args.slug,
        title=args.title,
        tt_date=args.tt_date,
        csv_name=args.csv_name,
        csv_sep=args.csv_sep,
        tags=[t.strip() for t in args.tags.split(",")],
    )
    raise SystemExit(0 if write_article(spec, force=True) else 1)
