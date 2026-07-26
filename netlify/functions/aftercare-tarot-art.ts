import { getStore } from "@netlify/blobs";
import { adminSupabase, corsPreflight } from "../lib/shared";

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(request.url);
  const cardId = url.searchParams.get("cardId");
  if (!cardId) return new Response("Missing card", { status: 400 });

  const supabase = adminSupabase();
  const { data: cached, error } = await supabase
    .from("card_art_cache")
    .select("blob_key, mime_type")
    .eq("card_id", cardId)
    .maybeSingle();
  if (error) return new Response(error.message, { status: 500 });
  if (!cached) return new Response("Not found", { status: 404 });

  const store = getStore({ name: "tarot-art", consistency: "strong" });
  const data = await store.get(cached.blob_key, { type: "arrayBuffer" });
  if (!data) return new Response("Not found", { status: 404 });

  return new Response(data, {
    headers: {
      "Content-Type": cached.mime_type || "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
