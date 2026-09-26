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


chart3 <- read_csv(
  file.path(data_dir, "chart3_scale_comparison.csv"),
  show_col_types = FALSE
) %>%
  mutate(
    label = fct_reorder(label, value_millions),
    bar_color = case_when(
      color_role == "highlight" ~ ART_HIGHLIGHT,
      color_role == "secondary" ~ ART_BLUE,
      TRUE ~ ART_BLACK
    ),
    text_label = case_when(
      value_millions >= 1000 ~ paste0("$", comma(value_millions), "M"),
      TRUE ~ paste0("$", value_millions, "M")
    )
  )

p3 <- ggplot(chart3, aes(x = value_millions, y = label)) +
  geom_col(aes(fill = bar_color), width = 0.62, show.legend = FALSE) +
  scale_fill_identity() +
  geom_text(
    aes(label = text_label),
    hjust = -0.08,
    size = 3.5,
    color = ART_DARK,
    family = FONT,
    fontface = "bold"
  ) +
  scale_x_log10(
    labels = function(x) paste0("$", comma(x), "M"),
    expand = expansion(mult = c(0.05, 0.25))
  ) +
  labs(
    title = "IP-franchise scale vs. <span style='color:#C0392B;'>single-title</span> scale",
    subtitle = "US dollars, millions (log axis) — different orders of magnitude, not one curve",
    x = "US dollars, millions (log scale)",
    y = NULL
  ) +
  theme_white() +
  theme(panel.grid.major.y = element_blank())

p3 <- finish_art_chart(
  p3,
  takeaway = "Pokémon's $91B lifetime total dwarfs a median film or a single blockbuster budget",
  source = SCALE_SOURCE
)
save_png(p3, "chart3_scale_comparison", height = 5.6)

fig3 <- plot_ly(
  chart3,
  x = ~value_millions,
  y = ~label,
  type = "bar",
  orientation = "h",
  marker = list(color = ~bar_color, line = list(width = 0)),
  text = ~text_label,
  textposition = "outside",
  hovertemplate = "<b>%{y}</b><extra></extra>",
  name = "Scale ($M, log axis)"
) %>%
  plotly_chrome(
    title = "IP-franchise scale vs. single-title scale ($M, log axis)",
    subtitle = "Pokémon lifetime revenue vs median film vs largest case-study budget",
    takeaway = "Pokémon's $91B lifetime total dwarfs a median film or a single blockbuster budget",
    source = SCALE_SOURCE,
    margin = list(l = 320, r = 70, t = 110, b = 90)
  ) %>%
  layout(
    xaxis = list(title = "US dollars, millions (log scale)", type = "log"),
    yaxis = list(title = "", categoryorder = "array", categoryarray = as.character(chart3$label)),
    showlegend = FALSE
  )

message("Done — charts synced to public/images and public/data for ", slug)
