import { Text, View, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { DATASET_PACKS, getDatasetPack } from "@/data/datasets";
import { SECTION_META } from "@/data/sections";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return DATASET_PACKS.map((p) => ({ slug: p.id }));
}

export default function DatasetPackScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const pack = getDatasetPack(slug);

  if (!pack) {
    return (
      <Wrapper className="gap-3 py-12">
        <Text className="text-[34px] font-light font-serif leading-10 text-fg">Pack not found</Text>
        <Link href="/datasets">
          <Text className="text-accent">Back to datasets</Text>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant="narrow" className="gap-3 py-12">
      <PageSeo
        title={pack.title}
        description={pack.summary}
        path={`/datasets/${pack.id}`}
      />
      <Text className="text-[10px] tracking-[1.5px] uppercase font-bold text-accent">
        {pack.status}
      </Text>
      <Text className="text-[34px] font-light font-serif leading-10 text-fg">{pack.title}</Text>
      <Text className="text-[13px] tracking-wide text-subtle">
        {SECTION_META[pack.section].title} · {pack.primaryKeyword}
      </Text>
      <Text className="text-base leading-[26px] text-muted">{pack.summary}</Text>

      <Text className="mt-4 text-sm tracking-[2px] uppercase text-fg">Sources</Text>
      {pack.sources.map((s) => (
        <Text key={s.url} className="text-base leading-[26px] text-muted">
          · {s.name}
        </Text>
      ))}

      <Text className="mt-4 text-sm tracking-[2px] uppercase text-fg">Related reports</Text>
      <View className="gap-2">
        {pack.relatedReports.map((id) => (
          <Link key={id} href={`/${id}`} asChild>
            <Pressable>
              <Text className="text-accent text-[15px]">{id}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {pack.downloadPath ? (
        <Text className="text-base leading-[26px] text-muted">
          Download: {pack.downloadPath}
        </Text>
      ) : (
        <Text className="mt-3 text-sm italic text-subtle">
          CSV download ships when this pack moves from planned/collecting → published.
        </Text>
      )}
    </Wrapper>
  );
}
