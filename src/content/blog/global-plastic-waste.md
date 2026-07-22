---
title: Who Generates the Most Plastic Waste—and Who Mismanages It?
slug: global-plastic-waste
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Country-level plastic generation and mismanagement rates show where leakage
  concentrates.
heroImage: /images/content/articles/global-plastic-waste/hero.png
tags:
  - business
draft: false
tldr: >-
  Country-level plastic generation and mismanagement rates show where leakage
  concentrates.
keyPoints:
  - '22,204 — Records in the working dataset'
  - '8,447 — Median GDP per capita, PPP (constant 2011 international $) (Rate)'
  - >-
    135,319 — Highest observed GDP per capita, PPP (constant 2011 international
    $) (Rate)
  - >-
    Macao — Top Entity by GDP per capita, PPP (constant 2011 international $)
    (Rate)
  - 1700–2017 — Year span covered in the file
faq:
  - question: What does “How prosperity moved over time” show?
    answer: >-
      Key figure: 22,204 — Records in the working dataset. See the charts and
      sources in the report for the full evidence.
  - question: What does “Who sits at the top of income” show?
    answer: >-
      Key figure: 8,447 — Median GDP per capita, PPP (constant 2011
      international $) (Rate). See the charts and sources in the report for the
      full evidence.
  - question: What does “How income is spread” show?
    answer: >-
      Key figure: 135,319 — Highest observed GDP per capita, PPP (constant 2011
      international $) (Rate). See the charts and sources in the report for the
      full evidence.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Plastic waste is usually discussed as a moral story about litter. The data make it an economic geography story: who generates waste, who mismanages it, and how those patterns sit against income.</p>
<p class="art-p">A TidyTuesday compilation spanning country-year records puts <strong>22,204</strong> rows on the table. Median GDP per capita in the working file is <strong>8,447</strong> (PPP, constant 2011 international dollars). The highest observed rate reaches <strong>135,319</strong>, with Macao at the top of that income ranking. The year span runs from <strong>1700</strong> to <strong>2017</strong> — long enough to watch modern prosperity and modern waste arrive together.</p>
<p class="art-p">Income alone does not settle the mismanagement question. Rich places can fund collection systems; poorer coastal places can become leakage hotspots even at lower per-person generation. The charts below separate those layers.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">22,204</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8,447</span><span class="fact-label">Median GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">135,319</span><span class="fact-label">Highest observed GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">Macao</span><span class="fact-label">Top Entity by GDP per capita, PPP (constant 2011 international $) (Rate)</span></div>
  <div class="fact-box"><span class="fact-number">1700–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-05-21 (R for Data Science community). The working file contains 22,204 rows and 7 columns after assembling the week's tables — including GDP per capita (PPP) and per-capita mismanaged plastic waste in kilograms per person per day.</p>
<p class="art-p">Medians are used where distributions skew. Charts export as Plotly JSON with PNG fallbacks. Country names, missing years, and sparse early coverage mean the long historical span is denser for income than for waste metrics; read early centuries as context for prosperity, not as a continuous waste census.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How prosperity moved over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median GDP per capita, PPP (constant 2011 international $) (Rate) Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart1_trend.png" role="img" aria-label="Median GDP per capita, PPP (constant 2011 international $) (Rate) Over Time"></div>
</figure>
<p class="art-p">Median GDP per capita rises from roughly <strong>5,891</strong> in the opening period of the series to about <strong>12,592</strong> at the close. That climb is the backdrop for plastic: mass polymers are a late-twentieth-century material living inside an income distribution that was already diverging for centuries.</p>
<p class="art-p">The time chart is not a plastic-generation curve by itself. It is the economic stage on which generation and mismanagement later play out — and it reminds readers that global medians hide enormous cross-country gaps in the same year.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top of income</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Qatar leads at 118,396 — 67,799 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart2_leaders.png" role="img" aria-label="Qatar leads at 118,396 — 67,799 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Among the highest GDP-per-capita observations, <strong>Qatar</strong> leads near <strong>118,396</strong>. The median among the top dozen sits around <strong>67,799</strong> — still many times the file-wide median of 8,447. Macao, Singapore, Switzerland, and other high-income city-states and petro-economies fill the same thin upper band.</p>
<p class="art-p">These leaders matter for plastic debates because high income correlates with high consumption — but not automatically with high mismanagement. Collection infrastructure can rise with prosperity even as packaging intensity rises with it.</p>
<h2 id="how-the-field-is-spread" class="anchored">How income is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">GDP per capita, PPP (constant 2011 international $) (Rate) Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart3_distribution.png" role="img" aria-label="GDP per capita, PPP (constant 2011 international $) (Rate) Distribution"></div>
</figure>
<p class="art-p">The distribution is right-skewed: median <strong>8,447</strong> versus mean <strong>14,926</strong>. The top decile begins near <strong>37,969</strong>. That tail is where defining high-income cases live — and where mean-based storytelling will overstate how typical prosperity feels.</p>
<p class="art-p">Most country-year observations sit far below the headline petro-state and city-state peaks. Any claim about the world and plastic that starts from the mean income will describe a richer planet than the median resident actually inhabits.</p>
<h2 id="leader-trends" class="anchored">Leader trends</h2>
<h3 id="leader-trends-look" class="anchored">Top Entity Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart4_leader_trends.png" role="img" aria-label="Top Entity Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep. Some high-income series fade as others surge; oil-price cycles and small-population city economies can reshuffle the top of a PPP ranking without changing the deeper structure of global waste.</p>
<p class="art-p">Tracking leaders over time separates sustained dominance from one-off spikes. For plastic policy, sustained high-income systems with strong waste services are a different object than briefly elevated GDP readings in small jurisdictions.</p>
<h2 id="what-moves-together" class="anchored">Income versus mismanaged plastic</h2>
<h3 id="what-moves-together-look" class="anchored">GDP per capita, PPP (constant 2011 international $) (Rate) vs Per capita mismanaged plastic waste (kilograms per person per day)</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-plastic-waste/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-plastic-waste/charts/chart5_scatter.png" role="img" aria-label="GDP per capita, PPP (constant 2011 international $) (Rate) vs Per capita mismanaged plastic waste (kilograms per person per day)"></div>
</figure>
<p class="art-p">Plotting GDP per capita against per-capita mismanaged plastic waste shows clusters that averages erase. Some rich economies sit low on mismanagement — consumption with collection. Some lower-income coastal economies sit high on mismanagement even when generation per person is modest.</p>
<p class="art-p">That scatter is the core policy map. Generation without management becomes ocean-bound leakage; management without reduced generation becomes an expensive success. The file cannot settle every causal claim, but it can stop the false equation that wealth alone explains visible plastic pollution.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Early historical GDP rows are not paired with modern waste instrumentation.</p>
<p class="art-p">Mismanaged waste estimates depend on modeling assumptions about litter, dumping, and collection coverage. Treat the relationship charts as structural signals about income and leakage risk — not as a courtroom inventory of every country's shoreline.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Plastic waste sits at the intersection of prosperity and infrastructure. Median incomes in the file roughly double over the long span, while mismanagement risk remains geographically uneven.</p>
<p class="art-p">The citable lesson is modest and sharp: high GDP per capita identifies capacity, not automatic cleanliness, and low GDP per capita identifies constraint, not automatic innocence. The scatter of income against mismanagement is where those two truths become visible at once.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
