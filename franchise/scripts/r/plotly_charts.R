# Native Plotly builders for franchise report — matches static Artometrics style.

suppressPackageStartupMessages({
  library(dplyr)
  library(plotly)
})

franchise_axis <- function(title = "") {
  list(
    title = list(text = paste0("<b>", title, "</b>"), font = list(color = art_dark, size = 13)),
    tickfont = list(color = art_mid, size = 12),
    gridcolor = art_muted,
    gridwidth = 0.5,
    zeroline = FALSE,
    showline = FALSE
  )
}

franchise_layout_core <- function(title_html, subtitle, source_text) {
  list(
    title = list(
      text = title_html,
      font = list(family = "Helvetica", size = 16, color = art_dark),
      x = 0,
      xanchor = "left",
      y = 0.98,
      yanchor = "top"
    ),
    paper_bgcolor = art_cream,
    plot_bgcolor = art_cream,
    font = list(family = "Helvetica", color = art_dark),
    margin = list(t = 100, r = 60, b = 70, l = 200),
    hovermode = "closest",
    hoverlabel = list(
      bgcolor = art_dark,
      bordercolor = art_dark,
      font = list(color = "#FAFAF8", family = "Helvetica", size = 12)
    ),
    meta = list(subtitle = subtitle, source = source_text, style = "franchise"),
    width = FRANCHISE_PLOTLY_WIDTH,
    height = FRANCHISE_PLOTLY_HEIGHT
  )
}

build_chart1_plotly <- function(media_franchises, franchises) {
  top20 <- franchises %>% slice_max(total_revenue, n = 20)
  plot_data <- media_franchises %>%
    semi_join(top20, by = "franchise") %>%
    mutate(
      franchise = factor(
        franchise,
        levels = top20 %>% arrange(total_revenue) %>% pull(franchise)
      ),
      revenue_category = factor(revenue_category, levels = rev(names(category_colors)))
    )

  totals <- plot_data %>%
    group_by(franchise) %>%
    summarize(total_revenue = sum(revenue), .groups = "drop") %>%
    mutate(label = paste0("$", round(total_revenue, 0), "B"))

  p <- plot_ly()
  for (cat in levels(plot_data$revenue_category)) {
    subset <- plot_data %>% filter(revenue_category == cat)
    p <- add_bars(
      p,
      data = subset,
      y = ~franchise,
      x = ~revenue,
      name = cat,
      orientation = "h",
      marker = list(color = unname(category_colors[[cat]]), line = list(width = 0)),
      hovertemplate = paste0("<b>%{y}</b><br>", cat, ": $%{x:.1f}B<extra></extra>")
    )
  }

  p <- add_trace(
    p,
    data = totals,
    x = ~total_revenue,
    y = ~franchise,
    type = "scatter",
    mode = "text",
    text = ~label,
    textposition = "middle right",
    textfont = list(color = art_dark, size = 11, family = "Helvetica"),
    hoverinfo = "skip",
    showlegend = FALSE
  )

  layout <- franchise_layout_core(
    "IN MEDIA, <span style='color:#C0392B'><b>MERCHANDISE</b></span> IS THE REAL PRODUCT",
    "THE RED IN EVERY BAR TELLS THE SAME STORY — LICENSING & RETAIL DWARFS EVERY OTHER REVENUE STREAM",
    franchise_caption("Chart concept: David Robinson, TidyTuesday Screencast 2019-07-22 (youtu.be/1xsbTs9-a50)")
  )
  layout$barmode <- "stack"
  layout$shapes <- list(list(
    type = "line", x0 = 50, x1 = 50, y0 = 0, y1 = 1, yref = "paper",
    line = list(color = paste0(art_highlight, "99"), width = 1, dash = "dash")
  ))
  layout$xaxis <- modifyList(
    franchise_axis("Revenue (Billions USD)"),
    list(
      range = c(0, max(totals$total_revenue) * 1.18),
      tickmode = "array",
      tickvals = seq(0, 100, 25),
      ticktext = paste0("$", seq(0, 100, 25))
    )
  )
  layout$yaxis <- modifyList(
    franchise_axis(""),
    list(categoryorder = "array", categoryarray = levels(plot_data$franchise))
  )
  layout$legend <- list(
    title = list(text = "Category", font = list(color = art_dark, size = 11)),
    font = list(color = art_mid, size = 10),
    bgcolor = art_cream,
    x = 1.02, y = 1, xanchor = "left", yanchor = "top",
    traceorder = "reversed"
  )
  layout$margin$r <- 170

  p %>% layout(layout)
}

build_chart2_plotly <- function(franchises) {
  chart2_data <- franchises %>%
    mutate(
      years_active = 2019 - year_created,
      revenue_per_year = total_revenue / years_active
    ) %>%
    slice_max(revenue_per_year, n = 15) %>%
    mutate(
      franchise = factor(franchise, levels = arrange(cur_data(), revenue_per_year)$franchise),
      label = paste0("$", round(revenue_per_year, 1), "B/yr")
    )

  p <- plot_ly()
  for (i in seq_len(nrow(chart2_data))) {
    row <- chart2_data[i, ]
    col <- if (row$franchise == "Pokémon") art_highlight else art_secondary
    sz <- if (row$franchise == "Pokémon") 14 else 9
    p <- add_segments(
      p,
      x = 0, xend = row$revenue_per_year,
      y = row$franchise, yend = row$franchise,
      line = list(width = 2, color = col),
      hovertemplate = paste0("<b>", row$franchise, "</b><br>$", round(row$revenue_per_year, 1), "B/yr<extra></extra>"),
      showlegend = FALSE
    )
    p <- add_markers(
      p,
      x = row$revenue_per_year, y = row$franchise,
      marker = list(size = sz, color = col),
      hovertemplate = paste0("<b>", row$franchise, "</b><br>$", round(row$revenue_per_year, 1), "B/yr<extra></extra>"),
      showlegend = FALSE
    )
    p <- add_trace(
      p,
      x = row$revenue_per_year, y = row$franchise,
      type = "scatter", mode = "text", text = row$label,
      textposition = "middle right",
      textfont = list(color = art_dark, size = 11),
      hoverinfo = "skip", showlegend = FALSE
    )
  }

  layout <- franchise_layout_core(
    "<span style='color:#C0392B'><b>POKÉMON</b></span> EARNS MORE PER YEAR THAN MOST FRANCHISES EARN IN A LIFETIME",
    "~$4B ANNUALLY SINCE 1996 — MORE THAN HELLO KITTY, WHICH IS TWICE ITS AGE",
    franchise_caption("Revenue ÷ (2019 − year created)")
  )
  layout$shapes <- list(list(
    type = "line", x0 = 2, x1 = 2, y0 = 0, y1 = 1, yref = "paper",
    line = list(color = paste0(art_highlight, "99"), width = 1, dash = "dash")
  ))
  layout$xaxis <- modifyList(
    franchise_axis("Revenue Per Year (Billions USD)"),
    list(
      range = c(0, max(chart2_data$revenue_per_year) * 1.28),
      tickmode = "array",
      tickvals = 0:5,
      ticktext = paste0("$", 0:5)
    )
  )
  layout$yaxis <- modifyList(
    franchise_axis(""),
    list(categoryorder = "array", categoryarray = levels(chart2_data$franchise))
  )

  p %>% layout(layout)
}

build_chart3a_plotly <- function(media_franchises) {
  non_consolidated <- media_franchises %>%
    group_by(owners) %>%
    summarise(
      total_revenue = sum(revenue, na.rm = TRUE),
      franchises_owned = n_distinct(franchise),
      .groups = "drop"
    ) %>%
    filter(franchises_owned >= 2) %>%
    slice_max(total_revenue, n = 14) %>%
    mutate(
      owners = factor(owners, levels = arrange(cur_data(), total_revenue)$owners),
      fill = case_when(
        owners == "The Walt Disney Company" ~ art_highlight,
        owners == "Marvel Entertainment (The Walt Disney Company)" ~ "#D4695E",
        owners == "20th Century Fox (The Walt Disney Company)" ~ "#E8A09A",
        TRUE ~ art_secondary
      ),
      label = paste0("$", round(total_revenue), "B")
    )

  p <- plot_ly(
    non_consolidated,
    y = ~owners, x = ~total_revenue,
    type = "bar", orientation = "h",
    marker = list(color = ~fill, line = list(width = 0)),
    hovertemplate = "<b>%{y}</b><br>$%{x:.0f}B<extra></extra>",
    showlegend = FALSE
  ) %>%
    add_trace(
      data = non_consolidated,
      x = ~total_revenue, y = ~owners,
      type = "scatter", mode = "text", text = ~label,
      textposition = "middle right",
      textfont = list(color = art_dark, size = 11),
      hoverinfo = "skip", showlegend = FALSE,
      inherit = FALSE
    )

  layout <- franchise_layout_core(
    "THREE OF THESE BARS BELONG TO <span style='color:#C0392B'><b>THE SAME COMPANY</b></span>",
    "MARVEL ENTERTAINMENT AND 20TH CENTURY FOX APPEAR AS SEPARATE COMPETITORS — BOTH ARE WHOLLY OWNED BY DISNEY",
    franchise_caption("Wikipedia via TidyTuesday")
  )
  layout$xaxis <- modifyList(
    franchise_axis("Total Revenue (Billions USD)"),
    list(
      range = c(0, max(non_consolidated$total_revenue) * 1.22),
      tickmode = "array",
      tickvals = seq(0, 300, 100),
      ticktext = paste0("$", seq(0, 300, 100), "B")
    )
  )
  layout$yaxis <- modifyList(
    franchise_axis(""),
    list(categoryorder = "array", categoryarray = levels(non_consolidated$owners))
  )

  p %>% layout(layout)
}

build_chart3b_plotly <- function(media_franchises) {
  disney_consolidated <- media_franchises %>%
    mutate(
      parent_company = if_else(
        grepl("Walt Disney", owners),
        "The Walt Disney Company (consolidated)",
        owners
      )
    ) %>%
    group_by(parent_company) %>%
    summarise(
      total_revenue = sum(revenue, na.rm = TRUE),
      franchises_owned = n_distinct(franchise),
      .groups = "drop"
    ) %>%
    filter(franchises_owned >= 2) %>%
    slice_max(total_revenue, n = 12) %>%
    mutate(
      parent_company = factor(parent_company, levels = arrange(cur_data(), total_revenue)$parent_company),
      fill = if_else(grepl("Walt Disney", parent_company), art_highlight, art_secondary),
      label = paste0("$", round(total_revenue), "B")
    )

  p <- plot_ly(
    disney_consolidated,
    y = ~parent_company, x = ~total_revenue,
    type = "bar", orientation = "h",
    marker = list(color = ~fill, line = list(width = 0)),
    hovertemplate = "<b>%{y}</b><br>$%{x:.0f}B<extra></extra>",
    showlegend = FALSE
  ) %>%
    add_trace(
      data = disney_consolidated,
      x = ~total_revenue, y = ~parent_company,
      type = "scatter", mode = "text", text = ~label,
      textposition = "middle right",
      textfont = list(color = art_dark, size = 11),
      hoverinfo = "skip", showlegend = FALSE,
      inherit = FALSE
    )

  layout <- franchise_layout_core(
    "<span style='color:#C0392B'><b>DISNEY</b></span> DOESN'T JUST OWN THE MOST IP — IT OWNS THE COMPANIES THAT OWN THE IP",
    "CONSOLIDATED BY PARENT COMPANY — MARVEL ENTERTAINMENT AND 20TH CENTURY FOX FOLDED INTO DISNEY'S TRUE TOTAL",
    franchise_caption("Wikipedia via TidyTuesday")
  )
  layout$xaxis <- modifyList(
    franchise_axis("Total Revenue (Billions USD)"),
    list(
      range = c(0, max(disney_consolidated$total_revenue) * 1.22),
      tickmode = "array",
      tickvals = seq(0, 500, 100),
      ticktext = paste0("$", seq(0, 500, 100), "B")
    )
  )
  layout$yaxis <- modifyList(
    franchise_axis(""),
    list(categoryorder = "array", categoryarray = levels(disney_consolidated$parent_company))
  )

  p %>% layout(layout)
}
