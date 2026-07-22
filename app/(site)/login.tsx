import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setBusy(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.replace("/account");
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title="Log in" description="Sign in to Artometrics." path="/login" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Members</Text>
      <Text style={[styles.title, { color: colors.text }]}>Log in</Text>
      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text, backgroundColor: colors.bgElevated },
          ]}
          placeholderTextColor={colors.textSubtle}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text, backgroundColor: colors.bgElevated },
          ]}
          placeholderTextColor={colors.textSubtle}
        />
        {error ? <Text style={[styles.error, { color: colors.accent }]}>{error}</Text> : null}
        <PrimaryButton label={busy ? "Signing in…" : "Log in"} onPress={onSubmit} disabled={busy} />
      </View>
      <Pressable>
        <Link href="/signup">
          <Text style={{ color: colors.accent, marginTop: 8 }}>Need an account? Sign up</Text>
        </Link>
      </Pressable>
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
  form: { gap: 12, marginTop: 8 },
  input: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: { fontSize: 14 },
});
