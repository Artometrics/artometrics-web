import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { deckLine, formatDate, primaryDesk, type BlogPost } from "@/lib/content";
import { SECTION_META } from "@/data/sections";

export function BlogCard({ post }: { post: BlogPost }) {
  const desk = primaryDesk(post.tags);
  const hero = assetUrl(post.heroImage);
  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable style={styles.card}>
        {hero ? (
          <Image
            source={{ uri: hero }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        ) : null}
        <View style={styles.body}>
          {desk ? (
            <Text style={styles.desk}>{SECTION_META[desk].title}</Text>
          ) : null}
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.deck} numberOfLines={3}>
            {deckLine(post.description)}
          </Text>
          <Text style={styles.meta}>{formatDate(post.pubDate)}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.base200,
    backgroundColor: Colors.white,
    overflow: "hidden",
    flex: 1,
    minWidth: 260,
  },
  image: { width: "100%", aspectRatio: 16 / 9, backgroundColor: Colors.base100 },
  body: { padding: 16, gap: 8 },
  desk: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    color: Colors.base900,
    fontWeight: "400",
  },
  deck: { fontSize: 14, lineHeight: 22, color: Colors.base600 },
  meta: { fontSize: 12, color: Colors.base500, marginTop: 4 },
});
