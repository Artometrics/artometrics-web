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
      <Wrapper style={styles.ctaWrap}>
        <View style={[styles.cta, { backgroundColor: colors.accent }]}>
          <Text style={styles.ctaTitle}>
            LET&apos;S CREATE{"\n"}SOMETHING GREAT{"\n"}TOGETHER.
          </Text>
          <Link href="/contact" asChild>
            <Pressable style={styles.ctaCircle} accessibilityLabel="Contact Artometrics">
              <Text style={styles.ctaArrow}>↗</Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
      <View style={[styles.dark, { backgroundColor: "#000000" }]}>
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
  ctaWrap: { marginBottom: 0 },
  cta: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 32,
    paddingHorizontal: 8,
  },
  ctaTitle: {
    flex: 1,
    minWidth: 220,
    color: "#FFFFFF",
    fontFamily: Fonts.display,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  ctaCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaArrow: { color: "#000000", fontSize: 28, fontWeight: "700" },
  dark: { paddingVertical: 36 },
  inner: { gap: 28 },
  cols: { flexDirection: "row", flexWrap: "wrap", gap: 28 },
  col: { minWidth: 140, gap: 8, flexGrow: 1 },
  groupTitle: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#D9251B",
    marginBottom: 6,
  },
  groupLink: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    paddingVertical: 2,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
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
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
