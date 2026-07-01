---
title: "SUPER BOWL ADS: The Artometrics of Super Bowl Ads"
slug: super-bowl-ads
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2021-03-02 release on Super Bowl Ads — 247 rows after cleaning and merge. Which Super Bowl spots won the post-game internet?"
heroImage: /images/content/articles/super-bowl-ads/hero.png
tags: [culture, power]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-trend" id="toc-chart-1-trend">CHART 1 — TREND</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-concentration" id="toc-chart-4-concentration">CHART 4 — CONCENTRATION</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-03-02</strong> release on <strong>Super Bowl Ads</strong> — <strong>247</strong> rows after cleaning and merge. Which Super Bowl spots won the post-game internet?</p>
<p class="art-p">Five charts track <strong>View count</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">247</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">41,379</span><span class="fact-label">Median View count</span></div>
  <div class="fact-box"><span class="fact-number">176,373,378</span><span class="fact-label">Highest observed View count</span></div>
  <div class="fact-box"><span class="fact-number">Doritos</span><span class="fact-label">Top Brand by View count</span></div>
  <div class="fact-box"><span class="fact-number">2006–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">youtube#video</span><span class="fact-label">Most common Kind</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2021-03-02</strong> (R for Data Science community). This working file contains <strong>247</strong> rows and <strong>26</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/super-bowl-ads/charts/chart1_trend.png" role="img" aria-label="Median View count Over Time"></div>
  <figcaption class="art-chart-caption">Median View count Over Time</figcaption>
</figure>
<p class="art-p">Median view count is <strong>falling</strong> from <strong>111,814</strong> in the opening period to <strong>33,766</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/super-bowl-ads/charts/chart2_leaders.png" role="img" aria-label="Top Brand"></div>
  <figcaption class="art-chart-caption">Top Brand</figcaption>
</figure>
<p class="art-p"><strong>NFL</strong> leads at <strong>403,641</strong> — <strong>46,661</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/super-bowl-ads/charts/chart3_distribution.png" role="img" aria-label="View count by Kind"></div>
  <figcaption class="art-chart-caption">View count by Kind</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether view count consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-concentration" class="anchored">CHART 4 — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart4_pareto.plotly.json" data-fallback="/images/content/articles/super-bowl-ads/charts/chart4_pareto.png" role="img" aria-label="Cumulative View count"></div>
  <figcaption class="art-chart-caption">Cumulative View count</figcaption>
</figure>
<p class="art-p">The top <strong>5</strong> brand entries account for <strong>87%</strong> of the aggregate view count.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/super-bowl-ads/charts/chart5_scatter.png" role="img" aria-label="View count vs Like count"></div>
  <figcaption class="art-chart-caption">View count vs Like count</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>view count</strong> and <strong>like count</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Super Bowl Ads</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Super Bowl Ads</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about view count.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: Super Bowl Ads</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-02/youtube.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-02/youtube.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-02" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
