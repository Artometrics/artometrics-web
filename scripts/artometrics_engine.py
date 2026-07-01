#!/usr/bin/env python3
"""Artometrics article engine v4 — dataset profiles, five-chart blueprint, editorial prose."""

from __future__ import annotations

import json
import re
import textwrap
import gc
import io
import zipfile
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio
import requests

from dataset_profiles import get_profile

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
    "subject",
    "book",
    "author",
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
    "leaid",
    "x1",
    "co_per_rol",
    "reign_start_y",
    "reign_end_y",
    "routeid",
    "route_id",
    "leaid",
    "fips",
    "zip",
    "postal",
    "latitude",
    "longitude",
    "lat",
    "lon",
    "status",
    "adult",
    "available_globally",
    "rcid",
    "departure_code",
    "aian",
    "nhpi",
    "black",
    "white",
    "asian",
    "hispanic",
    "two_or_more",
}

CATEGORY_BANNED = {
    "status",
    "adult",
    "id",
    "index",
    "available_globally",
    "poster_path",
    "backdrop_path",
    "original_language",
    "overview",
    "tagline",
}

CATEGORY_PRIORITY = (
    "genre",
    "genre_names",
    "primary_genre",
    "type",
    "country",
    "dynasty",
    "era",
    "family",
    "publisher",
    "network",
    "theme",
    "format",
    "cuisine",
    "region",
    "state",
    "industry",
    "major_category",
    "broad_field",
    "purpose",
    "device",
    "departure_type",
    "category",
    "artist",
    "artist_name",
)

LABEL_BANNED = {"id", "index", "text", "line", "answer", "question"}

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


def format_prose(text: str) -> str:
    """Convert markdown emphasis in generated prose to HTML."""
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", text)
    return text


def human_label(col: str) -> str:
    if col == "_art_value":
        return "Value"
    if col == "_art_year":
        return "Year"
    c = re.sub(r"_+", " ", str(col)).strip()
    c = re.sub(r"\s+", " ", c)
    return c[:1].upper() + c[1:]


def fmt_num(value: Any, *, compact: bool = False) -> str:
    if isinstance(value, (int, float, np.floating, np.integer)) and not pd.isna(value):
        v = float(value)
        if compact:
            if abs(v) >= 1_000_000_000:
                return f"{v / 1_000_000_000:.1f}B".replace(".0B", "B")
            if abs(v) >= 1_000_000:
                return f"{v / 1_000_000:.1f}M".replace(".0M", "M")
        if abs(v) >= 1000:
            return f"{v:,.0f}"
        if abs(v) >= 100:
            return f"{v:.0f}"
        if abs(v) >= 10:
            return f"{v:.1f}"
        return f"{v:.2f}"
    return str(value)


def coerce_metric_column(df: pd.DataFrame, col: str | None) -> str | None:
    if not col or col not in df.columns:
        return None
    if pd.api.types.is_numeric_dtype(df[col]):
        return col
    coerced = pd.to_numeric(df[col], errors="coerce")
    if coerced.notna().sum() >= max(5, int(len(df) * 0.05)):
        df[col] = coerced
        return col
    stripped = df[col].astype(str).str.replace(r"[^\d.\-]", "", regex=True)
    coerced = pd.to_numeric(stripped, errors="coerce")
    if coerced.notna().sum() >= max(5, int(len(df) * 0.05)):
        df[col] = coerced
        return col
    return None


def is_stringish(series: pd.Series) -> bool:
    return not pd.api.types.is_numeric_dtype(series) and not pd.api.types.is_datetime64_any_dtype(series)


def clean_df(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [str(c).strip() for c in df.columns]
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
        and (
            x["name"].endswith(".csv")
            or x["name"].endswith(".csv.gz")
            or x["name"].endswith(".xlsx")
            or x["name"].endswith(".zip")
        )
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


US_STATE_NAMES = {
    "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut",
    "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa",
    "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan",
    "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire",
    "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio",
    "oklahoma", "oregon", "pennsylvania", "puerto rico", "rhode island", "south carolina",
    "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington",
    "west virginia", "wisconsin", "wyoming",
}


def is_bad_metric(col: str, series: pd.Series) -> bool:
    low = str(col).lower().strip().strip('"')
    if low in US_STATE_NAMES:
        return True
    if low in BANNED_METRIC_NAMES:
        return True
    if re.match(r"^\d{4}(-\d{2})?$", low.strip()):
        return True
    if low.endswith("_id") or low == "id":
        return True
    if low.endswith("_y") and ("start" in low or "end" in low or "reign" in low):
        return True
    if "route" in low and "id" in low:
        return True
    if is_sequential_index(series):
        return True
    if pd.api.types.is_numeric_dtype(series) and series.nunique(dropna=True) <= 1:
        return True
    if pd.api.types.is_numeric_dtype(series):
        uniq = series.dropna().nunique()
        if uniq <= 3 and low not in {"rank", "rating", "stars", "points", "score"}:
            return True
    return False


def pick_category_column(df: pd.DataFrame, label: str | None) -> str | None:
    candidates: list[tuple[int, str]] = []
    for col in df.columns:
        if col == label or str(col).startswith("_art_"):
            continue
        low = str(col).lower()
        if low in CATEGORY_BANNED:
            continue
        if not is_stringish(df[col]):
            continue
        n = df[col].nunique(dropna=True)
        if n < 2 or n > 25:
            continue
        score = 0
        for i, word in enumerate(CATEGORY_PRIORITY):
            if word in low:
                score += 200 - i
        if n <= 12:
            score += 10
        candidates.append((score, col))
    if not candidates:
        return None
    candidates.sort(reverse=True)
    return candidates[0][1]


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

    priority_labels = (
        "guest_star",
        "song_name",
        "artist_name",
        "title",
        "name",
        "book",
        "subject",
        "country",
        "artist",
        "song",
        "film",
        "character",
        "emperor",
        "guest",
    )
    label = next((c for c in cols if lower[c] in priority_labels), None)
    if not label:
        label = next((c for c in cols if any(w in lower[c] for w in LABEL_WORDS) and is_label_column(c, df[c])), None)
    if not label:
        label = next(
            (c for c in cols if is_label_column(c, df[c]) and 2 < df[c].nunique() <= max(30, len(df) // 3)),
            None,
        )

    date_col = next((c for c in cols if any(w in lower[c] for w in ("date", "released", "aired", "published"))), None)
    year_col = next((c for c in cols if lower[c] in ("year", "release_year", "pub_year") or lower[c].endswith("_year")), None)
    if "_art_year" in cols:
        year_col = "_art_year"
    if not year_col:
        wide_years = [c for c in cols if re.match(r"^\d{4}$", str(c).strip())]
        if len(wide_years) >= 2:
            year_col = None
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

    category = pick_category_column(df, label)
    category2 = next(
        (
            c
            for c in cols
            if c != category
            and is_stringish(df[c])
            and 1 < df[c].nunique(dropna=True) <= 12
            and c != label
            and str(c).lower() not in CATEGORY_BANNED
        ),
        None,
    )

    if year_col and year_col in numeric:
        numeric = [c for c in numeric if c != year_col]
        numeric = sorted(numeric, key=metric_score, reverse=True)
        metric = numeric[0] if numeric else None
        metric2 = numeric[1] if len(numeric) > 1 else None

    if not metric and "_art_value" in cols:
        metric = "_art_value"
        metric2 = None

    if metric == "_art_value" and not label:
        label = next((c for c in cols if is_stringish(df[c]) and c not in {"_art_year", "_art_value"}), None)

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


def parse_year_from_text(value: Any) -> float | None:
    if pd.isna(value):
        return None
    match = re.search(r"(\d{4})", str(value))
    return float(match.group(1)) if match else None


def is_label_column(col: str, series: pd.Series) -> bool:
    low = str(col).lower()
    if low in LABEL_BANNED:
        return False
    if low.endswith("_id") or low == "id":
        return False
    return is_stringish(series) and series.nunique(dropna=True) > 1


def melt_year_range_columns(df: pd.DataFrame, id_col: str | None = None) -> pd.DataFrame | None:
    year_cols = [c for c in df.columns if re.match(r"^\d{4}-\d{2}$", str(c).strip())]
    if len(year_cols) < 2:
        return None
    id_cols = [id_col] if id_col and id_col in df.columns else [c for c in df.columns if is_stringish(df[c])][:1]
    if not id_cols:
        return None
    melted = df.melt(id_vars=id_cols, value_vars=year_cols, var_name="_art_year", value_name="_art_value")
    melted["_art_year"] = melted["_art_year"].astype(str).str[:4].astype(float)
    melted["_art_value"] = pd.to_numeric(melted["_art_value"], errors="coerce")
    return melted.dropna(subset=["_art_year", "_art_value"])


def melt_wide_year_columns(df: pd.DataFrame) -> pd.DataFrame | None:
    year_cols = [c for c in df.columns if re.match(r"^\d{4}$", str(c).strip())]
    if len(year_cols) < 2:
        return None
    id_cols = [c for c in df.columns if c not in year_cols and is_stringish(df[c])]
    if not id_cols:
        return None
    melted = df.melt(id_vars=[id_cols[0]], value_vars=year_cols, var_name="_art_year", value_name="_art_value")
    melted["_art_year"] = pd.to_numeric(melted["_art_year"], errors="coerce")
    melted["_art_value"] = pd.to_numeric(melted["_art_value"], errors="coerce")
    return melted.dropna(subset=["_art_year", "_art_value"])


def preprocess_dataset(spec: DatasetSpec, df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    slug = spec.slug

    if slug == "us-tuition":
        melted = melt_year_range_columns(df, id_col="State")
        if melted is not None:
            return melted

    if slug == "horror-movies" and "genre_names" in df.columns:
        df["primary_genre"] = df["genre_names"].astype(str).str.split(",").str[0].str.strip()

    if slug == "roman-emperors":
        df["reign_start_y"] = df["reign_start"].map(parse_year_from_text) if "reign_start" in df.columns else np.nan
        df["reign_end_y"] = df["reign_end"].map(parse_year_from_text) if "reign_end" in df.columns else np.nan
        df["reign_years"] = df["reign_end_y"] - df["reign_start_y"]
        df.loc[df["reign_years"] <= 0, "reign_years"] = np.nan

    if slug == "world-heritage-sites":
        melted = melt_wide_year_columns(df)
        if melted is not None:
            return melted

    if slug == "christmas-novels" and "title" in df.columns:
        df["title"] = df["title"].astype(str)

    if slug == "beyonce-taylor-lyrics" and "song_name" in df.columns:
        df["song_name"] = df["song_name"].astype(str)
        if "artist_name" in df.columns:
            df["artist_name"] = df["artist_name"].astype(str)

    if slug == "sherlock-holmes" and "book" in df.columns:
        df["book"] = df["book"].astype(str)

    if slug == "sherlock-holmes" and "text" in df.columns:
        df["book"] = df["book"].astype(str)
        df["word_count"] = df["text"].astype(str).str.split().str.len()

    if slug == "biketown-bikeshare" and "Duration" in df.columns:
        parts = df["Duration"].astype(str).str.split(":")
        df["duration_min"] = (
            pd.to_numeric(parts.str[0], errors="coerce") * 60
            + pd.to_numeric(parts.str[1], errors="coerce")
            + pd.to_numeric(parts.str[2], errors="coerce") / 60
        )

    if slug == "hurricanes-puerto-rico":
        df.columns = [str(c).strip().strip('"') for c in df.columns]
        state_cols = [c for c in df.columns if c in ("Texas", "Puerto Rico", "Florida")]
        if state_cols and "Date" in df.columns:
            df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
            melted = df.melt(id_vars=["Date"], value_vars=state_cols, var_name="state", value_name="_art_value")
            melted["_art_year"] = melted["Date"].dt.year
            return melted.dropna(subset=["_art_value"])

    if slug == "web-page-metrics" and "date" in df.columns:
        df["_art_year"] = df["date"].astype(str).str[:4].astype(float)

    if slug == "super-bowl-ads":
        df = df.loc[:, ~df.columns.duplicated()]

    if slug == "project-gutenberg" and "subject" in df.columns:
        df["subject"] = df["subject"].astype(str)

    melted = melt_wide_year_columns(df)
    if melted is not None and len(melted) > len(df):
        return melted

    return df


def apply_profile(spec: DatasetSpec, meta: dict[str, Any], df: pd.DataFrame) -> dict[str, Any]:
    profile = get_profile(spec.slug)
    meta = {**meta, "profile": profile}
    for key in ("metric", "metric2", "label", "category", "year"):
        col = profile.get(key)
        if not col:
            continue
        if col in df.columns:
            meta[key] = col
        elif col == "_art_year" and "_art_year" in df.columns:
            meta["year"] = "_art_year"

    if meta.get("metric") and meta["metric"] in df.columns and is_bad_metric(str(meta["metric"]), df[meta["metric"]]):
        meta["metric"] = None

    if meta.get("metric"):
        coerced = coerce_metric_column(df, meta["metric"])
        meta["metric"] = coerced if coerced else None

    if meta.get("metric2"):
        coerced2 = coerce_metric_column(df, meta["metric2"])
        meta["metric2"] = coerced2 if coerced2 and coerced2 != meta.get("metric") else None

    if not meta.get("metric"):
        numeric = [
            c
            for c in df.columns
            if pd.api.types.is_numeric_dtype(df[c])
            and df[c].notna().sum() >= 5
            and not is_bad_metric(c, df[c])
            and not str(c).startswith("_art_")
        ]
        preferred = profile.get("metric")
        if preferred and preferred in numeric:
            meta["metric"] = preferred
        elif numeric:
            meta["metric"] = numeric[0]

    if meta.get("metric2"):
        if meta["metric2"] not in df.columns or meta["metric2"] == meta.get("metric"):
            meta["metric2"] = None
        elif is_bad_metric(str(meta["metric2"]), df[meta["metric2"]]):
            meta["metric2"] = None

    if not meta.get("metric2") and meta.get("metric"):
        numeric2 = [
            c
            for c in df.columns
            if pd.api.types.is_numeric_dtype(df[c])
            and c != meta["metric"]
            and df[c].notna().sum() >= 5
            and not is_bad_metric(c, df[c])
            and not str(c).startswith("_art_")
        ]
        preferred2 = profile.get("metric2")
        if preferred2 and preferred2 in numeric2:
            meta["metric2"] = preferred2
        elif numeric2:
            meta["metric2"] = numeric2[0]

    if not meta.get("label"):
        for col in ("title", "name", "song_name", "book", "subject", "film"):
            if col in df.columns:
                meta["label"] = col
                break

    if not meta.get("category"):
        meta["category"] = pick_category_column(df, meta.get("label"))

    if meta.get("year") and meta["year"] not in df.columns:
        meta["year"] = None

    return meta


def safe_merge(left: pd.DataFrame, right: pd.DataFrame, key: str) -> pd.DataFrame:
    left_d = left.drop_duplicates(subset=[key], keep="first")
    right_d = right.drop_duplicates(subset=[key], keep="first")
    overlap = right_d[key].isin(left_d[key]).sum() / max(len(right_d), 1)
    if overlap < 0.25:
        return left
    merged = left_d.merge(right_d, on=key, how="left", suffixes=("", f"_{key}_r"))
    if len(merged) < len(left) * 0.5 or len(merged) > len(left) * 4:
        return left
    return merged


def save_chart(fig: go.Figure, json_path: Path, png_path: Path) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    json_path.write_text(pio.to_json(fig), encoding="utf-8")
    png_fig = go.Figure(fig)
    png_fig.update_layout(
        title=dict(text=""),
        margin=dict(l=72, r=32, t=24, b=60),
    )
    png_fig.write_image(str(png_path), width=CHART_W, height=CHART_H, scale=2)


def build_gap_chart(
    df: pd.DataFrame,
    metric: str,
    category: str,
    ml: str,
) -> dict[str, Any] | None:
    """Diverging bars: category medians vs overall median — more insight than duplicate bar charts."""
    if df[[category, metric]].dropna().shape[0] < 12:
        return None
    overall = df[metric].median()
    top_cats = df[category].astype(str).value_counts().head(8).index
    sub = df[df[category].astype(str).isin(top_cats)]
    gaps = sub.groupby(category, observed=True)[metric].median() - overall
    gaps = gaps.sort_values()
    if len(gaps) < 3:
        return None
    colors = [ART_HIGHLIGHT if v >= 0 else ART_SECONDARY for v in gaps.values]
    leader = str(gaps.index[-1])[:20]
    fig = go.Figure(
        go.Bar(
            x=gaps.values,
            y=gaps.index.astype(str),
            orientation="h",
            marker=dict(color=colors, line=dict(color=ART_DARK, width=0.4)),
            hovertemplate="<b>%{y}</b><br>Gap: %{x}<extra></extra>",
        )
    )
    finalize(
        fig,
        chart_title(
            f"ABOVE OR BELOW MEDIAN {ml.upper()}",
            f"<span style='color:#C0392B'>{leader.upper()}</span> LEADS",
        ),
        x_title=f"Gap from median ({fmt_num(overall)})",
    )
    return chart_entry(
        "chart4_gap",
        "chart-4-gap",
        "CHART 4 — GAP ANALYSIS",
        f"{ml} vs median by {human_label(category)}",
        fig,
        [
            f"**{gaps.index[-1]}** sits **{fmt_num(gaps.iloc[-1])}** above the median; **{gaps.index[0]}** trails by **{fmt_num(abs(gaps.iloc[0]))}**.",
            "Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.",
        ],
    )


def build_pareto_chart(
    df: pd.DataFrame,
    metric: str,
    label: str,
    ml: str,
    *,
    min_entities: int = 4,
) -> dict[str, Any] | None:
    """Cumulative share curve for top entities — shows concentration."""
    if not label or df[[label, metric]].dropna().shape[0] < 8:
        return None
    ranked = (
        df[[label, metric]]
        .dropna()
        .groupby(label, observed=True)[metric]
        .median()
        .sort_values(ascending=False)
        .head(15)
    )
    if len(ranked) < min_entities:
        return None
    total = ranked.sum()
    if total <= 0:
        return None
    cumulative = (ranked.cumsum() / total * 100).reset_index()
    cumulative.columns = [label, "share"]
    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=list(range(1, len(cumulative) + 1)),
            y=cumulative["share"],
            mode="lines+markers",
            line=dict(color=ART_HIGHLIGHT, width=2.8),
            marker=dict(size=8, color=ART_SECONDARY),
            hovertemplate="Rank %{x}<br>Cumulative: %{y:.0f}%<extra></extra>",
        )
    )
    fig.add_hline(y=80, line_dash="dot", line_color=ART_MID, opacity=0.6)
    finalize(
        fig,
        chart_title(f"CONCENTRATION OF {ml.upper()}", "PARETO CURVE"),
        x_title=f"Rank by {human_label(label)}",
        y_title="Cumulative share (%)",
    )
    top_share = cumulative["share"].iloc[min(4, len(cumulative) - 1)]
    return chart_entry(
        "chart_pareto",
        "chart-pareto",
        "CHART 5 — CONCENTRATION",
        f"Cumulative {ml}",
        fig,
        [
            f"The top **{min(5, len(ranked))}** {human_label(label).lower()} entries account for **{top_share:.0f}%** of the aggregate {ml.lower()}.",
            "Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.",
        ],
    )


def build_heatmap_chart(
    df: pd.DataFrame,
    metric: str,
    year: str,
    category: str,
    ml: str,
) -> dict[str, Any] | None:
    if df[[year, category, metric]].dropna().shape[0] < 12:
        return None
    top_cats = df[category].astype(str).value_counts().head(6).index
    sub = df[df[category].astype(str).isin(top_cats)]
    pivot = sub.pivot_table(index=category, columns=year, values=metric, aggfunc="median")
    if pivot.shape[0] < 2 or pivot.shape[1] < 3:
        return None
    pivot = pivot.sort_index()
    fig = go.Figure(
        go.Heatmap(
            z=pivot.values,
            x=[str(c) for c in pivot.columns],
            y=pivot.index.astype(str),
            colorscale=[[0, ART_CREAM], [0.5, ART_SECONDARY], [1, ART_HIGHLIGHT]],
            hovertemplate="Year %{x}<br>%{y}<br>Median: %{z}<extra></extra>",
        )
    )
    finalize(
        fig,
        chart_title(f"{ml.upper()} HEATMAP", f"BY {human_label(category).upper()}"),
        x_title="Year",
        y_title=human_label(category),
    )
    return chart_entry(
        "chart_heatmap",
        "chart-heatmap",
        "CHART 4 — HEATMAP",
        f"{ml} by {human_label(category)} × year",
        fig,
        [
            f"Heatmaps expose which {human_label(category).lower()} tiers heated up or cooled down across the timeline.",
            "Single-year bars hide drift; the grid shows structural migration between categories.",
        ],
    )


def build_date_timeline_chart(
    df: pd.DataFrame,
    metric: str,
    label: str,
    date_col: str,
    ml: str,
) -> dict[str, Any] | None:
    """Multi-line daily timeline — ideal for hurricane wind, event series."""
    if date_col not in df.columns or not label or metric not in df.columns:
        return None
    plot = df[[date_col, label, metric]].dropna()
    if len(plot) < 6 or plot[label].nunique(dropna=True) < 2:
        return None
    top_labels = plot[label].astype(str).value_counts().head(4).index
    fig = go.Figure()
    for i, name in enumerate(top_labels):
        sub = plot[plot[label].astype(str) == name].sort_values(date_col)
        if len(sub) < 2:
            continue
        fig.add_trace(
            go.Scatter(
                x=sub[date_col],
                y=sub[metric],
                mode="lines",
                name=str(name)[:18],
                line=dict(color=palette(4)[i], width=2.4),
                hovertemplate="<b>%{fullData.name}</b><br>%{x}<br>%{y}<extra></extra>",
            )
        )
    if not fig.data:
        return None
    peak_row = plot.loc[plot[metric].idxmax()]
    peak_label = str(peak_row[label])[:16]
    finalize(
        fig,
        chart_title(f"{ml.upper()} OVER TIME", f"PEAK AT <span style='color:#C0392B'>{peak_label.upper()}</span>"),
        x_title="Date",
        y_title=ml,
        legend=True,
    )
    return chart_entry(
        "chart1_timeline",
        "chart-1-timeline",
        "CHART 1 — TIMELINE",
        f"{ml} by {human_label(label)}",
        fig,
        [
            f"Daily {ml.lower()} lines separate which {human_label(label).lower()} bore the brunt — peaks rarely align.",
            f"The maximum reading (**{fmt_num(plot[metric].max())}**) defines the intensity ceiling for the window.",
        ],
    )


def build_grouped_year_chart(
    df: pd.DataFrame,
    metric: str,
    label: str,
    year: str,
    ml: str,
) -> dict[str, Any] | None:
    """Side-by-side year comparison for small panels (e.g. UNESCO counts 2004 vs 2022)."""
    if not label or not valid_year_col(df, year):
        return None
    cross = df.groupby([year, label], observed=True)[metric].median().reset_index()
    years = sorted(cross[year].unique())
    labels = cross[label].astype(str).unique()
    if len(years) < 2 or len(labels) < 2:
        return None
    fig = go.Figure()
    for i, lbl in enumerate(labels):
        sub = cross[cross[label].astype(str) == lbl].sort_values(year)
        fig.add_trace(
            go.Bar(
                x=sub[year].astype(str),
                y=sub[metric],
                name=str(lbl)[:18],
                marker=dict(color=palette(len(labels))[i], line=dict(color=ART_DARK, width=0.4)),
            )
        )
    finalize(
        fig,
        chart_title(f"{ml.upper()} BY YEAR", f"ACROSS {human_label(label).upper()}"),
        x_title="Year",
        y_title=ml,
        legend=True,
    )
    return chart_entry(
        "chart3_grouped_year",
        "chart-3-grouped-year",
        "CHART 3 — YEAR COMPARE",
        f"{ml} by year and {human_label(label)}",
        fig,
        [
            f"Grouped bars expose who gained between **{int(years[0])}** and **{int(years[-1])}** — not just the latest leaderboard.",
            "Small panels reward side-by-side reading; totals hide per-entity momentum.",
        ],
    )


def build_growth_chart(
    df: pd.DataFrame,
    metric: str,
    label: str,
    year: str,
    ml: str,
) -> dict[str, Any] | None:
    """Percent change from earliest to latest year per entity."""
    if not label or not valid_year_col(df, year):
        return None
    yrs = sorted(df[year].dropna().unique())
    if len(yrs) < 2:
        return None
    first_y, last_y = yrs[0], yrs[-1]
    growth_rows: list[tuple[str, float]] = []
    for lbl in df[label].astype(str).unique():
        sub = df[df[label].astype(str) == lbl]
        start = sub.loc[sub[year] == first_y, metric].median()
        end = sub.loc[sub[year] == last_y, metric].median()
        if pd.isna(start) or pd.isna(end) or start == 0:
            continue
        growth_rows.append((lbl, (end - start) / abs(start) * 100))
    if len(growth_rows) < 2:
        return None
    growth_rows.sort(key=lambda x: x[1])
    names = [r[0] for r in growth_rows]
    values = [r[1] for r in growth_rows]
    colors = [ART_HIGHLIGHT if v >= 0 else ART_SECONDARY for v in values]
    leader = names[-1][:20]
    fig = go.Figure(
        go.Bar(
            x=values,
            y=names,
            orientation="h",
            marker=dict(color=colors, line=dict(color=ART_DARK, width=0.4)),
            hovertemplate="<b>%{y}</b><br>Change: %{x:.0f}%<extra></extra>",
        )
    )
    finalize(
        fig,
        chart_title(
            f"GROWTH IN {ml.upper()}",
            f"<span style='color:#C0392B'>{leader.upper()}</span> LEADS",
        ),
        x_title=f"% change {int(first_y)}→{int(last_y)}",
    )
    return chart_entry(
        "chart4_growth",
        "chart-4-growth",
        "CHART 4 — GROWTH",
        f"{ml} growth by {human_label(label)}",
        fig,
        [
            f"**{names[-1]}** posted the largest gain (**{values[-1]:.0f}%**) from **{int(first_y)}** to **{int(last_y)}**.",
            "Percent-change bars normalize different starting points — essential when baselines differ.",
        ],
    )


def build_peak_chart(
    df: pd.DataFrame,
    metric: str,
    label: str,
    ml: str,
) -> dict[str, Any] | None:
    """Peak (max) values by entity — complements median leaderboards."""
    if not label or df[[label, metric]].dropna().shape[0] < 4:
        return None
    peaks = df.groupby(label, observed=True)[metric].max().sort_values(ascending=True)
    if len(peaks) < 2:
        return None
    leader = str(peaks.index[-1])[:20]
    fig = go.Figure(
        go.Bar(
            x=peaks.values,
            y=peaks.index.astype(str),
            orientation="h",
            marker=dict(color=bar_gradient(len(peaks)), line=dict(color=ART_DARK, width=0.4)),
            hovertemplate="<b>%{y}</b><br>Peak: %{x}<extra></extra>",
        )
    )
    finalize(
        fig,
        chart_title(f"PEAK {ml.upper()}", f"<span style='color:#C0392B'>{leader.upper()}</span> HITS HARDEST"),
        x_title=f"Max {ml}",
    )
    return chart_entry(
        "chart4_peak",
        "chart-4-peak",
        "CHART 4 — PEAKS",
        f"Peak {ml} by {human_label(label)}",
        fig,
        [
            f"**{peaks.index[-1]}** registered the ceiling at **{fmt_num(peaks.iloc[-1])}** — medians understate extremes.",
            "Peak charts matter when tails define the story: storms, records, and breakout hits.",
        ],
    )


def build_aggregate_year_trend(
    df: pd.DataFrame,
    metric: str,
    year: str,
    ml: str,
    *,
    agg: str = "sum",
) -> dict[str, Any] | None:
    """Total or mean metric by year for compact catalogs."""
    if not valid_year_col(df, year):
        return None
    grouped = df.groupby(year)[metric]
    series = (grouped.sum() if agg == "sum" else grouped.median()).reset_index().sort_values(year)
    if len(series) < 2:
        return None
    direction = "rising" if series[metric].iloc[-1] > series[metric].iloc[0] else "falling"
    fig = go.Figure(
        go.Scatter(
            x=series[year],
            y=series[metric],
            mode="lines+markers",
            fill="tozeroy",
            fillcolor="rgba(192, 57, 43, 0.12)",
            line=dict(color=ART_HIGHLIGHT, width=3),
            marker=dict(size=9, color=ART_SECONDARY),
        )
    )
    agg_label = "Total" if agg == "sum" else "Median"
    finalize(
        fig,
        chart_title(f"{direction.upper()} {agg_label.upper()} {ml.upper()}", "AGGREGATE TREND"),
        x_title="Year",
        y_title=f"{agg_label} {ml}",
    )
    return chart_entry(
        "chart5_aggregate",
        "chart-5-aggregate",
        "CHART 5 — AGGREGATE",
        f"{agg_label} {ml} over time",
        fig,
        [
            f"Aggregate {ml.lower()} is **{direction}** from **{fmt_num(series[metric].iloc[0])}** to **{fmt_num(series[metric].iloc[-1])}**.",
            f"The {agg_label.lower()}-by-year view summarizes the whole sample when entity counts are sparse.",
        ],
    )


def pareto_min_entities(df: pd.DataFrame, label: str | None) -> int:
    """Allow Pareto on small catalogs (3–4 named entities)."""
    if not label or label not in df.columns:
        return 4
    n = int(df[label].nunique(dropna=True))
    if n <= 4:
        return max(2, n)
    return 4


def valid_year_col(df: pd.DataFrame, year: str | None) -> bool:
    return bool(year and year in df.columns and df[year].notna().sum() >= 3)


def finalize_chart_set(
    charts: list[dict[str, Any]],
    df: pd.DataFrame,
    spec: DatasetSpec,
    meta: dict[str, Any],
) -> list[dict[str, Any]]:
    """Ensure exactly five distinct charts using meaningful alternates — no filler pads."""
    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for ch in charts:
        if ch["id"] in seen:
            continue
        seen.add(ch["id"])
        unique.append(ch)
    charts = unique

    metric = meta.get("metric")
    label = meta.get("label")
    year = meta.get("year")
    category = meta.get("category")
    ml = human_label(metric) if metric else "Value"
    vals = df[metric].dropna() if metric else pd.Series(dtype=float)

    def add(chart: dict[str, Any] | None) -> None:
        if chart and chart["id"] not in seen and len(charts) < 5:
            charts.append(chart)
            seen.add(chart["id"])

    has_trend = any(c["id"] == "chart1_trend" for c in charts)
    has_category_boxes = any(c["id"] == "chart3_distribution" for c in charts)
    has_scatter = any(c["id"] == "chart5_scatter" for c in charts)

    if len(charts) < 5 and metric and category and category != label and has_category_boxes:
        add(build_gap_chart(df, metric, category, ml))

    if len(charts) < 5 and metric and valid_year_col(df, year) and category and category != label:
        add(build_heatmap_chart(df, metric, year, category, ml))

    if len(charts) < 5 and metric and label and valid_year_col(df, year):
        add(build_grouped_year_chart(df, metric, label, year, ml))

    if len(charts) < 5 and metric and label and valid_year_col(df, year):
        add(build_growth_chart(df, metric, label, year, ml))

    if len(charts) < 5 and metric and label:
        add(build_peak_chart(df, metric, label, ml))

    if len(charts) < 5 and metric and valid_year_col(df, year) and df[year].nunique(dropna=True) >= 2 and len(df) <= 40:
        add(build_aggregate_year_trend(df, metric, year, ml, agg="sum"))

    if len(charts) < 5 and metric and label and "Date" in df.columns and not any(
        c["id"] in {"chart1_timeline", "chart5_timeline"} for c in charts
    ):
        timeline = build_date_timeline_chart(df, metric, label, "Date", ml)
        if timeline:
            timeline["id"] = "chart5_timeline"
            timeline["section_id"] = "chart-5-timeline"
            timeline["section_title"] = "CHART 5 — TIMELINE"
            add(timeline)

    if len(charts) < 5 and metric and label and not has_scatter:
        pareto = build_pareto_chart(df, metric, label, ml, min_entities=pareto_min_entities(df, label))
        if pareto:
            pareto["id"] = "chart5_pareto"
            pareto["section_id"] = "chart-5-concentration"
            pareto["section_title"] = "CHART 5 — CONCENTRATION"
            add(pareto)

    if len(charts) < 5 and metric and year and valid_year_col(df, year):
        yearly = df.groupby(year)[metric].median().reset_index().sort_values(year)
        if len(yearly) >= 4:
            fig = go.Figure(
                go.Scatter(
                    x=yearly[year],
                    y=yearly[metric],
                    mode="lines+markers",
                    line=dict(color=ART_HIGHLIGHT, width=2.5),
                    marker=dict(size=8, color=ART_SECONDARY),
                )
            )
            finalize(fig, chart_title(f"MEDIAN {ml.upper()} OVER TIME", "SECONDARY TREND"), x_title="Year", y_title=f"Median {ml}")
            add(
                chart_entry(
                    "chart_alt_trend",
                    "chart-alt-trend",
                    f"CHART {len(charts)+1} — TREND",
                    f"Median {ml} Over Time",
                    fig,
                    [
                        f"Median {ml.lower()} moves from **{fmt_num(yearly[metric].iloc[0])}** to **{fmt_num(yearly[metric].iloc[-1])}** across the span.",
                        "A secondary trend cut confirms whether the headline metric drifts or holds steady.",
                    ],
                )
            )

    if len(charts) < 5 and metric and len(vals) >= 8 and not any(c["id"] == "chart3_distribution" for c in charts):
        hist, edges = np.histogram(vals, bins=min(16, max(8, int(vals.nunique() / 2))))
        centers = (edges[:-1] + edges[1:]) / 2
        fig = go.Figure(
            go.Bar(
                x=centers,
                y=hist,
                marker=dict(color=bar_gradient(len(centers)), line=dict(color=ART_DARK, width=0.3)),
            )
        )
        finalize(fig, chart_title(f"DISTRIBUTION OF {ml.upper()}", "FULL SAMPLE"), x_title=ml, y_title="Frequency")
        add(
            chart_entry(
                "chart_alt_distribution",
                "chart-alt-distribution",
                f"CHART {len(charts)+1} — DISTRIBUTION",
                f"{ml} Distribution",
                fig,
                [
                    f"Median **{fmt_num(vals.median())}** vs mean **{fmt_num(vals.mean())}** — the tail tells its own story.",
                    f"The top decile begins at **{fmt_num(vals.quantile(0.9))}**.",
                ],
            )
        )

    if len(charts) < 5 and label:
        top = df[label].astype(str).value_counts().head(10).sort_values()
        if len(top) >= 3:
            fig = go.Figure(
                go.Bar(
                    x=top.values,
                    y=top.index.astype(str),
                    orientation="h",
                    marker=dict(color=bar_gradient(len(top)), line=dict(color=ART_DARK, width=0.4)),
                )
            )
            finalize(fig, chart_title(f"TOP {human_label(label).upper()}", "BY FREQUENCY"), x_title="Records")
            add(
                chart_entry(
                    "chart_top_names",
                    "chart-top-names",
                    f"CHART {len(charts)+1} — NAMES",
                    f"Top {human_label(label)}",
                    fig,
                    [
                        f"**{top.index[-1]}** appears **{int(top.iloc[-1]):,}** times — the most repeated entry.",
                        "Frequency leaders reveal franchise depth when numeric scores are sparse.",
                    ],
                )
            )

    return charts[:5]


def load_folder_table(url: str, fname: str, csv_sep: str | None) -> pd.DataFrame:
    if fname.endswith(".zip"):
        resp = requests.get(url, timeout=90, headers={"User-Agent": "artometrics-v2"})
        resp.raise_for_status()
        with zipfile.ZipFile(io.BytesIO(resp.content)) as zf:
            csv_names = [n for n in zf.namelist() if n.lower().endswith(".csv")]
            if not csv_names:
                raise FileNotFoundError(f"No CSV inside {fname}")
            with zf.open(sorted(csv_names, key=len)[0]) as handle:
                return clean_df(pd.read_csv(handle, on_bad_lines="skip", engine="python", sep=csv_sep or ","))
    return clean_df(load_table(url, csv_sep))


def download_dataset(spec: DatasetSpec) -> tuple[pd.DataFrame, str]:
    year = spec.tt_date[:4]
    folder = f"{TT_BASE}/data/{year}/{spec.tt_date}"
    files = list_folder_files(spec.tt_date)
    if not files:
        raise FileNotFoundError(spec.tt_date)

    load_order: list[str] = []
    if spec.csv_name and spec.csv_name in files:
        load_order.append(spec.csv_name)
    for f in sorted(files, key=lambda x: (0 if x.endswith((".csv", ".zip")) and not x.endswith(".gz") else 1, -len(x))):
        if f not in load_order:
            load_order.append(f)

    tables: dict[str, pd.DataFrame] = {}
    primary_url = ""
    for fname in load_order:
        url = f"{folder}/{fname}"
        try:
            tables[fname] = load_folder_table(url, fname, spec.csv_sep if fname == spec.csv_name else None)
            if not primary_url:
                primary_url = url
        except Exception:
            continue

    if not tables:
        raise FileNotFoundError(spec.tt_date)

    if spec.csv_name and spec.csv_name in tables:
        df = tables.pop(spec.csv_name)
        primary_url = f"{folder}/{spec.csv_name}"
    else:
        primary_name = max(tables, key=lambda k: len(tables[k]))
        df = tables.pop(primary_name)
        primary_url = f"{folder}/{primary_name}"

    if spec.slug == "christmas-novels":
        authors = tables.get("christmas_novel_authors.csv")
        if authors is not None and "gutenberg_author_id" in df.columns and "gutenberg_author_id" in authors.columns:
            df = safe_merge(df, authors, "gutenberg_author_id")

    merge_keys = {
        "netflix-engagement": "title",
        "all-the-pizza": "name",
    }
    preferred_key = spec.merge_on or merge_keys.get(spec.slug)
    for fname, other in list(tables.items()):
        if spec.slug == "christmas-novels" and fname == "christmas_novel_authors.csv":
            continue
        if spec.slug in {"netflix-engagement", "all-the-pizza", "web-page-metrics", "wealth-income", "biketown-bikeshare", "super-bowl-ads"}:
            continue
        shared = [c for c in df.columns if c in other.columns and c.lower() not in BANNED_METRIC_NAMES]
        if not shared:
            continue
        key = preferred_key if preferred_key in shared else max(shared, key=lambda c: other[c].isin(df[c]).sum())
        try:
            df = safe_merge(df, other, key)
        except Exception:
            pass

    df = preprocess_dataset(spec, df)

    if len(df) > 100_000:
        df = df.sample(100_000, random_state=7).reset_index(drop=True)

    return df, primary_url or f"{folder}/"


def build_count_charts(df: pd.DataFrame, spec: DatasetSpec, meta: dict[str, Any]) -> list[dict[str, Any]]:
    """Fallback charts when no numeric metric exists — use record counts."""
    label = meta["label"]
    year = meta["year"]
    category = meta["category"]
    charts: list[dict[str, Any]] = []

    if category and category != label:
        cat_counts = df[category].astype(str).value_counts().head(10).sort_values()
        fig = go.Figure(
            go.Bar(
                x=cat_counts.values,
                y=cat_counts.index.astype(str),
                orientation="h",
                marker=dict(color=bar_gradient(len(cat_counts)), line=dict(color=ART_DARK, width=0.4)),
            )
        )
        finalize(
            fig,
            chart_title(f"WHERE {spec.title.upper()} CONCENTRATES", human_label(category)),
            x_title="Records",
        )
        charts.append(
            chart_entry(
                "chart1_category",
                "chart-1-category",
                "CHART 1 — LANDSCAPE",
                human_label(category),
                fig,
                [
                    f"**{cat_counts.index[-1]}** dominates with **{int(cat_counts.iloc[-1]):,}** records.",
                    f"The long tail still holds **{max(df[category].nunique() - 10, 0)}** additional {human_label(category).lower()} buckets.",
                ],
            )
        )

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

    return finalize_chart_set(charts, df, spec, meta)


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

    # Chart 1 — daily timeline when Date column exists (hurricanes, event series)
    if "Date" in df.columns and label and df["Date"].notna().sum() >= 6:
        timeline = build_date_timeline_chart(df, metric, label, "Date", ml)
        if timeline:
            charts.append(timeline)

    # Chart 1 — trend over time (always lead when temporal axis exists)
    if valid_year_col(df, year) and df[[year, metric]].dropna().shape[0] >= 4 and not any(
        c["id"] == "chart1_timeline" for c in charts
    ):
        plot_df = df[[year, metric]].dropna()
        if any(w in str(metric).lower() for w in ("average", "rating", "score", "stars", "points")):
            plot_df = plot_df[plot_df[metric] > 0]
        if plot_df.shape[0] >= 4:
            series = plot_df.groupby(year)[metric].median().reset_index().sort_values(year)
        else:
            series = df[[year, metric]].dropna().groupby(year)[metric].median().reset_index().sort_values(year)
        direction = "rising" if series[metric].iloc[-1] > series[metric].iloc[0] else "falling"
        accent = "STRUCTURAL SLOPE" if abs(series[metric].iloc[-1] - series[metric].iloc[0]) > 0.01 else "FLAT LINE"
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
        finalize(
            fig,
            chart_title(f"{direction.upper()} MEDIAN {ml.upper()}", accent),
            x_title="Year",
            y_title=f"Median {ml}",
        )
        charts.append(
            chart_entry(
                "chart1_trend",
                "chart-1-trend",
                "CHART 1 — TREND",
                f"Median {ml} Over Time",
                fig,
                [
                    f"Median {ml.lower()} is **{direction}** from **{fmt_num(series[metric].iloc[0])}** in the opening period to **{fmt_num(series[metric].iloc[-1])}** at the close.",
                    "Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.",
                ],
            )
        )
    elif label and metric and not any(c["id"].startswith("chart1") for c in charts) and df[[label, metric]].dropna().shape[0] >= 3:
        grouped = (
            df[[label, metric]]
            .dropna()
            .groupby(label, observed=True)[metric]
            .median()
            .sort_values(ascending=False)
            .head(12)
            .sort_values()
        )
        if len(grouped) >= 3:
            fig = go.Figure(
                go.Bar(
                    x=grouped.values,
                    y=grouped.index.astype(str),
                    orientation="h",
                    marker=dict(color=bar_gradient(len(grouped)), line=dict(color=ART_DARK, width=0.4)),
                )
            )
            finalize(
                fig,
                chart_title(f"{ml.upper()}", f"BY {human_label(label).upper()}"),
                x_title=ml,
            )
            charts.append(
                chart_entry(
                    "chart1_breakdown",
                    "chart-1-breakdown",
                    "CHART 1 — BREAKDOWN",
                    f"{ml} by {human_label(label)}",
                    fig,
                    [
                        f"**{grouped.index[-1]}** leads at **{fmt_num(grouped.iloc[-1])}**; **{grouped.index[0]}** anchors the low end at **{fmt_num(grouped.iloc[0])}**.",
                        f"Grouping by {human_label(label).lower()} exposes how the metric varies across the catalog's major entities.",
                    ],
                )
            )
    elif category and not any(c["id"].startswith("chart1") for c in charts) and df[[category, metric]].dropna().shape[0] >= 8:
        top_cats = df[category].astype(str).value_counts().head(8).index
        sub = df[df[category].astype(str).isin(top_cats)]
        med = sub.groupby(category, observed=True)[metric].median().sort_values(ascending=False)
        fig = go.Figure(
            go.Bar(
                x=med.index.astype(str),
                y=med.values,
                marker=dict(color=palette(len(med)), line=dict(color=ART_DARK, width=0.4)),
            )
        )
        finalize(
            fig,
            chart_title(f"MEDIAN {ml.upper()}", f"BY {human_label(category).upper()}"),
            x_title=human_label(category),
            y_title=f"Median {ml}",
        )
        charts.append(
            chart_entry(
                "chart1_breakdown",
                "chart-1-breakdown",
                "CHART 1 — BREAKDOWN",
                f"{ml} by {human_label(category)}",
                fig,
                [
                    f"**{med.index[0]}** posts the highest median {ml.lower()} (**{fmt_num(med.iloc[0])}**); **{med.index[-1]}** trails at **{fmt_num(med.iloc[-1])}**.",
                    "Category medians separate structural tiers faster than row-level anecdotes.",
                ],
            )
        )

    # Chart 2 — ranked leaders
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
            leader = str(ranked.index[-1])[:40]
            fig = go.Figure(
                go.Bar(
                    x=ranked.values,
                    y=ranked.index.astype(str),
                    orientation="h",
                    marker=dict(color=bar_gradient(len(ranked)), line=dict(color=ART_DARK, width=0.4)),
                    hovertemplate="<b>%{y}</b><br>%{x}<extra></extra>",
                )
            )
            finalize(
                fig,
                chart_title(f"LEADERS BY {ml.upper()}", f"<span style='color:#C0392B'>{leader.upper()[:24]}</span> ON TOP"),
                x_title=ml,
            )
            charts.append(
                chart_entry(
                    "chart2_leaders",
                    "chart-2-leaders",
                    "CHART 2 — LEADERS",
                    f"Top {human_label(label)}",
                    fig,
                    [
                        f"**{ranked.index[-1]}** leads at **{fmt_num(ranked.iloc[-1])}** — **{fmt_num(ranked.median())}** marks the median among the top dozen.",
                        "Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.",
                    ],
                )
            )

    # Chart 3 — distribution
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
                            "Wide whiskers flag segments where outliers — not averages — drive reputation.",
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
                        f"The top decile begins at **{fmt_num(vals.quantile(0.9))}**; that tail is where defining cases live.",
                    ],
                )
            )

    # Chart 4 — gap analysis, heatmap, leader trends, or tier compare
    has_category_boxes = any(c["id"] == "chart3_distribution" for c in charts)
    if category and category != label and has_category_boxes and df[[category, metric]].dropna().shape[0] >= 12:
        gap = build_gap_chart(df, metric, category, ml)
        if gap:
            charts.append(gap)
    elif valid_year_col(df, year) and category and category != label and df[[year, category, metric]].dropna().shape[0] >= 12:
        heat = build_heatmap_chart(df, metric, year, category, ml)
        if heat:
            charts.append(heat)
    elif category and category != label and df[[category, metric]].dropna().shape[0] >= 8:
        if not any(c["id"] in {"chart1_breakdown", "chart4_category_compare"} for c in charts):
            top_cats = df[category].astype(str).value_counts().head(8).index
            sub = df[df[category].astype(str).isin(top_cats)]
            med = sub.groupby(category, observed=True)[metric].median().sort_values(ascending=False)
            fig = go.Figure(
                go.Bar(
                    x=med.index.astype(str),
                    y=med.values,
                    marker=dict(color=palette(len(med)), line=dict(color=ART_DARK, width=0.4)),
                )
            )
            finalize(
                fig,
                chart_title(f"WHO WINS ON {ml.upper()}", human_label(category)),
                x_title=human_label(category),
                y_title=f"Median {ml}",
            )
            charts.append(
                chart_entry(
                    "chart4_category_compare",
                    "chart-4-category-compare",
                    "CHART 4 — TIERS",
                    f"{ml} by {human_label(category)}",
                    fig,
                    [
                        f"**{med.index[0]}** leads the median table at **{fmt_num(med.iloc[0])}**; the gap to **{med.index[-1]}** is **{fmt_num(med.iloc[0] - med.iloc[-1])}** points.",
                        "Tier separation matters more than means when distributions skew hard.",
                    ],
                )
            )
    elif valid_year_col(df, year) and label and df[[year, label]].dropna().shape[0] >= 4:
        cross = df.groupby([year, label], observed=True)[metric].median().reset_index()
        top_labels = df[label].astype(str).value_counts().head(4).index
        cross = cross[cross[label].astype(str).isin(top_labels)]
        if len(cross) >= 4:
            fig = go.Figure()
            for i, name in enumerate(top_labels):
                sub = cross[cross[label].astype(str) == name].sort_values(year)
                if len(sub) < 2:
                    continue
                fig.add_trace(
                    go.Scatter(
                        x=sub[year],
                        y=sub[metric],
                        mode="lines+markers",
                        name=str(name)[:22],
                        line=dict(color=palette(4)[i], width=2.2),
                    )
                )
            if fig.data:
                finalize(
                    fig,
                    chart_title(f"LEADERS TRACKING {ml.upper()}", "OVER TIME"),
                    x_title="Year",
                    y_title=f"Median {ml}",
                    legend=True,
                )
                charts.append(
                    chart_entry(
                        "chart4_leader_trends",
                        "chart-4-leader-trends",
                        "CHART 4 — LEADER TRENDS",
                        f"Top {human_label(label)} Over Time",
                        fig,
                        [
                            "The leading names do not move in lockstep — some fade as others surge.",
                            "Tracking medians over time separates sustained dominance from one-off spikes.",
                        ],
                    )
                )

    if not any(c["id"].startswith("chart4") for c in charts) and label and metric:
        pareto = build_pareto_chart(df, metric, label, ml, min_entities=pareto_min_entities(df, label))
        if pareto:
            pareto["section_id"] = "chart-4-concentration"
            pareto["section_title"] = "CHART 4 — CONCENTRATION"
            pareto["id"] = "chart4_pareto"
            charts.append(pareto)

    # Chart 5 — relationship scatter
    if metric2 and metric2 in df.columns and df[[metric, metric2]].dropna().shape[0] >= 8:
        extra_cols: list[str] = []
        if label:
            extra_cols.append(label)
        if category and category != label:
            extra_cols.append(category)
        plot = df[[metric, metric2] + extra_cols].dropna()
        if len(plot) > 2500:
            plot = plot.sample(2500, random_state=7)
        fig = go.Figure()
        color_col = category if category and category in plot.columns else None
        use_color = False
        if color_col:
            try:
                use_color = int(plot[color_col].nunique()) <= 8
            except (TypeError, ValueError):
                use_color = False
        if use_color and color_col:
            cats = plot[color_col].astype(str).value_counts().head(6).index
            plot = plot[plot[color_col].astype(str).isin(cats)]
            for i, cat in enumerate(cats):
                sub = plot[plot[color_col].astype(str) == cat]
                fig.add_trace(
                    go.Scatter(
                        x=sub[metric],
                        y=sub[metric2],
                        mode="markers",
                        name=str(cat)[:16],
                        marker=dict(color=palette(len(cats))[i], size=8, opacity=0.72, line=dict(width=0.4, color=ART_DARK)),
                    )
                )
            finalize(fig, chart_title(f"{ml.upper()} VS {m2l.upper()}", "COLORED BY CATEGORY"), x_title=ml, y_title=m2l, legend=True)
        else:
            sizes = None
            if label and label in plot.columns:
                freq = plot[label].astype(str).map(plot[label].astype(str).value_counts())
                sizes = np.clip(freq * 3 + 6, 6, 22)
            fig.add_trace(
                go.Scatter(
                    x=plot[metric],
                    y=plot[metric2],
                    mode="markers",
                    text=plot[label].astype(str) if label and label in plot.columns else None,
                    marker=dict(
                        color=ART_SECONDARY,
                        size=sizes if sizes is not None else 8,
                        sizemode="diameter",
                        opacity=0.62,
                        line=dict(width=0.6, color=ART_HIGHLIGHT),
                    ),
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
                    "Bubble size tracks repeat presence — outliers are archetypes, not noise.",
                ],
            )
        )
    elif label and metric and not any(c["id"] == "chart5_scatter" for c in charts):
        pareto = build_pareto_chart(df, metric, label, ml, min_entities=pareto_min_entities(df, label))
        if pareto:
            charts.append(pareto)
    elif len(vals) >= 8 and valid_year_col(df, year) and df[[year, metric]].dropna().shape[0] >= 6 and not any(
        c["id"] == "chart1_trend" for c in charts
    ):
        yearly_mean = df[[year, metric]].dropna().groupby(year)[metric].mean().reset_index().sort_values(year)
        yearly_med = df[[year, metric]].dropna().groupby(year)[metric].median().reset_index().sort_values(year)
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=yearly_med[year], y=yearly_med[metric], mode="lines+markers", name="Median", line=dict(color=ART_HIGHLIGHT, width=2.5)))
        fig.add_trace(go.Scatter(x=yearly_mean[year], y=yearly_mean[metric], mode="lines+markers", name="Mean", line=dict(color=ART_SECONDARY, width=2, dash="dot")))
        finalize(fig, chart_title(f"MEAN VS MEDIAN {ml.upper()}", "ROBUSTNESS CHECK"), x_title="Year", y_title=ml, legend=True)
        charts.append(
            chart_entry(
                "chart5_mean_median",
                "chart-5-mean-median",
                "CHART 5 — ROBUSTNESS",
                f"Mean vs Median {ml}",
                fig,
                [
                    "When mean and median diverge, outliers are steering the narrative — medians tell the typical story.",
                    "Tracking both lines exposes whether the field is tightening or fracturing over time.",
                ],
            )
        )

    seen_ids: set[str] = set()
    unique: list[dict[str, Any]] = []
    for ch in charts:
        if ch["id"] not in seen_ids:
            seen_ids.add(ch["id"])
            unique.append(ch)

    return finalize_chart_set(unique, df, spec, meta)


def chart_entry(cid, sid, title, caption, fig, prose) -> dict[str, Any]:
    return dict(id=cid, section_id=sid, section_title=title, caption=caption, fig=fig, prose=prose)


def build_facts(df: pd.DataFrame, meta: dict[str, Any], spec: DatasetSpec) -> list[tuple[str, str]]:
    facts: list[tuple[str, str]] = [(f"{len(df):,}", "Records in the working dataset")]
    metric = meta["metric"]
    if metric:
        vals = df[metric].dropna()
        facts.append((fmt_num(vals.median()), f"Median {human_label(metric)}"))
        facts.append((fmt_num(vals.max(), compact=True), f"Highest observed {human_label(metric)}"))
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
    profile = meta.get("profile") or get_profile(spec.slug)
    metric = meta.get("metric")
    ml = human_label(metric) if metric else "record counts"
    question = profile.get("question") or (
        f"What does the distribution of <strong>{ml}</strong> look like when you stop quoting anecdotes and start counting?"
    )
    return [
        f"This report analyzes the TidyTuesday <strong>{spec.tt_date}</strong> release on <strong>{spec.title}</strong> — "
        f"<strong>{len(df):,}</strong> rows after cleaning and merge. {question}",
        f"Five charts track <strong>{ml}</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. "
        "Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.",
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
    profile = meta.get("profile") or get_profile(spec.slug)
    context = profile.get(
        "context",
        f"The source is the TidyTuesday release from <strong>{spec.tt_date}</strong> (R for Data Science community). "
        f"This working file contains <strong>{len(df):,}</strong> rows and <strong>{len(df.columns)}</strong> columns after merging "
        "all available CSV/XLSX tables in the week folder.",
    )
    body += [
        '<h2 id="fast-facts" class="anchored">FAST FACTS</h2>',
        f'<div class="facts-grid">\n{facts_html}\n</div>',
        '<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>',
        f"<p>{context}</p>",
        "<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. "
        "Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>",
    ]
    for ch in charts:
        body.append(f'<h2 id="{ch["section_id"]}" class="anchored">{ch["section_title"]}</h2>')
        body.append(chart_html(spec.slug, ch))
        for p in ch["prose"]:
            body.append(f'<p class="art-p">{format_prose(p)}</p>')
    metric = meta.get("metric")
    ml = human_label(metric) if metric else "the field"
    body += [
        '<h2 id="limitations" class="anchored">LIMITATIONS</h2>',
        "<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. "
        "Merged tables may fan out or duplicate rows when join keys are imperfect.</p>"
        f"<p>Findings describe the file on hand — treat them as structural signals about <strong>{spec.title}</strong>, not exhaustive truth about the full domain.</p>",
        '<h2 id="conclusion" class="anchored">CONCLUSION</h2>',
        f"<p>Measured end to end, <strong>{spec.title}</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about {ml.lower()}.</p>"
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
    meta = apply_profile(spec, meta, df)
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
