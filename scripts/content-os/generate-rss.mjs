#!/usr/bin/env node
/**
 * First-party RSS feeds: public/rss.xml (reports) and public/podcast.xml (episodes).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const SITE = "https://artometrics.com";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const posts = JSON.parse(readFileSync(join(ROOT, "src/generated/blog.json"), "utf8"))
  .filter((p) => !p.draft && p.pubDate)
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

const episodes = existsSync(join(ROOT, "src/generated/podcast.json"))
  ? JSON.parse(readFileSync(join(ROOT, "src/generated/podcast.json"), "utf8"))
      .filter((e) => e.pubDate)
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  : [];

const reportItems = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/${p.slug}</guid>
      <pubDate>${new Date(p.pubDate).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
  )
  .join("\n");

const reportRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Artometrics Reports</title>
    <link>${SITE}</link>
    <description>Data reports on culture, power, and the creative economy</description>
    <language>en-us</language>
${reportItems}
  </channel>
</rss>
`;

writeFileSync(join(ROOT, "public/rss.xml"), reportRss);

const episodeItems = episodes
  .map((e) => {
    const link = `${SITE}/podcast/interviews/${e.id}`;
    const enclosure = e.audioSrc
      ? `<enclosure url="${SITE}${e.audioSrc}" type="audio/mpeg" />`
      : "";
    return `    <item>
      <title>${esc(e.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(e.pubDate).toUTCString()}</pubDate>
      <description>${esc(e.description)}</description>
      ${enclosure}
    </item>`;
  })
  .join("\n");

const podcastRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Artometrics Podcast</title>
    <link>${SITE}/podcast</link>
    <description>Interviews extending the Artometrics desks — culture, atlas, history, persona, power.</description>
    <language>en-us</language>
    <itunes:author>Artometrics</itunes:author>
    <itunes:summary>Data-science conversations for the creative industries.</itunes:summary>
    <itunes:category text="Arts" />
${episodeItems}
  </channel>
</rss>
`;

writeFileSync(join(ROOT, "public/podcast.xml"), podcastRss);
console.log(`Wrote public/rss.xml (${posts.length}) and public/podcast.xml (${episodes.length})`);
