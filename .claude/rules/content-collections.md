---
paths:
  - "src/content/**"
---

# Content (`src/content/**`)

- **Schemas live in** `src/content.config.ts` only. Collections: `blog`, `authors`, `podcast`, `legal` — each backed by a **glob** loader with paths under `src/content/<name>/`.
- **Do not change Zod fields** without updating every consumer (`src/pages/**`, layouts, components, `src/pages/rss.xml.js`). Optional vs required must stay consistent with how pages read `entry.data`.
- **`blog` collection:** `src/content/blog/**/*.{md,mdx}` with `retainBody: true`. Required frontmatter: `title`, `slug`, `pubDate`, `description`, `heroImage` (string path under `/images/content/`), `tags` (enum: `culture|atlas|history|persona|power`), `draft` (default `false`). Import via `scripts/import-ghost.mjs`.
- **`image()`:** `authors` and `podcast` use `image: { url: image(), alt: z.string() }` (podcast also `guestAvatar`). Blog hero images are plain strings pointing at `public/images/content/`.
- **Copy-paste templates:**
  - Blog: any file in `src/content/blog/` (e.g. `anime.md`)
  - Authors: `src/content/authors/juliet-ramos.md`
  - Podcast: `src/content/podcast/1.md` (`audioSrc` under `/audios/...` → `public/audios/`)
  - Legal: `src/content/legal/privacy.md`
- **`blog`** uses `retainBody: true`; `src/pages/[slug].astro` uses `entry.body` with `reading-time` — be mindful when changing loader options.
- **Author slugs in podcast** are strings (e.g. `author: "david-lee"`) that align with `src/content/authors/` entry ids/slugs.
