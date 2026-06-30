---
title: "PROJECT GUTENBERG: The Artometrics of Project Gutenberg"
slug: project-gutenberg
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-06-03 release on Project Gutenberg — 92 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution..."
heroImage: /images/content/articles/project-gutenberg/hero.png
tags: [culture, history]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-volume-by-year" id="toc-chart-1-volume-by-year">CHART 1 — VOLUME BY YEAR</a></li>
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-06-03</strong> release on <strong>Project Gutenberg</strong> — <strong>92</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Gutenberg id gutenberg languages</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">92</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">11,293</span><span class="fact-label">Median Gutenberg id gutenberg languages</span></div>
  <div class="fact-box"><span class="fact-number">49,884</span><span class="fact-label">Highest observed Gutenberg id gutenberg languages</span></div>
  <div class="fact-box"><span class="fact-number">The Æneid of Virgil Translat</span><span class="fact-label">Top Title by Gutenberg id gutenberg languages</span></div>
  <div class="fact-box"><span class="fact-number">1969–1970</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Public domain in the USA.</span><span class="fact-label">Most common Rights</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-06-03</strong> (R for Data Science community). This working file contains <strong>92</strong> rows and <strong>19</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-volume-by-year" class="anchored">CHART 1 — VOLUME BY YEAR</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart1_volume_by_year.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart1_volume_by_year.png" role="img" aria-label="Records By Year"></div>
  <figcaption class="art-chart-caption">Records By Year</figcaption>
</figure>
<p class="art-p">The file spans **1969** through **1970**, with the busiest year logging **66** records.</p>
<p class="art-p">Year-level counts show when the underlying phenomenon intensified — not just how large the table is today.</p>
<h2 id="chart-2-timeline" class="anchored">CHART 2 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart2_timeline.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart2_timeline.png" role="img" aria-label="Median Gutenberg id gutenberg languages Over Time"></div>
  <figcaption class="art-chart-caption">Median Gutenberg id gutenberg languages Over Time</figcaption>
</figure>
<p class="art-p">Median gutenberg id gutenberg languages moves from **25,051** in **1969** to **11,762** in **1970** — a downward drift in the aggregate.</p>
<p class="art-p">Annual medians smooth one-off spikes and expose the structural slope the raw rows hide.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart3_distribution.png" role="img" aria-label="Gutenberg id gutenberg languages Distribution"></div>
  <figcaption class="art-chart-caption">Gutenberg id gutenberg languages Distribution</figcaption>
</figure>
<p class="art-p">Gutenberg id gutenberg languages centers on a median of **11,293** with mean **14,332** — the distribution is right-skewed.</p>
<p class="art-p">The top decile starts at **39,881**; the tail is where outliers and franchise-defining cases live.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart4_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p">**The Æneid of Virgil Translated Into Scottish Verse. Volumes 1 & 2** leads at **49,884** — separated from the median leader (**36,565**) by a measurable gap.</p>
<p class="art-p">The head of the distribution is where brand, quality, or scale concentrates; the middle is everyone else.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart5_scatter.png" role="img" aria-label="Gutenberg id gutenberg languages vs Total languages"></div>
  <figcaption class="art-chart-caption">Gutenberg id gutenberg languages vs Total languages</figcaption>
</figure>
<p class="art-p">Plotting **gutenberg id gutenberg languages** against **total languages** reveals whether higher values travel together or trade off.</p>
<p class="art-p">Clusters in this plane are candidates for follow-up — they are the archetypes the averages erase.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Project Gutenberg</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Project Gutenberg</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_languages.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_languages.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-06-03" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
