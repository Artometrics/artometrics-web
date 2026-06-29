#!/usr/bin/env node
/**
 * Download Ghost CDN images listed in docs/image-manifest.md
 * Usage: node scripts/download-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(ROOT, "docs/image-manifest.md");
const PUBLIC = path.join(ROOT, "public");

const raw = fs.readFileSync(MANIFEST, "utf8");
const rowRe = /\|\s*`(https:\/\/artometrics\.com[^`]+)`\s*\|\s*`(\/images\/content\/[^`]+)`\s*\|/g;

const entries = [];
let match;
while ((match = rowRe.exec(raw)) !== null) {
  entries.push({ url: match[1], local: match[2] });
}

console.log(`Found ${entries.length} images to download`);

let ok = 0;
let skipped = 0;
let failed = 0;

for (const { url, local } of entries) {
  const dest = path.join(PUBLIC, local);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    skipped++;
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    ok++;
    if (ok % 20 === 0) console.log(`  downloaded ${ok}...`);
  } catch (err) {
    console.error(`FAIL ${url}: ${err.message}`);
    failed++;
  }
}

console.log(`Done: ${ok} downloaded, ${skipped} skipped, ${failed} failed`);
