import { Linking, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import downloadsManifest from "@/src/generated/downloads.json";

type Pack = {
  slug: string;
  dataset?: string | null;
  html?: string | null;
  pdf?: string | null;
  epub?: string | null;
  audio?: string | null;
  github?: string | null;
};

const packs = Object.values(downloadsManifest as Record<string, Pack>).sort((a, b) =>
  a.slug.localeCompare(b.slug),
);

function FileLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <Pressable onPress={() => Linking.openURL(href)}>
        <Text className="text-[13px] font-bold uppercase tracking-wide text-accent">{label}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={() => Linking.openURL(href)}>
      <Text className="text-[13px] font-bold uppercase tracking-wide text-accent">{label}</Text>
    </Pressable>
  );
}

export default function DownloadsScreen() {
  return (
    <Wrapper className="gap-4 py-12">
      <PageSeo
        title="Downloads"
        description="Site-hosted PDF, EPUB, HTML, CSV, and audio packs for Artometrics reports."
        path="/downloads"
      />
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Library
      </Text>
      <Text className="font-display text-[40px] leading-tight text-fg">Downloads</Text>
      <Text className="max-w-[640px] font-serif text-base leading-7 text-muted">
        Export packs hosted on artometrics.com — reports, data tables, and audio when available.
        Prefer these links over external repositories.
      </Text>

      <View className="mt-4 gap-0 border-t-2 border-fg">
        {packs.map((pack) => {
          const files: { href: string; label: string }[] = [];
          if (pack.pdf) files.push({ href: pack.pdf, label: "PDF" });
          if (pack.epub) files.push({ href: pack.epub, label: "EPUB" });
          if (pack.html) files.push({ href: pack.html, label: "HTML" });
          if (pack.dataset) files.push({ href: pack.dataset, label: "Data" });
          if (pack.audio) files.push({ href: pack.audio, label: "Audio" });
          if (!files.length) return null;
          return (
            <View
              key={pack.slug}
              className="flex-row flex-wrap items-baseline justify-between gap-3 border-b border-border py-4"
            >
              <Link href={`/${pack.slug}` as `/`} asChild>
                <Pressable className="min-w-[200px] flex-1">
                  <Text className="font-serif text-lg leading-6 text-fg">{pack.slug}</Text>
                </Pressable>
              </Link>
              <View className="flex-row flex-wrap gap-4">
                {files.map((f) => (
                  <FileLink key={f.label} href={f.href} label={f.label} />
                ))}
              </View>
            </View>
          );
        })}
      </View>

      <View className="mt-6 flex-row flex-wrap gap-3">
        <Link href="/datasets" asChild>
          <Pressable className="bg-fg px-[18px] py-3">
            <Text className="text-xs font-bold uppercase tracking-[1.5px] text-inverse">
              Datasets
            </Text>
          </Pressable>
        </Link>
        <Link href="/resources" asChild>
          <Pressable className="border border-border px-[18px] py-3">
            <Text className="text-xs font-bold uppercase tracking-[1.5px] text-fg">Resources</Text>
          </Pressable>
        </Link>
      </View>
    </Wrapper>
  );
}
