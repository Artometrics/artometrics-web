---
title: Who Generates the Most Plastic Waste—and Who Mismanages It?
slug: global-plastic-waste
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Country-level plastic generation and mismanagement rates show where leakage
  concentrates.
heroImage: /images/content/articles/global-plastic-waste/hero.png
tags:
  - business
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-05-21</strong> release on <strong>Global Plastic Waste</strong> — <strong>22,204</strong> rows after cleaning and merge. Who generates the most plastic waste — and how much goes mismanaged?</p>
<p class="art-p">Five charts track <strong>GDP per capita, PPP (constant 2011 international $) (Rate)</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">22,204</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8,447</span><span class="fact-label">Median GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">135,319</span><span class="fact-label">Highest observed GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">Macao</span><span class="fact-label">Top Entity by GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">1700–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2019-05-21</strong> (R for Data Science community). This working file contains <strong>22,204</strong> rows and <strong>7</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart1_trend.png" role="img" aria-label="Median GDP per capita, PPP (constant 2011 international $) (Rate) Over Time"></div>
</figure>
<p class="art-p">Median gdp per capita, ppp (constant 2011 international $) (rate) is <strong>rising</strong> from <strong>5,891</strong> in the opening period to <strong>12,592</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart2_leaders.png" role="img" aria-label="Qatar leads at 118,396 — 67,799 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Qatar</strong> leads at <strong>118,396</strong> — <strong>67,799</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart3_distribution.png" role="img" aria-label="GDP per capita, PPP (constant 2011 international $) (Rate) Distribution"></div>
</figure>
<p class="art-p">Median <strong>8,447</strong> vs mean <strong>14,926</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>37,969</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-leader-trends" class="anchored">LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart4_leader_trends.png" role="img" aria-label="Top Entity Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart5_scatter.png" role="img" aria-label="GDP per capita, PPP (constant 2011 international $) (Rate) vs Per capita mismanaged plastic waste (kilograms per person per day)"></div>
</figure>
<p class="art-p">Joint plot of <strong>gdp per capita, ppp (constant 2011 international $) (rate)</strong> and <strong>per capita mismanaged plastic waste (kilograms per person per day)</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Global Plastic Waste</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Global Plastic Waste</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about gdp per capita, ppp (constant 2011 international $) (rate).</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: Global Plastic Waste</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-21/per-capita-mismanaged-plastic-waste-vs-gdp-per-capita.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-21/per-capita-mismanaged-plastic-waste-vs-gdp-per-capita.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-05-21" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
