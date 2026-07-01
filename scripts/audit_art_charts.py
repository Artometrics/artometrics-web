#!/usr/bin/env python3
"""Audit Artometrics chart corpus for editorial chart quality.

This is intentionally heuristic. It ranks charts by visual/data signal and
flags repeated or generic chart patterns so editors know where to cut first.
"""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
DATA_DIR = ROOT / "public" / "data" / "articles"
OUT_PATH = ROOT / "docs" / "chart-corpus-audit.md"


CHART_RE = re.compile(
    r'data-chart="(?P<chart>[^"]+)"[^>]*aria-label="(?P<label>[^"]*)".*?'
    r'<figcaption class="art-chart-caption">(?P<caption>.*?)</figcaption>',
    re.S,
)

GENERIC_WORDS = {
    "breakdown",
    "leaders",
    "distribution",
    "relationship",
    "gap",
    "top",
    "median",
    "value",
    "category",
    "country",
}


@dataclass
class ChartFinding:
    slug: str
    title: str
    chart_id: str
    caption: str
    kind: str
    score: int
    verdict: str
    reasons: list[str]


def clean_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    return re.sub(r"\s+", " ", text).strip()


def frontmatter_value(md: str, key: str) -> str:
    match = re.search(rf"^{re.escape(key)}:\s*['\"]?(.*?)['\"]?$", md, re.M)
    return match.group(1).strip() if match else ""


def read_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text())
    except Exception:
        return {}


def chart_kind(spec: dict[str, Any]) -> str:
    data = spec.get("data") or []
    types = {str(trace.get("type") or "scatter") for trace in data if isinstance(trace, dict)}
    has_hbar = any(
        isinstance(trace, dict) and trace.get("type") == "bar" and trace.get("orientation") == "h"
        for trace in data
    )
    has_vbar = any(
        isinstance(trace, dict) and trace.get("type") == "bar" and trace.get("orientation") != "h"
        for trace in data
    )
    has_line = any(
        isinstance(trace, dict)
        and (trace.get("type") in {None, "scatter"})
        and "line" in str(trace.get("mode", ""))
        for trace in data
    )
    has_markers = any(
        isinstance(trace, dict)
        and (trace.get("type") in {None, "scatter"})
        and "markers" in str(trace.get("mode", ""))
        for trace in data
    )
    if has_hbar:
        return "bar-horizontal"
    if has_vbar:
        return "bar-vertical"
    if "heatmap" in types:
        return "heatmap"
    if {"histogram", "box", "violin"} & types:
        return "distribution"
    if has_line and has_markers:
        return "line-marker"
    if has_line:
        return "line"
    if has_markers:
        return "scatter"
    return "mixed"


def base_score(kind: str) -> int:
    return {
        "line": 82,
        "line-marker": 84,
        "heatmap": 80,
        "scatter": 76,
        "bar-horizontal": 74,
        "bar-vertical": 66,
        "distribution": 58,
        "mixed": 52,
    }.get(kind, 50)


def score_chart(slug: str, chart_id: str, caption: str, spec: dict[str, Any], seen_kinds: Counter[str]) -> tuple[int, list[str]]:
    kind = chart_kind(spec)
    score = base_score(kind)
    reasons: list[str] = [f"{kind} chart"]

    data = spec.get("data") or []
    layout = spec.get("layout") or {}
    trace_count = len(data) if isinstance(data, list) else 0
    shape_count = len(layout.get("shapes") or []) if isinstance(layout, dict) else 0
    annotation_count = len(layout.get("annotations") or []) if isinstance(layout, dict) else 0

    if trace_count > 1:
        score += min(8, trace_count)
        reasons.append("multi-series context")
    if shape_count or annotation_count:
        score += 8
        reasons.append("has guide lines/annotations")
    if re.search(r"(pareto|concentration|gap|trend|growth|map|heatmap|timeline)", chart_id, re.I):
        score += 6
        reasons.append("strong analytical frame")
    if re.search(r"(pad|fallback|extra|alt)", chart_id, re.I):
        score -= 16
        reasons.append("generated filler chart id")

    words = set(re.findall(r"[a-z]+", caption.lower()))
    generic_hits = words & GENERIC_WORDS
    if len(generic_hits) >= 2:
        score -= 9
        reasons.append("generic caption")
    if seen_kinds[kind] >= 1:
        score -= 10 * seen_kinds[kind]
        reasons.append("repeats chart family in article")
    if kind == "distribution" and seen_kinds[kind] >= 1:
        score -= 8
        reasons.append("second distribution rarely earns its slot")
    if kind.startswith("bar") and re.search(r"chart[12]_", chart_id):
        score -= 4
        reasons.append("ranking chart needs a sharper editorial point")
    if slug in {"cia-world-factbook", "college-major-income"} and kind.startswith("bar"):
        score -= 4
        reasons.append("example article needs manual math/editorial review")

    return max(0, min(100, score)), reasons


def verdict(score: int) -> str:
    if score >= 76:
        return "keep"
    if score >= 58:
        return "rework"
    return "drop candidate"


def audit() -> list[ChartFinding]:
    findings: list[ChartFinding] = []
    for md_path in sorted(BLOG_DIR.glob("*.md")):
        md = md_path.read_text()
        slug = frontmatter_value(md, "slug") or md_path.stem
        title = frontmatter_value(md, "title") or slug
        seen_kinds: Counter[str] = Counter()

        for match in CHART_RE.finditer(md):
            chart_url = match.group("chart")
            chart_id = Path(chart_url).stem.replace(".plotly", "")
            caption = clean_html(match.group("caption") or match.group("label") or chart_id)
            json_path = ROOT / "public" / chart_url.lstrip("/")
            spec = read_json(json_path)
            kind = chart_kind(spec)
            score, reasons = score_chart(slug, chart_id, caption, spec, seen_kinds)
            seen_kinds[kind] += 1
            findings.append(
                ChartFinding(
                    slug=slug,
                    title=title,
                    chart_id=chart_id,
                    caption=caption,
                    kind=kind,
                    score=score,
                    verdict=verdict(score),
                    reasons=reasons,
                )
            )
    return findings


def write_report(findings: list[ChartFinding]) -> None:
    by_article: dict[str, list[ChartFinding]] = defaultdict(list)
    for item in findings:
        by_article[item.slug].append(item)

    article_scores = []
    for slug, charts in by_article.items():
        avg = sum(c.score for c in charts) / max(len(charts), 1)
        weak = sum(1 for c in charts if c.verdict == "drop candidate")
        rework = sum(1 for c in charts if c.verdict == "rework")
        article_scores.append((avg, weak, rework, slug, charts[0].title, charts))

    article_scores.sort(key=lambda row: (row[0], -row[1], -row[2]))
    kind_counts = Counter(c.kind for c in findings)
    verdict_counts = Counter(c.verdict for c in findings)

    lines = [
        "# Artometrics chart corpus audit",
        "",
        "This is a heuristic editorial audit of charts embedded in `src/content/blog/*.md`.",
        "It is meant to prioritize design and chart-selection work, not to validate the math.",
        "",
        "## Corpus summary",
        "",
        f"- Charts audited: {len(findings)}",
        f"- Articles with charts: {len(by_article)}",
        f"- Keep: {verdict_counts['keep']}",
        f"- Rework: {verdict_counts['rework']}",
        f"- Drop candidates: {verdict_counts['drop candidate']}",
        "",
        "## Chart families",
        "",
    ]

    for kind, count in kind_counts.most_common():
        lines.append(f"- {kind}: {count}")

    lines += [
        "",
        "## Lowest-scoring articles to review first",
        "",
        "| Rank | Article | Avg score | Drop | Rework | Why first |",
        "|---:|---|---:|---:|---:|---|",
    ]

    for rank, (avg, weak, rework, slug, title, charts) in enumerate(article_scores[:20], 1):
        weakest = sorted(charts, key=lambda c: c.score)[:2]
        why = "; ".join(f"{c.chart_id} ({c.verdict})" for c in weakest)
        lines.append(
            f"| {rank} | `{slug}` | {avg:.1f} | {weak} | {rework} | {why} |"
        )

    lines += [
        "",
        "## Weakest individual charts",
        "",
        "| Score | Verdict | Article | Chart | Kind | Caption | Reasons |",
        "|---:|---|---|---|---|---|---|",
    ]

    for item in sorted(findings, key=lambda c: c.score)[:50]:
        reasons = "; ".join(item.reasons)
        lines.append(
            f"| {item.score} | {item.verdict} | `{item.slug}` | `{item.chart_id}` | "
            f"{item.kind} | {item.caption} | {reasons} |"
        )

    lines += [
        "",
        "## Editorial guidance",
        "",
        "- Keep charts that show change over time, concentration, dispersion with context, or a surprising relationship.",
        "- Rework generic leaderboards into claims: who is leading, by how much, and why that matters.",
        "- Drop repeated chart families inside the same article unless the second version answers a different question.",
        "- Prefer portrait/mobile-friendly story cards for social sharing: headline, subtitle, plot, source, and one annotation.",
        "- The next manual pass should start with low-scoring articles and replace filler charts with fewer, stronger figures.",
        "",
    ]

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text("\n".join(lines) + "\n")


def main() -> None:
    findings = audit()
    write_report(findings)
    print(f"Wrote {OUT_PATH.relative_to(ROOT)} with {len(findings)} chart findings")


if __name__ == "__main__":
    main()
