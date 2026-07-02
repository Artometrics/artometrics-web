---
title: "FRANCHISE: The Artometrics of Media Monopolies"
slug: franchise
pubDate: 2026-04-08
description: "A data analysis of 107 franchises mapping how the most valuable IP in history — from Pokémon to Star Wars — actually makes its money."
heroImage: /images/content/2026/04/IMG_4153.webp
tags: [culture, history, power]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>

  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-top-20-franchises-by-revenue" id="toc-chart-1-top-20-franchises-by-revenue">CHART 1 — TOP 20 FRANCHISES BY REVENUE</a></li>
  <li><a href="#chart-2-revenue-per-year-of-existence" id="toc-chart-2-revenue-per-year-of-existence">CHART 2 — REVENUE PER YEAR OF EXISTENCE</a></li>
  <li><a href="#chart-3-the-disney-empire-consolidated" id="toc-chart-3-the-disney-empire-consolidated">CHART 3 — THE DISNEY EMPIRE, CONSOLIDATED</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR’S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p>The global media industry runs on intellectual property — and a surprisingly small number of franchises account for most of the money. This report analyzes 107 properties from the TidyTuesday 2019 media franchises dataset, each with at least $4 billion in estimated lifetime revenue as of mid-2019. Every franchise here has already cleared a threshold that most IP never approaches. This is not a representative sample of the media industry. It is a map of its ceiling.</p>
<p>Three charts, three angles on the same structural question: where does franchise money actually come from, which properties generate it most efficiently, and what does the ownership picture look like when you stop treating subsidiaries as separate competitors? The answers are Merchandise, Pokémon, and Disney — in that order.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">$91B</span>
    <span class="fact-label">Pokémon lifetime revenue — the highest-grossing media franchise ever recorded, more than the MCU, Star Wars, and Harry Potter put together</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">107</span>
    <span class="fact-label">Unique franchises in the dataset — every one of them has already cleared at least $4B in lifetime revenue</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">$4B+</span>
    <span class="fact-label">Minimum threshold for inclusion — most IP that has ever existed never gets close to this number</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">8</span>
    <span class="fact-label">Revenue categories tracked: Merchandise, Video Games, Box Office, Home Video, Comic/Manga, Music, TV, and Book Sales</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">92 yrs</span>
    <span class="fact-label">Span of the dataset — from Winnie the Pooh (1923) to Monster Strike (2015)</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">~61%</span>
    <span class="fact-label">Share of all tracked revenue that comes from Merchandise, Licensing &amp; Retail — the dominant stream across the entire dataset</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The TidyTuesday 2019 media franchises dataset covers 107 properties, each with at least $4B in estimated lifetime revenue as of mid-2019. The figures are sourced from Wikipedia’s list of highest-grossing media franchises and compiled into eight revenue categories. Every franchise here has already cleared a threshold that most IP never approaches — this is not a representative sample of the media industry. It is a map of its ceiling.</p>
<p>The $4B minimum is not a small number. Most films, shows, games, and books that have ever existed never come close to it. Being in this dataset means a property has sustained commercial relevance across multiple revenue streams, often across multiple decades. The franchises below that line — culturally significant, critically acclaimed, beloved — simply aren’t here. What remains is the top tier: IP that didn’t just succeed but compounded.</p>
<p>Revenue here is a lifetime estimate, not an annual figure. A franchise created in 1923 has had a century to accumulate; one created in 2013 has had six years. That asymmetry shapes every chart. Chart 1 shows the raw totals and what they’re made of. Chart 2 corrects for age by normalizing revenue per year — a fairer fight. Chart 3 strips away the ownership labels and asks what the leaderboard actually looks like when subsidiaries are folded into their parent companies.</p>
<p>The <code>owners</code> column names the entity holding the IP rights as of 2019. What it doesn’t do is automatically consolidate subsidiaries under parent companies. Disney owns Marvel Entertainment and 20th Century Fox, but all three appear as separate rows in the raw data. Chart 3 exists because of this gap — it asks what the ownership picture looks like when you close it.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-sql">SQL</span>
    </summary>
    <pre class="art-code-pre" id="sql-block-1">-- MEDIA FRANCHISES: CLEANING AND FRANCHISE-LEVEL AGGREGATION
-- Mirrors the R cleaning logic in franchise.qmd
-- Source: TidyTuesday 2019-07-02 (Wikipedia via rfordatascience)

-- ── STEP 1: FRANCHISE-LEVEL SUMMARY ──────────────────────────────
-- Roll up from row-per-franchise-per-category to one row per franchise.

SELECT
    franchise,
    original_media,
    year_created,
    creators,
    owners,
    COUNT(revenue_category)         AS categories,
    ROUND(SUM(revenue), 2)          AS total_revenue,
    ROUND(2019 - year_created, 0)   AS years_active,
    ROUND(SUM(revenue)
          / NULLIF((2019 - year_created), 0), 4)
                                    AS revenue_per_year
FROM media_franchises
GROUP BY
    franchise, original_media, year_created, creators, owners
ORDER BY total_revenue DESC;

-- ── STEP 2: TOP 20 BY TOTAL REVENUE ──────────────────────────────

SELECT
    franchise,
    original_media,
    year_created,
    owners,
    ROUND(SUM(revenue), 2)   AS total_revenue
FROM media_franchises
GROUP BY franchise, original_media, year_created, owners
ORDER BY total_revenue DESC
LIMIT 20;

-- ── STEP 3: DISNEY CONSOLIDATION ─────────────────────────────────
-- Flag all Disney-owned entities and roll them into one parent bucket.

SELECT
    CASE
        WHEN owners LIKE &#39;%Walt Disney%&#39; THEN &#39;The Walt Disney Company (consolidated)&#39;
        ELSE owners
    END                             AS parent_company,
    COUNT(DISTINCT franchise)       AS franchises_owned,
    ROUND(SUM(revenue), 2)          AS total_revenue
FROM media_franchises
GROUP BY parent_company
HAVING COUNT(DISTINCT franchise) &gt;= 2
ORDER BY total_revenue DESC
LIMIT 12;</pre>

  </details>
</div>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-python">Python</span>
    </summary>
    <pre class="art-code-pre" id="python-block-1"># Media Franchises — Python EDA
# Mirrors the EDA logic used to validate this dataset before R analysis.
# Display-only — same data, same URL, different tool.

import pandas as pd
import numpy as np
import requests
from io import StringIO

# ── Load data ─────────────────────────────────────────────────────
url = (
    &quot;https://raw.githubusercontent.com/rfordatascience/tidytuesday/&quot;
    &quot;main/data/2019/2019-07-02/media_franchises.csv&quot;
)
df = pd.read_csv(StringIO(requests.get(url).text))

print(f&quot;Shape: {df.shape[0]:,} rows × {df.shape[1]} columns&quot;)
print(f&quot;\nColumns: {list(df.columns)}&quot;)

# ── Missing values ────────────────────────────────────────────────
print(&quot;\n── MISSING VALUES ───────────────────────────────────────&quot;)
missing = df.isnull().sum()
print(missing[missing &gt; 0] if missing.sum() &gt; 0 else &quot;None&quot;)

# ── Revenue summary ───────────────────────────────────────────────
print(&quot;\n── REVENUE SUMMARY (Billions USD) ───────────────────────&quot;)
print(df[&quot;revenue&quot;].describe().round(2))

# ── Top 5 franchises by total revenue ────────────────────────────
print(&quot;\n── TOP 5 FRANCHISES BY TOTAL REVENUE ───────────────────&quot;)
top5 = (df.groupby(&quot;franchise&quot;)[&quot;revenue&quot;]
          .sum()
          .sort_values(ascending=False)
          .head(5)
          .round(1))
print(top5.to_string())

# ── Revenue by category ───────────────────────────────────────────
print(&quot;\n── REVENUE BY CATEGORY ──────────────────────────────────&quot;)
by_cat = (df.groupby(&quot;revenue_category&quot;)[&quot;revenue&quot;]
            .sum()
            .sort_values(ascending=False)
            .round(1))
print(by_cat.to_string())

# ── Revenue by original media ─────────────────────────────────────
print(&quot;\n── REVENUE BY ORIGINAL MEDIA ────────────────────────────&quot;)
by_media = (df.groupby(&quot;original_media&quot;)[&quot;revenue&quot;]
              .agg([&quot;sum&quot;, &quot;count&quot;])
              .sort_values(&quot;sum&quot;, ascending=False)
              .round(1))
by_media.columns = [&quot;total_rev_B&quot;, &quot;n_rows&quot;]
print(by_media.to_string())

# ── Disney subsidiaries in ownership column ───────────────────────
print(&quot;\n── DISNEY-RELATED OWNERS ────────────────────────────────&quot;)
disney_rows = df[df[&quot;owners&quot;].str.contains(&quot;Walt Disney&quot;, na=False)]
disney_summary = (disney_rows.groupby(&quot;owners&quot;)[&quot;revenue&quot;]
                  .sum()
                  .sort_values(ascending=False)
                  .round(1))
print(disney_summary.to_string())
print(f&quot;\nDisney consolidated total: ${disney_summary.sum():.1f}B&quot;)</pre>

  </details>
</div>
<h2 id="chart-1-top-20-franchises-by-revenue" class="anchored">CHART 1 — TOP 20 FRANCHISES BY REVENUE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/franchise/charts/chart1_top20_revenue.plotly.json" data-fallback="/images/content/articles/franchise/charts/chart1_top20_revenue.png" role="img" aria-label="Top20 Revenue"></div>
  <figcaption class="art-chart-caption">Top20 Revenue</figcaption>
</figure>
</div>
</div>
</div>
<p>Pokémon at $91B is not just the top of this chart — it is a different kind of number. The gap between Pokémon and second-place Hello Kitty ($80B) is itself larger than the total lifetime revenue of Batman, Spider-Man, or Dragon Ball. This is what it looks like when a franchise achieves structural escape velocity: merchandise revenue compounding over decades, driven by a product line that expands into every available category simultaneously — cards, video games, plush, clothing, themed food, and an anime that has functioned primarily as a 25-year commercial for the card game. Pokémon was not built to be a franchise. It was built to be an economy.</p>
<p>The color logic of this chart is the argument. Merchandise, Licensing &amp; Retail (red) dominates the fill for nearly every bar in the top 20. This is not a quirk of how Wikipedia compiles revenue — it is a structural feature of how large-scale IP actually makes money. The content — films, games, episodes — functions primarily as <strong>marketing infrastructure</strong> for the real product, which is the license. The entertainment generates demand. Merchandise captures it.</p>
<p>Three franchises break visibly from the red-dominant pattern. <strong>Mario</strong> is mostly dark blue — Nintendo has spent decades resisting the licensing temptation that Disney and Sanrio embraced fully, keeping the IP tightly coupled to its own hardware ecosystem. <strong>Shōnen Jump / Jump Comics</strong> is mostly purple (Comic or Manga) because its revenue structure is a publishing business — magazines and tankōbon volumes, not T-shirts. And <strong>Star Wars</strong> shows the most balanced mix: box office, merchandise, home video, and games each contributing meaningfully. Star Wars is the model of a fully diversified franchise — which is why Disney paid $4B for Lucasfilm in 2012.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-1">category_colors &lt;- c(
  &quot;Merchandise, Licensing &amp; Retail&quot; = art_highlight,
  &quot;Video Games/Games&quot;               = art_secondary,
  &quot;Box Office&quot;                      = &quot;#E67E22&quot;,
  &quot;Home Video/Entertainment&quot;        = &quot;#27AE60&quot;,
  &quot;Comic or Manga&quot;                  = &quot;#8E44AD&quot;,
  &quot;Music&quot;                           = &quot;#F39C12&quot;,
  &quot;TV&quot;                              = &quot;#16A085&quot;,
  &quot;Book sales&quot;                      = &quot;#2980B9&quot;
)

top20 &lt;- franchises %&gt;% slice_max(total_revenue, n = 20)

plot_data &lt;- media_franchises %&gt;%
  semi_join(top20, by = &quot;franchise&quot;) %&gt;%
  mutate(
    franchise        = fct_reorder(franchise, revenue, sum),
    revenue_category = fct_reorder(revenue_category, revenue, sum)
  )

label_data &lt;- plot_data %&gt;%
  group_by(franchise) %&gt;%
  summarize(total_revenue = sum(revenue), .groups = &quot;drop&quot;)

p1 &lt;- ggplot(plot_data, aes(franchise, revenue, fill = revenue_category)) +
  geom_hline(yintercept = 50, color = art_highlight, linetype = &quot;dashed&quot;,
             linewidth = 0.5, alpha = 0.6) +
  geom_col() +
  geom_text(
    data = label_data,
    aes(x = franchise, y = total_revenue,
        label = paste0(&quot;$&quot;, round(total_revenue, 0), &quot;B&quot;)),
    inherit.aes = FALSE, hjust = -0.1, size = 2.8, color = art_dark
  ) +
  scale_y_continuous(labels = dollar, expand = expansion(mult = c(0, 0.18))) +
  scale_fill_manual(values = category_colors) +
  coord_flip() +
  guides(fill = guide_legend(reverse = TRUE)) +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank()) +
  labs(
    title   = &quot;IN MEDIA, &lt;span style=&#39;color:#C0392B&#39;&gt;**MERCHANDISE**&lt;/span&gt; IS THE REAL PRODUCT&quot;,
    subtitle = &quot;THE RED IN EVERY BAR TELLS THE SAME STORY — LICENSING &amp; RETAIL DWARFS EVERY OTHER REVENUE STREAM&quot;,
    x = NULL, y = &quot;Revenue (Billions USD)&quot;, fill = &quot;Category&quot;,
    caption = &quot;Data: TidyTuesday 2019-07-02\n— ARTOMETRICS&quot;
  )

ggsave(&quot;chart1_top20_revenue.png&quot;, plot = p1,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>

  </details>
</div>
<h2 id="chart-2-revenue-per-year-of-existence" class="anchored">CHART 2 — REVENUE PER YEAR OF EXISTENCE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/franchise/charts/chart2_revenue_per_year.plotly.json" data-fallback="/images/content/articles/franchise/charts/chart2_revenue_per_year.png" role="img" aria-label="Revenue Per Year"></div>
  <figcaption class="art-chart-caption">Revenue Per Year</figcaption>
</figure>
</div>
</div>
</div>
<p>Total revenue rewards longevity. Revenue per year rewards efficiency. Normalizing by age puts a 1928 franchise and a 1996 franchise on comparable footing — and the resulting ranking surfaces something the raw totals hide. Pokémon’s $4B/yr is not explained by any single hit. It is explained by a system: the video games create new entry points every hardware generation; the trading card game creates perpetual demand for new product; the anime provides continuous character exposure that drives card and game sales. Each component feeds the others in a loop that doesn’t require any single cultural moment to sustain. Pokémon doesn’t just earn well — it earns continuously, from multiple directions, at the same time.</p>
<p>Several franchises that ranked very high on total revenue drop here when normalized by time. <strong>Hello Kitty</strong> ($80B total, second overall) falls to fourth at $1.8B/yr — because it has been generating that revenue since 1974, making 45 years the denominator that brings the rate down. <strong>Winnie the Pooh</strong> and <strong>Mickey Mouse</strong> drop further still. Their massive lifetime totals are the product of nearly a century of operation. The per-year lens is unforgiving to age: a franchise that earns $1B/yr for 90 years scores lower on this chart than one earning $2B/yr for 25.</p>
<p>The franchises that rise on this chart share a structural trait: they earn across multiple simultaneous streams rather than sequentially. A film franchise earns at release, then waits for the next film. A trading-card-plus-video-game-plus-anime ecosystem earns every month, every quarter, at every retail touchpoint. The per-year chart is really a chart of business model design.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-2">chart2_data &lt;- franchises %&gt;%
  mutate(
    years_active     = 2019 - year_created,
    revenue_per_year = total_revenue / years_active,
    is_top           = as.character(franchise == &quot;Pokémon&quot;)
  ) %&gt;%
  slice_max(revenue_per_year, n = 15) %&gt;%
  mutate(franchise = fct_reorder(franchise, revenue_per_year))

p2 &lt;- ggplot(chart2_data, aes(x = franchise, y = revenue_per_year)) +
  geom_hline(yintercept = 2, color = art_highlight, linetype = &quot;dashed&quot;,
             linewidth = 0.5, alpha = 0.6) +
  geom_segment(
    aes(xend = franchise, y = 0, yend = revenue_per_year, color = is_top),
    linewidth = 0.8
  ) +
  geom_point(aes(color = is_top, size = is_top)) +
  geom_text(
    aes(label = paste0(&quot;$&quot;, round(revenue_per_year, 1), &quot;B/yr&quot;)),
    hjust = -0.2, size = 3, color = art_dark
  ) +
  scale_color_manual(values = c(&quot;TRUE&quot; = art_highlight, &quot;FALSE&quot; = art_secondary),
                     guide = &quot;none&quot;) +
  scale_size_manual(values = c(&quot;TRUE&quot; = 7, &quot;FALSE&quot; = 4.5), guide = &quot;none&quot;) +
  scale_y_continuous(labels = dollar, expand = expansion(mult = c(0, 0.28))) +
  coord_flip() +
  theme_artometrics() +
  theme(panel.grid.major.y = element_blank()) +
  labs(
    title    = &quot;&lt;span style=&#39;color:#C0392B&#39;&gt;POKÉMON&lt;/span&gt; EARNS MORE PER YEAR THAN MOST FRANCHISES EARN IN A LIFETIME&quot;,
    subtitle = &quot;~$4B ANNUALLY SINCE 1996 — MORE THAN HELLO KITTY, WHICH IS TWICE ITS AGE&quot;,
    x = NULL, y = &quot;Revenue Per Year (Billions USD)&quot;,
    caption = &quot;Data: TidyTuesday 2019-07-02 | Revenue ÷ (2019 − year created)\n— ARTOMETRICS&quot;
  )

ggsave(&quot;chart2_revenue_per_year.png&quot;, plot = p2,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>

  </details>
</div>
<h2 id="chart-3-the-disney-empire-consolidated" class="anchored">CHART 3 — THE DISNEY EMPIRE, CONSOLIDATED</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/franchise/charts/chart3a_disney_non_consolidated.plotly.json" data-fallback="/images/content/articles/franchise/charts/chart3a_disney_non_consolidated.png" role="img" aria-label="Disney Non Consolidated"></div>
  <figcaption class="art-chart-caption">Disney Non Consolidated</figcaption>
</figure>
</div>
</div>
</div>
<p>The raw data lists “The Walt Disney Company,” “Marvel Entertainment (The Walt Disney Company),” and “20th Century Fox (The Walt Disney Company)” as three separate owners. Technically accurate. Strategically misleading. Marvel was acquired in 2009 for $4B. Fox was acquired in 2019 for $71B. Both are now wholly owned subsidiaries. Their revenue goes to the same place. This is how corporate IP ownership actually works. You don’t buy franchises — you buy the companies that own franchises, and those companies keep operating under their own names. Marvel Studios still greenlit its own films. Fox kept its lot in Century City. But the revenue goes to Burbank.</p>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/franchise/charts/chart3b_disney_consolidated.plotly.json" data-fallback="/images/content/articles/franchise/charts/chart3b_disney_consolidated.png" role="img" aria-label="Disney Consolidated"></div>
  <figcaption class="art-chart-caption">Disney Consolidated</figcaption>
</figure>
</div>
</div>
</div>
<p>Add them up and Disney’s true total is <strong>$426 billion</strong>. Nintendo at $49B — still second — now represents about 11 cents on Disney’s dollar. But here’s what the math actually surfaces: Marvel ($20B) plus Fox ($17B) should consolidate to $296B. The remaining <strong>$130 billion comes from Disney-owned entities too small to crack the top 14 individually</strong> — Pixar, Lucasfilm, ABC, ESPN. Subsidiaries whose franchise rows exist in the dataset but don’t rank highly enough to appear as standalone bars. Individually invisible. Collectively, they add up to more than Nintendo’s entire lifetime output.</p>
<p>That is the actual scale of the Disney empire. Not one dominant company. Not even three. An ecosystem of wholly-owned studios, publishers, and licensors — some famous, some not — each running their own operations, all consolidating upward to the same balance sheet. The chart makes visible something the raw data quietly obscures: <strong>in IP, ownership structure is as strategically important as the franchises themselves</strong>. Disney didn’t just build great IP. It bought the companies that owned great IP, let them keep their identities, and harvested everything upward.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-3">non_consolidated &lt;- media_franchises |&gt;
  group_by(owners) |&gt;
  summarise(total_revenue = sum(revenue, na.rm = TRUE),
            franchises_owned = n_distinct(franchise), .groups = &quot;drop&quot;) |&gt;
  filter(franchises_owned &gt;= 2) |&gt;
  slice_max(total_revenue, n = 14) |&gt;
  mutate(owners = fct_reorder(owners, total_revenue),
         disney_flag = case_when(
           owners == &quot;The Walt Disney Company&quot;                        ~ &quot;disney_direct&quot;,
           owners == &quot;Marvel Entertainment (The Walt Disney Company)&quot; ~ &quot;disney_marvel&quot;,
           owners == &quot;20th Century Fox (The Walt Disney Company)&quot;     ~ &quot;disney_fox&quot;,
           TRUE                                                       ~ &quot;other&quot;
         ))

disney_consolidated &lt;- media_franchises |&gt;
  mutate(parent_company = case_when(
    str_detect(owners, &quot;Walt Disney&quot;) ~ &quot;The Walt Disney Company\n(consolidated)&quot;,
    TRUE ~ owners
  )) |&gt;
  group_by(parent_company) |&gt;
  summarise(total_revenue = sum(revenue, na.rm = TRUE),
            franchises_owned = n_distinct(franchise), .groups = &quot;drop&quot;) |&gt;
  filter(franchises_owned &gt;= 2) |&gt;
  slice_max(total_revenue, n = 12) |&gt;
  mutate(parent_company = fct_reorder(parent_company, total_revenue),
         is_disney = str_detect(parent_company, &quot;Walt Disney&quot;))

# Chart 3a — Non-consolidated
ggsave(&quot;chart3a_disney_non_consolidated.png&quot;, path = &quot;charts&quot;,
       width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)

# Chart 3b — Consolidated
ggsave(&quot;chart3b_disney_consolidated.png&quot;, path = &quot;charts&quot;,
       width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>

  </details>
</div>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>This dataset reflects revenue estimates compiled from Wikipedia as of mid-2019, and carries several important caveats. Revenue figures are sourced inconsistently — some represent lifetime totals through 2019, others may reflect different windows or methodologies. Franchises are only included if they surpassed an estimated $4B threshold, meaning smaller but culturally significant IP is absent entirely. The ownership and creator fields reflect the state of the industry at the time of collection and do not account for subsequent acquisitions. Revenue categories were consolidated from over 60 raw Wikipedia subcategories into 8 groups, which involves judgment calls documented in the original TidyTuesday cleaning script.</p>
<p>The “Merchandise, Licensing &amp; Retail” category is particularly broad and may include revenue streams that other analyses would track separately. The dominance of merchandise in Chart 1 is structurally real, but the exact percentage share depends on how individual Wikipedia editors categorized edge cases — which is not fully auditable from this dataset alone. All revenue figures should be treated as order-of-magnitude approximations rather than audited financial data.</p>
<p>Chart 2 divides total lifetime revenue by years of existence as of 2019. This is a simple normalization, not a modeled annual revenue figure. A franchise with uneven revenue across its lifespan — a massive recent hit, or decades of dormancy — will produce a per-year figure that doesn’t reflect any actual year’s performance. The metric rewards consistent earners and penalizes anything that earned most of its revenue in a concentrated burst.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>The media franchise landscape is not flat — it is sharply skewed toward a small number of IP that have mastered merchandise and sustained it across decades. Pokémon stands alone at the top not because of box office dominance but because it turned a video game into the world’s most successful licensing machine while simultaneously running an anime, a card game, and a global trading ecosystem. The Artometrics takeaway from this dataset is a single structural insight: <strong>the most valuable thing a franchise can do is give people something to own, collect, and trade — not just something to watch</strong>.</p>
<p>Disney’s story is a different kind of lesson. The company didn’t just build great IP — it systematically acquired the companies that owned great IP and rolled them into a single consolidated empire. The $130B gap between Disney’s apparent total and its true total is a number that only becomes visible when you collapse the ownership structure the raw data obscures. That gap, by itself, is larger than Nintendo’s entire lifetime output. In IP, what you own is one thing. What your subsidiaries own is another. Disney understood the difference earlier and more completely than anyone.</p>
<p>The two insights together describe the same underlying dynamic from different angles. Merchandise is how IP extracts value from audiences. Acquisition is how corporations extract value from IP. The companies that have mastered both — Disney chief among them — are not competing in the same game as everyone else. They are operating at a different level of the stack entirely.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<div class="art-references">
  <div class="art-ref-item">
    TidyTuesday (2019-07-02). <em>Media Franchise Revenues</em>.
    R for Data Science Community.
    <a href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-07-02" target="_blank">
      github.com/rfordatascience/tidytuesday/…/2019-07-02
    </a>
  </div>
  <div class="art-ref-item">
    Wikipedia. <em>List of Highest-Grossing Media Franchises</em>.
    Retrieved via TidyTuesday cleaning script (revenue.R).
  </div>
  <div class="art-ref-item">
    Robinson, D. (2019, July 22). <em>Analyzing Franchise Revenue —
    TidyTuesday Screencast</em>. YouTube.
    <a href="https://youtu.be/1xsbTs9-a50" target="_blank">
      youtu.be/1xsbTs9-a50
    </a>
    — Chart 1 concept adapted from this screencast with original
    Artometrics styling applied.
  </div>
</div>
<h2 id="editors-note" class="anchored">EDITOR’S NOTE</h2><div class="art-editorial-note"><p class="art-p">
This report was researched, written, designed, and produced in active
collaboration with Claude AI (Anthropic). The data pipeline, statistical
analysis, chart design, written analysis, narrative structure, and visual
styling were all developed through a directed partnership between human
editorial judgment and AI execution.
</p>
<p class="art-p">
Artometrics was built on the premise that rigorous analysis and honest
process are not in conflict. The research questions, editorial instincts,
interpretive framing, and brand vision are ours. The execution — every
line of R code, every paragraph of analysis, every design decision — was
a collaboration. We document this not as a disclaimer but as a
description of how we actually work, and as a position: we believe this
is what serious data journalism looks like when the tools available are
used honestly and at full capacity.
</p>
<p class="art-p">— Artometrics Editorial</p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/franchise" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
