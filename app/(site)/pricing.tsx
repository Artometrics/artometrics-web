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

  async function checkout(tier: string) {
    if (!user) return;
    try {
      const res = await apiFetch("create-checkout", {
        method: "POST",
        body: JSON.stringify({ tier }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url && typeof window !== "undefined") {
        window.location.href = data.url;
      }
    } catch {
      // Checkout requires Netlify functions + Stripe env in production.
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
      <Text style={[styles.title, { color: colors.text }]}>Subscribe to Artometrics</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Unlock member episodes, saved reports, and early access to new investigations.
      </Text>
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
            {plan.popular ? (
              <Text style={[styles.popular, { color: colors.accent }]}>Most popular</Text>
            ) : null}
            <Text style={[styles.planTitle, { color: colors.text }]}>{plan.title}</Text>
            <Text style={[styles.price, { color: colors.text }]}>
              {plan.price}
              <Text style={[styles.period, { color: colors.textSubtle }]}>
                {" "}
                / {plan.period.toLowerCase()}
              </Text>
            </Text>
            <View style={styles.features}>
              {plan.features.map((feature) => (
                <Text key={feature} style={[styles.feature, { color: colors.textMuted }]}>
                  · {feature}
                </Text>
              ))}
            </View>
            {user ? (
              <PrimaryButton label="Checkout" onPress={() => checkout(plan.tier)} />
            ) : (
              <Link href="/signup" asChild>
                <PrimaryButton label="Get started" />
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
  features: { gap: 6, marginVertical: 8 },
  feature: { fontSize: 14, lineHeight: 22 },
});
