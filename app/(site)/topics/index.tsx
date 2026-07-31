import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export default function TopicsIndex() {
  return (
    <Wrapper className="gap-3 py-10">
      <PageSeo
        title="Sections"
        description="Browse Artometrics by section — sports, movies & TV, music, culture, and more."
        path="/topics"
      />
      <Text className="font-serif text-[40px] font-bold text-fg">Sections</Text>
      <Text className="font-serif text-[17px] leading-[26px] max-w-[560px] text-muted">
        Clear categories for the stories people actually read.
      </Text>
      <View className="mt-2">
        {SECTION_SLUGS.map((slug) => (
          <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
            <Pressable className="py-[18px] border-b border-border gap-1.5">
              <Text className="font-serif text-2xl font-bold text-fg">
                {SECTION_META[slug].title}
              </Text>
              <Text className="font-serif text-[15px] leading-[22px] text-muted">
                {SECTION_META[slug].description}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}
