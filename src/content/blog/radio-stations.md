---
title: "RADIO STATIONS: The Artometrics of Radio Stations"
slug: radio-stations
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2022-11-08 release on Radio Stations — 17,186 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution..."
heroImage: /images/content/articles/radio-stations/hero.png
tags: [culture]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-category" id="toc-chart-3-category">CHART 3 — CATEGORY</a></li>
  <li><a href="#chart-5-frequency" id="toc-chart-5-frequency">CHART 5 — FREQUENCY</a></li>
  <li><a href="#chart-extra-mix" id="toc-chart-extra-mix">CHART 4 — MIX</a></li>
  <li><a href="#chart-pad-hist-1" id="toc-chart-pad-hist-1">CHART 5 — FREQUENCY</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2022-11-08</strong> release on <strong>Radio Stations</strong> — <strong>17,186</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>the core signal</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">17,186</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">LICENSED</span><span class="fact-label">Most common Status</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2022-11-08</strong> (R for Data Science community). This working file contains <strong>17,186</strong> rows and <strong>11</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/radio-stations/charts/chart2_leaders.png" role="img" aria-label="Top City"></div>
  <figcaption class="art-chart-caption">Top City</figcaption>
</figure>
<p class="art-p">**Columbus** appears **59** times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all **17,186** rows.</p>
<h2 id="chart-3-category" class="anchored">CHART 3 — CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart3_category.plotly.json" data-fallback="/images/content/articles/radio-stations/charts/chart3_category.png" role="img" aria-label="Status"></div>
  <figcaption class="art-chart-caption">Status</figcaption>
</figure>
<p class="art-p">**LICENSED** is the largest bucket with **2,033** records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-5-frequency" class="anchored">CHART 5 — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart5_frequency.plotly.json" data-fallback="/images/content/articles/radio-stations/charts/chart5_frequency.png" role="img" aria-label="Appearance Spread"></div>
  <figcaption class="art-chart-caption">Appearance Spread</figcaption>
</figure>
<p class="art-p">Most city entities appear only once; a small head revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>
<h2 id="chart-extra-mix" class="anchored">CHART 4 — MIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart_extra_mix.plotly.json" data-fallback="/images/content/articles/radio-stations/charts/chart_extra_mix.png" role="img" aria-label="Call sign"></div>
  <figcaption class="art-chart-caption">Call sign</figcaption>
</figure>
<p class="art-p">**KGDH-LP** is the most repeated call sign in the extract.</p>
<p class="art-p">Secondary dimensions add context when the primary table has no numeric score column.</p>
<h2 id="chart-pad-hist-1" class="anchored">CHART 5 — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart_pad_hist_1.plotly.json" data-fallback="/images/content/articles/radio-stations/charts/chart_pad_hist_1.png" role="img" aria-label="Frequency"></div>
  <figcaption class="art-chart-caption">Frequency</figcaption>
</figure>
<p class="art-p">Most city entities appear once; repeat entries signal franchise depth.</p>
<p class="art-p">Power-law tails are common in credits, catalogs, and guest lists.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Radio Stations</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: Radio Stations</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-08/state_stations.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-08/state_stations.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-11-08" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
