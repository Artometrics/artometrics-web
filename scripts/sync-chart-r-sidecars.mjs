#!/usr/bin/env node
/**
 * Extract per-chart R snippets from render scripts into chart .r sidecars + public mirror.
 * Convention: data-chart …/chartN.plotly.json → fetch …/chartN.r for Copy R toolbar.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const PREAMBLES = {
  readmitted: `# Artometrics — reproducible R chart snippet
# Run from the artometrics-web repository root (save as scripts/chart-snippet.R or run via Rscript).
# Requires: tidyverse, scales, plotly, jsonlite, ragg

suppressPackageStartupMessages({
  library(tidyverse)
  library(scales)
  library(plotly)
  library(jsonlite)
})

script_dir <- tryCatch(
  dirname(normalizePath(sub(
    "^--file=", "",
    commandArgs(trailingOnly = FALSE)[grep("^--file=", commandArgs(trailingOnly = FALSE))][1]
  ))),
  error = function(e) getwd()
)
repo_root <- normalizePath(file.path(script_dir, ".."))
source(file.path(repo_root, "scripts/r/artometrics_theme.R"))
art_init_fonts(repo_root)

ART_CREAM <<- "#F2F0EB"
article_dir <- file.path(repo_root, "articles/readmitted")
data_dir <- file.path(article_dir, "data")
charts_dir <- file.path(article_dir, "charts")
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)
NAT_AVG_PCT <- 48.1
HRRP_SOURCE <- "Source: CMS Hospital Readmissions Reduction Program (HRRP), FY2025 supplemental data (Dataset 9n3s-kdb3)"
FONT <- "Helvetica"

write_plotly_json <- function(fig, path) {
  built <- plotly_build(fig)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = art_plotly_config()
  )
  write_json(payload, path, auto_unbox = TRUE, pretty = TRUE, null = "null", na = "null")
}

save_png <- function(plot_obj, name, height = 7) {
  path <- file.path(charts_dir, paste0(name, ".png"))
  ggsave(
    filename = path,
    plot = plot_obj,
    width = 12,
    height = height,
    dpi = 300,
    bg = ART_CREAM,
    device = ragg::agg_png
  )
  invisible(path)
}

`,
  poison: `# Artometrics — reproducible R chart snippet
# Run from the artometrics-web repository root.
# Requires: tidyverse, scales, plotly, jsonlite, ragg

suppressPackageStartupMessages({
  library(tidyverse)
  library(scales)
  library(plotly)
  library(jsonlite)
})

script_dir <- tryCatch(
  dirname(normalizePath(sub(
    "^--file=", "",
    commandArgs(trailingOnly = FALSE)[grep("^--file=", commandArgs(trailingOnly = FALSE))][1]
  ))),
  error = function(e) getwd()
)
repo_root <- normalizePath(file.path(script_dir, ".."))
source(file.path(repo_root, "scripts/r/artometrics_theme.R"))
art_init_fonts(repo_root)

ART_PAGE <<- "#FFFFFF"
ART_CREAM <<- "#FFFFFF"
ART_BLUE <<- "#1B4F8A"
ART_BLACK <<- "#000000"
FONT <- "Helvetica"
slug <- "poison"
article_dir <- file.path(repo_root, "articles", slug)
data_dir <- file.path(article_dir, "data")
charts_dir <- file.path(article_dir, "charts")
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)

FRANCHISE_SOURCE <- "Data: TidyTuesday / Box Office Mojo — ARTOMETRICS"
LETO_SOURCE <- "Data: Box Office Mojo trade-reported budgets — ARTOMETRICS"
SCALE_SOURCE <- "Data: Artometrics franchise + horror-tagged box-office reports — ARTOMETRICS"

wordmark_family <- function() {
  if (art_has_chomsky()) "Chomsky" else "Georgia, serif"
}

save_png <- function(plot_obj, name, height = 7) {
  path <- file.path(charts_dir, paste0(name, ".png"))
  ggsave(
    filename = path,
    plot = plot_obj,
    width = 12,
    height = height,
    dpi = 300,
    bg = ART_PAGE,
    device = ragg::agg_png
  )
  invisible(path)
}

write_plotly_json <- function(fig, path) {
  built <- plotly_build(fig)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = art_plotly_config()
  )
  write_json(payload, path, auto_unbox = TRUE, pretty = TRUE, null = "null", na = "null")
}

`,
  gutenberg: `# Artometrics — reproducible R chart snippet
# Run from the artometrics-web repository root.
# Requires: tidyverse, scales, plotly, jsonlite, ragg

suppressPackageStartupMessages({
  library(tidyverse)
  library(scales)
  library(plotly)
  library(jsonlite)
})

script_dir <- tryCatch(
  dirname(normalizePath(sub(
    "^--file=", "",
    commandArgs(trailingOnly = FALSE)[grep("^--file=", commandArgs(trailingOnly = FALSE))][1]
  ))),
  error = function(e) getwd()
)
repo_root <- normalizePath(file.path(script_dir, ".."))
source(file.path(repo_root, "scripts/r/artometrics_theme.R"))
art_init_fonts(repo_root)

ART_CREAM <<- "#F2F0EB"
ART_BLUE <<- "#2C3E6B"
FONT <- "Helvetica"
slug <- "gutenberg"
article_dir <- file.path(repo_root, "articles", slug)
charts_dir <- file.path(article_dir, "charts")
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)

GUTENBERG_SOURCE <- "Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS"

write_plotly_json <- function(fig, path) {
  built <- plotly_build(fig)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = art_plotly_config()
  )
  write_json(payload, path, auto_unbox = TRUE, pretty = TRUE, null = "null", na = "null")
}

save_png <- function(plot_obj, name, height = 7) {
  path <- file.path(charts_dir, paste0(name, ".png"))
  ggsave(
    filename = path,
    plot = plot_obj,
    width = 12,
    height = height,
    dpi = 300,
    bg = ART_CREAM,
    device = ragg::agg_png
  )
  invisible(path)
}

`,
};

const JOBS = [
  {
    slug: "readmitted",
    renderScript: "scripts/render-readmitted-charts.R",
    preambleKey: "readmitted",
  },
  {
    slug: "poison",
    renderScript: "scripts/render-franchise-poison-charts.R",
    preambleKey: "poison",
  },
  {
    slug: "gutenberg",
    renderScript: "scripts/render-gutenberg-charts.R",
    preambleKey: "gutenberg",
  },
];

function extractChartSections(source) {
  const lines = source.split("\n");
  const sections = [];
  let i = 0;
  while (i < lines.length) {
    if (!/^# ── Chart/.test(lines[i])) {
      i += 1;
      continue;
    }
    const start = i;
    i += 1;
    let name = null;
    const body = [];
    while (i < lines.length && !/^# ── Chart/.test(lines[i])) {
      const copyMatch = lines[i].match(/copy_to_public\(\s*"([^"]+)"/);
      if (copyMatch) name = copyMatch[1];
      if (
        !/^\s*copy_to_public\(/.test(lines[i]) &&
        !/^\s*write_plotly_json\(/.test(lines[i])
      ) {
        body.push(lines[i]);
      }
      i += 1;
    }
    if (name) {
      sections.push({ name, body: body.join("\n").trim() });
    } else {
      i = start + 1;
    }
  }
  return sections;
}

function writeSidecar(slug, name, text) {
  const articlePath = path.join(ROOT, "articles", slug, "charts", `${name}.r`);
  const publicPath = path.join(
    ROOT,
    "public/data/articles",
    slug,
    "charts",
    `${name}.r`,
  );
  fs.mkdirSync(path.dirname(articlePath), { recursive: true });
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(articlePath, text, "utf8");
  fs.writeFileSync(publicPath, text, "utf8");
  return { articlePath, publicPath };
}

let total = 0;
for (const job of JOBS) {
  const scriptPath = path.join(ROOT, job.renderScript);
  const source = fs.readFileSync(scriptPath, "utf8");
  const preamble = PREAMBLES[job.preambleKey];
  const sections = extractChartSections(source);
  for (const { name, body } of sections) {
    const text = `${preamble}\n${body}\n`;
    const paths = writeSidecar(job.slug, name, text);
    console.log("Wrote", paths.publicPath);
    total += 1;
  }
}

console.log(`Done — ${total} chart R sidecars.`);
