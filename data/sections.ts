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

/** Discovery channels (utilitarian category pages). */
export const CHANNEL_META = {
  sports: {
    title: "Sports",
    description: "Dynasties, leagues, and the economics of fandom.",
  },
  travel: {
    title: "Travel",
    description: "Place, movement, and cultural consumption on the road.",
  },
  fashion: {
    title: "Fashion",
    description: "Taste, prestige, and the creative industries of style.",
  },
  games: {
    title: "Games",
    description: "Interactive media, platforms, and player economies.",
  },
  music: {
    title: "Music",
    description: "Catalogs, fame mechanics, and the business of listening.",
  },
  film: {
    title: "Film",
    description: "Screens, franchises, and cinematic prestige markets.",
  },
  tech: {
    title: "Tech",
    description: "Platforms, tools, and the infrastructure of culture.",
  },
  cities: {
    title: "Cities",
    description: "Urban systems, creative geography, and metro rivalry.",
  },
  institutions: {
    title: "Institutions",
    description: "Hospitals, museums, universities, and organizational power.",
  },
  design: {
    title: "Design",
    description: "Visual systems, product taste, and aesthetic metrics.",
  },
} as const;

export type ChannelSlug = keyof typeof CHANNEL_META;
export const CHANNEL_SLUGS = Object.keys(CHANNEL_META) as ChannelSlug[];

/** Heuristic channel tags from slug/title for migration. */
export function inferChannels(
  slug: string,
  title: string,
  tags: string[] = [],
): ChannelSlug[] {
  const hay = `${slug} ${title} ${tags.join(" ")}`.toLowerCase();
  const out = new Set<ChannelSlug>();
  const rules: [RegExp, ChannelSlug][] = [
    [/\b(celtics|lakers|yankees|dodgers|patriots|cowboys|warrior|giant|sports|nba|nfl|mlb|dynasty)\b/, "sports"],
    [/\b(travel|wine|coffee|tourism|airport|airline)\b/, "travel"],
    [/\b(fashion|vogue|runway|style)\b/, "fashion"],
    [/\b(game|games|steam|video.?game|esport|anime|pokemon)\b/, "games"],
    [/\b(music|grammy|spotify|album|song|hip.?hop|jazz)\b/, "music"],
    [/\b(film|movie|oscar|hollywood|horror|franchise|disney|cinema)\b/, "film"],
    [/\b(tech|software|ai|platform|internet|web.?page)\b/, "tech"],
    [/\b(city|cities|urban|metro|san.?francisco|new.?york|california|texas)\b/, "cities"],
    [/\b(hospital|museum|university|college|readmit|institution|phds|tuition)\b/, "institutions"],
    [/\b(design|typography|brand|ui)\b/, "design"],
  ];
  for (const [re, ch] of rules) {
    if (re.test(hay)) out.add(ch);
  }
  return [...out];
}
