---
title: "PROJECT GUTENBERG: The Artometrics of Project Gutenberg"
slug: project-gutenberg
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-06-03 release on Project Gutenberg — 100,000 rows after cleaning and merge. Which subjects dominate the public-domain canon?"
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
  <li><a href="#chart-1-category" id="toc-chart-1-category">CHART 1 — LANDSCAPE</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-category" id="toc-chart-3-category">CHART 3 — CATEGORY</a></li>
  <li><a href="#chart-5-frequency" id="toc-chart-5-frequency">CHART 5 — FREQUENCY</a></li>
  <li><a href="#chart-top-names" id="toc-chart-top-names">CHART 5 — NAMES</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-06-03</strong> release on <strong>Project Gutenberg</strong> — <strong>100,000</strong> rows after cleaning and merge. Which subjects dominate the public-domain canon?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">lcsh</span><span class="fact-label">Most common Subject type</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-06-03</strong> (R for Data Science community). This working file contains <strong>100,000</strong> rows and <strong>3</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-category" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart1_category.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart1_category.png" role="img" aria-label="Subject type"></div>
  <figcaption class="art-chart-caption">Subject type</figcaption>
</figure>
<p class="art-p"><strong>lcsh</strong> dominates with <strong>69,027</strong> records.</p>
<p class="art-p">The long tail still holds <strong>0</strong> additional subject type buckets.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart2_leaders.png" role="img" aria-label="Top Subject"></div>
  <figcaption class="art-chart-caption">Top Subject</figcaption>
</figure>
<p class="art-p"><strong>PS</strong> appears <strong>4,684</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>100,000</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CHART 3 — CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart3_category.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart3_category.png" role="img" aria-label="Subject type"></div>
  <figcaption class="art-chart-caption">Subject type</figcaption>
</figure>
<p class="art-p"><strong>lcsh</strong> is the largest bucket with <strong>69,027</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-5-frequency" class="anchored">CHART 5 — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart5_frequency.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart5_frequency.png" role="img" aria-label="Appearance Spread"></div>
  <figcaption class="art-chart-caption">Appearance Spread</figcaption>
</figure>
<p class="art-p">Most subject entities appear only once; a small head revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>
<h2 id="chart-top-names" class="anchored">CHART 5 — NAMES</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart_top_names.plotly.json" data-fallback="/images/content/articles/project-gutenberg/charts/chart_top_names.png" role="img" aria-label="Top Subject"></div>
  <figcaption class="art-chart-caption">Top Subject</figcaption>
</figure>
<p class="art-p"><strong>PS</strong> appears <strong>4,684</strong> times — the most repeated entry.</p>
<p class="art-p">Frequency leaders reveal franchise depth when numeric scores are sparse.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Project Gutenberg</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Project Gutenberg</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about the field.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Project Gutenberg</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_subjects.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_subjects.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-06-03" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
