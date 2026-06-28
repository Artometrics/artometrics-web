export const SECTION_META = {
  culture: {
    title: "Culture",
    description:
      "Data reports on the creative economy — music, film, anime, games, and the business of art.",
  },
  atlas: {
    title: "Atlas",
    description:
      "Place-based analysis on the economic geography of cities, regions, and creative ecosystems.",
  },
  history: {
    title: "History",
    description:
      "Patterns across time — civilizational cycles, institutional eras, and long-run economic data.",
  },
  persona: {
    title: "Persona",
    description:
      "Behavioral profiles of leaders, archetypes, and figures who shaped the systems we inherit.",
  },
  power: {
    title: "Power",
    description:
      "The subliminal architecture of institutions — how organizations accumulate and leverage influence.",
  },
} as const;

export type SectionSlug = keyof typeof SECTION_META;

export const SECTION_SLUGS = Object.keys(SECTION_META) as SectionSlug[];
