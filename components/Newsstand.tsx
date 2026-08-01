import { Platform, Pressable, Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { assetUrl } from "@/lib/assets";
import { sectionLabel, type BlogPost } from "@/lib/content";

const COVER_COUNT = 12;

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
}: {
  post: BlogPost;
  coverW: number;
}) {
  const hero = assetUrl(post.heroImage);
  const label = sectionLabel(post.tags);
  const coverH = Math.round(coverW * 1.32);

  return (
    <Link href={`/${post.slug}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={post.title}
        style={{
          width: coverW,
          height: coverH,
          ...(Platform.OS === "web"
            ? ({
                boxShadow: "0 10px 18px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2)",
                transition: "transform 160ms ease, box-shadow 160ms ease",
              } as object)
            : {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.28,
                shadowRadius: 12,
                elevation: 8,
              }),
        }}
        className="overflow-hidden bg-base-900"
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
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: "transparent",
            ...(Platform.OS === "web"
              ? ({
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 28%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.82) 100%)",
                } as object)
              : undefined),
          }}
        />
        {Platform.OS !== "web" ? (
          <>
            <View className="absolute left-0 right-0 top-0 h-16 bg-black/50" />
            <View className="absolute bottom-0 left-0 right-0 h-28 bg-black/75" />
          </>
        ) : null}
        <View className="absolute inset-0 justify-between px-2.5 py-2.5">
          <View className="gap-1">
            <Text className="font-sans text-[9px] font-extrabold uppercase tracking-[1.6px] text-white">
              Artometrics
            </Text>
            {label ? (
              <Text className="font-mono text-[9px] font-medium uppercase tracking-[1px] text-accent">
                {label}
              </Text>
            ) : null}
          </View>
          <Text
            className="font-display text-[15px] font-medium uppercase leading-[18px] tracking-wide text-white"
            numberOfLines={4}
          >
            {post.title}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

function ShelfRail() {
  return (
    <View className="mt-1 w-full">
      <View
        className="h-[14px] w-full"
        style={{
          backgroundColor: "#8B5A2B",
          ...(Platform.OS === "web"
            ? ({
                backgroundImage:
                  "linear-gradient(180deg, #C49A6C 0%, #8B5A2B 38%, #6B3F1A 72%, #4A2A10 100%)",
                boxShadow: "0 6px 10px rgba(0,0,0,0.35)",
              } as object)
            : {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 4,
              }),
        }}
      />
      <View
        className="h-2.5 w-full"
        style={{
          backgroundColor: "#5C3317",
          ...(Platform.OS === "web"
            ? ({
                backgroundImage:
                  "linear-gradient(180deg, #6B3F1A 0%, #3D220E 100%)",
              } as object)
            : undefined),
        }}
      />
    </View>
  );
}

export function Newsstand({ posts }: { posts: BlogPost[] }) {
  const { width } = useWindowDimensions();
  const cols = colsForWidth(width);
  const covers = posts.slice(0, COVER_COUNT);
  const rows = chunk(covers, cols);
  const gutter = width >= 720 ? 22 : 14;
  const sidePad = width >= 720 ? 28 : 16;
  const usable = Math.max(280, width - sidePad * 2);
  const coverW = Math.floor((usable - gutter * (cols - 1)) / cols);

  if (!covers.length) return null;

  return (
    <View
      className="w-full"
      style={{
        backgroundColor: "#2A1A0E",
        ...(Platform.OS === "web"
          ? ({
              backgroundImage:
                "radial-gradient(ellipse at 50% 0%, #4A2F1A 0%, #2A1A0E 55%, #1A1008 100%)",
            } as object)
          : undefined),
      }}
    >
      <Wrapper variant="bleed" className="px-4 pt-6 pb-10">
        <View className="mb-5 flex-row items-end justify-between gap-3 px-1">
          <View className="gap-1">
            <Text className="font-display text-[28px] font-medium uppercase tracking-[2px] text-[#F3E6D4]">
              Newsstand
            </Text>
            <Text className="font-sans text-[13px] leading-5 text-[#D9C4A8]">
              Pick a cover. Reports on culture, power, and the creative economy.
            </Text>
          </View>
          <Link href="/blog" asChild>
            <Pressable className="border border-[#D9C4A8]/60 px-3 py-2" accessibilityLabel="Browse all reports">
              <Text className="font-sans text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#F3E6D4]">
                All reports →
              </Text>
            </Pressable>
          </Link>
        </View>

        <View className="gap-7">
          {rows.map((row, rowIndex) => (
            <View key={`shelf-${rowIndex}`} className="items-center">
              <View
                className="flex-row justify-center"
                style={{ gap: gutter, marginBottom: -2 }}
              >
                {row.map((post) => (
                  <MagazineCover key={post.slug} post={post} coverW={coverW} />
                ))}
              </View>
              <ShelfRail />
            </View>
          ))}
        </View>
      </Wrapper>
    </View>
  );
}
