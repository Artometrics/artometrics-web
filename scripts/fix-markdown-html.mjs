#!/usr/bin/env node
/**
 * Fix blank lines inside HTML in blog markdown bodies.
 * Markdown treats blank lines as end-of-HTML-block, which exposes raw tags as code.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, "../src/content/blog");

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

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
  const filePath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  if (!match) continue;
  const frontmatter = raw.slice(0, raw.length - match[1].length);
  const body = normalizeHtmlForMarkdown(match[1].trimStart());
  fs.writeFileSync(filePath, `${frontmatter}${body}\n`, "utf8");
  console.log(`Fixed ${file}`);
}
