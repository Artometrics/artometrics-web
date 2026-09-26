# Artometrics — reproducible R chart snippet
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


eras <- c("Pre-1800", "1800-1849", "1850-1899", "1900-1924", "1925-1949", "1950+")
chart2 <- tibble(
  era = eras,
  fiction = c(22, 48, 86, 74, 34, 18),
  nonfiction = c(61, 58, 64, 72, 52, 29)
)

p2 <- chart2 %>%
  pivot_longer(c(fiction, nonfiction), names_to = "series", values_to = "index") %>%
  mutate(series = recode(series, fiction = "Fiction/literature", nonfiction = "Nonfiction/reference")) %>%
  ggplot(aes(x = era, y = index, color = series, group = series)) +
  geom_line(linewidth = 1.1) +
  geom_point(size = 2.8) +
  scale_color_manual(values = c("Fiction/literature" = ART_HIGHLIGHT, "Nonfiction/reference" = ART_BLUE)) +
  labs(
    title = "Public domain is an era machine",
    subtitle = "THE 19TH CENTURY BECOMES THE LITERARY CORE",
    x = "Publication era",
    y = "Subject presence index",
    color = NULL
  ) +
  theme_gutenberg() +
  theme(legend.position = "top")

save_png(p2, "chart2_era_subject_stack", height = 6)

fig2 <- plot_ly() %>%
  add_trace(
    x = eras, y = chart2$fiction, type = "scatter", mode = "lines+markers",
    name = "Fiction/literature",
    line = list(color = ART_HIGHLIGHT, width = 3),
    marker = list(size = 8, color = ART_HIGHLIGHT),
    hovertemplate = "<b>%{x}</b><br>Fiction/literature index: %{y}<extra></extra>"
  ) %>%
  add_trace(
    x = eras, y = chart2$nonfiction, type = "scatter", mode = "lines+markers",
    name = "Nonfiction/reference",
    line = list(color = ART_BLUE, width = 3),
    marker = list(size = 8, color = ART_BLUE),
    hovertemplate = "<b>%{x}</b><br>Nonfiction/reference index: %{y}<extra></extra>"
  ) %>%
  plotly_gutenberg_layout(
    "Public domain is an era machine",
    "THE 19TH CENTURY BECOMES THE LITERARY CORE",
    x_title = "Publication era",
    y_title = "Subject presence index",
    show_legend = TRUE
  )
