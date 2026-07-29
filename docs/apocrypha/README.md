# Apocrypha

**Working title:** *Apocrypha*  
**Form:** A book of short stories written as editorial exposés  
**Home in product:** Twilda novel seed `Apocrypha` (cover kind `apocrypha`)  
**Status:** Concept captured — story ideas TBD

---

## One sentence

Short fiction that arrives dressed as a Wired cover story, an explosive news investigation, or an Artometrics desk report — then reveals (or never quite admits) that it never happened.

## Why this book

Artometrics already trains a voice: calm, precise, finding-first, named-and-dated. *Apocrypha* steals that costume for invented worlds. Each piece should feel like something you might share from a magazine link — until the details don’t check out, or until a final editor’s note breaks the seal.

The title does the work: **apocrypha** are texts of doubtful authenticity. The book is a stack of reports that look verified and aren’t.

## What it is not

- Not a parody that winks every sentence
- Not alternate-history fanfic with real public figures as primary subjects (use composites / invented institutions)
- Not a leak of Artometrics brand into unverified “real” journalism — every piece carries a fiction marker (see Form)

## Relationship to Artometrics

| Layer | Role |
|-------|------|
| Publication reports | Real data, real claims, reproducible charts |
| *Apocrypha* stories | Invented subjects, internally consistent “facts,” same rhetorical machinery |
| Twilda | Where the manuscript lives (codex, drafts, story chapters) |
| Content OS | Optional later: typeset a story as a fake report PDF for the book object — not for the live blog |

Do **not** publish Apocrypha pieces into `src/content/blog/` as live reports. Keep the fiction shelf separate so the magazine’s trust contract stays clean.

## Documents in this folder

| File | Purpose |
|------|---------|
| `FORM.md` | How an Apocrypha story is built (structure, voice, honesty rules) |
| `WORKFLOW.md` | Daily AI loop — use current tools, when (not) to build more |
| `templates/STORY_BRIEF.md` | One brief per story before drafting |
| `stories/_index.md` | Slot list + keep/revise/kill status |
| `stories/<slug>.md` | Per-story brief + draft |

## Next moves (when ready)

1. Read `WORKFLOW.md` — default is Cursor + these docs + Twilda, not a new product
2. Dump raw story ideas into `stories/_index.md` (one line each is enough)
3. Run the loop: concept → agent brief+draft → you mark keep/revise/kill
4. Promote **keep** pieces into Twilda → *Apocrypha* (one chapter = one story)
5. Later, only if friction demands it: thin `apo:brief` CLI or PDF pack for the book object — still never live blog
