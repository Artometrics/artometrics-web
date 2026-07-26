# Artometrics Sanity Studio

Editorial CMS schemas for reports, podcast, legal, authors, and approved member contributions.

Expo still reads `src/generated/*` (markdown bridge). Sanity sync is optional for magazine UGC via `POST /api/sanity-sync`.

See [docs/SANITY_SETUP.md](../docs/SANITY_SETUP.md) for env vars, sanity.io click steps, and the go-live checklist.

```bash
cp .env.example .env   # set SANITY_STUDIO_PROJECT_ID
npm install
npm run dev            # or from repo root: npm run sanity:dev
npm run deploy         # or: npm run sanity:deploy
```
