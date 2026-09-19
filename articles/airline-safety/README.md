# 'Airline Safety by Capacity: How Incident Counts Hide Exposure Differences'

**Desk:** culture · **Live:** https://artometrics.com/airline-safety/

336 airline records show capacity dominates safety rankings—United leads at 7.1B seat-km/week, but incident counts don't scale linearly with size.

## Layout

```text
airline-safety/
  _quarto.yml
  airline-safety.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/airline-safety
quarto render
npm run sync:article -- --slug airline-safety
```
