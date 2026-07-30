import type { CodexEntry, Chapter, Novel } from "@/lib/twilda/novelcrafter/data";

export const psychonomicsBookSnippets: { title: string; content: string }[] = [
  {
    title: "Book bible — logline",
    content: `Psychonomics — when power is centralized, the psychology and identity of the leader become infrastructure. OSS-style profiles of modus operandi, history, supports/haters, and measurable fingerprints — for emperors, dictators, entertainers, and founders alike.`,
  },
  {
    title: "Relationship to Artometrics",
    content: `Separate book. Psychonomics = leader-as-system profiles. Artometrics = culture-as-measurable-system field manual. Shared magazine feedstock; separate Twilda manuscripts.`,
  },
  {
    title: "Method rubric",
    content: `Hermann LTA (or successor) + economic fingerprint + network/control map + lexicon/catalog corpus + timeline of shocks. Every case chapter must run the rubric before narrative color.`,
  },
  {
    title: "Living subjects",
    content: `Published behavior + careful sourcing only. No partisan rant. Allegation/denial language where required. Trump chapter is media-native preference cascades — not campaign literature.`,
  },
];

const psychonomicsCodex: CodexEntry[] = [
  {
    id: "oss-lineage",
    type: "lore",
    name: "OSS profile lineage",
    initials: "OSS",
    color: "from-slate-700 to-stone-900",
    tags: ["method", "history"],
    summary: "Method history of psychological profiles of leaders — not cosplay.",
    description:
      "Cite the historical practice of structured leader profiles; distinguish analysis from propaganda.",
  },
  {
    id: "leader-panel",
    type: "other",
    name: "Leader panel dataset",
    initials: "LP",
    color: "from-red-900 to-stone-800",
    tags: ["data"],
    summary: "public/data/meta/psychonomics-leader-panel.csv",
    description: "One row per profiled leader; update when briefs graduate to live reports.",
  },
];

function ch(title: string, hook: string): Chapter {
  return {
    title,
    scenes: [
      { title: "Rubric", text: "" },
      { title: "History / MO", text: hook },
      { title: "Fingerprint", text: "" },
      { title: "Network", text: "" },
      { title: "Aftermath", text: "" },
    ],
  };
}

const chapters: Chapter[] = [
  {
    title: "1. What Psychonomics is (and is not)",
    scenes: [{ title: "Define", text: "Leader psychology as infrastructure — not astrology, not fan biography." }],
  },
  {
    title: "2. The OSS Hitler-profile lineage",
    scenes: [{ title: "Method history", text: "Structured profiles; ethics of studying living power." }],
  },
  {
    title: "3. The rubric",
    scenes: [{ title: "LTA + fingerprint + network", text: "Fixed method chapter before cases." }],
  },
  ch("4. Case: Julius Caesar", "Existing Artometrics gold report — self as state via patronage."),
  ch("5. Case: Augustus", "Succession: how to institutionalize a shock without dying with it."),
  ch("6. Case: Mao", "Ideology as operating system — careful historical sourcing."),
  ch("7. Case: Trump", "Media-native preference cascades — published behavior only."),
  ch("8. Case: Beyoncé", "Existing report — self as firm / Parkwood."),
  ch("9. Case: Michael Jackson", "Self as product / catalog — dual ledger of genius and harm."),
  ch("10. Case: Hugh Hefner", "Access household — companion to Playboy brand autopsy."),
  {
    title: "11. Comparative panel",
    scenes: [{ title: "What transfers", text: "Cross-domain transfers from leader-panel dataset." }],
  },
  {
    title: "12. The protection threshold",
    scenes: [{ title: "When shielding ends", text: "Link Protection Threshold special report." }],
  },
  {
    title: "13. How to write a Psychonomics profile",
    scenes: [{ title: "Practitioner appendix", text: "Checklist for future profiles." }],
  },
];

export const psychonomicsBookSeed: Novel = {
  id: "psychonomics-book",
  title: "Psychonomics",
  author: "KSM",
  series: "Psychonomics",
  updated: "Jul 30",
  sortKey: 6,
  synopsis:
    "OSS-style profiles of leaders whose psychology becomes infrastructure — emperors, founders, entertainers.",
  cover: "psychonomics",
  blank: false,
  codex: psychonomicsCodex,
  chapters,
};

export const psychonomicsBookDraftMeta = {
  name: "Main",
  slug: "main",
  summary: "Psychonomics — leader profile manuscript.",
} as const;
