import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

export function corsPreflight() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    },
  });
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

/** Prefer EXPO_PUBLIC_* (Expo) with PUBLIC_* aliases for Netlify Functions. */
export function requirePublicEnv(expoName: string, legacyName: string): string {
  const value = process.env[expoName] || process.env[legacyName];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${expoName} (or legacy ${legacyName})`,
    );
  }
  return value;
}

export function adminSupabase() {
  return createClient(
    requirePublicEnv("EXPO_PUBLIC_SUPABASE_URL", "PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  );
}

export function stripeClient() {
  return new Stripe(requireEnv("STRIPE_SECRET_KEY"));
}

export async function userFromAuthHeader(request: Request) {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice(7);
  const supabase = adminSupabase();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export function priceIdForTier(tier: string): string | null {
  const map: Record<string, string | undefined> = {
    monthly: process.env.STRIPE_PRICE_MONTHLY,
    annual: process.env.STRIPE_PRICE_ANNUAL,
  };
  return map[tier] ?? null;
}

export async function getSubscriptionForUser(userId: string) {
  const supabase = adminSupabase();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export function isActiveSubscription(status: string | null | undefined) {
  return status === "active" || status === "trialing";
}
