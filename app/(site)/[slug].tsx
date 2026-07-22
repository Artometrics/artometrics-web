import { Image, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleActions } from "@/components/ArticleActions";
import { TldrBox } from "@/components/TldrBox";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import {
  formatAuthorName,
  formatDate,
  getAdjacentPosts,
  getBlogPost,
  getBlogPosts,
  primarySection,
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
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const bleed = width < 900;
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const post = getBlogPost(slug);
  if (!post) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={[styles.title, { color: colors.text }]}>Report not found</Text>
        <Link href="/blog">
          <Text style={{ color: colors.accent }}>Back to reports</Text>
        </Link>
      </Wrapper>
    );
  }

  const section = primarySection(post.tags);
  const adjacent = getAdjacentPosts(post.slug);
  const minutes = estimateMinutes(post.body);
  const hero = assetUrl(post.heroImage);
  const authorLabel = post.author ? formatAuthorName(String(post.author)) : "Artometrics";

  const tldr = (post as { tldr?: string | null }).tldr ?? null;
  const keyPoints = (post as { keyPoints?: string[] }).keyPoints ?? [];
  const faq = (post as { faq?: { question: string; answer: string }[] }).faq ?? [];
  const related = getBlogPosts()
    .filter((p) => p.slug !== post.slug && primarySection(p.tags) === section)
    .slice(0, 4);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate,
      image: hero ? [`https://artometrics.com${post.heroImage}`] : undefined,
      author: { "@type": "Organization", name: authorLabel },
      publisher: {
        "@type": "Organization",
        name: "Artometrics",
        url: "https://artometrics.com",
      },
      mainEntityOfPage: `https://artometrics.com/${post.slug}`,
      articleSection: section ? SECTION_META[section].title : "Articles",
    },
    ...(faq.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <PageSeo
        title={post.title}
        description={post.description}
        path={`/${post.slug}`}
        image={post.heroImage || undefined}
        type="article"
      />
      <SeoJsonLd data={jsonLd} />
      {hero ? (
        <Wrapper variant={bleed ? "bleed" : "magazine"} style={styles.heroWrap}>
          <Image
            source={{ uri: hero }}
            style={styles.hero}
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        </Wrapper>
      ) : null}
      <Wrapper style={styles.front} variant="prose">
        {section ? (
          <Text style={[styles.eyebrow, { color: colors.accent }]}>
            {SECTION_META[section].title}
          </Text>
        ) : null}
        <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
        <Text style={[styles.dek, { color: colors.textMuted }]}>{post.description}</Text>
        <Text style={[styles.byline, { color: colors.text }]}>
          By {authorLabel}
          {post.pubDate ? ` · ${formatDate(post.pubDate)}` : ""}
          {` · ${minutes} min read`}
        </Text>
        <TldrBox tldr={tldr ?? post.description} keyPoints={keyPoints} />
      </Wrapper>
      <Wrapper variant="prose">
        <ArticleActions slug={post.slug} title={post.title} />
      </Wrapper>
      <Wrapper variant="prose" style={styles.article}>
        <ArticleBody html={post.body} />
      </Wrapper>
      {faq.length ? (
        <Wrapper variant="prose" style={styles.faq}>
          <Text style={[styles.faqTitle, { color: colors.text }]}>Frequently asked questions</Text>
          {faq.map((item) => (
            <View key={item.question} style={[styles.faqItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.faqQ, { color: colors.text }]}>{item.question}</Text>
              <Text style={[styles.faqA, { color: colors.textMuted }]}>{item.answer}</Text>
            </View>
          ))}
        </Wrapper>
      ) : null}
      {related.length ? (
        <Wrapper variant="prose" style={styles.related}>
          <Text style={[styles.faqTitle, { color: colors.text }]}>Related reports</Text>
          {related.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} asChild>
              <Text style={[styles.relatedLink, { color: colors.accent }]}>{r.title}</Text>
            </Link>
          ))}
        </Wrapper>
      ) : null}
      <Wrapper variant="prose" style={[styles.adjacent, { borderTopColor: colors.text }]}>
        {adjacent.previous ? (
          <Link href={adjacent.previous.href as `/${string}`}>
            <Text style={[styles.adjLabel, { color: colors.textSubtle }]}>Previous</Text>
            <Text style={[styles.adjTitle, { color: colors.text }]}>
              {adjacent.previous.title}
            </Text>
          </Link>
        ) : (
          <View />
        )}
        {adjacent.next ? (
          <Link href={adjacent.next.href as `/${string}`}>
            <Text style={[styles.adjLabel, { color: colors.textSubtle }]}>Next</Text>
            <Text style={[styles.adjTitle, { color: colors.text }]}>{adjacent.next.title}</Text>
          </Link>
        ) : null}
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 40, paddingBottom: 16, gap: 12 },
  front: { paddingTop: 36, paddingBottom: 8, gap: 16 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  dek: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
  },
  byline: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
  },
  heroWrap: { paddingTop: 0, paddingBottom: 8 },
  hero: {
    width: "100%",
    aspectRatio: 16 / 9,
    maxHeight: 520,
  },
  article: { paddingTop: 8, paddingBottom: 32 },
  faq: { paddingBottom: 24, gap: 8 },
  faqTitle: {
    fontFamily: Fonts.sans,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  faqItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  faqQ: { fontSize: 16, fontWeight: "700", lineHeight: 22 },
  faqA: { fontSize: 15, lineHeight: 22 },
  related: { paddingBottom: 24, gap: 10 },
  relatedLink: { fontSize: 16, lineHeight: 24, fontWeight: "600" },
  adjacent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    paddingVertical: 32,
    borderTopWidth: 2,
    marginBottom: 24,
  },
  adjLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 6,
  },
  adjTitle: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 24,
    maxWidth: 260,
  },
});
