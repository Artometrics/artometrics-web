# UK Museums Cluster in Less-Deprived Areas — Wiltshire Leads, Cornwall Trails

**Desk:** arts · **Live:** https://artometrics.com/museums/

4,191 UK museums mapped to area deprivation: median 5.00, maximum 10.0, with South West England showing 3-point admin-area gaps.

## Layout

```text
museums/
  _quarto.yml
  museums.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/museums
quarto render
npm run sync:article -- --slug museums
```
