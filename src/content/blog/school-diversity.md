---
title: Where U.S. Student-Body Diversity Is Highest
slug: school-diversity
pubDate: 2026-06-15T00:00:00.000Z
description: School-level composition data map where diversity concentrates.
heroImage: /images/content/articles/school-diversity/hero.png
draft: false
tags:
  - civics
  - education
tldr: >-
  School-level composition data map where student-body diversity concentrates
  across U.S. local education agencies. The working file holds 27,944 records.
  The calibration metric is Multi, with a median of 2.38 — the center of the
  observed diversity scores in this extract.
keyPoints:
  - '27,944 — Records in the working dataset'
  - 2.38 — Median Multi
  - 85.3 — Highest observed Multi
  - butteville union elementary — Top LEA NAME by Multi
  - TX — Most common ST
faq:
  - question: >-
      What does the data show about A flat median hides how extreme the upper
      tail is?
    answer: >-
      Key figure: 27,944 — Records in the working dataset. The source is the
      TidyTuesday release from 2019-09-24 (R for Data Science community). The
      working file contains 27,944 rows and 15 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Butteville Union Elementary leads a steep
      LEA ladder?
    answer: >-
      Key figure: 2.38 — Median Multi. The source is the TidyTuesday release
      from 2019-09-24 (R for Data Science community). The working file contains
      27,944 rows and 15 columns after merging available tables in the…
  - question: >-
      What does the data show about State boxes show how Multi spreads
      geographically?
    answer: >-
      Key figure: 85.3 — Highest observed Multi. The source is the TidyTuesday
      release from 2019-09-24 (R for Data Science community). The working file
      contains 27,944 rows and 15 columns after merging available tables in the…
  - question: >-
      What does the data show about Oklahoma clears the median; New Jersey
      trails?
    answer: >-
      Key figure: butteville union elementary — Top LEA NAME by Multi. The
      source is the TidyTuesday release from 2019-09-24 (R for Data Science
      community). The working file contains 27,944 rows and 15 columns after
      merging available tables in the…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">School-level composition data map where student-body diversity concentrates across U.S. local education agencies. The working file holds 27,944 records. The calibration metric is Multi, with a median of 2.38 — the center of the observed diversity scores in this extract.</p>
<p class="art-p">The ceiling is stark: butteville union elementary leads at 85.3 Multi, while Texas (TX) is the most common state abbreviation in the file. High Multi at the top of the leaderboard and a modest median across the whole table are not contradictions. They are the shape of a heavily skewed education landscape.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">27,944</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">2.38</span><span class="fact-label">Median Multi</span></div>
  <div class="fact-box"><span class="fact-number">85.3</span><span class="fact-label">Highest observed Multi</span></div>
  <div class="fact-box"><span class="fact-number">butteville union elementary</span><span class="fact-label">Top LEA NAME by Multi</span></div>
  <div class="fact-box"><span class="fact-number">TX</span><span class="fact-label">Most common ST</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-09-24 (R for Data Science community). The working file contains 27,944 rows and 15 columns after merging available tables in the week folder. Multi is the primary observed metric used for ranking and distribution charts; Variance appears alongside it in the scatter.</p>
<p class="art-p">Medians are used because school-level diversity metrics skew. Index-style fields are excluded from metric selection. State codes (ST) and LEA names are categorical axes for comparing how Multi sits across geography and district identity.</p>

<h2 id="a-flat-median-hides-how-extreme-the-upper-tail-is" class="anchored">A flat median hides how extreme the upper tail is</h2>
<h3 id="a-flat-median-hides-how-extreme-the-upper-tail-is-look" class="anchored">Median Multi Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/school-diversity/charts/chart1_trend.png" role="img" aria-label="Median Multi Over Time"></div>
</figure>
<p class="art-p">In the trend cut available in this file, median Multi sits at 2.38 in the opening period and 2.38 at the close — a flat line at the center of the distribution. Stability at the median does not mean stability everywhere; it means the typical school’s Multi did not move in this snapshot window.</p>
<p class="art-p">That flat center is the baseline against which the leaderboard should be read. The interesting action in school diversity here is not a national median march — it is how far individual LEAs sit above that center.</p>

<h2 id="butteville-union-elementary-leads-a-steep-lea-ladder" class="anchored">Butteville Union Elementary leads a steep LEA ladder</h2>
<h3 id="butteville-union-elementary-leads-a-steep-lea-ladder-look" class="anchored">Top LEA NAME</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/school-diversity/charts/chart2_leaders.png" role="img" aria-label="Top LEA NAME"></div>
</figure>
<p class="art-p">butteville union elementary leads at 85.3 Multi. Among the top dozen LEAs, the median is 52.0 — still many times the file-wide median of 2.38. The leaderboard is an upper-tail map of districts whose composition scores sit far from the typical school.</p>
<p class="art-p">LEA names on this chart are the entities carrying the highest observed Multi values in the file. They are not a random sample of American schooling; they are the extreme cases the metric surfaces first.</p>

<h2 id="state-boxes-show-how-multi-spreads-geographically" class="anchored">State boxes show how Multi spreads geographically</h2>
<h3 id="state-boxes-show-how-multi-spreads-geographically-look" class="anchored">Multi by ST</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/school-diversity/charts/chart3_distribution.png" role="img" aria-label="Multi by ST"></div>
</figure>
<p class="art-p">Splitting Multi by state (ST) produces category boxes that reveal whether diversity scores are shared or contested across jurisdictions. Texas appears most often in the file, but frequency of rows is not the same as high Multi; volume and score must be read separately.</p>
<p class="art-p">The state axis is useful because education policy and demography both vary geographically. The boxes show the within-state spread that a single national median erases.</p>

<h2 id="oklahoma-clears-the-median-new-jersey-trails" class="anchored">Oklahoma clears the median; New Jersey trails</h2>
<h3 id="oklahoma-clears-the-median-new-jersey-trails-look" class="anchored">Multi vs median by ST</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/school-diversity/charts/chart4_gap.png" role="img" aria-label="Multi vs median by ST"></div>
</figure>
<p class="art-p">Relative to the median, OK sits 4.25 above; NJ trails by 0.81. That gap chart converts state boxes into signed distance from the file center — a quick way to see who systematically lands higher or lower on Multi.</p>
<p class="art-p">These are structural offsets in the working extract, not causal claims about state policy. They locate where the distribution’s weight sits once the national median is the reference line.</p>

<h2 id="multi-and-variance-move-together-in-clusters" class="anchored">Multi and Variance move together in clusters</h2>
<h3 id="multi-and-variance-move-together-in-clusters-look" class="anchored">Multi vs Variance</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/school-diversity/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/school-diversity/charts/chart5_scatter.png" role="img" aria-label="Multi vs Variance"></div>
</figure>
<p class="art-p">Plotting Multi against Variance shows joint structure that averages erase: schools and districts form clusters rather than a single smooth cloud. High Multi with different Variance profiles is a different composition story from moderate Multi with tight Variance.</p>
<p class="art-p">The scatter’s job is relational. It does not crown a winner; it shows which combinations of diversity level and dispersion appear together in the 27,944-row file.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live federal education APIs. Missing values, spelling variants in LEA names, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Multi is the metric as defined in the source file. Findings describe this school-diversity extract — not a complete census of every U.S. school in every year.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The national median Multi of 2.38 is stable in the available trend window, while individual LEAs such as butteville union elementary reach 85.3. Diversity here is a long-tailed property: the center barely moves, and the extremes define the drama.</p>
<p class="art-p">State gaps (Oklahoma above the median, New Jersey below) and the Multi–Variance scatter add geography and joint structure. Together they show where student-body diversity concentrates without pretending one number explains the whole map.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: School Diversity</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-09-24/school_diversity.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-09-24/school_diversity.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-09-24" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
