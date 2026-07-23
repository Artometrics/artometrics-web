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
| Article homes | `articles/` | Monorepo gold reports (e.g. `articles/readmitted/`) — data, Quarto, charts |
| Scripts | `scripts/` | Content build, GitHub article sync, READMITTED render/sync |
| Styles (articles) | `public/css/artometrics-article.css` | Quarto/article chrome |
| Public assets | `public/` | Images, audios, chart JSON, fonts |
| Native assets | `assets/` | Icons, splash, Chomsky font |
| Netlify | `netlify/` + `netlify.toml` | Functions + redirects |

Path alias: `@/*` → project root (`tsconfig.json`).

## Content collections

Schemas are enforced by `scripts/build-content.mjs` (not Astro Zod).

### `blog` — `src/content/blog/`

- Required frontmatter: `title`, `slug`, `pubDate`, `description`, `heroImage`, `tags` (`[domain, subdomain]` — domains: `arts|sports|science|humanities|civics|culture`; see `data/sections.ts` for the 43 subdomains)
- Optional: `draft`, `author`, `tldr`, `keyPoints`, `faq`, `audioSrc`
- Body is HTML (narrative magazine prose; Plotly charts preserved)
- Voice: professional, objective, insightful, no fluff — named/dated facts only
- Template: `src/content/blog/anime.md` (gold monorepo prototype: `readmitted`)
- Import: monorepo `articles/<slug>/` via `npm run sync:readmitted` (gold path); older pieces may still use `npm run sync:articles`

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
- **RSS / AEO:** `/rss.xml`, `/llms.txt`, `/sitemap.xml`

## Commands

| Command | Action |
|--------|--------|
| `npm install` | Install dependencies |
| `npm run setup:pipeline` | R + Quarto + pandoc + Python + print libs |
| `npm run setup:clis` | Netlify / Supabase / Stripe CLIs |
| `npm run doctor` | Green/red toolchain inventory |
| `npm run content` | Rebuild `src/generated/*` |
| `npm run dev` | Expo web |
| `npm start` | Expo CLI |
| `npm run build` | Static web export → `dist/` |
| `npm run sync:articles` | Sync Quarto repos → blog markdown + chart assets (legacy path) |
| `npm run sync:readmitted` | Copy `articles/readmitted/` charts + data → `public/` |
| `npm run render:readmitted` | R export PNG + Plotly JSON for READMITTED |
| `npm run render:readmitted:py` | Python fallback chart export (debug only) |
| `npm run cos:pdf -- --slug …` | Article PDF → `public/exports/` |
| `npm run cos:ebook -- --slug …` | Article EPUB |
| `npm run cos:narrate -- --slug …` | ElevenLabs MP3 (needs `ELEVENLABS_API_KEY`) |

Full stack recipe: `docs/FULL_STACK_RECIPE.md`. Backend hookup: `docs/BACKEND_HOOKUP_SESSION.md`.

## Article pipeline (monorepo gold → app)

**READMITTED** is the locked gold prototype. Analysis assets live under `articles/readmitted/` (bundled CSVs, Quarto, R chart outputs, hero). Render with `npm run render:readmitted`, sync with `npm run sync:readmitted`, publish body in `src/content/blog/readmitted.md`.

Older reports may still use singular repos under [Artometrics](https://github.com/Artometrics) and `scripts/sync-github-articles.mjs` until migrated. Run `npm run content` after syncing so the Expo app picks up new posts.

| Path | Purpose |
|------|---------|
| `articles/readmitted/` | Gold report home (data, Quarto, charts, QA) |
| `scripts/render-readmitted-charts.R` | R PNG + Plotly JSON export → `articles/` + `public/` |
| `scripts/sync-readmitted.mjs` | Copy local article assets into `public/` |
| `scripts/sync-github-articles.mjs` | Legacy: clone external Quarto repos, rewrite blog body |
| `scripts/r/artometrics_theme.R` | Shared `theme_artometrics()` + chart export helpers |
| `pilot-drafts/readmitted/` | Earlier pilot bundle (superseded by `articles/readmitted/`) |
| `public/data/articles/<slug>/charts/` | Plotly JSON for live charts |

## Content OS (editorial factory)

Keyword briefs, style rules, draft scaffolds, and AEO live under `docs/content-os/`.

| Command | Action |
|--------|--------|
| `npm run cos:brief -- --slug … --desk arts --subdomain film --title "…"` | New keyword brief |
| `npm run cos:scaffold -- --brief docs/content-os/briefs/<slug>.json` | Draft HTML report scaffold |
| `npm run cos:banner-prompt -- --brief …` | Higgsfield banner prompt |
| `npm run cos:publish -- --slug …` | Copy draft → `src/content/blog/` + rebuild JSON + `llms.txt` |
| `npm run cos:aeo` | Regenerate llms.txt, llms-full, sitemap, RSS |
| `npm run cos:zine -- --slug <slug>` | Instagram zine pack (slides.html + caption) |
| `npm run cos:pdf -- --slug <slug>` | Print PDF pack |
| `npm run cos:ebook -- --slug <slug>` | EPUB pack |
| `npm run cos:narrate -- --slug <slug>` | ElevenLabs narration MP3 |

Style bible: `docs/content-os/STYLE_GUIDE.md`. Overview: `docs/content-os/README.md`.  
Ops plan: `docs/MEDIA_COMPANY_PLAN.md`. Vision: `docs/MEDIA_EMPIRE_VISION.md`. Hand-off checklist: `docs/NEXT_STEPS.md`. Backend session: `docs/BACKEND_HOOKUP_SESSION.md`.

## Guardrails for AI / contributors

- Prefer **minimal diffs** and `@/` imports from the project root.
- Keep public-facing copy **Artometrics-branded**.
- Do **not** reintroduce Astro; this product is Expo-only.
- Verify `npm run build` after changing routes or the content builder.
- Netlify API redirects (`/api/*`) must stay above the SPA fallback in `netlify.toml`.
- New reports should start from a Content OS brief when possible.
