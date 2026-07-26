import { Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { formatDate, getLegalPage, getLegalPages } from "@/lib/content";
import { paramString } from "@/lib/params";
import { useTheme } from "@/lib/theme";

export async function generateStaticParams() {
  return getLegalPages().map((page) => ({ slug: page.id }));
}

export default function LegalScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const page = getLegalPage(slug);
  const { colors } = useTheme();

  if (!page) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={[styles.title, { color: colors.text }]}>Page not found</Text>
        <Link href="/">
          <Text style={[styles.link, { color: colors.accent }]}>Home</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper variant="prose" style={styles.wrap}>
        <Text style={[styles.eyebrow, { color: colors.accent }]}>Legal</Text>
        <Text style={[styles.title, { color: colors.text }]}>{page.page}</Text>
        <Text style={[styles.meta, { color: colors.textSubtle }]}>
          {formatDate(page.pubDate)}
        </Text>
        <ArticleBody html={page.body} />
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300" },
  meta: { fontSize: 13, marginBottom: 8 },
  link: {},
});
