import { useCallback, useMemo, useState } from "react";
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

type TrackingLog = {
  id: string;
  type?: string;
  value?: number | null;
  notes?: string | null;
  label?: string | null;
  logged_on?: string;
  created_at?: string;
};

export default function AftercareTrackScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState<TrackingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recentMoods = useMemo(
    () =>
      logs
        .filter((l) => l.type === "mood" && typeof l.value === "number")
        .slice(0, 14),
    [logs],
  );

  const maxBar = 5;

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiFetch("aftercare-tracking?type=mood");
      const data = (await res.json().catch(() => ({}))) as {
        logs?: TrackingLog[];
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not load tracking logs.");
        return;
      }
      setLogs(data.logs ?? []);
      setError(null);
    } catch {
      setError("Could not load tracking logs.");
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

  async function onSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await apiFetch("aftercare-tracking", {
        method: "POST",
        body: JSON.stringify({
          type: "mood",
          value: mood,
          notes: note.trim() || undefined,
          label: `Mood ${mood}`,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        log?: TrackingLog;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not save mood.");
        return;
      }
      setNote("");
      if (data.log) {
        setLogs((prev) => [data.log!, ...prev]);
      } else {
        await load();
      }
    } catch {
      setError("Could not save mood.");
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
        title="Track · Aftercare"
        description="Mood tracking on Artometrics Aftercare."
        path="/tools/aftercare/track"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Aftercare</Text>
      <Text style={[styles.title, { color: colors.text }]}>Track</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Log mood from 1 (heavy) to 5 (light). A short note is enough.
      </Text>

      <View style={[styles.form, { borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Mood</Text>
        <View style={styles.moodRow}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = mood === n;
            return (
              <Pressable
                key={n}
                onPress={() => setMood(n)}
                style={[
                  styles.moodBtn,
                  {
                    borderColor: colors.border,
                    backgroundColor: active ? colors.text : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: active ? colors.inverse : colors.text,
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  {n}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <TextInput
          multiline
          value={note}
          onChangeText={setNote}
          placeholder="Optional note"
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
          label={saving ? "Saving…" : "Log mood"}
          onPress={onSave}
          disabled={saving}
        />
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
        Recent
      </Text>
      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : recentMoods.length === 0 ? (
        <Text style={[styles.deck, { color: colors.textMuted }]}>
          No mood logs yet.
        </Text>
      ) : (
        <>
          <View style={styles.bars}>
            {[...recentMoods].reverse().map((log) => {
              const v = Number(log.value) || 0;
              const height = Math.max(8, (v / maxBar) * 72);
              return (
                <View key={log.id} style={styles.barCol}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height,
                        backgroundColor: colors.accent,
                      },
                    ]}
                  />
                  <Text style={[styles.barLabel, { color: colors.textSubtle }]}>
                    {v}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.list}>
            {recentMoods.map((log) => (
              <View
                key={`row-${log.id}`}
                style={[styles.row, { borderColor: colors.border }]}
              >
                <Text style={[styles.rowMood, { color: colors.text }]}>
                  {log.value}/5
                </Text>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={[styles.meta, { color: colors.textSubtle }]}>
                    {log.logged_on ||
                      (log.created_at
                        ? new Date(log.created_at).toLocaleDateString()
                        : "")}
                  </Text>
                  {log.notes ? (
                    <Text style={[styles.note, { color: colors.textMuted }]}>
                      {log.notes}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </>
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
  moodRow: { flexDirection: "row", gap: 8 },
  moodBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  editor: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    minHeight: 88,
    textAlignVertical: "top",
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 24,
  },
  error: { fontFamily: Fonts.serif, fontSize: 15 },
  sectionLabel: {
    marginTop: 12,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    minHeight: 88,
    paddingVertical: 8,
  },
  barCol: { alignItems: "center", gap: 4, flex: 1, maxWidth: 28 },
  bar: { width: "100%", minHeight: 8 },
  barLabel: { fontSize: 10 },
  list: { gap: 8 },
  row: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  rowMood: { fontFamily: Fonts.serif, fontSize: 18, fontWeight: "700", minWidth: 40 },
  meta: { fontSize: 12 },
  note: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
