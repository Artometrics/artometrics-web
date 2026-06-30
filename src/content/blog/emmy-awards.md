---
title: "EMMY AWARDS: The Artometrics of Emmy Awards"
slug: emmy-awards
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2021-09-21 release on Emmy Awards — 29,678 rows after cleaning and merge. Which shows dominated Emmy season and how lopsided was the hardware?"
heroImage: /images/content/articles/emmy-awards/hero.png
tags: [culture]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-category" id="toc-chart-1-category">CHART 1 — LANDSCAPE</a></li>
  <li><a href="#chart-1-volume" id="toc-chart-1-volume">CHART 1 — VOLUME</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-category" id="toc-chart-3-category">CHART 3 — CATEGORY</a></li>
  <li><a href="#chart-4-timeline" id="toc-chart-4-timeline">CHART 4 — TIMELINE</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-09-21</strong> release on <strong>Emmy Awards</strong> — <strong>29,678</strong> rows after cleaning and merge. Which shows dominated Emmy season and how lopsided was the hardware?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">29,678</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1957–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Nominee</span><span class="fact-label">Most common Type</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2021-09-21</strong> (R for Data Science community). This working file contains <strong>29,678</strong> rows and <strong>11</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-category" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart1_category.plotly.json" data-fallback="/images/content/articles/emmy-awards/charts/chart1_category.png" role="img" aria-label="Type"></div>
  <figcaption class="art-chart-caption">Type</figcaption>
</figure>
<p class="art-p"><strong>Nominee</strong> dominates with <strong>23,739</strong> records.</p>
<p class="art-p">The long tail still holds <strong>0</strong> additional type buckets.</p>
<h2 id="chart-1-volume" class="anchored">CHART 1 — VOLUME</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart1_volume.plotly.json" data-fallback="/images/content/articles/emmy-awards/charts/chart1_volume.png" role="img" aria-label="Records By Period"></div>
  <figcaption class="art-chart-caption">Records By Period</figcaption>
</figure>
<p class="art-p">Activity peaks in <strong>2019</strong> with <strong>2,613</strong> records.</p>
<p class="art-p">Period-level counts reveal when the dataset's subject matter intensified.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/emmy-awards/charts/chart2_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p"><strong>Saturday Night Live</strong> appears <strong>859</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>29,678</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CHART 3 — CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart3_category.plotly.json" data-fallback="/images/content/articles/emmy-awards/charts/chart3_category.png" role="img" aria-label="Type"></div>
  <figcaption class="art-chart-caption">Type</figcaption>
</figure>
<p class="art-p"><strong>Nominee</strong> is the largest bucket with <strong>23,739</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-4-timeline" class="anchored">CHART 4 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart4_timeline.plotly.json" data-fallback="/images/content/articles/emmy-awards/charts/chart4_timeline.png" role="img" aria-label="Leaders Over Time"></div>
  <figcaption class="art-chart-caption">Leaders Over Time</figcaption>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking counts over time separates sustained presence from one-off spikes.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Emmy Awards</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Emmy Awards</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about the field.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: Emmy Awards</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-21/nominees.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-21/nominees.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-09-21" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
