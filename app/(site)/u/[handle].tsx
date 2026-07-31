import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
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
    <Wrapper className="gap-2.5 py-10">
      <PageSeo
        title={profile ? `${name} · Artometrics` : "Profile"}
        description={profile?.bio || `Member profile on Artometrics.`}
        path={`/u/${handle}`}
      />

      {loading ? (
        <ActivityIndicator color={colors.accent} className="mt-10" />
      ) : error || !profile ? (
        <>
          <Text className="font-serif text-[36px] font-bold text-fg">Profile</Text>
          <Text className="font-serif text-base leading-[26px] max-w-[640px] text-muted">{error}</Text>
        </>
      ) : (
        <>
          <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Member</Text>
          <Text className="font-serif text-[36px] font-bold text-fg">{name}</Text>
          <Text className="font-sans text-[15px] text-subtle">@{profile.handle}</Text>
          {profile.bio ? (
            <Text className="font-serif text-base leading-[26px] max-w-[640px] text-muted">{profile.bio}</Text>
          ) : (
            <Text className="font-serif text-base leading-[26px] max-w-[640px] text-subtle">
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
              className={["mt-2 self-start", following ? "bg-muted" : "bg-fg"].join(" ")}
            />
          ) : null}

          <View className="flex-row gap-5 mt-5">
            {(["published", "about"] as const).map((t) => (
              <Pressable key={t} onPress={() => setTab(t)} className="pb-1">
                <Text
                  className={[
                    "text-[13px] tracking-[1.2px] uppercase font-bold border-b-2 pb-1.5",
                    tab === t ? "text-accent border-accent" : "text-muted border-transparent",
                  ].join(" ")}
                >
                  {t === "published" ? "Published" : "About"}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === "published" ? (
            posts.length === 0 ? (
              <Text className="font-serif text-base leading-[26px] max-w-[640px] mt-4 text-muted">
                No published work yet. Quiet on purpose.
              </Text>
            ) : (
              <View className="mt-3 gap-3">
                {posts.map((post) => (
                  <View key={post.id} className="border border-border p-4 gap-2">
                    <Text className="font-serif text-[22px] font-bold text-fg">{post.title}</Text>
                    {post.excerpt ? (
                      <Text className="font-serif text-base leading-[26px] max-w-[640px] text-muted" numberOfLines={3}>
                        {post.excerpt}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )
          ) : (
            <View className="mt-4 gap-2">
              <Text className="font-serif text-base leading-[26px] max-w-[640px] text-muted">
                Taste and preference mirror will deepen here as reading history and saves accumulate.
              </Text>
              {profile.desks_interest?.length ? (
                <Text className="font-serif text-base leading-[26px] max-w-[640px] text-fg">
                  Desks: {profile.desks_interest.join(", ")}
                </Text>
              ) : (
                <Text className="font-serif text-base leading-[26px] max-w-[640px] text-subtle">
                  No desks listed yet.
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </Wrapper>
  );
}
