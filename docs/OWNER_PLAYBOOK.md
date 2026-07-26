# Owner playbook — Artometrics

What you hook up, make, and verify after the magazine site ships on `main`.

## Verify live (hard-refresh)

- https://artometrics.com/
- https://artometrics.com/search?q=anime
- https://artometrics.com/blog
- https://artometrics.com/topics/sports
- https://artometrics.com/topics/arts
- https://artometrics.com/topics/culture
- https://artometrics.com/library
- https://artometrics.com/about
- https://artometrics.com/press
- https://artometrics.com/newsletter
- https://artometrics.com/get-app
- https://artometrics.com/login · `/account` · `/pricing`
- https://artometrics.com/readmitted (Save + download rail)
- https://artometrics.com/legal/terms · `/legal/privacy` · `/legal/cookies` · `/security`
- https://artometrics.com/llms.txt · `/sitemap.xml` · `/rss.xml`
- Menu: dark/light toggle · search · desks/topics
- Favicon: black A in light browser chrome, white A in dark

## Hooks (env / accounts)

| Item | Where |
|------|--------|
| Netlify build `npm run build` → `dist` | Site settings |
| `EXPO_PUBLIC_SUPABASE_URL` / `ANON_KEY` | Netlify + local `.env` |
| `SUPABASE_SERVICE_ROLE_KEY` | Netlify only |
| Storage bucket `media` | Supabase |
| Stripe secret, webhook, price IDs | Netlify |
| `EXPO_PUBLIC_GA_ID` | GA4 web stream |
| Higgsfield MCP | Cursor Integrations |
| Buffer + social channels | Buffer dashboard |
| Apple Developer ($99/yr) + EAS | Get the App for real |
| ElevenLabs / Semrush | Later phases |
| Notion + Figma MCPs | Editorial + print systems |

Full service recipe (tiers + unlocks): `docs/FULL_STACK_RECIPE.md`  
Hookup session: `docs/BACKEND_HOOKUP_SESSION.md`  
See `.env.example`, `docs/PRODUCT_SETUP.md`, `docs/MCP_AND_SKILLS.md`, `docs/SECURITY.md`.

```bash
npm run doctor           # toolchain inventory
npm run setup:pipeline   # R + Quarto + Python + print libs
npm run setup:clis       # netlify / supabase / stripe CLIs
```

## Brand kit to export

- [ ] SVG black / white / red Chomsky A  
- [ ] OG default 1200×630  
- [ ] Press one-pager PDF  
Checklist detail: `docs/BRAND_KIT.md`

## Editorial calendar

1. Culture gold wave (anime, awards, franchise, horror…)  
2. Atlas / Travel / Cities  
3. History  
4. Persona  
5. Power / Sports / Institutions  

Track: `docs/content-os/UPGRADE_LOG.md`. Never invent data — attach CSVs first.

## Commands

```bash
npm run content && npm run cos:downloads && npm run cos:aeo
npm run cos:brief -- --slug … --desk culture --title "…"
npm run cos:publish -- --slug … --undraft
npm run cos:zine -- --slug anime
npm run cos:buffer-schedule -- --slug anime
npm run cos:gsc-check
npm run build
npm run test:unit && npm run test:ops-scripts
PREVIEW_URL=https://artometrics.com npm run test:smoke
```

## Startup runbook

### Env matrix (Netlify + local `.env`)

| Var | Required for |
|-----|----------------|
| `EXPO_PUBLIC_SITE_URL` | Canonical URLs |
| `EXPO_PUBLIC_SUPABASE_*` + `SUPABASE_SERVICE_ROLE_KEY` | Auth / Studio / Aftercare |
| `STRIPE_*` | Membership |
| `EXPO_PUBLIC_GA_ID` | GA4 (loads after cookie consent) |
| `ELEVENLABS_API_KEY` | `cos:narrate` |
| `BUFFER_ACCESS_TOKEN` (+ optional `BUFFER_PROFILE_IDS`) | `cos:buffer-schedule` |
| `NOTION_API_KEY` + `NOTION_BRIEF_DATABASE_ID` | `cos:notion-sync` |
| `SLACK_WEBHOOK_URL` | Publish alerts |
| `SANITY_*` | Optional magazine CMS sync |

### Cursor MCP auth

Confirm connected: Buffer, Notion, Slack, ElevenLabs, GitHub, analytics-mcp, gscServer, Figma (print).  
Skip Transistor while Error. Skip Canva (use `cos:zine`).

### First publish day

1. `npm run cos:notion-sync` or `cos:brief`  
2. Write + charts → `cos:publish -- --slug … --undraft`  
3. `cos:zine` → `cos:buffer-schedule` → `cos:gsc-check`  
4. Checklist: `docs/content-os/templates/ops-publish-checklist.md`

### Deploy

```bash
npm run build
npx netlify deploy --prod --dir=dist
# or: git push origin main (if Git-linked auto-deploy)
```
