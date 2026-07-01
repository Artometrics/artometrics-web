#!/usr/bin/env python3
"""Normalize Plotly JSON charts toward publication-ready defaults.

The client runtime can rescue old charts, but the source specs should carry the
same editorial quality: a claim headline, a compact subtitle, useful hover/tap
text, and named legend series. This script derives safe metadata from the report
HTML without changing data values.
"""

from __future__ import annotations

import json
import re
from html import unescape
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
PUBLIC_DIR = ROOT / "public"

CHART_RE = re.compile(
    r'<div class="art-chart-live"(?P<attrs>[^>]*)data-chart="(?P<chart>[^"]+)"(?P<attrs_after>[^>]*)>.*?'
    r'<figcaption class="art-chart-caption">(?P<caption>.*?)</figcaption>',
    re.S,
)


def clean_html(text: str) -> str:
    text = unescape(text)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def attr_value(attrs: str, name: str) -> str:
    match = re.search(rf'{re.escape(name)}="([^"]*)"', attrs)
    return clean_html(match.group(1)) if match else ""


def chart_kind(data: list[dict[str, Any]]) -> str:
    has_hbar = any(trace.get("type") == "bar" and trace.get("orientation") == "h" for trace in data)
    has_vbar = any(trace.get("type") == "bar" and trace.get("orientation") != "h" for trace in data)
    has_heatmap = any(trace.get("type") == "heatmap" for trace in data)
    has_line = any(
        trace.get("type") in {None, "scatter"} and "line" in str(trace.get("mode", ""))
        for trace in data
    )
    has_markers = any(
        trace.get("type") in {None, "scatter"} and "markers" in str(trace.get("mode", ""))
        for trace in data
    )
    if has_hbar:
        return "ranked bar"
    if has_vbar:
        return "period or category bar"
    if has_heatmap:
        return "matrix view"
    if has_line and has_markers:
        return "trend with milestones"
    if has_line:
        return "trend line"
    if has_markers:
        return "scatter field"
    return "summary view"


def source_label(source: str) -> str:
    if not source:
        return "source cited in report references"
    source = re.sub(r"^Data:\s*", "", source).replace(" - ARTOMETRICS", "").strip()
    return source[:90]


def needs_title(layout: dict[str, Any]) -> bool:
    title = layout.get("title") or {}
    text = title.get("text", "") if isinstance(title, dict) else str(title)
    return not text.strip() or "<br" not in text.lower()


def title_text(caption: str, kind: str, source: str) -> str:
    subtitle = f"{kind.title()} - {source_label(source)}"
    return f"{caption}<br><span style='font-size:12px;color:#6B6B6B'>{subtitle}</span>"


def ensure_hover_template(trace: dict[str, Any], index: int) -> bool:
    if str(trace.get("hovertemplate", "")).strip():
        return False

    if trace.get("type") == "bar":
        if trace.get("orientation") == "h":
            trace["hovertemplate"] = "<b>%{y}</b><br>Value: %{x:,}<extra></extra>"
        else:
            trace["hovertemplate"] = "<b>%{x}</b><br>Value: %{y:,}<extra></extra>"
        return True

    if trace.get("type") == "heatmap":
        trace["hovertemplate"] = "<b>%{y}</b><br>%{x}: %{z}<extra></extra>"
        return True

    if isinstance(trace.get("text"), list):
        trace["hovertemplate"] = "<b>%{text}</b><br>x: %{x}<br>y: %{y}<extra></extra>"
        return True

    trace["hovertemplate"] = f"<b>Series {index + 1}</b><br>x: %{{x}}<br>y: %{{y}}<extra></extra>"
    return True


def ensure_legend_name(trace: dict[str, Any], index: int, needs_legend: bool) -> bool:
    if not needs_legend or str(trace.get("name", "")).strip():
        return False
    trace["name"] = f"Series {index + 1}"
    return True


def declutter_scatter_text(trace: dict[str, Any]) -> bool:
    if trace.get("type") not in {None, "scatter"}:
        return False
    mode = str(trace.get("mode", ""))
    text = trace.get("text")
    if "text" not in mode or not isinstance(text, list) or len(text) <= 14:
        return False
    trace["mode"] = re.sub(r"\+?text|text\+?", "", mode).strip("+") or "markers"
    ensure_hover_template(trace, 0)
    return True


def normalize_spec(spec: dict[str, Any], caption: str, source: str) -> bool:
    changed = False
    data = [trace for trace in spec.get("data") or [] if isinstance(trace, dict)]
    layout = spec.setdefault("layout", {})
    if not isinstance(layout, dict):
        spec["layout"] = layout = {}

    kind = chart_kind(data)
    if caption and needs_title(layout):
        existing = layout.get("title") if isinstance(layout.get("title"), dict) else {}
        layout["title"] = {
            **(existing if isinstance(existing, dict) else {}),
            "text": title_text(caption, kind, source),
            "x": 0,
            "xanchor": "left",
        }
        changed = True

    needs_legend = bool(layout.get("showlegend") or layout.get("legend"))
    for index, trace in enumerate(data):
        changed = ensure_hover_template(trace, index) or changed
        changed = ensure_legend_name(trace, index, needs_legend) or changed
        changed = declutter_scatter_text(trace) or changed

    return changed


def main() -> None:
    changed = 0
    for md_path in sorted(BLOG_DIR.glob("*.md")):
        md = md_path.read_text()
        for match in CHART_RE.finditer(md):
            attrs = f'{match.group("attrs")} {match.group("attrs_after")}'
            chart_url = match.group("chart")
            json_path = PUBLIC_DIR / chart_url.lstrip("/")
            if not json_path.exists():
                continue
            spec = json.loads(json_path.read_text())
            caption = clean_html(match.group("caption"))
            source = attr_value(attrs, "data-source")
            if normalize_spec(spec, caption, source):
                json_path.write_text(json.dumps(spec, indent=2, ensure_ascii=False) + "\n")
                changed += 1
    print(f"Normalized {changed} Plotly chart specs")


if __name__ == "__main__":
    main()
