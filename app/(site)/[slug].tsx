import { Image, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  formatDate,
  getAdjacentPosts,
  getBlogPost,
  getBlogPosts,
  primaryDesk,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";
import { SeoJsonLd } from "@/components/SeoJsonLd";

function estimateMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default function ReportScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const post = getBlogPost(slug);
  if (!post) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={styles.title}>Report not found</Text>
        <Link href="/blog">
          <Text style={styles.link}>Back to reports</Text>
        </Link>
      </Wrapper>
    );
  }

  const desk = primaryDesk(post.tags);
  const adjacent = getAdjacentPosts(post.slug);
  const minutes = estimateMinutes(post.body);

  const hero = assetUrl(post.heroImage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate,
    image: hero ? [`https://artometrics.com${post.heroImage}`] : undefined,
    author: { "@type": "Organization", name: "Artometrics" },
    publisher: {
      "@type": "Organization",
      name: "Artometrics",
      url: "https://artometrics.com",
    },
    mainEntityOfPage: `https://artometrics.com/${post.slug}`,
    articleSection: desk ? SECTION_META[desk].title : "Reports",
  };

  return (
    <View>
      <SeoJsonLd data={jsonLd} />
      <Wrapper style={styles.wrap} variant="prose">
        {desk ? <Text style={styles.eyebrow}>{SECTION_META[desk].title}</Text> : null}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.meta}>
          {formatDate(post.pubDate)} · {minutes} min read
        </Text>
        <Text style={styles.description}>{post.description}</Text>
        {hero ? (
          <Image
            source={{ uri: hero }}
            style={styles.hero}
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        ) : null}
      </Wrapper>
      <Wrapper variant="prose" style={styles.article}>
        <ArticleBody html={post.body} />
      </Wrapper>
      <Wrapper variant="prose" style={styles.adjacent}>
        {adjacent.previous ? (
          <Link href={adjacent.previous.href as `/${string}`}>
            <Text style={styles.adjLabel}>Previous</Text>
            <Text style={styles.adjTitle}>{adjacent.previous.title}</Text>
          </Link>
        ) : (
          <View />
        )}
        {adjacent.next ? (
          <Link href={adjacent.next.href as `/${string}`}>
            <Text style={styles.adjLabel}>Next</Text>
            <Text style={styles.adjTitle}>{adjacent.next.title}</Text>
          </Link>
        ) : null}
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 40, paddingBottom: 16, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 34, lineHeight: 40, fontWeight: "300", color: Colors.base900 },
  meta: { fontSize: 13, color: Colors.base500 },
  description: { fontSize: 17, lineHeight: 28, color: Colors.base600 },
  hero: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.base200,
  },
  article: { paddingBottom: 32 },
  adjacent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    paddingVertical: 32,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.base200,
    marginBottom: 24,
  },
  adjLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.base500,
    marginBottom: 6,
  },
  adjTitle: { fontSize: 16, color: Colors.base900, maxWidth: 260 },
  link: { color: Colors.accent700, marginTop: 12 },
});
