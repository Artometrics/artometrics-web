---
title: "WEB PAGE METRICS: The Artometrics of Web Page Metrics"
slug: web-page-metrics
pubDate: 2026-06-15
description: "This report treats the TidyTuesday **2022-11-15** release as a measurable slice of web page metrics — 90 records, 5 variables, one question: what does the distribution actually look like..."
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
  <li><a href="#chart-2-temporal-pattern" id="toc-chart-2-temporal-pattern">CHART 2 — TEMPORAL PATTERN</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-extra-1" id="toc-chart-extra-1">CHART 3 — SPREAD</a></li>
  <li><a href="#chart-extra-2" id="toc-chart-extra-2">CHART 4 — SPREAD</a></li>
  <li><a href="#chart-extra-3" id="toc-chart-extra-3">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report treats the TidyTuesday **2022-11-15** release as a measurable slice of web page metrics — 90 records, 5 variables, one question: what does the distribution actually look like when you stop reading anecdotes and start counting?</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">90</span>
    <span class="fact-label">Rows in the working dataset after initial load</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">5</span>
    <span class="fact-label">Variables available for analysis</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">56.5</span>
    <span class="fact-label">Latest-period median percent</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">49.17</span>
    <span class="fact-label">Median percent</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">56.90</span>
    <span class="fact-label">Maximum observed percent</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source data is the TidyTuesday release from <strong>2022-11-15</strong>, maintained by the R for Data Science community. The working dataset contains <strong>90</strong> rows and <strong>5</strong> columns. Files were pulled directly from the public repository without manual transcription.</p>
<p>Analysis code is embedded below each chart. All aggregates were computed in Python with pandas; charts were exported as Plotly JSON for interactive rendering on Artometrics.</p>
<h2 id="chart-2-temporal-pattern" class="anchored">CHART 2 — TEMPORAL PATTERN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart2_time_trend.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart2_time_trend.png" role="img" aria-label="Median Trend Over Time"></div>
  <figcaption class="art-chart-caption">Median Trend Over Time</figcaption>
</figure>
<p class="art-p">When `percent` is tracked across time, the median moves from **53.50** in the earliest period to **56.55** in the latest — an upward drift visible in the aggregate.</p>
<p class="art-p">Year-level medians smooth out one-off outliers and reveal the structural slope the raw table hides.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart3_distribution.png" role="img" aria-label="Percent Distribution"></div>
  <figcaption class="art-chart-caption">Percent Distribution</figcaption>
</figure>
<p class="art-p">`percent` centers around a median of **49.17** with a mean of **49.15**. The gap between those two numbers suggests a relatively symmetric spread.</p>
<p class="art-p">Roughly **10.0%** of records sit above the 90th percentile threshold — the tail is where exceptional cases live.</p>
<h2 id="chart-extra-1" class="anchored">CHART 3 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart_extra_1.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart_extra_1.png" role="img" aria-label="Percent Spread"></div>
  <figcaption class="art-chart-caption">Percent Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `percent` runs from **46.00** to **54.27**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="chart-extra-2" class="anchored">CHART 4 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart_extra_2.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart_extra_2.png" role="img" aria-label="Percent Spread"></div>
  <figcaption class="art-chart-caption">Percent Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `percent` runs from **46.00** to **54.27**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="chart-extra-3" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart_extra_3.plotly.json" data-fallback="/images/content/articles/web-page-metrics/charts/chart_extra_3.png" role="img" aria-label="Percent Spread"></div>
  <figcaption class="art-chart-caption">Percent Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `percent` runs from **46.00** to **54.27**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>This dataset is a community-cleaned snapshot, not a live API. Categories, spelling, and coverage reflect the week it was published. Any time-based field may contain parsing gaps; suppressed or missing values were dropped only when necessary for the chart at hand.</p><p>Medians and counts describe the file — not the full universe of real-world activity. Treat findings as structural signals worthy of follow-up, not final verdicts.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Five charts, one through-line: <strong>Web Page Metrics</strong> looks different when you measure it. The headline categories, time trends, and tail behavior all matter — but they rarely tell the same story.</p><p>That tension is the point of Artometrics. The data does not replace judgment. It disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: Web Page Metrics</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-15/image_alt.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-15/image_alt.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Editor's note: This article was generated as part of the Artometrics TidyTuesday research batch. Methodology and code are reproducible from the embedded chart exhibits.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
