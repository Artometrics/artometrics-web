# English Commands 72% of Gutenberg's 75,000-Book Public-Domain Shelf

**Desk:** arts · **Live:** https://artometrics.com/project-gutenberg-public-domain-canon-map/

'English titles hold 72% of indexed Gutenberg availability; 19th-century fiction peaks at 2.8× other eras; adventure and gothic subjects adapt 3× faster.'

## Layout

```text
project-gutenberg-public-domain-canon-map/
  _quarto.yml
  project-gutenberg-public-domain-canon-map.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/project-gutenberg-public-domain-canon-map
quarto render
npm run sync:article -- --slug project-gutenberg-public-domain-canon-map
```
