---
title: Which Fast-Food Chains Pack the Most Calories Per Item?
slug: fast-food-calories
pubDate: 2026-06-15T00:00:00.000Z
description: Menu nutrition data identify the highest-calorie items across major chains.
heroImage: /images/content/articles/fast-food-calories/hero.png
tags:
  - culture
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-09-04</strong> release on <strong>Fast Food Calories</strong> — <strong>515</strong> rows after cleaning and merge. Which chains pack the most calories per item?</p>
<p class="art-p">Five charts track <strong>Calories</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">515</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">490</span><span class="fact-label">Median Calories</span></div>
  <div class="fact-box"><span class="fact-number">2,430</span><span class="fact-label">Highest observed Calories</span></div>
  <div class="fact-box"><span class="fact-number">20 piece Buttermilk Crispy C</span><span class="fact-label">Top Item by Calories</span></div>
  <div class="fact-box"><span class="fact-number">Taco Bell</span><span class="fact-label">Most common Restaurant</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2018-09-04</strong> (R for Data Science community). This working file contains <strong>515</strong> rows and <strong>17</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-breakdown" class="anchored">BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart1_breakdown.png" role="img" aria-label="Calories by Item"></div>
</figure>
<p class="art-p"><strong>20 piece Buttermilk Crispy Chicken Tenders</strong> leads at <strong>2,430</strong>; <strong>10 piece Buttermilk Crispy Chicken Tenders</strong> anchors the low end at <strong>1,210</strong>.</p>
<p class="art-p">Grouping by item exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart2_leaders.png" role="img" aria-label="20 piece Buttermilk Crispy Chicken Tenders leads at 2,430 — 1,315 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>20 piece Buttermilk Crispy Chicken Tenders</strong> leads at <strong>2,430</strong> — <strong>1,315</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart3_distribution.png" role="img" aria-label="Calories by Restaurant"></div>
</figure>
<p class="art-p">Category boxes reveal whether calories consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart4_gap.png" role="img" aria-label="Calories vs median by Restaurant"></div>
</figure>
<p class="art-p"><strong>Sonic</strong> sits <strong>80.0</strong> above the median; <strong>Chick Fil-A</strong> trails by <strong>100</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart5_scatter.png" role="img" aria-label="Calories vs Total fat"></div>
</figure>
<p class="art-p">Joint plot of <strong>calories</strong> and <strong>total fat</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Fast Food Calories</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Fast Food Calories</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about calories.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Fast Food Calories</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-09-04/fastfood_calories.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-09-04/fastfood_calories.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-09-04" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
