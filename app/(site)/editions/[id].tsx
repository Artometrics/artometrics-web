import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { EDITIONS, getEdition } from "@/data/editions";
import { SECTION_META } from "@/data/sections";
import { getBlogPost } from "@/lib/content";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return EDITIONS.map((e) => ({ id: e.id }));
}

export default function EditionScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = paramString(params.id) ?? "";
  const edition = getEdition(id);

  if (!edition) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={[styles.title, { color: colors.text }]}>Edition not found</Text>
        <Link href="/editions">
          <Text style={{ color: colors.accent }}>Back to editions</Text>
        </Link>
      </Wrapper>
    );
  }

  const live = edition.articleSlugs
    .map((slug) => ({ slug, post: getBlogPost(slug) }))
    .filter((row) => row.post);

  const missing = edition.articleSlugs.filter((slug) => !getBlogPost(slug));

  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo title={edition.title} description={edition.dek} path={`/editions/${edition.id}`} />
      <Link href="/editions" asChild>
        <Pressable>
          <Text style={[styles.back, { color: colors.accent }]}>All editions</Text>
        </Pressable>
      </Link>
      <Text style={[styles.status, { color: colors.accent }]}>{edition.status}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{edition.title}</Text>
      <Text style={[styles.meta, { color: colors.textSubtle }]}>
        {SECTION_META[edition.section]?.title ?? edition.section}
      </Text>
      <Text style={[styles.body, { color: colors.textMuted }]}>{edition.dek}</Text>

      <Text style={[styles.h2, { color: colors.text }]}>In this issue</Text>
      <View style={styles.links}>
        {live.map(({ slug, post }) => (
          <Link key={slug} href={`/${slug}`} asChild>
            <Pressable style={styles.row}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>{post!.title}</Text>
              <Text style={[styles.rowSlug, { color: colors.textSubtle }]}>{slug}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {edition.glueSlugs.length > 0 ? (
        <>
          <Text style={[styles.h2, { color: colors.text }]}>Glue &amp; meta (commissioned)</Text>
          <Text style={[styles.note, { color: colors.textSubtle }]}>
            Cross-citing essays that mint new claims from multiple reports — ship as briefs, then
            live HTML.
          </Text>
          {edition.glueSlugs.map((slug) => (
            <Text key={slug} style={[styles.body, { color: colors.textMuted }]}>
              · {slug}
            </Text>
          ))}
        </>
      ) : null}

      {missing.length > 0 ? (
        <Text style={[styles.note, { color: colors.textSubtle }]}>
          Pending in corpus: {missing.join(", ")}
        </Text>
      ) : null}

      <Text style={[styles.note, { color: colors.textSubtle }]}>
        Pack: npm run cos:ebook -- --edition {edition.id}
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  back: { fontSize: 13, letterSpacing: 1, textTransform: "uppercase", fontWeight: "600" },
  status: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontSize: 36, fontWeight: "300", fontFamily: Fonts.serif },
  meta: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" },
  body: { fontSize: 16, lineHeight: 26 },
  h2: { fontSize: 20, marginTop: 16, fontFamily: Fonts.serif },
  links: { gap: 12 },
  row: { gap: 2 },
  rowTitle: { fontSize: 17, lineHeight: 24 },
  rowSlug: { fontSize: 12 },
  note: { fontSize: 13, lineHeight: 20, marginTop: 8 },
});
