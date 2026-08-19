---
title: Medium posts at 4 minutes median — does length predict claps?
slug: medium-articles
author: kyle-mcauliffe
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  78,388 Medium articles from 2017–2018 show median reading time of 4 minutes; scatter plots reveal no clean law linking length to applause.
heroImage: /images/content/articles/medium-articles/hero.png
draft: false
tags:
  - science
  - tech
tldr: >-
  Medium's metadata trail — reading time, claps, publication tags — lets the platform's length-versus-attention promise be tested. A TidyTuesday extract of 78,388 articles from 2017–2018 shows median reading time at 4.00 minutes, with one chess-mastery post reaching 100 minutes. Longer posts sometimes earn more claps, but the scatter is noisy enough that length alone is not a reliable applause machine.
keyPoints:
  - '78,388 — Medium article records in the working dataset'
  - '4.00 — Median reading time in minutes across the full file'
  - '100 — Highest observed reading time, a month-long chess quest that anchors the extreme tail'
  - '2017–2018 — Year span covered, before major paywall and algorithm shifts'
  - 'Towards Data Science — Most common publication in the extract'
  - 'No clean law — Length and claps correlate noisily; genre and publication norms matter as much as minutes'
faq:
  - question: >-
      How many Medium articles are in this dataset?
    answer: >-
      78,388 article records from 2017–2018, released via TidyTuesday.
  - question: >-
      What is the median reading time for Medium posts?
    answer: >-
      4.00 minutes — most posts are short explainers, not hour-long essays.
  - question: >-
      Do longer Medium posts get more claps?
    answer: >-
      Sometimes, but the relationship is noisy; genre and publication explain as much as length.
  - question: >-
      Which publication appears most often in this dataset?
    answer: >-
      Towards Data Science is the most common publication label.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">Medium's median reading time sits at 4.00 minutes across 78,388 articles from 2017–2018 — a short-form default that holds steady even as a thin tier of hour-scale essays pushes the right tail past 100 minutes.</p>
<p class="art-p">The open question is whether longer posts earned more applause. Reading time and claps are related enough to chart and messy enough that a single correlation will not settle the culture of the platform. The highest observed reading time — 100 minutes — belongs to a month-long chess-mastery quest; Towards Data Science is the most common publication label in the file.</p>
<p class="art-p">The metadata trail — reading time, claps, publication tags — lets that promise be tested without reading every essay. Scatter plots reveal no clean law linking length to applause.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">78,388</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">4.00</span><span class="fact-label">Median Reading time</span></div>
  <div class="fact-box"><span class="fact-number">100</span><span class="fact-label">Highest observed Reading time</span></div>
  <div class="fact-box"><span class="fact-number">My month-long quest to becom</span><span class="fact-label">Top Title by Reading time</span></div>
  <div class="fact-box"><span class="fact-number">2017–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Towards Data Science</span><span class="fact-label">Most common Publication</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-12-04 (R for Data Science community). The working file contains 78,388 rows and 22 columns after assembly — titles, publications, reading time, claps, and related metadata.</p>
<p class="art-p">Medians stabilize a distribution with a long right tail of mega-posts. Charts export as Plotly JSON with PNG fallbacks. Reading time is a platform estimate, not a stopwatch on every reader.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How reading time moved</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Reading time Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/medium-articles/charts/chart1_trend.png" role="img" aria-label="Median Reading time Over Time"></div>
</figure>
<p class="art-p">Across the 2017–2018 window, median reading time stays near 4.00 minutes from opening period to close. Stability at the median does not mean the tails were quiet — only that the typical post length did not shift during the snapshot.</p>
<p class="art-p">A flat median is still informative: whatever clap dynamics existed in this period were not driven by a wholesale move toward longer or shorter default essays.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top of length</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">My month-long quest to become a chess master from scratch leads at 100 — 68.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/medium-articles/charts/chart2_leaders.png" role="img" aria-label="My month-long quest to become a chess master from scratch leads at 100 — 68.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">My month-long quest to become a chess master from scratch leads at 100 minutes of estimated reading time. The median among the top dozen is 68.0 — more than fifteen times the file-wide median of 4 minutes.</p>
<p class="art-p">Deep-learning lesson writeups, AI alignment podcasts, and longform data essays populate the same extreme band. The length frontier of Medium in this file is a specialist pedagogy genre as much as a literary one.</p>
<h2 id="how-the-field-is-spread" class="anchored">How publications spread length</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Reading time by Publication</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/medium-articles/charts/chart3_distribution.png" role="img" aria-label="Reading time by Publication"></div>
</figure>
<p class="art-p">Publication box plots show whether reading-time consensus is shared or contested across houses. Some publications cluster tightly around short explainers; others tolerate or encourage long technical serials.</p>
<p class="art-p">Towards Data Science's frequency as the most common publication does not make it the longest. Volume of posts and length of posts are different editorial strategies that coexist under one brand.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Reading time vs median by Publication</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/medium-articles/charts/chart4_gap.png" role="img" aria-label="Reading time vs median by Publication"></div>
</figure>
<p class="art-p">Towards Data Science sits 2.00 minutes above the median on the gap chart; Data Driven Investor trails by 0.00 in the highlighted comparison — effectively on the median line in that cut.</p>
<p class="art-p">Publication gaps of a couple of minutes sound small until you remember the median is only four. A two-minute lift is a 50% longer typical article in that house's mix.</p>
<h2 id="what-moves-together" class="anchored">Reading time and claps</h2>
<h3 id="what-moves-together-look" class="anchored">Reading time vs Claps</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/medium-articles/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/medium-articles/charts/chart5_scatter.png" role="img" aria-label="Reading time vs Claps"></div>
</figure>
<p class="art-p">Plotting reading time against claps shows clusters that averages erase. Many short posts earn modest applause; some long posts earn a lot; some long posts earn almost none. Length is not a reliable applause machine.</p>
<p class="art-p">If there is a relationship, it is noisy and genre-dependent. Tutorial serials and viral short takes can both succeed. The scatter kills the slogan that longer always wins without replacing it with the opposite.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and 2017–2018 coverage limits apply. Claps are a platform-specific applause metric, not revenue or unique readers.</p>
<p class="art-p">Findings describe structural signals about Medium article metadata in the release window — not a complete theory of online writing incentives after paywalls, algorithms, and audience shifts.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Most Medium posts in this file are short: median reading time of four minutes. A thin upper tier stretches to hour-scale essays, especially in technical and quest narratives.</p>
<p class="art-p">The citable answer to the title question is cautious: longer posts sometimes earn more claps, but the scatter refuses a clean law. Publication norms and genre explain as much as length alone.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>