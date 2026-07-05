#!/usr/bin/env Rscript
# Export readmitted charts as professional PNGs (Chomsky wordmark, emerald palette).

suppressPackageStartupMessages({
  library(tidyverse)
  library(scales)
})

script_dir <- tryCatch(
  dirname(normalizePath(sub("^--file=", "", commandArgs(trailingOnly = FALSE)[grep("^--file=", commandArgs(trailingOnly = FALSE))][1]))),
  error = function(e) getwd()
)
repo_root <- normalizePath(file.path(script_dir, ".."))

source(file.path(repo_root, "scripts/r/artometrics_theme.R"))
art_init_fonts(repo_root)

data_root <- file.path(repo_root, "public/data/articles/readmitted")
if (!dir.exists(file.path(data_root, "data"))) {
  stop("Could not locate public/data/articles/readmitted/data")
}

img_dir <- file.path(repo_root, "public/images/content/articles/readmitted/charts")
json_dir <- file.path(data_root, "charts")
dir.create(img_dir, recursive = TRUE, showWarnings = FALSE)
dir.create(json_dir, recursive = TRUE, showWarnings = FALSE)

NAT_AVG_PCT <- 48.1
HRRP_SOURCE <- "Source: CMS Hospital Readmissions Reduction Program (HRRP), FY2025 supplemental data (Dataset 9n3s-kdb3)"

save_png <- function(plot_obj, name, height = 7) {
  path <- file.path(img_dir, paste0(name, ".png"))
  ggsave(
    filename = path,
    plot = plot_obj,
    width = 12,
    height = height,
    dpi = 300,
    bg = ART_CREAM
  )
  message("Wrote ", path)
  invisible(path)
}

# ── Chart 1: States above national average ───────────────────────────────────

state_pct <- read_csv(
  file.path(data_root, "data/hrrp_state_summary.csv"),
  show_col_types = FALSE
) %>%
  filter(above_nat_avg) %>%
  arrange(pct_penalized) %>%
  mutate(
    state = fct_inorder(state),
    bar_color = art_bar_colors(n(), highlight_last = TRUE)
  )

nj_row <- state_pct %>% filter(state == "NJ")

p1 <- ggplot(state_pct, aes(x = pct_penalized, y = state)) +
  geom_col(aes(fill = bar_color), width = 0.65, show.legend = FALSE) +
  scale_fill_identity() +
  geom_vline(xintercept = NAT_AVG_PCT, linetype = "dashed", color = ART_SECONDARY, linewidth = 1) +
  geom_text(
    aes(label = paste0(round(pct_penalized, 1), "%")),
    hjust = -0.15,
    size = 2.9,
    color = ART_DARK,
    family = "Helvetica"
  ) +
  annotate(
    "text",
    x = NAT_AVG_PCT,
    y = length(levels(state_pct$state)) + 0.6,
    label = paste0("National avg (", NAT_AVG_PCT, "%)"),
    color = ART_SECONDARY,
    size = 2.8,
    family = "Helvetica"
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
    family = "Helvetica"
  ) +
  scale_x_continuous(
    labels = function(x) paste0(x, "%"),
    expand = expansion(mult = c(0, 0.18))
  ) +
  labs(
    title = "Which <span style='color:#00FF88;'>States</span> Have the Most Penalized Hospitals?",
    subtitle = "Above-average states only — share of hospital-condition pairs with ERR > 1.0",
    x = "% of Hospital-Condition Pairs with ERR > 1.0",
    y = NULL
  ) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank())

p1 <- finish_art_chart(
  p1,
  takeaway = "Geography isn't destiny — wealthy states lead the penalty list alongside the rural South",
  source = HRRP_SOURCE
)

save_png(p1, "chart1_states_penalized", height = 6.5 + nrow(state_pct) * 0.18)

# ── Chart 2: ERR by condition ────────────────────────────────────────────────

condition_err <- tibble(
  condition = c("Hip/Knee", "COPD", "Heart Failure", "AMI", "Pneumonia", "CABG"),
  avg_err = c(1.00485, 1.00271, 1.00254, 1.00212, 1.00198, 1.00187)
) %>%
  arrange(avg_err) %>%
  mutate(condition = fct_inorder(condition))

hip_row <- condition_err %>% filter(condition == "Hip/Knee")

p2 <- ggplot(condition_err, aes(x = avg_err, y = condition)) +
  geom_segment(aes(x = 1.0, xend = avg_err, yend = condition), color = ART_MUTED, linewidth = 0.9) +
  geom_vline(xintercept = 1.0, color = ART_DARK, linewidth = 0.6) +
  geom_point(color = ART_HIGHLIGHT, size = 4.2, stroke = 0.4) +
  geom_text(
    aes(label = sprintf("%.5f", avg_err)),
    hjust = -0.25,
    size = 3.1,
    color = ART_DARK,
    family = "Helvetica"
  ) +
  annotate(
    "text",
    x = 1.0,
    y = length(levels(condition_err$condition)) + 0.55,
    label = "ERR = 1.0 (no excess)",
    color = ART_MID,
    size = 2.8,
    family = "Helvetica"
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
    family = "Helvetica"
  ) +
  scale_x_continuous(
    labels = function(x) sprintf("%.4f", x),
    expand = expansion(mult = c(0.01, 0.12))
  ) +
  labs(
    title = "The <span style='color:#00FF88;'>Hip/Knee</span> Problem: ERR by Condition",
    subtitle = "All six HRRP conditions exceed 1.0 — but the spread is measured in thousandths",
    x = "Average Excess Readmission Ratio (ERR)",
    y = NULL
  ) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank())

p2 <- finish_art_chart(
  p2,
  takeaway = "Elective joint surgery — not heart attacks — carries the highest excess readmission ratio",
  source = HRRP_SOURCE
)

save_png(p2, "chart2_err_by_condition", height = 5.2)

# ── Chart 3: Penalty tier by ownership ─────────────────────────────────────────

plot_data <- read_csv(
  file.path(data_root, "data/hrrp_ownership_condition.csv"),
  show_col_types = FALSE
) %>%
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
    family = "Helvetica"
  ) +
  labs(
    title = "<span style='color:#00FF88;'>For-Profit</span> Hospitals Carry More Penalty Weight",
    subtitle = "Penalty tier distribution by ownership — HCA, Tenet, and Steward sit in the for-profit column",
    x = "Share of Hospital-Condition Pairs",
    y = NULL
  ) +
  theme_artometrics() +
  theme(
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

cat("All readmitted charts exported to", img_dir, "\n")
