# Artometrics design system (v1.0)

Barbara Kruger–influenced Swiss/magazine hybrid for [artometrics.com](https://artometrics.com).

Canonical product reference also lives in Notion: **Artometrics Design System**.

These HTML files are design references — recreate in the Expo codebase (`components/`, `app/(site)/`, Content OS packs). Do not freestyle a second brand.

## Tokens

| Token | Hex | Use |
|-------|-----|-----|
| `--color-black` | `#000000` | Text, rules, dark surfaces |
| `--color-white` | `#FFFFFF` | Paper / light surfaces |
| `--color-gray-100` | `#F5F5F5` | Light panels |
| `--color-gray-200` | `#E5E5E5` | Hairlines |
| `--color-gray-600` | `#525252` | Muted / meta |
| `--color-accent` | `#C0392B` | Print / editorial accent |
| `--color-accent-ui` | `#D9251B` | On-screen links / buttons |

**Type:** Display/headers — DM Mono (uppercase, tight). Body — DM Sans. Wordmark only — Chomsky. Data/captions — DM Mono small gray.

**Rules:** 2px solid black section dividers; short red accent rules (60–140px). No border-radius, no soft multi-layer shadows, no gradients, no purple, no cream/terracotta.

## Reference files

| File | Purpose |
|------|---------|
| `Artometrics_Design_System.dc_ffd4.html` | Tokens, type, components, do/don’t |
| `Artometrics_Website_Home.dc_80ca.html` | Newsstand + homepage bands |
| `Artometrics_Edition_Cover.dc_2241.html` | Edition cover block |
| `Artometrics_Edition_Page.dc_7e08.html` | Dark edition article layout |
| `Artometrics_IG_Zine_Pack.dc_50e8.html` | 6-slide 4:5 zine |
| `Artometrics_IG_Carousel_-_Kruger_Style.dc_622f.html` | 1:1 Kruger carousel |
| `Artometrics_IG_Carousel_-_Live_Content.dc_fc6a.html` | Live-headline carousel |
| `Artometrics_OG_Card.dc_cb3c.html` | 1200×630 share card |
| `Artometrics_Media___Books_-_VHS_Shelf.dc_97a6.html` | VHS media shelf |

## Mapped into product

- Tokens: `constants/Colors.ts`, `global.css`
- Home newsstand + editorial bands: `components/Newsstand.tsx`, `components/HomeEditorial.tsx`
- Editions + VHS shelf: `app/(site)/editions/*`, `components/VhsShelf.tsx`
- IG zine packer: `npm run cos:zine` → `scripts/content-os/pack-ig-zine.mjs`
- OG default: `public/images/brand/og-default.png`
