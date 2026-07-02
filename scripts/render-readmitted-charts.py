#!/usr/bin/env python3
"""Export readmitted charts as PNG + Plotly JSON for repo and site."""

from __future__ import annotations


import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT / ".cache/article-repos/readmitted"
SITE_DATA = ROOT / "public/data/articles/readmitted/charts"
SITE_IMG = ROOT / "public/images/content/articles/readmitted/charts"

ART_CREAM = "#F2F0EB"
ART_DARK = "#1C1C1E"
ART_HIGHLIGHT = "#C0392B"
ART_SECONDARY = "#2C3E6B"
TIER_COLORS = {
    "No Penalty": ART_SECONDARY,
    "Low": "#7F8FA6",
    "Medium": "#E07B54",
    "High": ART_HIGHLIGHT,
}


def base_layout(title: str, **kwargs) -> dict:
    layout = dict(
        title=dict(text=title, x=0),
        paper_bgcolor=ART_CREAM,
        plot_bgcolor=ART_CREAM,
        font=dict(color=ART_DARK, family="Helvetica, Arial, sans-serif"),
        margin=dict(l=60, r=40, t=80, b=60),
    )
    layout.update(kwargs)
    return layout


def save_chart(fig: go.Figure, name: str) -> None:
    for dest in [REPO / "charts", SITE_DATA]:
        dest.mkdir(parents=True, exist_ok=True)
        pio.write_json(fig, dest / f"{name}.plotly.json")

    for dest in [REPO / "charts", SITE_IMG]:
        dest.mkdir(parents=True, exist_ok=True)
        fig.write_image(dest / f"{name}.png", width=1200, height=700, scale=2)
        print(f"Wrote {name} assets")


def chart1(state_df: pd.DataFrame) -> go.Figure:
    df = state_df[state_df["above_nat_avg"]].sort_values("pct_penalized")
    fig = go.Figure(
        go.Bar(
            x=df["pct_penalized"],
            y=df["state"],
            orientation="h",
            marker_color=ART_HIGHLIGHT,
            hovertemplate="<b>%{y}</b><br>%{x:.1f}% penalized<extra></extra>",
        )
    )
    fig.update_layout(
        **base_layout(
            "<b>Which <span style='color:#C0392B;'>States</span> Have the Most Penalized Hospitals?</b>",
            xaxis_title="% of Hospital-Condition Pairs with ERR > 1.0",
            yaxis=dict(title="", categoryorder="total ascending"),
            shapes=[
                dict(
                    type="line",
                    x0=48.1,
                    x1=48.1,
                    y0=0,
                    y1=1,
                    yref="paper",
                    line=dict(color=ART_SECONDARY, dash="dash"),
                )
            ],
        )
    )
    return fig


def chart2() -> go.Figure:
    df = pd.DataFrame(
        {
            "condition": ["Hip/Knee", "COPD", "Heart Failure", "AMI", "Pneumonia", "CABG"],
            "avg_err": [1.00485, 1.00271, 1.00254, 1.00212, 1.00198, 1.00187],
        }
    )
    fig = go.Figure(
        go.Scatter(
            x=df["avg_err"],
            y=df["condition"],
            mode="markers",
            marker=dict(color=ART_HIGHLIGHT, size=12),
            hovertemplate="<b>%{y}</b><br>ERR: %{x:.5f}<extra></extra>",
        )
    )
    fig.update_layout(
        **base_layout(
            "<b>The <span style='color:#C0392B;'>Hip/Knee</span> Problem: ERR by Condition</b>",
            xaxis_title="Average Excess Readmission Ratio (ERR)",
            yaxis_title="",
            shapes=[
                dict(type="line", x0=1, x1=1, y0=0, y1=1, yref="paper", line=dict(color=ART_DARK))
            ],
        )
    )
    return fig


def chart3(own_df: pd.DataFrame) -> go.Figure:
    grouped = (
        own_df.groupby(["ownership_group", "penalty_tier"], as_index=False)["n"]
        .sum()
        .assign(
            pct=lambda d: d.groupby("ownership_group")["n"].transform(lambda s: s / s.sum())
        )
    )
    fig = go.Figure()
    for tier in ["No Penalty", "Low", "Medium", "High"]:
        part = grouped[grouped["penalty_tier"] == tier]
        fig.add_trace(
            go.Bar(
                name=tier,
                x=part["ownership_group"],
                y=part["pct"],
                marker_color=TIER_COLORS[tier],
                hovertemplate="<b>%{x}</b><br>"
                + tier
                + ": %{y:.1%}<extra></extra>",
            )
        )
    fig.update_layout(
        **base_layout(
            "<b><span style='color:#C0392B;'>For-Profit</span> Hospitals Carry More Penalty Weight</b>",
            barmode="stack",
            xaxis_title="",
            yaxis=dict(title="Share of Hospital-Condition Pairs", tickformat=".0%"),
            legend=dict(title="Penalty Tier"),
        )
    )
    return fig


def main() -> None:
    data_dir = REPO / "data"
    if not data_dir.exists():
        data_dir = ROOT / "public/data/articles/readmitted/data"

    state_df = pd.read_csv(data_dir / "hrrp_state_summary.csv")
    own_df = pd.read_csv(data_dir / "hrrp_ownership_condition.csv")

    save_chart(chart1(state_df), "chart1_states_penalized")
    save_chart(chart2(), "chart2_err_by_condition")
    save_chart(chart3(own_df), "chart3_penalty_by_ownership")


if __name__ == "__main__":
    main()
