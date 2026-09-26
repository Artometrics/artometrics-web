#!/usr/bin/env node
/**
 * Apply final magazine taxonomy (domain + subdomain) to every blog post.
 * Source of truth for assignments: TAXONOMY map below.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = path.join(ROOT, "src/content/blog");

/** @type {Record<string, [string, string]>} slug → [domain, subdomain] */
const TAXONOMY = {
  // Arts — Film
  anime: ["arts", "film"],
  "emmys": ["arts", "film"],
  franchise: ["arts", "film"],
  "margins": ["arts", "film"],
  "horror": ["arts", "film"],
  "blockbusters": ["arts", "film"],
  "netflix": ["arts", "film"],
  "catalog": ["arts", "film"],
  "pixar": ["arts", "film"],
  "simpsons": ["arts", "film"],
  "streaming": ["arts", "film"],
  "television": ["arts", "film"],
  // Arts — Music
  "lyrics": ["arts", "music"],
  "billboard": ["arts", "music"],
  "rankings": ["arts", "music"],
  "carols": ["arts", "music"],
  "fame": ["arts", "music"],
  "radio": ["arts", "music"],
  "albums": ["arts", "music"],
  // Arts — Theater
  "broadway": ["arts", "theater"],
  // Arts — Language (literary canons)
  "novels": ["arts", "language"],
  "languages": ["arts", "language"],
  "lcsh": ["arts", "language"],
  "lcsh": ["arts", "language"],
  "sherlock": ["arts", "language"],
  // Arts — Architecture / institutions
  "museums": ["arts", "architecture"],
  // Arts — Design
  "comics": ["arts", "design"],

  // Sports — Baseball
  "dodgers": ["sports", "baseball"],
  "giants": ["sports", "baseball"],
  "padres": ["sports", "baseball"],
  "blueprint": ["sports", "baseball"],
  "yankees": ["sports", "baseball"],
  // Sports — Basketball
  "celtics": ["sports", "basketball"],
  "lakers": ["sports", "basketball"],
  "warriors": ["sports", "basketball"],
  // Sports — Football
  "cowboys": ["sports", "football"],
  "patriots": ["sports", "football"],
  "fandom": ["sports", "football"],
  "dynasties": ["sports", "football"],
  "leagues": ["sports", "football"],
  // Sports — Gaming
  "games": ["sports", "gaming"],
  pokemon: ["sports", "gaming"],
  "slices": ["sports", "gaming"],
  "steam": ["sports", "gaming"],

  // Science
  cetaceans: ["science", "biology"],
  "longevity": ["science", "medicine"],
  "nuclear": ["science", "physics"],
  "wastewater": ["science", "engineering"],
  "medium": ["science", "tech"],
  "metrics": ["science", "tech"],
  readmitted: ["science", "medicine"],

  // Humanities
  "caesar": ["humanities", "history"],
  imperial: ["humanities", "history"],
  "emperors": ["humanities", "history"],
  "pantheon": ["humanities", "sociology"],
  "oscars": ["humanities", "sociology"],

  // Civics
  "mac": ["civics", "economics"],
  "ceos": ["civics", "business"],
  "majors": ["civics", "education"],
  "geopolitics": ["civics", "economics"],
  "exporters": ["civics", "economics"],
  "prisons": ["civics", "law"],
  "atlas": ["civics", "economics"],
  "schools": ["civics", "education"],
  "diplomacy": ["civics", "politics"],
  "phds": ["civics", "education"],
  "tuition": ["civics", "education"],
  "voters": ["civics", "politics"],
  "wealth": ["civics", "economics"],
  "rivalry": ["civics", "politics"],
  "bioeconomics": ["civics", "economics"],
  "metros": ["civics", "economics"],
  "sf": ["civics", "economics"],
  "factbook": ["civics", "economics"],
  "superbowl": ["civics", "communication"],
  "youtube": ["civics", "communication"],

  // Culture — Food
  "alcohol": ["culture", "food"],
  "pizza": ["culture", "food"],
  "coffee": ["culture", "food"],
  "breweries": ["culture", "food"],
  "calories": ["culture", "food"],
  "ramen": ["culture", "food"],
  "wine": ["culture", "food"],
  "restaurants": ["culture", "food"],
  // Culture — Travel
  "airlines": ["culture", "travel"],
  "bikeshare": ["culture", "travel"],
  "parks": ["culture", "travel"],
  "heritage": ["culture", "travel"],
  // Culture — Environment
  "plastic": ["culture", "environment"],
  "hurricanes": ["culture", "environment"],
  // Culture — Wellness
  "exercise": ["culture", "wellness"],
  // Culture — Leisure
  "legos": ["culture", "leisure"],
};

function setTags(frontmatter, domain, subdomain) {
  // Remove existing tags block (list or inline)
  let fm = frontmatter.replace(/\ntags:\s*\n(?:  - .+\n)*/m, "\n");
  fm = fm.replace(/\ntags:\s*\[[^\]]*\]\s*\n/m, "\n");
  // Insert tags after heroImage or after slug block — after draft if present, else after heroImage
  const block = `tags:\n  - ${domain}\n  - ${subdomain}\n`;
  if (/\ndraft:\s*/m.test(fm)) {
    fm = fm.replace(/\ndraft:\s*.+\n/, (m) => `${m}${block}`);
  } else if (/\nheroImage:\s*.+\n/m.test(fm)) {
    fm = fm.replace(/\nheroImage:\s*.+\n/, (m) => `${m}${block}`);
  } else {
    fm = fm.replace(/\n---\s*$/, `\n${block}---`);
  }
  return fm;
}

const files = fs.readdirSync(BLOG).filter((f) => f.endsWith(".md"));
let ok = 0;
const missing = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const assignment = TAXONOMY[slug];
  if (!assignment) {
    missing.push(slug);
    continue;
  }
  const [domain, subdomain] = assignment;
  const full = path.join(BLOG, file);
  const raw = fs.readFileSync(full, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) {
    console.error("No frontmatter", slug);
    continue;
  }
  const newFm = setTags(m[1] + "\n", domain, subdomain).replace(/\n+$/, "\n");
  fs.writeFileSync(full, `---\n${newFm}---\n${m[2]}`);
  ok += 1;
}

console.log(`Retagged ${ok} articles`);
if (missing.length) {
  console.error("Missing assignments:", missing.join(", "));
  process.exit(1);
}
