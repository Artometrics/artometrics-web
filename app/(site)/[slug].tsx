import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { PageSeo } from "@/components/PageSeo";
import {
  formatAuthorName,
  formatDate,
  getAdjacentPosts,
  getBlogPost,
  getBlogPosts,
  sectionLabel,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { paramString } from "@/lib/params";
import { trackEvent } from "@/lib/analytics/ga";

function estimateMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default function ReportScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const post = getBlogPost(slug);

  useEffect(() => {
    if (!post) return;
    trackEvent("report_view", { slug: post.slug });
  }, [post?.slug]);

  if (!post) {
    return (
      <Wrapper variant="narrow" className="gap-3 pb-4 pt-10">
        <Text className="font-serif text-2xl text-fg">Report not found</Text>
        <Link href="/">
          <Text className="font-sans text-[11px] uppercase tracking-[2px] text-muted">
            ← Contents
          </Text>
        </Link>
      </Wrapper>
    );
  }

  const section = post.tags?.[0];
  const label = sectionLabel(post.tags);
  const adjacent = getAdjacentPosts(post.slug);
  const minutes = estimateMinutes(post.body);
  const authorLabel = post.author ? formatAuthorName(String(post.author)) : "Kyle McAuliffe";
  const faq = (post as { faq?: { question: string; answer: string }[] }).faq ?? [];

  const imageAbs = post.heroImage?.startsWith("http")
    ? post.heroImage
    : post.heroImage
      ? `https://artometrics.com${post.heroImage}`
      : "https://artometrics.com/images/brand/og-default.png";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate,
      dateModified:
        (post as { updatedDate?: string }).updatedDate || post.pubDate,
      image: [imageAbs],
      author: { "@type": "Person", name: authorLabel },
      publisher: {
        "@type": "Organization",
        name: "Artometrics",
        url: "https://artometrics.com",
      },
      mainEntityOfPage: `https://artometrics.com/${post.slug}`,
      articleSection: label ?? (section ? SECTION_META[section as keyof typeof SECTION_META]?.title : "Articles"),
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
    <View className="bg-bg">
      <PageSeo
        title={post.title}
        description={post.description}
        path={`/${post.slug}`}
        image={post.heroImage || undefined}
        type="article"
      />
      <SeoJsonLd data={jsonLd} />

      <Wrapper variant="narrow" className="gap-6 border-b border-border py-8">
        {label ? (
          <Text className="font-sans text-[10px] font-semibold uppercase tracking-[2.5px] text-muted">
            {label}
          </Text>
        ) : null}
        <Text
          role="heading"
          aria-level={1}
          className="font-serif text-[32px] font-semibold leading-[1.15] tracking-tight text-fg md:text-[38px]"
        >
          {post.title}
        </Text>
        <Text className="font-sans text-[15px] leading-[24px] text-muted">
          {post.description}
        </Text>
        <Text className="font-sans text-[11px] uppercase tracking-[1.4px] text-subtle">
          {authorLabel}
          {post.pubDate ? ` · ${formatDate(post.pubDate)}` : ""} · {minutes} min
        </Text>
      </Wrapper>

      <Wrapper variant="narrow" className="py-8">
        <ArticleBody html={post.body} />
      </Wrapper>

      {faq.length ? (
        <Wrapper variant="narrow" className="gap-4 border-t border-border py-8">
          <Text className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-fg">
            Notes
          </Text>
          {faq.map((item) => (
            <View key={item.question} className="gap-1 border-b border-border pb-4">
              <Text className="font-serif text-[16px] font-semibold text-fg">
                {item.question}
              </Text>
              <Text className="font-sans text-[14px] leading-[22px] text-muted">
                {item.answer}
              </Text>
            </View>
          ))}
        </Wrapper>
      ) : null}

      <Wrapper variant="narrow" className="flex-row flex-wrap justify-between gap-4 border-t border-border py-8">
        {adjacent.previous ? (
          <Link href={adjacent.previous.href as `/${string}`} asChild>
            <Pressable className="max-w-[45%] gap-1">
              <Text className="font-sans text-[10px] uppercase tracking-[2px] text-muted">
                Previous
              </Text>
              <Text className="font-serif text-[15px] leading-snug text-fg" numberOfLines={2}>
                {adjacent.previous.title}
              </Text>
            </Pressable>
          </Link>
        ) : (
          <View className="flex-1" />
        )}
        {adjacent.next ? (
          <Link href={adjacent.next.href as `/${string}`} asChild>
            <Pressable className="max-w-[45%] items-end gap-1">
              <Text className="font-sans text-[10px] uppercase tracking-[2px] text-muted">
                Next
              </Text>
              <Text
                className="text-right font-serif text-[15px] leading-snug text-fg"
                numberOfLines={2}
              >
                {adjacent.next.title}
              </Text>
            </Pressable>
          </Link>
        ) : null}
      </Wrapper>

      <Wrapper variant="narrow" className="pb-12">
        <Link href="/" asChild>
          <Pressable>
            <Text className="font-sans text-[10px] font-semibold uppercase tracking-[2px] text-muted">
              ← Contents
            </Text>
          </Pressable>
        </Link>
      </Wrapper>
    </View>
  );
}
