---
title: "CRAFT BEER USA: The Artometrics of Craft Beer USA"
slug: craft-beer-usa
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2018-07-10 release on Craft Beer USA — 2,410 rows after cleaning and merge. How bitter and strong is American craft beer — by state and brewery?"
heroImage: /images/content/articles/craft-beer-usa/hero.png
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
  <li><a href="#chart-4-concentration" id="toc-chart-4-concentration">CHART 4 — CONCENTRATION</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — RELATIONSHIP</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-07-10</strong> release on <strong>Craft Beer USA</strong> — <strong>2,410</strong> rows after cleaning and merge. How bitter and strong is American craft beer — by state and brewery?</p>
<p class="art-p">Five charts track <strong>Abv</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,410</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">0.06</span><span class="fact-label">Median Abv</span></div>
  <div class="fact-box"><span class="fact-number">0.13</span><span class="fact-label">Highest observed Abv</span></div>
  <div class="fact-box"><span class="fact-number">Lee Hill Series Vol. 5 - Bel</span><span class="fact-label">Top Name by Abv</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2018-07-10</strong> (R for Data Science community). This working file contains <strong>2,410</strong> rows and <strong>8</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-breakdown" class="anchored">CHART 1 — BREAKDOWN</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart1_breakdown.png" role="img" aria-label="Abv by Name"></div>
  <figcaption class="art-chart-caption">Abv by Name</figcaption>
</figure>
<p class="art-p"><strong>Lee Hill Series Vol. 5 - Belgian Style Quadrupel Ale</strong> leads at <strong>0.13</strong>; <strong>Johan the Barleywine</strong> anchors the low end at <strong>0.10</strong>.</p>
<p class="art-p">Grouping by name exposes how the metric varies across the catalog's major entities.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart2_leaders.png" role="img" aria-label="Lee Hill Series Vol"></div>
  <figcaption class="art-chart-caption">Lee Hill Series Vol</figcaption>
</figure>
<p class="art-p"><strong>Lee Hill Series Vol. 5 - Belgian Style Quadrupel Ale</strong> leads at <strong>0.13</strong> — <strong>0.10</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart3_distribution.png" role="img" aria-label="Median 0.06 vs mean 0.06 — the shape is right-skewed"></div>
  <figcaption class="art-chart-caption">Median 0.06 vs mean 0.06 — the shape is right-skewed</figcaption>
</figure>
<p class="art-p">Median <strong>0.06</strong> vs mean <strong>0.06</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>0.08</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-concentration" class="anchored">CHART 4 — CONCENTRATION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart4_pareto.png" role="img" aria-label="The top 5 name entries account for 37% of the aggregate abv"></div>
  <figcaption class="art-chart-caption">The top 5 name entries account for 37% of the aggregate abv</figcaption>
</figure>
<p class="art-p">The top <strong>5</strong> name entries account for <strong>37%</strong> of the aggregate abv.</p>
<p class="art-p">Steep Pareto curves mean a small head drives most of the signal — the long tail is noise until it isn't.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart5_scatter.png" role="img" aria-label="Abv vs Ibu"></div>
  <figcaption class="art-chart-caption">Abv vs Ibu</figcaption>
</figure>
<p class="art-p">Joint plot of <strong>abv</strong> and <strong>ibu</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>Craft Beer USA</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Read as a teaching map, <strong>Craft Beer USA</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about abv.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Craft Beer USA</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-10/week15_beers.xlsx" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-10/week15_beers.xlsx</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-07-10" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
