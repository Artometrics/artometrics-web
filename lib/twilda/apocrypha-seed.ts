import type { CodexEntry, Chapter, Novel } from "@/lib/twilda/novelcrafter/data";

/** Default snippets saved into Apocrypha on first open / create. */
export const apocryphaSnippets: { title: string; content: string }[] = [
  {
    title: "Book bible — logline",
    content: `Apocrypha is a collection of short stories written as editorial exposés — Wired cover stories, explosive investigations, Artometrics-style desk reports — about things that never happened. Each piece wears the costume of verified journalism. The title is the tell: apocrypha are texts of doubtful authenticity.`,
  },
  {
    title: "Reader contract",
    content: `Every story opens with a fiction marker (prefatory editor's note by default), then commits fully to report voice. Do not wink every sentence. Do not publish these into the live Artometrics blog feed — fiction shelf only.

Allowed markers:
1. Prefatory editor's note — "This report is fiction…"
2. Desk slug — APOCRYPHA · FICTION in the eyebrow
3. End seal — unmistakable final note (use sparingly)`,
  },
  {
    title: "Form — structural skeleton",
    content: `Mirror a magazine investigation, then twist:

1. Dek / lead — finding first (2–4 grafs)
2. Research question
3. Fast facts — 3–6 invented-but-consistent numbers
4. Body — mechanism → timeline → power map → human cost → denial
5. Limitations — what the "data" cannot prove (make this do narrative work)
6. Editor's note / method — sourcing theater
7. Optional download-rail parody as literary prop

Dialogue only as testimony, leaks, or transcripts — always framed as evidence.`,
  },
  {
    title: "Voice rules",
    content: `- Professional, objective, insightful, no fluff
- Named and dated "facts" only — even when invented
- One calm expert voice (Artometrics house), not thriller prose
- Mechanism over mood; dread from the ledger
- Titles should look at home on a Wired or Artometrics cover
- No real living private individuals as thinly veiled targets
- Inside one story: numbers, dates, and institution names must not contradict`,
  },
  {
    title: "Length tiers",
    content: `- Dispatch: 1,200–2,000 words
- Cover story: 2,500–4,500 words (default)
- Special report: 5,000–8,000 words (rare)

Ending modes: ledger-closes | limitation-is-horror | institutional-shrug | broken-seal | open-foia`,
  },
  {
    title: "How to use this manuscript",
    content: `One chapter = one story. Rename chapter titles to cover-style headlines when a premise sticks. Fill Fast Facts and Research Question scenes first, then the Body. Keep briefs also in docs/apocrypha/stories/ so the repo bible stays in sync with Twilda.`,
  },
];

const apocryphaCodex: CodexEntry[] = [
  {
    id: "apocrypha-desk",
    type: "lore",
    name: "Apocrypha Desk",
    initials: "AD",
    color: "from-stone-700 to-red-900",
    tags: ["frame", "fiction", "desk", "collection"],
    aliases: ["the Desk", "Apocrypha Archive"],
    summary:
      "Optional in-world frame: a fiction desk that publishes investigations that never happened, using the full machinery of magazine reportage.",
    description: `Optional shared frame for the collection — not required for every story.

If used: the Apocrypha Desk is an editorial unit that produces long-form "reports" marked as fiction at the masthead. The joke and the thesis are the same: the form of verified journalism can carry invented worlds without becoming parody, as long as the reader contract is clear and the ledger stays internally consistent.

Recurring props (use lightly): FOIA theater, anonymous operators, leaked CSVs, hearing transcripts, "download this dataset" rails that don't resolve.`,
  },
  {
    id: "fiction-marker",
    type: "lore",
    name: "Fiction Marker",
    initials: "FM",
    color: "from-zinc-600 to-stone-800",
    tags: ["rules", "reader-contract", "honesty"],
    summary: "The seal that keeps Apocrypha from contaminating live Artometrics reporting.",
    description: `Three allowed placements:

1. Prefatory editor's note (default)
2. Desk slug in the eyebrow / TOC
3. End seal only — must be unmistakable

Never leave a reader believing Artometrics published a real investigation. Never ship an Apocrypha piece into src/content/blog/.`,
  },
  {
    id: "fast-facts-device",
    type: "other",
    name: "Fast Facts Device",
    initials: "FF",
    color: "from-neutral-600 to-neutral-900",
    tags: ["form", "device", "numbers"],
    summary: "The Artometrics facts strip, reused as a literary engine for invented scale.",
    description: `Every cover-story-tier piece should include 3–6 Fast Facts. They set scale the way a real report does. Invented numbers must remain consistent with the body and with each other. Contradictions break immersion faster than an honest "we don't know."`,
  },
  {
    id: "limitations-device",
    type: "other",
    name: "Limitations Device",
    initials: "LM",
    color: "from-slate-600 to-slate-900",
    tags: ["form", "device", "ending"],
    summary: "The methodology hedge — often where the horror or irony lands.",
    description: `In real Artometrics reports, Limitations protect trust. In Apocrypha, the same section can be the thematic payload: what cannot be measured, what the dataset excludes, what the institution refused to produce. Prefer this over a cheap final twist.`,
  },
];

function emptyStoryChapter(n: number, label: string): Chapter {
  return {
    title: `Story ${n} — ${label}`,
    label: `S${n}`,
    scenes: [
      {
        title: "Dek / Lead",
        text: "",
      },
      {
        title: "Research Question",
        text: "",
      },
      {
        title: "Fast Facts",
        text: "",
      },
      {
        title: "Body",
        text: "",
      },
      {
        title: "Limitations",
        text: "",
      },
      {
        title: "Editor's Note / Method",
        text: "",
      },
    ],
  };
}

const apocryphaChapters: Chapter[] = [
  emptyStoryChapter(1, "[working title]"),
  emptyStoryChapter(2, "[working title]"),
  emptyStoryChapter(3, "[working title]"),
  emptyStoryChapter(4, "[working title]"),
  emptyStoryChapter(5, "[working title]"),
  emptyStoryChapter(6, "[working title]"),
  emptyStoryChapter(7, "[working title]"),
  emptyStoryChapter(8, "[working title]"),
  emptyStoryChapter(9, "[working title]"),
  emptyStoryChapter(10, "[working title]"),
];

/** Apocrypha — short stories as editorial exposés. */
export const apocryphaSeed: Novel = {
  id: "apocrypha",
  title: "Apocrypha",
  author: "KSM",
  series: "Apocrypha",
  updated: "Jul 29",
  sortKey: 4,
  synopsis:
    "Short stories written as editorial exposés — investigations and cover stories about things that never happened.",
  cover: "apocrypha",
  blank: false,
  codex: apocryphaCodex,
  chapters: apocryphaChapters,
};

export const apocryphaDraftMeta = {
  name: "Main",
  slug: "main",
  summary: "Apocrypha collection manuscript — one chapter per story.",
} as const;
