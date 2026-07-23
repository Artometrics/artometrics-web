import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  sectionLabel,
  type BlogPost,
} from "@/lib/content";

type Variant = "tile" | "portrait" | "compact";

export function MagazineCard({
  post,
  variant = "tile",
  width,
}: {
  post: BlogPost;
  variant?: Variant;
  width?: number;
}) {
  const { colors, mode } = useTheme();
  const label = sectionLabel(post.tags);
  const hero = assetUrl(post.heroImage);
  const author = post.author ? formatAuthorName(String(post.author)) : "Artometrics";
  const aspect = variant === "portrait" ? 4 / 5 : 16 / 10;
  const fallbackMark = assetUrl(
    mode === "dark" ? "/images/brand/chomsky-a-white.png" : "/images/brand/chomsky-a-black.png"
  );

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable
        style={StyleSheet.flatten([
          styles.card,
          width ? { width } : styles.cardFlex,
          variant === "compact" ? styles.compact : null,
        ])}
      >
        {hero ? (
          <Image
            source={{ uri: hero }}
            style={[styles.image, { aspectRatio: aspect }]}
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        ) : (
          <View
            style={[
              styles.image,
              styles.imageFallback,
              { aspectRatio: aspect, backgroundColor: colors.bgElevated },
            ]}
          >
            <Image
              source={{ uri: fallbackMark }}
              style={styles.fallbackMark}
              resizeMode="contain"
              accessibilityLabel="Artometrics"
            />
          </View>
        )}
        <View style={styles.body}>
          {label ? (
            <Text style={[styles.kicker, { color: colors.accent }]}>{label}</Text>
          ) : null}
          <Text
            style={[
              variant === "compact" ? styles.titleCompact : styles.title,
              { color: colors.text },
            ]}
            numberOfLines={variant === "compact" ? 3 : 4}
          >
            {post.title}
          </Text>
          {variant !== "compact" ? (
            <Text style={[styles.deck, { color: colors.textMuted }]} numberOfLines={2}>
              {deckLine(post.description, 18)}
            </Text>
          ) : null}
          <Text style={[styles.meta, { color: colors.textSubtle }]}>
            {author} · {formatDate(post.pubDate)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10 },
  cardFlex: { flex: 1, minWidth: 200 },
  compact: { minWidth: 160 },
  image: { width: "100%", backgroundColor: "#e5e5e5" },
  imageFallback: { alignItems: "center", justifyContent: "center" },
  fallbackMark: { width: 56, height: 56, opacity: 0.35 },
  body: { gap: 6 },
  kicker: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
  },
  titleCompact: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  deck: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  meta: { fontSize: 11, marginTop: 2 },
});
