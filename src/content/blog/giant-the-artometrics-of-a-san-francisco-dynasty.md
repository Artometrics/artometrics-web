---
title: The Giants’ Arc From New York Gothams to Oracle Park
slug: giant-the-artometrics-of-a-san-francisco-dynasty
pubDate: 2026-04-18T00:00:00.000Z
description: A franchise history from 1883 New York origins to a modern Bay Area ballclub.
heroImage: /images/content/2026/04/IMG_4221.webp
tags:
  - sports
draft: false
tldr: A franchise history from 1883 New York origins to a modern Bay Area ballclub.
keyPoints:
  - >-
    8 — World Series titles — 1905, 1921, 1922, 1933, 1954 in New York; 2010,
    2012, 2014 in San Francisco
  - >-
    1883 — Year the franchise was founded as the New York Gothams — one of the
    oldest in American professional sports
  - >-
    141 — Seasons of franchise history covered in this report — from the Polo
    Grounds to Oracle Park
  - >-
    2000 — Year Oracle Park opened — the first privately financed MLB stadium
    since Dodger Stadium in 1962
  - >-
    3.3M — Attendance in Oracle Park&#39;s first season — nearly double
    Candlestick&#39;s worst years and a floor the franchise rarely dropped below
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">The San Francisco Giants have been playing professional baseball since 1883. That is not a typo. The franchise that now calls Oracle Park home started as the New York Gothams—a club that predates the automobile, commercial electric light, and the modern World Series by twenty years. Across 141 seasons, eight World Series titles, a continental relocation, three stadiums, and dynasties separated by decades of near-misses, no American franchise carries a longer or more complicated arc.</p>
<p class="art-p">The titles split cleanly by geography: five in New York (1905, 1921, 1922, 1933, 1954) and three in San Francisco (2010, 2012, 2014). Between them sits Candlestick’s long frustration and, after 2000, a privately financed ballpark that doubled the attendance floor and rebuilt the economic base. The 2010–2014 dynasty then won three championships as a mid-tier-to-top spender built largely from the draft—payroll rank 9 in the first title year.</p>
<p class="art-p">Using the Lahman Baseball Database, the charts trace that arc across winning over time, the stadium’s economic break, and how a draft-built rotation converted a revenue floor into rings. Win percentage runs through 2024; payroll covers 1985–2016, the complete Lahman salary window that includes every dynasty season and the years that framed it.</p>

<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">8</span>
    <span class="fact-label">World Series titles — 1905,
    1921, 1922, 1933, 1954 in New York; 2010, 2012, 2014
    in San Francisco</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">1883</span>
    <span class="fact-label">Year the franchise was founded
    as the New York Gothams — one of the oldest in American
    professional sports</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">141</span>
    <span class="fact-label">Seasons of franchise history
    covered in this report — from the Polo Grounds to
    Oracle Park</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">2000</span>
    <span class="fact-label">Year Oracle Park opened —
    the first privately financed MLB stadium since Dodger
    Stadium in 1962</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">3.3M</span>
    <span class="fact-label">Attendance in Oracle Park&#39;s
    first season — nearly double Candlestick&#39;s worst years
    and a floor the franchise rarely dropped below</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">Rank 9</span>
    <span class="fact-label">Giants&#39; MLB payroll rank in
    2010 — the first dynasty season, won with a rotation
    built almost entirely from the draft</span>
  </div>
</div>

<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The primary source is the Lahman Baseball Database via the Lahman R package—Sean Lahman’s annually updated archive drawn from Baseball Reference and treated as the standard for longitudinal MLB franchise work. The Teams table supplies wins, losses, and attendance; the Giants appear as NY1 (1883–1957) and SFN (1958–present). The Salaries table covers individual player salaries from 1985 through 2016; team payroll is the sum of those salaries, ranked within each season.</p>
<p class="art-p">Attendance figures are official reported totals from Baseball Reference via Lahman. Chart 2 focuses on the San Francisco era and the stadium transition, so pre-1958 attendance is excluded even though it exists in the file. The 2020 fanless season is included. Salary totals omit deferred compensation quirks, minor-league pay, coaching staff, and international bonuses—they measure reported major-league player salaries, the standard method for this kind of comparison.</p>

<h2 id="141-years-of-winning-and-the-gaps-in-between" class="anchored">141 years of winning—and the gaps that defined them</h2>
<h3 id="141-years-of-winning-and-the-gaps-in-between-look" class="anchored">Franchise win percentage from the Gothams to Oracle</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/giant-the-artometrics-of-a-san-francisco-dynasty/charts/chart1_win_pct.plotly.json" data-fallback="/images/content/articles/giant-the-artometrics-of-a-san-francisco-dynasty/charts/chart1_win_pct.png" role="img" aria-label="Win Pct"></div>
</figure>
<p class="art-p">The New York Giants were one of baseball’s best franchises for the first half of the twentieth century. The smoothed trend sits above .500 from the 1890s through 1957, with five World Series titles and long runs under John McGraw and Bill Terry. McGraw’s tenure (1903–1932) remains one of the sport’s longest managerial dynasties. The franchise did not merely win occasionally; it was the standard.</p>
<p class="art-p">The 1958 move to San Francisco broke that momentum and did not fully restore it for fifty years. Candlestick produced pennants in 1962 and 1989—seven-game losses and an earthquake-interrupted Series—but the trend flatlined just below .500. Mays, McCovey, and Marichal were Hall of Fame talent without a San Francisco championship around them. The 1978 low of .383 was the worst since the Dead Ball era.</p>
<p class="art-p">The Oracle era is the sharpest structural break. From 2000 onward the raw line is more volatile, but the smoothed trend climbs into the 2010–2014 window before receding after 2016. What the smoother cannot show is the mechanism: a front office that developed its own pitching, built around Buster Posey, and won three titles in five years with a roster that looked nothing like a bought dynasty. The post-2016 dip toward .400 marks the Zaidi rebuild—an open chapter the data shows but does not finish.</p>

<h2 id="oracle-park-changed-everything" class="anchored">Oracle Park raised the floor before the dynasty arrived</h2>
<h3 id="oracle-park-changed-everything-look" class="anchored">San Francisco attendance from Candlestick to the waterfront</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/giant-the-artometrics-of-a-san-francisco-dynasty/charts/chart2_attendance.plotly.json" data-fallback="/images/content/articles/giant-the-artometrics-of-a-san-francisco-dynasty/charts/chart2_attendance.png" role="img" aria-label="Attendance"></div>
</figure>
<p class="art-p">Candlestick was bad in ways hard to communicate to anyone who never sat a night game there. Wind off the Bay knocked over coffee cups; Vin Scully called it the worst ballpark in baseball. Attendance followed: multiple 1970s seasons under 700,000, the worst figures in the National League. Even the 1989 pennant winners drew 2.1 million—a total Oracle routinely beat in rebuilding years.</p>
<p class="art-p">Oracle Park opened April 11, 2000, and drew 3.3 million in its first season. That jump—from 2.1 million in Candlestick’s final year to 3.3 million without needing a title team—is the most important financial event in franchise history. Privately financed on the waterfront, it was the first MLB stadium without public money since Dodger Stadium in 1962, which meant the Giants owned the revenue streams.</p>
<p class="art-p">From 2000 onward, a floor Candlestick never established held. Post-Bonds years (2007–2009) dipped to 2.8 million at the low—still 700,000 above Candlestick’s competitive peaks. Dynasty years pushed attendance back above 3.3 million. COVID was the only real interruption; recovery near 3.0 million by 2024 confirms the ballpark sells itself even when the roster does not.</p>

<h2 id="the-dynasty-was-built-not-bought" class="anchored">The dynasty was built on draft cost, not free-agent monopoly</h2>
<h3 id="the-dynasty-was-built-not-bought-look" class="anchored">Payroll rank versus wins, 1985–2016</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/giant-the-artometrics-of-a-san-francisco-dynasty/charts/chart3_payroll_wins.plotly.json" data-fallback="/images/content/articles/giant-the-artometrics-of-a-san-francisco-dynasty/charts/chart3_payroll_wins.png" role="img" aria-label="Payroll Wins"></div>
</figure>
<p class="art-p">Thirty-two seasons of payroll history show that money and wins never had a clean relationship in San Francisco. Pre-Oracle points scatter across mid-league spending and inconsistent results. Bonds arrived in 1993 on then-record free-agent money. The spending was real. The championships were not.</p>
<p class="art-p">The dynasty cluster is clearer. In 2010 the Giants ranked ninth in payroll, won 92 games, and won the World Series. In 2012 they ranked eighth and won 94. 2014 is the standout: payroll rank 4 with 88 wins, surviving the Wild Card and four rounds. What connects all three is not spending level but what the money bought. Lincecum, Cain, Bumgarner, and Posey were drafted in San Francisco—cheap on arrival, elite before arbitration reset the cost. Payroll rose as they were paid for work already done.</p>
<p class="art-p">By 2015–2016, top-5 payrolls returned 75 to 87 wins. The draft pipeline had slowed; the club paid market price for replacements that could not match what development had built. The window opens when homegrown players are still cheap and closes when they get paid. The Giants rode it for five years and won three times. Most franchises never ride it once.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What the charts leave open</h2>
<p class="art-p">Lahman salary data ends in 2016. Seven later seasons—including the Zaidi rebuild, the Correa signing, the failed Judge pursuit, and the Bart-to-Bailey catcher transition—are absent from Chart 3. The dynasty thesis is well supported; the post-dynasty decline is only directionally indicated. Current payroll efficiency needs Spotrac or Baseball Reference updates.</p>
<p class="art-p">Win percentage across 141 seasons carries rule and schedule shifts: pre-1900 distances and foul conventions, the 1994–95 strikes, and the 2020 pandemic season all produce outliers the LOESS smoother absorbs but does not erase. Those seasons stay in the file because removing them would scrub real history; they should be read with schedule context attached.</p>

<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The San Francisco Giants are three franchises in one uniform. The New York Giants were a dynasty—five titles before most fans owned a television. The Candlestick Giants were harder to categorize: generational talent and a stadium that made sustained fan engagement nearly impossible. Willie Mays played fifteen San Francisco seasons without a championship there. The 2010–2014 club is the third franchise—the one that finally broke Candlestick’s pattern by changing the economic conditions that produced it.</p>
<p class="art-p">Oracle Park is the foundation of the dynasty, not its product. It opened in 2000, doubled the attendance floor, and funded a top-10 payroll without burning ownership patience. When Sabean and Bochy developed Lincecum, Cain, Bumgarner, and Posey, revenue and draft cost aligned long enough to win three times. The ballpark and the rings are the same story from different angles.</p>
<p class="art-p">Whether it happens again is the open question. The payroll remains top-10, the ballpark remains a financial engine, and infrastructure is intact. What is missing is draft output at the Posey–Bumgarner level. The data says the Giants know how to win without overspending. Whether they can rediscover the development model that made that efficient is the next era’s test.</p>

<h2 id="sources" class="anchored">Sources</h2>
<p>Lahman, S. (2024). <em>Lahman Baseball Database</em> (Version 11.0). Retrieved from http://www.seanlahman.com/baseball-archive/statistics/</p>
<p>Friendly, M., Dalzell, C., Monkman, M., &amp; Murphy, D. (2021). <em>Lahman: Sean ‘Lahman’ Baseball Database</em> (R package version 10.0-1). Retrieved from https://CRAN.R-project.org/package=Lahman</p>
<p>Baseball Reference. (2024). <em>San Francisco Giants franchise history</em>. Sports Reference LLC. Retrieved from https://www.baseball-reference.com/teams/SFG/</p>
<p>James, B. (2001). <em>The New Bill James Historical Baseball Abstract</em>. Free Press.</p>
<p>Schwarz, A. (2004). <em>The Numbers Game: Baseball’s Lifelong Fascination with Statistics</em>. Thomas Dunne Books.</p>
<p>Brown, G. (2012). <em>The San Francisco Giants: 50 Years</em>. Arcadia Publishing.</p>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/giant" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
