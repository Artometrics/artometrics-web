---
title: "NYC RESTAURANT INSPECTIONS: The Artometrics of NYC Restaurant Inspections"
slug: nyc-restaurant-inspections
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2018-12-11 release on NYC Restaurant Inspections — 100,000 rows after cleaning and merge. The question is not whether the topic matters, but what the..."
heroImage: /images/content/articles/nyc-restaurant-inspections/hero.png
tags: [atlas, culture]
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-12-11</strong> release on <strong>NYC Restaurant Inspections</strong> — <strong>100,000</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Score</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">15.0</span><span class="fact-label">Median Score</span></div>
  <div class="fact-box"><span class="fact-number">156</span><span class="fact-label">Highest observed Score</span></div>
  <div class="fact-box"><span class="fact-number">NOUS LES AMIS RESTAURANT & B</span><span class="fact-label">Top Dba by Score</span></div>
  <div class="fact-box"><span class="fact-number">1900–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">MANHATTAN</span><span class="fact-label">Most common Boro</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2018-12-11</strong> (R for Data Science community). This working file contains <strong>100,000</strong> rows and <strong>14</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart1_landscape.png" role="img" aria-label="Boro Mix"></div>
  <figcaption class="art-chart-caption">Boro Mix</figcaption>
</figure>
<p class="art-p">**MANHATTAN** dominates with **39,562** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional boro buckets in the long tail.</p>
<h2 id="chart-2-timeline" class="anchored">CHART 2 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart2_timeline.plotly.json" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart2_timeline.png" role="img" aria-label="Median Score Over Time"></div>
  <figcaption class="art-chart-caption">Median Score Over Time</figcaption>
</figure>
<p class="art-p">Median score is **rising** from **7.00** to **17.0**.</p>
<p class="art-p">Annual medians filter noise and show the slope the raw rows hide.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart3_distribution.png" role="img" aria-label="Score by Boro"></div>
  <figcaption class="art-chart-caption">Score by Boro</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether score consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag categories where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart4_leaders.png" role="img" aria-label="Top Dba"></div>
  <figcaption class="art-chart-caption">Top Dba</figcaption>
</figure>
<p class="art-p">**The Slope Lounge and Restaurant** leads at **152** — **122** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart5_scatter.png" role="img" aria-label="Score vs Camis"></div>
  <figcaption class="art-chart-caption">Score vs Camis</figcaption>
</figure>
<p class="art-p">Joint plot of **score** and **camis** surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>NYC Restaurant Inspections</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: NYC Restaurant Inspections</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-11/nyc_restaurants.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-11/nyc_restaurants.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-12-11" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
