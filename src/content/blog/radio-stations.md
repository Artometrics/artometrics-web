---
title: How U.S. Radio Formats Map Across the Dial
slug: radio-stations
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Station-level format data chart where music, talk, and niche programming
  concentrate.
heroImage: /images/content/articles/radio-stations/hero.png
tags:
  - music
draft: false
tldr: >-
  Station-level format data chart where music, talk, and niche programming
  concentrate.
keyPoints:
  - '17,186 — Records in the working dataset'
  - 101 — Median Frequency
  - '1,700 — Highest observed Frequency'
  - WEUP — Top Call sign by Frequency
  - Country — Most common Format
faq:
  - question: What does “Frequency by call sign” show?
    answer: '17,186 — Records in the working dataset'
  - question: What does “Who sits at the top” show?
    answer: 101 — Median Frequency
  - question: What does “Frequency by format” show?
    answer: '1,700 — Highest observed Frequency'
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">American radio still looks chaotic from the passenger seat — call letters, dial numbers, format slogans. The station license table underneath is more orderly: tens of thousands of rows that map frequency, format, and status across the dial.</p>
<p class="art-p">A TidyTuesday working file of <strong>17,186</strong> records puts median frequency at <strong>101</strong> and the highest observed frequency at <strong>1,700</strong>. <strong>WEUP</strong> leads the call-sign ranking by frequency in the fact box, and <strong>Country</strong> is the most common format label.</p>
<p class="art-p">Frequency leaders at the top of the AM band are a different story from format share. The charts separate the physics of the dial from the culture of the playlist.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">17,186</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">101</span><span class="fact-label">Median Frequency</span></div>
  <div class="fact-box"><span class="fact-number">1,700</span><span class="fact-label">Highest observed Frequency</span></div>
  <div class="fact-box"><span class="fact-number">WEUP</span><span class="fact-label">Top Call sign by Frequency</span></div>
  <div class="fact-box"><span class="fact-number">Country</span><span class="fact-label">Most common Format</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2022-11-08 (R for Data Science community). The working file contains 17,186 rows and 11 columns after cleaning — call signs, frequencies, formats, and license status fields among them.</p>
<p class="art-p">Medians stabilize a dial that mixes FM-looking centers with AM extremes. Charts export as Plotly JSON with PNG fallbacks. A license row is not a ratings book; it is permission to exist on the dial.</p>
<h2 id="breakdown" class="anchored">Frequency by call sign</h2>
<h3 id="breakdown-look" class="anchored">Frequency by Call sign</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/radio-stations/charts/chart1_breakdown.png" role="img" aria-label="Frequency by Call sign"></div>
</figure>
<p class="art-p">At the high end of the call-sign frequency cut, stations such as <strong>WJCC</strong> appear near <strong>1,700</strong>, with neighbors such as <strong>KGED</strong> near <strong>1,680</strong>. Those are upper-AM coordinates, not a claim about audience size.</p>
<p class="art-p">Grouping by call sign exposes how the metric varies across licensed identities. It is a map of where stations sit on the spectrum, not which morning shows win their cities.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Top Call sign</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/radio-stations/charts/chart2_leaders.png" role="img" aria-label="Top Call sign"></div>
</figure>
<p class="art-p">On the leader chart, <strong>WJCC</strong> leads at <strong>1,700</strong>, with <strong>1,695</strong> as the median among the top dozen. The entire top band is a tight cluster of high-AM assignments.</p>
<p class="art-p">That tightness is the finding: the top of frequency is a narrow technical neighborhood, while format diversity lives on a different axis entirely.</p>
<h2 id="how-the-field-is-spread" class="anchored">Frequency by format</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Frequency by Format</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/radio-stations/charts/chart3_distribution.png" role="img" aria-label="Frequency by Format"></div>
</figure>
<p class="art-p">Box plots by format — Country, News/Talk, Sports, Classic Hits, and related labels — show whether frequency consensus is shared or contested across programming types. Country leads headcount; it does not automatically own the highest dial positions.</p>
<p class="art-p">Format is culture; frequency is spectrum. Confusing the two produces false stories about which genres rule the airwaves.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Frequency vs median by Format</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/radio-stations/charts/chart4_gap.png" role="img" aria-label="Frequency vs median by Format"></div>
</figure>
<p class="art-p"><strong>News/Talk</strong> sits <strong>1,039</strong> above the median on the gap chart; <strong>Contemporary Christian</strong> trails by about <strong>9</strong>. News/Talk's elevation reflects its heavy presence on AM frequencies far above the FM-centered median of 101.</p>
<p class="art-p">The gap is a band-plan story as much as a format story. Talk radio's historic AM home pulls its frequency distribution into a different universe from music formats clustered on FM.</p>
<h2 id="concentration" class="anchored">Concentration on the dial</h2>
<h3 id="concentration-look" class="anchored">The top 5 call sign entries account for 34% of the aggregate frequency</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/radio-stations/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/radio-stations/charts/chart_pareto.png" role="img" aria-label="The top 5 call sign entries account for 34% of the aggregate frequency"></div>
</figure>
<p class="art-p">The top five call-sign entries account for <strong>34%</strong> of aggregate frequency in the working cut — a concentration statistic that mostly reflects how large the highest dial numbers are relative to the median, not a claim that five stations own a third of listening.</p>
<p class="art-p">Read Pareto-on-frequency cautiously. It is a reminder that summing dial positions is not the same as summing audiences.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and license-status quirks apply. Frequency is not listenership, and format labels can be stale or contested.</p>
<p class="art-p">Findings describe structural signals about U.S. radio station metadata — not a ratings analysis, and not a complete history of every translator and HD multicast.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The U.S. radio dial in this file is a median-101 world with AM extremes near 1,700, Country as the most common format, and News/Talk pulled high by AM band placement.</p>
<p class="art-p">The citable split is spectrum versus culture: call-sign frequency leaders and format share leaders are answering different questions about the same airwaves.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
