---
paths:
  - "src/pages/**"
---

# Pages (`src/pages/**`)

- **File-based routing:** Each `.astro` (or `rss.xml.js`) maps to a URL path from its path under `src/pages/`.
- **Dynamic segments:**
  - `[slug].astro` — param `slug` = `blog` entry frontmatter `slug` (root-level `/<slug>/`; excludes section hub slugs).
  - `[section]/index.astro` — section hubs at `/culture/`, `/atlas/`, `/history/`, `/persona/`, `/power/`.
  - `podcast/interviews/[...slug].astro` — `slug` = `podcast` entry `id`.
  - `legal/[...slug].astro` and `authors/[...slug].astro` — pass `trailingSlash: false` in `getStaticPaths` entries (match existing pattern).
  - Tag routes: `blog/tags/[tag].astro`, `podcast/tags/[tag].astro` — param is a tag string from frontmatter arrays.
- **Layouts:** Use `BaseLayout` for marketing/system pages. Use `BlogLayout` / `PodcastLayout` / `AuthorsLayout` / `LegalLayout` only on the routes that already import them — they expect specific `frontmatter` / props.
- **RSS:** `rss.xml.js` maps items to `/${post.data.slug}/` — keep in sync with `[slug].astro`. Legacy `/blog/posts/:slug` → `/:slug` redirect in `public/_redirects`.
- **Props:** Some pages pass `pageTitle` or `hideNav` / `hideFooter` to `BaseLayout`; follow adjacent files when adding new routes.
