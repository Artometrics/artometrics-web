import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Newsstand } from "@/components/Newsstand";
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

      {user ? (
        <Wrapper variant="magazine" className="gap-2 py-6">
          <Text className="text-[11px] font-bold uppercase tracking-[1.6px] text-accent">
            Studio
          </Text>
          <Text className="max-w-[520px] font-sans text-[15px] leading-[22px] text-muted">
            Continue writing, check in, or publish — without leaving Artometrics.
          </Text>
          <Link href="/studio" asChild>
            <Pressable className="self-start bg-accent px-4 py-3">
              <Text className="text-xs font-extrabold uppercase tracking-[1.2px] text-white">
                Open Studio →
              </Text>
            </Pressable>
          </Link>
        </Wrapper>
      ) : (
        <Wrapper variant="magazine" className="py-8">
          <View className="flex-row flex-wrap items-center justify-between gap-4 bg-accent p-7">
            <Text className="min-w-[220px] flex-1 font-display text-[28px] font-medium uppercase leading-8 tracking-wide text-white">
              {"Let's read something\nthat performs."}
            </Text>
            <Link href="/blog" asChild>
              <Pressable
                className="h-14 w-14 items-center justify-center rounded-full bg-inverse"
                accessibilityLabel="Browse reports"
              >
                <Text className="text-[24px] font-bold text-fg">↗</Text>
              </Pressable>
            </Link>
          </View>
        </Wrapper>
      )}
    </>
  );
}
