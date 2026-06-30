import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SECTION_META } from "@/data/sections";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: "Artometrics",
    description:
      "Data-driven analysis on media, culture, and power — Artometrics reports on the creative economy.",
    site: context.site,
    items: sorted.map((post) => {
      const desk = post.data.tags?.find((t) => t in SECTION_META);
      const category = desk ? SECTION_META[desk].title : "Reports";
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${post.data.slug}/`,
        categories: [category],
        customData: post.data.heroImage
          ? `<enclosure url="${new URL(post.data.heroImage, context.site).href}" type="image/jpeg" />`
          : undefined,
      };
    }),
  });
}
