/**
 * Artometrics brand tokens — Swiss Modern (default) + Magazine / Chomsky era.
 */

export type BrandStyle = "swiss" | "magazine";

export const Colors = {
  accent50: "#FFF1F0",
  accent100: "#FFD9D6",
  accent200: "#FFB3AD",
  accent300: "#FF7A70",
  accent400: "#F04337",
  accent500: "#D9251B",
  accent600: "#C41E16",
  accent700: "#A31812",
  accent800: "#7F120E",
  accent900: "#5C0D0A",
  accent950: "#3A0806",

  base50: "#FFFFFF",
  base100: "#F5F5F5",
  base200: "#E5E5E5",
  base300: "#D4D4D4",
  base400: "#A3A3A3",
  base500: "#737373",
  base600: "#525252",
  base700: "#2A2A2A",
  base800: "#141414",
  base900: "#0A0A0A",
  base950: "#000000",

  white: "#FFFFFF",
  black: "#000000",
  cream: "#FFFFFF",
  chartHighlight: "#D9251B",
  chartDark: "#000000",
  chartMid: "#525252",

  /** Magazine-era paper / Atlantic cream */
  paper: "#FAFAF8",
  paperElevated: "#F2F0EB",
  magazineAccent: "#C0392B",
  magazineAccentSoft: "#F9E8E6",
} as const;

export type BrandFonts = {
  display: string;
  sans: string;
  serif: string;
  wordmark: string;
  mono: string;
};

/** Swiss Modern — condensed display + system sans (current chrome). */
export const SwissFonts: BrandFonts = {
  display: "Anton",
  sans: "Helvetica Neue, Helvetica, Arial, system-ui, sans-serif",
  serif: "Helvetica Neue, Helvetica, Arial, system-ui, sans-serif",
  wordmark: "Anton",
  mono: "'Courier New', Courier, monospace",
};

/** Magazine / Chomsky — editorial serif + Chomsky wordmark (first web style). */
export const MagazineFonts: BrandFonts = {
  display: "Chomsky",
  sans: "Helvetica Neue, Helvetica, Arial, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', Times, serif",
  wordmark: "Chomsky",
  mono: "'Courier New', Courier, monospace",
};

/** Default export kept for static StyleSheets — Swiss. Prefer useTheme().fonts when brand-aware. */
export const Fonts = SwissFonts;

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  mode: ThemeMode;
  bg: string;
  bgElevated: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  border: string;
  accent: string;
  accentSoft: string;
  inverse: string;
  headerBg: string;
  overlayBg: string;
  rule: string;
};

const SwissThemes: Record<ThemeMode, ThemeColors> = {
  light: {
    mode: "light",
    bg: Colors.white,
    bgElevated: Colors.white,
    text: Colors.black,
    textMuted: Colors.base600,
    textSubtle: Colors.base500,
    border: Colors.black,
    accent: Colors.accent500,
    accentSoft: Colors.accent50,
    inverse: Colors.white,
    headerBg: Colors.white,
    overlayBg: Colors.white,
    rule: Colors.black,
  },
  dark: {
    mode: "dark",
    bg: Colors.black,
    bgElevated: Colors.base900,
    text: Colors.white,
    textMuted: Colors.base400,
    textSubtle: Colors.base500,
    border: Colors.white,
    accent: Colors.accent400,
    accentSoft: Colors.accent950,
    inverse: Colors.black,
    headerBg: Colors.black,
    overlayBg: Colors.black,
    rule: Colors.white,
  },
};

const MagazineThemes: Record<ThemeMode, ThemeColors> = {
  light: {
    mode: "light",
    bg: Colors.paper,
    bgElevated: Colors.white,
    text: "#171717",
    textMuted: Colors.base600,
    textSubtle: Colors.base500,
    border: Colors.base200,
    accent: Colors.magazineAccent,
    accentSoft: Colors.magazineAccentSoft,
    inverse: Colors.white,
    headerBg: Colors.paper,
    overlayBg: Colors.paper,
    rule: Colors.base200,
  },
  dark: {
    mode: "dark",
    bg: Colors.base900,
    bgElevated: Colors.base800,
    text: "#FAFAFA",
    textMuted: Colors.base400,
    textSubtle: Colors.base500,
    border: Colors.base700,
    accent: "#E05C5C",
    accentSoft: Colors.accent950,
    inverse: Colors.black,
    headerBg: Colors.base900,
    overlayBg: Colors.base900,
    rule: Colors.base700,
  },
};

export const Themes = SwissThemes;

export function resolveThemeColors(mode: ThemeMode, brand: BrandStyle): ThemeColors {
  return brand === "magazine" ? MagazineThemes[mode] : SwissThemes[mode];
}

export function resolveBrandFonts(brand: BrandStyle): BrandFonts {
  return brand === "magazine" ? MagazineFonts : SwissFonts;
}

export const BRAND_STYLE_LABELS: Record<BrandStyle, string> = {
  swiss: "Swiss (current)",
  magazine: "Magazine (Chomsky)",
};
