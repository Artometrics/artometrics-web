#!/usr/bin/env node
/**
 * Build a simple EPUB from a blog slug OR a special edition manifest.
 *
 * Usage:
 *   npm run cos:ebook -- --slug readmitted
 *   npm run cos:ebook -- --edition music
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");
const editionIdx = args.indexOf("--edition");
const slug = slugIdx >= 0 ? args[slugIdx + 1] : null;
const editionId = editionIdx >= 0 ? args[editionIdx + 1] : null;

if (!slug && !editionId) {
  console.error("Usage: npm run cos:ebook -- --slug <slug> | --edition <id>");
  process.exit(1);
}

function loadEdition(id) {
  // Read editions.ts via a tiny dynamic import of compiled data — parse JSON sidecar if present,
  // else eval from a generated snapshot. Prefer reading the TS source list via require of data.
  const require = createRequire(import.meta.url);
  // Expo/TS path: use the JSON crosswalk we write, or inline require from dist.
  // Fallback: parse article list from public/data/meta/edition-crosswalk + hard titles from fs.
  const editionsPath = path.join(ROOT, "public/data/meta/editions.json");
  if (!fs.existsSync(editionsPath)) {
    console.error(`Missing ${editionsPath} — run: node scripts/meta/write-editions-json.mjs`);
    process.exit(1);
  }
  const editions = JSON.parse(fs.readFileSync(editionsPath, "utf8"));
  const ed = editions.find((e) => e.id === id);
  if (!ed) {
    console.error(`Unknown edition: ${id}`);
    process.exit(1);
  }
  return ed;
}

function chapterFromSlug(s) {
  const mdPath = path.join(ROOT, "src/content/blog", `${s}.md`);
  if (!fs.existsSync(mdPath)) return null;
  const raw = fs.readFileSync(mdPath, "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;
  return {
    slug: s,
    title: data.title || s,
    description: data.description || "",
    body: content,
  };
}

if (slug) {
  const ch = chapterFromSlug(slug);
  if (!ch) {
    console.error(`Missing or draft: src/content/blog/${slug}.md`);
    process.exit(1);
  }
  writeEpub({
    id: slug,
    title: ch.title,
    description: ch.description,
    chapters: [ch],
    outName: `${slug}.epub`,
  });
} else {
  const ed = loadEdition(editionId);
  const chapters = [];
  for (const s of ed.articleSlugs) {
    const ch = chapterFromSlug(s);
    if (ch) chapters.push(ch);
  }
  if (!chapters.length) {
    console.error(`Edition ${editionId} has no live chapters`);
    process.exit(1);
  }
  writeEpub({
    id: `edition-${editionId}`,
    title: ed.title,
    description: ed.dek,
    chapters,
    outName: path.join("editions", `${editionId}.epub`),
  });
}

function writeEpub({ id, title, description, chapters, outName }) {
  const outDir = path.join(ROOT, "public/exports");
  const outEpub = path.join(outDir, outName);
  fs.mkdirSync(path.dirname(outEpub), { recursive: true });

  const py = `
from pathlib import Path
from ebooklib import epub
import re, json

book_id = ${JSON.stringify(id)}
title = ${JSON.stringify(title)}
description = ${JSON.stringify(description)}
chapters = json.loads(${JSON.stringify(JSON.stringify(chapters))})
out = Path(${JSON.stringify(outEpub)})

book = epub.EpubBook()
book.set_identifier(f"artometrics-{book_id}")
book.set_title(title)
book.set_language("en")
book.add_author("Artometrics")
book.add_metadata("DC", "description", description)

items = []
for i, ch in enumerate(chapters, 1):
    body = ch["body"]
    body = re.sub(r'<div class="art-chart-live"[^>]*>.*?</div>', '', body, flags=re.S)
    body = re.sub(r'class="art-chart-mode-switch[^"]*"', '', body)
    item = epub.EpubHtml(title=ch["title"], file_name=f"chap_{i:02d}.xhtml", lang="en")
    item.content = f"<h1>{ch['title']}</h1>{body}"
    book.add_item(item)
    items.append(item)

book.toc = tuple(items)
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())
book.spine = ["nav"] + items
epub.write_epub(str(out), book)
print(f"EPUB → {out} ({len(items)} chapters)")
`;

  const r = spawnSync("python3", ["-c", py], { encoding: "utf8" });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0 || !fs.existsSync(outEpub)) {
    console.error("ebooklib failed — pip3 install ebooklib (npm run setup:python)");
    process.exit(1);
  }
}
