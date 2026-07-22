---
title: Which Broadway Musicals Ran Longest and Grossed Most?
slug: broadway-musicals
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Performance and box-office records map the shows that dominated by longevity
  and revenue.
heroImage: /images/content/articles/broadway-musicals/hero.png
tags:
  - culture
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Broadway is a price and endurance market: average ticket price on one axis, performances on the other. The TidyTuesday grosses extract used here holds <strong>47,524</strong> rows with a median average ticket price of <strong>$60.2</strong> and a recorded high of <strong>$512</strong>. Springsteen On Broadway tops the show-level price ranking; Broadhurst Theatre is the most common theatre label in the file.</p>
<p class="art-p">Those two facts already sketch the industry’s split: long-running musical houses with mid-range medians, and event residencies that reset what “a Broadway ticket” can mean.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">47,524</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">60.2</span><span class="fact-label">Median Avg ticket price</span></div>
  <div class="fact-box"><span class="fact-number">512</span><span class="fact-label">Highest observed Avg ticket price</span></div>
  <div class="fact-box"><span class="fact-number">Springsteen On Broadway</span><span class="fact-label">Top Show by Avg ticket price</span></div>
  <div class="fact-box"><span class="fact-number">Broadhurst Theatre</span><span class="fact-label">Most common Theatre</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2020-04-28 (grosses.csv). After cleaning, 47,524 records remain for charting.</p>
<p class="art-p">Average ticket price is the primary metric; theatre and show fields provide the grouping. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="concert-residencies-rewrite-the-price-ceiling" class="anchored">Concert Residencies Rewrite the Price Ceiling</h2>
<h3 id="concert-residencies-rewrite-the-price-ceiling-look" class="anchored">Avg ticket price by Show</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart1_breakdown.png" role="img" aria-label="Avg ticket price by Show"></div>
</figure>
<p class="art-p">Springsteen On Broadway leads at about <strong>$508.63</strong> average ticket price — nearly double Hamilton’s roughly <strong>$273</strong>. Dave Chappelle Live, Moulin Rouge!, Mel Brooks on Broadway, Morrissey, and David Byrne’s American Utopia fill the premium band above about <strong>$175</strong>.</p>
<p class="art-p">The ranking is not a pure musicals list. It is a Broadway pricing list, and concert-style residencies occupy the summit.</p>

<h2 id="even-among-leaders-springsteen-is-an-outlier" class="anchored">Even Among Leaders, Springsteen Is an Outlier</h2>
<h3 id="even-among-leaders-springsteen-is-an-outlier-look" class="anchored">Springsteen On Broadway leads at 509 — 182 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart2_leaders.png" role="img" aria-label="Springsteen On Broadway leads at 509 — 182 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Springsteen On Broadway still leads near <strong>$509</strong>, while the median among the top dozen is about <strong>$182</strong>. Hamilton is extraordinary relative to the industry median of $60.2 — and still nowhere near the Springsteen residency ceiling.</p>
<p class="art-p">Cite $182 as the “expensive Broadway” club median; cite $509 when the question is about the absolute event-ticket frontier.</p>

<h2 id="house-medians-cluster-near-the-industry-middle" class="anchored">House Medians Cluster Near the Industry Middle</h2>
<h3 id="house-medians-cluster-near-the-industry-middle-look" class="anchored">Avg ticket price by Theatre</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart3_distribution.png" role="img" aria-label="Avg ticket price by Theatre"></div>
</figure>
<p class="art-p">Broadhurst Theatre (n=1,829) shows a median average ticket near <strong>$77</strong>; Minskoff near <strong>$77</strong>; Majestic near <strong>$60</strong>; Ambassador near <strong>$66</strong>; Imperial nearer <strong>$48</strong>. Maxima inside those houses still spike well above $100 when hit shows land.</p>
<p class="art-p">Theatre identity matters, but show identity matters more. The same building can host a $50 median season and a $200 event week.</p>

<h2 id="gershwin-leads-the-gap-above-the-median" class="anchored">Gershwin Leads the Gap Above the Median</h2>
<h3 id="gershwin-leads-the-gap-above-the-median-look" class="anchored">Avg ticket price vs median by Theatre</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart4_gap.png" role="img" aria-label="Avg ticket price vs median by Theatre"></div>
</figure>
<p class="art-p">Relative to the overall average-ticket median, Gershwin Theatre leads the gap chart at about <strong>+$27.67</strong>, with Broadhurst and Minskoff also clearly positive. Imperial sits below the median by roughly <strong>$12</strong> in this view.</p>
<p class="art-p">House premiums track programming mix: theaters that host mega-hits and premium brands pull above the $60.2 baseline.</p>

<h2 id="price-and-performance-counts-are-weakly-coupled" class="anchored">Price and Performance Counts Are Weakly Coupled</h2>
<h3 id="price-and-performance-counts-are-weakly-coupled-look" class="anchored">Avg ticket price vs Performances</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/broadway-musicals/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/broadway-musicals/charts/chart5_scatter.png" role="img" aria-label="Avg ticket price vs Performances"></div>
</figure>
<p class="art-p">Average ticket price versus performances shows many low-price, low-performance weeks and occasional high-price short runs. Long legs at moderate prices remain the musical’s classic engine.</p>
<p class="art-p">The scatter refuses a simple story that expensive tickets always mean short runs, or that longevity always means discounting. Broadway monetizes both scarcity and stamina — on different shows.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Grosses data can include atypical weeks, previews, and dark periods coded as zeros. Average ticket price is not the same as face value for every seat. Concert residencies mix genres inside a “Broadway” file.</p>
<p class="art-p">The snapshot timing (through the 2020 release window) predates later reopenings and dynamic pricing expansions.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Broadway’s typical average ticket in this extract sits near $60, while event residencies push past $500. The top-dozen median near $182 defines the premium club without equating it to the Springsteen outlier.</p>
<p class="art-p">Cite house medians when comparing venues; cite show leaders when comparing brands. They answer different questions about the same street.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2020). <em>TidyTuesday: Broadway Musicals</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-04-28/grosses.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-04-28/grosses.csv</a></p>
</main>
</div>
