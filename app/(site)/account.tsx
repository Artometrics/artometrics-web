import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { useAuth } from "@/lib/auth";
import { paramString } from "@/lib/params";
import { ensureProfileRow, getProfile } from "@/lib/profile/service";

/**
 * Account entry hub — billing/settings live at /settings; identity at /me and /u/[handle].
 */
export default function AccountScreen() {
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
      <Wrapper variant="narrow" className="gap-3.5 py-12">
        <Text className="font-serif text-base leading-7 text-muted">Loading account…</Text>
      </Wrapper>
    );
  }

  if (!user) {
    return (
      <Wrapper variant="narrow" className="gap-3.5 py-12">
        <PageSeo title="Account" description="Artometrics members area." path="/account" />
        {checkoutSuccess ? (
          <View className="gap-1.5 border border-accent bg-accent-soft px-4 py-3.5 mb-1">
            <Text className="text-xs tracking-[1.6px] uppercase font-bold text-accent">
              Checkout complete
            </Text>
            <Text className="font-serif text-base leading-7 text-fg">
              Log in with the same email you used at checkout to open your membership.
            </Text>
          </View>
        ) : null}
        <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Account</Text>
        <Text className="font-serif text-[36px] font-bold text-fg">Members area</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Log in for Studio, your profile, and membership.
        </Text>
        <View className="flex-row flex-wrap gap-3 mt-2">
          <Link href="/login" asChild>
            <PrimaryButton label="Log in" />
          </Link>
          <Link href="/signup" asChild>
            <PrimaryButton label="Sign up" className="bg-muted" />
          </Link>
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo title="Account" description="Your Artometrics membership." path="/account" />
      {checkoutSuccess ? (
        <View className="gap-1.5 border border-accent bg-accent-soft px-4 py-3.5 mb-1">
          <Text className="text-xs tracking-[1.6px] uppercase font-bold text-accent">
            You are subscribed
          </Text>
          <Text className="font-serif text-base leading-7 text-fg">
            Welcome — open Studio or finish your public profile.
          </Text>
        </View>
      ) : null}
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Account</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">Welcome back</Text>
      <Text className="font-serif text-base leading-7 text-muted">{user.email}</Text>
      <View className="flex-row flex-wrap gap-3 mt-2">
        <PrimaryButton label="Open Studio" onPress={() => router.push("/studio")} />
        <PrimaryButton label="Your hub" onPress={() => router.push("/me")} className="bg-muted" />
        <PrimaryButton
          label="Settings"
          onPress={() => router.push("/settings")}
          className="bg-muted"
        />
        {handle ? (
          <PrimaryButton
            label={`@${handle}`}
            onPress={() => router.push(`/u/${handle}`)}
            className="bg-muted"
          />
        ) : null}
      </View>
    </Wrapper>
  );
}
