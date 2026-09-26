#!/usr/bin/env node
/**
 * Convert src/content/blog HTML bodies into articles/<slug>/<slug>.qmd prose.
 *
 * Usage:
 *   node articles/tools/blog-html-to-qmd.mjs --all
 *   node articles/tools/blog-html-to-qmd.mjs --slug pokemon
 *   node articles/tools/blog-html-to-qmd.mjs --slug pokemon --force
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const ARTICLES_DIR = path.join(ROOT, "articles");

const TIER_A_SLUGS = new Set([
  "readmitted",
  "anime",
  "pokemon",
  "coffee",
  "franchise",
  "imperial",
  "giants",
  "youtube",
  "warriors",
  "caesar",
]);

function parseArgs(argv) {
  return {
    all: argv.includes("--all"),
    force: argv.includes("--force"),
    slug: argv.includes("--slug") ? argv[argv.indexOf("--slug") + 1] : null,
  };
}

function parseBlogFile(slug) {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(mdPath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`No frontmatter: ${slug}`);
  const fm = match[1];
  const body = match[2].trim();
  const title = fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] ?? slug;
  const description =
    fm.match(/^description:\s*>-\s*\n([\s\S]*?)(?=\n[a-zA-Z_]+:|\n$)/m)?.[1]?.replace(/\n\s+/g, " ").trim()
    ?? fm.match(/^description:\s*"?([^"\n]+)"?/m)?.[1]
    ?? "";
  const pubDate = fm.match(/^pubDate:\s*(\S+)/m)?.[1] ?? "";
  const author = fm.match(/^author:\s*(\S+)/m)?.[1] ?? "kyle-mcauliffe";
  const tldr = fm.match(/^tldr:\s*>-\s*\n([\s\S]*?)(?=\n[a-zA-Z_]+:)/m)?.[1]?.replace(/\n\s+/g, " ").trim()
    ?? fm.match(/^tldr:\s*"?([^"\n]+)"?/m)?.[1]
    ?? "";
  return { title, description, pubDate, author, tldr, body };
}

function chartFigures(html) {
  const figures = [];
  const re = /data-fallback="([^"]+)"[^>]*aria-label="([^"]*)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const fallback = m[1];
    const label = m[2] || "Chart";
    const pngName = path.basename(fallback);
    figures.push({ pngName, label });
  }
  return figures;
}

function htmlToMarkdown(html) {
  let s = html;
  s = s.replace(/<div id="quarto-content">[\s\S]*?<main[^>]*>/i, "");
  s = s.replace(/<\/main>[\s\S]*$/i, "");
  s = s.replace(/<h2[^>]*id="([^"]*)"[^>]*class="[^"]*anchored[^"]*"[^>]*>([\s\S]*?)<\/h2>/gi, (_, id, text) => `\n\n## ${stripTags(text)} {#${id}}\n\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, text) => `\n\n## ${stripTags(text)}\n\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n\n### ${stripTags(text)}\n\n`);
  s = s.replace(/<figure class="art-chart">[\s\S]*?<\/figure>/gi, (block) => {
    const fb = block.match(/data-fallback="([^"]+)"/);
    const alt = block.match(/aria-label="([^"]*)"/);
    if (!fb) return "\n\n<!-- missing chart fallback -->\n\n";
    const png = path.basename(fb[1]);
    return `\n\n![${alt?.[1] ?? "Chart"}](charts/${png})\n\n`;
  });
  s = s.replace(/<p class="art-p art-lede">([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${stripTags(t)}\n\n`);
  s = s.replace(/<p class="art-p">([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${stripTags(t)}\n\n`);
  s = s.replace(/<p>([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${stripTags(t)}\n\n`);
  s = s.replace(/<div class="facts-grid">([\s\S]*?)<\/div>/gi, (_, inner) => {
    const nums = [...inner.matchAll(/<span class="fact-number">([^<]+)<\/span>\s*<span class="fact-label">([^<]+)<\/span>/g)];
    if (nums.length === 0) return "\n\n";
    return `\n\n${nums.map((m) => `- **${m[1].trim()}** — ${m[2].trim()}`).join("\n")}\n\n`;
  });
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  s = s.replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

function stripTags(x) {
  return x.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function mainQmdPath(slug) {
  const name = slug === "readmitted" ? "readmitted.qmd" : `${slug}.qmd`;
  return path.join(ARTICLES_DIR, slug, name);
}

function buildQmd(slug, parsed) {
  const date = parsed.pubDate ? parsed.pubDate.slice(0, 10) : "";
  const tldrBlock = parsed.tldr ? `\n\n> **TL;DR** ${parsed.tldr}\n` : "";
  const mdBody = htmlToMarkdown(parsed.body);
  const missingCharts = chartFigures(parsed.body).filter(({ pngName }) => {
    return !fs.existsSync(path.join(ARTICLES_DIR, slug, "charts", pngName));
  });

  let warnings = "";
  if (missingCharts.length) {
    warnings = `\n\n<!-- WARN: missing PNGs: ${missingCharts.map((c) => c.pngName).join(", ")} -->\n`;
  }

  return `---
title: "${parsed.title.replace(/"/g, '\\"')}"
description: "${parsed.description.replace(/"/g, '\\"')}"
author: ${parsed.author}
date: "${date}"
format:
  html:
    css: styles/report.css
    toc: true
    toc-depth: 2
execute:
  echo: false
  warning: false
---
${tldrBlock}
${mdBody}
${warnings}
`;
}

function listSlugs(args) {
  if (args.slug) return [args.slug];
  if (!args.all) {
    console.error("Use --all or --slug NAME");
    process.exit(1);
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function main() {
  const args = parseArgs(process.argv);
  let converted = 0;
  let skipped = 0;

  for (const slug of listSlugs(args)) {
    const outPath = mainQmdPath(slug);
    if (TIER_A_SLUGS.has(slug) && !args.force) {
      console.log(`skip tier A: ${slug}`);
      skipped++;
      continue;
    }
    if (fs.existsSync(outPath) && !args.force && TIER_A_SLUGS.has(slug)) {
      skipped++;
      continue;
    }
    if (!fs.existsSync(path.join(BLOG_DIR, `${slug}.md`))) continue;

    const parsed = parseBlogFile(slug);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buildQmd(slug, parsed), "utf8");
    converted++;
    console.log(`converted ${slug} → ${path.relative(ROOT, outPath)}`);
  }

  console.log(`\nDone. converted=${converted} skipped=${skipped}`);
}

main();
