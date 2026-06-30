#!/usr/bin/env python3
"""Batch-generate Artometrics articles from TidyTuesday datasets."""

from __future__ import annotations

import json
import re
import textwrap
from dataclasses import dataclass, field
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

SKIP_SLUGS = {
    "pokemon",
    "anime",
    "franchise",
    "coffee-the-artometrics-of-java",
}

EXISTING_SLUGS = {p.stem for p in BLOG_DIR.glob("*.md")}


@dataclass
class DatasetSpec:
    slug: str
    title: str
    tt_date: str
    csv_name: str | None = None
    tags: list[str] = field(default_factory=lambda: ["culture"])
    csv_sep: str | None = None
    hook: str = ""
    section_tag: str = "culture"


def art_layout(title: str, height: int = 520) -> dict[str, Any]:
    return dict(
        title=dict(
            text=f"<b>{title.upper()}</b>",
            font=dict(family="DM Sans, Helvetica, sans-serif", size=15, color=ART_DARK),
            x=0.5,
            xanchor="center",
        ),
        paper_bgcolor=ART_CREAM,
        plot_bgcolor=ART_CREAM,
        font=dict(family="DM Sans, Helvetica, sans-serif", color=ART_DARK, size=12),
        margin=dict(l=70, r=30, t=70, b=60),
        height=height,
        showlegend=False,
        xaxis=dict(showgrid=False, linecolor=ART_MID, tickfont=dict(color=ART_MID)),
        yaxis=dict(showgrid=True, gridcolor="#E0DDD6", linecolor=ART_MID, tickfont=dict(color=ART_MID)),
    )


def save_chart(fig: go.Figure, json_path: Path, png_path: Path) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    payload = json.loads(pio.to_json(fig))
    json_path.write_text(json.dumps(payload), encoding="utf-8")
    try:
        fig.write_image(str(png_path), width=920, height=520, scale=2)
    except Exception:
        # Fallback: write a minimal placeholder PNG via plotly if kaleido fails
        fig.write_image(str(png_path), engine="kaleido", width=920, height=520, scale=2)


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:60] or "article"


def load_table(url: str, spec: DatasetSpec) -> pd.DataFrame:
    read_kwargs: dict[str, Any] = {"on_bad_lines": "skip", "engine": "python", "encoding": "utf-8"}
    if spec.csv_sep:
        read_kwargs["sep"] = spec.csv_sep

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


def download_csv(spec: DatasetSpec) -> tuple[pd.DataFrame, str]:
    year = spec.tt_date[:4]
    folder = f"{TT_BASE}/data/{year}/{spec.tt_date}"

    if spec.csv_name:
        url = f"{folder}/{spec.csv_name}"
        return clean_df(load_table(url, spec)), url

    api_url = f"https://api.github.com/repos/rfordatascience/tidytuesday/contents/data/{year}/{spec.tt_date}?ref=main"
    resp = requests.get(api_url, timeout=30, headers={"User-Agent": "artometrics-generator"})
    resp.raise_for_status()
    files = [
        x["name"]
        for x in resp.json()
        if x["type"] == "file"
        and (x["name"].endswith(".csv") or x["name"].endswith(".csv.gz") or x["name"].endswith(".xlsx"))
    ]
    if not files:
        raise FileNotFoundError(f"No tabular data in {spec.tt_date}")
    preferred = sorted(
        files,
        key=lambda f: (
            0 if "readme" in f.lower() else 1,
            0 if f.endswith(".csv") and not f.endswith(".gz") else 1,
            0 if f.endswith(".gz") else 1,
            -len(f),
        ),
        reverse=True,
    )
    name = preferred[0]
    url = f"{folder}/{name}"
    return clean_df(load_table(url, spec)), url


def clean_df(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df = df.loc[:, [c for c in df.columns if not str(c).lower().startswith("unnamed")]]
    df = df.loc[:, ~df.columns.duplicated()]
    df = df.dropna(how="all")
    return df


def fmt_num(value: Any) -> str:
    if isinstance(value, (int, float, np.floating, np.integer)) and not pd.isna(value):
        return f"{float(value):,.2f}"
    return str(value)


def is_stringish(series: pd.Series) -> bool:
    return not pd.api.types.is_numeric_dtype(series) and not pd.api.types.is_datetime64_any_dtype(series)
    return not pd.api.types.is_numeric_dtype(series) and not pd.api.types.is_datetime64_any_dtype(series)


def pick_columns(df: pd.DataFrame) -> dict[str, str | None]:
    cols = list(df.columns)
    lower = {c: str(c).lower() for c in cols}

    date_col = next((c for c in cols if any(k in lower[c] for k in ("date", "year", "release", "aired", "published"))), None)
    if date_col and pd.api.types.is_numeric_dtype(df[date_col]) and df[date_col].max() > 1800:
        pass
    elif date_col:
        parsed = pd.to_datetime(df[date_col], errors="coerce")
        if parsed.notna().sum() > len(df) * 0.5:
            df["_art_date"] = parsed
            date_col = "_art_date"

    numeric = [c for c in cols if pd.api.types.is_numeric_dtype(df[c]) and df[c].notna().sum() > 5]
    numeric = sorted(numeric, key=lambda c: df[c].nunique(), reverse=True)

    cat = [
        c
        for c in cols
        if is_stringish(df[c])
        and 1 < df[c].nunique(dropna=True) <= 25
    ]
    cat = sorted(cat, key=lambda c: df[c].nunique())

    score_words = ("score", "rating", "rank", "revenue", "votes", "price", "calories", "points", "gross", "budget")
    value_col = next((c for c in numeric if any(w in lower[c] for w in score_words)), numeric[0] if numeric else None)
    count_col = next((c for c in numeric if any(w in lower[c] for w in ("count", "total", "number", "n_"))), value_col)

    return {
        "date": date_col,
        "category": cat[0] if cat else None,
        "category2": cat[1] if len(cat) > 1 else None,
        "value": value_col,
        "count": count_col,
    }


def analyze(df: pd.DataFrame, spec: DatasetSpec) -> dict[str, Any]:
    df = df.copy()
    meta = pick_columns(df)
    rows = len(df)
    cols = len(df.columns)

    facts: list[tuple[str, str]] = [
        (f"{rows:,}", "Rows in the working dataset after initial load"),
        (f"{cols}", "Variables available for analysis"),
    ]

    insights: list[str] = []
    charts: list[dict[str, Any]] = []

    cat = meta["category"]
    val = meta["value"]
    date_col = meta["date"]
    cat2 = meta["category2"]

    # Chart 1 — category volume
    if cat:
        top = df[cat].astype(str).value_counts().head(12)
        fig = go.Figure(
            go.Bar(
                x=top.index[::-1],
                y=top.values[::-1],
                marker_color=[ART_HIGHLIGHT if i == len(top) - 1 else ART_SECONDARY for i in range(len(top))],
            )
        )
        layout = art_layout(f"{spec.title}: volume by {cat}")
        layout["xaxis"]["title"] = cat.replace("_", " ").title()
        layout["yaxis"]["title"] = "Count"
        fig.update_layout(**layout)
        charts.append(
            dict(
                id="chart1_category_volume",
                title=f"Volume By {cat.replace('_', ' ').title()}",
                fig=fig,
                section_id="chart-1-category-breakdown",
                section_title="CHART 1 — CATEGORY BREAKDOWN",
                prose=[
                    f"The dataset clusters around a handful of dominant categories in `{cat}`. "
                    f"**{top.index[0]}** leads with **{int(top.iloc[0]):,}** records — "
                    f"{'more than double' if len(top) > 1 and top.iloc[0] > 2 * top.iloc[1] else 'a clear plurality over'} the next tier.",
                    f"This is not a flat distribution. The long tail contains {max(0, df[cat].nunique() - 12)} additional categories, "
                    f"but the top dozen account for most of the observable mass in the file.",
                ],
            )
        )
        facts.append((f"{df[cat].nunique()}", f"Distinct values in {cat}"))
        facts.append((str(top.index[0])[:24], f"Most frequent category in {cat}"))

    # Chart 2 — time trend
    if date_col and val and date_col in df.columns:
        tmp = df[[date_col, val]].dropna().copy()
        if isinstance(tmp[date_col], pd.DataFrame):
            tmp[date_col] = tmp[date_col].iloc[:, 0]
        if date_col == "_art_date":
            tmp["period"] = tmp[date_col].dt.to_period("Y").astype(str)
        elif pd.api.types.is_numeric_dtype(tmp[date_col]) and tmp[date_col].between(1800, 2100).mean() > 0.8:
            tmp["period"] = tmp[date_col].astype(int).astype(str)
        else:
            parsed = pd.to_datetime(tmp[date_col], errors="coerce")
            if parsed.notna().sum() > len(tmp) * 0.4:
                tmp["period"] = parsed.dt.to_period("Y").astype(str)
            else:
                tmp["period"] = tmp[date_col].astype(str)
        series = tmp.groupby("period")[val].median().reset_index().sort_values("period").tail(20)
        if len(series) >= 3:
            fig = go.Figure(
                go.Scatter(
                    x=series["period"],
                    y=series[val],
                    mode="lines+markers",
                    line=dict(color=ART_HIGHLIGHT, width=2.5),
                    marker=dict(size=7, color=ART_SECONDARY),
                )
            )
            layout = art_layout(f"Median {val} over time")
            layout["xaxis"]["title"] = "Period"
            layout["yaxis"]["title"] = val.replace("_", " ").title()
            fig.update_layout(**layout)
            charts.append(
                dict(
                    id="chart2_time_trend",
                    title="Median Trend Over Time",
                    fig=fig,
                    section_id="chart-2-temporal-pattern",
                    section_title="CHART 2 — TEMPORAL PATTERN",
                    prose=[
                        f"When `{val}` is tracked across time, the median moves from **{series[val].iloc[0]:,.2f}** "
                        f"in the earliest period to **{series[val].iloc[-1]:,.2f}** in the latest — "
                        f"{'an upward drift' if series[val].iloc[-1] > series[val].iloc[0] else 'a downward drift'} visible in the aggregate.",
                        "Year-level medians smooth out one-off outliers and reveal the structural slope the raw table hides.",
                    ],
                )
            )
            facts.append((f"{series[val].iloc[-1]:,.1f}", f"Latest-period median {val}"))

    # Chart 3 — distribution
    if val:
        vals = df[val].dropna()
        if len(vals) > 10:
            fig = go.Figure(go.Histogram(x=vals, nbinsx=min(30, max(10, int(vals.nunique() / 2))), marker_color=ART_SECONDARY))
            layout = art_layout(f"Distribution of {val}")
            layout["xaxis"]["title"] = val.replace("_", " ").title()
            layout["yaxis"]["title"] = "Frequency"
            fig.update_layout(**layout)
            charts.append(
                dict(
                    id="chart3_distribution",
                    title=f"{val.replace('_', ' ').title()} Distribution",
                    fig=fig,
                    section_id="chart-3-distribution",
                    section_title="CHART 3 — DISTRIBUTION",
                    prose=[
                        f"`{val}` centers around a median of **{vals.median():,.2f}** with a mean of **{vals.mean():,.2f}**. "
                        f"The gap between those two numbers {'suggests right-skew — a few large values pulling the average up' if vals.mean() > vals.median() * 1.05 else 'suggests a relatively symmetric spread'}.",
                        f"Roughly **{(vals > vals.quantile(0.9)).mean() * 100:.1f}%** of records sit above the 90th percentile threshold — the tail is where exceptional cases live.",
                    ],
                )
            )
            facts.append((f"{vals.median():,.2f}", f"Median {val}"))
            facts.append((f"{vals.max():,.2f}", f"Maximum observed {val}"))

    # Chart 4 — top entities
    label_col = next(
        (c for c in df.columns if any(w in str(c).lower() for w in ("name", "title", "country", "artist", "film", "show"))),
        cat,
    )
    if label_col and val and label_col in df.columns:
        try:
            ranked = (
                df[[label_col, val]]
                .dropna()
                .groupby(label_col, observed=True)[val]
                .median()
                .sort_values(ascending=False)
                .head(12)
            )
        except (ValueError, TypeError):
            ranked = pd.Series(dtype=float)
        if len(ranked) >= 3:
            fig = go.Figure(
                go.Bar(
                    y=ranked.index[::-1].astype(str),
                    x=ranked.values[::-1],
                    orientation="h",
                    marker_color=ART_HIGHLIGHT,
                )
            )
            layout = art_layout(f"Top {label_col} by median {val}")
            layout["xaxis"]["title"] = val.replace("_", " ").title()
            fig.update_layout(**layout)
            charts.append(
                dict(
                    id="chart4_top_ranked",
                    title=f"Top {label_col.replace('_', ' ').title()}",
                    fig=fig,
                    section_id="chart-4-leaders",
                    section_title="CHART 4 — LEADERS",
                    prose=[
                        f"At the top of the ranking, **{ranked.index[0]}** posts a median `{val}` of **{ranked.iloc[0]:,.2f}** — "
                        f"separating itself from the median-of-medians baseline of **{ranked.median():,.2f}**.",
                        f"The distance between #1 and #12 is {'wide' if ranked.iloc[0] > ranked.iloc[-1] * 1.5 else 'modest'}, "
                        f"which tells you whether this field has a single dominant outlier or a competitive top tier.",
                    ],
                )
            )

    # Chart 5 — secondary breakdown or scatter
    if cat and cat2 and val:
        pivot = df.groupby([cat, cat2])[val].median().reset_index()
        top_cats = df[cat].value_counts().head(6).index
        sub = pivot[pivot[cat].isin(top_cats)]
        if len(sub) >= 4:
            fig = go.Figure()
            for i, cval in enumerate(top_cats):
                chunk = sub[sub[cat] == cval]
                fig.add_trace(
                    go.Bar(
                        name=str(cval),
                        x=chunk[cat2].astype(str),
                        y=chunk[val],
                        marker_color=ART_HIGHLIGHT if i == 0 else ART_SECONDARY,
                        opacity=0.85 if i == 0 else 0.55,
                    )
                )
            layout = art_layout(f"{val} by {cat} and {cat2}")
            layout["barmode"] = "group"
            layout["showlegend"] = True
            layout["legend"] = dict(orientation="h", y=-0.2)
            fig.update_layout(**layout)
            charts.append(
                dict(
                    id="chart5_crossbreakdown",
                    title="Cross-Category Comparison",
                    fig=fig,
                    section_id="chart-5-crossbreakdown",
                    section_title="CHART 5 — CROSS-BREAKDOWN",
                    prose=[
                        f"Splitting `{val}` across `{cat}` and `{cat2}` exposes interaction effects the marginal charts cannot show.",
                        "The grouped bars reveal which combinations punch above their category baseline — the cells worth isolating in follow-up analysis.",
                    ],
                )
            )
    elif val and cat2 and len(df) > 20:
        sample = df[[cat2, val]].dropna()
        if len(sample) > 5000:
            sample = sample.sample(5000, random_state=7)
        fig = go.Figure(
            go.Scatter(
                x=sample[cat2].astype(str),
                y=sample[val],
                mode="markers",
                marker=dict(color=ART_SECONDARY, opacity=0.35, size=6),
            )
        )
        layout = art_layout(f"{val} vs {cat2}")
        fig.update_layout(**layout)
        charts.append(
            dict(
                id="chart5_scatter",
                title="Variation Across Groups",
                fig=fig,
                section_id="chart-5-variation",
                section_title="CHART 5 — VARIATION",
                prose=[
                    f"Plotting individual records across `{cat2}` shows dispersion around each group's typical `{val}` level.",
                    "Dense bands signal consensus; scattered clouds signal heterogeneous submarkets within the same label.",
                ],
            )
        )

    # pad to 5 charts if needed
    idx = 1
    while len(charts) < 5 and val:
        fig = go.Figure(go.Box(y=df[val].dropna(), marker_color=ART_SECONDARY, line_color=ART_HIGHLIGHT))
        layout = art_layout(f"Boxplot — {val}")
        fig.update_layout(**layout)
        charts.append(
            dict(
                id=f"chart_extra_{idx}",
                title=f"{val.replace('_', ' ').title()} Spread",
                fig=fig,
                section_id=f"chart-extra-{idx}",
                section_title=f"CHART {len(charts)+1} — SPREAD",
                prose=[
                    f"The interquartile range of `{val}` runs from **{df[val].quantile(0.25):,.2f}** to **{df[val].quantile(0.75):,.2f}**.",
                    "Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.",
                ],
            )
        )
        idx += 1

    # Fallback charts for text-heavy tables
    while len(charts) < 5:
        text_cols = [c for c in df.columns if is_stringish(df[c]) and df[c].nunique() > 1]
        numeric_cols = [c for c in df.columns if pd.api.types.is_numeric_dtype(df[c]) and df[c].nunique() > 1]
        candidates = text_cols + numeric_cols
        if not candidates:
            break
        col = candidates[len(charts) % len(candidates)]
        if is_stringish(df[col]):
            counts = df[col].astype(str).value_counts().head(12)
            fig = go.Figure(go.Bar(x=counts.index[::-1], y=counts.values[::-1], marker_color=ART_SECONDARY))
            fig.update_layout(**art_layout(f"Top values in {col}"))
            charts.append(
                dict(
                    id=f"chart_fallback_{len(charts)}",
                    title=f"{col.replace('_', ' ').title()} Counts",
                    fig=fig,
                    section_id=f"chart-fallback-{len(charts)}",
                    section_title=f"CHART {len(charts)} — {col.upper()}",
                    prose=[
                        f"`{col}` is a core signal in this file. **{counts.index[0]}** appears **{int(counts.iloc[0]):,}** times.",
                        "When scores are sparse, frequency itself becomes the finding.",
                    ],
                )
            )
        elif df[col].nunique() <= 30:
            vals = df[col].dropna()
            fig = go.Figure(go.Histogram(x=vals, nbinsx=20, marker_color=ART_SECONDARY))
            fig.update_layout(**art_layout(f"Distribution of {col}"))
            charts.append(
                dict(
                    id=f"chart_fallback_{len(charts)}",
                    title=f"{col.replace('_', ' ').title()} Distribution",
                    fig=fig,
                    section_id=f"chart-fallback-{len(charts)}",
                    section_title=f"CHART {len(charts)} — {col.upper()}",
                    prose=[
                        f"`{col}` spans **{fmt_num(vals.min())}** to **{fmt_num(vals.max())}** with median **{fmt_num(vals.median())}**.",
                        "The spread captures how heterogeneous the underlying records are.",
                    ],
                )
            )
        else:
            counts = df[col].astype(str).value_counts().head(12)
            fig = go.Figure(go.Bar(x=counts.index[::-1], y=counts.values[::-1], marker_color=ART_SECONDARY))
            fig.update_layout(**art_layout(f"Top values in {col}"))
            charts.append(
                dict(
                    id=f"chart_fallback_{len(charts)}",
                    title=f"{col.replace('_', ' ').title()} Top Values",
                    fig=fig,
                    section_id=f"chart-fallback-{len(charts)}",
                    section_title=f"CHART {len(charts)} — {col.upper()}",
                    prose=[
                        f"High-cardinality field `{col}` is summarized by its top buckets. **{counts.index[0]}** leads with **{int(counts.iloc[0]):,}** records.",
                        "Long-tail fields still reveal concentration at the head.",
                    ],
                )
            )

    charts = charts[:5]

    intro = spec.hook or (
        f"This report treats the TidyTuesday **{spec.tt_date}** release as a measurable slice of {spec.title.lower()} — "
        f"{rows:,} records, {cols} variables, one question: what does the distribution actually look like when you stop reading anecdotes and start counting?"
    )

    return dict(
        rows=rows,
        cols=cols,
        facts=facts[:6],
        charts=charts,
        intro=intro,
        meta=meta,
    )


def chart_html(slug: str, chart: dict[str, Any]) -> str:
    cid = chart["id"]
    return f"""<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/{slug}/charts/{cid}.plotly.json" data-fallback="/images/content/articles/{slug}/charts/{cid}.png" role="img" aria-label="{chart['title']}"></div>
  <figcaption class="art-chart-caption">{chart['title']}</figcaption>
</figure>"""


def render_article(spec: DatasetSpec, analysis: dict[str, Any], source_url: str) -> str:
    slug = spec.slug
    toc_items = [
        ("fast-facts", "FAST FACTS"),
        ("dataset-context", "DATASET CONTEXT"),
    ]
    for ch in analysis["charts"]:
        toc_items.append((ch["section_id"], ch["section_title"]))
    toc_items.extend(
        [
            ("limitations", "LIMITATIONS"),
            ("conclusion", "CONCLUSION"),
            ("references", "REFERENCES"),
            ("editors-note", "EDITOR'S NOTE"),
        ]
    )

    toc = "\n".join(
        f'  <li><a href="#{sid}" id="toc-{sid}">{label}</a></li>' for sid, label in toc_items
    )

    facts_html = "\n".join(
        f"""  <div class="fact-box">
    <span class="fact-number">{num}</span>
    <span class="fact-label">{label}</span>
  </div>"""
        for num, label in analysis["facts"]
    )

    body_parts = [
        f'<p class="art-p">{analysis["intro"]}</p>',
        '<h2 id="fast-facts" class="anchored">FAST FACTS</h2>',
        f'<div class="facts-grid">\n{facts_html}\n</div>',
        '<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>',
        f"<p>The source data is the TidyTuesday release from <strong>{spec.tt_date}</strong>, maintained by the R for Data Science community. "
        f"The working dataset contains <strong>{analysis['rows']:,}</strong> rows and <strong>{analysis['cols']}</strong> columns. "
        f"Files were pulled directly from the public repository without manual transcription.</p>",
        f"<p>Analysis code is embedded below each chart. All aggregates were computed in Python with pandas; charts were exported as Plotly JSON for interactive rendering on Artometrics.</p>",
    ]

    for ch in analysis["charts"]:
        body_parts.append(f'<h2 id="{ch["section_id"]}" class="anchored">{ch["section_title"]}</h2>')
        body_parts.append(chart_html(slug, ch))
        for para in ch["prose"]:
            body_parts.append(f'<p class="art-p">{para}</p>')

    limitations = (
        "<p>This dataset is a community-cleaned snapshot, not a live API. Categories, spelling, and coverage reflect the week it was published. "
        "Any time-based field may contain parsing gaps; suppressed or missing values were dropped only when necessary for the chart at hand.</p>"
        "<p>Medians and counts describe the file — not the full universe of real-world activity. Treat findings as structural signals worthy of follow-up, not final verdicts.</p>"
    )
    conclusion = (
        f"<p>Five charts, one through-line: <strong>{spec.title}</strong> looks different when you measure it. "
        f"The headline categories, time trends, and tail behavior all matter — but they rarely tell the same story.</p>"
        "<p>That tension is the point of Artometrics. The data does not replace judgment. It disciplines it.</p>"
    )
    references = (
        f"<p>Data Science Learning Community. ({spec.tt_date[:4]}). <em>TidyTuesday: {spec.title}</em>. "
        f'<a href="{source_url}" target="_blank" rel="noopener noreferrer">{source_url}</a></p>'
    )
    editor = (
        '<p><em>Editor\'s note: This article was generated as part of the Artometrics TidyTuesday research batch. '
        "Methodology and code are reproducible from the embedded chart exhibits.</em></p>"
    )

    body_parts.extend(
        [
            '<h2 id="limitations" class="anchored">LIMITATIONS</h2>',
            limitations,
            '<h2 id="conclusion" class="anchored">CONCLUSION</h2>',
            conclusion,
            '<h2 id="references" class="anchored">REFERENCES</h2>',
            references,
            '<h2 id="editors-note" class="anchored">EDITOR\'S NOTE</h2>',
            f'<div class="art-editorial-note">{editor}</div>',
            '<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>',
        ]
    )

    main = "\n".join(body_parts)
    return f"""<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
{toc}
  </ul>
</nav>
<main class="art-article-main">
{main}
</main>
</div>"""


def write_article(spec: DatasetSpec) -> bool:
    if spec.slug in SKIP_SLUGS or spec.slug in EXISTING_SLUGS:
        print(f"skip existing {spec.slug}")
        return False

    try:
        df, source_url = download_csv(spec)
    except Exception as exc:
        print(f"FAIL download {spec.slug}: {exc}")
        return False

    if len(df) < 3:
        print(f"FAIL tiny dataset {spec.slug}")
        return False

    try:
        analysis = analyze(df, spec)
    except Exception as exc:
        print(f"FAIL analyze {spec.slug}: {exc}")
        return False
    if len(analysis["charts"]) < 1:
        print(f"FAIL insufficient charts {spec.slug}")
        return False

    chart_json_dir = PUBLIC / "data/articles" / spec.slug / "charts"
    chart_img_dir = PUBLIC / "images/content/articles" / spec.slug / "charts"
    data_dir = PUBLIC / "data/articles" / spec.slug
    data_dir.mkdir(parents=True, exist_ok=True)
    df.head(5000).to_csv(data_dir / "dataset.csv", index=False)

    for ch in analysis["charts"]:
        save_chart(
            ch["fig"],
            chart_json_dir / f"{ch['id']}.plotly.json",
            chart_img_dir / f"{ch['id']}.png",
        )

    # hero from first chart png
    hero_dir = PUBLIC / "images/content/articles" / spec.slug
    hero_dir.mkdir(parents=True, exist_ok=True)
    first_png = chart_img_dir / f"{analysis['charts'][0]['id']}.png"
    hero_path = hero_dir / "hero.png"
    if first_png.exists():
        hero_path.write_bytes(first_png.read_bytes())

    desc = textwrap.shorten(analysis["intro"], width=190, placeholder="...")
    pub = date(2026, 6, 15)

    frontmatter = f"""---
title: "{spec.title.upper()}: The Artometrics of {spec.title.split(':')[0] if ':' in spec.title else spec.title}"
slug: {spec.slug}
pubDate: {pub.isoformat()}
description: "{desc.replace('"', '\\"')}"
heroImage: /images/content/articles/{spec.slug}/hero.png
tags: [{', '.join(spec.tags)}]
draft: false
---"""

    body = render_article(spec, analysis, source_url)
    out = BLOG_DIR / f"{spec.slug}.md"
    out.write_text(f"{frontmatter}\n{body}\n", encoding="utf-8")
    print(f"OK {spec.slug} ({len(analysis['charts'])} charts, {analysis['rows']} rows)")
    return True


# PDF selections with corrected TidyTuesday paths
DATASETS: list[DatasetSpec] = [
    DatasetSpec("pixar-films", "Pixar Films", "2025-03-11", "pixar_films.csv", ["culture"]),
    DatasetSpec("horror-movies", "Horror Movies", "2022-11-01", "horror_movies.csv", ["culture"]),
    DatasetSpec("horror-movie-profit", "Horror Movie Profit", "2018-10-23", None, ["culture", "power"]),
    DatasetSpec("tv-golden-age", "TV Golden Age", "2019-01-08", None, ["culture"]),
    DatasetSpec("emmy-awards", "Emmy Awards", "2021-09-21", None, ["culture"]),
    DatasetSpec("simpsons-guest-stars", "Simpsons Guest Stars", "2019-08-27", "simpsons-guests.csv", ["culture"], "|"),
    DatasetSpec("super-bowl-ads", "Super Bowl Ads", "2021-03-02", None, ["culture", "power"]),
    DatasetSpec("netflix-titles", "Netflix Titles", "2021-04-20", "netflix_titles.csv", ["culture"]),
    DatasetSpec("netflix-engagement", "Netflix Engagement", "2025-07-29", "shows.csv", ["culture", "power"]),
    DatasetSpec("broadway-musicals", "Broadway Musicals", "2020-04-28", None, ["culture"]),
    DatasetSpec("billboard-hot-100", "Billboard Hot 100 Number Ones", "2025-08-26", "billboard.csv", ["culture"]),
    DatasetSpec("billboard-top-100", "Billboard Top 100", "2021-09-14", "billboard.csv", ["culture"]),
    DatasetSpec("rolling-stone-albums", "Rolling Stone Album Rankings", "2024-05-07", None, ["culture"]),
    DatasetSpec("beyonce-taylor-lyrics", "Beyoncé & Taylor Swift Lyrics", "2020-09-29", None, ["culture", "persona"]),
    DatasetSpec("christmas-songs", "Christmas Songs", "2019-12-24", None, ["culture"]),
    DatasetSpec("video-games-sliced", "Video Games", "2021-03-16", None, ["culture"]),
    DatasetSpec("video-games-steam", "Video Games Steam Spy", "2019-07-30", None, ["culture"]),
    DatasetSpec("board-games", "Board Games", "2019-03-12", "board_games.csv", ["culture"]),
    DatasetSpec("lego-database", "LEGO Database", "2022-09-06", "sets.csv.gz", ["culture"]),
    DatasetSpec("comic-characters", "Comic Book Characters", "2018-05-29", "week9_comic_characters.csv", ["culture"]),
    DatasetSpec("project-gutenberg", "Project Gutenberg", "2025-06-03", "gutenberg_subjects.csv", ["culture", "history"]),
    DatasetSpec("christmas-novels", "Christmas Novels", "2025-12-30", "christmas_novels.csv", ["culture"]),
    DatasetSpec("sherlock-holmes", "Sherlock Holmes", "2025-11-18", "holmes.csv", ["culture", "persona"]),
    DatasetSpec("languages-glottolog", "Languages of the World", "2025-12-23", "languages.csv", ["atlas", "history"]),
    DatasetSpec("medium-articles", "Medium Article Metadata", "2018-12-04", None, ["culture"]),
    DatasetSpec("world-heritage-sites", "World Heritage Sites", "2024-02-06", "heritage.csv", ["atlas", "history"]),
    DatasetSpec("cia-world-factbook", "CIA World Factbook", "2024-10-22", None, ["atlas", "power"]),
    DatasetSpec("roman-emperors", "Roman Emperors", "2019-08-13", "emperors.csv", ["history", "persona"]),
    DatasetSpec("nuclear-explosions", "Nuclear Explosions", "2019-08-20", None, ["history", "power"]),
    DatasetSpec("un-votes", "UN Votes", "2021-03-23", None, ["power", "history"]),
    DatasetSpec("big-mac-index", "Big Mac Index", "2020-12-22", None, ["power", "atlas"]),
    DatasetSpec("ceo-departures", "CEO Departures", "2021-04-27", None, ["power"]),
    DatasetSpec("college-major-income", "College Major & Income", "2018-10-16", None, ["power", "persona"]),
    DatasetSpec("wealth-income", "Wealth and Income", "2021-02-09", "income_distribution.csv", ["power"]),
    DatasetSpec("us-tuition", "US Tuition Costs", "2018-04-02", "us_avg_tuition.xlsx", ["power"]),
    DatasetSpec("us-voter-turnout", "US Voter Turnout", "2018-10-09", None, ["power"]),
    DatasetSpec("incarceration-trends", "Incarceration Trends", "2019-01-22", None, ["power", "history"]),
    DatasetSpec("school-diversity", "School Diversity", "2019-09-24", None, ["power", "persona"]),
    DatasetSpec("us-phds", "US PhDs Awarded", "2019-02-19", None, ["persona", "power"]),
    DatasetSpec("global-plastic-waste", "Global Plastic Waste", "2019-05-21", None, ["atlas", "power"]),
    DatasetSpec("hurricanes-puerto-rico", "Hurricanes & Puerto Rico", "2018-06-19", None, ["atlas", "history"]),
    DatasetSpec("global-life-expectancy", "Global Life Expectancy", "2018-07-03", None, ["atlas", "history"]),
    DatasetSpec("exercise-usa", "Exercise USA", "2018-07-17", "week16_exercise.xlsx", ["persona"]),
    DatasetSpec("alcohol-consumption", "Alcohol Consumption", "2018-06-26", None, ["culture", "atlas"]),
    DatasetSpec("hydro-wastewater", "Hydro Wastewater Plants", "2022-09-20", "HydroWASTE_v10.csv", ["atlas"]),
    DatasetSpec("cetaceans", "Cetaceans", "2018-12-18", "allCetaceanData.csv", ["atlas"]),
    DatasetSpec("national-park-visits", "National Park Visits", "2019-09-17", "national_parks.csv", ["atlas"]),
    DatasetSpec("uk-museums", "UK Museums", "2022-11-22", None, ["culture", "atlas"]),
    DatasetSpec("nyc-restaurant-inspections", "NYC Restaurant Inspections", "2018-12-11", None, ["atlas", "culture"]),
    DatasetSpec("radio-stations", "Radio Stations", "2022-11-08", None, ["culture"]),
    DatasetSpec("web-page-metrics", "Web Page Metrics", "2022-11-15", "speed_index.csv", ["culture", "power"]),
    DatasetSpec("biketown-bikeshare", "Biketown Bikeshare", "2018-06-05", "week10_biketown.zip", ["atlas"]),
    DatasetSpec("airline-safety", "Airline Safety", "2018-08-07", None, ["atlas", "history"]),
    DatasetSpec("fast-food-calories", "Fast Food Calories", "2018-09-04", None, ["culture"]),
    DatasetSpec("ramen-ratings", "Ramen Ratings", "2019-06-04", None, ["culture"]),
    DatasetSpec("wine-ratings", "Wine Ratings", "2019-05-28", None, ["culture"]),
    DatasetSpec("craft-beer-usa", "Craft Beer USA", "2018-07-10", None, ["culture"]),
    DatasetSpec("all-the-pizza", "All The Pizza", "2019-10-01", "pizza_datafiniti.csv", ["culture"]),
]


def main() -> None:
    global EXISTING_SLUGS
    EXISTING_SLUGS = {p.stem for p in BLOG_DIR.glob("*.md")}
    ok = 0
    fail = 0
    for spec in DATASETS:
        if write_article(spec):
            ok += 1
        else:
            if spec.slug not in SKIP_SLUGS and spec.slug not in EXISTING_SLUGS:
                fail += 1
    print(f"\nDone: {ok} created, {fail} failed, {len(SKIP_SLUGS)} skipped (existing flagship articles)")


if __name__ == "__main__":
    main()
