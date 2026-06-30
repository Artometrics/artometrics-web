---
title: "NETFLIX ENGAGEMENT: The Artometrics of Netflix Engagement"
slug: netflix-engagement
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-07-29 release on Netflix Engagement — 27,803 rows after cleaning and merge. The question is not whether the topic matters, but what the..."
heroImage: /images/content/articles/netflix-engagement/hero.png
tags: [culture, power]
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-07-29</strong> release on <strong>Netflix Engagement</strong> — <strong>27,803</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Hours viewed</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">27,803</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">2,500,000</span><span class="fact-label">Median Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">840,300,000</span><span class="fact-label">Highest observed Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">Squid Game: Season 2 // 오징어 </span><span class="fact-label">Top Title by Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">2010–2025</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">1_What_We_Watched_A_Netflix_</span><span class="fact-label">Most common Source</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-07-29</strong> (R for Data Science community). This working file contains <strong>27,803</strong> rows and <strong>9</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart1_landscape.png" role="img" aria-label="Source Mix"></div>
  <figcaption class="art-chart-caption">Source Mix</figcaption>
</figure>
<p class="art-p">**1_What_We_Watched_A_Netflix_Engagement_Report_2025Jan-Jun** dominates with **7,508** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional source buckets in the long tail.</p>
<h2 id="chart-2-timeline" class="anchored">CHART 2 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart2_timeline.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart2_timeline.png" role="img" aria-label="Median Hours viewed Over Time"></div>
  <figcaption class="art-chart-caption">Median Hours viewed Over Time</figcaption>
</figure>
<p class="art-p">Median hours viewed is **rising** from **5,700,000** to **6,700,000**.</p>
<p class="art-p">Annual medians filter noise and show the slope the raw rows hide.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart3_distribution.png" role="img" aria-label="Hours viewed by Source"></div>
  <figcaption class="art-chart-caption">Hours viewed by Source</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether hours viewed consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag categories where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart4_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p">**Squid Game: Season 2 // 오징어 게임: 시즌 2** leads at **730,100,000** — **411,000,000** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart5_scatter.png" role="img" aria-label="Hours viewed vs Views"></div>
  <figcaption class="art-chart-caption">Hours viewed vs Views</figcaption>
</figure>
<p class="art-p">Joint plot of **hours viewed** and **views** surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Netflix Engagement</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Netflix Engagement</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-29/shows.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-29/shows.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-07-29" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
