# Sherlock Holmes Stories Cluster Around 12 Words per Record in Tokenized Corpus

**Desk:** arts · **Live:** https://artometrics.com/sherlock-holmes/

Tokenized Holmes corpus from TidyTuesday shows median 12.0 words, mean 10.9, with top five titles holding 34% of aggregate count.

## Layout

```text
sherlock-holmes/
  _quarto.yml
  sherlock-holmes.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/sherlock-holmes
quarto render
npm run sync:article -- --slug sherlock-holmes
```
