---
title: How Far Do Portland’s Biketown Rides Actually Go?
slug: biketown-bikeshare
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Trip-level bike-share data measures typical distance and duration across
  Biketown journeys.
heroImage: /images/content/articles/biketown-bikeshare/hero.png
tags:
  - cities-travel
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Portland’s Biketown system turns everyday movement into timestamped trips. The TidyTuesday extract used here holds <strong>100,000</strong> ride records spanning <strong>2016–2018</strong>, with a median duration of <strong>14.5</strong> minutes and a recorded high of <strong>1,392</strong> minutes — multi-hour outliers that sit far from the commute core.</p>
<p class="art-p">Recreation is the most common trip type in the file. That single label already hints at the system’s dual life: tourist and leisure loops on one side, workday hops on the other. Duration is the metric that organizes the charts.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">14.5</span><span class="fact-label">Median Duration min</span></div>
  <div class="fact-box"><span class="fact-number">1,392</span><span class="fact-label">Highest observed Duration min</span></div>
  <div class="fact-box"><span class="fact-number">SW Stark at Burnside</span><span class="fact-label">Top StartHub by Duration min</span></div>
  <div class="fact-box"><span class="fact-number">2016–2018</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">recreation</span><span class="fact-label">Most common TripType</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-06-05 (week10_biketown.zip). After cleaning, the working sample used for these charts contains 100,000 rows.</p>
<p class="art-p">Hub names, trip types, duration, and distance fields drive the visual stack. Medians are used because duration has a long right tail. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="median-trip-length-fell-across-three-seasons" class="anchored">Median Trip Length Fell Across Three Seasons</h2>
<h3 id="median-trip-length-fell-across-three-seasons-look" class="anchored">Median Duration min Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart1_trend.png" role="img" aria-label="Median Duration min Over Time"></div>
</figure>
<p class="art-p">Median duration slips from about <strong>15.1</strong> minutes in 2016 to <strong>14.6</strong> in 2017 and <strong>12.1</strong> in 2018. The system’s typical ride got shorter even as the archive grew.</p>
<p class="art-p">That decline can reflect denser hub coverage, more habitual short hops, or a changing mix of recreation versus commute. The trend line alone cannot pick the cause — but it establishes that “a Biketown ride” was not a fixed product over these years.</p>

<h2 id="pop-up-and-waterfront-hubs-stretch-ride-time" class="anchored">Pop-Up and Waterfront Hubs Stretch Ride Time</h2>
<h3 id="pop-up-and-waterfront-hubs-stretch-ride-time-look" class="anchored">Design Week Portland Pop Up - Disabled leads at 40.6 — 29.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart2_leaders.png" role="img" aria-label="Design Week Portland Pop Up - Disabled leads at 40.6 — 29.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Design Week Portland Pop Up - Disabled leads median duration at about <strong>40.6</strong> minutes. PRIDE - Pine - Disabled follows near <strong>36.0</strong>, with waterfront and event-adjacent hubs such as SW Naito at Morrison also running long.</p>
<p class="art-p">The median among the top dozen hubs is about <strong>29.0</strong> minutes — double the system-wide median of 14.5. Event and scenic starts systematically produce longer rides than the everyday grid.</p>

<h2 id="recreation-lasts-longer-than-work-trips" class="anchored">Recreation Lasts Longer Than Work Trips</h2>
<h3 id="recreation-lasts-longer-than-work-trips-look" class="anchored">Duration min by TripType</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart3_distribution.png" role="img" aria-label="Duration min by TripType"></div>
</figure>
<p class="art-p">By trip type, recreation shows a median duration near <strong>32.6</strong> minutes (n=73 in the boxed sample), versus about <strong>25.6</strong> for commute, <strong>17.7</strong> for errand, and <strong>11.4</strong> for work.</p>
<p class="art-p">The boxes also expose extreme outliers above 1,000 minutes in recreation, commute, and work — dock failures, forgotten returns, or data quirks. The medians remain the honest center of each category.</p>

<h2 id="recreation-sits-furthest-above-the-system-median" class="anchored">Recreation Sits Furthest Above the System Median</h2>
<h3 id="recreation-sits-furthest-above-the-system-median-look" class="anchored">Duration min vs median by TripType</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart4_gap.png" role="img" aria-label="Duration min vs median by TripType"></div>
</figure>
<p class="art-p">Relative to the overall duration median, recreation leads the gap chart at roughly <strong>+18</strong> minutes, with commute about <strong>+11</strong> and errand slightly positive. Work sits below the median by about <strong>3</strong> minutes.</p>
<p class="art-p">That ordering matches the city’s split personality on two wheels: leisure explores; work punches a short path.</p>

<h2 id="longer-minutes-do-not-always-mean-more-miles" class="anchored">Longer Minutes Do Not Always Mean More Miles</h2>
<h3 id="longer-minutes-do-not-always-mean-more-miles-look" class="anchored">Duration min vs Distance Miles</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/biketown-bikeshare/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/biketown-bikeshare/charts/chart5_scatter.png" role="img" aria-label="Duration min vs Distance Miles"></div>
</figure>
<p class="art-p">Duration versus distance, colored by trip type, shows recreation spanning both long loopy rides and short spins. Commute points tighten toward moderate distances; work and errand clouds are smaller and closer to the origin.</p>
<p class="art-p">A 40-minute recreation ride may cover only a few miles along the waterfront. Minutes measure time in possession of the bike; miles measure geography. Biketown’s archive needs both.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Hub renaming, disabled pop-up stations, and GPS noise all affect duration and distance fields. Extremely long trips may be failures to dock rather than heroic tours.</p>
<p class="art-p">The 2016–2018 window predates later network expansions. Findings describe this extract’s behavior, not the live 2020s system map.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Biketown’s typical ride is short — a 14.5-minute median — and got shorter from 2016 to 2018. Recreation and event hubs pull the upper tail; work trips pull toward brevity.</p>
<p class="art-p">The system is not one behavior. It is a leisure network and a commuting tool sharing the same docks, and duration is where that split becomes measurable.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Biketown Bikeshare</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-05/week10_biketown.zip" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-06-05/week10_biketown.zip</a></p>
</main>
</div>
