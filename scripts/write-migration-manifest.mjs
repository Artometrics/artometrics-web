#!/usr/bin/env node
/**
 * Write docs/migration-manifest.json from committed articles/<slug>/ homes.
 *
 * Usage: node scripts/write-migration-manifest.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const ARTICLES_DIR = path.join(ROOT, "articles");
const OUT = path.join(ROOT, "docs/migration-manifest.json");

const SKIP = new Set(["tools", "styles", "assets", "R", "figures", "outputs"]);

function readMeta(slug) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const title = fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] ?? slug;
  const tagsBlock = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n)+)/m);
  let tags = [];
  if (tagsBlock) {
    tags = tagsBlock[1].match(/-\s+(\S+)/g)?.map((l) => l.replace(/^-\s+/, "")) ?? [];
  } else {
    const inline = fm.match(/^tags:\s*\[([^\]]+)\]/m)?.[1];
    if (inline) tags = inline.split(",").map((t) => t.trim().replace(/['"]/g, ""));
  }
  return { title, desk: tags[0] ?? "culture" };
}

const entries = [];

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const meta = readMeta(slug);
  const articlePath = path.join(ARTICLES_DIR, slug);
  const quartoReady = fs.existsSync(path.join(articlePath, "_quarto.yml"));

  entries.push({
    siteSlug: slug,
    title: meta.title,
    desk: meta.desk,
    articlePath: `articles/${slug}`,
    quartoReady,
    liveUrl: `https://artometrics.com/${slug}/`,
    status: quartoReady ? "monorepo_home" : "blog_only",
  });
}

entries.sort((a, b) => a.desk.localeCompare(b.desk) || a.siteSlug.localeCompare(b.siteSlug));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  JSON.stringify({ generatedAt: new Date().toISOString(), count: entries.length, articles: entries }, null, 2),
);
console.log(`Wrote ${OUT} (${entries.length} articles)`);
