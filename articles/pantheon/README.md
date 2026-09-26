# Power, Art, and Science Dominate Global Memory—85,000 Lives in MIT's Pantheon Dataset

**Desk:** humanities · **Live:** https://artometrics.com/pantheon/

85,000+ biographies in MIT's Pantheon dataset reveal which occupations and cities compound fame across languages—and which achievements remain local.

## Layout

```text
pantheon/
  _quarto.yml
  pantheon.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/pantheon
quarto render
npm run sync:article -- --slug pantheon
```
