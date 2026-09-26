# Who Drinks the Most Alcohol Per Capita?

**Desk:** culture · **Live:** https://artometrics.com/alcohol/

Country-level consumption data map which nations drink the most per person—and how that has shifted.

## Layout

```text
alcohol/
  _quarto.yml
  alcohol.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/alcohol
quarto render
npm run sync:article -- --slug alcohol
```
