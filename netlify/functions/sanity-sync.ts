import {
  adminSupabase,
  corsPreflight,
  json,
  userFromAuthHeader,
} from "../lib/shared";

/**
 * Create/update a Sanity memberContribution draft from a submitted member_post.
 * No-op with 503 if Sanity write credentials are missing.
 */
export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";

  if (!projectId || !token || projectId === "yourProjectId") {
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
  const mutations = [
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
  ];

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!res.ok) {
    const text = await res.text();
    return json({ error: `Sanity mutate failed: ${text}` }, 502);
  }

  await supabase
    .from("member_posts")
    .update({ sanity_id: docId, updated_at: new Date().toISOString() })
    .eq("id", post.id);

  return json({ ok: true, sanityId: docId, memberHandle: profile?.handle ?? null });
};
