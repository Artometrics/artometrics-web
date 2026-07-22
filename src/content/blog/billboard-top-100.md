---
title: How the Top of the Billboard Chart Got More Crowded
slug: billboard-top-100
pubDate: 2026-06-15T00:00:00.000Z
description: Large-scale Hot 100 data show how rankings compress at the summit.
heroImage: /images/content/articles/billboard-top-100/hero.png
tags:
  - music
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-09-14</strong> release on <strong>Billboard Top 100</strong> — <strong>100,000</strong> rows after cleaning and merge. How did chart positions compress at the top of the Hot 100?</p>
<p class="art-p">Five charts track <strong>Week position</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">50.0</span><span class="fact-label">Median Week position</span></div>
  <div class="fact-box"><span class="fact-number">100</span><span class="fact-label">Highest observed Week position</span></div>
  <div class="fact-box"><span class="fact-number">Down By The River</span><span class="fact-label">Top Song by Week position</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2021-09-14</strong> (R for Data Science community). This working file contains <strong>100,000</strong> rows and <strong>10</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-breakdown" class="anchored">BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-top-100/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/billboard-top-100/charts/chart1_breakdown.png" role="img" aria-label="Week position by Song"></div>
</figure>
<p class="art-p"><strong>(Quarter To Four) Stomp</strong> leads at <strong>100</strong>; <strong>Girl (You Captivate Me)</strong> anchors the low end at <strong>100</strong>.</p>
<p class="art-p">Grouping by song exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-top-100/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/billboard-top-100/charts/chart2_leaders.png" role="img" aria-label="(Quarter To Four) Stomp leads at 100 — 100 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>(Quarter To Four) Stomp</strong> leads at <strong>100</strong> — <strong>100</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-top-100/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/billboard-top-100/charts/chart3_distribution.png" role="img" aria-label="Week position Distribution"></div>
</figure>
<p class="art-p">Median <strong>50.0</strong> vs mean <strong>50.4</strong> — the shape is relatively symmetric.</p>
<p class="art-p">The top decile begins at <strong>91.0</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-concentration" class="anchored">CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-top-100/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/billboard-top-100/charts/chart4_pareto.png" role="img" aria-label="Cumulative Week position"></div>
</figure>
<p class="art-p">The top <strong>5</strong> song entries account for <strong>33%</strong> of the aggregate week position.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/billboard-top-100/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/billboard-top-100/charts/chart5_scatter.png" role="img" aria-label="Week position vs Instance"></div>
</figure>
<p class="art-p">Joint plot of <strong>week position</strong> and <strong>instance</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Billboard Top 100</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Billboard Top 100</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about week position.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: Billboard Top 100</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-14/billboard.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-14/billboard.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-09-14" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
