#!/usr/bin/env python3
"""Backfill static PNG exports for Plotly JSON charts missing data-fallback files.

Writes PNGs next to the expected R/print path:
  public/images/content/articles/<slug>/charts/<stem>.png

Also patches blog markdown to add matching data-fallback attributes when missing.
Optionally writes a lightweight standalone interactive HTML sibling:
  public/data/articles/<slug>/charts/<stem>.html
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import plotly.graph_objects as go
import plotly.io as pio

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
PUBLIC = ROOT / "public"

CHART_DIV_RE = re.compile(
    r'(<div class="art-chart-live")(?P<attrs>[^>]*)(>)',
    re.S,
)


_STRIP_TRACE_KEYS = {"frame", "uid", "frames"}


def _clean_trace(trace: object) -> object:
    if not isinstance(trace, dict):
        return trace
    cleaned = {k: v for k, v in trace.items() if k not in _STRIP_TRACE_KEYS}
    # Nested legacy color arrays are fine; drop empty transforms that break kaleido.
    if cleaned.get("transforms") in (None, [], {}):
        cleaned.pop("transforms", None)
    return cleaned


def _sanitize_layout(layout: dict) -> dict:
    layout = dict(layout)
    layout.pop("template", None)  # avoid missing template deps in export
    # ggplotly / older plotly used yanchor="center"; modern enum is "middle".
    annotations = layout.get("annotations")
    if isinstance(annotations, list):
        fixed = []
        for ann in annotations:
            if not isinstance(ann, dict):
                fixed.append(ann)
                continue
            a = dict(ann)
            if a.get("yanchor") == "center":
                a["yanchor"] = "middle"
            if a.get("xanchor") == "centre":
                a["xanchor"] = "center"
            fixed.append(a)
        layout["annotations"] = fixed
    return layout


def load_fig(json_path: Path) -> go.Figure:
    payload = json.loads(json_path.read_text(encoding="utf-8"))
    data = [_clean_trace(t) for t in (payload.get("data") or [])]
    layout = _sanitize_layout(dict(payload.get("layout") or {}))
    # Keep source layout; apply light print defaults only when missing.
    layout.setdefault("paper_bgcolor", "#FAFAF8")
    layout.setdefault("plot_bgcolor", "#FAFAF8")
    layout.setdefault(
        "font",
        {"family": "Georgia, serif", "color": "#1C1C1E"},
    )
    # skip_invalid tolerates leftover ggplotly keys across Plotly versions.
    fig = go.Figure(data=data, layout=layout, skip_invalid=True)
    return fig


def write_png(fig: go.Figure, png_path: Path) -> None:
    png_path.parent.mkdir(parents=True, exist_ok=True)
    fig.write_image(str(png_path), width=1200, height=700, scale=2)


def write_html(fig: go.Figure, html_path: Path, title: str) -> None:
    html_path.parent.mkdir(parents=True, exist_ok=True)
    fig.write_html(
        str(html_path),
        include_plotlyjs="cdn",
        full_html=True,
        config={"responsive": True, "displayModeBar": False},
        div_id="art-chart",
    )
    # Tiny brand title for standalone opens.
    text = html_path.read_text(encoding="utf-8")
    if "<title>" in text:
        text = re.sub(r"<title>.*?</title>", f"<title>{title} — Artometrics</title>", text, count=1)
    else:
        text = text.replace("<head>", f"<head><title>{title} — Artometrics</title>", 1)
    html_path.write_text(text, encoding="utf-8")


def expected_png_for_chart(chart_url: str) -> Path:
    # /data/articles/<slug>/charts/<stem>.plotly.json
    # -> /images/content/articles/<slug>/charts/<stem>.png
    parts = chart_url.strip("/").split("/")
    if "articles" not in parts or "charts" not in parts:
        raise ValueError(f"Unexpected chart url: {chart_url}")
    ai = parts.index("articles")
    slug = parts[ai + 1]
    stem = Path(parts[-1]).name.replace(".plotly.json", "")
    return PUBLIC / "images" / "content" / "articles" / slug / "charts" / f"{stem}.png"


def html_path_for_json(json_path: Path) -> Path:
    name = json_path.name
    if name.endswith(".plotly.json"):
        return json_path.with_name(name.replace(".plotly.json", ".html"))
    return json_path.with_suffix(".html")


def patch_markdown_fallbacks(md_path: Path) -> int:
    text = md_path.read_text(encoding="utf-8")
    changed = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal changed
        prefix, attrs, suffix = match.group(1), match.group("attrs"), match.group(3)
        if "data-fallback=" in attrs:
            return match.group(0)
        chart_m = re.search(r'data-chart="([^"]+)"', attrs)
        if not chart_m:
            return match.group(0)
        chart_url = chart_m.group(1)
        try:
            png = expected_png_for_chart(chart_url)
        except ValueError:
            return match.group(0)
        # Only add attr when PNG exists (or will exist after this run).
        rel = "/" + str(png.relative_to(PUBLIC)).replace("\\", "/")
        attrs = attrs.rstrip() + f' data-fallback="{rel}"'
        changed += 1
        return f"{prefix}{attrs}{suffix}"

    new_text = CHART_DIV_RE.sub(repl, text)
    if new_text != text:
        md_path.write_text(new_text, encoding="utf-8")
    return changed


def iter_referenced_charts() -> list[tuple[str, Path, Path, Path]]:
    """Return (chart_url, json_path, png_path, html_path) for every blog embed."""
    out: list[tuple[str, Path, Path, Path]] = []
    seen: set[str] = set()
    for md in sorted(BLOG_DIR.glob("*.md")):
        text = md.read_text(encoding="utf-8", errors="replace")
        for m in re.finditer(r'data-chart="([^"]+)"', text):
            url = m.group(1)
            if url in seen:
                continue
            seen.add(url)
            json_path = PUBLIC / url.lstrip("/")
            png_path = expected_png_for_chart(url)
            html_path = html_path_for_json(json_path)
            out.append((url, json_path, png_path, html_path))
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Rewrite existing PNGs/HTML")
    parser.add_argument("--skip-html", action="store_true", help="Do not write standalone .html")
    parser.add_argument("--patch-only", action="store_true", help="Only patch markdown fallbacks")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    charts = iter_referenced_charts()
    if args.limit:
        charts = charts[: args.limit]

    written_png = 0
    written_html = 0
    skipped = 0
    failed: list[str] = []

    if not args.patch_only:
        for url, json_path, png_path, html_path in charts:
            if not json_path.exists():
                failed.append(f"missing json: {url}")
                continue
            need_png = args.force or not png_path.exists()
            need_html = (not args.skip_html) and (args.force or not html_path.exists())
            if not need_png and not need_html:
                skipped += 1
                continue
            try:
                fig = load_fig(json_path)
                title = Path(url).name.replace(".plotly.json", "").replace("_", " ")
                if need_png:
                    write_png(fig, png_path)
                    written_png += 1
                    print(f"png  {png_path.relative_to(ROOT)}")
                if need_html:
                    write_html(fig, html_path, title)
                    written_html += 1
                    print(f"html {html_path.relative_to(ROOT)}")
            except Exception as exc:  # noqa: BLE001
                failed.append(f"{url}: {exc}")
                print(f"FAIL {url}: {exc}", file=sys.stderr)

    patched = 0
    for md in sorted(BLOG_DIR.glob("*.md")):
        patched += patch_markdown_fallbacks(md)

    print(
        json.dumps(
            {
                "referenced": len(charts),
                "written_png": written_png,
                "written_html": written_html,
                "skipped": skipped,
                "patched_fallback_attrs": patched,
                "failed": len(failed),
            },
            indent=2,
        )
    )
    if failed:
        for row in failed[:20]:
            print(row, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
