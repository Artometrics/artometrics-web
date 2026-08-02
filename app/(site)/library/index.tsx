import { Text, View, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { VhsShelf } from "@/components/VhsShelf";
import { GenreSpecimenCard } from "@/components/library/SpecimenCard";
import { EDITIONS } from "@/data/editions";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

const HUB = [
  {
    href: "/editions",
    title: "Editions",
    body: "Special issues — Music, Movies, Games, Power, and more.",
  },
  {
    href: "/datasets",
    title: "Datasets",
    body: "CSV packs from published stories.",
  },
  {
    href: "/library/reference",
    title: "Reference",
    body: "Gutenberg, WikiArt, Wikipedia specimen cards.",
  },
  { href: "/blog", title: "Archive", body: "Every published article." },
  { href: "/podcast", title: "Podcasts", body: "Interviews and conversations." },
] as const;

export default function LibraryScreen() {
  return (
    <View className="bg-black">
      <PageSeo
        title="Library"
        description="Datasets and archives from Artometrics reporting."
        path="/library"
      />

      <VhsShelf editions={EDITIONS} />

      <Wrapper className="gap-3.5 py-10">
        <Text className="font-mono text-[44px] font-medium uppercase tracking-wide text-white">
          Library
        </Text>
        <View className="h-1 w-[100px] bg-accent" />
        <Text className="max-w-[560px] font-sans text-base leading-6 text-[#a3a3a3]">
          Genres, desks, and open-reference specimens for research and remix.
        </Text>

        <Text className="mt-4 font-mono text-[26px] font-medium uppercase tracking-wide text-white">
          Collections
        </Text>
        <View className="mt-1 flex-row flex-wrap gap-4">
          {HUB.map((card, i) => (
            <GenreSpecimenCard
              key={card.href}
              title={card.title}
              subtitle={card.body}
              href={card.href}
              index={i}
              onPress={() => router.push(card.href as `/`)}
            />
          ))}
        </View>

        <Text className="mt-4 font-mono text-[26px] font-medium uppercase tracking-wide text-white">
          Browse by desk
        </Text>
        <View className="mt-1 flex-row flex-wrap gap-4">
          {SECTION_SLUGS.map((s, i) => (
            <GenreSpecimenCard
              key={s}
              title={SECTION_META[s].title}
              subtitle={SECTION_META[s].description || "Editorial desk"}
              href={`/topics/${s}`}
              index={i + 4}
              onPress={() => router.push(`/topics/${s}` as `/`)}
            />
          ))}
        </View>

        <Link href="/studio" asChild>
          <Pressable className="mt-3 self-start border-2 border-white px-3.5 py-3">
            <Text className="font-mono text-xs font-medium uppercase tracking-[1.2px] text-white">
              Studio tools →
            </Text>
          </Pressable>
        </Link>
      </Wrapper>
    </View>
  );
}
