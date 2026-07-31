import { Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { EDITIONS } from "@/data/editions";
import { SECTION_META } from "@/data/sections";

export default function EditionsIndex() {
  return (
    <Wrapper className="gap-3.5 py-12">
      <PageSeo
        title="Editions"
        description="Special issues of Artometrics — Music, Movies, Games, Power, and more — crash courses built from desk reports."
        path="/editions"
      />
      <Image
        source={{ uri: "/images/editions/_index-banner.jpg" }}
        className="w-full h-[220px] mb-2"
        contentFit="cover"
        transition={200}
        accessibilityLabel="Artometrics special editions"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">Magazine</Text>
      <Text className="text-[40px] font-light font-serif text-fg">Special editions</Text>
      <Text className="text-base max-w-[640px] mb-2 leading-6 text-muted">
        Vice-style crash courses by industry and interest — compiled from live Artometrics reports,
        with glue essays that cross-cite into new frameworks. Download EPUB or PDF from each issue.
      </Text>
      <View className="gap-4 flex-row flex-wrap">
        {EDITIONS.map((ed) => (
          <Link key={ed.id} href={`/editions/${ed.id}`} asChild>
            <Pressable className="flex-[1] min-w-[280px] border border-border bg-bg-elevated p-0 gap-2 overflow-hidden pb-[18px]">
              {ed.heroImage ? (
                <Image
                  source={{ uri: ed.heroImage }}
                  className="w-full aspect-[3/4] mb-1"
                  contentFit="cover"
                  transition={200}
                  accessibilityLabel={`${ed.title} cover`}
                />
              ) : null}
              <Text className="text-[10px] tracking-[1.5px] uppercase font-bold text-accent px-[18px]">
                {ed.status}
              </Text>
              <Text className="text-[22px] font-serif px-[18px] text-fg">{ed.title}</Text>
              <Text className="text-xs tracking-[1.5px] uppercase text-subtle px-[18px]">
                {SECTION_META[ed.section]?.title ?? ed.section} · {ed.articleSlugs.length} reports
              </Text>
              <Text className="text-sm leading-[22px] text-muted px-[18px]" numberOfLines={4}>
                {ed.dek}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}
