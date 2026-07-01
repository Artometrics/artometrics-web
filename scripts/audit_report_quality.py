#!/usr/bin/env python3
"""Audit Artometrics reports for publication-readiness and teaching quality.

This complements chart audits by looking at the article around the chart:
structure, source clarity, tone, explanatory depth, generated prose artifacts,
and whether a smart non-expert can learn from the report without being talked
down to.
"""

from __future__ import annotations

import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
OUT_PATH = ROOT / "docs" / "report-quality-audit.md"

REQUIRED_SECTIONS = [
    "FAST FACTS",
    "DATASET CONTEXT",
    "CONCLUSION",
    "REFERENCES",
    "EDITOR'S NOTE",
]
TEACHER_SIGNALS = [
    "hypothesis",
    "question",
    "means",
    "why",
    "because",
    "for a",
    "the point",
    "the useful",
    "what",
    "how",
    "limitation",
    "source",
]
ABSTRACT_WORDS = [
    "machine",
    "system",
    "architecture",
    "power",
    "identity",
    "signal",
    "framework",
    "mythology",
    "engine",
]
GENERATED_ARTIFACTS = [
    "0 additional",
    "0.00 above the median",
    "0.00 below the median",
    "rewards counting",
    "disciplines it",
    "chart_pad",
    "chart_fallback",
]
GENERIC_CAPTIONS = {
    "Top Country",
    "Top Name",
    "Top Title",
    "Value Distribution",
    "Appearance Spread",
    "Relationship",
    "Distribution",
    "Category",
    "Line",
    "Id",
}


@dataclass
class Finding:
    slug: str
    title: str
    score: int
    verdict: str
    reasons: list[str]
    word_count: int
    chart_count: int


def clean_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def frontmatter_value(md: str, key: str) -> str:
    match = re.search(rf"^{re.escape(key)}:\s*['\"]?(.*?)['\"]?$", md, re.M)
    return match.group(1).strip() if match else ""


def h2_titles(md: str) -> list[str]:
    return [clean_html(match) for match in re.findall(r"<h2[^>]*>(.*?)</h2>", md, re.S)]


def chart_captions(md: str) -> list[str]:
    return [clean_html(match) for match in re.findall(r'<figcaption class="art-chart-caption">(.*?)</figcaption>', md, re.S)]


def chart_numbers(md: str) -> list[str]:
    return [
        match
        for title in h2_titles(md)
        for match in re.findall(r"CHART\s+(\d+)", title, re.I)
    ]


def verdict(score: int) -> str:
    if score >= 84:
        return "publication-ready"
    if score >= 70:
        return "needs editorial polish"
    return "rework before publishing"


def audit_article(path: Path) -> Finding:
    md = path.read_text()
    slug = frontmatter_value(md, "slug") or path.stem
    title = frontmatter_value(md, "title") or slug
    text = clean_html(md)
    words = re.findall(r"[A-Za-z][A-Za-z'-]*", text)
    word_count = len(words)
    charts = chart_captions(md)
    chart_count = len(charts)
    sections = h2_titles(md)
    score = 100
    reasons: list[str] = []

    missing_sections = [section for section in REQUIRED_SECTIONS if section not in sections]
    if missing_sections:
        score -= 4 * len(missing_sections)
        reasons.append("missing required sections: " + ", ".join(missing_sections))

    if chart_count and chart_count != 5:
        if not (chart_count > 5 and "SUPPLEMENT" in text):
            score -= 8
            reasons.append(f"expected 5 charts, found {chart_count}")

    nums = chart_numbers(md)
    duplicates = [num for num, count in Counter(nums).items() if count > 1]
    if duplicates:
        score -= 10
        reasons.append("duplicate chart numbering")

    generic = [caption for caption in charts if caption in GENERIC_CAPTIONS or len(caption.split()) <= 2]
    if generic:
        score -= min(18, 3 * len(generic))
        reasons.append("generic chart captions: " + ", ".join(generic[:4]))

    source_attrs = len(re.findall(r'data-source="', md))
    if chart_count and source_attrs < chart_count and "REFERENCES" not in sections:
        score -= 12
        reasons.append("chart sources not explicit and references missing")
    elif chart_count and source_attrs < chart_count:
        score -= 3
        reasons.append("some chart sources rely on report references")

    artifacts = [item for item in GENERATED_ARTIFACTS if item.lower() in md.lower()]
    if artifacts:
        score -= min(24, 6 * len(artifacts))
        reasons.append("generated prose artifacts: " + ", ".join(artifacts))

    teacher_hits = sum(1 for signal in TEACHER_SIGNALS if signal in text.lower())
    if teacher_hits < 5:
        score -= 10
        reasons.append("needs more teacher-like explanation/definitions")

    abstract_hits = sum(text.lower().count(word) for word in ABSTRACT_WORDS)
    if word_count and abstract_hits / max(word_count, 1) > 0.035:
        score -= 8
        reasons.append("abstract language may outpace concrete explanation")

    if word_count < 650 and chart_count >= 5:
        score -= 8
        reasons.append("thin prose for a five-chart report")
    elif word_count > 4500:
        score -= 3
        reasons.append("long report needs strong scannability")

    if "editorial index" in text.lower() and "not formal" not in text.lower() and "not official" not in text.lower():
        score -= 8
        reasons.append("editorial indices need clearer disclosure")

    if not reasons:
        reasons.append("complete structure, clear teaching path, sources, and claim-style charts")

    score = max(0, min(100, score))
    return Finding(slug, title, score, verdict(score), reasons, word_count, chart_count)


def write_report(findings: list[Finding]) -> None:
    counts = Counter(item.verdict for item in findings)
    issue_counts: Counter[str] = Counter()
    for item in findings:
        issue_counts.update(item.reasons)

    lines = [
        "# Artometrics report quality audit",
        "",
        "This audit checks article-level publication readiness: structure, source clarity, explanatory tone, chart-caption specificity, report length, and generated-prose artifacts.",
        "It is intentionally heuristic; use it as an editorial checklist, not as a substitute for human review.",
        "",
        "## Summary",
        "",
        f"- Reports audited: {len(findings)}",
        f"- Publication-ready: {counts['publication-ready']}",
        f"- Needs editorial polish: {counts['needs editorial polish']}",
        f"- Rework before publishing: {counts['rework before publishing']}",
        "",
        "## Most common issues",
        "",
    ]
    for issue, count in issue_counts.most_common(14):
        lines.append(f"- {issue}: {count}")

    lines += [
        "",
        "## Lowest-scoring reports",
        "",
        "| Score | Verdict | Report | Words | Charts | Issues |",
        "|---:|---|---|---:|---:|---|",
    ]
    for item in sorted(findings, key=lambda row: row.score)[:40]:
        lines.append(
            f"| {item.score} | {item.verdict} | `{item.slug}` | {item.word_count} | {item.chart_count} | "
            f"{'; '.join(item.reasons)} |"
        )

    lines += [
        "",
        "## Teacher-of-the-year checklist",
        "",
        "- Start with the reader's question, not the dataset's column names.",
        "- Explain what a metric means before asking the reader to care about it.",
        "- Make every chart caption a claim, not a field label.",
        "- Show the expert path (source, assumptions, caveats) without blocking the beginner path.",
        "- Avoid grand abstractions unless the next sentence cashes them out into a mechanism or data point.",
        "- Distinguish observed source data, derived metrics, and editorial indices.",
        "- Keep five-chart reports focused: each chart should answer a different reader question.",
        "- If a chart is a framework or hypothesis map, say so plainly.",
        "",
    ]

    OUT_PATH.write_text("\n".join(lines))


def main() -> None:
    findings = [audit_article(path) for path in sorted(BLOG_DIR.glob("*.md"))]
    write_report(findings)
    print(f"Wrote {OUT_PATH.relative_to(ROOT)} with {len(findings)} report findings")


if __name__ == "__main__":
    main()
