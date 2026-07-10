#!/usr/bin/env Rscript
# Export readmitted charts as PNGs (FRBSF-style academic infographic palette).

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

data_root <- file.path(repo_root, "public/data/articles/readmitted")
if (!dir.exists(file.path(data_root, "data"))) {
  stop("Could not locate public/data/articles/readmitted/data")
}

img_dir <- file.path(repo_root, "public/images/content/articles/readmitted/charts")
json_dir <- file.path(data_root, "charts")
dir.create(img_dir, recursive = TRUE, showWarnings = FALSE)
dir.create(json_dir, recursive = TRUE, showWarnings = FALSE)

NAT_AVG_PCT <- 48.1
HRRP_SOURCE <- "CMS Hospital Readmissions Reduction Program (HRRP), FY2025 supplemental data (Dataset 9n3s-kdb3)"

save_png <- function(plot_obj, name, height = 7) {
  path <- file.path(img_dir, paste0(name, ".png"))
  ggsave(
    filename = path,
    plot = plot_obj,
    width = 12,
    height = height,
    dpi = 300,
    bg = FED_BG
  )
  message("Wrote ", path)
  invisible(path)
}

fed_bar_colors <- function(n, highlight_last = TRUE) {
  if (n <= 0) return(character(0))
  if (n <= length(FED_BAR_GRADIENT)) {
    colors <- FED_BAR_GRADIENT[seq_len(n)]
  } else {
    idx <- round(seq(1, length(FED_BAR_GRADIENT), length.out = n))
    colors <- FED_BAR_GRADIENT[idx]
  }
  if (highlight_last && n > 0) colors[n] <- FED_RED
  colors
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
    bar_color = fed_bar_colors(n(), highlight_last = TRUE)
  )

nj_row <- state_pct %>% filter(state == "NJ")

p1 <- ggplot(state_pct, aes(x = pct_penalized, y = state)) +
  geom_col(aes(fill = bar_color), width = 0.65, show.legend = FALSE) +
  scale_fill_identity() +
  geom_vline(xintercept = NAT_AVG_PCT, linetype = "dashed", color = FED_OLIVE, linewidth = 0.8) +
  geom_text(
    aes(label = paste0(round(pct_penalized, 1), "%")),
    hjust = -0.12,
    size = 2.85,
    color = "#333333",
    family = "Helvetica"
  ) +
  annotate(
    "text",
    x = NAT_AVG_PCT,
    y = length(levels(state_pct$state)) + 0.55,
    label = paste0("National average (", NAT_AVG_PCT, "%)"),
    color = FED_OLIVE,
    size = 2.75,
    family = "Helvetica"
  ) +
  annotate(
    "segment",
    x = nj_row$pct_penalized,
    xend = nj_row$pct_penalized + 3.5,
    y = nj_row$state,
    yend = as.numeric(nj_row$state) + 0.5,
    arrow = arrow(length = unit(0.1, "inches"), type = "closed"),
    color = FED_RED,
    linewidth = 0.4
  ) +
  annotate(
    "text",
    x = nj_row$pct_penalized + 3.7,
    y = as.numeric(nj_row$state) + 0.5,
    label = "NJ leads at 65.4%",
    hjust = 0,
    color = FED_RED,
    size = 2.75,
    fontface = "bold",
    family = "Helvetica"
  ) +
  scale_x_continuous(
    labels = function(x) paste0(x, "%"),
    expand = expansion(mult = c(0, 0.16))
  ) +
  labs(
    x = "Share of hospital-condition pairs with ERR > 1.0 (%)",
    y = NULL
  ) +
  theme_fed_academic(grid = "vertical") +
  theme(panel.grid.major.y = element_blank())

p1 <- finish_fed_chart(
  p1,
  figure_num = 1,
  title = "States with above-average HRRP penalty exposure",
  note = "Panel shows states where the share of hospital-condition pairs with an excess readmission ratio above 1.0 exceeds the 48.1% national average.",
  source = HRRP_SOURCE
)

save_png(p1, "chart1_states_penalized", height = 6.2 + nrow(state_pct) * 0.17)

# ── Chart 2: ERR by condition ────────────────────────────────────────────────

condition_err <- tibble(
  condition = c("Hip/Knee", "COPD", "Heart Failure", "AMI", "Pneumonia", "CABG"),
  avg_err = c(1.00485, 1.00271, 1.00254, 1.00212, 1.00198, 1.00187)
) %>%
  arrange(avg_err) %>%
  mutate(condition = fct_inorder(condition))

hip_row <- condition_err %>% filter(condition == "Hip/Knee")

p2 <- ggplot(condition_err, aes(x = avg_err, y = condition)) +
  geom_segment(aes(x = 1.0, xend = avg_err, yend = condition), color = FED_GRID, linewidth = 0.8) +
  geom_vline(xintercept = 1.0, color = "#333333", linewidth = 0.5) +
  geom_point(
    aes(color = condition == "Hip/Knee"),
    size = 3.8,
    stroke = 0.3
  ) +
  scale_color_manual(
    values = c("TRUE" = FED_RED, "FALSE" = FED_PRIMARY),
    guide = "none"
  ) +
  geom_text(
    aes(label = sprintf("%.5f", avg_err)),
    hjust = -0.2,
    size = 2.9,
    color = "#333333",
    family = "Helvetica"
  ) +
  annotate(
    "text",
    x = 1.0,
    y = length(levels(condition_err$condition)) + 0.5,
    label = "ERR = 1.0 (no excess)",
    color = FED_GREY_TEXT,
    size = 2.75,
    family = "Helvetica"
  ) +
  annotate(
    "text",
    x = max(condition_err$avg_err) * 1.002,
    y = "Hip/Knee",
    label = "Hip/Knee replacement",
    hjust = 0,
    color = FED_RED,
    size = 2.75,
    fontface = "bold",
    family = "Helvetica"
  ) +
  annotate(
    "segment",
    x = hip_row$avg_err,
    xend = hip_row$avg_err + 0.0005,
    y = hip_row$condition,
    yend = as.numeric(hip_row$condition) + 0.42,
    arrow = arrow(length = unit(0.1, "inches"), type = "closed"),
    color = FED_RED,
    linewidth = 0.4
  ) +
  annotate(
    "text",
    x = hip_row$avg_err + 0.00052,
    y = as.numeric(hip_row$condition) + 0.42,
    label = "Nearly 2× the excess\nof the next condition",
    hjust = 0,
    color = FED_RED,
    size = 2.65,
    fontface = "bold",
    lineheight = 0.95,
    family = "Helvetica"
  ) +
  scale_x_continuous(
    labels = function(x) sprintf("%.4f", x),
    expand = expansion(mult = c(0.01, 0.1))
  ) +
  labs(
    x = "Average excess readmission ratio (ERR)",
    y = NULL
  ) +
  theme_fed_academic(grid = "vertical") +
  theme(panel.grid.major.y = element_blank())

p2 <- finish_fed_chart(
  p2,
  figure_num = 2,
  title = "Excess readmission ratio by HRRP condition",
  note = "All six tracked conditions exceed the 1.0 benchmark; differences are measured in thousandths of a ratio point.",
  source = HRRP_SOURCE
)

save_png(p2, "chart2_err_by_condition", height = 4.8)

# ── Chart 3: Penalty tier by ownership ─────────────────────────────────────

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

tier_labels <- tibble(
  penalty_tier = factor(names(FED_TIER_COLORS), levels = names(FED_TIER_COLORS)),
  label_x = c(0.12, 0.38, 0.62, 0.86)
)

p3 <- ggplot(plot_data, aes(x = pct, y = ownership_group, fill = penalty_tier)) +
  geom_col(position = "fill", width = 0.62) +
  scale_x_continuous(labels = percent_format(accuracy = 1)) +
  scale_fill_manual(values = FED_TIER_COLORS, guide = "none") +
  geom_text(
    data = tier_labels,
    aes(x = label_x, y = 3.55, label = as.character(penalty_tier), color = as.character(penalty_tier)),
    inherit.aes = FALSE,
    size = 2.7,
    fontface = "bold",
    family = "Helvetica"
  ) +
  scale_color_manual(values = FED_TIER_COLORS, guide = "none") +
  annotate(
    "text",
    x = 0.98,
    y = "For-Profit",
    label = paste0("High-tier share: ", percent(high_pct, accuracy = 0.1)),
    hjust = 1,
    color = FED_RED,
    size = 2.75,
    fontface = "bold",
    family = "Helvetica"
  ) +
  labs(
    x = "Share of hospital-condition pairs (%)",
    y = NULL
  ) +
  theme_fed_academic(grid = "vertical") +
  theme(panel.grid.major.y = element_blank())

p3 <- finish_fed_chart(
  p3,
  figure_num = 3,
  title = "HRRP penalty tier distribution by hospital ownership type",
  note = "Stacked shares sum to 100% within each ownership group. Ownership joined from CMS Hospital General Information (xubh-q36u).",
  source = HRRP_SOURCE
)

save_png(p3, "chart3_penalty_by_ownership", height = 4.6)

cat("All readmitted charts exported to", img_dir, "\n")
