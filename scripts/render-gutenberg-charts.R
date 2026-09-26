#!/usr/bin/env Rscript
# Export Gutenberg charts (PNG + Plotly JSON). Editorial indices align with
# scripts/generate_culture_canon.py — migrate to catalog ingestion later.

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

slug <- "gutenberg"
ART_CREAM <<- "#F2F0EB"
ART_BLUE <<- "#2C3E6B"
FONT <- "Helvetica"
GUTENBERG_SOURCE <- "Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS"

article_dir <- file.path(repo_root, "articles", slug)
charts_dir <- file.path(article_dir, "charts")
dir.create(charts_dir, recursive = TRUE, showWarnings = FALSE)

public_img <- file.path(repo_root, "public/images/content/articles", slug, "charts")
public_data <- file.path(repo_root, "public/data/articles", slug, "charts")
dir.create(public_img, recursive = TRUE, showWarnings = FALSE)
dir.create(public_data, recursive = TRUE, showWarnings = FALSE)

write_plotly_json <- function(fig, path) {
  built <- plotly_build(fig)
  payload <- list(
    data = built$x$data,
    layout = built$x$layout,
    config = art_plotly_config()
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
    file.path(public_data, paste0(name, ".plotly.json")),
    overwrite = TRUE
  )
  r_path <- file.path(charts_dir, paste0(name, ".r"))
  if (file.exists(r_path)) {
    file.copy(
      r_path,
      file.path(public_data, paste0(name, ".r")),
      overwrite = TRUE
    )
  }
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
    device = if (requireNamespace("ragg", quietly = TRUE)) ragg::agg_png else "png"
  )
  message("Wrote ", path)
  invisible(path)
}

plotly_gutenberg_layout <- function(fig, title, subtitle, x_title = "", y_title = "", show_legend = FALSE) {
  layout(
    fig,
    title = list(
      text = paste0(
        "<b>", title, "<br><span style='color:", ART_HIGHLIGHT, "'>", subtitle, "</span></b>"
      ),
      font = list(family = "DM Sans, Helvetica, sans-serif", size = 15, color = ART_DARK),
      x = 0.5,
      xanchor = "center",
      automargin = TRUE
    ),
    paper_bgcolor = ART_CREAM,
    plot_bgcolor = ART_CREAM,
    font = list(family = "DM Sans, Helvetica, sans-serif", color = ART_DARK, size = 12),
    margin = list(l = 92, r = 52, t = 88, b = 68),
    height = 540,
    hovermode = "closest",
    showlegend = show_legend,
    xaxis = list(
      title = list(text = x_title),
      showgrid = TRUE,
      gridcolor = "#DEDAD1",
      linecolor = "#6B6B6B",
      tickfont = list(color = "#6B6B6B", size = 11),
      zeroline = FALSE
    ),
    yaxis = list(
      title = list(text = y_title),
      showgrid = TRUE,
      gridcolor = "#DEDAD1",
      linecolor = "#6B6B6B",
      tickfont = list(color = "#6B6B6B", size = 11),
      zeroline = FALSE,
      automargin = TRUE
    ),
    legend = if (show_legend) {
      list(orientation = "h", x = 0.5, xanchor = "center", y = 1.08)
    } else {
      NULL
    }
  )
}

theme_gutenberg <- function() {
  theme_artometrics(12) +
    theme(
      plot.background = element_rect(fill = ART_CREAM, color = NA),
      panel.background = element_rect(fill = ART_CREAM, color = NA),
      panel.grid.major = element_line(color = "#DEDAD1", linewidth = 0.35)
    )
}

# ── Chart 1: Language gravity ────────────────────────────────────────────────

chart1 <- tibble(
  language = c("English", "French", "German", "Finnish", "Dutch", "Portuguese", "Italian", "Spanish"),
  share = c(72, 7, 6, 3, 3, 2, 2, 2),
  color = if_else(language == "English", ART_HIGHLIGHT, ART_BLUE)
) %>%
  mutate(language = fct_reorder(language, share))

p1 <- ggplot(chart1, aes(x = share, y = language, fill = color)) +
  geom_col(width = 0.72, color = NA) +
  scale_fill_identity() +
  labs(
    title = "The public-domain shelf is language-weighted",
    subtitle = "ENGLISH DOMINATES THE ACCESSIBLE CANON",
    x = "Catalog share index",
    y = NULL
  ) +
  theme_gutenberg()

save_png(p1, "chart1_language_gravity", height = 6)

fig1 <- plot_ly(
  chart1,
  x = ~share,
  y = ~language,
  type = "bar",
  orientation = "h",
  marker = list(color = ~color, line = list(color = ART_DARK, width = 0.4)),
  hovertemplate = "<b>%{y}</b><br>Catalog share index: %{x}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "The public-domain shelf is language-weighted",
    "ENGLISH DOMINATES THE ACCESSIBLE CANON",
    x_title = "Catalog share index"
  )
write_plotly_json(fig1, file.path(charts_dir, "chart1_language_gravity.plotly.json"))
copy_to_public("chart1_language_gravity")

# ── Chart 2: Era / subject lines ─────────────────────────────────────────────

eras <- c("Pre-1800", "1800-1849", "1850-1899", "1900-1924", "1925-1949", "1950+")
chart2 <- tibble(
  era = eras,
  fiction = c(22, 48, 86, 74, 34, 18),
  nonfiction = c(61, 58, 64, 72, 52, 29)
)

p2 <- chart2 %>%
  pivot_longer(c(fiction, nonfiction), names_to = "series", values_to = "index") %>%
  mutate(series = recode(series, fiction = "Fiction/literature", nonfiction = "Nonfiction/reference")) %>%
  ggplot(aes(x = era, y = index, color = series, group = series)) +
  geom_line(linewidth = 1.1) +
  geom_point(size = 2.8) +
  scale_color_manual(values = c("Fiction/literature" = ART_HIGHLIGHT, "Nonfiction/reference" = ART_BLUE)) +
  labs(
    title = "Public domain is an era machine",
    subtitle = "THE 19TH CENTURY BECOMES THE LITERARY CORE",
    x = "Publication era",
    y = "Subject presence index",
    color = NULL
  ) +
  theme_gutenberg() +
  theme(legend.position = "top")

save_png(p2, "chart2_era_subject_stack", height = 6)

fig2 <- plot_ly() %>%
  add_trace(
    x = eras, y = chart2$fiction, type = "scatter", mode = "lines+markers",
    name = "Fiction/literature",
    line = list(color = ART_HIGHLIGHT, width = 3),
    marker = list(size = 8, color = ART_HIGHLIGHT),
    hovertemplate = "<b>%{x}</b><br>Fiction/literature index: %{y}<extra></extra>"
  ) %>%
  add_trace(
    x = eras, y = chart2$nonfiction, type = "scatter", mode = "lines+markers",
    name = "Nonfiction/reference",
    line = list(color = ART_BLUE, width = 3),
    marker = list(size = 8, color = ART_BLUE),
    hovertemplate = "<b>%{x}</b><br>Nonfiction/reference index: %{y}<extra></extra>"
  ) %>%
  plotly_gutenberg_layout(
    "Public domain is an era machine",
    "THE 19TH CENTURY BECOMES THE LITERARY CORE",
    x_title = "Publication era",
    y_title = "Subject presence index",
    show_legend = TRUE
  )
write_plotly_json(fig2, file.path(charts_dir, "chart2_era_subject_stack.plotly.json"))
copy_to_public("chart2_era_subject_stack")

# ── Chart 3: Author availability vs memory ───────────────────────────────────

chart3 <- tibble(
  author = c("Dickens", "Twain", "Austen", "Doyle", "Dumas", "Shakespeare", "Verne", "Tolstoy", "Woolf", "Poe"),
  availability = c(95, 91, 82, 88, 84, 96, 83, 78, 72, 86),
  memory = c(91, 88, 92, 85, 78, 99, 81, 94, 83, 87),
  highlight = author %in% c("Shakespeare", "Austen", "Dickens")
)

p3 <- ggplot(chart3, aes(x = availability, y = memory, color = highlight)) +
  geom_point(size = 3.6) +
  geom_text(aes(label = author), hjust = -0.15, vjust = 0.35, size = 3, show.legend = FALSE) +
  scale_color_manual(values = c("TRUE" = ART_HIGHLIGHT, "FALSE" = ART_BLUE), guide = "none") +
  scale_x_continuous(expand = expansion(mult = c(0.05, 0.18))) +
  labs(
    title = "Availability and memory reinforce each other",
    subtitle = "PUBLIC DOMAIN TURNS AUTHORS INTO INFRASTRUCTURE",
    x = "Digital availability index",
    y = "Cultural memory index"
  ) +
  theme_gutenberg()

save_png(p3, "chart3_author_availability_memory", height = 6.5)

fig3 <- plot_ly(
  chart3,
  x = ~availability,
  y = ~memory,
  text = ~author,
  type = "scatter",
  mode = "markers",
  marker = list(
    size = 22,
    color = ~if_else(highlight, ART_HIGHLIGHT, ART_BLUE)
  ),
  hovertemplate = "<b>%{text}</b><br>Digital availability index: %{x}<br>Cultural memory index: %{y}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "Availability and memory reinforce each other",
    "PUBLIC DOMAIN TURNS AUTHORS INTO INFRASTRUCTURE",
    x_title = "Digital availability index",
    y_title = "Cultural memory index"
  )
write_plotly_json(fig3, file.path(charts_dir, "chart3_author_availability_memory.plotly.json"))
copy_to_public("chart3_author_availability_memory")

# ── Chart 4: Subject adaptation power ────────────────────────────────────────

chart4 <- tibble(
  subject = c("Adventure", "Manners", "Gothic", "Science", "War", "Travel", "Religion", "Children"),
  power = c(88, 72, 81, 66, 76, 63, 54, 84),
  color = if_else(subject %in% c("Adventure", "Children"), ART_HIGHLIGHT, ART_BLUE)
)

p4 <- ggplot(chart4, aes(x = subject, y = power, fill = color)) +
  geom_col(width = 0.72, color = NA) +
  scale_fill_identity() +
  labs(
    title = "Some public-domain subjects adapt better",
    subtitle = "ADVENTURE AND CHILDHOOD TRAVEL CLEANLY",
    x = "Subject family",
    y = "Adaptation power index"
  ) +
  theme_gutenberg() +
  theme(axis.text.x = element_text(angle = 35, hjust = 1))

save_png(p4, "chart4_subject_adaptation_power", height = 6)

fig4 <- plot_ly(
  chart4,
  x = ~subject,
  y = ~power,
  type = "bar",
  marker = list(color = ~color, line = list(color = ART_DARK, width = 0.4)),
  hovertemplate = "<b>%{x}</b><br>Adaptation power index: %{y}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "Some public-domain subjects adapt better",
    "ADVENTURE AND CHILDHOOD TRAVEL CLEANLY",
    x_title = "Subject family",
    y_title = "Adaptation power index"
  )
write_plotly_json(fig4, file.path(charts_dir, "chart4_subject_adaptation_power.plotly.json"))
copy_to_public("chart4_subject_adaptation_power")

# ── Chart 5: Classroom vs pop reuse ──────────────────────────────────────────

chart5 <- tibble(
  work = c(
    "Pride and Prejudice", "Sherlock Holmes", "Dracula", "Frankenstein",
    "Moby-Dick", "Alice", "Tom Sawyer", "War and Peace"
  ),
  classroom = c(92, 78, 69, 82, 74, 71, 64, 88),
  reuse = c(76, 95, 93, 91, 58, 88, 70, 61),
  highlight = work %in% c("Sherlock Holmes", "Dracula", "Frankenstein")
)

p5 <- ggplot(chart5, aes(x = classroom, y = reuse, color = highlight)) +
  geom_point(size = 3.6) +
  geom_text(aes(label = work), hjust = -0.12, vjust = 0.35, size = 2.8, show.legend = FALSE) +
  scale_color_manual(values = c("TRUE" = ART_HIGHLIGHT, "FALSE" = ART_BLUE), guide = "none") +
  scale_x_continuous(expand = expansion(mult = c(0.05, 0.2))) +
  labs(
    title = "Canon has school and remix versions",
    subtitle = "SOME BOOKS BECOME CURRICULUM, OTHERS BECOME MONSTERS",
    x = "Classroom canon index",
    y = "Pop reuse index"
  ) +
  theme_gutenberg()

save_png(p5, "chart5_classroom_vs_reuse", height = 6.5)

fig5 <- plot_ly(
  chart5,
  x = ~classroom,
  y = ~reuse,
  text = ~work,
  type = "scatter",
  mode = "markers",
  marker = list(
    size = 18,
    color = ~if_else(highlight, ART_HIGHLIGHT, ART_BLUE)
  ),
  hovertemplate = "<b>%{text}</b><br>Classroom canon: %{x}<br>Pop reuse index: %{y}<extra></extra>"
) %>%
  plotly_gutenberg_layout(
    "Canon has school and remix versions",
    "SOME BOOKS BECOME CURRICULUM, OTHERS BECOME MONSTERS",
    x_title = "Classroom canon index",
    y_title = "Pop reuse index"
  )
write_plotly_json(fig5, file.path(charts_dir, "chart5_classroom_vs_reuse.plotly.json"))
copy_to_public("chart5_classroom_vs_reuse")

cat("All gutenberg R charts exported to", charts_dir, "and synced to public/\n")
