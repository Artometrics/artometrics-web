---
title: Who Ruled Rome Longest—and Did Dynasty Predict Tenure?
slug: roman-emperors
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Reign-length data test whether dynastic succession meant longer time on the
  throne.
heroImage: /images/content/articles/roman-emperors/hero.png
tags:
  - culture
draft: false
tldr: >-
  Reign-length data test whether dynastic succession meant longer time on the
  throne.
keyPoints:
  - 68 — Records in the working dataset
  - 6.50 — Median Reign years
  - 31.0 — Highest observed Reign years
  - Constantine the Great — Top Name by Reign years
  - Gordian — Most common Dynasty
faq:
  - question: >-
      What does “Constantine’s thirty-one years set the name-level ceiling”
      show?
    answer: 68 — Records in the working dataset
  - question: What does “The top dozen still sits far above the median emperor” show?
    answer: 6.50 — Median Reign years
  - question: 'What does “Dynasty boxes show contested, not uniform, tenure” show?'
    answer: 31.0 — Highest observed Reign years
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Sixty-eight emperors sit in this reign-length file — enough to ask a hard question about imperial power: did belonging to a dynasty buy more time on the throne, or did longevity come from something messier? The calibration point is a median reign of 6.50 years. That is not a long reign. It is the mathematical center of a political system that chewed through rulers faster than most modern institutions replace CEOs.</p>
<p class="art-p">The ceiling in the file is Constantine the Great at 31.0 reign years. Gordian is the dynasty label that appears most often. Between those two facts lies the real story: a few men held power for decades, while entire dynastic brands recycled short, fragile tenures. The charts that follow separate name-level longevity from dynasty-level structure so the two are not confused.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">68</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">6.50</span><span class="fact-label">Median Reign years</span></div>
  <div class="fact-box"><span class="fact-number">31.0</span><span class="fact-label">Highest observed Reign years</span></div>
  <div class="fact-box"><span class="fact-number">Constantine the Great</span><span class="fact-label">Top Name by Reign years</span></div>
  <div class="fact-box"><span class="fact-number">Gordian</span><span class="fact-label">Most common Dynasty</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">Reign spans are derived from start and end dates in the emperors table. Negative or zero spans are excluded, so the working metric is observed tenure in years, not a modeled life expectancy. The source is the TidyTuesday Roman Emperors release (2019-08-13), a community-cleaned historical table rather than a live prosopography API.</p>
<p class="art-p">Medians are preferred over means because reign distributions skew — a handful of long rulers pull averages up while the typical emperor sits near that 6.50-year center. Index-style fields (row numbers, sequential IDs) are kept out of metric selection so charts answer questions about tenure, not about how the spreadsheet was ordered.</p>

<h2 id="constantine-s-thirty-one-years-set-the-name-level-ceiling" class="anchored">Constantine’s thirty-one years set the name-level ceiling</h2>
<h3 id="constantine-s-thirty-one-years-set-the-name-level-ceiling-look" class="anchored">Reign years by Name</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/roman-emperors/charts/chart1_breakdown.png" role="img" aria-label="Reign years by Name"></div>
</figure>
<p class="art-p">Among named emperors in the breakdown, Constantine the Great leads at 31.0 reign years. At the other end of the plotted leaders, Valentinian II anchors the low end of that top group at 17.0 — still far above the file median of 6.50, which is the point: the chart of leaders is a curated upper slice, not the full distribution.</p>
<p class="art-p">Grouping by name makes the catalog’s major entities comparable on a single scale. The question is not who is famous, but who lasted. The gap between Constantine and the rest of the top tier already hints that longevity was exceptional rather than routine.</p>

<h2 id="the-top-dozen-still-sits-far-above-the-median-emperor" class="anchored">The top dozen still sits far above the median emperor</h2>
<h3 id="the-top-dozen-still-sits-far-above-the-median-emperor-look" class="anchored">Constantine the Great leads at 31.0 — 20.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/roman-emperors/charts/chart2_leaders.png" role="img" aria-label="Constantine the Great leads at 31.0 — 20.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Constantine the Great leads the ranked leaders chart at 31.0. Among that top dozen, the median is 20.0 — three times the full-file median of 6.50. Even the “typical” elite tenure in this slice is a different political animal from the typical emperor in the dataset.</p>
<p class="art-p">That separation matters for interpretation. Leaderboards describe the right tail. They do not describe Rome’s everyday succession reality, which lived closer to half a decade than to two decades.</p>

<h2 id="dynasty-boxes-show-contested-not-uniform-tenure" class="anchored">Dynasty boxes show contested, not uniform, tenure</h2>
<h3 id="dynasty-boxes-show-contested-not-uniform-tenure-look" class="anchored">Reign years by Dynasty</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/roman-emperors/charts/chart3_distribution.png" role="img" aria-label="Reign years by Dynasty"></div>
</figure>
<p class="art-p">When reign years are split by dynasty, the boxes do not collapse into a single shared consensus. Some houses stretch higher; others sit tighter and lower. The chart’s job is to show whether dynasty is a meaningful axis for tenure at all — and the spread says it is contested across tiers rather than deterministic.</p>
<p class="art-p">Read the boxes as structural signals: belonging to a named dynasty did not automatically purchase Constantine-length stability. It bought a distribution, and those distributions differ.</p>

<h2 id="nerva-antonine-sits-above-the-median-gordian-trails" class="anchored">Nerva–Antonine sits above the median; Gordian trails</h2>
<h3 id="nerva-antonine-sits-above-the-median-gordian-trails-look" class="anchored">Reign years vs median by Dynasty</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/roman-emperors/charts/chart4_gap.png" role="img" aria-label="Reign years vs median by Dynasty"></div>
</figure>
<p class="art-p">Relative to the file median, Nerva-Antonine sits 12.5 years above; Gordian trails by 4.00. That is the cleanest dynasty-level contrast in the gap chart: one house systematically above the center of the distribution, another systematically below.</p>
<p class="art-p">Gordian is also the most common dynasty label in the fact boxes — volume without longevity. Frequency of naming and length of rule are not the same political achievement.</p>

<h2 id="five-names-carry-forty-percent-of-aggregate-reign-years" class="anchored">Five names carry forty percent of aggregate reign years</h2>
<h3 id="five-names-carry-forty-percent-of-aggregate-reign-years-look" class="anchored">Cumulative Reign years</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/roman-emperors/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/roman-emperors/charts/chart_pareto.png" role="img" aria-label="Cumulative Reign years"></div>
</figure>
<p class="art-p">The Pareto curve shows concentration: the top five name entries account for 40% of the aggregate reign years in the working file. A steep head means a small set of long rulers dominates the sum, while the long tail of shorter reigns fills out the catalog without moving the total as much.</p>
<p class="art-p">That shape reframes the median. A 6.50-year center can coexist with a heavily concentrated aggregate if a few Constantine-scale tenures exist. Both facts are true; they answer different questions.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">This is a community-cleaned TidyTuesday snapshot, not a continuously updated classical-history database. Missing values, spelling variants, and week-of-export coverage limits apply. Reign years depend on how start and end dates were recorded and cleaned; disputed chronologies are not adjudicated here.</p>
<p class="art-p">Dynasty labels are editorial categories in the source table. Findings describe the file on hand — structural signals about tenure and dynasty in this emperors extract — not a complete political history of imperial Rome.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The file’s central tension is simple: the median emperor lasted 6.50 years, Constantine the Great lasted 31.0, and dynasty membership did not flatten that gap. Nerva–Antonine clears the median by a wide margin; Gordian, despite being the most common dynasty label, trails it.</p>
<p class="art-p">Use the charts as three separate instruments — name leaders, dynasty spreads, and concentration — rather than collapsing them into a single verdict about who ruled best. Longevity, frequency, and aggregate share each tell a different part of the succession story.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: Roman Emperors</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-08-13/emperors.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-08-13/emperors.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-08-13" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
