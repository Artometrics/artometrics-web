# Artometrics style guide — Content OS

Use this for banners, article HTML, data presentation, and pacing. Agents and scripts must follow it.

## Brand

Canonical system: `docs/design-system/` + Notion **Artometrics Design System**.

| Token | Value |
|--------|--------|
| Wordmark | **Artometrics** (Chomsky — mark/wordmark only) |
| Accent (print) | `#C0392B` |
| Accent (UI) | `#E60000` (KSM-energy hot red) |
| Black / white | `#000000` / `#FFFFFF` |
| Gray / ash | `#525252` / `#1A1A1A` |
| Display / headers | Anton |
| Body / UI | DM Sans |
| Chart palette | black → mid-gray → Artometrics red |

**Don't:** purple gradients, cream/terracotta paper, soft multi-layer shadows, glow, decorative cards, Inter/SaaS first-viewport.

Public copy is always Artometrics-branded — never theme-demo or generic “AI magazine” voice.

## Taxonomy (domains · subdomains)

Stories tag a **domain** then a **subdomain** (see `data/sections.ts`):

| Domain | Subdomains |
|--------|------------|
| `arts` | design · music · film · theater · architecture · fashion · language |
| `sports` | football · basketball · baseball · soccer · hockey · golf · tennis · fighting · gaming · motorsports |
| `science` | chemistry · physics · biology · astronomy · geology · math · medicine · engineering · tech |
| `humanities` | history · philosophy · religion · psychology · sociology · anthropology |
| `civics` | economics · business · politics · law · education · communication |
| `culture` | travel · food · leisure · environment · wellness |

Frontmatter example:

```yaml
tags:
  - arts
  - film
```

Nav and `/topics/:domain` use the six domains only. Legacy section/desk slugs redirect into domains.

## Keyword / AEO rules

Every brief must define:

1. **Primary keyword** — the phrase the report should own
2. **Secondary keywords** — 3–8 related phrases used naturally in H2s and prose
3. **Search intent** — informational / commercial / comparative
4. **Title pattern** — specific, citable, NYT-style question or claim (no “The Artometrics of …”)
5. **Meta description** — ≤160 chars, concrete numbers when possible
6. **Slug** — kebab-case, stable, no dates

Internal links: cite methodology/ethics, related section reports, and primary data sources with `rel="noopener noreferrer"` on external links.

## Voice

Professional, objective, insightful, **no fluff**. Lead with the finding, then the mechanism, then the limit. Named and dated numbers only. One calm expert voice — not multi-discipline cosplay.

## Banner (hero) rules

- Full-bleed editorial still, **16:9**, no text overlays, no logos, no fake charts drawn into the image
- Atmosphere matches the domain (arts / sports / science / humanities / civics / culture)
- Prompt must include: Artometrics red accent sparingly, black/white/gray neutrals, documentary magazine photography, no purple gradients, no cream/terracotta clichés, no stock-photo smiles collage
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
    <h2 id="research-question" class="anchored">RESEARCH QUESTION</h2>
    <h2 id="fast-facts" class="anchored">FAST FACTS</h2>
    <div class="facts-grid">…</div>
    <h2 id="dataset-context" class="anchored">DATA AND METHOD</h2>
    <!-- finding sections with charts (target: 5) -->
    <h2 id="limitations" class="anchored">LIMITATIONS</h2>
    <h2 id="conclusion" class="anchored">CONCLUSION</h2>
    <h2 id="references" class="anchored">REFERENCES</h2>
    <h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
  </main>
</div>
```

### Scientific magazine shape (not a journal paper)

Artometrics reports should feel **citable and scientific**, without copying APA journal theater.

**Do include**

1. **Research question** — one falsifiable reader question (not a formal H₀/H₁ block)
2. **Named, dated sources** — CMS dataset IDs, papers with years, agency reports, named institutions
3. **Data and method** — rows kept/dropped, joins, derived vs observed metrics, measurement window
4. **Five charts** — each answers a different sub-question; caption is a claim
5. **Uncertainty / non-claims** — what the file cannot show
6. **References** — DOIs / stable URLs; distinguish primary data from context literature
7. **Reproducibility** — downloadable CSV + Quarto/source (site Download menu)

**Do not require**

- Formal null/alternative hypothesis notation (H₀/H₁)
- Literature-review padding or methods appendices that bury the finding
- p-hacking theater or significance stars without a stated test

If a section is a **framework or hypothesis map** rather than measured evidence, say so plainly in the caption and prose.

### Section progression

1. **Deck** — 1–2 paragraphs: what the archive is, the interpretive move, the calibration number
2. **RESEARCH QUESTION** — the question the five charts are designed to answer
3. **FAST FACTS** — 3–6 `fact-box` cells (number + label)
4. **DATA AND METHOD** — source, rows, cleaning, observed vs derived vs editorial index
5. **Findings** — each H2 answers one question; **five charts** teach five claims
6. **LIMITATIONS** — coverage, bias, non-claims
7. **CONCLUSION** — modest; sharpen the question, don’t oversell
8. **REFERENCES** — citable sources with URLs (named authors, years, DOIs when available)
9. **EDITOR'S NOTE** — Artometrics reproducibility note

Target depth: **named actors, dated facts, and mechanism** — not abstract “trends.” Prefer ~1,200–3,500 words of dense report prose once five charts are in place.

### Charts

Target **five** live charts per report (`data-chart` + `data-fallback` pairs).

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
Interactive embeds are **hover-only** (no scroll-zoom, drag-zoom, or mode bar). Print mode remains the default static R/PNG view.

Site chrome: **Share** sits above the article body; **Download** (Data / Code / Download all) sits below the body and pulls from `src/generated/downloads.json`.

## Padres franchise report checklist

Use `src/content/blog/padres-the-artometrics-of-paying-for-october.md` as the gold template for **sports franchise series** reports (Yankees, Dodgers, Cowboys, Celtics, Lakers, Patriots, Giants, Warriors, etc.).

**Frontmatter**

- `tldr` — one paragraph with the central paradox and a calibration number
- `keyPoints` — 3–6 `number — label` facts (only numbers already in the article)
- `faq` — 3–4 Q&amp;A pairs derived strictly from article facts (no auto-generated “What does the data show about…” stubs)
- Preserve `slug`, `heroImage`, `tags`, `pubDate`; improve thin fields only from existing body content

**Body scaffold**

1. **Lede** — first `<p>` uses `class="art-p art-lede"`
2. **Deck** — 1–2 follow-on `<p class="art-p">` paragraphs before the facts grid
3. **The numbers behind the story** — `<h2 id="fast-facts">` + `<div class="facts-grid">` with `fact-box` cells from `keyPoints`
4. **Finding sections** — thesis-style `<h2>` titles (claims, not “Background” or “Fast facts”); remove redundant `<h3>` chart subheads
5. **Charts** — every `<figure class="art-chart">` includes `<figcaption class="art-chart-caption">`; `data-source` on the live div
6. **Conclusion** — `<h2 id="conclusion">` with a claim title (not “What to take away”)
7. **Data and method** — `<h2 id="dataset-context">` at the end, before references
8. **References** — `<h2 id="references">` with named sources and related Artometrics links
9. **Editor's note** — `<h2 id="editors-note">` + `<div class="art-editorial-note">` for measurement caveats

**Do not**

- Invent statistics or FAQ answers not supported by the article
- Lead with GitHub-primary CTAs (`art-github-btn`); point readers to site Download exports instead
- Place Data and method before the finding sections (Padres puts it after the conclusion)

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
