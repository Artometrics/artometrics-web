import gutenberg from "../../public/data/reference/gutenberg/catalog.json";
import wikiart from "../../public/data/reference/wikiart/catalog.json";
import wikipedia from "../../public/data/reference/wikipedia/catalog.json";
import { getSupabase } from "@/lib/supabase/client";

export type ReferenceSource = "gutenberg" | "wikiart" | "wikipedia";

export type ReferenceItem = {
  id: string;
  title: string;
  authors?: string[];
  artist?: string;
  label?: string;
  description?: string;
  subjects?: string[];
  style?: string;
  year?: string | number;
  url?: string;
  downloadUrl?: string;
  imageUrl?: string;
  thumbnail?: string;
};

type CatalogFile = {
  generatedAt?: string;
  source?: string;
  license?: string;
  items: ReferenceItem[];
};

const CATALOGS: Record<ReferenceSource, CatalogFile> = {
  gutenberg: gutenberg as CatalogFile,
  wikiart: wikiart as CatalogFile,
  wikipedia: wikipedia as CatalogFile,
};

export function getCatalog(source: ReferenceSource): CatalogFile {
  return CATALOGS[source];
}

export function listAllReferenceItems(source?: ReferenceSource | "all") {
  if (!source || source === "all") {
    return (Object.keys(CATALOGS) as ReferenceSource[]).flatMap((s) =>
      CATALOGS[s].items.map((item) => ({ ...item, source: s as ReferenceSource })),
    );
  }
  return CATALOGS[source].items.map((item) => ({
    ...item,
    source,
  }));
}

export function searchReference(
  query: string,
  source: ReferenceSource | "all" = "all",
) {
  const q = query.trim().toLowerCase();
  const items = listAllReferenceItems(source);
  if (!q) return items;
  return items.filter((item) => {
    const hay = [
      item.title,
      item.label,
      item.artist,
      item.description,
      ...(item.authors ?? []),
      ...(item.subjects ?? []),
      item.style,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export async function listPins(userId: string) {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reference_pins")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function pinReference(
  userId: string,
  input: {
    source: ReferenceSource;
    external_id: string;
    title: string;
    url?: string;
    payload?: Record<string, unknown>;
    novel_id?: string | null;
  },
) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("reference_pins")
    .upsert(
      {
        user_id: userId,
        source: input.source,
        external_id: input.external_id,
        title: input.title,
        url: input.url ?? null,
        payload: input.payload ?? {},
        novel_id: input.novel_id ?? null,
      },
      { onConflict: "user_id,source,external_id" },
    )
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function unpinReference(userId: string, pinId: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured");
  const { error } = await supabase
    .from("reference_pins")
    .delete()
    .eq("id", pinId)
    .eq("user_id", userId);
  if (error) throw error;
}
