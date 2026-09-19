# Medium posts at 4 minutes median — does length predict claps?

**Desk:** science · **Live:** https://artometrics.com/medium-articles/

78,388 Medium articles from 2017–2018 show median reading time of 4 minutes; scatter plots reveal no clean law linking length to applause.

## Layout

```text
medium-articles/
  _quarto.yml
  medium-articles.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/medium-articles
quarto render
npm run sync:article -- --slug medium-articles
```
