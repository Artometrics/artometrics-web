import { Image, Text, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleActions } from "@/components/ArticleActions";
import { ArticleNarrationPlayer } from "@/components/ArticleNarrationPlayer";
import { CommentThread } from "@/components/platform/CommentThread";
import { ClapButton } from "@/components/platform/ClapButton";
import { TldrBox } from "@/components/TldrBox";
import { MagazineCard } from "@/components/MagazineCard";
import { CarouselRail } from "@/components/CarouselRail";
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
  const bleed = width < 900;
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const post = getBlogPost(slug);
  if (!post) {
    return (
      <Wrapper className="gap-3 pt-10 pb-4">
        <Text className="font-serif text-[36px] font-bold text-fg">Report not found</Text>
        <Link href="/blog">
          <Text className="text-accent">Back to reports</Text>
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
  const recommended = getRecommendedPosts(post.slug, 12);
  const cardW = Math.min(240, Math.max(180, width * 0.55));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate,
      image: hero ? [`https://artometrics.com${post.heroImage}`] : undefined,
      author: { "@type": "Person", name: authorLabel },
      publisher: {
        "@type": "Organization",
        name: "Artometrics",
        url: "https://artometrics.com",
      },
      mainEntityOfPage: `https://artometrics.com/${post.slug}`,
      articleSection: label ?? (section ? SECTION_META[section].title : "Articles"),
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
      {hero ? (
        <Wrapper variant={bleed ? "bleed" : "magazine"} className="pt-0 pb-2">
          <Image
            source={{ uri: hero }}
            className="w-full aspect-video max-h-[520px]"
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        </Wrapper>
      ) : null}
      <Wrapper variant="wide" className="pt-9 pb-2 gap-4">
        {label ? (
          <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">{label}</Text>
        ) : null}
        <Text className="font-serif text-[36px] leading-[42px] font-bold tracking-tight text-fg">
          {post.title}
        </Text>
        <Text className="font-serif text-xl leading-[30px] text-muted">{post.description}</Text>
        <Text className="font-serif text-[15px] leading-[22px] mt-1 text-fg">
          By {authorLabel}
          {post.pubDate ? ` · ${formatDate(post.pubDate)}` : ""}
          {` · ${minutes} min read`}
        </Text>
        <ArticleNarrationPlayer
          audioSrc={(post as { audioSrc?: string | null }).audioSrc}
          title={post.title}
        />
        <TldrBox
          tldr={tldr ?? post.description}
          keyPoints={withTopicKeyPoint(keyPoints, label)}
        />
        <ArticleActions slug={post.slug} title={post.title} placement="top" />
      </Wrapper>
      <Wrapper variant="wide" className="pt-2 pb-8">
        <ArticleBody html={post.body} />
      </Wrapper>
      <Wrapper variant="wide">
        <ArticleActions slug={post.slug} title={post.title} placement="bottom" />
        <View className="mt-4">
          <ClapButton targetKind="report" targetId={post.slug} />
        </View>
        <CommentThread targetKind="report" targetId={post.slug} />
      </Wrapper>
      {faq.length ? (
        <Wrapper variant="wide" className="pb-6 gap-2">
          <Text className="font-sans text-xl font-extrabold mb-2 text-fg">
            Frequently asked questions
          </Text>
          {faq.map((item) => (
            <View key={item.question} className="py-3 border-b border-border gap-1.5">
              <Text className="text-base font-bold leading-[22px] text-fg">{item.question}</Text>
              <Text className="text-[15px] leading-[22px] text-muted">{item.answer}</Text>
            </View>
          ))}
        </Wrapper>
      ) : null}

      {recommended.length ? (
        <View className="mt-2 mb-2">
          <CarouselRail title="Recommended reads" href="/blog">
            {recommended.map((r) => (
              <MagazineCard key={r.slug} post={r} variant="portrait" width={cardW} />
            ))}
          </CarouselRail>
        </View>
      ) : null}

      <Wrapper
        variant="prose"
        className="flex-row justify-between gap-6 py-8 border-t-2 border-fg mb-6"
      >
        {adjacent.previous ? (
          <Link href={adjacent.previous.href as `/${string}`}>
            <Text className="text-[11px] tracking-[1.5px] uppercase font-semibold mb-1.5 text-subtle">
              Previous
            </Text>
            <Text className="font-serif text-[17px] leading-6 max-w-[260px] text-fg">
              {adjacent.previous.title}
            </Text>
          </Link>
        ) : (
          <View />
        )}
        {adjacent.next ? (
          <Link href={adjacent.next.href as `/${string}`}>
            <Text className="text-[11px] tracking-[1.5px] uppercase font-semibold mb-1.5 text-subtle">
              Next
            </Text>
            <Text className="font-serif text-[17px] leading-6 max-w-[260px] text-fg">
              {adjacent.next.title}
            </Text>
          </Link>
        ) : null}
      </Wrapper>
    </View>
  );
}
