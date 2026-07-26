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
                background: #FFFFFF;
                font-family: Georgia, "Times New Roman", Times, serif;
                color: #171717;
              }
              /* Prefer explicit site theme over OS preference alone */
              html[data-theme="light"] body,
              html[data-theme="light"] #root {
                background: #FFFFFF !important;
                color: #171717 !important;
              }
              html[data-theme="dark"] body,
              html[data-theme="dark"] #root {
                background: #0A0A0A !important;
                color: #FAFAF8 !important;
              }
              @media (prefers-color-scheme: dark) {
                html:not([data-theme="light"]) body,
                html:not([data-theme="light"]) #root {
                  background: #0A0A0A;
                  color: #FAFAF8;
                }
              }
              a { color: inherit; text-decoration: none; }
            `,
          }}
        />
        {/* Apply saved theme before paint to avoid white-on-white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var key = "artometrics-theme";
                  var saved = localStorage.getItem(key);
                  var mode = (saved === "light" || saved === "dark")
                    ? saved
                    : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light");
                  var bg = mode === "dark" ? "#0A0A0A" : "#FFFFFF";
                  var fg = mode === "dark" ? "#FAFAF8" : "#171717";
                  var root = document.documentElement;
                  root.setAttribute("data-theme", mode);
                  root.style.colorScheme = mode;
                  root.style.backgroundColor = bg;
                  document.addEventListener("DOMContentLoaded", function () {
                    document.body.style.backgroundColor = bg;
                    document.body.style.color = fg;
                    var app = document.getElementById("root");
                    if (app) {
                      app.style.backgroundColor = bg;
                      app.style.color = fg;
                    }
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
