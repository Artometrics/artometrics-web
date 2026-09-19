# UK Museums Cluster in Less-Deprived Areas — Wiltshire Leads, Cornwall Trails

**Desk:** arts · **Live:** https://artometrics.com/uk-museums/

4,191 UK museums mapped to area deprivation: median 5.00, maximum 10.0, with South West England showing 3-point admin-area gaps.

## Layout

```text
uk-museums/
  _quarto.yml
  uk-museums.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/uk-museums
quarto render
npm run sync:article -- --slug uk-museums
```
