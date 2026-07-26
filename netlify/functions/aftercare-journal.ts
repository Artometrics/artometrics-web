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
  const idParam = new URL(request.url).searchParams.get("id");

  if (request.method === "GET" && !idParam) {
    const { data, error } = await supabase
      .from("aftercare_journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) return json({ error: error.message }, 500);
    return json({ entries: data ?? [] });
  }

  if (request.method === "GET" && idParam) {
    const { data, error } = await supabase
      .from("aftercare_journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("id", idParam)
      .maybeSingle();
    if (error) return json({ error: error.message }, 500);
    if (!data) return json({ error: "Not found" }, 404);
    return json({ entry: data });
  }

  if (request.method === "POST") {
    let body: { title?: string; body?: string; mood?: string; tags?: string[] };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    if (!body.body?.trim()) return json({ error: "Body required" }, 400);
    const { data, error } = await supabase
      .from("aftercare_journal_entries")
      .insert({
        user_id: user.id,
        title: body.title?.trim() || null,
        body: body.body.trim(),
        mood: body.mood || null,
        tags: body.tags || [],
      })
      .select("*")
      .single();
    if (error) return json({ error: error.message }, 500);
    return json({ entry: data }, 201);
  }

  if ((request.method === "PUT" || request.method === "PATCH") && idParam) {
    let body: { title?: string; body?: string; mood?: string; tags?: string[] };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    const patch: Record<string, unknown> = {};
    if (body.title !== undefined) patch.title = body.title;
    if (body.body !== undefined) patch.body = body.body;
    if (body.mood !== undefined) patch.mood = body.mood;
    if (body.tags !== undefined) patch.tags = body.tags;
    const { data, error } = await supabase
      .from("aftercare_journal_entries")
      .update(patch)
      .eq("user_id", user.id)
      .eq("id", idParam)
      .select("*")
      .maybeSingle();
    if (error) return json({ error: error.message }, 500);
    if (!data) return json({ error: "Not found" }, 404);
    return json({ entry: data });
  }

  if (request.method === "DELETE" && idParam) {
    const { error } = await supabase
      .from("aftercare_journal_entries")
      .delete()
      .eq("user_id", user.id)
      .eq("id", idParam);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
};

