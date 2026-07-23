import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Root HTML shell for static web export.
 * Favicons: SVG (auto light/dark) first; PNG media pairs as fallbacks.
 */
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
        {/* SVG switches fill via prefers-color-scheme */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/brand/favicon-light-32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/brand/favicon-dark-32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/brand/favicon-light-16.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/brand/favicon-dark-16.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#C0392B" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FAFAF8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
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
                background: #FAFAF8;
                font-family: Georgia, "Times New Roman", Times, serif;
                color: #171717;
              }
              @media (prefers-color-scheme: dark) {
                body { background: #0A0A0A; color: #FAFAF8; }
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
