# NYC Restaurant Inspections Show 15-Point Median, 156-Point Outlier

**Desk:** culture · **Live:** https://artometrics.com/restaurants/

NYC restaurant inspection scores cluster at 15; highest violation count reaches 156 in 100,000-record TidyTuesday extract.

## Layout

```text
restaurants/
  _quarto.yml
  restaurants.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/restaurants
quarto render
npm run sync:article -- --slug restaurants
```
