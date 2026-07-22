---
title: How Long Do CEOs Last Before They Leave?
slug: ceo-departures
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Thousands of executive-exit records measure tenure length and how departures
  cluster.
heroImage: /images/content/articles/ceo-departures/hero.png
tags:
  - business
draft: false
tldr: >-
  CEO tenure is usually narrated as drama: a firing, a founder exit, a sudden
  interim. The TidyTuesday departures extract used here holds 9,423 records with
  a median max tenure (ceodb) of 1.00 and a high of 4.00 . Interim is the most
  common co-CEO/interim label in the file. That median of 1.00 is the
  calibration point: in this coding, many departure spells are short.
keyPoints:
  - '9,423 — Records in the working dataset'
  - 1.00 — Median Max tenure ceodb
  - 4.00 — Highest observed Max tenure ceodb
  - PHOTRONICS INC — Top Coname by Max tenure ceodb
  - Interim — Most common Interim coceo
faq:
  - question: >-
      What does the data show about longer Max Tenures Are Rare in the Company
      Ranking?
    answer: >-
      Key figure: 9,423 — Records in the working dataset. The source is the
      TidyTuesday release from 2021-04-27 (departures.csv). After cleaning,
      9,423 rows remain.
  - question: What does the data show about the Top Dozen Caps Out Quickly?
    answer: >-
      Key figure: 1.00 — Median Max tenure ceodb. The source is the TidyTuesday
      release from 2021-04-27 (departures.csv). After cleaning, 9,423 rows
      remain.
  - question: What does the data show about interim Labels Dominate the Category Mix?
    answer: >-
      Key figure: 4.00 — Highest observed Max tenure ceodb. The source is the
      TidyTuesday release from 2021-04-27 (departures.csv). After cleaning,
      9,423 rows remain.
  - question: What does the data show about gaps to the Median Are Mostly Flat?
    answer: >-
      Key figure: PHOTRONICS INC — Top Coname by Max tenure ceodb. The source is
      the TidyTuesday release from 2021-04-27 (departures.csv). After cleaning,
      9,423 rows remain.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">CEO tenure is usually narrated as drama: a firing, a founder exit, a sudden interim. The TidyTuesday departures extract used here holds <strong>9,423</strong> records with a median max tenure (ceodb) of <strong>1.00</strong> and a high of <strong>4.00</strong>. Interim is the most common co-CEO/interim label in the file.</p>
<p class="art-p">That median of 1.00 is the calibration point: in this coding, many departure spells are short. The charts ask which company names show longer max tenures, how interim versus co-CEO labels differ, and whether tenure fields move together.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">9,423</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1.00</span><span class="fact-label">Median Max tenure ceodb</span></div>
  <div class="fact-box"><span class="fact-number">4.00</span><span class="fact-label">Highest observed Max tenure ceodb</span></div>
  <div class="fact-box"><span class="fact-number">PHOTRONICS INC</span><span class="fact-label">Top Coname by Max tenure ceodb</span></div>
  <div class="fact-box"><span class="fact-number">Interim</span><span class="fact-label">Most common Interim coceo</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-04-27 (departures.csv). After cleaning, 9,423 rows remain.</p>
<p class="art-p">Max tenure ceodb is the primary ranked metric. Interim/co-CEO spelling variants appear as separate categories in places and should be read as label noise as well as structure. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="longer-max-tenures-are-rare-in-the-company-ranking" class="anchored">Longer Max Tenures Are Rare in the Company Ranking</h2>
<h3 id="longer-max-tenures-are-rare-in-the-company-ranking-look" class="anchored">Max tenure ceodb by Coname</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/ceo-departures/charts/chart1_breakdown.png" role="img" aria-label="Max tenure ceodb by Coname"></div>
</figure>
<p class="art-p">Stewart Information Services and Conversant Inc lead the company view at <strong>2.50</strong> on max tenure ceodb. A wider set of firms — Avatex, Intrepid Potash, Bergen Brunswig, SEACOR, Micro Warehouse, RH — cluster at <strong>2.00</strong>.</p>
<p class="art-p">Relative to the file median of 1.00, even these “leaders” are only modestly longer spells. Extended CEO tenure is the exception in this extract, not the rule.</p>

<h2 id="the-top-dozen-caps-out-quickly" class="anchored">The Top Dozen Caps Out Quickly</h2>
<h3 id="the-top-dozen-caps-out-quickly-look" class="anchored">CONVERSANT INC leads at 2.50 — 2.00 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/ceo-departures/charts/chart2_leaders.png" role="img" aria-label="CONVERSANT INC leads at 2.50 — 2.00 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Conversant Inc appears among the leaders at <strong>2.50</strong>, and the median among the top dozen is <strong>2.00</strong>. There is no long tail of decade-scale max tenures in this particular ranking metric.</p>
<p class="art-p">Cite 2.00 as the elite-club median for max tenure ceodb here — double the overall median, still short by popular mythologies of imperial CEOs.</p>

<h2 id="interim-labels-dominate-the-category-mix" class="anchored">Interim Labels Dominate the Category Mix</h2>
<h3 id="interim-labels-dominate-the-category-mix-look" class="anchored">Max tenure ceodb by Interim coceo</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/ceo-departures/charts/chart3_distribution.png" role="img" aria-label="Max tenure ceodb by Interim coceo"></div>
</figure>
<p class="art-p">Interim accounts for <strong>218</strong> boxed observations with a median max tenure of <strong>1.0</strong> and a mean near <strong>1.23</strong>. CO-CEO shows <strong>85</strong> rows with the same median of 1.0 but a slightly higher mean (~<strong>1.4</strong>). Smaller capitalization variants of co-CEO are tiny samples.</p>
<p class="art-p">The archive is thick with interim spells. That is a succession-system fact: departures often pass through temporary authority before a permanent appointment.</p>

<h2 id="gaps-to-the-median-are-mostly-flat" class="anchored">Gaps to the Median Are Mostly Flat</h2>
<h3 id="gaps-to-the-median-are-mostly-flat-look" class="anchored">Max tenure ceodb vs median by Interim coceo</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/ceo-departures/charts/chart4_gap.png" role="img" aria-label="Max tenure ceodb vs median by Interim coceo"></div>
</figure>
<p class="art-p">Most interim/co-CEO labels sit at a zero gap to the median on max tenure ceodb in this chart, with only a thinly populated CO-ceo variant showing a positive gap of <strong>1.0</strong>.</p>
<p class="art-p">Category labels do not produce a dramatic tenure hierarchy here. The bigger story remains how many spells are coded interim at all.</p>

<h2 id="tenure-fields-track-closely-within-labels" class="anchored">Tenure Fields Track Closely Within Labels</h2>
<h3 id="tenure-fields-track-closely-within-labels-look" class="anchored">Max tenure ceodb vs Tenure no ceodb</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/ceo-departures/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/ceo-departures/charts/chart5_scatter.png" role="img" aria-label="Max tenure ceodb vs Tenure no ceodb"></div>
</figure>
<p class="art-p">Max tenure ceodb versus tenure no ceodb, colored by interim/co-CEO label, largely follows a tight correspondence — points hug aligned values, especially in the interim cloud (n=218).</p>
<p class="art-p">Where the two tenure fields disagree, coding definitions matter more than boardroom legend. The scatter is a consistency check on the file’s tenure construction.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Tenure fields are database constructions, not calendar biographies. Spelling variants of co-CEO fragment categories. Firm name changes and dual-class structures can split identities.</p>
<p class="art-p">A median of 1.00 may reflect coding granularity as much as “CEOs only last a year.” Read the metric definition before converting it into a headline about corporate instability.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">In 9,423 departure records, max tenure ceodb centers at 1.00, with company-level leaders only reaching 2.0–2.5. Interim is the dominant succession label.</p>
<p class="art-p">The citable story is institutional: departure files are full of short and interim spells, not a museum of decades-long reigns.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: CEO Departures</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-04-27/departures.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-04-27/departures.csv</a></p>
</main>
</div>
