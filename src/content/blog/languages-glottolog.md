---
title: "LANGUAGES OF THE WORLD: The Artometrics of Languages of the World"
slug: languages-glottolog
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-12-23 release on Languages of the World — 8,612 rows after cleaning and merge. How concentrated is human linguistic diversity at the family level?"
heroImage: /images/content/articles/languages-glottolog/hero.png
tags: [atlas, history]
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-12-23</strong> release on <strong>Languages of the World</strong> — <strong>8,612</strong> rows after cleaning and merge. How concentrated is human linguistic diversity at the family level?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">8,612</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">Africa</span><span class="fact-label">Most common Macroarea</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-12-23</strong> (R for Data Science community). This working file contains <strong>8,612</strong> rows and <strong>9</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-category" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/languages-glottolog/charts/chart1_category.png" role="img" aria-label="Language documentation is geographically uneven"></div>
  <figcaption class="art-chart-caption">Language documentation is geographically uneven</figcaption>
</figure>
<p class="art-p"><strong>Africa</strong> dominates with <strong>2,363</strong> records.</p>
<p class="art-p">The main bucket carries the story; this field does not have a meaningful long-tail split.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/languages-glottolog/charts/chart2_leaders.png" role="img" aria-label="Repeated language names show documentation density"></div>
  <figcaption class="art-chart-caption">Repeated language names show documentation density</figcaption>
</figure>
<p class="art-p"><strong>Fasu</strong> appears <strong>1</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>8,612</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CHART 3 — CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/languages-glottolog/charts/chart3_category.png" role="img" aria-label="Regional concentration shapes the language map"></div>
  <figcaption class="art-chart-caption">Regional concentration shapes the language map</figcaption>
</figure>
<p class="art-p"><strong>Africa</strong> is the largest bucket with <strong>2,363</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-5-frequency" class="anchored">SUPPLEMENT — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart5_frequency.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/languages-glottolog/charts/chart5_frequency.png" role="img" aria-label="Most languages appear once while a small head repeats"></div>
  <figcaption class="art-chart-caption">Most languages appear once while a small head repeats</figcaption>
</figure>
<p class="art-p">Most name entities appear only once; a small head revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>
<h2 id="chart-extra-mix" class="anchored">SUPPLEMENT — MIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart_extra_mix.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/languages-glottolog/charts/chart_extra_mix.png" role="img" aria-label="Identifier fields are metadata rather than a reader-facing thesis"></div>
  <figcaption class="art-chart-caption">Identifier fields are metadata rather than a reader-facing thesis</figcaption>
</figure>
<p class="art-p"><strong>fasu1242</strong> is the most repeated id in the extract.</p>
<p class="art-p">Secondary dimensions add context when the primary table has no numeric score column.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Languages of the World</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Languages of the World</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about the field.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Languages of the World</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-23/languages.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-23/languages.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-12-23" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
