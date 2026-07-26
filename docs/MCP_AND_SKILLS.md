# MCP & Cursor skills — Artometrics

How agents and humans hook external tools into the Artometrics factory.

## Content OS (always available)

```bash
npm run cos:brief -- --slug my-topic --desk culture --title "My Topic"
npm run cos:scaffold -- --brief docs/content-os/briefs/my-topic.json
npm run cos:banner-prompt -- --brief docs/content-os/briefs/my-topic.json
npm run cos:publish -- --slug my-topic --undraft
npm run cos:aeo
npm run cos:zine -- --slug my-topic
npm run cos:buffer-schedule -- --slug my-topic
npm run cos:slack-notify -- --slug my-topic --event published
npm run cos:gsc-check
npm run cos:notion-sync
npm run cos:narrate -- --slug my-topic
npm run content
npm run sync:readmitted
```

Style bible: `docs/content-os/STYLE_GUIDE.md` · Article template: `docs/content-os/ARTICLE_TEMPLATE.md`  
Ops checklist: `docs/content-os/templates/ops-publish-checklist.md`

## MCP integrations (owner hooks up)

| MCP / tool | Use | Status |
|------------|-----|--------|
| **Higgsfield** | Hero banners, reels, explainers, voice | Cursor MCP |
| **Buffer** | Schedule LinkedIn / IG from zine captions | MCP + `cos:buffer-schedule` |
| **GA4 / analytics-mcp** | Traffic, report popularity | `EXPO_PUBLIC_GA_ID` + cookie consent |
| **gscServer** | Indexing / sitemap health | MCP + `cos:gsc-check` |
| **ElevenLabs** | Report narration | `cos:narrate` / `ELEVENLABS_API_KEY` |
| **Notion** | Editorial calendar → briefs | MCP + `cos:notion-sync` |
| **Slack** | Publish alerts | MCP + `SLACK_WEBHOOK_URL` / `cos:slack-notify` |
| **GitHub** | Article repos / PRs | MCP + sync scripts |
| **Figma** | Print magazine / covers | MCP (print pass) |
| **Supabase** | Auth, saves, media | Env + migrations |
| **Netlify** | Deploy, functions, forms | Site linked; newsletter form |
| **Transistor** | Podcast host | **Skip while Error** — use `podcast.xml` |
| **Canva** | Social GUI | **Deferred** — use `cos:zine` |

Hookup session: `docs/BACKEND_HOOKUP_SESSION.md` · Owner runbook: `docs/OWNER_PLAYBOOK.md`

## Agent loop (topic → published → distributed → measured)

1. `cos:notion-sync` (or `cos:brief`) — calendar → brief  
2. Research / attach dataset — never invent numbers  
3. Analyze (R/Python / Quarto)  
4. Scaffold + write HTML per style guide  
5. Banner via Higgsfield (`cos:banner-prompt`)  
6. `cos:publish -- --slug … --undraft` (Slack notify if webhook set)  
7. `cos:aeo`  
8. `cos:zine -- --slug …`  
9. `cos:buffer-schedule -- --slug …` (or Buffer MCP)  
10. Optional: `cos:narrate`, `cos:pdf`, `cos:ebook`  
11. `cos:gsc-check` + analytics-mcp for “what to publish next”

Expo stays the **reader + Studio** surface. Do not build Buffer/Notion/Slack admin UIs into the app.

## Cursor rules / skills to use

- Workspace: `.cursor/rules/artometrics.mdc`, `AGENTS.md`
- Netlify skills for functions, redirects, forms, deploy
- Higgsfield skills for image/video
- Prefer `@/` imports; Expo Router only — **no Astro**

## Security notes for agents

- Never commit `.env` / service role / Stripe secrets  
- Use `Netlify.env.get` in functions; client only `EXPO_PUBLIC_*`  
- Saved-articles and Stripe routes require auth headers  
