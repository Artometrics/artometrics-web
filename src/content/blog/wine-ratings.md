---
title: Does Wine Price Predict Critic Points?
slug: wine-ratings
pubDate: 2026-06-15T00:00:00.000Z
description: A hundred thousand wine ratings test whether cost tracks scores.
heroImage: /images/content/articles/wine-ratings/hero.png
tags:
  - culture
draft: false
tldr: A hundred thousand wine ratings test whether cost tracks scores.
keyPoints:
  - '100,000 — Records in the working dataset'
  - 88.0 — Median Points
  - 100 — Highest observed Points
  - Charles Smith 2006 Royal Cit — Top Title by Points
  - US — Most common Country
faq:
  - question: What does “Perfect scores crowd the title breakdown’s top slice” show?
    answer: '100,000 — Records in the working dataset'
  - question: What does “The leaders chart is a wall of 100-point wines” show?
    answer: 88.0 — Median Points
  - question: What does “Countries spread points around a high center” show?
    answer: 100 — Highest observed Points
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">A hundred thousand wine ratings are enough to test a dinner-table theory: does price predict critic points? This file’s median score is 88.0; the observed high is 100. Charles Smith 2006 Royal City appears in the fact-box title ranking; the United States is the most common country.</p>
<p class="art-p">The charts move from title leaders to country spreads to the points-versus-price scatter. The calibration point is 88.0 — the mathematical center of a tasting culture that rarely uses the bottom of the scale.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">88.0</span><span class="fact-label">Median Points</span></div>
  <div class="fact-box"><span class="fact-number">100</span><span class="fact-label">Highest observed Points</span></div>
  <div class="fact-box"><span class="fact-number">Charles Smith 2006 Royal Cit</span><span class="fact-label">Top Title by Points</span></div>
  <div class="fact-box"><span class="fact-number">US</span><span class="fact-label">Most common Country</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-05-28 (R for Data Science community). The working file contains 100,000 rows and 13 columns after merging available tables in the week folder. Points is the primary metric; price appears in the scatter; title and country are categorical axes.</p>
<p class="art-p">Medians are used because wine scores cluster tightly and prices skew. Index-style fields are excluded from metric selection.</p>

<h2 id="perfect-scores-crowd-the-title-breakdown-s-top-slice" class="anchored">Perfect scores crowd the title breakdown’s top slice</h2>
<h3 id="perfect-scores-crowd-the-title-breakdown-s-top-slice-look" class="anchored">Points by Title</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wine-ratings/charts/chart1_breakdown.png" role="img" aria-label="Points by Title"></div>
</figure>
<p class="art-p">In the title breakdown, Château Léoville Barton 2010 Saint-Julien leads at 100; Cardinale 2006 Cabernet Sauvignon (Napa Valley) anchors the low end of that plotted top group at 100 as well — a flat elite band at the scale’s ceiling.</p>
<p class="art-p">When the top slice is all 100s, the chart is telling you about saturation at the maximum, not about a wide ladder of near-misses.</p>

<h2 id="the-leaders-chart-is-a-wall-of-100-point-wines" class="anchored">The leaders chart is a wall of 100-point wines</h2>
<h3 id="the-leaders-chart-is-a-wall-of-100-point-wines-look" class="anchored">Château Léoville Barton 2010 Saint-Julien leads at 100 — 100 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wine-ratings/charts/chart2_leaders.png" role="img" aria-label="Château Léoville Barton 2010 Saint-Julien leads at 100 — 100 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Château Léoville Barton 2010 Saint-Julien leads at 100, and 100 marks the median among the top dozen. The elite is compressed at the ceiling. Charles Smith 2006 Royal City remains a fact-box landmark for the title ranking rule used there.</p>
<p class="art-p">A top dozen whose median is 100 is not a typical wine; it is the ceremonial head of a 100,000-row tasting archive.</p>

<h2 id="countries-spread-points-around-a-high-center" class="anchored">Countries spread points around a high center</h2>
<h3 id="countries-spread-points-around-a-high-center-look" class="anchored">Points by Country</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wine-ratings/charts/chart3_distribution.png" role="img" aria-label="Points by Country"></div>
</figure>
<p class="art-p">Category boxes by country show whether points consensus is shared or contested across origins. The United States is the most common country by frequency; the boxes ask how scores spread inside each origin.</p>
<p class="art-p">Country structure matters because wine writing often treats place as destiny. The boxes test how much score variation place actually carries in this file.</p>

<h2 id="austria-clears-the-median-chile-trails" class="anchored">Austria clears the median; Chile trails</h2>
<h3 id="austria-clears-the-median-chile-trails-look" class="anchored">Points vs median by Country</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wine-ratings/charts/chart4_gap.png" role="img" aria-label="Points vs median by Country"></div>
</figure>
<p class="art-p">Austria sits 2.00 above the median; Chile trails by 2.00. Those signed gaps are modest in points terms — a reminder that this scoring culture lives in a narrow band around 88.0.</p>
<p class="art-p">Small gaps can still be meaningful when the whole scale’s action happens between the high 80s and the low 90s for most bottles.</p>

<h2 id="points-and-price-form-the-real-test-of-the-dinner-table-theory" class="anchored">Points and price form the real test of the dinner-table theory</h2>
<h3 id="points-and-price-form-the-real-test-of-the-dinner-table-theory-look" class="anchored">Points vs Price</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wine-ratings/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wine-ratings/charts/chart5_scatter.png" role="img" aria-label="Points vs Price"></div>
</figure>
<p class="art-p">Plotting points against price shows clusters that averages erase: cheap high scorers, expensive middling bottles, and the familiar cloud where spending more often accompanies higher scores without guaranteeing them.</p>
<p class="art-p">The scatter is the relationship the title promised. It does not invent a correlation coefficient beyond what the chart shows; it shows the joint distribution in the 100,000-row extract.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live Wine Enthusiast APIs. Missing prices, title variants, and coverage limits apply. Critic points reflect the source’s scoring practice, which uses a compressed high end of the scale.</p>
<p class="art-p">Findings describe this wine-ratings extract — structural signals about points, country, and price — not a universal law of taste.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Wine scores in this file center on a median of 88.0, peak at 100 among title leaders, and show only modest country gaps around that high center.</p>
<p class="art-p">Austria sits above the median and Chile below by two points each, while the points–price scatter is where the cost-versus-score question becomes visible without reducing 100,000 tastings to a slogan.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: Wine Ratings</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-28/winemag-data-130k-v2.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-05-28/winemag-data-130k-v2.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-05-28" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
