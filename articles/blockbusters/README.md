# How Movies Become Famous on IMDb’s Public Scoreboard

**Desk:** arts · **Live:** https://artometrics.com/blockbusters/

Title fields, ratings, and box-office references explain how films accumulate attention.

## Layout

```text
blockbusters/
  _quarto.yml
  blockbusters.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/blockbusters
quarto render
npm run sync:article -- --slug blockbusters
```
