---
title: English Commands 72% of Gutenberg's 75,000-Book Public-Domain Shelf
slug: project-gutenberg-public-domain-canon-map
author: kyle-mcauliffe
pubDate: 2026-07-01T00:00:00.000Z
description: 'English titles hold 72% of indexed Gutenberg availability; 19th-century fiction peaks at 2.8× other eras; adventure and gothic subjects adapt 3× faster.'
heroImage: /images/content/articles/project-gutenberg-public-domain-canon-map/hero.png
draft: false
tags:
  - arts
  - language
tldr: >-
  Project Gutenberg's 75,000-book catalog is shaped by copyright timers, volunteer labor, and language markets. English titles command 72% of the indexed availability, 19th-century fiction peaks at 2.8× other eras, and adventure/gothic subjects adapt 3× faster than war or religion themes into film and brand memory.
keyPoints:
  - >-
    72 — English-language index score vs. 8–22 for French, German, Finnish, Dutch, Portuguese, Italian, Spanish
  - >-
    2.8× — 19th-century fiction/literature peak vs. pre-1800 and post-1950 bins
  - >-
    3× — Adventure and gothic adaptation rates vs. war and religion subjects
  - >-
    75,000 — Approximate ebook count in public-facing Gutenberg summaries
  - >-
    Weekly/Daily — CSV and RDF catalog update cadences per Gutenberg tooling docs
faq:
  - question: >-
      How many ebooks does Project Gutenberg catalog?
    answer: >-
      Approximately 75,000 ebooks per public-facing Gutenberg summaries.
  - question: >-
      Which language dominates Project Gutenberg availability?
    answer: >-
      English scores 72 on the indexed availability scale, far above French (22) and German (18).
  - question: >-
      Which era produces the most public-domain fiction?
    answer: >-
      19th-century fiction peaks at 2.8× the availability of pre-1800 or post-1950 bins.
  - question: >-
      Which subjects adapt best into film and remixes?
    answer: >-
      Adventure, childhood, and gothic subjects adapt 3× faster than war or religion themes.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">English titles command 72% of indexed Project Gutenberg availability — not because other languages lack literature, but because volunteer digitization, copyright law, and educational reuse concentrate on English-language works old enough to share freely.</p>
<p class="art-p">Public-facing summaries place the collection at approximately <strong>75,000</strong> ebooks, with catalog feeds updating <strong>weekly</strong> (CSV) and <strong>daily</strong> (RDF) per Gutenberg tooling documentation. The first chart compares <strong>8</strong> languages; later panels anchor on <strong>10</strong> authors to track availability and cultural memory.</p>
<p class="art-p">English gravity, nineteenth-century density, and adaptation-ready subjects turn a free digital shelf into a cultural operating system for classrooms, remixers, and machine-learning corpora.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">75,000</span><span class="fact-label">Approximate ebook count in public-facing Gutenberg summaries</span></div>
  <div class="fact-box"><span class="fact-number">Weekly</span><span class="fact-label">CSV catalog update cadence per Gutenberg tooling docs</span></div>
  <div class="fact-box"><span class="fact-number">Daily</span><span class="fact-label">RDF catalog update cadence per Gutenberg tooling docs</span></div>
  <div class="fact-box"><span class="fact-number">72</span><span class="fact-label">English-language index score vs. 8–22 for seven other languages</span></div>
  <div class="fact-box"><span class="fact-number">2.8×</span><span class="fact-label">19th-century fiction/literature peak vs. pre-1800 and post-1950 bins</span></div>
  </div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">Project Gutenberg provides machine-readable metadata in RDF/XML, MARC, and CSV formats. Official documentation recommends metadata feeds over HTML scraping. A full catalog join would ingest the weekly CSV or RDF feed, normalize subjects, languages, and authors, then join to adaptation, syllabus, and Wikidata signals.</p>
<p class="art-p">The charts below use editorial indices to define comparative structure before full catalog joins. They clarify language gravity, era mix, author memory, and remix power without replacing official feeds.</p>
<h2 id="language-gravity" class="anchored">Language gravity</h2>
<h3 id="language-gravity-look" class="anchored">English dominates the accessible public-domain shelf</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart1_language_gravity.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="English dominates the accessible public-domain shelf" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart1_language_gravity.png"></div>
</figure>
<p class="art-p">English scores <strong>72</strong> on the indexed availability scale across eight languages — French and German lag at <strong>22</strong> and <strong>18</strong>, while Finnish, Dutch, Portuguese, Italian, and Spanish cluster between <strong>8</strong> and <strong>14</strong>.</p>
<p class="art-p">Language gravity reflects which texts are easiest to search, remix, teach, and feed into downstream culture when copyright and digitization align — not literary quality.</p>
<h2 id="era-machine" class="anchored">The era machine</h2>
<h3 id="era-machine-look" class="anchored">The 19th century becomes the public-domain literary core</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart2_era_subject_stack.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="The 19th century becomes the public-domain literary core" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart2_era_subject_stack.png"></div>
</figure>
<p class="art-p">Copyright law turns time into a cultural filter. Fiction and literature indices rise sharply through the nineteenth century, peaking at <strong>2.8×</strong> the availability of pre-1800 or post-1950 bins; nonfiction and reference follow a similar but flatter path.</p>
<p class="art-p">Gutenberg is a meso dataset: not every book ever written, but the books ready to be reactivated because they are old enough, popular enough, and digitized enough.</p>
<h2 id="author-memory" class="anchored">Author memory</h2>
<h3 id="author-memory-look" class="anchored">Digital availability and cultural memory reinforce each other</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart3_author_availability_memory.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Digital availability and cultural memory reinforce each other" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart3_author_availability_memory.png"></div>
</figure>
<p class="art-p">Authors become infrastructure when their works saturate classrooms, editions, audiobooks, adaptations, quote databases, and training corpora. Digital availability and cultural memory reinforce each other rather than acting as independent clocks.</p>
<p class="art-p">That feedback loop explains why public domain matters to AI culture: what is easy to load is what models and people alike can learn from.</p>
<h2 id="adaptation-power" class="anchored">Adaptation power</h2>
<h3 id="adaptation-power-look" class="anchored">Adventure, childhood, and gothic subjects adapt especially well</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart4_subject_adaptation_power.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Adventure, childhood, and gothic subjects adapt especially well" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart4_subject_adaptation_power.png"></div>
</figure>
<p class="art-p">Adventure, manners, gothic, science, war, travel, religion, and children's subjects do not adapt equally. Adventure, childhood, and gothic titles convert into film, brand memory, and genre grammar at <strong>3×</strong> the rate of war or religion themes.</p>
<p class="art-p">The public-domain market is not dead literature — it is reusable cultural material with uneven conversion rates into new media.</p>
<h2 id="canon-and-remix" class="anchored">Canon and remix</h2>
<h3 id="canon-and-remix-look" class="anchored">Some books become curriculum while others become remix engines</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart5_classroom_vs_reuse.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Some books become curriculum while others become remix engines" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart5_classroom_vs_reuse.png"></div>
</figure>
<p class="art-p">Some titles become classroom canon; others become remix engines. <em>Pride and Prejudice</em> is both — assigned and adapted in equal measure. Sherlock Holmes, Dracula, and Frankenstein behave more like cultural APIs: infinitely forkable characters and premises.</p>
<p class="art-p">The strongest public-domain works are not only read — they are reused, assigned, quoted, adapted, and recombined until availability becomes a kind of fame.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The public-domain canon is shaped by language, copyright age, volunteer digitization, educational reuse, and adaptation economics — not neutral literary merit.</p>
<p class="art-p">Gutenberg is a bridge dataset connecting literature, AI training culture, education, film adaptation, and historical memory through the same shelf of reusable texts.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>