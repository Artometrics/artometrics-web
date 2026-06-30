---
title: "SHERLOCK HOLMES: The Artometrics of Sherlock Holmes"
slug: sherlock-holmes
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-11-18 release on Sherlock Holmes — 65,958 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution..."
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
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-5-frequency" id="toc-chart-5-frequency">CHART 5 — FREQUENCY</a></li>
  <li><a href="#chart-extra-mix" id="toc-chart-extra-mix">CHART 3 — MIX</a></li>
  <li><a href="#chart-pad-hist-1" id="toc-chart-pad-hist-1">CHART 4 — FREQUENCY</a></li>
  <li><a href="#chart-overview" id="toc-chart-overview">CHART 5 — OVERVIEW</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-11-18</strong> release on <strong>Sherlock Holmes</strong> — <strong>65,958</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>the core signal</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">65,958</span><span class="fact-label">Records in the working dataset</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-11-18</strong> (R for Data Science community). This working file contains <strong>65,958</strong> rows and <strong>3</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart2_leaders.png" role="img" aria-label="Top Book"></div>
  <figcaption class="art-chart-caption">Top Book</figcaption>
</figure>
<p class="art-p">**The Hound of the Baskervilles** appears **6,970** times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all **65,958** rows.</p>
<h2 id="chart-5-frequency" class="anchored">CHART 5 — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart5_frequency.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart5_frequency.png" role="img" aria-label="Appearance Spread"></div>
  <figcaption class="art-chart-caption">Appearance Spread</figcaption>
</figure>
<p class="art-p">Most book entities appear only once; a small head revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>
<h2 id="chart-extra-mix" class="anchored">CHART 3 — MIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart_extra_mix.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart_extra_mix.png" role="img" aria-label="Text"></div>
  <figcaption class="art-chart-caption">Text</figcaption>
</figure>
<p class="art-p">**"No."** is the most repeated text in the extract.</p>
<p class="art-p">Secondary dimensions add context when the primary table has no numeric score column.</p>
<h2 id="chart-pad-hist-1" class="anchored">CHART 4 — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart_pad_hist_1.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart_pad_hist_1.png" role="img" aria-label="Frequency"></div>
  <figcaption class="art-chart-caption">Frequency</figcaption>
</figure>
<p class="art-p">Most book entities appear once; repeat entries signal franchise depth.</p>
<p class="art-p">Power-law tails are common in credits, catalogs, and guest lists.</p>
<h2 id="chart-overview" class="anchored">CHART 5 — OVERVIEW</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart_overview_1.plotly.json" data-fallback="/images/content/articles/sherlock-holmes/charts/chart_overview_1.png" role="img" aria-label="Top Book"></div>
  <figcaption class="art-chart-caption">Top Book</figcaption>
</figure>
<p class="art-p">**The Hound of the Baskervilles** anchors the distribution with **6,970** records.</p>
<p class="art-p">Overview bars summarize concentration before drilling into finer cuts.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Sherlock Holmes</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Sherlock Holmes</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-11-18/holmes.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-11-18/holmes.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-11-18" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
