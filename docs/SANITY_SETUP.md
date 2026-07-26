# Sanity setup (editorial + approved UGC)

Artometrics keeps **Expo** as the product runtime. Sanity is the **content plane** for editorial archive and approved member contributions.

## Ownership

| Content | Where |
|---------|--------|
| Staff reports, podcast, legal, authors | Sanity (target); markdown bridge until migrated |
| Member private drafts (Twilda / Aftercare) | Supabase only |
| Published profile posts | Supabase `member_posts` |
| Magazine-accepted UGC | Sanity `memberContribution` after review |

## Local Studio

```bash
cd sanity
npm install
npx sanity init   # or set projectId in sanity.config.ts
npm run dev
```

Env (Netlify + local):

- `SANITY_PROJECT_ID`
- `SANITY_DATASET` (default `production`)
- `SANITY_API_WRITE_TOKEN` (server-only, for sync function)
- `EXPO_PUBLIC_SANITY_PROJECT_ID` / `EXPO_PUBLIC_SANITY_DATASET` (optional client read)

## Sync path

1. Member submits post → `member_posts.status = submitted`
2. Editor approves in app queue or creates Sanity draft via `POST /api/sanity-sync`
3. Publish in Sanity → magazine surface (future build-content sync from Sanity)

Until the markdown bridge is retired, Expo continues to read `src/generated/*`.

## Go-live checklist

1. Create Sanity project; set `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_WRITE_TOKEN` on Netlify.
2. Deploy Sanity Studio (`cd sanity && npm run deploy` or host separately).
3. Confirm `POST /api/sanity-sync` returns 200 for a submitted `member_posts` id (not 503).
4. Studio Publish → “Submit to magazine” should mention Sanity queue success.
5. Keep markdown/`npm run content` as source of truth for staff reports until a migration pass copies them into Sanity schemas.

Without credentials, magazine submit still works via Supabase; Sanity sync is optional and surfaces a clear message in the Publish UI.
