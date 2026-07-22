---
title: Who Drinks the Most Alcohol Per Capita?
slug: alcohol-consumption
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Country-level consumption data map which nations drink the most per person—and
  how that has shifted.
heroImage: /images/content/articles/alcohol-consumption/hero.png
tags:
  - culture
draft: false
tldr: >-
  Country-level consumption data map which nations drink the most per person—and
  how that has shifted.
keyPoints:
  - 193 — Records in the working dataset
  - 76.0 — Median Beer servings
  - 376 — Highest observed Beer servings
  - Namibia — Top Country by Beer servings
faq:
  - question: What does “Beer Consumption Has a Steep Country Ladder” show?
    answer: 193 — Records in the working dataset
  - question: What does “The Top Dozen Has Its Own Median” show?
    answer: 76.0 — Median Beer servings
  - question: What does “Most Countries Cluster Far Below the Peaks” show?
    answer: 376 — Highest observed Beer servings
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Global alcohol data is often collapsed into a single “drinks per person” headline. The TidyTuesday global alcohol extract keeps the beverage split intact — beer, spirits, and wine servings — across <strong>193</strong> country-level records. Beer is the metric that leads these charts, with a median of <strong>76.0</strong> servings and a recorded high of <strong>376</strong> in Namibia.</p>
<p class="art-p">That spread is the story. A median of 76 and a maximum of 376 means the top of the beer distribution is not a gentle tail; it is a different consumption regime. Country rankings on beer alone will not match rankings on spirits, and the scatter at the end makes that explicit.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">193</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">76.0</span><span class="fact-label">Median Beer servings</span></div>
  <div class="fact-box"><span class="fact-number">376</span><span class="fact-label">Highest observed Beer servings</span></div>
  <div class="fact-box"><span class="fact-number">Namibia</span><span class="fact-label">Top Country by Beer servings</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-06-26 (week13_alcohol_global.csv), maintained by the R for Data Science community. The working file used here contains 193 rows after cleaning.</p>
<p class="art-p">Beer servings are the primary ranked metric in the chart stack. Medians are used where distributions skew. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="beer-consumption-has-a-steep-country-ladder" class="anchored">Beer Consumption Has a Steep Country Ladder</h2>
<h3 id="beer-consumption-has-a-steep-country-ladder-look" class="anchored">Beer servings by Country</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart1_breakdown.png" role="img" aria-label="Beer servings by Country"></div>
</figure>
<p class="art-p">Namibia leads the beer ranking at <strong>376</strong> servings, followed by the Czech Republic at <strong>361</strong>, Gabon at <strong>347</strong>, and Germany at <strong>346</strong>. Lithuania and Poland tie near <strong>343</strong>. Ireland sits lower in the top dozen at <strong>313</strong>.</p>
<p class="art-p">These are not clustered scores around the global median of 76. The leaders occupy roughly four to five times the typical country’s beer volume in this file — a reminder that beer culture is geographically concentrated, not evenly shared.</p>

<h2 id="the-top-dozen-has-its-own-median" class="anchored">The Top Dozen Has Its Own Median</h2>
<h3 id="the-top-dozen-has-its-own-median-look" class="anchored">Namibia leads at 376 — 338 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart2_leaders.png" role="img" aria-label="Namibia leads at 376 — 338 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Among the top twelve beer countries, Namibia’s <strong>376</strong> still leads, while the median of that elite group is <strong>338</strong>. Even inside the high-beer club, the distribution has a ceiling that most of the world never approaches.</p>
<p class="art-p">Reading only the global median would hide that club entirely. Reading only Namibia would hide how many Central European and other high-beer countries sit just behind it.</p>

<h2 id="most-countries-cluster-far-below-the-peaks" class="anchored">Most Countries Cluster Far Below the Peaks</h2>
<h3 id="most-countries-cluster-far-below-the-peaks-look" class="anchored">Beer servings Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart3_distribution.png" role="img" aria-label="Beer servings Distribution"></div>
</figure>
<p class="art-p">The distribution chart piles most countries into lower beer-serving bins. Counts peak in the low double-digit and mid-range bins, while the extreme high bins that hold Namibia and the Czech Republic contain only a handful of countries.</p>
<p class="art-p">That shape is why the median (76.0) is the right headline number: it describes the typical country, not the viral maximum.</p>

<h2 id="concentration-rises-quickly-among-the-leaders" class="anchored">Concentration Rises Quickly Among the Leaders</h2>
<h3 id="concentration-rises-quickly-among-the-leaders-look" class="anchored">Cumulative Beer servings</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart4_pareto.png" role="img" aria-label="Cumulative Beer servings"></div>
</figure>
<p class="art-p">The Pareto curve shows how cumulative beer servings accumulate as countries are added from the top. The first five entries already account for about <strong>37%</strong> of the aggregate among the plotted leaders; by fifteen entries the curve reaches 100% of that restricted total.</p>
<p class="art-p">Beer volume at the top is not democratic. A short list of countries carries a disproportionate share of the servings represented in this ranking view.</p>

<h2 id="beer-and-spirits-are-not-the-same-map" class="anchored">Beer and Spirits Are Not the Same Map</h2>
<h3 id="beer-and-spirits-are-not-the-same-map-look" class="anchored">Beer servings vs Spirit servings</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/alcohol-consumption/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/alcohol-consumption/charts/chart5_scatter.png" role="img" aria-label="Beer servings vs Spirit servings"></div>
</figure>
<p class="art-p">Plotting beer servings against spirit servings across all 193 countries breaks the assumption that “heavy drinking” is one behavior. Some countries post high beer with moderate spirits; others invert the pattern.</p>
<p class="art-p">The joint distribution is the corrective lens: beverage preference is cultural and economic, not a single alcohol intensity score. Namibia’s beer lead does not automatically imply a spirits lead.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Country-level serving estimates inherit survey, sales, and tourism distortions. Unrecorded alcohol, home production, and cross-border purchases can bias official figures. The 2018 TidyTuesday snapshot is not a live WHO dashboard.</p>
<p class="art-p">Rankings on beer servings alone should not be quoted as total alcohol harm rankings. Spirits and wine columns exist precisely because the beverage mix differs.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Beer consumption in this extract is a steep hierarchy: Namibia at 376 servings against a world median of 76. The top dozen forms its own high plateau around a median of 338.</p>
<p class="art-p">The lasting insight is comparative: beer leaders and spirits leaders are not the same set of countries, and any serious alcohol map has to keep those axes separate.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Alcohol Consumption</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-26/week13_alcohol_global.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-26/week13_alcohol_global.csv</a></p>
</main>
</div>
