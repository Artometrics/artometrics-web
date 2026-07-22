---
title: How Netflix’s Catalog Mix Shifted Between Films and Series
slug: netflix-titles
pubDate: 2026-06-15T00:00:00.000Z
description: Title-level library data track the balance of movies and TV over time.
heroImage: /images/content/articles/netflix-titles/hero.png
tags:
  - movies-tv
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">A streaming library is an inventory decision dressed as a homepage. Title-level Netflix catalog data show how the mix of movies and TV — and the duration field attached to each row — shifted between 2008 and 2021.</p>
<p class="art-p">The working file holds <strong>7,787</strong> records. Median duration is <strong>88.0</strong>; the highest observed duration is <strong>312</strong>, led by Black Mirror: Bandersnatch. Movie is the most common type label.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">7,787</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">88.0</span><span class="fact-label">Median Duration</span></div>
  <div class="fact-box"><span class="fact-number">312</span><span class="fact-label">Highest observed Duration</span></div>
  <div class="fact-box"><span class="fact-number">Black Mirror: Bandersnatch</span><span class="fact-label">Top Title by Duration</span></div>
  <div class="fact-box"><span class="fact-number">2008–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Movie</span><span class="fact-label">Most common Type</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-04-20 (R for Data Science community). The working file contains 7,787 rows and 13 columns after merging available tables in the week folder.</p>
<p class="art-p">Duration here is the catalog field as published — minutes for films, season counts for some TV rows depending on how the export encoded type. Medians and Plotly exports keep the reading robust to skew and missing cells.</p>

<h2 id="how-the-pattern-changed-over-time" class="anchored">How the pattern changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Duration Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-titles/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-titles/charts/chart1_trend.png" role="img" aria-label="Median Duration Over Time"></div>
</figure>
<p class="art-p">Median duration rises from 41.0 in the opening period to 98.0 at the close — a catalog whose typical row lengthens as the library ages.</p>
<p class="art-p">That climb can reflect more feature-length films entering the shelf, longer TV encodings, or both. The trend is a mix signal, not a single format story.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">Black Mirror: Bandersnatch leads at 312 — 226 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-titles/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-titles/charts/chart2_leaders.png" role="img" aria-label="Black Mirror: Bandersnatch leads at 312 — 226 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Black Mirror: Bandersnatch leads at 312; 226 marks the median among the top dozen.</p>
<p class="art-p">Interactive and long-form outliers define the ceiling. Most of the library lives nowhere near those peaks — which is why the median of 88.0 remains the better everyday calibration.</p>

<h2 id="how-the-field-is-spread" class="anchored">How the field is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Duration by Type</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-titles/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-titles/charts/chart3_distribution.png" role="img" aria-label="Duration by Type"></div>
</figure>
<p class="art-p">Duration by type separates movies from TV rows in the catalog encoding. The boxes show whether each type shares a tight middle or stretches into long tails.</p>
<p class="art-p">Movie dominance in count does not automatically mean movie dominance in duration shape. The distribution is where that distinction becomes visible.</p>

<h2 id="concentration" class="anchored">Concentration</h2>
<h3 id="concentration-look" class="anchored">The top 5 title entries account for 38% of the aggregate duration</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-titles/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-titles/charts/chart4_pareto.png" role="img" aria-label="The top 5 title entries account for 38% of the aggregate duration"></div>
</figure>
<p class="art-p">The top 5 title entries account for 38% of the aggregate duration — a steep head for a library that otherwise looks vast on the homepage.</p>
<p class="art-p">Steep Pareto curves mean a small set of rows drives most of the summed duration signal. The long tail is real inventory; it is not where the aggregate concentrates.</p>

<h2 id="concentration-pareto" class="anchored">Concentration</h2>
<h3 id="concentration-pareto-look" class="anchored">The top 5 title entries account for 38% of the aggregate duration</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/netflix-titles/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/netflix-titles/charts/chart_pareto.png" role="img" aria-label="The top 5 title entries account for 38% of the aggregate duration"></div>
</figure>
<p class="art-p">A second Pareto view of the same 38% concentration confirms the head–tail split under an alternate chart export.</p>
<p class="art-p">When two exhibits agree on the same share, the claim is about structure in the file — not about a single rendering choice.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand — structural signals about Netflix title rows through 2021, not today’s live catalog in every territory.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Median duration climbed from 41.0 toward 98.0 while Movie remained the most common type. A handful of long outliers — Bandersnatch at 312 among them — and a 38% duration concentration in the top five rows show how uneven a “library” can be once you stop counting titles and start summing length.</p>
<p class="art-p">Use the charts to separate mix, length, and concentration before treating any homepage as a flat shelf.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: Netflix Titles</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-04-20/netflix_titles.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-04-20/netflix_titles.csv</a></p>

</main>
</div>
