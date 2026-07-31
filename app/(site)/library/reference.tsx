import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { SpecimenCard } from "@/components/library/SpecimenCard";
import { useAuth } from "@/lib/auth";
import {
  searchReference,
  type ReferenceSource,
} from "@/lib/reference/catalog";

const FILTERS: { id: ReferenceSource | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "gutenberg", label: "Gutenberg" },
  { id: "wikiart", label: "WikiArt" },
  { id: "wikipedia", label: "Wikipedia" },
];

export default function LibraryReferenceScreen() {
  const { user } = useAuth();
  const [source, setSource] = useState<ReferenceSource | "all">("all");
  const [q, setQ] = useState("");
  const items = useMemo(() => searchReference(q, source).slice(0, 48), [q, source]);

  return (
    <Wrapper className="gap-3 py-10">
      <PageSeo
        title="Reference library"
        description="Public-domain books, artworks, and encyclopedia entries for research."
        path="/library/reference"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Library</Text>
      <Text className="font-display text-[40px] font-normal uppercase tracking-wide text-fg">
        Reference
      </Text>
      <Text className="font-sans text-base leading-6 max-w-[640px] text-muted">
        Specimen cards for Gutenberg, WikiArt, and Wikipedia — open sources with attribution.
      </Text>

      <View className="flex-row flex-wrap gap-2 mt-2">
        {FILTERS.map((f) => {
          const active = source === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setSource(f.id)}
              className={[
                "border-2 px-3 py-2",
                active ? "bg-fg border-fg" : "bg-transparent border-border",
              ].join(" ")}
            >
              <Text
                className={[
                  "text-[11px] font-extrabold tracking-wide uppercase",
                  active ? "text-inverse" : "text-fg",
                ].join(" ")}
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search titles, artists, subjects…"
        placeholderTextColorClassName="text-subtle"
        className="border-2 border-border px-3 py-2.5 font-sans text-fg bg-bg-elevated"
      />

      {!user ? (
        <Text className="text-sm text-muted">
          <Link href="/login?next=%2Flibrary%2Freference">
            <Text className="text-accent">Log in</Text>
          </Link>{" "}
          to pin items into Twilda.
        </Text>
      ) : (
        <Link href="/tools/twilda/reference">
          <Text className="text-sm text-accent">Open Twilda Reference →</Text>
        </Link>
      )}

      <View className="flex-row flex-wrap gap-4 mt-2">
        {items.map((item) => (
          <SpecimenCard key={`${item.source}-${item.id}`} item={item} />
        ))}
      </View>
    </Wrapper>
  );
}
