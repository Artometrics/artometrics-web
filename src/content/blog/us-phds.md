---
title: "US PHDS AWARDED: The Artometrics of US PhDs Awarded"
slug: us-phds
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2019-02-19 release on US PhDs Awarded — 3,370 rows after cleaning and merge. The question is not whether the topic matters, but what the distribution..."
heroImage: /images/content/articles/us-phds/hero.png
tags: [persona, power]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-landscape" id="toc-chart-1-landscape">CHART 1 — LANDSCAPE</a></li>
  <li><a href="#chart-2-timeline" id="toc-chart-2-timeline">CHART 2 — TIMELINE</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-leaders" id="toc-chart-4-leaders">CHART 4 — LEADERS</a></li>
  <li><a href="#chart-5-category-compare" id="toc-chart-5-category-compare">CHART 5 — CATEGORY COMPARE</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-02-19</strong> release on <strong>US PhDs Awarded</strong> — <strong>3,370</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>N phds</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">3,370</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">85.0</span><span class="fact-label">Median N phds</span></div>
  <div class="fact-box"><span class="fact-number">5,302</span><span class="fact-label">Highest observed N phds</span></div>
  <div class="fact-box"><span class="fact-number">Psychology</span><span class="fact-label">Top Major field by N phds</span></div>
  <div class="fact-box"><span class="fact-number">2008–2017</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Life sciences</span><span class="fact-label">Most common Broad field</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2019-02-19</strong> (R for Data Science community). This working file contains <strong>3,370</strong> rows and <strong>6</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-landscape" class="anchored">CHART 1 — LANDSCAPE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart1_landscape.plotly.json" data-fallback="/images/content/articles/us-phds/charts/chart1_landscape.png" role="img" aria-label="Broad field Mix"></div>
  <figcaption class="art-chart-caption">Broad field Mix</figcaption>
</figure>
<p class="art-p">**Life sciences** dominates with **1,320** records — the structural center of gravity.</p>
<p class="art-p">Beyond the top ten sit **0** additional broad field buckets in the long tail.</p>
<h2 id="chart-2-timeline" class="anchored">CHART 2 — TIMELINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart2_timeline.plotly.json" data-fallback="/images/content/articles/us-phds/charts/chart2_timeline.png" role="img" aria-label="Median N phds Over Time"></div>
  <figcaption class="art-chart-caption">Median N phds Over Time</figcaption>
</figure>
<p class="art-p">Median n phds is **rising** from **80.0** to **87.0**.</p>
<p class="art-p">Annual medians filter noise and show the slope the raw rows hide.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/us-phds/charts/chart3_distribution.png" role="img" aria-label="N phds by Broad field"></div>
  <figcaption class="art-chart-caption">N phds by Broad field</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether n phds consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag categories where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/us-phds/charts/chart4_leaders.png" role="img" aria-label="Top Major field"></div>
  <figcaption class="art-chart-caption">Top Major field</figcaption>
</figure>
<p class="art-p">**Chemistry** leads at **300** — **150** marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where brand, quality, or scale visibly separates from the pack.</p>
<h2 id="chart-5-category-compare" class="anchored">CHART 5 — CATEGORY COMPARE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart5_category_compare.plotly.json" data-fallback="/images/content/articles/us-phds/charts/chart5_category_compare.png" role="img" aria-label="N phds by Broad field"></div>
  <figcaption class="art-chart-caption">N phds by Broad field</figcaption>
</figure>
<p class="art-p">**Psychology and social sciences** posts the highest median n phds (**116**); **Engineering** trails at **63.5**.</p>
<p class="art-p">Category medians separate structural tiers faster than row-level anecdotes.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>US PhDs Awarded</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: US PhDs Awarded</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-02-19/phd_by_field.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-02-19/phd_by_field.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-02-19" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
