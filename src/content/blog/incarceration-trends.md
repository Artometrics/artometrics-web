---
title: How U.S. Incarceration Rates Diverged by State
slug: incarceration-trends
pubDate: 2026-06-15T00:00:00.000Z
description: Long-run imprisonment data track national trends and which states pulled away.
heroImage: /images/content/articles/incarceration-trends/hero.png
tags:
  - business
draft: false
tldr: Long-run imprisonment data track national trends and which states pulled away.
keyPoints:
  - '100,000 — Records in the working dataset'
  - '3,553 — Median Population'
  - '6,801,437 — Highest observed Population'
  - CA — Top State by Population
  - 1970–2016 — Year span covered in the file
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">U.S. incarceration is often narrated as a single national curve. County- and state-level population files show something more fractured: regional regimes that diverge for decades even while they share the same federal criminal-justice vocabulary.</p>
<p class="art-p">The TidyTuesday working extract used here holds <strong>100,000</strong> records spanning <strong>1970–2016</strong>. Median population in the analytic columns sits at <strong>3,553</strong>; the highest observed population value exceeds <strong>6.8 million</strong>. California leads the state rollup by population, and the South is the most common region label in the file.</p>
<p class="art-p">Population is not identical to incarceration rate — but in this release it is the spine that lets pretrial counts, regional gaps, and long-run change be compared without pretending every county is the same size.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">3,553</span><span class="fact-label">Median Population</span></div>
  <div class="fact-box"><span class="fact-number">6,801,437</span><span class="fact-label">Highest observed Population</span></div>
  <div class="fact-box"><span class="fact-number">CA</span><span class="fact-label">Top State by Population</span></div>
  <div class="fact-box"><span class="fact-number">1970–2016</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">South</span><span class="fact-label">Most common Region</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-01-22 (R for Data Science community). The working file contains 100,000 rows and 10 columns after assembly — state, region, year, population, and pretrial population among the fields carried forward.</p>
<p class="art-p">Medians stabilize skew from giant counties and city systems. Charts export as Plotly JSON with PNG fallbacks. Because the table mixes geographies of very different scale, every ranking should be read with population context attached.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How the pattern changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Population Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/incarceration-trends/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/incarceration-trends/charts/chart1_trend.png" role="img" aria-label="Median Population Over Time"></div>
</figure>
<p class="art-p">Median population in the working series falls from about <strong>4,123</strong> in the opening period to about <strong>3,359</strong> at the close. That movement can reflect changing county coverage, urban-rural composition, and how incomplete early rows enter the sample — not a simple story that places got smaller.</p>
<p class="art-p">The time chart is still essential. It forces the rest of the analysis to admit that the typical row in 1970 and the typical row in 2016 are not drawn from identical geographic mixes.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">DC leads at 190,209 — 24,944 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/incarceration-trends/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/incarceration-trends/charts/chart2_leaders.png" role="img" aria-label="DC leads at 190,209 — 24,944 marks the median among the top dozen"></div>
</figure>
<p class="art-p">On the leader cut highlighted in the file, <strong>DC</strong> leads at <strong>190,209</strong>, with <strong>24,944</strong> as the median among the top dozen. Dense jurisdictions and large states occupy the same head for different reasons — capital-city concentration versus sheer statewide population.</p>
<p class="art-p">California's fact-box lead on state population and DC's lead on this chart can both be true. They answer different aggregation questions. Confusing them produces false arguments about which place is most incarcerated rather than which place is largest or densest in the extract.</p>
<h2 id="how-the-field-is-spread" class="anchored">How regions spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Population by Region</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/incarceration-trends/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/incarceration-trends/charts/chart3_distribution.png" role="img" aria-label="Population by Region"></div>
</figure>
<p class="art-p">Regional box plots show whether population consensus is shared or contested across the South, Northeast, Midwest, and West. The South's frequency as the most common region label does not automatically mean it has the highest median population per row.</p>
<p class="art-p">Spread within regions often exceeds spread between region medians. County inequality inside a region is part of the incarceration story, not noise around a regional average.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Population vs median by Region</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/incarceration-trends/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/incarceration-trends/charts/chart4_gap.png" role="img" aria-label="Population vs median by Region"></div>
</figure>
<p class="art-p">On the gap chart, the <strong>Northeast</strong> sits <strong>13,710</strong> above the median; the <strong>Midwest</strong> trails by <strong>1,276</strong>. Those gaps capture the urban weight of Northeastern counties in the sample as much as any single policy variable.</p>
<p class="art-p">Regional gaps are starting points for rate-based follow-ups, not final moral rankings. A high-population region can have lower incarceration rates, and a lower-population region can incarcerate more intensively per resident.</p>
<h2 id="what-moves-together" class="anchored">Population and pretrial population</h2>
<h3 id="what-moves-together-look" class="anchored">Population vs Pretrial population</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/incarceration-trends/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/incarceration-trends/charts/chart5_scatter.png" role="img" aria-label="Population vs Pretrial population"></div>
</figure>
<p class="art-p">Plotting population against pretrial population shows clusters that averages erase. Some large jurisdictions carry large pretrial counts in rough proportion; others deviate — the places where jail composition, not just city size, is doing extra work.</p>
<p class="art-p">Pretrial population is one of the most policy-sensitive fields in modern jail debate. The scatter does not prove causation, but it flags where scale and pretrial burden travel together and where they separate.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and coverage limits apply. Population columns are not a substitute for official imprisonment rates per 100,000 residents.</p>
<p class="art-p">Findings describe the file on hand — structural signals about how geographies and pretrial counts sit across 1970–2016 — not a complete causal history of mass incarceration.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Incarceration trends in this extract are a story of divergent geographies sharing one national vocabulary. Median rows sit near 3,553 people; extremes exceed millions; regional gaps reach five figures above the median.</p>
<p class="art-p">The citable caution is simple: size, region, and pretrial burden are related but not identical. Any claim about the U.S. incarceration rate that skips those splits is summarizing away the map.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
