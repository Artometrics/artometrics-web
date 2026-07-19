import { Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";

export default function AccountScreen() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={styles.p}>Loading account…</Text>
      </Wrapper>
    );
  }

  if (!user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={styles.eyebrow}>Account</Text>
        <Text style={styles.title}>Members area</Text>
        <Text style={styles.p}>Log in to manage your subscription and saved reports.</Text>
        <View style={styles.actions}>
          <Link href="/login" asChild>
            <PrimaryButton label="Log in" />
          </Link>
          <Link href="/signup" asChild>
            <PrimaryButton label="Sign up" style={styles.secondary} />
          </Link>
        </View>
      </Wrapper>
    );
  }

  async function openPortal() {
    try {
      const res = await apiFetch("create-portal", { method: "POST", body: "{}" });
      const data = (await res.json()) as { url?: string };
      if (data.url && typeof window !== "undefined") {
        window.location.href = data.url;
      }
    } catch {
      // Portal requires Stripe + Netlify functions.
    }
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <Text style={styles.eyebrow}>Account</Text>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.p}>{user.email}</Text>
      <View style={styles.actions}>
        <PrimaryButton label="Manage billing" onPress={openPortal} />
        <PrimaryButton
          label="Sign out"
          style={styles.secondary}
          onPress={async () => {
            await signOut();
            router.replace("/");
          }}
        />
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
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900 },
  p: { fontSize: 16, lineHeight: 28, color: Colors.base600 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  secondary: { backgroundColor: Colors.base700 },
});
