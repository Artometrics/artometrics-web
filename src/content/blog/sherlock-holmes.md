---
title: "SHERLOCK HOLMES: The Artometrics of Sherlock Holmes"
slug: sherlock-holmes
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-11-18 release on Sherlock Holmes — 65,958 rows after cleaning and merge. How is word count distributed across the Holmes canon?"
heroImage: /images/content/articles/sherlock-holmes/hero.png
tags: [culture, persona]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-breakdown" id="toc-chart-1-breakdown">CHART 1 — BREAKDOWN</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-concentration" id="toc-chart-4-concentration">CHART 4 — CONCENTRATION</a></li>
  <li><a href="#chart-pareto" id="toc-chart-pareto">CHART 5 — CONCENTRATION</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-11-18</strong> release on <strong>Sherlock Holmes</strong> — <strong>65,958</strong> rows after cleaning and merge. How is word count distributed across the Holmes canon?</p>
<p class="art-p">Five charts track <strong>Word count</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">65,958</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">12.0</span><span class="fact-label">Median Word count</span></div>
  <div class="fact-box"><span class="fact-number">18.0</span><span class="fact-label">Highest observed Word count</span></div>
  <div class="fact-box"><span class="fact-number">The Adventure of the Beryl C</span><span class="fact-label">Top Book by Word count</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-11-18</strong> (R for Data Science community). This working file contains <strong>65,958</strong> rows and <strong>4</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<h2 id="chart-1-breakdown" class="anchored">CHART 1 — BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart1_breakdown.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart1_breakdown.png" role="img" aria-label="Word count by Book"></div>
  <figcaption class="art-chart-caption">Word count by Book</figcaption>
</figure>
<p class="art-p"><strong>The Yellow Face</strong> leads at <strong>13.0</strong>; <strong>A Case of Identity</strong> anchors the low end at <strong>12.0</strong>.</p>
<p class="art-p">Grouping by book exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart2_leaders.png" role="img" aria-label="Top Book"></div>
  <figcaption class="art-chart-caption">Top Book</figcaption>
</figure>
<p class="art-p"><strong>The Yellow Face</strong> leads at <strong>13.0</strong> — <strong>12.0</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart3_distribution.png" role="img" aria-label="Word count Distribution"></div>
  <figcaption class="art-chart-caption">Word count Distribution</figcaption>
</figure>
<p class="art-p">Median <strong>12.0</strong> vs mean <strong>10.9</strong> — the shape is relatively symmetric.</p>
<p class="art-p">The top decile begins at <strong>14.0</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-concentration" class="anchored">CHART 4 — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart4_pareto.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart4_pareto.png" role="img" aria-label="Cumulative Word count"></div>
  <figcaption class="art-chart-caption">Cumulative Word count</figcaption>
</figure>
<p class="art-p">The top <strong>5</strong> book entries account for <strong>34%</strong> of the aggregate word count.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="chart-pareto" class="anchored">CHART 5 — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart_pareto.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart_pareto.png" role="img" aria-label="Cumulative Word count"></div>
  <figcaption class="art-chart-caption">Cumulative Word count</figcaption>
</figure>
<p class="art-p">The top <strong>5</strong> book entries account for <strong>34%</strong> of the aggregate word count.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Sherlock Holmes</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Sherlock Holmes</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about word count.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Sherlock Holmes</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-11-18/holmes.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-11-18/holmes.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-11-18" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
