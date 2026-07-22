---
title: Which Netflix Titles Consumed the Most Viewing Hours?
slug: netflix-engagement
pubDate: 2026-06-15T00:00:00.000Z
description: Engagement metrics Netflix reports show which titles absorbed the most hours.
heroImage: /images/content/articles/netflix-engagement/hero.png
tags:
  - movies-tv
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Netflix’s public engagement tables measure attention in hours viewed — a blunt but useful currency for which titles absorbed the most time on the service.</p>
<p class="art-p">The working file covers <strong>27,803</strong> records from <strong>2010–2025</strong>. Median hours viewed sit at <strong>2,500,000</strong>; the highest observed value is <strong>840,300,000</strong>. Squid Game: Season 2 tops the title ranking in the extract.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">27,803</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">2,500,000</span><span class="fact-label">Median Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">840,300,000</span><span class="fact-label">Highest observed Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">Squid Game: Season 2 // 오징어 </span><span class="fact-label">Top Title by Hours viewed</span></div>
  <div class="fact-box"><span class="fact-number">2010–2025</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">1_What_We_Watched_A_Netflix_</span><span class="fact-label">Most common Source</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">Engagement reports from Netflix’s weekly viewership releases — hours viewed, runtime, and global availability flags — arrive here via the TidyTuesday 2025-07-29 shows table.</p>
<p class="art-p">Source labels in the file distinguish engagement-report windows. Medians dampen mega-hit skew. Charts export as Plotly JSON with PNG fallbacks.</p>

<h2 id="how-the-pattern-changed-over-time" class="anchored">How the pattern changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Hours viewed Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-engagement/charts/chart1_trend.png" role="img" aria-label="Median Hours viewed Over Time"></div>
</figure>
<p class="art-p">Median hours viewed rises from 5,700,000 in the opening period to 6,700,000 at the close — a higher middle even as individual mega-hits define the headlines.</p>
<p class="art-p">Engagement tables mix report windows and title types; the trend is best read as a shift in the reported middle, not as a claim that every viewer watches more.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Squid Game: Season 2 // 오징어 게임: 시즌 2 leads at 730,100,000 — 411,000,000 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-engagement/charts/chart2_leaders.png" role="img" aria-label="Squid Game: Season 2 // 오징어 게임: 시즌 2 leads at 730,100,000 — 411,000,000 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Squid Game: Season 2 // 오징어 게임: 시즌 2 leads at 730,100,000 hours viewed. Among the top dozen, 411,000,000 marks the median — a head that is elevated, but not a single lonely spike.</p>
<p class="art-p">Global event titles still dominate the ceiling. Everything below that head is a long descent into ordinary catalog hours.</p>

<h2 id="how-the-field-is-spread" class="anchored">How the field is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Hours viewed by Source</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-engagement/charts/chart3_distribution.png" role="img" aria-label="Hours viewed by Source"></div>
</figure>
<p class="art-p">Hours viewed by engagement-report source show whether different publication windows share the same middle or disagree about typical scale.</p>
<p class="art-p">Report vintages are not identical instruments. Comparing boxes across sources is a way to see stability — or drift — in how Netflix’s tables describe the catalog.</p>

<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Hours viewed vs median by Source</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-engagement/charts/chart4_gap.png" role="img" aria-label="Hours viewed vs median by Source"></div>
</figure>
<p class="art-p">3_What_We_Watched_A_Netflix_Engagement_Report_2024Jan-Jun sits 100,000 above the median; 1_What_We_Watched_A_Netflix_Engagement_Report_2025Jan-Jun trails by 200,000.</p>
<p class="art-p">Those gaps are modest relative to the hundreds of millions at the title ceiling. Source-to-source differences matter most when interpreting medians across report windows.</p>

<h2 id="what-moves-together" class="anchored">What moves together</h2>
<h3 id="what-moves-together-look" class="anchored">Hours viewed vs Views</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-engagement/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-engagement/charts/chart5_scatter.png" role="img" aria-label="Hours viewed vs Views"></div>
</figure>
<p class="art-p">Hours viewed and views rise together for many titles, but runtime and completion behavior still leave clusters that a single ranking would hide.</p>
<p class="art-p">A short title can rack views without matching a long series’ hour total. The scatter is where that distinction shows up.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand — structural signals about reported Netflix engagement, not a full private ledger of every stream.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Hours viewed concentrate at the top: Squid Game: Season 2 leads at 730,100,000, while the file’s median sits at 2,500,000. Leaders, report-window gaps, and the hours-versus-views scatter each answer a different question about attention.</p>
<p class="art-p">Treat the charts as a map of published engagement tables — then check the source window before turning any title into a platform strategy claim.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2025). <em>TidyTuesday: Netflix Engagement</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-29/shows.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-29/shows.csv</a></p>

</main>
</div>
