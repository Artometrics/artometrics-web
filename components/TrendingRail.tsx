import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { sectionLabel, type BlogPost } from "@/lib/content";

export function TrendingRail({ posts }: { posts: BlogPost[] }) {
  return (
    <View className="border border-border px-4 pt-4 pb-1 flex-1 min-w-[260px]">
      <Text className="font-sans text-[28px] font-extrabold tracking-[-0.5px] mb-2 text-fg">
        Trending
      </Text>
      {posts.map((post, i) => {
        const label = sectionLabel(post.tags);
        const n = String(i + 1).padStart(2, "0");
        return (
          <Link key={post.slug} href={`/${post.slug}`} asChild>
            <Pressable
              className={[
                "flex-row gap-3 py-3.5 border-b border-border",
                i === posts.length - 1 ? "border-b-0" : "",
              ].join(" ")}
            >
              <Text className="font-sans text-lg font-semibold w-7 text-subtle">{n}</Text>
              <View className="flex-1 gap-1">
                {label ? (
                  <Text className="text-[10px] tracking-[1.2px] uppercase font-bold text-subtle">
                    {label}
                  </Text>
                ) : null}
                <Text className="font-sans text-[15px] leading-5 font-bold text-fg" numberOfLines={3}>
                  {post.title}
                </Text>
              </View>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
