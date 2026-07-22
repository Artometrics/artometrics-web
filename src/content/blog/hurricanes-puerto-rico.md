---
title: Which Storms Hit Puerto Rico Hardest?
slug: hurricanes-puerto-rico
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Hurricane records compare wind, deaths, and frequency for the island’s most
  damaging storms.
heroImage: /images/content/articles/hurricanes-puerto-rico/hero.png
tags:
  - cities-travel
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">In late summer 2017, the Atlantic hurricane season forced a brutal comparative question into public view: which places absorbed the worst of the storm window, and how did Puerto Rico's readings sit beside Florida and Texas?</p>
<p class="art-p">A compact TidyTuesday file of <strong>153</strong> records tracks values across that season's geography. The median reading is <strong>703</strong>; the highest observed value hits <strong>5,072</strong>. Texas leads the state-level totals in the working extract, but the timeline chart is where Puerto Rico's distinct peak pattern becomes visible.</p>
<p class="art-p">This is not a full climatology of Caribbean cyclones. It is a season-slice that lets three hard-hit places be read side by side — intensity, concentration, and timing included.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">153</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">703</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">5,072</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">Texas</span><span class="fact-label">Top State by Value</span></div>
  <div class="fact-box"><span class="fact-number">2017–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-06-19 (R for Data Science community). The working file contains 153 rows and 4 columns after cleaning — a narrow table built for comparison across states and territories in the 2017 window.</p>
<p class="art-p">Medians are preferred for robustness. Charts ship as Plotly JSON with PNG fallbacks. Because the year span in the extract collapses to <strong>2017–2017</strong>, conclusions are about that season's comparative geography, not about multi-decade hurricane climatology.</p>
<h2 id="timeline" class="anchored">Timeline across states</h2>
<h3 id="timeline-look" class="anchored">Value by State</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart1_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart1_timeline.png" role="img" aria-label="Value by State"></div>
</figure>
<p class="art-p">Daily value lines separate which state or territory bore the brunt on which days. Peaks rarely align. Texas, Florida, and Puerto Rico experience the same basin season on different clocks — landfall timing and local intensity create staggered curves rather than a single shared crest.</p>
<p class="art-p">The maximum reading of <strong>5,072</strong> defines the intensity ceiling for the window. Everything else in the file is best read relative to that spike and to the median of 703.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Texas leads at 983 — 621 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart2_leaders.png" role="img" aria-label="Texas leads at 983 — 621 marks the median among the top dozen"></div>
</figure>
<p class="art-p">On the leader ranking used here, <strong>Texas</strong> leads at <strong>983</strong>, with <strong>621</strong> as the median among the top dozen entries. Florida and Puerto Rico complete the short list of places that dominate the aggregate signal.</p>
<p class="art-p">A short leaderboard is itself a finding: in this file, storm impact is not evenly sprinkled across dozens of states. A handful of geographies carry the measurable season.</p>
<h2 id="how-the-field-is-spread" class="anchored">How values are spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Median 703 vs mean 1,020 — the shape is right-skewed</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart3_distribution.png" role="img" aria-label="Median 703 vs mean 1,020 — the shape is right-skewed"></div>
</figure>
<p class="art-p">The distribution is right-skewed: median <strong>703</strong> versus mean <strong>1,020</strong>. The top decile begins near <strong>2,214</strong>. That tail is where the defining storm days live — and why a mean-based summary will sound more extreme than a typical day in the file.</p>
<p class="art-p">Skewness is the statistical signature of disaster data. Most observations are elevated but survivable; a minority of days rewrite the season's memory.</p>
<h2 id="concentration" class="anchored">Concentration of impact</h2>
<h3 id="concentration-look" class="anchored">The top 3 state entries account for 100% of the aggregate value</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart4_pareto.png" role="img" aria-label="The top 3 state entries account for 100% of the aggregate value"></div>
</figure>
<p class="art-p">In this working extract, the top three state or territory entries account for <strong>100%</strong> of the aggregate value. The Pareto curve is not merely steep — it is effectively a three-place map.</p>
<p class="art-p">That concentration is why comparative journalism about 2017 kept returning to Texas, Florida, and Puerto Rico. The file's structure matches the public memory: a short head, not a long democratic list of mildly affected places.</p>
<h2 id="concentration-detail" class="anchored">Concentration, from another cut</h2>
<h3 id="concentration-detail-look" class="anchored">The top 3 state entries account for 100% of the aggregate value</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hurricanes-puerto-rico/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hurricanes-puerto-rico/charts/chart_pareto.png" role="img" aria-label="The top 3 state entries account for 100% of the aggregate value"></div>
</figure>
<p class="art-p">A second concentration chart repeats the same structural claim from a related cut of the table: the measurable aggregate is carried by the same three-place head. Steep Pareto curves mean a small head drives most of the signal.</p>
<p class="art-p">For Puerto Rico specifically, the lesson is not that other places did not suffer. It is that in this season-slice, comparative magnitude collapses onto a tiny set of names — and Puerto Rico is inside that set.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. A 153-row season extract cannot stand in for FEMA damage ledgers, mortality studies, or multi-decadal storm catalogs.</p>
<p class="art-p">Value in the working columns should be read as the file's measured intensity metric — not as a universal currency of loss. Pair these charts with official after-action reporting before converting them into legal or fiscal claims.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The 2017 window in this file is a story of concentration: median 703, ceiling 5,072, and an aggregate dominated by three places. Texas leads the ranking cut; Puerto Rico remains essential to the timeline.</p>
<p class="art-p">Disaster seasons are not democratic distributions. They are skewed clocks. The citable map is the short head of places where the season actually happened.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
