#!/usr/bin/env node
/**
 * Push articles toward Rainfall sandbox pattern without inventing stats:
 * - Ensure tldr + keyPoints
 * - Seed FAQ from keyPoints / H2s when missing
 * - Soften leftover scaffolding phrases
 * - Keep charts/facts intact
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = join(ROOT, "src/content/blog");

function extractKeyPoints(html, max = 5) {
  const points = [];
  const re =
    /<div class="fact-box">\s*<span class="fact-number">([^<]+)<\/span>\s*<span class="fact-label">([^<]+)<\/span>/gi;
  let m;
  while ((m = re.exec(html)) && points.length < max) {
    const num = m[1].trim();
    const label = m[2].trim().replace(/\s+/g, " ");
    if (!label || /charts in this/i.test(label)) continue;
    points.push(`${num} — ${label}`);
  }
  return points;
}

function extractH2Questions(html, max = 4) {
  const out = [];
  const re = /<h2[^>]*>([^<]+)<\/h2>/gi;
  let m;
  while ((m = re.exec(html)) && out.length < max) {
    const q = m[1].replace(/\s+/g, " ").trim();
    if (q.length < 8) continue;
    if (/references|editor|limitations|conclusion|numbers that matter|where the numbers/i.test(q))
      continue;
    out.push(q.endsWith("?") ? q : `What does “${q}” show?`);
  }
  return out;
}

function cleanBody(html) {
  return html
    .replace(/These markers set the scale before the charts\.?\s*/gi, "")
    .replace(/A few markers set the scale before the charts\.?\s*/gi, "")
    .replace(/Charts in this report/gi, "")
    .replace(
      /<div class="fact-box">\s*<span class="fact-number">[^<]*<\/span>\s*<span class="fact-label">\s*<\/span>\s*<\/div>\s*/gi,
      "",
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

let n = 0;
for (const file of readdirSync(BLOG).filter((f) => f.endsWith(".md"))) {
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const { data, content } = matter(raw);
  const body = cleanBody(content);
  const keyPoints =
    Array.isArray(data.keyPoints) && data.keyPoints.length
      ? data.keyPoints.map(String)
      : extractKeyPoints(body);
  const tldr =
    typeof data.tldr === "string" && data.tldr.trim()
      ? data.tldr.trim()
      : String(data.description ?? "").trim();

  let faq = Array.isArray(data.faq) ? data.faq : [];
  if (!faq.length) {
    const qs = extractH2Questions(body);
    faq = qs.slice(0, 3).map((question, i) => {
      const point = keyPoints[i];
      const answer = point
        ? `Key figure: ${point}. See the charts and sources in the report for the full evidence.`
        : tldr ||
          "See the charts and sources in the report for the underlying evidence.";
      return { question, answer };
    });
  }

  const next = { ...data, tldr, keyPoints, faq };
  const changed =
    body !== content.trim() ||
    JSON.stringify(next.tldr) !== JSON.stringify(data.tldr) ||
    JSON.stringify(next.keyPoints) !== JSON.stringify(data.keyPoints) ||
    JSON.stringify(next.faq) !== JSON.stringify(data.faq);
  if (!changed) continue;

  writeFileSync(path, matter.stringify(body + "\n", next));
  n += 1;
}

console.log(`Rainfall pass: updated ${n} posts`);
