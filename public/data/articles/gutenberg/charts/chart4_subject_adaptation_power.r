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


chart4 <- tibble(
  subject = c("Adventure", "Manners", "Gothic", "Science", "War", "Travel", "Religion", "Children"),
  power = c(88, 72, 81, 66, 76, 63, 54, 84),
  color = if_else(subject %in% c("Adventure", "Children"), ART_HIGHLIGHT, ART_BLUE)
)

p4 <- ggplot(chart4, aes(x = subject, y = power, fill = color)) +
  geom_col(width = 0.72, color = NA) +
  scale_fill_identity() +
  labs(
    title = "Some public-domain subjects adapt better",
    subtitle = "ADVENTURE AND CHILDHOOD TRAVEL CLEANLY",
    x = "Subject family",
    y = "Adaptation power index"
  ) +
  theme_gutenberg() +
  theme(axis.text.x = element_text(angle = 35, hjust = 1))

save_png(p4, "chart4_subject_adaptation_power", height = 6)

fig4 <- plot_ly(
  chart4,
  x = ~subject,
  y = ~power,
  type = "bar",
  marker = list(color = ~color, line = list(color = ART_DARK, width = 0.4)),
  hovertemplate = "<b>%{x}</b><br>Adaptation power index: %{y}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "Some public-domain subjects adapt better",
    "ADVENTURE AND CHILDHOOD TRAVEL CLEANLY",
    x_title = "Subject family",
    y_title = "Adaptation power index"
  )
