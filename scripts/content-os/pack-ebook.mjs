#!/usr/bin/env node
/**
 * Build a simple EPUB from a blog slug (title + article HTML body).
 *
 * Usage: npm run cos:ebook -- --slug readmitted
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");
const slug = slugIdx >= 0 ? args[slugIdx + 1] : null;

if (!slug) {
  console.error("Usage: npm run cos:ebook -- --slug <slug>");
  process.exit(1);
}

const mdPath = path.join(ROOT, "src/content/blog", `${slug}.md`);
if (!fs.existsSync(mdPath)) {
  console.error(`Missing ${mdPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(mdPath, "utf8");
const { data, content } = matter(raw);
const title = data.title || slug;
const description = data.description || "";
const outDir = path.join(ROOT, "public/exports");
const outEpub = path.join(outDir, `${slug}.epub`);
fs.mkdirSync(outDir, { recursive: true });

const py = `
from pathlib import Path
from ebooklib import epub
import re

slug = ${JSON.stringify(slug)}
title = ${JSON.stringify(title)}
description = ${JSON.stringify(description)}
body = ${JSON.stringify(content)}
out = Path(${JSON.stringify(outEpub)})

# Strip interactive chart hosts; keep static img fallbacks if present as HTML imgs later.
body = re.sub(r'<div class="art-chart-live"[^>]*>.*?</div>', '', body, flags=re.S)
body = re.sub(r'class="art-chart-mode-switch[^"]*"', '', body)

book = epub.EpubBook()
book.set_identifier(f"artometrics-{slug}")
book.set_title(title)
book.set_language("en")
book.add_author("Artometrics")
book.add_metadata("DC", "description", description)

chapter = epub.EpubHtml(title=title, file_name="chap_01.xhtml", lang="en")
chapter.content = f"<h1>{title}</h1>{body}"
book.add_item(chapter)
book.toc = (chapter,)
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())
book.spine = ["nav", chapter]
epub.write_epub(str(out), book)
print(f"EPUB → {out}")
`;

const r = spawnSync("python3", ["-c", py], { encoding: "utf8" });
if (r.stdout) process.stdout.write(r.stdout);
if (r.stderr) process.stderr.write(r.stderr);
if (r.status !== 0 || !fs.existsSync(outEpub)) {
  console.error("ebooklib failed — pip3 install ebooklib (npm run setup:python)");
  process.exit(1);
}
