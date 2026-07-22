import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { PageSeo } from "@/components/PageSeo";
import { CHANNEL_META, CHANNEL_SLUGS, SECTION_META, SECTION_SLUGS } from "@/data/sections";

export default function LibraryScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Library"
        description="Datasets, code packs, methodology, and reusable Artometrics assets."
        path="/library"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Reuse our work</Text>
      <Text style={[styles.title, { color: colors.text }]}>Library</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Public datasets, downloadable report packs, and guides for readers, analysts, and models.
      </Text>

      <View style={styles.grid}>
        {[
          { href: "/datasets", title: "Datasets", body: "CSV packs tied to published reports." },
          { href: "/resources", title: "Resources", body: "Guides for reading and citing Artometrics." },
          { href: "/blog", title: "Report archive", body: "Every published data report." },
          { href: "/topics", title: "Topics", body: "Sports, travel, fashion, games, and more." },
        ].map((card) => (
          <Link key={card.href} href={card.href as `/datasets`} asChild>
            <Pressable style={StyleSheet.flatten([styles.card, { borderColor: colors.border }])}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{card.title}</Text>
              <Text style={[styles.cardBody, { color: colors.textMuted }]}>{card.body}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={[styles.sub, { color: colors.text }]}>Browse by desk</Text>
      <View style={styles.chips}>
        {SECTION_SLUGS.map((s) => (
          <Link key={s} href={`/desks/${s}` as `/desks/${string}`} asChild>
            <Pressable style={StyleSheet.flatten([styles.chip, { borderColor: colors.border }])}>
              <Text style={{ color: colors.accent, fontWeight: "700" }}>{SECTION_META[s].title}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={[styles.sub, { color: colors.text }]}>Browse by topic</Text>
      <View style={styles.chips}>
        {CHANNEL_SLUGS.map((s) => (
          <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
            <Pressable style={StyleSheet.flatten([styles.chip, { borderColor: colors.border }])}>
              <Text style={{ color: colors.text }}>{CHANNEL_META[s].title}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 14 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 12 },
  card: { flexBasis: 240, flexGrow: 1, borderWidth: 1, padding: 16, gap: 8 },
  cardTitle: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  cardBody: { fontSize: 14, lineHeight: 22 },
  sub: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", marginTop: 20 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
});
