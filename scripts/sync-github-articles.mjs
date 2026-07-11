#!/usr/bin/env node
/**
 * Sync blog articles + native charts from Artometrics GitHub repos.
 *
 * Usage:
 *   node scripts/sync-github-articles.mjs              # sync from cached HTML + charts
 *   node scripts/sync-github-articles.mjs --clone      # pull latest repos first
 *   node scripts/sync-github-articles.mjs --render     # re-render Quarto from source data
 *   node scripts/sync-github-articles.mjs --clone --render
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const PUBLIC = path.join(ROOT, "public");
const CACHE_DIR = path.join(ROOT, ".cache/article-repos");
const CSS_OUT = path.join(PUBLIC, "css/artometrics-article.css");

const REPO_MAP = {
  readmitted: "readmitted",
  anime: "anime",
  coffee: "coffee-the-artometrics-of-java",
  franchise: "franchise",
  imperial: "imperial",
  giant: "giant-the-artometrics-of-a-san-francisco-dynasty",
  h3: "h3-the-artometrics-of-a-youtube-dynasty",
  warrior: "warrior-the-artometrics-of-a-golden-state-dynasty",
  caesar: "caesar-the-psychonomics-of-emperor-julius",
  pokemon: "pokemon",
};

const shouldClone = process.argv.includes("--clone");
const shouldRender = process.argv.includes("--render");

function cloneRepos() {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  for (const repo of Object.keys(REPO_MAP)) {
    const dest = path.join(CACHE_DIR, repo);
    if (fs.existsSync(path.join(dest, ".git"))) {
      execSync("git pull --ff-only", { cwd: dest, stdio: "inherit" });
    } else {
      fs.rmSync(dest, { recursive: true, force: true });
      execSync(
        `git clone --depth 1 https://github.com/Artometrics/${repo}.git "${dest}"`,
        { stdio: "inherit" }
      );
    }
  }
}

function scopeCss(css, scope) {
  return css
    .replace(/@import[^;]+;/g, (m) => m)
    .split(/\n(?=[^\s])/)
    .map((block) => {
      if (
        !block.trim() ||
        block.startsWith("@import") ||
        block.startsWith("@keyframes") ||
        block.startsWith("@media")
      ) {
        return block;
      }
      return block.replace(/(^|\})\s*([^@{}][^{]+)\{/g, (match, prefix, sel) => {
        const scoped = sel
          .split(",")
          .map((s) => {
            const t = s.trim();
            if (!t || t.startsWith(scope)) return t;
            if (t.startsWith(":root")) return `${scope}${t.slice(5)}`;
            return `${scope} ${t}`;
          })
          .join(", ");
        return `${prefix}${scoped}{`;
      });
    })
    .join("\n");
}

function writeArticleCss() {
  const sampleRepo = path.join(CACHE_DIR, "pokemon");
  const artCss = fs.readFileSync(
    path.join(sampleRepo, "artometrics.css"),
    "utf8"
  ).replace(/#quarto-sidebar,\s*\n?nav#TOC\s*\{[^}]+\}/s, "")
    .replace(/width:\s*240px\s*!important;?/g, "")
    .replace(/min-width:\s*240px\s*!important;?/g, "")
    .replace(
      /h2:first-of-type \+ ul,/g,
      "main.art-article-main h2#fast-facts + ul,"
    );
  const artHead = fs.readFileSync(
    path.join(sampleRepo, "art-head.html"),
    "utf8"
  );
  const siteExtras = `
/* ── Site layout fixes (Quarto embed without main wrapper) ── */
.artometrics-article-body #quarto-content {
  display: grid !important;
  grid-template-columns: minmax(8rem, 10rem) minmax(0, 1fr) minmax(8rem, 10rem) !important;
  gap: 0 1.25rem !important;
  align-items: start !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
}
.artometrics-article-body nav#TOC {
  grid-column: 1 !important;
  grid-row: 1 !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: 13.5rem !important;
  position: sticky !important;
  top: 5rem !important;
  max-height: calc(100vh - 6rem) !important;
  overflow-x: visible !important;
  overflow-y: auto !important;
  padding: 0.25rem 0.75rem 2rem 0.5rem !important;
  margin: 0 !important;
  border-right: 1px solid var(--art-muted, #D5D5D5) !important;
  background: transparent !important;
  flex: none !important;
  box-sizing: border-box !important;
}
.artometrics-article-body nav#TOC ul,
.artometrics-article-body nav#TOC li {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
  list-style: none !important;
  padding-left: 0 !important;
  margin-left: 0 !important;
}
.artometrics-article-body nav#TOC li {
  display: block !important;
  margin: 2px 0 !important;
}
.artometrics-article-body nav#TOC a {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.7rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  line-height: 1.45 !important;
  padding: 0.35rem 0.25rem 0.35rem 0.65rem !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  border-left: 2px solid transparent !important;
  word-break: break-word !important;
  overflow-wrap: anywhere !important;
}
.artometrics-article-body nav#TOC #toc-title,
.artometrics-article-body nav#TOC h2#toc-title {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: #C0392B !important;
  border: none !important;
  padding: 0 0 0.65rem 0.5rem !important;
  margin: 0 0 0.75rem !important;
  text-align: left !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}
.artometrics-article-body nav#TOC a:hover,
.artometrics-article-body nav#TOC a.active,
.artometrics-article-body nav#TOC li.active > a {
  padding-left: 0.85rem !important;
  border-left-color: #C0392B !important;
  color: #1C1C1E !important;
}
.artometrics-article-body main.art-article-main {
  grid-column: 2 !important;
  min-width: 0 !important;
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 0 3rem !important;
  text-align: center !important;
}
.artometrics-article-body .art-p,
.artometrics-article-body main.art-article-main p {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 1.05rem !important;
  line-height: 1.85 !important;
  color: #1C1C1E !important;
  text-align: center !important;
  max-width: 42rem !important;
  margin: 0 auto 1.35rem !important;
}
.artometrics-article-body main.art-article-main > ul,
.artometrics-article-body main.art-article-main > ol,
.artometrics-article-body main.art-article-main li {
  text-align: center !important;
  list-style-position: inside !important;
}
.artometrics-article-body main.art-article-main > ul,
.artometrics-article-body main.art-article-main > ol {
  margin: 0 auto 1.35rem !important;
  padding-left: 0 !important;
  max-width: 38rem !important;
}
.artometrics-article-body .facts-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 12px !important;
  margin: 1.25rem 0 2rem !important;
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
  text-align: left !important;
}
@media (min-width: 768px) {
  .artometrics-article-body .facts-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (min-width: 1024px) {
  .artometrics-article-body .facts-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
.artometrics-article-body .fact-box {
  background: #FFFFFF !important;
  border: 1px solid #E8E6E1 !important;
  border-left: 4px solid #C0392B !important;
  padding: 1rem 1.1rem !important;
  min-width: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
  text-align: left !important;
}
.artometrics-article-body .fact-number {
  font-size: 1.55rem !important;
  line-height: 1.15 !important;
  text-align: left !important;
}
.artometrics-article-body .fact-label {
  font-size: 0.95rem !important;
  line-height: 1.5 !important;
  color: #1C1C1E !important;
  text-align: left !important;
}
.artometrics-article-body .art-code-block,
.artometrics-article-body details:has(.art-lang-tag) {
  display: none !important;
}
.artometrics-article-body .art-editorial-note,
.artometrics-article-body .art-editorial-note p {
  text-align: center !important;
}
.artometrics-article-body .art-code-block,
.artometrics-article-body .art-code-block details,
.artometrics-article-body .art-code-pre,
.artometrics-article-body main.art-article-main pre {
  text-align: left !important;
}
.artometrics-article-body main.art-article-main > p.art-p:first-of-type,
.artometrics-article-body main.art-article-main > p.art-p:nth-of-type(2) {
  font-size: 1.14rem !important;
  line-height: 1.92 !important;
  color: #1C1C1E !important;
}
.artometrics-article-body main.art-article-main > h2 {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 1.2rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  text-align: center !important;
  color: #1C1C1E !important;
  border: none !important;
  padding: 0 !important;
  margin: 3.5rem auto 1.35rem !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 0.7rem !important;
  line-height: 1.35 !important;
  max-width: 36rem !important;
}
.artometrics-article-body main.art-article-main > h2::before {
  content: '' !important;
  display: block !important;
  width: 2.75rem !important;
  height: 3px !important;
  background: #C0392B !important;
}
.artometrics-article-body h2 {
  font-family: 'DM Sans', sans-serif !important;
}
.artometrics-article-body h2#toc-title {
  font-size: 0.68rem !important;
  letter-spacing: 0.2em !important;
  border-top: none !important;
  padding-top: 0 !important;
  margin: 0 0 0.75rem 0 !important;
  color: #C0392B !important;
}
/* ── Code exhibit cards ── */
.artometrics-article-body .art-code-block {
  margin: 2.75rem auto !important;
  max-width: 100% !important;
  text-align: center !important;
}
.artometrics-article-body .art-code-block details {
  border: 1px solid #D5D5D5 !important;
  border-radius: 10px !important;
  background: #FAFAF8 !important;
  box-shadow: 0 2px 14px rgba(28, 28, 30, 0.06) !important;
  overflow: hidden !important;
}
.artometrics-article-body .art-code-block details:not([open]) {
  box-shadow: 0 1px 8px rgba(28, 28, 30, 0.05) !important;
}
.artometrics-article-body .art-code-summary {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  gap: 0.65rem 0.85rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
  padding: 1.2rem 1.5rem !important;
  margin: 0 !important;
  background: linear-gradient(180deg, #F2F0EB 0%, #FAFAF8 100%) !important;
  border: none !important;
  border-bottom: 1px solid transparent !important;
  border-radius: 10px !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.82rem !important;
  font-weight: 600 !important;
  color: #1C1C1E !important;
  letter-spacing: 0.05em !important;
  line-height: 1.45 !important;
  list-style: none !important;
  cursor: pointer !important;
  text-align: center !important;
  transition: color 0.15s, background 0.15s !important;
}
.artometrics-article-body .art-code-block details[open] .art-code-summary {
  border-bottom-color: #D5D5D5 !important;
  border-radius: 10px 10px 0 0 !important;
}
.artometrics-article-body .art-code-summary:hover {
  color: #C0392B !important;
  background: #F2F0EB !important;
}
.artometrics-article-body .art-code-summary::-webkit-details-marker {
  display: none !important;
}
.artometrics-article-body .art-code-summary::marker {
  content: '' !important;
  display: none !important;
}
.artometrics-article-body .art-code-summary::after {
  display: none !important;
  content: none !important;
}
.artometrics-article-body .art-code-summary__label {
  font-weight: 600 !important;
  letter-spacing: 0.04em !important;
}
.artometrics-article-body .art-code-summary:not(:has(.art-code-summary__label)) {
  justify-content: center !important;
}
.artometrics-article-body .art-code-summary:not(:has(.art-code-summary__label)) .art-lang-tag {
  margin: 0 auto !important;
}
.artometrics-article-body .art-lang-tag {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 2.1rem !important;
  padding: 0.18rem 0.45rem !important;
  font-family: 'DM Mono', monospace !important;
  font-size: 0.62rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  border-radius: 4px !important;
  color: #FAFAF8 !important;
  flex-shrink: 0 !important;
}
.artometrics-article-body .art-lang-r { background: #2C3E6B !important; }
.artometrics-article-body .art-lang-sql { background: #1C1C1E !important; }
.artometrics-article-body .art-lang-python { background: #3B7DD8 !important; }
.artometrics-article-body .art-code-pre {
  background: #1C1C1E !important;
  color: #E8E6E1 !important;
  border: none !important;
  border-left: 4px solid #2C3E6B !important;
  border-radius: 0 !important;
  margin: 0 !important;
  padding: 1.15rem 1.35rem !important;
  font-family: 'DM Mono', monospace !important;
  font-size: 0.76rem !important;
  line-height: 1.65 !important;
  cursor: pointer !important;
  transition: box-shadow 0.15s ease !important;
}
.artometrics-article-body .art-code-pre:hover {
  box-shadow: inset 0 0 0 1px rgba(44, 62, 107, 0.35) !important;
}
.artometrics-article-body .art-code-pre.art-code-pre--copied {
  box-shadow: inset 0 0 0 2px #2C3E6B !important;
}
.artometrics-article-body .art-copy-btn {
  display: none !important;
}
.artometrics-article-body .art-editorial-note {
  margin: 0 0 2rem !important;
  padding: 1.5rem 1.65rem !important;
  background: #F2F0EB !important;
  border: 1px solid #D5D5D5 !important;
  border-left: 4px solid #C0392B !important;
  border-radius: 4px !important;
}
.artometrics-article-body .art-editorial-note p {
  margin-bottom: 1.1rem !important;
}
.artometrics-article-body .art-editorial-note p:last-child {
  margin-bottom: 0 !important;
  font-style: italic !important;
  color: #6B6B6B !important;
}
.artometrics-article-body .fact-number,
.artometrics-article-body .fact-label {
  font-family: 'DM Sans', sans-serif !important;
}
.artometrics-article-body #art-sidebar-btn {
  left: auto !important;
  right: auto !important;
}
.artometrics-article-body .facts-grid {
  margin: 1.25rem 0 2rem !important;
  max-width: 100% !important;
}
.artometrics-article-body .cell {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
}
.artometrics-article-body .cell-output-display {
  margin: 1.5rem 0 2rem !important;
  padding: 0 !important;
  border: none !important;
}
.artometrics-article-body details:not(.art-code-block details):not(:has(.art-lang-tag)) {
  max-width: 100% !important;
  margin: 1rem 0 1.5rem !important;
  text-align: left !important;
}
/* ── Universal code toggles (art-code-block + legacy Quarto details) ── */
.artometrics-article-body .art-code-block details,
.artometrics-article-body details:has(.art-lang-tag) {
  border: 1px solid #D5D5D5 !important;
  border-radius: 10px !important;
  background: #FAFAF8 !important;
  box-shadow: 0 2px 14px rgba(28, 28, 30, 0.06) !important;
  overflow: hidden !important;
  margin: 2.75rem auto !important;
  max-width: 100% !important;
  text-align: center !important;
}
.artometrics-article-body .art-code-summary,
.artometrics-article-body details:has(.art-lang-tag) > summary {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  gap: 0.65rem 0.85rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
  padding: 1.2rem 1.5rem !important;
  margin: 0 !important;
  background: linear-gradient(180deg, #F2F0EB 0%, #FAFAF8 100%) !important;
  border: none !important;
  border-bottom: 1px solid transparent !important;
  border-radius: 10px !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.82rem !important;
  font-weight: 600 !important;
  color: #1C1C1E !important;
  letter-spacing: 0.05em !important;
  line-height: 1.45 !important;
  list-style: none !important;
  cursor: pointer !important;
  text-align: center !important;
  transition: color 0.15s, background 0.15s !important;
}
.artometrics-article-body .art-code-block details[open] .art-code-summary,
.artometrics-article-body details:has(.art-lang-tag)[open] > summary {
  border-bottom-color: #D5D5D5 !important;
  border-radius: 10px 10px 0 0 !important;
}
.artometrics-article-body .art-code-summary::-webkit-details-marker,
.artometrics-article-body details:has(.art-lang-tag) > summary::-webkit-details-marker {
  display: none !important;
}
.artometrics-article-body .art-code-summary::marker,
.artometrics-article-body details:has(.art-lang-tag) > summary::marker {
  content: '' !important;
  display: none !important;
}
.artometrics-article-body .art-code-summary::after,
.artometrics-article-body details:has(.art-lang-tag) > summary::after {
  display: none !important;
  content: none !important;
}
.artometrics-article-body details:has(.art-lang-tag) .code-copy-button,
.artometrics-article-body details:has(.art-lang-tag) .code-copy-outer-scaffold > button {
  display: none !important;
}
.artometrics-article-body .art-chart {
  display: block !important;
  margin: 2.5rem auto !important;
  max-width: 100% !important;
  width: 100% !important;
  border: 1px solid #D5D5D5 !important;
  border-radius: 6px !important;
  overflow: visible !important;
  background: #FAFAF8 !important;
  box-shadow: 0 2px 12px rgba(28, 28, 30, 0.05) !important;
}
@media (min-width: 900px) {
  .artometrics-article-body .art-chart {
    margin-left: -1.5rem !important;
    margin-right: -1.5rem !important;
    width: calc(100% + 3rem) !important;
    max-width: calc(100% + 3rem) !important;
  }
}
.artometrics-article-body .art-chart-caption,
.artometrics-article-body .art-chart figcaption {
  display: none !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}
.artometrics-article-body .art-chart-caption--visible {
  display: none !important;
}
.artometrics-article-body .art-chart-live .gtitle,
.artometrics-article-body .art-chart-live .gtitle text,
.artometrics-article-body .art-chart-live .infolayer .gtitle {
  text-anchor: middle !important;
}
.artometrics-article-body .art-chart-heading {
  padding: 1.15rem 1.25rem 0.65rem !important;
  text-align: left !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  letter-spacing: 0.01em !important;
  color: #1C1C1E !important;
  background: var(--art-cream, #F2F0EB) !important;
  border-bottom: 1px solid #E8E6E1 !important;
}
.artometrics-article-body .art-chart-heading__line {
  display: block !important;
}
.artometrics-article-body .art-chart-heading__line--primary {
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: #1C1C1E !important;
  letter-spacing: 0.02em !important;
}
.artometrics-article-body .art-chart-heading__line--accent {
  font-size: 0.92rem !important;
  font-weight: 600 !important;
  color: #C0392B !important;
}
.artometrics-article-body .art-chart-heading__subtitle {
  display: block !important;
  margin-top: 0.35rem !important;
  font-size: 0.78rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #6B6B6B !important;
  letter-spacing: 0 !important;
}
.artometrics-article-body .art-chart-credit {
  padding: 0.35rem 1.15rem 0.65rem !important;
  font-family: 'DM Mono', 'DM Sans', monospace !important;
  font-size: 0.62rem !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  color: #8A8A8A !important;
  background: var(--art-cream, #F2F0EB) !important;
  border-top: 1px solid #E8E6E1 !important;
}
.artometrics-article-body .art-chart-insight {
  margin: 1rem 0 1.75rem !important;
  padding: 0.9rem 1rem 0.95rem 1.15rem !important;
  border-left: 3px solid #C0392B !important;
  background: #FAFAF8 !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.84rem !important;
  line-height: 1.55 !important;
  color: #3A3A3A !important;
}
.artometrics-article-body .art-chart-insight strong {
  display: block !important;
  margin-bottom: 0.35rem !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  color: #C0392B !important;
}
.artometrics-article-body .art-chart-insight ul {
  margin: 0 !important;
  padding-left: 1.1rem !important;
}
.artometrics-article-body .art-chart-insight li {
  margin-bottom: 0.35rem !important;
}
.artometrics-article-body .art-chart-insight li:last-child {
  margin-bottom: 0 !important;
}
.artometrics-article-body .art-report-summary {
  margin: 1.75rem 0 2.25rem !important;
  padding: 1.15rem 1.25rem 1.2rem !important;
  border: 1px solid #D5D5D5 !important;
  border-left: 4px solid #2C3E6B !important;
  background: #FAFAF8 !important;
  max-width: 42rem !important;
}
.artometrics-article-body .art-report-summary__label {
  margin: 0 0 0.5rem !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: #2C3E6B !important;
}
.artometrics-article-body .art-report-summary__text {
  margin: 0 !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.92rem !important;
  line-height: 1.65 !important;
  color: #1C1C1E !important;
}
.artometrics-article-body .art-myth-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 1rem !important;
  margin: 1.25rem 0 2rem !important;
  max-width: 42rem !important;
}
@media (min-width: 768px) {
  .artometrics-article-body .art-myth-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    max-width: none !important;
  }
}
@media (min-width: 1024px) {
  .artometrics-article-body .art-myth-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
.artometrics-article-body .art-myth-card {
  padding: 1rem 1.05rem !important;
  border: 1px solid #E8E6E1 !important;
  border-top: 3px solid #C0392B !important;
  background: #FAFAF8 !important;
}
.artometrics-article-body .art-myth-card__index {
  margin: 0 0 0.45rem !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: #C0392B !important;
}
.artometrics-article-body .art-myth-card__myth {
  margin: 0 0 0.55rem !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.88rem !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
  color: #1C1C1E !important;
  font-style: normal !important;
}
.artometrics-article-body .art-myth-card__reality {
  margin: 0 !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.9rem !important;
  line-height: 1.6 !important;
  color: #3A3A3A !important;
}
.artometrics-article-body main.art-article-main > p {
  text-align: left !important;
  margin-left: 0 !important;
  margin-right: auto !important;
}
.artometrics-article-body .art-chart-heading b {
  font-weight: 700 !important;
}
.artometrics-article-body .art-chart-live.art-chart-has-heading .art-chart-fallback {
  display: block !important;
  margin-top: calc(-1 * var(--art-chart-title-crop, 7.25rem)) !important;
  clip-path: inset(var(--art-chart-title-crop, 7.25rem) 0 0 0) !important;
}
.artometrics-article-body .art-chart-live .main-svg {
  margin: 0 auto !important;
}
.artometrics-article-body .art-code-pre,
.artometrics-article-body main.art-article-main pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  overflow-x: visible !important;
  max-width: 100% !important;
}
.artometrics-article-body .art-related-rail {
  grid-column: 3 !important;
  position: sticky !important;
  top: 5rem !important;
  max-height: calc(100vh - 6rem) !important;
  overflow-y: auto !important;
  padding: 0.25rem 0 2rem 0.5rem !important;
  border-left: 1px solid #D5D5D5 !important;
}
.artometrics-article-body .art-related-rail__title {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: #C0392B !important;
  margin: 0 0 0.85rem !important;
  padding-bottom: 0.55rem !important;
  border-bottom: 1px solid #D5D5D5 !important;
}
.artometrics-article-body .art-related-rail ul {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.artometrics-article-body .art-related-rail li {
  margin: 0 0 0.85rem !important;
}
.artometrics-article-body .art-related-rail a {
  display: block !important;
  text-decoration: none !important;
  color: #1C1C1E !important;
  line-height: 1.45 !important;
}
.artometrics-article-body .art-related-rail__thumb {
  display: block !important;
  width: 100% !important;
  aspect-ratio: 4 / 3 !important;
  object-fit: cover !important;
  border-radius: 3px !important;
  margin-bottom: 0.45rem !important;
}
.artometrics-article-body .art-related-rail a strong {
  display: block !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase !important;
  margin-bottom: 0.25rem !important;
}
.artometrics-article-body .art-related-rail a span {
  display: block !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.78rem !important;
  color: #6B6B6B !important;
  line-height: 1.5 !important;
}
.artometrics-article-body .art-related-rail a:hover strong {
  color: #C0392B !important;
}
@media (max-width: 1100px) {
  .artometrics-article-body #quarto-content {
    grid-template-columns: minmax(9rem, 10.5rem) minmax(0, 1fr) !important;
  }
  .artometrics-article-body .art-related-rail {
    display: none !important;
  }
}
@media (max-width: 900px) {
  .artometrics-article-body #quarto-content {
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }
  .artometrics-article-body nav#TOC {
    display: none !important;
  }
  .artometrics-article-body main.art-article-main {
    grid-column: 1 !important;
    max-width: 100% !important;
  }
  .artometrics-article-body .art-related-rail {
    display: none !important;
  }
  .artometrics-article-body #art-sidebar-btn {
    display: none !important;
  }
}
.artometrics-article-body .art-chart-live {
  width: 100%;
  min-height: 280px;
  opacity: 1;
  transition: opacity 0.35s ease;
  border-radius: 2px;
  background: var(--art-cream, #F2F0EB);
  touch-action: manipulation;
  position: relative;
  overflow: visible;
}
.artometrics-article-body .art-chart-fallback {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 2px;
}
.artometrics-article-body .art-chart-live--loading .art-chart-fallback {
  opacity: 0.96;
}
.artometrics-article-body .art-chart-live--ready {
  opacity: 1;
}
.artometrics-article-body .art-chart-live--ready:not(.art-chart-live--static) {
  min-height: 280px !important;
}
.artometrics-article-body .art-chart-live--static {
  min-height: 0 !important;
}
.artometrics-article-body .art-chart-live--static .art-chart-fallback {
  opacity: 1 !important;
  display: block !important;
}
.artometrics-article-body .art-chart-live .js-plotly-plot,
.artometrics-article-body .art-chart-live .plotly {
  width: 100% !important;
}
.artometrics-article-body .art-chart-live .svg-container {
  margin: 0 auto !important;
}
.artometrics-article-body .art-chart-live .modebar {
  top: auto !important;
  bottom: 6px !important;
  right: 4px !important;
  opacity: 0 !important;
  transition: opacity 0.15s ease !important;
}
.artometrics-article-body .art-chart-live:hover .modebar,
.artometrics-article-body .art-chart-live:focus-within .modebar {
  opacity: 1 !important;
}
.artometrics-article-body .art-github-wrap {
  text-align: center !important;
  margin: 2.5rem 0 3rem !important;
}
.artometrics-article-body .art-github-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.45rem !important;
  margin: 0 !important;
  padding: 0.7rem 1.35rem !important;
  background: transparent !important;
  color: #1C1C1E !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  border: 1px solid #D5D5D5 !important;
  border-radius: 4px !important;
  transition: color 0.15s, border-color 0.15s, background 0.15s !important;
}
.artometrics-article-body .art-github-btn:hover {
  background: #FAFAF8 !important;
  border-color: #C0392B !important;
  color: #C0392B !important;
}
.artometrics-article-body .art-chart-toolbar {
  position: absolute !important;
  top: 0.55rem !important;
  right: 0.55rem !important;
  z-index: 4 !important;
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
  gap: 0.35rem !important;
  margin: 0 !important;
  pointer-events: none !important;
}
.artometrics-article-body .art-chart-toolbar__btn {
  pointer-events: auto !important;
  min-height: 36px !important;
  min-width: 36px !important;
  padding: 0.4rem 0.65rem !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.62rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  line-height: 1 !important;
  border: 1px solid rgba(213, 213, 213, 0.9) !important;
  border-radius: 4px !important;
  color: #3A3A3A !important;
  background: rgba(255, 255, 255, 0.94) !important;
  backdrop-filter: blur(4px) !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.3rem !important;
  box-shadow: 0 1px 4px rgba(28, 28, 30, 0.08) !important;
  transition: color 0.15s, border-color 0.15s, background 0.15s !important;
}
.artometrics-article-body .art-chart-toolbar__icon {
  font-size: 0.85rem !important;
  line-height: 1 !important;
}
@media (max-width: 600px) {
  .artometrics-article-body .art-chart-toolbar__label {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  .artometrics-article-body .art-chart-toolbar__btn {
    min-width: 40px !important;
    justify-content: center !important;
    padding: 0.45rem !important;
  }
}
.artometrics-article-body .art-chart-toolbar__btn:hover,
.artometrics-article-body .art-chart-toolbar__btn:focus-visible {
  color: #C0392B !important;
  border-color: #C0392B !important;
  outline: none !important;
}
.art-chart-share-sheet {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  background: rgba(28, 28, 30, 0.55);
}
.art-chart-share-sheet[hidden] {
  display: none !important;
}
.art-chart-share-sheet__panel {
  width: min(100%, 28rem);
  max-height: min(90vh, 640px);
  overflow: auto;
  background: #fff;
  border-radius: 8px 8px 0 0;
  padding: 1.25rem;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.18);
}
@media (min-width: 640px) {
  .art-chart-share-sheet {
    align-items: center;
  }
  .art-chart-share-sheet__panel {
    border-radius: 8px;
  }
}
.art-chart-share-sheet__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #C0392B;
  margin: 0 0 0.75rem;
}
.art-chart-share-sheet__caption {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #1C1C1E;
  margin: 0 0 1rem;
}
.art-chart-share-sheet__preview {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 4px;
  border: 1px solid #D5D5D5;
  margin-bottom: 1rem;
}
.art-chart-share-sheet__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.art-chart-share-sheet__btn {
  min-height: 44px;
  padding: 0.55rem 0.9rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #D5D5D5;
  border-radius: 4px;
  background: #fff;
  color: #3A3A3A;
  cursor: pointer;
}
.art-chart-share-sheet__btn:hover {
  color: #C0392B;
  border-color: #C0392B;
}
.art-chart-share-sheet__btn--primary {
  background: #1C1C1E;
  border-color: #1C1C1E;
  color: #fff;
}
.art-chart-share-sheet__btn--primary:hover {
  background: #C0392B;
  border-color: #C0392B;
  color: #fff;
}
.art-chart-share-sheet__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  min-width: 44px;
  min-height: 44px;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: #6B6B6B;
}
.art-chart-share-sheet__panel-wrap {
  position: relative;
}
`;
  const combined = `${artHead}\n${artCss}\n${siteExtras}`;
  const scoped = scopeCss(combined, ".artometrics-article-body");
  fs.mkdirSync(path.dirname(CSS_OUT), { recursive: true });
  fs.writeFileSync(CSS_OUT, scoped, "utf8");
  console.log(`Wrote ${CSS_OUT}`);
}

function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`No frontmatter in ${filePath}`);
  return match[1];
}

function extractArticleHtml(html) {
  const tocStart = html.indexOf('<nav id="TOC"');
  const scriptStart = html.indexOf('<script id="quarto-html-after-body"');
  if (tocStart === -1 || scriptStart === -1) {
    throw new Error("Could not locate article HTML boundaries");
  }
  const inner = html.slice(tocStart, scriptStart).trim();
  const tocEnd = inner.indexOf("</nav>");
  if (tocEnd === -1) {
    return `<div id="quarto-content">\n${inner}\n</div>`;
  }
  const toc = inner.slice(0, tocEnd + 6);
  const body = inner.slice(tocEnd + 6).trim();
  return `<div id="quarto-content">\n${toc}\n<main class="art-article-main">\n${body}\n</main>\n</div>`;
}

function chartLabel(filename) {
  return filename
    .replace(/\.(png|webp|jpe?g|svg)$/i, "")
    .replace(/^chart\d+[a-z]?[-_]?/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function replaceChartImages(html, chartFiles, baseUrl) {
  let index = 0;

  let out = html.replace(/src="data:image\/[^"]+"/g, () => {
    const file = chartFiles[index++];
    return file ? `src="${baseUrl}/${file}"` : 'src=""';
  });

  out = out.replace(/src="charts\/([^"]+)"/g, (_, file) => {
    return `src="${baseUrl}/${file}"`;
  });

  for (const file of chartFiles) {
    out = out.replace(
      new RegExp(`src="${file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "g"),
      `src="${baseUrl}/${file}"`
    );
  }

  return out;
}

function wrapNativeCharts(html, slug) {
  const dataBase = `/data/articles/${slug}/charts`;

  const toLiveChart = (src, filename, alt) => {
    const jsonName = filename.replace(/\.(png|webp|jpe?g)$/i, ".plotly.json");
    const label = String(alt ?? chartLabel(filename))
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;");
    return `<figure class="art-chart">
  <div class="art-chart-live" data-chart="${dataBase}/${jsonName}" data-fallback="${src}" data-caption="${label}" role="img" aria-label="${label}"></div>
</figure>`;
  };

  html = html.replace(
    /<figure class="art-chart">\s*<img([^>]*?)src="(\/images\/content\/articles\/[^"]+\/charts\/([^"]+))"([^>]*?)>\s*<figcaption>([^<]*)<\/figcaption>\s*<\/figure>/gi,
    (_, _before, src, filename, _after, caption) =>
      toLiveChart(src, filename, caption || chartLabel(filename))
  );

  html = html.replace(
    /<p>\s*<img([^>]*?)src="(\/images\/content\/articles\/[^"]+\/charts\/([^"]+))"([^>]*?)>\s*<\/p>/gi,
    (_, _before, src, filename) => toLiveChart(src, filename, chartLabel(filename))
  );

  html = html.replace(
    /<figure>\s*(<figure class="art-chart">[\s\S]*?<\/figure>)\s*<\/figure>/gi,
    "$1"
  );

  return html;
}

function stripDuplicateGithubButtons(html) {
  return html
    .replace(
      /<p[^>]*>\s*<a[^>]*href="https:\/\/github\.com\/Artometrics\/[^"]+"[^>]*>[\s\S]*?<\/a>\s*<\/p>\s*/gi,
      ""
    )
    .replace(/<a class="art-github-btn"[\s\S]*?<\/a>\s*/gi, "");
}

function htmlToPlainCode(html) {
  return html
    .replace(/<a[^>]*>[\s\S]*?<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildCodeBlock(_lang, _langClass, _blockId, _code) {
  return "";
}

function stripChartCaptions(html) {
  return html.replace(/\s*<figcaption class="art-chart-caption">[\s\S]*?<\/figcaption>/gi, "");
}

function stripCodeBlocks(html) {
  return html
    .replace(/<div class="art-code-block">[\s\S]*?<\/div>/gi, "")
    .replace(
      /<details[^>]*>[\s\S]*?<span class="art-lang-tag[\s\S]*?<\/details>/gi,
      ""
    );
}

function normalizeCodeBlocks(html) {
  let out = html.replace(
    /<details>\s*<summary[^>]*>[\s\S]*?<\/summary>\s*<pre([^>]*)>([\s\S]*?)<\/pre>\s*<\/details>/gi,
    (block, preAttrs, code) => {
      const isChart = /chart\s*\d+\s*code/i.test(block);
      const isLangBlock = /\b(R|Python|SQL)\b/i.test(block);
      if (!isChart && !isLangBlock) return block;

      const langMatch = block.match(/\b(R|Python|SQL)\b/i);
      const lang = langMatch ? langMatch[1].toLowerCase() : "r";
      const langClass =
        lang === "python" ? "art-lang-python" : lang === "sql" ? "art-lang-sql" : "art-lang-r";
      const chartMatch = block.match(/chart\s*(\d+)\s*code/i);
      const chartNum = chartMatch ? chartMatch[1] : "";
      const idMatch = preAttrs.match(/id=["']([^"']+)["']/i);
      const blockId = idMatch?.[1] ?? `art-code-${lang}-${chartNum || "block"}`;

      return buildCodeBlock(
        lang,
        langClass,
        blockId,
        code.trim()
      );
    }
  );

  out = out.replace(
    /<details>\s*<summary>([\s\S]*?)<\/summary>\s*([\s\S]*?)<\/details>/gi,
    (block, summaryInner, bodyInner) => {
      if (block.includes("art-code-block")) return block;
      if (!/art-lang-tag/.test(summaryInner)) return block;

      const isChart = /chart\s*\d+\s*code/i.test(block);
      const langMatch =
        summaryInner.match(/art-lang-(sql|python|r)/i) ||
        summaryInner.match(/\b(SQL|Python|R)\b/i);
      if (!langMatch) return block;

      const lang = langMatch[1].toLowerCase();
      const langClass =
        lang === "python" ? "art-lang-python" : lang === "sql" ? "art-lang-sql" : "art-lang-r";
      const chartMatch = block.match(/chart\s*(\d+)\s*code/i);
      const chartNum = chartMatch ? chartMatch[1] : "";
      const preMatch = bodyInner.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
      if (!preMatch) return block;

      const idMatch = preMatch[0].match(/\bid=["']([^"']+)["']/i);
      const blockId = idMatch?.[1] ?? `art-code-${lang}-${chartNum || "block"}`;
      const code = htmlToPlainCode(preMatch[1]);

      return buildCodeBlock(lang, langClass, blockId, code);
    }
  );

  out = out.replace(
    /<span class="art-code-summary__label">[\s\S]*?<\/span>\s*/gi,
    ""
  );
  out = out.replace(
    /<summary(?: class="art-code-summary")?>\s*(<span class="art-lang-tag[^>]*>[^<]+<\/span>)\s*[\s\S]*?<\/summary>/gi,
    (match, open) =>
      `<summary class="art-code-summary">\n      ${open}\n    </summary>`
  );
  out = out.replace(
    /<button[^>]*class="[^"]*art-copy-btn[^"]*"[^>]*>[\s\S]*?<\/button>/gi,
    ""
  );
  out = out.replace(
    /(<div class="art-code-block">\s*<details)\s+open/gi,
    "$1"
  );

  return out;
}

function normalizeHtml(html) {
  return html
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/View Chart (\d+) code/gi, "View Chart $1 Code")
    .replace(/Chart (\d+) code/gi, "Chart $1 Code")
    .replace(/\u00a0View Chart/g, " View Chart");
}

function wrapEditorialNote(html) {
  return html.replace(
    /(<h2 id="editors-note"[\s\S]*?<\/h2>)([\s\S]*?)(?=\s*<\/main>)/i,
    (_, head, body) => `${head}<div class="art-editorial-note">${body.trim()}</div>`
  );
}

function renderQuarto(repoDir, repo) {
  const htmlPath = path.join(repoDir, `${repo}.html`);
  const qmdPath = path.join(repoDir, `${repo}.qmd`);
  if (!fs.existsSync(qmdPath)) return htmlPath;

  if (shouldRender || !fs.existsSync(htmlPath)) {
    try {
      console.log(`Rendering ${repo}.qmd…`);
      execSync(`quarto render "${qmdPath}" --to html`, {
        cwd: repoDir,
        stdio: "inherit",
      });
    } catch {
      console.warn(`Quarto render failed for ${repo}.qmd`);
    }
  }

  return htmlPath;
}

function collectChartFiles(repoDir) {
  const chartsDir = path.join(repoDir, "charts");
  const fromCharts = fs.existsSync(chartsDir)
    ? fs
        .readdirSync(chartsDir)
        .filter((f) => /\.(png|webp|jpe?g|svg)$/i.test(f))
        .sort()
    : [];

  if (fromCharts.length) return fromCharts;

  return fs
    .readdirSync(repoDir)
    .filter((f) => /^chart\d+.*\.(png|webp|jpe?g|svg)$/i.test(f))
    .sort();
}

function copyChartAssets(repoDir, slug, chartFiles) {
  const chartDest = path.join(PUBLIC, "images/content/articles", slug, "charts");
  fs.mkdirSync(chartDest, { recursive: true });

  for (const file of chartFiles) {
    const srcPath = fs.existsSync(path.join(repoDir, "charts", file))
      ? path.join(repoDir, "charts", file)
      : path.join(repoDir, file);
    fs.copyFileSync(srcPath, path.join(chartDest, file));
  }

  return chartDest;
}

function copyChartJsonSpecs(repoDir, slug) {
  const chartsDir = path.join(repoDir, "charts");
  const jsonDest = path.join(PUBLIC, "data/articles", slug, "charts");
  fs.mkdirSync(jsonDest, { recursive: true });

  let copied = 0;
  const sources = [];

  if (fs.existsSync(chartsDir)) {
    sources.push(
      ...fs
        .readdirSync(chartsDir)
        .filter((f) => f.endsWith(".plotly.json"))
        .map((f) => path.join(chartsDir, f))
    );
  }

  sources.push(
    ...fs
      .readdirSync(repoDir)
      .filter((f) => /^chart\d+.*\.plotly\.json$/i.test(f))
      .map((f) => path.join(repoDir, f))
  );

  for (const srcPath of sources) {
    fs.copyFileSync(srcPath, path.join(jsonDest, path.basename(srcPath)));
    copied++;
  }

  return copied;
}

function copyArticleData(repoDir, slug) {
  const dataDest = path.join(PUBLIC, "data/articles", slug);
  fs.mkdirSync(dataDest, { recursive: true });

  let copied = 0;
  for (const entry of fs.readdirSync(repoDir, { withFileTypes: true })) {
    if (entry.isFile() && /\.csv$/i.test(entry.name)) {
      fs.copyFileSync(
        path.join(repoDir, entry.name),
        path.join(dataDest, entry.name)
      );
      copied++;
    }
  }

  const dataDir = path.join(repoDir, "data");
  if (fs.existsSync(dataDir)) {
    fs.mkdirSync(path.join(dataDest, "data"), { recursive: true });
    for (const entry of fs.readdirSync(dataDir, { withFileTypes: true })) {
      if (entry.isFile()) {
        fs.copyFileSync(
          path.join(dataDir, entry.name),
          path.join(dataDest, "data", entry.name)
        );
        copied++;
      }
    }
  }

  return copied;
}

function extractDescription(html) {
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!match) return null;
  return match[1]
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function updateFrontmatterDescription(frontmatter, description) {
  if (!description) return frontmatter;
  if (!/description:.*coming soon/i.test(frontmatter)) return frontmatter;
  const escaped = description.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return frontmatter.replace(
    /description:.*$/m,
    `description: "${escaped}${description.length >= 200 ? "..." : ""}"`
  );
}

function githubButton(repo) {
  return `
<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/${repo}" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>`;
}

function syncArticle(repo, slug) {
  const repoDir = path.join(CACHE_DIR, repo);
  const htmlPath = renderQuarto(repoDir, repo);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`Skip ${repo}: missing blog file ${slug}.md`);
    return;
  }

  const chartFiles = collectChartFiles(repoDir);
  copyChartAssets(repoDir, slug, chartFiles);
  const jsonFiles = copyChartJsonSpecs(repoDir, slug);
  const dataFiles = copyArticleData(repoDir, slug);

  if (!fs.existsSync(htmlPath)) {
    console.warn(
      `Skip ${repo} body: missing ${repo}.html (copied ${chartFiles.length} charts, ${jsonFiles} plotly specs, ${dataFiles} data files)`
    );
    patchGithubLink(mdPath, repo);
    return;
  }

  const chartBase = `/images/content/articles/${slug}/charts`;
  const rawHtml = fs.readFileSync(htmlPath, "utf8");
  let body = extractArticleHtml(rawHtml);
  body = stripDuplicateGithubButtons(body);
  body = replaceChartImages(body, chartFiles, chartBase);
  body = wrapNativeCharts(body, slug);
  body = normalizeCodeBlocks(body);
  body = stripCodeBlocks(body);
  body = stripChartCaptions(body);
  body = normalizeHtml(body);
  body = wrapEditorialNote(body);
  body = body.replace(/<\/main>/i, `${githubButton(repo)}\n</main>`);

  let frontmatter = parseFrontmatter(mdPath);
  frontmatter = updateFrontmatterDescription(
    frontmatter,
    extractDescription(body)
  );
  fs.writeFileSync(mdPath, `---\n${frontmatter}\n---\n${body}\n`, "utf8");
  console.log(
    `Synced ${slug} (${chartFiles.length} native charts, ${jsonFiles} plotly specs, ${dataFiles} data files)`
  );
}

function patchGithubLink(mdPath, repo) {
  let raw = fs.readFileSync(mdPath, "utf8");
  raw = raw.replace(
    /https:\/\/github\.com\/Artometrics\/[^\s"'<]+/g,
    `https://github.com/Artometrics/${repo}`
  );
  if (!raw.includes("github.com/Artometrics")) {
    raw = raw.replace(/\n---\n([\s\S]*)$/, (match, body) => {
      return `\n---\n${body.trim()}\n${githubButton(repo)}\n`;
    });
  }
  fs.writeFileSync(mdPath, raw, "utf8");
}

function normalizeLocalArticles() {
  for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
    const mdPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(mdPath, "utf8");
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) continue;
    let body = match[2];
    body = normalizeCodeBlocks(body);
    body = stripCodeBlocks(body);
    body = stripChartCaptions(body);
    body = normalizeHtml(body);
    fs.writeFileSync(mdPath, `---\n${match[1]}\n---\n${body}`, "utf8");
    console.log(`Normalized ${file}`);
  }
}

if (process.argv.includes("--normalize-local")) {
  writeArticleCss();
  normalizeLocalArticles();
  console.log("Done.");
  process.exit(0);
}

if (shouldClone || !fs.existsSync(CACHE_DIR)) {
  cloneRepos();
}

writeArticleCss();

for (const [repo, slug] of Object.entries(REPO_MAP)) {
  syncArticle(repo, slug);
}

console.log("Done.");
