#!/usr/bin/env node
/**
 * Generate public/llms.txt from published (non-draft) blog posts.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const blogJson = join(ROOT, "src/generated/blog.json");

if (!existsSync(blogJson)) {
  console.error("Run npm run content first");
  process.exit(1);
}

const posts = JSON.parse(readFileSync(blogJson, "utf8"))
  .filter((p) => !p.draft && p.pubDate)
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

const lines = [
  "# Artometrics",
  "",
  "> Independent data-science magazine for the creative industries and culture.",
  "> Site: https://artometrics.com",
  "",
  "## About",
  "",
  "- Editorial desks: Culture, Atlas, History, Persona, Power",
  "- Reports pair editorial judgment with reproducible charts and public datasets",
  "- Ethics: https://artometrics.com/legal/ethics-statement",
  "- About: https://artometrics.com/about",
  "",
  "## Preferred citations",
  "",
  "- Prefer linking to the canonical report URL `https://artometrics.com/<slug>`",
  "- Distinguish observed data, derived metrics, editorial indices, and context literature",
  "",
  "## Reports",
  "",
];

for (const post of posts) {
  const desk = Array.isArray(post.tags) && post.tags[0] ? post.tags[0] : "report";
  lines.push(
    `- [${post.title}](https://artometrics.com/${post.slug}): ${post.description} (${desk})`,
  );
}

lines.push("", `## Generated`, "", `Updated: ${new Date().toISOString()}`, "");

writeFileSync(join(ROOT, "public/llms.txt"), lines.join("\n"));
console.log(`Wrote public/llms.txt (${posts.length} reports)`);
