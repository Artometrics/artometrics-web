export type DatasetPack = {
  id: string;
  title: string;
  desk: "culture" | "atlas" | "history" | "persona" | "power";
  status: "planned" | "collecting" | "published";
  summary: string;
  primaryKeyword: string;
  relatedReports: string[];
  sources: { name: string; url: string }[];
  downloadPath?: string;
};

/** SportsDataverse-style library catalog — start thin, grow packs. */
export const DATASET_PACKS: DatasetPack[] = [
  {
    id: "movies",
    title: "Movies pack",
    desk: "culture",
    status: "planned",
    summary:
      "Title-level film economics and reception joins — studios, genres, ratings, box office where licensed. One schema, clear citations.",
    primaryKeyword: "movie industry data",
    relatedReports: ["imdb-blockbuster-grammar", "franchise"],
    sources: [
      { name: "Report methodology", url: "/about" },
    ],
  },
  {
    id: "streaming-catalogs",
    title: "Streaming catalogs pack",
    desk: "culture",
    status: "collecting",
    summary:
      "Availability / library-shape tables for SVOD analysis. Powers the streaming-catalog-power brief.",
    primaryKeyword: "streaming catalog data",
    relatedReports: ["streaming-catalog-power", "anime"],
    sources: [
      { name: "Content OS brief", url: "/resources" },
    ],
  },
  {
    id: "sports-franchises",
    title: "Sports franchises pack",
    desk: "atlas",
    status: "planned",
    summary:
      "Franchise performance, dynasties, and market gravity — packaged CSVs behind the sports desk reports.",
    primaryKeyword: "sports franchise data",
    relatedReports: [
      "yankees-the-artometrics-of-baseballs-empire",
      "lakers-the-artometrics-of-basketball-glamour",
      "cowboys-the-artometrics-of-americas-team",
    ],
    sources: [
      { name: "Sports desk reports", url: "/blog" },
    ],
  },
  {
    id: "creative-exports",
    title: "Creative exports pack",
    desk: "atlas",
    status: "planned",
    summary:
      "Country and city soft-power / export tables used in geo-economics reports.",
    primaryKeyword: "cultural exports data",
    relatedReports: ["cultural-exports-geoeconomics", "national-export-identity-atlas"],
    sources: [
      { name: "Geo reports", url: "/blog" },
    ],
  },
];

export function getDatasetPack(id: string) {
  return DATASET_PACKS.find((p) => p.id === id);
}
