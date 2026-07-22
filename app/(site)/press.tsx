import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export default function PressScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Press"
        description="Artometrics boilerplate, brand assets, and press contact."
        path="/press"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Press</Text>
      <Text style={[styles.title, { color: colors.text }]}>Brand & press</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        Artometrics is an independent data-science magazine for the creative industries and culture
        — art for data scientists and data science for artists.
      </Text>
      <Text style={[styles.h, { color: colors.text }]}>Boilerplate</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        We publish editorial data reports with reproducible charts and public datasets, a podcast,
        and membership tools for readers who want evidence without hype.
      </Text>
      <Text style={[styles.h, { color: colors.text }]}>Assets</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        Chomsky A mark (black / white / red): see{" "}
        <Link href="/library">
          <Text style={{ color: colors.accent }}>/library</Text>
        </Link>{" "}
        and the brand kit checklist in the owner playbook.
      </Text>
      <Text style={[styles.h, { color: colors.text }]}>Contact</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        Press inquiries via{" "}
        <Link href="/contact">
          <Text style={{ color: colors.accent }}>Contact</Text>
        </Link>
        .
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", marginTop: 12 },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
});
