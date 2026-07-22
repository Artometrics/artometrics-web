# Artometrics style guide — Content OS

Use this for banners, article HTML, data presentation, and pacing. Agents and scripts must follow it.

## Brand

| Token | Value |
|--------|--------|
| Wordmark | **Artometrics** (Chomsky) |
| Accent | `#C0392B` |
| Dark | `#1C1C1E` |
| Mid | `#6B6B6B` |
| Cream / paper | `#FAFAF8` / `#F2F0EB` |
| Body type | Georgia / Times stack |
| Chart palette | black → mid-gray → Artometrics red |

Public copy is always Artometrics-branded — never theme-demo or generic “AI magazine” voice.

## Sections

Stories tag exactly one primary section:

`sports` | `movies-tv` | `music` | `culture` | `galleries` | `cities-travel` | `games` | `business` | `books` | `tech`

(Legacy desks `culture|atlas|history|persona|power` map into these sections.)

## Keyword / AEO rules

Every brief must define:

1. **Primary keyword** — the phrase the report should own
2. **Secondary keywords** — 3–8 related phrases used naturally in H2s and prose
3. **Search intent** — informational / commercial / comparative
4. **Title pattern** — specific, citable, NYT-style question or claim (no “The Artometrics of …”)
5. **Meta description** — ≤160 chars, concrete numbers when possible
6. **Slug** — kebab-case, stable, no dates

Internal links: cite methodology/ethics, related desk reports, and primary data sources with `rel="noopener noreferrer"` on external links.

## Banner (hero) rules

- Full-bleed editorial still, **16:9**, no text overlays, no logos, no fake charts drawn into the image
- Atmosphere matches the desk (culture = medium/industry texture; atlas = place/systems; etc.)
- Prompt must include: Artometrics red accent sparingly, cream/paper neutrals, documentary magazine photography, no purple gradients, no stock-photo smiles collage
- File lands at `/images/content/articles/<slug>/hero.png` (or `.webp`) and frontmatter `heroImage`

## Article HTML structure (required)

Reports are HTML bodies (not Markdown prose) inside frontmatter MD files:

```html
<div id="quarto-content">
  <nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
    <ul>…</ul>
  </nav>
  <main class="art-article-main">
    <!-- deck paragraphs -->
    <h2 id="fast-facts" class="anchored">FAST FACTS</h2>
    <div class="facts-grid">…</div>
    <h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
    <!-- finding sections with charts -->
    <h2 id="limitations" class="anchored">LIMITATIONS</h2>
    <h2 id="conclusion" class="anchored">CONCLUSION</h2>
    <h2 id="references" class="anchored">REFERENCES</h2>
    <h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
  </main>
</div>
```

### Section progression

1. **Deck** — 1–2 paragraphs: what the archive is, the interpretive move, the calibration number
2. **FAST FACTS** — 3–6 `fact-box` cells (number + label)
3. **DATASET CONTEXT** — source, rows, cleaning, what is observed vs derived vs editorial index
4. **Findings** — each H2 answers one question; one chart teaches one claim
5. **LIMITATIONS** — coverage, bias, non-claims
6. **CONCLUSION** — modest; sharpen the question, don’t oversell
7. **REFERENCES** — citable sources with URLs
8. **EDITOR'S NOTE** — Artometrics reproducibility note

### Charts

```html
<figure class="art-chart">
  <div
    class="art-chart-live"
    data-chart="/data/articles/<slug>/charts/<id>.plotly.json"
    data-fallback="/images/content/articles/<slug>/charts/<id>.png"
    data-source="Data: … — ARTOMETRICS"
    role="img"
    aria-label="…"
  ></div>
  <figcaption class="art-chart-caption">…</figcaption>
</figure>
```

Always ship PNG + Plotly JSON pairs. Caption states the claim, not the column name.

## Evidence labels (ethics)

Distinguish in prose:

- **Observed data** — from the source file / API
- **Derived metrics** — medians, ranks, shares we calculate
- **Editorial indices** — interpretive frameworks (must be labeled)
- **Context literature** — papers / docs that explain limits

## Voice & pacing

- Adult, precise, non-hype
- Prefer medians over means when skewed
- One useful claim per chart
- Teach non-experts without talking down; give experts something to challenge
- Avoid: emojis, purple UI tropes, “in this blog post”, engagement bait

## Short vs long outputs (later stages)

| Format | Use |
|--------|-----|
| Long report | Full HTML above → site |
| Short cut | 120–200 word deck + 3 facts + 1 chart for social |
| Narration script | Spoken prose, no HTML, cite aloud |
| Magazine PDF | Print CSS / export (future) |

## Distribution checklist (later)

- Share buttons (site)
- LinkedIn / IG / YT / FB copy derived from primary keyword + one fact
- AEO: `llms.txt`, crawlable HTML, JSON-LD Article, sitemap
