import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { openExternalUrl } from "@/lib/openExternal";

export default function ContactScreen() {
  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo
        title="Contact"
        description="Editorial tips, press, corrections, and partnerships for Artometrics."
        path="/contact"
      />
      <Text className="text-[11px] font-semibold uppercase tracking-[2.5px] text-accent">
        Contact
      </Text>
      <Text role="heading" aria-level={1} className="font-display text-[36px] text-fg">Get in touch</Text>
      <Text className="mb-2 font-serif text-base leading-7 text-muted">
        Editorial tips, dataset corrections, press, and partnership notes go to the Artometrics
        desk.
      </Text>

      <View className="gap-3 border-t-2 border-fg pt-4">
        <Text className="font-serif text-[22px] font-bold text-fg">Editorial & tips</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Story ideas, corrections, and data leads: hello@artometrics.com
        </Text>
        <PrimaryButton
          label="Email editorial"
          onPress={() => void openExternalUrl("mailto:hello@artometrics.com")}
        />
      </View>

      <View className="gap-3 border-t border-border pt-4">
        <Text className="font-serif text-[22px] font-bold text-fg">Press</Text>
        <Text className="font-serif text-base leading-7 text-muted">
          Boilerplate, brand assets, and interview requests live on the press page.
        </Text>
        <Link href="/press" asChild>
          <PrimaryButton label="Press kit" className="bg-muted" />
        </Link>
      </View>

      <View className="gap-3 border-t border-border pt-4">
        <Text className="font-serif text-[22px] font-bold text-fg">Ethics</Text>
        <Link href="/legal/ethics-statement" asChild>
          <PrimaryButton label="Ethics statement" className="bg-muted" />
        </Link>
      </View>
    </Wrapper>
  );
}
