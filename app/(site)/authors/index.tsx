import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import { getAuthors } from "@/lib/content";

export default function AuthorsIndex() {
  const { colors } = useTheme();
  const authors = getAuthors();

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title="Authors" description="Artometrics masthead." path="/authors" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Masthead</Text>
      <Text style={[styles.title, { color: colors.text }]}>Authors</Text>
      <View style={styles.grid}>
        {authors.map((author) => {
          const avatar = assetUrl(author.image?.url);
          return (
            <Link key={author.id} href={`/authors/${author.id}`} asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.card,
                  { borderColor: colors.border, backgroundColor: colors.bgElevated },
                ])}
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                    resizeMode="cover"
                    accessibilityLabel={author.image?.alt || author.name}
                  />
                ) : null}
                <Text style={[styles.name, { color: colors.text }]}>{author.name}</Text>
                {author.role ? (
                  <Text style={[styles.role, { color: colors.textMuted }]}>{author.role}</Text>
                ) : null}
              </Pressable>
            </Link>
          );
        })}
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
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", fontFamily: Fonts.serif, marginBottom: 12 },
  grid: { gap: 20, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexBasis: 200,
    flexGrow: 1,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 8,
    alignItems: "flex-start",
  },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  name: { fontSize: 18, fontWeight: "700" },
  role: { fontSize: 13 },
});
