import { deckLine, getBlogPosts, type BlogPost } from "@/lib/content";

const MAX_FACT_CHARS = 120;
const MIN_FACT_CHARS = 18;

export type NavFunFact = {
  text: string;
  slug: string;
  title: string;
  href: `/${string}`;
};

function firstSentence(text: string): string {
  return deckLine(text, 22);
}

function factFromPost(post: BlogPost): string | null {
  const keyPoints = post.keyPoints ?? [];
  for (const raw of keyPoints) {
    const t = raw.trim();
    if (t.length >= MIN_FACT_CHARS && t.length <= MAX_FACT_CHARS) return t;
  }

  const tldr = post.tldr?.trim();
  if (tldr) {
    const line = firstSentence(tldr);
    if (line.length >= MIN_FACT_CHARS && line.length <= MAX_FACT_CHARS) return line;
  }

  const description = post.description?.trim();
  if (description) {
    const line = firstSentence(description);
    if (line.length >= MIN_FACT_CHARS && line.length <= MAX_FACT_CHARS) return line;
  }

  const kp0 = keyPoints[0]?.trim();
  if (kp0 && kp0.length <= MAX_FACT_CHARS) return kp0;

  return null;
}

/** Stable daily index from UTC calendar date (same fact all day). */
function dailyHash(date: Date): number {
  const ymd = date.toISOString().slice(0, 10);
  let h = 2166136261;
  for (let i = 0; i < ymd.length; i++) {
    h ^= ymd.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * One Snapple-cap style fact from published reports for the nav overlay.
 * Picks the first qualifying keyPoint, else first sentence of tldr/description.
 */
export function getNavFunFact(asOf: Date = new Date()): NavFunFact | null {
  const pool = getBlogPosts()
    .map((post) => {
      const text = factFromPost(post);
      if (!text) return null;
      return {
        text,
        slug: post.slug,
        title: post.title,
        href: `/${post.slug}` as `/${string}`,
      };
    })
    .filter((item): item is NavFunFact => item !== null)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  if (pool.length === 0) return null;

  const idx = dailyHash(asOf) % pool.length;
  return pool[idx] ?? null;
}
