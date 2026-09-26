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


own_high <- read_csv(file.path(data_dir, "hrrp_ownership_condition.csv"), show_col_types = FALSE) %>%
  group_by(ownership_group) %>%
  summarise(
    n = sum(n),
    high = sum(n[penalty_tier == "High"]),
    .groups = "drop"
  ) %>%
  mutate(pct_high = 100 * high / n) %>%
  mutate(ownership_group = factor(ownership_group, levels = c("Government", "Non-Profit", "For-Profit")))

p5 <- ggplot(own_high, aes(x = ownership_group, y = pct_high, fill = ownership_group)) +
  geom_col(width = 0.62, color = NA) +
  scale_fill_manual(values = c(
    "Government" = "#1C1C1E",
    "Non-Profit" = "#6B6B6B",
    "For-Profit" = ART_HIGHLIGHT
  ), guide = "none") +
  scale_y_continuous(expand = expansion(mult = c(0, 0.12))) +
  labs(
    title = "Share of hospital–condition pairs in High penalty tier by ownership",
    subtitle = "High tier = pairs farthest above CMS expected readmissions",
    x = "Ownership",
    y = "High-tier share (%)"
  ) +
  theme_artometrics(12)

p5 <- finish_art_chart(
  p5,
  takeaway = "For-profit hospitals carry the highest share of High-tier penalty pairs",
  source = HRRP_SOURCE
)
save_png(p5, "chart5_high_penalty_by_ownership", height = 5.2)

fig5 <- plot_ly(
  own_high,
  x = ~ownership_group,
  y = ~pct_high,
  type = "bar",
  marker = list(color = c("#1C1C1E", "#6B6B6B", ART_HIGHLIGHT)),
  text = ~sprintf("%.1f%%", pct_high),
  textposition = "outside",
  cliponaxis = FALSE,
  hovertemplate = "<b>%{x}</b><br>High tier %{y:.1f}%<extra></extra>"
) %>%
  layout(
    title = list(
      text = "Share of hospital–condition pairs in High penalty tier by ownership",
      font = list(family = FONT, size = 15, color = ART_DARK),
      x = 0, xanchor = "left"
    ),
    paper_bgcolor = ART_CREAM,
    plot_bgcolor = ART_CREAM,
    font = list(family = FONT, color = ART_DARK, size = 12),
    xaxis = list(title = "Ownership", fixedrange = TRUE),
    yaxis = list(title = "High-tier share (%)", gridcolor = ART_MUTED, fixedrange = TRUE, zeroline = FALSE),
    dragmode = FALSE,
    bargap = 0.35,
    annotations = list(list(
      x = 0.99, y = 0.01, xref = "paper", yref = "paper",
      text = "Artometrics", showarrow = FALSE,
      xanchor = "right", yanchor = "bottom",
      font = list(size = 11, color = ART_MID, family = "Georgia, serif")
    )),
    margin = list(l = 56, r = 28, t = 96, b = 64)
  )

cat("All readmitted R charts exported to", charts_dir, "and synced to public/\n")
