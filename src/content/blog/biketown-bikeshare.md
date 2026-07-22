---
title: How Far Do Portland’s Biketown Rides Actually Go?
slug: biketown-bikeshare
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Trip-level bike-share data measures typical distance and duration across
  Biketown journeys.
heroImage: /images/content/articles/biketown-bikeshare/hero.png
tags:
  - cities-travel
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-06-05</strong> release on <strong>Biketown Bikeshare</strong> — <strong>100,000</strong> rows after cleaning and merge. How long and far do Portland Biketown trips run?</p>
<p class="art-p">Five charts track <strong>Duration min</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">14.5</span><span class="fact-label">Median Duration min</span></div>
  <div class="fact-box"><span class="fact-number">1,392</span><span class="fact-label">Highest observed Duration min</span></div>
  <div class="fact-box"><span class="fact-number">SW Stark at Burnside</span><span class="fact-label">Top StartHub by Duration min</span></div>
  <div class="fact-box"><span class="fact-number">2016–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">recreation</span><span class="fact-label">Most common TripType</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2018-06-05</strong> (R for Data Science community). This working file contains <strong>100,000</strong> rows and <strong>21</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart1_trend.png" role="img" aria-label="Median Duration min Over Time"></div>
</figure>
<p class="art-p">Median duration min is <strong>falling</strong> from <strong>15.1</strong> in the opening period to <strong>12.1</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart2_leaders.png" role="img" aria-label="Design Week Portland Pop Up - Disabled leads at 40.6 — 29.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Design Week Portland Pop Up - Disabled</strong> leads at <strong>40.6</strong> — <strong>29.0</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart3_distribution.png" role="img" aria-label="Duration min by TripType"></div>
</figure>
<p class="art-p">Category boxes reveal whether duration min consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart4_gap.png" role="img" aria-label="Duration min vs median by TripType"></div>
</figure>
<p class="art-p"><strong>recreation</strong> sits <strong>18.1</strong> above the median; <strong>work</strong> trails by <strong>3.08</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart5_scatter.png" role="img" aria-label="Duration min vs Distance Miles"></div>
</figure>
<p class="art-p">Joint plot of <strong>duration min</strong> and <strong>distance miles</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Biketown Bikeshare</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>Biketown Bikeshare</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about duration min.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Biketown Bikeshare</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-05/week10_biketown.zip" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-05/week10_biketown.zip</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-06-05" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
