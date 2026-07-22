---
title: Which Shows Dominated Emmy Season—and How Lopsided Was It?
slug: emmy-awards
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Nomination and win records reveal which series swept hardware—and how
  concentrated awards became.
heroImage: /images/content/articles/emmy-awards/hero.png
tags:
  - movies-tv
draft: false
tldr: >-
  Emmy season looks like a parade of equal contenders. Nomination and win
  records look more like a concentration map — a few names return year after
  year while most titles appear once and vanish. The working file holds 29,678
  records from 1957–2021 . Nominee is the most common type label — as expected
  in a nominations-heavy extract.
keyPoints:
  - '29,678 — Records in the working dataset'
  - 1957–2021 — Year span covered in the file
  - Nominee — Most common Type
faq:
  - question: What does the data show about Landscape?
    answer: >-
      Key figure: 29,678 — Records in the working dataset. The source is the
      TidyTuesday release from 2021-09-21 (R for Data Science community). The
      working file contains 29,678 rows and 11 columns after merging available
      tables in the week folder.
  - question: What does the data show about Volume?
    answer: >-
      Key figure: 1957–2021 — Year span covered in the file. The source is the
      TidyTuesday release from 2021-09-21 (R for Data Science community). The
      working file contains 29,678 rows and 11 columns after merging available
      tables in the week folder.
  - question: Who sits at the top?
    answer: >-
      Key figure: Nominee — Most common Type. The source is the TidyTuesday
      release from 2021-09-21 (R for Data Science community). The working file
      contains 29,678 rows and 11 columns after merging available tables in the
      week folder.
  - question: What does the data show about Category?
    answer: >-
      The source is the TidyTuesday release from 2021-09-21 (R for Data Science
      community). The working file contains 29,678 rows and 11 columns after
      merging available tables in the week folder.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Emmy season looks like a parade of equal contenders. Nomination and win records look more like a concentration map — a few names return year after year while most titles appear once and vanish.</p>
<p class="art-p">The working file holds <strong>29,678</strong> records from <strong>1957–2021</strong>. Nominee is the most common type label — as expected in a nominations-heavy extract.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">29,678</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1957–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Nominee</span><span class="fact-label">Most common Type</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-09-21 (R for Data Science community). The working file contains 29,678 rows and 11 columns after merging available tables in the week folder.</p>
<p class="art-p">Charts export as Plotly JSON with PNG fallbacks. Counts by type, period, and recurring name are the main instruments — this table is about volume and recurrence more than a single quality score.</p>

<h2 id="landscape" class="anchored">Landscape</h2>
<h3 id="landscape-look" class="anchored">Nominee dominates with 23,739 records</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart1_category.png" role="img" aria-label="Nominee dominates with 23,739 records"></div>
</figure>
<p class="art-p">Nominee dominates with 23,739 records. The file is built around nomination rows; wins and other type labels sit in a thinner slice.</p>
<p class="art-p">That imbalance is structural, not a finding about taste. Any leaderboard drawn from this extract is mostly a leaderboard of how often names enter the nominee column.</p>

<h2 id="volume" class="anchored">Volume</h2>
<h3 id="volume-look" class="anchored">Records By Period</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart1_volume.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart1_volume.png" role="img" aria-label="Records By Period"></div>
</figure>
<p class="art-p">Activity peaks in 2019 with 2,613 records — the densest year in the span.</p>
<p class="art-p">Period-level counts show when Emmy paperwork thickened: more categories, more programs, more named credits. Volume is the first clue that awards seasons are not equally crowded across decades.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Saturday Night Live appears 859 times — the most recurring name in the file</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart2_leaders.png" role="img" aria-label="Saturday Night Live appears 859 times — the most recurring name in the file"></div>
</figure>
<p class="art-p">Saturday Night Live appears 859 times — the most recurring name in the file. The top dozen account for a visible share of all 29,678 rows.</p>
<p class="art-p">Long-running variety and franchise programs accumulate nominations the way long careers accumulate credits. Dominance here is recurrence, not a single sweep night.</p>

<h2 id="category" class="anchored">Category</h2>
<h3 id="category-look" class="anchored">Nominee is the largest bucket with 23,739 records</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart3_category.png" role="img" aria-label="Nominee is the largest bucket with 23,739 records"></div>
</figure>
<p class="art-p">Nominee is again the largest bucket with 23,739 records. Category concentration shows where editorial attention should focus first when reading the table.</p>
<p class="art-p">If the question is “who swept,” separate win rows carefully. If the question is “who kept getting invited,” this nominee-heavy landscape is the right map.</p>

<h2 id="timeline" class="anchored">Timeline</h2>
<h3 id="timeline-look" class="anchored">Leaders Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/emmy-awards/charts/chart4_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/emmy-awards/charts/chart4_timeline.png" role="img" aria-label="Leaders Over Time"></div>
</figure>
<p class="art-p">Leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking counts over time separates sustained presence from one-off spikes. A show that dominates a single ceremony is a different data shape from a name that returns for decades.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand — structural signals about Emmy nomination volume and recurrence through 2021, not a complete aesthetic history of television.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Emmy concentration shows up as recurrence: Saturday Night Live at 859 appearances, a nominee column that holds 23,739 of 29,678 rows, and a 2019 peak of 2,613 records. Leaders, volume, and timelines each answer a different question about how lopsided the season became.</p>
<p class="art-p">Use the charts to separate invitation from victory — then check the type field before treating any name as a sweep.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: Emmy Awards</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-21/nominees.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-09-21/nominees.csv</a></p>

</main>
</div>
