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
      <Wrapper className="gap-3 py-12">
        <Text className="text-[36px] font-light font-serif text-fg">Edition not found</Text>
        <Link href="/editions">
          <Text className="text-accent">Back to editions</Text>
        </Link>
      </Wrapper>
    );
  }

  const live = edition.articleSlugs
    .map((slug) => ({ slug, post: getBlogPost(slug) }))
    .filter((row) => row.post);

  const missing = edition.articleSlugs.filter((slug) => !getBlogPost(slug));
  const packs = getEditionPacks(edition.id);
  const openPack = (href: string) => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    void Linking.openURL(href);
  };

  return (
    <Wrapper variant="narrow" className="gap-3 py-12">
      <PageSeo title={edition.title} description={edition.dek} path={`/editions/${edition.id}`} />
      <Link href="/editions" asChild>
        <Pressable>
          <Text className="text-[13px] tracking-wide uppercase font-semibold text-accent">
            All editions
          </Text>
        </Pressable>
      </Link>
      <Text className="text-[10px] tracking-[1.5px] uppercase font-bold text-accent">
        {edition.status}
      </Text>
      <Text className="text-[36px] font-light font-serif text-fg">{edition.title}</Text>
      <Text className="text-xs tracking-[1.5px] uppercase text-subtle">
        {SECTION_META[edition.section]?.title ?? edition.section}
      </Text>
      {edition.heroImage ? (
        <Image
          source={{ uri: edition.heroImage }}
          className="w-full aspect-[3/4] max-h-[520px] my-2"
          contentFit="cover"
          transition={200}
          accessibilityLabel={`${edition.title} cover`}
        />
      ) : null}
      <Text className="text-base leading-[26px] text-muted">{edition.dek}</Text>

      {packs.epub || packs.pdf ? (
        <View className="gap-2 mt-1">
          <Text className="text-xl mt-4 font-serif text-fg">Download</Text>
          {packs.epub ? (
            <Pressable onPress={() => openPack(editionEpubHref(edition.id))}>
              <Text className="text-base font-semibold tracking-wide text-accent">
                EPUB — {edition.title}
              </Text>
            </Pressable>
          ) : null}
          {packs.pdf ? (
            <Pressable onPress={() => openPack(editionPdfHref(edition.id))}>
              <Text className="text-base font-semibold tracking-wide text-accent">
                PDF — {edition.title}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <Text className="text-xl mt-4 font-serif text-fg">In this issue</Text>
      <View className="gap-3">
        {live.map(({ slug, post }) => (
          <Link key={slug} href={`/${slug}`} asChild>
            <Pressable className="gap-0.5">
              <Text className="text-[17px] leading-6 text-fg">{post!.title}</Text>
              <Text className="text-xs text-subtle">{slug}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {edition.glueSlugs.length > 0 ? (
        <>
          <Text className="text-xl mt-4 font-serif text-fg">Glue &amp; meta (commissioned)</Text>
          <Text className="text-[13px] leading-5 mt-2 text-subtle">
            Cross-citing essays that mint new claims from multiple reports — ship as briefs, then
            live HTML.
          </Text>
          {edition.glueSlugs.map((slug) => (
            <Text key={slug} className="text-base leading-[26px] text-muted">
              · {slug}
            </Text>
          ))}
        </>
      ) : null}

      {missing.length > 0 ? (
        <Text className="text-[13px] leading-5 mt-2 text-subtle">
          Pending in corpus: {missing.join(", ")}
        </Text>
      ) : null}

      <Text className="text-[13px] leading-5 mt-2 text-subtle">
        Rebuild pack: npm run cos:ebook -- --edition {edition.id}
        {packs.pdf || packs.epub ? "" : " (no committed export yet)"}
      </Text>
    </Wrapper>
  );
}
