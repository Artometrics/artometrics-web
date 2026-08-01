import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export function SiteFooter() {
  const mid = Math.ceil(SECTION_SLUGS.length / 2);
  const colA = SECTION_SLUGS.slice(0, mid);
  const colB = SECTION_SLUGS.slice(mid);

  return (
    <View className="mt-6">
      <Wrapper className="mb-0">
        <View className="flex-row flex-wrap items-center justify-between gap-5 border-y-2 border-border bg-accent px-3 py-8">
          <Text className="min-w-[220px] flex-1 font-display text-4xl font-medium leading-10 tracking-wide text-white">
            {"LET'S CREATE\nSOMETHING GREAT\nTOGETHER."}
          </Text>
          <Link href="/contact" asChild>
            <Pressable
              className="h-[72px] min-w-[72px] items-center justify-center border-2 border-white bg-white px-4"
              accessibilityLabel="Contact Artometrics"
            >
              <Text className="text-[28px] font-bold text-black">↗</Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
      <View className="bg-black py-9">
        <Wrapper>
          <View className="flex-row flex-wrap gap-7">
            <View className="min-w-[140px] flex-grow gap-2">
              <Text className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-accent">
                Sections
              </Text>
              {colA.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text className="py-0.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
                      {SECTION_META[s].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="min-w-[140px] flex-grow gap-2">
              <Text className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-accent">
                {" "}
              </Text>
              {colB.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text className="py-0.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
                      {SECTION_META[s].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="min-w-[140px] flex-grow gap-2">
              <Text className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-accent">
                More
              </Text>
              {[
                ["/blog", "Latest"],
                ["/editions", "Editions"],
                ["/podcast", "Podcasts"],
                ["/about", "About"],
                ["/authors", "Authors"],
                ["/library", "Library"],
                ["/resources", "Resources"],
                ["/datasets", "Datasets"],
                ["/downloads", "Downloads"],
                ["/press", "Press"],
                ["/get-app", "Get the App"],
                ["/legal/privacy", "Privacy"],
                ["/legal/terms", "Terms"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link key={href} href={href as `/blog`} asChild>
                  <Pressable>
                    <Text className="py-0.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
                      {label}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        </Wrapper>
      </View>
    </View>
  );
}
