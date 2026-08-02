import { Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { VhsShelf } from "@/components/VhsShelf";
import { PageSeo } from "@/components/PageSeo";
import { EDITIONS } from "@/data/editions";
import { SECTION_META } from "@/data/sections";

export default function EditionsIndex() {
  return (
    <View className="bg-black">
      <PageSeo
        title="Editions"
        description="Special issues of Artometrics — Music, Movies, Games, Power, and more — crash courses built from desk reports."
        path="/editions"
      />

      <Wrapper className="gap-3 py-12">
        <Text className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          Magazine
        </Text>
        <Text className="font-mono text-[40px] font-medium uppercase leading-none tracking-tight text-white">
          Special editions
        </Text>
        <View className="mb-2 mt-1 h-1 w-[120px] bg-accent" />
        <Text className="max-w-[640px] font-sans text-base leading-6 text-[#a3a3a3]">
          Vice-style crash courses by industry and interest — compiled from live
          Artometrics reports, with glue essays that cross-cite into new
          frameworks. Download EPUB or PDF from each issue.
        </Text>

        <View className="mt-6 flex-row flex-wrap gap-0 border-2 border-[#333]">
          {EDITIONS.map((ed, i) => (
            <Link key={ed.id} href={`/editions/${ed.id}`} asChild>
              <Pressable
                className={[
                  "min-w-[280px] flex-1 overflow-hidden border-[#333] bg-black pb-[18px]",
                  i % 2 === 0 ? "md:border-r-2" : "",
                  i < EDITIONS.length - 2 ? "border-b-2" : "",
                ].join(" ")}
              >
                {ed.heroImage ? (
                  <View className="relative aspect-[3/4] max-h-[420px] w-full overflow-hidden bg-[#111]">
                    <Image
                      source={{ uri: ed.heroImage }}
                      className="h-full w-full"
                      contentFit="cover"
                      transition={200}
                      accessibilityLabel={`${ed.title} cover`}
                    />
                    <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between border-b-2 border-black bg-[#F5F5F5] px-4 py-3">
                      <Text
                        className="text-[20px] text-black"
                        style={{ fontFamily: "Chomsky" }}
                      >
                        Artometrics
                      </Text>
                      <Text className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
                        Edition {String(i + 1).padStart(2, "0")}
                      </Text>
                    </View>
                    <View className="absolute bottom-0 left-0 right-0 border-t-2 border-black bg-[#F5F5F5] px-4 py-4">
                      <View className="mb-3 h-1 w-[80px] bg-accent" />
                      <Text
                        className="font-mono text-[22px] font-medium uppercase leading-none text-black"
                        numberOfLines={3}
                      >
                        {ed.title}
                      </Text>
                      <Text className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
                        {SECTION_META[ed.section]?.title ?? ed.section} ·{" "}
                        {ed.articleSlugs.length} reports · {ed.status}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <Text
                  className="mt-3 px-[18px] font-sans text-sm leading-[22px] text-[#a3a3a3]"
                  numberOfLines={3}
                >
                  {ed.dek}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>

      <VhsShelf editions={EDITIONS} />
    </View>
  );
}
