---
title: "BIG MAC INDEX: The Artometrics of Purchasing Power"
slug: big-mac-index
pubDate: 2026-06-15
description: "A Big Mac costs $8.31 in Switzerland and under $2 in parts of Asia. Twenty years of price data reveal how currency, wages, and exchange rates shape the cost of a burger — and a lot more."
heroImage: /images/content/articles/big-mac-index/hero.png
tags: [power, atlas]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-trend" id="toc-chart-1-trend">CHART 1 — GLOBAL PRICE TREND</a></li>
  <li><a href="#chart-2-leaders" id="toc-chart-2-leaders">CHART 2 — MOST EXPENSIVE COUNTRIES</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — HOW PRICES SPREAD</a></li>
  <li><a href="#chart-4-leader-trends" id="toc-chart-4-leader-trends">CHART 4 — TRACKING THE LEADERS</a></li>
  <li><a href="#chart-5-relationship" id="toc-chart-5-relationship">CHART 5 — LOCAL VS DOLLAR PRICE</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">A Big Mac is the same product everywhere on Earth — same bun, same patties, same sauce. That sameness is exactly what makes its price interesting. <em>The Economist</em>'s Big Mac Index, running since 1986, converts local burger prices into US dollars to reveal how far currencies stray from purchasing power parity. This report works from 1,386 observations spanning 2000 to 2020 — two decades of burgers, exchange rates, and economic turbulence.</p>
<p class="art-p">The gap between the cheapest and most expensive burger in any given year is not noise. It maps onto wage structures, agricultural subsidy regimes, tax policies, and the raw purchasing power of local currencies. Switzerland's $8+ burger is not merely expensive — it encodes one of the highest minimum wages on the planet. A $1.50 burger in parts of Southeast Asia tells a symmetrically different story.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">$3.04</span><span class="fact-label">Median dollar price across all countries and years</span></div>
  <div class="fact-box"><span class="fact-number">$8.31</span><span class="fact-label">Peak price — Switzerland at its most expensive</span></div>
  <div class="fact-box"><span class="fact-number">83%</span><span class="fact-label">Price increase from 2000 to 2020 at the global median</span></div>
  <div class="fact-box"><span class="fact-number">Norway</span><span class="fact-label">Highest average dollar price over the full 20-year span</span></div>
  <div class="fact-box"><span class="fact-number">20 yrs</span><span class="fact-label">Timespan: 2000 through 2020</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>Purchasing power parity (PPP) theory says exchange rates should eventually converge so that identical goods cost the same everywhere. In practice, they rarely do — tariffs, non-tradeable costs (rent, labor), and monetary policy all interfere. The Big Mac Index sidesteps complex econometric models: if a burger costs less in local currency terms than the dollar price implies, that country's currency is likely undervalued. If it costs more, it may be overvalued.</p>
<p>The index is deliberately blunt. It is better at identifying structural divergence — Switzerland has been "overvalued" for twenty straight years — than at predicting short-run FX moves. What it reliably captures is the cost of living encoded in a single standardized product.</p>
<h2 id="chart-1-trend" class="anchored">CHART 1 — GLOBAL PRICE TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/big-mac-index/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/big-mac-index/charts/chart1_trend.png" role="img" aria-label="Global median Big Mac dollar price, 2000–2020"></div>
</figure>
<p class="art-p">The median dollar price nearly doubles over two decades, climbing from <strong>$1.91</strong> in 2000 to <strong>$3.50</strong> by 2020. The trajectory is not linear: prices stall between 2012 and 2015 as a strong US dollar compresses the dollar-equivalent values recorded in emerging markets. The post-2015 recovery reflects both local price inflation and a weakening dollar.</p>
<p class="art-p">Using the median — rather than the mean — keeps Switzerland, Norway, and the other extreme outliers from inflating the global story. The median tells you what a typical country pays; the mean tells you what the expensive outliers can afford.</p>
<h2 id="chart-2-leaders" class="anchored">CHART 2 — MOST EXPENSIVE COUNTRIES</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/big-mac-index/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/big-mac-index/charts/chart2_leaders.png" role="img" aria-label="Top 12 countries by average Big Mac dollar price"></div>
</figure>
<p class="art-p"><strong>Switzerland</strong> leads at <strong>$6.54</strong> — nearly twice the global median. The cluster of Scandinavian and Gulf states immediately below reflects the high-wage, high-cost-of-living profile shared by those economies. The United States (<strong>$4.20</strong> average) sits mid-table in this elite group — expensive by global standards, but not extraordinary within the developed world.</p>
<p class="art-p">The gap between Switzerland ($6.54) and the twelfth-ranked country (~$3.90) is larger than the gap between that twelfth country and the global median. The top of the distribution is genuinely thin air.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — HOW PRICES SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/big-mac-index/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/big-mac-index/charts/chart3_distribution.png" role="img" aria-label="Distribution of Big Mac dollar prices across all country-year observations"></div>
</figure>
<p class="art-p">The distribution is right-skewed: most observations cluster between <strong>$2</strong> and <strong>$4</strong>, while a long right tail captures wealthy nations with consistently elevated prices. Median ($3.04) sits below the mean ($3.26) precisely because that tail pulls the average upward.</p>
<p class="art-p">The top decile begins at approximately <strong>$4.91</strong>. What the histogram makes visible is that "expensive" is a select club — roughly 10% of all observations — not a gradual continuum. The bottom 50% of the world pays between $1.50 and $3.04 for the same burger.</p>
<h2 id="chart-4-leader-trends" class="anchored">CHART 4 — TRACKING THE LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/big-mac-index/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/big-mac-index/charts/chart4_leader_trends.png" role="img" aria-label="Price trajectories for the top-ranked countries over time"></div>
</figure>
<p class="art-p">The leading countries do not rise in unison. Switzerland and Norway track closely — both Nordic/Alpine high-wage economies — but diverge after 2014 as oil revenues shift Norway's purchasing profile. The Euro-area countries show a visible dip around 2015, a direct consequence of the dollar strengthening and the euro weakening following the European debt crisis.</p>
<p class="art-p">This chart is the most powerful in the set: it shows that the "expensive burger" club has relatively stable membership but volatile rankings within it. Sustained dominance requires sustained structural advantage — not just a momentary currency surge.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — LOCAL VS DOLLAR PRICE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/big-mac-index/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/big-mac-index/charts/chart5_scatter.png" role="img" aria-label="Local currency price vs US dollar price — scatter plot"></div>
</figure>
<p class="art-p">The scatter plot reveals the exchange-rate distortion directly. Points far above the diagonal line are countries where the local currency is undervalued relative to the dollar — the burger feels cheap in dollar terms even if it is not cheap locally. Points near the diagonal are close to purchasing power parity.</p>
<p class="art-p">Clusters along the x-axis (low dollar price, high local price) are typically emerging-market economies with weak currencies. The relationship is not random: it reflects the structural gap between what money buys locally versus what it exchanges for globally.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>The Big Mac Index is deliberately simple — and that simplicity is also its main limitation. McDonald's does not charge a uniform markup in every market: local franchise agreements, competition, and brand positioning all affect local pricing independently of purchasing power. Coverage is also uneven: the dataset includes roughly 55 countries and misses most of sub-Saharan Africa, Central Asia, and parts of South America where McDonald's has limited or no presence.</p>
<p>The TidyTuesday snapshot covers 2000–2020 and does not include the post-pandemic inflation surge (2021–2024) that would substantially reshape the distribution. Treat these findings as a structural portrait of two decades, not a live economic dashboard.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Twenty years of Big Mac prices describe two parallel stories: a slow, structural rise in global living costs, and a persistent, steep hierarchy between wealthy and developing economies. The median burger price nearly doubles; the gap between Switzerland and the median barely narrows.</p>
<p>The index's elegance is that it collapses complex macroeconomics into a single comparable number. Its limitation is the same thing. What it measures unambiguously is concentration — at the top of the distribution, a small cluster of high-wage economies occupy territory that the rest of the world cannot easily reach. That is not just a fact about burgers.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2020). <em>TidyTuesday: Big Mac Index</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-12-22/big-mac.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-12-22/big-mac.csv</a></p>
<p>The Economist. (2020). <em>The Big Mac Index</em>. <a href="https://www.economist.com/big-mac-index" target="_blank" rel="noopener noreferrer">economist.com/big-mac-index</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p>This report is part of the Artometrics TidyTuesday series. All charts are interactive (hover for values) with static PNG fallbacks. Source data is publicly available and reproducible from the GitHub link below.</p><p><em>Dollar prices reflect the raw local price converted at the prevailing exchange rate — not adjusted for inflation or PPP. All medians computed on the full annual sample for each year.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2020/2020-12-22" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
