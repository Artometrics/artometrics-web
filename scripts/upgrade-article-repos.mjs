#!/usr/bin/env node
/**
 * Audit and upgrade Artometrics article GitHub repos locally.
 * Clones repos, checks chart PNG/JSON pairs, copies site assets into repos when missing.
 *
 * Usage: node scripts/upgrade-article-repos.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CACHE = path.join(ROOT, ".cache/article-repos");
const PUBLIC_DATA = path.join(ROOT, "public/data/articles");
const PUBLIC_IMG = path.join(ROOT, "public/images/content/articles");
const R_HELPERS = path.join(ROOT, "scripts/r");

const REPO_MAP = {
  readmitted: "readmitted",
  anime: "anime",
  coffee: "coffee-the-artometrics-of-java",
  franchise: "franchise",
  imperial: "imperial",
  giant: "giant-the-artometrics-of-a-san-francisco-dynasty",
  h3: "h3-the-artometrics-of-a-youtube-dynasty",
  warrior: "warrior-the-artometrics-of-a-golden-state-dynasty",
  caesar: "caesar-the-psychonomics-of-emperor-julius",
  pokemon: "pokemon",
};

function clone(repo) {
  const dest = path.join(CACHE, repo);
  fs.mkdirSync(CACHE, { recursive: true });
  if (fs.existsSync(path.join(dest, ".git"))) {
    execSync("git pull --ff-only", { cwd: dest, stdio: "inherit" });
  } else {
    execSync(
      `git clone --depth 1 https://github.com/Artometrics/${repo}.git "${dest}"`,
      { stdio: "inherit" }
    );
  }
  return dest;
}

function listChartBaseNames(dir) {
  if (!fs.existsSync(dir)) return [];
  const pngs = new Set(
    fs
      .readdirSync(dir)
      .filter((f) => /\.(png|webp|jpe?g)$/i.test(f))
      .map((f) => f.replace(/\.(png|webp|jpe?g)$/i, ""))
  );
  const jsons = new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".plotly.json"))
      .map((f) => f.replace(/\.plotly\.json$/, ""))
  );
  return { pngs, jsons };
}

function copyIfMissing(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

function syncSiteAssetsIntoRepo(repo, slug) {
  const repoCharts = path.join(CACHE, repo, "charts");
  fs.mkdirSync(repoCharts, { recursive: true });

  let copied = 0;
  for (const dir of [
    path.join(PUBLIC_IMG, slug, "charts"),
    path.join(PUBLIC_DATA, slug, "charts"),
  ]) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (copyIfMissing(path.join(dir, file), path.join(repoCharts, file))) copied++;
    }
  }

  const rDest = path.join(CACHE, repo, "scripts/r");
  fs.mkdirSync(rDest, { recursive: true });
  for (const file of fs.readdirSync(R_HELPERS)) {
    copyIfMissing(path.join(R_HELPERS, file), path.join(rDest, file));
  }

  return copied;
}

function audit(repo, slug) {
  const repoDir = path.join(CACHE, repo);
  const chartsDir = path.join(repoDir, "charts");
  const siteCharts = path.join(PUBLIC_DATA, slug, "charts");

  const repoCharts = listChartBaseNames(chartsDir);
  const siteChartNames = listChartBaseNames(siteCharts);

  const allNames = new Set([...repoCharts.pngs, ...repoCharts.jsons, ...siteChartNames.pngs, ...siteChartNames.jsons]);

  const missing = [];
  for (const name of allNames) {
    const hasRepoPng = repoCharts.pngs.has(name);
    const hasRepoJson = repoCharts.jsons.has(name);
    const hasSiteJson = siteChartNames.jsons.has(name);
    if (!hasRepoPng) missing.push(`${name}: missing PNG in repo`);
    if (!hasRepoJson && !hasSiteJson) missing.push(`${name}: missing plotly.json`);
  }

  return { repo, slug, chartCount: allNames.size, missing };
}

const report = [];

for (const [repo, slug] of Object.entries(REPO_MAP)) {
  clone(repo);
  const copied = syncSiteAssetsIntoRepo(repo, slug);
  const result = audit(repo, slug);
  result.copied = copied;
  report.push(result);
  console.log(
    `${repo}: ${result.chartCount} charts, ${result.missing.length} gaps, ${copied} assets copied from site`
  );
  if (result.missing.length) {
    for (const m of result.missing) console.log(`  - ${m}`);
  }
}

const outPath = path.join(ROOT, "docs/article-repo-audit.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`Wrote ${outPath}`);
