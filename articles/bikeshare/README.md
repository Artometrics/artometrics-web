# How Far Do Portland’s Biketown Rides Actually Go?

**Desk:** culture · **Live:** https://artometrics.com/bikeshare/

Trip-level bike-share data measures typical distance and duration across Biketown journeys.

## Layout

```text
bikeshare/
  _quarto.yml
  bikeshare.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/bikeshare
quarto render
npm run sync:article -- --slug bikeshare
```
