import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { useTheme } from "@/lib/theme";
import { Fonts } from "@/constants/Colors";
import { getBlogPosts, primarySection } from "@/lib/content";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";
import { PageSeo } from "@/components/PageSeo";

export default function BlogIndex() {
  const { colors } = useTheme();
  const { desk, section: sectionParam } = useLocalSearchParams<{
    desk?: string;
    section?: string;
  }>();
  const raw = sectionParam || desk;
  const sectionFilter =
    raw && SECTION_SLUGS.includes(raw as SectionSlug) ? (raw as SectionSlug) : null;
  const posts = getBlogPosts().filter((post) =>
    sectionFilter ? primarySection(post.tags) === sectionFilter : true,
  );

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title={sectionFilter ? SECTION_META[sectionFilter].title : "Latest"}
        description={
          sectionFilter
            ? SECTION_META[sectionFilter].description
            : "The latest Artometrics articles — clear, citable data reporting."
        }
        path="/blog"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>
        {sectionFilter ? "Section" : "Archive"}
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>
        {sectionFilter ? SECTION_META[sectionFilter].title : "Latest"}
      </Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        {sectionFilter
          ? SECTION_META[sectionFilter].description
          : "Sports, movies & TV, music, culture, cities, and more."}
      </Text>
      <View style={[styles.rule, { backgroundColor: colors.border }]} />
      <View style={styles.list}>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} variant="row" />
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  deck: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 8,
    maxWidth: 560,
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    marginTop: 8,
    marginBottom: 4,
  },
  list: { gap: 0 },
});
