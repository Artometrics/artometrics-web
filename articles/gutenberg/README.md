# English Commands 72% of Gutenberg's 75,000-Book Public-Domain Shelf

**Desk:** arts · **Live:** https://artometrics.com/lcsh/

'English titles hold 72% of indexed Gutenberg availability; 19th-century fiction peaks at 2.8× other eras; adventure and gothic subjects adapt 3× faster.'

## Layout

```text
lcsh/
  _quarto.yml
  lcsh.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/lcsh
quarto render
npm run sync:article -- --slug lcsh
```
