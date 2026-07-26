import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { SpecimenCard } from "@/components/library/SpecimenCard";
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
  const items = useMemo(() => searchReference(q, source).slice(0, 48), [q, source]);

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
        Specimen cards for Gutenberg, WikiArt, and Wikipedia — open sources with attribution.
      </Text>

      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const active = source === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setSource(f.id)}
              style={StyleSheet.flatten([
                styles.chip,
                {
                  borderColor: colors.border,
                  backgroundColor: active ? colors.text : "transparent",
                },
              ])}
            >
              <Text
                style={{
                  color: active ? colors.inverse : colors.text,
                  fontSize: 11,
                  fontWeight: "800",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search titles, artists, subjects…"
        placeholderTextColor={colors.textSubtle}
        style={StyleSheet.flatten([
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ])}
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

      <View style={styles.grid}>
        {items.map((item) => (
          <SpecimenCard key={`${item.source}-${item.id}`} item={item} />
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 40,
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  deck: { fontFamily: Fonts.sans, fontSize: 16, lineHeight: 24, maxWidth: 640 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: {
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.sans,
  },
  note: { fontSize: 14 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 8,
  },
});
