import { birthdayInsight } from "./_shared/aftercare/calculators";
import {
  adminSupabase,
  corsPreflight,
  json,
  userFromAuthHeader,
} from "../lib/shared";

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  const supabase = adminSupabase();

  if (request.method === "GET") {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(
        "id, email, display_name, full_name, birth_date, birth_time, birth_place, timezone, onboarding_completed, created_at, updated_at",
      )
      .eq("id", user.id)
      .maybeSingle();
    if (error) return json({ error: error.message }, 500);
    const insight = profile?.birth_date
      ? birthdayInsight(profile.birth_date)
      : birthdayInsight("");
    return json({
      profile: profile ?? {
        id: user.id,
        email: user.email ?? null,
        display_name: user.email?.split("@")[0] ?? null,
        full_name: null,
        birth_date: null,
        birth_time: null,
        birth_place: null,
        timezone: null,
        onboarding_completed: false,
      },
      email: user.email,
      insight,
    });
  }

  if (request.method === "PUT" || request.method === "POST") {
    let body: {
      displayName?: string;
      display_name?: string;
      birthDate?: string;
      birth_date?: string;
      birthTime?: string;
      birth_time?: string;
      birthPlace?: string;
      birth_place?: string;
      timezone?: string;
    };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const { data: existing } = await supabase
      .from("profiles")
      .select(
        "id, display_name, birth_date, birth_time, birth_place, timezone",
      )
      .eq("id", user.id)
      .maybeSingle();

    const values = {
      display_name:
        body.display_name ?? body.displayName ?? existing?.display_name ?? null,
      birth_date:
        body.birth_date ?? body.birthDate ?? existing?.birth_date ?? null,
      birth_time:
        body.birth_time ?? body.birthTime ?? existing?.birth_time ?? null,
      birth_place:
        body.birth_place ?? body.birthPlace ?? existing?.birth_place ?? null,
      timezone: body.timezone ?? existing?.timezone ?? null,
    };

    const { data: saved, error } = existing
      ? await supabase
          .from("profiles")
          .update(values)
          .eq("id", user.id)
          .select(
            "id, email, display_name, full_name, birth_date, birth_time, birth_place, timezone, onboarding_completed, created_at, updated_at",
          )
          .single()
      : await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email ?? null,
            ...values,
          })
          .select(
            "id, email, display_name, full_name, birth_date, birth_time, birth_place, timezone, onboarding_completed, created_at, updated_at",
          )
          .single();

    if (error) return json({ error: error.message }, 500);
    const insight = saved.birth_date ? birthdayInsight(saved.birth_date) : null;
    return json({ profile: saved, insight });
  }

  return json({ error: "Method not allowed" }, 405);
};

