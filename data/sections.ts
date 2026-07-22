/** Traditional magazine sections (replaces desks + channels). */
export const SECTION_META = {
  sports: {
    title: "Sports",
    description: "Dynasties, leagues, and the economics of fandom.",
  },
  "movies-tv": {
    title: "Movies & TV",
    description: "Film, television, streaming, and the screen business.",
  },
  music: {
    title: "Music",
    description: "Charts, catalogs, and the business of listening.",
  },
  culture: {
    title: "Culture",
    description: "Food, fame, soft power, and everyday creative life.",
  },
  galleries: {
    title: "Galleries & Museums",
    description: "Institutions, heritage, and the geography of collections.",
  },
  "cities-travel": {
    title: "Cities & Travel",
    description: "Places, movement, and urban systems.",
  },
  games: {
    title: "Games",
    description: "Board games, video games, and player economies.",
  },
  business: {
    title: "Business",
    description: "Money, institutions, labor, and markets.",
  },
  books: {
    title: "Books",
    description: "Canons, public-domain shelves, and literary data.",
  },
  tech: {
    title: "Tech",
    description: "Platforms, the web, and digital attention.",
  },
} as const;

export type SectionSlug = keyof typeof SECTION_META;
export const SECTION_SLUGS = Object.keys(SECTION_META) as SectionSlug[];

/** @deprecated Use SECTION_META — kept for old links during transition. */
export const CHANNEL_META = SECTION_META;
export type ChannelSlug = SectionSlug;
export const CHANNEL_SLUGS = SECTION_SLUGS;

/** Map legacy desk tags → nearest traditional section. */
export const LEGACY_DESK_TO_SECTION: Record<string, SectionSlug> = {
  culture: "culture",
  atlas: "cities-travel",
  history: "culture",
  persona: "culture",
  power: "business",
};

export function inferSection(
  slug: string,
  title: string,
  tags: string[] = [],
): SectionSlug {
  const hay = `${slug} ${title} ${tags.join(" ")}`.toLowerCase();
  const rules: [RegExp, SectionSlug][] = [
    [/\b(celtics|lakers|yankees|dodgers|patriots|cowboys|warrior|giant|sports|nba|nfl|mlb|dynasty|super.?bowl)\b/, "sports"],
    [/\b(film|movie|oscar|emmy|horror|franchise|disney|cinema|netflix|pixar|simpsons|streaming|imdb|anime|tv)\b/, "movies-tv"],
    [/\b(music|grammy|spotify|album|song|billboard|radio|rolling.?stone|musicbrainz)\b/, "music"],
    [/\b(museum|heritage|gallery)\b/, "galleries"],
    [/\b(game|games|steam|lego|pokemon|board.?games)\b/, "games"],
    [/\b(gutenberg|sherlock|novel|book)\b/, "books"],
    [/\b(web.?page|medium|tech|software)\b/, "tech"],
    [/\b(city|cities|urban|travel|airline|biketown|park|hurricane|restaurant|california|texas|san.?francisco|new.?york)\b/, "cities-travel"],
    [/\b(ceo|tuition|phd|voter|incarceration|wealth|export|plastic|college|school|readmit|hospital)\b/, "business"],
  ];
  for (const [re, section] of rules) {
    if (re.test(hay)) return section;
  }
  for (const t of tags) {
    if (t in SECTION_META) return t as SectionSlug;
    if (t in LEGACY_DESK_TO_SECTION) return LEGACY_DESK_TO_SECTION[t];
  }
  return "culture";
}

/** @deprecated */
export function inferChannels(slug: string, title: string, tags: string[] = []): SectionSlug[] {
  return [inferSection(slug, title, tags)];
}
