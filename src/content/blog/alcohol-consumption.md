---
title: "ALCOHOL CONSUMPTION: The Artometrics of Alcohol Consumption"
slug: alcohol-consumption
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2018-06-26 release on Alcohol Consumption — 193 rows after cleaning and merge. The question is not whether the topic matters, but what the..."
heroImage: /images/content/articles/alcohol-consumption/hero.png
tags: [culture, atlas]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-leaders" id="toc-chart-4-leaders">CHART 4 — LEADERS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#chart-pad-1" id="toc-chart-pad-1">CHART 4 — SPREAD</a></li>
  <li><a href="#chart-pad-2" id="toc-chart-pad-2">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-06-26</strong> release on <strong>Alcohol Consumption</strong> — <strong>193</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Beer servings</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">193</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">76.0</span><span class="fact-label">Median Beer servings</span></div>
  <div class="fact-box"><span class="fact-number">376</span><span class="fact-label">Highest observed Beer servings</span></div>
  <div class="fact-box"><span class="fact-number">Namibia</span><span class="fact-label">Top Country by Beer servings</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2018-06-26</strong> (R for Data Science community). This working file contains <strong>193</strong> rows and <strong>5</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/alcohol-consumption/charts/chart3_distribution.png" role="img" aria-label="Beer servings Distribution"></div>
  <figcaption class="art-chart-caption">Beer servings Distribution</figcaption>
</figure>
<p class="art-p">Median **76.0** vs mean **106** — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at **259**; that tail is where franchise-defining cases live.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/alcohol-consumption/charts/chart4_leaders.png" role="img" aria-label="Top Country"></div>
  <figcaption class="art-chart-caption">Top Country</figcaption>
</figure>
<p class="art-p">**Namibia** leads at **376** — **338** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/alcohol-consumption/charts/chart5_scatter.png" role="img" aria-label="Beer servings vs Spirit servings"></div>
  <figcaption class="art-chart-caption">Beer servings vs Spirit servings</figcaption>
</figure>
<p class="art-p">Joint plot of **beer servings** and **spirit servings** surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="chart-pad-1" class="anchored">CHART 4 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart_pad_1.plotly.json" data-fallback="/images/content/articles/alcohol-consumption/charts/chart_pad_1.png" role="img" aria-label="Beer servings Spread"></div>
  <figcaption class="art-chart-caption">Beer servings Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **20.0** to **188**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="chart-pad-2" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart_pad_2.plotly.json" data-fallback="/images/content/articles/alcohol-consumption/charts/chart_pad_2.png" role="img" aria-label="Beer servings Spread"></div>
  <figcaption class="art-chart-caption">Beer servings Spread</figcaption>
</figure>
<p class="art-p">The middle half runs **20.0** to **188**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Alcohol Consumption</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Alcohol Consumption</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-26/week13_alcohol_global.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-26/week13_alcohol_global.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-06-26" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
