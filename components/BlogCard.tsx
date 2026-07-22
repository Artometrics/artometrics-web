import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  primarySection,
  type BlogPost,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";

export function BlogCard({
  post,
  variant = "row",
}: {
  post: BlogPost;
  variant?: "stack" | "row";
}) {
  const { colors } = useTheme();
  const section = primarySection(post.tags);
  const hero = assetUrl(post.heroImage);
  const author = post.author ? formatAuthorName(String(post.author)) : "Artometrics";

  if (variant === "stack") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable style={StyleSheet.flatten([styles.stack, { borderBottomColor: colors.border }])}>
          {hero ? (
            <Image
              source={{ uri: hero }}
              style={styles.image}
              resizeMode="cover"
              accessibilityLabel={post.title}
            />
          ) : null}
          <View style={styles.body}>
            {section ? (
              <Text style={[styles.kicker, { color: colors.accent }]}>
                {SECTION_META[section].title}
              </Text>
            ) : null}
            <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
            <Text style={[styles.deck, { color: colors.textMuted }]} numberOfLines={3}>
              {deckLine(post.description, 28)}
            </Text>
            <Text style={[styles.meta, { color: colors.textSubtle }]}>
              {author} · {formatDate(post.pubDate)}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable style={StyleSheet.flatten([styles.row, { borderBottomColor: colors.border }])}>
        <View style={styles.rowCopy}>
          {section ? (
            <Text style={[styles.kicker, { color: colors.accent }]}>
              {SECTION_META[section].title}
            </Text>
          ) : null}
          <Text style={[styles.rowTitle, { color: colors.text }]}>{post.title}</Text>
          <Text style={[styles.deck, { color: colors.textMuted }]} numberOfLines={2}>
            {deckLine(post.description, 22)}
          </Text>
          <Text style={[styles.meta, { color: colors.textSubtle }]}>
            {formatDate(post.pubDate)}
          </Text>
        </View>
        {hero ? (
          <Image
            source={{ uri: hero }}
            style={styles.rowThumb}
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        ) : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  stack: {
    overflow: "hidden",
    flex: 1,
    minWidth: 260,
    gap: 12,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: { width: "100%", aspectRatio: 16 / 10 },
  body: { gap: 8 },
  kicker: {
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
  },
  deck: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 22,
  },
  meta: { fontSize: 12, marginTop: 2 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowCopy: { flex: 1, gap: 6, paddingRight: 4 },
  rowTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },
  rowThumb: {
    width: 96,
    height: 96,
  },
});
