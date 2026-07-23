# Artometrics — App Store launch (publisher)

How we get **Artometrics** on the iOS App Store as a publisher using Expo + EAS.

**What the agent can do in-repo:** EAS config, store metadata, Get the App wiring, build commands.  
**What only you can do:** Apple Developer enrollment ($99/yr), identity verification, App Store Connect listing, paid agreements, first `eas login` / credentials.

Full stack context: `docs/FULL_STACK_RECIPE.md`.

---

## Reality check (order that works)

1. Enroll **Apple Developer Program** (Individual *or* Organization as publisher)  
2. Create the app in **App Store Connect**  
3. `eas login` + link Expo project → Apple team  
4. `eas build -p ios --profile production`  
5. Fill listing + screenshots + privacy  
6. `eas submit -p ios --profile production`  
7. Wait for review → ship → put URL on `/get-app`

Do **not** wait for Stripe/Supabase to be perfect before TestFlight — but **membership features** in the app need those env vars on EAS secrets before you market “subscribe in-app.”

---

## Step 1 — Apple account as publisher (~30–90 min + Apple review)

### Choose entity
| Type | Use when | Notes |
|------|----------|--------|
| **Individual** | Solo founder | Your legal name shows as seller |
| **Organization** | LLC / company | Needs D-U-N-S; seller name = company (preferred for “Artometrics” brand) |

### Enroll
1. https://developer.apple.com/programs/enroll/  
2. Sign in with the Apple ID you’ll keep forever for this brand  
3. Pay **$99 USD / year**  
4. Complete identity / org verification (Organization can take days)  
5. Accept agreements in App Store Connect → **Agreements, Tax, and Banking**  
   - Paid Apps agreement  
   - Tax forms  
   - Bank account for payouts  

### Publisher identity checklist
- [ ] Seller / company display name: **Artometrics** (or your legal entity)  
- [ ] Support URL: `https://artometrics.com/contact`  
- [ ] Marketing URL: `https://artometrics.com`  
- [ ] Privacy Policy URL: `https://artometrics.com/legal/privacy` (required)  
- [ ] Copyright: `© 2026 Artometrics` (or your LLC)  

---

## Step 2 — App Store Connect app record

1. https://appstoreconnect.apple.com → **My Apps** → **+** → **New App**  
2. Platforms: **iOS**  
3. Name: **Artometrics** (30 char limit; must be unique)  
4. Primary language: English (U.S.)  
5. Bundle ID: select **`com.artometrics.app`** (must match `app.json` — create in Certificates, Identifiers & Profiles if missing)  
6. SKU: `artometrics-ios-001` (internal, immutable)  
7. User Access: Full Access  

Copy the numeric **Apple ID** (App Store Connect app id) into `eas.json` → `submit.production.ios.ascAppId`.  
Copy **Team ID** (developer.apple.com → Membership) into `eas.json` → `appleTeamId`.

---

## Step 3 — Expo / EAS (this repo)

```bash
npm install
npm install -g eas-cli   # or npx eas-cli
eas login                # Expo account (create free at expo.dev)
eas init                 # link project; writes projectId into app.json/app.config
eas build:configure      # already have eas.json — confirm
```

### EAS secrets (production)
Set the same public env the web uses (no service-role key on device):

```bash
eas secret:create --name EXPO_PUBLIC_SITE_URL --value https://artometrics.com --scope project
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://….supabase.co" --scope project
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "…" --scope project
eas secret:create --name EXPO_PUBLIC_GA_ID --value "G-…" --scope project
```

### Build + TestFlight

```bash
# Production IPA (auto-increments buildNumber via eas.json)
# Use npx if `eas` is not installed globally:
npx eas-cli build -p ios --profile production
# or: npm run eas:build:ios

# After first successful build + App Store Connect app exists:
npx eas-cli submit -p ios --profile production --latest
```

TestFlight: App Store Connect → TestFlight → add **Internal** testers (your Apple ID) → install on iPhone → smoke magazine, login, charts (PNG), podcast.

---

## Step 4 — Listing copy (paste into Connect)

Metadata lives in `store/ios/` for version control.

| Field | Value |
|-------|--------|
| Name | Artometrics |
| Subtitle | Data magazine for culture |
| Category | News (primary) · Magazines & Newspapers (secondary) |
| Age | 12+ (or as questionnaire dictates) |
| Price | Free (IAP / external membership later) |

**Promotional text** (170): see `store/ios/promotional_text.txt`  
**Description**: see `store/ios/description.txt`  
**Keywords**: see `store/ios/keywords.txt`  
**What’s New**: see `store/ios/whats_new.txt`  

### Privacy nutrition labels (honest defaults)
| Data | Linked to identity? | Tracking? | Why |
|------|---------------------|-----------|-----|
| Email | Yes | No | Account / membership |
| Product interaction | Optional | Only if GA4 IDFA — prefer **no ATT** at v1 | Analytics |
| Purchase history | Yes (via Stripe web) | No | Subscription status |

**v1 recommendation:** no App Tracking Transparency prompt; use GA4 without IDFA or omit GA on native until needed. Declare only Account + Purchases if membership is live.

### Screenshots (required)
Capture on a real device or Simulator at least:
- **6.7"** (iPhone 15 Pro Max) — 1290×2796  
- **6.5"** — 1284×2778  
- Optional iPad if `supportsTablet: true`

Suggested 3–6 frames: Home · Report with chart · Podcast · Library/Account · Pricing.

Store placeholders: `store/ios/screenshots/README.md`.

---

## Step 5 — Review notes for Apple

Paste into App Store Connect → App Review Information:

```
Artometrics is a data-science magazine reader (Expo).
Demo account (if membership gating is on):
  email: review@artometrics.com
  password: [create a TestFlight-only Supabase user]

Privacy policy: https://artometrics.com/legal/privacy
Support: https://artometrics.com/contact

Charts render as static PNGs on native; interactive Plotly is web-only.
Subscriptions are managed via Stripe on the website (Account → Manage billing)
unless In-App Purchase is enabled in a later release.
```

**Important (Guideline 3.1.1):** If the app sells digital subscriptions **inside** the app, Apple requires **In-App Purchase**.  
v1 safest path: **Free reader app** + “Subscribe on the web” links to `https://artometrics.com/pricing` (no IAP). Add StoreKit IAP in v1.1 if you want in-app purchase.

---

## Step 6 — Ship + wire Get the App

1. Submit for review  
2. On approval, copy App Store URL  
3. Set Netlify / EAS env:
   - `EXPO_PUBLIC_IOS_STORE_URL=https://apps.apple.com/app/idXXXXXXXX`  
4. Redeploy web so `/get-app` shows the real button  

---

## Commands cheat sheet

| Command | Purpose |
|---------|---------|
| `npm run eas:build:ios` | Production iOS build |
| `npm run eas:submit:ios` | Submit latest IPA to App Store Connect |
| `npm run eas:build:preview` | Internal TestFlight-style preview build |

---

## Blockers only you can clear

| Blocker | Owner action |
|---------|----------------|
| Not enrolled | Pay $99 + verify identity |
| No Team ID / ASC App ID | Fill `eas.json` submit block |
| Not logged into Expo | `eas login` |
| Apple login / 2FA on this VM | Run `eas build` / `submit` on your Mac or local machine with Apple ID |
| Banking / tax not accepted | App Store Connect agreements |
| Screenshots missing | Capture from Simulator after preview build |

Once enrollment is **Active**, tell the agent your **Team ID** + that `eas login` works on your machine — we continue with build credentials and submit.
