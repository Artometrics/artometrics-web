import { Text } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageSeo } from "@/components/PageSeo";
import { openExternalUrl } from "@/lib/openExternal";

export default function ContactScreen() {
  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo
        title="Contact"
        description="Editorial tips, dataset corrections, and partnership notes for Artometrics."
        path="/contact"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Contact
      </Text>
      <Text className="text-[36px] font-light font-serif text-fg">Get in touch</Text>
      <Text className="text-base leading-7 mb-2 text-muted">
        Editorial tips, dataset corrections, and partnership notes go to the Artometrics team.
      </Text>
      <PrimaryButton
        label="Email Artometrics"
        onPress={() => void openExternalUrl("mailto:hello@artometrics.com")}
      />
    </Wrapper>
  );
}
