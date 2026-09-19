# 515 Fast-Food Items: Median 490 Calories, Ceiling 2,430

**Desk:** culture · **Live:** https://artometrics.com/fast-food-calories/

515 U.S. fast-food menu items show a median of 490 calories — top 12 items median 1,315; Sonic sits 80 above median, Chick-fil-A 100 below.

## Layout

```text
fast-food-calories/
  _quarto.yml
  fast-food-calories.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/fast-food-calories
quarto render
npm run sync:article -- --slug fast-food-calories
```
