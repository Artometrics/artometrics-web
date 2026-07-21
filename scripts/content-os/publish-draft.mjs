#!/usr/bin/env node
/**
 * Publish a Content OS draft into src/content/blog and rebuild generated JSON.
 *
 * Usage:
 *   node scripts/content-os/publish-draft.mjs --slug streaming-catalog-power
 *   node scripts/content-os/publish-draft.mjs --slug streaming-catalog-power --undraft
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return null;
  return process.argv[i + 1];
}

const slug = arg("slug");
const undraft = process.argv.includes("--undraft");
if (!slug) {
  console.error("Missing --slug");
  process.exit(1);
}

const draftArticle = join(ROOT, "docs/content-os/drafts", slug, "article.md");
if (!existsSync(draftArticle)) {
  console.error(`Missing draft: ${draftArticle}`);
  process.exit(1);
}

let md = readFileSync(draftArticle, "utf8");
if (undraft) {
  md = md.replace(/draft:\s*true/, "draft: false");
}

const out = join(ROOT, "src/content/blog", `${slug}.md`);
writeFileSync(out, md);

const briefPath = join(ROOT, "docs/content-os/briefs", `${slug}.json`);
if (existsSync(briefPath)) {
  const brief = JSON.parse(readFileSync(briefPath, "utf8"));
  brief.status = undraft ? "published" : "draft";
  brief.updatedAt = new Date().toISOString().slice(0, 10);
  writeFileSync(briefPath, `${JSON.stringify(brief, null, 2)}\n`);
}

const manifestPath = join(ROOT, "docs/content-os/drafts", slug, "manifest.json");
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.status = undraft ? "published" : "draft";
  manifest.publishedPath = `src/content/blog/${slug}.md`;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

execSync("node scripts/build-content.mjs", { cwd: ROOT, stdio: "inherit" });
execSync("node scripts/content-os/aeo-pack.mjs", {
  cwd: ROOT,
  stdio: "inherit",
});

console.log(`Published ${out}${undraft ? " (live)" : " (draft:true)"}`);
