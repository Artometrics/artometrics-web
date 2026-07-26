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
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    let query = supabase
      .from("tracking_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("logged_on", { ascending: false })
      .limit(120);
    if (type) query = query.eq("type", type);
    const { data, error } = await query;
    if (error) return json({ error: error.message }, 500);
    return json({ logs: data ?? [] });
  }

  if (request.method === "POST") {
    let body: {
      type?: string;
      value?: number;
      label?: string;
      notes?: string;
      loggedOn?: string;
      logged_on?: string;
    };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    if (!body.type) return json({ error: "Type required" }, 400);
    const { data, error } = await supabase
      .from("tracking_logs")
      .insert({
        user_id: user.id,
        type: body.type,
        value: body.value ?? null,
        label: body.label ?? null,
        notes: body.notes ?? null,
        logged_on:
          body.logged_on ||
          body.loggedOn ||
          new Date().toISOString().slice(0, 10),
      })
      .select("*")
      .single();
    if (error) return json({ error: error.message }, 500);
    return json({ log: data }, 201);
  }

  return json({ error: "Method not allowed" }, 405);
};

