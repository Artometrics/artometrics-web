# 100,000 wine ratings reveal a 2-point spread between Austria and Chile

**Desk:** culture · **Live:** https://artometrics.com/wine-ratings/

Austria leads Chile by 2.00 points; the median sits at 88.0 in a dataset where the top dozen titles all score 100.

## Layout

```text
wine-ratings/
  _quarto.yml
  wine-ratings.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/wine-ratings
quarto render
npm run sync:article -- --slug wine-ratings
```
