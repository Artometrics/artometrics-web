#!/usr/bin/env node
/**
 * Apply docs/content-os/slug-migration-map.json across blog, assets, editions, redirects.
 * Usage: node scripts/apply-slug-migration.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAP_PATH = path.join(ROOT, "docs/content-os/slug-migration-map.json");
const map = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));

const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);

function renameIfExists(from, to) {
  if (!fs.existsSync(from)) return false;
  if (fs.existsSync(to)) {
    console.warn(`skip rename (target exists): ${to}`);
    return false;
  }
  fs.renameSync(from, to);
  return true;
}

function replaceSlugsInText(text) {
  let out = text;
  for (const [oldSlug, newSlug] of entries) {
    if (oldSlug === newSlug) continue;
    out = out.split(oldSlug).join(newSlug);
  }
  return out;
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === "dist" || name === ".git") continue;
      walkFiles(full, acc);
    } else acc.push(full);
  }
  return acc;
}

const TEXT_EXT = new Set([
  ".md",
  ".mjs",
  ".js",
  ".ts",
  ".tsx",
  ".json",
  ".csv",
  ".toml",
  ".html",
  ".yml",
  ".yaml",
  ".qmd",
  ".R",
  ".css",
  ".txt",
  ".xml",
]);

// 1) Rename blog markdown files (old basename → new)
const blogDir = path.join(ROOT, "src/content/blog");
for (const [oldSlug, newSlug] of Object.entries(map)) {
  if (oldSlug === newSlug) continue;
  const from = path.join(blogDir, `${oldSlug}.md`);
  const to = path.join(blogDir, `${newSlug}.md`);
  renameIfExists(from, to);
}

// 2) Rename asset + article monorepo dirs
for (const [oldSlug, newSlug] of Object.entries(map)) {
  if (oldSlug === newSlug) continue;
  for (const base of [
    "public/images/content/articles",
    "public/data/articles",
    "articles",
  ]) {
    renameIfExists(path.join(ROOT, base, oldSlug), path.join(ROOT, base, newSlug));
  }
}

// 3) Text replace in targeted trees
const scanRoots = [
  "src/content",
  "src/generated",
  "app",
  "components",
  "lib",
  "data",
  "scripts",
  "docs/content-os/content-calendar.csv",
  "netlify.toml",
  "public/data/articles",
  "articles",
].map((p) => path.join(ROOT, p));

const files = new Set();
for (const root of scanRoots) {
  if (!fs.existsSync(root)) continue;
  const st = fs.statSync(root);
  if (st.isFile()) files.add(root);
  else walkFiles(root, []).forEach((f) => files.add(f));
}

for (const file of files) {
  const ext = path.extname(file);
  if (!TEXT_EXT.has(ext)) continue;
  const raw = fs.readFileSync(file, "utf8");
  const next = replaceSlugsInText(raw);
  if (next !== raw) fs.writeFileSync(file, next);
}

// 4) Ensure slug frontmatter matches filename
for (const [oldSlug, newSlug] of Object.entries(map)) {
  const file = path.join(blogDir, `${newSlug}.md`);
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^slug:\s*.+$/m, `slug: ${newSlug}`);
  fs.writeFileSync(file, text);
}

// 5) Netlify 301 redirects (old → new), insert before SPA fallback
const netlifyPath = path.join(ROOT, "netlify.toml");
let netlify = fs.readFileSync(netlifyPath, "utf8");
const marker = "# Expo Router static export SPA fallback";
const redirectBlocks = [];
for (const [oldSlug, newSlug] of Object.entries(map)) {
  if (oldSlug === newSlug) continue;
  redirectBlocks.push(
    `[[redirects]]\n  from = "/${oldSlug}"\n  to = "/${newSlug}"\n  status = 301\n  force = true\n\n[[redirects]]\n  from = "/${oldSlug}/*"\n  to = "/${newSlug}/:splat"\n  status = 301\n  force = true`,
  );
}
const block = `\n# Blog slug migrations (301)\n${redirectBlocks.join("\n\n")}\n\n`;
if (!netlify.includes("# Blog slug migrations (301)")) {
  const idx = netlify.indexOf(marker);
  if (idx === -1) throw new Error("netlify.toml SPA marker not found");
  netlify = netlify.slice(0, idx) + block + netlify.slice(idx);
  fs.writeFileSync(netlifyPath, netlify);
}

// 6) Remap blog-subjects keys
const subjectsPath = path.join(ROOT, "scripts/blog-subjects.mjs");
let subjects = fs.readFileSync(subjectsPath, "utf8");
const objMatch = subjects.match(/export const BLOG_SUBJECT_BY_SLUG = (\{[\s\S]*?\n\});/);
if (objMatch) {
  const oldObj = eval(`(${objMatch[1]})`);
  const newObj = {};
  for (const [oldSlug, label] of Object.entries(oldObj)) {
    const newSlug = map[oldSlug] ?? oldSlug;
    newObj[newSlug] = label;
  }
  const lines = Object.entries(newObj)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, label]) => {
      const key = /^[a-z][a-z0-9-]*$/i.test(slug) && !slug.includes("-")
        ? slug
        : `"${slug}"`;
      const val = label.includes("'") ? `"${label}"` : `"${label}"`;
      return `  ${key}: ${val},`;
    });
  subjects = subjects.replace(
    /export const BLOG_SUBJECT_BY_SLUG = \{[\s\S]*?\n\};/,
    `export const BLOG_SUBJECT_BY_SLUG = {\n${lines.join("\n")}\n};`,
  );
  fs.writeFileSync(subjectsPath, subjects);
}

const changed = Object.entries(map).filter(([o, n]) => o !== n).length;
console.log(`Slug migration applied. ${changed} slugs renamed (${Object.keys(map).length} total posts).`);
