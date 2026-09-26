# Narrative rewrite plan — Artometrics blog corpus

**Scope:** `src/content/blog/*.md` (100 reports, HTML bodies + YAML frontmatter).

**Slug note (in-flight migration):** Legacy URLs in `netlify.toml` redirect to current blog slugs — e.g. `/gutenberg-canon` → `/gutenberg`, `/star-risk` → `/poison`, `/padres-blueprint` → `/blueprint`. Edit the **current** filename under `src/content/blog/`.  
**Goal:** Magazine narrative (scene → argument → evidence → limits) with **verified external citations**, while preserving chart embeds (`data-chart`, `data-fallback`, `art-chart-live`).

**Style anchors:** `docs/content-os/STYLE_GUIDE.md` (display titles: `PREFIX: Subtitle` on frontmatter `title`, slug unchanged), gold prototypes `src/content/blog/readmitted.md` and `src/content/blog/anime.md`, voice rules in `AGENTS.md`.

---

## Audit (March 2026)

### What we measured

| Pattern | Approx. count | Notes |
|--------|----------------|-------|
| Posts with `"The numbers that set the scale"` fast-facts boilerplate | ~85 / 100 | Template rhythm; not wrong, but reads like Content OS scaffold |
| Tier A narrative (lede + section through-line + external refs) | ~8–12 | `readmitted`, `blueprint`, `beyonce`, `caesar`, `jackson`, parts of `anime` |
| Explicit scaffold / placeholder language | 7 files | `streaming`, `restaurants`, `geopolitics`, `rivalry`, `narratives`, `jackson` (methods), `beyonce` (methods) |
| `"This report examines"` context ledes | 4 | `giants`, `cowboys`, `celtics`, `yankees` — thin magazine entry |
| Synthesis / cross-report pieces | Few | `poison` — strong framework, mostly internal refs before rewrite |
| Canon / index reports with editorial indices | Many Tier B | `lcsh`, `geopolitics`, `atlas` — need narrative glue + literature |

### Common gaps

1. **Ledes** jump to metrics without stakes (who uses the shelf, who pays for the franchise, who gets penalized).
2. **Sections** repeat chart captions instead of advancing one argument.
3. **REFERENCES** stop at Gutenberg feeds or internal `/slug` links — missing peer-reviewed or agency context cited inline.
4. **DATA AND METHOD** sometimes placed after conclusion (`poison`) or missing research question (`lcsh`).
5. **Quarto homes** exist for most Tier B slugs under `articles/<slug>/`; site truth is blog markdown until `npm run sync:article` + optional `.qmd` prose sync.

### Showcase / routing priority

| Source | Slugs to treat as public demos |
|--------|--------------------------------|
| `app/(site)/welcome.tsx` bio links | `beyonce`, `blueprint` |
| Content calendar Tier B spotlights | `padres`, `blueprint`, `beyonce`, `lcsh`, `poison` (when scheduled) |
| Gold Tier A (do not regress) | `readmitted`, `anime` |

---

## Rewrite tiers

### Tier 0 — Gold (maintain; cite externally when gaps appear)

- `readmitted` — reference standard for CMS medicine + journal context (Joynt & Jha, Zuckerman et al.).
- `anime` — reference standard for culture desk + dataset narrative.

**Action:** No bulk rewrite. Use as diff target for Tier 1.

### Tier 1 — Showcase rewrites (first batches)

Priority order for narrative + **external** REFERENCES:

1. `lcsh` — humanities/language canon map; Quarto: `articles/lcsh/`
2. `poison` — arts/film synthesis; data in `articles/poison/` (no full Quarto project yet)
3. `blueprint` — welcome demo; Quarto: `articles/blueprint/`
4. `beyonce` — welcome demo; Psychonomics series; add more non-repo citations where claims leave the lyric file
5. `margins` — upstream of `poison`; TidyTuesday + genre-metadata caution
6. `franchise` — upstream of `poison`; TidyTuesday media-franchise revenue

**Exemplars completed this session:** `lcsh`, `poison`, `blueprint` (see git diff).

### Tier 2 — Friday calendar B desk batches (10–15 posts per batch)

Group by domain; each batch: one editor pass for lede + transitions + REFERENCES, then spot-check charts.

| Batch | Example slugs | Desk |
|-------|----------------|------|
| Sports capital | `padres`, `dodgers`, `yankees`, `dynasties`, `leagues`, `cowboys`, `celtics`, `lakers` | sports |
| Civics / econ | `rivalry`, `metros`, `bioeconomics`, `atlas`, `exporters`, `mac` | civics |
| Culture platforms | `netflix`, `catalog`, `streaming` (replace placeholders first), `youtube`, `medium` | culture / arts |
| Language & canon | `lcsh`, `novels`, `sherlock`, `languages`, `pantheon` | arts / humanities |
| Film & music | `blockbusters`, `oscars`, `pixar`, `billboard`, `fame`, `albums` | arts |

**Batch rule:** Replace scaffold numbers before narrative polish on `streaming` and `restaurants`.

### Tier 3 — Scaffold / placeholder purge

Must attach real datasets and observed numbers **before** narrative pass:

- `streaming` — explicit placeholder copy
- `restaurants` — scaffold notes
- `geopolitics`, `rivalry` — editorial indices labeled; ingest UNESCO/WIPO/BEA or downgrade claims

### Tier 4 — Long tail

Remaining ~60 posts: mechanical fast-facts line can stay until batch reaches them; prioritize posts with live charts and traffic intent (SEO calendar).

---

## Per-article checklist (Tier 1+)

- [ ] Lede: scene or decision + calibration number (STYLE_GUIDE deck rules)
- [ ] `Research question` — falsifiable, not H₀/H₁ theater
- [ ] Section headers tell a story arc, not only chart titles
- [ ] Five charts (or declared fewer) — embed markup **unchanged**
- [ ] Inline named/dated cites where mechanism is borrowed from literature
- [ ] REFERENCES: primary data (feeds, CMS IDs) **and** context papers/agency pages with stable URLs
- [ ] LIMITATIONS / editor's note where framework ≠ measurement
- [ ] Optional: refresh `tldr` / `keyPoints` to match new through-line
- [ ] `npm run content`
- [ ] Note Quarto sync: `npm run sync:article -- --slug <slug>` when `articles/<slug>/*.qmd` should match

---

## Quarto sync notes

| Slug | Monorepo home | Blog sync |
|------|---------------|-----------|
| `lcsh` | `articles/lcsh/` | Prose rewrite in blog first; `.qmd` follow-up |
| `poison` | `articles/poison/data/` only | Blog is source of truth for synthesis |
| `blueprint` | `articles/blueprint/` | Align `.qmd` after REFERENCES pass |
| `readmitted` | `articles/readmitted/` | Gold path — sync charts, not prose, from Quarto |

---

## Follow-up batches (recommended order)

1. Tier 1 remainder: `beyonce`, `franchise`, `margins`, `protection`
2. Tier 3 scaffold purge: `streaming`, `restaurants`
3. Tier 2 sports capital batch (8 posts)
4. Tier 2 civics batch (6 posts)
5. Tier 4 long tail by `docs/content-os/content-calendar.csv` release order

**Estimated effort:** Tier 1 ~2–4 hours per report; Tier 2 batch ~1 day per 10 posts; full corpus ~multi-week editorial program (not one session).

---

## Session exemplars (2026-09-26)

| Slug | Change summary |
|------|----------------|
| `gutenberg` | Narrative arc (copyright clock → English gravity → adaptation economy); research question; Cornell + Copyright Act + Baldwin/Jenkins/Pantheon cites; expanded REFERENCES |
| `poison` | Studio vs. licensing through-line; De Vany & Walls (2004), Jenkins (2006), TidyTuesday + Box Office Mojo REFERENCES |
| `blueprint` | Research question block; journalism/agency REFERENCES with stable outlet URLs |

Local preview (Expo web): `npm run dev` → `http://localhost:8081/gutenberg`, `/poison`, `/blueprint` (legacy: `/gutenberg-canon`, `/star-risk`, `/padres-blueprint` redirect in production).
