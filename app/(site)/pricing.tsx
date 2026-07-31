import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { PLANS } from "@/lib/product/plans";
import { apiFetch } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";
import { openExternalUrl } from "@/lib/openExternal";

export default function PricingScreen() {
  const { user } = useAuth();
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
      if (data.url) {
        const opened = await openExternalUrl(data.url);
        if (opened) return;
      }
      setError(data.error ?? "Unable to start checkout.");
    } catch {
      setError("Unable to start checkout. Try again in a moment.");
    } finally {
      setBusyTier(null);
    }
  }

  return (
    <Wrapper className="gap-3 py-12">
      <PageSeo
        title="Pricing"
        description="Subscribe to Artometrics for member episodes and saved reports."
        path="/pricing"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Membership
      </Text>
      <Text className="text-[36px] font-light font-serif text-fg">
        Subscribe for unlimited digital access
      </Text>
      <Text className="text-base max-w-[560px] mb-3 leading-6 text-muted">
        Your first week is free. Then pick monthly or annual — cancel anytime.
      </Text>
      {alreadyActive ? (
        <Text className="text-base max-w-[560px] mb-3 leading-6 text-fg">
          You already have an active membership.{" "}
          <Link href="/account">
            <Text className="text-accent">Manage billing</Text>
          </Link>
          .
        </Text>
      ) : null}
      {error ? (
        <Text className="text-sm leading-[22px] max-w-[560px] text-accent">{error}</Text>
      ) : null}
      <View className="gap-4 flex-row flex-wrap">
        {PLANS.map((plan) => (
          <View
            key={plan.tier}
            className={[
              "flex-grow flex-basis-[260px] p-6 gap-3 bg-bg-elevated",
              plan.popular ? "border-2 border-accent" : "border border-border",
            ].join(" ")}
          >
            {plan.badge ? (
              <Text className="text-[10px] tracking-[1.5px] uppercase font-bold text-accent">
                {plan.badge}
              </Text>
            ) : null}
            <Text className="text-[22px] text-fg">{plan.title}</Text>
            <Text className="text-[32px] font-light text-fg">
              {plan.price}
              <Text className="text-sm text-subtle">
                {" "}
                / {plan.period.replace(/^Per /i, "").toLowerCase()}
              </Text>
            </Text>
            <Text className="text-[13px] leading-5 text-muted">{plan.trialLabel}</Text>
            <View className="gap-1.5 my-2">
              {plan.features.map((feature) => (
                <Text key={feature} className="text-sm leading-[22px] text-muted">
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
