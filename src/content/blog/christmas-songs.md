---
title: Which Holiday Songs Never Leave the Charts?
slug: christmas-songs
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Decades of Christmas-song chart data identify the standards that return every
  season.
heroImage: /images/content/articles/christmas-songs/hero.png
draft: false
tags:
  - arts
  - music
tldr: >-
  Holiday songs have a strange chart life: they return every December, pile up
  weeks, then vanish until the next season. The TidyTuesday christmas-songs
  extract used here holds 387 records spanning 1958–2017 , with a median of 8.00
  weeks on chart and a high of 20.0 . Better Days and Believe sit among the
  weeks-on-chart leaders.
keyPoints:
  - 387 — Records in the working dataset
  - 8.00 — Median Weeks on chart
  - 20.0 — Highest observed Weeks on chart
  - BETTER DAYS — Top Song by Weeks on chart
  - 1958–2017 — Year span covered in the file
faq:
  - question: What does the data show about Seasonal Weeks Spiked in the Mid-2000s?
    answer: >-
      Key figure: 387 — Records in the working dataset. The source is the
      TidyTuesday release from 2019-12-24 (christmas_songs.csv). After cleaning,
      387 rows remain.
  - question: What does the data show about Twenty Weeks Marks the Upper Club?
    answer: >-
      Key figure: 8.00 — Median Weeks on chart. The source is the TidyTuesday
      release from 2019-12-24 (christmas_songs.csv). After cleaning, 387 rows
      remain.
  - question: What does the data show about Most Songs Cluster at Short Chart Lives?
    answer: >-
      Key figure: 20.0 — Highest observed Weeks on chart. The source is the
      TidyTuesday release from 2019-12-24 (christmas_songs.csv). After cleaning,
      387 rows remain.
  - question: What does the data show about Standards Reappear Across Decades?
    answer: >-
      Key figure: BETTER DAYS — Top Song by Weeks on chart. The source is the
      TidyTuesday release from 2019-12-24 (christmas_songs.csv). After cleaning,
      387 rows remain.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Holiday songs have a strange chart life: they return every December, pile up weeks, then vanish until the next season. The TidyTuesday christmas-songs extract used here holds <strong>387</strong> records spanning <strong>1958–2017</strong>, with a median of <strong>8.00</strong> weeks on chart and a high of <strong>20.0</strong>.</p>
<p class="art-p">Better Days and Believe sit among the weeks-on-chart leaders. Perennial titles — Jingle Bell Rock, All I Want for Christmas Is You, Rockin’ Around the Christmas Tree, White Christmas — define the timeline chart’s recurring cast.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">387</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8.00</span><span class="fact-label">Median Weeks on chart</span></div>
  <div class="fact-box"><span class="fact-number">20.0</span><span class="fact-label">Highest observed Weeks on chart</span></div>
  <div class="fact-box"><span class="fact-number">BETTER DAYS</span><span class="fact-label">Top Song by Weeks on chart</span></div>
  <div class="fact-box"><span class="fact-number">1958–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-12-24 (christmas_songs.csv). After cleaning, 387 rows remain.</p>
<p class="art-p">Weeks on chart is the primary metric; instance captures repeat chart lives. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="seasonal-weeks-spiked-in-the-mid-2000s" class="anchored">Seasonal Weeks Spiked in the Mid-2000s</h2>
<h3 id="seasonal-weeks-spiked-in-the-mid-2000s-look" class="anchored">Median Weeks on chart Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart1_trend.png" role="img" aria-label="Median Weeks on chart Over Time"></div>
</figure>
<p class="art-p">Median weeks on chart by year jumps to <strong>20</strong> in 2005–2006, with other elevated medians in the mid-2010s (2016 ~19, 2015 ~18.5). Some earlier years sit near 11–16; a few years fall to single-digit or near-1 medians.</p>
<p class="art-p">Holiday chart rules and catalog streaming-era returns both reshape how many weeks a seasonal title can accumulate in a given year.</p>

<h2 id="twenty-weeks-marks-the-upper-club" class="anchored">Twenty Weeks Marks the Upper Club</h2>
<h3 id="twenty-weeks-marks-the-upper-club-look" class="anchored">BETTER DAYS leads at 20.0 — 17.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart2_leaders.png" role="img" aria-label="BETTER DAYS leads at 20.0 — 17.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Believe and Better Days lead at <strong>20.0</strong> weeks. Jingle Bell Rock and All I Want for Christmas Is You follow at <strong>19</strong>; Same Old Lang Syne and Rockin’ Around the Christmas Tree at <strong>18</strong>. The median among the top dozen is <strong>17.0</strong>.</p>
<p class="art-p">Against a file median of 8 weeks, that elite band is more than double the typical holiday chart life in this extract.</p>

<h2 id="most-songs-cluster-at-short-chart-lives" class="anchored">Most Songs Cluster at Short Chart Lives</h2>
<h3 id="most-songs-cluster-at-short-chart-lives-look" class="anchored">Weeks on chart Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart3_distribution.png" role="img" aria-label="Weeks on chart Distribution"></div>
</figure>
<p class="art-p">The distribution shows large counts in both very short weeks-on-chart bins and in a high bin near the upper teens (about <strong>84</strong> observations near the top bin center). Mid-length stays fill the middle.</p>
<p class="art-p">Holiday songs are bipolar in this file: brief seasonal brushes versus multi-week December occupations.</p>

<h2 id="standards-reappear-across-decades" class="anchored">Standards Reappear Across Decades</h2>
<h3 id="standards-reappear-across-decades-look" class="anchored">Top Song Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart4_leader_trends.png" role="img" aria-label="Top Song Over Time"></div>
</figure>
<p class="art-p">Jingle Bell Rock posts 19-week seasons in the late 1950s–early 1960s and again in 2016–2017. All I Want for Christmas Is You shows 19-week runs across multiple 2010s seasons after an earlier quiet instance. Rockin’ Around the Christmas Tree similarly bridges early-1960s and mid-2010s peaks. White Christmas’s plotted seasons sit at 13 weeks in 1958–1962.</p>
<p class="art-p">The timeline’s lesson is recurrence: the holiday chart is a repertoire system, not only a new-release market.</p>

<h2 id="more-instances-often-meet-longer-weeks" class="anchored">More Instances Often Meet Longer Weeks</h2>
<h3 id="more-instances-often-meet-longer-weeks-look" class="anchored">Weeks on chart vs Instance</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart5_scatter.png" role="img" aria-label="Weeks on chart vs Instance"></div>
</figure>
<p class="art-p">Weeks on chart versus instance shows perennial titles with multiple chart lives landing in the high-weeks region, while one-instance songs populate both short and long stays.</p>
<p class="art-p">Re-entry is part of how Christmas songs manufacture longevity — the same recording, a new December, another stack of weeks.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Chart methodologies change (airplay, sales, streaming). Weeks on chart across 1958–2017 are not perfectly comparable units. Title capitalization and punctuation can split the same song.</p>
<p class="art-p">The file privileges U.S. chart logic and does not measure global streaming playlists outside that frame.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Holiday chart lives center at 8 weeks, with a 20-week ceiling and a top-dozen median of 17. Standards recur across decades rather than retiring.</p>
<p class="art-p">Cite recurrence (Jingle Bell Rock, Mariah, Brenda Lee) when the question is cultural durability; cite the 8-week median when the question is a typical seasonal visit.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: Christmas Songs</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-12-24/christmas_songs.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-12-24/christmas_songs.csv</a></p>
</main>
</div>
