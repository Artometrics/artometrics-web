# U.S. Incarceration by County, 1970–2016 — Median Population 3,553, Top Exceeds 6.8 Million

**Desk:** civics · **Live:** https://artometrics.com/prisons/

County-level population data show regional regimes that diverge for decades, not one national curve.

## Layout

```text
prisons/
  _quarto.yml
  prisons.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/prisons
quarto render
npm run sync:article -- --slug prisons
```
