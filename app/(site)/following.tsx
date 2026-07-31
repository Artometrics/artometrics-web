import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { listFollowingFeed, type MemberPost } from "@/lib/platform/posts";
import { getProfile } from "@/lib/profile/service";

export default function FollowingFeedScreen() {
  const { colors } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<(MemberPost & { author?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (authLoading) return;
      if (!user) {
        router.replace("/login?next=%2Ffollowing");
        return;
      }
      let active = true;
      (async () => {
        try {
          setLoading(true);
          const feed = await listFollowingFeed(user.id);
          const enriched = await Promise.all(
            feed.map(async (p) => {
              const author = await getProfile(p.user_id).catch(() => null);
              return {
                ...p,
                author: author?.handle ? `@${author.handle}` : author?.display_name || "Member",
              };
            }),
          );
          if (active) setPosts(enriched);
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [user, authLoading]),
  );

  if (authLoading || !user) {
    return (
      <Wrapper className="gap-2.5 py-10">
        <Text className="text-muted">Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="gap-2.5 py-10">
      <PageSeo
        title="Following"
        description="Published work from people you follow on Artometrics."
        path="/following"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Feed</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">Following</Text>
      <Text className="font-serif text-base leading-[26px] max-w-[600px] text-muted">
        Longform from members you follow — not a noisy stream.
      </Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} className="mt-6" />
      ) : posts.length === 0 ? (
        <View className="mt-5 gap-3">
          <Text className="font-serif text-base leading-[26px] max-w-[600px] text-muted">
            Follow someone from their public profile to fill this feed.
          </Text>
          <PrimaryButton label="Open Studio" onPress={() => router.push("/studio")} />
        </View>
      ) : (
        <View className="mt-4 gap-3.5">
          {posts.map((post) => (
            <View key={post.id} className="border border-border p-[18px] gap-2">
              <Text className="text-[11px] tracking-[1.2px] uppercase font-bold text-accent">
                {post.author}
              </Text>
              <Text className="font-serif text-[22px] font-bold text-fg">{post.title}</Text>
              {post.excerpt ? (
                <Text className="font-serif text-base leading-[26px] max-w-[600px] text-muted" numberOfLines={3}>
                  {post.excerpt}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      )}

      <Link href="/me" className="mt-4">
        <Text className="text-accent font-bold">Your hub →</Text>
      </Link>
    </Wrapper>
  );
}
