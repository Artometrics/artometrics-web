import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { searchSite } from "@/lib/search";
import { PageSeo } from "@/components/PageSeo";

export default function SearchScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ q?: string }>();
  const initial = typeof params.q === "string" ? params.q : "";
  const [q, setQ] = useState(initial);
  const hits = useMemo(() => searchSite(q), [q]);

  function run() {
    router.setParams({ q: q.trim() });
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title={q ? `Search: ${q}` : "Search"}
        description="Search Artometrics reports, podcasts, and authors."
        path="/search"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Search</Text>
      <Text style={[styles.title, { color: colors.text }]}>Find a report</Text>
      <View style={[styles.box, { borderColor: colors.border }]}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Keywords, desks, topics…"
          placeholderTextColor={colors.textSubtle}
          style={[styles.input, { color: colors.text }]}
          onSubmitEditing={run}
          returnKeyType="search"
          autoFocus
        />
        <Pressable onPress={run} style={[styles.go, { backgroundColor: colors.text }]}>
          <Text style={[styles.goText, { color: colors.inverse }]}>Search</Text>
        </Pressable>
      </View>
      <Text style={[styles.count, { color: colors.textSubtle }]}>
        {q.trim().length < 2 ? "Type at least two characters." : `${hits.length} results`}
      </Text>
      <View style={styles.list}>
        {hits.map((hit) => (
          <Link key={`${hit.type}-${hit.id}`} href={hit.href as `/`} asChild>
            <Pressable style={[styles.row, { borderBottomColor: colors.border }]}>
              <Text style={[styles.meta, { color: colors.accent }]}>{hit.meta}</Text>
              <Text style={[styles.hitTitle, { color: colors.text }]}>{hit.title}</Text>
              <Text style={[styles.hitDesc, { color: colors.textMuted }]} numberOfLines={2}>
                {hit.description}
              </Text>
            </Pressable>
          </Link>
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
    fontFamily: Fonts.serif,
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 12,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 12, fontFamily: Fonts.sans },
  go: { paddingHorizontal: 16, paddingVertical: 14 },
  goText: { fontWeight: "700", letterSpacing: 1, fontSize: 12 },
  count: { fontSize: 13, marginTop: 4 },
  list: { marginTop: 8 },
  row: {
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  meta: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  hitTitle: { fontFamily: Fonts.serif, fontSize: 22, lineHeight: 28 },
  hitDesc: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
