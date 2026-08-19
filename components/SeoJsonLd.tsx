import Head from "expo-router/head";

type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-rendered JSON-LD structured data for AEO/SEO. */
export function SeoJsonLd({ data }: Props) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <Head>
      {items.map((item, i) => (
        <script
          key={`jsonld-${String(item["@type"] ?? "Thing")}-${i}`}
          type="application/ld+json"
          // react-helmet-async uses `innerHTML` (not dangerouslySetInnerHTML) for script content
          // eslint-disable-next-line react/no-danger
          {...{ innerHTML: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
