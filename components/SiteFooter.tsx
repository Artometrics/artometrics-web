import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { SECTION_META, SECTION_SLUGS, CHANNEL_META, CHANNEL_SLUGS } from "@/data/sections";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { colors } = useTheme();

  return (
    <View style={styles.shell}>
      <Wrapper style={[styles.ctaBand, { borderTopColor: colors.text }]}>
        <Text style={[styles.ctaTitle, { color: colors.text }]}>Ideas that measure culture</Text>
        <Text style={[styles.ctaDek, { color: colors.textMuted }]}>
          Data reports, public datasets, and desk interviews — art for data scientists and data
          science for artists.
        </Text>
        <View style={styles.ctaRow}>
          <Link href="/pricing" asChild>
            <Pressable
              style={StyleSheet.flatten([styles.subscribe, { backgroundColor: colors.text }])}
            >
              <Text style={[styles.subscribeText, { color: colors.inverse }]}>Subscribe</Text>
            </Pressable>
          </Link>
          <Link href="/newsletter" asChild>
            <Pressable>
              <Text style={[styles.newsletter, { color: colors.accent }]}>Newsletter</Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>

      <View style={[styles.dark, { backgroundColor: colors.mode === "dark" ? "#000" : "#0A0A0A" }]}>
        <Wrapper style={styles.inner}>
          <View style={styles.cols}>
            <View style={styles.col}>
              <Text style={styles.groupTitle}>Desks</Text>
              {SECTION_SLUGS.map((s) => (
                <Link key={s} href={`/desks/${s}` as `/desks/${string}`} asChild>
                  <Pressable>
                    <Text style={styles.groupLink}>{SECTION_META[s].title}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={styles.groupTitle}>Topics</Text>
              {CHANNEL_SLUGS.slice(0, 6).map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text style={styles.groupLink}>{CHANNEL_META[s].title}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={styles.groupTitle}>Library</Text>
              {[
                ["/library", "Library"],
                ["/datasets", "Datasets"],
                ["/resources", "Resources"],
                ["/podcast", "Podcast"],
                ["/press", "Press"],
                ["/get-app", "Get the App"],
              ].map(([href, label]) => (
                <Link key={href} href={href as `/library`} asChild>
                  <Pressable>
                    <Text style={styles.groupLink}>{label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          <View style={styles.brandBlock}>
            <Logo size={40} compact={1} />
            <Text style={styles.wordmark}>Artometrics</Text>
          </View>

          <View style={styles.legalRow}>
            {[
              ["/legal/privacy", "Privacy"],
              ["/legal/terms", "Terms"],
              ["/legal/cookies", "Cookies"],
              ["/legal/ethics-statement", "Ethics"],
              ["/legal/dpa", "DPA"],
              ["/security", "Security"],
              ["/contact", "Contact"],
            ].map(([href, label], i, arr) => (
              <View key={href} style={styles.legalItem}>
                <Link href={href as `/legal/privacy`} asChild>
                  <Pressable>
                    <Text style={styles.legalLink}>{label}</Text>
                  </Pressable>
                </Link>
                {i < arr.length - 1 ? <Text style={styles.legalSep}>|</Text> : null}
              </View>
            ))}
          </View>
          <Text style={styles.copy}>© {year} Artometrics</Text>
        </Wrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { marginTop: 24 },
  ctaBand: {
    paddingVertical: 40,
    gap: 12,
    borderTopWidth: 2,
  },
  ctaTitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    fontWeight: "700",
  },
  ctaDek: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 520,
  },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 20, marginTop: 8 },
  subscribe: {
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  subscribeText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  newsletter: { fontSize: 14, fontWeight: "700" },
  dark: { paddingVertical: 36 },
  inner: { gap: 28 },
  cols: { flexDirection: "row", flexWrap: "wrap", gap: 28 },
  col: { minWidth: 140, gap: 8, flexGrow: 1 },
  groupTitle: {
    fontFamily: Fonts.mono,
    fontSize: 14,
    color: "#fff",
    marginBottom: 6,
  },
  groupLink: { color: "rgba(255,255,255,0.75)", fontSize: 14, paddingVertical: 2 },
  brandBlock: { alignItems: "center", gap: 10, paddingTop: 8 },
  wordmark: { fontFamily: "Chomsky", fontSize: 28, color: "#fff" },
  legalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  legalItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legalLink: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  legalSep: { color: "rgba(255,255,255,0.35)", fontSize: 12 },
  copy: {
    textAlign: "center",
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
  },
});
