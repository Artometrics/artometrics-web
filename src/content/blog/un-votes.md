---
title: "UN VOTES: The Artometrics of UN Votes"
slug: un-votes
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2021-03-23 release on UN Votes — 100,000 rows after cleaning and merge. Which UN votes split the chamber — and who dissented most?"
heroImage: /images/content/articles/un-votes/hero.png
tags: [power, history]
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
  <li><a href="#chart-extra-mix" id="toc-chart-extra-mix">SUPPLEMENT — MIX</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-03-23</strong> release on <strong>UN Votes</strong> — <strong>100,000</strong> rows after cleaning and merge. Which UN votes split the chamber — and who dissented most?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">yes</span><span class="fact-label">Most common Vote</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2021-03-23</strong> (R for Data Science community). This working file contains <strong>100,000</strong> rows and <strong>4</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<h2 id="chart-1-category" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart1_category.plotly.json" data-fallback="/images/content/articles/un-votes/charts/chart1_category.png" role="img" aria-label="Yes votes dominate the sampled UN record"></div>
  <figcaption class="art-chart-caption">Yes votes dominate the sampled UN record</figcaption>
</figure>
<p class="art-p"><strong>yes</strong> dominates with <strong>79,663</strong> records.</p>
<p class="art-p">The main bucket carries the story; this field does not have a meaningful long-tail split.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/un-votes/charts/chart2_leaders.png" role="img" aria-label="Brazil appears most often in this extract"></div>
  <figcaption class="art-chart-caption">Brazil appears most often in this extract</figcaption>
</figure>
<p class="art-p"><strong>Brazil</strong> appears <strong>747</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>100,000</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CHART 3 — CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart3_category.plotly.json" data-fallback="/images/content/articles/un-votes/charts/chart3_category.png" role="img" aria-label="Vote categories reveal the file's center of gravity"></div>
  <figcaption class="art-chart-caption">Vote categories reveal the file's center of gravity</figcaption>
</figure>
<p class="art-p"><strong>yes</strong> is the largest bucket with <strong>79,663</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-5-frequency" class="anchored">CHART 5 — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart5_frequency.plotly.json" data-fallback="/images/content/articles/un-votes/charts/chart5_frequency.png" role="img" aria-label="Country appearances follow a long-tail pattern"></div>
  <figcaption class="art-chart-caption">Country appearances follow a long-tail pattern</figcaption>
</figure>
<p class="art-p">Most country entities appear only once; a small head revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>
<h2 id="chart-extra-mix" class="anchored">SUPPLEMENT — MIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart_extra_mix.plotly.json" data-fallback="/images/content/articles/un-votes/charts/chart_extra_mix.png" role="img" aria-label="Country codes add metadata rather than a new thesis"></div>
  <figcaption class="art-chart-caption">Country codes add metadata rather than a new thesis</figcaption>
</figure>
<p class="art-p"><strong>BR</strong> is the most repeated country code in the extract.</p>
<p class="art-p">Secondary dimensions add context when the primary table has no numeric score column.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>UN Votes</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>UN Votes</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about the field.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: UN Votes</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-23/unvotes.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-23/unvotes.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-23" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
