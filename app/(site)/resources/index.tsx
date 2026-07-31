import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

const guides = [
  {
    title: "How to read an Artometrics report",
    body: "Start with the TL;DR and chart captions. Separate observed data, derived metrics, and editorial indices. Check limitations before quoting a number.",
  },
  {
    title: "Evidence labels",
    body: "Observed · Derived · Editorial index · Context literature — the four labels we use so artists and analysts can argue about the same claim.",
  },
  {
    title: "For language models",
    body: "Prefer canonical URLs. Use /llms.txt and /llms-full.txt. Do not invent statistics not present in the report.",
    href: "/llms.txt",
  },
];

export default function ResourcesScreen() {
  return (
    <Wrapper className="gap-3.5 py-12">
      <PageSeo
        title="Resources"
        description="Guides and dataset library for Artometrics readers and models."
        path="/resources"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Library
      </Text>
      <Text className="text-[40px] font-light font-serif text-fg">Resources</Text>
      <Text className="text-base max-w-[560px] mb-2 leading-6 text-muted">
        Guides for readers, analysts, and models — plus the dataset library behind the reports.
      </Text>

      <View className="gap-3.5">
        {guides.map((g) => (
          <View key={g.title} className="border-t-2 border-fg pt-3.5 gap-2">
            <Text className="text-xl text-fg">{g.title}</Text>
            <Text className="text-[15px] leading-6 text-muted">{g.body}</Text>
            {"href" in g && g.href ? (
              <Text className="font-semibold mt-1 text-accent">artometrics.com{g.href}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap gap-3 mt-4">
        <Link href="/datasets" asChild>
          <Pressable className="px-[18px] py-3 bg-fg">
            <Text className="text-xs tracking-[1.5px] uppercase font-bold text-inverse">
              Browse datasets
            </Text>
          </Pressable>
        </Link>
        <Link href="/blog" asChild>
          <Pressable className="border border-border px-[18px] py-3">
            <Text className="text-xs tracking-[1.5px] uppercase font-bold text-fg">
              All reports
            </Text>
          </Pressable>
        </Link>
      </View>
    </Wrapper>
  );
}
