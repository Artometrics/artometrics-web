import { Text, View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";
import { getBlogPosts, primaryDesk } from "@/lib/content";

export async function generateStaticParams() {
  return SECTION_SLUGS.map((desk) => ({ desk }));
}

export default function DeskPage() {
  const { desk: raw } = useLocalSearchParams<{ desk: string }>();
  const { colors } = useTheme();
  const desk = raw as SectionSlug;
  const meta = SECTION_META[desk];

  if (!meta) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.text }}>Desk not found</Text>
        <Link href="/blog">
          <Text style={{ color: colors.accent }}>Reports</Text>
        </Link>
      </Wrapper>
    );
  }

  const posts = getBlogPosts().filter((p) => primaryDesk(p.tags) === desk);

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title={meta.title} description={meta.description} path={`/desks/${desk}`} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Desk</Text>
      <Text style={[styles.title, { color: colors.text }]}>{meta.title}</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>{meta.description}</Text>
      <View style={[styles.rule, { backgroundColor: colors.text }]} />
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} variant="row" />
      ))}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  rule: { height: 1, marginVertical: 8 },
});
