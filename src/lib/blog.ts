import type { CollectionEntry } from "astro:content";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export type BlogEntry = CollectionEntry<"blog">;

export function deckLine(description: string, maxWords = 18): string {
  const trimmed = description.trim();
  const match = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  const line = match ? match[1] : trimmed.split(/\s+/).slice(0, maxWords).join(" ");
  return /[.!?]$/.test(line) ? line : `${line.replace(/[.!?]+$/, "")}.`;
}

export function primaryDesk(tags: string[] | undefined): keyof typeof SECTION_META | null {
  if (!tags?.length) return null;
  return (tags.find((t) => t in SECTION_META) as keyof typeof SECTION_META) ?? null;
}

export function publishedPosts(posts: BlogEntry[]): BlogEntry[] {
  return posts
    .filter((post) => !post.data.draft && post.data?.pubDate)
    .filter((post) => !SECTION_SLUGS.includes(post.data.slug))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getRelatedPosts(
  allPosts: BlogEntry[],
  currentSlug: string,
  tags: string[] | undefined,
  limit = 6
) {
  const pool = publishedPosts(allPosts).filter((p) => p.data.slug !== currentSlug);
  const desk = primaryDesk(tags);
  const tagMatches = pool.filter((p) => p.data.tags?.some((t) => tags?.includes(t)));
  const deskMatches = desk
    ? pool.filter((p) => p.data.tags?.includes(desk) && !tagMatches.includes(p))
    : [];
  const rest = pool.filter((p) => !tagMatches.includes(p) && !deskMatches.includes(p));
  const ordered = [...tagMatches, ...deskMatches, ...rest];

  return ordered.slice(0, limit).map((post) => ({
    title: post.data.title,
    href: `/${post.data.slug}/`,
    deck: deckLine(post.data.description),
    image: post.data.heroImage,
    desk: primaryDesk(post.data.tags),
  }));
}

export function getAdjacentPosts(allPosts: BlogEntry[], currentSlug: string) {
  const sorted = publishedPosts(allPosts);
  const index = sorted.findIndex((p) => p.data.slug === currentSlug);
  if (index === -1) return { previous: null, next: null };

  const previous = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  return {
    previous: previous
      ? { title: previous.data.title, href: `/${previous.data.slug}/` }
      : null,
    next: next ? { title: next.data.title, href: `/${next.data.slug}/` } : null,
  };
}
