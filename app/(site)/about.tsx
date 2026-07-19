import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/Colors";

export default function AboutScreen() {
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <Text style={styles.eyebrow}>About</Text>
      <Text style={styles.title}>The Artometrics editorial desk</Text>
      <View style={styles.copy}>
        <Text style={styles.p}>
          Artometrics is an independent publication that treats culture like data — anime catalogs,
          franchise economics, civilizational cycles, and the institutions that shape creative markets.
          Every report pairs editorial judgment with reproducible charts and public datasets.
        </Text>
        <Text style={styles.p}>
          The site is organized into five desks — Culture, Atlas, History, Persona, and Power — each
          with its own archive of long-form investigations. The podcast extends those themes through
          interviews with analysts, founders, and historians.
        </Text>
        <Text style={styles.p}>
          Reports are built on community datasets, open APIs, and primary sources cited in every article.
          We publish limitations alongside findings because measured uncertainty is part of the story.
        </Text>
      </View>
      <View style={styles.actions}>
        <Link href="/blog" asChild>
          <PrimaryButton label="Browse reports" />
        </Link>
        <Link href="/podcast" asChild>
          <PrimaryButton label="Listen to podcast" style={styles.secondary} />
        </Link>
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
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900, lineHeight: 42 },
  copy: { gap: 16, marginTop: 8 },
  p: { fontSize: 16, lineHeight: 28, color: Colors.base600 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 20 },
  secondary: { backgroundColor: Colors.accent700 },
});
