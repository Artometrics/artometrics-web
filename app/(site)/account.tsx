import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { getBlogPost } from "@/lib/content";

export default function AccountScreen() {
  const { colors } = useTheme();
  const { user, loading, signOut } = useAuth();
  const [saved, setSaved] = useState<{ article_slug: string; saved_at?: string }[]>([]);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await apiFetch("saved-articles");
        if (res.ok) {
          const data = (await res.json()) as { items?: typeof saved };
          setSaved(data.items ?? []);
        }
      } catch {
        /* soft */
      }
      try {
        const res = await apiFetch("subscription-status");
        if (res.ok) {
          const data = (await res.json()) as { plan?: string; status?: string };
          setPlan(data.plan ?? data.status ?? null);
        }
      } catch {
        /* soft */
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={[styles.p, { color: colors.textMuted }]}>Loading account…</Text>
      </Wrapper>
    );
  }

  if (!user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <PageSeo title="Account" description="Artometrics members area." path="/account" />
        <Text style={[styles.eyebrow, { color: colors.accent }]}>Account</Text>
        <Text style={[styles.title, { color: colors.text }]}>Members area</Text>
        <Text style={[styles.p, { color: colors.textMuted }]}>
          Log in to manage your subscription and saved reports.
        </Text>
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
      /* Portal requires Stripe + Netlify functions. */
    }
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title="Account" description="Your Artometrics membership." path="/account" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Account</Text>
      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>{user.email}</Text>
      {plan ? (
        <Text style={[styles.p, { color: colors.text }]}>Plan: {plan}</Text>
      ) : (
        <Text style={[styles.p, { color: colors.textSubtle }]}>
          Plan status appears when Stripe is connected.
        </Text>
      )}
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

      <Text style={[styles.h, { color: colors.text }]}>Saved reports</Text>
      {saved.length === 0 ? (
        <Text style={[styles.p, { color: colors.textMuted }]}>
          No saved reports yet. Open any article and tap Save.
        </Text>
      ) : (
        saved.map((item) => {
          const post = getBlogPost(item.article_slug);
          return (
            <Link key={item.article_slug} href={`/${item.article_slug}` as `/`} asChild>
              <Pressable style={[styles.savedRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.savedTitle, { color: colors.text }]}>
                  {post?.title ?? item.article_slug}
                </Text>
              </Pressable>
            </Link>
          );
        })
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", marginTop: 16 },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 28 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  secondary: { backgroundColor: "#404040" },
  savedRow: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  savedTitle: { fontFamily: Fonts.serif, fontSize: 18 },
});
