# Global median life expectancy nearly tripled in five centuries

**Desk:** science · **Live:** https://artometrics.com/global-life-expectancy/

Global median life expectancy rose from 33.9 to 73 years between 1543 and 2015, yet top countries still outlive the lowest by more than two-to-one.

## Layout

```text
global-life-expectancy/
  _quarto.yml
  global-life-expectancy.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/global-life-expectancy
quarto render
npm run sync:article -- --slug global-life-expectancy
```
