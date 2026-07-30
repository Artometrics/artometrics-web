import type { SectionSlug } from "@/data/sections";

export type EditionManifest = {
  id: string;
  title: string;
  dek: string;
  section: SectionSlug;
  heroImage?: string;
  articleSlugs: string[];
  /** Planned glue/meta articles (may not be live yet). */
  glueSlugs: string[];
  podcastIds?: string[];
  datasetIds?: string[];
  status: "planned" | "collecting" | "published";
};

/** Vice-style special editions — manifests over live reports + glue. */
export const EDITIONS: EditionManifest[] = [
  {
    id: "music",
    title: "The Music Issue",
    dek: "Charts, catalogs, and the dual books of fame — crash course for anyone who lives in the attention economy of sound.",
    section: "arts",
    status: "collecting",
    articleSlugs: [
      "billboard-hot-100",
      "billboard-top-100",
      "musicbrainz-pop-fame-mechanics",
      "rolling-stone-albums",
      "beyonce-the-psychonomics-of-control",
      "beyonce-taylor-lyrics",
      "broadway-musicals",
      "christmas-songs",
      "radio-stations",
      "h3-the-artometrics-of-a-youtube-dynasty",
    ],
    glueSlugs: ["narrative-economics-of-hits", "dual-books-of-fame"],
    datasetIds: ["gutenberg-reference"],
  },
  {
    id: "movies",
    title: "The Movie Issue",
    dek: "Franchise economics, streaming libraries, and when a star becomes expensive to protect.",
    section: "arts",
    status: "collecting",
    articleSlugs: [
      "horror-movie-profit",
      "horror-movies",
      "pixar-films",
      "franchise",
      "imdb-blockbuster-grammar",
      "streaming-catalog-power",
      "netflix-engagement",
      "netflix-titles",
      "emmy-awards",
      "awards-prestige-economy-oscars-grammys-nobels",
      "simpsons-guest-stars",
      "tv-golden-age",
    ],
    glueSlugs: ["franchise-poison-star-vs-ip", "protection-threshold"],
  },
  {
    id: "games",
    title: "The Games Issue",
    dek: "Steam, Pokémon, boards, and fandom as preference infrastructure.",
    section: "arts",
    status: "collecting",
    articleSlugs: [
      "video-games-steam",
      "video-games-sliced",
      "pokemon",
      "board-games",
      "anime",
      "lego-database",
      "comic-characters",
    ],
    glueSlugs: ["preference-infrastructure-fandom"],
  },
  {
    id: "food",
    title: "The Culinary Issue",
    dek: "Coffee, beer, wine, ramen, and the prestige economics of taste.",
    section: "culture",
    status: "collecting",
    articleSlugs: [
      "coffee-the-artometrics-of-java",
      "craft-beer-usa",
      "wine-ratings",
      "all-the-pizza",
      "ramen-ratings",
      "alcohol-consumption",
      "fast-food-calories",
      "nyc-restaurant-inspections",
    ],
    glueSlugs: ["culinary-prestige-economics"],
  },
  {
    id: "sports",
    title: "The Sports Issue",
    dek: "Dynasties, markets, and institutional winning — teams as systems.",
    section: "sports",
    status: "collecting",
    articleSlugs: [
      "sports-dynasty-index-best-and-worst-conversion",
      "yankees-the-artometrics-of-baseballs-empire",
      "dodgers-the-artometrics-of-baseballs-modern-machine",
      "celtics-the-artometrics-of-institutional-winning",
      "lakers-the-artometrics-of-basketball-glamour",
      "patriots-the-artometrics-of-the-system-dynasty",
      "warrior-the-artometrics-of-a-golden-state-dynasty",
      "cowboys-the-artometrics-of-americas-team",
      "giant-the-artometrics-of-a-san-francisco-dynasty",
      "super-bowl-ads",
      "league-money-skill-and-star-systems",
      "regional-sports-identity-map",
    ],
    glueSlugs: ["institutional-winning-meta"],
    datasetIds: ["sports-franchises"],
  },
  {
    id: "power",
    title: "The Power Issue",
    dek: "Leaders, silence, access brands, and the economics of when institutions stop protecting.",
    section: "civics",
    status: "collecting",
    articleSlugs: [
      "caesar-the-psychonomics-of-emperor-julius",
      "beyonce-the-psychonomics-of-control",
      "ceo-departures",
      "wealth-income",
      "lv-molly-tea-trademark-china",
      "incarceration-trends",
      "us-voter-turnout",
      "roman-emperors",
    ],
    glueSlugs: [
      "protection-threshold",
      "playboy-after-hef",
      "preference-falsification-explained",
      "silence-cascades",
      "access-mythologies",
    ],
  },
  {
    id: "science-art",
    title: "The Science of Art Issue",
    dek: "Canon, museums, heritage, and the historical bridge from artistic practice to scientific method.",
    section: "science",
    status: "collecting",
    articleSlugs: [
      "pantheon-the-artometrics-of-collective-memory",
      "uk-museums",
      "world-heritage-sites",
      "project-gutenberg",
      "project-gutenberg-public-domain-canon-map",
      "languages-glottolog",
      "us-phds",
    ],
    glueSlugs: ["how-art-made-science"],
    datasetIds: ["gutenberg-reference"],
  },
  {
    id: "canon",
    title: "The Canon Issue",
    dek: "How lists become memory — Gutenberg, Pantheon, Rolling Stone, and literary fame.",
    section: "humanities",
    status: "collecting",
    articleSlugs: [
      "project-gutenberg",
      "project-gutenberg-public-domain-canon-map",
      "pantheon-the-artometrics-of-collective-memory",
      "rolling-stone-albums",
      "sherlock-holmes",
      "christmas-novels",
      "medium-articles",
    ],
    glueSlugs: ["canon-formation-mechanics"],
  },
  {
    id: "geo",
    title: "The Atlas Issue",
    dek: "Soft power, rival cities, export identity — culture on a map.",
    section: "civics",
    status: "collecting",
    articleSlugs: [
      "cultural-exports-geoeconomics",
      "export-superpowers-us-china-germany",
      "national-export-identity-atlas",
      "new-york-vs-san-francisco-city-systems",
      "california-vs-texas-state-rivalry",
      "city-bioeconomics-operating-system",
      "national-park-visits",
      "san-francisco-data-microscope",
    ],
    glueSlugs: [],
    datasetIds: ["creative-exports"],
  },
  {
    id: "platforms",
    title: "The Platform Issue",
    dek: "Netflix, Steam, YouTube dynasties, and attention as a factor market.",
    section: "arts",
    status: "collecting",
    articleSlugs: [
      "netflix-engagement",
      "netflix-titles",
      "video-games-steam",
      "h3-the-artometrics-of-a-youtube-dynasty",
      "streaming-catalog-power",
      "web-page-metrics",
      "medium-articles",
    ],
    glueSlugs: ["attention-as-factor-market"],
    datasetIds: ["streaming-catalogs"],
  },
  {
    id: "identity",
    title: "The Identity Issue",
    dek: "Language, schools, regional identity — preference infrastructure made visible.",
    section: "culture",
    status: "collecting",
    articleSlugs: [
      "school-diversity",
      "languages-glottolog",
      "regional-sports-identity-map",
      "cia-world-factbook",
      "un-votes",
    ],
    glueSlugs: [],
  },
  {
    id: "money",
    title: "The Money Issue",
    dek: "Wages, tuition, prestige, and what creative labor actually pays.",
    section: "civics",
    status: "collecting",
    articleSlugs: [
      "wealth-income",
      "college-major-income",
      "us-tuition",
      "us-phds",
      "big-mac-index",
      "ceo-departures",
      "league-money-skill-and-star-systems",
    ],
    glueSlugs: [],
  },
  {
    id: "risk",
    title: "The Risk Issue",
    dek: "Airlines, storms, nuclear ledgers, hospitals — institutional risk as narrative and number.",
    section: "science",
    status: "collecting",
    articleSlugs: [
      "airline-safety",
      "hurricanes-puerto-rico",
      "nuclear-explosions",
      "global-plastic-waste",
      "hydro-wastewater",
      "readmitted",
      "global-life-expectancy",
      "exercise-usa",
    ],
    glueSlugs: [],
  },
  {
    id: "psychonomics",
    title: "The Psychonomics Issue",
    dek: "OSS-style leader profiles — when one person’s psychology becomes infrastructure.",
    section: "humanities",
    status: "collecting",
    articleSlugs: [
      "caesar-the-psychonomics-of-emperor-julius",
      "beyonce-the-psychonomics-of-control",
      "roman-emperors",
      "ceo-departures",
    ],
    glueSlugs: [
      "comparative-psychonomics-panel",
      "michael-jackson-psychonomics",
      "protection-threshold",
    ],
  },
];

export function getEdition(id: string): EditionManifest | undefined {
  return EDITIONS.find((e) => e.id === id);
}

/** Slug → edition ids (many-to-many). */
export function buildEditionCrosswalk(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const ed of EDITIONS) {
    for (const slug of [...ed.articleSlugs, ...ed.glueSlugs]) {
      if (!map[slug]) map[slug] = [];
      if (!map[slug].includes(ed.id)) map[slug].push(ed.id);
    }
  }
  return map;
}
