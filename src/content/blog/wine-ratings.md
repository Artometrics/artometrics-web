---
title: "WINE RATINGS: The Artometrics of Wine Ratings"
slug: wine-ratings
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2019-05-28 release on Wine Ratings — 100,000 rows after cleaning and merge. Does price predict points — or do bargains cluster?"
heroImage: /images/content/articles/wine-ratings/hero.png
tags: [culture]
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
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#chart-spread" id="toc-chart-spread">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-05-28</strong> release on <strong>Wine Ratings</strong> — <strong>100,000</strong> rows after cleaning and merge. Does price predict points — or do bargains cluster?</p>
<p class="art-p">Five charts track <strong>Points</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">88.0</span><span class="fact-label">Median Points</span></div>
  <div class="fact-box"><span class="fact-number">100</span><span class="fact-label">Highest observed Points</span></div>
  <div class="fact-box"><span class="fact-number">Charles Smith 2006 Royal Cit</span><span class="fact-label">Top Title by Points</span></div>
  <div class="fact-box"><span class="fact-number">US</span><span class="fact-label">Most common Country</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2019-05-28</strong> (R for Data Science community). This working file contains <strong>100,000</strong> rows and <strong>13</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-breakdown" class="anchored">CHART 1 — BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart1_breakdown.plotly.json" data-fallback="/images/content/articles/wine-ratings/charts/chart1_breakdown.png" role="img" aria-label="Points by Country"></div>
  <figcaption class="art-chart-caption">Points by Country</figcaption>
</figure>
<p class="art-p"><strong>Austria</strong> posts the highest median points (<strong>90.0</strong>); <strong>Chile</strong> trails at <strong>86.0</strong>.</p>
<p class="art-p">Category medians separate structural tiers faster than row-level anecdotes.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/wine-ratings/charts/chart2_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p"><strong>Château Léoville Barton 2010  Saint-Julien</strong> leads at <strong>100</strong> — <strong>100</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/wine-ratings/charts/chart3_distribution.png" role="img" aria-label="Points by Country"></div>
  <figcaption class="art-chart-caption">Points by Country</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether points consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/wine-ratings/charts/chart5_scatter.png" role="img" aria-label="Points vs Price"></div>
  <figcaption class="art-chart-caption">Points vs Price</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>points</strong> and <strong>price</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Outlying points are candidates for follow-up — they are the archetypes, not the noise.</p>
<h2 id="chart-spread" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart_spread.plotly.json" data-fallback="/images/content/articles/wine-ratings/charts/chart_spread.png" role="img" aria-label="Points Spread"></div>
  <figcaption class="art-chart-caption">Points Spread</figcaption>
</figure>
<p class="art-p">The middle half runs <strong>86.0</strong> to <strong>91.0</strong>.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Wine Ratings</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Wine Ratings</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about points.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: Wine Ratings</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-28/winemag-data-130k-v2.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-28/winemag-data-130k-v2.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-05-28" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
