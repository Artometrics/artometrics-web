import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import {
  DOMAIN_META,
  LEGACY_DESK_TO_SECTION,
  LEGACY_SECTION_TO_DOMAIN,
  SECTION_META,
  SECTION_SLUGS,
  type SectionSlug,
} from "@/data/sections";
import { getBlogPosts, primarySection } from "@/lib/content";
import { paramString } from "@/lib/params";

function resolveDomain(raw: string | undefined): SectionSlug | null {
  if (!raw) return null;
  if ((raw as SectionSlug) in SECTION_META) return raw as SectionSlug;
  return (
    LEGACY_SECTION_TO_DOMAIN[raw] ??
    LEGACY_DESK_TO_SECTION[raw] ??
    null
  );
}

export async function generateStaticParams() {
  const legacy = new Set([
    ...Object.keys(LEGACY_SECTION_TO_DOMAIN),
    ...Object.keys(LEGACY_DESK_TO_SECTION),
  ]);
  return [
    ...SECTION_SLUGS.map((channel) => ({ channel })),
    ...[...legacy].map((channel) => ({ channel })),
  ];
}

export default function TopicChannelPage() {
  const params = useLocalSearchParams<{ channel: string | string[] }>();
  const raw = paramString(params.channel);
  const mapped = resolveDomain(raw);
  const meta = mapped ? DOMAIN_META[mapped] : null;

  if (!meta || !mapped) {
    return (
      <Wrapper variant="narrow" className="gap-3 py-10">
        <Text className="text-fg">Section not found</Text>
        <Link href="/">
          <Text className="text-muted">← Front page</Text>
        </Link>
      </Wrapper>
    );
  }

  const posts = getBlogPosts().filter((p) => primarySection(p.tags) === mapped);

  return (
    <Wrapper variant="standard" className="gap-0 py-8 md:py-10">
      <PageSeo title={meta.title} description={meta.description} path={`/topics/${mapped}`} />
      {posts.length === 0 ? (
        <Text className="font-sans text-[15px] text-muted">More stories coming soon.</Text>
      ) : (
        <View className="gap-0 border-t border-border">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="pick" editorial />
          ))}
        </View>
      )}
    </Wrapper>
  );
}
