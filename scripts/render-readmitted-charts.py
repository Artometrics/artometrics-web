#!/usr/bin/env python3
"""Export readmitted charts as PNG + Plotly JSON for repo and site."""

from __future__ import annotations

from pathlib import Path

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
ART_MID = "#6B6B6B"
ART_MUTED = "#D5D5D5"
FONT = "DM Sans, Helvetica, Arial, sans-serif"

BAR_GRADIENT = [
    "#1A2A4F",
    "#243760",
    "#2C3E6B",
    "#3D5282",
    "#506898",
    "#647DAD",
    "#7D94BE",
    "#98ABCE",
    "#B4C2DD",
    "#CED7EB",
]

TIER_COLORS = {
    "No Penalty": ART_SECONDARY,
    "Low": "#7F8FA6",
    "Medium": "#E07B54",
    "High": ART_HIGHLIGHT,
}

NAT_AVG_PCT = 48.1


def brand_annotation() -> dict:
    return dict(
        x=1,
        y=0,
        xref="paper",
        yref="paper",
        text="<b>ARTO</b>METRICS",
        showarrow=False,
        xanchor="right",
        yanchor="bottom",
        font=dict(family=FONT, size=9, color=ART_MID),
    )


def base_layout(title: str, subtitle: str = "", **kwargs) -> dict:
    layout = dict(
        title=dict(
            text=title,
            x=0,
            xanchor="left",
            font=dict(family=FONT, size=16, color=ART_DARK),
        ),
        paper_bgcolor=ART_CREAM,
        plot_bgcolor=ART_CREAM,
        font=dict(color=ART_DARK, family=FONT, size=12),
        margin=dict(l=88, r=48, t=72 if subtitle else 56, b=72),
        annotations=[brand_annotation()],
    )
    if subtitle:
        layout["annotations"].insert(
            0,
            dict(
                x=0,
                y=1.08,
                xref="paper",
                yref="paper",
                text=subtitle,
                showarrow=False,
                xanchor="left",
                yanchor="bottom",
                font=dict(family=FONT, size=11, color=ART_MID),
            ),
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
    n = len(df)
    colors = BAR_GRADIENT[:n] if n <= len(BAR_GRADIENT) else BAR_GRADIENT
    if n > len(BAR_GRADIENT):
        colors = [BAR_GRADIENT[int(i * (len(BAR_GRADIENT) - 1) / max(n - 1, 1))] for i in range(n)]
    colors[-1] = ART_HIGHLIGHT  # leader NJ

    fig = go.Figure(
        go.Bar(
            x=df["pct_penalized"],
            y=df["state"],
            orientation="h",
            marker=dict(color=colors, line=dict(width=0)),
            text=[f"{v:.1f}%" for v in df["pct_penalized"]],
            textposition="outside",
            textfont=dict(family=FONT, size=10, color=ART_DARK),
            cliponaxis=False,
            hovertemplate="<b>%{y}</b><br>%{x:.1f}% of pairs penalized<extra></extra>",
        )
    )

    annotations = [
        brand_annotation(),
        dict(
            x=NAT_AVG_PCT,
            y=1.02,
            xref="x",
            yref="paper",
            text=f"National avg ({NAT_AVG_PCT}%)",
            showarrow=False,
            xanchor="center",
            yanchor="bottom",
            font=dict(family=FONT, size=9, color=ART_SECONDARY),
        ),
        dict(
            x=df["pct_penalized"].iloc[-1],
            y=df["state"].iloc[-1],
            xref="x",
            yref="y",
            text="NJ leads at 65.4%",
            showarrow=True,
            arrowhead=2,
            arrowsize=0.8,
            arrowwidth=1,
            arrowcolor=ART_HIGHLIGHT,
            ax=40,
            ay=-28,
            font=dict(family=FONT, size=9, color=ART_HIGHLIGHT),
        ),
    ]

    fig.update_layout(
        **base_layout(
            "<b>Which <span style='color:#C0392B;'>States</span> Have the Most Penalized Hospitals?</b>",
            "Above-average states only — share of hospital-condition pairs with ERR > 1.0",
            xaxis=dict(
                title="% of Hospital-Condition Pairs with ERR > 1.0",
                range=[0, max(df["pct_penalized"]) * 1.14],
                gridcolor=ART_MUTED,
                gridwidth=0.5,
                zeroline=False,
            ),
            yaxis=dict(title="", categoryorder="array", categoryarray=list(df["state"])),
            shapes=[
                dict(
                    type="line",
                    x0=NAT_AVG_PCT,
                    x1=NAT_AVG_PCT,
                    y0=0,
                    y1=1,
                    yref="paper",
                    line=dict(color=ART_SECONDARY, dash="dash", width=1.5),
                )
            ],
            annotations=annotations,
            height=520 + n * 22,
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
    df = df.sort_values("avg_err")

    fig = go.Figure()
    for _, row in df.iterrows():
        fig.add_trace(
            go.Scatter(
                x=[1.0, row["avg_err"]],
                y=[row["condition"], row["condition"]],
                mode="lines",
                line=dict(color=ART_MUTED, width=2),
                showlegend=False,
                hoverinfo="skip",
            )
        )
    fig.add_trace(
        go.Scatter(
            x=df["avg_err"],
            y=df["condition"],
            mode="markers+text",
            marker=dict(color=ART_HIGHLIGHT, size=12, line=dict(width=1, color=ART_DARK)),
            text=[f"{v:.5f}" for v in df["avg_err"]],
            textposition="middle right",
            textfont=dict(family=FONT, size=10, color=ART_DARK),
            hovertemplate="<b>%{y}</b><br>ERR: %{x:.5f}<extra></extra>",
            showlegend=False,
        )
    )

    annotations = [
        brand_annotation(),
        dict(
            x=1.00485,
            y="Hip/Knee",
            xref="x",
            yref="y",
            text="Nearly 2× the excess<br>of the next condition",
            showarrow=True,
            arrowhead=2,
            arrowsize=0.8,
            arrowwidth=1,
            arrowcolor=ART_HIGHLIGHT,
            ax=55,
            ay=-35,
            font=dict(family=FONT, size=9, color=ART_HIGHLIGHT),
        ),
        dict(
            x=1.0,
            y=1.02,
            xref="x",
            yref="paper",
            text="ERR = 1.0 (no excess)",
            showarrow=False,
            xanchor="center",
            yanchor="bottom",
            font=dict(family=FONT, size=9, color=ART_MID),
        ),
    ]

    fig.update_layout(
        **base_layout(
            "<b>The <span style='color:#C0392B;'>Hip/Knee</span> Problem: ERR by Condition</b>",
            "All six HRRP conditions exceed 1.0 — but the spread is measured in thousandths",
            xaxis=dict(
                title="Average Excess Readmission Ratio (ERR)",
                range=[0.9998, 1.0055],
                tickformat=".4f",
                gridcolor=ART_MUTED,
                gridwidth=0.5,
            ),
            yaxis=dict(title=""),
            shapes=[
                dict(
                    type="line",
                    x0=1,
                    x1=1,
                    y0=0,
                    y1=1,
                    yref="paper",
                    line=dict(color=ART_DARK, width=1),
                )
            ],
            annotations=annotations,
            height=420,
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
    ownership_order = ["Non-Profit", "Government", "For-Profit"]
    tier_order = ["No Penalty", "Low", "Medium", "High"]

    fig = go.Figure()
    for tier in tier_order:
        part = grouped[grouped["penalty_tier"] == tier]
        fig.add_trace(
            go.Bar(
                name=tier,
                y=part["ownership_group"],
                x=part["pct"],
                orientation="h",
                marker_color=TIER_COLORS[tier],
                hovertemplate="<b>%{y}</b><br>"
                + tier
                + ": %{x:.1%}<extra></extra>",
            )
        )

    for_profit_high = grouped[
        (grouped["ownership_group"] == "For-Profit") & (grouped["penalty_tier"] == "High")
    ]["pct"]
    high_pct = float(for_profit_high.iloc[0]) if len(for_profit_high) else 0

    annotations = [
        brand_annotation(),
        dict(
            x=0.98,
            y="For-Profit",
            xref="paper",
            yref="y",
            text=f"High-tier share: {high_pct:.1%}",
            showarrow=False,
            xanchor="right",
            font=dict(family=FONT, size=9, color=ART_HIGHLIGHT),
        ),
    ]

    fig.update_layout(
        **base_layout(
            "<b><span style='color:#C0392B;'>For-Profit</span> Hospitals Carry More Penalty Weight</b>",
            "Penalty tier distribution by ownership — HCA, Tenet, and Steward sit in the for-profit column",
            barmode="stack",
            xaxis=dict(
                title="Share of Hospital-Condition Pairs",
                tickformat=".0%",
                range=[0, 1],
                gridcolor=ART_MUTED,
                gridwidth=0.5,
            ),
            yaxis=dict(
                title="",
                categoryorder="array",
                categoryarray=ownership_order,
            ),
            legend=dict(
                title=dict(text="Penalty Tier", font=dict(size=10)),
                orientation="h",
                yanchor="bottom",
                y=1.02,
                xanchor="right",
                x=1,
                font=dict(size=10),
            ),
            annotations=annotations,
            height=380,
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
