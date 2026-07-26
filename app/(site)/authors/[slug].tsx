import { Image, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { assetUrl } from "@/lib/assets";
import { getAuthor, getAuthors } from "@/lib/content";
import { paramString } from "@/lib/params";
import { useTheme } from "@/lib/theme";

export async function generateStaticParams() {
  return getAuthors().map((author) => ({ slug: author.id }));
}

export default function AuthorScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const author = getAuthor(slug);
  const { colors } = useTheme();

  if (!author) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={[styles.title, { color: colors.text }]}>Author not found</Text>
        <Link href="/authors">
          <Text style={[styles.link, { color: colors.accent }]}>Back to authors</Text>
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
            style={[styles.avatar, { backgroundColor: colors.bgElevated }]}
            resizeMode="cover"
            accessibilityLabel={author.image?.alt || author.name}
          />
        ) : null}
        <Text style={[styles.eyebrow, { color: colors.accent }]}>
          {author.role ?? "Author"}
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>{author.name}</Text>
        {author.bio ? (
          <Text style={[styles.bio, { color: colors.textMuted }]}>{author.bio}</Text>
        ) : null}
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
    marginBottom: 8,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: 36, fontWeight: "300" },
  bio: { fontSize: 16, lineHeight: 28 },
  link: {},
});
