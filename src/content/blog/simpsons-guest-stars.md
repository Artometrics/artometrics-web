---
title: Marcia Wallace Appeared 175 Times — More Than Any Other Simpsons Guest Star
slug: simpsons-guest-stars
author: kyle-mcauliffe
pubDate: 2026-06-15T00:00:00.000Z
description: Marcia Wallace logged 175 guest appearances across 30 Simpsons seasons—2.7× more than the second-place performer in the TidyTuesday dataset.
heroImage: /images/content/articles/simpsons-guest-stars/hero.png
draft: false
tags:
  - arts
  - film
tldr: >-
  Marcia Wallace logged 175 guest appearances across 30 Simpsons seasons in the TidyTuesday dataset—2.7× more than the second-place performer. Season 24 recorded the highest guest density with 65 appearances, and most guest stars appeared only once.
keyPoints:
  - "175 — Marcia Wallace's appearance count across 30 seasons — 2.7× the second-place guest"
  - '65 — Guest appearances in Season 24 — the peak density across all seasons'
  - '1,381 — Total guest records in the 2019 TidyTuesday snapshot covering Seasons 1–30'
faq:
  - question: >-
      Who guest-starred most often on The Simpsons?
    answer: >-
      Marcia Wallace, with 175 appearances across Seasons 1–30 in the TidyTuesday dataset.
  - question: >-
      Which season had the most guest stars?
    answer: >-
      Season 24, with 65 guest appearances recorded in the 2019 snapshot.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">Marcia Wallace logged 175 guest appearances across 30 Simpsons seasons—2.7× more than the second-place performer and the highest count in the TidyTuesday dataset released August 27, 2019.</p>
<p class="art-p">The snapshot captures 1,381 guest records spanning Seasons 1–30. Season 24 recorded the highest guest density with 65 appearances, while most guests appeared only once.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">1,381</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1–30</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-08-27 (R for Data Science community). This working file contains 1,381 rows and 7 columns after merging all available CSV/XLSX tables in the week folder.</p>
<p class="art-p">Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>

<h2 id="volume" class="anchored">Volume</h2>
<h3 id="volume-look" class="anchored">Records By Period</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/simpsons-guest-stars/charts/chart1_volume.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/simpsons-guest-stars/charts/chart1_volume.png" role="img" aria-label="Records By Period"></div>
</figure>
<p class="art-p">Activity peaks in Season 24 with 65 records.</p>
<p class="art-p">Period-level counts reveal when guest-appearance frequency intensified.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Top Guest star</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/simpsons-guest-stars/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/simpsons-guest-stars/charts/chart2_leaders.png" role="img" aria-label="Top Guest star"></div>
</figure>
<p class="art-p">Marcia Wallace appears 175 times—the most recurring name in the file.</p>
<p class="art-p">The top dozen account for a visible share of all 1,381 rows.</p>

<h2 id="timeline" class="anchored">Timeline</h2>
<h3 id="timeline-look" class="anchored">Leaders Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/simpsons-guest-stars/charts/chart4_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/simpsons-guest-stars/charts/chart4_timeline.png" role="img" aria-label="Leaders Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep—some fade as others surge.</p>
<p class="art-p">Tracking counts over time separates sustained presence from one-season spikes.</p>

<h2 id="frequency" class="anchored">Frequency</h2>
<h3 id="frequency-look" class="anchored">Most guest star entities appear only once; a small head revisits repeatedly</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/simpsons-guest-stars/charts/chart5_frequency.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/simpsons-guest-stars/charts/chart5_frequency.png" role="img" aria-label="Most guest star entities appear only once; a small head revisits repeatedly"></div>
</figure>
<p class="art-p">Most guest stars appear only once; a small cluster revisits repeatedly.</p>
<p class="art-p">This power-law shape is typical of guest lists, credits, and catalog-style tables.</p>

<h2 id="mix" class="anchored">Mix</h2>
<h3 id="mix-look" class="anchored">24 is the most repeated season in the extract</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/simpsons-guest-stars/charts/chart_extra_mix.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/simpsons-guest-stars/charts/chart_extra_mix.png" role="img" aria-label="24 is the most repeated season in the extract"></div>
</figure>
<p class="art-p">Season 24 is the most repeated season in the extract.</p>
<p class="art-p">Secondary dimensions add context when the primary table has no numeric score column.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand—treat them as structural signals about Simpsons guest appearances, not exhaustive truth about the full domain.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Read as a teaching map, this dataset shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about guest-appearance patterns.</p>
<p class="art-p">The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: Simpsons Guest Stars</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-08-27/simpsons-guests.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-08-27/simpsons-guests.csv</a></p>

</main>
</div>