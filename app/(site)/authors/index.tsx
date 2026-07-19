import { Image, Pressable, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { getAuthors } from "@/lib/content";

export default function AuthorsIndex() {
  const authors = getAuthors();
  const { width } = useWindowDimensions();

  return (
    <Wrapper style={styles.wrap}>
      <Text style={styles.eyebrow}>Masthead</Text>
      <Text style={styles.title}>Authors</Text>
      <View style={[styles.grid, width >= 700 && styles.gridWide]}>
        {authors.map((author) => (
          <Link key={author.id} href={`/authors/${author.id}`} asChild>
            <Pressable style={styles.card}>
              {assetUrl(author.image?.url) ? (
                <Image
                  source={{ uri: assetUrl(author.image?.url)! }}
                  style={styles.avatar}
                  resizeMode="cover"
                  accessibilityLabel={author.image?.alt || author.name}
                />
              ) : null}
              <Text style={styles.name}>{author.name}</Text>
              {author.role ? <Text style={styles.role}>{author.role}</Text> : null}
            </Pressable>
          </Link>
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
  title: { fontSize: 40, fontWeight: "300", color: Colors.base900, marginBottom: 12 },
  grid: { gap: 20 },
  gridWide: { flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexBasis: "30%",
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.base200,
    padding: 16,
    gap: 8,
    alignItems: "flex-start",
  },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.base100 },
  name: { fontSize: 20, color: Colors.base900 },
  role: { fontSize: 13, color: Colors.base600 },
});
