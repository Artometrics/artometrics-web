import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/Colors";
import { PLANS } from "@/lib/product/plans";
import { apiFetch } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";

export default function PricingScreen() {
  const { user } = useAuth();

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
      <Text style={styles.eyebrow}>Membership</Text>
      <Text style={styles.title}>Subscribe to Artometrics</Text>
      <Text style={styles.deck}>
        Unlock member episodes, saved reports, and early access to new investigations.
      </Text>
      <View style={styles.grid}>
        {PLANS.map((plan) => (
          <View
            key={plan.tier}
            style={[styles.card, plan.popular && styles.cardPopular]}
          >
            {plan.popular ? <Text style={styles.popular}>Most popular</Text> : null}
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.price}>
              {plan.price}
              <Text style={styles.period}> / {plan.period.toLowerCase()}</Text>
            </Text>
            <View style={styles.features}>
              {plan.features.map((feature) => (
                <Text key={feature} style={styles.feature}>
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
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900 },
  deck: { fontSize: 16, color: Colors.base600, maxWidth: 560, marginBottom: 12 },
  grid: { gap: 16, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    borderWidth: 1,
    borderColor: Colors.base200,
    padding: 24,
    gap: 12,
    backgroundColor: Colors.white,
  },
  cardPopular: { borderColor: Colors.accent600, borderWidth: 2 },
  popular: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "700",
  },
  planTitle: { fontSize: 22, color: Colors.base900 },
  price: { fontSize: 32, color: Colors.base900, fontWeight: "300" },
  period: { fontSize: 14, color: Colors.base500 },
  features: { gap: 6, marginVertical: 8 },
  feature: { fontSize: 14, color: Colors.base600, lineHeight: 22 },
});
