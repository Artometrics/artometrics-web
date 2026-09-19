#!/usr/bin/env node
/**
 * Build docs/content-os/content-calendar.csv — one Friday release per report.
 *
 * Order: pubDate descending, slug ascending.
 * First release: 2026-09-26 (Friday).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const ARTICLES_DIR = path.join(ROOT, "articles");
const OUT = path.join(ROOT, "docs/content-os/content-calendar.csv");

const FIRST_FRIDAY = new Date("2026-09-26T12:00:00Z");

const TIER_A_SLUGS = new Set([
  "readmitted",
  "anime",
  "pokemon",
  "coffee-the-artometrics-of-java",
  "franchise",
  "imperial",
  "giant-the-artometrics-of-a-san-francisco-dynasty",
  "h3-the-artometrics-of-a-youtube-dynasty",
  "warrior-the-artometrics-of-a-golden-state-dynasty",
  "caesar-the-psychonomics-of-emperor-julius",
]);

function readMeta(slug) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const title = fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] ?? slug;
  const pubDate = fm.match(/^pubDate:\s*(\S+)/m)?.[1] ?? "";
  const tagsBlock = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n)+)/m);
  let tags = [];
  if (tagsBlock) {
    tags = tagsBlock[1].match(/-\s+(\S+)/g)?.map((l) => l.replace(/^-\s+/, "")) ?? [];
  } else {
    const inline = fm.match(/^tags:\s*\[([^\]]+)\]/m)?.[1];
    if (inline) tags = inline.split(",").map((t) => t.trim().replace(/['"]/g, ""));
  }
  return { title, pubDate, desk: tags[0] ?? "", subdomain: tags[1] ?? "" };
}

function tierCurrent(slug) {
  if (TIER_A_SLUGS.has(slug)) return "A";
  const qmd =
    slug === "readmitted"
      ? path.join(ARTICLES_DIR, slug, "readmitted.qmd")
      : path.join(ARTICLES_DIR, slug, `${slug}.qmd`);
  if (!fs.existsSync(qmd)) return "C";
  const size = fs.statSync(qmd).size;
  if (size > 800) return "B";
  return "C";
}

function addFridays(start, count) {
  const dates = [];
  const d = new Date(start);
  for (let i = 0; i < count; i++) {
    dates.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 7);
  }
  return dates;
}

function csvEscape(val) {
  const s = String(val ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function main() {
  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  const rows = slugs.map((slug) => ({ slug, ...readMeta(slug) }));
  rows.sort((a, b) => {
    const da = a.pubDate || "";
    const db = b.pubDate || "";
    if (da !== db) return db.localeCompare(da);
    return a.slug.localeCompare(b.slug);
  });

  const fridays = addFridays(FIRST_FRIDAY, rows.length);
  const header = [
    "release_friday",
    "slug",
    "title",
    "desk",
    "subdomain",
    "original_pubDate",
    "tier_target",
    "tier_current",
    "quarto_path",
    "friday_action",
    "notes",
  ];

  const lines = [header.join(",")];
  rows.forEach((row, i) => {
    const tier = tierCurrent(row.slug);
    const qmd =
      row.slug === "readmitted"
        ? `articles/readmitted/readmitted.qmd`
        : `articles/${row.slug}/${row.slug}.qmd`;
    const target = tier === "A" ? "A" : "B";
    const action = i === 0 ? "go_live" : "go_live";
    lines.push(
      [
        fridays[i],
        row.slug,
        row.title,
        row.desk,
        row.subdomain,
        row.pubDate.slice(0, 10),
        target,
        tier,
        qmd,
        action,
        i === 0 ? "First Friday spotlight" : "",
      ]
        .map(csvEscape)
        .join(","),
    );
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${lines.join("\n")}\n`, "utf8");
  console.log(`Wrote ${OUT} (${rows.length} releases, ${fridays[0]} → ${fridays[fridays.length - 1]})`);
}

main();
