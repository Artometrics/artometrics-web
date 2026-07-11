---
title: "CHRISTMAS NOVELS: The Artometrics of Christmas Novels"
slug: christmas-novels
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-12-30 release on Christmas Novels — 35 rows after cleaning and merge. Which Christmas novels and authors anchor the Gutenberg holiday shelf?"
heroImage: /images/content/articles/christmas-novels/hero.png
tags: [culture]
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
  <li><a href="#chart-4-gap" id="toc-chart-4-gap">CHART 4 — GAP ANALYSIS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-12-30</strong> release on <strong>Christmas Novels</strong> — <strong>35</strong> rows after cleaning and merge. Which Christmas novels and authors anchor the Gutenberg holiday shelf?</p>
<p class="art-p">Five charts track <strong>Birthdate</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">35</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,859</span><span class="fact-label">Median Birthdate</span></div>
  <div class="fact-box"><span class="fact-number">1,891</span><span class="fact-label">Highest observed Birthdate</span></div>
  <div class="fact-box"><span class="fact-number">The Camp Fire Girls Solve a </span><span class="fact-label">Top Title by Birthdate</span></div>
  <div class="fact-box"><span class="fact-number">1970–1970</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Dickens, Charles</span><span class="fact-label">Most common Author</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2025-12-30</strong> (R for Data Science community). This working file contains <strong>35</strong> rows and <strong>9</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart1_trend.png" role="img" aria-label="Median Birthdate Over Time"></div>
</figure>
<p class="art-p">Median birthdate is <strong>falling</strong> from <strong>1,859</strong> in the opening period to <strong>1,859</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart2_leaders.png" role="img" aria-label="The Camp Fire Girls Solve a Mystery; Or, The Christmas Adventure at Carver House leads at 1,891 — 1,872 marks the median among the..."></div>
</figure>
<p class="art-p"><strong>The Camp Fire Girls Solve a Mystery; Or, The Christmas Adventure at Carver House</strong> leads at <strong>1,891</strong> — <strong>1,872</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart3_distribution.png" role="img" aria-label="Median 1,859 vs mean 1,849 — the shape is relatively symmetric"></div>
</figure>
<p class="art-p">Median <strong>1,859</strong> vs mean <strong>1,849</strong> — the shape is relatively symmetric.</p>
<p class="art-p">The top decile begins at <strong>1,874</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart4_gap.png" role="img" aria-label="Birthdate vs median by Author"></div>
</figure>
<p class="art-p"><strong>Hughes, Rupert</strong> sits <strong>13.0</strong> above the median; <strong>Thackeray, William Makepeace</strong> trails by <strong>48.0</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart5_scatter.png" role="img" aria-label="Birthdate vs Deathdate"></div>
</figure>
<p class="art-p">Joint plot of <strong>birthdate</strong> and <strong>deathdate</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Christmas Novels</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Christmas Novels</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about birthdate.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Christmas Novels</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-30/christmas_novels.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-30/christmas_novels.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-12-30" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
