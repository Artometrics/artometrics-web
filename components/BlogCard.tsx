import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Colors, Fonts } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  primaryDesk,
  type BlogPost,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";

export function BlogCard({
  post,
  variant = "stack",
}: {
  post: BlogPost;
  variant?: "stack" | "row";
}) {
  const desk = primaryDesk(post.tags);
  const hero = assetUrl(post.heroImage);
  const author = post.author ? formatAuthorName(String(post.author)) : "Artometrics";

  if (variant === "row") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable style={styles.row}>
          <View style={styles.rowCopy}>
            {desk ? <Text style={styles.desk}>{SECTION_META[desk].title}</Text> : null}
            <Text style={styles.rowTitle}>{post.title}</Text>
            <Text style={styles.author}>{author}</Text>
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

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable style={styles.stack}>
        {hero ? (
          <Image
            source={{ uri: hero }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        ) : null}
        <View style={styles.body}>
          {desk ? <Text style={styles.desk}>{SECTION_META[desk].title}</Text> : null}
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.deck} numberOfLines={3}>
            {deckLine(post.description)}
          </Text>
          <Text style={styles.meta}>
            {author} · {formatDate(post.pubDate)}
          </Text>
        </View>
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
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  image: { width: "100%", aspectRatio: 16 / 10, backgroundColor: Colors.base100 },
  body: { gap: 8 },
  desk: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: Colors.accent600,
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.base900,
    fontWeight: "700",
  },
  deck: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.base600,
  },
  meta: { fontSize: 13, color: Colors.base500, marginTop: 2 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  rowCopy: { flex: 1, gap: 8, paddingRight: 4 },
  rowTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.base900,
  },
  author: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: Colors.base600,
    fontWeight: "600",
  },
  rowThumb: {
    width: 88,
    height: 88,
    backgroundColor: Colors.base100,
  },
});
