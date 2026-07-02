#!/usr/bin/env node
/**
 * Scaffold an Artometrics article GitHub repo layout locally.
 *
 * Usage:
 *   node scripts/scaffold-article-repo.mjs --repo lego --slug lego-database --desk culture --title "LEGO Database"
 *   node scripts/scaffold-article-repo.mjs --batch-from-site
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const PUBLIC_DATA = path.join(ROOT, "public/data/articles");
const PUBLIC_IMG = path.join(ROOT, "public/images/content/articles");
const SCAFFOLD_ROOT = path.join(ROOT, ".cache/article-scaffolds");
const R_HELPERS = path.join(ROOT, "scripts/r");
const REPO_MAP_PATH = path.join(ROOT, "scripts/sync-github-articles.mjs");

const EXISTING_REPOS = new Set([
  "readmitted",
  "anime",
  "coffee",
  "franchise",
  "imperial",
  "giant",
  "h3",
  "warrior",
  "caesar",
  "pokemon",
]);

function parseArgs(argv) {
  const args = {
    repo: null,
    slug: null,
    desk: "culture",
    title: null,
    batch: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--batch-from-site") args.batch = true;
    else if (arg === "--repo") args.repo = argv[++i];
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--desk") args.desk = argv[++i];
    else if (arg === "--title") args.title = argv[++i];
  }
  return args;
}

function singularRepoName(slug) {
  const base = slug
    .replace(/-the-artometrics-of-.+$/i, "")
    .replace(/-the-psychonomics-of-.+$/i, "")
    .replace(/-the-artometrics-of-.+$/i, "");
  return base.split("-")[0] === base ? base : base;
}

function readFrontmatter(slug) {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(mdPath)) return null;
  const raw = fs.readFileSync(mdPath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fm = match[1];
  const title = fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1];
  const description = fm.match(/^description:\s*"?([^"\n]+)"?/m)?.[1];
  const tags = fm.match(/^tags:\s*\[([^\]]+)\]/m)?.[1]?.split(",").map((t) => t.trim().replace(/['"]/g, ""));
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

function writeReadme(repoDir, { repo, slug, title, desk, description }) {
  const content = `# ${title ?? repo}

**Desk:** ${desk} · **Live report:** https://artometrics.com/${slug}/

${description ?? "Artometrics data report on culture, power, and the creative economy."}

## Repository layout

\`\`\`text
${repo}/
  ${repo}.qmd
  README.md
  artometrics.css
  art-head.html
  data/
  charts/
\`\`\`

## Render

\`\`\`bash
quarto render ${repo}.qmd --to html
\`\`\`

Charts export as \`charts/chartN_*.png\` plus paired \`charts/chartN_*.plotly.json\` via \`save_art_chart()\` in \`scripts/r/artometrics_theme.R\`.

## Methodology

See https://artometrics.com/methodology/
`;
  fs.writeFileSync(path.join(repoDir, "README.md"), content, "utf8");
}

function writeQmdStub(repoDir, { repo, title, description }) {
  const qmd = `---
title: "${title ?? repo}"
format:
  html:
    toc: true
    toc-depth: 2
    toc-title: "IN THIS REPORT"
    theme: cosmo
    css: artometrics.css
    include-in-header: art-head.html
execute:
  echo: true
  warning: false
  message: false
---

\`\`\`{r setup}
source("scripts/r/artometrics_theme.R")
dir.create("charts", showWarnings = FALSE)
\`\`\`

${description ?? "Artometrics report — replace this stub with franchise-grade analysis."}

## FAST FACTS

## DATASET CONTEXT

## CHART 1

\`\`\`{r chart1}
# p1 <- ...
# save_art_chart(p1, "chart1_name", plotly_obj = p1_plotly)
\`\`\`

## LIMITATIONS

## EDITOR'S NOTE
`;
  fs.writeFileSync(path.join(repoDir, `${repo}.qmd`), qmd, "utf8");
}

function copyBrandAssets(repoDir) {
  const sample = path.join(ROOT, ".cache/article-repos/pokemon");
  for (const file of ["artometrics.css", "art-head.html"]) {
    const fromSample = path.join(sample, file);
    const fromScripts = path.join(ROOT, "scripts/templates", file);
    const src = fs.existsSync(fromSample) ? fromSample : fromScripts;
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(repoDir, file));
  }
  fs.mkdirSync(path.join(repoDir, "scripts/r"), { recursive: true });
  for (const file of fs.readdirSync(R_HELPERS)) {
    fs.copyFileSync(path.join(R_HELPERS, file), path.join(repoDir, "scripts/r", file));
  }
}

function scaffoldOne({ repo, slug, desk, title, description }) {
  const repoDir = path.join(SCAFFOLD_ROOT, repo);
  fs.mkdirSync(repoDir, { recursive: true });
  fs.mkdirSync(path.join(repoDir, "data"), { recursive: true });
  fs.mkdirSync(path.join(repoDir, "charts"), { recursive: true });

  const dataSrc = path.join(PUBLIC_DATA, slug);
  const imgSrc = path.join(PUBLIC_IMG, slug, "charts");
  const copiedData = copyDir(dataSrc, path.join(repoDir, "data"));
  const copiedCharts = copyDir(imgSrc, path.join(repoDir, "charts"));

  writeReadme(repoDir, { repo, slug, title, desk, description });
  if (!fs.existsSync(path.join(repoDir, `${repo}.qmd`))) {
    writeQmdStub(repoDir, { repo, title, description });
  }
  copyBrandAssets(repoDir);

  return { repoDir, copiedData, copiedCharts };
}

function listSiteSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function main() {
  const args = parseArgs(process.argv);

  if (args.batch) {
    fs.mkdirSync(SCAFFOLD_ROOT, { recursive: true });
    let count = 0;
    for (const slug of listSiteSlugs()) {
      const repo = singularRepoName(slug);
      if (EXISTING_REPOS.has(repo)) continue;
      const meta = readFrontmatter(slug);
      if (!meta) continue;
      const desk = meta.tags?.[0] ?? "culture";
      scaffoldOne({
        repo,
        slug,
        desk,
        title: meta.title,
        description: meta.description,
      });
      count++;
      console.log(`Scaffolded ${repo} <- ${slug}`);
    }
    console.log(`Done. ${count} repos scaffolded under ${SCAFFOLD_ROOT}`);
    return;
  }

  if (!args.repo || !args.slug) {
    console.error("Usage: node scripts/scaffold-article-repo.mjs --repo NAME --slug SITE_SLUG [--desk culture] [--title TITLE]");
    process.exit(1);
  }

  const meta = readFrontmatter(args.slug);
  const result = scaffoldOne({
    repo: args.repo,
    slug: args.slug,
    desk: meta?.tags?.[0] ?? args.desk,
    title: args.title ?? meta?.title ?? args.repo,
    description: meta?.description,
  });
  console.log(`Scaffolded ${result.repoDir} (${result.copiedData} data files, ${result.copiedCharts} chart files)`);
}

main();
