# READMITTED — QA checklist (monorepo gold)

**Report:** https://artometrics.com/readmitted/  
**Source of truth:** `articles/readmitted/` (this monorepo)  
**Date:** 2026-07-19

## Chart pairs (PNG + Plotly JSON)

| Chart | PNG | Plotly JSON | Status |
|-------|-----|-------------|--------|
| chart1_states_penalized | yes | yes | Pass |
| chart2_err_by_condition | yes | yes | Pass |
| chart3_penalty_by_ownership | yes | yes | Pass |

## Static vs interactive consistency

- [x] **Chart 1:** State ordering and national-average reference line (48.1%) match between PNG and web Plotly.
- [x] **Chart 2:** Condition ERR ordering preserved; Hip/Knee leads at 1.00485.
- [x] **Chart 3:** Stacked ownership tiers use Artometrics palette; for-profit shows heavier High/Medium share vs non-profit.

## Prose ↔ numbers

- [x] FAST FACTS: 48.1%, 1.0018 national ERR, Hip/Knee 1.00485, NJ 65.4%, TEAM 742
- [x] Claim-style H2s and chart captions match chart exports
- [x] No “View source on GitHub” CTA

## Citations

- [x] CMS HRRP `9n3s-kdb3`
- [x] CMS Hospital General Information `xubh-q36u`
- [x] CMS TEAM model page
- [x] MedPAC Medicare Payment Policy (Chapter 9)
- [x] Zuckerman et al. NEJM 2016
- [x] Krumholz et al. JAMA 2017

## Hero

- [x] Higgsfield banner at `public/images/content/articles/readmitted/hero.jpg`
- [x] `heroImage` frontmatter points at that path
- [x] Aspect compatible with article hero CSS (16:9)

## FILES downloads

Every link must resolve under `public/`:

- [x] `/data/articles/readmitted/data/hrrp_state_summary.csv`
- [x] `/data/articles/readmitted/data/hrrp_condition_err.csv`
- [x] `/data/articles/readmitted/data/hrrp_ownership_condition.csv`
- [x] `/images/content/articles/readmitted/charts/chart1_states_penalized.png`
- [x] `/images/content/articles/readmitted/charts/chart2_err_by_condition.png`
- [x] `/images/content/articles/readmitted/charts/chart3_penalty_by_ownership.png`
- [x] `/data/articles/readmitted/charts/chart1_states_penalized.plotly.json`
- [x] `/data/articles/readmitted/charts/chart2_err_by_condition.plotly.json`
- [x] `/data/articles/readmitted/charts/chart3_penalty_by_ownership.plotly.json`

## Site chrome

- [x] Sync: `npm run sync:readmitted` copies data + charts → `public/`
- [x] Render: `npm run render:readmitted` regenerates R PNG + Plotly JSON
- [x] Per-chart **Save PNG** / **Share chart** toolbars still wired via `art-charts.ts`
- [x] `.art-files-*` styles in `public/css/artometrics-article.css`

## Offline render gate

- [x] No live `data.cms.gov` dependency for Chart 3 (uses `data/hrrp_ownership_condition.csv`)
