---
title: "SCHOOL DIVERSITY: The Artometrics of School Diversity"
slug: school-diversity
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2019-09-24 release on School Diversity — 27,944 rows after cleaning and merge. Where is student-body diversity highest — and how spread out are schools?"
heroImage: /images/content/articles/school-diversity/hero.png
tags: [power, persona]
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
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-09-24</strong> release on <strong>School Diversity</strong> — <strong>27,944</strong> rows after cleaning and merge. Where is student-body diversity highest — and how spread out are schools?</p>
<p class="art-p">Five charts track <strong>Multi</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">27,944</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">2.38</span><span class="fact-label">Median Multi</span></div>
  <div class="fact-box"><span class="fact-number">85.3</span><span class="fact-label">Highest observed Multi</span></div>
  <div class="fact-box"><span class="fact-number">butteville union elementary</span><span class="fact-label">Top LEA NAME by Multi</span></div>
  <div class="fact-box"><span class="fact-number">TX</span><span class="fact-label">Most common ST</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2019-09-24</strong> (R for Data Science community). This working file contains <strong>27,944</strong> rows and <strong>15</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart1_trend.plotly.json" data-fallback="/images/content/articles/school-diversity/charts/chart1_trend.png" role="img" aria-label="Median Multi Over Time"></div>
  <figcaption class="art-chart-caption">Median Multi Over Time</figcaption>
</figure>
<p class="art-p">Median multi is <strong>falling</strong> from <strong>2.38</strong> in the opening period to <strong>2.38</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart2_leaders.plotly.json" data-fallback="/images/content/articles/school-diversity/charts/chart2_leaders.png" role="img" aria-label="Top LEA NAME"></div>
  <figcaption class="art-chart-caption">Top LEA NAME</figcaption>
</figure>
<p class="art-p"><strong>butteville union elementary</strong> leads at <strong>85.3</strong> — <strong>52.0</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/school-diversity/charts/chart3_distribution.png" role="img" aria-label="Multi by ST"></div>
  <figcaption class="art-chart-caption">Multi by ST</figcaption>
</figure>
<p class="art-p">Category boxes reveal whether multi consensus is shared or contested across tiers.</p>
<p class="art-p">Wide whiskers flag segments where outliers — not averages — drive reputation.</p>
<h2 id="chart-4-gap" class="anchored">CHART 4 — GAP ANALYSIS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart4_gap.plotly.json" data-fallback="/images/content/articles/school-diversity/charts/chart4_gap.png" role="img" aria-label="Multi vs median by ST"></div>
  <figcaption class="art-chart-caption">Multi vs median by ST</figcaption>
</figure>
<p class="art-p"><strong>OK</strong> sits <strong>4.25</strong> above the median; <strong>NJ</strong> trails by <strong>0.81</strong>.</p>
<p class="art-p">Diverging from the median exposes which tiers over- or under-perform — not just who ranks first.</p>
<h2 id="chart-5-relationship" class="anchored">CHART 5 — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart5_scatter.plotly.json" data-fallback="/images/content/articles/school-diversity/charts/chart5_scatter.png" role="img" aria-label="Multi vs Variance"></div>
  <figcaption class="art-chart-caption">Multi vs Variance</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>multi</strong> and <strong>variance</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>School Diversity</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>School Diversity</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about multi.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: School Diversity</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-09-24/school_diversity.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-09-24/school_diversity.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-09-24" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
