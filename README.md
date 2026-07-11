# Artometrics

Independent data journalism on culture, place, history, persona, and power — built for the creative industries.

**Live site:** [artometrics.com](https://artometrics.com)

## What this is

Artometrics publishes long-form, data-driven reports and a podcast on the creative economy. Reports sync from the [Artometrics GitHub org](https://github.com/Artometrics) and render with interactive charts, cited sources, and a shared [methodology](/methodology/) page.

The site is organized into five editorial desks:

| Desk | Focus |
|------|--------|
| **Culture** | Music, film, anime, games, and the business of art |
| **Atlas** | Cities, regions, and creative ecosystems |
| **History** | Long-run patterns, institutions, and civilizational data |
| **Persona** | Leaders, archetypes, and figures who shaped systems |
| **Power** | Institutions and how influence accumulates |

## Tech stack

- [Astro](https://astro.build/) 7 + MDX
- Tailwind CSS 4
- Content collections (`blog`, `podcast`, `authors`, `legal`)
- Netlify (hosting, serverless functions for auth and billing)
- Supabase + Stripe for membership

See [AGENTS.md](./AGENTS.md) for routing, content schemas, and contributor guardrails.

## Requirements

- Node.js 18 or 20 (LTS recommended)
- npm

## Commands

Run from the repo root:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview the production build |
| `npm run astro ...` | Run Astro CLI commands |
| `npm run sync:articles` | Sync Quarto repos → blog markdown + chart assets |
| `npm run scaffold:repo -- --batch-from-site` | Scaffold local GitHub repo layouts for Python-only articles |
| `npm run upgrade:repos` | Audit/upgrade the 10 existing Artometrics GitHub repos |
| `npm run publish:repos` | Push local repo upgrades to `Artometrics/*` on `main` (requires org write access) |
| `npm run migration:manifest` | Write `docs/migration-manifest.json` for 79 Python-only articles |
| `npm run render:readmitted` | Export readmitted chart PNGs via R (requires Quarto/R locally) |
| `npm run render:readmitted:py` | Export readmitted PNG + Plotly JSON via Python (red/white/black palette) |
| `npm run setup:r` | Install CRAN packages for R chart export (`ggtext`, `cowplot`, `showtext`, etc.) |

## Content workflows

- **Blog reports:** `src/content/blog/` — frontmatter template in `src/content/blog/anime.md`
- **Sync GitHub articles:** `npm run sync:articles`
- **Podcast episodes:** `src/content/podcast/` — template in `src/content/podcast/1.md`
- **Authors:** `src/content/authors/`

## Links

- **GitHub:** https://github.com/Artometrics
- **RSS:** https://artometrics.com/rss.xml
- **Ethics:** https://artometrics.com/legal/ethics-statement
