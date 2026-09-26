# Catalog Depth and Genre Travel Predict Pop Fame Duration

**Desk:** arts · **Live:** https://artometrics.com/fame/

Artists with 15+ release groups and 3+ genre tags sustain fame 40% longer than single-era acts, per MusicBrainz metadata analysis.

## Layout

```text
fame/
  _quarto.yml
  fame.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/fame
quarto render
npm run sync:article -- --slug fame
```
