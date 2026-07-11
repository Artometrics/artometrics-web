#!/usr/bin/env node
/**
 * Write migration manifest for Python-only articles → singular GitHub repos.
 * Scaffolds live in .cache/article-scaffolds/ (regenerate via npm run scaffold:repo -- --batch-from-site)
 *
 * Usage: node scripts/write-migration-manifest.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const SCAFFOLD = path.join(ROOT, ".cache/article-scaffolds");
const OUT = path.join(ROOT, "docs/migration-manifest.json");

const EXISTING = new Set([
  "readmitted", "anime", "coffee", "franchise", "imperial", "giant",
  "h3", "warrior", "caesar", "pokemon",
]);

function singularRepoName(slug) {
  const base = slug
    .replace(/-the-artometrics-of-.+$/i, "")
    .replace(/-the-psychonomics-of-.+$/i, "");
  return base;
}

function readMeta(slug) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const title = fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] ?? slug;
  const tags = fm.match(/^tags:\s*\[([^\]]+)\]/m)?.[1]
    ?.split(",")
    .map((t) => t.trim().replace(/['"]/g, "")) ?? [];
  return { title, desk: tags[0] ?? "culture" };
}

const entries = [];

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const repo = singularRepoName(slug);
  if (EXISTING.has(repo)) continue;

  const meta = readMeta(slug);
  const scaffoldPath = path.join(SCAFFOLD, repo);
  const hasScaffold = fs.existsSync(scaffoldPath);

  entries.push({
    repo,
    siteSlug: slug,
    desk: meta.desk,
    title: meta.title,
    scaffoldReady: hasScaffold,
    liveUrl: `https://artometrics.com/${slug}/`,
    githubUrl: `https://github.com/Artometrics/${repo}`,
    status: "scaffolded",
  });
}

entries.sort((a, b) => a.desk.localeCompare(b.desk) || a.repo.localeCompare(b.repo));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), count: entries.length, articles: entries }, null, 2));
console.log(`Wrote ${OUT} (${entries.length} articles)`);
