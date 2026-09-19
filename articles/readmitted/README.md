# 48% of U.S. Hospitals Still Exceed CMS's 30-Day Readmission Benchmark

**Desk:** science · **Live:** https://artometrics.com/readmitted/

48.1% of hospital-condition pairs exceed CMS's expected readmission rate; Hip/Knee leads at 1.00485 ERR—nearly twice the excess of the next track.

## Layout

```text
readmitted/
  _quarto.yml
  readmitted.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/readmitted
quarto render
npm run sync:article -- --slug readmitted
```
