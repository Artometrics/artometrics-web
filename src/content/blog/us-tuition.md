---
title: How Far Did Average U.S. Tuition Climb by State?
slug: us-tuition
pubDate: 2026-06-15T00:00:00.000Z
description: State tuition time series measure the rise in college costs.
heroImage: /images/content/articles/us-tuition/hero.png
draft: false
tags:
  - civics
  - education
tldr: >-
  College price is a time series with a political charge. This file holds 600
  state-level tuition records spanning 2004–2015, with a median value of 7,607
  and a high of 15,224. New Hampshire appears in the fact-box state ranking; the
  charts track how the typical state price moved and which states sat at the top
  of the ladder. The calibration point is that 7,607 median.
keyPoints:
  - 600 — Records in the working dataset
  - '7,607 — Median Value'
  - '15,224 — Highest observed Value'
  - New Hampshire — Top State by Value
  - 2004–2015 — Year span covered in the file
faq:
  - question: >-
      What does the data show about Median tuition climbed from the
      mid-five-thousands to the low-nine-thousands?
    answer: >-
      Key figure: 600 — Records in the working dataset. The source is the
      TidyTuesday release from 2018-04-02 (R for Data Science community). The
      working file contains 600 rows and 3 columns after merging available
      tables in the week…
  - question: >-
      What does the data show about Vermont leads the state ladder in the
      charted cut?
    answer: >-
      Key figure: 7,607 — Median Value. The source is the TidyTuesday release
      from 2018-04-02 (R for Data Science community). The working file contains
      600 rows and 3 columns after merging available tables in the week…
  - question: >-
      What does the data show about Median and mean sit close; the top decile
      starts above eleven thousand?
    answer: >-
      Key figure: 15,224 — Highest observed Value. The source is the TidyTuesday
      release from 2018-04-02 (R for Data Science community). The working file
      contains 600 rows and 3 columns after merging available tables in the
      week…
  - question: >-
      What does the data show about Leading states do not move in lockstep over
      time?
    answer: >-
      Key figure: New Hampshire — Top State by Value. The source is the
      TidyTuesday release from 2018-04-02 (R for Data Science community). The
      working file contains 600 rows and 3 columns after merging available
      tables in the week…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">College price is a time series with a political charge. This file holds 600 state-level tuition records spanning 2004–2015, with a median value of 7,607 and a high of 15,224. New Hampshire appears in the fact-box state ranking; the charts track how the typical state price moved and which states sat at the top of the ladder.</p>
<p class="art-p">The calibration point is that 7,607 median. Everything else — Vermont’s charted lead, the rise from 5,876 to 9,141, the top-decile threshold at 11,204 — is distance from that center of the tuition distribution.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">600</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">7,607</span><span class="fact-label">Median Value</span></div>
  <div class="fact-box"><span class="fact-number">15,224</span><span class="fact-label">Highest observed Value</span></div>
  <div class="fact-box"><span class="fact-number">New Hampshire</span><span class="fact-label">Top State by Value</span></div>
  <div class="fact-box"><span class="fact-number">2004–2015</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-04-02 (R for Data Science community). The working file contains 600 rows and 3 columns after merging available tables in the week folder. Value is the tuition metric; state is the entity axis; year spans the mid-2000s through 2015 in the coverage window.</p>
<p class="art-p">Medians are preferred for skewed price distributions. The file also reports a mean of 7,899 against the median of 7,607 — relatively close, which is useful for robustness. Index-style fields are excluded from metric selection.</p>

<h2 id="median-tuition-climbed-from-the-mid-five-thousands-to-the-low-nine-thousands" class="anchored">Median tuition climbed from the mid-five-thousands to the low-nine-thousands</h2>
<h3 id="median-tuition-climbed-from-the-mid-five-thousands-to-the-low-nine-thousands-look" class="anchored">Median Value Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart1_trend.png" role="img" aria-label="Median Value Over Time"></div>
</figure>
<p class="art-p">Median value rises from 5,876 in the opening period to 9,141 at the close. That is the headline trend in this extract: the typical state’s tuition marker moved upward across 2004–2015.</p>
<p class="art-p">A rising median is the shared experience in the file. Leaders amplify it; lower-cost states still sit inside an upward-shifting distribution.</p>

<h2 id="vermont-leads-the-state-ladder-in-the-charted-cut" class="anchored">Vermont leads the state ladder in the charted cut</h2>
<h3 id="vermont-leads-the-state-ladder-in-the-charted-cut-look" class="anchored">Vermont leads at 13,486 — 10,850 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart2_leaders.png" role="img" aria-label="Vermont leads at 13,486 — 10,850 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Vermont leads at 13,486, while 10,850 marks the median among the top dozen states. New Hampshire remains a fact-box landmark for the top-state ranking rule used there; the leaders chart makes the numeric top of this cut explicit.</p>
<p class="art-p">The drop from first place to the top-dozen median shows a competitive but still elevated upper tier — expensive relative to the file median of 7,607.</p>

<h2 id="median-and-mean-sit-close-the-top-decile-starts-above-eleven-thousand" class="anchored">Median and mean sit close; the top decile starts above eleven thousand</h2>
<h3 id="median-and-mean-sit-close-the-top-decile-starts-above-eleven-thousand-look" class="anchored">Median 7,607 vs mean 7,899 — the shape is relatively symmetric</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart3_distribution.png" role="img" aria-label="Median 7,607 vs mean 7,899 — the shape is relatively symmetric"></div>
</figure>
<p class="art-p">Median 7,607 versus mean 7,899 — the shape is relatively symmetric for a price distribution. The top decile begins at 11,204; that upper slice is where the defining high-tuition states in this metric live.</p>
<p class="art-p">Symmetry near the center does not erase the expensive tail. It means the typical state is not being wildly distorted by a few outliers in the average alone.</p>

<h2 id="leading-states-do-not-move-in-lockstep-over-time" class="anchored">Leading states do not move in lockstep over time</h2>
<h3 id="leading-states-do-not-move-in-lockstep-over-time-look" class="anchored">Top State Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart4_leader_trends.png" role="img" aria-label="Top State Over Time"></div>
</figure>
<p class="art-p">Leader trends show that the leading names do not move in lockstep — some fade as others surge. Tracking medians over time separates sustained high-price states from one-off spikes.</p>
<p class="art-p">Side-by-side trajectories matter when the policy question is whether expensive states stay expensive, or whether the ladder reshuffles.</p>

<h2 id="five-states-account-for-thirty-eight-percent-of-aggregate-value" class="anchored">Five states account for thirty-eight percent of aggregate value</h2>
<h3 id="five-states-account-for-thirty-eight-percent-of-aggregate-value-look" class="anchored">The top 5 state entries account for 38% of the aggregate value</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-tuition/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-tuition/charts/chart_pareto.png" role="img" aria-label="The top 5 state entries account for 38% of the aggregate value"></div>
</figure>
<p class="art-p">The top five state entries account for 38% of the aggregate value. Concentration is meaningful without being absolute: a visible head, and a broader set of states still carrying most of the remaining total.</p>
<p class="art-p">Pareto steepness here is a reminder that national tuition debates often orbit a minority of high-cost states even when the median tells a quieter story.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live College Board or IPEDS APIs. Missing values, state naming variants, and 2004–2015 coverage limits apply. Tuition definitions follow the source file’s value field.</p>
<p class="art-p">Findings describe this U.S. tuition extract — structural signals about state price levels and trends — not a full net-price analysis after aid.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">State tuition in this file rises at the median from 5,876 to 9,141, centers on 7,607, and still shows an expensive tail beginning at 11,204 in the top decile.</p>
<p class="art-p">Vermont leads the charted ladder, five states hold 38% of aggregate value, and leader trajectories diverge — a price map of public higher education’s mid-2000s to mid-2010s climb.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: US Tuition Costs</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-04-02/us_avg_tuition.xlsx" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-04-02/us_avg_tuition.xlsx</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-04-02" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
