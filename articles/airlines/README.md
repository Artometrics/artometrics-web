# 'Airline Safety by Capacity: How Incident Counts Hide Exposure Differences'

**Desk:** culture · **Live:** https://artometrics.com/airlines/

336 airline records show capacity dominates safety rankings—United leads at 7.1B seat-km/week, but incident counts don't scale linearly with size.

## Layout

```text
airlines/
  _quarto.yml
  airlines.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/airlines
quarto render
npm run sync:article -- --slug airlines
```
