import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  sectionLabel,
  type BlogPost,
} from "@/lib/content";

export function BlogCard({
  post,
  variant = "row",
}: {
  post: BlogPost;
  variant?: "stack" | "row" | "cover";
}) {
  const label = sectionLabel(post.tags);
  const hero = assetUrl(post.heroImage);
  const author = post.author
    ? formatAuthorName(String(post.author))
    : "Kyle McAuliffe";

  if (variant === "cover") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable className="relative min-h-[420px] w-full overflow-hidden border-2 border-border bg-black">
          {hero ? (
            <Image
              source={{ uri: hero }}
              className="absolute inset-0 h-full w-full"
              contentFit="cover"
              transition={200}
            />
          ) : null}
          <View className="absolute inset-0 bg-black/40" />
          <View className="absolute inset-0 justify-end gap-2 p-5">
            {label ? (
              <Text className="font-display text-[12px] uppercase tracking-[2px] text-accent">
                {label}
              </Text>
            ) : null}
            <Text className="font-display text-4xl uppercase leading-[0.95] tracking-[1px] text-white">
              {post.title}
            </Text>
            <Text className="text-[11px] uppercase tracking-[1.4px] text-white/70">
              {author} · {formatDate(post.pubDate)}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  if (variant === "stack") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable className="min-w-[260px] flex-1 gap-0 overflow-hidden border-2 border-border">
          {hero ? (
            <Image
              source={{ uri: hero }}
              className="aspect-[4/5] w-full"
              contentFit="cover"
              transition={200}
              accessibilityLabel={post.title}
            />
          ) : (
            <View className="aspect-[4/5] w-full bg-accent" />
          )}
          <View className="gap-2 p-3">
            {label ? (
              <Text className="font-display text-[11px] uppercase tracking-[2px] text-accent">
                {label}
              </Text>
            ) : null}
            <Text className="font-display text-[22px] uppercase leading-6 tracking-[1px] text-fg">
              {post.title}
            </Text>
            <Text
              className="font-sans text-[14px] leading-[20px] text-muted"
              numberOfLines={3}
            >
              {deckLine(post.description, 28)}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable className="flex-row items-stretch gap-0 border-b-2 border-border">
        <View className="flex-1 justify-center gap-1.5 py-5 pr-4">
          {label ? (
            <Text className="font-display text-[11px] uppercase tracking-[2px] text-accent">
              {label}
            </Text>
          ) : null}
          <Text className="font-display text-2xl uppercase leading-7 tracking-[1px] text-fg">
            {post.title}
          </Text>
          <Text
            className="font-sans text-[14px] leading-[20px] text-muted"
            numberOfLines={2}
          >
            {deckLine(post.description, 22)}
          </Text>
          <Text className="mt-1 text-[11px] uppercase tracking-[1.2px] text-subtle">
            {formatDate(post.pubDate)}
          </Text>
        </View>
        {hero ? (
          <Image
            source={{ uri: hero }}
            className="h-[120px] w-[100px]"
            contentFit="cover"
            transition={200}
            accessibilityLabel={post.title}
          />
        ) : (
          <View className="h-[120px] w-[100px] bg-accent" />
        )}
      </Pressable>
    </Link>
  );
}
