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
4. **Display title** (`title` in frontmatter → site H1, RSS, SEO) — `PREFIX: Subtitle` (see [Report display titles](#report-display-titles)); keep SEO keywords in `description`, not the H1 rail
5. **Meta description** — ≤160 chars, concrete numbers when possible. The report header deck (`app/(site)/[slug].tsx`) shows the first sentence trimmed to ~12 words via `deckLine` — write one punchy opening sentence readers see under the red H1; put extra SEO detail in body/`tldr`, not a second sentence in `description`.
6. **Slug** — kebab-case, stable, no dates (URL only; do not encode the subtitle in the slug)

Internal links: cite methodology/ethics, related section reports, and primary data sources with `rel="noopener noreferrer"` on external links.

## Report display titles

Every published report uses one **display title** in frontmatter `title:` (rendered as the page H1 in `app/(site)/[slug].tsx` and in `PageSeo`). URLs stay on `slug` only.

**Pattern:** `PREFIX: Subtitle`

| Part | Rule | Examples |
|------|------|----------|
| **PREFIX** | ALL CAPS short name, usually the slug as one token (`warriors` → `WARRIORS`, `superbowl` → `SUPERBOWL`). Hyphenated slugs become spaced words (`star-wars` → `STAR WARS`). Use established acronyms when the slug is one (`lcsh` → `LCSH`, `sf` → `SF`, `ceos` → `CEOs`, `phds` → `PHDS`). |
| **Subtitle** | Magazine hook or deck line (~5 words when possible; tighter is better). Derive from `description`, `tldr`, or lede — sharp and citable, not keyword stuffing. Title case (capitalize major words). |

**Examples**

```yaml
title: "GUTENBERG: English Holds 72% of the Shelf"
title: "WARRIORS: Seventy-Three Wins Rewrote Basketball Offense"
title: "POISON: What Star Risk Costs an IP"
title: "READMITTED: Half of Hospitals Beat CMS's Benchmark"
title: "BLUEPRINT: Record Sale, No Championship Formula"
```

**Don't:** long stat headlines as the only title, “The Artometrics of …”, or changing `slug` when retitling. **Do:** keep numbers and primary keywords in `description` / body for search; the PREFIX is the brand rail readers scan on `/blog` and article headers.

**Card deck vs report deck:** Frontmatter `description` is the full SEO/meta sentence — leave it long. On report pages, `deckLine()` shows a longer lede under the H1. On `BlogCard` / grid tiles, `cardDeckLine()` truncates to ~5–8 words at display time (`text-fg`); no need to shorten every markdown `description` for cards.

Bulk retitle map (one-off): `scripts/apply-report-display-titles.mjs`.

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
    <!-- finding sections with charts (target: 5); calibration numbers live in lede/deck/keyPoints, not a facts grid -->
    <h2 id="limitations" class="anchored">LIMITATIONS</h2>
    <h2 id="conclusion" class="anchored">CONCLUSION</h2>
    <section class="art-back-matter">
      <h2 id="data-methods-and-sources" class="anchored">Data, methods &amp; sources</h2>
      <h3 id="data-and-method" class="anchored art-back-matter__subhead">Data and method</h3>
      <!-- rows, joins, observed vs derived -->
      <h3 id="sources" class="anchored art-back-matter__subhead">Sources</h3>
      <!-- named sources, DOIs, dataset URLs -->
    </section>
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

1. **Deck** — 1–2 paragraphs: what the archive is, the interpretive move, the calibration number (use `keyPoints` in frontmatter for pull quotes, not an in-body facts grid)
2. **RESEARCH QUESTION** — the question the five charts are designed to answer
3. **Findings** — each H2 answers one question; **five charts** teach five claims
4. **LIMITATIONS** — coverage, bias, non-claims
5. **CONCLUSION** — modest; sharpen the question, don’t oversell
6. **Data, methods & sources** — one back-matter block at the end (`art-back-matter`): **Data and method** (rows, cleaning, observed vs derived) then **Sources** (named citations, DOIs, dataset URLs)
7. **EDITOR'S NOTE** — Artometrics reproducibility note (after back matter when present)

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

1. **Opening** — first `<p class="art-p">` (no `art-lede` box class; deck lives in frontmatter `description`)
2. **Deck** — 1–2 follow-on `<p class="art-p">` paragraphs; weave `keyPoints` numbers into prose (no `fast-facts` / `facts-grid` block)
3. **Finding sections** — thesis-style `<h2>` titles (claims, not “Background”); remove redundant `<h3>` chart subheads
4. **Charts** — every `<figure class="art-chart">` includes `<figcaption class="art-chart-caption">`; `data-source` on the live div
5. **Conclusion** — `<h2 id="conclusion">` with a claim title (not “What to take away”)
6. **Data, methods & sources** — `<section class="art-back-matter">` after the conclusion: merged `<h2 id="data-methods-and-sources">` with `<h3>` subheads for method and sources (not mid-narrative)
7. **Editor's note** — `<h2 id="editors-note">` + `<div class="art-editorial-note">` for measurement caveats

**Do not**

- Invent statistics or FAQ answers not supported by the article
- Lead with GitHub-primary CTAs (`art-github-btn`); point readers to site Download exports instead
- Place Data and method before the finding sections or split sources into a separate top-level H2 after the merge

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
