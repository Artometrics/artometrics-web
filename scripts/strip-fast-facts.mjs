#!/usr/bin/env node
/**
 * Remove Fast facts sections (h2#fast-facts, intro line, facts-grid) from article HTML bodies.
 * Usage: node scripts/strip-fast-facts.mjs [--write]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const write = process.argv.includes("--write");

function extractFactsGrid(html, startIndex) {
  const marker = '<div class="facts-grid">';
  const start = html.indexOf(marker, startIndex);
  if (start < 0) return null;
  let i = start + marker.length;
  let depth = 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      i = nextClose + 6;
      if (depth === 0) return { start, end: i };
    }
  }
  return null;
}

export function stripFastFacts(html) {
  let out = html.replace(
    /\s*<li>\s*<a\b[^>]*\bhref="#fast-facts"[^>]*>[\s\S]*?<\/a>\s*<\/li>/gi,
    "",
  );

  const h2Re = /<h2\s+id="fast-facts"[^>]*>[\s\S]*?<\/h2>/i;
  const h2Match = out.match(h2Re);
  if (!h2Match) return out;

  const h2Start = out.search(h2Re);
  let pos = h2Start + h2Match[0].length;

  while (pos < out.length) {
    const rest = out.slice(pos);
    const ws = rest.match(/^\s*/)[0];
    pos += ws.length;
    if (/^<div class="facts-grid">/i.test(out.slice(pos))) break;
    if (/^<h2\b/i.test(out.slice(pos))) break;
    const pMatch = out.slice(pos).match(/^<p class="art-p"[^>]*>[\s\S]*?<\/p>/i);
    if (pMatch) {
      pos += pMatch[0].length;
      continue;
    }
    break;
  }

  const grid = extractFactsGrid(out, pos);
  if (grid && grid.start === pos) {
    pos = grid.end;
  }

  out = out.slice(0, h2Start) + out.slice(pos);
  return out.replace(/\n{3,}/g, "\n\n");
}

function walkQmd(content) {
  const re =
    /^##[^\n]*\{#fast-facts\}[^\n]*\n+([\s\S]*?)(?=^## |\Z)/m;
  return content.replace(re, "");
}

function collectFiles(dir, ext, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collectFiles(p, ext, acc);
    else if (name.endsWith(ext)) acc.push(p);
  }
  return acc;
}

let changed = 0;
const blogDir = join(ROOT, "src/content/blog");
for (const file of readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const path = join(blogDir, file);
  const raw = readFileSync(path, "utf8");
  const sep = raw.indexOf("\n---\n", 4);
  if (sep < 0) continue;
  const fm = raw.slice(0, sep + 5);
  const body = raw.slice(sep + 5);
  const next = stripFastFacts(body);
  if (next !== body) {
    changed += 1;
    if (write) writeFileSync(path, fm + next, "utf8");
  }
}

const qmdFiles = collectFiles(join(ROOT, "articles"), ".qmd");
for (const path of qmdFiles) {
  const raw = readFileSync(path, "utf8");
  const next = walkQmd(raw);
  if (next !== raw) {
    changed += 1;
    if (write) writeFileSync(path, next, "utf8");
  }
}

console.log(
  write
    ? `Updated ${changed} file(s).`
    : `Would update ${changed} file(s). Pass --write to apply.`,
);
