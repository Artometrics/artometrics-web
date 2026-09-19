import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  getBlogPosts,
  sectionLabel,
  type BlogPost,
} from "@/lib/content";

function HomeLeadStory({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const label = sectionLabel(post.tags);
  return (
    <View className="gap-3 md:flex-[3] md:min-w-0">
      {label ? (
        <Text className="font-sans text-[10px] font-semibold uppercase tracking-[1.8px] text-muted">
          {label}
        </Text>
      ) : null}
      <Link href={`/${post.slug}`} asChild>
        <Pressable>
          <Text className="font-serif text-[26px] font-bold leading-[1.12] tracking-tight text-fg md:text-[32px]">
            {post.title}
          </Text>
        </Pressable>
      </Link>
      <Text className="font-sans text-[14px] leading-[22px] text-muted">
        {deckLine(post.description, 40)}
      </Text>
      {related.length > 0 ? (
        <View className="mt-1 gap-3 border-t border-border pt-4">
          {related.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} asChild>
              <Pressable>
                <Text className="font-serif text-[16px] font-semibold leading-[1.25] text-fg">
                  {r.title}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function HomeFeatureStory({ post }: { post: BlogPost }) {
  const label = sectionLabel(post.tags);
  const hero = assetUrl(post.heroImage);
  return (
    <View className="gap-3 md:flex-[5] md:min-w-0">
      <Link href={`/${post.slug}`} asChild>
        <Pressable className="overflow-hidden border border-border">
          {hero ? (
            <Image
              source={{ uri: hero }}
              className="aspect-[16/10] w-full"
              contentFit="cover"
              transition={250}
              accessibilityLabel={post.title}
            />
          ) : (
            <View className="aspect-[16/10] w-full bg-border" />
          )}
        </Pressable>
      </Link>
      {label ? (
        <Text className="font-sans text-[10px] font-semibold uppercase tracking-[1.8px] text-muted">
          {label}
        </Text>
      ) : null}
      <Link href={`/${post.slug}`} asChild>
        <Pressable>
          <Text className="font-serif text-[24px] font-bold leading-[1.15] tracking-tight text-fg md:text-[28px]">
            {post.title}
          </Text>
        </Pressable>
      </Link>
      <Text className="font-sans text-[13px] leading-[20px] text-muted">
        {deckLine(post.description, 32)}
      </Text>
    </View>
  );
}

function HomeEditorsPicks({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <View className="md:flex-[2] md:min-w-0 md:border-l md:border-border md:pl-6">
      <Text className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[2px] text-muted">
        Editor&apos;s picks
      </Text>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} variant="pick" editorial />
      ))}
    </View>
  );
}

function HomeTopStoriesGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <View className="gap-5 border-t border-border pt-8">
      <View className="items-center gap-2">
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-muted">
          Top stories
        </Text>
        <View className="h-px w-full max-w-md bg-border" />
      </View>
      <View className="flex-row flex-wrap gap-4">
        {posts.map((post) => (
          <View key={post.slug} className="min-w-[140px] flex-1 basis-[45%] md:basis-[22%]">
            <BlogCard post={post} variant="stack" editorial />
          </View>
        ))}
      </View>
    </View>
  );
}

/** FT-style front page — light, B&W, no promos. */
export function HomeMagazine() {
  const posts = getBlogPosts();
  const lead = posts[0];
  const feature = posts[1] ?? posts[0];
  const relatedUnderLead = posts.slice(2, 5);
  const picks = posts.slice(5, 10);
  const topStories = posts.slice(10, 18);

  if (!lead) {
    return (
      <Wrapper className="py-16">
        <Text className="font-serif text-xl text-fg">No reports yet.</Text>
      </Wrapper>
    );
  }

  return (
    <View className="bg-bg">
      <Wrapper className="gap-8 py-8 md:py-10">
        <View className="flex-col gap-10 md:flex-row md:items-start md:gap-8">
          <HomeLeadStory post={lead} related={relatedUnderLead} />
          <HomeFeatureStory post={feature} />
          <HomeEditorsPicks posts={picks} />
        </View>
        <HomeTopStoriesGrid posts={topStories} />
      </Wrapper>
    </View>
  );
}
