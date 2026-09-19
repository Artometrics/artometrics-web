# Artometrics report monorepo

Each folder under `articles/<slug>/` is a **standalone Quarto project** (rainfall-reports pattern): local `_quarto.yml`, main `.qmd`, `data/`, `charts/`, and optional `figures/` for knitr output.

Shared R theme: [`scripts/r/artometrics_theme.R`](../scripts/r/artometrics_theme.R) at repo root.

## One-time setup

From repo root:

```bash
npm run link:article-assets
```

## Materialize / refresh folders from the live site

```bash
npm run materialize:articles
node articles/tools/blog-html-to-qmd.mjs --all
npm run calendar:content
```

## Work on one report

```bash
cd articles/readmitted
quarto render
```

## Render all article projects

```bash
npm run render:articles
# or: Rscript articles/R/render_all.R --limit 3
```

## Friday publish checklist

1. Finish edits in `articles/<slug>/<slug>.qmd` (or `readmitted.qmd`).
2. `quarto render` inside the folder (optional if site body is already current).
3. `npm run sync:article -- --slug <slug>`
4. `npm run content`
5. `npm run build`
6. Commit and push.

## Site paths

| Asset | Path |
|-------|------|
| Blog body | `src/content/blog/<slug>.md` |
| Chart PNGs | `public/images/content/articles/<slug>/charts/` |
| Plotly + CSV | `public/data/articles/<slug>/` |

Content calendar: [`docs/content-os/content-calendar.csv`](../docs/content-os/content-calendar.csv).
