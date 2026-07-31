import { Text } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

export default function PressScreen() {
  return (
    <Wrapper variant="narrow" className="gap-3 py-12">
      <PageSeo
        title="Press"
        description="Artometrics boilerplate, brand assets, and press contact."
        path="/press"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Press</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">Brand & press</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        Artometrics is an independent data-science magazine for the creative industries and culture
        — art for data scientists and data science for artists.
      </Text>
      <Text className="font-serif text-[22px] font-bold mt-3 text-fg">Boilerplate</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        We publish editorial data reports with reproducible charts and public datasets, a podcast,
        and membership tools for readers who want evidence without hype.
      </Text>
      <Text className="font-serif text-[22px] font-bold mt-3 text-fg">Assets</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        Chomsky A mark (black / white / red): see{" "}
        <Link href="/library">
          <Text className="text-accent">/library</Text>
        </Link>{" "}
        and the brand kit checklist in the owner playbook.
      </Text>
      <Text className="font-serif text-[22px] font-bold mt-3 text-fg">Contact</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        Press inquiries via{" "}
        <Link href="/contact">
          <Text className="text-accent">Contact</Text>
        </Link>
        .
      </Text>
    </Wrapper>
  );
}
