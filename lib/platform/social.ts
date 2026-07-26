import { getSupabase } from "@/lib/supabase/client";

export type CommentRow = {
  id: string;
  user_id: string;
  target_kind: "report" | "member_post";
  target_id: string;
  parent_id: string | null;
  body: string;
  created_at: string;
  profiles?: { display_name: string | null; handle: string | null } | null;
};

export async function listComments(
  targetKind: "report" | "member_post",
  targetId: string,
): Promise<CommentRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("comments")
    .select("id, user_id, target_kind, target_id, parent_id, body, created_at")
    .eq("target_kind", targetKind)
    .eq("target_id", targetId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  const rows = (data ?? []) as CommentRow[];
  const userIds = [...new Set(rows.map((r) => r.user_id))];
  if (userIds.length === 0) return rows;
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, display_name, handle")
    .in("id", userIds);
  const map = new Map((profiles ?? []).map((p) => [p.id as string, p]));
  return rows.map((r) => ({
    ...r,
    profiles: map.get(r.user_id)
      ? {
          display_name: (map.get(r.user_id) as { display_name: string | null }).display_name,
          handle: (map.get(r.user_id) as { handle: string | null }).handle,
        }
      : null,
  }));
}

export async function addComment(
  userId: string,
  targetKind: "report" | "member_post",
  targetId: string,
  body: string,
  parentId?: string | null,
): Promise<CommentRow> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const text = body.trim();
  if (!text) throw new Error("Comment is empty");
  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: userId,
      target_kind: targetKind,
      target_id: targetId,
      parent_id: parentId ?? null,
      body: text,
    })
    .select("id, user_id, target_kind, target_id, parent_id, body, created_at")
    .single();
  if (error) throw error;
  return data as CommentRow;
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { data } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();
  return Boolean(data);
}

export async function followUser(followerId: string, followingId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  if (followerId === followingId) return;
  const { error } = await supabase.from("follows").upsert({
    follower_id: followerId,
    following_id: followingId,
  });
  if (error) throw error;
  await supabase.from("notifications").insert({
    user_id: followingId,
    kind: "follow",
    actor_id: followerId,
    body: "started following you",
  });
}

export async function unfollowUser(followerId: string, followingId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  if (error) throw error;
}

export async function clapCount(
  targetKind: "report" | "member_post",
  targetId: string,
): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;
  const { count } = await supabase
    .from("claps")
    .select("*", { count: "exact", head: true })
    .eq("target_kind", targetKind)
    .eq("target_id", targetId);
  return count ?? 0;
}

export async function hasClapped(
  userId: string,
  targetKind: "report" | "member_post",
  targetId: string,
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { data } = await supabase
    .from("claps")
    .select("user_id")
    .eq("user_id", userId)
    .eq("target_kind", targetKind)
    .eq("target_id", targetId)
    .maybeSingle();
  return Boolean(data);
}

export async function toggleClap(
  userId: string,
  targetKind: "report" | "member_post",
  targetId: string,
): Promise<{ clapped: boolean; count: number }> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const already = await hasClapped(userId, targetKind, targetId);
  if (already) {
    await supabase
      .from("claps")
      .delete()
      .eq("user_id", userId)
      .eq("target_kind", targetKind)
      .eq("target_id", targetId);
  } else {
    await supabase.from("claps").insert({
      user_id: userId,
      target_kind: targetKind,
      target_id: targetId,
    });
  }
  return { clapped: !already, count: await clapCount(targetKind, targetId) };
}

export type NotificationRow = {
  id: string;
  kind: string;
  body: string;
  read_at: string | null;
  created_at: string;
  actor_id: string | null;
  target_kind: string | null;
  target_id: string | null;
};

export async function listNotifications(userId: string, limit = 30): Promise<NotificationRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("notifications")
    .select("id, kind, body, read_at, created_at, actor_id, target_kind, target_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as NotificationRow[];
}

export async function markNotificationsRead(userId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("read_at", null);
}
