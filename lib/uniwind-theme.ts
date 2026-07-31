/**
 * Brand color maps for Uniwind CSS variables (light + dark × swiss + magazine).
 * Kept in sync with resolveThemeColors / resolveBrandFonts in Colors.ts.
 */
import {
  resolveBrandFonts,
  resolveThemeColors,
  type BrandFonts,
  type BrandStyle,
  type ThemeColors,
  type ThemeMode,
} from "@/constants/Colors";

export type SemanticCssVars = Record<string, string>;

export function themeColorsToCssVars(
  colors: ThemeColors,
  fonts: BrandFonts,
): SemanticCssVars {
  return {
    "--color-bg": colors.bg,
    "--color-bg-elevated": colors.bgElevated,
    "--color-fg": colors.text,
    "--color-muted": colors.textMuted,
    "--color-subtle": colors.textSubtle,
    "--color-border": colors.border,
    "--color-accent": colors.accent,
    "--color-accent-soft": colors.accentSoft,
    "--color-inverse": colors.inverse,
    "--color-header": colors.headerBg,
    "--color-overlay": colors.overlayBg,
    "--color-rule": colors.rule,
    "--font-display": fonts.display,
    "--font-sans": fonts.sans,
    "--font-serif": fonts.serif,
    "--font-wordmark": fonts.wordmark,
    "--font-mono": fonts.mono,
  };
}

export function brandThemeCssVars(brand: BrandStyle): {
  light: SemanticCssVars;
  dark: SemanticCssVars;
} {
  const lightColors = resolveThemeColors("light", brand);
  const darkColors = resolveThemeColors("dark", brand);
  const fonts = resolveBrandFonts(brand);
  return {
    light: themeColorsToCssVars(lightColors, fonts),
    dark: themeColorsToCssVars(darkColors, fonts),
  };
}

export function modeForPreference(
  preference: ThemeMode | "system",
  system: ThemeMode,
): ThemeMode {
  return preference === "system" ? system : preference;
}
