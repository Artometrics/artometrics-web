---
title: Which College Majors Pay Most—and Which Carry Job Risk?
slug: college-major-income
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Earnings and unemployment by major show where degrees pay off and where risk
  is higher.
heroImage: /images/content/articles/college-major-income/hero.png
tags:
  - business
draft: false
tldr: >-
  Earnings and unemployment by major show where degrees pay off and where risk
  is higher.
keyPoints:
  - 173 — Records in the working dataset
  - '1,231 — Median Low wage jobs'
  - '48,207 — Highest observed Low wage jobs'
  - PSYCHOLOGY — Top Major by Low wage jobs
  - Engineering — Most common Major category
faq:
  - question: What does “Psychology Leads Low-Wage Job Counts by a Wide Margin” show?
    answer: 173 — Records in the working dataset
  - question: What does “The Top Dozen’s Median Is Still Enormous” show?
    answer: '1,231 — Median Low wage jobs'
  - question: >-
      What does “Humanities and Business Categories Sit Higher Than Engineering”
      show?
    answer: '48,207 — Highest observed Low wage jobs'
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">College majors are sold as income stories. The TidyTuesday recent-graduates extract used here also tracks how many alumni land in low-wage jobs. Across <strong>173</strong> majors, the median low-wage-job count is <strong>1,231</strong>, with a high of <strong>48,207</strong> in Psychology. Engineering is the most common major category label in the file.</p>
<p class="art-p">That framing flips the usual prestige script: the chart stack leads with exposure to low-wage employment, then pairs it with unemployment rates. Pay ceilings matter; so does the size of the floor.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">173</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,231</span><span class="fact-label">Median Low wage jobs</span></div>
  <div class="fact-box"><span class="fact-number">48,207</span><span class="fact-label">Highest observed Low wage jobs</span></div>
  <div class="fact-box"><span class="fact-number">PSYCHOLOGY</span><span class="fact-label">Top Major by Low wage jobs</span></div>
  <div class="fact-box"><span class="fact-number">Engineering</span><span class="fact-label">Most common Major category</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-10-16 (recent-grads.csv). After cleaning, 173 major rows remain.</p>
<p class="art-p">Low wage jobs is the primary ranked metric; major category provides distributional context; unemployment rate appears in the scatter. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="psychology-leads-low-wage-job-counts-by-a-wide-margin" class="anchored">Psychology Leads Low-Wage Job Counts by a Wide Margin</h2>
<h3 id="psychology-leads-low-wage-job-counts-by-a-wide-margin-look" class="anchored">Low wage jobs by Major</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/college-major-income/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/college-major-income/charts/chart1_breakdown.png" role="img" aria-label="Low wage jobs by Major"></div>
</figure>
<p class="art-p">Psychology posts <strong>48,207</strong> low-wage jobs — far ahead of Business Management and Administration (<strong>32,395</strong>), Biology (<strong>28,339</strong>), Marketing (<strong>27,968</strong>), Communications (<strong>27,440</strong>), and General Business (<strong>27,320</strong>). English Language and Literature follows near <strong>26,503</strong>.</p>
<p class="art-p">These leaders combine large graduating cohorts with labor-market absorption into lower-wage roles. The metric is a count, not a rate — scale and risk travel together.</p>

<h2 id="the-top-dozen-s-median-is-still-enormous" class="anchored">The Top Dozen’s Median Is Still Enormous</h2>
<h3 id="the-top-dozen-s-median-is-still-enormous-look" class="anchored">PSYCHOLOGY leads at 48,207 — 26,912 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/college-major-income/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/college-major-income/charts/chart2_leaders.png" role="img" aria-label="PSYCHOLOGY leads at 48,207 — 26,912 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Psychology remains first at <strong>48,207</strong>, while the median among the top dozen is about <strong>26,912</strong> — more than twenty times the overall median of 1,231.</p>
<p class="art-p">The low-wage problem in this file is concentrated in a short list of high-enrollment majors, not evenly sprinkled across all 173 fields.</p>

<h2 id="humanities-and-business-categories-sit-higher-than-engineeri" class="anchored">Humanities and Business Categories Sit Higher Than Engineering</h2>
<h3 id="humanities-and-business-categories-sit-higher-than-engineeri-look" class="anchored">Low wage jobs by Major category</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/college-major-income/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/college-major-income/charts/chart3_distribution.png" role="img" aria-label="Low wage jobs by Major category"></div>
</figure>
<p class="art-p">Category boxes show Humanities & Liberal Arts with a median near <strong>3,466</strong> low-wage jobs (n=15) and Business near <strong>3,046</strong> (n=13). Engineering’s median is only about <strong>372</strong> (n=29), Education about <strong>1,282</strong> (n=16), and Biology & Life Science about <strong>939</strong> (n=14).</p>
<p class="art-p">Engineering’s low median does not mean zero risk — its maximum still reaches into the thousands — but the center of the category is far from Psychology’s scale.</p>

<h2 id="gaps-confirm-humanities-and-business-above-the-median" class="anchored">Gaps Confirm Humanities and Business Above the Median</h2>
<h3 id="gaps-confirm-humanities-and-business-above-the-median-look" class="anchored">Low wage jobs vs median by Major category</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/college-major-income/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/college-major-income/charts/chart4_gap.png" role="img" aria-label="Low wage jobs vs median by Major category"></div>
</figure>
<p class="art-p">Relative to the overall low-wage median, Humanities & Liberal Arts leads at about <strong>+2,235</strong>, with Business about <strong>+1,815</strong>. Engineering, Computers & Mathematics, and Physical Sciences sit below the median by several hundred to nearly a thousand.</p>
<p class="art-p">STEM categories in this extract are not immune to low-wage outcomes, but they clear the baseline more often than large humanities and business majors.</p>

<h2 id="low-wage-counts-and-unemployment-are-different-risks" class="anchored">Low-Wage Counts and Unemployment Are Different Risks</h2>
<h3 id="low-wage-counts-and-unemployment-are-different-risks-look" class="anchored">Low wage jobs vs Unemployment rate</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/college-major-income/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/college-major-income/charts/chart5_scatter.png" role="img" aria-label="Low wage jobs vs Unemployment rate"></div>
</figure>
<p class="art-p">Low wage jobs versus unemployment rate spreads majors across both axes. Some fields show elevated unemployment with modest low-wage counts; others show huge low-wage tallies without sitting at the top of the unemployment ranking.</p>
<p class="art-p">The scatter’s warning is practical: underemployment and joblessness are related labor-market failures, but they are not the same number — and majors can fail on either axis.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Low-wage job counts favor large majors; rates would reorder the list. “Recent graduates” definitions and survey vintages constrain comparison. Category bins are broad — “Engineering” hides subfield wage gaps.</p>
<p class="art-p">The file cannot speak to graduate-school pathways that delay earnings, or to geographic cost-of-living differences that redefine what “low wage” means.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Across 173 majors, the median low-wage count is 1,231, while Psychology alone exceeds 48,000. The top-dozen median near 26,900 shows how concentrated the exposure is.</p>
<p class="art-p">Cite category gaps when comparing fields of study, and keep unemployment on a separate axis — low-wage absorption and joblessness are twin risks, not synonyms.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: College Major & Income</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-16/recent-grads.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-10-16/recent-grads.csv</a></p>
</main>
</div>
