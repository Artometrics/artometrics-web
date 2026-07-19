#!/usr/bin/env node
/**
 * Sync READMITTED assets from the monorepo article home into public/.
 *
 * Source of truth: articles/readmitted/
 * Does not clone external GitHub article repos.
 *
 * Usage:
 *   node scripts/sync-readmitted.mjs
 *   npm run sync:readmitted
 *   npm run sync:readmitted -- --render   # also run R chart export first
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLE = path.join(ROOT, "articles/readmitted");
const DATA_SRC = path.join(ARTICLE, "data");
const CHARTS_SRC = path.join(ARTICLE, "charts");
const HERO_SRC = path.join(ARTICLE, "hero.jpg");

const PUBLIC_IMG = path.join(
  ROOT,
  "public/images/content/articles/readmitted/charts",
);
const PUBLIC_HERO_DIR = path.join(
  ROOT,
  "public/images/content/articles/readmitted",
);
const PUBLIC_DATA = path.join(ROOT, "public/data/articles/readmitted");
const PUBLIC_CHARTS = path.join(PUBLIC_DATA, "charts");
const PUBLIC_CSV = path.join(PUBLIC_DATA, "data");

const shouldRender = process.argv.includes("--render");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`skip missing: ${path.relative(ROOT, src)}`);
    return false;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`copied ${path.relative(ROOT, src)} → ${path.relative(ROOT, dest)}`);
  return true;
}

function copyGlob(srcDir, destDir, pattern) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`skip missing dir: ${path.relative(ROOT, srcDir)}`);
    return 0;
  }
  ensureDir(destDir);
  const files = fs.readdirSync(srcDir).filter((name) => pattern.test(name));
  for (const name of files) {
    fs.copyFileSync(path.join(srcDir, name), path.join(destDir, name));
    console.log(
      `copied ${path.relative(ROOT, path.join(srcDir, name))} → ${path.relative(ROOT, path.join(destDir, name))}`,
    );
  }
  return files.length;
}

if (!fs.existsSync(ARTICLE)) {
  console.error("Missing articles/readmitted/ — create the monorepo article home first.");
  process.exit(1);
}

if (shouldRender) {
  console.log("Rendering charts via R…");
  execSync("Rscript scripts/render-readmitted-charts.R", {
    cwd: ROOT,
    stdio: "inherit",
  });
}

ensureDir(PUBLIC_IMG);
ensureDir(PUBLIC_CHARTS);
ensureDir(PUBLIC_CSV);
ensureDir(PUBLIC_HERO_DIR);

const csvCount = copyGlob(DATA_SRC, PUBLIC_CSV, /\.csv$/i);
const pngCount = copyGlob(CHARTS_SRC, PUBLIC_IMG, /\.png$/i);
const jsonCount = copyGlob(CHARTS_SRC, PUBLIC_CHARTS, /\.plotly\.json$/i);

// Also keep PNG copies under public data charts for parity with R export
copyGlob(CHARTS_SRC, PUBLIC_CHARTS, /\.png$/i);

copyFile(HERO_SRC, path.join(PUBLIC_HERO_DIR, "hero.jpg"));
const heroPng = path.join(ARTICLE, "hero.png");
if (fs.existsSync(heroPng)) {
  copyFile(heroPng, path.join(PUBLIC_HERO_DIR, "hero.png"));
}

console.log(
  `\nREADMITTED sync complete: ${csvCount} CSV, ${pngCount} PNG, ${jsonCount} Plotly JSON`,
);
console.log("Published body: src/content/blog/readmitted.md (edit in place; not overwritten by this sync)");
