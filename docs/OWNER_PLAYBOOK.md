# Owner playbook — Artometrics

What you hook up, make, and verify after the magazine site ships on `main`.

## Verify live (hard-refresh)

- https://artometrics.com/
- https://artometrics.com/search?q=anime
- https://artometrics.com/blog
- https://artometrics.com/topics/games
- https://artometrics.com/desks/culture
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

Full hookup session: `docs/BACKEND_HOOKUP_SESSION.md`  
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
npm run build
```
