import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

let client: SupabaseClient | null = null;

function env(key: string): string | undefined {
  const extra = Constants.expoConfig?.extra as Record<string, string> | undefined;
  return (
    (process.env as Record<string, string | undefined>)[key] ??
    extra?.[key] ??
    undefined
  );
}

export function getSupabase(): SupabaseClient | null {
  const url = env("EXPO_PUBLIC_SUPABASE_URL") ?? env("PUBLIC_SUPABASE_URL");
  const anonKey =
    env("EXPO_PUBLIC_SUPABASE_ANON_KEY") ?? env("PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

export async function getAccessToken(): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await getAccessToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const site =
    env("EXPO_PUBLIC_SITE_URL") ??
    env("PUBLIC_SITE_URL") ??
    "https://artometrics.com";
  const base =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : site;
  return fetch(`${base}/api/${path}`, { ...init, headers });
}
