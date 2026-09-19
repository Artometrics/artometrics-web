# How Far Do Portland’s Biketown Rides Actually Go?

**Desk:** culture · **Live:** https://artometrics.com/biketown-bikeshare/

Trip-level bike-share data measures typical distance and duration across Biketown journeys.

## Layout

```text
biketown-bikeshare/
  _quarto.yml
  biketown-bikeshare.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/biketown-bikeshare
quarto render
npm run sync:article -- --slug biketown-bikeshare
```
