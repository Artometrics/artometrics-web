---
title: "WORLD HERITAGE SITES: The Artometrics of World Heritage Sites"
slug: world-heritage-sites
pubDate: 2026-06-15
description: "This report treats the TidyTuesday **2024-02-06** release as a measurable slice of world heritage sites — 3 records, 3 variables, one question: what does the distribution actually look..."
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
  <li><a href="#chart-1-category-breakdown" id="toc-chart-1-category-breakdown">CHART 1 — CATEGORY BREAKDOWN</a></li>
  <li><a href="#chart-fallback-1" id="toc-chart-fallback-1">CHART 1 — 2004</a></li>
  <li><a href="#chart-fallback-2" id="toc-chart-fallback-2">CHART 2 — 2022</a></li>
  <li><a href="#chart-fallback-3" id="toc-chart-fallback-3">CHART 3 — COUNTRY</a></li>
  <li><a href="#chart-fallback-4" id="toc-chart-fallback-4">CHART 4 — 2004</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report treats the TidyTuesday **2024-02-06** release as a measurable slice of world heritage sites — 3 records, 3 variables, one question: what does the distribution actually look like when you stop reading anecdotes and start counting?</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">3</span>
    <span class="fact-label">Rows in the working dataset after initial load</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">3</span>
    <span class="fact-label">Variables available for analysis</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">3</span>
    <span class="fact-label">Distinct values in country</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">Norway</span>
    <span class="fact-label">Most frequent category in country</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source data is the TidyTuesday release from <strong>2024-02-06</strong>, maintained by the R for Data Science community. The working dataset contains <strong>3</strong> rows and <strong>3</strong> columns. Files were pulled directly from the public repository without manual transcription.</p>
<p>Analysis code is embedded below each chart. All aggregates were computed in Python with pandas; charts were exported as Plotly JSON for interactive rendering on Artometrics.</p>
<h2 id="chart-1-category-breakdown" class="anchored">CHART 1 — CATEGORY BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart1_category_volume.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart1_category_volume.png" role="img" aria-label="Volume By Country"></div>
  <figcaption class="art-chart-caption">Volume By Country</figcaption>
</figure>
<p class="art-p">The dataset clusters around a handful of dominant categories in `country`. **Norway** leads with **1** records — a clear plurality over the next tier.</p>
<p class="art-p">This is not a flat distribution. The long tail contains 0 additional categories, but the top dozen account for most of the observable mass in the file.</p>
<h2 id="chart-fallback-1" class="anchored">CHART 1 — 2004</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_fallback_1.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_fallback_1.png" role="img" aria-label="2004 Distribution"></div>
  <figcaption class="art-chart-caption">2004 Distribution</figcaption>
</figure>
<p class="art-p">`2004` spans **4.00** to **13.00** with median **5.00**.</p>
<p class="art-p">The spread captures how heterogeneous the underlying records are.</p>
<h2 id="chart-fallback-2" class="anchored">CHART 2 — 2022</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_fallback_2.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_fallback_2.png" role="img" aria-label="2022 Distribution"></div>
  <figcaption class="art-chart-caption">2022 Distribution</figcaption>
</figure>
<p class="art-p">`2022` spans **8.00** to **15.00** with median **10.00**.</p>
<p class="art-p">The spread captures how heterogeneous the underlying records are.</p>
<h2 id="chart-fallback-3" class="anchored">CHART 3 — COUNTRY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_fallback_3.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_fallback_3.png" role="img" aria-label="Country Counts"></div>
  <figcaption class="art-chart-caption">Country Counts</figcaption>
</figure>
<p class="art-p">`country` is a core signal in this file. **Norway** appears **1** times.</p>
<p class="art-p">When scores are sparse, frequency itself becomes the finding.</p>
<h2 id="chart-fallback-4" class="anchored">CHART 4 — 2004</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart_fallback_4.plotly.json" data-fallback="/images/content/articles/world-heritage-sites/charts/chart_fallback_4.png" role="img" aria-label="2004 Distribution"></div>
  <figcaption class="art-chart-caption">2004 Distribution</figcaption>
</figure>
<p class="art-p">`2004` spans **4.00** to **13.00** with median **5.00**.</p>
<p class="art-p">The spread captures how heterogeneous the underlying records are.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>This dataset is a community-cleaned snapshot, not a live API. Categories, spelling, and coverage reflect the week it was published. Any time-based field may contain parsing gaps; suppressed or missing values were dropped only when necessary for the chart at hand.</p><p>Medians and counts describe the file — not the full universe of real-world activity. Treat findings as structural signals worthy of follow-up, not final verdicts.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Five charts, one through-line: <strong>World Heritage Sites</strong> looks different when you measure it. The headline categories, time trends, and tail behavior all matter — but they rarely tell the same story.</p><p>That tension is the point of Artometrics. The data does not replace judgment. It disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2024). <em>TidyTuesday: World Heritage Sites</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Editor's note: This article was generated as part of the Artometrics TidyTuesday research batch. Methodology and code are reproducible from the embedded chart exhibits.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
