import {
  DOMAIN_META,
  DOMAIN_SLUGS,
  SUBDOMAIN_META,
  SUBDOMAIN_SLUGS,
} from "@/data/sections";
import { getAuthors, getBlogPosts, getPodcastEpisodes, sectionLabel } from "@/lib/content";

export type SearchHit = {
  type: "report" | "podcast" | "author";
  id: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
};

function normalize(q: string) {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

export function searchSite(query: string, limit = 40): SearchHit[] {
  const q = normalize(query);
  if (!q || q.length < 2) return [];

  const tokens = q.split(" ").filter(Boolean);
  const hits: { score: number; hit: SearchHit }[] = [];

  for (const post of getBlogPosts()) {
    const label = sectionLabel(post.tags, post.subject);
    const blob = [
      post.title,
      post.description,
      post.slug,
      ...(post.tags ?? []),
      label ?? "",
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (post.title.toLowerCase().includes(t)) score += 5;
      if (post.slug.includes(t)) score += 3;
      if (blob.includes(t)) score += 1;
    }
    if (score > 0) {
      hits.push({
        score,
        hit: {
          type: "report",
          id: post.slug,
          title: post.title,
          description: post.description,
          href: `/${post.slug}`,
          meta: label ?? "Article",
        },
      });
    }
  }

  for (const ep of getPodcastEpisodes()) {
    const blob = `${ep.title} ${ep.description} ${ep.author}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (ep.title.toLowerCase().includes(t)) score += 5;
      if (blob.includes(t)) score += 1;
    }
    if (score > 0) {
      hits.push({
        score,
        hit: {
          type: "podcast",
          id: ep.id,
          title: ep.title,
          description: ep.description,
          href: `/podcast/interviews/${ep.id}`,
          meta: "Podcast",
        },
      });
    }
  }

  for (const author of getAuthors()) {
    const blob = `${author.name} ${author.role ?? ""} ${author.bio ?? ""}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (author.name.toLowerCase().includes(t)) score += 5;
      if (blob.includes(t)) score += 1;
    }
    if (score > 0) {
      hits.push({
        score,
        hit: {
          type: "author",
          id: author.id,
          title: author.name,
          description: author.role ?? author.bio ?? "",
          href: `/authors/${author.id}`,
          meta: "Author",
        },
      });
    }
  }

  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((h) => h.hit);
}

export type NavAutocompleteHit = {
  kind: "topic" | "report";
  title: string;
  href: string;
  meta?: string;
};

const MAX_RECENT_NAV = 5;
let recentNavSearches: string[] = [];

export function rememberNavSearch(query: string) {
  const q = normalize(query);
  if (q.length < 2) return;
  recentNavSearches = [q, ...recentNavSearches.filter((x) => x !== q)].slice(0, MAX_RECENT_NAV);
}

export function getRecentNavSearches(): string[] {
  return recentNavSearches;
}

function scoreBlob(tokens: string[], blob: string, title: string) {
  let score = 0;
  const tLower = title.toLowerCase();
  for (const t of tokens) {
    if (tLower.includes(t)) score += 5;
    else if (blob.includes(t)) score += 1;
  }
  return score;
}

/** Mobile nav overlay: taxonomy labels + report titles. */
export function searchNavAutocomplete(query: string, limit = 10): NavAutocompleteHit[] {
  const q = normalize(query);
  if (!q || q.length < 1) return [];

  const tokens = q.split(" ").filter(Boolean);
  const hits: { score: number; hit: NavAutocompleteHit }[] = [];

  for (const slug of DOMAIN_SLUGS) {
    const title = DOMAIN_META[slug].title;
    const blob = `${title} ${slug} ${DOMAIN_META[slug].description}`.toLowerCase();
    const score = scoreBlob(tokens, blob, title);
    if (score > 0) {
      hits.push({
        score: score + (title.toLowerCase().startsWith(q) ? 3 : 0),
        hit: { kind: "topic", title, href: `/topics/${slug}`, meta: "Section" },
      });
    }
  }

  for (const slug of SUBDOMAIN_SLUGS) {
    const title = SUBDOMAIN_META[slug].title;
    const blob = `${title} ${slug}`.toLowerCase();
    const score = scoreBlob(tokens, blob, title);
    if (score > 0) {
      hits.push({
        score: score + (title.toLowerCase().startsWith(q) ? 2 : 0),
        hit: {
          kind: "topic",
          title,
          href: `/blog?subdomain=${slug}`,
          meta: "Topic",
        },
      });
    }
  }

  for (const post of getBlogPosts()) {
    const label = sectionLabel(post.tags, post.subject);
    const blob = [
      post.title,
      post.description,
      post.slug,
      ...(post.tags ?? []),
      label ?? "",
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (post.title.toLowerCase().includes(t)) score += 5;
      if (post.slug.includes(t)) score += 3;
      if (blob.includes(t)) score += 1;
    }
    if (score > 0) {
      hits.push({
        score,
        hit: {
          kind: "report",
          title: post.title,
          href: `/${post.slug}`,
          meta: label ?? "Report",
        },
      });
    }
  }

  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((h) => h.hit);
}
