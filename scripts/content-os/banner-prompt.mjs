#!/usr/bin/env node
/**
 * Print (or write) a Higgsfield-ready banner prompt from a brief.
 *
 * Usage:
 *   node scripts/content-os/banner-prompt.mjs --brief docs/content-os/briefs/foo.json
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return null;
  return process.argv[i + 1];
}

const briefPath = arg("brief");
if (!briefPath) {
  console.error("Missing --brief");
  process.exit(1);
}
const absolute = briefPath.startsWith("/") ? briefPath : join(ROOT, briefPath);
const brief = JSON.parse(readFileSync(absolute, "utf8"));

const prompt = [
  `Artometrics editorial hero banner, 16:9 documentary magazine still.`,
  `Topic: ${brief.workingTitle || brief.title}. Desk: ${brief.desk}.`,
  `Primary keyword context (do not render as text): ${brief.primaryKeyword}.`,
  `Mood: ${brief.banner?.mood || "cream paper, spare red accent, quiet atmosphere"}.`,
  `Subjects: ${brief.banner?.subjects || "topic-relevant objects or place"}.`,
  `Color: cream/paper neutrals, charcoal, sparingly Artometrics red #C0392B.`,
  `Avoid: ${brief.banner?.avoid || "logos, on-image text, charts, purple gradients, stickers"}.`,
  `No typography. No UI. Photoreal editorial.`,
].join(" ");

console.log(prompt);
