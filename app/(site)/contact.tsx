import { Linking, Text, StyleSheet } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/Colors";

export default function ContactScreen() {
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <Text style={styles.eyebrow}>Contact</Text>
      <Text style={styles.title}>Reach the desk</Text>
      <Text style={styles.p}>
        Editorial tips, dataset corrections, and partnership notes go to the Artometrics desk.
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
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900 },
  p: { fontSize: 16, lineHeight: 28, color: Colors.base600, marginBottom: 8 },
});
