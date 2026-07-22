---
title: Which Horror Movies Returned Multiples—and Which Burned Cash?
slug: horror-movie-profit
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Budget and box-office data for thousands of horror titles separate winners
  from costly misses.
heroImage: /images/content/articles/horror-movie-profit/hero.png
tags:
  - movies-tv
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Horror is the genre studios love to describe as cheap and scalable — until the ledger says otherwise. Budget and domestic-gross figures for thousands of titles show which films returned capital and which simply burned it.</p>
<p class="art-p">The working file holds <strong>3,401</strong> records spanning <strong>1936–2019</strong>. Median domestic gross sits at <strong>25,533,818</strong>; the highest observed domestic gross is <strong>474,544,677</strong>. Drama is the most common genre label in the merge — a reminder that genre tags in box-office tables are rarely as clean as marketing copy.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">3,401</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">25,533,818</span><span class="fact-label">Median Domestic gross</span></div>
  <div class="fact-box"><span class="fact-number">474,544,677</span><span class="fact-label">Highest observed Domestic gross</span></div>
  <div class="fact-box"><span class="fact-number">Star Wars Ep. I: The Phantom</span><span class="fact-label">Top Movie by Domestic gross</span></div>
  <div class="fact-box"><span class="fact-number">1936–2019</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Drama</span><span class="fact-label">Most common Genre</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-10-23 (R for Data Science community). The working file contains 3,401 rows and 9 columns after merging all available CSV/XLSX tables in the week folder.</p>
<p class="art-p">Charts are exported as Plotly JSON with PNG fallbacks. Medians are preferred where distributions skew. Index-style fields are excluded from metric selection. The table mixes genre labels and franchise outliers — read peaks as structural signals in the file, not as a pure horror-only ledger.</p>

<h2 id="how-the-pattern-changed-over-time" class="anchored">How the pattern changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Domestic gross Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movie-profit/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movie-profit/charts/chart1_trend.png" role="img" aria-label="Median Domestic gross Over Time"></div>
</figure>
<p class="art-p">Median domestic gross falls from 163,245 in the opening period to 0.00 at the close — a path shaped as much by missing values and sparse later rows as by any single box-office collapse.</p>
<p class="art-p">Trend lines in merged profit tables often encode coverage as much as commerce. Treat the decline as a prompt to inspect year density, not as a finished verdict on the genre’s economics.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Star Wars Ep</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movie-profit/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movie-profit/charts/chart2_leaders.png" role="img" aria-label="Star Wars Ep"></div>
</figure>
<p class="art-p">Star Wars Ep. I: The Phantom Menace leads at 474,544,677 — and 419,277,314 marks the median among the top dozen.</p>
<p class="art-p">When a non-horror franchise tops a profit extract labeled for horror analysis, the chart is doing double duty: it shows concentration at the head, and it shows how genre filters leak in community-cleaned tables. The ceiling of the file is not the ceiling of the scare aisle alone.</p>

<h2 id="how-the-field-is-spread" class="anchored">How the field is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Domestic gross by Genre</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movie-profit/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movie-profit/charts/chart3_distribution.png" role="img" aria-label="Domestic gross by Genre"></div>
</figure>
<p class="art-p">Genre boxes show how domestic gross spreads once labels are treated as categories rather than marketing slogans.</p>
<p class="art-p">Some genres share a tight middle; others stretch into long upper whiskers. That shape is the difference between a consensus mid-budget outcome and a handful of titles that define the category’s mythology.</p>

<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Domestic gross vs median by Genre</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movie-profit/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movie-profit/charts/chart4_gap.png" role="img" aria-label="Domestic gross vs median by Genre"></div>
</figure>
<p class="art-p">Adventure sits 34,936,402 above the median; Drama trails by 12,994,440.</p>
<p class="art-p">The gap chart is the practical reading of the distribution: which genre labels systematically clear the file’s middle, and which sit below it even when volume is high.</p>

<h2 id="what-moves-together" class="anchored">What moves together</h2>
<h3 id="what-moves-together-look" class="anchored">Domestic gross vs Worldwide gross</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movie-profit/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movie-profit/charts/chart5_scatter.png" role="img" aria-label="Domestic gross vs Worldwide gross"></div>
</figure>
<p class="art-p">Domestic and worldwide gross move together for most titles, but the scatter still leaves clusters that a single average would erase — films that travel abroad, films that stay domestic, and sparse points where one market dominates the total.</p>
<p class="art-p">Profit stories live in those clusters. A multiple earned at home is not the same business as a multiple earned on the global ledger.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand — structural signals about movie profit rows in this extract, not exhaustive truth about every horror release ever made.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Domestic gross alone is never enough: leaders, genre gaps, time coverage, and the domestic–worldwide scatter each answer a different question about who returned capital.</p>
<p class="art-p">Use the charts to sharpen the question, then check the source and limits before turning any peak into a studio strategy claim.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Horror Movie Profit</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-23/movie_profit.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-23/movie_profit.csv</a></p>

</main>
</div>
