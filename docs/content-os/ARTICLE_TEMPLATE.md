# Article HTML template (Content OS)

Use with `npm run cos:scaffold`. Body is HTML inside markdown after frontmatter.

## Frontmatter

```yaml
---
title: "SHORT TITLE: Human readable headline"
slug: my-topic-slug
pubDate: 2026-07-22
description: "One-sentence dek for SEO, cards, and AEO."
heroImage: /images/content/articles/my-topic-slug/hero.png
tags: [culture]          # primary desk: culture|atlas|history|persona|power
channels: [games, film]  # optional discovery channels
draft: true
author: null
---
```

## Required HTML skeleton

1. `#quarto-content` wrapper  
2. TOC nav (`IN THIS REPORT`)  
3. Fast Facts strip  
4. Dataset context  
5. Chart sections (`.art-chart` with Plotly JSON or PNG)  
6. Limitations  
7. Editor’s note  
8. Download rail hooks (filled at publish / by pack script):

```html
<aside class="art-files" data-download-rail>
  <h2>Reuse this report</h2>
  <ul>
    <li><a data-file="dataset" href="#">Dataset (CSV)</a></li>
    <li><a data-file="quarto" href="#">Quarto / source</a></li>
    <li><a data-file="html" href="#">Article HTML</a></li>
    <li><a data-file="pdf" href="#">PDF</a></li>
  </ul>
</aside>
```

## Honesty

- No fabricated statistics.  
- Mark missing charts as placeholders.  
- Cite public sources.  
- Keep Artometrics voice: adult, precise, non-hype.

Style: `docs/content-os/STYLE_GUIDE.md`.
