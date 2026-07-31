import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { getBlogPost } from "@/lib/content";
import { ensureProfileRow, getProfile, type UserProfile } from "@/lib/profile/service";
import { listOwnPosts, type MemberPost } from "@/lib/platform/posts";

export default function MeHubScreen() {
  const { colors } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<MemberPost[]>([]);
  const [saved, setSaved] = useState<{ article_slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (authLoading) return;
      if (!user) {
        router.replace("/login?next=%2Fme");
        return;
      }
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await ensureProfileRow(user.id, user.email, user.user_metadata?.full_name);
          const p = await getProfile(user.id);
          const own = await listOwnPosts(user.id).catch(() => []);
          if (active) {
            setProfile(p);
            setPosts(own);
          }
          try {
            const res = await apiFetch("saved-articles");
            if (res.ok) {
              const data = (await res.json()) as { items?: typeof saved };
              if (active) setSaved(data.items ?? []);
            }
          } catch {
            /* soft */
          }
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
      <Wrapper className="gap-3 py-10">
        <Text className="text-muted">Loading…</Text>
      </Wrapper>
    );
  }

  const name = profile?.display_name || profile?.pen_name || "Member";

  return (
    <Wrapper className="gap-3 py-10">
      <PageSeo title="Your hub" description="Your Artometrics profile hub." path="/me" />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">You</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">{name}</Text>
      {profile?.handle ? (
        <Link href={`/u/${profile.handle}` as `/u/${string}`}>
          <Text className="text-accent font-bold">@{profile.handle} →</Text>
        </Link>
      ) : (
        <Text className="font-serif text-base leading-[26px] max-w-[560px] text-muted">
          Claim a handle in{" "}
          <Link href="/settings">
            <Text className="text-accent">Settings</Text>
          </Link>{" "}
          to open a public profile.
        </Text>
      )}
      {profile?.bio ? (
        <Text className="font-serif text-base leading-[26px] max-w-[560px] text-muted">{profile.bio}</Text>
      ) : null}

      <View className="flex-row flex-wrap gap-2.5 mt-2">
        <PrimaryButton label="Studio" onPress={() => router.push("/studio")} />
        <PrimaryButton
          label="Publish"
          onPress={() => router.push("/studio/publish")}
          className="bg-muted"
        />
        <Link href="/settings" asChild>
          <PrimaryButton label="Settings" className="bg-muted" />
        </Link>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} className="mt-6" />
      ) : (
        <>
          <View className="mt-5 pt-[18px] border-t border-border gap-2">
            <Text className="font-serif text-[22px] font-bold text-fg">Your posts</Text>
            {posts.length === 0 ? (
              <Text className="font-serif text-base leading-[26px] max-w-[560px] text-muted">
                Nothing published yet. Write in Studio, then publish to your profile.
              </Text>
            ) : (
              posts.map((post) => (
                <View key={post.id} className="py-3 border-b border-border gap-1">
                  <Text className="text-[11px] tracking-[1.2px] uppercase font-bold text-accent">
                    {post.status}
                  </Text>
                  <Text className="font-serif text-lg text-fg">{post.title}</Text>
                </View>
              ))
            )}
          </View>

          <View className="mt-5 pt-[18px] border-t border-border gap-2">
            <Text className="font-serif text-[22px] font-bold text-fg">Saved reports</Text>
            {saved.length === 0 ? (
              <Text className="font-serif text-base leading-[26px] max-w-[560px] text-muted">
                No saved reports yet. Open any article and tap Save.
              </Text>
            ) : (
              saved.map((item) => {
                const post = getBlogPost(item.article_slug);
                return (
                  <Link key={item.article_slug} href={`/${item.article_slug}` as `/`} asChild>
                    <Pressable className="py-3 border-b border-border gap-1">
                      <Text className="font-serif text-lg text-fg">
                        {post?.title ?? item.article_slug}
                      </Text>
                    </Pressable>
                  </Link>
                );
              })
            )}
          </View>
        </>
      )}
    </Wrapper>
  );
}
