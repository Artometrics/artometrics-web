#!/usr/bin/env Rscript
# Export READMITTED charts (PNG + Plotly JSON) from monorepo articles/readmitted/.

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

# Match site cream (override theme default)
ART_CREAM <<- "#F2F0EB"

article_dir <- file.path(repo_root, "articles/readmitted")
data_dir <- file.path(article_dir, "data")
charts_dir <- file.path(article_dir, "charts")
if (!dir.exists(data_dir)) {
  stop("Missing articles/readmitted/data — run from monorepo root after promoting the article home")
}
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)

public_img <- file.path(repo_root, "public/images/content/articles/readmitted/charts")
public_data <- file.path(repo_root, "public/data/articles/readmitted")
public_charts <- file.path(public_data, "charts")
public_csv <- file.path(public_data, "data")
dir.create(public_img, recursive = TRUE, showWarnings = FALSE)
dir.create(public_charts, recursive = TRUE, showWarnings = FALSE)
dir.create(public_csv, recursive = TRUE, showWarnings = FALSE)

NAT_AVG_PCT <- 48.1
HRRP_SOURCE <- "Source: CMS Hospital Readmissions Reduction Program (HRRP), FY2025 supplemental data (Dataset 9n3s-kdb3)"
FONT <- "Helvetica"

write_plotly_json <- function(fig, path) {
  built <- plotly_build(fig)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = list(
      displayModeBar = FALSE,
      displaylogo = FALSE,
      responsive = TRUE
    )
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
    file.path(public_charts, paste0(name, ".plotly.json")),
    overwrite = TRUE
  )
}

# Sync working CSVs to public for downloadable FILES section
file.copy(
  list.files(data_dir, pattern = "\\.csv$", full.names = TRUE),
  public_csv,
  overwrite = TRUE
)

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
  message("Wrote ", path)
  invisible(path)
}

# ── Chart 1: States above national average ───────────────────────────────────

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
write_plotly_json(fig1, file.path(charts_dir, "chart1_states_penalized.plotly.json"))
copy_to_public("chart1_states_penalized")

# ── Chart 2: ERR by condition ────────────────────────────────────────────────

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
write_plotly_json(fig2, file.path(charts_dir, "chart2_err_by_condition.plotly.json"))
copy_to_public("chart2_err_by_condition")

# ── Chart 3: Penalty tier by ownership ─────────────────────────────────────────

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
write_plotly_json(fig3, file.path(charts_dir, "chart3_penalty_by_ownership.plotly.json"))
copy_to_public("chart3_penalty_by_ownership")

cat("All readmitted R charts exported to", charts_dir, "and synced to public/\n")
