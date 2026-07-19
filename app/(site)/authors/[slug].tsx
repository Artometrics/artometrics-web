import { Image, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { getAuthor, getAuthors } from "@/lib/content";

export async function generateStaticParams() {
  return getAuthors().map((author) => ({ slug: author.id }));
}

export default function AuthorScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const author = getAuthor(slug);

  if (!author) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={styles.title}>Author not found</Text>
        <Link href="/authors">
          <Text style={styles.link}>Back to authors</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper variant="narrow" style={styles.wrap}>
        {assetUrl(author.image?.url) ? (
          <Image
            source={{ uri: assetUrl(author.image?.url)! }}
            style={styles.avatar}
            resizeMode="cover"
            accessibilityLabel={author.image?.alt || author.name}
          />
        ) : null}
        <Text style={styles.eyebrow}>{author.role ?? "Author"}</Text>
        <Text style={styles.title}>{author.name}</Text>
        {author.bio ? <Text style={styles.bio}>{author.bio}</Text> : null}
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.base100,
    marginBottom: 8,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300", color: Colors.base900 },
  bio: { fontSize: 16, lineHeight: 28, color: Colors.base600 },
  link: { color: Colors.accent700 },
});
