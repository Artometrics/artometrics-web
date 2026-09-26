# Which Sports Dynasties Convert Finals Appearances Into Championships?

**Desk:** sports · **Live:** https://artometrics.com/dynasties/

The Yankees hold 27 titles but convert 40% of Finals trips; the Patriots won 6 of 11 Super Bowls at 55% conversion across MLB, NBA, NFL, NHL since 1950.

## Layout

```text
dynasties/
  _quarto.yml
  dynasties.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/dynasties
quarto render
npm run sync:article -- --slug dynasties
```
