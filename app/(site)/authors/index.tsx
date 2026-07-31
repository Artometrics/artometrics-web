import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { assetUrl } from "@/lib/assets";
import { getAuthors } from "@/lib/content";

export default function AuthorsIndex() {
  const authors = getAuthors();

  return (
    <Wrapper className="gap-3 py-12">
      <PageSeo title="Authors" description="Artometrics masthead." path="/authors" />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Masthead
      </Text>
      <Text className="text-[40px] font-light font-serif mb-3 text-fg">Authors</Text>
      <View className="gap-5 flex-row flex-wrap">
        {authors.map((author) => {
          const avatar = assetUrl(author.image?.url);
          return (
            <Link key={author.id} href={`/authors/${author.id}`} asChild>
              <Pressable
                className="flex-basis-[200px] flex-grow border border-border p-4 gap-2 items-start bg-bg-elevated"
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    className="w-[72px] h-[72px] rounded-full"
                    resizeMode="cover"
                    accessibilityLabel={author.image?.alt || author.name}
                  />
                ) : null}
                <Text className="text-lg font-bold text-fg">{author.name}</Text>
                {author.role ? (
                  <Text className="text-[13px] text-muted">{author.role}</Text>
                ) : null}
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Wrapper>
  );
}
