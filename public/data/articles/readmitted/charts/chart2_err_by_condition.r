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


condition_err <- read_csv(file.path(data_dir, "hrrp_condition_err.csv"), show_col_types = FALSE) %>%
  arrange(avg_err) %>%
  mutate(condition = fct_inorder(condition))

hip_row <- condition_err %>% filter(as.character(condition) == "Hip/Knee")

p2 <- ggplot(condition_err, aes(x = avg_err, y = condition)) +
  geom_segment(aes(x = 1.0, xend = avg_err, yend = condition), color = ART_MUTED, linewidth = 0.9) +
  geom_vline(xintercept = 1.0, color = ART_DARK, linewidth = 0.6) +
  geom_point(color = ART_HIGHLIGHT, size = 4.2, stroke = 0.4) +
  geom_text(
    aes(label = sprintf("%.5f", avg_err)),
    hjust = -0.25,
    size = 3.1,
    color = ART_DARK,
    family = FONT
  ) +
  annotate(
    "text",
    x = 1.0,
    y = length(levels(condition_err$condition)) + 0.55,
    label = "ERR = 1.0 (no excess)",
    color = ART_MID,
    size = 2.8,
    family = FONT
  ) +
  annotate(
    "segment",
    x = hip_row$avg_err,
    xend = hip_row$avg_err + 0.00055,
    y = hip_row$condition,
    yend = as.numeric(hip_row$condition) + 0.45,
    arrow = arrow(length = unit(0.12, "inches"), type = "closed"),
    color = ART_HIGHLIGHT,
    linewidth = 0.45
  ) +
  annotate(
    "text",
    x = hip_row$avg_err + 0.00058,
    y = as.numeric(hip_row$condition) + 0.45,
    label = "Nearly 2× the excess\nof the next condition",
    hjust = 0,
    color = ART_HIGHLIGHT,
    size = 2.7,
    fontface = "bold",
    lineheight = 0.95,
    family = FONT
  ) +
  scale_x_continuous(
    labels = function(x) sprintf("%.4f", x),
    expand = expansion(mult = c(0.01, 0.12))
  ) +
  labs(
    title = "The <span style='color:#C0392B;'>Hip/Knee</span> Problem: ERR by Condition",
    subtitle = "All six HRRP conditions exceed 1.0 — but the spread is measured in thousandths",
    x = "Average Excess Readmission Ratio (ERR)",
    y = NULL
  ) +
  theme_artometrics() +
  theme(
    plot.background = element_rect(fill = ART_CREAM, color = NA),
    panel.background = element_rect(fill = ART_CREAM, color = NA),
    panel.grid.major.y = element_blank()
  )

p2 <- finish_art_chart(
  p2,
  takeaway = "Elective joint surgery — not heart attacks — carries the highest excess readmission ratio",
  source = HRRP_SOURCE
)
save_png(p2, "chart2_err_by_condition", height = 5.2)

fig2 <- plot_ly(
  condition_err,
  x = ~avg_err,
  y = ~condition,
  type = "scatter",
  mode = "markers",
  marker = list(color = ART_HIGHLIGHT, size = 12),
  text = ~sprintf("%.5f", avg_err),
  hovertemplate = "<b>%{y}</b><br>ERR %{x:.5f}<extra></extra>"
) %>%
  add_segments(
    x = 1.0, xend = ~avg_err,
    y = ~condition, yend = ~condition,
    line = list(color = ART_MUTED, width = 2),
    showlegend = FALSE,
    hoverinfo = "skip"
  ) %>%
  layout(
    title = list(
      text = paste0(
        "<b>The <span style='color:#C0392B;'>Hip/Knee</span> Problem: ERR by Condition</b>",
        "<br><span style='font-size:12px;color:#6B6B6B'>All six HRRP conditions exceed 1.0 — but the spread is measured in thousandths</span>"
      ),
      x = 0, xanchor = "left"
    ),
    paper_bgcolor = ART_CREAM,
    plot_bgcolor = ART_CREAM,
    font = list(family = FONT, color = ART_DARK, size = 12),
    xaxis = list(title = "Average Excess Readmission Ratio (ERR)", gridcolor = ART_MUTED),
    yaxis = list(title = "", categoryorder = "array", categoryarray = as.character(condition_err$condition)),
    shapes = list(list(
      type = "line", x0 = 1, x1 = 1, y0 = 0, y1 = 1, yref = "paper",
      line = list(color = ART_DARK, width = 1)
    )),
    annotations = list(list(
      x = 0.99, y = 0.01, xref = "paper", yref = "paper",
      text = "Artometrics", showarrow = FALSE,
      xanchor = "right", yanchor = "bottom",
      font = list(size = 11, color = ART_MID, family = "Georgia, serif")
    )),
    margin = list(l = 100, r = 40, t = 90, b = 60),
    showlegend = FALSE
  )
