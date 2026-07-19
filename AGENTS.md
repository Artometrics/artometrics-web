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
| Article homes | `articles/` | Monorepo gold reports (e.g. `articles/readmitted/`) — data, Quarto, charts |
| Sync scripts | `scripts/` | Local article sync, GitHub article sync, member episode sync |

Path alias: `@/*` → `src/*` (`tsconfig.json`).

## Content collections (`src/content.config.ts`)

### `blog`

- **Folder:** `src/content/blog/`
- **Required frontmatter:** `title`, `slug`, `pubDate`, `description`, `heroImage`, `tags` (enum: `culture|atlas|history|persona|power`)
- **Optional:** `draft`, `author`
- **Template:** `src/content/blog/anime.md` (gold monorepo prototype: `readmitted`)
- **Import:** monorepo `articles/<slug>/` via `npm run sync:readmitted` (gold path); older pieces may still use `node scripts/sync-github-articles.mjs`

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

| `npm run sync:articles` | Sync Quarto repos → blog markdown + chart assets (legacy path) |
| `npm run sync:readmitted` | Copy `articles/readmitted/` charts + data → `public/` |
| `npm run render:readmitted` | R export PNG + Plotly JSON for READMITTED |
| `npm run scaffold:repo -- --batch-from-site` | Scaffold local GitHub repo layouts for Python-only articles |
| `npm run upgrade:repos` | Audit/upgrade the 10 existing Artometrics GitHub repos |
| `npm run publish:repos` | Push local repo upgrades to `Artometrics/*` on `main` (requires org write access) |
| `npm run migration:manifest` | Write `docs/migration-manifest.json` for Python-only articles |
| `npm run render:readmitted:py` | Python fallback chart export (debug only) |
| `npm run setup:python` | Install Python chart export dependencies |

## Article pipeline (monorepo gold → site)

**READMITTED** is the locked gold prototype. Analysis assets live under `articles/readmitted/` in this repo (bundled CSVs, Quarto, R chart outputs, hero). Render with `npm run render:readmitted`, sync with `npm run sync:readmitted`, publish body in `src/content/blog/readmitted.md`. No external article repo is required for this piece.

Older reports may still use singular repos under [Artometrics](https://github.com/Artometrics) and `scripts/sync-github-articles.mjs` until migrated.

| Path | Purpose |
|------|---------|
| `articles/readmitted/` | Gold report home (data, Quarto, charts, QA) |
| `scripts/render-readmitted-charts.R` | R PNG + Plotly JSON export → `articles/` + `public/` |
| `scripts/sync-readmitted.mjs` | Copy local article assets into `public/` |
| `scripts/sync-github-articles.mjs` | Legacy: clone external Quarto repos, rewrite blog body |
| `scripts/r/artometrics_theme.R` | Shared `theme_artometrics()` + chart export helpers |
| `scripts/scaffold-article-repo.mjs` | Scaffold new repo layouts from site articles |
| `scripts/upgrade-article-repos.mjs` | Audit PNG/JSON pairs for the 10 existing repos |
| `scripts/publish-article-repos.mjs` | Push `.cache/article-repos/` to GitHub `main` |
| `pilot-drafts/readmitted/` | Earlier pilot bundle (superseded by `articles/readmitted/`) |
| `docs/migration-manifest.json` | 79 Python-only articles queued for R Quarto migration |
| `.cache/article-scaffolds/` | Generated repo layouts (gitignored) |
| `public/data/articles/<slug>/charts/` | Plotly JSON for live charts |
| `src/scripts/art-charts.ts` | Hydrate charts, red palette, save/share toolbar |

**Per-chart UI:** each `.art-chart` figure gets **Save PNG** and **Share chart** via `initChartToolbars()` in `art-charts.ts`.

## Commands

| Command | Action |
|--------|--------|
| `npm install` | Install dependencies |
| `npm run setup:pipeline` | Install R, Quarto, CRAN + Python chart toolchain (idempotent) |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Guardrails for AI / contributors

- Do **not** rename `src/components/fundations/`.
- Do **not** widen Zod schemas without updating all consumers.
- Prefer **minimal diffs** and `@/` imports.
- Keep public-facing copy **Artometrics-branded** — not Lexington/Hemingway theme demo text.
- Verify builds after changing collections, `site`, or integrations.
