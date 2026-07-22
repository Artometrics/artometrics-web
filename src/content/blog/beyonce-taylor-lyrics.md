---
title: 'Beyoncé and Taylor Swift, Line by Line'
slug: beyonce-taylor-lyrics
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  A lyric-level comparison of two era-defining catalogs—theme, language, and
  structure.
heroImage: /images/content/articles/beyonce-taylor-lyrics/hero.png
tags:
  - music
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2020-09-29</strong> release on <strong>Beyoncé & Taylor Swift Lyrics</strong> — <strong>22,616</strong> rows after cleaning and merge. How do two era-defining catalogs compare line by line?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">22,616</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">Beyoncé</span><span class="fact-label">Most common Artist name</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2020-09-29</strong> (R for Data Science community). This working file contains <strong>22,616</strong> rows and <strong>6</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-category" class="anchored">LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart1_category.png" role="img" aria-label="Beyoncé dominates with 22,616 records"></div>
</figure>
<p class="art-p"><strong>Beyoncé</strong> dominates with <strong>22,616</strong> records.</p>
<p class="art-p">The main bucket carries the story; this field does not have a meaningful long-tail split.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart2_leaders.png" role="img" aria-label="Top Song name"></div>
</figure>
<p class="art-p"><strong>Lemonade Film (Script)</strong> appears <strong>336</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>22,616</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart3_category.png" role="img" aria-label="Beyoncé is the largest bucket with 22,616 records"></div>
</figure>
<p class="art-p"><strong>Beyoncé</strong> is the largest bucket with <strong>22,616</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-5-frequency" class="anchored">SUPPLEMENT — FREQUENCY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart5_frequency.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart5_frequency.png" role="img" aria-label="Most song name entities appear only once; a small head revisits repeatedly"></div>
</figure>
<p class="art-p">Most song name entities appear only once; a small head revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>
<h2 id="chart-extra-mix" class="anchored">SUPPLEMENT — MIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart_extra_mix.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart_extra_mix.png" role="img" aria-label="If I let you go is the most repeated line in the extract"></div>
</figure>
<p class="art-p"><strong>If I let you go</strong> is the most repeated line in the extract.</p>
<p class="art-p">Secondary dimensions add context when the primary table has no numeric score column.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Beyoncé & Taylor Swift Lyrics</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Beyoncé & Taylor Swift Lyrics</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about the field.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2020). <em>TidyTuesday: Beyoncé & Taylor Swift Lyrics</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-09-29/beyonce_lyrics.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-09-29/beyonce_lyrics.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2020/2020-09-29" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
