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
   - Project URL → `PUBLIC_SUPABASE_URL`
   - `anon` key → `PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (Netlify only, never in the browser)

4. **Authentication → URL configuration**: add your site URL and `https://your-site.netlify.app` to redirect allow list.

5. Optional: disable email confirmation in development (**Auth → Providers → Email**) for faster testing.

## 2. Stripe

1. Create three recurring products/prices in [Stripe Dashboard](https://dashboard.stripe.com/products):
   - Listener (~$8/mo)
   - Engager (~$20/mo)
   - Collaborator (~$40/mo)

2. Copy each **Price ID** (`price_…`) to env vars:
   - `STRIPE_PRICE_LISTENER`
   - `STRIPE_PRICE_ENGAGER`
   - `STRIPE_PRICE_COLLABORATOR`

3. Copy **Secret key** → `STRIPE_SECRET_KEY`

4. **Developers → Webhooks** → add endpoint:
   - URL: `https://YOUR_SITE.netlify.app/.netlify/functions/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

5. Enable **Customer portal** in Stripe settings (for “Manage billing” on `/account/`).

## 3. Netlify environment variables

Set in **Site configuration → Environment variables** (and locally in `.env` for `netlify dev`):

```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
PUBLIC_SITE_URL=https://artometrics.com
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_LISTENER=
STRIPE_PRICE_ENGAGER=
STRIPE_PRICE_COLLABORATOR=
```

`PUBLIC_*` vars are available at Astro build time and in the browser.

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
