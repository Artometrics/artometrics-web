import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { CoverTile } from "@/components/twilda/CoverTile";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { getSupabase } from "@/lib/supabase/client";
import {
  createNovel,
  formatUpdated,
  listNovels,
  type DbNovelSummary,
} from "@/lib/twilda/service";

const NAV = [
  { href: "/tools/twilda", label: "Library" },
  { href: "/tools/twilda/journal", label: "Journal" },
  { href: "/tools/twilda/reference", label: "Reference" },
];

export default function TwildaLibraryScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [novels, setNovels] = useState<DbNovelSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const supabase = getSupabase();
    if (!supabase) throw new Error("Supabase is not configured");
    const { ensureStarterNovels } = await import("@/lib/twilda/starters");
    await ensureStarterNovels(supabase as never, user.id);
    const rows = await listNovels(supabase as never, user.id);
    setNovels(rows);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!ready || !user) return;
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await load();
        } catch (e) {
          if (active) {
            Alert.alert("Library error", e instanceof Error ? e.message : "Failed to load");
          }
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [load, ready, user]),
  );

  async function onCreate() {
    if (!user) return;
    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured");
      const id = await createNovel(supabase as never, user.id);
      router.push(`/tools/twilda/novels/${id}`);
    } catch (e) {
      Alert.alert("Could not create novel", e instanceof Error ? e.message : "Unknown error");
    }
  }

  if (!ready) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title="Twilda" description="Story workspace on Artometrics." path="/tools/twilda" />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Twilda</Text>
      <Text style={[styles.title, { color: colors.text }]}>Library</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Plan, write, storyboard, and keep your Codex in one place.
      </Text>
      <PrimaryButton label="New novel" onPress={onCreate} />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.accent} />
      ) : novels.length === 0 ? (
        <Text style={[styles.deck, { color: colors.textMuted, marginTop: 24 }]}>
          No novels yet. Create a blank novel or wait for starters to seed.
        </Text>
      ) : (
        <FlatList
          data={novels}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                try {
                  await load();
                } finally {
                  setRefreshing(false);
                }
              }}
            />
          }
          ListHeaderComponent={
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              {novels.length} {novels.length === 1 ? "novel" : "novels"}
            </Text>
          }
          renderItem={({ item }) => (
            <CoverTile
              title={item.title}
              author={item.author}
              coverKind={item.cover_kind}
              updated={formatUpdated(item.last_opened_at ?? item.updated_at)}
              onPress={() => router.push(`/tools/twilda/novels/${item.id}`)}
            />
          )}
        />
      )}

      <Pressable onPress={() => router.push("/tools/twilda/reference")} style={{ marginTop: 8 }}>
        <Text style={{ color: colors.accent, fontWeight: "700" }}>Browse reference library →</Text>
      </Pressable>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 560 },
  list: { paddingTop: 16, paddingBottom: 24 },
  row: { justifyContent: "space-between" },
  sectionLabel: {
    fontSize: 12,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});
