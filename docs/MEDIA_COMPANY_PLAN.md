# Artometrics — Media Company Operating Plan

**One-line:** A data-science magazine for artists and an art magazine for data scientists — factual, open-source-friendly, AI-assisted, multi-format.

**Status:** Living plan (Content OS Phase 0 exists). Update as tools are hooked up.

---

## 1. Foundation (keep this carved in stone)

| Pillar | Definition |
|--------|------------|
| **Product** | Long-form investigative data reports + podcast + dataset libraries + social zines |
| **Audience** | Creative-industry readers who want evidence; analysts who care about culture; founders/editors who need citable charts |
| **Voice** | Adult, precise, non-hype; one claim per chart; limitations always present |
| **Desks** | Culture · Atlas · History · Persona · Power |
| **Trust stack** | Observed vs derived vs editorial index vs literature; ethics page; public sources |
| **Platform** | Expo (web + native) on Netlify + domain; Content OS for production; Supabase for members/media |

### Keep vs kill (when ideas arrive)

**Keep if it:**
- Strengthens a desk report, library, or distribution of the same claim
- Is reproducible / citable
- Fits Artometrics red/cream editorial, not generic AI aesthetic

**Kill / defer if it:**
- Is a random SaaS feature with no editorial loop
- Dilutes the wedge (“data for artists / art for DS”)
- Requires permanent headcount before revenue (unless funded as R&D)

---

## 2. Full media machine (what “done” looks like)

```
Keyword / desk brief
    → research (Semrush / corpus)
    → analyze data (in-house engine / Quarto)
    → write HTML report (Content OS + style guide)
    → banner + charts (Higgsfield / engine)
    → AEO pack (llms.txt, meta, JSON-LD, internal links)
    → publish to Expo site
    → pack: IG zine slides, YT script, LinkedIn, hashtags
    → audio (ElevenLabs or human)
    → podcast host (Transistor or first-party RSS)
    → schedule (Buffer)
    → measure (GA4 MCP)
    → library: datasets / guides / tools pages
```

---

## 3. Budget model (assume funding; optimize later)

Rough **monthly burn** for a serious solo+AI studio. Prices move — treat as planning bands.

### Tier A — Ship now (lean, ~$150–400/mo)

| Tool | Role | Est. | Cadence |
|------|------|------|---------|
| Netlify | Web + functions | $0–20 | Sub |
| Supabase | Auth, DB, later media | $0–25 | Sub |
| Domain / email | artometrics.com | ~$15–20 | Sub |
| Cursor | Build + agents | existing | Sub |
| Higgsfield | Banners / motion | credits | Usage |
| Buffer Free→Essentials | 3–5 social channels | $0–30 | Sub |
| Transistor Starter **or** first-party RSS | Podcast | $0–19 | Sub |
| GA4 | Analytics | $0 | Free |

**In-house (no sub):** Expo site, Content OS, Quarto/R/Python charts, `llms.txt`, dataset packing, IG slide HTML→PNG pipeline, hashtag packs, Open Graph images.

### Tier B — Growth media (~$500–1,200/mo)

| Tool | Role | Est. |
|------|------|------|
| Semrush (SEO Toolkit or One starter) | Keywords, competitors, MCP | ~$130–200+ |
| Buffer Essentials (5 channels) | Schedule | ~$30 |
| Transistor Professional | Podcast + YT auto | ~$49 |
| ElevenLabs Creator | Narration | ~$20–100 |
| Higgsfield credits | Volume creative | variable |
| Adobe Firefly Pro **or** CC if you edit video weekly | Polish / Premiere | ~$20–60 |
| CapCut / Descript (pick one) | Short YT/IG cuts | ~$0–24 |

### Tier C — Full studio (when volume justifies, ~$1.5k–4k+/mo)

Adobe CC All Apps, Semrush One, Buffer Team, Transistor Business, ElevenLabs scale, freelance editors, Sigma/BI if desks need dashboards, paid social tests.

### One-time / rare

| Item | Notes |
|------|--------|
| Brand photography / custom type | Optional; Chomsky + red already define brand |
| Legal review of dataset licenses | Per major library release |
| App Store / Play accounts | When native ships |
| Hardware mic | If human podcast grows |

### What we get away with (don’t buy yet)

- **Not Adobe CC** until you’re editing video weekly — Firefly-only or Higgsfield+CapCut first
- **Not Semrush** until Content OS briefs are used weekly — keyword briefs can start from corpus + manual research
- **Not Sigma** until library/membership needs internal dashboards
- **Not custom podcast host** if episode count is low — first-party RSS from `public/audios` + site is enough early
- **Cursor image gen vs Higgsfield:** use **Higgsfield for brand heroes/motion**; Cursor/local only for throwaway mocks. Don’t mix aesthetics.

---

## 4. MCP / connectors map

### Already in this Cursor environment

| MCP | Use |
|-----|-----|
| **Higgsfield** | Heroes, motion, zine stills, later shorts |
| **cursor-cloud** | Agent ops |

### Hook up next (you create accounts; we wire)

| Priority | Tool | MCP / API | You do | We do |
|----------|------|-----------|--------|-------|
| P0 | **GA4** | Official Analytics MCP | Create GA4 property, GCP project, share access | Wire MCP, events for report/read/subscribe |
| P0 | **Supabase** | Existing JS + dashboard | Confirm project, storage bucket for media, paste keys in Netlify | Media library schema, upload path from Content OS |
| P1 | **Semrush** | Official/hosted MCP or API | Subscribe + API access | Keyword packs into briefs |
| P1 | **Buffer** | API / community MCP if available | Create channels (LI, IG, X, YT, FB) | Post packager → Buffer drafts |
| P2 | **ElevenLabs** | API | Account + voice | Narration from article script |
| P2 | **Transistor** | API | Or skip → RSS | Episode publish + private member feed later |
| P3 | YouTube Data API | Google Cloud | Enable API | Title/description/tags from brief |
| P3 | Stripe | Already planned | Prices live | Already in Netlify functions |

**No MCP required for:** RSS (build), llms.txt (build), dataset library pages (build), IG zine HTML (build), hashtag strategy files (build).

---

## 5. SEO / AEO strategy

### On-site (we build)

- Crawlable article HTML (in progress)
- `public/llms.txt` + `llms-full.txt` (summaries + fuller dumps)
- `robots.txt`, sitemap (Expo static + Netlify)
- JSON-LD `Article` / `PodcastEpisode` / `Dataset`
- Keyword briefs → title, H2s, meta, internal links
- Resources / guides / datasets hubs

### Off-site

- Semrush for keyword gaps per desk
- Consistent citations to GitHub datasets
- Cross-post with canonical URL always `https://artometrics.com/<slug>`

### Hashtag strategy (per desk, keep short)

- Always: `#Artometrics` + desk (`#CultureDesk` etc.)
- 3–5 topical (`#StreamingData`, `#CreativeEconomy`)
- Avoid spam stacks (>8) and irrelevant viral tags

---

## 6. YouTube optimization

| Element | Rule |
|---------|------|
| **Format** | 6–12 min “one chart, one claim” cuts from reports; occasional long desk essays |
| **Title** | Primary keyword + concrete number when possible |
| **Hook** | First 15s = calibration fact + interpretive move |
| **Description** | Canonical article URL first line; sources; timestamps |
| **End screen** | Subscribe + related report |
| **Series** | One playlist per desk |
| **Thumbnail** | Same brand still language as heroes (no clutter text walls) |

---

## 7. Dataset libraries (SportsDataverse-style)

**Goal:** Artometrics becomes a place you *get* data, not only read about it.

Suggested packs (start with one):

1. **Movies** — titles, studios, genres, box office / ratings joins, license notes  
2. **Sports franchises** — already strong editorial; package CSVs  
3. **Streaming catalogs** — pilot brief already exists  

Each pack page: schema, citation, update cadence, download, “used in reports” links.

---

## 8. Instagram / social zines

From every published report, auto-pack:

1. Cover slide (banner crop + title)  
2. 3–5 fact slides  
3. 1 chart slide (PNG + caption)  
4. Sources / “Read the report” slide  
5. Caption + hashtags + photo credits for any dropped assets  

Ship as HTML templates → PNG export (in-house) before paying Canva teams.

---

## 9. Content inventory reality

| State | Count (approx) |
|-------|----------------|
| Live reports | ~89 |
| Content OS drafts | 1 (`streaming-catalog-power`) |
| Podcast episodes | 4 |

**Recommendation:** Don’t boil the ocean. Pick **one gold report per desk** to fully finish (charts, AEO, social pack, optional audio). Use those as templates. Backfill the rest in batches.

Suggested Culture gold path: finish **streaming-catalog-power** with real data *or* elevate an existing premium like `anime` / `franchise` as the social+AEO template first (already has charts).

---

## 10. Expo optimization checklist

- Static export + Netlify domain (done path)
- Crawlable HTML for articles (keep)
- Image CDN / Netlify Image if heroes get heavy
- Plotly web-only; PNG native
- Don’t put CMS in the app — Content OS + git/Supabase
- Later native: saved reports, offline dataset packs, audio player
- EAS when you’re ready for App Store — not blocking web media company

---

## 11. 90-day roadmap (funded)

| Days | Focus |
|------|--------|
| 1–30 | Merge Content OS; AEO pack (`llms-full`, JSON-LD, resources stub); GA4; finish 1 gold report + IG packager |
| 31–60 | Dataset library v1 (one pack); Buffer; Semrush briefs; YT short pipeline from gold report |
| 61–90 | Narration; Transistor or polished RSS; member media in Supabase; second desk gold report |

---

## 12. Decision log (defaults)

| Question | Default |
|----------|---------|
| Higgsfield vs Cursor images? | **Higgsfield** for public brand |
| Transistor vs own RSS? | **Own RSS first**; Transistor when downloads/private members justify ~$19–49 |
| Adobe? | **Defer CC**; Firefly/Higgsfield/CapCut until weekly video edit |
| Semrush? | **Buy when briefs are weekly**; else manual + corpus |
| Sigma? | **Defer** |
| Finish all 89 articles? | **No** — gold templates first |
