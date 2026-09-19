# 69,027 LCSH Records Anchor Project Gutenberg's Catalog Core

**Desk:** arts · **Live:** https://artometrics.com/project-gutenberg/

LCSH accounts for 69% of subject headings; PS (American literature) appears 4,684 times — concentration defines the reusable public-domain canon.

## Layout

```text
project-gutenberg/
  _quarto.yml
  project-gutenberg.qmd
  data/
  charts/
  figures/
```

```bash
cd articles/project-gutenberg
quarto render
npm run sync:article -- --slug project-gutenberg
```
