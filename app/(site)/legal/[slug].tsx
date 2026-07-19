import { Text, StyleSheet } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { Colors } from "@/constants/Colors";
import { formatDate, getLegalPage, getLegalPages } from "@/lib/content";

export async function generateStaticParams() {
  return getLegalPages().map((page) => ({ slug: page.id }));
}

export default function LegalScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const page = getLegalPage(slug);

  if (!page) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={styles.title}>Page not found</Text>
        <Link href="/">
          <Text style={styles.link}>Home</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: page.page }} />
      <Wrapper variant="prose" style={styles.wrap}>
        <Text style={styles.eyebrow}>Legal</Text>
        <Text style={styles.title}>{page.page}</Text>
        <Text style={styles.meta}>{formatDate(page.pubDate)}</Text>
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
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900 },
  meta: { fontSize: 13, color: Colors.base500, marginBottom: 8 },
  link: { color: Colors.accent700 },
});
