import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { PageSeo } from "@/components/PageSeo";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export default function LibraryScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Library"
        description="Datasets and archives from Artometrics reporting."
        path="/library"
      />
      <Text style={[styles.title, { color: colors.text }]}>Library</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Datasets and archives tied to published stories.
      </Text>

      <View style={styles.grid}>
        {[
          { href: "/datasets", title: "Datasets", body: "CSV packs from published stories." },
          { href: "/blog", title: "Archive", body: "Every published article." },
          { href: "/topics", title: "Sections", body: "Sports, movies & TV, music, and more." },
          { href: "/podcast", title: "Podcasts", body: "Interviews and conversations." },
        ].map((card) => (
          <Link key={card.href} href={card.href as `/datasets`} asChild>
            <Pressable style={StyleSheet.flatten([styles.card, { borderColor: colors.border }])}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{card.title}</Text>
              <Text style={[styles.cardBody, { color: colors.textMuted }]}>{card.body}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={[styles.sub, { color: colors.text }]}>Browse by section</Text>
      <View style={styles.chips}>
        {SECTION_SLUGS.map((s) => (
          <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
            <Pressable style={StyleSheet.flatten([styles.chip, { borderColor: colors.border }])}>
              <Text style={{ color: colors.text, fontWeight: "600" }}>{SECTION_META[s].title}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 14 },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 12 },
  card: { flexBasis: 240, flexGrow: 1, borderWidth: StyleSheet.hairlineWidth, padding: 16, gap: 8 },
  cardTitle: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  cardBody: { fontSize: 14, lineHeight: 22 },
  sub: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", marginTop: 20 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 12, paddingVertical: 8 },
});
