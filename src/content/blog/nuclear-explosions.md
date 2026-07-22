---
title: How Nuclear Test Yields Shifted Through the Atomic Age
slug: nuclear-explosions
pubDate: 2026-06-15T00:00:00.000Z
description: 'Historical test records map yield, purpose, and timing across decades.'
heroImage: /images/content/articles/nuclear-explosions/hero.png
tags:
  - culture
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Nuclear test histories are usually told as geopolitics. The event catalogs underneath — body-wave magnitudes, dates, purposes, and depths — also form a quantitative archive of how intensely states practiced the bomb.</p>
<p class="art-p">A TidyTuesday working extract of <strong>2,051</strong> records puts median body-wave magnitude at <strong>0.00</strong> and the highest observed magnitude at <strong>7.40</strong>. The <strong>USSR</strong> leads the country ranking by magnitude body in the fact box, and purpose code <strong>WR</strong> is the most common label. The year marker in the extract collapses to <strong>1970</strong> for one of the summary spans, so timeline charts should be read as the file's available event clock rather than a claim that testing happened only in a single year.</p>
<p class="art-p">Zeros in the magnitude field are not moral quiet. They are measurement gaps, non-detections, or unfilled cells that pull the median to the floor while a thin upper tail records the events that shook instruments hardest.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,051</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">0.00</span><span class="fact-label">Median Magnitude body</span></div>
  <div class="fact-box"><span class="fact-number">7.40</span><span class="fact-label">Highest observed Magnitude body</span></div>
  <div class="fact-box"><span class="fact-number">USSR</span><span class="fact-label">Top Country by Magnitude body</span></div>
  <div class="fact-box"><span class="fact-number">1970–1970</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">WR</span><span class="fact-label">Most common Purpose</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday nuclear explosions release maintained by the R for Data Science community. The working file assembles event-level rows with country labels, purpose codes, body-wave magnitude, depth, and related fields after cleaning.</p>
<p class="art-p">Medians are especially important here because missing and zero magnitudes dominate the center of the distribution. Charts export as Plotly JSON with PNG fallbacks. Public test catalogs are incomplete by nature; secrecy and uneven seismology both bite.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How magnitudes move through the record</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Magnitude body Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nuclear-explosions/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nuclear-explosions/charts/chart1_trend.png" role="img" aria-label="Median Magnitude body Over Time"></div>
</figure>
<p class="art-p">The time chart of median body-wave magnitude tracks how the typical recorded event sits across the file's date spine. Periods with denser instrumentation and more reported yields look different from periods dominated by missing magnitude cells.</p>
<p class="art-p">Read the curve as a history of what entered the public measurement record — not as a complete energy ledger of every device. Diplomatic moratoria and underground testing both change what seismology sees.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">INDIA leads at 5.00 — 2.50 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nuclear-explosions/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nuclear-explosions/charts/chart2_leaders.png" role="img" aria-label="INDIA leads at 5.00 — 2.50 marks the median among the top dozen"></div>
</figure>
<p class="art-p">On the highlighted leader cut, <strong>INDIA</strong> leads at <strong>5.00</strong>, with <strong>2.50</strong> as the median among the top dozen country entries. Related state labels in the broader ranking — USSR, China, Pakistan, France, USA, UK — remind readers that the nuclear club is small and that magnitude leadership in a cleaned table can reflect which events were well measured as much as which states tested most often.</p>
<p class="art-p">The USSR's fact-box lead by magnitude body and India's lead on this chart can both be true under different aggregations. Always name the cut before converting a bar into a hierarchy of arsenals.</p>
<h2 id="how-the-field-is-spread" class="anchored">Purpose spreads magnitudes</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Magnitude body by Purpose</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nuclear-explosions/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nuclear-explosions/charts/chart3_distribution.png" role="img" aria-label="Magnitude body by Purpose"></div>
</figure>
<p class="art-p">Box plots by purpose code show whether magnitude consensus is shared or contested across test categories. <strong>WR</strong> dominates headcount as the most common purpose label; other purpose codes may sit higher or lower on intensity even with fewer rows.</p>
<p class="art-p">Purpose is the political grammar of the catalog: weapons-related tests, peaceful nuclear explosion labels, and related codes are not interchangeable events even when they share an explosive physics.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Magnitude body vs median by Purpose</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nuclear-explosions/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nuclear-explosions/charts/chart4_gap.png" role="img" aria-label="Magnitude body vs median by Purpose"></div>
</figure>
<p class="art-p">The gap chart ranks purpose categories above or below the magnitude median. Categories that beat the median concentrate the instrumentally loud events; categories that trail are either genuinely smaller or more missingness-heavy.</p>
<p class="art-p">Because the file-wide median is 0.00, almost any filled magnitude will sit above the mathematical center. That is a data-structure warning as much as a physics finding.</p>
<h2 id="what-moves-together" class="anchored">Magnitude and depth</h2>
<h3 id="what-moves-together-look" class="anchored">Magnitude body vs Depth</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/nuclear-explosions/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/nuclear-explosions/charts/chart5_scatter.png" role="img" aria-label="Magnitude body vs Depth"></div>
</figure>
<p class="art-p">Plotting body-wave magnitude against depth shows clusters that averages erase. Atmospheric and surface events occupy different depth regimes from underground tests; the scatter is where those testing modes become visible.</p>
<p class="art-p">Depth is not a perfect proxy for political intent, but it is one of the cleanest engineering signatures in the archive. Combined with magnitude, it separates theater from concealment more clearly than country labels alone.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and incomplete yield reporting apply. A median magnitude of 0.00 is a missingness signal as much as a physical one.</p>
<p class="art-p">Findings describe structural signals in the public nuclear-test table — not a classified inventory, not a health study, and not a complete history of every device.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The nuclear test archive in this file is a skewed measurement story: 2,051 records, a median body-wave magnitude at zero because of gaps, and a thin upper tail that reaches 7.40.</p>
<p class="art-p">The citable lesson is double: a small set of states dominates the known record, and the record itself is shaped by what seismology and disclosure were willing to make countable.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
