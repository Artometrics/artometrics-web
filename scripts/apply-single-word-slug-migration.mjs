#!/usr/bin/env node
/**
 * Apply docs/content-os/single-word-slug-map.json (second-phase slug shortening).
 * Usage: node scripts/apply-single-word-slug-migration.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAP_PATH = path.join(ROOT, "docs/content-os/single-word-slug-map.json");
const map = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));

function orderRenames(pairs) {
  const remaining = pairs.filter(([o, n]) => o !== n);
  const sorted = [];
  while (remaining.length) {
    const idx = remaining.findIndex(([o, n]) => {
      const blocked = remaining.some(([o2]) => o2 === n && o2 !== o);
      return !blocked;
    });
    if (idx === -1) throw new Error("rename cycle in single-word slug map");
    sorted.push(remaining.splice(idx, 1)[0]);
  }
  return sorted;
}

const renameOrder = orderRenames(Object.entries(map));
const replaceOrder = Object.entries(map)
  .filter(([o, n]) => o !== n)
  .sort((a, b) => b[0].length - a[0].length);

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
  for (const [oldSlug, newSlug] of replaceOrder) {
    out = out.split(oldSlug).join(newSlug);
  }
  return out;
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (name === "node_modules" || name === "dist" || name === ".git") continue;
    if (st.isDirectory()) walkFiles(full, acc);
    else acc.push(full);
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

const blogDir = path.join(ROOT, "src/content/blog");

for (const [oldSlug, newSlug] of renameOrder) {
  const from = path.join(blogDir, `${oldSlug}.md`);
  const to = path.join(blogDir, `${newSlug}.md`);
  renameIfExists(from, to);
}

for (const [oldSlug, newSlug] of renameOrder) {
  for (const base of [
    "public/images/content/articles",
    "public/data/articles",
    "articles",
    "public/audios",
  ]) {
    renameIfExists(path.join(ROOT, base, oldSlug), path.join(ROOT, base, newSlug));
  }
  const audioFrom = path.join(ROOT, `public/audios/${oldSlug}.mp3`);
  const audioTo = path.join(ROOT, `public/audios/${newSlug}.mp3`);
  renameIfExists(audioFrom, audioTo);
}

const scanRoots = [
  "src/content",
  "src/generated",
  "app",
  "components",
  "lib",
  "data",
  "scripts",
  "docs/content-os",
  "netlify.toml",
  "articles",
].map((p) => path.join(ROOT, p));

const SKIP_PATH_PARTS = [
  `${path.sep}public${path.sep}data${path.sep}reference${path.sep}gutenberg${path.sep}`,
  `${path.sep}lib${path.sep}reference${path.sep}`,
];

const files = new Set();
for (const root of scanRoots) {
  if (!fs.existsSync(root)) continue;
  const st = fs.statSync(root);
  if (st.isFile()) files.add(root);
  else walkFiles(root, []).forEach((f) => files.add(f));
}

for (const file of files) {
  if (file.includes(`${path.sep}node_modules${path.sep}`)) continue;
  if (SKIP_PATH_PARTS.some((part) => file.includes(part))) continue;
  const ext = path.extname(file);
  if (!TEXT_EXT.has(ext)) continue;
  const raw = fs.readFileSync(file, "utf8");
  const next = replaceSlugsInText(raw);
  if (next !== raw) fs.writeFileSync(file, next);
}

for (const [, newSlug] of renameOrder) {
  const file = path.join(blogDir, `${newSlug}.md`);
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^slug:\s*.+$/m, `slug: ${newSlug}`);
  fs.writeFileSync(file, text);
}

const netlifyPath = path.join(ROOT, "netlify.toml");
let netlify = fs.readFileSync(netlifyPath, "utf8");
const marker = "# Expo Router static export SPA fallback";
const newBlocks = [];
for (const [oldSlug, newSlug] of Object.entries(map)) {
  if (oldSlug === newSlug) continue;
  const fromLine = `from = "/${oldSlug}"`;
  if (netlify.includes(fromLine)) continue;
  newBlocks.push(
    `[[redirects]]\n  from = "/${oldSlug}"\n  to = "/${newSlug}"\n  status = 301\n  force = true\n\n[[redirects]]\n  from = "/${oldSlug}/*"\n  to = "/${newSlug}/:splat"\n  status = 301\n  force = true`,
  );
}
if (!netlify.includes('from = "/showcase"')) {
  newBlocks.unshift(
    `[[redirects]]\n  from = "/showcase"\n  to = "/lcsh"\n  status = 301\n  force = true`,
  );
}
if (newBlocks.length) {
  const block = `\n# Single-word slug migrations (301)\n${newBlocks.join("\n\n")}\n\n`;
  const idx = netlify.indexOf(marker);
  if (idx === -1) throw new Error("netlify.toml SPA marker not found");
  netlify = netlify.slice(0, idx) + block + netlify.slice(idx);
  fs.writeFileSync(netlifyPath, netlify);
}

const subjectsPath = path.join(ROOT, "scripts/blog-subjects.mjs");
let subjects = fs.readFileSync(subjectsPath, "utf8");
const objMatch = subjects.match(/export const BLOG_SUBJECT_BY_SLUG = (\{[\s\S]*?\n\});/);
if (objMatch) {
  const oldObj = eval(`(${objMatch[1]})`);
  const newObj = {};
  for (const [slug, label] of Object.entries(oldObj)) {
    const newSlug = map[slug] ?? slug;
    newObj[newSlug] = label;
  }
  const lines = Object.entries(newObj)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, label]) => {
      const key =
        /^[a-z][a-z0-9-]*$/i.test(slug) && !slug.includes("-") ? slug : `"${slug}"`;
      const val = label.includes("'") ? `"${label}"` : `"${label}"`;
      return `  ${key}: ${val},`;
    });
  subjects = subjects.replace(
    /export const BLOG_SUBJECT_BY_SLUG = \{[\s\S]*?\n\};/,
    `export const BLOG_SUBJECT_BY_SLUG = {\n${lines.join("\n")}\n};`,
  );
  fs.writeFileSync(subjectsPath, subjects);
}

console.log(
  `Single-word slug migration applied. ${Object.entries(map).filter(([o, n]) => o !== n).length} slugs renamed.`,
);
