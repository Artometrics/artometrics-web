---
title: 'Where Pixar’s Critic Streak Broke: Cars and Lightyear'
slug: pixar-films
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Data on Pixar’s canon track scores and the titles that interrupted a long
  critical run.
heroImage: /images/content/articles/pixar-films/hero.png
tags:
  - movies-tv
draft: false
tldr: >-
  Data on Pixar’s canon track scores and the titles that interrupted a long
  critical run.
keyPoints:
  - 96% — Median Rotten Tomatoes score across rated Pixar theatrical releases
  - 155 — Longest runtime in the set — nan (2023)
  - '81 — Shortest runtime — Toy Story, the film that started the canon'
  - '40% — Lowest Rotten Tomatoes score — Cars 2, the critic floor'
  - >-
    A+ — Most common CinemaScore grade — audiences rarely stamped a Pixar
    opening below A
faq:
  - question: What does “Runtime Creep” show?
    answer: 96% — Median Rotten Tomatoes score across rated Pixar theatrical releases
  - question: What does “Critic Scores” show?
    answer: 155 — Longest runtime in the set — nan (2023)
  - question: What does “Audience vs Critics” show?
    answer: '81 — Shortest runtime — Toy Story, the film that started the canon'
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Pixar is the rare studio brand that became a quality guarantee — but guarantees are measurable. The TidyTuesday 2025-03-11 Pixar films release joins with its public_response companion file: 27 theatrical features, 24 with critic and audience scores attached.</p>
<p class="art-p">Five charts, five angles on the same question: did Pixar’s films get longer, softer, or harder to love as the catalog grew? The answers are longer, still crowd-pleasing, and critic-dependent at the margins.</p>
<p class="art-p">Calibration points: a <strong>96%</strong> median Rotten Tomatoes score across rated theatrical releases; a longest runtime of <strong>155</strong> minutes; Toy Story’s <strong>81</strong>-minute floor; Cars 2 at <strong>40%</strong> on Rotten Tomatoes; CinemaScore grades clustering at <strong>A+</strong>; and <strong>+17</strong> minutes added to median runtime from the early era to 2017–present.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">96%</span><span class="fact-label">Median Rotten Tomatoes score across rated Pixar theatrical releases</span></div>
  <div class="fact-box"><span class="fact-number">155</span><span class="fact-label">Longest runtime in the set — nan (2023)</span></div>
  <div class="fact-box"><span class="fact-number">81</span><span class="fact-label">Shortest runtime — Toy Story, the film that started the canon</span></div>
  <div class="fact-box"><span class="fact-number">40%</span><span class="fact-label">Lowest Rotten Tomatoes score — Cars 2, the critic floor</span></div>
  <div class="fact-box"><span class="fact-number">A+</span><span class="fact-label">Most common CinemaScore grade — audiences rarely stamped a Pixar opening below A</span></div>
  <div class="fact-box"><span class="fact-number">+17</span><span class="fact-label">Minutes added to median runtime, early era vs 2017–present</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The core file pixar_films.csv lists theatrical features with release date, runtime, and MPAA rating. The companion public_response.csv adds Rotten Tomatoes, Metacritic, CinemaScore, and Critics' Choice scores. Three recent releases lack complete reception fields in the public file — treat absent values as missing data, not zero-quality signals.</p>
<p class="art-p">This is not box-office data. The TidyTuesday readme points to a separate box_office extract in the {pixarfilms} R package for revenue analysis. Reception and runtime are the focus here because they are complete in-repo.</p>
<h2 id="runtime-creep" class="anchored">Runtime Creep</h2>
<h3 id="runtime-creep-look" class="anchored">Runtime Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart1_runtime_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/pixar-films/charts/chart1_runtime_timeline.png" role="img" aria-label="Runtime Over Time"></div>
</figure>
<p class="art-p">Pixar’s theatrical releases did not stay the compact 81-minute package of Toy Story. Median runtime climbed from the sub-100-minute era of the late 1990s to a post-Incredibles 2 world where the longest entry runs 155 minutes.</p>
<p class="art-p">The early median cluster around 98 minutes (through 2006) versus 116 minutes for films since 2017 is not noise. It is a structural shift in what a Pixar theatrical release is allowed to be — and it matches the +17 minute gap between eras.</p>

<h2 id="critic-scores" class="anchored">Critic Scores</h2>
<h3 id="critic-scores-look" class="anchored">Rotten Tomatoes Ranking</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart2_rt_ranking.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/pixar-films/charts/chart2_rt_ranking.png" role="img" aria-label="Rotten Tomatoes Ranking"></div>
</figure>
<p class="art-p">The median Rotten Tomatoes score across rated films is 96% — elite by any studio standard. Pixar built a reputation on critic-proof consistency, not occasional brilliance.</p>
<p class="art-p">The floor matters too. Cars 2 sits at 40%, while Toy Story and several sequels hit 100%. The spread is narrow by Hollywood standards, but the low end is not random — it clusters around mid-2000s franchise experiments and later IP-forward releases.</p>

<h2 id="audience-vs-critics" class="anchored">Audience vs Critics</h2>
<h3 id="audience-vs-critics-look" class="anchored">Critics vs CinemaScore</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart3_critic_audience_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/pixar-films/charts/chart3_critic_audience_gap.png" role="img" aria-label="Critics vs CinemaScore"></div>
</figure>
<p class="art-p">CinemaScore grades cluster at A and A+ across the board. Audiences who showed up opening weekend were rarely disappointed — or at least rarely admitted it on exit polls.</p>
<p class="art-p">Critics were the discriminating layer. The same films that earned A+ crowd grades still span a 74–100% Rotten Tomatoes range. That gap is the story: Pixar optimized for mass affection first, prestige second.</p>

<h2 id="rating-mix" class="anchored">Rating Mix</h2>
<h3 id="rating-mix-look" class="anchored">MPAA Rating Mix</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart4_rating_mix.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/pixar-films/charts/chart4_rating_mix.png" role="img" aria-label="MPAA Rating Mix"></div>
</figure>
<p class="art-p">Thirteen films carry a G rating; ten are PG. The brand’s family positioning is not marketing copy — it is embedded in the rating structure.</p>
<p class="art-p">Zero titles in this file carry PG-13. Pixar expanded runtime and thematic weight without abandoning the all-ages lane in the theatrical set on hand.</p>

<h2 id="runtime-vs-reception" class="anchored">Runtime vs Reception</h2>
<h3 id="runtime-vs-reception-look" class="anchored">Runtime vs Rotten Tomatoes</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart5_runtime_vs_rt.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/pixar-films/charts/chart5_runtime_vs_rt.png" role="img" aria-label="Runtime vs Rotten Tomatoes"></div>
</figure>
<p class="art-p">There is no simple rule that longer films score worse — Up, Wall-E, and Inside Out combine runtime north of 95 minutes with scores above 95%.</p>
<p class="art-p">The outliers sit in the lower-right and upper-left: Cars 2 (shorter, weaker RT) versus epics that tested patience and still won. Bubble size tracks Metacritic where available — the reception stack is consistent across review systems.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Reception scores are snapshots from Wikipedia-curated tables, not live API pulls. Rotten Tomatoes percentages can shift as reviews are added. CinemaScore is ordinal, not interval — treat cross-film comparisons as directional.</p>
<p class="art-p">The dataset ends with the films included in the March 2025 TidyTuesday release. It does not include Disney+ exclusives or shorts. Runtime and rating analysis covers theatrical features only.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Pixar’s measurable story is stability with drift: critics stayed harsh at the margins (Cars 2 at 40%), audiences stayed generous (A+ CinemaScores), and runtimes marched upward (+17 minutes at the median between eras). The brand did not break — it stretched.</p>
<p class="art-p">That is the Artometrics read: the myth is magic; the data is a studio learning it could ask for more minutes, more sequels, and still keep the crowd on its side.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2025). <em>TidyTuesday: Pixar Films</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-03-11/pixar_films.csv" target="_blank" rel="noopener noreferrer">pixar_films.csv</a>; <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-03-11/public_response.csv" target="_blank" rel="noopener noreferrer">public_response.csv</a>. Original pixarfilms R package by Eric Leung.</p>

<h2 id="editor-s-note" class="anchored">Editor’s note</h2>

<div class="art-editorial-note"><p><em>This report replaces the initial batch-generated Pixar draft with a hand-tuned analysis joining both TidyTuesday files. Charts use Artometrics styling and Plotly JSON exports.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-03-11" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
