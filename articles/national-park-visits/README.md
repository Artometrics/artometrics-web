# Golden Gate draws 14.6 million visits — 94× the median national park

**Desk:** culture · **Live:** https://artometrics.com/national-park-visits/

Golden Gate National Recreation Area recorded 14.6 million visits in the dataset's peak year — 94 times the system median of 155,219 across 21,560 park-year records from 1904–2016.

## Layout

```text
national-park-visits/
  _quarto.yml
  national-park-visits.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/national-park-visits
quarto render
npm run sync:article -- --slug national-park-visits
```
