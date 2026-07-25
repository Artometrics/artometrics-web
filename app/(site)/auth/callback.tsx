import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase/client";

/**
 * OAuth return URL for web (and deep-link landing).
 * Supabase puts tokens in the hash; detectSessionInUrl + getSession picks them up.
 */
export default function AuthCallbackScreen() {
  const { colors } = useTheme();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = getSupabase();
      if (!supabase) {
        if (!cancelled) setError("Auth is not configured.");
        return;
      }
      // Give the client a tick to parse the URL hash / PKCE code.
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (cancelled) return;
      if (sessionError) {
        setError(sessionError.message);
        return;
      }
      if (data.session || user) {
        router.replace("/account");
        return;
      }
      // Still waiting for AuthProvider / hash parse
      if (!loading) {
        setError("Could not complete sign-in. Try again from Log in.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user]);

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Signing in"
        description="Completing Artometrics sign-in."
        path="/auth/callback"
      />
      <Text style={[styles.title, { color: colors.text }]}>
        {error ? "Sign-in issue" : "Signing you in…"}
      </Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        {error ?? "One moment while we finish Google login."}
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 64, gap: 12 },
  title: { fontFamily: Fonts.serif, fontSize: 28, fontWeight: "600" },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
});
