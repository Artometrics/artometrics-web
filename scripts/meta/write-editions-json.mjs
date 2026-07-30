#!/usr/bin/env node
/** Snapshot data/editions.ts → public/data/meta/editions.json + edition-crosswalk.json */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

const ROOT = process.cwd();

// Load via dynamic import of compiled-free approach: read and eval a JS mirror.
// We keep editions as TS; generate JSON by spawning tsx if available, else parse with a minimal strip.
async function main() {
  let EDITIONS;
  try {
    const mod = await import(pathToFileURL(path.join(ROOT, "data/editions.ts")).href);
    EDITIONS = mod.EDITIONS;
  } catch {
    // Fallback: require ts-node/register not guaranteed — use a hand-maintained sync via esbuild-register
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    try {
      require("tsx/cjs");
      const mod = require(path.join(ROOT, "data/editions.ts"));
      EDITIONS = mod.EDITIONS;
    } catch (e) {
      console.error("Cannot load data/editions.ts — install tsx or run via npx tsx");
      console.error(e.message);
      process.exit(1);
    }
  }

  const outDir = path.join(ROOT, "public/data/meta");
  fs.mkdirSync(outDir, { recursive: true });

  const slim = EDITIONS.map((e) => ({
    id: e.id,
    title: e.title,
    dek: e.dek,
    section: e.section,
    status: e.status,
    articleSlugs: e.articleSlugs,
    glueSlugs: e.glueSlugs,
    podcastIds: e.podcastIds ?? [],
    datasetIds: e.datasetIds ?? [],
  }));

  fs.writeFileSync(path.join(outDir, "editions.json"), JSON.stringify(slim, null, 2) + "\n");

  const crosswalk = {};
  for (const ed of slim) {
    for (const slug of [...ed.articleSlugs, ...ed.glueSlugs]) {
      if (!crosswalk[slug]) crosswalk[slug] = [];
      if (!crosswalk[slug].includes(ed.id)) crosswalk[slug].push(ed.id);
    }
  }
  fs.writeFileSync(
    path.join(outDir, "edition-crosswalk.json"),
    JSON.stringify(crosswalk, null, 2) + "\n",
  );
  console.log(`Wrote ${slim.length} editions → public/data/meta/editions.json`);
}

main();
