# Page Speed Improved 31% at the Median Between 2016 and 2022

**Desk:** science · **Live:** https://artometrics.com/web-page-metrics/

Median P50 fell from 7.00 to 4.80 across 238 HTTP Archive records, though desktop and mobile showed different speed profiles.

## Layout

```text
web-page-metrics/
  _quarto.yml
  web-page-metrics.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/web-page-metrics
quarto render
npm run sync:article -- --slug web-page-metrics
```
