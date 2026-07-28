import { Platform } from "react-native";

/**
 * Extract dominant hex colors from an image URI (web: canvas sampling).
 * Native returns a gentle fallback palette until a native sampler ships.
 */
export async function extractDominantColors(
  imageUri: string,
  count = 6,
): Promise<string[]> {
  if (Platform.OS !== "web" || typeof document === "undefined") {
    return ["#C4A090", "#6B7045", "#C4A035", "#B85A3A", "#5F8A7A", "#8B6914"];
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        const buckets = new Map<string, number>();
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a < 200) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Skip near-white / near-black noise
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          if (max > 245 && min > 230) continue;
          if (max < 18) continue;
          const qr = Math.round(r / 24) * 24;
          const qg = Math.round(g / 24) * 24;
          const qb = Math.round(b / 24) * 24;
          const key = `${qr},${qg},${qb}`;
          buckets.set(key, (buckets.get(key) ?? 0) + 1);
        }
        const sorted = [...buckets.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, count);
        const hexes = sorted.map(([key]) => {
          const [r, g, b] = key.split(",").map(Number);
          return `#${[r, g, b]
            .map((x) => Math.min(255, x).toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()}`;
        });
        resolve(
          hexes.length
            ? hexes
            : ["#C4A090", "#6B7045", "#C4A035", "#B85A3A", "#5F8A7A", "#8B6914"],
        );
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = imageUri;
  });
}
