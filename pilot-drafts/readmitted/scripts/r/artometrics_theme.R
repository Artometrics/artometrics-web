# Artometrics shared ggplot2 + Plotly export helpers.
# Source from article repos: source(here::here("scripts/r/artometrics_theme.R"))

suppressPackageStartupMessages({
  library(ggplot2)
})

ART_HIGHLIGHT <- "#C0392B"
ART_SECONDARY <- "#2C3E6B"
ART_MID <- "#6B6B6B"
ART_CREAM <- "#F2F0EB"
ART_DARK <- "#1C1C1E"

ART_BAR_GRADIENT <- c(
  "#1A2A4F", "#243760", "#2C3E6B", "#3D5282", "#506898",
  "#647DAD", "#7D94BE", "#98ABCE", "#B4C2DD", "#CED7EB"
)

#' Artometrics ggplot2 theme
theme_artometrics <- function(base_size = 11) {
  theme_minimal(base_size = base_size, base_family = "Helvetica") +
    theme(
      plot.background = element_rect(fill = ART_CREAM, color = NA),
      panel.background = element_rect(fill = ART_CREAM, color = NA),
      panel.grid.major = element_line(color = "#E8E6E1", linewidth = 0.35),
      panel.grid.minor = element_blank(),
      axis.title = element_text(color = ART_MID, size = rel(0.85)),
      axis.text = element_text(color = ART_DARK, size = rel(0.8)),
      plot.title = element_text(
        color = ART_DARK,
        face = "bold",
        size = rel(1.15),
        margin = margin(b = 8)
      ),
      plot.subtitle = element_text(color = ART_MID, size = rel(0.9), margin = margin(b = 10)),
      plot.caption = element_text(color = ART_MID, size = rel(0.72), hjust = 0),
      legend.title = element_text(color = ART_DARK, face = "bold", size = rel(0.78)),
      legend.text = element_text(color = ART_MID, size = rel(0.75)),
      legend.position = "bottom",
      strip.text = element_text(face = "bold", color = ART_DARK)
    )
}

#' Save ggplot PNG and optional Plotly JSON for web embedding
save_art_chart <- function(
  plot_obj,
  filename,
  charts_dir = "charts",
  width = 12,
  height = 7,
  dpi = 300,
  plotly_obj = NULL
) {
  dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)
  png_path <- file.path(charts_dir, paste0(filename, ".png"))

  ggsave(
    filename = paste0(filename, ".png"),
    plot = plot_obj,
    path = charts_dir,
    width = width,
    height = height,
    dpi = dpi,
    bg = "white"
  )

  if (!is.null(plotly_obj)) {
    if (!requireNamespace("plotly", quietly = TRUE) ||
        !requireNamespace("jsonlite", quietly = TRUE)) {
      warning("Install plotly and jsonlite to export .plotly.json for ", filename)
      return(invisible(png_path))
    }

    built <- plotly::plotly_build(plotly_obj)
    payload <- list(
      data = built$x$data,
      layout = built$x$layout,
      config = list(
        displayModeBar = FALSE,
        displaylogo = FALSE,
        responsive = TRUE
      )
    )
    json_path <- file.path(charts_dir, paste0(filename, ".plotly.json"))
    jsonlite::write_json(payload, json_path, auto_unbox = TRUE, pretty = TRUE)
  }

  invisible(png_path)
}
