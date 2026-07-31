import {
  Pressable,
  Text,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { MagazineCard } from "@/components/MagazineCard";
import { CarouselRail } from "@/components/CarouselRail";
import { TrendingRail } from "@/components/TrendingRail";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  getBlogPosts,
  getPodcastEpisodes,
  primarySection,
  sectionLabel,
} from "@/lib/content";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";
import { useAuth } from "@/lib/auth";

const RAIL_SECTIONS: SectionSlug[] = [...SECTION_SLUGS];

export default function HomeScreen() {
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const posts = getBlogPosts();
  const featured = posts[0];
  const topCarousel = posts.slice(0, 10);
  const leadSecondary = posts.slice(1, 2)[0];
  const trending = posts.slice(2, 8);
  const morePosts = posts.slice(8, 32);
  const podcasts = getPodcastEpisodes().slice(0, 8);
  const heroUri = assetUrl(featured?.heroImage);
  const featuredLabel = featured ? sectionLabel(featured.tags) : null;
  const featuredAuthor = featured?.author
    ? formatAuthorName(String(featured.author))
    : "Artometrics";
  const cardW = Math.min(280, Math.max(200, width * 0.72));
  const portraitW = Math.min(220, Math.max(170, width * 0.55));
  const topCardW = Math.min(300, Math.max(220, width * 0.68));

  return (
    <>
      <PageSeo
        title="Artometrics"
        description="Data reporting on culture, sports, film, music, and cities — clear, citable, easy to read."
        path="/"
      />

      <Wrapper variant="magazine" className="pt-7 pb-2">
        <View className="flex-row flex-wrap gap-6 items-stretch">
          <View className="flex-[1.2] min-w-[260px] gap-4 justify-center">
            <Text className="font-display text-[64px] leading-[64px] tracking-wide uppercase text-fg">
              DATA{"\n"}MAGAZINE
              <Text className="text-accent">*</Text>
            </Text>
            <Text className="font-sans text-sm leading-5 font-extrabold tracking-wide max-w-[360px] text-accent">
              REPORTS ON CULTURE, POWER, AND THE CREATIVE ECONOMY.
            </Text>
            <Link href="/blog" asChild>
              <Pressable
                className="w-[52px] h-[52px] rounded-full items-center justify-center mt-1 bg-accent"
                accessibilityLabel="Browse reports"
              >
                <Text className="text-white text-[22px] font-bold">→</Text>
              </Pressable>
            </Link>
          </View>
          {featured && heroUri ? (
            <View className="flex-1 min-w-[240px] relative pt-6 pr-4">
              <View className="absolute top-0 right-0 w-[72px] py-3.5 px-2 z-[2] bg-accent">
                <Text className="text-white text-[9px] font-extrabold tracking-[1.2px] text-center leading-3">
                  BASED IN{"\n"}CULTURE
                </Text>
              </View>
              <Link href={`/${featured.slug}`} asChild>
                <Pressable className="border-2 border-fg">
                  <Image
                    source={{ uri: heroUri }}
                    className="w-full aspect-[4/5]"
                    style={
                      Platform.OS === "web"
                        ? ({ filter: "grayscale(1) contrast(1.05)" } as object)
                        : undefined
                    }
                    contentFit="cover"
                    transition={200}
                    accessibilityLabel={featured.title}
                  />
                </Pressable>
              </Link>
            </View>
          ) : null}
        </View>
      </Wrapper>

      <View className="mt-5 mb-3 bg-fg">
        <Wrapper variant="magazine" className="flex-row flex-wrap py-[18px]">
          {[
            [String(posts.length), "REPORTS"],
            [String(SECTION_SLUGS.length), "DESKS"],
            [String(podcasts.length || "—"), "PODCASTS"],
            ["PD", "OPEN CANON"],
          ].map(([n, label], i, arr) => (
            <View
              key={label}
              className={[
                "flex-grow flex-basis-[120px] px-3 py-1.5 gap-1",
                i < arr.length - 1 ? "border-r border-base-700" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Text className="font-display text-[36px] leading-10 text-accent">{n}</Text>
              <Text className="text-white text-[10px] font-bold tracking-[1.4px]">{label}</Text>
            </View>
          ))}
        </Wrapper>
      </View>

      {user ? (
        <Wrapper variant="magazine" className="pt-5 pb-2 gap-2">
          <Text className="text-[11px] tracking-[1.6px] uppercase font-bold text-accent">
            Studio
          </Text>
          <Text className="font-sans text-[15px] leading-[22px] max-w-[520px] text-muted">
            Continue writing, check in, or publish — without leaving Artometrics.
          </Text>
          <Link href="/studio" asChild>
            <Pressable className="self-start px-4 py-3 bg-accent">
              <Text className="text-white font-extrabold text-xs tracking-[1.2px] uppercase">
                Open Studio →
              </Text>
            </Pressable>
          </Link>
        </Wrapper>
      ) : null}

      <CarouselRail title="Top stories" href="/blog">
        {topCarousel.map((post) => (
          <MagazineCard key={post.slug} post={post} variant="tile" width={topCardW} />
        ))}
      </CarouselRail>

      {featured ? (
        <Wrapper variant="magazine" className="pt-4 pb-10">
          <View className="flex-row flex-wrap gap-7">
            <View className="flex-[2] min-w-[280px] gap-2.5">
              {heroUri ? (
                <Link href={`/${featured.slug}`} asChild>
                  <Pressable className="mb-2">
                    <Image
                      source={{ uri: heroUri }}
                      className="w-full aspect-video border-2 border-border"
                      style={
                        Platform.OS === "web"
                          ? ({ filter: "grayscale(0.35)" } as object)
                          : undefined
                      }
                      contentFit="cover"
                      transition={200}
                      accessibilityLabel={featured.title}
                    />
                  </Pressable>
                </Link>
              ) : null}
              {featuredLabel ? (
                <Text className="text-[11px] tracking-[1.6px] uppercase font-bold mt-1 text-accent">
                  {featuredLabel}
                </Text>
              ) : null}
              <Link href={`/${featured.slug}`} asChild>
                <Pressable>
                  <Text className="font-display text-[40px] leading-[44px] tracking-wide uppercase text-fg">
                    {featured.title}
                  </Text>
                </Pressable>
              </Link>
              <Text className="font-sans text-base leading-6 max-w-[640px] text-muted">
                {deckLine(featured.description, 36)}
              </Text>
              <Text className="text-[11px] mt-0.5 tracking-wide uppercase font-semibold text-subtle">
                {featuredAuthor}
                {featured.pubDate ? ` · ${formatDate(featured.pubDate)}` : ""}
              </Text>
              {leadSecondary ? (
                <View className="mt-5 pt-4 border-t-2 border-border gap-1.5">
                  <Link href={`/${leadSecondary.slug}`} asChild>
                    <Pressable>
                      <Text className="font-display text-[22px] leading-[26px] uppercase text-fg">
                        {leadSecondary.title}
                      </Text>
                      <Text className="font-sans text-sm leading-[21px] text-muted" numberOfLines={2}>
                        {deckLine(leadSecondary.description, 22)}
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              ) : null}
            </View>
            <View className="flex-1 min-w-[260px] max-w-[380px]">
              <TrendingRail posts={trending} />
            </View>
          </View>
        </Wrapper>
      ) : null}

      {RAIL_SECTIONS.map((slug) => {
        const sectionPosts = posts.filter((p) => primarySection(p.tags) === slug).slice(0, 10);
        if (sectionPosts.length < 2) return null;
        return (
          <CarouselRail
            key={slug}
            title={SECTION_META[slug].title}
            href={`/topics/${slug}`}
          >
            {sectionPosts.map((post) => (
              <MagazineCard key={post.slug} post={post} variant="portrait" width={portraitW} />
            ))}
          </CarouselRail>
        );
      })}

      <CarouselRail title="More reports" href="/blog">
        {morePosts.map((post) => (
          <MagazineCard key={post.slug} post={post} variant="tile" width={cardW} />
        ))}
      </CarouselRail>

      <Wrapper variant="magazine" className="mb-10 gap-4">
        <Text className="font-display text-[32px] tracking-wide uppercase text-fg">Latest</Text>
        <View className="flex-row flex-wrap gap-5">
          {posts.slice(0, 12).map((post) => (
            <View key={post.slug} className="flex-basis-[280px] flex-grow max-w-[400px]">
              <MagazineCard post={post} variant="tile" />
            </View>
          ))}
        </View>
      </Wrapper>

      {podcasts.length ? (
        <CarouselRail title="Podcasts" href="/podcast">
          {podcasts.map((ep) => {
            const img = assetUrl(ep.image?.url);
            return (
              <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
                <Pressable style={{ width: cardW, gap: 8 }}>
                  {img ? (
                    <Image
                      source={{ uri: img }}
                      className="w-full aspect-square border border-border bg-bg-elevated"
                      contentFit="cover"
                      transition={200}
                    />
                  ) : (
                    <View className="w-full aspect-square border border-border bg-bg-elevated" />
                  )}
                  <Text className="text-[10px] font-bold tracking-[1.2px] text-accent">
                    EPISODE {ep.episodeNumber ?? ep.id}
                  </Text>
                  <Text
                    className="font-display text-lg leading-[22px] uppercase text-fg"
                    numberOfLines={3}
                  >
                    {ep.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </CarouselRail>
      ) : null}

      <Wrapper variant="magazine" className="mb-8 gap-3.5">
        <Text className="font-display text-[32px] tracking-wide uppercase text-fg">Sections</Text>
        <View className="flex-row flex-wrap gap-2">
          {SECTION_SLUGS.map((slug) => (
            <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
              <Pressable className="border-2 border-border px-3 py-2">
                <Text className="text-[11px] font-extrabold tracking-wide uppercase text-fg">
                  {SECTION_META[slug].title}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>

      <Wrapper variant="magazine" className="mb-10">
        <View className="flex-row flex-wrap items-center justify-between gap-4 p-7 bg-accent">
          <Text className="flex-1 min-w-[220px] text-white font-display text-[32px] leading-9 tracking-wide">
            {"LET'S READ SOMETHING\nTHAT PERFORMS."}
          </Text>
          <Link href="/blog" asChild>
            <Pressable
              className="w-16 h-16 rounded-full bg-inverse items-center justify-center"
              accessibilityLabel="Browse reports"
            >
              <Text className="text-fg text-[26px] font-bold">↗</Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
    </>
  );
}
