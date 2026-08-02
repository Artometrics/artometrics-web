# Artometrics Design System

_Started 2026-08-02 04:58 UTC_

---

## User

# Claude Design brief — Artometrics system

Paste the System seed into Claude Design → Create design system. Then use Apply prompts for packs. Do not freestyle a new brand.

Logic companion: Compounding Desk — Logic

## Before you start

1. Claude Design → Create design system from visual assets (or GitHub if linked)
2. Attach refs if you have them: monogram A (black/white/red), OG card, one live article screenshot
3. Name the system: Artometrics
4. Prefer Opus for system creation; cheaper model for pack iterations after

## System seed (copy everything below)

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

## Apply prompt A — IG zine

Using the Artometrics design system only: create a 6-slide Instagram pack (4:5) for a data report. Each slide: one claim, one short supporting line, optional chart placeholder frame, Artometrics wordmark small bottom. No cards-as-decoration. No purple. High contrast B/W/red. Slide 1 = brand + title. Slides 2–5 = findings. Slide 6 = dataset CTA → artometrics.com

## Apply prompt B — OG card

Using the Artometrics design system: 1200×630 share card. Black field, white ARTOMETRICS wordmark, thin red rule, report title in DM Mono, one-line dek in DM Sans muted gray. No photo collage. No badges.

## Apply prompt C — Edition cover

Using the Artometrics design system: special-edition cover layout (print + digital). Full-bleed photographic or chart hero optional; brand must still read as Artometrics if nav is removed. Title, edition name, date line. Sparse red accent only.

## After Claude Design

1. Export / send to Claude Code or Cursor when layout is locked
2. Map packs into Content OS (cos:zine, banner prompts) — do not invent a second brand in Expo
3. Drop approved assets into Canva Brand Kit folder + repo public/images/ as needed

## Do not ask Claude Design for

- A new logo that replaces Chomsky/A mark
- Purple AI product landing pages
- Dashboard-style first viewport
- Generic Inter/saas templates

## Assistant

This brief describes creating a new **Artometrics** design system (red/black/white, DM Mono/DM Sans, Barbara Kruger-style) — but this project already has **Modernist** bound as its design system, which is a different palette/type/voice. Two conflicting systems can't both apply.

Also, the brief is written as instructions for a separate "Claude Design" system-creation tool, not a direct build request — no page/deck/card is specified as ready to build here.

Quick clarification before I build anything:

_[tool: questions_v2]_

## User

Questions answered:
- which_system: Build Artometrics as its own new system here, ignoring Modernist
- deliverable: IG zine pack (6 slides, 4:5), Edition cover layout, OG share card (1200x630), Full design system reference doc (tokens/type/components)

## Assistant

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: dc_write]_

All four built as new-brand DCs (Artometrics, not Modernist): the design system reference doc, the 6-slide IG zine pack, the OG share card, and the edition cover.

_[tool: ready_for_verification]_

Built four Design Components for the Artometrics system: the reference doc (tokens, type, components, do/don't, sample layouts), IG zine pack (6×4:5 slides), OG share card (1200×630), and edition cover. Chomsky isn't Google-Fonts-available, so the wordmark uses DM Mono everywhere — flag if you have a Chomsky file to load instead.

## User

i want the logo to be chomsky font.

## Assistant

_[tool: list_files]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: web_search]_

Now the other three files.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Wordmark now set in Chomsky (via cdnfonts, free/OFL license) across all four files — design system doc, IG pack, OG card, edition cover — while headers/body stay DM Mono/DM Sans.

## User

so i want the top of my website to be this, a magazine news stand. but i want this style for our instagram carousels and posts and such, and the magazine to be like this. and im also gonna make the design style of my media and books like this vhs collection

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- scope: Website homepage top (newsstand hero), Magazine/edition pages (Art Newspaper dark editorial style), IG carousel/post template (Kruger poster style), Media/books collection page (VHS spine shelf)
- website_scope: Hero + a bit of homepage below (headlines list, sections)
- newsstand_content: Stylized grid of placeholder/Artometrics edition covers (own content)
- ig_content: Both
- vhs_count: 12
- replace_or_add: Keep both, add these as new files

## User

Found issues — fixing…

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

Fixed the overlap.

## User

okay. so i connected notion and canva and github. can you send all this to claude code and look at  https://artometrics.com/ and make instagram carosels or assets or apply them

## Assistant

_[tool: read_skill_prompt]_

_[tool: web_fetch]_

_[tool: tool_search_tool_bm25]_

_[tool: read_file]_

_[tool: web_fetch]_

_[tool: tool_search_tool_bm25]_

_[tool: tool_search_tool_bm25]_

_[tool: tool_search_tool_bm25]_

_[tool: dc_write]_

_[tool: write_file]_

_[tool: copy_files]_

_[tool: present_fs_item_for_download]_

_[tool: ready_for_verification]_

Two things done, one flag:

1. **Handoff package** ready above — README with tokens/type/component specs + all 9 design files, for a developer to rebuild on the real site.
2. **New IG carousel** ("Artometrics IG Carousel - Live Content") built with real headlines pulled from artometrics.com right now (Padres, Beyoncé, Oscars/Grammys/Nobels, Cities piece).

Flag: GitHub/Canva aren't actually showing as active connectors in my tool access this turn, so I can't push to your repo or Canva directly — the zip above is the deliverable for now. If you want it pushed automatically, reconnect and ping me.

## User

can you push all this design stuff to notion and google drive and make in caroseul and... i wanna just apply this to the github via claude code

## Assistant

_[tool: googledrive__create_file]_

_[tool: read_file]_

_[tool: tool_search_tool_bm25]_

_[tool: tool_search_tool_bm25]_

_[tool: run_script]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

Continuing uploads for the remaining 7 design files.

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

_[tool: googledrive__create_file]_

All 9 design files uploaded to Drive. Now creating the Notion page and re-confirming GitHub status.

_[tool: notion__notion-create-pages]_

_[tool: connect_github]_

Done:

- **Google Drive** — folder "Artometrics Design System" with all 9 files + README
- **Notion** — page "Artometrics Design System" with tokens/type spec and a Drive link

**GitHub isn't actually connected** in this session — to push via Claude Code, open the Import menu in the chat composer → Connect GitHub, then message me again and I'll pull the repo and apply these designs directly.

## User

u dont see an imprt menu thing. do i open claude code

## Assistant

No import menu on your side — that's a control in this chat's composer (usually a "+" or attachment/connectors icon near the message box), not a separate app. Look there for "Connect GitHub." You don't need to open Claude Code separately — once GitHub is connected here, I can pull the repo and apply the designs directly in this same conversation.

## User

i connected it but artometrics is its own organization. you dont have to the githubs for kylesmcauliffe right

## Assistant

_[tool: github_list_repos]_

Confirmed — I do see `Artometrics/artometrics-web` (the main site, Astro + Tailwind), plus several other Artometrics repos. Want me to pull `artometrics-web` now and start applying these designs?

## User

yes. with claude code

## Assistant

_[tool: github_get_tree]_

_[tool: github_read_files]_

_[tool: github_read_files]_

_[tool: write_file]_

_[tool: present_fs_item_for_download]_

Checked the real repo (`Artometrics/artometrics-web` — Expo/React Native Web, not plain HTML/CSS). Good news: the Kruger brand system, tokens, and a newsstand grid already exist in code (`constants/Colors.ts`, `components/Newsstand.tsx`, `components/MagazineCard.tsx`) — largely matching what we mocked.

Since I can't write code into the repo directly, I updated the handoff package (above) to be repo-grounded: it flags what's genuinely new (Kruger-style IG carousel, VHS shelf, edition pages) vs. what may already exist (`pack-ig-zine.mjs`, existing OG card), and points to exact files/tokens to reuse. Hand this to Claude Code against that repo and it can implement directly — I can guide from here if issues come up.

