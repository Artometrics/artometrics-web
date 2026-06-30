---
title: "ROMAN EMPERORS: The Artometrics of Roman Emperors"
slug: roman-emperors
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2019-08-13 release on Roman Emperors — 68 rows after cleaning and merge. Who ruled longest — and did dynasty predict tenure?"
heroImage: /images/content/articles/roman-emperors/hero.png
tags: [history, persona]
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
  <li><a href="#chart-pareto" id="toc-chart-pareto">CHART 5 — CONCENTRATION</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-08-13</strong> release on <strong>Roman Emperors</strong> — <strong>68</strong> rows after cleaning and merge. Who ruled longest — and did dynasty predict tenure?</p>
<p class="art-p">Five charts track <strong>Reign years</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">68</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">6.50</span><span class="fact-label">Median Reign years</span></div>
  <div class="fact-box"><span class="fact-number">31.0</span><span class="fact-label">Highest observed Reign years</span></div>
  <div class="fact-box"><span class="fact-number">Constantine the Great</span><span class="fact-label">Top Name by Reign years</span></div>
  <div class="fact-box"><span class="fact-number">Gordian</span><span class="fact-label">Most common Dynasty</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>Reign spans are derived from start and end dates in the emperors table; negative or zero spans are excluded.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-breakdown" class="anchored">CHART 1 — BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart1_breakdown.plotly.json" data-fallback="/images/content/articles/roman-emperors/charts/chart1_breakdown.png" role="img" aria-label="Reign years by Name"></div>
  <figcaption class="art-chart-caption">Reign years by Name</figcaption>
</figure>
<p class="art-p"><strong>Constantine the Great</strong> leads at <strong>31.0</strong>; <strong>Valentinian II</strong> anchors the low end at <strong>17.0</strong>.</p>
<p class="art-p">Grouping by name exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/roman-emperors/charts/chart2_leaders.png" role="img" aria-label="Top Name"></div>
  <figcaption class="art-chart-caption">Top Name</figcaption>
</figure>
<p class="art-p"><strong>Constantine the Great</strong> leads at <strong>31.0</strong> — <strong>20.0</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/roman-emperors/charts/chart3_distribution.png" role="img" aria-label="Reign years by Dynasty"></div>
  <figcaption class="art-chart-caption">Reign years by Dynasty</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether reign years consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart4_gap.plotly.json" data-fallback="/images/content/articles/roman-emperors/charts/chart4_gap.png" role="img" aria-label="Reign years vs median by Dynasty"></div>
  <figcaption class="art-chart-caption">Reign years vs median by Dynasty</figcaption>
</figure>
<p class="art-p"><strong>Nerva-Antonine</strong> sits <strong>12.5</strong> above the median; <strong>Gordian</strong> trails by <strong>4.00</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-pareto" class="anchored">CHART 5 — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart_pareto.plotly.json" data-fallback="/images/content/articles/roman-emperors/charts/chart_pareto.png" role="img" aria-label="Cumulative Reign years"></div>
  <figcaption class="art-chart-caption">Cumulative Reign years</figcaption>
</figure>
<p class="art-p">The top <strong>5</strong> name entries account for <strong>40%</strong> of the aggregate reign years.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Roman Emperors</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Roman Emperors</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about reign years.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: Roman Emperors</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-08-13/emperors.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-08-13/emperors.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-08-13" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
