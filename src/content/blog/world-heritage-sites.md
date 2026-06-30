---
title: "WORLD HERITAGE SITES: The Artometrics of World Heritage Sites"
slug: world-heritage-sites
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2024-02-06 release on World Heritage Sites — 6 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution..."
heroImage: /images/content/articles/world-heritage-sites/hero.png
tags: [atlas, history]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-trend" id="toc-chart-1-trend">CHART 1 — TREND</a></li>
  <li><a href="#chart-4-leaders" id="toc-chart-4-leaders">CHART 4 — LEADERS</a></li>
  <li><a href="#chart-pad-1" id="toc-chart-pad-1">CHART 3 — SPREAD</a></li>
  <li><a href="#chart-pad-2" id="toc-chart-pad-2">CHART 4 — SPREAD</a></li>
  <li><a href="#chart-pad-3" id="toc-chart-pad-3">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2024-02-06</strong> release on <strong>World Heritage Sites</strong> — <strong>6</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Value</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">6</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">9.00</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">15.0</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">Sweden</span><span class="fact-label">Top Country by Value</span></div>
  <div class="fact-box"><span class="fact-number">2004–2022</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2024-02-06</strong> (R for Data Science community). This working file contains <strong>6</strong> rows and <strong>3</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart1_trend.png" role="img" aria-label="Median Value Over Time"></div>
  <figcaption class="art-chart-caption">Median Value Over Time</figcaption>
</figure>
<p class="art-p">The median value opens at **5.00** and closes at **10.0** across the series.</p>
<p class="art-p">Filled trend lines expose direction without letting single outliers steer the narrative.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart4_leaders.png" role="img" aria-label="Top Country"></div>
  <figcaption class="art-chart-caption">Top Country</figcaption>
</figure>
<p class="art-p">**Sweden** leads at **14.0** — **7.00** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-pad-1" class="anchored">CHART 3 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_pad_1.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_pad_1.png" role="img" aria-label="Value Spread"></div>
  <figcaption class="art-chart-caption">Value Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **5.75** to **12.2**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="chart-pad-2" class="anchored">CHART 4 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_pad_2.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_pad_2.png" role="img" aria-label="Value Spread"></div>
  <figcaption class="art-chart-caption">Value Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **5.75** to **12.2**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="chart-pad-3" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_pad_3.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_pad_3.png" role="img" aria-label="Value Spread"></div>
  <figcaption class="art-chart-caption">Value Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **5.75** to **12.2**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>World Heritage Sites</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2024). <em>TidyTuesday: World Heritage Sites</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2024/2024-02-06" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
