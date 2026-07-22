#!/usr/bin/env node
/**
 * Second pass: expand thin chart sections into fuller narrative prose.
 * Only reuses numbers already present in the article — never invents stats.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = join(ROOT, "src/content/blog");

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function expandChartBlock(h2Title, figureHtml, existingParas, articleTitle) {
  const aria =
    figureHtml.match(/aria-label="([^"]*)"/i)?.[1] ||
    figureHtml.match(/aria-label='([^']*)'/i)?.[1] ||
    "";
  const sub = aria
    ? aria.charAt(0).toUpperCase() + aria.slice(1)
    : `Reading ${h2Title.toLowerCase()}`;

  const cleaned = existingParas
    .map((p) =>
      p
        .replace(/\bA good awards report should\b/gi, "The cleaner approach is to")
        .replace(/\bThis is a repeated Artometrics pattern:\s*/gi, "")
        .replace(/\bHead-of-field concentration is where quality, scale, or brand visibly separates from the pack\./gi, "")
        .replace(/\bAnnual medians filter one-off spikes so the structural slope — not viral outliers — drives the story\./gi, "")
        .replace(/\bWide whiskers flag segments where outliers — not averages — drive reputation\./gi, "")
        .replace(/\bCategory boxes reveal whether domestic gross consensus is shared or contested across tiers\./gi, "")
        .replace(/\bDiverging from the median exposes which tiers over- or under-perform — not just who ranks first\./gi, "")
        .replace(/\bBubble size tracks repeat presence — outliers are archetypes, not noise\./gi, "")
        .replace(/\bJoint plot of ([^.]+) surfaces clusters the averages erase\./gi, "Plotting $1 shows clusters that averages erase.")
        .trim(),
    )
    .filter((p) => p.length > 20);

  const paras = [...cleaned];

  // Bridge into the chart
  if (!paras.some((p) => /chart|exhibit|figure|plot|shows|look/i.test(p))) {
    paras.unshift(
      `Here the story turns to <em>${h2Title.toLowerCase()}</em>${aria ? ` — ${aria.charAt(0).toLowerCase()}${aria.slice(1)}` : ""}.`,
    );
  }

  // Closing beat tied to article question, still non-inventive
  if (paras.length < 3) {
    paras.push(
      `Read it as one chapter of <em>${articleTitle}</em>: the chart is the evidence; the prose is the argument about what that evidence is allowed to mean.`,
    );
  }

  const prose = paras
    .slice(0, 5)
    .map((p) => `<p class="art-p">${p}</p>`)
    .join("\n");

  return { sub, figureHtml, prose };
}

function processBody(html, articleTitle) {
  // Match H2 + optional "The exhibit" H3 + figure + following paragraphs until next H2
  return html.replace(
    /<h2([^>]*)>([^<]+)<\/h2>\s*(?:<h3[^>]*>The exhibit<\/h3>\s*)?(<figure[\s\S]*?<\/figure>)([\s\S]*?)(?=<h2\b|$)/gi,
    (full, h2attrs, h2title, figure, rest) => {
      const paras = [...rest.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
        stripTags(m[1]),
      );
      const trailing = rest.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, "").trim();
      const { sub, figureHtml, prose } = expandChartBlock(
        stripTags(h2title),
        figure,
        paras,
        articleTitle,
      );
      const id = (h2attrs.match(/id="([^"]+)"/) || [])[1] || "section";
      return `<h2${h2attrs}>${h2title}</h2>
<h3 id="${id}-look" class="anchored">${sub}</h3>
${figureHtml}
${prose}
${trailing}\n`;
    },
  );
}

const files = readdirSync(BLOG).filter((f) => f.endsWith(".md"));
let n = 0;
for (const file of files) {
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const parsed = matter(raw);
  parsed.content = processBody(parsed.content, parsed.data.title || file);
  // Soften remaining scaffolding labels in non-chart H2s already handled
  parsed.content = parsed.content
    .replace(/>Caveats</g, ">What this file cannot tell you<")
    .replace(/>Bottom line</g, ">What to take away<")
    .replace(/\bHow to read this piece:[\s\S]*?(?=<\/p>)/gi, (m) => {
      // drop meta how-to instructions
      return "";
    })
    .replace(/<p class="art-p">\s*<\/p>/g, "");

  const out = matter.stringify(parsed.content.trim() + "\n", parsed.data);
  writeFileSync(path, out.endsWith("\n") ? out : `${out}\n`);
  n += 1;
}
console.log(`Expanded narrative prose: ${n} articles`);
