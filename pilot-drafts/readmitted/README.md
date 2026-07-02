# READMITTED: How America's Hospitals Are Failing the 30-Day Standard

**Desk:** Power · Atlas  
**Live report:** https://artometrics.com/readmitted/  
**Methodology:** https://artometrics.com/methodology/

Data analysis of 11,720 hospital-condition pairs under CMS Hospital Readmissions Reduction Program (HRRP) — mapping which states, conditions, and ownership types carry the most penalty exposure.

## Dataset

- CMS HRRP excess readmission ratios (ERR)
- CMS Hospital General Information (ownership classification)
- Working CSVs in `data/`

## Repository layout

```text
readmitted/
  readmitted.qmd              # Primary Quarto report
  readmitted-magazine.qmd     # Editorial magazine HTML export
  readmitted.html             # Pre-rendered HTML (optional)
  README.md
  QA.md                       # PNG vs Plotly QA checklist
  artometrics.css
  art-head.html
  art-body.html
  data/
  charts/                     # chartN_*.png + chartN_*.plotly.json
  scripts/r/artometrics_theme.R
```

## Render

```bash
quarto render readmitted.qmd --to html
quarto render readmitted-magazine.qmd --to html
```

## Export charts (without full Quarto)

From the artometrics-web monorepo:

```bash
python3 scripts/render-readmitted-charts.py
node scripts/sync-github-articles.mjs
```

Charts use Artometrics branding: cream background (`#F2F0EB`), highlight red (`#C0392B`), navy (`#2C3E6B`), 1200×700 PNG at 2× scale.
