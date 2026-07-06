# Build and export franchise Plotly charts (native spec — exact Artometrics style).
# Usage: Rscript scripts/render-franchise-charts.R

suppressPackageStartupMessages({
  library(tidyverse)
  library(plotly)
})

repo_root <- Sys.getenv("FRANCHISE_REPO", unset = normalizePath("franchise", mustWork = FALSE))
if (!dir.exists(repo_root)) stop("Franchise repo directory not found: ", repo_root)

source(file.path(repo_root, "scripts/r/franchise_theme.R"))
source(file.path(repo_root, "scripts/r/plotly_charts.R"))

charts_dir <- file.path(repo_root, "charts")
site_charts_dir <- file.path(dirname(repo_root), "public/data/articles/franchise/charts")
site_img_dir <- file.path(dirname(repo_root), "public/images/content/articles/franchise/charts")

media_franchises <- readr::read_csv(
  file.path(repo_root, "data/media_franchises.csv"),
  show_col_types = FALSE
)

franchises <- media_franchises %>%
  group_by(franchise, original_media, year_created, creators, owners) %>%
  summarize(
    categories = length(revenue),
    total_revenue = sum(revenue),
    .groups = "drop"
  )

copy_outputs <- function(filename) {
  json_from <- file.path(charts_dir, paste0(filename, ".plotly.json"))
  png_from <- file.path(charts_dir, paste0(filename, ".png"))
  if (dir.exists(site_charts_dir) && file.exists(json_from)) {
    file.copy(json_from, file.path(site_charts_dir, paste0(filename, ".plotly.json")), overwrite = TRUE)
  }
  if (file.exists(png_from)) {
    if (dir.exists(site_charts_dir)) {
      file.copy(png_from, file.path(site_charts_dir, paste0(filename, ".png")), overwrite = TRUE)
    }
    if (dir.exists(site_img_dir)) {
      file.copy(png_from, file.path(site_img_dir, paste0(filename, ".png")), overwrite = TRUE)
    }
  }
}

export_plotly <- function(widget, filename) {
  save_franchise_plotly(widget, filename, charts_dir)
  copy_outputs(filename)
  message("Wrote ", filename)
}

export_plotly(build_chart1_plotly(media_franchises, franchises), "chart1_top20_revenue")
export_plotly(build_chart2_plotly(franchises), "chart2_revenue_per_year")
export_plotly(build_chart3a_plotly(media_franchises), "chart3a_disney_non_consolidated")
export_plotly(build_chart3b_plotly(media_franchises), "chart3b_disney_consolidated")

message("Done — charts in ", charts_dir)
