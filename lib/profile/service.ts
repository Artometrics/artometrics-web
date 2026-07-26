import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase/client";

export type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  display_name: string | null;
  pen_name: string | null;
  onboarding_completed: boolean;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  timezone: string | null;
};

const PROFILE_COLS =
  "id, email, full_name, display_name, pen_name, onboarding_completed, birth_date, birth_time, birth_place, timezone";

export async function getProfile(
  userId: string,
  client?: SupabaseClient | null,
): Promise<UserProfile | null> {
  const supabase = client ?? getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_COLS)
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data as UserProfile | null;
}

export async function upsertProfile(
  userId: string,
  patch: Partial<
    Omit<UserProfile, "id"> & {
      email?: string | null;
    }
  >,
  client?: SupabaseClient | null,
): Promise<UserProfile> {
  const supabase = client ?? getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        ...patch,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )
    .select(PROFILE_COLS)
    .single();
  if (error) throw error;
  return data as UserProfile;
}

export async function ensureProfileRow(
  userId: string,
  email?: string | null,
  fullName?: string | null,
): Promise<UserProfile | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const existing = await getProfile(userId, supabase);
  if (existing) return existing;
  const seed = fullName || (email ? email.split("@")[0] : "Member");
  return upsertProfile(
    userId,
    {
      email: email ?? null,
      full_name: seed,
      display_name: seed,
    },
    supabase,
  );
}
