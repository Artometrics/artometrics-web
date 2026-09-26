#!/usr/bin/env node
/**
 * Remove art-lede class from article bodies; drop lede paragraph when it duplicates description.
 * Idempotent — safe to re-run.
 * Usage: node scripts/strip-art-lede.mjs [--write]
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const write = process.argv.includes("--write");

const LEDE_PATTERNS = [
  /<p class="art-p art-lede"([^>]*)>([\s\S]*?)<\/p>/gi,
  /<p class="art-lede art-p"([^>]*)>([\s\S]*?)<\/p>/gi,
  /<p class="art-lede"([^>]*)>([\s\S]*?)<\/p>/gi,
];

function replaceLedeParagraphs(html, description) {
  let removedDup = 0;
  let out = html;
  for (const re of LEDE_PATTERNS) {
    out = out.replace(re, (_full, attrs, inner) => {
      if (description && isNearDuplicateLede(inner, description)) {
        removedDup += 1;
        return "";
      }
      return `<p class="art-p"${attrs}>${inner}</p>`;
    });
  }
  out = out.replace(/\sart-lede\b/g, "");
  out = out.replace(/\n{3,}/g, "\n\n");
  return { html: out, removedDup };
}

export function stripArtLede(html, description = "") {
  if (!html.includes("art-lede")) return { html, removedDup: 0 };
  return replaceLedeParagraphs(html, description);
}

function stripHtml(s) {
  return String(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForCompare(s) {
  return stripHtml(s)
    .toLowerCase()
    .replace(/\d+/g, (n) => n)
    .replace(/[''""—–\-]/g, " ")
    .replace(/[^\w\s%×]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when lede text is the same deck as frontmatter description. */
export function isNearDuplicateLede(innerHtml, description) {
  const a = normalizeForCompare(innerHtml);
  const b = normalizeForCompare(description);
  if (!a || !b || b.length < 24) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  const wordsB = b.split(" ").filter(Boolean);
  const wordsA = a.split(" ").filter(Boolean);
  if (wordsB.length >= 6) {
    const head = wordsA.slice(0, wordsB.length).join(" ");
    if (head === wordsB.join(" ")) return true;
  }
  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;
  const prefix = shorter.slice(0, Math.max(40, Math.floor(shorter.length * 0.85)));
  if (prefix.length >= 40 && longer.startsWith(prefix)) return true;
  return false;
}


function parseDescription(frontmatter) {
  const single = frontmatter.match(/^description:\s*'((?:[^']|'')*)'\s*$/m);
  if (single) return single[1].replace(/''/g, "'");
  const dbl = frontmatter.match(/^description:\s*"([^"]*)"\s*$/m);
  if (dbl) return dbl[1];
  const plain = frontmatter.match(/^description:\s*(.+)\s*$/m);
  return plain ? plain[1].trim() : "";
}

let filesTouched = 0;
let ledeStripped = 0;
let dupRemoved = 0;

const blogDir = join(ROOT, "src/content/blog");
for (const name of readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const path = join(blogDir, name);
  const raw = readFileSync(path, "utf8");
  const sep = raw.indexOf("\n---\n", 4);
  if (sep < 0) continue;
  const fm = raw.slice(0, sep + 5);
  const body = raw.slice(sep + 5);
  if (!body.includes("art-lede")) continue;

  const description = parseDescription(fm);
  const { html: next, removedDup } = stripArtLede(body, description);
  if (next === body) continue;

  filesTouched += 1;
  ledeStripped += 1;
  dupRemoved += removedDup;
  if (write) writeFileSync(path, fm + next, "utf8");
}

console.log(
  write
    ? `Updated ${filesTouched} blog file(s); stripped art-lede in ${ledeStripped}; removed ${dupRemoved} duplicate deck paragraph(s).`
    : `Would update ${filesTouched} blog file(s). Pass --write to apply.`,
);
