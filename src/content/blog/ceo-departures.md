---
title: "CEO DEPARTURES: The Artometrics of CEO Departures"
slug: ceo-departures
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2021-04-27 release on CEO Departures — 9,423 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution..."
heroImage: /images/content/articles/ceo-departures/hero.png
tags: [power]
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
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#chart-pad-1" id="toc-chart-pad-1">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-04-27</strong> release on <strong>CEO Departures</strong> — <strong>9,423</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Co per rol</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">9,423</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">22,980</span><span class="fact-label">Median Co per rol</span></div>
  <div class="fact-box"><span class="fact-number">64,602</span><span class="fact-label">Highest observed Co per rol</span></div>
  <div class="fact-box"><span class="fact-number">GROCERY OUTLET HLDNG CORP</span><span class="fact-label">Top Coname by Co per rol</span></div>
  <div class="fact-box"><span class="fact-number">Interim</span><span class="fact-label">Most common Interim coceo</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2021-04-27</strong> (R for Data Science community). This working file contains <strong>9,423</strong> rows and <strong>19</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/ceo-departures/charts/chart1_landscape.png" role="img" aria-label="Interim coceo Mix"></div>
  <figcaption class="art-chart-caption">Interim coceo Mix</figcaption>
</figure>
<p class="art-p">**Interim** dominates with **218** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional interim coceo buckets in the long tail.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/ceo-departures/charts/chart3_distribution.png" role="img" aria-label="Co per rol by Interim coceo"></div>
  <figcaption class="art-chart-caption">Co per rol by Interim coceo</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether co per rol consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag categories where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/ceo-departures/charts/chart4_leaders.png" role="img" aria-label="Top Coname"></div>
  <figcaption class="art-chart-caption">Top Coname</figcaption>
</figure>
<p class="art-p">**GROCERY OUTLET HLDNG CORP** leads at **64,602** — **64,532** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/ceo-departures/charts/chart5_scatter.png" role="img" aria-label="Co per rol vs Departure code"></div>
  <figcaption class="art-chart-caption">Co per rol vs Departure code</figcaption>
</figure>
<p class="art-p">Joint plot of **co per rol** and **departure code** surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="chart-pad-1" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart_pad_1.plotly.json" data-fallback="/images/content/articles/ceo-departures/charts/chart_pad_1.png" role="img" aria-label="Co per rol Spread"></div>
  <figcaption class="art-chart-caption">Co per rol Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **8,556** to **39,276**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>CEO Departures</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: CEO Departures</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-04-27/departures.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-04-27/departures.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-04-27" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
