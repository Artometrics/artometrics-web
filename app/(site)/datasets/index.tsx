import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { DATASET_PACKS } from "@/data/datasets";
import { SECTION_META } from "@/data/sections";

export default function DatasetsIndex() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Datasets"
        description="Dataset packs for Artometrics reports — schema, citations, and related stories."
        path="/datasets"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Library</Text>
      <Text style={[styles.title, { color: colors.text }]}>Datasets</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Packs for Artometrics sections — one schema, citations, and links to the reports that use
        them. Packs start planned and graduate to downloadable CSVs.
      </Text>
      <View style={styles.grid}>
        {DATASET_PACKS.map((pack) => (
          <Link key={pack.id} href={`/datasets/${pack.id}`} asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.card,
                { borderColor: colors.border, backgroundColor: colors.bgElevated },
              ])}
            >
              <Text style={[styles.status, { color: colors.accent }]}>{pack.status}</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{pack.title}</Text>
              <Text style={[styles.section, { color: colors.textSubtle }]}>
                {SECTION_META[pack.section].title}
              </Text>
              <Text style={[styles.cardBody, { color: colors.textMuted }]} numberOfLines={4}>
                {pack.summary}
              </Text>
            </Pressable>
          </Link>
        ))}
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
  deck: { fontSize: 16, maxWidth: 640, marginBottom: 8, lineHeight: 24 },
  grid: { gap: 16, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexBasis: 280,
    flexGrow: 1,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    gap: 8,
  },
  status: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  cardTitle: { fontSize: 22 },
  section: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" },
  cardBody: { fontSize: 14, lineHeight: 22 },
});
