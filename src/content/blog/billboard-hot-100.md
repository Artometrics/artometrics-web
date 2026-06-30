---
title: "BILLBOARD HOT 100 NUMBER ONES: The Artometrics of Billboard Hot 100 Number Ones"
slug: billboard-hot-100
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-08-26 release on Billboard Hot 100 Number Ones — 1,177 rows after cleaning and merge. The question is not whether the topic matters, but what the..."
heroImage: /images/content/articles/billboard-hot-100/hero.png
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
  <li><a href="#chart-2-timeline" id="toc-chart-2-timeline">CHART 2 — TIMELINE</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-leaders" id="toc-chart-4-leaders">CHART 4 — LEADERS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-08-26</strong> release on <strong>Billboard Hot 100 Number Ones</strong> — <strong>1,177</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Rating 1</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">1,177</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">6.00</span><span class="fact-label">Median Rating 1</span></div>
  <div class="fact-box"><span class="fact-number">10.0</span><span class="fact-label">Highest observed Rating 1</span></div>
  <div class="fact-box"><span class="fact-number">Sweet Child O' Mine</span><span class="fact-label">Top Song by Rating 1</span></div>
  <div class="fact-box"><span class="fact-number">1958–2025</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">American Idol</span><span class="fact-label">Most common Talent contestant</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-08-26</strong> (R for Data Science community). This working file contains <strong>1,177</strong> rows and <strong>106</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-hot-100/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/billboard-hot-100/charts/chart1_landscape.png" role="img" aria-label="Talent contestant Mix"></div>
  <figcaption class="art-chart-caption">Talent contestant Mix</figcaption>
</figure>
<p class="art-p">**American Idol** dominates with **5** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional talent contestant buckets in the long tail.</p>
<h2 id="chart-2-timeline" class="anchored">CHART 2 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-hot-100/charts/chart2_timeline.plotly.json" data-fallback="/images/content/articles/billboard-hot-100/charts/chart2_timeline.png" role="img" aria-label="Median Rating 1 Over Time"></div>
  <figcaption class="art-chart-caption">Median Rating 1 Over Time</figcaption>
</figure>
<p class="art-p">Median rating 1 is **rising** from **5.00** to **8.00**.</p>
<p class="art-p">Annual medians filter noise and show the slope the raw rows hide.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-hot-100/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/billboard-hot-100/charts/chart3_distribution.png" role="img" aria-label="Rating 1 Distribution"></div>
  <figcaption class="art-chart-caption">Rating 1 Distribution</figcaption>
</figure>
<p class="art-p">Median **6.00** vs mean **5.98** — the shape is relatively symmetric.</p>
<p class="art-p">The top decile begins at **9.00**; that tail is where franchise-defining cases live.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-hot-100/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/billboard-hot-100/charts/chart4_leaders.png" role="img" aria-label="Top Song"></div>
  <figcaption class="art-chart-caption">Top Song</figcaption>
</figure>
<p class="art-p">**Ticket to Ride** leads at **10.0** — **10.0** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-hot-100/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/billboard-hot-100/charts/chart5_scatter.png" role="img" aria-label="Rating 1 vs Rating 2"></div>
  <figcaption class="art-chart-caption">Rating 1 vs Rating 2</figcaption>
</figure>
<p class="art-p">Joint plot of **rating 1** and **rating 2** surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Billboard Hot 100 Number Ones</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Billboard Hot 100 Number Ones</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-08-26/billboard.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-08-26/billboard.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-08-26" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
