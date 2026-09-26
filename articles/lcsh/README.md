# 69,027 LCSH Records Anchor Project Gutenberg's Catalog Core

**Desk:** arts · **Live:** https://artometrics.com/lcsh/

LCSH accounts for 69% of subject headings; PS (American literature) appears 4,684 times — concentration defines the reusable public-domain canon.

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
