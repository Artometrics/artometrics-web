import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { paramString } from "@/lib/params";
import { ensureProfileRow, getProfile } from "@/lib/profile/service";

/**
 * Account entry hub — billing/settings live at /settings; identity at /me and /u/[handle].
 */
export default function AccountScreen() {
  const { colors } = useTheme();
  const { user, loading } = useAuth();
  const params = useLocalSearchParams<{ checkout?: string | string[] }>();
  const checkoutSuccess = paramString(params.checkout) === "success";
  const [handle, setHandle] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      try {
        await ensureProfileRow(user.id, user.email, user.user_metadata?.full_name);
        const p = await getProfile(user.id);
        setHandle(p?.handle ?? null);
      } catch {
        /* soft */
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!loading && user && !checkoutSuccess) {
      // Soft landing: prefer the personal hub after login.
      router.replace("/me");
    }
  }, [loading, user, checkoutSuccess]);

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
          <View
            style={[
              styles.successBanner,
              { backgroundColor: colors.accentSoft, borderColor: colors.accent },
            ]}
          >
            <Text style={[styles.successTitle, { color: colors.accent }]}>Checkout complete</Text>
            <Text style={[styles.p, { color: colors.text }]}>
              Log in with the same email you used at checkout to open your membership.
            </Text>
          </View>
        ) : null}
        <Text style={[styles.eyebrow, { color: colors.accent }]}>Account</Text>
        <Text style={[styles.title, { color: colors.text }]}>Members area</Text>
        <Text style={[styles.p, { color: colors.textMuted }]}>
          Log in for Studio, your profile, and membership.
        </Text>
        <View style={styles.actions}>
          <Link href="/login" asChild>
            <PrimaryButton label="Log in" />
          </Link>
          <Link href="/signup" asChild>
            <PrimaryButton label="Sign up" style={{ backgroundColor: colors.textMuted }} />
          </Link>
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title="Account" description="Your Artometrics membership." path="/account" />
      {checkoutSuccess ? (
        <View
          style={[
            styles.successBanner,
            { backgroundColor: colors.accentSoft, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.successTitle, { color: colors.accent }]}>You are subscribed</Text>
          <Text style={[styles.p, { color: colors.text }]}>
            Welcome — open Studio or finish your public profile.
          </Text>
        </View>
      ) : null}
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Account</Text>
      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>{user.email}</Text>
      <View style={styles.actions}>
        <PrimaryButton label="Open Studio" onPress={() => router.push("/studio")} />
        <PrimaryButton
          label="Your hub"
          onPress={() => router.push("/me")}
          style={{ backgroundColor: colors.textMuted }}
        />
        <PrimaryButton
          label="Settings"
          onPress={() => router.push("/settings")}
          style={{ backgroundColor: colors.textMuted }}
        />
        {handle ? (
          <PrimaryButton
            label={`@${handle}`}
            onPress={() => router.push(`/u/${handle}`)}
            style={{ backgroundColor: colors.textMuted }}
          />
        ) : null}
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
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 28 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
});
