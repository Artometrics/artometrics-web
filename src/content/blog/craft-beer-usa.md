---
title: How Bitter and Strong Is American Craft Beer?
slug: craft-beer-usa
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Brewery-level IBU and ABV data map bitterness and strength across U.S. craft
  producers.
heroImage: /images/content/articles/craft-beer-usa/hero.png
tags:
  - culture
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">American craft beer advertises itself with bitterness and strength — IBU and ABV on the tap list. The TidyTuesday beers extract used here holds <strong>2,410</strong> records with a median ABV of <strong>0.06</strong> (6%) and a high of <strong>0.13</strong> (13%) for Lee Hill Series Vol. 5 - Belgian Style Quadrupel Ale.</p>
<p class="art-p">Most craft beers in this file are not barrel-aged monsters. They cluster near session-to-standard strength, with a right tail of barleywines, quads, and imperial experiments.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,410</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">0.06</span><span class="fact-label">Median Abv</span></div>
  <div class="fact-box"><span class="fact-number">0.13</span><span class="fact-label">Highest observed Abv</span></div>
  <div class="fact-box"><span class="fact-number">Lee Hill Series Vol. 5 - Bel</span><span class="fact-label">Top Name by Abv</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-07-10 (week15_beers.xlsx). After cleaning, 2,410 rows remain.</p>
<p class="art-p">ABV is the primary ranked metric; IBU joins in the scatter. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="high-abv-outliers-are-named-experiments" class="anchored">High-ABV Outliers Are Named Experiments</h2>
<h3 id="high-abv-outliers-are-named-experiments-look" class="anchored">Abv by Name</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart1_breakdown.png" role="img" aria-label="Abv by Name"></div>
</figure>
<p class="art-p">Lee Hill Series Vol. 5 leads at <strong>0.128</strong> ABV, with London Balling at <strong>0.125</strong> and Csar at <strong>0.120</strong>. Other leaders — Lee Hill Vol. 4, 4Beans, Johan the Barleywine, Wizard Burial Ground, Hi-Res — sit near <strong>0.10</strong>.</p>
<p class="art-p">These titles advertise intensity. They are the marketing edge of craft, not the median pint.</p>

<h2 id="the-top-dozen-still-doubles-everyday-strength" class="anchored">The Top Dozen Still Doubles Everyday Strength</h2>
<h3 id="the-top-dozen-still-doubles-everyday-strength-look" class="anchored">Lee Hill Series Vol</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart2_leaders.png" role="img" aria-label="Lee Hill Series Vol"></div>
</figure>
<p class="art-p">The leaders remain capped by the 0.128 quad, with the rest of the top dozen occupying the 0.10–0.12 band — roughly double the 0.06 median.</p>
<p class="art-p">Cite 0.06 as what “typical craft ABV” means in this extract, and 0.10+ as the specialty high-gravity club.</p>

<h2 id="most-beers-pile-up-near-5-6-abv" class="anchored">Most Beers Pile Up Near 5–6% ABV</h2>
<h3 id="most-beers-pile-up-near-5-6-abv-look" class="anchored">Median 0.06 vs mean 0.06 — the shape is right-skewed</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart3_distribution.png" role="img" aria-label="Median 0.06 vs mean 0.06 — the shape is right-skewed"></div>
</figure>
<p class="art-p">The distribution’s tallest bins sit around roughly <strong>0.05–0.06</strong> ABV (hundreds of beers each), with counts falling as ABV climbs toward 0.09–0.10 and almost vanishing above 0.11.</p>
<p class="art-p">Right skew is real but thin: the famous 12–13% outliers are rare relative to the pale-ale middle.</p>

<h2 id="high-abv-names-concentrate-in-a-short-list" class="anchored">High-ABV Names Concentrate in a Short List</h2>
<h3 id="high-abv-names-concentrate-in-a-short-list-look" class="anchored">The top 5 name entries account for 37% of the aggregate abv</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart4_pareto.png" role="img" aria-label="The top 5 name entries account for 37% of the aggregate abv"></div>
</figure>
<p class="art-p">The Pareto view of leading high-ABV names shows the first five entries holding about <strong>37%</strong> of the plotted aggregate strength share, rising toward the full total by the fifteenth name.</p>
<p class="art-p">Extreme ABV is a boutique phenomenon inside the craft catalog — concentrated among a few loudly strong beers.</p>

<h2 id="bitterness-and-strength-rise-together-imperfectly" class="anchored">Bitterness and Strength Rise Together — Imperfectly</h2>
<h3 id="bitterness-and-strength-rise-together-imperfectly-look" class="anchored">Abv vs Ibu</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/craft-beer-usa/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/craft-beer-usa/charts/chart5_scatter.png" role="img" aria-label="Abv vs Ibu"></div>
</figure>
<p class="art-p">ABV versus IBU across roughly 1,400 plotted points shows many high-IBU IPAs in the 0.06–0.09 ABV band, with some of the bitterest beers exceeding 120 IBU. High ABV does not guarantee high IBU; stouts and quads can be strong without chasing hop extremes.</p>
<p class="art-p">The joint distribution is the craft-beer design space: hop-forward versus malt-forward paths to intensity.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">ABV and IBU fields can be missing or rounded. Style coverage depends on which breweries entered the scrape. “Craft” definitions and the 2018 vintage miss later hard-seltzer and nonalcoholic shifts.</p>
<p class="art-p">Name-level leaders may be one-off specialty releases, not flagship year-round beers.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">In 2,410 U.S. craft beers, median ABV is 0.06 while the ceiling reaches 0.128. Most of the catalog lives near everyday strength; the high-gravity tail is short and famous.</p>
<p class="art-p">Cite the ABV–IBU scatter when explaining style strategy: bitterness and alcohol are correlated tools, not a single dial.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Craft Beer USA</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-10/week15_beers.xlsx" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-10/week15_beers.xlsx</a></p>
</main>
</div>
