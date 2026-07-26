import OpenAI from "openai";
import {
  birthdayInsight,
  moonPhaseApprox,
  sunSignFromDate,
} from "./_shared/aftercare/calculators";
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
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("birth_date")
    .eq("id", user.id)
    .maybeSingle();
  if (error) return json({ error: error.message }, 500);

  const moon = moonPhaseApprox();
  const sign = profile?.birth_date
    ? sunSignFromDate(profile.birth_date)
    : null;
  const insight = profile?.birth_date
    ? birthdayInsight(profile.birth_date)
    : null;

  let skyNote = `Today's moon is ${moon.name} (~${moon.illumination}% lit). Soften your pace and notice what wants tending.`;
  if (sign) {
    skyNote = `${sign} season energy meets a ${moon.name}. ${insight?.note ?? skyNote}`;
  }

  if (request.method === "POST") {
    try {
      const openai = new OpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Aftercare. Write one short poetic sky note (2 sentences) about today's moon and the user's sun sign. Gentle, not predictive doom.",
          },
          {
            role: "user",
            content: `Sun sign: ${sign || "unknown"}. Moon: ${moon.name}. Illumination: ${moon.illumination}%.`,
          },
        ],
      });
      skyNote = completion.choices[0]?.message?.content?.trim() || skyNote;
    } catch {
      // Soft-fail: keep calculator fallback when AI Gateway is unavailable.
    }
  } else if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  return json({ moon, sunSign: sign, insight, skyNote });
};

