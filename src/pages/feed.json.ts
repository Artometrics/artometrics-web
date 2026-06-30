import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .filter((entry) => entry.data?.pubDate)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 30);

  const podcasts = (await getCollection("podcast"))
    .filter((entry) => entry.data?.pubDate)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 15);

  const payload = {
    updatedAt: new Date().toISOString(),
    reports: posts.map((entry) => ({
      title: entry.data.title,
      slug: entry.data.slug,
      description: entry.data.description,
      pubDate: entry.data.pubDate.toISOString(),
      tags: entry.data.tags ?? [],
      heroImage: entry.data.heroImage ?? null,
      url: `/${entry.data.slug}/`,
    })),
    episodes: podcasts.map((entry) => ({
      title: entry.data.title,
      id: entry.id,
      description: entry.data.description,
      pubDate: entry.data.pubDate.toISOString(),
      author: entry.data.author,
      isLocked: Boolean(entry.data.isLocked),
      audioSrc: entry.data.audioSrc ?? null,
      url: `/podcast/interviews/${entry.id}`,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
