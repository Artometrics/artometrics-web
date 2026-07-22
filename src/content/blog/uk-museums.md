---
title: Where UK Museums Sit on the Deprivation Map
slug: uk-museums
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Museum locations and deprivation bands show how institutions map onto
  inequality.
heroImage: /images/content/articles/uk-museums/hero.png
tags:
  - galleries
draft: false
tldr: >-
  Museum locations and deprivation bands show how institutions map onto
  inequality.
keyPoints:
  - '4,191 — Records in the working dataset'
  - 5.00 — Median Area Deprivation index
  - 10.0 — Highest observed Area Deprivation index
  - Blenheim Palace — Top Name of museum by Area Deprivation index
  - /England/South West (English — Most common Admin area
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Britain’s museum map is also a map of place. This file places 4,191 museum records against an area deprivation index whose median is 5.00 and whose observed high is 10.0. Blenheim Palace appears among the fact-box notables; the South West of England shows up in the geographic gap analysis.</p>
<p class="art-p">The question is not which museum is “best.” It is how cultural institutions sit on a deprivation scale — whether collections cluster in less-deprived areas, and how far named sites and admin areas sit above or below the median index of 5.00.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">4,191</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">5.00</span><span class="fact-label">Median Area Deprivation index</span></div>
  <div class="fact-box"><span class="fact-number">10.0</span><span class="fact-label">Highest observed Area Deprivation index</span></div>
  <div class="fact-box"><span class="fact-number">Blenheim Palace</span><span class="fact-label">Top Name of museum by Area Deprivation index</span></div>
  <div class="fact-box"><span class="fact-number">/England/South West (English</span><span class="fact-label">Most common Admin area</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2022-11-22 (R for Data Science community). The working file contains 4,191 rows and 35 columns after merging available tables in the week folder. Area deprivation index is the primary metric; museum name and admin area are the main categorical axes; DOMUS identifier appears in the scatter.</p>
<p class="art-p">Medians are used for robustness. Index-style fields are excluded from metric selection. Deprivation scores describe the surrounding area context in the source, not an editorial ranking of museum quality.</p>

<h2 id="named-museums-pin-the-top-of-the-deprivation-scale" class="anchored">Named museums pin the top of the deprivation scale</h2>
<h3 id="named-museums-pin-the-top-of-the-deprivation-scale-look" class="anchored">Area Deprivation index by Name of museum</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/uk-museums/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/uk-museums/charts/chart1_breakdown.png" role="img" aria-label="Area Deprivation index by Name of museum"></div>
</figure>
<p class="art-p">In the name breakdown, The Archaeology Centre leads at 10.0; Smithy Heritage Centre anchors the low end of that plotted group at 10.0 as well — a reminder that the upper slice of this particular cut can compress when many sites share the same index band.</p>
<p class="art-p">Grouping by museum name makes individual institutions visible on the deprivation axis. It is a catalog of places, not a visitor-numbers league table.</p>

<h2 id="the-leaders-chart-sits-at-the-index-ceiling" class="anchored">The leaders chart sits at the index ceiling</h2>
<h3 id="the-leaders-chart-sits-at-the-index-ceiling-look" class="anchored">Top Name of museum</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/uk-museums/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/uk-museums/charts/chart2_leaders.png" role="img" aria-label="Top Name of museum"></div>
</figure>
<p class="art-p">The Archaeology Centre leads at 10.0, and 10.0 also marks the median among the top dozen in this cut. When the top of the ladder is flat, the story is saturation at the high end of the deprivation index rather than a single runaway institution.</p>
<p class="art-p">Blenheim Palace remains a fact-box landmark for the file; the charted leaders emphasize which names hit the observed maximum of 10.0 in this aggregation.</p>

<h2 id="admin-areas-spread-museums-across-different-deprivation-bands" class="anchored">Admin areas spread museums across different deprivation bands</h2>
<h3 id="admin-areas-spread-museums-across-different-deprivation-bands-look" class="anchored">Area Deprivation index by Admin area</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/uk-museums/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/uk-museums/charts/chart3_distribution.png" role="img" aria-label="Area Deprivation index by Admin area"></div>
</figure>
<p class="art-p">Category boxes by admin area show whether deprivation consensus is shared or contested across local jurisdictions. Museums do not all sit in the same band; geography fragments the index.</p>
<p class="art-p">That spread is the point of an atlas-style reading: cultural infrastructure is unevenly distributed across deprivation contexts, and the boxes make the unevenness visible.</p>

<h2 id="wiltshire-clears-the-median-cornwall-trails-in-the-south-west-cut" class="anchored">Wiltshire clears the median; Cornwall trails in the South West cut</h2>
<h3 id="wiltshire-clears-the-median-cornwall-trails-in-the-south-west-cut-look" class="anchored">Area Deprivation index vs median by Admin area</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/uk-museums/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/uk-museums/charts/chart4_gap.png" role="img" aria-label="Area Deprivation index vs median by Admin area"></div>
</figure>
<p class="art-p">/England/South West (English Region)/Wiltshire (English UA) sits 2.00 above the median; /England/South West (English Region)/Cornwall (English UA) trails by 1.00. Even inside one English region, admin areas do not share the same offset from the file center.</p>
<p class="art-p">Signed gaps turn geography into a comparable scale. They do not explain why a museum is where it is; they locate the area context relative to the median deprivation index of 5.00.</p>

<h2 id="deprivation-and-domus-ids-form-a-joint-map" class="anchored">Deprivation and DOMUS IDs form a joint map</h2>
<h3 id="deprivation-and-domus-ids-form-a-joint-map-look" class="anchored">Area Deprivation index vs DOMUS identifier</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/uk-museums/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/uk-museums/charts/chart5_scatter.png" role="img" aria-label="Area Deprivation index vs DOMUS identifier"></div>
</figure>
<p class="art-p">Plotting area deprivation index against DOMUS identifier shows clusters that a single average erases. Identifier ranges and deprivation bands co-locate in ways that matter for joining and auditing the catalog.</p>
<p class="art-p">The scatter is a data-structure check as much as a social map: it shows how the numeric deprivation field sits beside the museum identity field in the 4,191-row extract.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live heritage registries. Missing values, naming variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Area deprivation index describes place context in the source file. Findings are structural signals about UK museums in this extract — not a verdict on institutional excellence or funding.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">UK museums in this file sit around a median deprivation index of 5.00, with an observed high of 10.0 and clear admin-area gaps even inside the South West.</p>
<p class="art-p">Name leaders, area boxes, and the deprivation–DOMUS scatter together show how cultural sites map onto inequality of place — a geography story first, a prestige story only by implication.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2022). <em>TidyTuesday: UK Museums</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-22/museums.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-22/museums.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2022/2022-11-22" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
