---
title: "WORLD HERITAGE SITES: The Artometrics of World Heritage Sites"
slug: world-heritage-sites
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2024-02-06 release on World Heritage Sites — 6 rows after cleaning and merge. How did UNESCO site counts grow across Scandinavia between 2004 and 2022?"
heroImage: /images/content/articles/world-heritage-sites/hero.png
tags: [atlas, history]
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
  <li><a href="#chart-4-leader-trends" id="toc-chart-4-leader-trends">CHART 3 — LEADER TRENDS</a></li>
  <li><a href="#chart-3-grouped-year" id="toc-chart-3-grouped-year">CHART 4 — YEAR COMPARE</a></li>
  <li><a href="#chart-4-growth" id="toc-chart-4-growth">CHART 5 — GROWTH</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2024-02-06</strong> release on <strong>World Heritage Sites</strong> — <strong>6</strong> rows after cleaning and merge. How did UNESCO site counts grow across Scandinavia between 2004 and 2022?</p>
<p class="art-p">Five charts track <strong>Value</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">6</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">9.00</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">15.0</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">Sweden</span><span class="fact-label">Top Country by Value</span></div>
  <div class="fact-box"><span class="fact-number">2004–2022</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2024-02-06</strong> (R for Data Science community). This working file contains <strong>6</strong> rows and <strong>3</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart1_trend.png" role="img" aria-label="Median Value Over Time"></div>
</figure>
<p class="art-p">Median value is <strong>rising</strong> from <strong>5.00</strong> in the opening period to <strong>10.0</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart2_leaders.png" role="img" aria-label="Sweden leads at 14.0 — 7.00 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Sweden</strong> leads at <strong>14.0</strong> — <strong>7.00</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-4-leader-trends" class="anchored">CHART 3 — LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart4_leader_trends.png" role="img" aria-label="Top Country Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-3-grouped-year" class="anchored">CHART 4 — YEAR COMPARE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart3_grouped_year.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart3_grouped_year.png" role="img" aria-label="Value by year and Country"></div>
</figure>
<p class="art-p">Grouped bars expose who gained between <strong>2004</strong> and <strong>2022</strong> — not just the latest leaderboard.</p>
<p class="art-p">Small panels reward side-by-side reading; totals hide per-entity momentum.</p>
<h2 id="chart-4-growth" class="anchored">CHART 5 — GROWTH</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart4_growth.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart4_growth.png" role="img" aria-label="Value growth by Country"></div>
</figure>
<p class="art-p"><strong>Denmark</strong> posted the largest gain (<strong>150%</strong>) from <strong>2004</strong> to <strong>2022</strong>.</p>
<p class="art-p">Percent-change bars normalize different starting points — essential when baselines differ.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>World Heritage Sites</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>World Heritage Sites</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about value.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2024). <em>TidyTuesday: World Heritage Sites</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2024/2024-02-06" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
