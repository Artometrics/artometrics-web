#!/usr/bin/env node
/**
 * Idempotent repair: one closed art-back-matter block before </main> or Files.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const BLOG_DIR = join(fileURLToPath(import.meta.url), "../../src/content/blog");

/** Keep the first h3 block per id; drop duplicate merge artifacts. */
function dedupeH3Blocks(content, id) {
  const re = new RegExp(
    `<h3\\s+id="${id}"[\\s\\S]*?(?=<h3\\s|<\\/section>|$)`,
    "gi",
  );
  let keep = true;
  return content.replace(re, (match) => {
    if (keep) {
      keep = false;
      return match;
    }
    return "";
  });
}

function dedupeBackMatter(content) {
  let out = content;
  for (const id of ["data-and-method", "sources", "references"]) {
    out = dedupeH3Blocks(out, id);
  }
  out = out.replace(/<\/p><h3/gi, "</p>\n<h3");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

function repairBody(body) {
  const start = body.indexOf('<section class="art-back-matter">');
  if (start === -1) return body;

  const mainEnd = body.indexOf("</main>", start);
  const filesIdx = body.search(/<h2[^>]*id="files"/i);
  let end = mainEnd >= 0 ? mainEnd : body.length;
  if (filesIdx >= 0 && filesIdx < end) end = filesIdx;

  const before = body.slice(0, start);
  const after = body.slice(end);
  const chunk = body.slice(start, end);
  const content = chunk
    .replace(/<section class="art-back-matter">\s*/gi, "")
    .replace(/<\/section>\s*/gi, "")
    .trim();

  if (!content) return body;

  const deduped = dedupeBackMatter(content);
  const fixed = `<section class="art-back-matter">\n${deduped}\n</section>\n`;
  return before + fixed + after;
}

let n = 0;
for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
  const path = join(BLOG_DIR, file);
  const raw = readFileSync(path, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  if (!raw.startsWith("---") || fmEnd === -1) continue;
  const head = raw.slice(0, fmEnd + 3);
  const body = raw.slice(fmEnd + 3).replace(/^\n/, "");
  const fixed = repairBody(body);
  if (fixed !== body) {
    writeFileSync(path, `${head}\n${fixed.endsWith("\n") ? fixed : `${fixed}\n`}`);
    n += 1;
  }
}
console.log(`Repaired ${n} blog files.`);
