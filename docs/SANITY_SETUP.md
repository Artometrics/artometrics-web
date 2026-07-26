# Sanity setup (editorial + approved UGC)

Artometrics keeps **Expo** as the product runtime. Sanity is the **content plane** for editorial archive and approved member contributions.

Staff reports still ship from markdown → `npm run content` → `src/generated/*`. Do **not** migrate the archive in this pass.

## Ownership

| Content | Where |
|---------|--------|
| Staff reports, podcast, legal, authors | Sanity (target); markdown bridge until migrated |
| Member private drafts (Twilda / Aftercare) | Supabase only |
| Published profile posts | Supabase `member_posts` |
| Magazine-accepted UGC | Sanity `memberContribution` after review |

## Env vars (add these)

### Netlify (Site settings → Environment variables)

| Variable | Scope | Required | Notes |
|----------|--------|----------|--------|
| `SANITY_PROJECT_ID` | Functions / Builds | **Yes** for sync | Project id from manage.sanity.io |
| `SANITY_DATASET` | Functions / Builds | **Yes** | Use `production` |
| `SANITY_API_WRITE_TOKEN` | **Functions only** (never public) | **Yes** for sync | Editor token with create/mutate |
| `SANITY_API_VERSION` | Functions | No | Defaults to `2024-01-01` |
| `EXPO_PUBLIC_SANITY_PROJECT_ID` | Builds (optional) | No | Only if a future client read path is added |
| `EXPO_PUBLIC_SANITY_DATASET` | Builds (optional) | No | Defaults unused while Expo reads `src/generated/*` |

Also set Studio-local aliases if you prefer (function accepts both):

- `SANITY_STUDIO_PROJECT_ID` (alias of `SANITY_PROJECT_ID`)
- `SANITY_STUDIO_DATASET` (alias of `SANITY_DATASET`)

### Cursor Cloud secrets (same names)

Add to the Artometrics cloud environment secrets (so agents / doctor can see them):

1. `SANITY_PROJECT_ID`
2. `SANITY_DATASET` = `production`
3. `SANITY_API_WRITE_TOKEN`

Do **not** put the write token in `EXPO_PUBLIC_*` or any client bundle.

### Local `.env` (repo root) + `sanity/.env`

Root `.env` (for Netlify Dev / doctor):

```bash
SANITY_PROJECT_ID=xxxxxxxx
SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=sk...
```

`sanity/.env` (for Studio only — see `sanity/.env.example`):

```bash
SANITY_STUDIO_PROJECT_ID=xxxxxxxx
SANITY_STUDIO_DATASET=production
```

## What to click in sanity.io

1. Open [https://www.sanity.io/manage](https://www.sanity.io/manage) and sign in.
2. **Create project** → name it `Artometrics` (or reuse an existing project).
3. Note the **Project ID** on the project overview (copy into `SANITY_PROJECT_ID`).
4. **Datasets** → confirm dataset `production` exists (create it if missing).
5. **API** → **Tokens** → **Add API token**:
   - Name: `artometrics-netlify-sync`
   - Permissions: **Editor** (needs mutate/create on documents)
   - Copy the token once → `SANITY_API_WRITE_TOKEN` (Netlify + Cloud secrets).
6. **API** → **CORS origins** → **Add CORS origin**:
   - Local Studio: `http://localhost:3333`
   - Hosted Studio hostname after deploy (e.g. `https://artometrics.sanity.studio`)
   - Allow credentials if prompted.
7. (Optional) Invite editors under **Project members**.

## Local Studio

```bash
cd sanity
npm install
# set SANITY_STUDIO_PROJECT_ID in sanity/.env (not yourProjectId)
npm run dev
```

From repo root:

```bash
npm run sanity:dev      # Studio
npm run sanity:deploy   # Hosted Studio on *.sanity.studio
```

## Sync path (already wired)

1. Member submits post → `member_posts.status = submitted` (Supabase).
2. App calls `POST /api/sanity-sync` with `{ postId }` (see `app/(site)/studio/publish.tsx`).
3. Netlify function `netlify/functions/sanity-sync.ts` creates/updates a Sanity `memberContribution` draft and stores `member_posts.sanity_id`.
4. Editor reviews/publishes in Sanity Studio.
5. Staff magazine surface stays on markdown / `src/generated/*` until a later migration.

Expo accessors in `lib/content.ts` import **only** `@/src/generated/*.json`. No Astro. Native + web keep the same content bridge.

## Package map

| Path | Role |
|------|------|
| `sanity/sanity.config.ts` | Studio config |
| `sanity/sanity.cli.ts` | CLI / deploy projectId + dataset |
| `sanity/schemas/*` | `report`, `podcastEpisode`, `author`, `legalPage`, `memberContribution` |
| `lib/sanity/client.ts` | Thin HTTP mutate helper (server) |
| `netlify/functions/sanity-sync.ts` | Optional UGC → Sanity draft |

## Go-live checklist

1. Create Sanity project + `production` dataset; create Editor API token (steps above).
2. Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_WRITE_TOKEN` on **Netlify** (Functions) and **Cursor Cloud secrets**.
3. `cd sanity && npm install && npm run deploy` (or `npm run sanity:deploy` from root) → open hosted Studio; confirm schemas load.
4. Add CORS origins for local + hosted Studio.
5. Signed-in: Studio → Publish → **Submit to magazine** on a test draft → expect “Draft also queued in Sanity.” (not the 503 “not configured” note).
6. Or `POST /api/sanity-sync` with auth + `{ "postId": "<submitted id>" }` → **200** + `sanityId` (not 503).
7. In Studio, open **Member contribution** and confirm the draft.
8. Keep markdown + `npm run content` as source of truth for staff reports — **no bulk migration this pass**.

Without credentials, magazine submit still works via Supabase; Sanity sync is optional and surfaces a clear message in the Publish UI.
