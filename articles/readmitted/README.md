# READMITTED: How America's Hospitals Are Failing the 30-Day Standard

**Desk:** Power · Atlas  
**Live report:** https://artometrics.com/readmitted/  
**Methodology:** https://artometrics.com/methodology/

Monorepo gold prototype for Artometrics data reports. Source of truth lives here under `articles/readmitted/` — not a separate `Artometrics/readmitted` GitHub repo.

## Dataset

- CMS HRRP excess readmission ratios (ERR), FY2025 supplemental (`9n3s-kdb3`)
- CMS Hospital General Information ownership join (`xubh-q36u`), bundled offline
- Working CSVs in `data/` (no live CMS fetch at render)

## Layout

```text
articles/readmitted/
  README.md
  QA.md
  readmitted.qmd              # Quarto analysis + prose source
  readmitted-magazine.qmd     # Magazine HTML variant
  data/                       # bundled working CSVs
  charts/                     # chartN_*.png + chartN_*.plotly.json
  hero.jpg                    # Higgsfield editorial banner
  scripts/r/artometrics_theme.R  # local theme copy (canonical: scripts/r/)
```

Site publish paths:

| Asset | Path |
|-------|------|
| Blog body | `src/content/blog/readmitted.md` |
| Chart PNGs | `public/images/content/articles/readmitted/charts/` |
| Plotly JSON + CSV downloads | `public/data/articles/readmitted/` |
| Hero | `public/images/content/articles/readmitted/hero.jpg` |

## Render charts (R — primary)

From the monorepo root:

```bash
npm run render:readmitted
# or: Rscript scripts/render-readmitted-charts.R
```

Writes PNG + Plotly JSON into `articles/readmitted/charts/` and copies into `public/`.

## Sync assets to public/

```bash
npm run sync:readmitted
npm run sync:readmitted -- --render   # R export then sync
```

Does **not** overwrite `src/content/blog/readmitted.md`. Edit the published body in place (or re-export from Quarto when you intentionally refresh HTML → markdown).

## Optional Quarto HTML

```bash
cd articles/readmitted
quarto render readmitted.qmd --to html
```

Chart 3 and all analysis chunks read local CSVs under `data/` only.

## Branding

Cream `#F2F0EB`, highlight red `#C0392B`, navy `#2C3E6B`. Chart toolbars (Save PNG / Share) come from `src/scripts/art-charts.ts` on the live article page.
