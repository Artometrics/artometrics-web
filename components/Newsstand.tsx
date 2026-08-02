import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { assetUrl } from "@/lib/assets";
import { sectionLabel, type BlogPost } from "@/lib/content";

const COVER_COUNT = 8;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function colsForWidth(width: number): number {
  if (width >= 1100) return 4;
  if (width >= 720) return 3;
  return 2;
}

function MagazineCover({
  post,
  coverW,
  index,
}: {
  post: BlogPost;
  coverW: number;
  index: number;
}) {
  const hero = assetUrl(post.heroImage);
  const label = sectionLabel(post.tags);
  const coverH = Math.round(coverW * (4 / 3));
  const editionNo = String(index + 1).padStart(2, "0");

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={post.title}
        style={{ width: coverW, height: coverH }}
        className="relative overflow-hidden border border-[#222] bg-[#111]"
      >
        {hero ? (
          <Image
            source={{ uri: hero }}
            style={{ width: coverW, height: coverH, position: "absolute" }}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View className="absolute inset-0 bg-base-800" />
        )}
        <View className="absolute left-0 right-0 top-0 bg-black/75 px-2.5 py-2">
          <Text className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
            Edition {editionNo}
            {label ? ` · ${label}` : ""}
          </Text>
          <Text
            className="font-mono text-[13px] font-medium leading-4 text-white"
            numberOfLines={2}
          >
            {post.title}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

/**
 * Dark newsstand rack — Website Home design language.
 * Black field, hard borders, no wood/cream shelves.
 */
export function Newsstand({ posts }: { posts: BlogPost[] }) {
  const { width } = useWindowDimensions();
  const cols = colsForWidth(width);
  const covers = posts.slice(0, COVER_COUNT);
  const rows = chunk(covers, cols);
  const gutter = 2;
  const sidePad = width >= 720 ? 48 : 20;
  const usable = Math.max(280, Math.min(1200, width) - sidePad * 2 - 40);
  const coverW = Math.floor((usable - gutter * (cols - 1)) / cols);

  if (!covers.length) return null;

  return (
    <View className="w-full bg-black">
      <Wrapper variant="bleed" className="px-5 pt-10 pb-8 md:px-12">
        <View className="mb-8 items-center">
          <View className="border-[6px] border-[#1a1a1a] bg-[#0a0a0a] px-8 py-2 md:px-10">
            <Text className="font-mono text-[28px] font-medium uppercase tracking-[0.15em] text-white md:text-[44px]">
              Newsstand
            </Text>
          </View>
        </View>

        <View className="mx-auto w-full max-w-[1200px] border-[3px] border-[#2b2b2b] bg-[#080808] p-4 md:p-5">
          <View className="gap-0.5">
            {rows.map((row, rowIndex) => (
              <View
                key={`rack-${rowIndex}`}
                className="flex-row flex-wrap justify-center"
                style={{ gap: gutter }}
              >
                {row.map((post, i) => (
                  <MagazineCover
                    key={post.slug}
                    post={post}
                    coverW={coverW}
                    index={rowIndex * cols + i}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>

        <View className="mx-auto mt-5 w-full max-w-[1200px] flex-row items-center justify-between">
          <Text className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
            Pick a cover · live reports
          </Text>
          <Link href="/blog" asChild>
            <Pressable accessibilityLabel="Browse all reports">
              <Text className="font-mono text-[12px] uppercase tracking-[0.06em] text-accent">
                All reports →
              </Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
    </View>
  );
}
