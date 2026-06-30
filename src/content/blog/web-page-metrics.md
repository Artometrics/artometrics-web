---
title: "WEB PAGE METRICS: The Artometrics of Web Page Metrics"
slug: web-page-metrics
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2022-11-15 release on Web Page Metrics — 238 rows after cleaning and merge. Which pages load fastest — and what metrics move together?"
heroImage: /images/content/articles/web-page-metrics/hero.png
tags: [culture, power]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-trend" id="toc-chart-1-trend">CHART 1 — TREND</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-category-compare" id="toc-chart-4-category-compare">CHART 4 — TIERS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#chart-spread" id="toc-chart-spread">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2022-11-15</strong> release on <strong>Web Page Metrics</strong> — <strong>238</strong> rows after cleaning and merge. Which pages load fastest — and what metrics move together?</p>
<p class="art-p">Five charts track <strong>P50</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">238</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">5.97</span><span class="fact-label">Median P50</span></div>
  <div class="fact-box"><span class="fact-number">9.80</span><span class="fact-label">Highest observed P50</span></div>
  <div class="fact-box"><span class="fact-number">speedIndex</span><span class="fact-label">Top Measure by P50</span></div>
  <div class="fact-box"><span class="fact-number">2016–2022</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">desktop</span><span class="fact-label">Most common Client</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>HTTP Archive-style page-weight metrics by client (desktop/mobile) and measure type, aggregated as percentile bands.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart1_trend.png" role="img" aria-label="Median P50 Over Time"></div>
  <figcaption class="art-chart-caption">Median P50 Over Time</figcaption>
</figure>
<p class="art-p">Median p50 is <strong>falling</strong> from <strong>7.00</strong> in the opening period to <strong>4.80</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart3_distribution.png" role="img" aria-label="P50 by Client"></div>
  <figcaption class="art-chart-caption">P50 by Client</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether p50 consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-category-compare" class="anchored">CHART 4 — TIERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart4_category_compare.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart4_category_compare.png" role="img" aria-label="P50 by Client"></div>
  <figcaption class="art-chart-caption">P50 by Client</figcaption>
</figure>
<p class="art-p"><strong>mobile</strong> leads the median table at <strong>8.01</strong>; the gap to <strong>desktop</strong> is <strong>4.29</strong> points.</p>
<p class="art-p">Tier separation matters more than means when distributions skew hard.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart5_scatter.png" role="img" aria-label="P50 vs P90"></div>
  <figcaption class="art-chart-caption">P50 vs P90</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>p50</strong> and <strong>p90</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="chart-spread" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart_spread.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart_spread.png" role="img" aria-label="P50 Spread"></div>
  <figcaption class="art-chart-caption">P50 Spread</figcaption>
</figure>
<p class="art-p">The middle half runs <strong>3.72</strong> to <strong>8.01</strong>.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Web Page Metrics</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Web Page Metrics</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about p50.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: Web Page Metrics</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-15/speed_index.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-15/speed_index.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-11-15" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
