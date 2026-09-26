# 'Pizza Price Floors: How a 10,000-Row Menu Extract Reveals Two Economies'

**Desk:** culture · **Live:** https://artometrics.com/pizza/

10,000 pizza menu records show a median price floor of 0.00 and a premium tier reaching 50.0, encoding two separate markets in one dataset.

## Layout

```text
pizza/
  _quarto.yml
  pizza.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/pizza
quarto render
npm run sync:article -- --slug pizza
```
