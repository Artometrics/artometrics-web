# Backend hookup session — Artometrics

Use this for a focused few-hour pass: **Cursor ↔ Netlify ↔ Expo ↔ Supabase**, then media APIs for reels, podcasts, explainers, PDFs, and print packs.

Full recipe (tiers + costs + unlocks): `docs/FULL_STACK_RECIPE.md`  
Vision: `docs/MEDIA_EMPIRE_VISION.md` · Product: `docs/PRODUCT_SETUP.md` · MCP: `docs/MCP_AND_SKILLS.md`

## Before you start

```bash
npm run setup:pipeline   # R + Quarto + pandoc + Python (once per machine)
npm run doctor           # green/red inventory
cp -n .env.example .env  # fill secrets locally; never commit
```

Cloud agents: re-run `npm run setup:pipeline` if `doctor` shows R/Quarto missing (ephemeral VMs).

---

## Hour 1 — Netlify + Expo static site

| Step | Action | Done when |
|------|--------|-----------|
| 1 | Netlify site linked to `Artometrics/artometrics-web` | Auto-deploys on `main` |
| 2 | Build: `npm run build` · Publish: `dist` · Node 20+ | Green deploy |
| 3 | Env: `EXPO_PUBLIC_SITE_URL=https://artometrics.com` | Site loads |
| 4 | Confirm `/api/*` redirects sit **above** SPA fallback in `netlify.toml` | Functions reachable |
| 5 | Local: `npx netlify login` → `npx netlify link` → `npx netlify env:list` | CLI sees site |

```bash
npx netlify login
npx netlify link
npx netlify dev   # Expo + functions together
```

---

## Hour 2 — Supabase (auth, saves, media)

| Step | Action | Done when |
|------|--------|-----------|
| 1 | Project at supabase.com | URL + anon + service_role keys |
| 2 | SQL Editor → run `supabase/migrations/001_product.sql` | Tables exist |
| 3 | Storage → create bucket `media` (public read for published assets) | Upload test file |
| 4 | Auth → URL allow list: `https://artometrics.com` + Netlify preview URLs | Redirects work |
| 5 | Netlify env + local `.env`: | |
| | `EXPO_PUBLIC_SUPABASE_URL` | |
| | `EXPO_PUBLIC_SUPABASE_ANON_KEY` | |
| | `SUPABASE_SERVICE_ROLE_KEY` (Netlify only) | |
| 6 | Optional CLI: `npx supabase login` + `npx supabase link` | Migrations from git |

Smoke:

```bash
npm run sync:episodes   # after podcasts are locked
# Sign up on /signup → row in profiles + subscriptions
# Save a report → /account lists it
```

---

## Hour 3 — Stripe membership (optional same day)

| Step | Action |
|------|--------|
| 1 | Products: Listener / Engager / Collaborator monthly prices |
| 2 | Env: `STRIPE_SECRET_KEY`, three `STRIPE_PRICE_*`, webhook secret |
| 3 | Webhook → `https://artometrics.com/.netlify/functions/stripe-webhook` |
| 4 | Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` |
| 5 | Local: `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook` |

---

## Hour 4 — Media factory APIs (reels, podcasts, explainers, print)

Do **not** invent a parallel stack. Extend Content OS + Higgsfield + existing download rails.

### Already wired in-repo

| Output | Command / path |
|--------|----------------|
| IG zine HTML + caption | `npm run cos:zine -- --slug <slug>` |
| Article download rail (HTML/PDF/CSV) | `npm run cos:downloads` → `ArticleActions` |
| Podcast RSS | `public/podcast.xml` |
| Chart PNG + interactive HTML | `npm run charts:backfill` |
| Hero / motion / voice | **Higgsfield MCP** (re-auth in Cursor) |

### Connect next

| Tool | Role | How |
|------|------|-----|
| **Higgsfield** | Reels, explainers, banners, TTS | Cursor → MCP → re-auth; then `generate_video` / `explainer_video` / `generate_audio` / Shorts Studio |
| **ElevenLabs** | Long-form article narration | API key → `.env` `ELEVENLABS_API_KEY` (+ optional voice id); or use Higgsfield voice tools |
| **Notion** | Editorial calendar / briefs | Add Notion MCP in Cursor; map DB to `docs/content-os/briefs/` |
| **Figma** | Print magazine / cover systems | Add Figma MCP; brand kit in `docs/BRAND_KIT.md` |
| **Buffer** | Schedule IG/LinkedIn/YT/X | Account + channels; push captions from zine packs |
| **GA4** | Measure | `EXPO_PUBLIC_GA_ID` |
| **Pandoc / WeasyPrint** | PDF + EPUB packs | Installed via `setup:pipeline`; scripts under `scripts/content-os/` |

### Suggested media pipeline (one gold report)

1. Finish/undraft one report (e.g. `anime` or `readmitted`)
2. Higgsfield banner + 9:16 reel stills
3. `cos:zine` → Instagram carousel
4. Higgsfield Shorts Studio or `explainer_video` from chart PNGs + narration
5. ElevenLabs (or Higgsfield audio) → `public/audios/<slug>.mp3` + podcast frontmatter
6. `cos:pdf` / `cos:ebook` → `public/exports/<slug>.pdf` + `.epub`
7. Upload finals to Supabase `media` bucket; link from download rail
8. Buffer schedule captions

---

## Expo packages (installed / ready)

| Package | Why |
|---------|-----|
| `expo-av` | Podcast / article audio player |
| `expo-sharing` | Native share sheet for charts/exports |
| `expo-file-system` | Cache downloads on device |
| `expo-clipboard` | Copy citation / share link |
| `@supabase/supabase-js` | Auth + storage client |
| `react-native-webview` | Article HTML + chart PNG fallback |

EAS / App Store: Apple Developer + `eas build` when Get the App goes live — not required for web factory.

---

## Cursor MCP checklist (owner clicks)

- [ ] Higgsfield — re-auth (required for visual media)
- [ ] Notion — add MCP server + integration token
- [ ] Figma — add MCP server + personal access token
- [ ] (Optional) Google Analytics MCP
- [ ] (Optional) Supabase MCP for schema ops

Paste keys into Netlify env + local `.env` only. Never commit secrets.

---

## Agent commands after keys land

```bash
npm run doctor
npx netlify env:list
npm run sync:episodes
npm run cos:zine -- --slug readmitted
npm run cos:pdf -- --slug readmitted      # when script lands
npm run cos:ebook -- --slug readmitted
npm run build
```

Tell the agent: “keys are in Netlify / `.env` — wire media bucket + narrate readmitted” and continue from there.
