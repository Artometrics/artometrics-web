# AGENTS.md — Artometrics

This file describes **this repo only** — the Artometrics magazine site at [artometrics.com](https://artometrics.com).

## What this project is

Artometrics is an independent **data-science magazine for the creative industries and culture**. It publishes editorial data reports (with reproducible charts and public datasets), a podcast, author profiles, legal/ethics pages, and membership flows (login, signup, pricing, account).

Primary use case: long-form investigative reports organized by editorial desk, plus subscriber-only podcast episodes and saved-report features.

## Tech stack

From `package.json` and `astro.config.mjs`:

- **Astro** `^7.0.0`
- **MDX** — `@astrojs/mdx` (integration in `astro.config.mjs`)
- **RSS** — `@astrojs/rss` (`src/pages/rss.xml.js`)
- **Sitemap** — `@astrojs/sitemap` (integration)
- **Tailwind CSS** `^4.x` with **Vite plugin** `@tailwindcss/vite`
- **Plugins (in `src/styles/global.css`):** `@tailwindcss/typography`, `@tailwindcss/forms`, `tailwind-scrollbar-hide`
- **SEO component:** `@lexingtonthemes/seo` (see `src/components/fundations/head/Seo.astro`; defaults are Artometrics-branded)
- **Other:** `reading-time`, `plotly.js-dist-min` (interactive charts), `@supabase/supabase-js`, `stripe`
- **Content:** `astro:content` loaders + `z` from `astro/zod` in `src/content.config.ts`

Markdown: drafts enabled; Shiki theme `css-variables`. **Site URL:** `site: "https://artometrics.com"` in `astro.config.mjs`.

## Folder map

| Area | Path | Notes |
|------|------|-------|
| Routes | `src/pages/` | Astro file-based routing |
| Layouts | `src/layouts/` | `BaseLayout`, `BlogLayout`, `PodcastLayout`, `AuthorsLayout`, `LegalLayout` |
| Components | `src/components/` | `global/`, `fundations/`, `landing/`, `blog/`, `podcast/`, `authors/`, `ctas/`, `assets/` |
| Content | `src/content/` | Markdown/MDX per collection |
| Scripts | `src/scripts/` | Article chrome, Plotly chart rendering |
| Styles | `src/styles/global.css` | Tailwind v4 tokens |
| Images | `src/images/` | Thumbnails, authors, about |
| Public assets | `public/` | `public/audios/`, `public/images/content/`, `public/css/artometrics-article.css` |
| Sync scripts | `scripts/` | GitHub article sync, member episode sync |

Path alias: `@/*` → `src/*` (`tsconfig.json`).

## Content collections (`src/content.config.ts`)

### `blog`

- **Folder:** `src/content/blog/`
- **Required frontmatter:** `title`, `slug`, `pubDate`, `description`, `heroImage`, `tags` (enum: `culture|atlas|history|persona|power`)
- **Optional:** `draft`, `author`
- **Template:** `src/content/blog/anime.md`
- **Import:** `node scripts/sync-github-articles.mjs` from Artometrics GitHub repos

### `authors`

- **Folder:** `src/content/authors/`
- **Template:** `src/content/authors/juliet-ramos.md`

### `podcast`

- **Folder:** `src/content/podcast/`
- **Template:** `src/content/podcast/1.md`

### `legal`

- **Folder:** `src/content/legal/`
- **Template:** `src/content/legal/ethics-statement.md`

## Routing conventions

- **Home:** `/`
- **Blog listing:** `/blog` (labeled “Reports” in nav)
- **Blog post:** `/<slug>/` via `[slug].astro`
- **Section hubs:** `/culture/`, `/atlas/`, `/history/`, `/persona/`, `/power/`
- **Methodology:** `/methodology/`
- **Podcast:** `/podcast`, episodes at `/podcast/interviews/<id>`
- **Authors:** `/authors`, `/authors/<id>`
- **Legal:** `/legal/<id>`
- **RSS:** `/rss.xml`

## Customization guide

- **Site URL:** `site` in `astro.config.mjs`; SEO defaults in `Seo.astro`
- **Colors & typography:** `src/styles/global.css` `@theme` block
- **Chrome:** `Navigation.astro`, `Footer.astro`
- **`fundations` folder:** Do **not** rename — imports depend on this spelling

## Commands

| Command | Action |
|--------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Guardrails for AI / contributors

- Do **not** rename `src/components/fundations/`.
- Do **not** widen Zod schemas without updating all consumers.
- Prefer **minimal diffs** and `@/` imports.
- Keep public-facing copy **Artometrics-branded** — not Lexington/Hemingway theme demo text.
- Verify builds after changing collections, `site`, or integrations.
