#!/usr/bin/env node
/**
 * Pack an Instagram "zine" from a published (or draft) report.
 * Writes markdown caption + HTML slide deck you can screenshot.
 * Layout follows docs/design-system Artometrics IG Zine Pack (DM Mono/Sans, B/W/red).
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
while ((m = factRe.exec(post.body || "")) && facts.length < 4) {
  facts.push({ n: m[1].trim(), label: m[2].trim() });
}
if (!facts.length) {
  const kp = Array.isArray(post.keyPoints) ? post.keyPoints.slice(0, 4) : [];
  if (kp.length) {
    for (const point of kp) {
      facts.push({ n: `Finding ${facts.length + 1}`, label: String(point) });
    }
  } else {
    facts.push({ n: "01", label: post.description.slice(0, 120) });
  }
}

const outDir = join(ROOT, "docs/content-os/zines", slug);
mkdirSync(outDir, { recursive: true });

const coverClaim =
  brief?.distribution?.linkedinHook ||
  post.tldr ||
  post.description.split(/[.!?]/)[0] ||
  post.title;

const slides = [
  {
    title: "COVER",
    tone: "dark",
    html: `
      <p class="kicker">${esc(desk.toUpperCase())} — ${esc(post.title)}</p>
      <div class="mid">
        <h1>${esc(coverClaim)}</h1>
        <div class="rule"></div>
      </div>
      <p class="brand">Artometrics</p>`,
  },
  ...facts.map((f, i) => ({
    title: `FINDING ${i + 1}`,
    tone: i % 2 === 0 ? "light" : "dark",
    html: `
      <p class="kicker">Finding ${String(i + 1).padStart(2, "0")}</p>
      <div class="mid">
        <h1>${esc(f.n)}</h1>
        <p class="dek">${esc(f.label)}</p>
        <div class="chart">[ chart frame ]</div>
      </div>
      <p class="brand">Artometrics</p>`,
  })),
  {
    title: "CTA",
    tone: "dark",
    html: `
      <p class="kicker">Get the data</p>
      <div class="mid">
        <h1>Read the full report and download the dataset.</h1>
        <p class="cta-btn">artometrics.com →</p>
      </div>
      <p class="brand">Artometrics</p>`,
  },
];

const deck = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>IG zine — ${esc(post.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;700&display=swap">
<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/chomsky">
<style>
  @page { size: 1080px 1350px; margin: 0; }
  body { margin: 0; font-family: 'DM Sans', sans-serif; background: #E5E5E5; }
  .slide {
    width: 1080px; height: 1350px; box-sizing: border-box;
    padding: 80px; display: flex; flex-direction: column; justify-content: space-between;
    page-break-after: always;
  }
  .slide.dark { background: #000000; color: #FFFFFF; }
  .slide.light { background: #FFFFFF; color: #000000; border: 2px solid #000; }
  .kicker {
    font-family: 'DM Mono', monospace; font-size: 18px; letter-spacing: 0.08em;
    text-transform: uppercase; color: #C0392B; margin: 0;
  }
  .slide.dark .kicker { color: #D9251B; }
  h1 {
    font-family: 'DM Mono', monospace; font-weight: 500; font-size: 72px;
    line-height: 1; text-transform: uppercase; letter-spacing: -0.01em; margin: 0;
  }
  .dek {
    font-family: 'DM Sans', sans-serif; font-size: 24px; color: #525252;
    margin-top: 28px; max-width: 820px; line-height: 1.4;
  }
  .slide.dark .dek { color: #E5E5E5; }
  .rule { height: 4px; width: 140px; background: #D9251B; margin-top: 36px; }
  .chart {
    border: 2px solid currentColor; margin-top: 40px; height: 280px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 16px; color: #525252;
  }
  .brand {
    font-family: 'Chomsky', serif; font-size: 28px; margin: 0;
  }
  .cta-btn {
    font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500;
    background: #D9251B; color: #fff; display: inline-block;
    padding: 20px 32px; margin-top: 44px;
  }
</style>
</head>
<body>
${slides
  .map(
    (s) =>
      `<section class="slide ${s.tone}" data-title="${esc(s.title)}">${s.html}</section>`,
  )
  .join("\n")}
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
      designSystem: "docs/design-system",
    },
    null,
    2,
  ) + "\n",
);

console.log(`IG zine packed → docs/content-os/zines/${slug}/`);
console.log(`Open slides.html in a browser (1080×1350) and export PNGs per slide.`);
