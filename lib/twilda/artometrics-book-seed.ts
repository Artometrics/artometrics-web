import type { CodexEntry, Chapter, Novel } from "@/lib/twilda/novelcrafter/data";

export const artometricsBookSnippets: { title: string; content: string }[] = [
  {
    title: "Book bible — logline",
    content: `Artometrics — Culture Quantified. Art has always been data. This book is the field manual for reading creativity, taste, and cultural systems with the same seriousness as economics or epidemiology — and for showing how art practices historically produced scientific method (observation, notation, experiment, reproducibility).`,
  },
  {
    title: "Relationship to Psychonomics",
    content: `Separate book. Artometrics = systems, datasets, industries, canons, editions. Psychonomics = OSS-style profiles of single leaders whose psychology becomes infrastructure. Editions and meta articles feed both; do not merge manuscripts.`,
  },
  {
    title: "Voice",
    content: `Adult, precise, non-hype. Named and dated facts. One calm expert voice. Teach frameworks operators can brief on Monday.`,
  },
];

const artometricsCodex: CodexEntry[] = [
  {
    id: "culture-quantified",
    type: "lore",
    name: "Culture Quantified",
    initials: "CQ",
    color: "from-stone-700 to-red-900",
    tags: ["thesis", "method"],
    summary: "Core thesis: culture is measurable without stripping humanity.",
    description:
      "Artometrics treats charts, canons, catalogs, and box office as instruments — not as replacements for meaning.",
  },
  {
    id: "special-editions",
    type: "other",
    name: "Special Editions",
    initials: "SE",
    color: "from-neutral-600 to-neutral-900",
    tags: ["magazine", "lab"],
    summary: "Vice-style crash courses compiled from desk reports.",
    description: "Music, Movies, Games, Power, etc. — public lab for the book’s industry chapters.",
  },
];

function ch(title: string, scenes: { title: string; text: string }[]): Chapter {
  return { title, scenes };
}

const chapters: Chapter[] = [
  ch("1. Culture quantified", [
    { title: "Thesis", text: "Art has always been data. Draft the one-line promise and the anti-cookie-cutter mandate." },
  ]),
  ch("2. Subliminal history of measuring culture", [
    { title: "From academies to Billboard", text: "Canon lists → chart instruments → Pantheon / Steam / Box Office Mojo." },
  ]),
  ch("3. How art made science", [
    { title: "Bridge", text: "Notation, perspective, atelier discipline, design of experiments — cite art-science-bridge meta dataset." },
  ]),
  ch("4. Narrative economics for culture", [
    { title: "Shiller toolkit", text: "Contagion, mutation, burnout — link Narrative Economics field guide." },
  ]),
  ch("5. Preference falsification and silence", [
    { title: "Kuran", text: "Private truths, public lies — bridge to Protection Threshold / Savile rooms." },
  ]),
  ch("6. Sociobiology / status — operators’ cut", [
    { title: "Careful toolkit", text: "Keep status/coalition models; refuse supremacy just-so stories." },
  ]),
  ch("7. Datasets as instruments", [
    { title: "How reports are built", text: "Atomic CSVs vs meta joins; edition crosswalk." },
  ]),
  ch("8. Industry crash courses (editions as public lab)", [
    { title: "Editions", text: "Music / Movies / Games / Food / Sports / Atlas — how the magazine teaches the book." },
  ]),
  ch("9. Meta-analysis: when two reports become a framework", [
    { title: "Method", text: "sourceSlugs + new claim rule; citation graph." },
  ]),
  ch("10. Dual books of fame", [
    { title: "Commercial vs symbolic", text: "Film ROI vs catalog immortality — Leto / MJ / Beyoncé panel." },
  ]),
  ch("11. Institutions that sell access", [
    { title: "Playboy to platforms", text: "Access-brand index; Playboy After Hef." },
  ]),
  ch("12. Ethics, limits, anti-cookie-cutter", [
    { title: "Guardrails", text: "Allegation language; selection bias; causation fog." },
  ]),
  ch("13. Field guide: brief with Artometrics on Monday", [
    { title: "Outreach template", text: "Name the instrument → show the curve → state the decision distortion → falsifier." },
  ]),
];

export const artometricsBookSeed: Novel = {
  id: "artometrics-book",
  title: "Artometrics",
  author: "KSM",
  series: "Artometrics",
  updated: "Jul 30",
  sortKey: 5,
  synopsis:
    "Culture Quantified — the field manual for measuring creativity, taste, and cultural systems, and for showing how art made science.",
  cover: "artometrics",
  blank: false,
  codex: artometricsCodex,
  chapters,
};

export const artometricsBookDraftMeta = {
  name: "Main",
  slug: "main",
  summary: "Artometrics — Culture Quantified manuscript.",
} as const;
