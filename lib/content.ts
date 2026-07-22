import blogData from "@/src/generated/blog.json";
import podcastData from "@/src/generated/podcast.json";
import authorsData from "@/src/generated/authors.json";
import legalData from "@/src/generated/legal.json";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";

export type BlogPost = (typeof blogData)[number];
export type PodcastEpisode = (typeof podcastData)[number];
export type Author = (typeof authorsData)[number];
export type LegalPage = (typeof legalData)[number];

export function deckLine(description: string, maxWords = 18): string {
  const trimmed = description.trim();
  const match = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  const line = match ? match[1] : trimmed.split(/\s+/).slice(0, maxWords).join(" ");
  return /[.!?]$/.test(line) ? line : `${line.replace(/[.!?]+$/, "")}.`;
}

export function formatAuthorName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function primarySection(tags: string[] | undefined): SectionSlug | null {
  if (!tags?.length) return null;
  return (tags.find((t) => t in SECTION_META) as SectionSlug) ?? null;
}

/** @deprecated Use primarySection */
export function primaryDesk(tags: string[] | undefined): SectionSlug | null {
  return primarySection(tags);
}

export function getBlogPosts(): BlogPost[] {
  return (blogData as BlogPost[])
    .filter((post) => !post.draft && post.pubDate)
    .filter((post) => !SECTION_SLUGS.includes(post.slug as SectionSlug))
    .sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getPodcastEpisodes(): PodcastEpisode[] {
  return (podcastData as PodcastEpisode[])
    .filter((ep) => ep.pubDate)
    .sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime());
}

export function getPodcastEpisode(id: string): PodcastEpisode | undefined {
  return (podcastData as PodcastEpisode[]).find((ep) => ep.id === id);
}

export function getAuthors(): Author[] {
  return authorsData as Author[];
}

export function getAuthor(id: string): Author | undefined {
  return (authorsData as Author[]).find((a) => a.id === id);
}

export function getLegalPages(): LegalPage[] {
  return legalData as LegalPage[];
}

export function getLegalPage(id: string): LegalPage | undefined {
  return (legalData as LegalPage[]).find((p) => p.id === id);
}

export function getAdjacentPosts(currentSlug: string) {
  const sorted = getBlogPosts();
  const index = sorted.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { previous: null, next: null };
  const previous = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;
  return {
    previous: previous
      ? { title: previous.title, href: `/${previous.slug}` }
      : null,
    next: next ? { title: next.title, href: `/${next.slug}` } : null,
  };
}

export { SECTION_META, SECTION_SLUGS };
