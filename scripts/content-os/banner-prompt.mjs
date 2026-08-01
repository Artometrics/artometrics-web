#!/usr/bin/env node
/**
 * Print (or write) a Higgsfield-ready editorial illustration banner prompt from a brief.
 *
 * Formula (Artometrics house style):
 *   editorial illustration, [one surreal overscale metaphor], flat graphic shapes,
 *   [topic palette], heavy grain texture overlay,
 *   Bloomberg Businessweek / The Economist / The Atlantic magazine illustration style,
 *   bold asymmetric composition, surreal conceptual metaphor, no text, 16:9
 *
 * Sports: use team colors + icons. Themes: subject symbols / styles.
 * Avoid: on-image text, logos, charts, photoreal cream/red documentary stills, cobalt healthcare look.
 *
 * Usage:
 *   node scripts/content-os/banner-prompt.mjs --brief docs/content-os/briefs/foo.json
 *   node scripts/content-os/banner-prompt.mjs --slug giants
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BANNER_METAPHORS,
  buildEditorialPrompt,
} from "./editorial-banner-prompts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return null;
  return process.argv[i + 1];
}

const slugArg = arg("slug");
const briefPath = arg("brief");

if (slugArg) {
  // Resolve slug aliases (short franchise names → full article slugs)
  const aliases = {
    giants: "giant-the-artometrics-of-a-san-francisco-dynasty",
    yankees: "yankees-the-artometrics-of-baseballs-empire",
    dodgers: "dodgers-the-artometrics-of-baseballs-modern-machine",
    padres: "padres-the-artometrics-of-paying-for-october",
    patriots: "patriots-the-artometrics-of-the-system-dynasty",
    cowboys: "cowboys-the-artometrics-of-americas-team",
    lakers: "lakers-the-artometrics-of-basketball-glamour",
    celtics: "celtics-the-artometrics-of-institutional-winning",
    warriors: "warrior-the-artometrics-of-a-golden-state-dynasty",
  };
  const slug = aliases[slugArg] || slugArg;
  const entry = BANNER_METAPHORS[slug];
  if (!entry) {
    console.error(`No editorial metaphor for slug: ${slug}`);
    process.exit(1);
  }
  console.log(buildEditorialPrompt(entry));
  process.exit(0);
}

if (!briefPath) {
  console.error("Missing --brief or --slug");
  process.exit(1);
}

const absolute = briefPath.startsWith("/") ? briefPath : join(ROOT, briefPath);
const brief = JSON.parse(readFileSync(absolute, "utf8"));
const slug = brief.slug;

// Prefer curated metaphor library when we have one for this slug
if (slug && BANNER_METAPHORS[slug]) {
  console.log(buildEditorialPrompt(BANNER_METAPHORS[slug]));
  process.exit(0);
}

const metaphor =
  brief.banner?.metaphor ||
  brief.banner?.subjects ||
  "one oversized surreal conceptual metaphor for the topic, tiny silhouetted figures only";
const palette =
  brief.banner?.palette ||
  "topic-specific editorial palette (not generic cream/red documentary)";
const styleNote = brief.banner?.style || null;
const avoid =
  brief.banner?.avoid ||
  "logos, on-image text, charts, readable typography, photoreal empty rooms, cobalt healthcare look, purple gradients";

const prompt = buildEditorialPrompt({
  metaphor: `${metaphor} (topic: ${brief.workingTitle || brief.title}; desk: ${brief.desk || "editorial"})`,
  palette,
  style: styleNote || undefined,
});

console.log(prompt);
console.error(`# avoid: ${avoid}`);
