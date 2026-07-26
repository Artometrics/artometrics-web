import { useMemo, useState } from "react";
import { Alert, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import {
  pinReference,
  searchReference,
  type ReferenceSource,
} from "@/lib/reference/catalog";

const NAV = [
  { href: "/tools/twilda", label: "Library" },
  { href: "/tools/twilda/journal", label: "Journal" },
  { href: "/tools/twilda/reference", label: "Reference" },
];

const FILTERS: { id: ReferenceSource | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "gutenberg", label: "Gutenberg" },
  { id: "wikiart", label: "WikiArt" },
  { id: "wikipedia", label: "Wikipedia" },
];

export default function TwildaReferenceScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [source, setSource] = useState<ReferenceSource | "all">("all");
  const [q, setQ] = useState("");
  const items = useMemo(() => searchReference(q, source).slice(0, 100), [q, source]);

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
        title="Twilda Reference"
        description="Pin public-domain sources into your research."
        path="/tools/twilda/reference"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Twilda</Text>
      <Text style={[styles.title, { color: colors.text }]}>Reference</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Gutenberg, WikiArt/Wikimedia, and Wikipedia — pin items to your profile.
      </Text>

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => setSource(f.id)}
            style={[
              styles.chip,
              {
                borderColor: colors.border,
                backgroundColor: source === f.id ? colors.text : "transparent",
              },
            ]}
          >
            <Text style={{ color: source === f.id ? colors.inverse : colors.text, fontSize: 13 }}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search…"
        placeholderTextColor={colors.textSubtle}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
      />

      <View style={styles.list}>
        {items.map((item) => (
          <View
            key={`${item.source}-${item.id}`}
            style={[styles.row, { borderBottomColor: colors.border }]}
          >
            <Text style={[styles.source, { color: colors.accent }]}>{item.source}</Text>
            <Text style={[styles.itemTitle, { color: colors.text }]}>
              {item.title || item.label}
            </Text>
            <Text style={[styles.meta, { color: colors.textMuted }]} numberOfLines={2}>
              {[item.authors?.join(", "), item.artist, item.description, item.style]
                .filter(Boolean)
                .join(" · ")}
            </Text>
            <Pressable
              onPress={async () => {
                try {
                  await pinReference(user!.id, {
                    source: item.source,
                    external_id: String(item.id),
                    title: item.title || item.label || "Untitled",
                    url: item.url || item.downloadUrl,
                    payload: item as unknown as Record<string, unknown>,
                  });
                  Alert.alert("Pinned", "Saved to your reference pins.");
                } catch (e) {
                  Alert.alert("Pin failed", e instanceof Error ? e.message : "Error");
                }
              }}
            >
              <Text style={{ color: colors.accent, fontWeight: "700", marginTop: 6 }}>Pin →</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 640 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 12, paddingVertical: 8 },
  input: { borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 12, paddingVertical: 10 },
  list: { marginTop: 4 },
  row: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 4 },
  source: { fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: "700" },
  itemTitle: { fontFamily: Fonts.serif, fontSize: 18 },
  meta: { fontSize: 14, lineHeight: 20 },
});
