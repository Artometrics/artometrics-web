# Artometrics — Media Empire Vision

Owner brief (captured 2026-07-22). This is the north star for tooling, MCP hooks, and the editorial playbook.

## One sentence

Turn a topic + data into a full Vice/magazine-scale package: researched brief → analyzed charts → styled HTML report → banner → AEO → site + app sync → narration → social (Buffer) → magazine/print packs — with Artometrics desks, color, pacing, and keyword access throughout.

## End-to-end playbook (when you say “write about X”)

1. **Keyword research** — find target queries; seed Semrush / corpus / brief JSON.
2. **Style** — banners and section pacing follow `docs/content-os/STYLE_GUIDE.md` (Artometrics red, HTML progressions, chart presentation).
3. **Data → analysis → prose** — pull/attach data; agent analyzes; writes the report HTML to Content OS draft standards.
4. **Banner** — Higgsfield (Cursor MCP) from `cos:banner-prompt`.
5. **Publish** — `cos:publish` → Expo site; undraft when charts + hero are real.
6. **AEO** — `llms.txt`, descriptions, internal links, share affordances, JSON-LD.
7. **Members / media store** — Supabase login + storage for published media assets.
8. **Narration** — ElevenLabs (or human) long-form audio on the episode/report.
9. **Visual packs** — HTML/CSS animations or chart motion that match brand color/pacing; short-form scripts; IG zine / long-form magazine PDF or print-ready layout.
10. **Distribute** — Buffer (LinkedIn, Instagram, YouTube, Facebook, Pinterest, X); captions from zine packs.
11. **App** — Expo native build; Apple Developer ($99/yr) for App Store; site content syncs to the app.

## MCP / integrations wishlist

| Tool | Role | Status in plan |
|------|------|----------------|
| **Higgsfield** | Covers, banners, motion | MCP connected when auth is live |
| **Buffer** | Social schedule / push | Hook after account + channels |
| **GA4 / analytics MCP** | Measure what ships | Free GA4 + optional MCP |
| **Semrush** | Keyword research MCP | When briefs are weekly |
| **ElevenLabs** | Narration | After first gold narrated report |
| **Supabase** | Auth, media blobs | Migrations + Storage bucket |
| **Cursor** | Factory agent loop | Already driving Content OS |

(“Hicksville” in the voice note → **Higgsfield**. “Get her / Go analytics” → **GA** / analytics MCP. “Sigma” → aspirational analytics / revision layer — fold into GA4 + editorial revision passes for now.)

## What already exists in-repo

- Content OS: brief → scaffold → banner prompt → publish → AEO → IG zine
- Media company operating plan: `docs/MEDIA_COMPANY_PLAN.md`
- Hand-off checklist: `docs/NEXT_STEPS.md`
- Expo web + native codebase; Netlify deploy from `main`
- Atlantic-style site chrome + Chomsky A brand mark on `main`

## What still needs human setup

1. Netlify production deploy from `main` (should auto-build on push)
2. Re-auth Higgsfield MCP
3. GA4 Measurement ID → `EXPO_PUBLIC_GA_ID`
4. Supabase Storage `media` bucket + env keys
5. Buffer account + connected channels
6. Apple Developer Program when ready to ship App Store
7. Pick/finish a gold report (anime elevate **or** streaming-catalog-power + data)

## Agent rule when this vision is invoked

Do **not** invent parallel stacks. Extend Content OS + Expo + Netlify + Supabase. Prefer one playbook run end-to-end on a single desk report before adding new SaaS.
