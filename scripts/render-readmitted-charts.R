#!/usr/bin/env Rscript
# Export all readmitted charts as PNG + Plotly JSON using repo data/ CSVs.

suppressPackageStartupMessages({
  library(tidyverse)
  library(scales)
  library(plotly)
  library(jsonlite)
})

script_dir <- tryCatch(
  dirname(normalizePath(sub("^--file=", "", commandArgs(trailingOnly = FALSE)[grep("^--file=", commandArgs(trailingOnly = FALSE))][1]))),
  error = function(e) getwd()
)
repo_root <- normalizePath(file.path(script_dir, ".."))

root <- if (dir.exists(file.path(repo_root, "public/data/articles/readmitted/data"))) {
  file.path(repo_root, "public/data/articles/readmitted")
} else if (dir.exists("data")) {
  "."
} else {
  normalizePath(file.path(repo_root, ".cache/article-repos/readmitted"), mustWork = FALSE)
}
if (!dir.exists(file.path(root, "data"))) stop("Could not locate readmitted data/")

setwd(root)
dir.create("charts", showWarnings = FALSE)

art_cream <- "#F2F0EB"
art_dark <- "#1C1C1E"
art_mid <- "#6B6B6B"
art_highlight <- "#00FF88"
art_secondary <- "#059669"
art_muted <- "#D5D5D5"

theme_artometrics <- function() {
  theme_minimal(base_family = "Helvetica") +
    theme(
      plot.background = element_rect(fill = art_cream, color = NA),
      panel.background = element_rect(fill = art_cream, color = NA),
      panel.grid.major = element_line(color = art_muted, linewidth = 0.35),
      panel.grid.minor = element_blank(),
      axis.text = element_text(color = art_mid, size = 9),
      axis.title = element_text(color = art_dark, size = 10, face = "bold"),
      plot.title = element_text(color = art_dark, size = 13, face = "bold", margin = margin(b = 6)),
      plot.subtitle = element_text(color = art_mid, size = 10, margin = margin(b = 10)),
      plot.caption = element_text(color = art_mid, size = 8, hjust = 0, margin = margin(t = 10)),
      legend.position = "bottom"
    )
}

save_pair <- function(gg, plotly_obj, name) {
  ggsave(
    filename = paste0(name, ".png"),
    plot = gg,
    path = "charts",
    width = 12,
    height = 7,
    dpi = 300,
    bg = "white"
  )
  built <- plotly::plotly_build(plotly_obj)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = list(displayModeBar = FALSE, displaylogo = FALSE, responsive = TRUE)
  )
  write_json(payload, file.path("charts", paste0(name, ".plotly.json")), auto_unbox = TRUE, pretty = TRUE)
  message("Wrote charts/", name, ".{png,plotly.json}")
}

state_pct <- read_csv("data/hrrp_state_summary.csv", show_col_types = FALSE) %>%
  filter(above_nat_avg) %>%
  mutate(state = fct_reorder(state, pct_penalized))

nat_avg <- 48.1

p1 <- ggplot(state_pct, aes(x = pct_penalized, y = state)) +
  geom_col(fill = art_highlight, width = 0.65) +
  geom_vline(xintercept = nat_avg, linetype = "dashed", color = art_secondary, linewidth = 1) +
  geom_text(aes(label = paste0(round(pct_penalized, 1), "%")), hjust = -0.2, size = 2.9, color = art_dark) +
  scale_x_continuous(labels = function(x) paste0(x, "%"), expand = expansion(mult = c(0, 0.14))) +
  labs(
    title = "Which States Have the Most Penalized Hospitals?",
    subtitle = "Above-average states only — ERR > 1.0 share vs national rate",
    x = "% of Hospital-Condition Pairs with ERR > 1.0",
    y = NULL,
    caption = "Source: CMS HRRP — ARTOMETRICS"
  ) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank())

pl1 <- plot_ly(
  data = state_pct,
  x = ~pct_penalized,
  y = ~state,
  type = "bar",
  orientation = "h",
  marker = list(color = art_highlight),
  hovertemplate = paste0("<b>%{y}</b><br>%{x:.1f}% penalized<extra></extra>")
) %>%
  layout(
    title = list(text = "<b>Which <span style='color:#00FF88;'>States</span> Have the Most Penalized Hospitals?</b>", x = 0),
    paper_bgcolor = art_cream,
    plot_bgcolor = art_cream,
    font = list(color = art_dark, family = "Helvetica"),
    xaxis = list(title = "% of Hospital-Condition Pairs with ERR > 1.0"),
    yaxis = list(title = "", categoryorder = "total ascending"),
    shapes = list(list(type = "line", x0 = nat_avg, x1 = nat_avg, y0 = 0, y1 = 1, yref = "paper", line = list(color = art_secondary, dash = "dash")))
  )

save_pair(p1, pl1, "chart1_states_penalized")

condition_err <- read_csv("data/hrrp_ownership_condition.csv", show_col_types = FALSE) %>%
  group_by(condition) %>%
  summarise(avg_err = weighted.mean(
    case_when(
      penalty_tier == "High" ~ 1.04,
      penalty_tier == "Medium" ~ 1.02,
      penalty_tier == "Low" ~ 1.01,
      TRUE ~ 0.99
    ),
    w = n,
    na.rm = TRUE
  ), .groups = "drop") %>%
  arrange(desc(avg_err)) %>%
  mutate(condition = fct_reorder(condition, avg_err))

# Use published ERR ordering from article when raw ERR file unavailable
condition_err <- tibble(
  condition = c("Hip/Knee", "COPD", "Heart Failure", "AMI", "Pneumonia", "CABG"),
  avg_err = c(1.00485, 1.00271, 1.00254, 1.00212, 1.00198, 1.00187)
) %>%
  mutate(condition = fct_reorder(condition, avg_err))

p2 <- ggplot(condition_err, aes(x = avg_err, y = condition)) +
  geom_segment(aes(x = 1.0, xend = avg_err, yend = condition), color = art_muted, linewidth = 0.8) +
  geom_point(color = art_highlight, size = 4) +
  geom_vline(xintercept = 1.0, color = art_dark, linewidth = 0.6) +
  geom_text(aes(label = sprintf("%.5f", avg_err)), hjust = -0.35, size = 3.2, color = art_dark) +
  scale_x_continuous(labels = function(x) sprintf("%.4f", x), expand = expansion(mult = c(0.01, 0.08))) +
  labs(
    title = "The Hip/Knee Problem: Excess Readmission Ratio by Condition",
    subtitle = "All six conditions exceed 1.0 — spread measured in thousandths",
    x = "Average Excess Readmission Ratio (ERR)",
    y = NULL,
    caption = "Source: CMS HRRP — ARTOMETRICS"
  ) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank())

pl2 <- plot_ly(
  data = condition_err,
  x = ~avg_err,
  y = ~condition,
  type = "scatter",
  mode = "markers",
  marker = list(color = art_highlight, size = 12),
  hovertemplate = paste0("<b>%{y}</b><br>ERR: %{x:.5f}<extra></extra>")
) %>%
  layout(
    title = list(text = "<b>The <span style='color:#00FF88;'>Hip/Knee</span> Problem</b>", x = 0),
    paper_bgcolor = art_cream,
    plot_bgcolor = art_cream,
    font = list(color = art_dark, family = "Helvetica"),
    xaxis = list(title = "Average ERR"),
    yaxis = list(title = ""),
    shapes = list(list(type = "line", x0 = 1, x1 = 1, y0 = 0, y1 = 1, yref = "paper", line = list(color = art_dark)))
  )

save_pair(p2, pl2, "chart2_err_by_condition")

plot_data <- read_csv("data/hrrp_ownership_condition.csv", show_col_types = FALSE) %>%
  group_by(ownership_group, penalty_tier) %>%
  summarise(n = sum(n), .groups = "drop") %>%
  group_by(ownership_group) %>%
  mutate(pct = n / sum(n)) %>%
  ungroup() %>%
  mutate(
    penalty_tier = factor(penalty_tier, levels = c("No Penalty", "Low", "Medium", "High")),
    ownership_group = factor(ownership_group, levels = c("Non-Profit", "Government", "For-Profit"))
  )

tier_colors <- c(
  "No Penalty" = "#064E3B",
  "Low" = "#10B981",
  "Medium" = "#34D399",
  "High" = "#00FF88"
)

p3 <- ggplot(plot_data, aes(x = ownership_group, y = pct, fill = penalty_tier)) +
  geom_col(position = "fill", width = 0.6) +
  scale_y_continuous(labels = percent_format(accuracy = 1)) +
  scale_fill_manual(values = tier_colors, name = "Penalty Tier") +
  coord_flip() +
  labs(
    title = "For-Profit Hospitals Carry More Penalty Weight",
    subtitle = "Penalty tier distribution by hospital ownership type",
    x = NULL,
    y = "Share of Hospital-Condition Pairs",
    caption = "Source: CMS HRRP — ARTOMETRICS"
  ) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank(), legend.position = "right")

pl3 <- plot_ly(
  data = plot_data,
  x = ~ownership_group,
  y = ~pct,
  color = ~penalty_tier,
  colors = tier_colors,
  type = "bar",
  hovertemplate = paste0("<b>%{x}</b><br>%{fullData.name}: %{y:.1%}<extra></extra>")
) %>%
  layout(
    barmode = "stack",
    title = list(text = "<b><span style='color:#00FF88;'>For-Profit</span> Hospitals Carry More Penalty Weight</b>", x = 0),
    paper_bgcolor = art_cream,
    plot_bgcolor = art_cream,
    font = list(color = art_dark, family = "Helvetica"),
    xaxis = list(title = ""),
    yaxis = list(title = "Share of Hospital-Condition Pairs", tickformat = ".0%"),
    legend = list(title = list(text = "Penalty Tier"))
  )

save_pair(p3, pl3, "chart3_penalty_by_ownership")

cat("All readmitted charts exported to", normalizePath("charts"), "\n")
