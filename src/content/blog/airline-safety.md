---
title: Which Airlines Have the Worst Safety Records?
slug: airline-safety
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Carrier-level accident and fatality data ask which airlines stand out for poor
  safety outcomes.
heroImage: /images/content/articles/airline-safety/hero.png
tags:
  - cities-travel
draft: false
tldr: >-
  Carrier-level accident and fatality data ask which airlines stand out for poor
  safety outcomes.
keyPoints:
  - 336 — Records in the working dataset
  - '802,908,893 — Median Avail seat km per week'
  - '7,139,291,291 — Highest observed Avail seat km per week'
  - United / Continental* — Top Airline by Avail seat km per week
  - incidents — Most common Type of event
faq:
  - question: What does “Capacity Concentrates Among Megacarriers” show?
    answer: >-
      Key figure: 336 — Records in the working dataset. See the charts and
      sources in the report for the full evidence.
  - question: What does “The Same Names Dominate the Leader Board” show?
    answer: >-
      Key figure: 802,908,893 — Median Avail seat km per week. See the charts
      and sources in the report for the full evidence.
  - question: What does “Event Type Does Not Rewrite the Capacity Story” show?
    answer: >-
      Key figure: 7,139,291,291 — Highest observed Avail seat km per week. See
      the charts and sources in the report for the full evidence.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Airline safety is usually discussed one crash at a time. The TidyTuesday airline-safety extract does something different: it lines carriers up by available seat kilometers per week — a capacity metric — and then asks how incidents, fatal accidents, and fatalities sit against that scale. The working file holds <strong>336</strong> cleaned records after the week’s tables are merged.</p>
<p class="art-p">Capacity is not the same as risk, but it is the right denominator for a first cut. A carrier flying <strong>7.1 billion</strong> available seat kilometers per week is not in the same exposure class as one flying under <strong>2 billion</strong>. The median in this extract is <strong>802,908,893</strong> available seat kilometers per week — a calibration point for every ranking that follows.</p>
<p class="art-p">The most common event type in the file is simply labeled <strong>incidents</strong>. That matters: the archive mixes routine reportable events with rarer fatal outcomes, and treating those categories as interchangeable would flatten the story.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">336</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">802,908,893</span><span class="fact-label">Median Avail seat km per week</span></div>
  <div class="fact-box"><span class="fact-number">7,139,291,291</span><span class="fact-label">Highest observed Avail seat km per week</span></div>
  <div class="fact-box"><span class="fact-number">United / Continental*</span><span class="fact-label">Top Airline by Avail seat km per week</span></div>
  <div class="fact-box"><span class="fact-number">incidents</span><span class="fact-label">Most common Type of event</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release dated 2018-08-07 from the R for Data Science community. After merging the week’s CSV and XLSX tables, the working frame has 336 rows and five analysis columns used in these charts.</p>
<p class="art-p">Medians are preferred wherever available seat kilometers skew toward megacarriers. Index-style fields are excluded from metric selection. Charts ship as Plotly JSON with PNG fallbacks so values remain inspectable on hover.</p>
<h2 id="capacity-concentrates-among-megacarriers" class="anchored">Capacity Concentrates Among Megacarriers</h2>
<h3 id="capacity-concentrates-among-megacarriers-look" class="anchored">Avail seat km per week by Airline</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/airline-safety/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/airline-safety/charts/chart1_breakdown.png" role="img" aria-label="Avail seat km per week by Airline"></div>
</figure>
<p class="art-p">United / Continental* anchors the top of the capacity ladder at <strong>7,139,291,291</strong> available seat kilometers per week. Delta / Northwest* follows at about <strong>6.53 billion</strong>, then American* at <strong>5.23 billion</strong>. The next tier — Lufthansa*, Southwest, British Airways*, Air France — sits between roughly <strong>3.0 and 3.4 billion</strong>.</p>
<p class="art-p">That gap is structural. The top three merged U.S. brands occupy a different scale class from even large European flag carriers in this extract. When safety counts are later compared across airlines, those capacity differences are the first context any fair reading needs.</p>

<h2 id="the-same-names-dominate-the-leader-board" class="anchored">The Same Names Dominate the Leader Board</h2>
<h3 id="the-same-names-dominate-the-leader-board-look" class="anchored">United / Continental * leads at 7,139,291,291 — 3,091,881,806 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/airline-safety/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/airline-safety/charts/chart2_leaders.png" role="img" aria-label="United / Continental * leads at 7,139,291,291 — 3,091,881,806 marks the median among the top dozen"></div>
</figure>
<p class="art-p">The leaders chart restates the capacity hierarchy with a sharper claim: United / Continental* leads at <strong>7,139,291,291</strong>, while the median among the top dozen sits near <strong>3,091,881,806</strong>. Half the “elite” group is still less than half as large as the leader.</p>
<p class="art-p">In other words, “large airline” is not a single club. It is a steep pyramid. Any narrative that ranks raw incident counts without that pyramid will punish the biggest networks for existing.</p>

<h2 id="event-type-does-not-rewrite-the-capacity-story" class="anchored">Event Type Does Not Rewrite the Capacity Story</h2>
<h3 id="event-type-does-not-rewrite-the-capacity-story-look" class="anchored">Avail seat km per week by Type of event</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/airline-safety/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/airline-safety/charts/chart3_distribution.png" role="img" aria-label="Avail seat km per week by Type of event"></div>
</figure>
<p class="art-p">Box plots split available seat kilometers by event type — incidents, fatal_accidents, and fatalities. Each group shows the same median of <strong>802,908,893</strong> and the same max of <strong>7,139,291,291</strong> across 112 observations per box in this view.</p>
<p class="art-p">That congruence is the finding. Event labels do not sort carriers into different capacity worlds; the same megacarrier scale appears whether the row is tagged as an incident or a fatality record. The distribution is about who flies a lot, not about which label the row carries.</p>

<h2 id="gaps-to-the-median-are-flat-across-labels" class="anchored">Gaps to the Median Are Flat Across Labels</h2>
<h3 id="gaps-to-the-median-are-flat-across-labels-look" class="anchored">Avail seat km per week vs median by Type of event</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/airline-safety/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/airline-safety/charts/chart4_gap.png" role="img" aria-label="Avail seat km per week vs median by Type of event"></div>
</figure>
<p class="art-p">When available seat kilometers are compared to the sample median by event type, incidents, fatal_accidents, and fatalities all land at essentially zero gap in this chart. That is a stability check, not a dramatic ranking.</p>
<p class="art-p">The chart’s job is to stop a false story: that one event category is concentrated among unusually large or unusually small carriers. In this extract, the labels do not pull capacity away from the median.</p>

<h2 id="scale-and-event-counts-do-not-move-as-one-line" class="anchored">Scale and Event Counts Do Not Move as One Line</h2>
<h3 id="scale-and-event-counts-do-not-move-as-one-line-look" class="anchored">Avail seat km per week vs N events</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/airline-safety/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/airline-safety/charts/chart5_scatter.png" role="img" aria-label="Avail seat km per week vs N events"></div>
</figure>
<p class="art-p">Plotting available seat kilometers against the number of events reveals clusters the averages erase. Some mid-size carriers post high incident counts; some of the largest networks sit closer to moderate event totals relative to their seat-kilometer footprint.</p>
<p class="art-p">The fatality panel is especially uneven: the highest fatality totals in the scatter are not always the absolute capacity leaders. Exposure and outcome are related, but they are not a straight diagonal — which is exactly why capacity and counts must be read together.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">This is a community-cleaned TidyTuesday snapshot, not a live regulatory feed. Missing values, spelling variants on airline names (including starred merger labels), and week-of-export coverage limits all apply. Merged tables can duplicate or fan out rows when join keys are imperfect.</p>
<p class="art-p">Available seat kilometers measure exposure opportunity, not proven risk. The file cannot adjudicate which carriers are “safest” in a causal sense; it can only show how capacity and event tallies sit side by side in this extract.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The clearest signal is structural: a handful of megacarriers dominate available seat kilometers, with United / Continental* at the top and a median near <strong>803 million</strong> seat kilometers per week for the wider field.</p>
<p class="art-p">Event-type labels do not reorder that hierarchy. The useful question is not which airline has the most rows — it is how those rows scale against who actually flies the world’s seat kilometers.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Airline Safety</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-08-07/week19_airline_safety.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-08-07/week19_airline_safety.csv</a></p>
</main>
</div>
