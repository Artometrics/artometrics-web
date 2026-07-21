#!/usr/bin/env node
/**
 * Pack an Instagram "zine" from a published (or draft) report.
 * Writes markdown caption + HTML slide deck you can screenshot.
 *
 * Usage:
 *   node scripts/content-os/pack-ig-zine.mjs --slug anime
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
    .replace(/>/g, "&gt;");
}

const slug = arg("slug");
if (!slug) {
  console.error("Missing --slug");
  process.exit(1);
}

const blogPath = join(ROOT, "src/generated/blog.json");
if (!existsSync(blogPath)) {
  console.error("Run npm run content first");
  process.exit(1);
}

const post = JSON.parse(readFileSync(blogPath, "utf8")).find((p) => p.slug === slug);
if (!post) {
  console.error(`Post not found: ${slug}`);
  process.exit(1);
}

const briefPath = join(ROOT, "docs/content-os/briefs", `${slug}.json`);
const brief = existsSync(briefPath)
  ? JSON.parse(readFileSync(briefPath, "utf8"))
  : null;

const desk = post.tags?.[0] || "culture";
const primary = brief?.primaryKeyword || `${desk} data`;
const secondaries = brief?.secondaryKeywords || [];
const hashtags = [
  "#Artometrics",
  `#${desk.charAt(0).toUpperCase()}${desk.slice(1)}Desk`,
  ...secondaries.slice(0, 4).map((k) => `#${k.replace(/[^a-zA-Z0-9]+/g, "")}`),
  "#CreativeEconomy",
  "#DataJournalism",
].join(" ");

const facts = [];
const factRe =
  /<span class="fact-number">([^<]+)<\/span>\s*<span class="fact-label">([^<]+)<\/span>/gi;
let m;
while ((m = factRe.exec(post.body || "")) && facts.length < 5) {
  facts.push({ n: m[1].trim(), label: m[2].trim() });
}
if (!facts.length) {
  facts.push({ n: "Read", label: post.description.slice(0, 80) });
}

const outDir = join(ROOT, "docs/content-os/zines", slug);
mkdirSync(outDir, { recursive: true });

const slides = [
  {
    title: "COVER",
    html: `<h1>${esc(post.title)}</h1><p class="desk">${esc(desk.toUpperCase())}</p><p class="brand">ARTOMETRICS</p>`,
  },
  ...facts.map((f, i) => ({
    title: `FACT ${i + 1}`,
    html: `<p class="num">${esc(f.n)}</p><p class="label">${esc(f.label)}</p>`,
  })),
  {
    title: "READ",
    html: `<p class="cta">Read the full report</p><p class="url">artometrics.com/${esc(slug)}</p><p class="brand">ARTOMETRICS</p>`,
  },
];

const deck = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>IG zine — ${esc(post.title)}</title>
<style>
  @page { size: 1080px 1350px; margin: 0; }
  body { margin: 0; font-family: Georgia, serif; background: #111; }
  .slide {
    width: 1080px; height: 1350px; box-sizing: border-box;
    padding: 72px; background: #FAFAF8; color: #1C1C1E;
    display: flex; flex-direction: column; justify-content: center;
    border-bottom: 12px solid #C0392B; page-break-after: always;
  }
  h1 { font-size: 56px; font-weight: 300; line-height: 1.15; margin: 0 0 24px; }
  .desk { letter-spacing: 0.25em; text-transform: uppercase; color: #C0392B; font-size: 18px; }
  .brand { margin-top: auto; letter-spacing: 0.3em; font-size: 16px; color: #6B6B6B; }
  .num { font-size: 96px; color: #C0392B; margin: 0; font-weight: 300; }
  .label { font-size: 32px; line-height: 1.35; color: #1C1C1E; max-width: 900px; }
  .cta { font-size: 42px; font-weight: 300; }
  .url { font-size: 28px; color: #6B6B6B; }
</style>
</head>
<body>
${slides.map((s) => `<section class="slide" data-title="${esc(s.title)}">${s.html}</section>`).join("\n")}
</body>
</html>
`;

writeFileSync(join(outDir, "slides.html"), deck);

const caption = [
  brief?.distribution?.linkedinHook || post.description,
  "",
  `Full report: https://artometrics.com/${slug}`,
  "",
  hashtags,
  "",
  "Sources cited in the report. Artometrics — data reports on culture, power, and the creative economy.",
].join("\n");

writeFileSync(join(outDir, "caption.txt"), caption);
writeFileSync(
  join(outDir, "pack.json"),
  JSON.stringify(
    {
      slug,
      desk,
      primaryKeyword: primary,
      hashtags,
      slides: slides.length,
      canonical: `https://artometrics.com/${slug}`,
      files: ["slides.html", "caption.txt"],
    },
    null,
    2,
  ) + "\n",
);

console.log(`IG zine packed → docs/content-os/zines/${slug}/`);
console.log(`Open slides.html in a browser (1080×1350) and export PNGs per slide.`);
