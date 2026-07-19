import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { Colors } from "@/constants/Colors";
import { getBlogPosts } from "@/lib/content";

export default function BlogIndex() {
  const posts = getBlogPosts();
  const { width } = useWindowDimensions();

  return (
    <Wrapper style={styles.wrap}>
      <Text style={styles.eyebrow}>Archive</Text>
      <Text style={styles.title}>Reports</Text>
      <Text style={styles.deck}>
        Editorial data reports on culture, atlas, history, persona, and power.
      </Text>
      <View style={[styles.grid, width >= 700 && styles.gridWide]}>
        {posts.map((post) => (
          <View key={post.slug} style={styles.gridItem}>
            <BlogCard post={post} />
          </View>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", color: Colors.base900 },
  deck: { fontSize: 16, color: Colors.base600, marginBottom: 20, maxWidth: 560 },
  grid: { gap: 20 },
  gridWide: { flexDirection: "row", flexWrap: "wrap" },
  gridItem: { flexBasis: "47%", flexGrow: 1, maxWidth: 540 },
});
