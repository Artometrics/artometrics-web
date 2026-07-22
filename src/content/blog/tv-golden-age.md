---
title: When Did Prestige TV Peak—and Did Critics Agree?
slug: tv-golden-age
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Golden-age scores compare critical and audience verdicts as prestige TV rose
  and cooled.
heroImage: /images/content/articles/tv-golden-age/hero.png
tags:
  - movies-tv
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2019-01-08</strong> release on <strong>TV Golden Age</strong> — <strong>2,266</strong> rows after cleaning and merge. When did prestige TV peak — and did critics agree with audiences?</p>
<p class="art-p">Five charts track <strong>Av rating</strong> across time, category, and named entities — trend, leaders, distribution, tiers, and relationships. Where companion files exist in the repo, they are joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,266</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8.11</span><span class="fact-label">Median Av rating</span></div>
  <div class="fact-box"><span class="fact-number">9.68</span><span class="fact-label">Highest observed Av rating</span></div>
  <div class="fact-box"><span class="fact-number">Parenthood</span><span class="fact-label">Top Title by Av rating</span></div>
  <div class="fact-box"><span class="fact-number">1990–2018</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source is the TidyTuesday release from <strong>2019-01-08</strong> (R for Data Science community). This working file contains <strong>2,266</strong> rows and <strong>8</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<p class="art-p"><strong>How to read this report:</strong> start with the chart caption, then ask what the metric actually means, what a non-expert should notice first, and what an expert would challenge in the source. The goal is not to memorize every number; it is to leave with a sharper question than the one you arrived with.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="chart-1-trend" class="anchored">TREND</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart1_trend.png" role="img" aria-label="Median Av rating Over Time"></div>
</figure>
<p class="art-p">Median av rating is <strong>rising</strong> from <strong>7.86</strong> in the opening period to <strong>8.15</strong> at the close.</p>
<p class="art-p">Annual medians filter one-off spikes so the structural slope — not viral outliers — drives the story.</p>
<h2 id="chart-2-leaders" class="anchored">LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart2_leaders.png" role="img" aria-label="Touched by an Angel leads at 9.60 — 9.24 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>Touched by an Angel</strong> leads at <strong>9.60</strong> — <strong>9.24</strong> marks the median among the top dozen.</p>
<p class="art-p">Head-of-field concentration is where quality, scale, or brand visibly separates from the pack.</p>
<h2 id="chart-3-distribution" class="anchored">DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart3_distribution.png" role="img" aria-label="Av rating Distribution"></div>
</figure>
<p class="art-p">Median <strong>8.11</strong> vs mean <strong>8.06</strong> — the shape is relatively symmetric.</p>
<p class="art-p">The top decile begins at <strong>8.79</strong>; that tail is where defining cases live.</p>
<h2 id="chart-4-leader-trends" class="anchored">LEADER TRENDS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart4_leader_trends.png" role="img" aria-label="Top Title Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes.</p>
<h2 id="chart-5-relationship" class="anchored">SUPPLEMENT — RELATIONSHIP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart5_scatter.png" role="img" aria-label="Av rating vs SeasonNumber"></div>
</figure>
<p class="art-p">Joint plot of <strong>av rating</strong> and <strong>seasonnumber</strong> surfaces clusters the averages erase.</p>
<p class="art-p">Bubble size tracks repeat presence — outliers are archetypes, not noise.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p>Findings describe the file on hand — treat them as structural signals about <strong>TV Golden Age</strong>, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Read as a teaching map, <strong>TV Golden Age</strong> shows why one metric is rarely enough: leaders, tails, trends, and relationships each answer a different question about av rating.</p>
<p>The best reading is modest: use the chart to sharpen the question, then check the source and limits before turning it into a claim.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2019). <em>TidyTuesday: TV Golden Age</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-01-08" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
