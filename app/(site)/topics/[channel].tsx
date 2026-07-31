import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { MagazineCard } from "@/components/MagazineCard";
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
      <Wrapper className="gap-3 py-10">
        <Text className="text-fg">Section not found</Text>
        <Link href="/topics">
          <Text className="text-accent">All sections</Text>
        </Link>
      </Wrapper>
    );
  }

  const posts = getBlogPosts().filter((p) => primarySection(p.tags) === mapped);

  return (
    <Wrapper variant="magazine" className="gap-3 py-10">
      <PageSeo title={meta.title} description={meta.description} path={`/topics/${mapped}`} />
      <Text className="text-xs font-bold tracking-[1.2px] uppercase text-subtle">View all</Text>
      <Text className="font-sans text-[40px] font-extrabold tracking-tight text-fg">
        {meta.title}
      </Text>
      <Text className="font-serif text-[17px] leading-[26px] max-w-[640px] text-muted">
        {meta.description}
      </Text>
      <View className="h-px my-2 bg-border" />
      {posts.length === 0 ? (
        <Text className="font-serif text-base text-muted">More stories coming soon.</Text>
      ) : (
        <View className="flex-row flex-wrap gap-5 mt-2">
          {posts.map((post) => (
            <View key={post.slug} className="flex-[1] min-w-[220px] max-w-[320px]">
              <MagazineCard post={post} variant="portrait" />
            </View>
          ))}
        </View>
      )}
    </Wrapper>
  );
}
