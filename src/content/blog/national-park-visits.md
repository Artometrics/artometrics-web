---
title: Which National Parks Draw the Crowds?
slug: national-park-visits
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Visitation time series identify America’s busiest parks and how attendance has
  trended.
heroImage: /images/content/articles/national-park-visits/hero.png
tags:
  - cities-travel
draft: false
tldr: >-
  National parks are sold as wilderness and remembered as crowds. Visit counts
  make that tension measurable: which named units absorb America's outdoor
  attention, and how that attention has compounded since the early twentieth
  century. A TidyTuesday working file of 21,560 records spans 1904–2016 . Median
  visitors sit near 155,219 ;
keyPoints:
  - '21,560 — Records in the working dataset'
  - '155,219 — Median Visitors'
  - '871,922,828 — Highest observed Visitors'
  - Golden Gate — Top Parkname by Visitors
  - 1904–2016 — Year span covered in the file
  - IM — Most common Region
faq:
  - question: How visits grew over time?
    answer: >-
      Key figure: 21,560 — Records in the working dataset. Urban gateways and
      memorial parkways often outdraw remote iconic wilderness. The leaderboard
      is as much about access and metropolitan adjacency as about scenic purity.
  - question: Who sits at the top?
    answer: >-
      Key figure: 155,219 — Median Visitors. Urban gateways and memorial
      parkways often outdraw remote iconic wilderness. The leaderboard is as
      much about access and metropolitan adjacency as about scenic purity.
  - question: How regions spread visits?
    answer: >-
      Key figure: 871,922,828 — Highest observed Visitors. Urban gateways and
      memorial parkways often outdraw remote iconic wilderness. The leaderboard
      is as much about access and metropolitan adjacency as about scenic purity.
  - question: Who beats the median — and who trails?
    answer: >-
      Key figure: Golden Gate — Top Parkname by Visitors. Urban gateways and
      memorial parkways often outdraw remote iconic wilderness. The leaderboard
      is as much about access and metropolitan adjacency as about scenic purity.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">National parks are sold as wilderness and remembered as crowds. Visit counts make that tension measurable: which named units absorb America's outdoor attention, and how that attention has compounded since the early twentieth century.</p>
<p class="art-p">A TidyTuesday working file of <strong>21,560</strong> records spans <strong>1904–2016</strong>. Median visitors sit near <strong>155,219</strong>; the highest observed visitors figure reaches <strong>871,922,828</strong> in the extreme cell of the extract. <strong>Golden Gate</strong> leads the park-name ranking used in the fact box, and region code <strong>IM</strong> is the most common regional label.</p>
<p class="art-p">Urban gateways and memorial parkways often outdraw remote iconic wilderness. The leaderboard is as much about access and metropolitan adjacency as about scenic purity.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">21,560</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">155,219</span><span class="fact-label">Median Visitors</span></div>
  <div class="fact-box"><span class="fact-number">871,922,828</span><span class="fact-label">Highest observed Visitors</span></div>
  <div class="fact-box"><span class="fact-number">Golden Gate</span><span class="fact-label">Top Parkname by Visitors</span></div>
  <div class="fact-box"><span class="fact-number">1904–2016</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">IM</span><span class="fact-label">Most common Region</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-09-17 (R for Data Science community). The working file contains 21,560 rows and 13 columns after assembly — park names, regions, years, and visitor totals among them.</p>
<p class="art-p">Medians handle skew from a few hyper-visited units. Charts export as Plotly JSON with PNG fallbacks. Visitor totals are administrative counts with known definition changes over a century; treat long-run levels as directional, not penny-precise.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How visits grew over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Visitors Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart1_trend.png" role="img" aria-label="Median Visitors Over Time"></div>
</figure>
<p class="art-p">Median visitors rise from about <strong>2,200</strong> in the opening period to about <strong>198,478</strong> at the close — nearly two orders of magnitude of growth in the typical unit's recorded traffic.</p>
<p class="art-p">That climb tracks automobile access, population growth, the expansion of the park system itself, and the conversion of outdoor recreation into a mass middle-class habit. The median's rise is the system story; the leaders are the celebrity story.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Golden Gate leads at 14,554,750 — 5,151,270 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart2_leaders.png" role="img" aria-label="Golden Gate leads at 14,554,750 — 5,151,270 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Golden Gate</strong> leads at about <strong>14,554,750</strong> on the highlighted ranking, with <strong>5,151,270</strong> as the median among the top dozen. Related high-traffic units in the broader leader cuts include urban memorials and parkways — Vietnam Veterans Memorial, World War II Memorial, Lake Mead, Natchez Trace, Cape Cod — places where recreation, commuting adjacency, and civic pilgrimage overlap.</p>
<p class="art-p">Wilderness icons still matter culturally. They do not always win the raw visit count contest against metropolitan National Park Service units that function as public squares with better transit.</p>
<h2 id="how-the-field-is-spread" class="anchored">How regions spread visits</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Visitors by Region</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart3_distribution.png" role="img" aria-label="Visitors by Region"></div>
</figure>
<p class="art-p">Regional box plots show whether visitor consensus is shared or contested across NPS regions. Some regions host many modest units; others host a few magnets that dominate the regional total.</p>
<p class="art-p">Spread inside a region can exceed differences between region medians. A single gateway park can outdraw an entire cluster of remote units.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Visitors vs median by Region</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart4_gap.png" role="img" aria-label="Visitors vs median by Region"></div>
</figure>
<p class="art-p">On the gap chart, region <strong>NT</strong> sits about <strong>12,634,481</strong> above the median; <strong>AK</strong> trails by about <strong>142,104</strong>. Those gaps encode access and population gravity as much as scenic ranking — Alaska's vast parklands are not built for casual weekend volume.</p>
<p class="art-p">Reading the gap as a quality score would insult both the crowded memorials and the remote wilderness. It is a map of visitation pressure, not of beauty.</p>
<h2 id="concentration" class="anchored">Concentration of visits</h2>
<h3 id="concentration-look" class="anchored">The top 5 parkname entries account for 52% of the aggregate visitors</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/national-park-visits/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/national-park-visits/charts/chart_pareto.png" role="img" aria-label="The top 5 parkname entries account for 52% of the aggregate visitors"></div>
</figure>
<p class="art-p">The top five park-name entries account for <strong>52%</strong> of aggregate visitors in the working cut. A slight majority of the system's recorded traffic concentrates in a tiny head of names.</p>
<p class="art-p">Steep concentration means infrastructure stress, concession economics, and reservation politics will always be about a short list of places — even while the agency's mission statement names a much longer list.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and century-scale definition changes apply. Visitor counts are not unique individuals, and they are not measures of ecological impact by themselves.</p>
<p class="art-p">Findings describe structural signals about National Park Service visitation patterns in the file — not a complete conservation audit or a ranking of which landscapes matter most.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Park visitation is a growth story with a concentrated head: median traffic rose from thousands to near 200,000, while a handful of units still absorb roughly half of aggregate visits.</p>
<p class="art-p">The citable tension is access versus myth. America's most visited park units are often the ones closest to cities and memorials, not only the ones on the postcard wilderness calendar.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
