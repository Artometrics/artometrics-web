# Handoff: Artometrics — IG assets, Newsstand, Media/VHS shelf, Edition pages

## Overview
Design references for artometrics.com surfaces, grounded in the real repo (`Artometrics/artometrics-web`, Expo + React Native Web, `main` branch). The site's brand system is ALREADY implemented there (Kruger black/white/red, DM Mono/DM Sans, Chomsky wordmark) — this handoff extends it, it does not replace it.

## Repo context (read before implementing)
- Stack: Expo Router + React Native / React Native Web, styled with `uniwind` (Tailwind-for-RN) via `className`, not plain CSS.
- Brand tokens already live in `constants/Colors.ts` — `MagazineFonts` (DM Mono display/wordmark, DM Sans body), `MagazineThemes` (light/dark), `Colors.magazineAccent = "#C0392B"`, `Colors.accent500 = "#D9251B"`. **Reuse these tokens — do not hardcode new hex values.**
- The homepage newsstand grid already exists at `components/Newsstand.tsx` (wood-shelf styling, `MagazineCover` sub-component, responsive column count). It's more ornate (shelf/wood-grain background) than the flat black newsstand mock built in Claude Design — reconcile intentionally, don't just overwrite.
- Card patterns: `components/MagazineCard.tsx` (tile/portrait/compact variants), `components/BlogCard.tsx`.
- Header: `components/SiteHeader.tsx` (search, Studio CTA, avatar menu — already Kruger-styled).
- Wordmark: `components/Logo.tsx`, using Chomsky font served from `assets/fonts/Chomsky.otf` / `public/fonts/Chomsky.otf`. Don't reload Chomsky from a CDN — use the repo's own font asset.
- Brand asset kit: `brand/svg/` (monogram A in black/white/red, wordmark, lockups), mirrored to `public/images/brand/svg/`. OG default at `public/images/brand/og-default.png`.
- Content OS already has an IG zine packer script: `npm run cos:zine` → `scripts/content-os/pack-ig-zine.mjs`. **Check this script before building a new carousel generator — it may already produce zine slides from published reports.**

## What's net-new in this handoff (not yet in the repo, as far as this pass found)
1. **IG Carousel — Kruger Style** (1:1, red-block-on-photo treatment) — a punchier, more editorial carousel format than whatever `pack-ig-zine.mjs` currently outputs. Compare before adding a second generator.
2. **IG Carousel — Live Content** — same treatment populated with real current homepage headlines (Padres, Beyoncé, Oscars/Grammys/Nobels, Cities piece), as a proof of the format against real content.
3. **Media & Books — VHS Shelf** — a VHS-spine shelf treatment for a media/books collection page. No equivalent page found in the repo; this is a new page concept (route to be decided — e.g. `/library` or `/media`, note `Library` already appears as a nav item on the live site's footer).
4. **Edition Page / Edition Cover mockups** — dark editorial article layout and special-edition cover block. Compare against the real article route (`app/(site)/...`, `components/ArticleBody(.web).tsx`, `data/editions.ts`) before treating as net-new — the repo likely already renders articles; these mocks may just be a visual refinement to propose.

## Fidelity
High-fidelity for color/type/spacing intent. NOT literal markup to paste — the real app is React Native Web with `uniwind` className styling, not plain HTML/CSS. Translate each mock into RN components (`View`/`Text`/`Pressable`/`Image` from `expo-image`) following the patterns in `Newsstand.tsx` / `MagazineCard.tsx`.

## Design tokens (already in repo — reuse, don't redefine)
- `Colors.magazineAccent` #C0392B (print/editorial accent), `Colors.accent500` #D9251B (brighter UI accent)
- `Colors.black` #000000, `Colors.white` #FFFFFF, `Colors.base600` #525252, `Colors.base200` #E5E5E5, `Colors.base100` #F5F5F5
- `MagazineFonts.display`/`wordmark` = "DM Mono", `MagazineFonts.sans` = "DM Sans"
- Chomsky reserved for wordmark only (`Logo.tsx`), never body/headers.
- No border-radius, no box-shadow (except the deliberate paper-drop-shadow already used on `MagazineCover`), no gradients outside what's already in `Newsstand.tsx`'s wood shelf.

## Files in this bundle (Claude Design mocks — visual reference only)
- `Artometrics Design System.dc.html` — token/type/component reference (cross-check against `Colors.ts` — should match; flag any drift).
- `Artometrics IG Zine Pack.dc.html` — 6-slide 4:5 flat editorial carousel.
- `Artometrics IG Carousel - Kruger Style.dc.html` — 6-slide 1:1 red-block-on-photo carousel, placeholder photo slots.
- `Artometrics IG Carousel - Live Content.dc.html` — same treatment with real current homepage headlines (pulled from artometrics.com 2026-08-01 — re-pull from `data/*.ts` or the live API before implementing, this was a manual snapshot).
- `Artometrics OG Card.dc.html` — 1200×630 share card (compare against existing `public/images/brand/og-default.png` — may already be solved).
- `Artometrics Edition Cover.dc.html`, `Artometrics Edition Page.dc.html` — special-edition cover + dark article layout mocks.
- `Artometrics Website Home.dc.html` — homepage newsstand hero mock (flatter than the real `Newsstand.tsx` — treat as a simplification proposal, not a replacement).
- `Artometrics Media & Books - VHS Shelf.dc.html` — new VHS-spine shelf concept for a media/books page.

## Suggested Claude Code task order
1. Diff this handoff against `constants/Colors.ts`, `components/Newsstand.tsx`, `components/MagazineCard.tsx`, and `scripts/content-os/pack-ig-zine.mjs` first — confirm what's genuinely net-new vs. duplicative.
2. If the Kruger-style carousel is wanted as a real content-pipeline output, extend `pack-ig-zine.mjs` (or add a sibling `pack-ig-kruger.mjs`) rather than hand-building slides — Content OS already knows how to pull report data.
3. VHS shelf: new route + component, following `Newsstand.tsx`'s structure (grid + responsive cols) but with spine/box-art visual treatment instead of magazine covers.
4. Reuse `MagazineFonts`/`Colors` tokens throughout — do not hardcode hex or font-family strings.
