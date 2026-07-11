# Pilot review — READMITTED

This document summarizes the Phase 0 pilot for your approval **before any push to GitHub `main`**.

## What to review locally

1. **Live article:** run `npm run dev` and open `/readmitted/`
   - All 3 charts should render (Plotly live + PNG fallback)
   - Each chart has **Save PNG** and **Share chart** buttons
   - Share sheet supports Web Share API (mobile), X, LinkedIn, copy link

2. **Pilot repo draft:** [`pilot-drafts/readmitted/`](../pilot-drafts/readmitted/)
   - `charts/` — 3 PNG + 3 `.plotly.json` pairs
   - `data/` — working CSVs
   - `README.md`, `QA.md`, `readmitted-magazine.qmd`
   - `scripts/r/artometrics_theme.R`

3. **Repo audit:** [`docs/article-repo-audit.json`](article-repo-audit.json) — all 10 existing GitHub repos audited

4. **Migration scaffolds:** `.cache/article-scaffolds/` — 79 local repo layouts ready for R Quarto rewrite (gitignored; regenerate with `npm run scaffold:repo -- --batch-from-site`)

## Platform changes shipped in this branch

| Change | File |
|--------|------|
| Sync copies Plotly JSON from repos | `scripts/sync-github-articles.mjs` |
| Per-chart save/share toolbar | `src/scripts/art-charts.ts` (`initChartToolbars`) |
| Chart toolbar + share sheet CSS | `public/css/artometrics-article.css` (via sync) |
| Shared R helpers | `scripts/r/artometrics_theme.R` |
| Repo scaffold CLI | `scripts/scaffold-article-repo.mjs` |
| 10-repo upgrade/audit | `scripts/upgrade-article-repos.mjs` |
| Readmitted chart export | `scripts/render-readmitted-charts.py` |

## QA summary (readmitted)

See [`pilot-drafts/readmitted/QA.md`](../pilot-drafts/readmitted/QA.md):

- 3/3 chart pairs complete (PNG + Plotly JSON)
- Static PNG and web charts use same data ordering and Artometrics palette
- Prose unchanged in quality tier; magazine HTML export included

## Approval checklist

- [ ] Chart display looks correct on mobile and desktop
- [ ] Save PNG downloads the branded static chart
- [ ] Share chart opens sheet and shares correctly
- [ ] `pilot-drafts/readmitted/` matches what you want on GitHub

## After you approve

1. From a machine with **Artometrics org write access**, run:
   ```bash
   npm run upgrade:repos
   npm run publish:repos readmitted   # or publish:repos for all 10
   ```
2. Run `npm run sync:articles -- --clone` to refresh the site from GitHub
3. Continue desk-by-desk migration using `docs/migration-manifest.json`

**Note:** The cloud agent token cannot push to `Artometrics/<article>` repos (403). Commits are prepared locally in `.cache/article-repos/` — use `npm run publish:repos` with your credentials.
