# Apocrypha — daily workflow

**Verdict:** do **not** build a new fiction product yet. Reuse the Content OS *shape* (brief → draft → curate) on a separate fiction shelf, with Cursor as the daily writer and Twilda as the manuscript home.

---

## What you’re optimizing for

| Goal | Implication |
|------|-------------|
| A story most days | Throughput > polish on first pass |
| You supply the concept | Human = editor + taste; AI = first draft machine |
| Keep the best | Explicit **keep / revise / kill** gate — volume is fine, canon is curated |
| Don’t break magazine trust | Never `cos:publish` into live Reports |

## Use current stuff vs build tools

| Piece | Role now | Build later only if… |
|-------|----------|----------------------|
| **Cursor agent** | Daily writer (this chat / cloud agent) | — |
| **`docs/apocrypha/`** | Control plane: briefs, drafts, index, keep/kill | — |
| **`FORM.md` + story brief** | Style + structure (fiction Content OS) | — |
| **Twilda → Apocrypha** | Canonical manuscript for keepers | Friction: copying keepers in by hand gets annoying |
| **Content OS (`cos:*`)** | **Do not** use publish path for fiction | You want print/PDF chrome for the *book object* only |
| **New Studio “daily fiction” UI** | Skip | You’re doing this daily *and* Twilda/docs feel too slow |

Rule of thumb from the build checklist: dogfood the loop first; tools appear from friction, not from a speculative factory.

## The loop (one concept → one draft)

```
you: 1–5 sentence concept (or pick from idea dump)
        ↓
agent: fill story brief  →  docs/apocrypha/stories/<slug>.md
        ↓
agent: write full exposé (dispatch or cover-story tier)
        ↓
you:   mark keep | revise | kill  in stories/_index.md
        ↓
if keep: copy/promote into Twilda Apocrypha chapter (manuscript)
```

### Your job (minutes)

1. Drop a concept — premise, institution, finding, or just a vibe + stakes  
2. Optionally set tier: `dispatch` (short day) vs `cover-story` (longer)  
3. Later the same day or week: skim and mark **keep / revise / kill**

### Agent job

1. Slug + working cover-style title  
2. Brief from `templates/STORY_BRIEF.md`  
3. Full draft in the same `stories/<slug>.md` (or a `draft.md` beside it) following `FORM.md`  
4. Update `_index.md` status to `drafting` or `drafted`  
5. Stop — do not auto-promote to Twilda or “publish” anywhere public

### Cadence options

| Cadence | When it fits |
|---------|----------------|
| **Daily dispatch** | Habit building; 1.2–2k words; one mechanism, one turn |
| **3× week cover stories** | Higher quality; 2.5–4.5k; better book candidates |
| **Batch day** | You dump 5 concepts Sunday; agent drafts Mon–Fri; you curate Saturday |

Start with **daily dispatch** or **3× week** — not both — until the keep rate is visible.

## Keep / revise / kill

In `_index.md` status column:

| Status | Meaning |
|--------|---------|
| `idea` | Premise only |
| `briefed` | Brief filled, no prose yet |
| `drafted` | Full first draft exists |
| `revise` | Worth another AI/human pass |
| `keep` | Book candidate → Twilda chapter |
| `kill` | Archive; don’t delete (useful for voice learning) |

**Keep rate expectation:** if you’re keeping >50% of daily drafts, raise the bar or shorten the brief. The collection should feel edited, not like a streak counter.

## Prompt contract (paste when starting a day)

```
Apocrypha draft.
Concept: <your concept>
Tier: dispatch | cover-story
Follow docs/apocrypha/FORM.md and templates/STORY_BRIEF.md.
Write brief + full draft under docs/apocrypha/stories/<slug>.md.
Update stories/_index.md. Do not publish to blog. Do not invent tools.
```

## What not to build yet

- A separate “Apocrypha app” or membership feature  
- Auto-posting fiction to artometrics.com Reports  
- Generators that remix live article datasets into fake reports (trust risk)  
- Heavy Novel-Crafter feature work just for this loop  

## When to graduate a tool

Add something only after you’ve run the loop ~10–20 times and hit the same pain twice:

1. **Friction: “keepers aren’t in Twilda”** → small script or agent step: promote `keep` → Twilda chapter  
2. **Friction: “I want a print-looking PDF of keepers”** → reuse `cos:pdf`-style packing into `docs/apocrypha/exports/`, still not live blog  
3. **Friction: “concept → brief is tedious”** → `npm run apo:brief` mirroring `cos:brief` (thin CLI, same docs folder)  

Until then: Cursor + markdown + Twilda is the product.

## Relationship to Phase 1

This loop **dogfoods Twilda** (Phase 3 energy) without blocking the profile merge. Writing Apocrypha in Twilda is a valid “use it yourself” project. Building new Studio surfaces for Apocrypha is not this week’s focus unless the merge work is idle and the daily loop is already sticky.
