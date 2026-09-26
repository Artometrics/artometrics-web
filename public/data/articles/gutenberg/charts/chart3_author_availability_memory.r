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


chart3 <- tibble(
  author = c("Dickens", "Twain", "Austen", "Doyle", "Dumas", "Shakespeare", "Verne", "Tolstoy", "Woolf", "Poe"),
  availability = c(95, 91, 82, 88, 84, 96, 83, 78, 72, 86),
  memory = c(91, 88, 92, 85, 78, 99, 81, 94, 83, 87),
  highlight = author %in% c("Shakespeare", "Austen", "Dickens")
)

p3 <- ggplot(chart3, aes(x = availability, y = memory, color = highlight)) +
  geom_point(size = 3.6) +
  geom_text(aes(label = author), hjust = -0.15, vjust = 0.35, size = 3, show.legend = FALSE) +
  scale_color_manual(values = c("TRUE" = ART_HIGHLIGHT, "FALSE" = ART_BLUE), guide = "none") +
  scale_x_continuous(expand = expansion(mult = c(0.05, 0.18))) +
  labs(
    title = "Availability and memory reinforce each other",
    subtitle = "PUBLIC DOMAIN TURNS AUTHORS INTO INFRASTRUCTURE",
    x = "Digital availability index",
    y = "Cultural memory index"
  ) +
  theme_gutenberg()

save_png(p3, "chart3_author_availability_memory", height = 6.5)

fig3 <- plot_ly(
  chart3,
  x = ~availability,
  y = ~memory,
  text = ~author,
  type = "scatter",
  mode = "markers",
  marker = list(
    size = 22,
    color = ~if_else(highlight, ART_HIGHLIGHT, ART_BLUE)
  ),
  hovertemplate = "<b>%{text}</b><br>Digital availability index: %{x}<br>Cultural memory index: %{y}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "Availability and memory reinforce each other",
    "PUBLIC DOMAIN TURNS AUTHORS INTO INFRASTRUCTURE",
    x_title = "Digital availability index",
    y_title = "Cultural memory index"
  )
