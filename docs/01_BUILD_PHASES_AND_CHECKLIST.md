# Artometrics — Build Phases & Checklist
**Companion to:** `00_ARTOMETRICS_MASTER_VISION.md` (read that first for the *why*)
**Purpose:** A sequenced, no-timeline checklist for Cursor/Claude to build against. Phases are ordered by dependency, not by date. Do not skip ahead to a later phase's tools before the current phase is stable and actually in daily use.

---

## Phase 0 — Stabilize what exists (DO THIS FIRST, no exceptions)
- [ ] Fix the crash-on-open-article bug in the current app build
- [ ] Fix/replace placeholder or broken images across existing articles
- [ ] Confirm the live site (artometrics.com) and the app build are both functioning end-to-end for a normal reader (browse → open article → read → no crash)

**Why first:** nothing downstream matters if the core reading experience is broken. This is the "truck driver" — the single most basic promise (an article opens and reads correctly) has to hold before anything else is layered on.

---

## Phase 1 — Merge Twilda + Aftercare into one user profile (THIS WEEK'S FOCUS)
- [ ] Design a single unified user account/profile schema that both Twilda and Aftercare write into and read from (no separate logins)
- [ ] Migrate/port whatever exists of Twilda (story planner / research tool) into this schema
- [ ] Migrate/port whatever exists of Aftercare (identity/ancestry tool) into this schema
- [ ] Confirm the profile UI doesn't crash and looks intentional (doesn't need to be final, needs to be usable)
- [ ] Personally use it end-to-end at least once — save something in Twilda, save something in Aftercare, confirm both persist under the same profile

**Why now:** this is explicitly what you said is today/tomorrow's task. Everything else waits on this being real and used, not theoretical.

---

## Phase 2 — Populate from open-source knowledge bases
- [ ] Pull and catalog Project Gutenberg (public-domain texts) into Twilda's reference library
- [ ] Pull and catalog Wikipedia/Wikimedia data where relevant (historical figures, events — feeds Aftercare and Humanities-section article research)
- [ ] Pull and catalog WikiArt (famous artworks + artists + metadata) into the style/reference library
- [ ] Confirm cataloged assets are taggable/searchable, not just dumped in as raw data

**Why now:** this is low-legal-risk (public domain / open licensing), directly useful for your own article writing and Twilda usage, and builds the reference library that later powers the style-matching tools in Phase 4.

---

## Phase 3 — Use it yourself, let real usage reveal what's needed next
- [ ] Actually write articles using the populated library (dogfooding)
- [ ] Actually use Twilda for a real writing project
- [ ] Actually use Aftercare for real identity/ancestry exploration
- [ ] Keep a running note of friction points — what did you reach for that didn't exist yet?

**Why now:** you said it yourself — you want to build the next tools *as you notice you need them* while actually using the product, not from a hypothetical spec. This phase is intentionally "live" rather than a fixed checklist — the friction log becomes the actual spec for Phase 4.

---

## Phase 4 — Connect external preference data (only after Phase 1–3 are solid and in daily use)
- [ ] Spotify / YouTube Music listening history → preference profile
- [ ] Letterboxd (movies), Pinterest (visual boards), Instagram (saves/follows) → preference profile, as available/feasible
- [ ] Build the "algorithm mirror" view — a page where the user can see what the aggregated data suggests about their taste/identity, in their own words, editable/correctable by the user
- [ ] Confirm this is opt-in, clearly explained, and user-owned (this is a trust-sensitive feature — do not silently pull data)

**Why not sooner:** these integrations are the most technically fragile (API changes, auth, rate limits) and least valuable until there's an actual profile system worth feeding. Build the muscle before the machine.

---

## Phase 5 — Creative generation tools (the VST / sample-maker / cross-media generators)
- [ ] Scope the first tool narrowly: start with ONE generator (recommend: the sample/sound pack maker, since it's the most-referenced idea and has the clearest "record something → get original output" loop)
- [ ] Confirm the tool only uses the user's own recorded/input material as raw source (no scraping other artists' copyrighted audio)
- [ ] Connect the tool's output style to the user's preference profile once Phase 4 exists (until then, let the user set preferences manually)
- [ ] Only after the first tool works end-to-end, consider the next one (voice-to-song, report-to-magazine, story-to-comic, etc.) — one at a time, not in parallel

**Why last among the "real" phases:** this is the most technically ambitious piece (actual audio/generative tooling) and depends on the profile system existing first to be genuinely differentiated — otherwise it's just "another AI tool," which is exactly what you're trying to avoid being.

---

## Explicitly OUT of scope for now (moonshot / long-term — do not build toward these yet)
- Hardware devices (recording pencil, digital paintbrush, "aura ring for creativity")
- The maker-space café / physical location
- Any patent or manufacturing work

These are real long-term ambitions, documented in the master vision doc, but they should not influence any near-term architecture or eat into build time until the digital ecosystem above is validated and generating real usage or revenue.

---

## A note on the "AI cost/usage transparency" idea
This surfaced as a smaller, sharply-scoped idea (a plugin showing users what they're actually spending in tokens/cost across AI tools). It doesn't fit neatly into the phases above because it's somewhat independent of the main ecosystem. Worth keeping as a candidate **side/wedge product** — potentially useful as a smaller, faster-to-ship thing if you want a quick win or a separate revenue test, but not required for the main Artometrics build. Revisit after Phase 3.
