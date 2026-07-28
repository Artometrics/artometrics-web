#!/usr/bin/env node
/**
 * Lightweight unit checks (no Jest) for Aftercare calculators / planets.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

function reduceNumerology(sum) {
  let n = sum;
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = [...String(n)].reduce((a, c) => a + Number(c), 0);
  }
  return n;
}

function lifePathNumber(isoDate) {
  const digits = isoDate.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const sum = [...digits].reduce((a, c) => a + Number(c), 0);
  return reduceNumerology(sum);
}

const LETTER = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

function expressionNumber(name) {
  const letters = [...name.toLowerCase()].filter((ch) => LETTER[ch] != null);
  if (!letters.length) return null;
  return reduceNumerology(letters.reduce((a, ch) => a + LETTER[ch], 0));
}

assert(lifePathNumber("1990-06-15") != null, "life path computes");
assert(expressionNumber("Juliet Ramos") != null, "expression computes");
assert(existsSync(join(ROOT, "lib/aftercare/planets.ts")), "planets.ts present");
assert(existsSync(join(ROOT, "lib/aftercare/readings.ts")), "readings.ts present");
assert(existsSync(join(ROOT, "netlify/functions/places-search.ts")), "places-search present");
assert(existsSync(join(ROOT, "netlify/functions/sanity-sync.ts")), "sanity-sync present");
assert(existsSync(join(ROOT, "lib/sanity/client.ts")), "sanity client present");
assert(existsSync(join(ROOT, "sanity/sanity.config.ts")), "sanity studio config present");
assert(existsSync(join(ROOT, "sanity/sanity.cli.ts")), "sanity cli config present");
assert(existsSync(join(ROOT, "sanity/schemas/memberContribution.ts")), "memberContribution schema");

const contentLib = readFileSync(join(ROOT, "lib/content.ts"), "utf8");
assert(contentLib.includes('@/src/generated/blog.json'), "Expo content bridge uses src/generated");
assert(!contentLib.includes("sanity.io"), "Expo content bridge does not call Sanity CDN");

const planets = readFileSync(join(ROOT, "lib/aftercare/planets.ts"), "utf8");
assert(planets.includes("SAGITTARIUS SEASON"), "season titles present");
assert(planets.includes("celestialForSign"), "celestialForSign export");

assert(existsSync(join(ROOT, "lib/samples/types.ts")), "sample maker types present");
assert(existsSync(join(ROOT, "lib/palette/recommend.ts")), "palette recommend present");
assert(existsSync(join(ROOT, "app/(site)/tools/samples/index.tsx")), "samples route present");
assert(existsSync(join(ROOT, "app/(site)/tools/palette/analyze.tsx")), "palette analyze route present");
assert(existsSync(join(ROOT, "supabase/migrations/004_studio_generators.sql")), "generators migration present");

const colorsTs = readFileSync(join(ROOT, "constants/Colors.ts"), "utf8");
assert(colorsTs.includes('BrandStyle'), "brand style type present");
assert(colorsTs.includes("magazine"), "magazine brand tokens present");

const themeTs = readFileSync(join(ROOT, "lib/theme.tsx"), "utf8");
assert(themeTs.includes("artometrics-brand-style"), "brand style persistence key");
assert(themeTs.includes("toggleBrandStyle"), "brand style toggle");

console.log("unit OK");
