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
<p class="art-p">Prestige television arrived with a soundtrack of superlatives. Season-level ratings ask a quieter question: when did the golden-age scores actually peak — and did the middle of the field rise with the mythology?</p>
<p class="art-p">The working file holds <strong>2,266</strong> records from <strong>1990–2018</strong>. Median average rating is <strong>8.11</strong>; the highest observed average is <strong>9.68</strong>. Parenthood leads the title ranking in the extract.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,266</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8.11</span><span class="fact-label">Median Av rating</span></div>
  <div class="fact-box"><span class="fact-number">9.68</span><span class="fact-label">Highest observed Av rating</span></div>
  <div class="fact-box"><span class="fact-number">Parenthood</span><span class="fact-label">Top Title by Av rating</span></div>
  <div class="fact-box"><span class="fact-number">1990–2018</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-01-08 (R for Data Science community) — the IMDb / Economist TV ratings extract. The working file contains 2,266 rows and 8 columns after merging available tables in the week folder.</p>
<p class="art-p">Charts export as Plotly JSON with PNG fallbacks. Medians handle skew; season numbers join ratings so longevity can be plotted against score.</p>

<h2 id="how-the-pattern-changed-over-time" class="anchored">How the pattern changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Av rating Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart1_trend.png" role="img" aria-label="Median Av rating Over Time"></div>
</figure>
<p class="art-p">Median average rating rises from 7.86 in the opening period to 8.15 at the close — a gentle climb across the so-called golden age window.</p>
<p class="art-p">That is not a claim that every show got better. It is the middle of the scoreboard edging upward while prestige TV became a cultural brand.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Touched by an Angel leads at 9.60 — 9.24 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart2_leaders.png" role="img" aria-label="Touched by an Angel leads at 9.60 — 9.24 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Touched by an Angel leads at 9.60; 9.24 marks the median among the top dozen. The head of the board is densely packed at the high end.</p>
<p class="art-p">High averages can reflect passionate rater pools as much as critical consensus. Read the leaders as the file’s ceiling, then compare them to the 8.11 median that describes the typical row.</p>

<h2 id="how-the-field-is-spread" class="anchored">How the field is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Av rating Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart3_distribution.png" role="img" aria-label="Av rating Distribution"></div>
</figure>
<p class="art-p">Median 8.11 versus mean 8.06 — the shape is relatively symmetric. The top decile begins at 8.79; that tail is where defining cases live.</p>
<p class="art-p">A near-symmetric prestige-TV scoreboard is itself a finding: the golden-age rhetoric often implies a thin elite and a wide mediocrity. This distribution is tighter than that story suggests.</p>

<h2 id="leader-trends" class="anchored">Leader Trends</h2>
<h3 id="leader-trends-look" class="anchored">Top Title Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart4_leader_trends.png" role="img" aria-label="Top Title Over Time"></div>
</figure>
<p class="art-p">Leading names do not move in lockstep — some fade as others surge.</p>
<p class="art-p">Tracking medians over time separates sustained dominance from one-off spikes. A peak season is not the same data shape as a long plateau above 8.</p>

<h2 id="what-moves-together" class="anchored">What moves together</h2>
<h3 id="what-moves-together-look" class="anchored">Av rating vs SeasonNumber</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/tv-golden-age/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/tv-golden-age/charts/chart5_scatter.png" role="img" aria-label="Av rating vs SeasonNumber"></div>
</figure>
<p class="art-p">Average rating and season number show clusters that a single average would erase — early-season highs, late-season drift, and shows that hold the middle across many seasons.</p>
<p class="art-p">Longevity and quality are related but not identical. The scatter is where that distinction becomes visible.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand — structural signals about prestige-TV ratings through 2018, not a complete canon of the streaming era that followed.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The median climbed from 7.86 toward 8.15 while the overall middle stayed near 8.11 — a golden age that looks less like a sudden leap and more like a raised floor. Leaders near 9.6 and a top decile from 8.79 show how much room remains above the typical row.</p>
<p class="art-p">Read trends, distribution, and season scatter together before treating any single title as proof that critics and audiences agreed.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: TV Golden Age</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-01-08/IMDb_Economist_tv_ratings.csv</a></p>

</main>
</div>
