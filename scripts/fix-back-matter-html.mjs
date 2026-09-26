#!/usr/bin/env node
/** Repair </main></div></section> ordering after back-matter merge. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const BLOG_DIR = join(fileURLToPath(import.meta.url), "../../src/content/blog");

function fixBody(body) {
  let out = body.replace(/\r\n/g, "\n");
  out = out.replace(/\n<\/section>\s*$/i, "");
  const beforeMain = out.split(/<\/main>/i)[0] ?? "";
  const opens = (beforeMain.match(/<section class="art-back-matter">/gi) || []).length;
  const closes = (beforeMain.match(/<\/section>/gi) || []).length;
  if (opens > closes && out.includes("</main>")) {
    out = out.replace(/<\/main>/i, "</section>\n</main>");
  }
  return out;
}

let n = 0;
for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
  const path = join(BLOG_DIR, file);
  const raw = readFileSync(path, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  if (!raw.startsWith("---") || fmEnd === -1) continue;
  const head = raw.slice(0, fmEnd + 3);
  const body = raw.slice(fmEnd + 3).replace(/^\n/, "");
  const fixed = fixBody(body);
  if (fixed !== body) {
    writeFileSync(path, `${head}\n${fixed.endsWith("\n") ? fixed : `${fixed}\n`}`);
    n += 1;
  }
}
console.log(`Repaired ${n} blog files.`);
