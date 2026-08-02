#!/usr/bin/env node
/**
 * Pack a Kruger-style Instagram carousel (1080×1080) from a published report.
 * Matches docs/design-handoff …/ig-carousel-live-content and design-system IG Carousel.
 *
 * Usage:
 *   node scripts/content-os/pack-ig-kruger.mjs --slug beyonce-the-psychonomics-of-control
 *   node scripts/content-os/pack-ig-kruger.mjs --brand   # newsstand brand pack (no slug)
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return null;
  return process.argv[i + 1] ?? true;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SHARED_CSS = `/* Artometrics Kruger IG carousel — 1080×1080 */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.cdnfonts.com/css/chomsky');

* { box-sizing: border-box; }
html, body { margin: 0; background: #E5E5E5; font-family: 'DM Sans', sans-serif; }
.slide {
  width: 1080px; height: 1080px; position: relative;
  background: #000; overflow: hidden; page-break-after: always;
}
.mono { font-family: 'DM Mono', monospace; }
.wordmark { font-family: 'Chomsky', serif; color: #fff; }
.photo {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; filter: grayscale(1) contrast(1.15);
}
.photo-fallback {
  position: absolute; inset: 0; background: #1a1a1a;
}
.claim {
  position: absolute; top: 60px; left: 60px;
  background: #C0392B; padding: 22px 32px; max-width: 900px;
}
.claim .desk {
  font-family: 'DM Mono', monospace; font-size: 14px; letter-spacing: 0.06em;
  text-transform: uppercase; color: #fff; margin-bottom: 8px;
}
.claim .title {
  font-family: 'DM Mono', monospace; font-weight: 700; font-size: 44px;
  line-height: 1.05; color: #fff; text-transform: uppercase; margin: 0;
}
.brand-foot {
  position: absolute; bottom: 48px; left: 60px;
  font-family: 'Chomsky', serif; font-size: 28px; color: #fff; margin: 0;
}
.solid {
  padding: 80px; display: flex; flex-direction: column; justify-content: space-between;
  height: 100%; box-sizing: border-box;
}
.kicker {
  font-family: 'DM Mono', monospace; font-size: 18px; letter-spacing: 0.08em;
  text-transform: uppercase; color: #D9251B; margin: 0;
}
.hero {
  font-family: 'DM Mono', monospace; font-weight: 700; font-size: 72px;
  line-height: 0.98; color: #fff; text-transform: uppercase; margin: 0;
}
.cta {
  font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500;
  background: #D9251B; color: #fff; display: inline-block;
  padding: 18px 30px; margin-top: 44px;
}
.rule { height: 4px; width: 120px; background: #D9251B; margin-top: 28px; }
`;

function writeDeck(outDir, title, slidesHtml, meta) {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "shared.css"), SHARED_CSS);
  writeFileSync(
    join(outDir, "slides.html"),
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(title)}</title>
<link rel="stylesheet" href="./shared.css" />
</head>
<body>
${slidesHtml}
</body>
</html>
`,
  );
  writeFileSync(
    join(outDir, "pack.json"),
    JSON.stringify({ ...meta, format: "kruger-1080", files: ["slides.html", "shared.css", "caption.txt"] }, null, 2) +
      "\n",
  );
}

function packBrand() {
  const blog = JSON.parse(readFileSync(join(ROOT, "src/generated/blog.json"), "utf8"))
    .filter((p) => !p.draft && p.pubDate && p.heroImage)
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .slice(0, 4);

  const slides = [
    `<section class="slide">
  <div class="solid">
    <p class="kicker">Newsstand</p>
    <div>
      <h1 class="hero">Pick a cover. Reports on culture, power, and the creative economy.</h1>
      <div class="rule"></div>
    </div>
    <p class="wordmark" style="font-size:36px;position:static">Artometrics</p>
  </div>
</section>`,
    ...blog.map((p) => {
      const desk = (p.tags?.[0] || "culture").toUpperCase();
      const sub = p.tags?.[1] ? ` · ${String(p.tags[1]).replace(/-/g, " ")}` : "";
      const hero = p.heroImage?.startsWith("http")
        ? p.heroImage
        : `https://artometrics.com${p.heroImage}`;
      return `<section class="slide">
  <div class="photo-fallback"></div>
  <img class="photo" src="${esc(hero)}" alt="" />
  <div class="claim">
    <div class="desk">${esc(desk)}${esc(sub)}</div>
    <h2 class="title">${esc(p.title)}</h2>
  </div>
  <p class="brand-foot">Artometrics</p>
</section>`;
    }),
    `<section class="slide">
  <div class="solid">
    <p class="kicker">All reports</p>
    <div>
      <h1 class="hero">Let's read something that performs.</h1>
      <span class="cta">artometrics.com/welcome →</span>
    </div>
    <p class="wordmark" style="font-size:32px;position:static">Artometrics</p>
  </div>
</section>`,
  ];

  const outDir = join(ROOT, "docs/content-os/zines/_brand-kruger");
  writeDeck(outDir, "IG Carousel — Artometrics Newsstand", slides.join("\n"), {
    slug: "_brand-kruger",
    slides: slides.length,
    canonical: "https://artometrics.com/welcome",
  });

  writeFileSync(
    join(outDir, "caption.txt"),
    [
      "Pick a cover. Artometrics — data reports on culture, power, and the creative economy.",
      "",
      "Link in bio → https://artometrics.com/welcome",
      "",
      "#Artometrics #DataJournalism #CreativeEconomy #Newsstand",
      "",
      "Sources cited in each report.",
    ].join("\n"),
  );

  console.log(`Kruger brand carousel → docs/content-os/zines/_brand-kruger/`);
}

function packSlug(slug) {
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
  const sub = post.tags?.[1] ? String(post.tags[1]).replace(/-/g, " ") : "";
  const coverClaim =
    brief?.distribution?.linkedinHook ||
    post.tldr ||
    post.description.split(/[.!?]/)[0] ||
    post.title;

  const facts = [];
  const factRe =
    /<span class="fact-number">([^<]+)<\/span>\s*<span class="fact-label">([^<]+)<\/span>/gi;
  let m;
  while ((m = factRe.exec(post.body || "")) && facts.length < 3) {
    facts.push({ n: m[1].trim(), label: m[2].trim() });
  }
  if (!facts.length) {
    const kp = Array.isArray(post.keyPoints) ? post.keyPoints.slice(0, 3) : [];
    if (kp.length) {
      for (const point of kp) {
        facts.push({ n: `0${facts.length + 1}`, label: String(point) });
      }
    } else {
      facts.push({ n: "01", label: post.description.slice(0, 140) });
    }
  }

  const hero = post.heroImage
    ? post.heroImage.startsWith("http")
      ? post.heroImage
      : `https://artometrics.com${post.heroImage}`
    : "";

  const slides = [
    `<section class="slide">
  <div class="solid">
    <p class="kicker">${esc(desk.toUpperCase())}${sub ? ` · ${esc(sub)}` : ""}</p>
    <div>
      <h1 class="hero" style="font-size:64px">${esc(coverClaim)}</h1>
      <div class="rule"></div>
    </div>
    <p class="wordmark" style="font-size:36px;position:static">Artometrics</p>
  </div>
</section>`,
    `<section class="slide">
  <div class="photo-fallback"></div>
  ${hero ? `<img class="photo" src="${esc(hero)}" alt="" />` : ""}
  <div class="claim">
    <div class="desk">${esc(desk.toUpperCase())}${sub ? ` · ${esc(sub)}` : ""}</div>
    <h2 class="title">${esc(post.title)}</h2>
  </div>
  <p class="brand-foot">Artometrics</p>
</section>`,
    ...facts.map(
      (f, i) => `<section class="slide">
  <div class="solid" style="background:${i % 2 === 0 ? "#FFFFFF" : "#000000"};color:${i % 2 === 0 ? "#000" : "#fff"}">
    <p class="kicker" style="color:#C0392B">Finding ${String(i + 1).padStart(2, "0")}</p>
    <div>
      <h1 class="hero" style="font-size:88px;color:inherit">${esc(f.n)}</h1>
      <p class="mono" style="font-size:26px;line-height:1.35;margin-top:28px;max-width:860px;text-transform:none;font-weight:400;color:${i % 2 === 0 ? "#525252" : "#E5E5E5"}">${esc(f.label)}</p>
    </div>
    <p class="wordmark" style="font-size:28px;position:static;color:inherit">Artometrics</p>
  </div>
</section>`,
    ),
    `<section class="slide">
  <div class="solid">
    <p class="kicker">Get the data</p>
    <div>
      <h1 class="hero" style="font-size:64px">Read the full report.</h1>
      <span class="cta">artometrics.com/${esc(slug)} →</span>
    </div>
    <p class="wordmark" style="font-size:32px;position:static">Artometrics</p>
  </div>
</section>`,
  ];

  const outDir = join(ROOT, "docs/content-os/zines", `${slug}-kruger`);
  writeDeck(outDir, `IG Carousel — ${post.title}`, slides.join("\n"), {
    slug,
    desk,
    slides: slides.length,
    canonical: `https://artometrics.com/${slug}`,
  });

  const hashtags = [
    "#Artometrics",
    `#${desk.charAt(0).toUpperCase()}${desk.slice(1)}Desk`,
    "#DataJournalism",
    "#CreativeEconomy",
  ].join(" ");

  writeFileSync(
    join(outDir, "caption.txt"),
    [
      brief?.distribution?.linkedinHook || post.description,
      "",
      `Full report: https://artometrics.com/${slug}`,
      `Link in bio: https://artometrics.com/welcome`,
      "",
      hashtags,
      "",
      "Sources cited in the report. Artometrics — data reports on culture, power, and the creative economy.",
    ].join("\n"),
  );

  console.log(`Kruger carousel → docs/content-os/zines/${slug}-kruger/`);
  console.log(`Open slides.html (1080×1080) and export PNGs per slide.`);
}

if (hasFlag("brand")) {
  packBrand();
} else {
  const slug = arg("slug");
  if (!slug || slug === true) {
    console.error("Missing --slug <slug> (or pass --brand for the newsstand pack)");
    process.exit(1);
  }
  packSlug(slug);
}
