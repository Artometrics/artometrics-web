---
title: Which National Parks Draw the Crowds?
slug: national-park-visits
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Visitation time series identify America’s busiest parks and how attendance has
  trended.
heroImage: /images/content/articles/national-park-visits/hero.png
tags:
  - cities-travel
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-09-17</strong> release on <strong>National Park Visits</strong> — <strong>21,560</strong> rows after cleaning and merge. Which parks draw the crowds — and how did visitation trend?</p>
<p class="art-p">Five charts track <strong>Visitors</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">21,560</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">155,219</span><span class="fact-label">Median Visitors</span></div>
  <div class="fact-box"><span class="fact-number">871,922,828</span><span class="fact-label">Highest observed Visitors</span></div>
  <div class="fact-box"><span class="fact-number">Golden Gate</span><span class="fact-label">Top Parkname by Visitors</span></div>
  <div class="fact-box"><span class="fact-number">1904–2016</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">IM</span><span class="fact-label">Most common Region</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2019-09-17</strong> (R for Data Science community). This working file contains <strong>21,560</strong> rows and <strong>13</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart1_trend.png" role="img" aria-label="Median Visitors Over Time"></div>
</figure>
<p class="art-p">Median visitors is <strong>rising</strong> from <strong>2,200</strong> in the opening period to <strong>198,478</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart2_leaders.png" role="img" aria-label="Golden Gate leads at 14,554,750 — 5,151,270 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Golden Gate</strong> leads at <strong>14,554,750</strong> — <strong>5,151,270</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart3_distribution.png" role="img" aria-label="Visitors by Region"></div>
</figure>
<p class="art-p">Category boxes reveal whether visitors consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart4_gap.png" role="img" aria-label="Visitors vs median by Region"></div>
</figure>
<p class="art-p"><strong>NT</strong> sits <strong>12,634,481</strong> above the median; <strong>AK</strong> trails by <strong>142,104</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-pareto" class="anchored">SUPPLEMENT — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart_pareto.png" role="img" aria-label="The top 5 parkname entries account for 52% of the aggregate visitors"></div>
</figure>
<p class="art-p">The top <strong>5</strong> parkname entries account for <strong>52%</strong> of the aggregate visitors.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>National Park Visits</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>National Park Visits</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about visitors.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: National Park Visits</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-09-17/national_parks.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-09-17/national_parks.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-09-17" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
