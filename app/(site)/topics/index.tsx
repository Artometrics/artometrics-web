import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export default function TopicsIndex() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Sections"
        description="Browse Artometrics by section — sports, movies & TV, music, culture, and more."
        path="/topics"
      />
      <Text style={[styles.title, { color: colors.text }]}>Sections</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Clear categories for the stories people actually read.
      </Text>
      <View style={styles.list}>
        {SECTION_SLUGS.map((slug) => (
          <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
            <Pressable
              style={StyleSheet.flatten([styles.row, { borderBottomColor: colors.border }])}
            >
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                {SECTION_META[slug].title}
              </Text>
              <Text style={[styles.rowDek, { color: colors.textMuted }]}>
                {SECTION_META[slug].description}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  list: { marginTop: 8 },
  row: { paddingVertical: 18, borderBottomWidth: StyleSheet.hairlineWidth, gap: 6 },
  rowTitle: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: "700" },
  rowDek: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
