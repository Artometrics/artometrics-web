# Catalog Depth and Genre Travel Predict Pop Fame Duration

**Desk:** arts · **Live:** https://artometrics.com/musicbrainz-pop-fame-mechanics/

Artists with 15+ release groups and 3+ genre tags sustain fame 40% longer than single-era acts, per MusicBrainz metadata analysis.

## Layout

```text
musicbrainz-pop-fame-mechanics/
  _quarto.yml
  musicbrainz-pop-fame-mechanics.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/musicbrainz-pop-fame-mechanics
quarto render
npm run sync:article -- --slug musicbrainz-pop-fame-mechanics
```
