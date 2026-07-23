---
title: Which States Show Up at the Ballot Box?
slug: us-voter-turnout
pubDate: 2026-06-15T00:00:00.000Z
description: Election turnout data compare state participation rates.
heroImage: /images/content/articles/us-voter-turnout/hero.png
draft: false
tags:
  - civics
  - politics
tldr: >-
  Turnout is democracy’s volume knob. This file holds 936 election records
  spanning 1980–2014, with a median of 1,170,867 votes and a high of
  132,609,063. United States appears as the top entity by votes in the fact
  boxes — a national aggregate sitting above the state ladder.
keyPoints:
  - 936 — Records in the working dataset
  - '1,170,867 — Median Votes'
  - '132,609,063 — Highest observed Votes'
  - United States — Top State by Votes
  - 1980–2014 — Year span covered in the file
faq:
  - question: >-
      What does the data show about Median votes rose across three decades of
      elections?
    answer: >-
      Key figure: 936 — Records in the working dataset. The source is the
      TidyTuesday release from 2018-10-09 (R for Data Science community). The
      working file contains 936 rows and 7 columns after merging available
      tables in the week…
  - question: >-
      What does the data show about The United States total dwarfs the state
      ladder?
    answer: >-
      Key figure: 1,170,867 — Median Votes. The source is the TidyTuesday
      release from 2018-10-09 (R for Data Science community). The working file
      contains 936 rows and 7 columns after merging available tables in the
      week…
  - question: >-
      What does the data show about A right-skewed distribution with a heavy
      upper tail?
    answer: >-
      Key figure: 132,609,063 — Highest observed Votes. The source is the
      TidyTuesday release from 2018-10-09 (R for Data Science community). The
      working file contains 936 rows and 7 columns after merging available
      tables in the week…
  - question: >-
      What does the data show about Leading states reshuffle across election
      cycles?
    answer: >-
      Key figure: United States — Top State by Votes. The source is the
      TidyTuesday release from 2018-10-09 (R for Data Science community). The
      working file contains 936 rows and 7 columns after merging available
      tables in the week…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Turnout is democracy’s volume knob. This file holds 936 election records spanning 1980–2014, with a median of 1,170,867 votes and a high of 132,609,063. United States appears as the top entity by votes in the fact boxes — a national aggregate sitting above the state ladder.</p>
<p class="art-p">The charts separate trend, leaders, distribution shape, leader trajectories, and the relationship between votes and eligible voters. The calibration point is that 1.17 million median: below it, smaller states; above it, larger electorates and national totals.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">936</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,170,867</span><span class="fact-label">Median Votes</span></div>
  <div class="fact-box"><span class="fact-number">132,609,063</span><span class="fact-label">Highest observed Votes</span></div>
  <div class="fact-box"><span class="fact-number">United States</span><span class="fact-label">Top State by Votes</span></div>
  <div class="fact-box"><span class="fact-number">1980–2014</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-10-09 (R for Data Science community). The working file contains 936 rows and 7 columns after merging available tables in the week folder. Votes is the primary metric; eligible voters appears in the scatter; state (and national totals) are the entity axis.</p>
<p class="art-p">Medians are essential because vote totals are right-skewed — mean 3,074,280 against median 1,170,867. Index-style fields are excluded from metric selection.</p>

<h2 id="median-votes-rose-across-three-decades-of-elections" class="anchored">Median votes rose across three decades of elections</h2>
<h3 id="median-votes-rose-across-three-decades-of-elections-look" class="anchored">Median Votes Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart1_trend.png" role="img" aria-label="Median Votes Over Time"></div>
</figure>
<p class="art-p">Median votes rises from 910,290 in the opening period to 1,387,622 at the close. Population growth, eligibility changes, and which elections enter the file all can lift the center; the observed trend in this extract is upward.</p>
<p class="art-p">A rising median is the shared backdrop. Leader states and national totals amplify it; smaller jurisdictions still sit inside a shifting distribution.</p>

<h2 id="the-united-states-total-dwarfs-the-state-ladder" class="anchored">The United States total dwarfs the state ladder</h2>
<h3 id="the-united-states-total-dwarfs-the-state-ladder-look" class="anchored">United States leads at 90,912,015 — 4,209,538 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart2_leaders.png" role="img" aria-label="United States leads at 90,912,015 — 4,209,538 marks the median among the top dozen"></div>
</figure>
<p class="art-p">United States leads at 90,912,015 votes in the leaders cut, while 4,209,538 marks the median among the top dozen. The national row is not comparable to a single state on equal footing; it is the aggregate ceiling in the file.</p>
<p class="art-p">Fact boxes also list 132,609,063 as the highest observed votes — the extreme of the same national-scale phenomenon. State comparisons live far below that ceiling.</p>

<h2 id="a-right-skewed-distribution-with-a-heavy-upper-tail" class="anchored">A right-skewed distribution with a heavy upper tail</h2>
<h3 id="a-right-skewed-distribution-with-a-heavy-upper-tail-look" class="anchored">Median 1,170,867 vs mean 3,074,280 — the shape is right-skewed</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart3_distribution.png" role="img" aria-label="Median 1,170,867 vs mean 3,074,280 — the shape is right-skewed"></div>
</figure>
<p class="art-p">Median 1,170,867 versus mean 3,074,280 — the shape is right-skewed. Large states and national totals pull the average up. The top decile begins at 4,659,000; that is where defining high-volume cases live.</p>
<p class="art-p">Skew is why turnout debates should lead with medians and rates, not raw means of vote totals alone.</p>

<h2 id="leading-states-reshuffle-across-election-cycles" class="anchored">Leading states reshuffle across election cycles</h2>
<h3 id="leading-states-reshuffle-across-election-cycles-look" class="anchored">Top State Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart4_leader_trends.png" role="img" aria-label="Top State Over Time"></div>
</figure>
<p class="art-p">Leader trends show that leading names do not move in lockstep — some fade as others surge. Tracking votes over time separates sustained high-volume states from cycle-specific spikes.</p>
<p class="art-p">Presidential versus midterm composition in the file can rearrange the ladder even when the long-run median is rising.</p>

<h2 id="votes-scale-with-eligible-voters-in-clusters" class="anchored">Votes scale with eligible voters — in clusters</h2>
<h3 id="votes-scale-with-eligible-voters-in-clusters-look" class="anchored">Votes vs Eligible voters</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/us-voter-turnout/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/us-voter-turnout/charts/chart5_scatter.png" role="img" aria-label="Votes vs Eligible voters"></div>
</figure>
<p class="art-p">Plotting votes against eligible voters shows clusters that averages erase. Larger eligibility pools produce larger vote totals, but the scatter’s texture reveals how tightly that relationship holds across states and years.</p>
<p class="art-p">The joint view is the right place to think about turnout as a rate problem without inventing a rate column the charts do not show: eligibility and votes move together, and the clusters show where.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live election boards. Missing values, jurisdiction naming variants, and 1980–2014 coverage limits apply. National and state rows may coexist in ways that require care when ranking.</p>
<p class="art-p">Findings describe this voter-turnout extract — structural signals about vote totals — not a complete model of registration law, suppression, or mobilization.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Vote totals in this file are right-skewed around a median of 1,170,867, rising from 910,290 to 1,387,622 at the median, with national rows reaching into the tens and hundreds of millions.</p>
<p class="art-p">State ladders reshuffle over time, and votes move with eligible voters in clusters — a volume atlas of American elections from 1980 through 2014.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: US Voter Turnout</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-09/voter_turnout.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-09/voter_turnout.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-10-09" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
