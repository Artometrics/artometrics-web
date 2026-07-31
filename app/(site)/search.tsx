import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { searchSite } from "@/lib/search";
import { PageSeo } from "@/components/PageSeo";
import { paramString } from "@/lib/params";

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string | string[] }>();
  const initial = paramString(params.q) ?? "";
  const [q, setQ] = useState(initial);
  const hits = useMemo(() => searchSite(q), [q]);

  function run() {
    router.setParams({ q: q.trim() });
  }

  return (
    <Wrapper className="gap-3 py-10">
      <PageSeo
        title={q ? `Search: ${q}` : "Search"}
        description="Search Artometrics reports, podcasts, and authors."
        path="/search"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Search</Text>
      <Text className="font-serif text-[36px] font-bold tracking-tight text-fg">Find a report</Text>
      <View className="flex-row items-center border border-border mt-2 pl-3">
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Keywords, sections, topics…"
          placeholderTextColorClassName="text-subtle"
          className="flex-1 text-base py-3 font-sans text-fg"
          onSubmitEditing={run}
          returnKeyType="search"
          autoFocus
        />
        <Pressable onPress={run} className="px-4 py-3.5 bg-fg">
          <Text className="font-bold tracking-wide text-xs text-inverse">Search</Text>
        </Pressable>
      </View>
      <Text className="text-[13px] mt-1 text-subtle">
        {q.trim().length < 2 ? "Type at least two characters." : `${hits.length} results`}
      </Text>
      <View className="mt-2">
        {hits.map((hit) => (
          <Link key={`${hit.type}-${hit.id}`} href={hit.href as `/`} asChild>
            <Pressable className="py-[18px] border-b border-border gap-1.5">
              <Text className="text-[11px] tracking-[1.5px] uppercase font-bold text-accent">
                {hit.meta}
              </Text>
              <Text className="font-serif text-[22px] leading-7 text-fg">{hit.title}</Text>
              <Text className="font-serif text-[15px] leading-[22px] text-muted" numberOfLines={2}>
                {hit.description}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}
