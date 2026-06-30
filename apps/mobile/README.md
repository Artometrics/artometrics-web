# Artometrics mobile (Expo companion)

Native reader app for [Artometrics](https://artometrics.com). It complements the Astro website — it does **not** replace it.

## What it does (v1)

| Tab | Purpose |
|-----|---------|
| **Home** | Latest reports + “This week” from `GET /feed.json` |
| **Saved** | Device reading list (`artometrics:saved-articles`) |
| **Listen** | Podcast episodes; plays audio when `audioSrc` exists on the site |
| **Account** | Continue reading + links to web sign-in / pricing |

Reports open in an in-app **WebView** so charts and long-form layout stay identical to the website.

## Prerequisites

- Node.js 18+
- [Expo Go](https://expo.dev/go) on your phone, or Android/iOS simulator
- The Astro site deployed with `/feed.json` (see `src/pages/feed.json.ts` in the repo root)

## Setup

```bash
cd apps/mobile
npm install
cp .env.example .env
```

Edit `.env`:

```env
# Production (default)
EXPO_PUBLIC_SITE_URL=https://artometrics.com

# Local Astro preview while developing the feed endpoint
# EXPO_PUBLIC_SITE_URL=http://YOUR_LAN_IP:4321
```

Start the app:

```bash
npm start
```

Scan the QR code with Expo Go, or press `a` / `i` for emulators.

## Architecture

```text
Astro site (publisher)          Expo app (reader)
─────────────────────          ─────────────────
/feed.json          ────────►  Home + Listen tabs
/{slug}/            ◄────────  WebView reader
/api/* (later)      ────────►  Supabase sync (v2)
```

Shared local keys (same as the web PWA):

- `artometrics:saved-articles`
- `artometrics:reading-progress`

## Roadmap (not in v1)

- Supabase sign-in inside the app
- Sync saved reports with `/api/saved-articles`
- Push notifications for new reports/episodes
- Offline article cache
- App Store / Play Store builds via EAS

## Commands

| Command | Action |
|---------|--------|
| `npm start` | Expo dev server |
| `npm run android` | Open on Android |
| `npm run ios` | Open on iOS (macOS required for simulator) |
| `npm run web` | Expo web preview (not the production site) |
