import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export default function AboutScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="About"
        description="Artometrics — art for data scientists and data science for artists."
        path="/about"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Masthead</Text>
      <Text style={[styles.title, { color: colors.text }]}>
        Art for data scientists. Data science for artists.
      </Text>
      <View style={styles.copy}>
        <Text style={[styles.p, { color: colors.textMuted }]}>
          Artometrics is an independent magazine that treats culture like data — anime catalogs,
          franchise economics, civilizational cycles, and the institutions that shape creative
          markets. Every report pairs editorial judgment with reproducible charts and public
          datasets.
        </Text>
        <Text style={[styles.h, { color: colors.text }]}>About the desk</Text>
        <Text style={[styles.p, { color: colors.textMuted }]}>
          We are building a media company in public: long-form investigations, a podcast, a dataset
          library, and membership tools. The founder’s brief is simple — ship evidence with taste.
          Contact the desk for tips, corrections, or partnerships.
        </Text>
        <Text style={[styles.h, { color: colors.text }]}>Desks</Text>
        {SECTION_SLUGS.map((s) => (
          <Text key={s} style={[styles.p, { color: colors.textMuted }]}>
            <Link href={`/desks/${s}` as `/desks/${string}`}>
              <Text style={{ color: colors.accent, fontWeight: "700" }}>{SECTION_META[s].title}</Text>
            </Link>
            {" — "}
            {SECTION_META[s].description}
          </Text>
        ))}
        <Text style={[styles.h, { color: colors.text }]}>How we work with AI</Text>
        <Text style={[styles.p, { color: colors.textMuted }]}>
          Reports may be produced in directed collaboration with AI tools under human editorial
          judgment. We document process in editor’s notes. We do not invent statistics.
        </Text>
      </View>
      <View style={styles.actions}>
        <Link href="/blog" asChild>
          <PrimaryButton label="Browse reports" />
        </Link>
        <Link href="/contact" asChild>
          <PrimaryButton label="Contact" style={styles.secondary} />
        </Link>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
  },
  copy: { gap: 14, marginTop: 8 },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", marginTop: 8 },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 28 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 20 },
  secondary: { backgroundColor: "#404040" },
});
