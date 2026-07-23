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
  "emmy-awards": ["arts", "film"],
  franchise: ["arts", "film"],
  "horror-movie-profit": ["arts", "film"],
  "horror-movies": ["arts", "film"],
  "imdb-blockbuster-grammar": ["arts", "film"],
  "netflix-engagement": ["arts", "film"],
  "netflix-titles": ["arts", "film"],
  "pixar-films": ["arts", "film"],
  "simpsons-guest-stars": ["arts", "film"],
  "streaming-catalog-power": ["arts", "film"],
  "tv-golden-age": ["arts", "film"],
  // Arts — Music
  "beyonce-taylor-lyrics": ["arts", "music"],
  "billboard-hot-100": ["arts", "music"],
  "billboard-top-100": ["arts", "music"],
  "christmas-songs": ["arts", "music"],
  "musicbrainz-pop-fame-mechanics": ["arts", "music"],
  "radio-stations": ["arts", "music"],
  "rolling-stone-albums": ["arts", "music"],
  // Arts — Theater
  "broadway-musicals": ["arts", "theater"],
  // Arts — Language (literary canons)
  "christmas-novels": ["arts", "language"],
  "languages-glottolog": ["arts", "language"],
  "project-gutenberg": ["arts", "language"],
  "project-gutenberg-public-domain-canon-map": ["arts", "language"],
  "sherlock-holmes": ["arts", "language"],
  // Arts — Architecture / institutions
  "uk-museums": ["arts", "architecture"],
  // Arts — Design
  "comic-characters": ["arts", "design"],

  // Sports — Baseball
  "dodgers-the-artometrics-of-baseballs-modern-machine": ["sports", "baseball"],
  "giant-the-artometrics-of-a-san-francisco-dynasty": ["sports", "baseball"],
  "yankees-the-artometrics-of-baseballs-empire": ["sports", "baseball"],
  // Sports — Basketball
  "celtics-the-artometrics-of-institutional-winning": ["sports", "basketball"],
  "lakers-the-artometrics-of-basketball-glamour": ["sports", "basketball"],
  "warrior-the-artometrics-of-a-golden-state-dynasty": ["sports", "basketball"],
  // Sports — Football
  "cowboys-the-artometrics-of-americas-team": ["sports", "football"],
  "patriots-the-artometrics-of-the-system-dynasty": ["sports", "football"],
  "regional-sports-identity-map": ["sports", "football"],
  "sports-dynasty-index-best-and-worst-conversion": ["sports", "football"],
  "league-money-skill-and-star-systems": ["sports", "football"],
  // Sports — Gaming
  "board-games": ["sports", "gaming"],
  pokemon: ["sports", "gaming"],
  "video-games-sliced": ["sports", "gaming"],
  "video-games-steam": ["sports", "gaming"],

  // Science
  cetaceans: ["science", "biology"],
  "global-life-expectancy": ["science", "medicine"],
  "nuclear-explosions": ["science", "physics"],
  "hydro-wastewater": ["science", "engineering"],
  "medium-articles": ["science", "tech"],
  "web-page-metrics": ["science", "tech"],
  readmitted: ["science", "medicine"],

  // Humanities
  "caesar-the-psychonomics-of-emperor-julius": ["humanities", "history"],
  imperial: ["humanities", "history"],
  "roman-emperors": ["humanities", "history"],
  "pantheon-the-artometrics-of-collective-memory": ["humanities", "sociology"],
  "awards-prestige-economy-oscars-grammys-nobels": ["humanities", "sociology"],

  // Civics
  "big-mac-index": ["civics", "economics"],
  "ceo-departures": ["civics", "business"],
  "college-major-income": ["civics", "education"],
  "cultural-exports-geoeconomics": ["civics", "economics"],
  "export-superpowers-us-china-germany": ["civics", "economics"],
  "incarceration-trends": ["civics", "law"],
  "national-export-identity-atlas": ["civics", "economics"],
  "school-diversity": ["civics", "education"],
  "un-votes": ["civics", "politics"],
  "us-phds": ["civics", "education"],
  "us-tuition": ["civics", "education"],
  "us-voter-turnout": ["civics", "politics"],
  "wealth-income": ["civics", "economics"],
  "california-vs-texas-state-rivalry": ["civics", "politics"],
  "city-bioeconomics-operating-system": ["civics", "economics"],
  "new-york-vs-san-francisco-city-systems": ["civics", "economics"],
  "san-francisco-data-microscope": ["civics", "economics"],
  "cia-world-factbook": ["civics", "economics"],
  "super-bowl-ads": ["civics", "communication"],
  "h3-the-artometrics-of-a-youtube-dynasty": ["civics", "communication"],

  // Culture — Food
  "alcohol-consumption": ["culture", "food"],
  "all-the-pizza": ["culture", "food"],
  "coffee-the-artometrics-of-java": ["culture", "food"],
  "craft-beer-usa": ["culture", "food"],
  "fast-food-calories": ["culture", "food"],
  "ramen-ratings": ["culture", "food"],
  "wine-ratings": ["culture", "food"],
  "nyc-restaurant-inspections": ["culture", "food"],
  // Culture — Travel
  "airline-safety": ["culture", "travel"],
  "biketown-bikeshare": ["culture", "travel"],
  "national-park-visits": ["culture", "travel"],
  "world-heritage-sites": ["culture", "travel"],
  // Culture — Environment
  "global-plastic-waste": ["culture", "environment"],
  "hurricanes-puerto-rico": ["culture", "environment"],
  // Culture — Wellness
  "exercise-usa": ["culture", "wellness"],
  // Culture — Leisure
  "lego-database": ["culture", "leisure"],
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
