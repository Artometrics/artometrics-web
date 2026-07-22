---
title: 'How UNESCO Sites Grew Across Scandinavia, 2004–2022'
slug: world-heritage-sites
pubDate: 2026-06-15T00:00:00.000Z
description: UNESCO heritage counts track how Scandinavian inventories expanded.
heroImage: /images/content/articles/world-heritage-sites/hero.png
tags:
  - galleries
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">UNESCO World Heritage counts turn national prestige into a time series. This Scandinavian extract holds 6 records spanning 2004–2022, with a median value of 9.00 and a high of 15.0. Sweden leads the fact-box country ranking.</p>
<p class="art-p">Six rows are enough for a clean comparative story when the table is country-by-year counts: who led, who grew fastest, and how the median moved from 5.00 to 10.0 across the window. The calibration point is 9.00 — the center of this small but sharp heritage ledger.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">6</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">9.00</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">15.0</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">Sweden</span><span class="fact-label">Top Country by Value</span></div>
  <div class="fact-box"><span class="fact-number">2004–2022</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2024-02-06 (R for Data Science community). The working file contains 6 rows and 3 columns after merging available tables in the week folder. Value is the site-count metric; country is the entity axis; year compares 2004 with 2022.</p>
<p class="art-p">With only six rows, every chart is close to the raw table. Medians still summarize the center; growth percentages normalize different starting points. Index-style fields are excluded from metric selection.</p>

<h2 id="median-heritage-counts-doubled-at-the-center" class="anchored">Median heritage counts doubled at the center</h2>
<h3 id="median-heritage-counts-doubled-at-the-center-look" class="anchored">Median Value Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart1_trend.png" role="img" aria-label="Median Value Over Time"></div>
</figure>
<p class="art-p">Median value rises from 5.00 in the opening period to 10.0 at the close. In this extract, the center of the Scandinavian heritage-count distribution moved upward across 2004–2022.</p>
<p class="art-p">A rising median in a six-row file is still a real trend — it is simply a trend you can nearly audit by eye against the country panels.</p>

<h2 id="sweden-leads-the-country-ladder" class="anchored">Sweden leads the country ladder</h2>
<h3 id="sweden-leads-the-country-ladder-look" class="anchored">Sweden leads at 14.0 — 7.00 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart2_leaders.png" role="img" aria-label="Sweden leads at 14.0 — 7.00 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Sweden leads at 14.0, while 7.00 marks the median among the top dozen in this cut — here, effectively the small peer set of Scandinavian countries in the file. Sweden is both the fact-box top country and the charted leader.</p>
<p class="art-p">Leadership on level is not the same as leadership on growth. The later charts separate stock from flow.</p>

<h2 id="leaders-diverge-when-tracked-over-time" class="anchored">Leaders diverge when tracked over time</h2>
<h3 id="leaders-diverge-when-tracked-over-time-look" class="anchored">Top Country Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart4_leader_trends.png" role="img" aria-label="Top Country Over Time"></div>
</figure>
<p class="art-p">Leader trends show that leading names do not move in lockstep — some fade as others surge. Tracking value over time separates sustained dominance from one-off jumps.</p>
<p class="art-p">In a short panel, trajectory is the whole game: who added sites between the two observed years, and who merely started ahead.</p>

<h2 id="2004-versus-2022-makes-the-gains-visible-side-by-side" class="anchored">2004 versus 2022 makes the gains visible side by side</h2>
<h3 id="2004-versus-2022-makes-the-gains-visible-side-by-side-look" class="anchored">Value by year and Country</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart3_grouped_year.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart3_grouped_year.png" role="img" aria-label="Value by year and Country"></div>
</figure>
<p class="art-p">Grouped bars expose who gained between 2004 and 2022 — not just the latest leaderboard. Small panels reward side-by-side reading; totals alone hide per-country momentum.</p>
<p class="art-p">The year compare is the clearest view of absolute change before converting those changes into percentages.</p>

<h2 id="denmark-posted-the-largest-percentage-gain" class="anchored">Denmark posted the largest percentage gain</h2>
<h3 id="denmark-posted-the-largest-percentage-gain-look" class="anchored">Value growth by Country</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/world-heritage-sites/charts/chart4_growth.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/world-heritage-sites/charts/chart4_growth.png" role="img" aria-label="Value growth by Country"></div>
</figure>
<p class="art-p">Denmark posted the largest gain (150%) from 2004 to 2022. Percent-change bars normalize different starting points — essential when baselines differ across Sweden, Norway, and Denmark.</p>
<p class="art-p">Sweden can lead on level while Denmark leads on growth. Both facts are in the file; they answer different heritage-expansion questions.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not the live UNESCO World Heritage List API. This extract is a six-row Scandinavian panel for 2004 and 2022, not a global inventory of every site.</p>
<p class="art-p">Findings describe this world-heritage extract — structural signals about country counts and growth — not a qualitative ranking of sites’ cultural importance.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Scandinavian UNESCO counts in this file rise at the median from 5.00 to 10.0, with Sweden leading on level at 14.0 and Denmark leading on growth at 150% from 2004 to 2022.</p>
<p class="art-p">Level and growth are different trophies. The year-compare and growth charts keep them separate so prestige stock is not mistaken for expansion speed.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2024). <em>TidyTuesday: World Heritage Sites</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-02-06/heritage.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2024/2024-02-06" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
