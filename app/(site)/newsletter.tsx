import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

const FORM_NAME = "artometrics-newsletter";

export default function NewsletterScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setError(null);
    try {
      if (Platform.OS === "web") {
        const body = new URLSearchParams({
          "form-name": FORM_NAME,
          email: value,
        });
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
        if (!res.ok) throw new Error(`Form error (${res.status})`);
      }
      setStatus("done");
    } catch {
      setError("Could not subscribe right now. Try again shortly.");
      setStatus("error");
    }
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Newsletter"
        description="Notes from Artometrics — new reports, datasets, and interviews."
        path="/newsletter"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Inbox</Text>
      <Text style={[styles.title, { color: colors.text }]}>Newsletter</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Occasional notes when a report ships. No spam. Read the{" "}
        <Link href="/legal/privacy">
          <Text style={{ color: colors.accent }}>privacy policy</Text>
        </Link>
        .
      </Text>
      {status === "done" ? (
        <Text style={[styles.deck, { color: colors.text }]}>
          Thanks — you are on the list. We will write when something ships.
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
            editable={status !== "saving"}
            style={[styles.input, { color: colors.text }]}
            onSubmitEditing={() => void submit()}
          />
          <Pressable
            onPress={() => void submit()}
            disabled={status === "saving"}
            style={[styles.btn, { backgroundColor: colors.accent }]}
          >
            {status === "saving" ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.btnText}>Sign up</Text>
            )}
          </Pressable>
        </View>
      )}
      {error ? <Text style={[styles.error, { color: colors.accent }]}>{error}</Text> : null}
      {Platform.OS !== "web" ? (
        <Text style={[styles.hint, { color: colors.textSubtle }]}>
          Newsletter signup is available on the web at artometrics.com/newsletter.
        </Text>
      ) : null}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: {
    fontFamily: Fonts.display,
    fontSize: 40,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  deck: { fontFamily: Fonts.sans, fontSize: 16, lineHeight: 26 },
  row: { flexDirection: "row", borderWidth: 2, marginTop: 8 },
  input: { flex: 1, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16 },
  btn: { paddingHorizontal: 16, justifyContent: "center", paddingVertical: 14, minWidth: 96 },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 12,
    textTransform: "uppercase",
  },
  error: { fontSize: 14 },
  hint: { fontSize: 12, marginTop: 4 },
});
