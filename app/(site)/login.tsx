import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";

export default function LoginScreen() {
  const { signIn } = useAuth();
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
      <Text style={styles.eyebrow}>Members</Text>
      <Text style={styles.title}>Log in</Text>
      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor={Colors.base400}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor={Colors.base400}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton label={busy ? "Signing in…" : "Log in"} onPress={onSubmit} disabled={busy} />
      </View>
      <Pressable>
        <Link href="/signup">
          <Text style={styles.link}>Need an account? Sign up</Text>
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
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900 },
  form: { gap: 12, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: Colors.base300,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.base900,
    backgroundColor: Colors.white,
  },
  error: { color: Colors.accent700, fontSize: 14 },
  link: { color: Colors.accent700, marginTop: 8 },
});
