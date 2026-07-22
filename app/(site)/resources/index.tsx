import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";

const guides = [
  {
    title: "How to read an Artometrics report",
    body: "Start with the chart caption. Separate observed data, derived metrics, and editorial indices. Check limitations before quoting a number.",
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
  return (
    <Wrapper style={styles.wrap}>
      <Text style={styles.eyebrow}>Library</Text>
      <Text style={styles.title}>Resources</Text>
      <Text style={styles.deck}>
        Guides for readers, analysts, and models — plus the dataset library behind the reports.
      </Text>

      <View style={styles.block}>
        {guides.map((g) => (
          <View key={g.title} style={styles.card}>
            <Text style={styles.cardTitle}>{g.title}</Text>
            <Text style={styles.cardBody}>{g.body}</Text>
            {"href" in g && g.href ? (
              <Text style={styles.link}>artometrics.com{g.href}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Link href="/datasets" asChild>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Browse datasets</Text>
          </Pressable>
        </Link>
        <Link href="/blog" asChild>
          <Pressable style={styles.btnGhost}>
            <Text style={styles.btnGhostText}>All reports</Text>
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
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", color: Colors.base900 },
  deck: { fontSize: 16, color: Colors.base600, maxWidth: 560, marginBottom: 8 },
  block: { gap: 14 },
  card: {
    borderTopWidth: 2,
    borderTopColor: Colors.base900,
    paddingTop: 14,
    gap: 8,
  },
  cardTitle: { fontSize: 20, color: Colors.base900 },
  cardBody: { fontSize: 15, lineHeight: 24, color: Colors.base600 },
  link: { color: Colors.accent700, fontWeight: "600", marginTop: 4 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 },
  btn: {
    backgroundColor: Colors.base900,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  btnText: {
    color: Colors.white,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  btnGhost: {
    borderWidth: 1,
    borderColor: Colors.base300,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  btnGhostText: {
    color: Colors.base900,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
