import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import type { Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { getSupabase } from "@/lib/supabase/client";

WebBrowser.maybeCompleteAuthSession();

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signInWithGoogle: () => Promise<{ error?: string; ok?: boolean; cancelled?: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function oauthRedirectTo(): string {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback`;
  }
  return makeRedirectUri({
    scheme: "artometrics",
    path: "auth/callback",
  });
}

/** Parse OAuth return URL without relying on expo-auth-session deep imports / URL polyfills. */
function parseAuthParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const hash = url.includes("#") ? url.split("#")[1] ?? "" : "";
  const query = url.includes("?")
    ? (url.split("?")[1] ?? "").split("#")[0] ?? ""
    : "";
  for (const part of `${query}&${hash}`.split("&")) {
    if (!part) continue;
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    try {
      const key = decodeURIComponent(part.slice(0, eq));
      const value = decodeURIComponent(part.slice(eq + 1));
      if (key) params[key] = value;
    } catch {
      /* ignore malformed OAuth fragments */
    }
  }
  return params;
}

async function createSessionFromUrl(url: string): Promise<{ error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Auth is not configured." };

  const params = parseAuthParams(url);
  if (params.error || params.errorCode) {
    return { error: params.error_description || params.error || params.errorCode };
  }

  if (params.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(params.code);
    return error ? { error: error.message } : {};
  }

  const access_token = params.access_token;
  const refresh_token = params.refresh_token;
  if (!access_token || !refresh_token) return {};

  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  return error ? { error: error.message } : {};
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Native / deep-link return from Google OAuth
  useEffect(() => {
    const handleUrl = (url: string | null) => {
      if (!url) return;
      if (
        !url.includes("access_token") &&
        !url.includes("refresh_token") &&
        !url.includes("code=")
      ) {
        return;
      }
      void createSessionFromUrl(url).catch(() => {
        /* soft — bad deep links should not crash the app */
      });
    };

    void Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener("url", ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: "Auth is not configured." };
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error ? { error: error.message } : {};
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const supabase = getSupabase();
      if (!supabase) return { error: "Auth is not configured." };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) return { error: error.message };
      // Email confirmation on → no session until the user clicks the link.
      if (!data.session) return { needsConfirmation: true };
      return {};
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return { error: "Auth is not configured." };

    const redirectTo = oauthRedirectTo();

    if (Platform.OS === "web") {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: { prompt: "select_account" },
        },
      });
      // Browser navigates away on success.
      return error ? { error: error.message } : { ok: true };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) return { error: error.message };
    if (!data.url) return { error: "Unable to start Google sign-in." };

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    if (result.type !== "success" || !result.url) {
      return result.type === "cancel" || result.type === "dismiss"
        ? { cancelled: true }
        : { error: "Google sign-in was interrupted." };
    }
    const sessionResult = await createSessionFromUrl(result.url);
    if (sessionResult.error) return sessionResult;
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
  }, []);

  // Keep SSR/static HTML on the guest chrome until the client mounts.
  const value = useMemo(
    () => ({
      session: mounted ? session : null,
      user: mounted ? (session?.user ?? null) : null,
      loading: mounted ? loading : true,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [session, loading, mounted, signIn, signUp, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
