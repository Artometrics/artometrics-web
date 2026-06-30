---
title: "BOARD GAMES: The Artometrics of Board Games"
slug: board-games
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2019-03-12 release on Board Games — 10,532 rows after cleaning and merge. Which board games combine crowd scale with elite ratings?"
heroImage: /images/content/articles/board-games/hero.png
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-03-12</strong> release on <strong>Board Games</strong> — <strong>10,532</strong> rows after cleaning and merge. Which board games combine crowd scale with elite ratings?</p>
<p class="art-p">Five charts track <strong>Average rating</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">10,532</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">6.39</span><span class="fact-label">Median Average rating</span></div>
  <div class="fact-box"><span class="fact-number">9.00</span><span class="fact-label">Highest observed Average rating</span></div>
  <div class="fact-box"><span class="fact-number">Small World Designer Edition</span><span class="fact-label">Top Name by Average rating</span></div>
  <div class="fact-box"><span class="fact-number">1970–1970</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Wargame,World War II</span><span class="fact-label">Most common Category</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2019-03-12</strong> (R for Data Science community). This working file contains <strong>10,532</strong> rows and <strong>23</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/board-games/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/board-games/charts/chart1_trend.png" role="img" aria-label="Median Average rating Over Time"></div>
  <figcaption class="art-chart-caption">Median Average rating Over Time</figcaption>
</figure>
<p class="art-p">Median average rating is <strong>falling</strong> from <strong>6.39</strong> in the opening period to <strong>6.39</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/board-games/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/board-games/charts/chart2_leaders.png" role="img" aria-label="Top Name"></div>
  <figcaption class="art-chart-caption">Top Name</figcaption>
</figure>
<p class="art-p"><strong>Small World Designer Edition</strong> leads at <strong>9.00</strong> — <strong>8.78</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/board-games/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/board-games/charts/chart3_distribution.png" role="img" aria-label="Average rating by Category"></div>
  <figcaption class="art-chart-caption">Average rating by Category</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether average rating consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/board-games/charts/chart4_gap.plotly.json" data-fallback="/images/content/articles/board-games/charts/chart4_gap.png" role="img" aria-label="Average rating vs median by Category"></div>
  <figcaption class="art-chart-caption">Average rating vs median by Category</figcaption>
</figure>
<p class="art-p"><strong>American Civil War,Wargame</strong> sits <strong>0.66</strong> above the median; <strong>Card Game</strong> trails by <strong>0.36</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/board-games/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/board-games/charts/chart5_scatter.png" role="img" aria-label="Average rating vs Users rated"></div>
  <figcaption class="art-chart-caption">Average rating vs Users rated</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>average rating</strong> and <strong>users rated</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals about <strong>Board Games</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Board Games</strong> rewards counting: the leaders, the long tail, and the time trend rarely tell the same story about average rating.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: Board Games</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-03-12/board_games.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-03-12/board_games.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-03-12" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
