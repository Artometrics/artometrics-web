---
title: Did Horror Get Better as the Catalog Exploded?
slug: horror-movies
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Ratings across tens of thousands of horror films ask whether quality rose with
  volume.
heroImage: /images/content/articles/horror-movies/hero.png
tags:
  - movies-tv
draft: false
tldr: >-
  Horror catalogs grow faster than any critic can watch. The open question is
  whether vote averages rose with that volume — or whether more titles simply
  filled the shelf with middling scores. TMDB-style metadata for horror-tagged
  films yields 32,540 records from 1950–2022 . The median vote average is 4.00 ;
  the highest observed average is 10.0 .
keyPoints:
  - '32,540 — Records in the working dataset'
  - 4.00 — Median Vote average
  - 10.0 — Highest observed Vote average
  - Piranha Women — Top Title by Vote average
  - 1950–2022 — Year span covered in the file
  - Horror — Most common Primary genre
faq:
  - question: How the pattern changed over time?
    answer: >-
      Key figure: 32,540 — Records in the working dataset. The file merges TMDB
      metadata for thousands of horror-tagged films: ratings, budgets, runtimes,
      and genre tags from 1950 through 2022, released via TidyTuesday.
  - question: Who sits at the top?
    answer: >-
      Key figure: 4.00 — Median Vote average. The file merges TMDB metadata for
      thousands of horror-tagged films: ratings, budgets, runtimes, and genre
      tags from 1950 through 2022, released via TidyTuesday.
  - question: How the field is spread?
    answer: >-
      Key figure: 10.0 — Highest observed Vote average. The file merges TMDB
      metadata for thousands of horror-tagged films: ratings, budgets, runtimes,
      and genre tags from 1950 through 2022, released via TidyTuesday.
  - question: Who beats the median — and who trails?
    answer: >-
      Key figure: Piranha Women — Top Title by Vote average. The file merges
      TMDB metadata for thousands of horror-tagged films: ratings, budgets,
      runtimes, and genre tags from 1950 through 2022, released via TidyTuesday.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Horror catalogs grow faster than any critic can watch. The open question is whether vote averages rose with that volume — or whether more titles simply filled the shelf with middling scores.</p>
<p class="art-p">TMDB-style metadata for horror-tagged films yields <strong>32,540</strong> records from <strong>1950–2022</strong>. The median vote average is <strong>4.00</strong>; the highest observed average is <strong>10.0</strong>. Horror is the most common primary genre label, as expected in a horror-tagged extract.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">32,540</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">4.00</span><span class="fact-label">Median Vote average</span></div>
  <div class="fact-box"><span class="fact-number">10.0</span><span class="fact-label">Highest observed Vote average</span></div>
  <div class="fact-box"><span class="fact-number">Piranha Women</span><span class="fact-label">Top Title by Vote average</span></div>
  <div class="fact-box"><span class="fact-number">1950–2022</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Horror</span><span class="fact-label">Most common Primary genre</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The file merges TMDB metadata for thousands of horror-tagged films: ratings, budgets, runtimes, and genre tags from 1950 through 2022, released via TidyTuesday.</p>
<p class="art-p">Charts ship as Plotly JSON with PNG fallbacks. Medians handle skew better than means. Perfect 10.0 scores often sit on thin vote counts — treat the ceiling as a signal about sparse ratings, not universal critical consensus.</p>

<h2 id="how-the-pattern-changed-over-time" class="anchored">How the pattern changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Vote average Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movies/charts/chart1_trend.png" role="img" aria-label="Median Vote average Over Time"></div>
</figure>
<p class="art-p">Median vote average rises from 5.65 in the opening period to 6.00 at the close — a modest lift across decades of catalog growth.</p>
<p class="art-p">That is not a renaissance claim. It is a median moving a fraction of a point while tens of thousands of titles enter the shelf. Volume exploded; the middle of the scoreboard edged up.</p>

<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">The House Guest leads at 10.0 — 10.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movies/charts/chart2_leaders.png" role="img" aria-label="The House Guest leads at 10.0 — 10.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">The House Guest leads at 10.0 — and 10.0 also marks the median among the top dozen. The head of the leaderboard is a cluster of perfect averages, not a gentle taper.</p>
<p class="art-p">In large rating tables, that pattern usually means low vote counts or niche titles with tiny, enthusiastic rater pools. The top is a ceiling effect, not a ranked canon of masterpieces.</p>

<h2 id="how-the-field-is-spread" class="anchored">How the field is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Vote average by Primary genre</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movies/charts/chart3_distribution.png" role="img" aria-label="Vote average by Primary genre"></div>
</figure>
<p class="art-p">Primary-genre boxes show whether vote averages are shared across hybrid tags or contested by a few outliers.</p>
<p class="art-p">Horror-tagged films still carry secondary labels — crime, animation, drama — and those buckets disagree about quality. The spread is the story: consensus is uneven once the tag set widens.</p>

<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Vote average vs median by Primary genre</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movies/charts/chart4_gap.png" role="img" aria-label="Vote average vs median by Primary genre"></div>
</figure>
<p class="art-p">Crime sits 1.00 above the median; Animation trails by 4.00.</p>
<p class="art-p">Those gaps are relative to this file’s middle, not absolute statements about every crime or animated horror title. They point to where hybrid labeling and rater pools pull averages apart.</p>

<h2 id="what-moves-together" class="anchored">What moves together</h2>
<h3 id="what-moves-together-look" class="anchored">Vote average vs Vote count</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/horror-movies/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/horror-movies/charts/chart5_scatter.png" role="img" aria-label="Vote average vs Vote count"></div>
</figure>
<p class="art-p">Vote average and vote count do not move as a simple line. Perfect scores with tiny counts sit apart from widely watched mid-range films.</p>
<p class="art-p">Popularity and perceived quality are related but not interchangeable — the scatter is where that distinction becomes visible.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">Findings describe the file on hand — structural signals about horror-tagged ratings, not a complete history of the genre’s artistry.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">As the catalog grew, the median vote average edged up from 5.65 toward 6.00 — improvement at the middle, not a clean story that “horror got better.” Perfect 10.0 leaders sit on a different mechanism than widely voted mid-scores.</p>
<p class="art-p">Read leaders, gaps, and the average–count scatter together before treating any title as proof of a golden age.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2022). <em>TidyTuesday: Horror Movies</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-01/horror_movies.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2022/2022-11-01/horror_movies.csv</a></p>

</main>
</div>
