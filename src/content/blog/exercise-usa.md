---
title: 'Where Americans Exercise Most: A State-by-State Map'
slug: exercise-usa
author: kyle-mcauliffe
pubDate: 2026-06-15T00:00:00.000Z
description: Colorado leads at 32.0; the median across 52 U.S. jurisdictions is 23.0, with Western and New England states dominating.
heroImage: /images/content/articles/exercise-usa/hero.png
draft: false
tags:
  - culture
  - wellness
tldr: >-
  Exercise participation varies sharply across U.S. states. Colorado leads at 32.0 adults, while the median across 52 jurisdictions stands at 23.0. Mountain and New England states dominate the upper tier, with the top five entries accounting for 36% of the aggregate measure.
keyPoints:
  - 52 — Jurisdictions in dataset (states plus D.C.)
  - 32.0 — Colorado's adult exercise rate, the highest observed
  - 28.5 — Median among top dozen states, 5.5 points above national median
  - 36% — Share of aggregate held by top five states
faq:
  - question: How many states and territories are in this dataset?
    answer: 52 records, including all 50 states plus D.C. and one additional jurisdiction.
  - question: What is the median exercise rate across all states?
    answer: The median is 23.0 on the adults metric.
  - question: Which state has the highest exercise rate?
    answer: Colorado leads at 32.0.
  - question: What percentage of total exercise activity do the top five states account for?
    answer: The top five state entries account for approximately 36% of the aggregate adults measure.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">Exercise participation is unevenly distributed across American states. The TidyTuesday exercise extract analyzed here comprises <strong>52</strong> jurisdictions (states plus D.C.) with a median adults rate of <strong>23.0</strong> and a maximum of <strong>32.0</strong> in Colorado.</p>
<p class="art-p">Mountain and New England states dominate the leaders. The charts examine the breadth of the spread, the concentration among top performers, and the relationship between adult and male participation rates.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that establish the scale for this analysis:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">52</span><span class="fact-label">Jurisdictions in the dataset</span></div>
  <div class="fact-box"><span class="fact-number">23.0</span><span class="fact-label">Median adults rate</span></div>
  <div class="fact-box"><span class="fact-number">32.0</span><span class="fact-label">Highest observed adults rate</span></div>
  <div class="fact-box"><span class="fact-number">Colorado</span><span class="fact-label">Leading jurisdiction by adults rate</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-07-17 (week16_exercise.xlsx). After cleaning, 52 rows remain.</p>
<p class="art-p">Adults is the primary ranked metric; Men appears in the scatter. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="western-and-new-england-states-lead-adult-exercise" class="anchored">Western and New England States Lead Adult Exercise</h2>
<h3 id="western-and-new-england-states-lead-adult-exercise-look" class="anchored">Adults by State</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart1_breakdown.png" role="img" aria-label="Adults by State"></div>
</figure>
<p class="art-p">Colorado leads at <strong>32.0</strong>, followed by Idaho at <strong>31</strong>, New Hampshire and D.C. at <strong>30</strong>, and Massachusetts and Vermont at <strong>29</strong>. Utah and Washington round out the upper band at <strong>28</strong>.</p>
<p class="art-p">This cluster reflects shared attributes across these regions: outdoor access, income profiles, and age structures conducive to measured activity levels.</p>

<h2 id="the-top-dozen-sits-well-above-the-national-median" class="anchored">The Top Dozen Sits Well Above the National Median</h2>
<h3 id="the-top-dozen-sits-well-above-the-national-median-look" class="anchored">Colorado at 32.0 — median among top dozen is 28.5</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart2_leaders.png" role="img" aria-label="Colorado leads at 32.0 — 28.5 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Colorado remains first at <strong>32.0</strong>, while the median among the top dozen stands at <strong>28.5</strong>—5.5 points above the overall median of 23.0.</p>
<p class="art-p">This gap documents the core geographic pattern: high-exercise participation clusters in specific regions rather than distributing evenly across all 52 jurisdictions.</p>

<h2 id="most-states-cluster-near-the-low-20s" class="anchored">Most States Cluster Near the Low-20s</h2>
<h3 id="most-states-cluster-near-the-low-20s-look" class="anchored">Median 23.0 and mean 22.6 indicate a relatively symmetric distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart3_distribution.png" role="img" aria-label="Median 23.0 vs mean 22.6 — the shape is relatively symmetric"></div>
</figure>
<p class="art-p">The distribution's tallest bin centers near <strong>23.5</strong> with approximately <strong>15</strong> states, with smaller counts in both the mid-teens and the high-20s/30s. The mean (~22.6) sits close to the median, indicating a relatively symmetric distribution at the state level.</p>
<p class="art-p">Symmetry does not eliminate the elite tier: Colorado's 32 remains a clear outlier at the distribution's right edge.</p>

<h2 id="top-states-hold-a-disproportionate-share-of-the-aggregate" class="anchored">Top States Hold a Disproportionate Share of the Aggregate</h2>
<h3 id="top-states-hold-a-disproportionate-share-of-the-aggregate-look" class="anchored">The top five state entries account for 36% of the aggregate adults</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart4_pareto.png" role="img" aria-label="The top 5 state entries account for 36% of the aggregate adults"></div>
</figure>
<p class="art-p">The Pareto curve shows the top five jurisdictions accounting for approximately <strong>36%</strong> of the aggregate adults measure, with cumulative share approaching 100% by the fifteenth entry.</p>
<p class="art-p">In a 52-row dataset, concentration among top performers remains pronounced on aggregated metrics.</p>

<h2 id="adult-and-male-rates-move-in-the-same-direction" class="anchored">Adult and Male Rates Move in the Same Direction</h2>
<h3 id="adult-and-male-rates-move-in-the-same-direction-look" class="anchored">Adults vs Men</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart5_scatter.png" role="img" aria-label="Adults vs Men"></div>
</figure>
<p class="art-p">Adults versus Men across the 52 jurisdictions track together: states with higher adult participation rates also post higher male rates, with leaders reaching the low-to-mid 30s on the adults axis and the 30s–40s range on the men's axis.</p>
<p class="art-p">The relationship confirms the same state hierarchy across gender categories rather than reversing it.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Self-reported exercise measures vary by survey methodology and year. State averages mask within-state variation by urban/rural location and race. D.C. is included in the file but is not a state.</p>
<p class="art-p">The 2018 TidyTuesday snapshot does not represent current CDC data; use these rankings as structural for this extract only.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Adult exercise rates center at 23.0 across 52 jurisdictions, while Colorado reaches 32.0 and the top-dozen median stands at 28.5.</p>
<p class="art-p">Reference the Mountain West and New England cluster when explaining geographic patterns, and the ~36% top-five share when discussing concentration of activity.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Exercise USA</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-17/week16_exercise.xlsx" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-17/week16_exercise.xlsx</a></p>
</main>
</div>