import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { colors } = useTheme();
  const mid = Math.ceil(SECTION_SLUGS.length / 2);
  const colA = SECTION_SLUGS.slice(0, mid);
  const colB = SECTION_SLUGS.slice(mid);

  return (
    <View style={styles.shell}>
      <View style={[styles.dark, { backgroundColor: colors.mode === "dark" ? "#000" : "#0A0A0A" }]}>
        <Wrapper style={styles.inner}>
          <View style={styles.cols}>
            <View style={styles.col}>
              <Text style={styles.groupTitle}>Sections</Text>
              {colA.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text style={styles.groupLink}>{SECTION_META[s].title}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={styles.groupTitle}> </Text>
              {colB.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text style={styles.groupLink}>{SECTION_META[s].title}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={styles.groupTitle}>More</Text>
              {[
                ["/blog", "Latest"],
                ["/podcast", "Podcasts"],
                ["/about", "About"],
                ["/authors", "Authors"],
                ["/library", "Library"],
                ["/get-app", "Get the App"],
              ].map(([href, label]) => (
                <Link key={href} href={href as `/blog`} asChild>
                  <Pressable>
                    <Text style={styles.groupLink}>{label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          <Link href="/" asChild>
            <Pressable style={styles.brandBlock} accessibilityLabel="Artometrics home">
              <Logo size={44} compact={1} align="center" markVariant="light" showWordmark={false} />
            </Pressable>
          </Link>

          <View style={styles.legalRow}>
            {[
              ["/legal/privacy", "Privacy"],
              ["/legal/terms", "Terms"],
              ["/legal/cookies", "Cookies"],
              ["/legal/ethics-statement", "Ethics"],
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
