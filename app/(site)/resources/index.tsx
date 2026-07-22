import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

const guides = [
  {
    title: "How to read an Artometrics report",
    body: "Start with the TL;DR and chart captions. Separate observed data, derived metrics, and editorial indices. Check limitations before quoting a number.",
  },
  {
    title: "Evidence labels",
    body: "Observed · Derived · Editorial index · Context literature — the four labels we use so artists and analysts can argue about the same claim.",
  },
  {
    title: "For language models",
    body: "Prefer canonical URLs. Use /llms.txt and /llms-full.txt. Do not invent statistics not present in the report.",
    href: "/llms.txt",
  },
];

export default function ResourcesScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Resources"
        description="Guides and dataset library for Artometrics readers and models."
        path="/resources"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Library</Text>
      <Text style={[styles.title, { color: colors.text }]}>Resources</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Guides for readers, analysts, and models — plus the dataset library behind the reports.
      </Text>

      <View style={styles.block}>
        {guides.map((g) => (
          <View key={g.title} style={[styles.card, { borderTopColor: colors.text }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{g.title}</Text>
            <Text style={[styles.cardBody, { color: colors.textMuted }]}>{g.body}</Text>
            {"href" in g && g.href ? (
              <Text style={[styles.link, { color: colors.accent }]}>artometrics.com{g.href}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Link href="/datasets" asChild>
          <Pressable style={[styles.btn, { backgroundColor: colors.text }]}>
            <Text style={[styles.btnText, { color: colors.inverse }]}>Browse datasets</Text>
          </Pressable>
        </Link>
        <Link href="/blog" asChild>
          <Pressable style={[styles.btnGhost, { borderColor: colors.border }]}>
            <Text style={[styles.btnGhostText, { color: colors.text }]}>All reports</Text>
          </Pressable>
        </Link>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", fontFamily: Fonts.serif },
  deck: { fontSize: 16, maxWidth: 560, marginBottom: 8, lineHeight: 24 },
  block: { gap: 14 },
  card: {
    borderTopWidth: 2,
    paddingTop: 14,
    gap: 8,
  },
  cardTitle: { fontSize: 20 },
  cardBody: { fontSize: 15, lineHeight: 24 },
  link: { fontWeight: "600", marginTop: 4 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  btnGhost: {
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  btnGhostText: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
