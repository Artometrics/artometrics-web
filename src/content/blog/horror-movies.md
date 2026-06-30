---
title: "HORROR MOVIES: The Artometrics of Horror Movies"
slug: horror-movies
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2022-11-01 release on Horror Movies — 32,540 rows after cleaning and merge. Did horror get better-reviewed as the catalog exploded, or did quantity..."
heroImage: /images/content/articles/horror-movies/hero.png
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
  <li><a href="#chart-4-gap" id="toc-chart-4-gap">CHART 4 — GAP ANALYSIS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2022-11-01</strong> release on <strong>Horror Movies</strong> — <strong>32,540</strong> rows after cleaning and merge. Did horror get better-reviewed as the catalog exploded, or did quantity dilute quality?</p>
<p class="art-p">Five charts track <strong>Vote average</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">32,540</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">4.00</span><span class="fact-label">Median Vote average</span></div>
  <div class="fact-box"><span class="fact-number">10.0</span><span class="fact-label">Highest observed Vote average</span></div>
  <div class="fact-box"><span class="fact-number">Piranha Women</span><span class="fact-label">Top Title by Vote average</span></div>
  <div class="fact-box"><span class="fact-number">1950–2022</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Horror</span><span class="fact-label">Most common Primary genre</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The file merges TMDB metadata for thousands of horror-tagged films: ratings, budgets, runtimes, and genre tags from 1950 through 2022.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/horror-movies/charts/chart1_trend.png" role="img" aria-label="Median Vote average Over Time"></div>
  <figcaption class="art-chart-caption">Median Vote average Over Time</figcaption>
</figure>
<p class="art-p">Median vote average is <strong>rising</strong> from <strong>5.65</strong> in the opening period to <strong>6.00</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/horror-movies/charts/chart2_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p"><strong>The House Guest</strong> leads at <strong>10.0</strong> — <strong>10.0</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/horror-movies/charts/chart3_distribution.png" role="img" aria-label="Vote average by Primary genre"></div>
  <figcaption class="art-chart-caption">Vote average by Primary genre</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether vote average consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart4_gap.plotly.json" data-fallback="/images/content/articles/horror-movies/charts/chart4_gap.png" role="img" aria-label="Vote average vs median by Primary genre"></div>
  <figcaption class="art-chart-caption">Vote average vs median by Primary genre</figcaption>
</figure>
<p class="art-p"><strong>Crime</strong> sits <strong>1.00</strong> above the median; <strong>Animation</strong> trails by <strong>4.00</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/horror-movies/charts/chart5_scatter.png" role="img" aria-label="Vote average vs Vote count"></div>
  <figcaption class="art-chart-caption">Vote average vs Vote count</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>vote average</strong> and <strong>vote count</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Horror Movies</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Horror Movies</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about vote average.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2022). <em>TidyTuesday: Horror Movies</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-01/horror_movies.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-01/horror_movies.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-11-01" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
