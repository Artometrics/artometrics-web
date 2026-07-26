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
        <link rel="mask-icon" href="/favicon.svg" color="#D9251B" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light" />
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
              @font-face {
                font-family: "Anton";
                src: url("/fonts/Anton-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              html, body, #root {
                min-height: 100%;
              }
              body {
                margin: 0;
                background: #FFFFFF;
                font-family: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
                color: #000000;
              }
              /* Prefer explicit site theme over OS preference alone */
              html[data-theme="light"] {
                color-scheme: light only;
              }
              html[data-theme="light"] body,
              html[data-theme="light"] #root {
                background: #FFFFFF !important;
                color: #171717 !important;
              }
              html[data-theme="dark"] {
                color-scheme: dark;
              }
              html[data-theme="dark"] body,
              html[data-theme="dark"] #root {
                background: #0A0A0A !important;
                color: #FAFAF8 !important;
              }
              @media (prefers-color-scheme: dark) {
                html:not([data-theme]) body,
                html:not([data-theme]) #root,
                html[data-theme="dark"] body,
                html[data-theme="dark"] #root {
                  background: #0A0A0A;
                  color: #FAFAF8;
                }
                /* Never let OS dark override an explicit light site theme */
                html[data-theme="light"] body,
                html[data-theme="light"] #root {
                  background: #FFFFFF !important;
                  color: #171717 !important;
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
                  // Default light unless user saved dark/system-resolved preference.
                  var mode = "light";
                  if (saved === "dark") mode = "dark";
                  else if (saved === "system") {
                    mode = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "dark"
                      : "light";
                  } else if (saved === "light") mode = "light";
                  var bg = mode === "dark" ? "#0A0A0A" : "#FFFFFF";
                  var fg = mode === "dark" ? "#FAFAF8" : "#171717";
                  var root = document.documentElement;
                  root.setAttribute("data-theme", mode);
                  root.style.setProperty("color-scheme", mode === "dark" ? "dark" : "light only");
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
