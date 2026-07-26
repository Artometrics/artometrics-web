# Tools setup (Twilda + Aftercare)

## Apply Supabase migration

Run [`supabase/migrations/002_tools.sql`](../supabase/migrations/002_tools.sql) in the Artometrics Supabase SQL editor **after** `001_product.sql`.

It extends `profiles`, adds Twilda novel/journal/storyboard tables, Aftercare journal/tarot/tracking tables, `reference_pins`, and (when Storage exists) the `storyboard` bucket.

## Environment

Already required for membership:

- `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Netlify functions)

Aftercare AI (Netlify AI Gateway — no provider keys required on Netlify):

- OpenAI + Gemini calls use empty SDK constructors in `netlify/functions/aftercare-*.ts`
- Blobs store `tarot-art` for card images

## Routes

| Path | Access |
|------|--------|
| `/tools` | Signed-in |
| `/tools/twilda/*` | Signed-in |
| `/tools/aftercare/*` | Signed-in |
| `/library/reference` | Public browse; pin requires login |
| `/api/aftercare/*` | Bearer Supabase JWT |

## Catalogs

Refresh open-source catalogs:

```bash
npm run catalog:open
```

Outputs under `public/data/reference/{gutenberg,wikiart,wikipedia}/`.
