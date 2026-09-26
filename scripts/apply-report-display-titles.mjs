#!/usr/bin/env node
/**
 * Apply `PREFIX: Subtitle` display titles to all blog posts.
 * Curated subtitles: data/report-display-titles.json (subtitle only, or full title with PREFIX).
 * Usage: node scripts/apply-report-display-titles.mjs [--dry-run]
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BLOG = join(ROOT, "src/content/blog");
const SUBTITLE_OVERRIDES = JSON.parse(
  readFileSync(join(ROOT, "data/report-display-titles.json"), "utf8"),
);

const PREFIX_BY_SLUG = {
  lcsh: "LCSH",
  sf: "SF",
  ceos: "CEOs",
  phds: "PHDS",
  mac: "MAC",
};

const dryRun = process.argv.includes("--dry-run");

function prefixForSlug(slug) {
  return PREFIX_BY_SLUG[slug] ?? slug.replace(/-/g, " ").toUpperCase().replace(/\s+/g, "");
}

function stripPrefix(title) {
  const m = title.match(/^([A-Z][A-Z0-9]+):\s*(.+)$/);
  return m ? m[2].trim() : title.trim();
}

function subtitleFor(slug, currentTitle) {
  const raw = SUBTITLE_OVERRIDES[slug];
  if (raw) return stripPrefix(raw);
  return stripPrefix(currentTitle);
}

let updated = 0;
for (const file of readdirSync(BLOG).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const parsed = matter(raw);
  const prefix = prefixForSlug(slug);
  const subtitle = subtitleFor(slug, String(parsed.data.title ?? ""));
  const title = `${prefix}: ${subtitle}`;
  if (parsed.data.title === title) continue;
  parsed.data.title = title;
  const next = matter.stringify(parsed.content, parsed.data, {
    lineWidth: 1000,
  });
  if (!dryRun) writeFileSync(path, next);
  updated += 1;
  console.log(`${slug}: ${title}`);
}
console.log(`\n${dryRun ? "Would update" : "Updated"} ${updated} titles.`);
