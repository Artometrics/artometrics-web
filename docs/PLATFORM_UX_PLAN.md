# Artometrics Platform UX Plan

Living product source for the magazine → platform upgrade. Companion to `00_ARTOMETRICS_MASTER_VISION.md`.

## Defaults

- **Social tone:** taste + longform (Substack / Are.na) — profiles, published writing, follows, comments.
- **Publish rules:** members publish to their profile; magazine surface requires editorial review.
- **Profile privacy:** public profile once a handle is claimed; empty Published tab until they ship.
- **Signed-in home:** magazine front stays; thin Studio strip for members.
- **CMS split:** Sanity for editorial + approved public posts; Supabase for auth, private tools, social graph, saves.

## Three surfaces

| Surface | Job | Route |
|---------|-----|-------|
| Magazine | Discover editorial work | `/` |
| Studio | Make private work | `/studio` (deep tools under `/tools/twilda/*`, `/tools/aftercare/*`) |
| Profile | Identity + published work | `/u/[handle]`, private hub `/me` |

## Phases

### P0 — Feel like a product
- Header: Studio entry + avatar menu; theme in menu/settings only
- `/studio` home with continue row + empty states
- `/tools` → `/studio` redirect
- `/settings` (billing, theme, profile fields) vs `/me` (hub)

### P1 — Public identity
- `profiles.handle`, bio, avatar, visibility
- Public `/u/[handle]` (Published · About)

### P2 — Publish + Sanity
- `member_posts` (publish to profile / submit to magazine)
- Sanity Studio for editorial + approved UGC (`sanity/`)
- Private novels/journals stay in Supabase

### P3 — Scoped social
- Comments, follows, `/following` feed, notifications
- Out of scope: DMs, Stories, groups, ads

### P4 — Preference mirror
- Taste panel from reading history + saves (external APIs later)

## Ownership

| Data | System |
|------|--------|
| Reports, podcast, legal, authors (editorial) | Sanity (target) + markdown bridge today |
| Auth, subscriptions, saves | Supabase |
| Twilda / Aftercare private data | Supabase |
| Member posts, comments, follows, notifications | Supabase |
| Approved magazine UGC | Sanity document after review |

## Chrome rules

- Never put `Link asChild` around Reanimated views (RN Web CSSStyleDeclaration crash).
- Flatten style arrays under `asChild`.
- Netlify `/api/*` redirects stay above SPA fallback.
