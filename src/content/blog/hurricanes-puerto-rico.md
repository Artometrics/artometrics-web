---
title: "HURRICANES & PUERTO RICO: The Artometrics of Hurricanes & Puerto Rico"
slug: hurricanes-puerto-rico
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2018-06-19 release on Hurricanes & Puerto Rico — 153 rows after cleaning and merge. Which storms hit hardest — wind, deaths, and frequency over time?"
heroImage: /images/content/articles/hurricanes-puerto-rico/hero.png
tags: [atlas, history]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-timeline" id="toc-chart-1-timeline">CHART 1 — TIMELINE</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — LEADERS</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-concentration" id="toc-chart-4-concentration">CHART 4 — CONCENTRATION</a></li>
  <li><a href="#chart-pareto" id="toc-chart-pareto">CHART 5 — CONCENTRATION</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-06-19</strong> release on <strong>Hurricanes & Puerto Rico</strong> — <strong>153</strong> rows after cleaning and merge. Which storms hit hardest — wind, deaths, and frequency over time?</p>
<p class="art-p">Five charts track <strong>Value</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">153</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">703</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">5,072</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">Texas</span><span class="fact-label">Top State by Value</span></div>
  <div class="fact-box"><span class="fact-number">2017–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2018-06-19</strong> (R for Data Science community). This working file contains <strong>153</strong> rows and <strong>4</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-timeline" class="anchored">CHART 1 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart1_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart1_timeline.png" role="img" aria-label="Value by State"></div>
  <figcaption class="art-chart-caption">Value by State</figcaption>
</figure>
<p class="art-p">Daily value lines separate which state bore the brunt — peaks rarely align.</p>
<p class="art-p">The maximum reading (<strong>5,072</strong>) defines the intensity ceiling for the window.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart2_leaders.png" role="img" aria-label="Texas leads at 983 — 621 marks the median among the top dozen"></div>
  <figcaption class="art-chart-caption">Texas leads at 983 — 621 marks the median among the top dozen</figcaption>
</figure>
<p class="art-p"><strong>Texas</strong> leads at <strong>983</strong> — <strong>621</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart3_distribution.png" role="img" aria-label="Median 703 vs mean 1,020 — the shape is right-skewed"></div>
  <figcaption class="art-chart-caption">Median 703 vs mean 1,020 — the shape is right-skewed</figcaption>
</figure>
<p class="art-p">Median <strong>703</strong> vs mean <strong>1,020</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>2,214</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-concentration" class="anchored">CHART 4 — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart4_pareto.png" role="img" aria-label="The top 3 state entries account for 100% of the aggregate value"></div>
  <figcaption class="art-chart-caption">The top 3 state entries account for 100% of the aggregate value</figcaption>
</figure>
<p class="art-p">The top <strong>3</strong> state entries account for <strong>100%</strong> of the aggregate value.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="chart-pareto" class="anchored">SUPPLEMENT — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart_pareto.png" role="img" aria-label="The top 3 state entries account for 100% of the aggregate value"></div>
  <figcaption class="art-chart-caption">The top 3 state entries account for 100% of the aggregate value</figcaption>
</figure>
<p class="art-p">The top <strong>3</strong> state entries account for <strong>100%</strong> of the aggregate value.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Hurricanes & Puerto Rico</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Hurricanes & Puerto Rico</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about value.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Hurricanes & Puerto Rico</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-19/week12_mediacloud_states.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-19/week12_mediacloud_states.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-06-19" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
