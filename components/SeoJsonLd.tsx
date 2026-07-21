import { Platform } from "react-native";
import { useEffect } from "react";

type Props = {
  data: Record<string, unknown>;
};

/** Inject JSON-LD on web for AEO/SEO. No-op on native. */
export function SeoJsonLd({ data }: Props) {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const id = `artometrics-jsonld-${String(data["@type"] || "Thing")}`;
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.text = JSON.stringify(data);
    return () => {
      el?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  return null;
}
