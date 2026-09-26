#!/usr/bin/env Rscript
# Export beyonce charts (PNG + Plotly JSON).
# Usage: Rscript scripts/render-beyonce-psychonomics-charts.R

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

slug <- "beyonce"
article_dir <- file.path(repo_root, "articles", slug)
data_dir <- file.path(article_dir, "data")
charts_dir <- file.path(article_dir, "charts")
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)

public_img <- file.path(repo_root, "public/images/content/articles", slug, "charts")
public_data <- file.path(repo_root, "public/data/articles", slug, "charts")
dir.create(public_img, recursive = TRUE, showWarnings = FALSE)
dir.create(public_data, recursive = TRUE, showWarnings = FALSE)

CHART2_SOURCE <- "Data: Billboard Hot 200 chart history; Rolling Stone 500 Greatest Albums (2020 edition) — ARTOMETRICS"
CHART2_TAKEAWAY <- "Self-titled ran 186 weeks on Billboard; Lemonade ranks #32 on the RS 500 list"
CHART2_TITLE <- "The economic fingerprint"
CHART2_SUBTITLE <- "Billboard weeks versus Rolling Stone 500 rank — Beyoncé albums in the Artometrics RS extract"

wordmark_family <- function() {
  if (art_has_chomsky()) "Chomsky" else "Georgia, serif"
}

write_plotly_json <- function(fig, path) {
  built <- plotly_build(fig)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = art_plotly_config()
  )
  write_json(payload, path, auto_unbox = TRUE, pretty = TRUE, null = "null", na = "null")
  message("Wrote ", path)
}

copy_to_public <- function(name) {
  file.copy(
    file.path(charts_dir, paste0(name, ".png")),
    file.path(public_img, paste0(name, ".png")),
    overwrite = TRUE
  )
  file.copy(
    file.path(charts_dir, paste0(name, ".plotly.json")),
    file.path(public_data, paste0(name, ".plotly.json")),
    overwrite = TRUE
  )
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
    device = if (requireNamespace("ragg", quietly = TRUE)) ragg::agg_png else "png"
  )
  message("Wrote ", path)
  invisible(path)
}

plotly_chrome <- function(fig, title, subtitle, takeaway, source, margin = list(l = 70, r = 70, t = 110, b = 90)) {
  layout(
    fig,
    title = list(
      text = paste0(
        "<b>", title, "</b>",
        "<br><span style='font-size:12px;color:", ART_MID, "'>", subtitle, "</span>"
      ),
      x = 0,
      xanchor = "left"
    ),
    paper_bgcolor = ART_PAGE,
    plot_bgcolor = ART_PAGE,
    font = list(family = FONT, color = ART_DARK, size = 12),
    margin = margin,
    annotations = list(
      list(
        x = 0, y = 1.14, xref = "paper", yref = "paper",
        text = paste0("<b>", takeaway, "</b>"),
        showarrow = FALSE, xanchor = "left", align = "left",
        font = list(size = 11, color = "#FFFFFF"),
        bgcolor = ART_HIGHLIGHT,
        borderpad = 6
      ),
      list(
        x = 0, y = -0.22, xref = "paper", yref = "paper",
        text = art_caption(source),
        showarrow = FALSE, xanchor = "left",
        font = list(size = 9, color = ART_MID)
      ),
      list(
        x = 0.99, y = -0.22, xref = "paper", yref = "paper",
        text = "Artometrics",
        showarrow = FALSE, xanchor = "right",
        font = list(size = 12, color = ART_DARK, family = wordmark_family())
      )
    )
  )
}

theme_white <- function() {
  theme_artometrics() +
    theme(
      plot.background = element_rect(fill = ART_PAGE, color = NA),
      panel.background = element_rect(fill = ART_PAGE, color = NA),
      panel.grid.major = element_line(color = "#E8E8E8", linewidth = 0.35),
      axis.title.y.right = element_text(color = ART_BLUE, size = rel(0.82)),
      axis.text.y.right = element_text(color = ART_BLUE, size = rel(0.78))
    )
}

# ── Chart 2: Economic fingerprint (dual axis) ─────────────────────────────────

chart2 <- read_csv(
  file.path(data_dir, "chart2_economic_fingerprint.csv"),
  show_col_types = FALSE
) %>%
  mutate(
    album_label = paste0(album, "\n(", release_year, ")"),
    album_label = fct_inorder(album_label),
    bar_color = if_else(album == "Self-titled", ART_HIGHLIGHT, ART_BLACK)
  )

weeks_max <- max(chart2$weeks_on_billboard, na.rm = TRUE)
rank_max <- max(chart2$rs500_rank_2020, na.rm = TRUE)
rank_scale <- weeks_max / rank_max

p2_base <- ggplot(chart2, aes(x = album_label)) +
  geom_col(
    aes(y = weeks_on_billboard, fill = bar_color),
    width = 0.52,
    show.legend = FALSE
  ) +
  geom_text(
    aes(y = weeks_on_billboard, label = weeks_on_billboard),
    vjust = -0.35,
    size = 4.2,
    fontface = "bold",
    color = ART_DARK,
    family = FONT
  ) +
  geom_line(
    aes(y = rs500_rank_2020 * rank_scale, group = 1),
    color = ART_BLUE,
    linewidth = 1.1
  ) +
  geom_point(
    aes(y = rs500_rank_2020 * rank_scale),
    color = ART_BLUE,
    size = 4.5
  ) +
  geom_text(
    aes(y = rs500_rank_2020 * rank_scale, label = paste0("#", rs500_rank_2020)),
    vjust = -1.1,
    size = 3.6,
    fontface = "bold",
    color = ART_BLUE,
    family = FONT
  ) +
  scale_fill_identity() +
  scale_y_continuous(
    name = "Weeks on Billboard Hot 200",
    expand = expansion(mult = c(0, 0.14)),
    sec.axis = sec_axis(
      ~ . / rank_scale,
      name = "Rolling Stone 500 rank (2020)",
      breaks = chart2$rs500_rank_2020
    )
  ) +
  labs(
    title = CHART2_TITLE,
    subtitle = CHART2_SUBTITLE,
    x = NULL
  ) +
  theme_white() +
  theme(
    panel.grid.major.x = element_blank(),
    axis.title.x = element_blank()
  )

p2 <- finish_art_chart(
  p2_base,
  takeaway = CHART2_TAKEAWAY,
  source = CHART2_SOURCE
)
save_png(p2, "chart2_economic_fingerprint", height = 6.2)

fig2 <- plot_ly(chart2, x = ~album_label) %>%
  add_bars(
    y = ~weeks_on_billboard,
    name = "Billboard weeks",
    marker = list(color = ~bar_color, line = list(width = 0)),
    text = ~weeks_on_billboard,
    textposition = "outside",
    hovertemplate = paste0(
      "<b>%{x}</b><br>Weeks on Billboard: %{y}<extra></extra>"
    )
  ) %>%
  add_trace(
    y = ~rs500_rank_2020,
    type = "scatter",
    mode = "lines+markers+text",
    name = "RS 500 rank",
    yaxis = "y2",
    line = list(color = ART_BLUE, width = 2.5),
    marker = list(color = ART_BLUE, size = 10),
    text = ~paste0("#", rs500_rank_2020),
    textposition = "top center",
    textfont = list(color = ART_BLUE, size = 11),
    hovertemplate = paste0(
      "<b>%{x}</b><br>RS 500 rank: #%{y}<extra></extra>"
    )
  ) %>%
  plotly_chrome(
    title = CHART2_TITLE,
    subtitle = CHART2_SUBTITLE,
    takeaway = CHART2_TAKEAWAY,
    source = CHART2_SOURCE,
    margin = list(l = 70, r = 70, t = 110, b = 90)
  ) %>%
  layout(
    xaxis = list(title = ""),
    yaxis = list(
      title = "Weeks on Billboard Hot 200",
      gridcolor = "#E8E8E8",
      zeroline = FALSE
    ),
    yaxis2 = list(
      title = "Rolling Stone 500 rank (2020)",
      overlaying = "y",
      side = "right",
      autorange = "reversed",
      gridcolor = NA,
      zeroline = FALSE,
      titlefont = list(color = ART_BLUE),
      tickfont = list(color = ART_BLUE)
    ),
    showlegend = TRUE,
    legend = list(orientation = "h", x = 0, y = -0.08)
  )

write_plotly_json(fig2, file.path(charts_dir, "chart2_economic_fingerprint.plotly.json"))
copy_to_public("chart2_economic_fingerprint")

message("Done — chart2_economic_fingerprint exported to articles/ and public/.")
