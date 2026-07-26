import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { paramString } from "@/lib/params";
import { getProfileByHandle, type UserProfile } from "@/lib/profile/service";
import { listPublishedPostsForUser, type MemberPost } from "@/lib/platform/posts";
import { followUser, isFollowing, unfollowUser } from "@/lib/platform/social";

export default function PublicProfileScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ handle?: string | string[] }>();
  const handle = paramString(params.handle) ?? "";
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<MemberPost[]>([]);
  const [tab, setTab] = useState<"published" | "about">("published");
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        try {
          setLoading(true);
          setError(null);
          const p = await getProfileByHandle(handle);
          if (!active) return;
          if (!p || !p.handle) {
            setProfile(null);
            setPosts([]);
            setError("This profile does not exist — or the handle is not claimed yet.");
            return;
          }
          setProfile(p);
          const published = await listPublishedPostsForUser(p.id);
          if (active) setPosts(published);
          if (user && user.id !== p.id) {
            setFollowing(await isFollowing(user.id, p.id));
          }
        } catch (e) {
          if (active) setError(e instanceof Error ? e.message : "Could not load profile");
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [handle, user]),
  );

  const name = profile?.display_name || profile?.pen_name || `@${handle}`;
  const isSelf = Boolean(user && profile && user.id === profile.id);

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title={profile ? `${name} · Artometrics` : "Profile"}
        description={profile?.bio || `Member profile on Artometrics.`}
        path={`/u/${handle}`}
      />

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} />
      ) : error || !profile ? (
        <>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <Text style={[styles.deck, { color: colors.textMuted }]}>{error}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.eyebrow, { color: colors.accent }]}>Member</Text>
          <Text style={[styles.title, { color: colors.text }]}>{name}</Text>
          <Text style={[styles.handle, { color: colors.textSubtle }]}>@{profile.handle}</Text>
          {profile.bio ? (
            <Text style={[styles.deck, { color: colors.textMuted }]}>{profile.bio}</Text>
          ) : (
            <Text style={[styles.deck, { color: colors.textSubtle }]}>
              {isSelf
                ? "Add a bio in Settings to introduce your work."
                : "No bio yet."}
            </Text>
          )}

          {!isSelf && user ? (
            <PrimaryButton
              label={following ? "Following" : "Follow"}
              onPress={async () => {
                if (!profile) return;
                if (following) {
                  await unfollowUser(user.id, profile.id);
                  setFollowing(false);
                } else {
                  await followUser(user.id, profile.id);
                  setFollowing(true);
                }
              }}
              style={{
                marginTop: 8,
                backgroundColor: following ? colors.textMuted : colors.text,
                alignSelf: "flex-start",
              }}
            />
          ) : null}

          <View style={styles.tabs}>
            {(["published", "about"] as const).map((t) => (
              <Pressable key={t} onPress={() => setTab(t)} style={styles.tabBtn}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: tab === t ? colors.accent : colors.textMuted,
                      borderBottomColor: tab === t ? colors.accent : "transparent",
                    },
                  ]}
                >
                  {t === "published" ? "Published" : "About"}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === "published" ? (
            posts.length === 0 ? (
              <Text style={[styles.deck, { color: colors.textMuted, marginTop: 16 }]}>
                No published work yet. Quiet on purpose.
              </Text>
            ) : (
              <View style={styles.list}>
                {posts.map((post) => (
                  <View
                    key={post.id}
                    style={StyleSheet.flatten([styles.post, { borderColor: colors.border }])}
                  >
                    <Text style={[styles.postTitle, { color: colors.text }]}>{post.title}</Text>
                    {post.excerpt ? (
                      <Text style={[styles.deck, { color: colors.textMuted }]} numberOfLines={3}>
                        {post.excerpt}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )
          ) : (
            <View style={{ marginTop: 16, gap: 8 }}>
              <Text style={[styles.deck, { color: colors.textMuted }]}>
                Taste and preference mirror will deepen here as reading history and saves accumulate.
              </Text>
              {profile.desks_interest?.length ? (
                <Text style={[styles.deck, { color: colors.text }]}>
                  Desks: {profile.desks_interest.join(", ")}
                </Text>
              ) : (
                <Text style={[styles.deck, { color: colors.textSubtle }]}>No desks listed yet.</Text>
              )}
            </View>
          )}
        </>
      )}
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
  handle: { fontFamily: Fonts.sans, fontSize: 15 },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 640 },
  tabs: { flexDirection: "row", gap: 20, marginTop: 20 },
  tabBtn: { paddingBottom: 4 },
  tabLabel: {
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
    borderBottomWidth: 2,
    paddingBottom: 6,
  },
  list: { marginTop: 12, gap: 12 },
  post: { borderWidth: StyleSheet.hairlineWidth, padding: 16, gap: 8 },
  postTitle: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
});
