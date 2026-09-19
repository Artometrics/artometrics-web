# Who Drinks the Most Alcohol Per Capita?

**Desk:** culture · **Live:** https://artometrics.com/alcohol-consumption/

Country-level consumption data map which nations drink the most per person—and how that has shifted.

## Layout

```text
alcohol-consumption/
  _quarto.yml
  alcohol-consumption.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/alcohol-consumption
quarto render
npm run sync:article -- --slug alcohol-consumption
```
