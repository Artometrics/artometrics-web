import { Text, TextInput, Pressable, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useState } from "react";

export default function NewsletterScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Newsletter"
        description="Desk notes from Artometrics — new reports, datasets, and interviews."
        path="/newsletter"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Inbox</Text>
      <Text style={[styles.title, { color: colors.text }]}>Newsletter</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Occasional notes when a desk report ships. No spam. Read the{" "}
        <Link href="/legal/privacy">
          <Text style={{ color: colors.accent }}>privacy policy</Text>
        </Link>
        .
      </Text>
      {done ? (
        <Text style={[styles.deck, { color: colors.text }]}>
          Thanks — connect a form provider (Netlify Forms / ESP) to collect addresses in production.
        </Text>
      ) : (
        <View style={[styles.row, { borderColor: colors.border }]}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSubtle}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: colors.text }]}
          />
          <Pressable
            onPress={() => setDone(true)}
            style={[styles.btn, { backgroundColor: colors.text }]}
          >
            <Text style={[styles.btnText, { color: colors.inverse }]}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 28 },
  row: { flexDirection: "row", borderWidth: 1, marginTop: 8 },
  input: { flex: 1, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16 },
  btn: { paddingHorizontal: 16, justifyContent: "center", paddingVertical: 14 },
  btnText: { fontWeight: "700", letterSpacing: 1, fontSize: 12 },
});
