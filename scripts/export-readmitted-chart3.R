#!/usr/bin/env Rscript
# Export readmitted chart3 as Plotly JSON from cached ownership data.

suppressPackageStartupMessages({
  library(tidyverse)
  library(plotly)
  library(jsonlite)
})

root <- normalizePath(
  file.path(
    dirname(sub("^--file=", "", commandArgs(trailingOnly = FALSE)[grep("^--file=", commandArgs(trailingOnly = FALSE))])),
    ".."
  )
)

csv_path <- file.path(root, "public/data/articles/readmitted/data/hrrp_ownership_condition.csv")
out_path <- file.path(root, "public/data/articles/readmitted/charts/chart3_penalty_by_ownership.plotly.json")

df <- read_csv(csv_path, show_col_types = FALSE) %>%
  mutate(
    penalty_tier = factor(penalty_tier, levels = c("No Penalty", "Low", "Medium", "High")),
    ownership_group = factor(ownership_group, levels = c("Non-Profit", "Government", "For-Profit"))
  )

tier_colors <- c(
  "No Penalty" = "#2C3E6B",
  "Low" = "#7F8FA6",
  "Medium" = "#E07B54",
  "High" = "#C0392B"
)

p <- plot_ly(
  data = df,
  x = ~ownership_group,
  y = ~pct,
  color = ~penalty_tier,
  colors = tier_colors,
  type = "bar",
  hovertemplate = paste0(
    "<b>%{x}</b><br>",
    "Tier: %{fullData.name}<br>",
    "Share: %{y:.1%}<extra></extra>"
  )
) %>%
  layout(
    barmode = "stack",
    title = list(
      text = "<b><span style='color:#C0392B;'>For-Profit</span> Hospitals Carry More Penalty Weight</b>",
      x = 0
    ),
    paper_bgcolor = "#F2F0EB",
    plot_bgcolor = "#F2F0EB",
    font = list(color = "#1C1C1E", family = "Helvetica"),
    xaxis = list(title = ""),
    yaxis = list(title = "Share of Hospital-Condition Pairs", tickformat = ".0%"),
    showlegend = TRUE,
    legend = list(title = list(text = "Penalty Tier")),
    transition = list(duration = 500, easing = "cubic-in-out")
  ) %>%
  config(displayModeBar = TRUE, displaylogo = FALSE)

built <- plotly_build(p)
payload <- list(
  data = built$x$data,
  layout = built$x$layout,
  config = list(
    displayModeBar = TRUE,
    displaylogo = FALSE,
    responsive = TRUE
  )
)
write_json(payload, out_path, auto_unbox = TRUE, pretty = TRUE)
cat("Wrote", out_path, "\n")
