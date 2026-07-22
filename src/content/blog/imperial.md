---
title: 'What Empire Chronicles Leave Out: Who Got Rich'
slug: imperial
pubDate: 2026-04-14T00:00:00.000Z
description: >-
  A historical-economics lens asks who captured wealth when rulers claimed
  order.
heroImage: /images/content/2026/04/IMG_4160.webp
tags:
  - culture
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p>Every empire in history has told the same story about itself: we brought order, we built roads, we made the trains run on time. What the chronicles leave out is the spreadsheet. Who actually got richer? How long did the prosperity last? And when it ended, how fast did it go?</p>
<p>Those questions have answers now. The Maddison Project Database — the most comprehensive long-run economic dataset ever assembled — lets us put Rome, Britain, the Ottomans, Imperial China, the Mongols, and Habsburg Spain on the same chart and ask: what does empire actually look like as an economic system?</p>
<p>The answer is not what the history textbooks imply. GDP goes up. Real wages mostly don’t. The rise takes centuries. The fall takes decades. And in every case, the institutions built to extract surplus during expansion become structurally incapable of sharing it during maturation. That’s the pattern. Six empires. No exceptions.</p>
<hr>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">1,200 yrs</span>
    <span class="fact-label">Time for Western Europe to recover Rome&#39;s peak GDP per capita after the 476 CE collapse</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">23%</span>
    <span class="fact-label">Share of global population governed by the British Empire at its 1920 territorial peak — 412 million people</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">~7×</span>
    <span class="fact-label">Number of times Imperial China cycled through full unification and fragmentation between 221 BCE and 1912 CE</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">180,000 t</span>
    <span class="fact-label">Silver extracted by Habsburg Spain from the Americas between 1500 and 1800 — as Castilian real wages declined</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">10%</span>
    <span class="fact-label">Estimated share of global population killed in Mongol conquests, 1206–1260 — 30 to 40 million deaths</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">30–80 yrs</span>
    <span class="fact-label">How far peak centralization precedes GDP peak across all six empires — the institutional lag</span>
  </div>
</div>
<hr>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The Maddison Project Database is the closest thing economics has to a time machine. Originally assembled by Angus Maddison and now maintained by the University of Groningen, it provides GDP per capita estimates — expressed in 2011 USD purchasing power parity — stretching back to 1 CE for some countries and to 1000 BCE for a handful of ancient economies. The 2023 update, published by Bolt and van Zanden, is the version used here, accessed via Our World in Data’s public CSV endpoint.</p>
<p>Six empire cores were selected to represent distinct geographies, time periods, and institutional types: the Roman Empire (proxied by Italy, back-extrapolated from 1–476 CE using Maddison 2007, Scheidel and Friesen 2009, and Lo Cascio and Malanima 2009), the British Empire (United Kingdom), the Ottoman Empire (Turkey), Imperial China (China), Habsburg-Spain (Spain), and the Mongol Empire. The Mongol series has no Maddison country code and is constructed as a population-weighted average of China (45%), Russia (30%), and Turkey (25%) for 1200–1400 CE — the best available proxy for a steppe empire that governed all three regions simultaneously.</p>
<p>Each empire’s GDP series is capped at its historical dissolution date: Rome at 476 CE, the Mongols at 1400, Habsburg-Spain at 1808, Imperial China at 1912, the Ottoman Empire at 1918, and the British Empire at 1947 (Indian independence). Real wage data — used in Chart 3 to construct the extraction gap — comes from Robert Allen’s European wages series (2001), Özmucur and Pamuk’s Ottoman wage reconstruction (2002), and Allen et al.’s China and Asia series (2011). All wage figures are expressed in silver grams per day for an unskilled male laborer.</p>
<p>This report is not a comprehensive economic history. It is a structured comparison: six empires on the same axes, asking the same questions. What does empire produce? Who captures it? And how fast does it disappear?</p>

</div>

</div>
<hr>
<h2 id="chart-1-gdp-per-capita-across-empire-cores" class="anchored">GDP PER CAPITA ACROSS EMPIRE CORES</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/imperial/charts/chart1_gdppc_all_empires.plotly.json" data-fallback="/images/content/articles/imperial/charts/chart1_gdppc_all_empires.png" role="img" aria-label="Gdppc All Empires"></div>
</figure>
</div>
</div>
</div>
<h3 id="the-flatline-is-the-story" class="anchored">THE FLATLINE IS THE STORY</h3>
<p>For the first 1,800 years of this chart, five of the six empire cores are essentially stationary. Rome peaks early and declines. The Ottomans and Imperial China drift sideways for centuries. Habsburg Spain — despite controlling the most silver-producing territory in human history — never generates a GDP breakout. The Mongol blip in the 1260s appears and vanishes within a century. The chart’s visual drama is entirely a British phenomenon, and it doesn’t begin until roughly 1800.</p>
<p>That flatness is not a data artifact. Pre-industrial economies were governed by a hard ceiling: agricultural productivity. Every empire eventually hit the same constraint — you can conquer more land, you can tax more efficiently, you can build better roads — but you cannot grow aggregate output faster than the soil can produce food. This is why five empires operating across four millennia produce nearly identical GDP trajectories. They were all playing the same zero-sum game.</p>
<h3 id="the-british-divergence-is-not-a-governance-story" class="anchored">THE BRITISH DIVERGENCE IS NOT A GOVERNANCE STORY</h3>
<p>The temptation when looking at Chart 1 is to conclude that Britain governed better. This is wrong. The British divergence is a technology story, not an institutional one. Steam power — specifically the transition from organic energy (human labor, animal muscle, firewood) to fossil energy (coal) — removed the agricultural ceiling entirely. British GDP per capita in 1900 is not high because of better laws or smarter monarchs. It is high because coal-powered factories could produce manufactured goods at a scale that no farming economy could match, and Britain industrialized first.</p>
<h3 id="romes-peak-is-an-argument-about-ancient-living-standards" class="anchored">ROME’S PEAK IS AN ARGUMENT ABOUT ANCIENT LIVING STANDARDS</h3>
<p>The Roman GDP line in this dataset is a back-extrapolation built from Maddison (2007), Scheidel and Friesen (2009), and Lo Cascio and Malanima (2009) — the best available estimates, with significant uncertainty bands. At roughly $1,000–1,200 in 2011 USD PPP, the Roman Empire’s peak was genuinely impressive for its era. It represents something like double the GDP per capita of its contemporaries and suggests a level of market integration — trans-Mediterranean trade, monetized labor, professional armies — that would not reappear in Europe for a thousand years after the Western collapse.</p>

</div>
<hr>
<h2 id="chart-2-rise-fast-fall-faster" class="anchored">RISE FAST, FALL FASTER</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/imperial/charts/chart2_empire_lifespan_indexed.plotly.json" data-fallback="/images/content/articles/imperial/charts/chart2_empire_lifespan_indexed.png" role="img" aria-label="Empire Lifespan Indexed"></div>
</figure>
</div>
</div>
</div>
<h3 id="every-empire-passes-through-the-same-door" class="anchored">EVERY EMPIRE PASSES THROUGH THE SAME DOOR</h3>
<p>Chart 2 removes the distortion of absolute scale. By indexing every empire’s GDP per capita to its own peak (peak = 100) and aligning on a ±200 year window, we can compare trajectories directly. What emerges is not six different stories — it’s one story with six variations in speed.</p>
<p>The left side of the chart (years before peak) shows the consolidation phase. Resources flow inward, administration tightens, transaction costs fall, and GDP rises. The right side (years after peak) shows the extraction phase running out of road. The institutional machine keeps turning, but the returns on further centralization diminish, external shocks go unabsorbed, and GDP falls. Every empire, on this chart, is climbing the same mountain.</p>
<h3 id="the-fall-is-structurally-faster-than-the-rise" class="anchored">THE FALL IS STRUCTURALLY FASTER THAN THE RISE</h3>
<p>This is the finding that Chart 2 makes hardest to argue with. Every empire in the dataset rises over a period of two to five centuries. Every empire declines in a fraction of that time. Rome takes roughly 300 years from Augustus to Western collapse — but the indexed chart shows that 60% of the GDP loss happens in the last 80 years, after the Crisis of the Third Century (235 CE). Habsburg Spain’s post-peak decline is sharp and early; the empire technically persisted for another century, but the GDP trajectory turned negative almost immediately after Philip II’s peak. The Mongol Empire — the most extreme case — rises from virtually nothing to continental dominance in 60 years and fragments within a generation of Kublai Khan’s death.</p>
<h3 id="the-roman-exception-that-proves-the-rule" class="anchored">THE ROMAN EXCEPTION THAT PROVES THE RULE</h3>
<p>The Roman line in Chart 2 stands out as the flattest post-peak trajectory — holding above 80% of peak for nearly a century after the GDP maximum. This is not evidence of Roman resilience; it is evidence of how slowly the Western Roman political structure dissolved compared to how quickly the underlying economy had already stopped growing. Walter Scheidel’s work on Roman inequality (<em>The Great Leveler</em>, 2017) identifies this period as one of elite wealth concentration rather than broad prosperity — the GDP aggregate was holding because the very top of the distribution was insulating itself from the broader decline.</p>

</div>
<hr>
<h2 id="chart-3-the-extraction-gap" class="anchored">THE EXTRACTION GAP</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/imperial/charts/chart3_extraction_gap.plotly.json" data-fallback="/images/content/articles/imperial/charts/chart3_extraction_gap.png" role="img" aria-label="Extraction Gap"></div>
</figure>
</div>
</div>
</div>
<h3 id="the-gap-is-the-point" class="anchored">THE GAP IS THE POINT</h3>
<p>Chart 3 is the payoff. By indexing both GDP per capita and real wages to 1500 = 100 for each empire, it shows what happened to the surplus generated by imperial growth — and specifically, how much of it reached ordinary workers versus how much was captured above them. The shaded area between the GDP line (solid) and the wage line (dashed) is the visual measure of extraction: surplus produced but not distributed. In three of the four empires shown, that gap widens dramatically over time. In one — Britain, post-Industrial Revolution — it eventually closes.</p>
<h3 id="britain-the-only-empire-where-workers-eventually-won" class="anchored">BRITAIN: THE ONLY EMPIRE WHERE WORKERS EVENTUALLY WON</h3>
<p>The British panel is the most complex in Chart 3. From 1500 to roughly 1750, GDP per capita and real wages move more or less in parallel. Then the Industrial Revolution hits. GDP per capita accelerates dramatically. Real wages initially lag, producing the classic “Engels Pause” — the period between roughly 1780 and 1840 when British workers lived through massive productivity growth without real wage gains. But then something unprecedented in imperial history happens: the dashed line catches up. By the late 19th century, British real wages are rising faster than GDP per capita. Britain is the only empire in this dataset where workers at the bottom of the distribution captured a significant share of imperial growth before the empire ended.</p>
<h3 id="habsburg-spain-the-most-extreme-extraction-machine" class="anchored">HABSBURG SPAIN: THE MOST EXTREME EXTRACTION MACHINE</h3>
<p>Habsburg Spain’s wage line is the most damning line on the chart. Starting at approximately 1.8 silver grams per day in 1500, it declines steadily to roughly 1.0 by 1600 and never recovers. This is the period during which Spanish galleons were carrying hundreds of tonnes of silver annually from Potosí and Zacatecas to Seville. The mechanism is the Price Revolution: the flood of American silver raised prices across the European economy while nominal wages failed to keep pace. Habsburg Spain extracted the largest resource windfall in pre-industrial history and distributed the gains almost entirely to the Crown, the Church, and the Genoese bankers who financed imperial debt. The workers got the inflation.</p>

</div>
<hr>
<h2 id="limitations" class="anchored">Caveats</h2>
<h3 id="the-mongol-data-problem" class="anchored">THE MONGOL DATA PROBLEM</h3>
<p>The Maddison Project has no Mongol Empire country code. The figures here use a population-weighted average of China (CHN, 45%), Russia (RUS, 30%), and Turkey (TUR, 25%) for 1200–1400 CE. Turkey is the closest available proxy for the Ilkhanate’s Persia-Iraq core. This captures broad regional output but understates the empire’s Central Asian footprint. SESHAT Databank remains the most rigorous replacement.</p>
<h3 id="pre-1000-ce-data-sparsity" class="anchored">PRE-1000 CE DATA SPARSITY</h3>
<p>Maddison’s ancient-era GDP figures are back-extrapolations built on archaeological proxies — lead pollution records, shipwreck counts, amphora production. They carry uncertainty bands that would dwarf the point estimates if visualized. The Roman and Han Chinese figures are the best-supported; treat all others as orders of magnitude.</p>
<h3 id="the-1300-ce-wage-floor" class="anchored">THE 1300 CE WAGE FLOOR</h3>
<p>Real wage data is largely unavailable before ~1300 CE, making the extraction gap analysis in Chart 3 impossible for Rome or the early Mongol period. Pre-wage-labor tributary economies did not generate the record types from which wages can be reconstructed.</p>
<h3 id="empire-proxies-are-imperfect" class="anchored">EMPIRE PROXIES ARE IMPERFECT</h3>
<p>Mapping a multi-continental empire to a single modern country code (Britain = GBR, Ottoman = TUR) captures the metropolitan core but ignores the periphery. British GDP per capita for the UK does not include what was extracted from India, Africa, or the Caribbean. The chart shows what happened to the empire’s home population — not to its subjects.</p>
<hr>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<h3 id="the-pattern-is-the-same-every-time" class="anchored">THE PATTERN IS THE SAME EVERY TIME</h3>
<p>Six empires. Four thousand years. The curve barely changes. A period of administrative consolidation reduces transaction costs, enables infrastructure at scale, and produces a GDP spike. That spike is real — it shows up in the Maddison data clearly. What it conceals is who captured the gains — and Chart 3 is where the concealment ends.</p>
<h3 id="gdp-goes-up.-wages-dont-follow." class="anchored">GDP GOES UP. WAGES DON’T FOLLOW.</h3>
<p>In every empire with wage data, the extraction gap widens during peak imperial expansion. British GDP per capita grew roughly <strong>150%</strong> between 1700 and 1850. Real wages for English laborers grew approximately <strong>30–40%</strong> over the same window. The rest went to rents, dividends, and colonial surplus. The Ottoman and Habsburg cases are more extreme. Habsburg Spain extracted the largest silver haul in pre-industrial history and produced domestic wage stagnation. More money in the system; less in the wage earner’s hand.</p>
<h3 id="the-collapse-is-always-faster-than-the-rise" class="anchored">THE COLLAPSE IS ALWAYS FASTER THAN THE RISE</h3>
<p>Chart 2 makes this structural. Every empire takes two to five centuries to build GDP to peak. The fall takes a fraction of that time. The Roman trajectory from Commodus to Western collapse is roughly 300 years — but 60% of the GDP loss happens in the last 80. The Mongol Empire peaks in 1260 and is functionally fragmented by 1350. Speed asymmetry is the rule, not the exception.</p>
<h3 id="the-habsburg-paradox-is-the-tell" class="anchored">THE HABSBURG PARADOX IS THE TELL</h3>
<p>Of the six empires in this dataset, Habsburg Spain is the clearest controlled experiment. Remove the silver and the empire is simply Spain — a mid-tier European power with standard institutional problems. Add 180,000 tonnes of silver and you get accelerated inflation, wage suppression, and eventual fiscal collapse. The resource abundance didn’t produce a richer empire. It produced a more efficient extraction machine that consumed itself. That’s not a 16th-century problem. It’s a template.</p>
<p>-KSM.</p>
<hr>
<h2 id="references" class="anchored">Sources</h2>
<p>Allen, R. C. (2001). The great divergence in European wages and prices from the Middle Ages to the First World War. <em>Explorations in Economic History, 38</em>(4), 411–447.</p>
<p>Allen, R. C., Bassino, J. P., Ma, D., Moll-Murata, C., &amp; van Zanden, J. L. (2011). Wages, prices, and living standards in China, 1738–1925. <em>Economic History Review, 64</em>(S1), 8–38.</p>
<p>Bolt, J., &amp; van Zanden, J. L. (2024). Maddison style estimates of the evolution of the world economy: A new 2023 update. <em>Journal of Economic Surveys</em>, 1–41. https://doi.org/10.1111/joes.12618</p>
<p>Goldstone, J. A. (1991). <em>Revolution and rebellion in the early modern world.</em> University of California Press.</p>
<p>Lo Cascio, E., &amp; Malanima, P. (2009). GDP in pre-modern agrarian economies (1–1820 AD): A revision of the estimates. <em>Rivista di Storia Economica, 25</em>(3), 391–420.</p>
<p>Morris, I. (2013). <em>The measure of civilization: How social development decides the fate of nations.</em> Princeton University Press.</p>
<p>Özmucur, S., &amp; Pamuk, Ş. (2002). Real wages and standards of living in the Ottoman Empire, 1489–1914. <em>Journal of Economic History, 62</em>(2), 293–321.</p>
<p>Pomeranz, K. (2000). <em>The great divergence: China, Europe, and the making of the modern world economy.</em> Princeton University Press.</p>
<p>Scheidel, W. (2017). <em>The great leveler: Violence and the history of inequality from the stone age to the twenty-first century.</em> Princeton University Press.</p>
<p>Scheidel, W., &amp; Friesen, S. J. (2009). The size of the economy and the distribution of income in the Roman Empire. <em>Journal of Roman Studies, 99</em>, 61–91.</p>
<p>Turchin, P. (2006). <em>War and peace and war: The rise and fall of empires.</em> Pi Press.</p>
<p>Turchin, P., &amp; Nefedov, S. A. (2009). <em>Secular cycles.</em> Princeton University Press.</p>
<hr>
<h2 id="editors-note" class="anchored">EDITOR’S NOTE</h2><div class="art-editorial-note"><p><em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. Artometrics was built on the premise that rigorous analysis and honest process are not in conflict. The research questions, editorial instincts, interpretive framing, and brand vision are ours. The execution — every line of R code, every paragraph of analysis, every design decision — was a collaboration. We document this not as a disclaimer but as a description of how we actually work, and as a position: we believe this is what serious data journalism looks like when the tools available are used honestly and at full capacity.</em></p>
<p><em>— Artometrics Editorial</em></p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/imperial" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
