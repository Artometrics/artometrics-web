#!/usr/bin/env node
/**
 * Migrate blog posts to traditional sections + AEO titles,
 * and simplify article HTML (strip TOC / report scaffolding).
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = join(ROOT, "src/content/blog");
const MAP_PATH = join(ROOT, "scripts/content-os/traditional-aeo-map.json");

const SECTIONS = new Set([
  "sports",
  "movies-tv",
  "music",
  "culture",
  "galleries",
  "cities-travel",
  "games",
  "business",
  "books",
  "tech",
]);

const OVERRIDES = JSON.parse(readFileSync(MAP_PATH, "utf8"));
const bySlug = Object.fromEntries(
  (Array.isArray(OVERRIDES) ? OVERRIDES : []).map((row) => [row.slug, row]),
);

function inferSection(slug, title, tags = []) {
  const hay = `${slug} ${title} ${tags.join(" ")}`.toLowerCase();
  const rules = [
    [/\b(celtics|lakers|yankees|dodgers|patriots|cowboys|warrior|giant|sports|nba|nfl|mlb|dynasty|super.?bowl|league.?money|regional.?sports)\b/, "sports"],
    [/\b(film|movie|oscar|emmy|horror|franchise|disney|cinema|netflix|pixar|simpsons|streaming|imdb|anime|tv.?golden|blockbuster)\b/, "movies-tv"],
    [/\b(music|grammy|spotify|album|song|billboard|beyonce|taylor|christmas.?songs|radio|rolling.?stone|musicbrainz)\b/, "music"],
    [/\b(museum|heritage|gallery|uk.?museums|world.?heritage)\b/, "galleries"],
    [/\b(game|games|steam|lego|pokemon|board.?games|video.?game)\b/, "games"],
    [/\b(gutenberg|sherlock|christmas.?novels|novel|book)\b/, "books"],
    [/\b(web.?page|medium.?article|tech|software)\b/, "tech"],
    [/\b(city|cities|urban|metro|san.?francisco|new.?york|california|texas|travel|wine|coffee|airport|airline|biketown|national.?park|hurricane|hydro|nyc.?restaurant)\b/, "cities-travel"],
    [/\b(ceo|tuition|phd|voter|incarceration|wealth|export|plastic|factbook|college|school|readmit|big.?mac|un.?votes|super.?bowl.?ads)\b/, "business"],
  ];
  for (const [re, section] of rules) {
    if (re.test(hay)) return section;
  }
  return "culture";
}

function autoTitle(raw) {
  let t = String(raw || "").trim();
  t = t.replace(/^([A-Z0-9 &/'’.-]{2,40}):\s*/u, "");
  t = t.replace(/\bThe Artometrics of\b/gi, "");
  t = t.replace(/\bTHE ARTOMETRICS OF\b/g, "");
  t = t.replace(/\bArtometrics of\b/gi, "");
  t = t.replace(/\s{2,}/g, " ").replace(/^[:\-\s]+|[:\-\s]+$/g, "").trim();
  if (!t) return raw;
  // Sentence case-ish: keep existing capitalization if mixed; else title-ish
  if (t === t.toUpperCase() && t.length > 8) {
    t = t
      .toLowerCase()
      .replace(/\b([a-z])/g, (m) => m.toUpperCase())
      .replace(/\b(Of|The|And|A|An|In|On|For|To|Vs)\b/g, (m) => m.toLowerCase())
      .replace(/^[a-z]/, (m) => m.toUpperCase());
  }
  return t;
}

function autoDescription(desc, title) {
  const d = String(desc || "").trim();
  if (!d) return `A data report on ${title}.`;
  const first = d.match(/^(.+?[.!?])(?:\s|$)/);
  let out = (first ? first[1] : d).replace(/\s+/g, " ").trim();
  out = out.replace(/\bThis report analyzes the TidyTuesday[^.]*\.\s*/i, "");
  out = out.replace(/\bThe Artometrics of\b/gi, "");
  if (out.length > 158) out = `${out.slice(0, 155).replace(/\s+\S*$/, "")}…`;
  return out;
}

function simplifyHtml(html) {
  let body = html;
  // Drop TOC nav entirely
  body = body.replace(/<nav\b[^>]*id=["']TOC["'][\s\S]*?<\/nav>/gi, "");
  // Soften scaffolding headers
  const renames = [
    [/>\s*FAST FACTS\s*</gi, ">At a glance<"],
    [/>\s*DATASET CONTEXT\s*</gi, ">The data<"],
    [/>\s*LIMITATIONS\s*</gi, ">Caveats<"],
    [/>\s*CONCLUSION\s*</gi, ">Bottom line<"],
    [/>\s*REFERENCES\s*</gi, ">Sources<"],
    [/>\s*EDITOR'?S NOTE\s*</gi, ">Editor’s note<"],
    [/>\s*CHART\s*\d+\s*[—\-–:]\s*/gi, ">"],
    [/>\s*IN THIS REPORT\s*</gi, "><"],
  ];
  for (const [re, to] of renames) body = body.replace(re, to);
  // Drop empty leftover TOC title if any
  body = body.replace(/<h2[^>]*>\s*<\/h2>/gi, "");
  return body.trim();
}

const files = readdirSync(BLOG).filter((f) => f.endsWith(".md"));
let updated = 0;
const summary = [];

for (const file of files) {
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const parsed = matter(raw);
  const slug = parsed.data.slug ?? file.replace(/\.md$/, "");
  const override = bySlug[slug];
  const section =
    override?.suggestedSection && SECTIONS.has(override.suggestedSection)
      ? override.suggestedSection
      : inferSection(slug, parsed.data.title ?? "", parsed.data.tags ?? []);
  const title = override?.suggestedTitle || autoTitle(parsed.data.title);
  const description =
    override?.suggestedDescription ||
    autoDescription(parsed.data.description, title);

  parsed.data.title = title;
  parsed.data.description = description;
  parsed.data.tags = [section];
  // channels deprecated — primary section lives in tags
  delete parsed.data.channels;

  const body = simplifyHtml(parsed.content);
  const out = matter.stringify(body, parsed.data);
  writeFileSync(path, out.endsWith("\n") ? out : `${out}\n`);
  updated += 1;
  summary.push({ slug, section, title });
}

writeFileSync(
  join(ROOT, "scripts/content-os/traditional-aeo-applied.json"),
  JSON.stringify(summary, null, 2),
);
console.log(`Updated ${updated} articles`);
