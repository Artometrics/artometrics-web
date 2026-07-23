import type { SectionSlug } from "@/data/sections";

export type DatasetPack = {
  id: string;
  title: string;
  section: SectionSlug;
  status: "planned" | "collecting" | "published";
  summary: string;
  primaryKeyword: string;
  relatedReports: string[];
  sources: { name: string; url: string }[];
  downloadPath?: string;
};

/** Dataset library catalog — start thin, grow packs. */
export const DATASET_PACKS: DatasetPack[] = [
  {
    id: "movies",
    title: "Movies pack",
    section: "arts",
    status: "planned",
    summary:
      "Title-level film economics and reception joins — studios, genres, ratings, box office where licensed. One schema, clear citations.",
    primaryKeyword: "movie industry data",
    relatedReports: ["imdb-blockbuster-grammar", "franchise"],
    sources: [{ name: "Arts reports", url: "/topics/arts" }],
  },
  {
    id: "streaming-catalogs",
    title: "Streaming catalogs pack",
    section: "arts",
    status: "collecting",
    summary:
      "Availability / library-shape tables for SVOD analysis. Powers the streaming-catalog-power brief.",
    primaryKeyword: "streaming catalog data",
    relatedReports: ["streaming-catalog-power", "anime"],
    sources: [{ name: "Content OS brief", url: "/resources" }],
  },
  {
    id: "sports-franchises",
    title: "Sports franchises pack",
    section: "sports",
    status: "planned",
    summary:
      "Franchise performance, dynasties, and market gravity — packaged CSVs behind Sports section reports.",
    primaryKeyword: "sports franchise data",
    relatedReports: [
      "yankees-the-artometrics-of-baseballs-empire",
      "lakers-the-artometrics-of-basketball-glamour",
      "cowboys-the-artometrics-of-americas-team",
    ],
    sources: [{ name: "Sports reports", url: "/topics/sports" }],
  },
  {
    id: "creative-exports",
    title: "Creative exports pack",
    section: "civics",
    status: "planned",
    summary: "Country and city soft-power / export tables used in geo-economics reports.",
    primaryKeyword: "cultural exports data",
    relatedReports: ["cultural-exports-geoeconomics", "national-export-identity-atlas"],
    sources: [{ name: "Civics reports", url: "/topics/civics" }],
  },
];

export function getDatasetPack(id: string) {
  return DATASET_PACKS.find((p) => p.id === id);
}
