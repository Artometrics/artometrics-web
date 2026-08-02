# Artometrics brand kit

## Wordmark & mark

- **Wordmark:** Chomsky typeface spelling “Artometrics” (header default).
- **Mark:** Solid Chomsky **A** (scroll-compact logo, favicon, app icon).
  - Light UI / light browser chrome → **black A** on transparent/white.
  - Dark UI / dark browser chrome → **white A** on transparent/black.
  - Accent mark (marketing) → **red A** (`#C0392B`) on black or white.

### SVG kit (source of truth)

See [`brand/svg/`](../brand/svg/) and [`brand/README.md`](../brand/README.md). Mirrored for the web at `public/images/brand/svg/`.

| File | Notes |
|------|--------|
| `monogram-a-black.svg` / `white` / `red` / `currentColor` | Monogram A |
| `wordmark-*.svg` | Wordmark (loads Chomsky from `/fonts/Chomsky.otf`) |
| `lockup-horizontal-*.svg` / `lockup-stacked-*.svg` | A + wordmark |
| `favicon.svg`, `app-icon-1024.svg`, `app-icon-light.svg`, `og-mark.svg` | Icons / social |

### Raster (native / fallback)

- `public/images/brand/chomsky-a-mark.png` (red A, transparent)
- `public/images/brand/chomsky-a-black.png` / `chomsky-a-white.png`
- `public/images/brand/favicon-light-*.png` / `favicon-dark-*.png`
- `assets/fonts/Chomsky.otf` / `public/fonts/Chomsky.otf`

## Color tokens (KSM energy × Kruger)

Loud zine build from [kylesmcauliffe.com](https://kylesmcauliffe.com) on Artometrics identity. Dark-first. See `docs/KSM_ENERGY_STYLE.md`.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| Accent UI | `#E60000` | `#E60000` | CTAs, links, signal band |
| Accent print | `#C0392B` | `#C0392B` | Optional covers / pull-quotes |
| Text | `#000000` | `#FFFFFF` | Primary copy |
| Muted | `#333333` | `#C8C8C8` | Meta |
| Surface | `#FFFFFF` | `#000000` | Page |
| Elevated | `#F4F4F4` | `#1A1A1A` | Bands |
| Rule | `#000000` | `#FFFFFF` | Hairlines |

Fonts: **Chomsky** wordmark only; **Anton** display/headers; **DM Sans** body; **DM Mono** data.

### Open Graph default

- `public/images/brand/og-default.png` — Kruger-forward **1200×630** share card (black field, white ARTOMETRICS, red rule). Used by `PageSeo` / `+html` when a page has no hero.

## Do / don’t

**Do:** high contrast, full-bleed heroes on promo surfaces, DM Mono headlines, sparse red accents, hard 2px rules, reproducible charts.  
**Don’t:** purple AI gradients, cream+terracotta clichés, soft multi-layer shadows/glow, card dashboards as home, inventing data, renaming `fundations`-era Astro paths.

## Export checklist (owner)

- [x] SVG black A + white A + red A (`brand/svg/monogram-a-*.svg`)
- [x] 1024 app icon SVG + favicon SVG
- [x] OG mark SVG (`brand/svg/og-mark.svg`)
- [x] OG default PNG `public/images/brand/og-default.png` (1200×630 Kruger)
- [ ] Press PDF one-pager (mission + desks + contact)

### Share graphics (sample)

Kruger-style square share cards for the franchise series live at `public/images/brand/share/`:

- `pay-for-october.png` — Padres series
- `27-titles.png` — Yankees series

Journalists can also grab the default OG card and SVG kit from `/press`.

