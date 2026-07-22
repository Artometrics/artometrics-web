import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { DATASET_PACKS, getDatasetPack } from "@/data/datasets";
import { SECTION_META } from "@/data/sections";

export async function generateStaticParams() {
  return DATASET_PACKS.map((p) => ({ slug: p.id }));
}

export default function DatasetPackScreen() {
  const { colors } = useTheme();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const pack = getDatasetPack(slug);

  if (!pack) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={[styles.title, { color: colors.text }]}>Pack not found</Text>
        <Link href="/datasets">
          <Text style={{ color: colors.accent }}>Back to datasets</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title={pack.title}
        description={pack.summary}
        path={`/datasets/${pack.id}`}
      />
      <Text style={[styles.status, { color: colors.accent }]}>{pack.status}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{pack.title}</Text>
      <Text style={[styles.meta, { color: colors.textSubtle }]}>
        {SECTION_META[pack.section].title} · {pack.primaryKeyword}
      </Text>
      <Text style={[styles.body, { color: colors.textMuted }]}>{pack.summary}</Text>

      <Text style={[styles.h2, { color: colors.text }]}>Sources</Text>
      {pack.sources.map((s) => (
        <Text key={s.url} style={[styles.body, { color: colors.textMuted }]}>
          · {s.name}
        </Text>
      ))}

      <Text style={[styles.h2, { color: colors.text }]}>Related reports</Text>
      <View style={styles.links}>
        {pack.relatedReports.map((id) => (
          <Link key={id} href={`/${id}`} asChild>
            <Pressable>
              <Text style={{ color: colors.accent, fontSize: 15 }}>{id}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {pack.downloadPath ? (
        <Text style={[styles.body, { color: colors.textMuted }]}>
          Download: {pack.downloadPath}
        </Text>
      ) : (
        <Text style={[styles.note, { color: colors.textSubtle }]}>
          CSV download ships when this pack moves from planned/collecting → published.
        </Text>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  status: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontSize: 34, fontWeight: "300", fontFamily: Fonts.serif, lineHeight: 40 },
  meta: { fontSize: 13, letterSpacing: 1 },
  body: { fontSize: 16, lineHeight: 26 },
  h2: {
    marginTop: 16,
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  links: { gap: 8 },
  note: { marginTop: 12, fontSize: 14, fontStyle: "italic" },
});
