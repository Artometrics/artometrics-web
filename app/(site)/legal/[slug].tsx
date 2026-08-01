import { Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { PageSeo } from "@/components/PageSeo";
import { formatDate, getLegalPage, getLegalPages } from "@/lib/content";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return getLegalPages().map((page) => ({ slug: page.id }));
}

export default function LegalScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const page = getLegalPage(slug);

  if (!page) {
    return (
      <Wrapper className="gap-3 py-12">
        <Text className="text-[36px] font-light text-fg">Page not found</Text>
        <Link href="/">
          <Text className="text-accent">Home</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="prose" className="gap-3 py-12">
      <PageSeo
        title={page.page}
        description={`${page.page} — Artometrics legal.`}
        path={`/legal/${page.id}`}
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Legal
      </Text>
      <Text className="text-[36px] font-light text-fg">{page.page}</Text>
      <Text className="text-[13px] mb-2 text-subtle">{formatDate(page.pubDate)}</Text>
      <ArticleBody html={page.body} />
    </Wrapper>
  );
}
