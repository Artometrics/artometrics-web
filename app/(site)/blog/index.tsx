import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { getBlogPosts, primarySection } from "@/lib/content";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";
import { PageSeo } from "@/components/PageSeo";
import { paramString } from "@/lib/params";

export default function BlogIndex() {
  const params = useLocalSearchParams<{
    desk?: string | string[];
    section?: string | string[];
  }>();
  const raw = paramString(params.section) || paramString(params.desk);
  const sectionFilter =
    raw && SECTION_SLUGS.includes(raw as SectionSlug) ? (raw as SectionSlug) : null;
  const posts = getBlogPosts().filter((post) =>
    sectionFilter ? primarySection(post.tags) === sectionFilter : true,
  );

  return (
    <Wrapper className="gap-3 py-10">
      <PageSeo
        title={sectionFilter ? SECTION_META[sectionFilter].title : "Latest"}
        description={
          sectionFilter
            ? SECTION_META[sectionFilter].description
            : "The latest Artometrics articles — clear, citable data reporting."
        }
        path="/blog"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">
        {sectionFilter ? "Section" : "Archive"}
      </Text>
      <Text className="font-serif text-[40px] font-bold tracking-tight text-fg">
        {sectionFilter ? SECTION_META[sectionFilter].title : "Latest"}
      </Text>
      <Text className="font-serif text-[17px] leading-[26px] mb-2 max-w-[560px] text-muted">
        {sectionFilter
          ? SECTION_META[sectionFilter].description
          : "Sports, movies & TV, music, culture, cities, and more."}
      </Text>
      <View className="h-px mt-2 mb-1 bg-border" />
      <View>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} variant="row" />
        ))}
      </View>
    </Wrapper>
  );
}
