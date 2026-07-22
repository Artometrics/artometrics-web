---
title: Which States Show Up at the Ballot Box?
slug: us-voter-turnout
pubDate: 2026-06-15T00:00:00.000Z
description: Election turnout data compare state participation rates.
heroImage: /images/content/articles/us-voter-turnout/hero.png
tags:
  - business
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2018-10-09</strong> release on <strong>US Voter Turnout</strong> — <strong>936</strong> rows after cleaning and merge. Which states show up — and how did turnout move across elections?</p>
<p class="art-p">Five charts track <strong>Votes</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">936</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,170,867</span><span class="fact-label">Median Votes</span></div>
  <div class="fact-box"><span class="fact-number">132,609,063</span><span class="fact-label">Highest observed Votes</span></div>
  <div class="fact-box"><span class="fact-number">United States</span><span class="fact-label">Top State by Votes</span></div>
  <div class="fact-box"><span class="fact-number">1980–2014</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2018-10-09</strong> (R for Data Science community). This working file contains <strong>936</strong> rows and <strong>7</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart1_trend.png" role="img" aria-label="Median Votes Over Time"></div>
</figure>
<p class="art-p">Median votes is <strong>rising</strong> from <strong>910,290</strong> in the opening period to <strong>1,387,622</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart2_leaders.png" role="img" aria-label="United States leads at 90,912,015 — 4,209,538 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>United States</strong> leads at <strong>90,912,015</strong> — <strong>4,209,538</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart3_distribution.png" role="img" aria-label="Median 1,170,867 vs mean 3,074,280 — the shape is right-skewed"></div>
</figure>
<p class="art-p">Median <strong>1,170,867</strong> vs mean <strong>3,074,280</strong> — the shape is right-skewed.</p>
<p class="art-p">The top decile begins at <strong>4,659,000</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-leader-trends" class="anchored">LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart4_leader_trends.png" role="img" aria-label="Top State Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart5_scatter.png" role="img" aria-label="Votes vs Eligible voters"></div>
</figure>
<p class="art-p">Joint plot of <strong>votes</strong> and <strong>eligible voters</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>US Voter Turnout</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>US Voter Turnout</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about votes.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: US Voter Turnout</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-09/voter_turnout.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-09/voter_turnout.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-10-09" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
