# Artometrics

Independent data journalism on culture, place, history, persona, and power — built for the creative industries.

**Live site:** [artometrics.com](https://artometrics.com)

## What this is

Artometrics publishes long-form, data-driven reports and a podcast on the creative economy. The product is an **Expo** app (iOS, Android, and web) with a shared React Native codebase. Reports sync from the [Artometrics GitHub org](https://github.com/Artometrics) and render with interactive charts (web) plus PNG fallbacks (native).

Editorial desks:

| Desk | Focus |
|------|--------|
| **Culture** | Music, film, anime, games, and the business of art |
| **Atlas** | Cities, regions, and creative ecosystems |
| **History** | Long-run patterns, institutions, and civilizational data |
| **Persona** | Leaders, archetypes, and figures who shaped systems |
| **Power** | Institutions and how influence accumulates |

## Tech stack

- [Expo](https://expo.dev/) + [Expo Router](https://docs.expo.dev/router/introduction/) (web + native)
- React Native / React Native Web
- Markdown content under `src/content/` → JSON via `npm run content`
- Netlify (static Expo web export + serverless functions for auth/billing)
- Supabase + Stripe for membership

See [AGENTS.md](./AGENTS.md) for routing, content schemas, and contributor guardrails.

## Requirements

- Node.js 20+ (LTS recommended)
- npm

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run content` | Build JSON from `src/content/**` |
| `npm run dev` / `npm run web` | Expo web dev server |
| `npm start` | Expo dev tools (pick web / iOS / Android) |
| `npm run ios` | iOS simulator |
| `npm run android` | Android emulator |
| `npm run build` | Content build + `expo export -p web` → `./dist/` |
| `npm run sync:articles` | Sync Quarto repos → blog markdown + chart assets |
| `npm run scaffold:repo -- --batch-from-site` | Scaffold local GitHub repo layouts for Python-only articles |
| `npm run upgrade:repos` | Audit/upgrade the 10 existing Artometrics GitHub repos |
| `npm run publish:repos` | Push local repo upgrades to `Artometrics/*` on `main` |
| `npm run migration:manifest` | Write `docs/migration-manifest.json` |
| `npm run render:readmitted:py` | Export readmitted PNG + Plotly JSON |
| `npm run setup:python` | Install Python chart export dependencies |

## Content workflows

- **Blog reports:** `src/content/blog/` — template `src/content/blog/anime.md`
- **Sync GitHub articles:** `npm run sync:articles`
- **Podcast episodes:** `src/content/podcast/`
- **Authors:** `src/content/authors/`
- **Generated JSON:** `src/generated/` (committed after `npm run content`, rebuilt on start/build)

## Links

- **GitHub:** https://github.com/Artometrics
- **Ethics:** https://artometrics.com/legal/ethics-statement
