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


state_pct <- read_csv(file.path(data_dir, "hrrp_state_summary.csv"), show_col_types = FALSE) %>%
  filter(above_nat_avg) %>%
  arrange(pct_penalized) %>%
  mutate(
    state = fct_inorder(state),
    bar_color = art_bar_colors(n(), highlight_last = TRUE)
  )

nj_row <- state_pct %>% filter(as.character(state) == "NJ")

p1 <- ggplot(state_pct, aes(x = pct_penalized, y = state)) +
  geom_col(aes(fill = bar_color), width = 0.65, show.legend = FALSE) +
  scale_fill_identity() +
  geom_vline(xintercept = NAT_AVG_PCT, linetype = "dashed", color = ART_SECONDARY, linewidth = 1) +
  geom_text(
    aes(label = paste0(round(pct_penalized, 1), "%")),
    hjust = -0.15,
    size = 2.9,
    color = ART_DARK,
    family = FONT
  ) +
  annotate(
    "text",
    x = NAT_AVG_PCT,
    y = length(levels(state_pct$state)) + 0.6,
    label = paste0("National avg (", NAT_AVG_PCT, "%)"),
    color = ART_SECONDARY,
    size = 2.8,
    family = FONT
  ) +
  annotate(
    "segment",
    x = nj_row$pct_penalized,
    xend = nj_row$pct_penalized + 4,
    y = nj_row$state,
    yend = as.numeric(nj_row$state) + 0.55,
    arrow = arrow(length = unit(0.12, "inches"), type = "closed"),
    color = ART_HIGHLIGHT,
    linewidth = 0.45
  ) +
  annotate(
    "text",
    x = nj_row$pct_penalized + 4.2,
    y = as.numeric(nj_row$state) + 0.55,
    label = "NJ leads at 65.4%",
    hjust = 0,
    color = ART_HIGHLIGHT,
    size = 2.8,
    fontface = "bold",
    family = FONT
  ) +
  scale_x_continuous(
    labels = function(x) paste0(x, "%"),
    expand = expansion(mult = c(0, 0.18))
  ) +
  labs(
    title = "Which <span style='color:#C0392B;'>States</span> Have the Most Penalized Hospitals?",
    subtitle = "Above-average states only — share of hospital-condition pairs with ERR > 1.0",
    x = "% of Hospital-Condition Pairs with ERR > 1.0",
    y = NULL
  ) +
  theme_artometrics() +
  theme(
    plot.background = element_rect(fill = ART_CREAM, color = NA),
    panel.background = element_rect(fill = ART_CREAM, color = NA),
    panel.grid.major.y = element_blank()
  )

p1 <- finish_art_chart(
  p1,
  takeaway = "Geography isn't destiny — wealthy states lead the penalty list alongside the rural South",
  source = HRRP_SOURCE
)
save_png(p1, "chart1_states_penalized", height = 6.5 + nrow(state_pct) * 0.18)

# Plotly twin for interactive site chart
fig1 <- plot_ly(
  state_pct,
  x = ~pct_penalized,
  y = ~state,
  type = "bar",
  orientation = "h",
  marker = list(color = state_pct$bar_color, line = list(width = 0)),
  text = ~paste0(round(pct_penalized, 1), "%"),
  textposition = "outside",
  hovertemplate = "<b>%{y}</b><br>%{x:.1f}% of pairs penalized<extra></extra>"
) %>%
  layout(
    title = list(
      text = paste0(
        "<b>Which <span style='color:#C0392B;'>States</span> Have the Most Penalized Hospitals?</b>",
        "<br><span style='font-size:12px;color:#6B6B6B'>Above-average states only — share of hospital-condition pairs with ERR > 1.0</span>"
      ),
      x = 0,
      xanchor = "left"
    ),
    paper_bgcolor = ART_CREAM,
    plot_bgcolor = ART_CREAM,
    font = list(family = FONT, color = ART_DARK, size = 12),
    xaxis = list(
      title = "% of Hospital-Condition Pairs with ERR > 1.0",
      gridcolor = ART_MUTED,
      zeroline = FALSE,
      range = c(0, max(state_pct$pct_penalized) * 1.14)
    ),
    yaxis = list(title = "", categoryorder = "array", categoryarray = as.character(state_pct$state)),
    shapes = list(list(
      type = "line",
      x0 = NAT_AVG_PCT, x1 = NAT_AVG_PCT,
      y0 = 0, y1 = 1, yref = "paper",
      line = list(color = ART_SECONDARY, dash = "dash", width = 1.5)
    )),
    annotations = list(
      list(
        x = NAT_AVG_PCT, y = 1.02, xref = "x", yref = "paper",
        text = paste0("National avg (", NAT_AVG_PCT, "%)"),
        showarrow = FALSE, xanchor = "center", yanchor = "bottom",
        font = list(size = 9, color = ART_SECONDARY)
      ),
      list(
        x = 0.99, y = 0.01, xref = "paper", yref = "paper",
        text = "Artometrics", showarrow = FALSE,
        xanchor = "right", yanchor = "bottom",
        font = list(size = 11, color = ART_MID, family = "Georgia, serif")
      )
    ),
    margin = list(l = 60, r = 40, t = 90, b = 60),
    showlegend = FALSE
  )
