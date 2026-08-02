# Claude Design brief — Artometrics

Use with Notion page under Brand & design, or paste directly into Claude Design.

## System seed

```
Create a complete design system named Artometrics for an independent data-science magazine and creative platform (artometrics.com).

Brand direction — Barbara Kruger structure, Swiss/magazine hybrid, not generic AI SaaS:
- Primary accent red: #C0392B (magazine) / #D9251B acceptable for UI accent
- Neutrals only: #000000, #FFFFFF, #525252, #E5E5E5, #F5F5F5
- No purple gradients, no cream+terracotta, no glow, no soft multi-layer shadows, no rounded-full pill clusters
- High contrast, hard rules/hairlines, sparse red accents

Typography:
- Display / headers: DM Mono (or Anton as Swiss alternate) — condensed, editorial, not Inter/Roboto
- Body: DM Sans
- Wordmark/logo contexts may use Chomsky for the Artometrics mark only — do not set body in Chomsky
- Mono for data labels / chart captions: DM Mono or Courier New

Layout principles:
- Brand first: on promotional surfaces the wordmark/mark is a hero-level signal
- Full-bleed heroes on landing/promo — edge-to-edge visual plane, not inset cards
- First viewport budget: brand + one headline + one short line + one CTA group + one dominant image
- No hero overlays (badges, chips, floating stickers)
- Cards only when they contain a real interaction; default is no cards
- One job per section
- Charts: one claim, clean axes, limitations/source line present

Components to define in the system:
- Color tokens + usage
- Type scale (display, H1–H3, body, caption, data mono)
- Buttons (primary red, secondary black outline, ghost)
- Rules / dividers
- Article dek / pull quote
- Chart frame + source footer
- Instagram zine slide (4:5 and 9:16)
- OG / share card 1200×630 (black field, white ARTOMETRICS, red rule)
- Edition cover block

Voice of UI chrome: professional, objective, sparse — no fluff, no emoji decoration.

Output a reusable design system document with tokens, type, components, do/don’t, and 2–3 reference layouts (home promo strip, report share card, IG zine slide).
```

## Apply prompts

**IG zine:** Using the Artometrics design system only: create a 6-slide Instagram pack (4:5) for a data report. Each slide: one claim, one short supporting line, optional chart placeholder frame, Artometrics wordmark small bottom. No cards-as-decoration. No purple. High contrast B/W/red. Slide 1 = brand + title. Slides 2–5 = findings. Slide 6 = dataset CTA → artometrics.com

**OG card:** Using the Artometrics design system: 1200×630 share card. Black field, white ARTOMETRICS wordmark, thin red rule, report title in DM Mono, one-line dek in DM Sans muted gray. No photo collage. No badges.

**Edition cover:** Using the Artometrics design system: special-edition cover layout (print + digital). Full-bleed photographic or chart hero optional; brand must still read as Artometrics if nav is removed. Title, edition name, date line. Sparse red accent only.
