import Head from "expo-router/head";

type Props = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

const SITE = "https://artometrics.com";

/** Server-rendered document head tags for Expo web static export. */
export function PageSeo({
  title,
  description,
  path = "/",
  image = "/images/brand/og-default.png",
  type = "website",
}: Props) {
  const fullTitle = title.includes("Artometrics")
    ? title
    : `${title} · Artometrics`;
  const desc = description ?? title;
  const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const img = image.startsWith("http") ? image : `${SITE}${image}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Artometrics" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@artometrics" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Head>
  );
}
