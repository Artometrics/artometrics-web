import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { PLANS, type PlanTier } from "@/lib/product/plans";
import { openExternalUrl } from "@/lib/openExternal";
import { ensureProfileRow, getProfile, upsertProfile, normalizeHandle } from "@/lib/profile/service";

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

export default function SettingsScreen() {
  const { colors, mode, toggle, setPreference } = useTheme();
  const { user, loading, signOut } = useAuth();
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [penName, setPenName] = useState("");
  const [fullName, setFullName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
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
          setHandle(profile.handle ?? "");
          setBio(profile.bio ?? "");
          setBirthDate(profile.birth_date ?? "");
          setBirthPlace(profile.birth_place ?? "");
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
        <Text style={[styles.p, { color: colors.textMuted }]}>Loading settings…</Text>
      </Wrapper>
    );
  }

  if (!user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <PageSeo title="Settings" description="Artometrics account settings." path="/settings" />
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.p, { color: colors.textMuted }]}>Log in to manage your account.</Text>
        <Link href="/login" asChild>
          <PrimaryButton label="Log in" />
        </Link>
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
      <PageSeo title="Settings" description="Your Artometrics settings." path="/settings" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Account</Text>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
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
      {actionError ? <Text style={[styles.p, { color: colors.accent }]}>{actionError}</Text> : null}

      <View style={styles.block}>
        <Text style={[styles.h, { color: colors.text }]}>Appearance</Text>
        <Pressable
          onPress={toggle}
          style={StyleSheet.flatten([styles.themeRow, { borderColor: colors.border }])}
        >
          <Text style={[styles.p, { color: colors.text }]}>
            {mode === "dark" ? "Dark mode" : "Light mode"}
          </Text>
          <Text style={{ color: colors.accent, fontWeight: "700" }}>Switch</Text>
        </Pressable>
        <Pressable onPress={() => setPreference("system")} style={{ marginTop: 8 }}>
          <Text style={{ color: colors.textMuted, fontSize: 14 }}>Use system setting</Text>
        </Pressable>
      </View>

      <View style={styles.block}>
        <Text style={[styles.h, { color: colors.text }]}>Public profile</Text>
        <Text style={[styles.hint, { color: colors.textMuted }]}>
          Claim a handle to get `/u/yourname`. Work stays private until you publish.
        </Text>
        {(
          [
            ["Handle", handle, setHandle, "@yourname"],
            ["Display name", displayName, setDisplayName, ""],
            ["Pen name", penName, setPenName, ""],
            ["Bio", bio, setBio, "A short line about your work"],
            ["Full name", fullName, setFullName, ""],
            ["Birth date (YYYY-MM-DD)", birthDate, setBirthDate, ""],
            ["Birth place", birthPlace, setBirthPlace, ""],
          ] as const
        ).map(([label, value, set, ph]) => (
          <View key={label} style={{ gap: 4 }}>
            <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
            <TextInput
              value={value}
              onChangeText={set}
              placeholder={ph}
              placeholderTextColor={colors.textSubtle}
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              autoCapitalize={label === "Handle" ? "none" : "sentences"}
            />
          </View>
        ))}
        {profileMsg ? <Text style={[styles.p, { color: colors.accent }]}>{profileMsg}</Text> : null}
        <PrimaryButton
          label="Save profile"
          onPress={async () => {
            setProfileMsg(null);
            try {
              const normalized = normalizeHandle(handle);
              if (handle.trim() && normalized.length < 3) {
                setProfileMsg("Handle must be at least 3 characters (letters, numbers, _).");
                return;
              }
              await upsertProfile(user.id, {
                display_name: displayName.trim() || null,
                pen_name: penName.trim() || null,
                full_name: fullName.trim() || null,
                handle: handle.trim() ? normalized : null,
                bio: bio.trim() || null,
                birth_date: birthDate.trim() || null,
                birth_place: birthPlace.trim() || null,
              });
              setHandle(normalized || "");
              setProfileMsg("Saved.");
            } catch (e) {
              setProfileMsg(e instanceof Error ? e.message : "Could not save.");
            }
          }}
        />
      </View>

      <View style={styles.actions}>
        {active ? (
          <PrimaryButton label="Manage billing" onPress={openPortal} />
        ) : (
          <Link href="/pricing" asChild>
            <PrimaryButton label="Start free trial" style={{ backgroundColor: colors.textMuted }} />
          </Link>
        )}
        <Link href="/studio" asChild>
          <PrimaryButton label="Open Studio" />
        </Link>
        <PrimaryButton
          label="Sign out"
          style={{ backgroundColor: colors.textMuted }}
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
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 28 },
  hint: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 24 },
  label: { fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase", fontWeight: "700" },
  block: { marginTop: 12, gap: 10 },
  themeRow: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16 },
});
