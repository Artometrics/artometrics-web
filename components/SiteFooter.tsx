import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { AtmMark } from "@/components/AtmMark";
import { Wrapper } from "@/components/Wrapper";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export function SiteFooter() {
  const mid = Math.ceil(SECTION_SLUGS.length / 2);
  const colA = SECTION_SLUGS.slice(0, mid);
  const colB = SECTION_SLUGS.slice(mid);

  return (
    <View className="mt-0 bg-black">
      <Wrapper className="mb-0">
        <View className="flex-row flex-wrap items-end justify-between gap-5 border-y-2 border-[#333] px-1 py-10">
          <View className="min-w-[220px] flex-1 gap-2.5">
            <Text
              className="text-[28px] text-white"
              style={{ fontFamily: "Chomsky" }}
            >
              Artometrics
            </Text>
            <Text className="font-mono text-[28px] font-medium uppercase leading-8 tracking-wide text-white md:text-4xl">
              {"Let's create\nsomething that performs."}
            </Text>
          </View>
          <Link href="/contact" asChild>
            <Pressable
              className="self-start bg-accent px-6 py-3.5"
              accessibilityLabel="Contact Artometrics"
            >
              <Text className="font-mono text-[13px] font-medium text-white">
                Get in touch →
              </Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>

      <View className="border-t border-[#333] py-12">
        <Wrapper>
          <View className="flex-row flex-wrap gap-10">
            <AtmMark />
            <View className="min-w-[120px] flex-grow gap-2">
              <Text className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
                Sections
              </Text>
              {colA.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text className="py-0.5 font-sans text-[13px] text-[#a3a3a3]">
                      {SECTION_META[s].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
              {colB.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text className="py-0.5 font-sans text-[13px] text-[#a3a3a3]">
                      {SECTION_META[s].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="min-w-[120px] flex-grow gap-2">
              <Text className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
                More
              </Text>
              {[
                ["/blog", "Reports"],
                ["/editions", "Editions"],
                ["/datasets", "Data"],
                ["/podcast", "Podcasts"],
                ["/library", "Library"],
                ["/about", "About"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link key={href} href={href as `/blog`} asChild>
                  <Pressable>
                    <Text className="py-0.5 font-sans text-[13px] text-[#a3a3a3]">
                      {label}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="min-w-[120px] flex-grow gap-2">
              <Text className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
                Social
              </Text>
              <Text className="py-0.5 font-sans text-[13px] text-[#a3a3a3]">
                Instagram
              </Text>
              <Text className="py-0.5 font-sans text-[13px] text-[#a3a3a3]">X</Text>
              <Text className="mt-4 mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#525252]">
                Contact
              </Text>
              <Text className="font-sans text-[13px] text-[#a3a3a3]">
                hello@artometrics.com
              </Text>
            </View>
          </View>
          <Text className="mt-10 font-mono text-[11px] text-[#525252]">
            © {new Date().getFullYear()} Artometrics
          </Text>
        </Wrapper>
      </View>
    </View>
  );
}
