#!/usr/bin/env node
/**
 * Strip report scaffolding leftovers and seed TL;DR / keyPoints from existing copy.
 * Does not invent statistics — only reuses description + fact-box numbers already in the body.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = join(ROOT, "src/content/blog");

const SCAFFOLD_PATTERNS = [
  /A few markers set the scale before the charts\.?\s*/gi,
  /Charts in this report/gi,
  /What the charts make visible/gi,
  /How to read this report/gi,
];

function extractKeyPoints(html, max = 5) {
  const points = [];
  const re =
    /<div class="fact-box">\s*<span class="fact-number">([^<]+)<\/span>\s*<span class="fact-label">([^<]+)<\/span>/gi;
  let m;
  while ((m = re.exec(html)) && points.length < max) {
    const num = m[1].trim();
    const label = m[2].trim().replace(/\s+/g, " ");
    if (/charts in this/i.test(label)) continue;
    points.push(`${num} — ${label}`);
  }
  return points;
}

function cleanBody(html) {
  let out = html;
  for (const re of SCAFFOLD_PATTERNS) out = out.replace(re, "");
  // Remove fact-box cells that only say charts count
  out = out.replace(
    /<div class="fact-box">\s*<span class="fact-number">\d+<\/span>\s*<span class="fact-label">[^<]*Charts in this report[^<]*<\/span>\s*<\/div>\s*/gi,
    "",
  );
  // Collapse excess blank lines in HTML whitespace
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim() + "\n";
}

let updated = 0;
for (const file of readdirSync(BLOG).filter((f) => f.endsWith(".md"))) {
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const { data, content } = matter(raw);
  const cleaned = cleanBody(content);
  const keyPoints =
    Array.isArray(data.keyPoints) && data.keyPoints.length
      ? data.keyPoints
      : extractKeyPoints(cleaned);
  const tldr =
    typeof data.tldr === "string" && data.tldr.trim()
      ? data.tldr.trim()
      : String(data.description ?? "").trim();

  const next = {
    ...data,
    tldr,
    keyPoints,
  };

  const bodyChanged = cleaned !== content.trim() + "\n" && cleaned !== content;
  const fmChanged =
    JSON.stringify(next.tldr) !== JSON.stringify(data.tldr) ||
    JSON.stringify(next.keyPoints) !== JSON.stringify(data.keyPoints);

  if (!bodyChanged && !fmChanged) continue;

  const yaml = matter.stringify(cleaned, next);
  writeFileSync(path, yaml.startsWith("---") ? yaml : `---\n${yaml}`);
  updated += 1;
}

console.log(`Magazine cleanup: updated ${updated} posts`);
