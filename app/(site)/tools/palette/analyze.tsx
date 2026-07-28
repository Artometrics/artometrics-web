import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { extractDominantColors } from "@/lib/palette/extract";
import { recommendFromHexes } from "@/lib/palette/recommend";
import { savePalette } from "@/lib/palette/storage";
import { newPaletteId, type SavedPalette } from "@/lib/palette/types";

const NAV = [
  { href: "/tools/palette", label: "Saved" },
  { href: "/tools/palette/analyze", label: "Analyze" },
];

export default function PaletteAnalyzeScreen() {
  const { colors, fonts } = useTheme();
  const { user, ready } = useRequireAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [hexes, setHexes] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("My palette");
  const [tab, setTab] = useState<"editorial" | "drape" | "palette">("editorial");

  const result = useMemo(
    () => (hexes.length ? recommendFromHexes(hexes) : null),
    [hexes],
  );

  async function pickImage() {
    if (Platform.OS !== "web" || typeof document === "undefined") {
      Alert.alert(
        "Web upload",
        "Photo analysis is available on web in this MVP. Open Artometrics in a browser to upload a selfie.",
      );
      return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const uri = String(reader.result ?? "");
        setImageUri(uri);
        setBusy(true);
        try {
          const extracted = await extractDominantColors(uri, 6);
          setHexes(extracted);
          setTitle("From photo");
        } catch (e) {
          Alert.alert(
            "Analyze error",
            e instanceof Error ? e.message : "Could not read colors",
          );
        } finally {
          setBusy(false);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  async function onSave() {
    if (!user || !result) return;
    const now = new Date().toISOString();
    const palette: SavedPalette = {
      id: newPaletteId(),
      userId: user.id,
      title: title.trim() || result.season.name,
      seasonId: result.season.id,
      colors: result.season.palette,
      undertone: result.traits.undertone,
      depth: result.traits.depth,
      clarity: result.traits.clarity,
      sourceImageUri: imageUri,
      notes: result.season.tagline,
      createdAt: now,
      updatedAt: now,
    };
    await savePalette(palette);
    Alert.alert("Saved", "Palette saved to your Color Kit.");
    router.push("/tools/palette");
  }

  if (!ready || !user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Analyze colors"
        description="Get season and palette recommendations from a selfie or photo."
        path="/tools/palette/analyze"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.serif }]}>
        One selfie. Your season.
      </Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Upload a photo for a suggested season, undertone read, and wearable palette.
      </Text>

      <PrimaryButton label="Upload photo" onPress={() => void pickImage()} />
      {busy ? (
        <Text style={{ color: colors.textMuted }}>Reading colors…</Text>
      ) : null}

      {result ? (
        <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
          <View style={styles.cardTop}>
            <Text style={[styles.meta, { color: colors.textMuted }]}>Your suggested season</Text>
            <Text style={[styles.brand, { color: colors.textSubtle }]}>ARTOMETRICS</Text>
          </View>

          <Text style={[styles.season, { color: colors.text, fontFamily: fonts.serif }]}>
            {result.season.name}
          </Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>
            {result.season.tagline}
          </Text>

          {imageUri ? (
            <View style={styles.photoRow}>
              <View style={styles.sideSwatches}>
                {result.season.palette.slice(0, 3).map((c) => (
                  <View
                    key={c}
                    style={[styles.sideSwatch, { backgroundColor: c, borderColor: colors.border }]}
                  />
                ))}
              </View>
              <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />
              {tab === "drape" ? (
                <View style={styles.sideSwatches}>
                  {result.season.avoid.slice(0, 4).map((c) => (
                    <View
                      key={c}
                      style={[
                        styles.sideSwatch,
                        { backgroundColor: c, borderColor: colors.border, opacity: 0.55 },
                      ]}
                    />
                  ))}
                </View>
              ) : (
                <View style={{ width: 28 }} />
              )}
            </View>
          ) : null}

          <View style={styles.traits}>
            {(
              [
                ["UNDERTONE", result.traits.undertone],
                ["DEPTH", result.traits.depth],
                ["CLARITY", result.traits.clarity],
              ] as const
            ).map(([k, v]) => (
              <View
                key={k}
                style={[styles.traitPill, { borderColor: colors.border, backgroundColor: colors.bg }]}
              >
                <Text style={[styles.traitKey, { color: colors.textSubtle }]}>{k}</Text>
                <Text style={[styles.traitVal, { color: colors.text }]}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.tabs}>
            {(["editorial", "drape", "palette"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={[
                  styles.tab,
                  {
                    backgroundColor: tab === t ? colors.text : colors.bg,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: tab === t ? colors.inverse : colors.text,
                    fontSize: 13,
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === "palette" || tab === "editorial" ? (
            <View style={styles.paletteRow}>
              {(tab === "palette" ? result.season.palette : hexes).map((c) => (
                <View key={c} style={styles.palItem}>
                  <View
                    style={[styles.palSwatch, { backgroundColor: c, borderColor: colors.border }]}
                  />
                  <Text style={{ color: colors.textSubtle, fontSize: 10 }}>{c}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.deck, { color: colors.textMuted }]}>
              Your colors, left. Colors to avoid, right.
            </Text>
          )}

          {tab === "editorial" ? (
            <View style={{ gap: 8, marginTop: 8 }}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Colors to avoid</Text>
              <View style={styles.paletteRow}>
                {result.season.avoid.map((c) => (
                  <View
                    key={c}
                    style={[styles.palSwatch, { backgroundColor: c, borderColor: colors.border }]}
                  />
                ))}
              </View>
            </View>
          ) : null}

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Palette title"
            placeholderTextColor={colors.textSubtle}
            style={[
              styles.titleInput,
              { color: colors.text, borderColor: colors.border, fontFamily: fonts.serif },
            ]}
          />
          <PrimaryButton label="Save to profile" onPress={() => void onSave()} />
        </View>
      ) : (
        <Text style={[styles.deck, { color: colors.textSubtle }]}>
          Tip: natural daylight selfies work best. No filter, face in frame.
        </Text>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 14 },
  title: { fontSize: 34, fontWeight: "700" },
  deck: { fontSize: 15, lineHeight: 24, maxWidth: 560 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    gap: 12,
    marginTop: 8,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  meta: { fontSize: 12 },
  brand: { fontSize: 11, letterSpacing: 2, fontWeight: "700" },
  season: { fontSize: 32, fontWeight: "700" },
  tagline: { fontSize: 15, marginTop: -4 },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: 8,
  },
  photo: { width: 160, height: 200, borderRadius: 16 },
  sideSwatches: { gap: 8 },
  sideSwatch: {
    width: 28,
    height: 40,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  traits: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  traitPill: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 100,
  },
  traitKey: { fontSize: 10, letterSpacing: 1, fontWeight: "700" },
  traitVal: { fontSize: 14, fontWeight: "600", marginTop: 2 },
  tabs: { flexDirection: "row", gap: 8, marginTop: 4 },
  tab: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  paletteRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  palItem: { alignItems: "center", gap: 4 },
  palSwatch: {
    width: 44,
    height: 56,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  titleInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 18,
    paddingVertical: 8,
    marginTop: 8,
  },
});
