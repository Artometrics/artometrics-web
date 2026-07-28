# Tools setup (Twilda + Aftercare + Studio generators)

## Apply Supabase migration

Run [`supabase/migrations/002_tools.sql`](../supabase/migrations/002_tools.sql) in the Artometrics Supabase SQL editor **after** `001_product.sql`.

It extends `profiles`, adds Twilda novel/journal/storyboard tables, Aftercare journal/tarot/tracking tables, `reference_pins`, and (when Storage exists) the `storyboard` bucket.

Then apply [`003_platform.sql`](../supabase/migrations/003_platform.sql) for profiles/publish, and optionally [`004_studio_generators.sql`](../supabase/migrations/004_studio_generators.sql) for Sample Maker + Color Kit cloud tables (MVP clients still persist locally via AsyncStorage until sync is wired).

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
| `/tools` | Redirects to `/studio` |
| `/studio` | Signed-in hub |
| `/tools/twilda/*` | Signed-in |
| `/tools/aftercare/*` | Signed-in |
| `/tools/samples/*` | Signed-in — Sample Maker (record / synth / clips) |
| `/tools/palette/*` | Signed-in — Color Kit (photo season + saved palettes) |
| `/library/reference` | Public browse; pin requires login |
| `/api/aftercare/*` | Bearer Supabase JWT |

## Brand style

Light/dark plus **Swiss** vs **Magazine (Chomsky)** brand style live in Settings and the site menu (`lib/theme.tsx`, `artometrics-brand-style` storage key).

## Catalogs

Refresh open-source catalogs:

```bash
npm run catalog:open
```

Outputs under `public/data/reference/{gutenberg,wikiart,wikipedia}/`.
