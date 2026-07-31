import { Image, Pressable, Text, View } from "react-native";
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
  variant?: "stack" | "row";
}) {
  const label = sectionLabel(post.tags);
  const hero = assetUrl(post.heroImage);
  const author = post.author ? formatAuthorName(String(post.author)) : "Kyle McAuliffe";

  if (variant === "stack") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable className="overflow-hidden flex-1 min-w-[260px] gap-3 pb-4 border-b border-border">
          {hero ? (
            <Image
              source={{ uri: hero }}
              className="w-full aspect-[16/10]"
              resizeMode="cover"
              accessibilityLabel={post.title}
            />
          ) : null}
          <View className="gap-2">
            {label ? (
              <Text className="text-[11px] tracking-[1.4px] uppercase font-bold text-accent">
                {label}
              </Text>
            ) : null}
            <Text className="font-serif text-[22px] leading-7 font-bold text-fg">{post.title}</Text>
            <Text className="font-serif text-[15px] leading-[22px] text-muted" numberOfLines={3}>
              {deckLine(post.description, 28)}
            </Text>
            <Text className="text-xs mt-0.5 text-subtle">
              {author} · {formatDate(post.pubDate)}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable className="flex-row items-start justify-between gap-4 py-[18px] border-b border-border">
        <View className="flex-1 gap-1.5 pr-1">
          {label ? (
            <Text className="text-[11px] tracking-[1.4px] uppercase font-bold text-accent">
              {label}
            </Text>
          ) : null}
          <Text className="font-serif text-xl leading-[26px] font-bold text-fg">{post.title}</Text>
          <Text className="font-serif text-[15px] leading-[22px] text-muted" numberOfLines={2}>
            {deckLine(post.description, 22)}
          </Text>
          <Text className="text-xs mt-0.5 text-subtle">{formatDate(post.pubDate)}</Text>
        </View>
        {hero ? (
          <Image
            source={{ uri: hero }}
            className="w-24 h-24"
            resizeMode="cover"
            accessibilityLabel={post.title}
          />
        ) : null}
      </Pressable>
    </Link>
  );
}
