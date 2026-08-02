import { Text, View, Pressable, Linking, Platform } from "react-native";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { EDITIONS, getEdition } from "@/data/editions";
import { SECTION_META } from "@/data/sections";
import { getBlogPost } from "@/lib/content";
import { paramString } from "@/lib/params";
import {
  editionEpubHref,
  editionPdfHref,
  getEditionPacks,
} from "@/lib/editions/packs";

export async function generateStaticParams() {
  return EDITIONS.map((e) => ({ id: e.id }));
}

export default function EditionScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = paramString(params.id) ?? "";
  const edition = getEdition(id);

  if (!edition) {
    return (
      <View className="bg-black">
        <Wrapper className="gap-3 py-12">
          <Text className="font-mono text-[36px] font-medium uppercase text-white">
            Edition not found
          </Text>
          <Link href="/editions">
            <Text className="font-mono text-accent">Back to editions</Text>
          </Link>
        </Wrapper>
      </View>
    );
  }

  const live = edition.articleSlugs
    .map((slug) => ({ slug, post: getBlogPost(slug) }))
    .filter((row) => row.post);

  const missing = edition.articleSlugs.filter((slug) => !getBlogPost(slug));
  const packs = getEditionPacks(edition.id);
  const editionIndex = EDITIONS.findIndex((e) => e.id === edition.id);
  const editionNo = String(Math.max(1, editionIndex + 1)).padStart(2, "0");
  const more = live.slice(0, 3);

  const openPack = (href: string) => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    void Linking.openURL(href);
  };

  return (
    <View className="bg-black">
      <PageSeo
        title={edition.title}
        description={edition.dek}
        path={`/editions/${edition.id}`}
      />

      <Wrapper variant="narrow" className="gap-0 py-16">
        <Link href="/editions" asChild>
          <Pressable className="mb-4 self-start">
            <Text className="font-mono text-[12px] uppercase tracking-[0.06em] text-accent">
              ← All editions
            </Text>
          </Pressable>
        </Link>

        <Text className="mb-4 font-mono text-[13px] uppercase tracking-[0.08em] text-accent">
          Edition {editionNo} — {SECTION_META[edition.section]?.title ?? edition.section}{" "}
          · {edition.status}
        </Text>
        <Text className="font-mono text-[40px] font-medium uppercase leading-none tracking-tight text-white md:text-[56px]">
          {edition.title}
        </Text>
        <Text className="mt-6 font-sans text-[19px] leading-[1.5] text-[#a3a3a3]">
          {edition.dek}
        </Text>
        <View className="mt-7 flex-row flex-wrap gap-4 border-b border-[#262626] pb-7">
          <Text className="font-mono text-[12px] text-[#525252]">
            By the Artometrics Research Desk
          </Text>
          <Text className="font-mono text-[12px] text-[#525252]">—</Text>
          <Text className="font-mono text-[12px] text-[#525252]">
            {edition.articleSlugs.length} reports in this issue
          </Text>
        </View>
      </Wrapper>

      {edition.heroImage ? (
        <Wrapper className="pb-8">
          <Image
            source={{ uri: edition.heroImage }}
            className="aspect-[16/8] w-full bg-[#111]"
            contentFit="cover"
            transition={200}
            accessibilityLabel={`${edition.title} cover`}
          />
        </Wrapper>
      ) : null}

      <Wrapper className="gap-8 pb-12 md:flex-row">
        <View className="min-w-[260px] flex-[1.6] gap-4">
          <Text className="font-mono text-[22px] font-medium uppercase text-white">
            In this issue
          </Text>
          <View className="gap-3">
            {live.map(({ slug, post }) => (
              <Link key={slug} href={`/${slug}`} asChild>
                <Pressable className="gap-0.5 border-b border-[#262626] pb-3">
                  <Text className="font-sans text-[17px] leading-6 text-[#e5e5e5]">
                    {post!.title}
                  </Text>
                  <Text className="font-mono text-[11px] text-[#525252]">
                    {slug}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>

          {edition.glueSlugs.length > 0 ? (
            <View className="mt-4 gap-2">
              <Text className="font-mono text-[18px] font-medium uppercase text-white">
                Glue & meta
              </Text>
              <Text className="font-sans text-[13px] leading-5 text-[#737373]">
                Cross-citing essays that mint new claims from multiple reports.
              </Text>
              {edition.glueSlugs.map((slug) => (
                <Text
                  key={slug}
                  className="font-mono text-[14px] leading-6 text-[#a3a3a3]"
                >
                  · {slug}
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        <View className="min-w-[220px] flex-1 gap-4">
          {packs.epub || packs.pdf ? (
            <View className="border-2 border-[#333] p-4">
              <Text className="mb-3 font-mono text-[12px] font-medium uppercase text-white">
                Download
              </Text>
              {packs.epub ? (
                <Pressable
                  onPress={() => openPack(editionEpubHref(edition.id))}
                  className="mb-2"
                >
                  <Text className="font-mono text-[14px] text-accent">
                    EPUB — {edition.title} →
                  </Text>
                </Pressable>
              ) : null}
              {packs.pdf ? (
                <Pressable onPress={() => openPack(editionPdfHref(edition.id))}>
                  <Text className="font-mono text-[14px] text-accent">
                    PDF — {edition.title} →
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : (
            <View className="border-2 border-[#333] p-4">
              <Text className="font-mono text-[12px] font-medium uppercase text-white">
                Pack status
              </Text>
              <Text className="mt-2 font-sans text-[13px] leading-5 text-[#737373]">
                No committed EPUB/PDF yet. Rebuild with{" "}
                <Text className="font-mono text-[#a3a3a3]">
                  npm run cos:ebook -- --edition {edition.id}
                </Text>
              </Text>
            </View>
          )}

          {missing.length > 0 ? (
            <Text className="font-mono text-[11px] leading-5 text-[#525252]">
              Pending in corpus: {missing.join(", ")}
            </Text>
          ) : null}
        </View>
      </Wrapper>

      {more.length > 0 ? (
        <Wrapper className="pb-16">
          <Text className="mb-6 border-b-2 border-[#333] pb-3.5 font-mono text-[22px] font-medium uppercase text-white">
            More from this edition
          </Text>
          <View className="flex-row flex-wrap gap-6">
            {more.map(({ slug, post }) => (
              <Link key={slug} href={`/${slug}`} asChild>
                <Pressable className="min-w-[200px] flex-1">
                  {post!.heroImage ? (
                    <Image
                      source={{ uri: post!.heroImage }}
                      className="mb-3 aspect-[4/3] w-full bg-[#111]"
                      contentFit="cover"
                      transition={200}
                    />
                  ) : (
                    <View className="mb-3 aspect-[4/3] w-full bg-[#111]" />
                  )}
                  <Text className="font-sans text-[15px] font-bold leading-[1.3] text-white">
                    {post!.title}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </Wrapper>
      ) : null}
    </View>
  );
}
