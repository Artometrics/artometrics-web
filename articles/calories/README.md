# 515 Fast-Food Items: Median 490 Calories, Ceiling 2,430

**Desk:** culture · **Live:** https://artometrics.com/calories/

515 U.S. calories menu items show a median of 490 calories — top 12 items median 1,315; Sonic sits 80 above median, Chick-fil-A 100 below.

## Layout

```text
calories/
  _quarto.yml
  calories.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/calories
quarto render
npm run sync:article -- --slug calories
```
