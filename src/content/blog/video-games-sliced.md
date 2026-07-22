---
title: Did Critical Acclaim Track Commercial Success in Video Games?
slug: video-games-sliced
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  A large games slice tests whether critic scores correlated with commercial
  outcomes.
heroImage: /images/content/articles/video-games-sliced/hero.png
tags:
  - games
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2021-03-16</strong> release on <strong>Video Games</strong> — <strong>83,631</strong> rows after cleaning and merge. Did critical acclaim correlate with commercial success in this slice of gaming history?</p>
<p class="art-p">Five charts track <strong>Avg</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">83,631</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">203</span><span class="fact-label">Median Avg</span></div>
  <div class="fact-box"><span class="fact-number">1,584,887</span><span class="fact-label">Highest observed Avg</span></div>
  <div class="fact-box"><span class="fact-number">PLAYERUNKNOWN'S BATTLEGROUND</span><span class="fact-label">Top Gamename by Avg</span></div>
  <div class="fact-box"><span class="fact-number">2012–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">February</span><span class="fact-label">Most common Month</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2021-03-16</strong> (R for Data Science community). This working file contains <strong>83,631</strong> rows and <strong>8</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart1_trend.png" role="img" aria-label="Median Avg Over Time"></div>
</figure>
<p class="art-p">Median avg is <strong>rising</strong> from <strong>212</strong> in the opening period to <strong>309</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart2_leaders.png" role="img" aria-label="Dota 2 leads at 475,924 — 64,656 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Dota 2</strong> leads at <strong>475,924</strong> — <strong>64,656</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart3_distribution.png" role="img" aria-label="Avg by Month"></div>
</figure>
<p class="art-p">Category boxes reveal whether avg consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart4_gap.png" role="img" aria-label="Avg vs median by Month"></div>
</figure>
<p class="art-p"><strong>January</strong> sits <strong>36.9</strong> above the median; <strong>October</strong> trails by <strong>23.3</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart5_scatter.png" role="img" aria-label="Avg vs Gain"></div>
</figure>
<p class="art-p">Joint plot of <strong>avg</strong> and <strong>gain</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Video Games</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Video Games</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about avg.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2021). <em>TidyTuesday: Video Games</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-16/sliced-tidytuesday.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-16/sliced-tidytuesday.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-16" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
