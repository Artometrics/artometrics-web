import { Image, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { assetUrl } from "@/lib/assets";
import { getAuthor, getAuthors } from "@/lib/content";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return getAuthors().map((author) => ({ slug: author.id }));
}

export default function AuthorScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const author = getAuthor(slug);

  if (!author) {
    return (
      <Wrapper className="gap-3 py-12">
        <Text className="text-[36px] font-light text-fg">Author not found</Text>
        <Link href="/authors">
          <Text className="text-accent">Back to authors</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="narrow" className="gap-3 py-12">
      {assetUrl(author.image?.url) ? (
        <Image
          source={{ uri: assetUrl(author.image?.url)! }}
          className="w-24 h-24 rounded-full mb-2 bg-bg-elevated"
          resizeMode="cover"
          accessibilityLabel={author.image?.alt || author.name}
        />
      ) : null}
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        {author.role ?? "Author"}
      </Text>
      <Text className="text-[36px] font-light text-fg">{author.name}</Text>
      {author.bio ? (
        <Text className="text-base leading-7 text-muted">{author.bio}</Text>
      ) : null}
    </Wrapper>
  );
}
