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
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { getSupabase } from "@/lib/supabase/client";
import {
  createJournalEntry,
  formatJournalDate,
  listJournalEntries,
  type JournalEntry,
} from "@/lib/twilda/journal";

const NAV = [
  { href: "/tools/twilda", label: "Library" },
  { href: "/tools/twilda/journal", label: "Journal" },
  { href: "/tools/twilda/reference", label: "Reference" },
];

export default function TwildaJournalScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [entries, setEntries] = useState<
    Pick<JournalEntry, "id" | "title" | "body" | "created_at" | "updated_at">[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const supabase = getSupabase();
    if (!supabase) throw new Error("Supabase is not configured");
    setEntries(await listJournalEntries(supabase as never, user.id));
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
          if (active) Alert.alert("Journal error", e instanceof Error ? e.message : "Failed");
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [load, ready, user]),
  );

  if (!ready) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title="Twilda Journal" description="Private writing notes." path="/tools/twilda/journal" />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Twilda</Text>
      <Text style={[styles.title, { color: colors.text }]}>Journal</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Private notes — only you can see these.
      </Text>
      <PrimaryButton
        label="New entry"
        onPress={async () => {
          try {
            const entry = await createJournalEntry(getSupabase() as never, user!.id);
            router.push(`/tools/twilda/journal/${entry.id}`);
          } catch (e) {
            Alert.alert("Could not create entry", e instanceof Error ? e.message : "Error");
          }
        }}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} color={colors.accent} />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
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
          ListEmptyComponent={
            <Text style={[styles.deck, { color: colors.textMuted, marginTop: 20 }]}>
              No entries yet.
            </Text>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/tools/twilda/journal/${item.id}`)}
              style={[styles.row, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                {item.title || "Untitled"}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>
                {formatJournalDate(item.updated_at)}
              </Text>
            </Pressable>
          )}
        />
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  row: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 4 },
  rowTitle: { fontFamily: Fonts.serif, fontSize: 18 },
});
