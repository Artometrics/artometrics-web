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


chart2 <- read_csv(
  file.path(data_dir, "chart2_leto_slate_ratios.csv"),
  show_col_types = FALSE
) %>%
  mutate(
    title = fct_reorder(title, ratio),
    bar_color = if_else(below_breakeven, ART_HIGHLIGHT, ART_BLUE)
  )

p2 <- ggplot(chart2, aes(x = title, y = ratio)) +
  geom_hline(yintercept = 1, linetype = "dashed", color = ART_BLACK, linewidth = 0.7) +
  geom_col(aes(fill = bar_color), width = 0.62, show.legend = FALSE) +
  scale_fill_identity() +
  geom_text(
    aes(label = paste0(ratio, "x")),
    vjust = -0.35,
    size = 3.4,
    color = ART_DARK,
    family = FONT,
    fontface = "bold"
  ) +
  annotate(
    "text",
    x = 0.6,
    y = 1.08,
    label = "Breakeven (1.0x)",
    color = ART_MID,
    size = 3,
    family = FONT
  ) +
  scale_y_continuous(
    limits = c(0, 2.35),
    expand = expansion(mult = c(0, 0.05))
  ) +
  labs(
    title = "Six-film Jared Leto slate: <span style='color:#C0392B;'>worldwide gross</span> ÷ reported budget",
    subtitle = "Three titles at or below breakeven — no merchandise layer underneath",
    x = NULL,
    y = "Gross ÷ budget multiple"
  ) +
  theme_white() +
  theme(
    axis.text.x = element_text(angle = 35, hjust = 1, size = rel(0.72)),
    panel.grid.major.x = element_blank()
  )

p2 <- finish_art_chart(
  p2,
  takeaway = "Half this slate lands at or below 1.0x — concentrated theatrical exposure",
  source = LETO_SOURCE
)
save_png(p2, "chart2_leto_slate_ratios", height = 6.2)

fig2 <- plot_ly() %>%
  add_trace(
    data = chart2,
    x = ~title,
    y = ~ratio,
    type = "bar",
    marker = list(color = ~bar_color, line = list(width = 0)),
    text = ~paste0(ratio, "x"),
    textposition = "outside",
    hovertemplate = "<b>%{x}</b><br>%{y}x gross ÷ budget<extra></extra>",
    name = "Gross ÷ budget"
  ) %>%
  add_trace(
    x = chart2$title,
    y = rep(1, nrow(chart2)),
    type = "scatter",
    mode = "lines",
    line = list(color = ART_BLACK, width = 1.5, dash = "dash"),
    hoverinfo = "skip",
    name = "Breakeven (1.0x)",
    showlegend = TRUE
  ) %>%
  plotly_chrome(
    title = "Six-film Jared Leto slate: worldwide gross ÷ reported budget",
    subtitle = "Case-study slate — trade-reported budgets",
    takeaway = "Half this slate lands at or below 1.0x — concentrated theatrical exposure",
    source = LETO_SOURCE,
    margin = list(l = 60, r = 30, t = 110, b = 120)
  ) %>%
  layout(
    yaxis = list(title = "Gross ÷ budget multiple", range = c(0, 2.4)),
    xaxis = list(title = "", tickangle = -35),
    legend = list(orientation = "h", y = -0.35, x = 0)
  )
