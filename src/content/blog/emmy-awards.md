---
title: Which Shows Dominated Emmy Season—and How Lopsided Was It?
slug: emmy-awards
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Nomination and win records reveal which series swept hardware—and how
  concentrated awards became.
heroImage: /images/content/articles/emmy-awards/hero.png
tags:
  - movies-tv
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-09-21</strong> release on <strong>Emmy Awards</strong> — <strong>29,678</strong> rows after cleaning and merge. Which shows dominated Emmy season and how lopsided was the hardware?</p>
<p class="art-p">Five charts track <strong>record counts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">29,678</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1957–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Nominee</span><span class="fact-label">Most common Type</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2021-09-21</strong> (R for Data Science community). This working file contains <strong>29,678</strong> rows and <strong>11</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-category" class="anchored">LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart1_category.png" role="img" aria-label="Nominee dominates with 23,739 records"></div>
</figure>
<p class="art-p"><strong>Nominee</strong> dominates with <strong>23,739</strong> records.</p>
<p class="art-p">The main bucket carries the story; this field does not have a meaningful long-tail split.</p>
<h2 id="chart-1-volume" class="anchored">VOLUME</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart1_volume.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart1_volume.png" role="img" aria-label="Records By Period"></div>
</figure>
<p class="art-p">Activity peaks in <strong>2019</strong> with <strong>2,613</strong> records.</p>
<p class="art-p">Period-level counts reveal when the dataset's subject matter intensified.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart2_leaders.png" role="img" aria-label="Saturday Night Live appears 859 times — the most recurring name in the file"></div>
</figure>
<p class="art-p"><strong>Saturday Night Live</strong> appears <strong>859</strong> times — the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all <strong>29,678</strong> rows.</p>
<h2 id="chart-3-category" class="anchored">CATEGORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart3_category.png" role="img" aria-label="Nominee is the largest bucket with 23,739 records"></div>
</figure>
<p class="art-p"><strong>Nominee</strong> is the largest bucket with <strong>23,739</strong> records.</p>
<p class="art-p">Category concentration shows where editorial attention should focus first.</p>
<h2 id="chart-4-timeline" class="anchored">TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart4_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart4_timeline.png" role="img" aria-label="Leaders Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking counts over time separates sustained presence from one-off spikes.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Emmy Awards</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Emmy Awards</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about the field.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: Emmy Awards</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-21/nominees.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-21/nominees.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-09-21" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
