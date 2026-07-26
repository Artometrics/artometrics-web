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

## Color tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| Accent | `#C0392B` | `#E05C5C` | Desks, CTAs, links |
| Text | `#171717` | `#FAFAFA` | Primary copy |
| Muted | `#525252` | `#A3A3A3` | Meta |
| Surface | `#FFFFFF` | `#0A0A0A` | Page |
| Elevated | `#FAFAF8` | `#171717` | Bands |
| Rule | `#E5E5E5` | `#404040` | Dividers |

Fonts: Georgia / Times for editorial; Chomsky for brand; system sans for UI chrome.

## Do / don’t

**Do:** high contrast, full-bleed heroes on mobile, serif headlines, sparse red accents, reproducible charts.  
**Don’t:** purple AI gradients, cream+terracotta clichés, card dashboards as home, inventing data, renaming `fundations`-era Astro paths.

## Export checklist (owner)

- [x] SVG black A + white A + red A (`brand/svg/monogram-a-*.svg`)
- [x] 1024 app icon SVG + favicon SVG
- [x] OG mark SVG (`brand/svg/og-mark.svg`) — composite to `1200×630` PNG when needed
- [ ] Press PDF one-pager (mission + desks + contact)

See also: `docs/OWNER_PLAYBOOK.md`, `constants/Colors.ts`.
