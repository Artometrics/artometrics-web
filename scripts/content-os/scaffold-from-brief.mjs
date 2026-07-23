#!/usr/bin/env node
/**
 * Scaffold a draft Artometrics HTML report from a keyword brief.
 * Does not invent data — placeholders are explicit until analysis is attached.
 *
 * Usage:
 *   node scripts/content-os/scaffold-from-brief.mjs --brief docs/content-os/briefs/foo.json
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return null;
  return process.argv[i + 1];
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const briefPath = arg("brief");
if (!briefPath) {
  console.error("Missing --brief path");
  process.exit(1);
}

const absoluteBrief = briefPath.startsWith("/") ? briefPath : join(ROOT, briefPath);
const brief = JSON.parse(readFileSync(absoluteBrief, "utf8"));
const slug = brief.slug;
const draftDir = join(ROOT, "docs/content-os/drafts", slug);
mkdirSync(draftDir, { recursive: true });
mkdirSync(join(ROOT, "public/images/content/articles", slug, "charts"), {
  recursive: true,
});
mkdirSync(join(ROOT, "public/data/articles", slug, "charts"), { recursive: true });

const sections = brief.sectionPlan?.length
  ? brief.sectionPlan
  : [
      {
        id: "findings",
        title: "FINDINGS",
        question: "What does the archive show?",
        keyword: brief.primaryKeyword,
      },
    ];

const tocItems = [
  ["fast-facts", "FAST FACTS"],
  ["dataset-context", "DATASET CONTEXT"],
  ...sections.map((s) => [s.id, s.title]),
  ["limitations", "LIMITATIONS"],
  ["conclusion", "CONCLUSION"],
  ["references", "REFERENCES"],
  ["editors-note", "EDITOR'S NOTE"],
];

const tocHtml = tocItems
  .map(
    ([id, label]) =>
      `  <li><a href="#${id}" id="toc-${id}">${esc(label)}</a></li>`,
  )
  .join("\n");

const findingHtml = sections
  .map((s) => {
    const kw = s.keyword ? ` Target keyword: <em>${esc(s.keyword)}</em>.` : "";
    return `<h2 id="${esc(s.id)}" class="anchored">${esc(s.title)}</h2>
<p class="art-p"><strong>Question:</strong> ${esc(s.question)}${kw}</p>
<p class="art-p"><strong>PLACEHOLDER:</strong> Attach observed data, then one chart that answers this question. Caption the claim — not the column name. Label derived metrics explicitly.</p>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/${esc(slug)}/charts/${esc(s.id)}.plotly.json" data-fallback="/images/content/articles/${esc(slug)}/charts/${esc(s.id)}.png" data-source="Data: pending — ARTOMETRICS" role="img" aria-label="${esc(s.title)}"></div>
  <figcaption class="art-chart-caption">Pending chart — ${esc(s.question)}</figcaption>
</figure>`;
  })
  .join("\n");

const related = (brief.relatedSlugs || [])
  .map((r) => `<a href="/${esc(r)}">${esc(r)}</a>`)
  .join(" · ");

const sources = (brief.dataSources || [])
  .map(
    (d) =>
      `<p>${esc(d.name)}${d.url ? `: <a href="${esc(d.url)}" target="_blank" rel="noopener noreferrer">${esc(d.url)}</a>` : ""}${d.notes ? ` — ${esc(d.notes)}` : ""}</p>`,
  )
  .join("\n");

const body = `<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
${tocHtml}
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">${esc(brief.angle || "Interpretive move pending.")} Primary keyword: <strong>${esc(brief.primaryKeyword)}</strong>.</p>
<p class="art-p">${esc(brief.audience || "")}</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">TBD</span><span class="fact-label">Calibration statistic once the dataset is attached</span></div>
  <div class="fact-box"><span class="fact-number">TBD</span><span class="fact-label">Catalog or sample size (observed)</span></div>
  <div class="fact-box"><span class="fact-number">TBD</span><span class="fact-label">Concentration or median signal (derived — label clearly)</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p class="art-p">This scaffold was generated from Content OS brief <code>${esc(slug)}</code>. Replace placeholders with observed data, derived metrics, and cited sources per the Artometrics style guide.</p>
${sources || "<p class=\"art-p\">No dataSources listed in the brief yet.</p>"}
${findingHtml}
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p class="art-p">Until the working file is attached, treat every number above as a placeholder. Missing values, licensing limits, and non-representative samples must be disclosed before publication.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p class="art-p">The best reading is modest: use the charts to sharpen the question about <strong>${esc(brief.primaryKeyword)}</strong>, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
${sources || "<p class=\"art-p\">Add citable sources before publish.</p>"}
${related ? `<p class="art-p">Related Artometrics reports: ${related}</p>` : ""}
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics Content OS scaffold. Charts and aggregates become reproducible once exhibits and public source files are attached.</em></p></div>
</main>
</div>
`;

const today = new Date().toISOString().slice(0, 10);
const frontmatter = `---
title: "${String(brief.title).replace(/"/g, '\\"')}"
slug: ${slug}
pubDate: ${today}
description: "${String(brief.metaDescription || "").replace(/"/g, '\\"')}"
heroImage: /images/content/articles/${slug}/hero.png
tags:
  - ${brief.desk}${brief.subdomain ? `\n  - ${brief.subdomain}` : ""}
draft: true
---
`;

const articlePath = join(draftDir, "article.md");
writeFileSync(articlePath, `${frontmatter}${body}\n`);

const manifest = {
  slug,
  brief: absoluteBrief.replace(`${ROOT}/`, ""),
  article: `docs/content-os/drafts/${slug}/article.md`,
  heroTarget: `public/images/content/articles/${slug}/hero.png`,
  status: "scaffolded",
  createdAt: today,
};
writeFileSync(join(draftDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

brief.status = "scaffolded";
brief.updatedAt = today;
writeFileSync(absoluteBrief, `${JSON.stringify(brief, null, 2)}\n`);

const promptPath = join(draftDir, "banner-prompt.txt");
writeFileSync(
  promptPath,
  [
    `Artometrics editorial hero banner, 16:9 documentary magazine still.`,
    `Topic: ${brief.workingTitle || brief.title}. Desk: ${brief.desk}.`,
    `Mood: ${brief.banner?.mood || "cream paper, spare red accent, quiet atmosphere"}.`,
    `Subjects: ${brief.banner?.subjects || "topic-relevant objects or place, no people staring at camera"}.`,
    `Color: cream/paper neutrals, charcoal, sparingly use Artometrics red #C0392B.`,
    `Avoid: ${brief.banner?.avoid || "logos, on-image text, charts, purple gradients, stickers, collage"}.`,
    `No typography in the image. No UI mockups. Photoreal editorial, not illustration.`,
  ].join(" "),
);

console.log(`Scaffolded ${articlePath}`);
console.log(`Banner prompt: ${promptPath}`);
if (!existsSync(join(ROOT, "public/images/content/articles", slug, "hero.png"))) {
  console.log("Hero image missing — generate via Higgsfield using banner-prompt.txt");
}
