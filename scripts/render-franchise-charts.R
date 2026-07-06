# Build and export all franchise report charts (ggplot + plotly JSON).
# Usage: Rscript scripts/render-franchise-charts.R

suppressPackageStartupMessages({
  library(tidyverse)
  library(scales)
  library(glue)
  library(plotly)
})

repo_root <- Sys.getenv("FRANCHISE_REPO", unset = normalizePath("franchise", mustWork = FALSE))
if (!dir.exists(repo_root)) {
  stop("Franchise repo directory not found: ", repo_root)
}

source(file.path(repo_root, "scripts/r/franchise_theme.R"))

charts_dir <- file.path(repo_root, "charts")
site_charts_dir <- file.path(
  dirname(dirname(repo_root)),
  "public/data/articles/franchise/charts"
)

media_franchises <- readr::read_csv(
  file.path(repo_root, "data/media_franchises.csv"),
  show_col_types = FALSE
)

franchises <- media_franchises %>%
  group_by(franchise, original_media, year_created, creators, owners) %>%
  summarize(
    categories    = length(revenue),
    total_revenue = sum(revenue),
    .groups       = "drop"
  )

copy_to_site <- function(filename) {
  if (!dir.exists(site_charts_dir)) return(invisible(NULL))
  for (ext in c(".png", ".plotly.json")) {
    from <- file.path(charts_dir, paste0(filename, ext))
    if (file.exists(from)) {
      file.copy(from, file.path(site_charts_dir, paste0(filename, ext)), overwrite = TRUE)
    }
  }
}

export_pair <- function(gg, pl, filename) {
  save_franchise_chart(gg, pl, filename, charts_dir = charts_dir)
  copy_to_site(filename)
  message("Wrote ", filename)
}

# ── Chart 1: stacked top 20 ───────────────────────────────────────
top20 <- franchises %>% slice_max(total_revenue, n = 20)

plot_data <- media_franchises %>%
  semi_join(top20, by = "franchise") %>%
  mutate(
    franchise        = fct_reorder(franchise, revenue, sum),
    revenue_category = fct_relevel(
      revenue_category,
      rev(names(category_colors))
    )
  )

label_data1 <- plot_data %>%
  group_by(franchise) %>%
  summarize(total_revenue = sum(revenue), .groups = "drop") %>%
  mutate(
    franchise_num = as.numeric(franchise),
    label = paste0("$", round(total_revenue, 0), "B")
  )

p1 <- ggplot(plot_data, aes(franchise, revenue, fill = revenue_category)) +
  geom_hline(yintercept = 50, color = art_highlight, linetype = "dashed",
             linewidth = 0.5, alpha = 0.6) +
  geom_col(width = 0.9) +
  geom_text(
    data = label_data1,
    aes(x = franchise, y = total_revenue, label = label),
    inherit.aes = FALSE,
    hjust = -0.05,
    size = 2.8,
    color = art_dark
  ) +
  scale_y_continuous(labels = dollar, expand = expansion(mult = c(0, 0.18))) +
  scale_fill_manual(values = category_colors) +
  coord_flip() +
  guides(fill = guide_legend(reverse = TRUE)) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank()) +
  labs(
    title = "IN MEDIA, <span style='color:#C0392B'>**MERCHANDISE**</span> IS THE REAL PRODUCT",
    subtitle = "THE RED IN EVERY BAR TELLS THE SAME STORY — LICENSING & RETAIL DWARFS EVERY OTHER REVENUE STREAM",
    x = NULL,
    y = "Revenue (Billions USD)",
    fill = "Category",
    caption = franchise_caption(
      "Chart concept: David Robinson, TidyTuesday Screencast 2019-07-22 (youtu.be/1xsbTs9-a50)"
    )
  )

p1_plotly <- ggplotly(
  p1 + theme(plot.margin = margin(t = 16, r = 120, b = 16, l = 16)),
  tooltip = c("y", "x", "fill")
) %>%
  plotly_franchise_layout(
    "IN MEDIA, <span style='color:#C0392B'><b>MERCHANDISE</b></span> IS THE REAL PRODUCT",
    "THE RED IN EVERY BAR TELLS THE SAME STORY — LICENSING & RETAIL DWARFS EVERY OTHER REVENUE STREAM"
  ) %>%
  add_bar_value_annotations(
    label_data1 %>% mutate(x = total_revenue, y = franchise_num),
    "x", "y", "label",
    x_pad = 1.03
  )

export_pair(p1, p1_plotly, "chart1_top20_revenue")

# ── Chart 2: revenue per year lollipop ────────────────────────────
chart2_data <- franchises %>%
  mutate(
    years_active     = 2019 - year_created,
    revenue_per_year = total_revenue / years_active,
    is_top           = as.character(franchise == "Pokémon")
  ) %>%
  slice_max(revenue_per_year, n = 15) %>%
  mutate(
    franchise = fct_reorder(franchise, revenue_per_year),
    franchise_num = as.numeric(franchise),
    label = paste0("$", round(revenue_per_year, 1), "B/yr")
  )

p2 <- ggplot(chart2_data, aes(x = franchise, y = revenue_per_year)) +
  geom_hline(yintercept = 2, color = art_highlight, linetype = "dashed",
             linewidth = 0.5, alpha = 0.6) +
  geom_segment(
    aes(xend = franchise, y = 0, yend = revenue_per_year, color = is_top),
    linewidth = 0.8
  ) +
  geom_point(aes(color = is_top, size = is_top)) +
  geom_text(aes(label = label), hjust = -0.2, size = 3, color = art_dark) +
  scale_color_manual(values = c("TRUE" = art_highlight, "FALSE" = art_secondary), guide = "none") +
  scale_size_manual(values = c("TRUE" = 7, "FALSE" = 4.5), guide = "none") +
  scale_y_continuous(labels = dollar, expand = expansion(mult = c(0, 0.28))) +
  coord_flip() +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank()) +
  labs(
    title = "<span style='color:#C0392B'>POKÉMON</span> EARNS MORE PER YEAR THAN MOST FRANCHISES EARN IN A LIFETIME",
    subtitle = "~$4B ANNUALLY SINCE 1996 — MORE THAN HELLO KITTY, WHICH IS TWICE ITS AGE",
    x = NULL,
    y = "Revenue Per Year (Billions USD)",
    caption = franchise_caption("Revenue ÷ (2019 − year created)")
  )

p2_plotly <- ggplotly(
  p2 + theme(plot.margin = margin(t = 16, r = 120, b = 16, l = 16)),
  tooltip = c("y", "x")
) %>%
  plotly_franchise_layout(
    "<span style='color:#C0392B'><b>POKÉMON</b></span> EARNS MORE PER YEAR THAN MOST FRANCHISES EARN IN A LIFETIME",
    "~$4B ANNUALLY SINCE 1996 — MORE THAN HELLO KITTY, WHICH IS TWICE ITS AGE"
  ) %>%
  add_bar_value_annotations(
    chart2_data %>% mutate(x = revenue_per_year, y = franchise_num),
    "x", "y", "label",
    x_pad = 1.05
  )

export_pair(p2, p2_plotly, "chart2_revenue_per_year")

# ── Chart 3a: Disney non-consolidated ─────────────────────────────
non_consolidated <- media_franchises %>%
  group_by(owners) %>%
  summarise(
    total_revenue    = sum(revenue, na.rm = TRUE),
    franchises_owned = n_distinct(franchise),
    .groups = "drop"
  ) %>%
  filter(franchises_owned >= 2) %>%
  slice_max(total_revenue, n = 14) %>%
  mutate(
    owners      = fct_reorder(owners, total_revenue),
    owners_num  = as.numeric(owners),
    disney_flag = case_when(
      owners == "The Walt Disney Company"                        ~ "disney_direct",
      owners == "Marvel Entertainment (The Walt Disney Company)" ~ "disney_marvel",
      owners == "20th Century Fox (The Walt Disney Company)"     ~ "disney_fox",
      TRUE                                                       ~ "other"
    ),
    label = paste0("$", round(total_revenue), "B")
  )

p3a <- ggplot(non_consolidated, aes(x = owners, y = total_revenue, fill = disney_flag)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_text(aes(label = label), hjust = -0.12, color = art_dark, size = 3.2) +
  scale_fill_manual(values = c(
    "disney_direct" = art_highlight,
    "disney_marvel" = "#D4695E",
    "disney_fox"    = "#E8A09A",
    "other"         = art_secondary
  )) +
  scale_y_continuous(labels = dollar_format(suffix = "B"), expand = expansion(mult = c(0, 0.22))) +
  coord_flip() +
  theme_artometrics() +
  theme(axis.text.y = element_text(size = 9)) +
  labs(
    title = "THREE OF THESE BARS BELONG TO <span style='color:#C0392B'>**THE SAME COMPANY**</span>",
    subtitle = "MARVEL ENTERTAINMENT AND 20TH CENTURY FOX APPEAR AS SEPARATE COMPETITORS — BOTH ARE WHOLLY OWNED BY DISNEY",
    x = NULL,
    y = "Total Revenue (Billions USD)",
    caption = franchise_caption("Wikipedia via TidyTuesday")
  )

p3a_plotly <- ggplotly(
  p3a + theme(plot.margin = margin(t = 16, r = 120, b = 16, l = 16)),
  tooltip = c("y", "x", "fill")
) %>%
  plotly_franchise_layout(
    "THREE OF THESE BARS BELONG TO <span style='color:#C0392B'><b>THE SAME COMPANY</b></span>",
    "MARVEL ENTERTAINMENT AND 20TH CENTURY FOX APPEAR AS SEPARATE COMPETITORS — BOTH ARE WHOLLY OWNED BY DISNEY"
  ) %>%
  add_bar_value_annotations(
    non_consolidated %>% mutate(x = total_revenue, y = owners_num),
    "x", "y", "label",
    x_pad = 1.03
  )

export_pair(p3a, p3a_plotly, "chart3a_disney_non_consolidated")

# ── Chart 3b: Disney consolidated ─────────────────────────────────
disney_consolidated <- media_franchises %>%
  mutate(
    parent_company = case_when(
      str_detect(owners, "Walt Disney") ~ "The Walt Disney Company\n(consolidated)",
      TRUE ~ owners
    )
  ) %>%
  group_by(parent_company) %>%
  summarise(
    total_revenue    = sum(revenue, na.rm = TRUE),
    franchises_owned = n_distinct(franchise),
    .groups = "drop"
  ) %>%
  filter(franchises_owned >= 2) %>%
  slice_max(total_revenue, n = 12) %>%
  mutate(
    parent_company = fct_reorder(parent_company, total_revenue),
    parent_num     = as.numeric(parent_company),
    is_disney      = str_detect(parent_company, "Walt Disney"),
    label          = paste0("$", round(total_revenue), "B")
  )

p3b <- ggplot(disney_consolidated, aes(x = parent_company, y = total_revenue, fill = is_disney)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_text(aes(label = label), hjust = -0.12, color = art_dark, size = 3.2) +
  scale_fill_manual(values = c("FALSE" = art_secondary, "TRUE" = art_highlight)) +
  scale_y_continuous(labels = dollar_format(suffix = "B"), expand = expansion(mult = c(0, 0.22))) +
  coord_flip() +
  theme_artometrics() +
  theme(axis.text.y = element_text(size = 9)) +
  labs(
    title = "<span style='color:#C0392B'>**DISNEY**</span> DOESN'T JUST OWN THE MOST IP — IT OWNS THE COMPANIES THAT OWN THE IP",
    subtitle = "CONSOLIDATED BY PARENT COMPANY — MARVEL ENTERTAINMENT AND 20TH CENTURY FOX FOLDED INTO DISNEY'S TRUE TOTAL",
    x = NULL,
    y = "Total Revenue (Billions USD)",
    caption = franchise_caption("Wikipedia via TidyTuesday")
  )

p3b_plotly <- ggplotly(
  p3b + theme(plot.margin = margin(t = 16, r = 120, b = 16, l = 16)),
  tooltip = c("y", "x", "fill")
) %>%
  plotly_franchise_layout(
    "<span style='color:#C0392B'><b>DISNEY</b></span> DOESN'T JUST OWN THE MOST IP — IT OWNS THE COMPANIES THAT OWN THE IP",
    "CONSOLIDATED BY PARENT COMPANY — MARVEL ENTERTAINMENT AND 20TH CENTURY FOX FOLDED INTO DISNEY'S TRUE TOTAL"
  ) %>%
  add_bar_value_annotations(
    disney_consolidated %>% mutate(x = total_revenue, y = parent_num),
    "x", "y", "label",
    x_pad = 1.03
  )

export_pair(p3b, p3b_plotly, "chart3b_disney_consolidated")

message("Done — charts in ", charts_dir)
