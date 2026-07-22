---
title: Which Steam Games Earned the Most Playtime Per Dollar?
slug: video-games-steam
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Ownership and play data identify titles that delivered the most hours relative
  to price.
heroImage: /images/content/articles/video-games-steam/hero.png
tags:
  - games
draft: false
tldr: >-
  Steam Spy-era metadata turns the storefront into a scored catalog. This file
  holds 26,688 games spanning 2004–2018, with a median Metascore of 73.0 and a
  high of 98.0. DEEP SPACE WAIFU: NEKOMIMI appears in the fact-box extremes; the
  0 .. 20,000 owners band is the most common ownership bucket.
keyPoints:
  - '26,688 — Records in the working dataset'
  - 73.0 — Median Metascore
  - 98.0 — Highest observed Metascore
  - 'DEEP SPACE WAIFU: NEKOMIMI — Top Game by Metascore'
  - 2004–2018 — Year span covered in the file
  - "0\_..\_20,000 — Most common Owners"
faq:
  - question: >-
      What does the data show about Median Metascore edged up across the store’s
      expansion years?
    answer: >-
      Key figure: 26,688 — Records in the working dataset. The source is the
      TidyTuesday release from 2019-07-30 (R for Data Science community). The
      working file contains 26,688 rows and 11 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Little Triangle tops a tightly packed
      critical elite?
    answer: >-
      Key figure: 73.0 — Median Metascore. The source is the TidyTuesday release
      from 2019-07-30 (R for Data Science community). The working file contains
      26,688 rows and 11 columns after merging available tables in the…
  - question: >-
      What does the data show about Owner tiers carry different Metascore
      distributions?
    answer: >-
      Key figure: 98.0 — Highest observed Metascore. The source is the
      TidyTuesday release from 2019-07-30 (R for Data Science community). The
      working file contains 26,688 rows and 11 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Mid-million owner games clear the median;
      tiny audiences trail?
    answer: >-
      Key figure: DEEP SPACE WAIFU: NEKOMIMI — Top Game by Metascore. The source
      is the TidyTuesday release from 2019-07-30 (R for Data Science community).
      The working file contains 26,688 rows and 11 columns after merging
      available tables in the…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Steam Spy-era metadata turns the storefront into a scored catalog. This file holds 26,688 games spanning 2004–2018, with a median Metascore of 73.0 and a high of 98.0. DEEP SPACE WAIFU: NEKOMIMI appears in the fact-box extremes; the 0 .. 20,000 owners band is the most common ownership bucket.</p>
<p class="art-p">The question is how critic Metascore sits across time, titles, and owner tiers — and whether score and price move together. The calibration point is 73.0: above it, the critically strong; below it, the long shelf of ordinary releases.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">26,688</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">73.0</span><span class="fact-label">Median Metascore</span></div>
  <div class="fact-box"><span class="fact-number">98.0</span><span class="fact-label">Highest observed Metascore</span></div>
  <div class="fact-box"><span class="fact-number">DEEP SPACE WAIFU: NEKOMIMI</span><span class="fact-label">Top Game by Metascore</span></div>
  <div class="fact-box"><span class="fact-number">2004–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">0 .. 20,000</span><span class="fact-label">Most common Owners</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-07-30 (R for Data Science community). The working file contains 26,688 rows and 11 columns after merging available tables in the week folder. Metascore is the primary metric; owners is the categorical size axis; price appears in the scatter.</p>
<p class="art-p">Medians are used because scores and prices both skew. Index-style fields are excluded from metric selection.</p>

<h2 id="median-metascore-edged-up-across-the-store-s-expansion-years" class="anchored">Median Metascore edged up across the store’s expansion years</h2>
<h3 id="median-metascore-edged-up-across-the-store-s-expansion-years-look" class="anchored">Median Metascore Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-steam/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-steam/charts/chart1_trend.png" role="img" aria-label="Median Metascore Over Time"></div>
</figure>
<p class="art-p">Median Metascore rises from 70.0 in the opening period to 73.0 at the close — landing on the file median. The typical scored game in this extract ends the window a few points higher than it began.</p>
<p class="art-p">A rising median can mean stronger games, changing coverage of what receives scores, or both. The chart records the center’s drift.</p>

<h2 id="little-triangle-tops-a-tightly-packed-critical-elite" class="anchored">Little Triangle tops a tightly packed critical elite</h2>
<h3 id="little-triangle-tops-a-tightly-packed-critical-elite-look" class="anchored">Little Triangle leads at 98.0 — 95.5 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-steam/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-steam/charts/chart2_leaders.png" role="img" aria-label="Little Triangle leads at 98.0 — 95.5 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Little Triangle leads at 98.0, while 95.5 marks the median among the top dozen. The elite band is compressed near the ceiling of 98.0 — high scores clustered together rather than a lonely outlier.</p>
<p class="art-p">Fact boxes also surface DEEP SPACE WAIFU: NEKOMIMI among notable titles in the ranking rules used there. The leaders chart makes the numeric top of this Metascore cut explicit.</p>

<h2 id="owner-tiers-carry-different-metascore-distributions" class="anchored">Owner tiers carry different Metascore distributions</h2>
<h3 id="owner-tiers-carry-different-metascore-distributions-look" class="anchored">Metascore by Owners</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-steam/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-steam/charts/chart3_distribution.png" role="img" aria-label="Metascore by Owners"></div>
</figure>
<p class="art-p">Category boxes by owners show whether Metascore consensus is shared or contested across popularity bands. Games with millions of owners are not the same statistical population as the 0 .. 20,000 band that dominates row counts.</p>
<p class="art-p">Volume of titles in the smallest owner bucket is a catalog fact; the boxes ask how scores spread inside each ownership tier.</p>

<h2 id="mid-million-owner-games-clear-the-median-tiny-audiences-trail" class="anchored">Mid-million owner games clear the median; tiny audiences trail</h2>
<h3 id="mid-million-owner-games-clear-the-median-tiny-audiences-trail-look" class="anchored">Metascore vs median by Owners</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-steam/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-steam/charts/chart4_gap.png" role="img" aria-label="Metascore vs median by Owners"></div>
</figure>
<p class="art-p">The 2,000,000 .. 5,000,000 owners band sits 10.0 above the median; the 0 .. 20,000 band trails by 5.00. In this extract, broader ownership tiers sit higher on Metascore relative to the file center than the sparsest shelf.</p>
<p class="art-p">That gap is an association in the file, not proof that owners cause scores. It is still a citable structural pattern: critical mass and critical score lean together here.</p>

<h2 id="metascore-and-price-form-a-joint-market-map" class="anchored">Metascore and price form a joint market map</h2>
<h3 id="metascore-and-price-form-a-joint-market-map-look" class="anchored">Metascore vs Price</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-steam/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-steam/charts/chart5_scatter.png" role="img" aria-label="Metascore vs Price"></div>
</figure>
<p class="art-p">Plotting Metascore against price shows clusters that averages erase — cheap high scores, expensive middling scores, and every bargain or premium pattern between.</p>
<p class="art-p">The scatter is the right chart for the storefront question: what combinations of critic score and sticker price actually appear in the 26,688-row Steam Spy extract.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live Steam or Metacritic APIs. Missing Metascores, owner-band binning, price currency assumptions, and 2004–2018 coverage limits apply.</p>
<p class="art-p">Findings describe this Steam Spy extract — structural signals about Metascore, owners, and price — not a complete quality ranking of every game ever shipped.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Steam Spy scores in this file center on a median Metascore of 73.0, rise from 70.0 to 73.0 at the median, and peak at 98.0 among leaders such as Little Triangle.</p>
<p class="art-p">Owner tiers matter: the 2–5 million band sits above the median while the smallest band trails, and Metascore–price clusters show how critic standing and sticker price co-occur on the shelf.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: Video Games Steam Spy</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-07-30/video_games.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-07-30/video_games.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-07-30" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
