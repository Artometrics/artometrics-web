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
  deletePalette,
  listPalettes,
  paletteToExportJson,
} from "@/lib/palette/storage";
import type { SavedPalette } from "@/lib/palette/types";
import { seasonById } from "@/lib/palette/types";

const NAV = [
  { href: "/tools/palette", label: "Saved" },
  { href: "/tools/palette/analyze", label: "Analyze" },
];

export default function PaletteHomeScreen() {
  const { colors, fonts } = useTheme();
  const { user, ready } = useRequireAuth();
  const [items, setItems] = useState<SavedPalette[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setItems(await listPalettes(user.id));
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

  async function onExport(palette: SavedPalette) {
    const json = paletteToExportJson(palette);
    try {
      await Clipboard.setStringAsync(json);
      if (Platform.OS === "web" && typeof document !== "undefined") {
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${palette.title.replace(/\s+/g, "-").toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
      Alert.alert("Exported", "Palette JSON copied / downloaded.");
    } catch {
      Alert.alert("Export failed", "Could not export palette.");
    }
  }

  if (!ready || !user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Opening Color Kit…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Color Kit"
        description="Save color palettes or get season recommendations from a selfie or photo."
        path="/tools/palette"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Studio</Text>
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.serif }]}>
        Color Kit
      </Text>
      <ToolsAccent />
      <Text style={[styles.deck, { color: colors.textMuted, fontFamily: fonts.serif }]}>
        Analyze a photo for season + palette recommendations, then save looks to your profile.
      </Text>

      <PrimaryButton
        label="Analyze a photo"
        onPress={() => router.push("/tools/palette/analyze")}
        style={{ marginTop: 12 }}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 28 }} color={colors.accent} />
      ) : items.length === 0 ? (
        <View
          style={[
            styles.empty,
            { borderColor: colors.border, backgroundColor: colors.bgElevated },
          ]}
        >
          <Text style={[styles.emptyTitle, { color: colors.text, fontFamily: fonts.serif }]}>
            No saved palettes
          </Text>
          <Text style={[styles.deck, { color: colors.textMuted }]}>
            Upload a selfie or photo to get your suggested season and swatches.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {items.map((pal) => {
            const season = pal.seasonId ? seasonById(pal.seasonId) : null;
            return (
              <View key={pal.id} style={[styles.card, { borderColor: colors.border }]}>
                <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.serif }]}>
                  {pal.title}
                </Text>
                {season ? (
                  <Text style={[styles.meta, { color: colors.accent }]}>
                    {season.name} — {season.tagline}
                  </Text>
                ) : null}
                <View style={styles.swatches}>
                  {pal.colors.map((c) => (
                    <View
                      key={c}
                      style={[styles.swatch, { backgroundColor: c, borderColor: colors.border }]}
                    />
                  ))}
                </View>
                <View style={styles.row}>
                  <Pressable onPress={() => void onExport(pal)} hitSlop={8}>
                    <Text style={{ color: colors.accent, fontWeight: "700", fontSize: 13 }}>
                      Export
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      Alert.alert("Delete palette?", pal.title, [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => void deletePalette(user.id, pal.id).then(load),
                        },
                      ])
                    }
                    hitSlop={8}
                  >
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
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
    gap: 8,
  },
  cardTitle: { fontSize: 20, fontWeight: "700" },
  meta: { fontSize: 13, lineHeight: 20 },
  swatches: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  swatch: {
    width: 36,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
  },
  row: { flexDirection: "row", gap: 16, marginTop: 6 },
});
