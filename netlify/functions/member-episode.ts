import {
  adminSupabase,
  corsPreflight,
  getSubscriptionForUser,
  isActiveSubscription,
  json,
  userFromAuthHeader,
} from "../lib/shared";

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return json({ error: "Missing slug" }, 400);

  try {
    const subscription = await getSubscriptionForUser(user.id);
    if (!isActiveSubscription(subscription?.status)) {
      return json({ error: "Subscription required" }, 403);
    }

    const supabase = adminSupabase();
    const { data, error } = await supabase
      .from("member_episodes")
      .select("slug, title, html_content")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return json({ error: "Episode not found" }, 404);

    return json({
      slug: data.slug,
      title: data.title,
      html: data.html_content,
    });
  } catch (error) {
    console.error("member-episode", error);
    return json({ error: "Unable to load episode" }, 500);
  }
};
