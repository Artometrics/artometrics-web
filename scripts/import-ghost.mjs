#!/usr/bin/env node
/**
 * Import Ghost export into Astro blog collection markdown files.
 * Usage: node scripts/import-ghost.mjs [path-to-ghost.json]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_GHOST_PATH =
  "/Users/ksm/Downloads/artometrics.ghost.2026-06-28-22-38-38.json";
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const MANIFEST_PATH = path.join(ROOT, "docs/image-manifest.md");

const TAG_MAP = {
  anime: ["culture"],
  franchise: ["culture", "history", "power"],
  pokemon: ["culture", "power"],
  "coffee-the-artometrics-of-java": ["culture", "atlas"],
  "h3-the-artometrics-of-a-youtube-dynasty": ["culture", "persona"],
  "giant-the-artometrics-of-a-san-francisco-dynasty": ["atlas"],
  "warrior-the-artometrics-of-a-golden-state-dynasty": ["atlas"],
  readmitted: ["power", "atlas"],
  imperial: ["history", "power"],
  "caesar-the-psychonomics-of-emperor-julius": ["history", "persona"],
};

const ghostPath = process.argv[2] || DEFAULT_GHOST_PATH;
const raw = JSON.parse(fs.readFileSync(ghostPath, "utf8"));
const data = raw.db.find((item) => item.data)?.data;

if (!data) {
  console.error("No data section found in Ghost export");
  process.exit(1);
}

function ghostUrlToLocal(url) {
  if (!url) return null;
  const normalized = url
    .replace(/^__GHOST_URL__/, "https://artometrics.com")
    .replace(/^https?:\/\/[^/]+/, "");
  const match = normalized.match(/\/content\/images\/(.+)/);
  if (!match) return null;
  return `/images/content/${match[1]}`;
}

function rewriteImagePaths(content) {
  return content
    .replace(/__GHOST_URL__\/content\/images\//g, "/images/content/")
    .replace(
      /https?:\/\/(?:www\.)?artometrics\.com\/content\/images\//g,
      "/images/content/"
    )
    .replace(/(?<!["'])\/content\/images\//g, "/images/content/");
}

function stripGhostCards(html) {
  return html
    .replace(/<!--kg-card-begin:[^>]+-->/g, "")
    .replace(/<!--kg-card-end:[^>]+-->/g, "")
    .trim();
}

function normalizeHtmlForMarkdown(html) {
  const preserved = [];
  let index = 0;
  const withPlaceholders = html.replace(
    /<(style|script|pre)[\s>][\s\S]*?<\/\1>/gi,
    (match) => {
      const key = `__PRESERVE_${index++}__`;
      preserved.push({ key, match });
      return key;
    }
  );
  const collapsed = withPlaceholders
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
  return preserved.reduce(
    (out, { key, match }) => out.replace(key, match),
    collapsed
  );
}

function htmlToBody(html) {
  return normalizeHtmlForMarkdown(rewriteImagePaths(stripGhostCards(html)));
}

function stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromPost(post) {
  if (post.custom_excerpt) return post.custom_excerpt.trim();
  const plain = stripHtml(post.html || "");
  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

function pubDateFromPost(post) {
  const d = post.published_at || post.created_at;
  return d ? d.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

function yamlEscape(str) {
  return str.replace(/"/g, '\\"');
}

function extractImageUrls(content) {
  const urls = new Map();
  const patterns = [
    /__GHOST_URL__\/content\/images\/[^\s"'<>]+/g,
    /https?:\/\/(?:www\.)?artometrics\.com\/content\/images\/[^\s"'<>]+/g,
    /\/content\/images\/[^\s"'<>]+/g,
  ];
  for (const pattern of patterns) {
    const matches = content.match(pattern) || [];
    for (const match of matches) {
      const canonical = match
        .replace(/^__GHOST_URL__/, "https://artometrics.com")
        .replace(
          /^\/content\/images\//,
          "https://artometrics.com/content/images/"
        );
      const local = ghostUrlToLocal(match);
      if (local) urls.set(canonical, local);
    }
  }
  return urls;
}

const allImages = new Map();

function addImage(canonical, local, slug, category) {
  if (!local) return;
  if (!allImages.has(canonical)) {
    allImages.set(canonical, { canonical, local, slugs: new Set(), category });
  }
  allImages.get(canonical).slugs.add(slug);
}

fs.mkdirSync(BLOG_DIR, { recursive: true });

const posts = data.posts.filter(
  (p) => p.type === "post" && p.status === "published"
);

console.log(`Importing ${posts.length} posts...`);

for (const post of posts) {
  const slug = post.slug;
  const tags = TAG_MAP[slug];
  if (!tags) {
    console.warn(`No tag mapping for slug: ${slug}`);
    continue;
  }

  const heroImage = ghostUrlToLocal(post.feature_image) || "";
  const description = excerptFromPost(post);
  const pubDate = pubDateFromPost(post);
  const body = htmlToBody(post.html || "");

  if (post.feature_image) {
    const canonical = post.feature_image.replace(
      /^__GHOST_URL__/,
      "https://artometrics.com"
    );
    addImage(canonical, heroImage, slug, "hero");
  }

  for (const [canonical, local] of extractImageUrls(post.html || "")) {
    addImage(canonical, local, slug, "inline");
  }

  const frontmatter = `---
title: "${yamlEscape(post.title)}"
slug: ${slug}
pubDate: ${pubDate}
description: "${yamlEscape(description)}"
heroImage: ${heroImage}
tags: [${tags.join(", ")}]
draft: false
---

`;

  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), frontmatter + body, "utf8");
  console.log(`  ✓ ${slug}.md`);
}

for (const tag of data.tags || []) {
  if (tag.feature_image) {
    const canonical = tag.feature_image.replace(
      /^__GHOST_URL__/,
      "https://artometrics.com"
    );
    addImage(canonical, ghostUrlToLocal(tag.feature_image), tag.slug, "section");
  }
}

const aboutPage = data.posts.find((p) => p.slug === "about" && p.type === "page");
const aboutExportPath = path.join(ROOT, "scripts/.about-content.html");
if (aboutPage?.html) {
  fs.writeFileSync(aboutExportPath, rewriteImagePaths(aboutPage.html), "utf8");
  console.log(`  ✓ about content → scripts/.about-content.html`);
}

const categories = { hero: [], inline: [], section: [], site: [] };

for (const [, img] of allImages) {
  categories[img.category]?.push({
    canonical: img.canonical,
    local: img.local,
    slugs: [...img.slugs].sort().join(", "),
  });
}

const settings = Object.fromEntries(
  (data.settings || []).filter((s) => s.key).map((s) => [s.key, s.value])
);
if (settings.icon) {
  const canonical = settings.icon.replace(
    /^__GHOST_URL__/,
    "https://artometrics.com"
  );
  categories.site.push({
    canonical,
    local: ghostUrlToLocal(settings.icon) || "/images/content/icon.png",
    slugs: "site",
  });
}

function renderTable(entries) {
  if (!entries.length) return "_None found._\n";
  const lines = [
    "| Ghost URL | Local path | Used in |",
    "|-----------|------------|---------|",
  ];
  for (const e of entries.sort((a, b) => a.local.localeCompare(b.local))) {
    lines.push(`| \`${e.canonical}\` | \`${e.local}\` | ${e.slugs} |`);
  }
  return `${lines.join("\n")}\n`;
}

const totalImages = allImages.size + categories.site.length;

const manifest = `# Artometrics Image Manifest

Generated from Ghost export. Download each Ghost URL and save to the corresponding local path under \`public/\`.

**Total downloadable images:** ${totalImages}

## External embeds (not downloadable)

These remain as remote embeds in article HTML:

- Tableau dashboards (embedded in \`franchise\`, \`imperial\`)
- YouTube embed (embedded in \`h3-the-artometrics-of-a-youtube-dynasty\`)

---

## 1. Hero / feature images (${categories.hero.length})

${renderTable(categories.hero)}

## 2. Inline chart & content images (${categories.inline.length})

${renderTable(categories.inline)}

## 3. Section hero images (${categories.section.length})

${renderTable(categories.section)}

## 4. Site assets (${categories.site.length})

${renderTable(categories.site)}

---

## Download instructions

1. Create directories as needed under \`public/images/content/\`
2. Download each Ghost URL (prepend \`https://artometrics.com\` if path-only)
3. Save to the local path listed (relative to \`public/\`)
4. Run \`npm run dev\` — broken images should resolve once files are in place
`;

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
fs.writeFileSync(MANIFEST_PATH, manifest, "utf8");
console.log(`\nImage manifest: ${totalImages} images → docs/image-manifest.md`);
console.log("Done.");
