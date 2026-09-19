import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import {
  DOMAIN_META,
  DOMAIN_SLUGS,
  type DomainSlug,
} from "@/data/sections";
import {
  getBlogPosts,
  primarySection,
  type BlogPost,
} from "@/lib/content";

function groupByDomain(posts: BlogPost[]) {
  const map = new Map<DomainSlug, BlogPost[]>();
  for (const slug of DOMAIN_SLUGS) map.set(slug, []);
  for (const post of posts) {
    const desk = primarySection(post.tags);
    if (desk && map.has(desk as DomainSlug)) {
      map.get(desk as DomainSlug)!.push(post);
    }
  }
  return map;
}

/**
 * Book-style contents page — categories and chapter links, no images or promos.
 */
export function HomeMagazine() {
  const posts = getBlogPosts();
  const byDomain = groupByDomain(posts);

  return (
    <View className="min-h-[70vh] bg-bg">
      <Wrapper variant="narrow" className="gap-8 py-10 md:py-12">
        <View className="gap-2 border-b border-border pb-6">
          <Text
            className="text-center text-fg"
            style={{ fontFamily: "Chomsky", fontSize: 28 }}
          >
            Artometrics
          </Text>
          <Text className="text-center font-sans text-[13px] leading-5 text-muted">
            Data reports — read by chapter.
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-center gap-x-3 gap-y-2">
          {DOMAIN_SLUGS.map((slug) => (
            <Link key={slug} href={`/topics/${slug}` as `/`} asChild>
              <Pressable className="border border-border px-3 py-1.5">
                <Text className="font-sans text-[10px] font-semibold uppercase tracking-[2px] text-fg">
                  {DOMAIN_META[slug].title}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>

        <View className="gap-8">
          {DOMAIN_SLUGS.map((slug) => {
            const chapters = byDomain.get(slug) ?? [];
            if (!chapters.length) return null;
            return (
              <View key={slug} className="gap-3">
                <Link href={`/topics/${slug}` as `/`} asChild>
                  <Pressable>
                    <Text className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-fg">
                      {DOMAIN_META[slug].title}
                    </Text>
                  </Pressable>
                </Link>
                <View className="gap-2 border-l border-border pl-4">
                  {chapters.map((post) => (
                    <Link key={post.slug} href={`/${post.slug}` as `/`} asChild>
                      <Pressable className="py-0.5">
                        <Text className="font-serif text-[15px] leading-[1.35] text-fg">
                          {post.title}
                        </Text>
                      </Pressable>
                    </Link>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <View className="border-t border-border pt-6">
          <Link href="/blog" asChild>
            <Pressable>
              <Text className="font-sans text-[10px] font-semibold uppercase tracking-[2px] text-muted">
                Full index →
              </Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
    </View>
  );
}
