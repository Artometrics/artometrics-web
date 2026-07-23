# iOS screenshots

Required before submit (App Store Connect → App Preview and Screenshots).

## Sizes
- iPhone 6.7" display: **1290 × 2796** (required)
- iPhone 6.5" display: **1284 × 2778** (recommended)
- iPad Pro 12.9" if keeping `supportsTablet: true`

## Capture flow
1. `eas build -p ios --profile preview` **or** `npx expo start` on Simulator  
2. Open: Home → a report with charts → Podcast → Account/Pricing  
3. Export PNGs into this folder named:
   - `01-home.png`
   - `02-report-chart.png`
   - `03-podcast.png`
   - `04-library-or-account.png`
   - `05-sections.png`

Do not commit huge binaries unless final; Connect upload is the source of truth for review.
