import { useState } from "react";
import { Platform, Text, TextInput, View, Pressable } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { PageSeo } from "@/components/PageSeo";
import { useAuth } from "@/lib/auth";
import { paramString } from "@/lib/params";

function safeNext(raw: string | undefined): string {
  if (!raw) return "/account";
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith("/") && !decoded.startsWith("//")) return decoded;
  } catch {
    /* ignore */
  }
  return "/account";
}

export default function LoginScreen() {
  const { signIn, signInWithGoogle } = useAuth();
  const params = useLocalSearchParams<{ next?: string | string[] }>();
  const nextPath = safeNext(paramString(params.next));
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
    router.replace(nextPath as `/account`);
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
      router.replace(nextPath as `/account`);
    }
  }

  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo title="Log in" description="Sign in to Artometrics." path="/login" />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Members
      </Text>
      <Text className="text-[36px] font-light font-serif text-fg">Log in</Text>
      <View className="gap-3 mt-2">
        <GoogleSignInButton onPress={onGoogle} disabled={busy} />
        <Text className="text-xs tracking-[1.2px] uppercase text-center my-1 text-subtle">
          or use email
        </Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border border-border px-3.5 py-3 text-base text-fg bg-bg-elevated"
          placeholderTextColorClassName="text-subtle"
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="border border-border px-3.5 py-3 text-base text-fg bg-bg-elevated"
          placeholderTextColorClassName="text-subtle"
        />
        {error ? <Text className="text-sm text-accent">{error}</Text> : null}
        <PrimaryButton label={busy ? "Signing in…" : "Log in"} onPress={onSubmit} disabled={busy} />
      </View>
      <Pressable>
        <Link href="/signup">
          <Text className="text-accent mt-2">Need an account? Sign up</Text>
        </Link>
      </Pressable>
    </Wrapper>
  );
}
