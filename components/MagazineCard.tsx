import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  sectionLabel,
  type BlogPost,
} from "@/lib/content";

type Variant = "tile" | "portrait" | "compact";

export function MagazineCard({
  post,
  variant = "tile",
  width,
}: {
  post: BlogPost;
  variant?: Variant;
  width?: number;
}) {
  const { mode } = useTheme();
  const label = sectionLabel(post.tags);
  const hero = assetUrl(post.heroImage);
  const author = post.author ? formatAuthorName(String(post.author)) : "Kyle McAuliffe";
  const aspect = variant === "portrait" ? 4 / 5 : 16 / 10;
  const fallbackMark = assetUrl(
    mode === "dark" ? "/images/brand/chomsky-a-white.png" : "/images/brand/chomsky-a-black.png"
  );

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable
        className={[
          "gap-2.5",
          width ? "" : "flex-1 min-w-[200px]",
          variant === "compact" ? "min-w-[160px]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={width ? { width } : undefined}
      >
        {hero ? (
          <Image
            source={{ uri: hero }}
            className="w-full bg-base-200"
            style={{ aspectRatio: aspect }}
            contentFit="cover"
            transition={200}
            accessibilityLabel={post.title}
          />
        ) : (
          <View
            className="w-full bg-bg-elevated items-center justify-center"
            style={{ aspectRatio: aspect }}
          >
            <Image
              source={{ uri: fallbackMark }}
              className="w-14 h-14 opacity-35"
              contentFit="contain"
              accessibilityLabel="Artometrics"
            />
          </View>
        )}
        <View className="gap-1.5">
          {label ? (
            <Text className="text-[10px] tracking-[1.4px] uppercase font-bold text-accent">
              {label}
            </Text>
          ) : null}
          <Text
            className={[
              "font-display uppercase text-fg",
              variant === "compact"
                ? "text-[15px] leading-[18px]"
                : "text-xl leading-6 tracking-[0.4px]",
            ].join(" ")}
            numberOfLines={variant === "compact" ? 3 : 4}
          >
            {post.title}
          </Text>
          {variant !== "compact" ? (
            <Text className="font-sans text-[13px] leading-[18px] text-muted" numberOfLines={2}>
              {deckLine(post.description, 18)}
            </Text>
          ) : null}
          <Text className="text-[10px] mt-0.5 tracking-[0.6px] uppercase font-semibold text-subtle">
            {author} · {formatDate(post.pubDate)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
