#!/usr/bin/env node
/**
 * Static sitemap.xml for Expo web export.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const SITE = "https://artometrics.com";

const blog = JSON.parse(readFileSync(join(ROOT, "src/generated/blog.json"), "utf8"))
  .filter((p) => !p.draft && p.pubDate);
const podcast = existsSync(join(ROOT, "src/generated/podcast.json"))
  ? JSON.parse(readFileSync(join(ROOT, "src/generated/podcast.json"), "utf8"))
  : [];
const legal = existsSync(join(ROOT, "src/generated/legal.json"))
  ? JSON.parse(readFileSync(join(ROOT, "src/generated/legal.json"), "utf8"))
  : [];
const authors = existsSync(join(ROOT, "src/generated/authors.json"))
  ? JSON.parse(readFileSync(join(ROOT, "src/generated/authors.json"), "utf8"))
  : [];

const SECTIONS = [
  "sports",
  "movies-tv",
  "music",
  "culture",
  "galleries",
  "cities-travel",
  "games",
  "business",
  "books",
  "tech",
];

const staticPaths = [
  "/",
  "/blog",
  "/topics",
  ...SECTIONS.map((s) => `/topics/${s}`),
  "/podcast",
  "/about",
  "/contact",
  "/pricing",
  "/resources",
  "/datasets",
  "/library",
  "/search",
  "/newsletter",
  "/authors",
  "/login",
  "/signup",
  "/get-app",
];

function url(path, lastmod, priority = "0.6") {
  return `  <url>
    <loc>${SITE}${path}</loc>
    ${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ""}
    <priority>${priority}</priority>
  </url>`;
}

const parts = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...staticPaths.map((p) => url(p, null, p === "/" ? "1.0" : "0.7")),
  ...blog.map((p) => url(`/${p.slug}`, p.pubDate, "0.8")),
  ...podcast.map((e) => url(`/podcast/interviews/${e.id}`, e.pubDate, "0.6")),
  ...authors.map((a) => url(`/authors/${a.id}`, null, "0.4")),
  ...legal.map((l) => url(`/legal/${l.id}`, l.pubDate, "0.3")),
  `</urlset>`,
  "",
];

writeFileSync(join(ROOT, "public/sitemap.xml"), parts.join("\n"));
console.log(`Wrote public/sitemap.xml (${blog.length} reports)`);
