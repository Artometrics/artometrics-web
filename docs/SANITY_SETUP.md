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
