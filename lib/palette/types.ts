/** Color seasons + palette types for Studio palette tool. */

export type SeasonId =
  | "bright-spring"
  | "true-spring"
  | "light-spring"
  | "light-summer"
  | "true-summer"
  | "soft-summer"
  | "soft-autumn"
  | "true-autumn"
  | "deep-autumn"
  | "deep-winter"
  | "true-winter"
  | "bright-winter";

export type Undertone = "warm" | "cool" | "neutral";
export type Depth = "light" | "medium" | "deep";
export type Clarity = "bright" | "soft" | "clear";

export type SeasonProfile = {
  id: SeasonId;
  name: string;
  tagline: string;
  undertone: Undertone;
  depth: Depth;
  clarity: Clarity;
  palette: string[];
  avoid: string[];
};

export type SavedPalette = {
  id: string;
  userId: string;
  title: string;
  seasonId: SeasonId | null;
  colors: string[];
  undertone: Undertone | null;
  depth: Depth | null;
  clarity: Clarity | null;
  sourceImageUri: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export const SEASONS: SeasonProfile[] = [
  {
    id: "soft-autumn",
    name: "Soft Autumn",
    tagline: "Warm, muted, softly refined.",
    undertone: "warm",
    depth: "medium",
    clarity: "soft",
    palette: ["#6B7045", "#C4A035", "#B85A3A", "#C9A84C", "#5F8A7A", "#C4A090"],
    avoid: ["#FF2D95", "#0047FF", "#FFFFFF", "#0A0A0A", "#00C4B4", "#E10600"],
  },
  {
    id: "true-autumn",
    name: "True Autumn",
    tagline: "Warm, rich, earthy.",
    undertone: "warm",
    depth: "medium",
    clarity: "clear",
    palette: ["#8B4513", "#D2691E", "#DAA520", "#556B2F", "#A0522D", "#CD853F"],
    avoid: ["#FF69B4", "#00BFFF", "#F5F5F5", "#000080"],
  },
  {
    id: "deep-autumn",
    name: "Deep Autumn",
    tagline: "Warm depth with burnished richness.",
    undertone: "warm",
    depth: "deep",
    clarity: "soft",
    palette: ["#3D2914", "#6B3A2A", "#8B6914", "#2F4F2F", "#704214", "#5C4033"],
    avoid: ["#FFE4E1", "#87CEEB", "#FF1493"],
  },
  {
    id: "soft-summer",
    name: "Soft Summer",
    tagline: "Cool, muted, gently blended.",
    undertone: "cool",
    depth: "medium",
    clarity: "soft",
    palette: ["#C4A4A4", "#8FA88F", "#A8A0B0", "#6A7A8C", "#B0A090", "#7A8B8B"],
    avoid: ["#FF4500", "#FFD700", "#000000"],
  },
  {
    id: "true-summer",
    name: "True Summer",
    tagline: "Cool, soft, balanced.",
    undertone: "cool",
    depth: "medium",
    clarity: "clear",
    palette: ["#708090", "#BC8F8F", "#6B8E9F", "#9AABB8", "#A67B7B", "#5F7A7A"],
    avoid: ["#FF8C00", "#228B22", "#8B0000"],
  },
  {
    id: "light-summer",
    name: "Light Summer",
    tagline: "Cool, light, airy.",
    undertone: "cool",
    depth: "light",
    clarity: "soft",
    palette: ["#D4C4C4", "#B8C8C8", "#C8C0D0", "#A8B8C8", "#E0D0C8", "#C0D0C8"],
    avoid: ["#8B0000", "#000080", "#FF4500"],
  },
  {
    id: "bright-spring",
    name: "Bright Spring",
    tagline: "Warm, clear, vivid.",
    undertone: "warm",
    depth: "light",
    clarity: "bright",
    palette: ["#E85D04", "#F48C06", "#90BE6D", "#43AA8B", "#F9C74F", "#F94144"],
    avoid: ["#4A0E4E", "#1A1A2E", "#696969"],
  },
  {
    id: "true-spring",
    name: "True Spring",
    tagline: "Warm, bright, fresh.",
    undertone: "warm",
    depth: "light",
    clarity: "clear",
    palette: ["#FF6B35", "#F7C59F", "#2EC4B6", "#FF9F1C", "#E71D36", "#011627"],
    avoid: ["#800020", "#2F4F4F"],
  },
  {
    id: "light-spring",
    name: "Light Spring",
    tagline: "Warm, light, delicate.",
    undertone: "warm",
    depth: "light",
    clarity: "soft",
    palette: ["#F4A261", "#E9C46A", "#2A9D8F", "#F1C0A0", "#A8DADC", "#E76F51"],
    avoid: ["#1D3557", "#000000"],
  },
  {
    id: "deep-winter",
    name: "Deep Winter",
    tagline: "Cool, deep, dramatic.",
    undertone: "cool",
    depth: "deep",
    clarity: "clear",
    palette: ["#0D1B2A", "#1B263B", "#415A77", "#E0E1DD", "#9B2226", "#370617"],
    avoid: ["#D4A373", "#BC6C25", "#FEFAE0"],
  },
  {
    id: "true-winter",
    name: "True Winter",
    tagline: "Cool, clear, high contrast.",
    undertone: "cool",
    depth: "medium",
    clarity: "bright",
    palette: ["#000000", "#FFFFFF", "#E63946", "#1D3557", "#457B9D", "#A8DADC"],
    avoid: ["#D4A373", "#6B7045", "#C4A035"],
  },
  {
    id: "bright-winter",
    name: "Bright Winter",
    tagline: "Cool, bright, jewel-toned.",
    undertone: "cool",
    depth: "medium",
    clarity: "bright",
    palette: ["#D90429", "#EF233C", "#2B2D42", "#8D99AE", "#EDF2F4", "#3A0CA3"],
    avoid: ["#BC6C25", "#FEFAE0", "#606C38"],
  },
];

export function seasonById(id: SeasonId): SeasonProfile | undefined {
  return SEASONS.find((s) => s.id === id);
}

export function newPaletteId(): string {
  return `pal_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
