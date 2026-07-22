# Next steps — Artometrics media company

Content OS + media foundation + Atlantic chrome + READMITTED gold are on `main`. Use this checklist.

North-star vision: `docs/MEDIA_EMPIRE_VISION.md`.

Owner checklist: `docs/OWNER_PLAYBOOK.md` · MCP/skills: `docs/MCP_AND_SKILLS.md` · Brand: `docs/BRAND_KIT.md`.

---

## Done for you (in code)

- Content OS (briefs → scaffold → publish)
- `llms.txt` + `llms-full.txt`
- `robots.txt`, `sitemap.xml`, `rss.xml`, `podcast.xml`
- `/resources` + `/datasets` hubs
- IG zine packager (`npm run cos:zine -- --slug anime`)
- Article JSON-LD on report pages
- Crawlable article HTML
- Media company plan: `docs/MEDIA_COMPANY_PLAN.md`
- Atlantic-style article fronts, top-right nav overlay, Chomsky A logo/favicon
- READMITTED monorepo gold (`articles/readmitted/` + `sync:readmitted`)
- Full magazine chrome: dark/light, search, desks/topics, library, get-app, saves UI, download rails
- Dual Chomsky A favicons (light/dark)
- Owner playbook + security/MCP/brand docs

---

## Your turn (in order)

### 1. Confirm Netlify is building Expo
1. Netlify → Site settings → Build  
2. Build command: `npm run build`  
3. Publish directory: `dist`  
4. Node 20+  
5. After deploy, open:
   - https://artometrics.com/resources  
   - https://artometrics.com/llms.txt  
   - https://artometrics.com/rss.xml  

### 2. Reconnect Higgsfield (Cursor MCP)
1. Cursor → MCP / Integrations → Higgsfield → re-auth  
2. Tell the agent: “generate hero for streaming-catalog-power”  
3. We replace `public/images/content/articles/streaming-catalog-power/hero.png`

### 3. Google Analytics 4 (free)
1. Create GA4 property for `artometrics.com`  
2. Add web data stream  
3. Paste Measurement ID here (or Netlify env `EXPO_PUBLIC_GA_ID`)  
4. Optional: set up [Google Analytics MCP](https://developers.google.com/analytics/devguides/MCP) for Cursor  

### 4. Supabase (members + future media)
1. Confirm project exists; run `supabase/migrations/001_product.sql` if not applied  
2. Create Storage bucket: `media` (public read for published assets)  
3. Netlify env:
   - `EXPO_PUBLIC_SUPABASE_URL`  
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`  
   - `SUPABASE_SERVICE_ROLE_KEY`  
   - Stripe vars from `docs/PRODUCT_SETUP.md` (when billing goes live)

### 5. Buffer (social)
1. Create Buffer account  
2. Connect LinkedIn, Instagram, X, YouTube, Facebook  
3. Free tier is enough to start  
4. Tell the agent when connected — we push caption packs from `cos:zine`

### 6. Pick the gold report (choose one)
**A.** Elevate **anime** (already has charts) as AEO + zine template — fastest  
**B.** Finish **streaming-catalog-power** — drop a CSV/availability export and we fill charts  

Reply with A or B (and attach data if B).

### 7. Optional this month
| Tool | When |
|------|------|
| Semrush | When you write briefs weekly |
| ElevenLabs | After one gold report narration |
| Transistor | When podcast downloads need hosting polish (RSS already works) |

---

## Commands you’ll use

```bash
npm run cos:brief -- --slug my-topic --desk culture --title "My Topic"
npm run cos:scaffold -- --brief docs/content-os/briefs/my-topic.json
npm run cos:publish -- --slug my-topic
npm run cos:zine -- --slug anime
npm run cos:aeo
npm run build
```

IG zine: open `docs/content-os/zines/<slug>/slides.html` → screenshot each 1080×1350 slide → post with `caption.txt`.

---

## After you finish steps 2–6

Tell the agent:
1. “Higgsfield connected”  
2. “GA id is G-…”  
3. “Gold report is A or B”  
4. “Buffer connected” (if ready)  

We’ll execute the next build slice immediately.
