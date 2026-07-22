---
title: Which U.S. PhD Fields Expanded Fastest?
slug: us-phds
pubDate: 2026-06-15T00:00:00.000Z
description: Doctorate production data show which disciplines grew quickest.
heroImage: /images/content/articles/us-phds/hero.png
tags:
  - business
draft: false
tldr: >-
  U.S. doctorate production is a labor-market story told in field counts. This
  file holds 3,370 records spanning 2008–2017, with a median of 85.0 PhDs and a
  high of 5,302. Social sciences lead the fact-box field ranking; life sciences
  appear among the notable broad fields.
keyPoints:
  - '3,370 — Records in the working dataset'
  - 85.0 — Median N phds
  - '5,302 — Highest observed N phds'
  - Social sciences — Top Field by N phds
  - 2008–2017 — Year span covered in the file
  - Life sciences — Most common Broad field
faq:
  - question: >-
      What does the data show about Median doctorate counts edged upward across
      the decade?
    answer: >-
      Key figure: 3,370 — Records in the working dataset. The source is the
      TidyTuesday release from 2019-02-19 (R for Data Science community). The
      working file contains 3,370 rows and 6 columns after merging available
      tables in the week…
  - question: What does the data show about Social sciences lead the field ladder?
    answer: >-
      Key figure: 85.0 — Median N phds. The source is the TidyTuesday release
      from 2019-02-19 (R for Data Science community). The working file contains
      3,370 rows and 6 columns after merging available tables in the week…
  - question: >-
      What does the data show about Broad fields do not share one production
      band?
    answer: >-
      Key figure: 5,302 — Highest observed N phds. The source is the TidyTuesday
      release from 2019-02-19 (R for Data Science community). The working file
      contains 3,370 rows and 6 columns after merging available tables in the
      week…
  - question: >-
      What does the data show about Psychology and social sciences clear the
      median; engineering trails?
    answer: >-
      Key figure: Social sciences — Top Field by N phds. The source is the
      TidyTuesday release from 2019-02-19 (R for Data Science community). The
      working file contains 3,370 rows and 6 columns after merging available
      tables in the week…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">U.S. doctorate production is a labor-market story told in field counts. This file holds 3,370 records spanning 2008–2017, with a median of 85.0 PhDs and a high of 5,302. Social sciences lead the fact-box field ranking; life sciences appear among the notable broad fields.</p>
<p class="art-p">The question is which disciplines grew — and which sit above or below the median production level — when doctorate output is measured year by year and field by field. Medians keep a few giant programs from dictating every comparison.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">3,370</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">85.0</span><span class="fact-label">Median N phds</span></div>
  <div class="fact-box"><span class="fact-number">5,302</span><span class="fact-label">Highest observed N phds</span></div>
  <div class="fact-box"><span class="fact-number">Social sciences</span><span class="fact-label">Top Field by N phds</span></div>
  <div class="fact-box"><span class="fact-number">2008–2017</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Life sciences</span><span class="fact-label">Most common Broad field</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-02-19 (R for Data Science community). The working file contains 3,370 rows and 6 columns after merging available tables in the week folder. N phds is the primary metric; broad field is the main categorical axis.</p>
<p class="art-p">Medians are used because field sizes skew. Index-style fields are excluded from metric selection. Charts track trend, leaders, distribution, gaps to the median, and concentration across fields.</p>

<h2 id="median-doctorate-counts-edged-upward-across-the-decade" class="anchored">Median doctorate counts edged upward across the decade</h2>
<h3 id="median-doctorate-counts-edged-upward-across-the-decade-look" class="anchored">Median N phds Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-phds/charts/chart1_trend.png" role="img" aria-label="Median N phds Over Time"></div>
</figure>
<p class="art-p">Median n phds rises from 80.0 in the opening period to 87.0 at the close — a modest climb around the file median of 85.0. The typical field-year in this extract produced slightly more doctorates by the end of the window than at the start.</p>
<p class="art-p">A rising median is not the same as uniform growth. Leader fields can surge while smaller programs move little; the trend chart reports the center, not every discipline’s path.</p>

<h2 id="social-sciences-lead-the-field-ladder" class="anchored">Social sciences lead the field ladder</h2>
<h3 id="social-sciences-lead-the-field-ladder-look" class="anchored">Social sciences leads at 4,944 — 915 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-phds/charts/chart2_leaders.png" role="img" aria-label="Social sciences leads at 4,944 — 915 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Social sciences leads at 4,944 PhDs in the leaders cut, while 915 marks the median among the top dozen. The distance between first place and that top-dozen median shows how quickly the ladder drops even inside the upper tier.</p>
<p class="art-p">Fact-box highlights place social sciences at the top of the field ranking and note life sciences among the broad-field landmarks. The chart makes the numeric gap concrete.</p>

<h2 id="broad-fields-do-not-share-one-production-band" class="anchored">Broad fields do not share one production band</h2>
<h3 id="broad-fields-do-not-share-one-production-band-look" class="anchored">N phds by Broad field</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-phds/charts/chart3_distribution.png" role="img" aria-label="N phds by Broad field"></div>
</figure>
<p class="art-p">Category boxes by broad field show whether doctorate counts are shared or contested across disciplinary families. Psychology and social sciences, engineering, life sciences, and others occupy different parts of the distribution.</p>
<p class="art-p">The boxes are the right tool when fields differ in scale. A single national median of 85.0 hides those family-level spreads.</p>

<h2 id="psychology-and-social-sciences-clear-the-median-engineering-trails" class="anchored">Psychology and social sciences clear the median; engineering trails</h2>
<h3 id="psychology-and-social-sciences-clear-the-median-engineering-trails-look" class="anchored">N phds vs median by Broad field</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-phds/charts/chart4_gap.png" role="img" aria-label="N phds vs median by Broad field"></div>
</figure>
<p class="art-p">Psychology and social sciences sits 30.5 above the median; engineering trails by 21.5. Those signed gaps convert broad-field boxes into distance from the file center.</p>
<p class="art-p">Trailing the median is not a quality judgment. It is a statement about relative volume in this extract’s n phds metric.</p>

<h2 id="five-fields-hold-most-of-the-aggregate-doctorates" class="anchored">Five fields hold most of the aggregate doctorates</h2>
<h3 id="five-fields-hold-most-of-the-aggregate-doctorates-look" class="anchored">Cumulative N phds</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-phds/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-phds/charts/chart_pareto.png" role="img" aria-label="Cumulative N phds"></div>
</figure>
<p class="art-p">The top five field entries account for 63% of the aggregate n phds. Concentration is high: a small set of fields drives most of the summed doctorate production in the file.</p>
<p class="art-p">Steep Pareto curves mean capacity and attention cluster. The long tail of smaller fields still matters for the ecosystem, but it does not dominate the total.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live NSF Survey of Earned Doctorates APIs. Missing values, field-name variants, and 2008–2017 coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe this U.S. PhDs extract — structural signals about doctorate counts by field — not a full labor-market forecast or ranking of program quality.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Doctorate production in this file centers on a median of 85.0, edges up from 80.0 to 87.0 over the window, and concentrates heavily: five fields hold 63% of aggregate n phds.</p>
<p class="art-p">Social sciences lead the upper ladder, psychology and social sciences sit well above the median, and engineering trails it — a volume map of disciplines, not a prestige contest.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: US PhDs Awarded</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-02-19/phd_by_field.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-02-19/phd_by_field.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-02-19" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
