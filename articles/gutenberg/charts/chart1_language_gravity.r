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


chart1 <- tibble(
  language = c("English", "French", "German", "Finnish", "Dutch", "Portuguese", "Italian", "Spanish"),
  share = c(72, 7, 6, 3, 3, 2, 2, 2),
  color = if_else(language == "English", ART_HIGHLIGHT, ART_BLUE)
) %>%
  mutate(language = fct_reorder(language, share))

p1 <- ggplot(chart1, aes(x = share, y = language, fill = color)) +
  geom_col(width = 0.72, color = NA) +
  scale_fill_identity() +
  labs(
    title = "The public-domain shelf is language-weighted",
    subtitle = "ENGLISH DOMINATES THE ACCESSIBLE CANON",
    x = "Catalog share index",
    y = NULL
  ) +
  theme_gutenberg()

save_png(p1, "chart1_language_gravity", height = 6)

fig1 <- plot_ly(
  chart1,
  x = ~share,
  y = ~language,
  type = "bar",
  orientation = "h",
  marker = list(color = ~color, line = list(color = ART_DARK, width = 0.4)),
  hovertemplate = "<b>%{y}</b><br>Catalog share index: %{x}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "The public-domain shelf is language-weighted",
    "ENGLISH DOMINATES THE ACCESSIBLE CANON",
    x_title = "Catalog share index"
  )
