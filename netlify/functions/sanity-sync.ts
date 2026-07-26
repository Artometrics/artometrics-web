import {
  adminSupabase,
  corsPreflight,
  json,
  userFromAuthHeader,
} from "../lib/shared";
import { getSanityEnv, sanityMutate } from "../../lib/sanity/client";

/**
 * Create/update a Sanity memberContribution draft from a submitted member_post.
 * No-op with 503 if Sanity write credentials are missing.
 */
export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  if (!getSanityEnv(true)) {
    return json(
      {
        ok: false,
        skipped: true,
        error: "Sanity write credentials not configured",
      },
      503,
    );
  }

  let body: { postId?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!body.postId) return json({ error: "Missing postId" }, 400);

  const supabase = adminSupabase();
  const { data: post, error } = await supabase
    .from("member_posts")
    .select("*")
    .eq("id", body.postId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) return json({ error: error.message }, 500);
  if (!post) return json({ error: "Post not found" }, 404);

  const { data: profile } = await supabase
    .from("profiles")
    .select("handle, display_name")
    .eq("id", user.id)
    .maybeSingle();

  const docId = post.sanity_id || `memberPost-${post.id}`;
  try {
    await sanityMutate([
      {
        createOrReplace: {
          _id: docId,
          _type: "memberContribution",
          title: post.title,
          slug: { _type: "slug", current: post.slug || post.id },
          excerpt: post.excerpt,
          body: post.body,
          memberHandle: profile?.handle || null,
          supabasePostId: post.id,
          status: "draft",
          publishedAt: null,
        },
      },
    ]);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sanity mutate failed";
    return json({ error: message }, 502);
  }

  await supabase
    .from("member_posts")
    .update({ sanity_id: docId, updated_at: new Date().toISOString() })
    .eq("id", post.id);

  return json({ ok: true, sanityId: docId, memberHandle: profile?.handle ?? null });
};
