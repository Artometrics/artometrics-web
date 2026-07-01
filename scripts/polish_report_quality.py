#!/usr/bin/env python3
"""Apply conservative editorial polish to generated report artifacts.

This script only fixes mechanical seams that are clearly not editorial intent:
duplicate supplement labels, zero-delta prose, paragraph joins, and one repeated
over-branded conclusion line. It avoids changing data values or chart specs.
"""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"


ZERO_BUCKET_RE = re.compile(
    r"The long tail still holds <strong>0</strong> additional ([^<.]+?) buckets\."
)
ZERO_GAP_RE = re.compile(
    r"<strong>([^<]+)</strong> sits <strong>0\.00</strong> above the median; "
    r"<strong>([^<]+)</strong> trails by <strong>0\.00</strong>\."
)
REWARDS_COUNTING_RE = re.compile(
    r"Measured end to end, <strong>([^<]+)</strong> rewards counting: "
    r"the leaders, the long tail, and the time trend rarely tell the same story about ([^<.]+)\."
)

READING_GUIDE = (
    '<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, '
    "what a non-expert should notice first, and what an expert would challenge in the source. "
    "The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>"
)


def polish(md: str) -> str:
    md = md.replace(
        "</p><p>Findings describe the file on hand",
        "</p>\n<p>Findings describe the file on hand",
    )
    md = md.replace(
        "</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>",
        "</p>\n<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>",
    )
    md = md.replace(
        "That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.",
        "The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.",
    )
    md = REWARDS_COUNTING_RE.sub(
        lambda m: (
            f"Read as a teaching map, <strong>{m.group(1)}</strong> shows why one metric is rarely enough: "
            f"leaders, tails, trends, and relationships each answer a different question about {m.group(2)}."
        ),
        md,
    )
    md = md.replace("CHART 5 — MIX", "SUPPLEMENT — MIX")

    context_marker = (
        "<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. "
        "Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>"
    )
    if context_marker in md and READING_GUIDE not in md:
        md = md.replace(context_marker, context_marker + "\n" + READING_GUIDE)

    md = ZERO_BUCKET_RE.sub(
        "The main bucket carries the story; this field does not have a meaningful long-tail split.",
        md,
    )
    md = ZERO_GAP_RE.sub(
        lambda m: (
            f"<strong>{m.group(1)}</strong> and <strong>{m.group(2)}</strong> both sit very close to the median; "
            "read this chart as a stability check rather than a dramatic gap."
        ),
        md,
    )
    return md


def main() -> None:
    changed = 0
    for path in sorted(BLOG_DIR.glob("*.md")):
        original = path.read_text()
        updated = polish(original)
        if updated == original:
            continue
        path.write_text(updated)
        changed += 1
    print(f"Polished {changed} report files")


if __name__ == "__main__":
    main()
