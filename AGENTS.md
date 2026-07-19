# AGENTS.md — Artometrics

This file describes **this repo only** — the Artometrics magazine product at [artometrics.com](https://artometrics.com).

## What this project is

Artometrics is an independent **data-science magazine for the creative industries and culture**. It publishes editorial data reports (with reproducible charts and public datasets), a podcast, author profiles, legal/ethics pages, and membership flows (login, signup, pricing, account).

Primary use case: long-form investigative reports organized by editorial desk, plus subscriber-only podcast episodes and saved-report features — on **web and native** from one Expo codebase.

## Tech stack

From `package.json` and `app.json`:

- **Expo** `~57` + **Expo Router** (file-based routes in `app/`)
- **React Native** / **React Native Web** (static web export via `expo export -p web`)
- **Content:** markdown in `src/content/*` → `scripts/build-content.mjs` → `src/generated/*.json`
- **Charts:** Plotly on web (`components/ArticleBody.web.tsx`); PNG fallbacks on native WebView
- **Membership:** `@supabase/supabase-js`, Stripe via Netlify functions
- **Site URL:** `https://artometrics.com` (`EXPO_PUBLIC_SITE_URL`)

## Folder map

| Area | Path | Notes |
|------|------|-------|
| Routes | `app/` | Expo Router (`(site)` chrome + screens) |
| Components | `components/` | Header, footer, cards, article body |
| Lib | `lib/` | Content accessors, auth, Supabase, plans |
| Brand tokens | `constants/Colors.ts` | Accent red + base neutrals |
| Content (source) | `src/content/` | Markdown/MDX per collection |
| Content (built) | `src/generated/` | JSON consumed by the app |
| Scripts | `scripts/` | Content build, GitHub article sync |
| Styles (articles) | `public/css/artometrics-article.css` | Quarto/article chrome |
| Public assets | `public/` | Images, audios, chart JSON, fonts |
| Native assets | `assets/` | Icons, splash, Chomsky font |
| Netlify | `netlify/` + `netlify.toml` | Functions + redirects |

Path alias: `@/*` → project root (`tsconfig.json`).

## Content collections

Schemas are enforced by `scripts/build-content.mjs` (not Astro Zod).

### `blog` — `src/content/blog/`

- Required frontmatter: `title`, `slug`, `pubDate`, `description`, `heroImage`, `tags` (`culture|atlas|history|persona|power`)
- Optional: `draft`, `author`
- Body is HTML (Quarto sync)
- Template: `src/content/blog/anime.md`

### `authors` — `src/content/authors/`

- Required: `name`, `image: { url, alt }`
- Optional: `role`, `bio`, `socials`
- Template: `src/content/authors/juliet-ramos.md`

### `podcast` — `src/content/podcast/`

- Required: `title`, `pubDate`, `description`, `author`, `image`, `guestAvatar`, `tags`
- Optional: `episodeNumber`, `duration`, `audioSrc`, `isRecent`, `isPopular`, `isLocked`
- Template: `src/content/podcast/1.md`

### `legal` — `src/content/legal/`

- Required: `page`, `pubDate`
- Template: `src/content/legal/ethics-statement.md`

## Routing conventions

- **Home:** `/`
- **Blog listing:** `/blog` (nav label “Reports”)
- **Blog post:** `/<slug>` via `app/(site)/[slug].tsx`
- **Podcast:** `/podcast`, episodes at `/podcast/interviews/<id>`
- **Authors:** `/authors`, `/authors/<id>`
- **Legal:** `/legal/<id>`
- **Membership:** `/login`, `/signup`, `/pricing`, `/account`
- **About / contact:** `/about`, `/contact`

## Commands

| Command | Action |
|--------|--------|
| `npm install` | Install dependencies |
| `npm run content` | Rebuild `src/generated/*` |
| `npm run dev` | Expo web |
| `npm start` | Expo CLI |
| `npm run build` | Static web export → `dist/` |
| `npm run sync:articles` | Sync Quarto repos → blog markdown + chart assets |

## Article pipeline (GitHub repos → app)

Unchanged from the Astro era: gold-standard reports live under [Artometrics](https://github.com/Artometrics). `scripts/sync-github-articles.mjs` still writes `src/content/blog/<slug>.md` and chart assets under `public/`.

Run `npm run content` after syncing so the Expo app picks up new posts.

## Guardrails for AI / contributors

- Prefer **minimal diffs** and `@/` imports from the project root.
- Keep public-facing copy **Artometrics-branded**.
- Do **not** reintroduce Astro; this product is Expo-only.
- Verify `npm run build` after changing routes or the content builder.
- Netlify API redirects (`/api/*`) must stay above the SPA fallback in `netlify.toml`.
