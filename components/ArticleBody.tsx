import { useMemo } from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import RenderHtml, {
  defaultSystemFonts,
  type MixedStyleRecord,
} from "react-native-render-html";
import { Colors } from "@/constants/Colors";

const SITE = "https://artometrics.com";
const BODY_FONT = "Georgia";

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

const tagsStyles: MixedStyleRecord = {
  body: {
    color: Colors.base900,
    fontSize: 17,
    lineHeight: 28,
    fontFamily: BODY_FONT,
  },
  p: { marginTop: 0, marginBottom: 14, fontFamily: BODY_FONT },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 12,
    fontWeight: "600",
    fontFamily: BODY_FONT,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 10,
    fontWeight: "600",
    fontFamily: BODY_FONT,
  },
  h3: {
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 8,
    fontWeight: "600",
    fontFamily: BODY_FONT,
  },
  a: { color: Colors.accent700 },
  img: { marginVertical: 12 },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.base200,
    paddingLeft: 12,
    marginVertical: 12,
    color: Colors.base600,
  },
  li: { marginBottom: 6 },
};

const systemFonts = [...defaultSystemFonts, BODY_FONT, "Chomsky"];

/**
 * Native article body — RenderHTML instead of WebView-in-ScrollView
 * (WebView nesting was crashing TestFlight on long reports).
 */
export function ArticleBody({ html }: { html: string }) {
  const { width } = useWindowDimensions();
  const source = useMemo(
    () => ({ html: withChartFallbacks(html) }),
    [html],
  );
  const contentWidth = Math.max(280, width - 40);

  return (
    <View style={styles.wrap}>
      <RenderHtml
        contentWidth={contentWidth}
        source={source}
        baseUrl={SITE}
        tagsStyles={tagsStyles}
        systemFonts={systemFonts}
        enableExperimentalMarginCollapsing
        defaultTextProps={{ selectable: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", paddingBottom: 8 },
});
