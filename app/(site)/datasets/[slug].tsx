import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { DATASET_PACKS, getDatasetPack } from "@/data/datasets";

export async function generateStaticParams() {
  return DATASET_PACKS.map((p) => ({ slug: p.id }));
}

export default function DatasetPackScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const pack = getDatasetPack(slug);

  if (!pack) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={styles.title}>Pack not found</Text>
        <Link href="/datasets">
          <Text style={styles.link}>Back to datasets</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <Text style={styles.status}>{pack.status}</Text>
      <Text style={styles.title}>{pack.title}</Text>
      <Text style={styles.desk}>{pack.desk} desk · {pack.primaryKeyword}</Text>
      <Text style={styles.body}>{pack.summary}</Text>

      <Text style={styles.h2}>Sources</Text>
      {pack.sources.map((s) => (
        <Text key={s.url} style={styles.body}>
          · {s.name}
        </Text>
      ))}

      <Text style={styles.h2}>Related reports</Text>
      <View style={styles.links}>
        {pack.relatedReports.map((id) => (
          <Link key={id} href={`/${id}`} asChild>
            <Pressable>
              <Text style={styles.link}>{id}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {pack.downloadPath ? (
        <Text style={styles.body}>Download: {pack.downloadPath}</Text>
      ) : (
        <Text style={styles.note}>
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
    color: Colors.accent700,
    fontWeight: "700",
  },
  title: { fontSize: 34, fontWeight: "300", color: Colors.base900, lineHeight: 40 },
  desk: { fontSize: 13, color: Colors.base500, letterSpacing: 1 },
  body: { fontSize: 16, lineHeight: 26, color: Colors.base600 },
  h2: { marginTop: 16, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: Colors.base900 },
  links: { gap: 8 },
  link: { color: Colors.accent700, fontSize: 15 },
  note: { marginTop: 12, fontSize: 14, color: Colors.base500, fontStyle: "italic" },
});
