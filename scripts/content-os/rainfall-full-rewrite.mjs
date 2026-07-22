#!/usr/bin/env node
/**
 * Full Rainfall-style rewrite pass for all blog posts.
 * Does NOT invent statistics — restructures existing prose, facts, and charts.
 *
 * - TL;DR from lede paragraphs (fact-forward)
 * - keyPoints from fact boxes
 * - FAQ from real H2s + evidence blurbs
 * - Rename scaffolding H2s → Fast facts / Data and method
 * - Strip empty paragraphs / leftover scaffold lines
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = join(ROOT, "src/content/blog");

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractParagraphs(html) {
  const out = [];
  const re = /<p class="art-p">([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = stripTags(m[1]);
    if (text.length > 40) out.push(text);
  }
  return out;
}

function extractKeyPoints(html, max = 6) {
  const points = [];
  const re =
    /<div class="fact-box">\s*<span class="fact-number">([^<]+)<\/span>\s*<span class="fact-label">([^<]*)<\/span>/gi;
  let m;
  while ((m = re.exec(html)) && points.length < max) {
    const num = m[1].trim();
    const label = m[2].trim().replace(/\s+/g, " ");
    if (!label || /charts in this/i.test(label)) continue;
    points.push(`${num} — ${label}`);
  }
  return points;
}

function extractH2s(html) {
  const out = [];
  const re = /<h2[^>]*id="([^"]*)"[^>]*>([^<]+)<\/h2>/gi;
  let m;
  while ((m = re.exec(html))) {
    out.push({ id: m[1], title: m[2].replace(/\s+/g, " ").trim() });
  }
  return out;
}

function buildTldr(paragraphs, description, keyPoints) {
  const lede = paragraphs.slice(0, 2).join(" ");
  if (lede.length > 80 && lede.length < 420) return lede;
  if (lede.length >= 420) {
    const cut = lede.slice(0, 380);
    const last = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
    return last > 120 ? cut.slice(0, last + 1) : cut.trim() + "…";
  }
  const tip = keyPoints[0] ? ` Key figure: ${keyPoints[0]}.` : "";
  return `${String(description || "").trim()}${tip}`.trim();
}

function buildFaq(h2s, keyPoints, tldr, paragraphs) {
  const skip =
    /fast facts|data and method|numbers that matter|where the numbers|references|editor|limitations|conclusion|dataset/i;
  const candidates = h2s.filter((h) => !skip.test(h.title)).slice(0, 4);
  return candidates.map((h, i) => {
    let question = h.title;
    if (!question.endsWith("?")) {
      question = /^(what|how|why|which|who|when|where)\b/i.test(question)
        ? `${question}?`
        : `What does the data show about ${question[0].toLowerCase()}${question.slice(1)}?`;
    }
    const point = keyPoints[i];
    // Prefer lede / method paragraphs — skip the "numbers that set the scale" helper line
    const support =
      paragraphs.find(
        (p, idx) => idx >= 2 && !/^The numbers that set the scale/i.test(p),
      ) ||
      paragraphs[1] ||
      tldr;
    const answer = point
      ? `Key figure: ${point}. ${
          support.length > 200 ? support.slice(0, 180).replace(/\s+\S*$/, "") + "…" : support
        }`
      : support.length > 280
        ? support.slice(0, 260).replace(/\s+\S*$/, "") + "…"
        : support || tldr;
    return { question, answer };
  });
}

function rewriteBody(html) {
  let out = html;
  out = out.replace(
    /<h2([^>]*)id="the-numbers-that-matter"([^>]*)>[\s\S]*?<\/h2>/i,
    '<h2 id="fast-facts" class="anchored">Fast facts</h2>',
  );
  out = out.replace(
    /<h2([^>]*)>The numbers that matter<\/h2>/i,
    '<h2 id="fast-facts" class="anchored">Fast facts</h2>',
  );
  out = out.replace(
    /<h2([^>]*)id="where-the-numbers-come-from"([^>]*)>[\s\S]*?<\/h2>/i,
    '<h2 id="data-and-method" class="anchored">Data and method</h2>',
  );
  out = out.replace(
    /<h2([^>]*)>Where the numbers come from<\/h2>/i,
    '<h2 id="data-and-method" class="anchored">Data and method</h2>',
  );
  out = out.replace(/<p class="art-p">\s*<\/p>\s*/gi, "");
  out = out.replace(/These markers set the scale before the charts\.?\s*/gi, "");
  out = out.replace(/A few markers set the scale before the charts\.?\s*/gi, "");
  out = out.replace(/Charts in this report/gi, "");
  out = out.replace(
    /<div class="fact-box">\s*<span class="fact-number">[^<]*<\/span>\s*<span class="fact-label">\s*<\/span>\s*<\/div>\s*/gi,
    "",
  );
  // Ensure Fast facts intro line when facts-grid follows
  if (
    out.includes('id="fast-facts"') &&
    !/id="fast-facts"[\s\S]{0,120}<p class="art-p">/.test(out)
  ) {
    out = out.replace(
      /(<h2 id="fast-facts"[^>]*>Fast facts<\/h2>)\s*/,
      '$1\n<p class="art-p">The numbers that set the scale for this report:</p>\n',
    );
  }
  return out.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

let updated = 0;
for (const file of readdirSync(BLOG).filter((f) => f.endsWith(".md"))) {
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const { data, content } = matter(raw);
  const body = rewriteBody(content);
  const paragraphs = extractParagraphs(body);
  const keyPoints = extractKeyPoints(body);
  const h2s = extractH2s(body);
  const tldr = buildTldr(paragraphs, data.description, keyPoints);
  const faq = buildFaq(h2s, keyPoints, tldr, paragraphs);

  const next = {
    ...data,
    tldr,
    keyPoints,
    faq,
  };

  writeFileSync(path, matter.stringify(body, next));
  updated += 1;
}

console.log(`Rainfall full rewrite: ${updated} posts`);
