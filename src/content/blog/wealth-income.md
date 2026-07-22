---
title: How Concentrated Is Wealth at the Top of the Distribution?
slug: wealth-income
pubDate: 2026-06-15T00:00:00.000Z
description: Wealth and income shares measure how assets pile up at the upper end.
heroImage: /images/content/articles/wealth-income/hero.png
tags:
  - business
draft: false
tldr: >-
  Income distribution is how a society counts who sits where. This file holds
  2,916 records spanning 1967–2019, with a median income-distribution value of
  10.9 and a high of 27.2. Black Alone appears in the fact-box race ranking;
  Under $15,000 is the most common income bracket label.
keyPoints:
  - '2,916 — Records in the working dataset'
  - 10.9 — Median Income distribution
  - 27.2 — Highest observed Income distribution
  - Black Alone — Top Race by Income distribution
  - 1967–2019 — Year span covered in the file
  - 'Under $15,000 — Most common Income bracket'
faq:
  - question: >-
      What does the data show about The median income-distribution marker
      drifted upward?
    answer: >-
      Key figure: 2,916 — Records in the working dataset. The source is the
      TidyTuesday release from 2021-02-09 (R for Data Science community). The
      working file contains 2,916 rows and 10 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Hispanic (Any Race) leads the charted race
      ladder?
    answer: >-
      Key figure: 10.9 — Median Income distribution. The source is the
      TidyTuesday release from 2021-02-09 (R for Data Science community). The
      working file contains 2,916 rows and 10 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Income brackets carve different distribution
      bands?
    answer: >-
      Key figure: 27.2 — Highest observed Income distribution. The source is the
      TidyTuesday release from 2021-02-09 (R for Data Science community). The
      working file contains 2,916 rows and 10 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Mid brackets clear the median; high brackets
      trail in this cut?
    answer: >-
      Key figure: Black Alone — Top Race by Income distribution. The source is
      the TidyTuesday release from 2021-02-09 (R for Data Science community).
      The working file contains 2,916 rows and 10 columns after merging
      available tables in the…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Income distribution is how a society counts who sits where. This file holds 2,916 records spanning 1967–2019, with a median income-distribution value of 10.9 and a high of 27.2. Black Alone appears in the fact-box race ranking; Under $15,000 is the most common income bracket label.</p>
<p class="art-p">The charts track how the median moved, which race categories lead, how brackets sit relative to the median, and how income distribution relates to income median. The calibration point is 10.9 — the center of the distribution field in this extract.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,916</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">10.9</span><span class="fact-label">Median Income distribution</span></div>
  <div class="fact-box"><span class="fact-number">27.2</span><span class="fact-label">Highest observed Income distribution</span></div>
  <div class="fact-box"><span class="fact-number">Black Alone</span><span class="fact-label">Top Race by Income distribution</span></div>
  <div class="fact-box"><span class="fact-number">1967–2019</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Under $15,000</span><span class="fact-label">Most common Income bracket</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-02-09 (R for Data Science community). The working file contains 2,916 rows and 10 columns after merging available tables in the week folder. Income distribution is the primary metric; race and income bracket are categorical axes; income median appears in the scatter.</p>
<p class="art-p">Medians are used for robustness across skewed economic series. Index-style fields are excluded from metric selection.</p>

<h2 id="the-median-income-distribution-marker-drifted-upward" class="anchored">The median income-distribution marker drifted upward</h2>
<h3 id="the-median-income-distribution-marker-drifted-upward-look" class="anchored">Median Income distribution Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wealth-income/charts/chart1_trend.png" role="img" aria-label="Median Income distribution Over Time"></div>
</figure>
<p class="art-p">Median income distribution rises from 10.9 in the opening period to 11.2 at the close — a small but measurable lift around the file median. The center of this field did not explode; it edged higher across the long window.</p>
<p class="art-p">Modest median drift can coexist with large bracket-level gaps. The trend chart reports the center; the gap chart reports the structure underneath.</p>

<h2 id="hispanic-any-race-leads-the-charted-race-ladder" class="anchored">Hispanic (Any Race) leads the charted race ladder</h2>
<h3 id="hispanic-any-race-leads-the-charted-race-ladder-look" class="anchored">Hispanic (Any Race) leads at 12.0 — 10.7 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wealth-income/charts/chart2_leaders.png" role="img" aria-label="Hispanic (Any Race) leads at 12.0 — 10.7 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Hispanic (Any Race) leads at 12.0, while 10.7 marks the median among the top dozen race categories in this cut. Black Alone remains a fact-box landmark for the ranking rule used there; the leaders chart makes the numeric top of this aggregation explicit.</p>
<p class="art-p">The ladder is tight near the center of the file — leaders sit close to the overall median of 10.9 rather than in a different statistical universe.</p>

<h2 id="income-brackets-carve-different-distribution-bands" class="anchored">Income brackets carve different distribution bands</h2>
<h3 id="income-brackets-carve-different-distribution-bands-look" class="anchored">Income distribution by Income bracket</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wealth-income/charts/chart3_distribution.png" role="img" aria-label="Income distribution by Income bracket"></div>
</figure>
<p class="art-p">Category boxes by income bracket show whether the income-distribution field is shared or contested across dollar bands. Under $15,000 is the most common bracket label by frequency; the boxes ask how the metric spreads inside each band.</p>
<p class="art-p">Bracket structure is the skeleton of inequality analysis in this file. A single median of 10.9 hides those band-level differences.</p>

<h2 id="mid-brackets-clear-the-median-high-brackets-trail-in-this-cut" class="anchored">Mid brackets clear the median; high brackets trail in this cut</h2>
<h3 id="mid-brackets-clear-the-median-high-brackets-trail-in-this-cut-look" class="anchored">Income distribution vs median by Income bracket</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wealth-income/charts/chart4_gap.png" role="img" aria-label="Income distribution vs median by Income bracket"></div>
</figure>
<p class="art-p">$50,000 to $74,999 sits 6.60 above the median; $150,000 to $199,999 trails by 6.70. Those signed gaps are among the starkest bracket contrasts in the extract.</p>
<p class="art-p">Trailing or leading the median here is a statement about the income-distribution field’s values by bracket, not a casual claim about who is “richer” in narrative terms. Cite the signed distances as structural offsets.</p>

<h2 id="distribution-values-and-income-medians-form-joint-clusters" class="anchored">Distribution values and income medians form joint clusters</h2>
<h3 id="distribution-values-and-income-medians-form-joint-clusters-look" class="anchored">Income distribution vs Income median</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/wealth-income/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/wealth-income/charts/chart5_scatter.png" role="img" aria-label="Income distribution vs Income median"></div>
</figure>
<p class="art-p">Plotting income distribution against income median shows clusters that averages erase. Race-year points co-locate in patterns that a single summary cannot hold.</p>
<p class="art-p">The scatter is relational: it shows how the two income fields move together across the 1967–2019 extract.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live Census microdata APIs. Missing values, race and bracket labeling choices, and 1967–2019 coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe this wealth-and-income extract — structural signals about the income-distribution field — not a complete wealth account including assets and debt.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Income distribution in this file centers on 10.9, edges up to 11.2 at the median, and still shows sharp bracket gaps — mid bands above the median, top dollar bands trailing in this metric’s signed distances.</p>
<p class="art-p">Race ladders and the distribution–median scatter add group and joint structure. Together they map concentration and composition without reducing fifty years of income data to a single slogan.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: Wealth and Income</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-02-09/income_distribution.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-02-09/income_distribution.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-02-09" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
