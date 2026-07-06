# Franchise report — shared theme, sizing, and Plotly export helpers.

suppressPackageStartupMessages({
  library(ggplot2)
  library(scales)
  library(plotly)
  library(jsonlite)
})

# TidyTuesday release date for every chart in this report.
FRANCHISE_DATA_DATE <- "2019-07-02"

# 5:4 landscape (width : height) for all franchise charts.
FRANCHISE_CHART_WIDTH  <- 10
FRANCHISE_CHART_HEIGHT <- 8
FRANCHISE_PLOTLY_WIDTH  <- 1000
FRANCHISE_PLOTLY_HEIGHT <- 800

art_bg        <- "#FAFAF8"
art_cream     <- "#F2F0EB"
art_dark      <- "#1C1C1E"
art_mid       <- "#6B6B6B"
art_highlight <- "#C0392B"
art_secondary <- "#2C3E6B"
art_muted     <- "#D5D5D5"

category_colors <- c(
  "Merchandise, Licensing & Retail" = art_highlight,
  "Video Games/Games"               = art_secondary,
  "Box Office"                      = "#E67E22",
  "Home Video/Entertainment"        = "#27AE60",
  "Comic or Manga"                  = "#8E44AD",
  "Music"                           = "#F39C12",
  "TV"                              = "#16A085",
  "Book sales"                      = "#2980B9"
)

theme_artometrics <- function() {
  if (requireNamespace("ggtext", quietly = TRUE)) {
    title_el <- ggtext::element_markdown(
      color = art_dark, size = 13, face = "bold", margin = margin(b = 6)
    )
    subtitle_el <- ggtext::element_markdown(
      color = art_mid, size = 10, margin = margin(b = 10)
    )
  } else {
    title_el <- element_text(color = art_dark, size = 13, face = "bold", margin = margin(b = 6))
    subtitle_el <- element_text(color = art_mid, size = 10, margin = margin(b = 10))
  }

  theme_minimal(base_family = "Helvetica") +
    theme(
      plot.background       = element_rect(fill = art_cream, color = NA),
      panel.background      = element_rect(fill = art_cream, color = NA),
      panel.grid.major      = element_line(color = art_muted, linewidth = 0.4),
      panel.grid.minor      = element_blank(),
      axis.text             = element_text(color = art_mid, size = 9),
      axis.title            = element_text(color = art_dark, size = 10, face = "bold"),
      plot.title            = title_el,
      plot.subtitle         = subtitle_el,
      plot.caption          = element_text(color = art_mid, size = 8, hjust = 0, margin = margin(t = 10)),
      plot.caption.position = "plot",
      plot.margin           = margin(t = 16, r = 80, b = 16, l = 16),
      legend.background     = element_rect(fill = art_cream, color = NA),
      legend.text           = element_text(color = art_mid, size = 8),
      legend.title          = element_text(color = art_dark, size = 9, face = "bold"),
      strip.text            = element_text(color = art_dark, size = 9, face = "bold"),
      strip.background      = element_rect(fill = art_cream, color = NA)
    )
}

franchise_caption <- function(extra = NULL) {
  base <- paste0("Data: TidyTuesday ", FRANCHISE_DATA_DATE)
  if (!is.null(extra) && nzchar(extra)) {
    base <- paste0(base, " | ", extra)
  }
  paste0(base, "\n— ARTOMETRICS")
}

plotly_franchise_layout <- function(p, title_html, subtitle_text = NULL) {
  built <- plotly::plotly_build(p)
  built$x$layout$title <- list(
    text = title_html,
    font = list(family = "Helvetica", size = 16, color = art_dark),
    x = 0,
    xanchor = "left"
  )
  if (!is.null(subtitle_text)) {
    built$x$layout$annotations <- list(list(
      text = subtitle_text,
      x = 0, y = 1.08, xref = "paper", yref = "paper",
      xanchor = "left", yanchor = "bottom",
      showarrow = FALSE,
      font = list(size = 11, color = art_mid, family = "Helvetica")
    ))
  }
  built$x$layout$paper_bgcolor <- art_cream
  built$x$layout$plot_bgcolor  <- art_cream
  built$x$layout$width  <- FRANCHISE_PLOTLY_WIDTH
  built$x$layout$height <- FRANCHISE_PLOTLY_HEIGHT
  built$x$layout$margin <- list(t = 90, r = 60, b = 70, l = 200)
  built$x$layout$font <- list(family = "Helvetica", color = art_dark)
  built$x$layout$hovermode <- "closest"
  built$x$layout$legend <- list(
    bgcolor = art_cream,
    font = list(color = art_mid, size = 10),
    title = list(text = "Category", font = list(color = art_dark, size = 11))
  )
  built$x$config <- list(
    displayModeBar = TRUE,
    displaylogo = FALSE,
    responsive = TRUE,
    modeBarButtonsToRemove = c("lasso2d", "select2d")
  )
  plotly::as_widget(built)
}

save_franchise_chart <- function(
  ggplot_obj,
  plotly_obj,
  filename,
  charts_dir = "charts"
) {
  dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)

  ggsave(
    filename = paste0(filename, ".png"),
    plot = ggplot_obj,
    path = charts_dir,
    width = FRANCHISE_CHART_WIDTH,
    height = FRANCHISE_CHART_HEIGHT,
    dpi = 300,
    bg = art_cream
  )

  built <- plotly::plotly_build(plotly_obj)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = built$x$config %||% list(
      displayModeBar = TRUE,
      displaylogo = FALSE,
      responsive = TRUE
    )
  )
  json_path <- file.path(charts_dir, paste0(filename, ".plotly.json"))
  jsonlite::write_json(payload, json_path, auto_unbox = TRUE, pretty = TRUE)
  invisible(json_path)
}

`%||%` <- function(x, y) if (is.null(x)) y else x

add_bar_value_annotations <- function(widget, labels_df, x_col, y_col, label_col, x_pad = 1.02) {
  built <- plotly::plotly_build(widget)
  anns <- lapply(seq_len(nrow(labels_df)), function(i) {
    list(
      x = labels_df[[x_col]][i] * x_pad,
      y = labels_df[[y_col]][i],
      text = labels_df[[label_col]][i],
      xanchor = "left",
      yanchor = "middle",
      showarrow = FALSE,
      font = list(size = 11, color = art_dark, family = "Helvetica")
    )
  })
  built$x$layout$annotations <- c(built$x$layout$annotations %||% list(), anns)
  plotly::as_widget(built)
}
