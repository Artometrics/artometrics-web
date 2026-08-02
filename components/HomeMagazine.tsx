import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { assetUrl } from "@/lib/assets";
import {
  formatDate,
  getBlogPosts,
  getPodcastEpisodes,
} from "@/lib/content";
import { EDITIONS } from "@/data/editions";
import { SECTION_META } from "@/data/sections";

const HERO_FALLBACK = "/images/brand/hero-cover.png";
const STRIP = "/images/brand/signal-strip.png";

/**
 * KSM-energy homepage — full-bleed hero, signal band, magazine stack,
 * editions rail, interviews. Navigation-first, not a newsstand rack.
 */
export function HomeMagazine() {
  const posts = getBlogPosts();
  const episodes = getPodcastEpisodes().slice(0, 3);
  const cover = posts[0];
  const rest = posts.slice(1, 4);
  const editions = EDITIONS.slice(0, 6);
  const heroSrc = assetUrl(cover?.heroImage) || HERO_FALLBACK;

  return (
    <>
      {/* Full-bleed hero */}
      <View className="relative min-h-[88vh] w-full overflow-hidden bg-black">
        <Image
          source={{ uri: heroSrc }}
          className="absolute inset-0 h-full w-full"
          contentFit="cover"
          transition={250}
        />
        <View className="absolute inset-0 bg-black/50" />
        <Wrapper className="relative z-10 min-h-[88vh] justify-end gap-4 pb-12 pt-24">
          <Text
            className="text-5xl text-accent md:text-6xl"
            style={{ fontFamily: "Chomsky" }}
          >
            Artometrics
          </Text>
          <Text className="max-w-[18ch] font-display text-5xl uppercase leading-[0.92] tracking-[1px] text-white md:text-7xl">
            {cover?.title ?? "Data has a shape."}
          </Text>
          <Text className="max-w-[40ch] font-sans text-[15px] leading-6 text-white/80">
            {cover?.description ??
              "Data reports on culture, power, and the creative economy — clear, citable, loud."}
          </Text>
          <View className="mt-2 flex-row flex-wrap gap-3">
            <Link href={cover ? (`/${cover.slug}` as `/`) : "/blog"} asChild>
              <Pressable className="bg-accent px-5 py-3">
                <Text className="font-display text-[13px] uppercase tracking-[2px] text-white">
                  Read the report
                </Text>
              </Pressable>
            </Link>
            <Link href="/editions" asChild>
              <Pressable className="border-2 border-white px-5 py-3">
                <Text className="font-display text-[13px] uppercase tracking-[2px] text-white">
                  Browse editions
                </Text>
              </Pressable>
            </Link>
          </View>
        </Wrapper>
      </View>

      {/* Signal strip */}
      <View className="relative h-[160px] w-full overflow-hidden border-y-2 border-border bg-accent md:h-[220px]">
        <Image
          source={{ uri: STRIP }}
          className="absolute inset-0 h-full w-full opacity-70"
          contentFit="cover"
        />
        <View className="absolute inset-0 items-center justify-center px-4">
          <Text className="text-center font-display text-4xl uppercase tracking-[6px] text-white md:text-6xl">
            Signal
          </Text>
        </View>
      </View>

      {/* From the magazine */}
      <Wrapper className="gap-6 py-10">
        <View className="flex-row flex-wrap items-end justify-between gap-4">
          <View>
            <Text
              className="text-2xl text-accent"
              style={{ fontFamily: "Chomsky" }}
            >
              Issue
            </Text>
            <Text className="font-display text-4xl uppercase tracking-[2px] text-fg">
              From the magazine
            </Text>
          </View>
          <Link href="/blog" asChild>
            <Pressable>
              <Text className="font-display text-[12px] uppercase tracking-[2px] text-accent">
                All reports →
              </Text>
            </Pressable>
          </Link>
        </View>

        {cover ? <BlogCard post={cover} variant="cover" /> : null}

        <View className="flex-row flex-wrap gap-4">
          {rest.map((post) => (
            <View key={post.slug} className="min-w-[260px] flex-1">
              <BlogCard post={post} variant="stack" />
            </View>
          ))}
        </View>
      </Wrapper>

      {/* Editions — horizontal issue covers, not a newsstand */}
      <View className="border-t-2 border-border bg-black py-10">
        <Wrapper className="gap-5">
          <View className="flex-row flex-wrap items-end justify-between gap-3">
            <Text className="font-display text-4xl uppercase tracking-[2px] text-white">
              Editions
            </Text>
            <Link href="/editions" asChild>
              <Pressable>
                <Text className="font-display text-[12px] uppercase tracking-[2px] text-accent">
                  Full archive →
                </Text>
              </Pressable>
            </Link>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {editions.map((ed, i) => {
              const hero = assetUrl(ed.heroImage);
              return (
                <Link key={ed.id} href={`/editions/${ed.id}`} asChild>
                  <Pressable className="min-w-[140px] flex-1 basis-[30%] overflow-hidden border-2 border-white/30 bg-[#111]">
                    <View className="relative aspect-[3/4]">
                      {hero ? (
                        <Image
                          source={{ uri: hero }}
                          className="absolute inset-0 h-full w-full"
                          contentFit="cover"
                          transition={200}
                        />
                      ) : (
                        <View className="absolute inset-0 bg-accent" />
                      )}
                      <View className="absolute inset-0 justify-between p-3">
                        <Text className="font-display text-[11px] uppercase tracking-[2px] text-accent">
                          Vol. {String(i + 1).padStart(2, "0")}
                        </Text>
                        <View>
                          <Text
                            className="font-display text-[18px] uppercase leading-5 tracking-[1px] text-white"
                            numberOfLines={3}
                          >
                            {ed.title}
                          </Text>
                          <Text className="mt-1 text-[10px] uppercase tracking-[1.2px] text-white/60">
                            {SECTION_META[ed.section]?.title ?? ed.section}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </Wrapper>
      </View>

      {/* Interviews / podcast */}
      {episodes.length > 0 ? (
        <View className="border-t-2 border-border bg-bg py-10">
          <Wrapper className="gap-4">
            <View className="flex-row flex-wrap items-end justify-between gap-3">
              <Text className="font-display text-4xl uppercase tracking-[2px] text-fg">
                Interviews
              </Text>
              <Link href="/podcast" asChild>
                <Pressable>
                  <Text className="font-display text-[12px] uppercase tracking-[2px] text-accent">
                    All episodes →
                  </Text>
                </Pressable>
              </Link>
            </View>
            <View className="border-2 border-border">
              {episodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/podcast/interviews/${ep.id}` as `/`}
                  asChild
                >
                  <Pressable className="flex-row items-center gap-4 border-b-2 border-border px-4 py-5 last:border-b-0">
                    {ep.image ? (
                      <Image
                        source={{ uri: assetUrl(ep.image) ?? ep.image }}
                        className="h-16 w-16"
                        contentFit="cover"
                      />
                    ) : (
                      <View className="h-16 w-16 bg-accent" />
                    )}
                    <View className="min-w-0 flex-1 gap-1">
                      <Text className="font-display text-[11px] uppercase tracking-[2px] text-accent">
                        Ep · {ep.duration || "Listen"}
                      </Text>
                      <Text
                        className="font-display text-xl uppercase leading-6 tracking-[1px] text-fg"
                        numberOfLines={2}
                      >
                        {ep.title}
                      </Text>
                      <Text className="text-[11px] uppercase tracking-[1.2px] text-subtle">
                        {formatDate(ep.pubDate)}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              ))}
            </View>
          </Wrapper>
        </View>
      ) : null}
    </>
  );
}
