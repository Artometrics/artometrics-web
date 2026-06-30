---
title: "HYDRO WASTEWATER PLANTS: The Artometrics of Hydro Wastewater Plants"
slug: hydro-wastewater
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2022-09-20 release on Hydro Wastewater Plants — 58,502 rows after cleaning and merge. Where do wastewater plants serve the most people — and discharge..."
heroImage: /images/content/articles/hydro-wastewater/hero.png
tags: [atlas]
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2022-09-20</strong> release on <strong>Hydro Wastewater Plants</strong> — <strong>58,502</strong> rows after cleaning and merge. Where do wastewater plants serve the most people — and discharge the most?</p>
<p class="art-p">Five charts track <strong>WASTE DIS</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">58,502</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,079</span><span class="fact-label">Median WASTE DIS</span></div>
  <div class="fact-box"><span class="fact-number">3,073,754</span><span class="fact-label">Highest observed WASTE DIS</span></div>
  <div class="fact-box"><span class="fact-number">United States</span><span class="fact-label">Top COUNTRY by WASTE DIS</span></div>
  <div class="fact-box"><span class="fact-number">Secondary</span><span class="fact-label">Most common LEVEL</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2022-09-20</strong> (R for Data Science community). This working file contains <strong>58,502</strong> rows and <strong>25</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-breakdown" class="anchored">CHART 1 — BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart1_breakdown.plotly.json" data-fallback="/images/content/articles/hydro-wastewater/charts/chart1_breakdown.png" role="img" aria-label="WASTE DIS by COUNTRY"></div>
  <figcaption class="art-chart-caption">WASTE DIS by COUNTRY</figcaption>
</figure>
<p class="art-p"><strong>Singapore</strong> leads at <strong>223,683</strong>; <strong>Nicaragua</strong> anchors the low end at <strong>33,649</strong>.</p>
<p class="art-p">Grouping by country exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/hydro-wastewater/charts/chart2_leaders.png" role="img" aria-label="Top COUNTRY"></div>
  <figcaption class="art-chart-caption">Top COUNTRY</figcaption>
</figure>
<p class="art-p"><strong>Singapore</strong> leads at <strong>223,683</strong> — <strong>56,849</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/hydro-wastewater/charts/chart3_distribution.png" role="img" aria-label="WASTE DIS by LEVEL"></div>
  <figcaption class="art-chart-caption">WASTE DIS by LEVEL</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether waste dis consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart4_gap.plotly.json" data-fallback="/images/content/articles/hydro-wastewater/charts/chart4_gap.png" role="img" aria-label="WASTE DIS vs median by LEVEL"></div>
  <figcaption class="art-chart-caption">WASTE DIS vs median by LEVEL</figcaption>
</figure>
<p class="art-p"><strong>Advanced</strong> sits <strong>681</strong> above the median; <strong>Secondary</strong> trails by <strong>342</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/hydro-wastewater/charts/chart5_scatter.png" role="img" aria-label="WASTE DIS vs QUAL WASTE"></div>
  <figcaption class="art-chart-caption">WASTE DIS vs QUAL WASTE</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>waste dis</strong> and <strong>qual waste</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Hydro Wastewater Plants</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Hydro Wastewater Plants</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about waste dis.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: Hydro Wastewater Plants</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-09-20/HydroWASTE_v10.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-09-20/HydroWASTE_v10.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-09-20" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
