---
title: "CETACEANS: The Artometrics of Cetaceans"
slug: cetaceans
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2018-12-18 release on Cetaceans — 2,194 rows after cleaning and merge. How do cetacean sizes cluster by family — and who are the giants?"
heroImage: /images/content/articles/cetaceans/hero.png
tags: [atlas]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-category" id="toc-chart-1-category">CHART 1 — LANDSCAPE</a></li>
  <li><a href="#chart-1-volume" id="toc-chart-1-volume">CHART 2 — VOLUME</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 3 — LEADERS</a></li>
  <li><a href="#chart-3-category" id="toc-chart-3-category">CHART 4 — CATEGORY</a></li>
  <li><a href="#chart-4-timeline" id="toc-chart-4-timeline">CHART 5 — TIMELINE</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-12-18</strong> release on <strong>Cetaceans</strong> — <strong>2,194</strong> rows after cleaning and merge. How do cetacean sizes cluster by family — and who are the giants?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,194</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1946–2017</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">US</span><span class="fact-label">Most common Transfer</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2018-12-18</strong> (R for Data Science community). This working file contains <strong>2,194</strong> rows and <strong>22</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-category" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart1_category.png" role="img" aria-label="US dominates with 2,172 records"></div>
  <figcaption class="art-chart-caption">US dominates with 2,172 records</figcaption>
</figure>
<p class="art-p"><strong>US</strong> dominates with <strong>2,172</strong> records.</p>
<p class="art-p">The main bucket carries the story; this field does not have a meaningful long-tail split.</p>
<h2 id="chart-1-volume" class="anchored">CHART 2 — VOLUME</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart1_volume.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart1_volume.png" role="img" aria-label="Records By Period"></div>
  <figcaption class="art-chart-caption">Records By Period</figcaption>
</figure>
<p class="art-p">Activity peaks in <strong>1972.0</strong> with <strong>170</strong> records.</p>
<p class="art-p">Period-level counts reveal when the dataset's subject matter intensified.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 3 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart2_leaders.png" role="img" aria-label="Bottlenose appears 1,668 times — the most recurring name in the file"></div>
  <figcaption class="art-chart-caption">Bottlenose appears 1,668 times — the most recurring name in the file</figcaption>
</figure>
<p class="art-p"><strong>Bottlenose</strong> appears <strong>1,668</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>2,194</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CHART 4 — CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart3_category.png" role="img" aria-label="US is the largest bucket with 2,172 records"></div>
  <figcaption class="art-chart-caption">US is the largest bucket with 2,172 records</figcaption>
</figure>
<p class="art-p"><strong>US</strong> is the largest bucket with <strong>2,172</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-4-timeline" class="anchored">CHART 5 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart4_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart4_timeline.png" role="img" aria-label="Leaders Over Time"></div>
  <figcaption class="art-chart-caption">Leaders Over Time</figcaption>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking counts over time separates sustained presence from one-off spikes.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Cetaceans</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Cetaceans</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about the field.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Cetaceans</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-18/allCetaceanData.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-18/allCetaceanData.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-12-18" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
