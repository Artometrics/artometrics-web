import { Pressable, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { getBlogPosts, primarySection } from "@/lib/content";
import { SECTION_SLUGS, type SectionSlug } from "@/data/sections";
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
    <Wrapper variant="standard" className="gap-0 py-8 md:py-10">
      <PageSeo
        title="Index"
        description="All Artometrics reports."
        path="/blog"
      />
      <View className="border-t border-border">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${post.slug}` as `/`} asChild>
            <Pressable className="border-b border-border py-4">
              <Text className="font-serif text-[17px] leading-[1.3] text-fg">
                {post.title}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}
