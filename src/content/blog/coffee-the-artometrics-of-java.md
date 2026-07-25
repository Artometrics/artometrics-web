---
title: Coffee’s Place in Global Trade and Daily Life
slug: coffee-the-artometrics-of-java
pubDate: 2026-04-14T00:00:00.000Z
description: >-
  Commodity and consumption data place coffee among the world’s largest traded
  goods.
heroImage: /images/content/articles/coffee-the-artometrics-of-java/hero.png
draft: false
tags:
  - culture
  - food
tldr: >-
  Coffee is the world’s second-largest traded commodity by value, behind only
  crude oil. More than 125 million people depend on it for their livelihoods.
  Around 2.25 billion cups are consumed every day.
keyPoints:
  - >-
    1,339 — Coffee samples rated by CQI Q Graders across Arabica and Robusta
    species
  - >-
    85.3 — Ethiopia&#39;s median CQI cup score — highest of any country with 20+
    samples
  - >-
    0 — Starbucks locations in Ethiopia, Kenya, and Uganda — the top three
    scoring nations
  - '16 — Countries with 20+ CQI-rated Arabica samples, spanning four continents'
  - >-
    7 — Sensory sub-metrics scored per sample — aroma, flavor, aftertaste,
    acidity, body, balance, cupper points
  - >-
    25,600 — Starbucks locations worldwide across 73 countries, as of the 2018
    dataset
faq:
  - question: Where Great Coffee Comes From?
    answer: >-
      Key figure: 1,339 — Coffee samples rated by CQI Q Graders across Arabica
      and Robusta species. Keep these markers in view as the story unfolds.
  - question: What does the data show about The Quality-Retail Disconnect?
    answer: >-
      Key figure: 85.3 — Ethiopia&#39;s median CQI cup score — highest of any
      country with 20+ samples. Keep these markers in view as the story unfolds.
  - question: What does the data show about The Sub-Metric Fingerprint?
    answer: >-
      Key figure: 0 — Starbucks locations in Ethiopia, Kenya, and Uganda — the
      top three scoring nations. Keep these markers in view as the story
      unfolds.
  - question: What this file cannot tell you?
    answer: >-
      Key figure: 16 — Countries with 20+ CQI-rated Arabica samples, spanning
      four continents. Keep these markers in view as the story unfolds.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Coffee is the world’s second-largest traded commodity by value, behind only crude oil. More than 125 million people depend on it for their livelihoods. Around 2.25 billion cups are consumed every day. And yet the country that produces the highest-quality coffee on earth — by a significant margin, according to the Coffee Quality Institute’s own grading data — has exactly zero Starbucks locations. That country is Ethiopia.</p>
<p class="art-p">What follows uses CQI cupping scores and country-level samples to ask a simple question: where does quality concentrate, and how little that map resembles the retail geography of coffee brands.</p>
<h2 id="research-question" class="anchored">Research question</h2>
<p class="art-p">Does the geography of high-scoring coffee match the geography of retail coffee power? This report asks whether Coffee Quality Institute cupping scores and Starbucks store counts describe the same global map or two different positions in the commodity chain.</p>
<p class="art-p">The observational question is where Arabica quality concentrates once country medians and sensory sub-metrics are plotted, and whether that origin map aligns with the markets where a dominant branded retailer operates stores. The answer matters because origin value, sensory quality, and retail capture are often discussed as if they naturally reinforce one another.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">1,339</span>
    <span class="fact-label">Coffee samples rated by CQI Q Graders across Arabica and Robusta species</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">85.3</span>
    <span class="fact-label">Ethiopia&#39;s median CQI cup score — highest of any country with 20+ samples</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">0</span>
    <span class="fact-label">Starbucks locations in Ethiopia, Kenya, and Uganda — the top three scoring nations</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">16</span>
    <span class="fact-label">Countries with 20+ CQI-rated Arabica samples, spanning four continents</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">7</span>
    <span class="fact-label">Sensory sub-metrics scored per sample — aroma, flavor, aftertaste, acidity, body, balance, cupper points</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">25,600</span>
    <span class="fact-label">Starbucks locations worldwide across 73 countries, as of the 2018 dataset</span>
  </div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The Coffee Quality Institute is a nonprofit that trains and certifies Q Graders — licensed sensory evaluators who score coffee using a standardized 100-point protocol. A sample must score 80 or above to qualify as specialty coffee. The CQI dataset made available through TidyTuesday (2020-07-07) contains <strong>1,339</strong> samples spanning Arabica and Robusta species, with individual scores across ten sub-metrics plus a total cup points aggregate. This analysis focuses exclusively on Arabica. After removing one data entry error (a near-zero-score row), the working Arabica dataset contains 1,312 samples from 36 countries.</p>
<p class="art-p">The Starbucks locations dataset (TidyTuesday 2018-05-07) documents <strong>25,600</strong> individual store locations across 73 countries, with brand, ownership type, city, and geographic coordinates. For the quality-versus-retail chart, Starbucks counts were aggregated at the country level and joined to CQI quality scores using ISO-2 country codes.</p>
<p class="art-p">The sub-metric fingerprint covers seven of the ten CQI sub-metrics: aroma, flavor, aftertaste, acidity, body, balance, and cupper points. Uniformity, clean cup, and sweetness were excluded because they function more as defect-penalty fields than sensory attributes. The top eight countries by sample volume were selected for the heatmap to ensure statistically stable medians.</p>
<h2 id="where-great-coffee-comes-from" class="anchored">Where Great Coffee Comes From</h2>
<h3 id="where-great-coffee-comes-from-look" class="anchored">Country Ridgeline</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/coffee-the-artometrics-of-java/charts/chart1_country_ridgeline.plotly.json" data-fallback="/images/content/articles/coffee-the-artometrics-of-java/charts/chart1_country_ridgeline.png" role="img" aria-label="Country Ridgeline"></div>
</figure>
<p class="art-p">Ethiopia doesn’t just lead — it occupies a different part of the distribution entirely. While the median cup score across all 16 qualifying countries sits at 82.5, Ethiopia’s distribution peaks near 85 and has a long right tail that no other origin comes close to matching. Kenya and Uganda sit in second and third, but their distributions overlap substantially with the rest of the field. Ethiopia’s does not.</p>
<p class="art-p">What makes this finding significant is what it implies about terroir and altitude. Ethiopia is the genetic origin of Arabica coffee — the Kaffa region in southwestern Ethiopia is where the species was first documented growing wild. The country’s range of elevation, soil diversity, and processing tradition produces a flavor complexity that Q Graders consistently reward with above-median scores across every sub-metric.</p>
<p class="art-p">The bottom of the chart is equally instructive. Nicaragua, Mexico, Honduras, and Taiwan all cluster between 81 and 83 — technically specialty grade, but right at the floor. Brazil, the world’s largest coffee producer by volume, lands firmly in the lower half — a reminder that market dominance and cup quality are not the same thing.</p>

<h2 id="the-quality-retail-disconnect" class="anchored">The Quality-Retail Disconnect</h2>
<h3 id="the-quality-retail-disconnect-look" class="anchored">Quality Vs Retail</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/coffee-the-artometrics-of-java/charts/chart2_quality_vs_retail.plotly.json" data-fallback="/images/content/articles/coffee-the-artometrics-of-java/charts/chart2_quality_vs_retail.png" role="img" aria-label="Quality Vs Retail"></div>
</figure>
<p class="art-p">There is no positive relationship between a country’s quality score and Starbucks’ retail presence there. The three highest-scoring origins — Ethiopia, Kenya, and Uganda — all sit at zero Starbucks locations. Meanwhile, Hawaii (USA) lands near the top of the y-axis not because of its quality rank alone but because its ISO code maps to the US, which hosts thousands of Starbucks locations.</p>
<p class="art-p">This is structural. Starbucks builds stores in markets where it can sell coffee, not only in markets where it sources coffee. Ethiopia’s retail consumer market is too small and too low-income to support the Starbucks price point at scale. The company sources Ethiopian beans, but that sourcing relationship does not translate into a domestic retail presence.</p>
<p class="art-p">Colombia reinforces the pattern: a recognized origin with specialty scores that still shows little Starbucks store footprint relative to the fame of its beans. Economic value from growing specialty coffee does not automatically accumulate where the coffee is grown.</p>

<h2 id="the-sub-metric-fingerprint" class="anchored">The Sub-Metric Fingerprint</h2>
<h3 id="the-sub-metric-fingerprint-look" class="anchored">Submetric Heatmap</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/coffee-the-artometrics-of-java/charts/chart3_submetric_heatmap.plotly.json" data-fallback="/images/content/articles/coffee-the-artometrics-of-java/charts/chart3_submetric_heatmap.png" role="img" aria-label="Submetric Heatmap"></div>
</figure>
<p class="art-p">Ethiopia doesn’t just score higher overall — it scores higher on every single sub-metric among the eight-country heatmap field. Its median acidity, cupper points, and flavor lead the set. Kenya comes close on aroma and flavor but trails on most other dimensions.</p>
<p class="art-p">What the heatmap also reveals is how flat the remaining countries are. Brazil sits in a narrow mid band across attributes — consistent and undifferentiated. Honduras and Mexico are nearly indistinguishable on several scores. When buyers talk about commodity coffee, this is the sensory data behind the phrase.</p>
<p class="art-p">Guatemala and Colombia show elevated acidity and balance relative to that flat middle — profiles that translate easily into consumer language about brightness and approachability.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">The CQI dataset reflects what Q Graders evaluate — not a random sample of all coffee produced. Farms that can afford evaluation tend to be larger or already tied into specialty chains, so subsistence-grade output is underrepresented.</p>
<p class="art-p">The Starbucks dataset is from 2018. Store counts should not be treated as current, even if the directional finding about missing retail presence in top African origins has remained directionally stable. Starbucks is a proxy for one dominant chain, not the full café and grocery landscape.</p>
<p class="art-p">Country-level analyses were filtered to origins with 20 or more CQI samples, cutting the pool from 36 to 16 countries. Prestigious origins with fewer submissions — including some ultra-premium varieties — are absent from the heatmap.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Quality and market power are not the same thing, and they do not flow in the same direction. Ethiopia produces the highest-rated coffee in this CQI slice by a significant margin and shows zero Starbucks locations in the joined retail file.</p>
<p class="art-p">Brazil dominates volume while scoring in the lower half of this quality ranking. The countries that grow the best-scoring coffee are not automatically the countries that capture the most retail value from coffee’s global brand.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p class="art-p">The Coffee Quality Institute data should be interpreted as a specialty-coffee evaluation archive, not a random sample of all coffee production. CQI Q Graders score submitted samples under standardized protocols, which means the file is strongest for comparing evaluated specialty lots and weaker for estimating national production averages. The Starbucks file adds a retail-chain geography from 2018, useful as a branded-store proxy but not as a full measure of cafe, grocery, roaster, or export-market value.</p>
<p class="art-p">The broader citation frame comes from coffee-development and value-chain research by Daviron, Ponte, Samper, Quiñones-Ruiz, and the International Coffee Organization. Those sources matter because the charts show a classic commodity-chain split: Ethiopia, Kenya, Uganda, Colombia, Brazil, and other origins can produce sensory value, while roasting, branding, retail real estate, and consumer pricing often capture value elsewhere.</p>
<div class="art-references">
  <div class="art-ref-item">
    TidyTuesday (2020-07-07). <em>Coffee Ratings</em>.
    R for Data Science Community.
    <a href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2020/2020-07-07" target="_blank">
      github.com/rfordatascience/tidytuesday/…/2020-07-07
    </a>
  </div>
  <div class="art-ref-item">
    TidyTuesday (2018-05-07). <em>Coffee Chains</em>.
    R for Data Science Community.
    <a href="https://github.com/rfordatascience/tidytuesday/blob/master/data/2018/2018-05-07" target="_blank">
      github.com/rfordatascience/tidytuesday/…/2018-05-07
    </a>
  </div>
  <div class="art-ref-item">
    Coffee Quality Institute. (2020). <em>Q Grader Program and Cupping
    Protocols</em>. Retrieved from
    <a href="https://www.coffeeinstitute.org" target="_blank">coffeeinstitute.org</a>
  </div>
  <div class="art-ref-item">
    Samper, L. F., &amp; Quiñones-Ruiz, X. F. (2017). Towards a balanced
    sustainability vision for the coffee industry. <em>Resources</em>, <em>6</em>(2), 17.
    <a href="https://doi.org/10.3390/resources6020017" target="_blank">
      doi.org/10.3390/resources6020017
    </a>
  </div>
  <div class="art-ref-item">
    Daviron, B., &amp; Ponte, S. (2005). <em>The Coffee Paradox: Global Markets,
    Commodity Trade and the Elusive Promise of Development</em>. Zed Books.
  </div>
  <div class="art-ref-item">
    Wintgens, J. N. (Ed.). (2009). <em>Coffee: Growing, Processing, Sustainable
    Production</em> (2nd ed.). Wiley-VCH.
  </div>
</div>

<h2 id="editor-s-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p class="art-p">
This analysis was researched, written, designed, and produced in active
collaboration with Claude AI (Anthropic). The data pipeline, statistical
analysis, chart design, written analysis, narrative structure, and visual
styling were all developed through a directed partnership between human
editorial judgment and AI execution.
</p>
<p class="art-p">
Artometrics was built on the premise that rigorous analysis and honest
process are not in conflict. The research questions, editorial instincts,
interpretive framing, and brand vision are ours. The execution — every
line of R code, every paragraph of analysis, every design decision — was
a collaboration. We document this not as a disclaimer but as a
description of how we actually work, and as a position: we believe this
is what serious data journalism looks like when the tools available are
used honestly and at full capacity.
</p>
<p class="art-p">— Artometrics Editorial</p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/coffee" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
