import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Newsstand } from "@/components/Newsstand";
import { HomeEditorial } from "@/components/HomeEditorial";
import { PageSeo } from "@/components/PageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { getBlogPosts } from "@/lib/content";
import { useAuth } from "@/lib/auth";

export default function HomeScreen() {
  const { user } = useAuth();
  const posts = getBlogPosts();

  return (
    <>
      <PageSeo
        title="Artometrics"
        description="Data reporting on culture, sports, film, music, and cities — clear, citable, easy to read."
        path="/"
      />
      <SeoJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Artometrics",
            url: "https://artometrics.com",
            logo: "https://artometrics.com/images/brand/chomsky-a.png",
            sameAs: ["https://github.com/Artometrics"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Artometrics",
            url: "https://artometrics.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://artometrics.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />

      <Newsstand posts={posts} />
      <HomeEditorial posts={posts} />

      {user ? (
        <View className="bg-black">
          <Wrapper variant="magazine" className="gap-2 border-t border-[#333] py-8">
            <Text className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-accent">
              Studio
            </Text>
            <Text className="max-w-[520px] font-sans text-[15px] leading-[22px] text-[#a3a3a3]">
              Continue writing, check in, or publish — without leaving Artometrics.
            </Text>
            <Link href="/studio" asChild>
              <Pressable className="self-start bg-accent px-6 py-3.5">
                <Text className="font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-white">
                  Open Studio →
                </Text>
              </Pressable>
            </Link>
          </Wrapper>
        </View>
      ) : (
        <View className="bg-black">
          <Wrapper variant="magazine" className="border-t border-[#333] py-10">
            <View className="flex-row flex-wrap items-end justify-between gap-6 bg-black py-2">
              <View className="min-w-[220px] flex-1 gap-2.5">
                <Text
                  className="text-[28px] text-white"
                  style={{ fontFamily: "Chomsky" }}
                >
                  Artometrics
                </Text>
                <Text className="font-mono text-[28px] font-medium uppercase leading-8 tracking-wide text-white md:text-[36px]">
                  Every model lies. Some are useful.
                </Text>
              </View>
              <Link href="/blog" asChild>
                <Pressable
                  className="self-start bg-accent px-6 py-3.5"
                  accessibilityLabel="Browse reports"
                >
                  <Text className="font-mono text-[13px] font-medium text-white">
                    Read the report →
                  </Text>
                </Pressable>
              </Link>
            </View>
          </Wrapper>
        </View>
      )}
    </>
  );
}
