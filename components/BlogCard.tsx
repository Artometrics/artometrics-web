import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { SiteCoverImage } from "@/components/SiteCoverImage";
import { assetUrl } from "@/lib/assets";
import {
  cardDeckLine,
  formatAuthorName,
  formatDate,
  sectionLabel,
  type BlogPost,
} from "@/lib/content";

export function BlogCard({
  post,
  variant = "row",
  editorial = false,
}: {
  post: BlogPost;
  variant?: "stack" | "row" | "cover" | "pick";
  /** Normal-case serif-style headlines (homepage FT grid). */
  editorial?: boolean;
}) {
  const label = sectionLabel(post.tags, post.subject);
  const hero = assetUrl(post.heroImage);
  const author = post.author
    ? formatAuthorName(String(post.author))
    : "Kyle McAuliffe";

  const titleClass = editorial
    ? "font-serif text-[22px] font-semibold leading-[1.2] tracking-tight text-accent"
    : "font-display text-[22px] uppercase leading-6 tracking-[1px] text-accent";

  if (variant === "pick") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable className="flex-row gap-3 border-b border-border py-3">
          {hero ? (
            <SiteCoverImage
              source={{ uri: hero }}
              wrapperClassName="h-14 w-14 shrink-0 bg-border"
              transition={200}
              accessibilityLabel={post.title}
            />
          ) : (
            <View className="h-14 w-14 shrink-0 bg-border" />
          )}
          <View className="min-w-0 flex-1 gap-1">
            {label ? (
              <Text className="font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-accent">
                {label}
              </Text>
            ) : null}
            <Text className={titleClass} numberOfLines={3}>
              {post.title}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  if (variant === "cover") {
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable className="relative min-h-[420px] w-full overflow-hidden border-2 border-border bg-black">
          {hero ? (
            <SiteCoverImage
              source={{ uri: hero }}
              wrapperClassName="absolute inset-0"
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
    const borderClass = editorial ? "border border-accent" : "border-2 border-accent";
    const stackTitle = editorial
      ? "font-serif text-[18px] font-semibold leading-[1.25] tracking-tight text-accent"
      : "font-display text-[22px] uppercase leading-6 tracking-[1px] text-accent";
    return (
      <Link href={`/${post.slug}`} asChild>
        <Pressable className={`min-w-[140px] flex-1 gap-0 overflow-hidden ${borderClass}`}>
          {hero ? (
            <SiteCoverImage
              source={{ uri: hero }}
              wrapperClassName="w-full"
              wrapperStyle={{ aspectRatio: 1 }}
              transition={200}
              accessibilityLabel={post.title}
            />
          ) : (
            <View className="w-full overflow-hidden bg-border" style={{ aspectRatio: 1 }} />
          )}
          <View className="gap-2 p-3">
            {label ? (
              <Text className="font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-accent">
                {label}
              </Text>
            ) : null}
            <Text className={stackTitle} numberOfLines={4}>
              {post.title}
            </Text>
            {editorial ? (
              <Text
                className="font-sans text-[13px] leading-[18px] text-fg"
                numberOfLines={2}
              >
                {cardDeckLine(post.description)}
              </Text>
            ) : (
              <Text
                className="font-sans text-[14px] leading-[20px] text-fg"
                numberOfLines={3}
              >
                {cardDeckLine(post.description)}
              </Text>
            )}
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
          <Text className="font-display text-2xl uppercase leading-7 tracking-[1px] text-accent">
            {post.title}
          </Text>
          <Text
            className="font-sans text-[14px] leading-[20px] text-fg"
            numberOfLines={2}
          >
            {cardDeckLine(post.description)}
          </Text>
          <Text className="mt-1 text-[11px] uppercase tracking-[1.2px] text-subtle">
            {formatDate(post.pubDate)}
          </Text>
        </View>
        {hero ? (
          <SiteCoverImage
            source={{ uri: hero }}
            wrapperClassName="h-[120px] w-[100px] shrink-0"
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
