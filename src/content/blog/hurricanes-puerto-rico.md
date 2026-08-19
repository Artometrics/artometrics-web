---
title: 'Hurricane Maria delivered 5,072-unit peak to Puerto Rico in 2017 three-state season'
slug: hurricanes-puerto-rico
author: kyle-mcauliffe
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Texas, Florida, and Puerto Rico absorbed 100% of measured 2017 hurricane impact in 153-record TidyTuesday extract; median reading 703, ceiling 5,072.
heroImage: /images/content/articles/hurricanes-puerto-rico/hero.png
draft: false
tags:
  - culture
  - environment
tldr: >-
  Three places absorbed 100% of measured hurricane impact in the 2017 TidyTuesday extract: Texas leads state totals at 983, Florida follows, and Puerto Rico recorded the season's 5,072 peak. The 153-record file shows median value 703, mean 1,020, and a right-skewed distribution where the top decile begins at 2,214.
keyPoints:
  - 5,072 — Season ceiling recorded in Puerto Rico, 7.2× the 703 median
  - 100% — Share of aggregate value held by three-place head (Texas, Florida, Puerto Rico)
  - 2,214 — Top-decile threshold, where defining storm days begin
  - 983 — Texas state total leads the 153-record extract from 2017 season
faq:
  - question: >-
      What was the highest hurricane value recorded in 2017?
    answer: >-
      5,072, observed in Puerto Rico during Hurricane Maria.
  - question: >-
      Which states carried the 2017 hurricane season?
    answer: >-
      Texas, Florida, and Puerto Rico accounted for 100% of aggregate value in the 153-record TidyTuesday file.
  - question: >-
      How skewed is the 2017 hurricane distribution?
    answer: >-
      Median 703 versus mean 1,020; the top decile begins at 2,214, a classic right-skewed disaster curve.
  - question: >-
      Does this dataset cover all hurricanes in Puerto Rico history?
    answer: >-
      No—it is a 2017 season extract from TidyTuesday, not a multi-decade climatology or FEMA damage ledger.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">Three places absorbed 100% of measured hurricane impact in the 2017 TidyTuesday extract: Texas leads state totals at 983, Florida follows, and Puerto Rico recorded the season's 5,072 peak.</p>
<p class="art-p">The 153-record file from the R for Data Science community tracks intensity values across the late-summer Atlantic window. Median reading is 703; the right-skewed distribution pushes mean to 1,020. The top decile begins at 2,214—the threshold where defining storm days separate from elevated but survivable readings.</p>
<p class="art-p">This is not a full Caribbean cyclone climatology. It is a season-slice that places Texas, Florida, and Puerto Rico side by side on intensity, concentration, and timing.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">153</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">703</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">5,072</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">Texas</span><span class="fact-label">Top State by Value</span></div>
  <div class="fact-box"><span class="fact-number">2017–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">Source: TidyTuesday release from 2018-06-19, published by the R for Data Science community. The working file contains 153 rows and 4 columns after cleaning—a narrow table built for cross-state comparison in the 2017 window.</p>
<p class="art-p">Medians are preferred for robustness. Charts ship as Plotly JSON with PNG fallbacks. Because the year span collapses to 2017, conclusions are about that season's comparative geography, not multi-decade hurricane climatology.</p>
<h2 id="timeline" class="anchored">Timeline across states</h2>
<h3 id="timeline-look" class="anchored">Value by State</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart1_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart1_timeline.png" role="img" aria-label="Value by State"></div>
</figure>
<p class="art-p">Daily value lines separate which state or territory bore the brunt on which days. Peaks rarely align. Texas, Florida, and Puerto Rico experienced the same basin season on different clocks—landfall timing and local intensity created staggered curves rather than a single shared crest.</p>
<p class="art-p">The 5,072 maximum defines the intensity ceiling. Everything else in the file is read relative to that spike and to the 703 median.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Texas leads at 983 — 621 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart2_leaders.png" role="img" aria-label="Texas leads at 983 — 621 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Texas leads at 983; median among the top dozen entries is 621. Florida and Puerto Rico complete the short list of places that dominate the aggregate signal.</p>
<p class="art-p">A short leaderboard is itself a finding: storm impact is not evenly distributed across dozens of states. A handful of geographies carry the measurable season.</p>
<h2 id="how-the-field-is-spread" class="anchored">How values are spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Median 703 vs mean 1,020 — the shape is right-skewed</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart3_distribution.png" role="img" aria-label="Median 703 vs mean 1,020 — the shape is right-skewed"></div>
</figure>
<p class="art-p">Right-skewed distribution: median 703 versus mean 1,020. The top decile begins at 2,214. That tail is where the defining storm days live—and why a mean-based summary sounds more extreme than a typical day in the file.</p>
<p class="art-p">Skewness is the statistical signature of disaster data. Most observations are elevated but survivable; a minority of days rewrite the season's memory.</p>
<h2 id="concentration" class="anchored">Concentration of impact</h2>
<h3 id="concentration-look" class="anchored">The top 3 state entries account for 100% of the aggregate value</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart4_pareto.png" role="img" aria-label="The top 3 state entries account for 100% of the aggregate value"></div>
</figure>
<p class="art-p">The top three state or territory entries account for 100% of the aggregate value. The Pareto curve is not merely steep—it is a three-place map.</p>
<p class="art-p">That concentration explains why comparative journalism about 2017 returned to Texas, Florida, and Puerto Rico. The file's structure matches public memory: a short head, not a long list of mildly affected places.</p>
<h2 id="concentration-detail" class="anchored">Concentration, from another cut</h2>
<h3 id="concentration-detail-look" class="anchored">The top 3 state entries account for 100% of the aggregate value</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart_pareto.png" role="img" aria-label="The top 3 state entries account for 100% of the aggregate value"></div>
</figure>
<p class="art-p">A second concentration chart repeats the same structural claim from a related table cut: the measurable aggregate is carried by the same three-place head. Steep Pareto curves mean a small head drives most of the signal.</p>
<p class="art-p">For Puerto Rico, the lesson is not that other places did not suffer. In this season-slice, comparative magnitude collapses onto a tiny set of names—and Puerto Rico is inside that set.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. A 153-row season extract cannot stand in for FEMA damage ledgers, mortality studies, or multi-decade storm catalogs.</p>
<p class="art-p">Value in the working columns is the file's measured intensity metric—not a universal currency of loss. Pair these charts with official after-action reporting before converting them into legal or fiscal claims.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The 2017 window in this file is a story of concentration: median 703, ceiling 5,072, and an aggregate dominated by three places. Texas leads the ranking cut; Puerto Rico holds the season's peak.</p>
<p class="art-p">Disaster seasons are not democratic distributions. They are skewed clocks. The citable map is the short head of places where the season actually happened.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>