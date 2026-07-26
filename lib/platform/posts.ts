import { getSupabase } from "@/lib/supabase/client";

export type MemberPost = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  excerpt: string;
  status: "draft" | "published" | "submitted" | "accepted" | "rejected";
  source_kind: string | null;
  source_id: string | null;
  slug: string | null;
  published_at: string | null;
  submitted_at: string | null;
  sanity_id: string | null;
  created_at: string;
  updated_at: string;
};

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "post"
  );
}

export async function listPublishedPostsForUser(userId: string): Promise<MemberPost[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("member_posts")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["published", "accepted"])
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MemberPost[];
}

export async function listOwnPosts(userId: string): Promise<MemberPost[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("member_posts")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MemberPost[];
}

export async function getMemberPost(id: string): Promise<MemberPost | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from("member_posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as MemberPost | null;
}

export async function createOrUpdateDraft(
  userId: string,
  input: {
    id?: string;
    title: string;
    body: string;
    source_kind?: MemberPost["source_kind"];
    source_id?: string | null;
  },
): Promise<MemberPost> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const excerpt = input.body.trim().slice(0, 220);
  if (input.id) {
    const { data, error } = await supabase
      .from("member_posts")
      .update({
        title: input.title.trim() || "Untitled",
        body: input.body,
        excerpt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", input.id)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (error) throw error;
    return data as MemberPost;
  }
  const { data, error } = await supabase
    .from("member_posts")
    .insert({
      user_id: userId,
      title: input.title.trim() || "Untitled",
      body: input.body,
      excerpt,
      status: "draft",
      source_kind: input.source_kind ?? "freeform",
      source_id: input.source_id ?? null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as MemberPost;
}

export async function publishToProfile(userId: string, postId: string): Promise<MemberPost> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const existing = await getMemberPost(postId);
  if (!existing || existing.user_id !== userId) throw new Error("Post not found");
  const slug = existing.slug || `${slugify(existing.title)}-${postId.slice(0, 8)}`;
  const { data, error } = await supabase
    .from("member_posts")
    .update({
      status: "published",
      slug,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .eq("user_id", userId)
    .select("*")
    .single();
  if (error) throw error;
  return data as MemberPost;
}

export async function submitToMagazine(userId: string, postId: string): Promise<MemberPost> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("member_posts")
    .update({
      status: "submitted",
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .eq("user_id", userId)
    .select("*")
    .single();
  if (error) throw error;
  return data as MemberPost;
}

export async function listFollowingFeed(userId: string, limit = 40): Promise<MemberPost[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: follows, error: fErr } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", userId);
  if (fErr) throw fErr;
  const ids = (follows ?? []).map((f) => f.following_id as string);
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from("member_posts")
    .select("*")
    .in("user_id", ids)
    .in("status", ["published", "accepted"])
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as MemberPost[];
}
