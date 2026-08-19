---
title: NYC Restaurant Inspections Show 15-Point Median, 156-Point Outlier
slug: nyc-restaurant-inspections
author: kyle-mcauliffe
pubDate: 2026-06-15T00:00:00.000Z
description: NYC restaurant inspection scores cluster at 15; highest violation count reaches 156 in 100,000-record TidyTuesday extract.
heroImage: /images/content/articles/nyc-restaurant-inspections/hero.png
draft: false
tags:
  - culture
  - food
tldr: >-
  NYC restaurant inspection scores cluster at a median of 15.0 violation points, but the highest recorded score reaches 156 in a 100,000-record TidyTuesday extract covering 1900–2018. Grade A dominates the distribution, while the numeric scoring system reveals a long tail of extreme violations hidden behind letter grades.
keyPoints:
  - '15.0 — Median violation score across 100,000 inspections — most establishments stay well below penalty thresholds'
  - '156 — Highest recorded score in extract — nearly eleven times the median, marking severe compliance failure'
  - "152 — The Slope Lounge and Restaurant's score — leads top-violator list with median of 122 among worst dozen"
  - 'A — Most common grade — letter system compresses wide numeric range into single public-facing label'
faq:
  - question: What does a higher inspection score mean?
    answer: >-
      Higher scores indicate more violation points; a 15 is better than a 150.
  - question: How many NYC restaurant inspections are in this dataset?
    answer: >-
      100,000 records sampled from NYC open data via TidyTuesday.
  - question: Which restaurant has the highest violation score?
    answer: >-
      The Slope Lounge and Restaurant at 152 points in this extract.
  - question: Why do some records show inspection years before 1950?
    answer: >-
      Placeholder dates appear in the raw data; most signal comes from 2010–2018.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">NYC restaurant inspection scores cluster at a median of 15.0 violation points, but the distribution stretches to 156 in a 100,000-record TidyTuesday extract — a span that letter grades compress into A, B, and C stickers.</p>
<p class="art-p">The highest-scoring establishment in this extract, <strong>The Slope Lounge and Restaurant</strong>, logged <strong>152</strong> points. The top dozen violators post a median of <strong>122</strong>. Grade <strong>A</strong> remains the most common public label, while the year span runs from placeholder <strong>1900</strong> through <strong>2018</strong>, with inspection density concentrated in the 2010s.</p>
<p class="art-p">Higher scores mean more violations, not better food — an inversion easy to forget once letter grades take over.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">15.0</span><span class="fact-label">Median Score</span></div>
  <div class="fact-box"><span class="fact-number">156</span><span class="fact-label">Highest observed Score</span></div>
  <div class="fact-box"><span class="fact-number">NOUS LES AMIS RESTAURANT & B</span><span class="fact-label">Top Dba by Score</span></div>
  <div class="fact-box"><span class="fact-number">1900–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">A</span><span class="fact-label">Most common Grade</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release built from NYC restaurant inspection open data via the R for Data Science community. The working file contains 100,000 rows sampled from the full dataset, with fields including DBA names, boroughs, scores, grades, and inspection dates.</p>
<p class="art-p">Medians matter because a thin tail of high-violation restaurants pulls means upward. Charts export as Plotly JSON with PNG fallbacks. Grades derive from scores under city rules; treating them as independent categories misses the underlying point system.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How scores moved over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Score Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart1_trend.png" role="img" aria-label="Median Score Over Time"></div>
</figure>
<p class="art-p">Median score over time tracks whether the typical inspected restaurant became cleaner, worse, or remained stable as the program matured. Flat stretches can signal stable compliance or consistent scoring practice.</p>
<p class="art-p">Early placeholder years carry little weight; most interpretive signal sits in the dense 2010–2018 window.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top of violation scores</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">The Slope Lounge and Restaurant leads at 152 — 122 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart2_leaders.png" role="img" aria-label="The Slope Lounge and Restaurant leads at 152 — 122 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>The Slope Lounge and Restaurant</strong> posts <strong>152</strong> points, with a median of <strong>122</strong> among the top dozen violators. These scores sit at the extreme end of a distribution where the overall median is 15.</p>
<p class="art-p">The head of the distribution is where enforcement drama concentrates. Single bad inspections can define a DBA's ranking even if later visits improve.</p>
<h2 id="how-the-field-is-spread" class="anchored">Scores by grade</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Score by Grade</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart3_distribution.png" role="img" aria-label="Score by Grade"></div>
</figure>
<p class="art-p">Box plots by grade show the numeric ranges that map onto A, B, C, and related labels. Grade A dominates the count; higher-letter grades occupy the upper score territory where violation points accumulate.</p>
<p class="art-p">The chart makes the letter system's compression visible: many different numeric outcomes share an A, while public debate concentrates on rarer worse grades.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Score vs median by Grade</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart4_gap.png" role="img" aria-label="Score vs median by Grade"></div>
</figure>
<p class="art-p">The gap chart ranks grades above or below the median score. Worse letter grades sit far above the median by design; A sits at or below it. The geometry is the grading rule made visual.</p>
<p class="art-p">What remains notable is the within-grade spread on the previous chart: even A is a band, not a point, and policy arguments often happen inside that band.</p>
<h2 id="what-moves-together" class="anchored">Scores and identifiers</h2>
<h3 id="what-moves-together-look" class="anchored">Score vs Camis</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart5_scatter.png" role="img" aria-label="Score vs Camis"></div>
</figure>
<p class="art-p">Plotting score against CAMIS identifiers is mostly a diagnostic scatter: restaurant IDs are not a substantive X-axis, but the cloud shows how scores disperse across the universe of establishments rather than clustering on a few names.</p>
<p class="art-p">When substantive covariates are thin, an ID scatter refuses to invent a prettier relationship than the table supports.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and sampling to 100,000 rows apply. Scores are inspection outcomes, not taste ratings.</p>
<p class="art-p">Findings describe structural patterns in NYC inspection scoring — not a complete health study, and not a recommendation about where to eat without checking current grades.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">NYC restaurant inspections cluster at a median of 15 violation points, with a long tail extending past 150. Grade A dominates the public display; extreme scores are rare but visible in the data.</p>
<p class="art-p">The inversion remains: higher numbers are worse, letter grades compress a wide numeric band, and the window sticker is only the headline of a point system running underneath.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>