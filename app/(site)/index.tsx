import { HomeMagazine } from "@/components/HomeMagazine";
import { PageSeo } from "@/components/PageSeo";
import { SeoJsonLd } from "@/components/SeoJsonLd";

export default function HomeScreen() {
  return (
    <>
      <PageSeo
        title="Artometrics"
        description="Data reporting on culture, sports, film, music, and cities — clear, citable, easy to read."
        path="/"
      />
      <SeoJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Artometrics",
            url: "https://artometrics.com",
            logo: "https://artometrics.com/images/brand/chomsky-a.png",
            sameAs: ["https://github.com/Artometrics"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Artometrics",
            url: "https://artometrics.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://artometrics.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <HomeMagazine />
    </>
  );
}
