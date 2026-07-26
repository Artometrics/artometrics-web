# Next steps — Artometrics media company

Content OS + Studio platform + Swiss/celestial chrome + ops scripts are on the shipping branch / `main`. Use this checklist.

North-star: `docs/MEDIA_EMPIRE_VISION.md` · Owner runbook: `docs/OWNER_PLAYBOOK.md` · MCP: `docs/MCP_AND_SKILLS.md`

---

## Done in code

- Content OS (briefs → scaffold → publish → AEO → zine → PDF/ebook/narrate)
- Ops scripts: Buffer schedule, Notion sync, Slack notify, GSC check
- GA4 (consent-gated) + Netlify Forms newsletter
- Studio / Twilda / Aftercare + Birth tools depth + celestial posters
- Library specimen cards + open reference catalogs
- Platform: profiles, publish, comments/follows foundations
- Tests: `npm run test:unit`, `test:ops-scripts`, `test:smoke`

---

## Your turn (env / accounts)

1. **Netlify** — confirm build `npm run build` → `dist`, Node 20; set env from `.env.example`
2. **GA4** — set `EXPO_PUBLIC_GA_ID=G-…` on Netlify
3. **Supabase** — migrations applied; `media` bucket
4. **Stripe** — when billing goes live (`docs/PRODUCT_SETUP.md`)
5. **Buffer / Notion / Slack** — connect Cursor MCPs; optional API tokens for CLI scripts
6. **Sanity** — optional; follow `docs/SANITY_SETUP.md` go-live checklist
7. **Skip** Transistor (Error) and Canva (use `cos:zine`)

---

## Publish loop

```bash
npm run cos:publish -- --slug <slug> --undraft
npm run cos:zine -- --slug <slug>
npm run cos:buffer-schedule -- --slug <slug>
npm run cos:gsc-check
```

Full checklist: `docs/content-os/templates/ops-publish-checklist.md`

---

## Still deferred (product)

- Google Auth custom domain
- Preference mirror / Spotify
- Generators / Instagram-depth social
- Full Sanity cutover from markdown
- Transistor private feeds
