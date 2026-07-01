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
UI_OUT_PATH = ROOT / "docs" / "chart-ui-design-audit.md"


CHART_RE = re.compile(
    r'<div class="art-chart-live"(?P<attrs>[^>]*)data-chart="(?P<chart>[^"]+)"(?P<attrs_after>[^>]*)>.*?'
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
    ui_score: int
    ui_verdict: str
    ui_reasons: list[str]
    source: str


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


def attr_value(attrs: str, name: str) -> str:
    match = re.search(rf'{re.escape(name)}="([^"]*)"', attrs)
    return clean_html(match.group(1)) if match else ""


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
    if re.search(r"(pareto|concentration|gap|trend|growth|map|heatmap|timeline|drought|conversion|value|race|era|gaps|titles)", chart_id, re.I):
        score += 6
        reasons.append("strong analytical frame")
    if re.search(r"(?:^|[_-])(pad|fallback|extra|alt)(?:[_-]|$)", chart_id, re.I):
        score -= 16
        reasons.append("generated filler chart id")

    words = set(re.findall(r"[a-z]+", caption.lower()))
    generic_hits = words & GENERIC_WORDS
    if len(generic_hits) >= 2:
        score -= 9
        reasons.append("generic caption")
    repeat_penalty = 6 * seen_kinds[kind]
    if re.search(r"(drought|conversion|value|race|era|gaps|titles)", chart_id, re.I):
        repeat_penalty = max(0, repeat_penalty - 5)
    if seen_kinds[kind] >= 1:
        score -= repeat_penalty
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


def ui_verdict(score: int) -> str:
    if score >= 82:
        return "publication-ready"
    if score >= 65:
        return "needs polish"
    return "rework before publishing"


def trace_point_count(trace: dict[str, Any]) -> int:
    for key in ("x", "y", "z"):
        value = trace.get(key)
        if isinstance(value, list):
            return len(value)
        if isinstance(value, dict) and isinstance(value.get("bdata"), str):
            # Plotly typed-array payloads usually include one vector per trace; exact
            # count is not cheap to decode here, but this flags compact exports.
            return 1
    return 0


def has_title_and_subtitle(layout: dict[str, Any]) -> bool:
    title = layout.get("title") or {}
    text = title.get("text", "") if isinstance(title, dict) else str(title)
    return bool(text.strip()) and bool(re.search(r"<br\s*/?>", text, re.I))


def has_rendered_headline(layout: dict[str, Any], caption: str) -> bool:
    title = layout.get("title") or {}
    text = title.get("text", "") if isinstance(title, dict) else str(title)
    if text.strip():
        return True
    return len(caption.split()) >= 3


def has_named_legend(data: list[dict[str, Any]], layout: dict[str, Any]) -> bool:
    if not layout.get("showlegend") and not layout.get("legend"):
        return True
    return all(bool(str(trace.get("name", "")).strip()) for trace in data)


def ui_score_chart(
    *,
    caption: str,
    source: str,
    spec: dict[str, Any],
    editorial_score: int,
    has_references: bool,
) -> tuple[int, list[str]]:
    score = 100
    reasons: list[str] = []
    data = [trace for trace in (spec.get("data") or []) if isinstance(trace, dict)]
    layout = spec.get("layout") if isinstance(spec.get("layout"), dict) else {}
    kind = chart_kind(spec)
    trace_count = len(data)
    total_points = sum(trace_point_count(trace) for trace in data)

    if not has_rendered_headline(layout, caption):
        score -= 14
        reasons.append("missing rendered headline")
    elif not has_title_and_subtitle(layout):
        score -= 3
        reasons.append("uses caption as rendered headline; custom subtitle recommended")
    if not source and not has_references:
        score -= 12
        reasons.append("missing chart source credit and report references")
    elif not source:
        reasons.append("uses runtime source fallback to report references")
    if not caption or len(caption.split()) <= 2:
        score -= 10
        reasons.append("caption too generic for casual viewers")
    if editorial_score < 58:
        score -= 14
        reasons.append("weak editorial premise")
    elif editorial_score < 76:
        score -= 6
        reasons.append("editorial premise needs sharper framing")

    hover_missing = [
        trace for trace in data if not str(trace.get("hovertemplate", "")).strip()
    ]
    if hover_missing:
        score -= min(6, 2 * len(hover_missing))
        reasons.append("runtime supplies fallback hover/tap context; custom hover recommended")

    if not has_named_legend(data, layout):
        score -= 3
        reasons.append("runtime names missing legend series; custom legend labels recommended")

    text_traces = [
        trace
        for trace in data
        if "text" in str(trace.get("mode", "")) and isinstance(trace.get("text"), list)
    ]
    if any(len(trace.get("text") or []) > 14 for trace in text_traces):
        score -= 3
        reasons.append("runtime hides dense always-visible labels; manual callouts recommended")

    if trace_count > 8:
        score -= min(8, max(2, trace_count - 8))
        reasons.append("many traces can overwhelm casual viewers")
    if total_points > 60:
        score -= 4
        reasons.append("dense plot needs simplification or stronger annotations")
    if kind == "scatter" and total_points > 20:
        score -= 3
        reasons.append("scatterplot may need clearer callouts")
    if kind == "bar-vertical" and total_points > 12:
        score -= 4
        reasons.append("many vertical categories risk cramped mobile labels")

    if not reasons:
        reasons.append("clear headline, source, hover context, and manageable density")
    return max(0, min(100, score)), reasons


def audit() -> list[ChartFinding]:
    findings: list[ChartFinding] = []
    for md_path in sorted(BLOG_DIR.glob("*.md")):
        md = md_path.read_text()
        slug = frontmatter_value(md, "slug") or md_path.stem
        title = frontmatter_value(md, "title") or slug
        seen_kinds: Counter[str] = Counter()
        has_references = bool(re.search(r'id="references"|#references|REFERENCES', md))

        for match in CHART_RE.finditer(md):
            chart_url = match.group("chart")
            chart_id = Path(chart_url).stem.replace(".plotly", "")
            attrs = f'{match.group("attrs")} {match.group("attrs_after")}'
            label = attr_value(attrs, "aria-label")
            source = attr_value(attrs, "data-source")
            caption = clean_html(match.group("caption") or label or chart_id)
            json_path = ROOT / "public" / chart_url.lstrip("/")
            spec = read_json(json_path)
            kind = chart_kind(spec)
            score, reasons = score_chart(slug, chart_id, caption, spec, seen_kinds)
            ui_score, ui_reasons = ui_score_chart(
                caption=caption,
                source=source,
                spec=spec,
                editorial_score=score,
                has_references=has_references,
            )
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
                    ui_score=ui_score,
                    ui_verdict=ui_verdict(ui_score),
                    ui_reasons=ui_reasons,
                    source=source,
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


def write_ui_report(findings: list[ChartFinding]) -> None:
    ui_counts = Counter(item.ui_verdict for item in findings)
    by_article: dict[str, list[ChartFinding]] = defaultdict(list)
    for item in findings:
        by_article[item.slug].append(item)

    article_scores = []
    for slug, charts in by_article.items():
        avg = sum(c.ui_score for c in charts) / max(len(charts), 1)
        blockers = sum(1 for c in charts if c.ui_verdict == "rework before publishing")
        polish = sum(1 for c in charts if c.ui_verdict == "needs polish")
        article_scores.append((avg, blockers, polish, slug, charts[0].title, charts))
    article_scores.sort(key=lambda row: (row[0], -row[1], -row[2]))

    issue_counts: Counter[str] = Counter()
    for item in findings:
        issue_counts.update(item.ui_reasons)

    lines = [
        "# Artometrics chart UI/design audit",
        "",
        "This audit focuses on graphic design and casual-viewer usability rather than statistical truth.",
        "It checks whether each chart has a clear headline/subtitle, useful hover/tap context, source credit, manageable label density, named legends, and enough editorial premise to feel publication-ready.",
        "",
        "## UI summary",
        "",
        f"- Charts audited: {len(findings)}",
        f"- Publication-ready: {ui_counts['publication-ready']}",
        f"- Needs polish: {ui_counts['needs polish']}",
        f"- Rework before publishing: {ui_counts['rework before publishing']}",
        "",
        "## Most common UI/design issues",
        "",
    ]

    for issue, count in issue_counts.most_common(12):
        lines.append(f"- {issue}: {count}")

    lines += [
        "",
        "## Articles with the most UI risk",
        "",
        "| Rank | Article | Avg UI score | Rework | Polish | Weakest charts |",
        "|---:|---|---:|---:|---:|---|",
    ]
    for rank, (avg, blockers, polish, slug, title, charts) in enumerate(article_scores[:24], 1):
        weakest = sorted(charts, key=lambda c: c.ui_score)[:3]
        why = "; ".join(f"{c.chart_id} ({c.ui_score})" for c in weakest)
        lines.append(f"| {rank} | `{slug}` | {avg:.1f} | {blockers} | {polish} | {why} |")

    lines += [
        "",
        "## Lowest-scoring chart UI findings",
        "",
        "| UI | Verdict | Article | Chart | Kind | Caption | Issues |",
        "|---:|---|---|---|---|---|---|",
    ]
    for item in sorted(findings, key=lambda c: c.ui_score)[:75]:
        issues = "; ".join(item.ui_reasons)
        lines.append(
            f"| {item.ui_score} | {item.ui_verdict} | `{item.slug}` | `{item.chart_id}` | "
            f"{item.kind} | {item.caption} | {issues} |"
        )

    lines += [
        "",
        "## Automated rework already applied",
        "",
        "- Runtime now hides dense always-visible scatter labels and moves them into hover/tap.",
        "- Runtime now supplies default hover templates when Plotly JSON lacks useful hover context.",
        "- Runtime now names missing legend series as `Series N` so legends are never blank.",
        "- Runtime already locks zoom/pan, hides the modebar, preserves top headline/subtitle, and shows chart source credits from `data-source` or report references.",
        "",
        "## Manual rework standard",
        "",
        "- Replace generic captions like `Top Country` or `Relationship` with a claim.",
        "- Prefer one annotated insight over many unlabeled points.",
        "- Remove filler charts (`chart_extra`, `chart_pad`, `chart_fallback`) unless rewritten around a real thesis.",
        "- Keep five-chart packages only when all five charts answer different reader questions.",
        "",
    ]
    UI_OUT_PATH.write_text("\n".join(lines) + "\n")


def main() -> None:
    findings = audit()
    write_report(findings)
    write_ui_report(findings)
    print(f"Wrote {OUT_PATH.relative_to(ROOT)} and {UI_OUT_PATH.relative_to(ROOT)} with {len(findings)} chart findings")


if __name__ == "__main__":
    main()
