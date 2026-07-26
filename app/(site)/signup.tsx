import { useState } from "react";
import { Platform, Text, TextInput, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export default function SignupScreen() {
  const { signUp, signInWithGoogle } = useAuth();
  const { colors } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setBusy(true);
    setError(null);
    const result = await signUp(email.trim(), password, fullName.trim());
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.replace("/account");
  }

  async function onGoogle() {
    setBusy(true);
    setError(null);
    const result = await signInWithGoogle();
    if (result.error) {
      setBusy(false);
      setError(result.error);
      return;
    }
    if (result.cancelled) {
      setBusy(false);
      return;
    }
    if (Platform.OS !== "web" && result.ok) {
      setBusy(false);
      router.replace("/account");
    }
  }

  const inputStyle = [
    styles.input,
    { borderColor: colors.border, color: colors.text, backgroundColor: colors.bgElevated },
  ];

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title="Sign up" description="Create an Artometrics account." path="/signup" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Members</Text>
      <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
      <View style={styles.form}>
        <GoogleSignInButton
          label="Continue with Google"
          onPress={onGoogle}
          disabled={busy}
        />
        <Text style={[styles.or, { color: colors.textSubtle }]}>or use email</Text>
        <TextInput
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
          style={inputStyle}
          placeholderTextColor={colors.textSubtle}
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={inputStyle}
          placeholderTextColor={colors.textSubtle}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={inputStyle}
          placeholderTextColor={colors.textSubtle}
        />
        {error ? <Text style={{ color: colors.accent, fontSize: 14 }}>{error}</Text> : null}
        <PrimaryButton label={busy ? "Creating…" : "Sign up"} onPress={onSubmit} disabled={busy} />
      </View>
      <Link href="/login">
        <Text style={{ color: colors.accent, marginTop: 8 }}>Already a member? Log in</Text>
      </Link>
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
  or: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});
