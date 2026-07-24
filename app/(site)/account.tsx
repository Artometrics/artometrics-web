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
import { PLANS, type PlanTier } from "@/lib/product/plans";

function formatPlanLabel(planTier: string | null, status: string | null) {
  if (planTier) {
    const plan = PLANS.find((p) => p.tier === (planTier as PlanTier));
    if (plan) {
      const statusNote =
        status === "trialing" ? " (trial)" : status && status !== "active" ? ` (${status})` : "";
      return `${plan.title}${statusNote}`;
    }
  }
  if (status && status !== "inactive") return status;
  return null;
}

export default function AccountScreen() {
  const { colors } = useTheme();
  const { user, loading, signOut } = useAuth();
  const [saved, setSaved] = useState<{ article_slug: string; saved_at?: string }[]>([]);
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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
          const data = (await res.json()) as {
            planTier?: string | null;
            status?: string | null;
            active?: boolean;
          };
          setActive(Boolean(data.active));
          setPlanLabel(formatPlanLabel(data.planTier ?? null, data.status ?? null));
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
    setActionError(null);
    try {
      const res = await apiFetch("create-portal", { method: "POST", body: "{}" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url && typeof window !== "undefined") {
        window.location.href = data.url;
        return;
      }
      setActionError(data.error ?? "Unable to open billing portal.");
    } catch {
      setActionError("Unable to open billing portal.");
    }
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title="Account" description="Your Artometrics membership." path="/account" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Account</Text>
      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>{user.email}</Text>
      {planLabel ? (
        <Text style={[styles.p, { color: colors.text }]}>Plan: {planLabel}</Text>
      ) : (
        <Text style={[styles.p, { color: colors.textSubtle }]}>
          No active plan —{" "}
          <Link href="/pricing">
            <Text style={{ color: colors.accent }}>view membership</Text>
          </Link>
          .
        </Text>
      )}
      {actionError ? (
        <Text style={[styles.p, { color: colors.accent }]}>{actionError}</Text>
      ) : null}
      <View style={styles.actions}>
        {active ? (
          <PrimaryButton label="Manage billing" onPress={openPortal} />
        ) : (
          <Link href="/pricing" asChild>
            <PrimaryButton label="Start free trial" />
          </Link>
        )}
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
              <Pressable
                style={StyleSheet.flatten([styles.savedRow, { borderBottomColor: colors.border }])}
              >
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
