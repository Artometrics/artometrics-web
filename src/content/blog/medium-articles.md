---
title: "MEDIUM ARTICLE METADATA: The Artometrics of Medium Article Metadata"
slug: medium-articles
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2018-12-04 release on Medium Article Metadata — 78,388 rows after cleaning and merge. Did longer Medium posts earn more applause?"
heroImage: /images/content/articles/medium-articles/hero.png
tags: [culture]
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
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-category-compare" id="toc-chart-4-category-compare">CHART 4 — TIERS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-12-04</strong> release on <strong>Medium Article Metadata</strong> — <strong>78,388</strong> rows after cleaning and merge. Did longer Medium posts earn more applause?</p>
<p class="art-p">Five charts track <strong>Reading time</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">78,388</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">4.00</span><span class="fact-label">Median Reading time</span></div>
  <div class="fact-box"><span class="fact-number">100</span><span class="fact-label">Highest observed Reading time</span></div>
  <div class="fact-box"><span class="fact-number">My month-long quest to becom</span><span class="fact-label">Top Title by Reading time</span></div>
  <div class="fact-box"><span class="fact-number">2017–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Towards Data Science</span><span class="fact-label">Most common Publication</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2018-12-04</strong> (R for Data Science community). This working file contains <strong>78,388</strong> rows and <strong>22</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/medium-articles/charts/chart1_trend.png" role="img" aria-label="Median Reading time Over Time"></div>
  <figcaption class="art-chart-caption">Median Reading time Over Time</figcaption>
</figure>
<p class="art-p">Median reading time is <strong>falling</strong> from <strong>4.00</strong> in the opening period to <strong>4.00</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/medium-articles/charts/chart2_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p"><strong>My month-long quest to become a chess master from scratch</strong> leads at <strong>100</strong> — <strong>68.0</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/medium-articles/charts/chart3_distribution.png" role="img" aria-label="Reading time by Publication"></div>
  <figcaption class="art-chart-caption">Reading time by Publication</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether reading time consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-category-compare" class="anchored">CHART 4 — TIERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart4_category_compare.plotly.json" data-fallback="/images/content/articles/medium-articles/charts/chart4_category_compare.png" role="img" aria-label="Reading time by Publication"></div>
  <figcaption class="art-chart-caption">Reading time by Publication</figcaption>
</figure>
<p class="art-p"><strong>Towards Data Science</strong> leads the median table at <strong>6.00</strong>; the gap to <strong>SyncedReview</strong> is <strong>2.00</strong> points.</p>
<p class="art-p">Tier separation matters more than means when distributions skew hard.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/medium-articles/charts/chart5_scatter.png" role="img" aria-label="Reading time vs Claps"></div>
  <figcaption class="art-chart-caption">Reading time vs Claps</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>reading time</strong> and <strong>claps</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Medium Article Metadata</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Medium Article Metadata</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about reading time.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Medium Article Metadata</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-04/medium_datasci.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-04/medium_datasci.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-12-04" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
