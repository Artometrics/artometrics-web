---
title: "NETFLIX ENGAGEMENT: The Artometrics of Netflix Engagement"
slug: netflix-engagement
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2025-07-29 release on Netflix Engagement — 27,803 rows after cleaning and merge. Which titles consumed the most hours — the metric Netflix actually..."
heroImage: /images/content/articles/netflix-engagement/hero.png
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2025-07-29</strong> release on <strong>Netflix Engagement</strong> — <strong>27,803</strong> rows after cleaning and merge. Which titles consumed the most hours — the metric Netflix actually optimizes for?</p>
<p class="art-p">Five charts track <strong>Hours viewed</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">27,803</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">2,500,000</span><span class="fact-label">Median Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">840,300,000</span><span class="fact-label">Highest observed Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">Squid Game: Season 2 // 오징어 </span><span class="fact-label">Top Title by Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">2010–2025</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">1_What_We_Watched_A_Netflix_</span><span class="fact-label">Most common Source</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>Engagement reports from Netflix's weekly viewership releases: hours viewed, runtime, and global availability flags.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart1_trend.png" role="img" aria-label="Median Hours viewed Over Time"></div>
  <figcaption class="art-chart-caption">Median Hours viewed Over Time</figcaption>
</figure>
<p class="art-p">Median hours viewed is <strong>rising</strong> from <strong>5,700,000</strong> in the opening period to <strong>6,700,000</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart2_leaders.png" role="img" aria-label="Top Title"></div>
  <figcaption class="art-chart-caption">Top Title</figcaption>
</figure>
<p class="art-p"><strong>Squid Game: Season 2 // 오징어 게임: 시즌 2</strong> leads at <strong>730,100,000</strong> — <strong>411,000,000</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart3_distribution.png" role="img" aria-label="Hours viewed by Source"></div>
  <figcaption class="art-chart-caption">Hours viewed by Source</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether hours viewed consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart4_gap.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart4_gap.png" role="img" aria-label="Hours viewed vs median by Source"></div>
  <figcaption class="art-chart-caption">Hours viewed vs median by Source</figcaption>
</figure>
<p class="art-p"><strong>3_What_We_Watched_A_Netflix_Engagement_Report_2024Jan-Jun</strong> sits <strong>100,000</strong> above the median; <strong>1_What_We_Watched_A_Netflix_Engagement_Report_2025Jan-Jun</strong> trails by <strong>200,000</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/netflix-engagement/charts/chart5_scatter.png" role="img" aria-label="Hours viewed vs Views"></div>
  <figcaption class="art-chart-caption">Hours viewed vs Views</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>hours viewed</strong> and <strong>views</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Netflix Engagement</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Netflix Engagement</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about hours viewed.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Netflix Engagement</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-29/shows.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-29/shows.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-07-29" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
