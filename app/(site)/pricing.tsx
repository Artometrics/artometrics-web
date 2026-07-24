import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { PLANS } from "@/lib/product/plans";
import { apiFetch } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";

export default function PricingScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [busyTier, setBusyTier] = useState<string | null>(null);
  const [alreadyActive, setAlreadyActive] = useState(false);

  useEffect(() => {
    if (!user) {
      setAlreadyActive(false);
      return;
    }
    (async () => {
      try {
        const res = await apiFetch("subscription-status");
        if (!res.ok) return;
        const data = (await res.json()) as { active?: boolean };
        setAlreadyActive(Boolean(data.active));
      } catch {
        /* soft */
      }
    })();
  }, [user]);

  async function checkout(tier: string) {
    if (!user) return;
    setError(null);
    setBusyTier(tier);
    try {
      const res = await apiFetch("create-checkout", {
        method: "POST",
        body: JSON.stringify({ tier }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url && typeof window !== "undefined") {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Unable to start checkout.");
    } catch {
      setError("Unable to start checkout. Try again in a moment.");
    } finally {
      setBusyTier(null);
    }
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Pricing"
        description="Subscribe to Artometrics for member episodes and saved reports."
        path="/pricing"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Membership</Text>
      <Text style={[styles.title, { color: colors.text }]}>
        Subscribe for unlimited digital access
      </Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Your first week is free. Then pick monthly or annual — cancel anytime.
      </Text>
      {alreadyActive ? (
        <Text style={[styles.deck, { color: colors.text }]}>
          You already have an active membership.{" "}
          <Link href="/account">
            <Text style={{ color: colors.accent }}>Manage billing</Text>
          </Link>
          .
        </Text>
      ) : null}
      {error ? (
        <Text style={[styles.error, { color: colors.accent }]}>{error}</Text>
      ) : null}
      <View style={styles.grid}>
        {PLANS.map((plan) => (
          <View
            key={plan.tier}
            style={[
              styles.card,
              {
                borderColor: plan.popular ? colors.accent : colors.border,
                backgroundColor: colors.bgElevated,
                borderWidth: plan.popular ? 2 : StyleSheet.hairlineWidth,
              },
            ]}
          >
            {plan.badge ? (
              <Text style={[styles.popular, { color: colors.accent }]}>{plan.badge}</Text>
            ) : null}
            <Text style={[styles.planTitle, { color: colors.text }]}>{plan.title}</Text>
            <Text style={[styles.price, { color: colors.text }]}>
              {plan.price}
              <Text style={[styles.period, { color: colors.textSubtle }]}>
                {" "}
                / {plan.period.replace(/^Per /i, "").toLowerCase()}
              </Text>
            </Text>
            <Text style={[styles.trial, { color: colors.textMuted }]}>{plan.trialLabel}</Text>
            <View style={styles.features}>
              {plan.features.map((feature) => (
                <Text key={feature} style={[styles.feature, { color: colors.textMuted }]}>
                  · {feature}
                </Text>
              ))}
            </View>
            {alreadyActive ? (
              <Link href="/account" asChild>
                <PrimaryButton label="Manage billing" />
              </Link>
            ) : user ? (
              <PrimaryButton
                label={busyTier === plan.tier ? "Starting…" : "Start free trial"}
                onPress={() => checkout(plan.tier)}
              />
            ) : (
              <Link href="/signup" asChild>
                <PrimaryButton label="Start free trial" />
              </Link>
            )}
          </View>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", fontFamily: Fonts.serif },
  deck: { fontSize: 16, maxWidth: 560, marginBottom: 12, lineHeight: 24 },
  error: { fontSize: 14, lineHeight: 22, maxWidth: 560 },
  grid: { gap: 16, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    padding: 24,
    gap: 12,
  },
  popular: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  planTitle: { fontSize: 22 },
  price: { fontSize: 32, fontWeight: "300" },
  period: { fontSize: 14 },
  trial: { fontSize: 13, lineHeight: 20 },
  features: { gap: 6, marginVertical: 8 },
  feature: { fontSize: 14, lineHeight: 22 },
});
