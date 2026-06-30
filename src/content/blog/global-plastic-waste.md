---
title: "GLOBAL PLASTIC WASTE: The Artometrics of Global Plastic Waste"
slug: global-plastic-waste
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2019-05-21 release on Global Plastic Waste — 22,204 rows after cleaning and merge. Who generates the most plastic waste — and how much goes mismanaged?"
heroImage: /images/content/articles/global-plastic-waste/hero.png
tags: [atlas, power]
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
  <li><a href="#chart-4-leader-trends" id="toc-chart-4-leader-trends">CHART 4 — LEADER TRENDS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-05-21</strong> release on <strong>Global Plastic Waste</strong> — <strong>22,204</strong> rows after cleaning and merge. Who generates the most plastic waste — and how much goes mismanaged?</p>
<p class="art-p">Five charts track <strong>GDP per capita, PPP (constant 2011 international $) (Rate)</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">22,204</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8,447</span><span class="fact-label">Median GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">135,319</span><span class="fact-label">Highest observed GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">Macao</span><span class="fact-label">Top Entity by GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">1700–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2019-05-21</strong> (R for Data Science community). This working file contains <strong>22,204</strong> rows and <strong>7</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/global-plastic-waste/charts/chart1_trend.png" role="img" aria-label="Median GDP per capita, PPP (constant 2011 international $) (Rate) Over Time"></div>
  <figcaption class="art-chart-caption">Median GDP per capita, PPP (constant 2011 international $) (Rate) Over Time</figcaption>
</figure>
<p class="art-p">Median gdp per capita, ppp (constant 2011 international $) (rate) is <strong>rising</strong> from <strong>5,891</strong> in the opening period to <strong>12,592</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/global-plastic-waste/charts/chart2_leaders.png" role="img" aria-label="Top Entity"></div>
  <figcaption class="art-chart-caption">Top Entity</figcaption>
</figure>
<p class="art-p"><strong>Qatar</strong> leads at <strong>118,396</strong> — <strong>67,799</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/global-plastic-waste/charts/chart3_distribution.png" role="img" aria-label="GDP per capita, PPP (constant 2011 international $) (Rate) Distribution"></div>
  <figcaption class="art-chart-caption">GDP per capita, PPP (constant 2011 international $) (Rate) Distribution</figcaption>
</figure>
<p class="art-p">Median <strong>8,447</strong> vs mean <strong>14,926</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>37,969</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-leader-trends" class="anchored">CHART 4 — LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart4_leader_trends.plotly.json" data-fallback="/images/content/articles/global-plastic-waste/charts/chart4_leader_trends.png" role="img" aria-label="Top Entity Over Time"></div>
  <figcaption class="art-chart-caption">Top Entity Over Time</figcaption>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/global-plastic-waste/charts/chart5_scatter.png" role="img" aria-label="GDP per capita, PPP (constant 2011 international $) (Rate) vs Per capita mismanaged plastic waste (kilograms per person per day)"></div>
  <figcaption class="art-chart-caption">GDP per capita, PPP (constant 2011 international $) (Rate) vs Per capita mismanaged plastic waste (kilograms per person per day)</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>gdp per capita, ppp (constant 2011 international $) (rate)</strong> and <strong>per capita mismanaged plastic waste (kilograms per person per day)</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Global Plastic Waste</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Global Plastic Waste</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about gdp per capita, ppp (constant 2011 international $) (rate).</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: Global Plastic Waste</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-21/per-capita-mismanaged-plastic-waste-vs-gdp-per-capita.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-21/per-capita-mismanaged-plastic-waste-vs-gdp-per-capita.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-05-21" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
