import { Platform } from "react-native";
import { useEffect } from "react";

type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Inject JSON-LD on web for AEO/SEO. No-op on native. */
export function SeoJsonLd({ data }: Props) {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const items = Array.isArray(data) ? data : [data];
    const nodes: HTMLScriptElement[] = [];
    items.forEach((item, i) => {
      const id = `artometrics-jsonld-${String(item["@type"] || "Thing")}-${i}`;
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = id;
        document.head.appendChild(el);
      }
      el.text = JSON.stringify(item);
      nodes.push(el);
    });
    return () => {
      nodes.forEach((el) => el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  return null;
}
