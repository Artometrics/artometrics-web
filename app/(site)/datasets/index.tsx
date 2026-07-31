import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { DATASET_PACKS } from "@/data/datasets";
import { SECTION_META } from "@/data/sections";

export default function DatasetsIndex() {
  return (
    <Wrapper className="gap-3.5 py-12">
      <PageSeo
        title="Datasets"
        description="Dataset packs for Artometrics reports — schema, citations, and related stories."
        path="/datasets"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">Library</Text>
      <Text className="text-[40px] font-light font-serif text-fg">Datasets</Text>
      <Text className="text-base max-w-[640px] mb-2 leading-6 text-muted">
        Packs for Artometrics sections — one schema, citations, and links to the reports that use
        them. Packs start planned and graduate to downloadable CSVs.
      </Text>
      <View className="gap-4 flex-row flex-wrap">
        {DATASET_PACKS.map((pack) => (
          <Link key={pack.id} href={`/datasets/${pack.id}`} asChild>
            <Pressable className="flex-[1] min-w-[280px] border border-border bg-bg-elevated p-[18px] gap-2">
              <Text className="text-[10px] tracking-[1.5px] uppercase font-bold text-accent">
                {pack.status}
              </Text>
              <Text className="text-[22px] text-fg">{pack.title}</Text>
              <Text className="text-xs tracking-[1.5px] uppercase text-subtle">
                {SECTION_META[pack.section].title}
              </Text>
              <Text className="text-sm leading-[22px] text-muted" numberOfLines={4}>
                {pack.summary}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}
