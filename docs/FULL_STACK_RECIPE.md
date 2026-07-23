# Artometrics — full stack recipe

The complete affordable service map: **what to subscribe to, which tier, what hookup unlocks, and what the factory can ship** once everything is live — including blogs you already have and the media products not fully wired yet.

Companion docs: `BACKEND_HOOKUP_SESSION.md` · `PRODUCT_SETUP.md` · `MEDIA_EMPIRE_VISION.md` · `MCP_AND_SKILLS.md`

**Monthly target (solo media company):** ~**$40–120** all-in (excluding Apple Developer / app store when you ship native). Skip AWS and HubSpot.

---

## 0. What you already have in the product (code)

| Surface | Route / asset | Status |
|---------|---------------|--------|
| Magazine home + section rails | `/` | Live in code |
| Reports archive (~90) | `/blog`, `/<slug>` | Live; dual-mode charts |
| Topics / desks / search | `/topics`, `/desks`, `/search` | Live |
| Resources + datasets hubs | `/resources`, `/datasets` | Live |
| Library (member saves UI) | `/library` | Needs Supabase auth |
| Podcast + RSS | `/podcast`, `podcast.xml` | Live; locked eps need Supabase |
| Membership | `/pricing`, `/login`, `/signup`, `/account` | Needs Stripe + Supabase |
| Newsletter page | `/newsletter` | Needs form/email provider |
| Downloads rail | PDF / HTML / CSV / EPUB / MP3 | Needs packs + Storage |
| Content OS | briefs → publish → AEO → zine | Live in repo |
| AEO | `llms.txt`, sitemap, RSS | Live |

**Membership tiers (already in `lib/product/plans.ts`):**
- **Listener** — $8/mo  
- **Engager** — $20/mo (popular)  
- **Collaborator** — $40/mo  

---

## 1. The recipe (subscribe + hook up)

Prices are approximate **2026 USD list / starter tiers**. Confirm at signup. Prefer annual only after the factory is humming.

### Tier A — Must have (week 1) ≈ $0–35/mo

| # | Service | Subscribe | Hookup | Unlocks |
|---|---------|-----------|--------|---------|
| 1 | **GitHub** | Free (Pro $4 if private extras) | Repo already linked; optional GitHub MCP | Source of truth for Content OS + PRs |
| 2 | **Netlify** | **Starter** (free) or **Pro** (~$20) if you want password protection / more build minutes | Site → `main` · build `npm run build` · publish `dist` · env vars · `npx netlify link` | Production site, functions (`/api/*`), forms, previews |
| 3 | **Cloudflare** | **Free** | DNS for `artometrics.com` → Netlify · optional proxy orange-cloud · later R2 | Fast DNS, SSL, DDoS, cache; cheap asset CDN later |
| 4 | **Supabase** | **Free** → **Pro** ($25) only when DB/auth limits bite | Project · run `supabase/migrations/001_product.sql` · Storage bucket `media` · URL allow list · env keys | Login, signup, saves, library, subscription status, media files |
| 5 | **Stripe** | Pay-as-you-go (~2.9%+$0.30) · no monthly | Products for 3 tiers · **Link ON** · webhook · Customer Portal · env price IDs | Paid membership, one-click Link checkout, billing portal |
| 6 | **Google** | Free | GA4 property + Search Console · `EXPO_PUBLIC_GA_ID` · optional GA MCP | Traffic by report/desk; search indexing health |
| 7 | **Cursor** | Your current plan | MCP: Higgsfield (on) · add Notion, Figma, Supabase, GA4 | Agent factory loop |

### Tier B — Media factory (week 1–2) ≈ $15–55/mo

| # | Service | Subscribe | Hookup | Unlocks |
|---|---------|-----------|--------|---------|
| 8 | **Higgsfield** | **Plus** (or trial) — enough credits for weekly heroes/reels | Cursor MCP re-auth · brand workspace | Heroes, IG reels, explainers, Shorts Studio, voice, virality checks |
| 9 | **ElevenLabs** | **Creator** (~$5–22) | `ELEVENLABS_API_KEY` (+ voice id) · `npm run cos:narrate` | Long-form article → podcast MP3 (when Higgsfield TTS isn’t enough) |
| 10 | **Notion** | Free | Workspace · Editorial DB · Notion MCP | Calendar, assignments, brief queue Claude can read |
| 11 | **Figma** | Free | Brand file · print magazine frames · Figma MCP | Covers, zine grids, print layouts |
| 12 | **Buffer** | **Free** or **Essentials** (~$6/channel bundle) | Connect IG, LinkedIn, X, YouTube, Facebook · later Buffer MCP | Schedule captions from `cos:zine` |

### Tier C — Distribution polish (month 1–2) ≈ $0–40/mo

| # | Service | Subscribe | Hookup | Unlocks |
|---|---------|-----------|--------|---------|
| 13 | **Resend** *or* **Buttondown** | Resend free → paid; Buttondown ~$9+ | API key · Netlify form or function · `/newsletter` | Real newsletter (not HubSpot) |
| 14 | **Transistor** *or* keep self-host | Transistor starter when downloads matter | Point `podcast.xml` / host MP3s | Professional podcast hosting + analytics |
| 15 | **Apple Developer** | $99/**year** | Enroll + App Store Connect · see `docs/APP_STORE_LAUNCH.md` | Publish Artometrics as iOS publisher |
| 16 | **Expo EAS** | Free tier → paid builds later | `eas login` · `eas.json` · secrets | Cloud iOS/Android binaries + submit |

### Tier D — Only when weekly volume justifies

| # | Service | Subscribe | When |
|---|---------|-----------|------|
| 17 | **Semrush** | Guru or cheaper Ahrefs alternative | Weekly keyword briefs at scale |
| 18 | **Cloudflare R2** | Pennies | Heavy media egress off Supabase |
| 19 | **Plausible** | ~$9 | If you want privacy analytics *instead of* GA4 (pick one) |
| 20 | **Typefully / Premast** etc. | Optional | Only if Buffer isn’t enough for X/LinkedIn craft |

### Explicitly **not** in the recipe (yet)

| Skip | Why |
|------|-----|
| **AWS** | Netlify + Supabase + Cloudflare replace what you’d rent; ops tax too high |
| **HubSpot** | CRM/marketing suite you’ll underfill; use Notion + Resend/Buttondown |
| **Polar / Paddle** | Stay Stripe + Link |
| **Segment / Mixpanel / Salesforce** | No retention graph yet |

**Healthy all-in:** Netlify Free/Pro + Supabase Free + Stripe fees + Higgsfield Plus + ElevenLabs Creator + Buffer Free ≈ **$40–90/mo** before Apple.

---

## 2. Env checklist (one place)

Copy `.env.example` → `.env` and Netlify site env:

```env
# Public
EXPO_PUBLIC_SITE_URL=https://artometrics.com
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_GA_ID=

# Netlify-only secrets
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_LISTENER=
STRIPE_PRICE_ENGAGER=
STRIPE_PRICE_COLLABORATOR=

# Media factory
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
# NOTION_ / FIGMA_ / BUFFER_ as MCP OAuth preferred over raw keys
```

---

## 3. Cursor MCP recipe

| MCP | Priority | After connect, you can say… |
|-----|----------|-----------------------------|
| **Higgsfield** | On now | “Reel + explainer for readmitted” |
| **Notion** | High | “What’s on the culture desk this week?” |
| **Figma** | High | “Pull cover frame and match brand red” |
| **Supabase** | High | “List media bucket / check my subscription row” |
| **GA4** | Medium | “Which reports got traffic last 7 days?” |
| **GitHub** | Medium | “Open issue for streaming-catalog-power data” |
| **Buffer** | Medium | “Queue this zine caption for Thursday” |
| **Semrush** | Later | “Keyword brief for horror-movie-profit” |

---

## 4. End-state factory (after all hookups)

One command of English → a **Vice-scale package** from a desk report:

```
topic → Notion brief → data/charts (R/Quarto) → HTML report
  → Higgsfield hero + reel + explainer
  → cos:publish + AEO
  → cos:zine → Buffer
  → cos:narrate / Higgsfield audio → podcast.xml
  → cos:pdf + cos:ebook → Supabase media + download rail
  → Stripe/Link membership gates library + locked episodes
  → GA4 tells you what to do next week
```

### What each product line becomes

| Product | Input | Output | Where it lives |
|---------|-------|--------|----------------|
| **Data report** | CSV + brief | HTML + charts PNG/HTML | `/blog`, `/<slug>` |
| **Member library** | Saves | Persisted list | `/library` + Supabase |
| **Podcast** | Article narration | MP3 + show notes | `/podcast`, RSS |
| **IG reel / Shorts** | Charts + hook script | 9:16 video | Higgsfield → Buffer |
| **Explainer** | Report sections | Narrated MP4 | Higgsfield workflows |
| **Zine** | Slug | Carousel HTML + caption | `cos:zine` |
| **PDF magazine page** | Slug | Print PDF | `cos:pdf` → `/exports` |
| **Ebook** | Slug | EPUB | `cos:ebook` |
| **Newsletter** | Weekly top report | Email | Resend/Buttondown |
| **Datasets hub** | Public CSVs | Citeable downloads | `/datasets` |
| **Press kit** | Brand kit | PDF/SVG | `/press` + Figma exports |

---

## 5. Gaps vs what’s already in the blogs

You have **~90 reports** with charts. Still thin / not fully productized:

| Gap | Fix after hookups |
|-----|-------------------|
| `streaming-catalog-power` draft / TBD charts | Attach catalog CSV → fill charts → undraft |
| Locked podcast episodes | `isLocked` + `npm run sync:episodes` + Stripe active |
| Library empty without auth | Supabase login + saved-articles API |
| Many reports lack PDF/EPUB/MP3 | Batch `cos:pdf` / `cos:ebook` / `cos:narrate` on gold set first |
| Newsletter is a page, not a list | Resend/Buttondown + form |
| No scheduled social | Buffer + zine captions |
| Print magazine not a bound issue | Figma print system + quarterly PDF compile of best reports |
| App Store | Only after web membership works (Apple $99/yr) |
| Keyword program | Semrush when cadence is weekly |

**Gold-first set (do these end-to-end before the long tail):**
1. `readmitted` (monorepo gold)  
2. `anime` (charts + AEO template)  
3. One sports + one culture canon piece you care about  

---

## 6. Hookup order (don’t shuffle)

1. **Cloudflare DNS** → Netlify  
2. **Netlify** build + env  
3. **Supabase** migration + `media` bucket + env  
4. **Stripe** products + **Link** + webhook  
5. Smoke: signup → checkout → `/account` → save report → `/library`  
6. **GA4** + Search Console  
7. **Higgsfield** MCP (reels/heroes)  
8. **Notion + Figma** MCPs  
9. **ElevenLabs** + narrate one gold report  
10. **Buffer** + one zine post  
11. **Resend/Buttondown** newsletter  
12. Batch PDF/EPUB for gold set · upload to Supabase `media`  
13. Apple / EAS only when web revenue path works  

---

## 7. “Done” definition (factory online)

You can truthfully say Artometrics is a media company when:

- [ ] Anonymous reader gets full free reports + charts (Print/Interactive)  
- [ ] Paid member gets Link checkout → locked podcast + library saves  
- [ ] One report ships as: site + PDF + EPUB + MP3 + IG zine + reel  
- [ ] Newsletter sends weekly from a real ESP  
- [ ] GA4 shows which desk moves  
- [ ] Notion calendar drives next brief  
- [ ] Cloudflare + Netlify deploy from `main` without drama  

---

## 8. Cost snapshot (realistic solo month)

| Item | Est. |
|------|-----:|
| Netlify Free | $0 |
| Cloudflare Free | $0 |
| Supabase Free | $0 |
| Stripe | % of revenue only |
| GA4 / Search Console / Notion / Figma Free | $0 |
| Higgsfield Plus | ~$20–40 |
| ElevenLabs Creator | ~$5–22 |
| Buffer Free/Essentials | $0–15 |
| Resend/Buttondown | $0–10 |
| **Total** | **~$25–90** |
| Later: Netlify Pro + Supabase Pro + Apple | +$45–125 |

AWS/HubSpot “enterprise starter” would be **multiples** of this for capabilities you already cover.

---

## 9. Commands after keys land

```bash
export PATH="$HOME/.local/bin:$PATH"
npm run doctor
npx netlify login && npx netlify link && npx netlify env:list
npx netlify dev

npm run sync:episodes
npm run cos:zine -- --slug readmitted
npm run cos:pdf -- --slug readmitted
npm run cos:ebook -- --slug readmitted
npm run cos:narrate -- --slug readmitted   # needs ELEVENLABS_API_KEY
npm run cos:downloads
npm run build
```

Then tell the agent: **“Keys are in Netlify and MCP — run the gold package for readmitted.”**
