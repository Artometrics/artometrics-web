---
title: Which U.S. States Exercise the Most?
slug: exercise-usa
pubDate: 2026-06-15T00:00:00.000Z
description: State-level activity rates compare where Americans work out most.
heroImage: /images/content/articles/exercise-usa/hero.png
tags:
  - culture
draft: false
tldr: State-level activity rates compare where Americans work out most.
keyPoints:
  - 52 — Records in the working dataset
  - 23.0 — Median Adults
  - 32.0 — Highest observed Adults
  - Colorado — Top State by Adults
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Exercise is unevenly distributed across American states — a public-health map disguised as lifestyle branding. The TidyTuesday exercise extract used here holds <strong>52</strong> records (states plus D.C.) with a median of <strong>23.0</strong> on the adults metric and a high of <strong>32.0</strong> in Colorado.</p>
<p class="art-p">Mountain and New England states dominate the leaders. The charts ask how wide the spread is, how concentrated the top share is, and how adult rates relate to the men’s series in the file.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">52</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">23.0</span><span class="fact-label">Median Adults</span></div>
  <div class="fact-box"><span class="fact-number">32.0</span><span class="fact-label">Highest observed Adults</span></div>
  <div class="fact-box"><span class="fact-number">Colorado</span><span class="fact-label">Top State by Adults</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-07-17 (week16_exercise.xlsx). After cleaning, 52 rows remain.</p>
<p class="art-p">Adults is the primary ranked metric; Men appears in the scatter. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="western-and-new-england-states-lead-adult-exercise" class="anchored">Western and New England States Lead Adult Exercise</h2>
<h3 id="western-and-new-england-states-lead-adult-exercise-look" class="anchored">Adults by State</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart1_breakdown.png" role="img" aria-label="Adults by State"></div>
</figure>
<p class="art-p">Colorado leads at <strong>32.0</strong>, with Idaho at <strong>31</strong>, New Hampshire and the District of Columbia at <strong>30</strong>, and Massachusetts and Vermont at <strong>29</strong>. Utah and Washington continue the upper band at <strong>28</strong>.</p>
<p class="art-p">The leaders share outdoor access, income mixtures, and age structures that favor measured activity — not a single policy switch.</p>

<h2 id="the-top-dozen-sits-well-above-the-national-median" class="anchored">The Top Dozen Sits Well Above the National Median</h2>
<h3 id="the-top-dozen-sits-well-above-the-national-median-look" class="anchored">Colorado leads at 32.0 — 28.5 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart2_leaders.png" role="img" aria-label="Colorado leads at 32.0 — 28.5 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Colorado remains first at <strong>32.0</strong>, while the median among the top dozen is <strong>28.5</strong> — five and a half points above the overall median of 23.0.</p>
<p class="art-p">That gap is the map’s main political fact: “active America” is regional, not evenly sprinkled across all 52 rows.</p>

<h2 id="most-states-cluster-near-the-low-20s" class="anchored">Most States Cluster Near the Low-20s</h2>
<h3 id="most-states-cluster-near-the-low-20s-look" class="anchored">Median 23.0 vs mean 22.6 — the shape is relatively symmetric</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart3_distribution.png" role="img" aria-label="Median 23.0 vs mean 22.6 — the shape is relatively symmetric"></div>
</figure>
<p class="art-p">The distribution’s tallest bin centers near <strong>23.5</strong> with about <strong>15</strong> states, with smaller counts in both the teens and the high-20s/30s. Mean (~22.6) sits close to the median — a relatively symmetric shape for a state-level rate.</p>
<p class="art-p">Symmetry here still allows a meaningful elite: Colorado’s 32 is not a different planet, but it is a clear right-edge state.</p>

<h2 id="top-states-hold-a-disproportionate-share-of-the-aggregate" class="anchored">Top States Hold a Disproportionate Share of the Aggregate</h2>
<h3 id="top-states-hold-a-disproportionate-share-of-the-aggregate-look" class="anchored">The top 5 state entries account for 36% of the aggregate adults</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart4_pareto.png" role="img" aria-label="The top 5 state entries account for 36% of the aggregate adults"></div>
</figure>
<p class="art-p">The Pareto curve shows the top five state entries accounting for about <strong>36%</strong> of the aggregate adults metric in this ranking view, with the share climbing toward 100% by the fifteenth entry.</p>
<p class="art-p">Even in a 52-row file, the most active states carry a sizable slice of the summed activity measure.</p>

<h2 id="adult-and-male-rates-move-in-the-same-direction" class="anchored">Adult and Male Rates Move in the Same Direction</h2>
<h3 id="adult-and-male-rates-move-in-the-same-direction-look" class="anchored">Adults vs Men</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/exercise-usa/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/exercise-usa/charts/chart5_scatter.png" role="img" aria-label="Adults vs Men"></div>
</figure>
<p class="art-p">Adults versus Men across 52 rows tracks upward: states with higher adult figures also tend to post higher men’s figures, with leaders reaching the low-to-mid 30s on the adult axis and into the 30s–40s on the men’s axis in this extract.</p>
<p class="art-p">The scatter’s simplicity is useful: gender-specific series confirm the same state hierarchy rather than rewriting it.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Self-reported exercise measures vary by survey wording and year. State averages hide urban/rural and racial gaps inside borders. D.C. is not a state but sits in the file.</p>
<p class="art-p">The 2018 TidyTuesday snapshot is not a live CDC dashboard; treat rankings as structural for this extract.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Across 52 jurisdictions, adult exercise centers at 23.0 while Colorado reaches 32.0 and the top-dozen median hits 28.5.</p>
<p class="art-p">Cite the regional leader cluster (Mountain West + New England) when explaining the map, and the ~36% top-five share when explaining concentration.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Exercise USA</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-17/week16_exercise.xlsx" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-17/week16_exercise.xlsx</a></p>
</main>
</div>
