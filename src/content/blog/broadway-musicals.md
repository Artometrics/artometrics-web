---
title: "BROADWAY MUSICALS: The Artometrics of Broadway Musicals"
slug: broadway-musicals
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2020-04-28 release on Broadway Musicals — 47,524 rows after cleaning and merge. Which musicals ran longest and grossed hardest on Broadway?"
heroImage: /images/content/articles/broadway-musicals/hero.png
tags: [culture]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-breakdown" id="toc-chart-1-breakdown">CHART 1 — BREAKDOWN</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-gap" id="toc-chart-4-gap">CHART 4 — GAP ANALYSIS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2020-04-28</strong> release on <strong>Broadway Musicals</strong> — <strong>47,524</strong> rows after cleaning and merge. Which musicals ran longest and grossed hardest on Broadway?</p>
<p class="art-p">Five charts track <strong>Avg ticket price</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">47,524</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">60.2</span><span class="fact-label">Median Avg ticket price</span></div>
  <div class="fact-box"><span class="fact-number">512</span><span class="fact-label">Highest observed Avg ticket price</span></div>
  <div class="fact-box"><span class="fact-number">Springsteen On Broadway</span><span class="fact-label">Top Show by Avg ticket price</span></div>
  <div class="fact-box"><span class="fact-number">Broadhurst Theatre</span><span class="fact-label">Most common Theatre</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2020-04-28</strong> (R for Data Science community). This working file contains <strong>47,524</strong> rows and <strong>14</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-breakdown" class="anchored">CHART 1 — BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart1_breakdown.png" role="img" aria-label="Avg ticket price by Show"></div>
</figure>
<p class="art-p"><strong>Springsteen On Broadway</strong> leads at <strong>509</strong>; <strong>The Book of Mormon</strong> anchors the low end at <strong>157</strong>.</p>
<p class="art-p">Grouping by show exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart2_leaders.png" role="img" aria-label="Springsteen On Broadway leads at 509 — 182 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Springsteen On Broadway</strong> leads at <strong>509</strong> — <strong>182</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart3_distribution.png" role="img" aria-label="Avg ticket price by Theatre"></div>
</figure>
<p class="art-p">Category boxes reveal whether avg ticket price consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart4_gap.png" role="img" aria-label="Avg ticket price vs median by Theatre"></div>
</figure>
<p class="art-p"><strong>Gershwin Theatre</strong> sits <strong>27.7</strong> above the median; <strong>Imperial Theatre</strong> trails by <strong>12.1</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart5_scatter.png" role="img" aria-label="Avg ticket price vs Performances"></div>
</figure>
<p class="art-p">Joint plot of <strong>avg ticket price</strong> and <strong>performances</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Broadway Musicals</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Broadway Musicals</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about avg ticket price.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2020). <em>TidyTuesday: Broadway Musicals</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-04-28/grosses.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-04-28/grosses.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2020/2020-04-28" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
