#!/usr/bin/env python3
"""Export readmitted charts as PNG + Plotly JSON (FRBSF-style academic palette)."""

from __future__ import annotations

from pathlib import Path

import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT / ".cache/article-repos/readmitted"
SITE_DATA = ROOT / "public/data/articles/readmitted/charts"
SITE_IMG = ROOT / "public/images/content/articles/readmitted/charts"

# FRBSF-style academic palette
FED_PRIMARY = "#1D4E77"
FED_OLIVE = "#8B9A46"
FED_RED = "#A52A2A"
FED_CYAN = "#7BC0D3"
FED_GREY_TEXT = "#666666"
FED_GRID = "#E0E0E0"
FED_BG = "#FFFFFF"
FED_MUTED_BLUE = "#B8C9D9"
FED_DARK = "#333333"

FONT = "Helvetica, Arial, sans-serif"

BAR_GRADIENT = [
    "#B8C9D9",
    "#8FAFC4",
    "#6B95AF",
    "#4D7B9A",
    "#356283",
    "#2A5575",
    "#1D4E77",
    "#1A4569",
    "#173C5B",
    "#14334D",
]

TIER_COLORS = {
    "No Penalty": FED_MUTED_BLUE,
    "Low": FED_CYAN,
    "Medium": FED_OLIVE,
    "High": FED_RED,
}

NAT_AVG_PCT = 48.1
HRRP_SOURCE = (
    "CMS Hospital Readmissions Reduction Program (HRRP), "
    "FY2025 supplemental data (Dataset 9n3s-kdb3)"
)


def fed_figure_title(figure_num: int, title: str) -> str:
    return (
        f"<span style='color:{FED_GREY_TEXT};font-size:11px;font-weight:normal;'>"
        f"Figure {figure_num}</span><br>"
        f"<span style='color:{FED_PRIMARY};font-size:16px;font-weight:bold;'>{title}</span>"
    )


def fed_caption(note: str, source: str) -> str:
    return f"<span style='color:{FED_GREY_TEXT};font-size:10px;'>Note: {note}<br>Source: {source}</span>"


def base_layout(
    figure_num: int,
    title: str,
    note: str,
    source: str = HRRP_SOURCE,
    **kwargs,
) -> dict:
    layout = dict(
        title=dict(
            text=fed_figure_title(figure_num, title),
            x=0,
            xanchor="left",
            y=0.98,
            yanchor="top",
        ),
        paper_bgcolor=FED_BG,
        plot_bgcolor=FED_BG,
        font=dict(color=FED_DARK, family=FONT, size=12),
        margin=dict(l=88, r=56, t=96, b=110),
        annotations=[],
    )

    extra_annotations = kwargs.pop("annotations", [])
    layout["annotations"] = [
        dict(
            x=0.01,
            y=0.03,
            xref="paper",
            yref="paper",
            text=fed_caption(note, source),
            showarrow=False,
            xanchor="left",
            yanchor="bottom",
            align="left",
        ),
        dict(
            x=0.99,
            y=0.03,
            xref="paper",
            yref="paper",
            text="ARTOMETRICS",
            showarrow=False,
            xanchor="right",
            yanchor="bottom",
            font=dict(family=FONT, size=12, color="#1C1C1E"),
        ),
        *extra_annotations,
    ]

    extra_shapes = kwargs.pop("shapes", [])
    layout["shapes"] = extra_shapes
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
    if n <= len(BAR_GRADIENT):
        colors = BAR_GRADIENT[:n]
    else:
        colors = [
            BAR_GRADIENT[int(i * (len(BAR_GRADIENT) - 1) / max(n - 1, 1))]
            for i in range(n)
        ]
    colors[-1] = FED_RED

    fig = go.Figure(
        go.Bar(
            x=df["pct_penalized"],
            y=df["state"],
            orientation="h",
            marker=dict(color=colors, line=dict(width=0)),
            text=[f"{v:.1f}%" for v in df["pct_penalized"]],
            textposition="outside",
            textfont=dict(family=FONT, size=10, color=FED_DARK),
            cliponaxis=False,
            hovertemplate="<b>%{y}</b><br>%{x:.1f}% of pairs penalized<extra></extra>",
        )
    )

    annotations = [
        dict(
            x=NAT_AVG_PCT,
            y=1.02,
            xref="x",
            yref="paper",
            text=f"National average ({NAT_AVG_PCT}%)",
            showarrow=False,
            xanchor="center",
            yanchor="bottom",
            font=dict(family=FONT, size=9, color=FED_OLIVE),
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
            arrowcolor=FED_RED,
            ax=40,
            ay=-28,
            font=dict(family=FONT, size=9, color=FED_RED),
        ),
    ]

    fig.update_layout(
        **base_layout(
            1,
            "States with above-average HRRP penalty exposure",
            (
                "Panel shows states where the share of hospital-condition pairs with an "
                "excess readmission ratio above 1.0 exceeds the 48.1% national average."
            ),
            xaxis=dict(
                title="Share of hospital-condition pairs with ERR > 1.0 (%)",
                range=[0, max(df["pct_penalized"]) * 1.14],
                gridcolor=FED_GRID,
                gridwidth=0.5,
                zeroline=False,
                showline=True,
                linecolor=FED_DARK,
                linewidth=1,
            ),
            yaxis=dict(
                title="",
                categoryorder="array",
                categoryarray=list(df["state"]),
                showgrid=False,
            ),
            shapes=[
                dict(
                    type="line",
                    x0=NAT_AVG_PCT,
                    x1=NAT_AVG_PCT,
                    y0=0,
                    y1=1,
                    yref="paper",
                    line=dict(color=FED_OLIVE, dash="dash", width=1.5),
                )
            ],
            annotations=annotations,
            height=520 + n * 22 + 80,
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
                line=dict(color=FED_GRID, width=2),
                showlegend=False,
                hoverinfo="skip",
            )
        )

    colors = [FED_RED if c == "Hip/Knee" else FED_PRIMARY for c in df["condition"]]
    fig.add_trace(
        go.Scatter(
            x=df["avg_err"],
            y=df["condition"],
            mode="markers+text",
            marker=dict(color=colors, size=11, line=dict(width=0.5, color=FED_DARK)),
            text=[f"{v:.5f}" for v in df["avg_err"]],
            textposition="middle right",
            textfont=dict(family=FONT, size=10, color=FED_DARK),
            hovertemplate="<b>%{y}</b><br>ERR: %{x:.5f}<extra></extra>",
            showlegend=False,
        )
    )

    annotations = [
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
            arrowcolor=FED_RED,
            ax=55,
            ay=-35,
            font=dict(family=FONT, size=9, color=FED_RED),
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
            font=dict(family=FONT, size=9, color=FED_GREY_TEXT),
        ),
    ]

    fig.update_layout(
        **base_layout(
            2,
            "Excess readmission ratio by HRRP condition",
            (
                "All six tracked conditions exceed the 1.0 benchmark; differences are "
                "measured in thousandths of a ratio point."
            ),
            xaxis=dict(
                title="Average excess readmission ratio (ERR)",
                range=[0.9998, 1.0055],
                tickformat=".4f",
                gridcolor=FED_GRID,
                gridwidth=0.5,
                showline=True,
                linecolor=FED_DARK,
                linewidth=1,
            ),
            yaxis=dict(title="", showgrid=False),
            shapes=[
                dict(
                    type="line",
                    x0=1,
                    x1=1,
                    y0=0,
                    y1=1,
                    yref="paper",
                    line=dict(color=FED_DARK, width=1),
                )
            ],
            annotations=annotations,
            height=500,
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

    tier_label_x = {"No Penalty": 0.12, "Low": 0.38, "Medium": 0.62, "High": 0.86}
    tier_annotations = [
        dict(
            x=tier_label_x[tier],
            y=1.06,
            xref="paper",
            yref="paper",
            text=tier,
            showarrow=False,
            xanchor="center",
            font=dict(family=FONT, size=9, color=TIER_COLORS[tier]),
        )
        for tier in tier_order
    ]

    annotations = [
        dict(
            x=0.98,
            y="For-Profit",
            xref="paper",
            yref="y",
            text=f"High-tier share: {high_pct:.1%}",
            showarrow=False,
            xanchor="right",
            font=dict(family=FONT, size=9, color=FED_RED),
        ),
        *tier_annotations,
    ]

    fig.update_layout(
        **base_layout(
            3,
            "HRRP penalty tier distribution by hospital ownership type",
            (
                "Stacked shares sum to 100% within each ownership group. Ownership joined "
                "from CMS Hospital General Information (xubh-q36u)."
            ),
            barmode="stack",
            xaxis=dict(
                title="Share of hospital-condition pairs (%)",
                tickformat=".0%",
                range=[0, 1],
                gridcolor=FED_GRID,
                gridwidth=0.5,
                showline=True,
                linecolor=FED_DARK,
                linewidth=1,
            ),
            yaxis=dict(
                title="",
                categoryorder="array",
                categoryarray=ownership_order,
                showgrid=False,
            ),
            showlegend=False,
            annotations=annotations,
            height=460,
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
