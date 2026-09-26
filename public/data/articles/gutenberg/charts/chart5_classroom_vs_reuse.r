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


chart5 <- tibble(
  work = c(
    "Pride and Prejudice", "Sherlock Holmes", "Dracula", "Frankenstein",
    "Moby-Dick", "Alice", "Tom Sawyer", "War and Peace"
  ),
  classroom = c(92, 78, 69, 82, 74, 71, 64, 88),
  reuse = c(76, 95, 93, 91, 58, 88, 70, 61),
  highlight = work %in% c("Sherlock Holmes", "Dracula", "Frankenstein")
)

p5 <- ggplot(chart5, aes(x = classroom, y = reuse, color = highlight)) +
  geom_point(size = 3.6) +
  geom_text(aes(label = work), hjust = -0.12, vjust = 0.35, size = 2.8, show.legend = FALSE) +
  scale_color_manual(values = c("TRUE" = ART_HIGHLIGHT, "FALSE" = ART_BLUE), guide = "none") +
  scale_x_continuous(expand = expansion(mult = c(0.05, 0.2))) +
  labs(
    title = "Canon has school and remix versions",
    subtitle = "SOME BOOKS BECOME CURRICULUM, OTHERS BECOME MONSTERS",
    x = "Classroom canon index",
    y = "Pop reuse index"
  ) +
  theme_gutenberg()

save_png(p5, "chart5_classroom_vs_reuse", height = 6.5)

fig5 <- plot_ly(
  chart5,
  x = ~classroom,
  y = ~reuse,
  text = ~work,
  type = "scatter",
  mode = "markers",
  marker = list(
    size = 18,
    color = ~if_else(highlight, ART_HIGHLIGHT, ART_BLUE)
  ),
  hovertemplate = "<b>%{text}</b><br>Classroom canon: %{x}<br>Pop reuse index: %{y}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "Canon has school and remix versions",
    "SOME BOOKS BECOME CURRICULUM, OTHERS BECOME MONSTERS",
    x_title = "Classroom canon index",
    y_title = "Pop reuse index"
  )

cat("All gutenberg R charts exported to", charts_dir, "and synced to public/\n")
