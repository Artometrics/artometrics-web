# Artometrics — reproducible R chart snippet
# Run from the artometrics-web repository root (save as scripts/chart-snippet.R or run via Rscript).
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
article_dir <- file.path(repo_root, "articles/readmitted")
data_dir <- file.path(article_dir, "data")
charts_dir <- file.path(article_dir, "charts")
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)
NAT_AVG_PCT <- 48.1
HRRP_SOURCE <- "Source: CMS Hospital Readmissions Reduction Program (HRRP), FY2025 supplemental data (Dataset 9n3s-kdb3)"
FONT <- "Helvetica"

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


state_err <- read_csv(file.path(data_dir, "hrrp_state_summary.csv"), show_col_types = FALSE) %>%
  arrange(avg_err) %>%
  slice_tail(n = 15)

p4 <- ggplot(state_err, aes(x = avg_err, y = reorder(state, avg_err), fill = avg_err)) +
  geom_col(width = 0.72, color = NA) +
  geom_vline(xintercept = 1, linetype = "dotted", color = ART_DARK, linewidth = 0.45) +
  scale_fill_gradient(low = "#1C1C1E", high = ART_HIGHLIGHT, guide = "none") +
  scale_x_continuous(expand = expansion(mult = c(0, 0.08))) +
  labs(
    title = "Average excess readmission ratio by state (top 15)",
    subtitle = "Intensity of excess above CMS expected line (ERR = 1.0)",
    x = "Average ERR",
    y = NULL
  ) +
  theme_artometrics(12) +
  theme(panel.grid.major.y = element_blank())

p4 <- finish_art_chart(
  p4,
  takeaway = "Massachusetts posts the highest average ERR among states in the working extract",
  source = HRRP_SOURCE
)
save_png(p4, "chart4_state_avg_err", height = 6.2)

fig4 <- plot_ly(
  state_err,
  x = ~avg_err,
  y = ~state,
  type = "bar",
  orientation = "h",
  marker = list(color = art_bar_colors(nrow(state_err))),
  text = ~sprintf("%.4f", avg_err),
  textposition = "outside",
  cliponaxis = FALSE,
  hovertemplate = "<b>%{y}</b><br>Avg ERR %{x:.5f}<extra></extra>"
) %>%
  layout(
    title = list(
      text = "Average excess readmission ratio by state (top 15)",
      font = list(family = FONT, size = 15, color = ART_DARK),
      x = 0, xanchor = "left"
    ),
    paper_bgcolor = ART_CREAM,
    plot_bgcolor = ART_CREAM,
    font = list(family = FONT, color = ART_DARK, size = 12),
    xaxis = list(title = "Average ERR", gridcolor = ART_MUTED, fixedrange = TRUE, zeroline = FALSE),
    yaxis = list(
      title = "",
      categoryorder = "array",
      categoryarray = state_err$state,
      fixedrange = TRUE
    ),
    dragmode = FALSE,
    annotations = list(list(
      x = 0.99, y = 0.01, xref = "paper", yref = "paper",
      text = "Artometrics", showarrow = FALSE,
      xanchor = "right", yanchor = "bottom",
      font = list(size = 11, color = ART_MID, family = "Georgia, serif")
    )),
    margin = list(l = 72, r = 36, t = 96, b = 56)
  )
