import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
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
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Following"
        description="Published work from people you follow on Artometrics."
        path="/following"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Feed</Text>
      <Text style={[styles.title, { color: colors.text }]}>Following</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Longform from members you follow — not a noisy stream.
      </Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} />
      ) : posts.length === 0 ? (
        <View style={{ marginTop: 20, gap: 12 }}>
          <Text style={[styles.deck, { color: colors.textMuted }]}>
            Follow someone from their public profile to fill this feed.
          </Text>
          <PrimaryButton label="Open Studio" onPress={() => router.push("/studio")} />
        </View>
      ) : (
        <View style={styles.list}>
          {posts.map((post) => (
            <View
              key={post.id}
              style={StyleSheet.flatten([styles.card, { borderColor: colors.border }])}
            >
              <Text style={[styles.meta, { color: colors.accent }]}>{post.author}</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{post.title}</Text>
              {post.excerpt ? (
                <Text style={[styles.deck, { color: colors.textMuted }]} numberOfLines={3}>
                  {post.excerpt}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      )}

      <Link href="/me" style={{ marginTop: 16 }}>
        <Text style={{ color: colors.accent, fontWeight: "700" }}>Your hub →</Text>
      </Link>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 10 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 600 },
  list: { marginTop: 16, gap: 14 },
  card: { borderWidth: StyleSheet.hairlineWidth, padding: 18, gap: 8 },
  cardTitle: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  meta: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
