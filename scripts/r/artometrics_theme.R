# Artometrics shared ggplot2 export helpers.
# Source from chart scripts: source("scripts/r/artometrics_theme.R")

suppressPackageStartupMessages({
  library(ggplot2)
  library(scales)
})

ART_HIGHLIGHT <- "#00FF88"
ART_SECONDARY <- "#059669"
ART_MID <- "#6B6B6B"
ART_CREAM <- "#F2F0EB"
ART_DARK <- "#1C1C1E"
ART_MUTED <- "#D5D5D5"

ART_BAR_GRADIENT <- c(
  "#022C22", "#064E3B", "#065F46", "#047857", "#059669",
  "#10B981", "#34D399", "#6EE7B7", "#86EFAC", "#00FF88"
)

ART_TIER_COLORS <- c(
  "No Penalty" = "#064E3B",
  "Low" = "#10B981",
  "Medium" = "#34D399",
  "High" = "#00FF88"
)

ART_SOURCE_DEFAULT <- "Source: CMS Hospital Readmissions Reduction Program (HRRP), FY2025 supplemental data"

# Federal Reserve / academic infographic palette (FRBSF-style figures)
FED_PRIMARY <- "#1D4E77"
FED_OLIVE <- "#8B9A46"
FED_RED <- "#A52A2A"
FED_CYAN <- "#7BC0D3"
FED_GREY_TEXT <- "#666666"
FED_GRID <- "#E0E0E0"
FED_BG <- "#FFFFFF"
FED_MUTED_BLUE <- "#B8C9D9"

FED_BAR_GRADIENT <- c(
  "#B8C9D9", "#8FAFC4", "#6B95AF", "#4D7B9A", "#356283",
  "#2A5575", "#1D4E77", "#1A4569", "#173C5B", "#14334D"
)

FED_TIER_COLORS <- c(
  "No Penalty" = FED_MUTED_BLUE,
  "Low" = FED_CYAN,
  "Medium" = FED_OLIVE,
  "High" = FED_RED
)

#' Register Chomsky wordmark font from repo (showtext)
art_init_fonts <- function(repo_root = getwd()) {
  chomsky_path <- file.path(repo_root, "src/fonts/Chomsky.otf")
  if (!requireNamespace("showtext", quietly = TRUE) ||
      !requireNamespace("sysfonts", quietly = TRUE) ||
      !file.exists(chomsky_path)) {
    return(invisible(FALSE))
  }

  if (!"Chomsky" %in% sysfonts::font_families()) {
    sysfonts::font_add("Chomsky", regular = chomsky_path)
  }
  showtext::showtext_auto(enable = TRUE)
  invisible(TRUE)
}

art_has_chomsky <- function() {
  requireNamespace("showtext", quietly = TRUE) &&
    "Chomsky" %in% sysfonts::font_families()
}

art_wordmark_family <- function() {
  if (art_has_chomsky()) "Chomsky" else "serif"
}

art_title_theme <- function() {
  if (requireNamespace("ggtext", quietly = TRUE)) {
    ggtext::element_markdown(color = ART_DARK, face = "bold", size = rel(1.15), margin = margin(b = 8))
  } else {
    element_text(color = ART_DARK, face = "bold", size = rel(1.15), margin = margin(b = 8))
  }
}

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
      plot.title = art_title_theme(),
      plot.subtitle = element_text(color = ART_MID, size = rel(0.9), margin = margin(b = 10)),
      plot.caption = element_text(color = ART_MID, size = rel(0.72), hjust = 0, margin = margin(t = 12)),
      legend.title = element_text(color = ART_DARK, face = "bold", size = rel(0.78)),
      legend.text = element_text(color = ART_MID, size = rel(0.75)),
      legend.position = "bottom",
      strip.text = element_text(face = "bold", color = ART_DARK)
    )
}

#' Chomsky wordmark bottom-right
art_wordmark <- function(label = "Artometrics") {
  annotate(
    "text",
    x = Inf, y = -Inf,
    label = label,
    hjust = 1.05, vjust = -0.5,
    size = 3.8,
    color = ART_MID,
    family = art_wordmark_family()
  )
}

#' Build caption with source line
art_caption <- function(source = ART_SOURCE_DEFAULT) {
  paste0(source, "  ·  ", "Artometrics")
}

#' Gradient fill vector for n bars (leader gets brightest emerald)
art_bar_colors <- function(n, highlight_last = TRUE) {
  if (n <= 0) return(character(0))
  if (n <= length(ART_BAR_GRADIENT)) {
    colors <- ART_BAR_GRADIENT[seq_len(n)]
  } else {
    idx <- round(seq(1, length(ART_BAR_GRADIENT), length.out = n))
    colors <- ART_BAR_GRADIENT[idx]
  }
  if (highlight_last && n > 0) colors[n] <- ART_HIGHLIGHT
  colors
}

#' Fallback in-plot takeaway strip when cowplot unavailable
art_takeaway_strip <- function(takeaway, fill = ART_HIGHLIGHT) {
  list(
    annotate(
      "rect",
      xmin = -Inf, xmax = Inf, ymin = Inf, ymax = Inf,
      fill = fill, color = NA
    ),
    annotate(
      "text",
      x = -Inf, y = Inf,
      label = takeaway,
      hjust = -0.02, vjust = 1.8,
      color = "#FFFFFF",
      size = 3.2,
      fontface = "bold",
      family = "Helvetica"
    )
  )
}

#' Emerald takeaway strip (Economist-style header band)
art_takeaway_grob <- function(takeaway, fill = ART_HIGHLIGHT, width = 12, height = 0.55) {
  if (!requireNamespace("cowplot", quietly = TRUE)) {
    return(NULL)
  }
  cowplot::ggdraw() +
    cowplot::draw_label(
      takeaway,
      x = 0.015,
      hjust = 0,
      fontface = "bold",
      color = "#FFFFFF",
      size = 11,
      fontfamily = "Helvetica"
    ) +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = fill, color = NA),
      plot.margin = ggplot2::margin(6, 10, 6, 10)
    )
}

fed_title_element <- function() {
  if (requireNamespace("ggtext", quietly = TRUE)) {
    ggtext::element_markdown(
      color = FED_PRIMARY,
      face = "bold",
      size = rel(1.05),
      margin = margin(b = 10),
      lineheight = 1.15
    )
  } else {
    element_text(
      color = FED_PRIMARY,
      face = "bold",
      size = rel(1.05),
      margin = margin(b = 10)
    )
  }
}

fed_figure_title <- function(figure_num, title) {
  if (requireNamespace("ggtext", quietly = TRUE)) {
    paste0(
      "<span style='color:", FED_GREY_TEXT, ";font-size:10pt;font-weight:normal;'>Figure ",
      figure_num, "</span><br>",
      "<span style='color:", FED_PRIMARY, ";font-size:13pt;font-weight:bold;'>", title, "</span>"
    )
  } else {
    paste0("Figure ", figure_num, ": ", title)
  }
}

fed_caption <- function(note = NULL, source = ART_SOURCE_DEFAULT) {
  lines <- c()
  if (!is.null(note) && nzchar(note)) {
    lines <- c(lines, paste0("Note: ", note))
  }
  lines <- c(lines, paste0("Source: ", sub("^Source: ", "", source)))
  paste(lines, collapse = "\n")
}

#' FRBSF-style ggplot2 theme — white field, horizontal grid, direct labels
theme_fed_academic <- function(base_size = 11, grid = c("horizontal", "vertical")) {
  grid <- match.arg(grid)
  grid_x <- if (grid == "vertical") element_line(color = FED_GRID, linewidth = 0.35) else element_blank()
  grid_y <- if (grid == "horizontal") element_line(color = FED_GRID, linewidth = 0.35) else element_blank()

  theme_minimal(base_size = base_size, base_family = "Helvetica") +
    theme(
      plot.background = element_rect(fill = FED_BG, color = NA),
      panel.background = element_rect(fill = FED_BG, color = NA),
      panel.grid.major.x = grid_x,
      panel.grid.major.y = grid_y,
      panel.grid.minor = element_blank(),
      axis.line = element_line(color = "#333333", linewidth = 0.35),
      axis.ticks = element_line(color = "#333333", linewidth = 0.3),
      axis.title = element_text(color = FED_GREY_TEXT, size = rel(0.85)),
      axis.text = element_text(color = "#333333", size = rel(0.8)),
      plot.title = fed_title_element(),
      plot.subtitle = element_blank(),
      plot.caption = element_text(
        color = FED_GREY_TEXT,
        size = rel(0.68),
        hjust = 0,
        lineheight = 1.2,
        margin = margin(t = 14)
      ),
      legend.position = "none",
      legend.title = element_text(color = FED_PRIMARY, face = "bold", size = rel(0.78)),
      legend.text = element_text(color = FED_GREY_TEXT, size = rel(0.75)),
      strip.text = element_text(face = "bold", color = FED_PRIMARY)
    )
}

fed_wordmark <- function(label = "ARTOMETRICS") {
  annotate(
    "text",
    x = Inf, y = -Inf,
    label = label,
    hjust = 1.02, vjust = -0.35,
    size = 3.6,
    color = "#1C1C1E",
    fontface = "bold",
    family = "Helvetica"
  )
}

#' Finish chart in FRBSF academic style (no takeaway strip)
finish_fed_chart <- function(
  plot_obj,
  figure_num,
  title,
  note = NULL,
  source = ART_SOURCE_DEFAULT
) {
  plot_obj +
    fed_wordmark() +
    labs(
      title = fed_figure_title(figure_num, title),
      caption = fed_caption(note = note, source = source)
    ) +
    coord_cartesian(clip = "off") +
    theme(
      plot.margin = margin(t = 14, r = 20, b = 22, l = 14),
      plot.caption = element_text(
        color = FED_GREY_TEXT,
        size = rel(0.68),
        hjust = 0,
        margin = margin(t = 16),
        family = "Helvetica"
      )
    )
}

#' Compose takeaway strip + chart (+ optional wordmark handled in chart)
finish_art_chart <- function(plot_obj, takeaway, source = ART_SOURCE_DEFAULT) {
  plot_obj <- plot_obj +
    art_wordmark() +
    labs(caption = art_caption(source)) +
    coord_cartesian(clip = "off") +
    theme(
      plot.margin = margin(t = 12, r = 16, b = 18, l = 14),
      plot.caption = element_text(
        color = ART_MID,
        size = rel(0.72),
        hjust = 0,
        margin = margin(t = 14),
        family = "Helvetica"
      )
    )

  strip <- art_takeaway_grob(takeaway)
  if (is.null(strip)) {
    return(
      plot_obj +
        art_takeaway_strip(takeaway) +
        theme(plot.margin = margin(t = 32, r = 16, b = 18, l = 14))
    )
  }

  cowplot::plot_grid(
    strip,
    plot_obj,
    ncol = 1,
    rel_heights = c(0.07, 1)
  )
}

#' Save ggplot PNG (and optional Plotly JSON)
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
    bg = ART_CREAM
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
