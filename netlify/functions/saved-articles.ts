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
    const { data, error } = await supabase
      .from("saved_articles")
      .select("article_slug, saved_at")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false });
    if (error) return json({ error: error.message }, 500);
    return json({ items: data ?? [] });
  }

  if (request.method === "POST") {
    let body: { slug?: string };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    if (!body.slug) return json({ error: "Missing slug" }, 400);
    const { error } = await supabase.from("saved_articles").upsert({
      user_id: user.id,
      article_slug: body.slug,
    });
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (request.method === "DELETE") {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    if (!slug) return json({ error: "Missing slug" }, 400);
    const { error } = await supabase
      .from("saved_articles")
      .delete()
      .eq("user_id", user.id)
      .eq("article_slug", slug);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
};
