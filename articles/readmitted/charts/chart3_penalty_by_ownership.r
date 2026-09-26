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


plot_data <- read_csv(file.path(data_dir, "hrrp_ownership_condition.csv"), show_col_types = FALSE) %>%
  group_by(ownership_group, penalty_tier) %>%
  summarise(n = sum(n), .groups = "drop") %>%
  group_by(ownership_group) %>%
  mutate(pct = n / sum(n)) %>%
  ungroup() %>%
  mutate(
    penalty_tier = factor(penalty_tier, levels = c("No Penalty", "Low", "Medium", "High")),
    ownership_group = factor(ownership_group, levels = c("Non-Profit", "Government", "For-Profit"))
  )

for_profit_high <- plot_data %>%
  filter(ownership_group == "For-Profit", penalty_tier == "High") %>%
  pull(pct)
high_pct <- if (length(for_profit_high)) for_profit_high[[1]] else 0

p3 <- ggplot(plot_data, aes(x = pct, y = ownership_group, fill = penalty_tier)) +
  geom_col(position = "fill", width = 0.62) +
  scale_x_continuous(labels = percent_format(accuracy = 1)) +
  scale_fill_manual(values = ART_TIER_COLORS, name = "Penalty Tier") +
  annotate(
    "text",
    x = 0.98,
    y = "For-Profit",
    label = paste0("High-tier share: ", percent(high_pct, accuracy = 0.1)),
    hjust = 1,
    color = ART_HIGHLIGHT,
    size = 2.9,
    fontface = "bold",
    family = FONT
  ) +
  labs(
    title = "<span style='color:#C0392B;'>For-Profit</span> Hospitals Carry More Penalty Weight",
    subtitle = "Penalty tier distribution by ownership — HCA, Tenet, and Steward sit in the for-profit column",
    x = "Share of Hospital-Condition Pairs",
    y = NULL
  ) +
  theme_artometrics() +
  theme(
    plot.background = element_rect(fill = ART_CREAM, color = NA),
    panel.background = element_rect(fill = ART_CREAM, color = NA),
    panel.grid.major.y = element_blank(),
    legend.position = "top",
    legend.justification = "right",
    legend.box.just = "right",
    legend.direction = "horizontal"
  )

p3 <- finish_art_chart(
  p3,
  takeaway = "For-profits carry more penalty weight, but every ownership type still has a majority in the no-penalty band",
  source = paste0(HRRP_SOURCE, " · joined to CMS Hospital General Information (xubh-q36u) for ownership")
)
save_png(p3, "chart3_penalty_by_ownership", height = 4.8)

# Stacked horizontal bars for Plotly
tier_levels <- c("No Penalty", "Low", "Medium", "High")
own_levels <- c("Non-Profit", "Government", "For-Profit")
fig3 <- plot_ly()
for (tier in tier_levels) {
  slice <- plot_data %>% filter(penalty_tier == tier)
  # align to ownership order
  vals <- sapply(own_levels, function(o) {
    hit <- slice$pct[slice$ownership_group == o]
    if (length(hit)) hit[[1]] else 0
  })
  fig3 <- fig3 %>% add_trace(
    type = "bar",
    orientation = "h",
    name = tier,
    x = vals,
    y = own_levels,
    marker = list(color = unname(ART_TIER_COLORS[tier])),
    hovertemplate = paste0("<b>%{y}</b><br>", tier, ": %{x:.1%}<extra></extra>")
  )
}
fig3 <- fig3 %>% layout(
  barmode = "stack",
  title = list(
    text = paste0(
      "<b><span style='color:#C0392B;'>For-Profit</span> Hospitals Carry More Penalty Weight</b>",
      "<br><span style='font-size:12px;color:#6B6B6B'>Penalty tier distribution by ownership</span>"
    ),
    x = 0, xanchor = "left"
  ),
  paper_bgcolor = ART_CREAM,
  plot_bgcolor = ART_CREAM,
  font = list(family = FONT, color = ART_DARK, size = 12),
  xaxis = list(title = "Share of Hospital-Condition Pairs", tickformat = ".0%", gridcolor = ART_MUTED),
  yaxis = list(title = "", categoryorder = "array", categoryarray = own_levels),
  legend = list(orientation = "h", y = 1.12, x = 1, xanchor = "right"),
  annotations = list(list(
    x = 0.99, y = 0.01, xref = "paper", yref = "paper",
    text = "Artometrics", showarrow = FALSE,
    xanchor = "right", yanchor = "bottom",
    font = list(size = 11, color = ART_MID, family = "Georgia, serif")
  )),
  margin = list(l = 100, r = 40, t = 100, b = 60)
)
