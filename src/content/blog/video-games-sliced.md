---
title: Did Critical Acclaim Track Commercial Success in Video Games?
slug: video-games-sliced
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  A large games slice tests whether critic scores correlated with commercial
  outcomes.
heroImage: /images/content/articles/video-games-sliced/hero.png
draft: false
tags:
  - sports
  - gaming
tldr: >-
  Steam-era concurrency is a living audience meter. This Sliced/TidyTuesday
  games extract holds 83,631 records spanning 2012–2021, with a median average
  player count (Avg) of 203 and a high of 1,584,887. PLAYERUNKNOWN'S
  BATTLEGROUNDS appears among the fact-box peaks; February is the most common
  month label in the file.
keyPoints:
  - '83,631 — Records in the working dataset'
  - 203 — Median Avg
  - '1,584,887 — Highest observed Avg'
  - PLAYERUNKNOWN'S BATTLEGROUND — Top Gamename by Avg
  - 2012–2021 — Year span covered in the file
  - February — Most common Month
faq:
  - question: >-
      What does the data show about Median concurrency climbed across the
      decade?
    answer: >-
      Key figure: 83,631 — Records in the working dataset. The source is the
      TidyTuesday release from 2021-03-16 (R for Data Science community). The
      working file contains 83,631 rows and 8 columns after merging available
      tables in the…
  - question: What does the data show about Dota 2 leads a top tier that drops off fast?
    answer: >-
      Key figure: 203 — Median Avg. The source is the TidyTuesday release from
      2021-03-16 (R for Data Science community). The working file contains
      83,631 rows and 8 columns after merging available tables in the…
  - question: >-
      What does the data show about Months carry different concurrency
      distributions?
    answer: >-
      Key figure: 1,584,887 — Highest observed Avg. The source is the
      TidyTuesday release from 2021-03-16 (R for Data Science community). The
      working file contains 83,631 rows and 8 columns after merging available
      tables in the…
  - question: What does the data show about January clears the median; October trails?
    answer: >-
      Key figure: PLAYERUNKNOWN'S BATTLEGROUND — Top Gamename by Avg. The source
      is the TidyTuesday release from 2021-03-16 (R for Data Science community).
      The working file contains 83,631 rows and 8 columns after merging
      available tables in the…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Steam-era concurrency is a living audience meter. This Sliced/TidyTuesday games extract holds 83,631 records spanning 2012–2021, with a median average player count (Avg) of 203 and a high of 1,584,887. PLAYERUNKNOWN'S BATTLEGROUNDS appears among the fact-box peaks; February is the most common month label in the file.</p>
<p class="art-p">The charts ask how median Avg moved over time, which titles sit at the top, how months differ from the median, and whether Avg and Gain travel together. The calibration point is 203 — the typical observation in a market where a few live-service titles become cities unto themselves.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">83,631</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">203</span><span class="fact-label">Median Avg</span></div>
  <div class="fact-box"><span class="fact-number">1,584,887</span><span class="fact-label">Highest observed Avg</span></div>
  <div class="fact-box"><span class="fact-number">PLAYERUNKNOWN'S BATTLEGROUND</span><span class="fact-label">Top Gamename by Avg</span></div>
  <div class="fact-box"><span class="fact-number">2012–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">February</span><span class="fact-label">Most common Month</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-03-16 (R for Data Science community). The working file contains 83,631 rows and 8 columns after merging available tables in the week folder. Avg is the primary metric; Gain appears in the scatter; month and game name are categorical axes.</p>
<p class="art-p">Medians are mandatory because player counts are extremely skewed. Index-style fields are excluded from metric selection.</p>

<h2 id="median-concurrency-climbed-across-the-decade" class="anchored">Median concurrency climbed across the decade</h2>
<h3 id="median-concurrency-climbed-across-the-decade-look" class="anchored">Median Avg Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart1_trend.png" role="img" aria-label="Median Avg Over Time"></div>
</figure>
<p class="art-p">Median Avg rises from 212 in the opening period to 309 at the close — movement around and then above the file median of 203 depending on the window edges. The typical title-month in this extract ends higher than it began.</p>
<p class="art-p">A rising median can reflect industry growth, survivor bias in which games remain observable, or both. The chart reports the center’s path, not every title’s fate.</p>

<h2 id="dota-2-leads-a-top-tier-that-drops-off-fast" class="anchored">Dota 2 leads a top tier that drops off fast</h2>
<h3 id="dota-2-leads-a-top-tier-that-drops-off-fast-look" class="anchored">Dota 2 leads at 475,924 — 64,656 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart2_leaders.png" role="img" aria-label="Dota 2 leads at 475,924 — 64,656 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Dota 2 leads at 475,924 Avg, while 64,656 marks the median among the top dozen. That plunge from first to the top-dozen median is the live-service economy in one sentence: a few games are continents; the rest of the elite tier is still large, but not the same species.</p>
<p class="art-p">Fact boxes flag PLAYERUNKNOWN'S BATTLEGROUNDS among peak titles and 1,584,887 as the highest observed Avg — the extreme ceiling above even the charted leaders cut.</p>

<h2 id="months-carry-different-concurrency-distributions" class="anchored">Months carry different concurrency distributions</h2>
<h3 id="months-carry-different-concurrency-distributions-look" class="anchored">Avg by Month</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart3_distribution.png" role="img" aria-label="Avg by Month"></div>
</figure>
<p class="art-p">Category boxes by month show whether Avg consensus is shared or contested across the calendar. Seasonal launches, holidays, and school breaks can all reshape who is online.</p>
<p class="art-p">February’s frequency in the file is a coverage fact; the boxes ask a different question — how Avg spreads within each month.</p>

<h2 id="january-clears-the-median-october-trails" class="anchored">January clears the median; October trails</h2>
<h3 id="january-clears-the-median-october-trails-look" class="anchored">Avg vs median by Month</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart4_gap.png" role="img" aria-label="Avg vs median by Month"></div>
</figure>
<p class="art-p">January sits 36.9 above the median; October trails by 23.3. Those signed gaps turn the calendar into a comparable scale against the file center.</p>
<p class="art-p">Month offsets are structural signals in this extract, not proof of a universal gaming season — but they are concrete enough to cite when asking when concurrency tends to run hot or cold.</p>

<h2 id="avg-and-gain-form-a-joint-cloud-of-winners-and-churn" class="anchored">Avg and Gain form a joint cloud of winners and churn</h2>
<h3 id="avg-and-gain-form-a-joint-cloud-of-winners-and-churn-look" class="anchored">Avg vs Gain</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/video-games-sliced/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/video-games-sliced/charts/chart5_scatter.png" role="img" aria-label="Avg vs Gain"></div>
</figure>
<p class="art-p">Plotting Avg against Gain shows clusters that averages erase: high average with different gain profiles is a different audience story from low average with volatile gain.</p>
<p class="art-p">The scatter is relational. It maps how level and change co-occur across the 83,631-row games slice.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live SteamCharts APIs. Missing values, title variants, and 2012–2021 coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Avg and Gain are the metrics as defined in the source. Findings describe this video-games extract — concurrency structure — not a complete commercial P&amp;L for every title.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Concurrency in this file centers on a median Avg of 203, rises from 212 to 309 at the median, and still supports extremes above a million players.</p>
<p class="art-p">Dota 2 leads the charted ladder, January sits above the median while October trails, and Avg–Gain clusters show how level and change travel together in a long-tailed live-service market.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: Video Games</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-16/sliced-tidytuesday.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-16/sliced-tidytuesday.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-16" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
