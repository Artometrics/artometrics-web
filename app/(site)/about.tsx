import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export default function AboutScreen() {
  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo
        title="About"
        description="Artometrics — art for data scientists and data science for artists."
        path="/about"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Masthead</Text>
      <Text className="font-serif text-[34px] font-bold leading-10 text-fg">
        Art for data scientists. Data science for artists.
      </Text>
      <View className="gap-3.5 mt-2">
        <Text className="font-serif text-base leading-7 text-muted">
          Artometrics is an independent magazine that treats culture like data — anime catalogs,
          franchise economics, civilizational cycles, and the institutions that shape creative
          markets. Every report pairs editorial judgment with reproducible charts and public
          datasets.
        </Text>
        <Text className="font-serif text-[22px] font-bold mt-2 text-fg">About Artometrics</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          We are building a media company in public: long-form investigations, a podcast, a dataset
          library, and membership tools. The brief is simple — ship evidence with taste. Contact us
          for tips, corrections, or partnerships.
        </Text>
        <Text className="font-serif text-[22px] font-bold mt-2 text-fg">Sections</Text>
        {SECTION_SLUGS.map((s) => (
          <Text key={s} className="font-serif text-base leading-7 text-muted">
            <Link href={`/topics/${s}` as `/topics/${string}`}>
              <Text className="font-bold text-accent">{SECTION_META[s].title}</Text>
            </Link>
            {" — "}
            {SECTION_META[s].description}
          </Text>
        ))}
        <Text className="font-serif text-[22px] font-bold mt-2 text-fg">How we work with AI</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Reports may be produced in directed collaboration with AI tools under human editorial
          judgment. We document process in editor's notes. We do not invent statistics.
        </Text>
      </View>
      <View className="flex-row flex-wrap gap-3 mt-5">
        <Link href="/blog" asChild>
          <PrimaryButton label="Browse reports" />
        </Link>
        <Link href="/contact" asChild>
          <PrimaryButton label="Contact" className="bg-muted" />
        </Link>
      </View>
    </Wrapper>
  );
}
