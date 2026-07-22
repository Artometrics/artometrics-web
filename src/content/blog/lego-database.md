---
title: How LEGO Set Complexity Evolved Across Themes
slug: lego-database
pubDate: 2026-06-15T00:00:00.000Z
description: Official set metadata traces rising piece counts and theme differences.
heroImage: /images/content/articles/lego-database/hero.png
tags:
  - games
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2022-09-06</strong> release on <strong>LEGO Database</strong> — <strong>19,798</strong> rows after cleaning and merge. How did LEGO set complexity evolve across themes?</p>
<p class="art-p">Five charts track <strong>Num parts</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">19,798</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">34.0</span><span class="fact-label">Median Num parts</span></div>
  <div class="fact-box"><span class="fact-number">11,695</span><span class="fact-label">Highest observed Num parts</span></div>
  <div class="fact-box"><span class="fact-number">World Map</span><span class="fact-label">Top Name by Num parts</span></div>
  <div class="fact-box"><span class="fact-number">1949–2022</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2022-09-06</strong> (R for Data Science community). This working file contains <strong>19,798</strong> rows and <strong>11</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart1_trend.png" role="img" aria-label="Median Num parts Over Time"></div>
</figure>
<p class="art-p">Median num parts is <strong>falling</strong> from <strong>142</strong> in the opening period to <strong>59.5</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart2_leaders.png" role="img" aria-label="World Map leads at 11,695 — 5,792 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>World Map</strong> leads at <strong>11,695</strong> — <strong>5,792</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart3_distribution.png" role="img" aria-label="Num parts Distribution"></div>
</figure>
<p class="art-p">Median <strong>34.0</strong> vs mean <strong>161</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>432</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-leader-trends" class="anchored">LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart4_leader_trends.png" role="img" aria-label="Top Name Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart5_scatter.png" role="img" aria-label="Num parts vs Quantity"></div>
</figure>
<p class="art-p">Joint plot of <strong>num parts</strong> and <strong>quantity</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>LEGO Database</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>LEGO Database</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about num parts.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: LEGO Database</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-09-06/sets.csv.gz" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-09-06/sets.csv.gz</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-09-06" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
