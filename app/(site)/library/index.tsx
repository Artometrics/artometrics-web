import { Text, View, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { PageSeo } from "@/components/PageSeo";
import { GenreSpecimenCard } from "@/components/library/SpecimenCard";
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
    <Wrapper className="gap-3.5 py-10">
      <PageSeo
        title="Library"
        description="Datasets and archives from Artometrics reporting."
        path="/library"
      />
      <Text className="font-display text-[44px] font-normal uppercase tracking-wide text-fg">
        Library
      </Text>
      <Text className="font-sans text-base leading-6 max-w-[560px] text-muted">
        Genres, desks, and open-reference specimens for research and remix.
      </Text>

      <Text className="font-display text-[26px] font-normal mt-4 uppercase tracking-wide text-fg">
        Collections
      </Text>
      <View className="flex-row flex-wrap gap-4 mt-1">
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

      <Text className="font-display text-[26px] font-normal mt-4 uppercase tracking-wide text-fg">
        Browse by desk
      </Text>
      <View className="flex-row flex-wrap gap-4 mt-1">
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

      <Link href="/tools" asChild>
        <Pressable className="mt-3 border-2 border-border px-3.5 py-3 self-start">
          <Text className="text-xs font-extrabold tracking-[1.2px] uppercase text-fg">
            Studio tools →
          </Text>
        </Pressable>
      </Link>
    </Wrapper>
  );
}
