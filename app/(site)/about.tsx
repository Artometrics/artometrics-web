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
        description="Artometrics — data-science magazine for culture. Masthead, method, and desks."
        path="/about"
      />
      <Text className="text-xs font-bold uppercase tracking-[1.8px] text-accent">Masthead</Text>
      <Text role="heading" aria-level={1} className="font-display text-[34px] leading-10 text-fg">
        Art for data scientists. Data science for artists.
      </Text>
      <View className="mt-2 gap-3.5">
        <Text className="font-serif text-base leading-7 text-muted">
          Artometrics is an independent magazine that treats culture like data — anime catalogs,
          franchise economics, civilizational cycles, and the institutions that shape creative
          markets. Every report pairs editorial judgment with reproducible charts and public
          datasets.
        </Text>
        <Text className="mt-2 font-serif text-[22px] font-bold text-fg">Bio</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Founded and edited by Kyle McAuliffe. Desk reports are written under human editorial
          control with named sources, dated facts, and open method notes. Studio tools (Twilda,
          Aftercare, and related makers) hang off one shared member profile — not separate account
          silos.
        </Text>
        <Text className="mt-2 font-serif text-[22px] font-bold text-fg">Method</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Prefer public datasets and the reader&apos;s own inputs. Separate observed data, derived
          metrics, editorial indices, and context literature. Publish exports (HTML, PDF, EPUB, CSV)
          on artometrics.com. Do not invent statistics.
        </Text>
        <Text className="mt-2 font-serif text-[22px] font-bold text-fg">Desks</Text>
        {SECTION_SLUGS.map((s) => (
          <Text key={s} className="font-serif text-base leading-7 text-muted">
            <Link href={`/topics/${s}` as `/topics/${string}`}>
              <Text className="font-bold text-accent">{SECTION_META[s].title}</Text>
            </Link>
            {" — "}
            {SECTION_META[s].description}
          </Text>
        ))}
        <Text className="mt-2 font-serif text-[22px] font-bold text-fg">How we work with AI</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Reports may be produced in directed collaboration with AI tools under human editorial
          judgment. Process notes live in editor&apos;s notes. Brand and ethics pages document the
          rules.
        </Text>
      </View>
      <View className="mt-5 flex-row flex-wrap gap-3">
        <Link href="/blog" asChild>
          <PrimaryButton label="Browse reports" />
        </Link>
        <Link href="/contact" asChild>
          <PrimaryButton label="Contact" className="bg-muted" />
        </Link>
        <Link href="/legal/ethics-statement" asChild>
          <PrimaryButton label="Ethics" className="bg-muted" />
        </Link>
      </View>
    </Wrapper>
  );
}
