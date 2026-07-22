import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export default function SecurityScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Security"
        description="Artometrics security practices and vulnerability disclosure."
        path="/security"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Trust</Text>
      <Text style={[styles.title, { color: colors.text }]}>Security</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        We treat membership data, billing webhooks, and editorial assets as production systems.
        Secrets stay in Netlify environment variables; the client only receives public keys.
      </Text>
      <Text style={[styles.h, { color: colors.text }]}>Practices</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        • TLS everywhere via Netlify{"\n"}
        • Supabase Auth JWTs for saved reports and member audio{"\n"}
        • Stripe webhook signature verification{"\n"}
        • RLS on `saved_articles`{"\n"}
        • No service-role keys in the browser bundle
      </Text>
      <Text style={[styles.h, { color: colors.text }]}>Disclosure</Text>
      <Text style={[styles.p, { color: colors.textMuted }]}>
        Report vulnerabilities to security@artometrics.com (mailbox TBD). See also{" "}
        <Link href="/legal/privacy">
          <Text style={{ color: colors.accent }}>Privacy</Text>
        </Link>{" "}
        and{" "}
        <Link href="/legal/dpa">
          <Text style={{ color: colors.accent }}>DPA</Text>
        </Link>
        .
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  h: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", marginTop: 12 },
  p: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
});
