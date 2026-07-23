import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { sectionLabel, type BlogPost } from "@/lib/content";

export function TrendingRail({ posts }: { posts: BlogPost[] }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.wrap, { borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Trending</Text>
      {posts.map((post, i) => {
        const label = sectionLabel(post.tags);
        const n = String(i + 1).padStart(2, "0");
        return (
          <Link key={post.slug} href={`/${post.slug}`} asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.row,
                { borderBottomColor: colors.border },
                i === posts.length - 1 ? { borderBottomWidth: 0 } : null,
              ])}
            >
              <Text style={[styles.num, { color: colors.textSubtle }]}>{n}</Text>
              <View style={styles.copy}>
                {label ? (
                  <Text style={[styles.kicker, { color: colors.textSubtle }]}>{label}</Text>
                ) : null}
                <Text style={[styles.headline, { color: colors.text }]} numberOfLines={3}>
                  {post.title}
                </Text>
              </View>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    flex: 1,
    minWidth: 260,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  num: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    fontWeight: "600",
    width: 28,
  },
  copy: { flex: 1, gap: 4 },
  kicker: {
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  headline: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },
});
