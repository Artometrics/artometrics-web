import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { assetUrl } from "@/lib/assets";
import {
  formatDate,
  sectionLabel,
  type BlogPost,
} from "@/lib/content";

function SectionTitle({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <View className="mb-7 flex-row items-baseline justify-between border-b-2 border-[#333] pb-4">
      <Text className="font-mono text-[28px] font-medium uppercase tracking-[0.02em] text-white">
        {title}
      </Text>
      {href && linkLabel ? (
        <Link href={href as `/`} asChild>
          <Pressable>
            <Text className="font-mono text-[12px] uppercase tracking-[0.06em] text-accent">
              {linkLabel}
            </Text>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

function RedTag({ label }: { label: string }) {
  return (
    <View className="mb-2.5 self-start bg-accent px-2 py-0.5">
      <Text className="font-mono text-[10px] uppercase tracking-[0.06em] text-white">
        {label}
      </Text>
    </View>
  );
}

/**
 * Homepage editorial bands under the newsstand — Website Home design.
 * Dark field, DM Mono section labels, red tags, hard rules.
 */
export function HomeEditorial({ posts }: { posts: BlogPost[] }) {
  const feature = posts[0];
  const latest = posts.slice(1, 5);
  const reports = posts.slice(0, 3);
  const dataBand = posts.filter((p) => p.tags?.includes("science") || p.tags?.includes("civics")).slice(0, 3);
  const dataList = (dataBand.length >= 3 ? dataBand : posts.slice(3, 6)).slice(0, 3);
  const columns = posts.slice(4, 8);

  if (!feature) return null;

  const featureHero = assetUrl(feature.heroImage);
  const featureLabel = sectionLabel(feature.tags);

  return (
    <View className="w-full bg-black pb-16">
      {/* Feature + Latest */}
      <Wrapper variant="bleed" className="mx-auto w-full max-w-[1200px] px-5 pb-16 md:px-12">
        <View className="flex-row flex-wrap gap-10">
        <View className="min-w-[280px] flex-[1.6]">
          <Link href={`/${feature.slug}`} asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={feature.title}
              className="relative aspect-[16/9] overflow-hidden bg-[#111]"
            >
              {featureHero ? (
                <Image
                  source={{ uri: featureHero }}
                  className="absolute inset-0 h-full w-full"
                  contentFit="cover"
                  transition={200}
                />
              ) : null}
              <View className="absolute inset-0 bg-black/40" />
              <View className="absolute bottom-0 left-0 right-0 p-6">
                <Text className="mb-2 font-mono text-[12px] uppercase tracking-[0.08em] text-accent">
                  {featureLabel ?? "Report"} · Feature
                </Text>
                <Text className="font-mono text-[28px] font-medium uppercase leading-[1.05] text-white md:text-[36px]">
                  {feature.title}
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>

        <View className="w-full min-w-[240px] flex-none md:w-[340px]">
          <Text className="mb-1 border-b border-[#333] pb-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[#525252]">
            Latest
          </Text>
          {latest.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} asChild>
              <Pressable className="border-b border-[#262626] py-4">
                <Text className="font-sans text-[15px] font-medium leading-5 text-white">
                  {post.title}
                </Text>
                <Text className="mt-1 font-mono text-[11px] text-[#525252]">
                  {formatDate(post.pubDate)}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
        </View>
      </Wrapper>

      {/* Reports */}
      <Wrapper variant="bleed" className="mx-auto w-full max-w-[1200px] px-5 pb-16 md:px-12">
        <SectionTitle title="Reports" href="/blog" linkLabel="Read all →" />
        <View className="flex-row flex-wrap gap-7">
          {reports.map((post) => {
            const hero = assetUrl(post.heroImage);
            const label = sectionLabel(post.tags) ?? "Report";
            return (
              <Link key={post.slug} href={`/${post.slug}`} asChild>
                <Pressable className="min-w-[240px] flex-1 gap-0">
                  <View className="mb-3.5 aspect-[4/3] overflow-hidden bg-[#111]">
                    {hero ? (
                      <Image
                        source={{ uri: hero }}
                        className="h-full w-full"
                        contentFit="cover"
                        transition={200}
                      />
                    ) : null}
                  </View>
                  <RedTag label={label} />
                  <Text className="font-sans text-[17px] font-bold leading-[1.3] text-white">
                    {post.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </Wrapper>

      {/* Data */}
      <Wrapper variant="bleed" className="mx-auto w-full max-w-[1200px] px-5 pb-16 md:px-12">
        <SectionTitle title="Data" href="/datasets" linkLabel="Datasets →" />
        <View className="flex-row flex-wrap gap-7">
          <View className="min-w-[260px] flex-[1.4] aspect-[16/9] overflow-hidden bg-[#111]">
            {assetUrl(dataList[0]?.heroImage) ? (
              <Image
                source={{ uri: assetUrl(dataList[0].heroImage)! }}
                className="h-full w-full"
                contentFit="cover"
                transition={200}
              />
            ) : null}
          </View>
          <View className="min-w-[220px] flex-1 justify-between">
            {dataList.map((post, i) => (
              <Link key={post.slug} href={`/${post.slug}`} asChild>
                <Pressable
                  className={[
                    "py-4",
                    i < dataList.length - 1 ? "border-b border-[#262626]" : "",
                  ].join(" ")}
                >
                  <Text className="mb-1 font-mono text-[10px] uppercase text-[#525252]">
                    {formatDate(post.pubDate)}
                  </Text>
                  <Text className="font-sans text-[15px] font-bold text-white">
                    {post.title}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </Wrapper>

      {/* Columns */}
      {columns.length > 0 ? (
        <Wrapper variant="bleed" className="mx-auto w-full max-w-[1200px] px-5 md:px-12">
          <SectionTitle title="Columns" href="/blog" linkLabel="Read all →" />
          <View className="flex-row flex-wrap gap-5">
            {columns.map((post) => {
              const hero = assetUrl(post.heroImage);
              return (
                <Link key={post.slug} href={`/${post.slug}`} asChild>
                  <Pressable className="min-w-[140px] flex-1 basis-[22%]">
                    <View className="mb-2.5 aspect-square overflow-hidden bg-[#111]">
                      {hero ? (
                        <Image
                          source={{ uri: hero }}
                          className="h-full w-full"
                          contentFit="cover"
                          transition={200}
                        />
                      ) : null}
                    </View>
                    <Text className="font-sans text-[13px] leading-[1.4] text-white">
                      {post.title}
                    </Text>
                    <Text className="mt-1.5 font-mono text-[9px] uppercase text-[#525252]">
                      Column
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </Wrapper>
      ) : null}
    </View>
  );
}
