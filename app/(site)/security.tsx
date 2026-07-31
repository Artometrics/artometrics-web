import { Text } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

export default function SecurityScreen() {
  return (
    <Wrapper variant="narrow" className="gap-3 py-12">
      <PageSeo
        title="Security"
        description="Artometrics security practices and vulnerability disclosure."
        path="/security"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Trust</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">Security</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        We treat membership data, billing webhooks, and editorial assets as [REDACTED] systems.
        Secrets stay in Netlify environment variables; the client only receives public keys.
      </Text>
      <Text className="font-serif text-[22px] font-bold mt-3 text-fg">Practices</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        • TLS everywhere via Netlify{"\n"}
        • Supabase Auth JWTs for saved reports and member audio{"\n"}
        • Stripe webhook signature verification{"\n"}
        • RLS on `saved_articles`{"\n"}
        • No service-role keys in the browser bundle
      </Text>
      <Text className="font-serif text-[22px] font-bold mt-3 text-fg">Disclosure</Text>
      <Text className="font-serif text-base leading-[26px] text-muted">
        Report vulnerabilities to security@artometrics.com (mailbox TBD). See also{" "}
        <Link href="/legal/privacy">
          <Text className="text-accent">Privacy</Text>
        </Link>{" "}
        and{" "}
        <Link href="/legal/dpa">
          <Text className="text-accent">DPA</Text>
        </Link>
        .
      </Text>
    </Wrapper>
  );
}
