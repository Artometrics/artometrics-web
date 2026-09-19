# U.S. Incarceration by County, 1970–2016 — Median Population 3,553, Top Exceeds 6.8 Million

**Desk:** civics · **Live:** https://artometrics.com/incarceration-trends/

County-level population data show regional regimes that diverge for decades, not one national curve.

## Layout

```text
incarceration-trends/
  _quarto.yml
  incarceration-trends.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/incarceration-trends
quarto render
npm run sync:article -- --slug incarceration-trends
```
