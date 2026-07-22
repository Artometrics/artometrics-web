# Security notes — Artometrics

## Secrets

- Client bundles may only use `EXPO_PUBLIC_*` (and legacy `PUBLIC_*` aliases).
- Stripe secret, webhook secret, and Supabase **service role** stay in Netlify env — never in git.
- `.env` / `.env.local` are gitignored.

## Functions

- `/api/*` → Netlify Functions (`netlify.toml`). Keep this redirect **above** the SPA fallback.
- `saved-articles`, `member-episode`, checkout/portal require `Authorization: Bearer <supabase_jwt>`.
- Stripe webhook verifies signature via `STRIPE_WEBHOOK_SECRET`.
- CORS: functions use shared helpers; do not widen to `*` with credentials.

## Data

- Supabase RLS on `saved_articles` (see `supabase/migrations/001_product.sql`).
- Public Storage bucket `media` should be read-only for anonymous; writes via service role.

## Disclosure

Report vulnerabilities to `security@artometrics.com` (placeholder — update in `/security` when mailbox is live).

## Cookies

See `/legal/cookies`. Preference banner is a UI placeholder until a CMP is chosen.
