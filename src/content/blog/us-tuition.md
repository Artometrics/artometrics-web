---
title: How Far Did Average U.S. Tuition Climb by State?
slug: us-tuition
pubDate: 2026-06-15T00:00:00.000Z
description: State tuition time series measure the rise in college costs.
heroImage: /images/content/articles/us-tuition/hero.png
tags:
  - business
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-04-02</strong> release on <strong>US Tuition Costs</strong> — <strong>600</strong> rows after cleaning and merge. How far did average tuition climb — and which states lead the bill?</p>
<p class="art-p">Five charts track <strong>Value</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">600</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">7,607</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">15,224</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">New Hampshire</span><span class="fact-label">Top State by Value</span></div>
  <div class="fact-box"><span class="fact-number">2004–2015</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2018-04-02</strong> (R for Data Science community). This working file contains <strong>600</strong> rows and <strong>3</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart1_trend.png" role="img" aria-label="Median Value Over Time"></div>
</figure>
<p class="art-p">Median value is <strong>rising</strong> from <strong>5,876</strong> in the opening period to <strong>9,141</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart2_leaders.png" role="img" aria-label="Vermont leads at 13,486 — 10,850 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Vermont</strong> leads at <strong>13,486</strong> — <strong>10,850</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart3_distribution.png" role="img" aria-label="Median 7,607 vs mean 7,899 — the shape is relatively symmetric"></div>
</figure>
<p class="art-p">Median <strong>7,607</strong> vs mean <strong>7,899</strong> — the shape is relatively symmetric.</p>
<p class="art-p">The top decile begins at <strong>11,204</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-leader-trends" class="anchored">LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart4_leader_trends.png" role="img" aria-label="Top State Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-pareto" class="anchored">SUPPLEMENT — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart_pareto.png" role="img" aria-label="The top 5 state entries account for 38% of the aggregate value"></div>
</figure>
<p class="art-p">The top <strong>5</strong> state entries account for <strong>38%</strong> of the aggregate value.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>US Tuition Costs</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>US Tuition Costs</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about value.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: US Tuition Costs</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-04-02/us_avg_tuition.xlsx" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-04-02/us_avg_tuition.xlsx</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-04-02" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
