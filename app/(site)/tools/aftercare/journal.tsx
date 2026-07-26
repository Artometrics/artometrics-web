import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { apiFetch } from "@/lib/supabase/client";

const NAV = [
  { href: "/tools/aftercare", label: "Home" },
  { href: "/tools/aftercare/journal", label: "Journal" },
  { href: "/tools/aftercare/tarot", label: "Tarot" },
  { href: "/tools/aftercare/track", label: "Track" },
  { href: "/tools/aftercare/tools", label: "Birth tools" },
];

const MOODS = [
  "tender",
  "clear",
  "heavy",
  "hopeful",
  "restless",
  "grateful",
] as const;

type Mood = (typeof MOODS)[number];

type JournalEntry = {
  id: string;
  title?: string | null;
  body: string;
  mood?: string | null;
  created_at?: string;
};

export default function AftercareJournalScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState<Mood>("tender");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiFetch("aftercare-journal");
      const data = (await res.json().catch(() => ({}))) as {
        entries?: JournalEntry[];
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not load journal entries.");
        return;
      }
      setError(null);
      setEntries(data.entries ?? []);
    } catch {
      setError("Could not load journal entries.");
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!ready || !user) return;
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await load();
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
    if (!body.trim()) {
      setError("Write a few lines before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await apiFetch("aftercare-journal", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim() || undefined,
          body: body.trim(),
          mood,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        entry?: JournalEntry;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not save entry.");
        return;
      }
      setTitle("");
      setBody("");
      if (data.entry) {
        setEntries((prev) => [data.entry!, ...prev]);
      } else {
        await load();
      }
    } catch {
      setError("Could not save entry.");
    } finally {
      setSaving(false);
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
      <PageSeo
        title="Journal · Aftercare"
        description="Mood-tagged journal on Artometrics Aftercare."
        path="/tools/aftercare/journal"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Aftercare</Text>
      <Text style={[styles.title, { color: colors.text }]}>Journal</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Name the feeling, then write what wants tending.
      </Text>

      <View style={[styles.form, { borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Mood</Text>
        <View style={styles.moods}>
          {MOODS.map((m) => {
            const active = mood === m;
            return (
              <Pressable
                key={m}
                onPress={() => setMood(m)}
                style={[
                  styles.moodChip,
                  {
                    borderColor: colors.border,
                    backgroundColor: active ? colors.text : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: active ? colors.inverse : colors.text,
                    fontSize: 13,
                    textTransform: "capitalize",
                  }}
                >
                  {m}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title (optional)"
          placeholderTextColor={colors.textSubtle}
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.bgElevated,
            },
          ]}
        />
        <TextInput
          multiline
          value={body}
          onChangeText={setBody}
          placeholder="What softens, what stays…"
          placeholderTextColor={colors.textSubtle}
          style={[
            styles.editor,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.bgElevated,
            },
          ]}
        />
        {error ? (
          <Text style={[styles.error, { color: colors.accent }]}>{error}</Text>
        ) : null}
        <PrimaryButton
          label={saving ? "Saving…" : "Save entry"}
          onPress={onCreate}
          disabled={saving}
        />
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
        Recent entries
      </Text>
      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : entries.length === 0 ? (
        <Text style={[styles.deck, { color: colors.textMuted }]}>
          No entries yet. Start with whatever is true today.
        </Text>
      ) : (
        <View style={styles.list}>
          {entries.map((entry) => (
            <View
              key={entry.id}
              style={[styles.entry, { borderColor: colors.border }]}
            >
              <View style={styles.entryHead}>
                {entry.mood ? (
                  <Text style={[styles.moodTag, { color: colors.accent }]}>
                    {entry.mood}
                  </Text>
                ) : null}
                {entry.created_at ? (
                  <Text style={[styles.meta, { color: colors.textSubtle }]}>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </Text>
                ) : null}
              </View>
              {entry.title ? (
                <Text style={[styles.entryTitle, { color: colors.text }]}>
                  {entry.title}
                </Text>
              ) : null}
              <Text style={[styles.entryBody, { color: colors.textMuted }]}>
                {entry.body}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 560 },
  form: {
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  moods: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  moodChip: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
  editor: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    minHeight: 140,
    textAlignVertical: "top",
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 26,
  },
  error: { fontFamily: Fonts.serif, fontSize: 15 },
  sectionLabel: {
    marginTop: 16,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  list: { gap: 12, marginTop: 4 },
  entry: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    gap: 6,
  },
  entryHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moodTag: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  meta: { fontSize: 12 },
  entryTitle: { fontFamily: Fonts.serif, fontSize: 18, fontWeight: "700" },
  entryBody: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 24 },
});
