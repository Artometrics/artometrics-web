import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { getBlogPosts, primarySection, primarySubdomain } from "@/lib/content";
import { isSubdomainSlug, SECTION_SLUGS, type SectionSlug } from "@/data/sections";
import { PageSeo } from "@/components/PageSeo";
import { paramString } from "@/lib/params";

export default function BlogIndex() {
  const params = useLocalSearchParams<{
    desk?: string | string[];
    section?: string | string[];
    subdomain?: string | string[];
  }>();
  const raw = paramString(params.section) || paramString(params.desk);
  const sectionFilter =
    raw && SECTION_SLUGS.includes(raw as SectionSlug) ? (raw as SectionSlug) : null;
  const rawSub = paramString(params.subdomain);
  const subdomainFilter = rawSub && isSubdomainSlug(rawSub) ? rawSub : null;
  const posts = getBlogPosts().filter((post) => {
    if (sectionFilter && primarySection(post.tags) !== sectionFilter) return false;
    if (subdomainFilter && primarySubdomain(post.tags) !== subdomainFilter) return false;
    return true;
  });

  return (
    <Wrapper variant="standard" className="gap-0 py-8 md:py-10">
      <PageSeo
        title="Index"
        description="All Artometrics reports."
        path="/blog"
      />
      <View className="border-t border-border">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} variant="pick" editorial />
        ))}
      </View>
    </Wrapper>
  );
}
