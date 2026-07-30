import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { EDITIONS } from "@/data/editions";
import { SECTION_META } from "@/data/sections";

export default function EditionsIndex() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Editions"
        description="Special issues of Artometrics — Music, Movies, Games, Power, and more — crash courses built from desk reports."
        path="/editions"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Magazine</Text>
      <Text style={[styles.title, { color: colors.text }]}>Special editions</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Vice-style crash courses by industry and interest — compiled from live Artometrics reports,
        with glue essays that cross-cite into new frameworks.
      </Text>
      <View style={styles.grid}>
        {EDITIONS.map((ed) => (
          <Link key={ed.id} href={`/editions/${ed.id}`} asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.card,
                { borderColor: colors.border, backgroundColor: colors.bgElevated },
              ])}
            >
              <Text style={[styles.status, { color: colors.accent }]}>{ed.status}</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{ed.title}</Text>
              <Text style={[styles.section, { color: colors.textSubtle }]}>
                {SECTION_META[ed.section]?.title ?? ed.section} · {ed.articleSlugs.length} reports
              </Text>
              <Text style={[styles.cardBody, { color: colors.textMuted }]} numberOfLines={4}>
                {ed.dek}
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
  cardTitle: { fontSize: 22, fontFamily: Fonts.serif },
  section: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" },
  cardBody: { fontSize: 14, lineHeight: 22 },
});
