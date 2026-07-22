---
title: Which Web Pages Load Fastest—and What Metrics Move Together?
slug: web-page-metrics
pubDate: 2026-06-15T00:00:00.000Z
description: Performance metrics show speed leaders and which technical measures correlate.
heroImage: /images/content/articles/web-page-metrics/hero.png
tags:
  - tech
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">The web’s performance story is a percentile story. This file holds 238 records spanning 2016–2022, with a median P50 of 5.97 and a high of 9.80. SpeedIndex leads the fact-box measure ranking; desktop is the most common client.</p>
<p class="art-p">The charts track how median P50 moved, how desktop and mobile differ, how P50 relates to P90, and how client–year heatmaps reveal drift. The calibration point is 5.97 — the center of the P50 field in this HTTP Archive-style extract.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">238</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">5.97</span><span class="fact-label">Median P50</span></div>
  <div class="fact-box"><span class="fact-number">9.80</span><span class="fact-label">Highest observed P50</span></div>
  <div class="fact-box"><span class="fact-number">speedIndex</span><span class="fact-label">Top Measure by P50</span></div>
  <div class="fact-box"><span class="fact-number">2016–2022</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">desktop</span><span class="fact-label">Most common Client</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">HTTP Archive-style page-weight metrics by client (desktop/mobile) and measure type, aggregated as percentile bands. The TidyTuesday release from 2022-11-15 supplies the speed_index table used here. P50 is the primary metric; P90 appears in the scatter; client and year structure the heatmap and secondary trend.</p>
<p class="art-p">Medians are used across skewed performance distributions. Index-style fields are excluded from metric selection.</p>

<h2 id="median-p50-fell-as-pages-got-faster-at-the-center" class="anchored">Median P50 fell as pages got faster at the center</h2>
<h3 id="median-p50-fell-as-pages-got-faster-at-the-center-look" class="anchored">Median P50 Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/web-page-metrics/charts/chart1_trend.png" role="img" aria-label="Median P50 Over Time"></div>
</figure>
<p class="art-p">Median P50 falls from 7.00 in the opening period to 4.80 at the close — improvement at the center of the distribution across 2016–2022 in this extract. Lower P50 is the direction performance work aims for.</p>
<p class="art-p">A falling median is the headline trend. Client splits and heatmaps check whether both desktop and mobile shared that improvement.</p>

<h2 id="desktop-and-mobile-split-the-p50-distribution" class="anchored">Desktop and mobile split the P50 distribution</h2>
<h3 id="desktop-and-mobile-split-the-p50-distribution-look" class="anchored">P50 by Client</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/web-page-metrics/charts/chart3_distribution.png" role="img" aria-label="P50 by Client"></div>
</figure>
<p class="art-p">Category boxes by client show whether P50 consensus is shared or contested between desktop and mobile. Desktop is the most common client label by frequency; the boxes ask how the metric spreads inside each client.</p>
<p class="art-p">Client is the first structural cut in web performance. A single median of 5.97 mixes two device worlds unless the boxes separate them.</p>

<h2 id="p50-and-p90-move-together-in-performance-space" class="anchored">P50 and P90 move together in performance space</h2>
<h3 id="p50-and-p90-move-together-in-performance-space-look" class="anchored">P50 vs P90</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/web-page-metrics/charts/chart5_scatter.png" role="img" aria-label="P50 vs P90"></div>
</figure>
<p class="art-p">Plotting P50 against P90 shows clusters that averages erase. Sites (or aggregates) with similar medians can still diverge in the tail — and P90 is where that tail becomes visible.</p>
<p class="art-p">The scatter is the relationship map between typical and worse-case percentile bands in this 238-row file.</p>

<h2 id="a-client-year-heatmap-shows-where-speed-migrated" class="anchored">A client–year heatmap shows where speed migrated</h2>
<h3 id="a-client-year-heatmap-shows-where-speed-migrated-look" class="anchored">P50 by Client × year</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart_heatmap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/web-page-metrics/charts/chart_heatmap.png" role="img" aria-label="P50 by Client × year"></div>
</figure>
<p class="art-p">Heatmaps expose which client tiers heated up or cooled down across the timeline. Single-year bars hide drift; the grid shows structural migration between categories from 2016 through 2022.</p>
<p class="art-p">Read the heatmap as a calendar of performance regimes — desktop versus mobile across years — rather than as a single slogan about the web getting faster.</p>

<h2 id="a-secondary-trend-confirms-the-same-downward-drift" class="anchored">A secondary trend confirms the same downward drift</h2>
<h3 id="a-secondary-trend-confirms-the-same-downward-drift-look" class="anchored">Median P50 Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/web-page-metrics/charts/chart_alt_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/web-page-metrics/charts/chart_alt_trend.png" role="img" aria-label="Median P50 Over Time"></div>
</figure>
<p class="art-p">A secondary trend cut shows median P50 moving from 7.00 to 4.80 across the span — the same directional story as the primary trend. Parallel exports are useful as confirmation when the pipeline ships more than one time chart.</p>
<p class="art-p">Together with the heatmap, the repeated trend says the center of P50 improved even as client structure still needs separate reading.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live HTTP Archive queries. Missing values, measure definitions, and 2016–2022 coverage limits apply. Percentile bands are aggregates, not individual page traces.</p>
<p class="art-p">Findings describe this web-page-metrics extract — structural signals about P50 and related bands — not a complete Core Web Vitals audit of the modern web.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">P50 in this file centers on 5.97 and falls from 7.00 to 4.80 at the median — a faster center of the distribution across 2016–2022.</p>
<p class="art-p">Desktop versus mobile boxes, P50–P90 clusters, and the client–year heatmap show that the improvement is real at the center and still structured by device and year.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2022). <em>TidyTuesday: Web Page Metrics</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-15/speed_index.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-15/speed_index.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-11-15" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
