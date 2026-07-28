import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { ToolsAccent } from "@/components/tools/ToolsAccent";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import {
  deleteSamplePack,
  listSamplePacks,
  packToExportJson,
  saveSamplePack,
} from "@/lib/samples/storage";
import {
  DEFAULT_SYNTH,
  newPackId,
  type SamplePack,
} from "@/lib/samples/types";

const NAV = [
  { href: "/tools/samples", label: "Packs" },
  { href: "/tools/samples/record", label: "Record" },
];

export default function SamplesHomeScreen() {
  const { colors, fonts } = useTheme();
  const { user, ready } = useRequireAuth();
  const [packs, setPacks] = useState<SamplePack[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setPacks(await listSamplePacks(user.id));
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
    if (!user) return;
    const now = new Date().toISOString();
    const pack: SamplePack = {
      id: newPackId(),
      userId: user.id,
      title: `Sample pack ${new Date().toLocaleDateString()}`,
      sourceUri: null,
      durationSec: 0,
      synth: { ...DEFAULT_SYNTH },
      clips: [],
      createdAt: now,
      updatedAt: now,
    };
    await saveSamplePack(pack);
    router.push(`/tools/samples/${pack.id}`);
  }

  async function onExport(pack: SamplePack) {
    const json = packToExportJson(pack);
    try {
      await Clipboard.setStringAsync(json);
      Alert.alert("Exported", "Favorite clips JSON copied to clipboard.");
    } catch {
      if (Platform.OS === "web" && typeof document !== "undefined") {
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${pack.title.replace(/\s+/g, "-").toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        Alert.alert("Export failed", "Could not copy export JSON.");
      }
    }
  }

  if (!ready || !user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Opening Sample Maker…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Sample Maker"
        description="Record audio, shape it with synth settings, and save favorite clips to your profile."
        path="/tools/samples"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Studio</Text>
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.serif }]}>
        Sample Maker
      </Text>
      <ToolsAccent />
      <Text style={[styles.deck, { color: colors.textMuted, fontFamily: fonts.serif }]}>
        Record a sound, tweak synth settings, mark favorite clips, and export the pack.
      </Text>

      <PrimaryButton label="New pack" onPress={onCreate} style={{ marginTop: 12 }} />
      <Pressable onPress={() => router.push("/tools/samples/record")} style={{ marginTop: 12 }}>
        <Text style={{ color: colors.accent, fontWeight: "700" }}>Quick record →</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 28 }} color={colors.accent} />
      ) : packs.length === 0 ? (
        <View
          style={[
            styles.empty,
            { borderColor: colors.border, backgroundColor: colors.bgElevated },
          ]}
        >
          <Text style={[styles.emptyTitle, { color: colors.text, fontFamily: fonts.serif }]}>
            No packs yet
          </Text>
          <Text style={[styles.deck, { color: colors.textMuted }]}>
            Start a recording and save clips you want to keep.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {packs.map((pack) => (
            <Pressable
              key={pack.id}
              onPress={() => router.push(`/tools/samples/${pack.id}`)}
              style={[styles.card, { borderColor: colors.border }]}
            >
              <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.serif }]}>
                {pack.title}
              </Text>
              <Text style={[styles.meta, { color: colors.textSubtle }]}>
                {pack.clips.filter((c) => c.favorite).length} favorites ·{" "}
                {pack.synth.preset} · {new Date(pack.updatedAt).toLocaleDateString()}
              </Text>
              <View style={styles.row}>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation?.();
                    void onExport(pack);
                  }}
                  hitSlop={8}
                >
                  <Text style={{ color: colors.accent, fontWeight: "700", fontSize: 13 }}>
                    Export
                  </Text>
                </Pressable>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation?.();
                    Alert.alert("Delete pack?", pack.title, [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () =>
                          void deleteSamplePack(user.id, pack.id).then(load),
                      },
                    ]);
                  }}
                  hitSlop={8}
                >
                  <Text style={{ color: colors.textMuted, fontSize: 13 }}>Delete</Text>
                </Pressable>
              </View>
            </Pressable>
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
  title: { fontSize: 36, fontWeight: "700" },
  deck: { fontSize: 16, lineHeight: 26, maxWidth: 560 },
  empty: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 22,
    gap: 8,
  },
  emptyTitle: { fontSize: 22, fontWeight: "700" },
  list: { marginTop: 16, gap: 12 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 6,
  },
  cardTitle: { fontSize: 20, fontWeight: "700" },
  meta: { fontSize: 12, letterSpacing: 0.3 },
  row: { flexDirection: "row", gap: 16, marginTop: 8 },
});
