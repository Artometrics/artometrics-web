# 'Hurricane Maria delivered 5,072-unit peak to Puerto Rico in 2017 three-state season'

**Desk:** culture · **Live:** https://artometrics.com/hurricanes/

Texas, Florida, and Puerto Rico absorbed 100% of measured 2017 hurricane impact in 153-record TidyTuesday extract; median reading 703, ceiling 5,072.

## Layout

```text
hurricanes/
  _quarto.yml
  hurricanes.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/hurricanes
quarto render
npm run sync:article -- --slug hurricanes
```
