import { Linking, Text, StyleSheet } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export default function ContactScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Contact"
        description="Editorial tips, dataset corrections, and partnership notes for Artometrics."
        path="/contact"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Contact</Text>
      <Text style={[styles.title, { color: colors.text }]}>Get in touch</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        Editorial tips, dataset corrections, and partnership notes go to the Artometrics team.
      </Text>
      <PrimaryButton
        label="Email Artometrics"
        onPress={() => Linking.openURL("mailto:hello@artometrics.com")}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", fontFamily: Fonts.serif },
  p: { fontSize: 16, lineHeight: 28, marginBottom: 8 },
});
