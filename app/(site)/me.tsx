import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
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
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  const name = profile?.display_name || profile?.pen_name || "Member";

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title="Your hub" description="Your Artometrics profile hub." path="/me" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>You</Text>
      <Text style={[styles.title, { color: colors.text }]}>{name}</Text>
      {profile?.handle ? (
        <Link href={`/u/${profile.handle}` as `/u/${string}`}>
          <Text style={{ color: colors.accent, fontWeight: "700" }}>@{profile.handle} →</Text>
        </Link>
      ) : (
        <Text style={[styles.deck, { color: colors.textMuted }]}>
          Claim a handle in{" "}
          <Link href="/settings">
            <Text style={{ color: colors.accent }}>Settings</Text>
          </Link>{" "}
          to open a public profile.
        </Text>
      )}
      {profile?.bio ? (
        <Text style={[styles.deck, { color: colors.textMuted }]}>{profile.bio}</Text>
      ) : null}

      <View style={styles.actions}>
        <PrimaryButton label="Studio" onPress={() => router.push("/studio")} />
        <PrimaryButton
          label="Publish"
          onPress={() => router.push("/studio/publish")}
          style={{ backgroundColor: colors.textMuted }}
        />
        <Link href="/settings" asChild>
          <PrimaryButton label="Settings" style={{ backgroundColor: colors.textMuted }} />
        </Link>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} />
      ) : (
        <>
          <View style={[styles.block, { borderTopColor: colors.border }]}>
            <Text style={[styles.h, { color: colors.text }]}>Your posts</Text>
            {posts.length === 0 ? (
              <Text style={[styles.deck, { color: colors.textMuted }]}>
                Nothing published yet. Write in Studio, then publish to your profile.
              </Text>
            ) : (
              posts.map((post) => (
                <View
                  key={post.id}
                  style={StyleSheet.flatten([styles.row, { borderBottomColor: colors.border }])}
                >
                  <Text style={[styles.meta, { color: colors.accent }]}>{post.status}</Text>
                  <Text style={[styles.rowTitle, { color: colors.text }]}>{post.title}</Text>
                </View>
              ))
            )}
          </View>

          <View style={[styles.block, { borderTopColor: colors.border }]}>
            <Text style={[styles.h, { color: colors.text }]}>Saved reports</Text>
            {saved.length === 0 ? (
              <Text style={[styles.deck, { color: colors.textMuted }]}>
                No saved reports yet. Open any article and tap Save.
              </Text>
            ) : (
              saved.map((item) => {
                const post = getBlogPost(item.article_slug);
                return (
                  <Link key={item.article_slug} href={`/${item.article_slug}` as `/`} asChild>
                    <Pressable
                      style={StyleSheet.flatten([
                        styles.row,
                        { borderBottomColor: colors.border },
                      ])}
                    >
                      <Text style={[styles.rowTitle, { color: colors.text }]}>
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

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 560 },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
  block: {
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  row: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 4 },
  rowTitle: { fontFamily: Fonts.serif, fontSize: 18 },
  meta: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
