---
title: Who Drinks the Most Alcohol Per Capita?
slug: alcohol-consumption
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Country-level consumption data map which nations drink the most per person—and
  how that has shifted.
heroImage: /images/content/articles/alcohol-consumption/hero.png
tags:
  - culture
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-06-26</strong> release on <strong>Alcohol Consumption</strong> — <strong>193</strong> rows after cleaning and merge. Who drinks the most per capita — and how did consumption move?</p>
<p class="art-p">Five charts track <strong>Beer servings</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">193</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">76.0</span><span class="fact-label">Median Beer servings</span></div>
  <div class="fact-box"><span class="fact-number">376</span><span class="fact-label">Highest observed Beer servings</span></div>
  <div class="fact-box"><span class="fact-number">Namibia</span><span class="fact-label">Top Country by Beer servings</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2018-06-26</strong> (R for Data Science community). This working file contains <strong>193</strong> rows and <strong>5</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-breakdown" class="anchored">BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart1_breakdown.png" role="img" aria-label="Beer servings by Country"></div>
</figure>
<p class="art-p"><strong>Namibia</strong> leads at <strong>376</strong>; <strong>Panama</strong> anchors the low end at <strong>285</strong>.</p>
<p class="art-p">Grouping by country exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart2_leaders.png" role="img" aria-label="Namibia leads at 376 — 338 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Namibia</strong> leads at <strong>376</strong> — <strong>338</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart3_distribution.png" role="img" aria-label="Beer servings Distribution"></div>
</figure>
<p class="art-p">Median <strong>76.0</strong> vs mean <strong>106</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>259</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-concentration" class="anchored">CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart4_pareto.png" role="img" aria-label="Cumulative Beer servings"></div>
</figure>
<p class="art-p">The top <strong>5</strong> country entries account for <strong>37%</strong> of the aggregate beer servings.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart5_scatter.png" role="img" aria-label="Beer servings vs Spirit servings"></div>
</figure>
<p class="art-p">Joint plot of <strong>beer servings</strong> and <strong>spirit servings</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Alcohol Consumption</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Alcohol Consumption</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about beer servings.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Alcohol Consumption</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-26/week13_alcohol_global.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-26/week13_alcohol_global.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-06-26" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
