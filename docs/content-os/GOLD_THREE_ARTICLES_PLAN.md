# Gold three articles — perfection checklist

Three **jump-through** reports that should read as the canonical Artometrics data-magazine prototype: reproducible charts, shareable assets, PREFIX titles, and complete back matter. Everything else in the catalog can follow this pattern once these three ship.

## Canonical slugs

| Priority | Slug | Role | R sidecars (target) |
|----------|------|------|---------------------|
| 1 | `readmitted` | Tier A monorepo gold (CMS HRRP, real CSVs) | 5 |
| 2 | `poison` | Franchise / Leto jump-through (white-field sports-film) | 3 |
| 3 | `gutenberg` | Culture canon (public-domain shelf, editorial indices → catalog ingest later) | 5 |

**Alternate fourth** (meta jump-through, no R pipeline yet): `institutions` — rereads dynasty reports; add `scripts/render-institutions-charts.R` when sports-dynasty CSVs live under `articles/institutions/data/`.

## Likely “Copy R → No R file” report

Toolbar logic (`lib/artChartChrome.web.ts`) always offers **Copy R** when `data-chart` ends in `.plotly.json`, fetching the sibling `.r` under `public/data/articles/<slug>/charts/`.

| Symptom | Cause |
|---------|--------|
| **No R file** flash | `.r` missing from `public/data/articles/.../charts/` (never synced or not deployed) |
| Button absent | No `data-chart` on the figure |

**Red / accent-heavy charts** that match user description:

- **`readmitted`** — chart 3 (stacked penalty tiers, High = `#C0392B`), chart 4 (ERR gradient bars to red), chart 5 (for-profit column in red). All five charts now have sidecars.
- **`gutenberg`** — chart 1 (English bar in red), chart 2 (fiction line in red). Sidecars added via `render:gutenberg` + `sync:chart-r-sidecars`.
- **`institutions`**, **`padres`**, and most TidyTuesday reports — Copy R will fail until a render script + sidecar sync exists (13 slugs with sidecars today: readmitted, poison, gutenberg only).

## Chart + R pipeline (repo commands)

Run from repository root after data or render script changes:

```bash
# Tier A + jump-through R exports (PNG + Plotly JSON → articles/<slug>/charts + public/)
npm run render:readmitted
npm run render:franchise-poison
npm run render:gutenberg

# Per-chart Copy R snippets → articles/.../charts/*.r + public/data/.../charts/*.r
npm run sync:chart-r-sidecars

# Optional: full article asset sync from monorepo home
npm run sync:article -- --slug readmitted
npm run sync:article -- --slug poison
```

**Legacy Python path** (culture canon batch, long slug `project-gutenberg-public-domain-canon-map`): `python3 scripts/generate_culture_canon.py` — prefer **`render:gutenberg`** for the live `gutenberg` slug going forward.

**Manual fallback** if R is unavailable: ship Plotly JSON + PNG from CI artifact; run `node scripts/sync-chart-r-sidecars.mjs` on any machine with Node only (sidecars are extracted from committed `.R` render scripts).

## Share toolbar (in-flight work)

Per-chart **Share** sheet lives in `lib/artChartChrome.web.ts` (Save PNG, Share sheet with X / LinkedIn / copy link, Copy R). Do **not** duplicate chart share UI in `ArticleActions.tsx` — that component handles report-level share/downloads. Land any commit `955fff22`-class fixes only in chart chrome + `public/css/artometrics-article.css`.

**Verify after deploy:** open a chart → Share opens sheet with preview; Copy R → **Copied** (not “No R file”) for all charts on the three gold slugs.

---

## Per-article perfection checklist

Use the same order for each slug. Check boxes in PR description or release notes.

### 1. `readmitted`

- [ ] **Hero** — `heroImage` matches art direction; no draft placeholder (`/images/content/articles/readmitted/hero.png`).
- [ ] **PREFIX title** — frontmatter `title` uses desk PREFIX pattern (e.g. `READMITTED: …`); H1 in body aligned.
- [ ] **Charts (5)** — `data-chart` paths match `public/data/articles/readmitted/charts/*.plotly.json`; PNG fallbacks in `public/images/content/articles/readmitted/charts/`.
- [ ] **R sidecars (5)** — `npm run sync:chart-r-sidecars`; each JSON has sibling `.r` in public + `articles/readmitted/charts/`.
- [ ] **Narrative** — five chart sections + limitations; named hospitals/states; no fabricated CMS stats.
- [ ] **Transcript / audio** — `audioSrc` or downloads manifest transcript if narrated (`npm run cos:narrate -- --slug readmitted` when ready).
- [ ] **Citations** — CMS dataset IDs in `data-source` and back matter (`9n3s-kdb3`, `xubh-q36u`).
- [ ] **Back matter** — `DATA, METHODS & SOURCES`, editor’s note, `art-files` download rail (CSV, JSON, PNG).
- [ ] **Quarto home** — `articles/readmitted/` renders with `npm run render:articles` or slug sync.
- [ ] **QA** — `npm run content` + spot-check `/readmitted` chart toolbars on web export.

### 2. `poison`

- [ ] **Hero** — franchise / Leto key art; slug folder `poison` (not legacy `franchise` paths in body).
- [ ] **PREFIX title** — e.g. `POISON: …` (match published frontmatter).
- [ ] **Charts (3)** — revenue stream, Leto slate ratios, scale comparison; white field per brand spec.
- [ ] **R sidecars (3)** — from `render-franchise-poison-charts.R` + sidecar sync.
- [ ] **Narrative** — jump-through from franchise report; `articles/poison/data/README.md` for 61/39 vs CSV reconciliation.
- [ ] **Transcript / audio** — optional narration pack.
- [ ] **Citations** — Box Office Mojo / TidyTuesday lines in `data-source`.
- [ ] **Back matter** — download rail + GitHub/article home link if published.
- [ ] **QA** — Copy R on all three charts; Share sheet on web.

### 3. `gutenberg`

- [ ] **Hero** — canon / shelf imagery under `gutenberg` slug paths.
- [ ] **PREFIX title** — `GUTENBERG: …` in frontmatter (already set).
- [ ] **Charts (5)** — language, era/subject, author memory, adaptation, classroom vs reuse.
- [ ] **R sidecars (5)** — `npm run render:gutenberg` then `sync:chart-r-sidecars` (replaces Python-only export).
- [ ] **Narrative** — editor’s note states editorial indices; roadmap to ingest `pg_catalog.csv` / RDF.
- [ ] **Transcript / audio** — schedule when culture desk narrates.
- [ ] **Citations** — Gutenberg feeds, LOC/Wikidata in sources block.
- [ ] **Back matter** — limitations on index vs raw catalog counts.
- [ ] **Data upgrade** — ticket: wire `scripts/catalog-open-sources.mjs` Gutenberg pull into `articles/gutenberg/data/`.
- [ ] **QA** — Copy R + Share on all five charts.

---

## Suggested execution order (sprints)

1. **Pipeline** — merge regenerated PNG/JSON/R sidecars for readmitted, poison, gutenberg; deploy to Netlify (static `public/data/**`).
2. **readmitted** — narrative pass + PREFIX + downloads manifest + optional narration.
3. **poison** — hero + PREFIX + cross-links from franchise; confirm chart 1 sourcing note in prose.
4. **gutenberg** — replace index-only copy with catalog-ingest milestone; keep editor’s note honest.
5. **institutions** (optional) — add R render + sidecars when dynasty CSVs are centralized.

## Definition of done (gold three)

- All **13** chart R sidecars present under `public/data/articles/{readmitted,poison,gutenberg}/charts/`.
- Live site: **Copy R** returns clipboard text; **Share** opens chart sheet (no duplicate report-level share bugs).
- Each slug: PREFIX title, hero, five or three live charts, sources, editor’s note, download rail populated.
- Documented commands in this file and `AGENTS.md` / root `README.md` point to `render:*` + `sync:chart-r-sidecars`.
