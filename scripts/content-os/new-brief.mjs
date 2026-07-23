#!/usr/bin/env node
/**
 * Create a new Artometrics keyword brief from the template.
 *
 * Usage:
 *   node scripts/content-os/new-brief.mjs --slug my-topic --desk arts --subdomain film --title "My Topic"
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const BRIEFS = join(ROOT, "docs/content-os/briefs");
const TEMPLATE = join(BRIEFS, "_template.json");

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const slug = arg("slug");
const desk = arg("desk", "culture");
const titleBase = arg("title", slug?.replace(/-/g, " ") ?? "");

if (!slug) {
  console.error("Missing --slug");
  process.exit(1);
}

const allowed = new Set(["arts", "sports", "science", "humanities", "civics", "culture"]);
if (!allowed.has(desk)) {
  console.error(`Invalid --desk ${desk} (use a domain: arts|sports|science|humanities|civics|culture)`);
  process.exit(1);
}

const subdomain = arg("subdomain", "");
const allowedSub = new Set([
  "design",
  "music",
  "film",
  "theater",
  "architecture",
  "fashion",
  "language",
  "football",
  "basketball",
  "baseball",
  "soccer",
  "hockey",
  "golf",
  "tennis",
  "fighting",
  "gaming",
  "motorsports",
  "chemistry",
  "physics",
  "biology",
  "astronomy",
  "geology",
  "math",
  "medicine",
  "engineering",
  "tech",
  "history",
  "philosophy",
  "religion",
  "psychology",
  "sociology",
  "anthropology",
  "economics",
  "business",
  "politics",
  "law",
  "education",
  "communication",
  "travel",
  "food",
  "leisure",
  "environment",
  "wellness",
]);
if (subdomain && !allowedSub.has(subdomain)) {
  console.error(`Invalid --subdomain ${subdomain}`);
  process.exit(1);
}

mkdirSync(BRIEFS, { recursive: true });
const out = join(BRIEFS, `${slug}.json`);
if (existsSync(out) && !process.argv.includes("--force")) {
  console.error(`Brief exists: ${out} (use --force)`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const brief = JSON.parse(readFileSync(TEMPLATE, "utf8"));
brief.slug = slug;
brief.desk = desk;
if (subdomain) brief.subdomain = subdomain;
brief.workingTitle = titleBase.replace(/\b\w/g, (c) => c.toUpperCase());
brief.title = `${brief.workingTitle.toUpperCase()}: The Artometrics of ${brief.workingTitle}`;
brief.primaryKeyword = `${titleBase.toLowerCase()} data`;
brief.secondaryKeywords = [
  `${titleBase.toLowerCase()} industry`,
  `${titleBase.toLowerCase()} rankings`,
  `${titleBase.toLowerCase()} economics`,
];
brief.metaDescription = `A data report on ${titleBase.toLowerCase()} — structure, leaders, and limits from the public archive.`.slice(
  0,
  160,
);
brief.status = "brief";
brief.createdAt = today;
brief.updatedAt = today;

writeFileSync(out, `${JSON.stringify(brief, null, 2)}\n`);
console.log(`Wrote ${out}`);
