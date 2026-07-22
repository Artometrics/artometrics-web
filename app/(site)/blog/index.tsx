import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { Colors, Fonts } from "@/constants/Colors";
import { getBlogPosts, primaryDesk } from "@/lib/content";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";

export default function BlogIndex() {
  const { desk } = useLocalSearchParams<{ desk?: string }>();
  const deskFilter =
    desk && SECTION_SLUGS.includes(desk as SectionSlug)
      ? (desk as SectionSlug)
      : null;
  const posts = getBlogPosts().filter((post) =>
    deskFilter ? primaryDesk(post.tags) === deskFilter : true,
  );

  return (
    <Wrapper style={styles.wrap}>
      <Text style={styles.eyebrow}>{deskFilter ? "Desk" : "Archive"}</Text>
      <Text style={styles.title}>
        {deskFilter ? SECTION_META[deskFilter].title : "Reports"}
      </Text>
      <Text style={styles.deck}>
        {deskFilter
          ? SECTION_META[deskFilter].description
          : "Editorial data reports on culture, atlas, history, persona, and power."}
      </Text>
      <View style={styles.rule} />
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
    color: Colors.accent600,
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 40,
    fontWeight: "700",
    color: Colors.base900,
    letterSpacing: -0.4,
  },
  deck: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 26,
    color: Colors.base600,
    marginBottom: 8,
    maxWidth: 560,
  },
  rule: {
    height: 1,
    backgroundColor: Colors.base900,
    marginTop: 8,
    marginBottom: 4,
  },
  list: { gap: 0 },
});
