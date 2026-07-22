---
title: Which NYC Cuisines Score Highest on Health Inspections?
slug: nyc-restaurant-inspections
pubDate: 2026-06-15T00:00:00.000Z
description: Restaurant grades across New York show how scores distribute by cuisine.
heroImage: /images/content/articles/nyc-restaurant-inspections/hero.png
tags:
  - cities-travel
draft: false
tldr: Restaurant grades across New York show how scores distribute by cuisine.
keyPoints:
  - '100,000 — Records in the working dataset'
  - 15.0 — Median Score
  - 156 — Highest observed Score
  - NOUS LES AMIS RESTAURANT & B — Top Dba by Score
  - 1900–2018 — Year span covered in the file
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">New York City restaurant inspections turn hygiene into a public grade. Behind the A/B/C stickers is a numeric score distribution that is far more skewed than the cheerful window cards suggest.</p>
<p class="art-p">A TidyTuesday working extract of <strong>100,000</strong> records puts median score at <strong>15.0</strong> and the highest observed score at <strong>156</strong>. <strong>NOUS LES AMIS RESTAURANT &amp; B</strong> leads the DBA ranking by score in the fact box, grade <strong>A</strong> is the most common label, and the year span in the file runs from a placeholder-early <strong>1900</strong> through <strong>2018</strong> — with the dense modern inspection era carrying most of the signal.</p>
<p class="art-p">Higher scores here mean more violation points, not better food. That inversion is easy to forget once letter grades take over the conversation.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">15.0</span><span class="fact-label">Median Score</span></div>
  <div class="fact-box"><span class="fact-number">156</span><span class="fact-label">Highest observed Score</span></div>
  <div class="fact-box"><span class="fact-number">NOUS LES AMIS RESTAURANT & B</span><span class="fact-label">Top Dba by Score</span></div>
  <div class="fact-box"><span class="fact-number">1900–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">A</span><span class="fact-label">Most common Grade</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release built from NYC restaurant inspection open data via the R for Data Science community. The working file contains 100,000 rows after sampling or assembly — DBA names, boroughs, scores, grades, and inspection dates among the fields.</p>
<p class="art-p">Medians matter because a thin tail of high-violation restaurants pulls means upward. Charts export as Plotly JSON with PNG fallbacks. Grades are derived from scores under city rules; treating them as independent aesthetics misses the point system underneath.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How scores moved over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Score Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart1_trend.png" role="img" aria-label="Median Score Over Time"></div>
</figure>
<p class="art-p">Median score over time tracks whether the typical inspected restaurant became cleaner, worse, or merely differently covered as the program matured. Flat stretches can mean stable compliance — or stable scoring practice.</p>
<p class="art-p">Because early placeholder years can sit beside dense 2010s rows, the right-hand side of the timeline is where most interpretive weight belongs.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top of violation scores</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">The Slope Lounge and Restaurant leads at 152 — 122 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart2_leaders.png" role="img" aria-label="The Slope Lounge and Restaurant leads at 152 — 122 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>The Slope Lounge and Restaurant</strong> leads at <strong>152</strong> on the highlighted cut, with <strong>122</strong> as the median among the top dozen. Those are extreme violation totals relative to a file-wide median of 15.</p>
<p class="art-p">The head of the score distribution is where enforcement drama lives. It is also where single bad inspections can define a DBA's appearance in a ranking even if later visits improve.</p>
<h2 id="how-the-field-is-spread" class="anchored">Scores by grade</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Score by Grade</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart3_distribution.png" role="img" aria-label="Score by Grade"></div>
</figure>
<p class="art-p">Box plots by grade show the numeric ranges that map onto A, B, C, and related labels. Grade A dominates headcount; the higher-letter grades occupy the upper score territory where violation points accumulate.</p>
<p class="art-p">The chart makes the letter system's compression visible: many different numeric realities share an A, while the public argument concentrates on the rarer worse grades.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Score vs median by Grade</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart4_gap.png" role="img" aria-label="Score vs median by Grade"></div>
</figure>
<p class="art-p">The gap chart ranks grades above or below the median score. Worse letter grades sit far above the median by construction; A sits at or below it. The geometry is the grading rule made visual.</p>
<p class="art-p">What remains interesting is the within-grade spread on the previous chart: even A is a band, not a point, and policy fights often happen inside that band.</p>
<h2 id="what-moves-together" class="anchored">Scores and identifiers</h2>
<h3 id="what-moves-together-look" class="anchored">Score vs Camis</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nyc-restaurant-inspections/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nyc-restaurant-inspections/charts/chart5_scatter.png" role="img" aria-label="Score vs Camis"></div>
</figure>
<p class="art-p">Plotting score against CAMIS identifiers is mostly a diagnostic scatter: restaurant IDs are not a substantive X-axis, but the cloud still shows how scores disperse across the universe of establishments rather than clustering on a few famous names.</p>
<p class="art-p">When substantive covariates are thin, an ID scatter is a honesty device — it refuses to invent a prettier relationship than the table supports.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and sampling to 100,000 rows apply. Scores are inspection outcomes, not Yelp taste ratings.</p>
<p class="art-p">Findings describe structural signals about NYC inspection scoring in the file — not a complete health study, and not a recommendation about where to eat tonight without checking current grades.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">NYC restaurant inspections are a median-15 world with a long right tail past 150 violation points. Grade A is common; extreme scores are rare and loud.</p>
<p class="art-p">The citable inversion remains: higher numbers are worse, letter grades compress a wide numeric band, and the public sticker is only the headline of a point system.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
