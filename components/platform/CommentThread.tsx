import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useAuth } from "@/lib/auth";
import { addComment, listComments, type CommentRow } from "@/lib/platform/social";

export function CommentThread({
  targetKind,
  targetId,
}: {
  targetKind: "report" | "member_post";
  targetId: string;
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setComments(await listComments(targetKind, targetId));
    } catch {
      /* soft until migration applied */
    }
  }, [targetKind, targetId]);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const roots = comments.filter((c) => !c.parent_id);
  const replies = (parentId: string) => comments.filter((c) => c.parent_id === parentId);

  return (
    <View className="mt-9 pt-7 border-t border-border gap-3">
      <Text className="font-serif text-2xl font-bold text-fg">Comments</Text>
      <Text className="font-serif text-[15px] leading-6 text-muted">
        Thoughtful notes welcome — keep it longform.
      </Text>

      {!user ? (
        <Text className="font-serif text-[15px] leading-6 text-muted">
          <Link href="/login">
            <Text className="text-accent">Sign in</Text>
          </Link>{" "}
          to join the conversation.
        </Text>
      ) : (
        <View className="gap-2">
          {replyTo ? (
            <Pressable onPress={() => setReplyTo(null)}>
              <Text className="text-accent text-[13px]">Cancel reply</Text>
            </Pressable>
          ) : null}
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder={replyTo ? "Write a reply…" : "Add a comment…"}
            placeholderTextColorClassName="text-subtle"
            multiline
            className="border border-border min-h-[88px] p-3 font-serif text-base text-fg bg-bg-elevated"
          />
          {error ? <Text className="text-accent">{error}</Text> : null}
          <Pressable
            onPress={async () => {
              setError(null);
              try {
                await addComment(user.id, targetKind, targetId, body, replyTo);
                setBody("");
                setReplyTo(null);
                await reload();
              } catch (e) {
                setError(e instanceof Error ? e.message : "Could not post");
              }
            }}
            className="self-start px-4 py-2.5 bg-fg"
          >
            <Text className="font-bold text-sm text-inverse">Post</Text>
          </Pressable>
        </View>
      )}

      <View className="gap-[18px] mt-2">
        {roots.map((c) => (
          <View key={c.id} className="gap-1.5">
            <Text className="text-[11px] tracking-[1.1px] uppercase font-bold text-accent">
              {c.profiles?.handle
                ? `@${c.profiles.handle}`
                : c.profiles?.display_name || "Member"}
            </Text>
            <Text className="font-serif text-base leading-[26px] text-fg">{c.body}</Text>
            {user ? (
              <Pressable onPress={() => setReplyTo(c.id)} hitSlop={8}>
                <Text className="text-subtle text-[13px]">Reply</Text>
              </Pressable>
            ) : null}
            {replies(c.id).map((r) => (
              <View
                key={r.id}
                className="ml-3.5 mt-2.5 pl-3 border-l-2 border-border gap-1"
              >
                <Text className="text-[11px] tracking-[1.1px] uppercase font-bold text-accent">
                  {r.profiles?.handle
                    ? `@${r.profiles.handle}`
                    : r.profiles?.display_name || "Member"}
                </Text>
                <Text className="font-serif text-base leading-[26px] text-fg">{r.body}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
