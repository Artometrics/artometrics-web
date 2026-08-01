import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import RenderHtml, {
  defaultSystemFonts,
  type MixedStyleRecord,
} from "react-native-render-html";
import { useTheme } from "@/lib/theme";

const SITE = "https://artometrics.com";
const BODY_FONT = "DM Sans";
const DISPLAY_FONT = "DM Mono";

/** Native can’t run Plotly — swap live chart mounts for PNG fallbacks. */
function withChartFallbacks(html: string): string {
  return html.replace(
    /<div\b([^>]*\bart-chart-live\b[^>]*)>\s*<\/div>/gi,
    (_full, attrs: string) => {
      const fallback = attrs.match(/data-fallback=["']([^"']+)["']/i)?.[1];
      if (!fallback) return "";
      const label =
        attrs.match(/aria-label=["']([^"']+)["']/i)?.[1] ||
        attrs.match(/data-title=["']([^"']+)["']/i)?.[1] ||
        "Chart";
      const src = fallback.startsWith("http")
        ? fallback
        : `${SITE}${fallback.startsWith("/") ? "" : "/"}${fallback}`;
      const safeAlt = label.replace(/"/g, "&quot;");
      return `<img src="${src}" alt="${safeAlt}" class="art-chart-fallback" />`;
    },
  );
}

const systemFonts = [
  ...defaultSystemFonts,
  BODY_FONT,
  DISPLAY_FONT,
  "Chomsky",
];

/**
 * Native article body — RenderHTML instead of WebView-in-ScrollView
 * (WebView nesting was crashing TestFlight on long reports).
 */
export function ArticleBody({ html }: { html: string }) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const source = useMemo(
    () => ({ html: withChartFallbacks(html), baseUrl: SITE }),
    [html],
  );
  const tagsStyles = useMemo<MixedStyleRecord>(
    () => ({
      body: {
        color: colors.text,
        fontSize: 17,
        lineHeight: 28,
        fontFamily: BODY_FONT,
      },
      p: { marginTop: 0, marginBottom: 14, fontFamily: BODY_FONT },
      h1: {
        fontSize: 28,
        lineHeight: 34,
        marginBottom: 12,
        fontWeight: "500",
        fontFamily: DISPLAY_FONT,
        color: colors.text,
      },
      h2: {
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 10,
        fontWeight: "500",
        fontFamily: DISPLAY_FONT,
        color: colors.text,
      },
      h3: {
        fontSize: 20,
        lineHeight: 26,
        marginBottom: 8,
        fontWeight: "500",
        fontFamily: DISPLAY_FONT,
        color: colors.text,
      },
      a: { color: colors.accent },
      img: { marginVertical: 12 },
      blockquote: {
        borderLeftWidth: 3,
        borderLeftColor: colors.border,
        paddingLeft: 12,
        marginVertical: 12,
        color: colors.textMuted,
      },
      li: { marginBottom: 6, color: colors.text },
    }),
    [colors],
  );
  const contentWidth = Math.max(280, width - 40);

  return (
    <View className="w-full pb-2">
      <RenderHtml
        contentWidth={contentWidth}
        source={source}
        tagsStyles={tagsStyles}
        systemFonts={systemFonts}
        enableExperimentalMarginCollapsing
        defaultTextProps={{ selectable: true }}
      />
    </View>
  );
}
