# 'What does a city export? A data framework for economic identity'

**Desk:** civics · **Live:** https://artometrics.com/bioeconomics/

1,667 subnational regions and 1,100+ datasets define the economic signature of cities — exports, housing, transit, culture, and historical infrastructure.

## Layout

```text
bioeconomics/
  _quarto.yml
  bioeconomics.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/bioeconomics
quarto render
npm run sync:article -- --slug bioeconomics
```
