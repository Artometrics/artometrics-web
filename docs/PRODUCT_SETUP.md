# Artometrics product setup

This site ships with **Supabase Auth**, **Stripe subscriptions**, and **Netlify Functions** for membership features. Static blog, charts, search, and RSS work without any backend. Auth, billing, saved reports, and locked podcast transcripts require configuration below.

## Architecture

| Feature | Backend |
|--------|---------|
| Sign up / sign in | Supabase Auth (browser) |
| Subscription status | `subscriptions` table + Stripe webhooks |
| Checkout & billing portal | Netlify Functions → Stripe API |
| Saved reports | Netlify Functions → Supabase |
| Locked podcast transcripts | Netlify Functions → `member_episodes` table |

Client calls use `/api/*` (rewritten to Netlify Functions in `netlify.toml`).

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run the migration in **SQL Editor** (or CLI):

   `supabase/migrations/001_product.sql`

3. Copy from **Project Settings → API**:
   - Project URL → `EXPO_PUBLIC_SUPABASE_URL` (and optional alias `PUBLIC_SUPABASE_URL`)
   - `anon` key → `EXPO_PUBLIC_SUPABASE_ANON_KEY` (and optional alias `PUBLIC_SUPABASE_ANON_KEY`)
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (Netlify only, never in the browser)

4. **Authentication → URL configuration**: add `https://artometrics.com`, `https://artometrics.netlify.app`, and local `http://localhost:8081` / `http://localhost:8888` to the redirect allow list.

5. Optional: disable email confirmation in development (**Auth → Providers → Email**) for faster testing.

## 2. Stripe

1. Create two recurring products/prices in [Stripe Dashboard](https://dashboard.stripe.com/products) (**Test mode** first):
   - Monthly — **$4.99 / month**
   - Annual — **$19.99 / year** (≈67% vs monthly)

   Checkout adds a **7-day free trial** in code (`trial_period_days: 7`).

2. Copy each **Price ID** (`price_…`) to env vars:
   - `STRIPE_PRICE_MONTHLY`
   - `STRIPE_PRICE_ANNUAL`

3. Copy **Secret key** → `STRIPE_SECRET_KEY`

4. **Developers → Webhooks** → add endpoint:
   - URL: `https://YOUR_SITE.netlify.app/.netlify/functions/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

5. Enable **Customer portal** in Stripe settings (for “Manage billing” on `/account/`).

## 3. Netlify environment variables

Set in **Site configuration → Environment variables** (and locally in `.env` for `netlify dev`):

```env
EXPO_PUBLIC_SITE_URL=https://artometrics.com
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
# Optional legacy aliases (functions accept either)
PUBLIC_SITE_URL=https://artometrics.com
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_ANNUAL=
```

`EXPO_PUBLIC_*` vars are inlined into the Expo web/native client at build time. Server secrets stay on Netlify Functions only.

## 4. Sync locked podcast content

Locked episodes (`isLocked: true` in podcast frontmatter) store transcripts in Supabase, not in the static HTML.

After migration and env vars are set:

```bash
npm run sync:episodes
```

Re-run when you add or edit locked episode markdown.

## 5. Local development

```bash
cp .env.example .env
# fill in values
npm install
netlify dev
```

Use `netlify dev` (not only `npm run dev`) so `/api/*` functions and env vars work.

Stripe CLI for webhooks locally:

```bash
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
```

## 6. User flows

1. **Sign up** → `/signup/` → Supabase creates user → trigger creates `profiles` + `subscriptions` row
2. **Subscribe** → `/pricing/` → Stripe Checkout → webhook sets `subscriptions.status` + `plan_tier`
3. **Locked podcast** → paywall on page → active subscriber fetches transcript via `/api/member-episode`
4. **Save report** → article footer button → `/api/saved-articles` → listed on `/account/`

## Troubleshooting

- **Checkout returns 401**: user must sign in before subscribing
- **Webhook 400**: verify `STRIPE_WEBHOOK_SECRET` matches the endpoint
- **Locked episode stays gated**: confirm active subscription in `subscriptions` table and run `npm run sync:episodes`
- **Nav shows “Sign in” when logged in**: hard refresh; check Supabase URL allow list
