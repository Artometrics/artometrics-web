import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { getBlogPost } from "@/lib/content";
import { PLANS, type PlanTier } from "@/lib/product/plans";
import { openExternalUrl } from "@/lib/openExternal";
import { paramString } from "@/lib/params";
import { ensureProfileRow, getProfile, upsertProfile } from "@/lib/profile/service";

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
  const params = useLocalSearchParams<{ checkout?: string | string[] }>();
  const checkoutSuccess = paramString(params.checkout) === "success";
  const [saved, setSaved] = useState<{ article_slug: string; saved_at?: string }[]>([]);
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [penName, setPenName] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        await ensureProfileRow(user.id, user.email, user.user_metadata?.full_name);
        const profile = await getProfile(user.id);
        if (profile) {
          setDisplayName(profile.display_name ?? "");
          setPenName(profile.pen_name ?? "");
          setFullName(profile.full_name ?? "");
          setBirthDate(profile.birth_date ?? "");
          setBirthPlace(profile.birth_place ?? "");
        }
      } catch {
        /* soft — migration may not be applied yet */
      }
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
        {checkoutSuccess ? (
          <View style={[styles.successBanner, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
            <Text style={[styles.successTitle, { color: colors.accent }]}>Checkout complete</Text>
            <Text style={[styles.p, { color: colors.text }]}>
              Log in with the same email you used at checkout to open your membership.
            </Text>
          </View>
        ) : null}
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
            <PrimaryButton
              label="Sign up"
              style={{ backgroundColor: colors.textMuted }}
            />
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
      if (data.url) {
        const opened = await openExternalUrl(data.url);
        if (opened) return;
      }
      setActionError(data.error ?? "Unable to open billing portal.");
    } catch {
      setActionError("Unable to open billing portal.");
    }
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title="Account" description="Your Artometrics membership." path="/account" />
      {checkoutSuccess ? (
        <View style={[styles.successBanner, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
          <Text style={[styles.successTitle, { color: colors.accent }]}>You are subscribed</Text>
          <Text style={[styles.p, { color: colors.text }]}>
            Welcome to Artometrics. Your trial is active — manage billing anytime below.
          </Text>
        </View>
      ) : null}
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
        <Link href="/tools" asChild>
          <PrimaryButton label="Open tools" />
        </Link>
        {active ? (
          <PrimaryButton label="Manage billing" onPress={openPortal} />
        ) : (
          <Link href="/pricing" asChild>
            <PrimaryButton label="Start free trial" style={{ backgroundColor: colors.textMuted }} />
          </Link>
        )}
        <PrimaryButton
          label="Sign out"
          style={{ backgroundColor: colors.textMuted }}
          onPress={async () => {
            await signOut();
            router.replace("/");
          }}
        />
      </View>

      <View style={[styles.savedBlock, { borderTopColor: colors.border }]}>
        <Text style={[styles.h, { color: colors.text }]}>Profile</Text>
        <Text style={[styles.savedCount, { color: colors.textMuted }]}>
          Shared across Twilda, Aftercare, and membership.
        </Text>
        {(
          [
            ["Display name", displayName, setDisplayName],
            ["Pen name", penName, setPenName],
            ["Full name", fullName, setFullName],
            ["Birth date (YYYY-MM-DD)", birthDate, setBirthDate],
            ["Birth place", birthPlace, setBirthPlace],
          ] as const
        ).map(([label, value, set]) => (
          <View key={label} style={{ gap: 4 }}>
            <Text style={[styles.savedMeta, { color: colors.textMuted }]}>{label}</Text>
            <TextInput
              value={value}
              onChangeText={set}
              placeholderTextColor={colors.textSubtle}
              style={[styles.profileInput, { borderColor: colors.border, color: colors.text }]}
            />
          </View>
        ))}
        {profileMsg ? (
          <Text style={[styles.p, { color: colors.accent }]}>{profileMsg}</Text>
        ) : null}
        <PrimaryButton
          label="Save profile"
          onPress={async () => {
            setProfileMsg(null);
            try {
              await upsertProfile(user.id, {
                display_name: displayName.trim() || null,
                pen_name: penName.trim() || null,
                full_name: fullName.trim() || null,
                birth_date: birthDate.trim() || null,
                birth_place: birthPlace.trim() || null,
              });
              setProfileMsg("Profile saved.");
            } catch (e) {
              setProfileMsg(e instanceof Error ? e.message : "Could not save profile.");
            }
          }}
        />
        <View style={styles.toolLinks}>
          <Link href="/tools/twilda">
            <Text style={{ color: colors.accent, fontWeight: "700" }}>Twilda →</Text>
          </Link>
          <Link href="/tools/aftercare">
            <Text style={{ color: colors.accent, fontWeight: "700" }}>Aftercare →</Text>
          </Link>
          <Link href="/library/reference">
            <Text style={{ color: colors.accent, fontWeight: "700" }}>Reference →</Text>
          </Link>
        </View>
      </View>

      <View style={[styles.savedBlock, { borderTopColor: colors.border }]}>
        <Text style={[styles.h, { color: colors.text }]}>Saved reports</Text>
        <Text style={[styles.savedCount, { color: colors.textMuted }]}>
          {saved.length === 0
            ? "No saved reports yet. Open any article and tap Save."
            : `${saved.length} saved ${saved.length === 1 ? "report" : "reports"}`}
        </Text>
        {saved.map((item) => {
          const post = getBlogPost(item.article_slug);
          return (
            <Link key={item.article_slug} href={`/${item.article_slug}` as `/`} asChild>
              <Pressable
                style={StyleSheet.flatten([styles.savedRow, { borderBottomColor: colors.border }])}
              >
                <Text style={[styles.savedTitle, { color: colors.text }]}>
                  {post?.title ?? item.article_slug}
                </Text>
                {post?.tags?.length ? (
                  <Text style={[styles.savedMeta, { color: colors.accent }]}>
                    {post.tags.slice(0, 2).join(" · ")}
                  </Text>
                ) : null}
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  successBanner: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
    marginBottom: 4,
  },
  successTitle: {
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 28 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  savedBlock: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  savedCount: { fontFamily: Fonts.sans, fontSize: 14, marginBottom: 4 },
  savedRow: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, gap: 4 },
  savedTitle: { fontFamily: Fonts.serif, fontSize: 18 },
  savedMeta: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  profileInput: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  toolLinks: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 8 },
});
