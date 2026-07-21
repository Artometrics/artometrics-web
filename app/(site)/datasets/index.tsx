import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { DATASET_PACKS } from "@/data/datasets";

export default function DatasetsIndex() {
  return (
    <Wrapper style={styles.wrap}>
      <Text style={styles.eyebrow}>Library</Text>
      <Text style={styles.title}>Datasets</Text>
      <Text style={styles.deck}>
        SportsDataverse-style packs for Artometrics desks — one schema, citations, and links to the
        reports that use them. Packs start planned and graduate to downloadable CSVs.
      </Text>
      <View style={styles.grid}>
        {DATASET_PACKS.map((pack) => (
          <Link key={pack.id} href={`/datasets/${pack.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.status}>{pack.status}</Text>
              <Text style={styles.cardTitle}>{pack.title}</Text>
              <Text style={styles.desk}>{pack.desk}</Text>
              <Text style={styles.cardBody} numberOfLines={4}>
                {pack.summary}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", color: Colors.base900 },
  deck: { fontSize: 16, color: Colors.base600, maxWidth: 640, marginBottom: 8 },
  grid: { gap: 16, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexBasis: 280,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.base200,
    padding: 18,
    gap: 8,
    backgroundColor: Colors.white,
  },
  status: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "700",
  },
  cardTitle: { fontSize: 22, color: Colors.base900 },
  desk: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: Colors.base500 },
  cardBody: { fontSize: 14, lineHeight: 22, color: Colors.base600 },
});
