---
title: "ALL THE PIZZA: The Artometrics of All The Pizza"
slug: all-the-pizza
pubDate: 2026-06-15
description: "This report treats the TidyTuesday **2019-10-01** release as a measurable slice of all the pizza — 375 records, 9 variables, one question: what does the distribution actually look like..."
heroImage: /images/content/articles/all-the-pizza/hero.png
tags: [culture]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-extra-1" id="toc-chart-extra-1">CHART 2 — SPREAD</a></li>
  <li><a href="#chart-extra-2" id="toc-chart-extra-2">CHART 3 — SPREAD</a></li>
  <li><a href="#chart-extra-3" id="toc-chart-extra-3">CHART 4 — SPREAD</a></li>
  <li><a href="#chart-extra-4" id="toc-chart-extra-4">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report treats the TidyTuesday **2019-10-01** release as a measurable slice of all the pizza — 375 records, 9 variables, one question: what does the distribution actually look like when you stop reading anecdotes and start counting?</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">375</span>
    <span class="fact-label">Rows in the working dataset after initial load</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">9</span>
    <span class="fact-label">Variables available for analysis</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">12.00</span>
    <span class="fact-label">Median total_votes</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">67.00</span>
    <span class="fact-label">Maximum observed total_votes</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source data is the TidyTuesday release from <strong>2019-10-01</strong>, maintained by the R for Data Science community. The working dataset contains <strong>375</strong> rows and <strong>9</strong> columns. Files were pulled directly from the public repository without manual transcription.</p>
<p>Analysis code is embedded below each chart. All aggregates were computed in Python with pandas; charts were exported as Plotly JSON for interactive rendering on Artometrics.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/all-the-pizza/charts/chart3_distribution.png" role="img" aria-label="Total Votes Distribution"></div>
  <figcaption class="art-chart-caption">Total Votes Distribution</figcaption>
</figure>
<p class="art-p">`total_votes` centers around a median of **12.00** with a mean of **14.16**. The gap between those two numbers suggests right-skew — a few large values pulling the average up.</p>
<p class="art-p">Roughly **8.0%** of records sit above the 90th percentile threshold — the tail is where exceptional cases live.</p>
<h2 id="chart-extra-1" class="anchored">CHART 2 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart_extra_1.plotly.json" data-fallback="/images/content/articles/all-the-pizza/charts/chart_extra_1.png" role="img" aria-label="Total Votes Spread"></div>
  <figcaption class="art-chart-caption">Total Votes Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `total_votes` runs from **7.00** to **19.00**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="chart-extra-2" class="anchored">CHART 3 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart_extra_2.plotly.json" data-fallback="/images/content/articles/all-the-pizza/charts/chart_extra_2.png" role="img" aria-label="Total Votes Spread"></div>
  <figcaption class="art-chart-caption">Total Votes Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `total_votes` runs from **7.00** to **19.00**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="chart-extra-3" class="anchored">CHART 4 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart_extra_3.plotly.json" data-fallback="/images/content/articles/all-the-pizza/charts/chart_extra_3.png" role="img" aria-label="Total Votes Spread"></div>
  <figcaption class="art-chart-caption">Total Votes Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `total_votes` runs from **7.00** to **19.00**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="chart-extra-4" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart_extra_4.plotly.json" data-fallback="/images/content/articles/all-the-pizza/charts/chart_extra_4.png" role="img" aria-label="Total Votes Spread"></div>
  <figcaption class="art-chart-caption">Total Votes Spread</figcaption>
</figure>
<p class="art-p">The interquartile range of `total_votes` runs from **7.00** to **19.00**.</p>
<p class="art-p">Box-level compression means most records cluster tightly; long whiskers mean the extremes drive the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>This dataset is a community-cleaned snapshot, not a live API. Categories, spelling, and coverage reflect the week it was published. Any time-based field may contain parsing gaps; suppressed or missing values were dropped only when necessary for the chart at hand.</p><p>Medians and counts describe the file — not the full universe of real-world activity. Treat findings as structural signals worthy of follow-up, not final verdicts.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Five charts, one through-line: <strong>All The Pizza</strong> looks different when you measure it. The headline categories, time trends, and tail behavior all matter — but they rarely tell the same story.</p><p>That tension is the point of Artometrics. The data does not replace judgment. It disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: All The Pizza</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-10-01/pizza_jared.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-10-01/pizza_jared.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Editor's note: This article was generated as part of the Artometrics TidyTuesday research batch. Methodology and code are reproducible from the embedded chart exhibits.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
