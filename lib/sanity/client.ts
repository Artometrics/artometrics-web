/**
 * Thin Sanity HTTP client (no SDK required in the Expo app).
 * Write path is server-only via Netlify `sanity-sync`.
 */

export type SanityEnv = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
};

export function getSanityEnv(write = false): SanityEnv | null {
  const projectId =
    process.env.SANITY_PROJECT_ID ||
    process.env.EXPO_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset =
    process.env.SANITY_DATASET ||
    process.env.EXPO_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    "development";
  if (!projectId || projectId === "yourProjectId") return null;
  const token = write
    ? process.env.SANITY_API_WRITE_TOKEN
    : process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
  if (write && !token) return null;
  return {
    projectId,
    dataset,
    apiVersion: process.env.SANITY_API_VERSION || "2024-01-01",
    token: token || undefined,
  };
}

export async function sanityMutate(mutations: unknown[]): Promise<{ ids?: string[] }> {
  const env = getSanityEnv(true);
  if (!env?.token) throw new Error("Sanity write credentials are not configured");
  const url = `https://${env.projectId}.api.sanity.io/v${env.apiVersion}/data/mutate/${env.dataset}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.token}`,
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity mutate failed: ${res.status} ${text}`);
  }
  return (await res.json()) as { ids?: string[] };
}
