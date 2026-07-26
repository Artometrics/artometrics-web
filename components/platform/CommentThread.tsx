import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { addComment, listComments, type CommentRow } from "@/lib/platform/social";

export function CommentThread({
  targetKind,
  targetId,
}: {
  targetKind: "report" | "member_post";
  targetId: string;
}) {
  const { colors } = useTheme();
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
    <View style={[styles.wrap, { borderTopColor: colors.border }]}>
      <Text style={[styles.h, { color: colors.text }]}>Comments</Text>
      <Text style={[styles.hint, { color: colors.textMuted }]}>
        Thoughtful notes welcome — keep it longform.
      </Text>

      {!user ? (
        <Text style={[styles.hint, { color: colors.textMuted }]}>
          <Link href="/login">
            <Text style={{ color: colors.accent }}>Sign in</Text>
          </Link>{" "}
          to join the conversation.
        </Text>
      ) : (
        <View style={{ gap: 8 }}>
          {replyTo ? (
            <Pressable onPress={() => setReplyTo(null)}>
              <Text style={{ color: colors.accent, fontSize: 13 }}>Cancel reply</Text>
            </Pressable>
          ) : null}
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder={replyTo ? "Write a reply…" : "Add a comment…"}
            placeholderTextColor={colors.textSubtle}
            multiline
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text, backgroundColor: colors.bgElevated },
            ]}
          />
          {error ? <Text style={{ color: colors.accent }}>{error}</Text> : null}
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
            style={StyleSheet.flatten([styles.postBtn, { backgroundColor: colors.text }])}
          >
            <Text style={[styles.postBtnText, { color: colors.inverse }]}>Post</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.list}>
        {roots.map((c) => (
          <View key={c.id} style={styles.item}>
            <Text style={[styles.author, { color: colors.accent }]}>
              {c.profiles?.handle
                ? `@${c.profiles.handle}`
                : c.profiles?.display_name || "Member"}
            </Text>
            <Text style={[styles.body, { color: colors.text }]}>{c.body}</Text>
            {user ? (
              <Pressable onPress={() => setReplyTo(c.id)} hitSlop={8}>
                <Text style={{ color: colors.textSubtle, fontSize: 13 }}>Reply</Text>
              </Pressable>
            ) : null}
            {replies(c.id).map((r) => (
              <View
                key={r.id}
                style={StyleSheet.flatten([
                  styles.reply,
                  { borderLeftColor: colors.border },
                ])}
              >
                <Text style={[styles.author, { color: colors.accent }]}>
                  {r.profiles?.handle
                    ? `@${r.profiles.handle}`
                    : r.profiles?.display_name || "Member"}
                </Text>
                <Text style={[styles.body, { color: colors.text }]}>{r.body}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 36,
    paddingTop: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  h: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: "700" },
  hint: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 24 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 88,
    padding: 12,
    fontFamily: Fonts.serif,
    fontSize: 16,
    textAlignVertical: "top",
  },
  postBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  postBtnText: { fontWeight: "700", fontSize: 14 },
  list: { gap: 18, marginTop: 8 },
  item: { gap: 6 },
  author: {
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  body: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  reply: {
    marginLeft: 14,
    marginTop: 10,
    paddingLeft: 12,
    borderLeftWidth: 2,
    gap: 4,
  },
});
