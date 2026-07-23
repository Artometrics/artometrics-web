#!/usr/bin/env node
/**
 * Build a print-oriented PDF for one blog slug.
 * Prefers pandoc; falls back to weasyprint when pandoc/pdf engine missing.
 *
 * Usage: npm run cos:pdf -- --slug readmitted
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");
const slug = slugIdx >= 0 ? args[slugIdx + 1] : null;

if (!slug) {
  console.error("Usage: npm run cos:pdf -- --slug <slug>");
  process.exit(1);
}

const mdPath = path.join(ROOT, "src/content/blog", `${slug}.md`);
if (!fs.existsSync(mdPath)) {
  console.error(`Missing ${mdPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(mdPath, "utf8");
const { data, content } = matter(raw);
const title = data.title || slug;
const outDir = path.join(ROOT, "public/exports");
const outPdf = path.join(outDir, `${slug}.pdf`);
const tmpHtml = path.join("/tmp", `artometrics-${slug}.html`);
fs.mkdirSync(outDir, { recursive: true });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)} — Artometrics</title>
<link rel="stylesheet" href="file://${path.join(ROOT, "public/css/artometrics-article.css")}" />
<style>
  body { max-width: 720px; margin: 2rem auto; padding: 0 1.25rem; }
  img, .art-chart-fallback { max-width: 100%; height: auto; }
  .art-chart-mode-switch, .art-chart-toolbar { display: none !important; }
  @page { margin: 18mm 14mm; }
</style>
</head>
<body class="artometrics-article-body">
  <h1>${escapeHtml(title)}</h1>
  ${content}
</body>
</html>`;

fs.writeFileSync(tmpHtml, html, "utf8");

function which(bin) {
  const r = spawnSync("bash", ["-lc", `command -v ${bin}`], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : "";
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

let ok = false;

if (which("pandoc") && (which("weasyprint") || which("wkhtmltopdf") || which("prince"))) {
  const engine = which("weasyprint")
    ? "weasyprint"
    : which("wkhtmltopdf")
      ? "wkhtmltopdf"
      : "prince";
  const r = spawnSync(
    "pandoc",
    [tmpHtml, "-f", "html", "-t", "pdf", `--pdf-engine=${engine}`, "-o", outPdf],
    { stdio: "inherit" },
  );
  ok = r.status === 0 && fs.existsSync(outPdf);
}

if (!ok && which("python3")) {
  const py = `
from pathlib import Path
try:
  from weasyprint import HTML
except Exception as e:
  raise SystemExit(f"weasyprint unavailable: {e}")
HTML(filename=${JSON.stringify(tmpHtml)}).write_pdf(${JSON.stringify(outPdf)})
print("wrote", ${JSON.stringify(outPdf)})
`;
  const r = spawnSync("python3", ["-c", py], { stdio: "inherit" });
  ok = r.status === 0 && fs.existsSync(outPdf);
}

if (!ok) {
  console.error(
    "Could not build PDF. Install pandoc + weasyprint (npm run setup:pipeline) and retry.",
  );
  process.exit(1);
}

console.log(`PDF → ${path.relative(ROOT, outPdf)}`);
console.log("Tip: npm run cos:downloads  # refresh download manifests");
