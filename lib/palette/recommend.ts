import type { SeasonId, SeasonProfile, Undertone, Depth, Clarity } from "@/lib/palette/types";
import { SEASONS } from "@/lib/palette/types";

export type ColorTraits = {
  undertone: Undertone;
  depth: Depth;
  clarity: Clarity;
  hexes: string[];
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    default:
      h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}

/** Heuristic traits from a set of dominant skin/hair/clothing hexes. */
export function traitsFromHexes(hexes: string[]): ColorTraits {
  if (!hexes.length) {
    return {
      undertone: "neutral",
      depth: "medium",
      clarity: "soft",
      hexes: [],
    };
  }
  const hsls = hexes.map((hx) => {
    const { r, g, b } = hexToRgb(hx);
    return rgbToHsl(r, g, b);
  });
  const avgL = hsls.reduce((a, x) => a + x.l, 0) / hsls.length;
  const avgS = hsls.reduce((a, x) => a + x.s, 0) / hsls.length;
  const warmScore = hsls.reduce((a, x) => {
    // warm hues: ~20–70 and ~330–360; cool: ~160–280
    const warm =
      (x.h >= 20 && x.h <= 70) || x.h >= 330 || (x.h >= 0 && x.h < 20) ? 1 : 0;
    const cool = x.h >= 160 && x.h <= 280 ? 1 : 0;
    return a + warm - cool;
  }, 0);

  const undertone: Undertone =
    warmScore > 0.4 ? "warm" : warmScore < -0.4 ? "cool" : "neutral";
  const depth: Depth = avgL > 0.62 ? "light" : avgL < 0.35 ? "deep" : "medium";
  const clarity: Clarity = avgS > 0.45 ? "bright" : avgS < 0.22 ? "soft" : "clear";

  return { undertone, depth, clarity, hexes };
}

function scoreSeason(traits: ColorTraits, season: SeasonProfile): number {
  let score = 0;
  if (season.undertone === traits.undertone) score += 3;
  else if (traits.undertone === "neutral") score += 1;
  if (season.depth === traits.depth) score += 2;
  if (season.clarity === traits.clarity) score += 2;
  else if (
    (season.clarity === "clear" && traits.clarity === "bright") ||
    (season.clarity === "soft" && traits.clarity === "clear")
  ) {
    score += 1;
  }
  return score;
}

export function recommendSeason(traits: ColorTraits): SeasonProfile {
  let best = SEASONS[0];
  let bestScore = -1;
  for (const s of SEASONS) {
    const sc = scoreSeason(traits, s);
    if (sc > bestScore) {
      bestScore = sc;
      best = s;
    }
  }
  return best;
}

export type RecommendResult = {
  season: SeasonProfile;
  traits: ColorTraits;
};

export function recommendFromHexes(hexes: string[]): RecommendResult {
  const traits = traitsFromHexes(hexes);
  return { season: recommendSeason(traits), traits };
}

export function sharedColors(a: SeasonId, b: SeasonId): string[] {
  const sa = SEASONS.find((s) => s.id === a);
  const sb = SEASONS.find((s) => s.id === b);
  if (!sa || !sb) return [];
  // Simple midpoint blend of first 4 from each as "shared neutrals"
  const out: string[] = [];
  for (let i = 0; i < 4; i++) {
    const ca = hexToRgb(sa.palette[i % sa.palette.length]);
    const cb = hexToRgb(sb.palette[i % sb.palette.length]);
    const r = Math.round((ca.r + cb.r) / 2);
    const g = Math.round((ca.g + cb.g) / 2);
    const b = Math.round((ca.b + cb.b) / 2);
    out.push(
      `#${[r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`,
    );
  }
  return out;
}
