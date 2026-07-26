import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import {
  searchReference,
  type ReferenceSource,
} from "@/lib/reference/catalog";

const FILTERS: { id: ReferenceSource | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "gutenberg", label: "Gutenberg" },
  { id: "wikiart", label: "WikiArt" },
  { id: "wikipedia", label: "Wikipedia" },
];

export default function LibraryReferenceScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [source, setSource] = useState<ReferenceSource | "all">("all");
  const [q, setQ] = useState("");
  const items = useMemo(() => searchReference(q, source).slice(0, 80), [q, source]);

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Reference library"
        description="Public-domain books, artworks, and encyclopedia entries for research."
        path="/library/reference"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Library</Text>
      <Text style={[styles.title, { color: colors.text }]}>Reference</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Curated Project Gutenberg, WikiArt/Wikimedia, and Wikipedia entries. Sign in to pin
        into Twilda.
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
        placeholder="Search titles, artists, subjects…"
        placeholderTextColor={colors.textSubtle}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
      />

      {!user ? (
        <Text style={[styles.note, { color: colors.textMuted }]}>
          <Link href="/login?next=%2Flibrary%2Freference">
            <Text style={{ color: colors.accent }}>Log in</Text>
          </Link>{" "}
          to pin items into Twilda.
        </Text>
      ) : (
        <Link href="/tools/twilda/reference">
          <Text style={[styles.note, { color: colors.accent }]}>Open Twilda Reference →</Text>
        </Link>
      )}

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
              {[
                item.authors?.join(", "),
                item.artist,
                item.description,
                item.style,
              ]
                .filter(Boolean)
                .join(" · ")}
            </Text>
          </View>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 640 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: { borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 12, paddingVertical: 8 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  note: { fontSize: 14 },
  list: { marginTop: 8 },
  row: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 4 },
  source: { fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: "700" },
  itemTitle: { fontFamily: Fonts.serif, fontSize: 18 },
  meta: { fontSize: 14, lineHeight: 20 },
});
