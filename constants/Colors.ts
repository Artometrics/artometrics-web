/**
 * Artometrics brand tokens — light magazine + dark reading modes.
 */
export const Colors = {
  accent50: "#FEF2F2",
  accent100: "#FDE3E3",
  accent200: "#F8C5C5",
  accent300: "#F09494",
  accent400: "#E05C5C",
  accent500: "#C0392B",
  accent600: "#A93226",
  accent700: "#922B21",
  accent800: "#7B241C",
  accent900: "#641D17",
  accent950: "#3D120E",

  base50: "#FAFAFA",
  base100: "#F5F5F5",
  base200: "#E5E5E5",
  base300: "#D4D4D4",
  base400: "#A3A3A3",
  base500: "#737373",
  base600: "#525252",
  base700: "#404040",
  base800: "#262626",
  base900: "#171717",
  base950: "#0A0A0A",

  white: "#FFFFFF",
  black: "#000000",
  cream: "#FAFAF8",
  chartHighlight: "#C0392B",
  chartDark: "#1C1C1E",
  chartMid: "#6B6B6B",
} as const;

export const Fonts = {
  serif: "Georgia, 'Times New Roman', Times, serif",
  wordmark: "Chomsky",
  sans: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'Courier New', Courier, monospace",
} as const;

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

export const Themes: Record<ThemeMode, ThemeColors> = {
  light: {
    mode: "light",
    bg: Colors.white,
    bgElevated: Colors.cream,
    text: Colors.base900,
    textMuted: Colors.base600,
    textSubtle: Colors.base500,
    border: Colors.base200,
    accent: Colors.accent600,
    accentSoft: Colors.accent50,
    inverse: Colors.white,
    headerBg: Colors.white,
    overlayBg: Colors.white,
    rule: Colors.base200,
  },
  dark: {
    mode: "dark",
    bg: Colors.base950,
    bgElevated: Colors.base900,
    text: Colors.base50,
    textMuted: Colors.base400,
    textSubtle: Colors.base500,
    border: Colors.base800,
    accent: Colors.accent400,
    accentSoft: Colors.accent950,
    inverse: Colors.base950,
    headerBg: Colors.base950,
    overlayBg: Colors.base950,
    rule: Colors.base700,
  },
};
