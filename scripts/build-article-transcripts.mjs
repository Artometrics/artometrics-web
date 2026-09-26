#!/usr/bin/env node
/**
 * Build plain-text narration transcripts for every published report (or one slug).
 * Output: public/exports/transcripts/<slug>.txt
 *
 * Uses the same speech-oriented stripping as cos:narration-script (charts/method
 * dropped by default). Then refresh downloads manifest:
 *
 *   npm run transcripts:build
 *   npm run transcripts:build -- --slug readmitted
 *   npm run cos:downloads
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NARRATION = join(ROOT, "scripts/content-os/narration-script.mjs");
const OUT_DIR = "public/exports/transcripts";

const args = process.argv.slice(2);
const slugFlags = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--slug" && args[i + 1]) {
    slugFlags.push(args[i + 1]);
    i += 1;
  }
}
const keepMethod = args.includes("--keep-method");
const keepFacts = args.includes("--keep-facts");

const blogPath = join(ROOT, "src/generated/blog.json");
if (!existsSync(blogPath)) {
  console.error("Missing src/generated/blog.json — run npm run content first.");
  process.exit(1);
}

const blog = JSON.parse(readFileSync(blogPath, "utf8"));
const slugs = slugFlags.length
  ? slugFlags
  : blog.filter((p) => !p.draft).map((p) => p.slug);

let ok = 0;
for (const slug of slugs) {
  const md = join(ROOT, "src/content/blog", `${slug}.md`);
  if (!existsSync(md)) {
    console.warn(`Skip ${slug}: no markdown`);
    continue;
  }
  const extra = [
    "--slug",
    slug,
    "--out-dir",
    OUT_DIR,
    ...(keepMethod ? ["--keep-method"] : []),
    ...(keepFacts ? ["--keep-facts"] : []),
  ];
  try {
    execFileSync(process.execPath, [NARRATION, ...extra], {
      cwd: ROOT,
      stdio: "inherit",
    });
    ok += 1;
  } catch {
    console.error(`Failed: ${slug}`);
    process.exitCode = 1;
  }
}

console.log(`Transcripts: ${ok}/${slugs.length} → ${OUT_DIR}/`);
console.log("Next: npm run cos:downloads");
