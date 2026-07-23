import { Redirect, useLocalSearchParams } from "expo-router";
import {
  LEGACY_DESK_TO_SECTION,
  LEGACY_SECTION_TO_DOMAIN,
  SECTION_META,
  SECTION_SLUGS,
  type SectionSlug,
} from "@/data/sections";

function resolveDomain(raw: string | undefined): SectionSlug | null {
  if (!raw) return null;
  if ((raw as SectionSlug) in SECTION_META) return raw as SectionSlug;
  return (
    LEGACY_SECTION_TO_DOMAIN[raw] ??
    LEGACY_DESK_TO_SECTION[raw] ??
    null
  );
}

export async function generateStaticParams() {
  const legacy = new Set([
    ...Object.keys(LEGACY_SECTION_TO_DOMAIN),
    ...Object.keys(LEGACY_DESK_TO_SECTION),
  ]);
  return [
    ...SECTION_SLUGS.map((desk) => ({ desk })),
    ...[...legacy].map((desk) => ({ desk })),
  ];
}

/** Legacy /desks/* → canonical /topics/:domain */
export default function DeskPage() {
  const { desk: raw } = useLocalSearchParams<{ desk: string }>();
  const section = resolveDomain(raw) ?? "culture";
  return <Redirect href={`/topics/${section}` as `/topics/${string}`} />;
}
