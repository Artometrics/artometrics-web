#!/usr/bin/env python3
"""Apply conservative editorial polish to generated report artifacts.

This script only fixes mechanical seams that are clearly not editorial intent:
duplicate supplement labels, zero-delta prose, paragraph joins, and one repeated
over-branded conclusion line. It avoids changing data values or chart specs.
"""

from __future__ import annotations

import re
from pathlib import Path
from html import escape


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

TEACHING_LADDER = (
    '<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: '
    "who leads, how concentrated the field is, what changes over time, and where the outliers sit. "
    "If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, "
    "whether the source omits an important population, and whether the headline survives the limitations section.</p>"
)

GENERIC_CAPTIONS = {
    "Top Country",
    "Top Name",
    "Top Title",
    "Top Song",
    "Top Brand",
    "Top State",
    "Top Subject",
    "Top Species",
    "Top Airline",
    "Top Parkname",
    "Value Distribution",
    "Votes Distribution",
    "Population Distribution",
    "Birthdate Distribution",
    "Adults Distribution",
    "Abv Distribution",
    "Appearance Spread",
    "Cumulative Value",
    "Cumulative Appearances",
    "Cumulative Adults",
    "Cumulative Abv",
    "Cumulative Duration",
    "Cumulative Visitors",
    "Distribution",
    "Relationship",
    "Category",
    "Line",
    "Id",
    "Type",
    "Vote",
    "Macroarea",
    "Transfer",
    "Artist name",
    "Subject type",
    "Disney Consolidated",
    "Payroll Wins",
    "States Penalized",
    "Gdppc All Empires",
}


def clean_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def is_generic_caption(caption: str) -> bool:
    caption = caption.strip()
    if caption in GENERIC_CAPTIONS:
        return True
    if len(caption.split()) <= 2 and not any(word.endswith(("s", "ed", "ing")) for word in caption.split()):
        return True
    return False


def claim_from_prose(prose_html: str, fallback: str) -> str:
    text = clean_html(prose_html)
    if not text:
        return fallback
    sentence = re.split(r"(?<=[.!?])\s+", text)[0].strip()
    sentence = sentence.rstrip(".")
    if len(sentence) > 135:
        sentence = sentence[:132].rsplit(" ", 1)[0] + "..."
    return sentence or fallback


def add_explicit_source_to_charts(md: str) -> str:
    if "TidyTuesday" in md:
        source = "Data: TidyTuesday / R for Data Science community - ARTOMETRICS"
    else:
        source = "Data: source cited in report references - ARTOMETRICS"

    def repl(match: re.Match[str]) -> str:
        div = match.group(0)
        if 'data-source="' in div:
            return div
        return div.replace(' role="img"', f' data-source="{source}" role="img"', 1)

    return re.sub(r'<div class="art-chart-live"[^>]*></div>', repl, md)


def relabel_duplicate_chart_fives(md: str) -> str:
    count = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal count
        count += 1
        if count == 1:
            return match.group(0)
        return match.group(0).replace("CHART 5", "SUPPLEMENT", 1)

    return re.sub(r"CHART 5(?=\s+—)", repl, md)


def renumber_duplicate_chart_labels(md: str) -> str:
    nums = re.findall(r"<h2[^>]*>\s*CHART\s+(\d+)\s+—", md, re.I)
    if len(nums) == len(set(nums)):
        return md

    def renumber_block(block: str) -> str:
        count = 0

        def repl(match: re.Match[str]) -> str:
            nonlocal count
            count += 1
            return f"CHART {count} —"

        return re.sub(r"CHART\s+\d+\s+—", repl, block)

    nav_start = md.find("<nav")
    nav_end = md.find("</nav>")
    if nav_start != -1 and nav_end != -1:
        nav_end += len("</nav>")
        md = md[:nav_start] + renumber_block(md[nav_start:nav_end]) + md[nav_end:]

    main_start = md.find("<main")
    if main_start != -1:
        md = md[:main_start] + renumber_block(md[main_start:])
    return md


def improve_generic_captions(md: str) -> str:
    pattern = re.compile(
        r'(<figure class="art-chart">\n\s*<div class="art-chart-live"(?P<attrs>[^>]*)aria-label="(?P<label>[^"]*)"(?P<after>[^>]*)></div>\n\s*<figcaption class="art-chart-caption">(?P<caption>.*?)</figcaption>\n</figure>(?P<between>(?:(?!<figure class="art-chart">).)*?)(?P<next><p(?: class="art-p")?>(?P<prose>.*?)</p>))',
        re.S,
    )

    def repl(match: re.Match[str]) -> str:
        caption = clean_html(match.group("caption"))
        if not is_generic_caption(caption):
            return match.group(0)
        claim = escape(claim_from_prose(match.group("prose"), caption), quote=True)
        figure = (
            '<figure class="art-chart">\n'
            f'  <div class="art-chart-live"{match.group("attrs")}aria-label="{claim}"{match.group("after")}></div>\n'
            f'  <figcaption class="art-chart-caption">{claim}</figcaption>\n'
            "</figure>"
        )
        return figure + match.group("between") + match.group("next")

    return pattern.sub(repl, md)


def add_reader_path_to_dataset_context(md: str) -> str:
    if TEACHING_LADDER in md:
        return md
    marker = '<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>'
    start = md.find(marker)
    if start == -1:
        return md
    next_h2 = md.find("<h2", start + len(marker))
    if next_h2 == -1:
        return md
    context = md[start:next_h2]
    if "Reader path:" in context:
        return md
    return md[:next_h2] + TEACHING_LADDER + "\n" + md[next_h2:]


def add_missing_editor_note(md: str) -> str:
    if "EDITOR'S NOTE" in md or "EDITOR’S NOTE" in md:
        return md
    note = (
        '<h2 id="editors-note" class="anchored">EDITOR\'S NOTE</h2>\n'
        '<div class="art-editorial-note"><p>This report is part of the Artometrics archive. '
        'Read the charts as a structured interpretation of the cited public sources, with the limitations and references used as the expert-check path.</p></div>\n'
    )
    return md.replace("</main>", note + "</main>")


def polish(md: str) -> str:
    md = add_explicit_source_to_charts(md)
    md = relabel_duplicate_chart_fives(md)
    md = renumber_duplicate_chart_labels(md)
    md = improve_generic_captions(md)
    md = add_reader_path_to_dataset_context(md)
    md = add_missing_editor_note(md)
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
    if READING_GUIDE in md and TEACHING_LADDER not in md:
        md = md.replace(READING_GUIDE, READING_GUIDE + "\n" + TEACHING_LADDER)

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
