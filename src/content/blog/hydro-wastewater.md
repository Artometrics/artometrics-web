---
title: Where Wastewater Plants Serve the Most People
slug: hydro-wastewater
pubDate: 2026-06-15T00:00:00.000Z
description: Facility-level data map which plants serve the largest populations.
heroImage: /images/content/articles/hydro-wastewater/hero.png
tags:
  - cities-travel
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Wastewater plants are the unglamorous infrastructure of modern density. They turn the output of cities into something rivers and coasts can sometimes absorb — and the HydroWASTE-style plant register makes that system countable.</p>
<p class="art-p">The working TidyTuesday extract holds <strong>58,502</strong> records. Median waste discharge (<strong>WASTE DIS</strong>) sits at <strong>1,079</strong>; the highest observed value exceeds <strong>3,073,754</strong>. The United States leads on aggregate discharge in the country rollup, while <strong>Secondary</strong> treatment is the most common level label in the file.</p>
<p class="art-p">Scale without treatment level is an incomplete story. A large plant with advanced treatment is a different civic object from a large plant stuck at primary or secondary standards.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">58,502</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,079</span><span class="fact-label">Median WASTE DIS</span></div>
  <div class="fact-box"><span class="fact-number">3,073,754</span><span class="fact-label">Highest observed WASTE DIS</span></div>
  <div class="fact-box"><span class="fact-number">United States</span><span class="fact-label">Top COUNTRY by WASTE DIS</span></div>
  <div class="fact-box"><span class="fact-number">Secondary</span><span class="fact-label">Most common LEVEL</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2022-09-20 (R for Data Science community). The working file contains 58,502 rows and 25 columns after merging available tables — country, treatment level, discharge, and related quality fields among them.</p>
<p class="art-p">Medians handle skew from a handful of enormous plants. Charts export as Plotly JSON with PNG fallbacks. Status labels such as operational, proposed, or decommissioned matter for interpretation: not every row is an active civic asset.</p>
<h2 id="breakdown" class="anchored">Discharge by country</h2>
<h3 id="breakdown-look" class="anchored">WASTE DIS by COUNTRY</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hydro-wastewater/charts/chart1_breakdown.png" role="img" aria-label="WASTE DIS by COUNTRY"></div>
</figure>
<p class="art-p">Country rollups of waste discharge put high-intensity systems in view. In the chart's highlighted comparison band, <strong>Singapore</strong> leads near <strong>223,683</strong> on the displayed metric while <strong>Nicaragua</strong> anchors a lower end near <strong>33,649</strong> — a reminder that country averages mix plant size, urban concentration, and reporting coverage.</p>
<p class="art-p">The United States leads the fact-box country ranking by aggregate discharge, which is a different statement from per-plant intensity. Large federations with many recorded plants will dominate totals even when median plants elsewhere look bigger.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Singapore leads at 223,683 — 56,849 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hydro-wastewater/charts/chart2_leaders.png" role="img" aria-label="Singapore leads at 223,683 — 56,849 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Among the top dozen country entries on the intensity cut, Singapore leads at <strong>223,683</strong>, and the median of that elite group is <strong>56,849</strong> — far above the file-wide median of 1,079.</p>
<p class="art-p">Dense city-states and highly instrumented reporting systems rise on these lists. The ranking is as much about what gets measured and attributed as about what flows through pipes.</p>
<h2 id="how-the-field-is-spread" class="anchored">Treatment levels spread discharge</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">WASTE DIS by LEVEL</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hydro-wastewater/charts/chart3_distribution.png" role="img" aria-label="WASTE DIS by LEVEL"></div>
</figure>
<p class="art-p">Category boxes by treatment level — secondary, advanced, and related labels — show whether discharge consensus is shared or contested across tiers. Secondary dominates headcount; advanced plants can dominate intensity.</p>
<p class="art-p">That split is the civic stakes of the chart. Upgrading level without changing plant counts can move environmental outcomes more than building another secondary facility of median size.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">WASTE DIS vs median by LEVEL</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hydro-wastewater/charts/chart4_gap.png" role="img" aria-label="WASTE DIS vs median by LEVEL"></div>
</figure>
<p class="art-p"><strong>Advanced</strong> treatment sits <strong>681</strong> above the median on the gap chart; <strong>Secondary</strong> trails by <strong>342</strong>. The direction matches intuition only if you remember that advanced plants are often larger urban facilities, not merely cleaner ones.</p>
<p class="art-p">Level labels encode technology and, often, city scale. Reading the gap as a pure virtue ranking of treatment quality without plant-size context will overfit the moral and underfit the engineering.</p>
<h2 id="what-moves-together" class="anchored">Discharge and quality fields</h2>
<h3 id="what-moves-together-look" class="anchored">WASTE DIS vs QUAL WASTE</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/hydro-wastewater/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/hydro-wastewater/charts/chart5_scatter.png" role="img" aria-label="WASTE DIS vs QUAL WASTE"></div>
</figure>
<p class="art-p">Plotting waste discharge against the file's quality-related waste field shows clusters that averages erase. Some plants combine high discharge with strong quality scores; others pair modest discharge with weaker quality flags.</p>
<p class="art-p">The scatter is where big and good stop being synonyms. Infrastructure policy needs both axes: capacity to serve population, and treatment quality sufficient for the receiving water.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and uneven national reporting apply. Proposed or non-operational plants can sit beside active ones if status filters are imperfect.</p>
<p class="art-p">Discharge units and quality fields should be read as the HydroWASTE-derived attributes in the release — not as a substitute for local permit databases or real-time effluent monitoring.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Wastewater is a skewed industry: median discharge near 1,079, extremes above three million, and country totals dominated by large reporting systems such as the United States.</p>
<p class="art-p">The citable distinction is treatment level versus size. Secondary is common; advanced sits above the median on intensity; quality and discharge together decide whether a plant is merely large or actually protective.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
