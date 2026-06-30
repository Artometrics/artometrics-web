---
title: "WEALTH AND INCOME: The Artometrics of Wealth and Income"
slug: wealth-income
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2021-02-09 release on Wealth and Income — 2,916 rows after cleaning and merge. The question is not whether the topic matters, but what the..."
heroImage: /images/content/articles/wealth-income/hero.png
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-02-09</strong> release on <strong>Wealth and Income</strong> — <strong>2,916</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Income distribution</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,916</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">10.9</span><span class="fact-label">Median Income distribution</span></div>
  <div class="fact-box"><span class="fact-number">27.2</span><span class="fact-label">Highest observed Income distribution</span></div>
  <div class="fact-box"><span class="fact-number">Black Alone</span><span class="fact-label">Top Race by Income distribution</span></div>
  <div class="fact-box"><span class="fact-number">1967–2019</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Under $15,000</span><span class="fact-label">Most common Income bracket</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2021-02-09</strong> (R for Data Science community). This working file contains <strong>2,916</strong> rows and <strong>10</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/wealth-income/charts/chart1_landscape.png" role="img" aria-label="Income bracket Mix"></div>
  <figcaption class="art-chart-caption">Income bracket Mix</figcaption>
</figure>
<p class="art-p">**$200,000 and over** dominates with **324** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional income bracket buckets in the long tail.</p>
<h2 id="chart-2-timeline" class="anchored">CHART 2 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart2_timeline.plotly.json" data-fallback="/images/content/articles/wealth-income/charts/chart2_timeline.png" role="img" aria-label="Median Income distribution Over Time"></div>
  <figcaption class="art-chart-caption">Median Income distribution Over Time</figcaption>
</figure>
<p class="art-p">Median income distribution is **rising** from **10.9** to **11.2**.</p>
<p class="art-p">Annual medians filter noise and show the slope the raw rows hide.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/wealth-income/charts/chart3_distribution.png" role="img" aria-label="Income distribution by Income bracket"></div>
  <figcaption class="art-chart-caption">Income distribution by Income bracket</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether income distribution consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag categories where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/wealth-income/charts/chart4_leaders.png" role="img" aria-label="Top Race"></div>
  <figcaption class="art-chart-caption">Top Race</figcaption>
</figure>
<p class="art-p">**Hispanic (Any Race)** leads at **12.0** — **10.7** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/wealth-income/charts/chart5_scatter.png" role="img" aria-label="Income distribution vs Income median"></div>
  <figcaption class="art-chart-caption">Income distribution vs Income median</figcaption>
</figure>
<p class="art-p">Joint plot of **income distribution** and **income median** surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Wealth and Income</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: Wealth and Income</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-02-09/income_distribution.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-02-09/income_distribution.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-02-09" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
