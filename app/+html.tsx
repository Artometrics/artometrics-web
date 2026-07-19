import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="Artometrics — data reports on culture, power, and the creative economy"
        />
        <ScrollViewStyleReset />
        <link rel="stylesheet" href="/css/artometrics-article.css" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Chomsky";
                src: url("/fonts/Chomsky.otf") format("opentype");
                font-weight: normal;
                font-style: normal;
                font-display: block;
              }
              html, body, #root {
                min-height: 100%;
              }
              body {
                margin: 0;
                background: #fff;
                font-family: Georgia, "Times New Roman", Times, serif;
                color: #171717;
              }
              a { color: inherit; text-decoration: none; }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
