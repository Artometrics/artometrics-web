# Ops publish checklist

Use after a report is ready to ship.

## Preflight

- [ ] Brief exists under `docs/content-os/briefs/<slug>.json`
- [ ] Draft HTML written; no invented numbers
- [ ] Hero image in `public/images/...`
- [ ] Charts exported (Plotly JSON + PNG)
- [ ] `draft: false` when going live

## Ship

```bash
npm run cos:publish -- --slug <slug> --undraft
npm run cos:zine -- --slug <slug>
npm run cos:buffer-schedule -- --slug <slug>
npm run cos:slack-notify -- --slug <slug> --event published
npm run cos:gsc-check
```

Optional:

```bash
npm run cos:narrate -- --slug <slug>   # needs ELEVENLABS_API_KEY
npm run cos:pdf -- --slug <slug>
npm run cos:ebook -- --slug <slug>
```

## Verify live

- [ ] `https://artometrics.com/<slug>`
- [ ] `/rss.xml` and `/sitemap.xml` include the slug
- [ ] Newsletter form still submits (`/newsletter`)
- [ ] Buffer queue shows the caption (or MCP confirm)
- [ ] Slack channel saw the notify (if webhook set)

## Netlify Forms note

Form name: `artometrics-newsletter`  
Detection stub: `public/newsletter-form.html`  
AJAX posts from `/newsletter` to `/` with `form-name=artometrics-newsletter`.
