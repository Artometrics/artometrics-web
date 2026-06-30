---
title: "LEGO DATABASE: The Artometrics of LEGO Database"
slug: lego-database
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2022-09-06 release on LEGO Database — 8 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks..."
heroImage: /images/content/articles/lego-database/hero.png
tags: [culture]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-landscape" id="toc-chart-1-landscape">CHART 1 — LANDSCAPE</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-leaders" id="toc-chart-4-leaders">CHART 4 — LEADERS</a></li>
  <li><a href="#chart-5-category-compare" id="toc-chart-5-category-compare">CHART 5 — CATEGORY COMPARE</a></li>
  <li><a href="#chart-pad-1" id="toc-chart-pad-1">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2022-09-06</strong> release on <strong>LEGO Database</strong> — <strong>8</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Quantity</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">8</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">4.50</span><span class="fact-label">Median Quantity</span></div>
  <div class="fact-box"><span class="fact-number">20.0</span><span class="fact-label">Highest observed Quantity</span></div>
  <div class="fact-box"><span class="fact-number">Brick 1 x 1</span><span class="fact-label">Top Name by Quantity</span></div>
  <div class="fact-box"><span class="fact-number">48379c01</span><span class="fact-label">Most common Part num</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2022-09-06</strong> (R for Data Science community). This working file contains <strong>8</strong> rows and <strong>30</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/lego-database/charts/chart1_landscape.png" role="img" aria-label="Part num Mix"></div>
  <figcaption class="art-chart-caption">Part num Mix</figcaption>
</figure>
<p class="art-p">**brickslot2x2** dominates with **1** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional part num buckets in the long tail.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/lego-database/charts/chart3_distribution.png" role="img" aria-label="Quantity Distribution"></div>
  <figcaption class="art-chart-caption">Quantity Distribution</figcaption>
</figure>
<p class="art-p">Median **4.50** vs mean **6.38** — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at **13.0**; that tail is where franchise-defining cases live.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/lego-database/charts/chart4_leaders.png" role="img" aria-label="Top Name"></div>
  <figcaption class="art-chart-caption">Top Name</figcaption>
</figure>
<p class="art-p">**Brick 1 x 1** leads at **20.0** — **4.50** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-category-compare" class="anchored">CHART 5 — CATEGORY COMPARE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart5_category_compare.plotly.json" data-fallback="/images/content/articles/lego-database/charts/chart5_category_compare.png" role="img" aria-label="Quantity by Part num"></div>
  <figcaption class="art-chart-caption">Quantity by Part num</figcaption>
</figure>
<p class="art-p">**3005** posts the highest median quantity (**20.0**); **48379c01** trails at **1.00**.</p>
<p class="art-p">Category medians separate structural tiers faster than row-level anecdotes.</p>
<h2 id="chart-pad-1" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart_pad_1.plotly.json" data-fallback="/images/content/articles/lego-database/charts/chart_pad_1.png" role="img" aria-label="Quantity Spread"></div>
  <figcaption class="art-chart-caption">Quantity Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **2.75** to **7.00**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>LEGO Database</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: LEGO Database</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-09-06/sets.csv.gz" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-09-06/sets.csv.gz</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-09-06" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
