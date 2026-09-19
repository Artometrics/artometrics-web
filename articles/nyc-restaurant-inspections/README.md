# NYC Restaurant Inspections Show 15-Point Median, 156-Point Outlier

**Desk:** culture · **Live:** https://artometrics.com/nyc-restaurant-inspections/

NYC restaurant inspection scores cluster at 15; highest violation count reaches 156 in 100,000-record TidyTuesday extract.

## Layout

```text
nyc-restaurant-inspections/
  _quarto.yml
  nyc-restaurant-inspections.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/nyc-restaurant-inspections
quarto render
npm run sync:article -- --slug nyc-restaurant-inspections
```
