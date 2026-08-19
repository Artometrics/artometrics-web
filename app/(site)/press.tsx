import { Linking, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

const assets = [
  { href: "/images/brand/og-default.png", label: "OG banner (1200×630)" },
  { href: "/images/brand/chomsky-a.png", label: "Chomsky A monogram" },
  { href: "/images/brand/svg/monogram.svg", label: "Monogram SVG" },
  { href: "/images/brand/svg/wordmark.svg", label: "Wordmark SVG" },
  { href: "/favicon.svg", label: "Favicon SVG" },
  { href: "/apple-touch-icon.png", label: "Apple touch icon" },
];

export default function PressScreen() {
  return (
    <Wrapper variant="narrow" className="gap-3 py-12">
      <PageSeo
        title="Press"
        description="Artometrics boilerplate, Kruger/Chomsky brand assets, and press contact."
        path="/press"
      />
      <Text className="text-xs font-bold uppercase tracking-[1.8px] text-accent">Press</Text>
      <Text role="heading" aria-level={1} className="font-display text-[36px] text-fg">Brand & press</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        Artometrics is an independent data-science magazine for the creative industries and culture
        — art for data scientists and data science for artists. Visual system: black, white, and
        Artometrics red with a Chomsky wordmark (Barbara Kruger–adjacent newspaper hierarchy).
      </Text>
      <Text className="mt-3 font-serif text-[22px] font-bold text-fg">Boilerplate</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        We publish editorial data reports with reproducible charts and public datasets, a podcast,
        Studio creative tools on one member profile, and site-hosted downloads — evidence without
        hype.
      </Text>
      <Text className="mt-3 font-serif text-[22px] font-bold text-fg">Assets</Text>
      <View className="gap-2">
        {assets.map((a) => (
          <Pressable key={a.href} onPress={() => Linking.openURL(a.href)}>
            <Text className="font-serif text-base text-accent">{a.label}</Text>
          </Pressable>
        ))}
      </View>
      <Text className="mt-3 font-serif text-[22px] font-bold text-fg">Contact</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        Press inquiries via{" "}
        <Link href="/contact">
          <Text className="text-accent">Contact</Text>
        </Link>{" "}
        or hello@artometrics.com.
      </Text>
    </Wrapper>
  );
}
