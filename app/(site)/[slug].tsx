import React, { Suspense, useEffect } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleActions } from "@/components/ArticleActions";
import { TldrBox } from "@/components/TldrBox";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import {
  formatAuthorName,
  formatDate,
  getAdjacentPosts,
  getBlogPost,
  getBlogPosts,
  getRecommendedPosts,
  primarySection,
  sectionLabel,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { paramString } from "@/lib/params";
import { trackEvent } from "@/lib/analytics/ga";

const ArticleNarrationPlayer = React.lazy(
  () => import("@/components/ArticleNarrationPlayer").then((m) => ({ default: m.ArticleNarrationPlayer }))
);
const CommentThread = React.lazy(
  () => import("@/components/platform/CommentThread").then((m) => ({ default: m.CommentThread }))
);
const ClapButton = React.lazy(
  () => import("@/components/platform/ClapButton").then((m) => ({ default: m.ClapButton }))
);

function estimateMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

/** Ensure every report TL;DR includes a third bullet for topic · subcategory. */
function withTopicKeyPoint(keyPoints: string[] | undefined, label: string | null): string[] {
  const points = [...(keyPoints ?? [])];
  if (!label) return points;
  const topicLine = `Topic — ${label}`;
  if (points.some((p) => /^topic\b/i.test(p) || p.includes(label))) return points;
  if (points.length >= 2) {
    points.splice(2, 0, topicLine);
  } else {
    points.push(topicLine);
  }
  return points;
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default function ReportScreen() {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const post = getBlogPost(slug);

  useEffect(() => {
    if (!post) return;
    trackEvent("report_view", { slug: post.slug });
  }, [post?.slug]);

  if (!post) {
    return (
      <Wrapper className="gap-3 pb-4 pt-10">
        <Text className="font-display text-4xl uppercase tracking-[1px] text-fg">
          Report not found
        </Text>
        <Link href="/blog">
          <Text className="font-display text-[13px] uppercase tracking-[2px] text-accent">
            Back to reports →
          </Text>
        </Link>
      </Wrapper>
    );
  }

  const section = primarySection(post.tags);
  const label = sectionLabel(post.tags);
  const adjacent = getAdjacentPosts(post.slug);
  const minutes = estimateMinutes(post.body);
  const hero = assetUrl(post.heroImage);
  const authorLabel = post.author ? formatAuthorName(String(post.author)) : "Kyle McAuliffe";

  const tldr = (post as { tldr?: string | null }).tldr ?? null;
  const keyPoints = (post as { keyPoints?: string[] }).keyPoints ?? [];
  const faq = (post as { faq?: { question: string; answer: string }[] }).faq ?? [];
  const recommended = getRecommendedPosts(post.slug, 6);

  const imageAbs = post.heroImage?.startsWith("http")
    ? post.heroImage
    : post.heroImage
      ? `https://artometrics.com${post.heroImage}`
      : "https://artometrics.com/images/brand/og-default.png";
  const dateModified =
    (post as { updatedDate?: string }).updatedDate || post.pubDate;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate,
      dateModified,
      image: [imageAbs],
      author: { "@type": "Person", name: authorLabel },
      publisher: {
        "@type": "Organization",
        name: "Artometrics",
        url: "https://artometrics.com",
        logo: {
          "@type": "ImageObject",
          url: "https://artometrics.com/images/brand/chomsky-a.png",
        },
      },
      mainEntityOfPage: `https://artometrics.com/${post.slug}`,
      articleSection: label ?? (section ? SECTION_META[section].title : "Articles"),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://artometrics.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Reports",
          item: "https://artometrics.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://artometrics.com/${post.slug}`,
        },
      ],
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

      {/* Full-bleed hero — matches home cover plane */}
      {hero ? (
        <View className="relative w-full overflow-hidden bg-black">
          <Image
            source={{ uri: hero }}
            className="w-full"
            style={{ height: Math.min(560, Math.max(280, width * 0.52)) }}
            contentFit="cover"
            transition={250}
            accessibilityLabel={post.title}
          />
          <View className="absolute inset-x-0 bottom-0 h-24 bg-black/40" />
        </View>
      ) : (
        <View className="h-3 w-full bg-accent" />
      )}

      {/* Masthead */}
      <Wrapper className="gap-4 border-b-2 border-border pb-8 pt-8">
        <View className="flex-row flex-wrap items-center gap-3">
          <Text
            className="text-2xl text-accent"
            style={{ fontFamily: "Chomsky" }}
          >
            Artometrics
          </Text>
          <Text className="font-display text-[12px] uppercase tracking-[2px] text-subtle">
            Report
          </Text>
          {label ? (
            <Text className="font-display text-[12px] uppercase tracking-[2px] text-accent">
              {label}
            </Text>
          ) : null}
        </View>

        <Text
          role="heading"
          aria-level={1}
          className="max-w-[18ch] font-display text-5xl uppercase leading-[0.92] tracking-[1px] text-fg md:text-7xl"
        >
          {post.title}
        </Text>

        <Text className="max-w-[48ch] font-sans text-[17px] leading-7 text-muted">
          {post.description}
        </Text>

        <View className="mt-1 flex-row flex-wrap items-center gap-x-3 gap-y-1 border-t-2 border-border pt-4">
          <Text className="font-mono text-[11px] uppercase tracking-[1.4px] text-subtle">
            By {authorLabel}
          </Text>
          {post.pubDate ? (
            <Text className="font-mono text-[11px] uppercase tracking-[1.4px] text-subtle">
              {formatDate(post.pubDate)}
            </Text>
          ) : null}
          <Text className="font-mono text-[11px] uppercase tracking-[1.4px] text-accent">
            {minutes} min read
          </Text>
        </View>
      </Wrapper>

      {/* Tools + signal facts */}
      <Wrapper className="gap-4 py-6">
        <Suspense fallback={null}>
          <ArticleNarrationPlayer
            audioSrc={(post as { audioSrc?: string | null }).audioSrc}
            title={post.title}
          />
        </Suspense>
        <ArticleActions slug={post.slug} title={post.title} placement="top" />
        <TldrBox
          tldr={tldr ?? post.description}
          keyPoints={withTopicKeyPoint(keyPoints, label)}
        />
      </Wrapper>

      {/* Body */}
      <View className="border-t-2 border-border">
        <Wrapper className="py-8">
          <ArticleBody html={post.body} />
        </Wrapper>
      </View>

      {/* End matter */}
      <Wrapper className="gap-4 border-t-2 border-border py-8">
        <ArticleActions slug={post.slug} title={post.title} placement="bottom" />
        <Suspense fallback={null}>
          <ClapButton targetKind="report" targetId={post.slug} />
        </Suspense>
        <Suspense fallback={null}>
          <CommentThread targetKind="report" targetId={post.slug} />
        </Suspense>
      </Wrapper>

      {faq.length ? (
        <View className="border-t-2 border-border bg-black py-10">
          <Wrapper className="gap-5">
            <Text className="font-display text-4xl uppercase tracking-[2px] text-white">
              FAQ
            </Text>
            <View className="border-2 border-white/30">
              {faq.map((item) => (
                <View
                  key={item.question}
                  className="gap-2 border-b-2 border-white/30 px-4 py-5 last:border-b-0"
                >
                  <Text className="font-display text-lg uppercase leading-6 tracking-[1px] text-white">
                    {item.question}
                  </Text>
                  <Text className="font-sans text-[15px] leading-6 text-white/75">
                    {item.answer}
                  </Text>
                </View>
              ))}
            </View>
          </Wrapper>
        </View>
      ) : null}

      {recommended.length ? (
        <View className="border-t-2 border-border bg-bg py-10">
          <Wrapper className="gap-5">
            <View className="flex-row flex-wrap items-end justify-between gap-3">
              <Text className="font-display text-4xl uppercase tracking-[2px] text-fg">
                Keep reading
              </Text>
              <Link href="/blog" asChild>
                <Pressable>
                  <Text className="font-display text-[12px] uppercase tracking-[2px] text-accent">
                    All reports →
                  </Text>
                </Pressable>
              </Link>
            </View>
            <View className="flex-row flex-wrap gap-4">
              {recommended.slice(0, 3).map((r) => (
                <View key={r.slug} className="min-w-[240px] flex-1">
                  <BlogCard post={r} variant="stack" />
                </View>
              ))}
            </View>
            <View className="border-2 border-border">
              {recommended.slice(3).map((r) => (
                <BlogCard key={r.slug} post={r} variant="row" />
              ))}
            </View>
          </Wrapper>
        </View>
      ) : null}

      <View className="border-t-2 border-border">
        <Wrapper className="flex-row flex-wrap justify-between gap-6 py-10">
          {adjacent.previous ? (
            <Link href={adjacent.previous.href as `/${string}`} asChild>
              <Pressable className="min-w-[200px] flex-1 gap-2">
                <Text className="font-display text-[11px] uppercase tracking-[2px] text-accent">
                  Previous
                </Text>
                <Text
                  className="font-display text-2xl uppercase leading-7 tracking-[1px] text-fg"
                  numberOfLines={3}
                >
                  {adjacent.previous.title}
                </Text>
              </Pressable>
            </Link>
          ) : (
            <View className="flex-1" />
          )}
          {adjacent.next ? (
            <Link href={adjacent.next.href as `/${string}`} asChild>
              <Pressable className="min-w-[200px] flex-1 items-end gap-2">
                <Text className="font-display text-[11px] uppercase tracking-[2px] text-accent">
                  Next
                </Text>
                <Text
                  className="text-right font-display text-2xl uppercase leading-7 tracking-[1px] text-fg"
                  numberOfLines={3}
                >
                  {adjacent.next.title}
                </Text>
              </Pressable>
            </Link>
          ) : null}
        </Wrapper>
      </View>
    </View>
  );
}
