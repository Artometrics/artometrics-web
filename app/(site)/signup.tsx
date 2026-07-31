import { useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { PageSeo } from "@/components/PageSeo";
import { useAuth } from "@/lib/auth";

const inputClassName =
  "border border-border px-3.5 py-3 text-base text-fg bg-bg-elevated";

export default function SignupScreen() {
  const { signUp, signInWithGoogle } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setBusy(true);
    setError(null);
    setNotice(null);
    const result = await signUp(email.trim(), password, fullName.trim());
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsConfirmation) {
      setNotice("Check your email to confirm your account, then log in.");
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

  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo title="Sign up" description="Create an Artometrics account." path="/signup" />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Members
      </Text>
      <Text className="text-[36px] font-light font-serif text-fg">Create account</Text>
      <View className="gap-3 mt-2">
        <GoogleSignInButton
          label="Continue with Google"
          onPress={onGoogle}
          disabled={busy}
        />
        <Text className="text-xs tracking-[1.2px] uppercase text-center my-1 text-subtle">
          or use email
        </Text>
        <TextInput
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
          className={inputClassName}
          placeholderTextColorClassName="text-subtle"
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className={inputClassName}
          placeholderTextColorClassName="text-subtle"
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className={inputClassName}
          placeholderTextColorClassName="text-subtle"
        />
        {error ? <Text className="text-sm text-accent">{error}</Text> : null}
        {notice ? <Text className="text-sm text-muted">{notice}</Text> : null}
        <PrimaryButton label={busy ? "Creating…" : "Sign up"} onPress={onSubmit} disabled={busy} />
      </View>
      <Link href="/login">
        <Text className="text-accent mt-2">Already a member? Log in</Text>
      </Link>
    </Wrapper>
  );
}
