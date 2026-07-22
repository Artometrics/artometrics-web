# MCP & Cursor skills — Artometrics

How agents and humans hook external tools into the Artometrics factory.

## Content OS (always available)

```bash
npm run cos:brief -- --slug my-topic --desk culture --title "My Topic"
npm run cos:scaffold -- --brief docs/content-os/briefs/my-topic.json
npm run cos:banner-prompt -- --brief docs/content-os/briefs/my-topic.json
npm run cos:publish -- --slug my-topic
npm run cos:aeo
npm run cos:zine -- --slug anime
npm run content          # rebuild src/generated/*
npm run sync:articles    # legacy Quarto repos
npm run sync:readmitted  # monorepo gold
```

Style bible: `docs/content-os/STYLE_GUIDE.md` · Article template: `docs/content-os/ARTICLE_TEMPLATE.md`

## MCP integrations (owner hooks up)

| MCP / tool | Use | Status |
|------------|-----|--------|
| **Higgsfield** | Hero banners, motion, brand stills | Re-auth in Cursor MCP settings |
| **Buffer** | Schedule LinkedIn / IG / YT / FB / Pinterest | Connect after Buffer account exists |
| **GA4 / Analytics MCP** | Traffic, report popularity | Needs `EXPO_PUBLIC_GA_ID` |
| **Semrush** | Keyword briefs at scale | When publishing weekly |
| **ElevenLabs** | Report narration | After first gold audio pass |
| **Supabase** | Auth, saves, media Storage | Env keys + `media` bucket |
| **Netlify** | Deploy, functions, forms | Site already linked |

Vision: `docs/MEDIA_EMPIRE_VISION.md` · Owner checklist: `docs/OWNER_PLAYBOOK.md`

## Cursor rules / skills to use

- Workspace: `.cursor/rules/artometrics.mdc`, `AGENTS.md`
- Netlify skills when touching functions, redirects, forms, identity, blobs
- Higgsfield skills for image/video generation
- Prefer `@/` imports; Expo Router only — **no Astro**

## Agent loop (topic → published report)

1. Brief (`cos:brief`) with desk + channels  
2. Research / attach dataset  
3. Analyze (R/Python / Quarto) — never invent numbers  
4. Scaffold + write HTML per style guide  
5. Banner via Higgsfield (`cos:banner-prompt`)  
6. Publish (`cos:publish --undraft` when ready)  
7. AEO pack (`cos:aeo`)  
8. Zine / social captions (`cos:zine`)  
9. Optional: Buffer schedule, narration, PDF pack  

## Security notes for agents

- Never commit `.env` / service role / Stripe secrets  
- Use `Netlify.env.get` in functions; client only `EXPO_PUBLIC_*`  
- Saved-articles and Stripe routes require auth headers  
