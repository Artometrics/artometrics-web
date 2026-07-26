import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { getSupabase } from "@/lib/supabase/client";
import { paramString } from "@/lib/params";
import {
  deleteJournalEntry,
  getJournalEntry,
  updateJournalEntry,
} from "@/lib/twilda/journal";

export function generateStaticParams() {
  return [];
}

const NAV = [
  { href: "/tools/twilda", label: "Library" },
  { href: "/tools/twilda/journal", label: "Journal" },
  { href: "/tools/twilda/reference", label: "Reference" },
];

export default function TwildaJournalEntryScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = paramString(params.id);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    if (!user || !id) return;
    const entry = await getJournalEntry(getSupabase() as never, user.id, id);
    if (!entry) throw new Error("Entry not found");
    setTitle(entry.title);
    setBody(entry.body);
  }, [user, id]);

  useEffect(() => {
    if (!ready || !user || !id) return;
    (async () => {
      try {
        setLoading(true);
        await load();
      } catch (e) {
        Alert.alert("Error", e instanceof Error ? e.message : "Failed");
        router.replace("/tools/twilda/journal");
      } finally {
        setLoading(false);
      }
    })();
  }, [ready, user, id, load]);

  function scheduleSave(nextTitle: string, nextBody: string) {
    setSaveState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (!user || !id) return;
      try {
        await updateJournalEntry(getSupabase() as never, user.id, id, {
          title: nextTitle,
          body: nextBody,
        });
        setSaveState("saved");
      } catch {
        setSaveState("idle");
      }
    }, 700);
  }

  if (!ready || loading) {
    return (
      <Wrapper style={styles.wrap}>
        <ActivityIndicator color={colors.accent} />
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title={title || "Journal"} path={`/tools/twilda/journal/${id}`} />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.meta, { color: colors.textMuted }]}>
        {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : " "}
      </Text>
      <TextInput
        value={title}
        onChangeText={(t) => {
          setTitle(t);
          scheduleSave(t, body);
        }}
        placeholder="Title"
        placeholderTextColor={colors.textSubtle}
        style={[styles.titleInput, { color: colors.text, borderBottomColor: colors.border }]}
      />
      <TextInput
        multiline
        value={body}
        onChangeText={(t) => {
          setBody(t);
          scheduleSave(title, t);
        }}
        placeholder="Write…"
        placeholderTextColor={colors.textSubtle}
        style={[styles.bodyInput, { color: colors.text, borderColor: colors.border }]}
      />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <PrimaryButton
          label="Back"
          style={{ backgroundColor: colors.text }}
          onPress={() => router.push("/tools/twilda/journal")}
        />
        <PrimaryButton
          label="Delete"
          style={{ backgroundColor: colors.textMuted }}
          onPress={() =>
            Alert.alert("Delete entry?", "This cannot be undone.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                  await deleteJournalEntry(getSupabase() as never, user!.id, id!);
                  router.replace("/tools/twilda/journal");
                },
              },
            ])
          }
        />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 28, gap: 10 },
  meta: { fontSize: 12, minHeight: 16 },
  titleInput: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    fontWeight: "700",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
  },
  bodyInput: {
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 320,
    padding: 14,
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 28,
    textAlignVertical: "top",
  },
});
