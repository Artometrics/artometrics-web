/**
 * Artometrics brand tokens (ported from the former Astro global.css).
 * Light magazine palette — red accent, Georgia stack, Chomsky wordmark.
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
} as const;
