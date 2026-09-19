# 'Pizza Price Floors: How a 10,000-Row Menu Extract Reveals Two Economies'

**Desk:** culture · **Live:** https://artometrics.com/all-the-pizza/

10,000 pizza menu records show a median price floor of 0.00 and a premium tier reaching 50.0, encoding two separate markets in one dataset.

## Layout

```text
all-the-pizza/
  _quarto.yml
  all-the-pizza.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/all-the-pizza
quarto render
npm run sync:article -- --slug all-the-pizza
```
