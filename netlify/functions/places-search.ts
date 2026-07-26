import { corsPreflight, json } from "../lib/shared";

type NominatimHit = {
  display_name?: string;
  lat?: string;
  lon?: string;
  address?: {
    country_code?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
};

/**
 * GET /api/places-search?q=
 * Proxies OpenStreetMap Nominatim (no paid key). Client should debounce ≥1s between searches.
 */
export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) return json({ results: [] });
  if (q.length > 120) return json({ error: "Query too long" }, 400);

  const nominatim = new URL("https://nominatim.openstreetmap.org/search");
  nominatim.searchParams.set("q", q);
  nominatim.searchParams.set("format", "json");
  nominatim.searchParams.set("addressdetails", "1");
  nominatim.searchParams.set("limit", "6");

  try {
    const res = await fetch(nominatim.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "Artometrics/1.0 (https://artometrics.com; places-search)",
      },
    });
    if (!res.ok) {
      return json({ error: "Place search unavailable", results: [] }, 502);
    }
    const raw = (await res.json()) as NominatimHit[];
    const results = (Array.isArray(raw) ? raw : [])
      .map((hit) => {
        const lat = Number(hit.lat);
        const lon = Number(hit.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
        const label =
          hit.display_name?.trim() ||
          [hit.address?.city || hit.address?.town || hit.address?.village, hit.address?.state, hit.address?.country]
            .filter(Boolean)
            .join(", ");
        if (!label) return null;
        return {
          label,
          lat,
          lon,
          countryCode: hit.address?.country_code?.toUpperCase() || undefined,
        };
      })
      .filter(Boolean);

    return json({ results });
  } catch {
    return json({ error: "Place search failed", results: [] }, 502);
  }
};
