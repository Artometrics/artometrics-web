#!/usr/bin/env node
/**
 * Materialize articles/<slug>/ Quarto homes from blog frontmatter + public assets.
 *
 * Usage:
 *   node scripts/materialize-articles.mjs
 *   node scripts/materialize-articles.mjs --slug pokemon
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const ARTICLES_DIR = path.join(ROOT, "articles");
const PUBLIC_DATA = path.join(ROOT, "public/data/articles");
const PUBLIC_IMG = path.join(ROOT, "public/images/content/articles");
const TEMPLATE_YML = path.join(ARTICLES_DIR, "_quarto.report.yml");

const SKIP_TOP = new Set(["tools", "styles", "assets", "R", "figures", "outputs"]);

/** Slugs with reproducible Quarto/R source — do not replace main .qmd here. */
const TIER_A_SLUGS = new Set([
  "readmitted",
  "anime",
  "pokemon",
  "coffee-the-artometrics-of-java",
  "franchise",
  "imperial",
  "giant-the-artometrics-of-a-san-francisco-dynasty",
  "h3-the-artometrics-of-a-youtube-dynasty",
  "warrior-the-artometrics-of-a-golden-state-dynasty",
  "caesar-the-psychonomics-of-emperor-julius",
]);

function parseArgs(argv) {
  const slug = argv.includes("--slug") ? argv[argv.indexOf("--slug") + 1] : null;
  return { slug };
}

function readFrontmatter(slug) {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(mdPath)) return null;
  const raw = fs.readFileSync(mdPath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fm = match[1];
  const title = fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1];
  const description = fm.match(/^description:\s*>-\s*\n([\s\S]*?)(?=\n[a-zA-Z_]+:|\n---)/m)?.[1]?.replace(/\n\s+/g, " ").trim()
    ?? fm.match(/^description:\s*"?([^"\n]+)"?/m)?.[1];
  const tagsBlock = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n)+)/m);
  let tags = [];
  if (tagsBlock) {
    tags = tagsBlock[1].match(/-\s+(\S+)/g)?.map((l) => l.replace(/^-\s+/, "")) ?? [];
  } else {
    const inline = fm.match(/^tags:\s*\[([^\]]+)\]/m)?.[1];
    if (inline) tags = inline.split(",").map((t) => t.trim().replace(/['"]/g, ""));
  }
  return { title, description, tags, mdPath };
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0;
  fs.mkdirSync(dest, { recursive: true });
  let n = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) n += copyDir(from, to);
    else {
      fs.copyFileSync(from, to);
      n++;
    }
  }
  return n;
}

function mainQmdName(slug) {
  return slug === "readmitted" ? "readmitted.qmd" : `${slug}.qmd`;
}

function writeQuartoYml(articleDir, mainQmd) {
  const base = fs.readFileSync(TEMPLATE_YML, "utf8");
  const yml = base.replace(
    /render:\s*\n\s*- index\.qmd/,
    `render:\n    - ${mainQmd}`,
  );
  fs.writeFileSync(path.join(articleDir, "_quarto.yml"), yml, "utf8");
}

function writeReadme(articleDir, { slug, title, desk, description }) {
  const mainQmd = mainQmdName(slug);
  const content = `# ${title ?? slug}

**Desk:** ${desk} · **Live:** https://artometrics.com/${slug}/

${description ?? "Artometrics data report."}

## Layout

\`\`\`text
${slug}/
  _quarto.yml
  ${mainQmd}
  data/
  charts/
  figures/
\`\`\`

\`\`\`bash
cd articles/${slug}
quarto render
npm run sync:article -- --slug ${slug}
\`\`\`
`;
  fs.writeFileSync(path.join(articleDir, "README.md"), content, "utf8");
}

function writeStubQmd(articleDir, slug, meta) {
  const mainQmd = mainQmdName(slug);
  const qmdPath = path.join(articleDir, mainQmd);
  if (fs.existsSync(qmdPath)) return false;
  const title = (meta.title ?? slug).replace(/"/g, '\\"');
  const body = `---
title: "${title}"
description: "${(meta.description ?? "").replace(/"/g, '\\"')}"
format:
  html:
    css: styles/report.css
execute:
  echo: false
  warning: false
---

${meta.description ?? "Artometrics report — run blog-html-to-qmd or author in Quarto."}

## FAST FACTS

## DATASET CONTEXT

## CHART 1

## LIMITATIONS

## EDITOR'S NOTE
`;
  fs.writeFileSync(qmdPath, body, "utf8");
  return true;
}

function copyHero(articleDir, slug) {
  const imgDir = path.join(PUBLIC_IMG, slug);
  if (!fs.existsSync(imgDir)) return 0;
  let n = 0;
  for (const name of ["hero.jpg", "hero.png", "hero.webp"]) {
    const src = path.join(imgDir, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(articleDir, name));
      n++;
    }
  }
  return n;
}

function mergePublicCharts(articleDir, slug) {
  const chartsDir = path.join(articleDir, "charts");
  fs.mkdirSync(chartsDir, { recursive: true });
  let n = 0;
  n += copyDir(path.join(PUBLIC_IMG, slug, "charts"), chartsDir);
  const dataCharts = path.join(PUBLIC_DATA, slug, "charts");
  if (fs.existsSync(dataCharts)) {
    for (const name of fs.readdirSync(dataCharts)) {
      const src = path.join(dataCharts, name);
      const dest = path.join(chartsDir, name);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        n++;
      }
    }
  }
  return n;
}

function materializeOne(slug) {
  const meta = readFrontmatter(slug);
  if (!meta) {
    console.warn(`skip (no blog): ${slug}`);
    return null;
  }
  const articleDir = path.join(ARTICLES_DIR, slug);
  fs.mkdirSync(articleDir, { recursive: true });
  fs.mkdirSync(path.join(articleDir, "data"), { recursive: true });
  fs.mkdirSync(path.join(articleDir, "charts"), { recursive: true });
  fs.mkdirSync(path.join(articleDir, "figures"), { recursive: true });

  const mainQmd = mainQmdName(slug);
  writeQuartoYml(articleDir, mainQmd);

  const desk = meta.tags?.[0] ?? "culture";
  writeReadme(articleDir, { slug, title: meta.title, desk, description: meta.description });

  const dataCopied = copyDir(path.join(PUBLIC_DATA, slug), path.join(articleDir, "data"));
  const chartsCopied = mergePublicCharts(articleDir, slug);
  const heroCopied = copyHero(articleDir, slug);

  let stub = false;
  if (!TIER_A_SLUGS.has(slug)) {
    stub = writeStubQmd(articleDir, slug, meta);
  } else if (!fs.existsSync(path.join(articleDir, mainQmd))) {
    stub = writeStubQmd(articleDir, slug, meta);
  }

  return { slug, dataCopied, chartsCopied, heroCopied, stub };
}

function listSlugs(filterSlug) {
  if (filterSlug) return [filterSlug];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function main() {
  const { slug: filterSlug } = parseArgs(process.argv);
  if (!fs.existsSync(TEMPLATE_YML)) {
    console.error("Missing articles/_quarto.report.yml");
    process.exit(1);
  }

  const results = [];
  for (const slug of listSlugs(filterSlug)) {
    const r = materializeOne(slug);
    if (r) {
      results.push(r);
      console.log(`materialized ${slug} (data files: ${r.dataCopied}, charts: ${r.chartsCopied}, hero: ${r.heroCopied}, stub: ${r.stub})`);
    }
  }
  console.log(`\nDone. ${results.length} article folder(s) under articles/`);
}

main();
