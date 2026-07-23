---
title: Mapping the Public-Domain Canon Through Project Gutenberg
slug: project-gutenberg-public-domain-canon-map
pubDate: 2026-07-01T00:00:00.000Z
description: 'Gutenberg metadata charts language gravity, era effects, and author memory.'
heroImage: /images/content/articles/project-gutenberg-public-domain-canon-map/hero.png
tags:
  - books
draft: false
tldr: >-
  Project Gutenberg is not only a library. It is a map of what digitized
  public-domain culture looks like when volunteer labor, copyright timers, and
  language markets decide what is easy to share. Public-facing summaries place
  the collection on the order of 75K+ ebooks, with catalog feeds updating on
  weekly CSV and daily RDF cadences in Gutenberg tooling docs.
keyPoints:
  - >-
    75K+ — Approximate scale of Project Gutenberg ebooks in public-facing
    summaries
  - Weekly — CSV catalog update cadence noted in Gutenberg tooling docs
  - Daily — RDF catalog update cadence noted by Gutenberg
  - 8 — Languages compared in the first chart
  - 10 — Authors used as anchors
faq:
  - question: What does the data show about Language gravity?
    answer: >-
      Key figure: 75K+ — Approximate scale of Project Gutenberg ebooks in
      public-facing summaries. English gravity, nineteenth-century density, and
      adaptation-ready subjects are the three forces that turn a free shelf into
      a cultural operating system for schools, remixers, and machines.
  - question: What does the data show about The era machine?
    answer: >-
      Key figure: Weekly — CSV catalog update cadence noted in Gutenberg tooling
      docs. English gravity, nineteenth-century density, and adaptation-ready
      subjects are the three forces that turn a free shelf into a cultural
      operating system for schools, remixers, and machines.
  - question: What does the data show about Author memory?
    answer: >-
      Key figure: Daily — RDF catalog update cadence noted by Gutenberg. English
      gravity, nineteenth-century density, and adaptation-ready subjects are the
      three forces that turn a free shelf into a cultural operating system for
      schools, remixers, and machines.
  - question: What does the data show about Adaptation power?
    answer: >-
      Key figure: 8 — Languages compared in the first chart. English gravity,
      nineteenth-century density, and adaptation-ready subjects are the three
      forces that turn a free shelf into a cultural operating system for
      schools, remixers, and machines.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Project Gutenberg is not only a library. It is a map of what digitized public-domain culture looks like when volunteer labor, copyright timers, and language markets decide what is easy to share.</p>
<p class="art-p">Public-facing summaries place the collection on the order of <strong>75K+</strong> ebooks, with catalog feeds updating on <strong>weekly</strong> CSV and <strong>daily</strong> RDF cadences in Gutenberg tooling docs. The first chart compares <strong>8</strong> languages; later panels use <strong>10</strong> authors as anchors for availability and memory.</p>
<p class="art-p">English gravity, nineteenth-century density, and adaptation-ready subjects are the three forces that turn a free shelf into a cultural operating system for schools, remixers, and machines.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">75K+</span><span class="fact-label">Approximate scale of Project Gutenberg ebooks in public-facing summaries</span></div>
  <div class="fact-box"><span class="fact-number">Weekly</span><span class="fact-label">CSV catalog update cadence noted in Gutenberg tooling docs</span></div>
  <div class="fact-box"><span class="fact-number">Daily</span><span class="fact-label">RDF catalog update cadence noted by Gutenberg</span></div>
  <div class="fact-box"><span class="fact-number">8</span><span class="fact-label">Languages compared in the first chart</span></div>
  <div class="fact-box"><span class="fact-number">10</span><span class="fact-label">Authors used as anchors</span></div>
  </div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">Project Gutenberg provides machine-readable metadata in RDF/XML, MARC, and CSV formats. Official pages recommend using the metadata feeds rather than scraping HTML. A scaled production pass should ingest the weekly CSV or RDF catalog, normalize subjects, languages, and authors, and join to adaptation, syllabus, and Wikidata signals.</p>
<p class="art-p">The charts here use editorial indices to define that comparative structure before a full catalog join. They are meant to make language gravity, era mix, author memory, and remix power legible — not to replace the official feeds.</p>
<h2 id="language-gravity" class="anchored">Language gravity</h2>
<h3 id="language-gravity-look" class="anchored">English dominates the accessible public-domain shelf</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart1_language_gravity.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="English dominates the accessible public-domain shelf" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart1_language_gravity.png"></div>
</figure>
<p class="art-p">English dominates the accessible public-domain shelf in the comparison of eight languages — on the order of <strong>72</strong> on the index scale used in the chart, with French and German far behind and Finnish, Dutch, Portuguese, Italian, and Spanish in a thinner band.</p>
<p class="art-p">Language gravity is not a judgment about literary quality. It is a statement about which texts are easiest to search, remix, teach, and feed into downstream culture when copyright and digitization align.</p>
<h2 id="era-machine" class="anchored">The era machine</h2>
<h3 id="era-machine-look" class="anchored">The 19th century becomes the public-domain literary core</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart2_era_subject_stack.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="The 19th century becomes the public-domain literary core" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart2_era_subject_stack.png"></div>
</figure>
<p class="art-p">Copyright law turns time into a cultural filter. Fiction and literature indices rise sharply through the nineteenth century; nonfiction and reference follow a related but not identical path. Pre-1800 and post-1950 bins look thinner on the reusable shelf.</p>
<p class="art-p">That makes Gutenberg a meso dataset: not every book ever written, but the books most ready to be reactivated because they are old enough, popular enough, and digitized enough.</p>
<h2 id="author-memory" class="anchored">Author memory</h2>
<h3 id="author-memory-look" class="anchored">Digital availability and cultural memory reinforce each other</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart3_author_availability_memory.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Digital availability and cultural memory reinforce each other" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart3_author_availability_memory.png"></div>
</figure>
<p class="art-p">Authors become infrastructure when their works are everywhere: classrooms, editions, audiobooks, adaptations, quote databases, and training corpora. Digital availability and cultural memory reinforce each other rather than acting as independent clocks.</p>
<p class="art-p">That feedback loop is why public domain matters to AI culture too. What is easy to load is what models and people alike can easily learn from.</p>
<h2 id="adaptation-power" class="anchored">Adaptation power</h2>
<h3 id="adaptation-power-look" class="anchored">Adventure, childhood, and gothic subjects adapt especially well</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart4_subject_adaptation_power.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Adventure, childhood, and gothic subjects adapt especially well" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart4_subject_adaptation_power.png"></div>
</figure>
<p class="art-p">Adventure, manners, gothic, science, war, travel, religion, and children's subjects do not adapt equally. Adventure, childhood, and gothic titles move especially cleanly across film, brand memory, and genre grammar.</p>
<p class="art-p">The public-domain market is therefore not dead literature. It is reusable cultural material with uneven conversion rates into new media.</p>
<h2 id="canon-and-remix" class="anchored">Canon and remix</h2>
<h3 id="canon-and-remix-look" class="anchored">Some books become curriculum while others become remix engines</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart5_classroom_vs_reuse.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Some books become curriculum while others become remix engines" data-fallback="/images/content/articles/project-gutenberg-public-domain-canon-map/charts/chart5_classroom_vs_reuse.png"></div>
</figure>
<p class="art-p">Some books become curriculum while others become remix engines. <em>Pride and Prejudice</em> is classroom canon and adaptation fuel. Sherlock Holmes, Dracula, and Frankenstein behave more like cultural APIs: infinitely forkable characters and premises.</p>
<p class="art-p">The strongest public-domain works are not only read. They are reused — assigned, quoted, adapted, and recombined until availability becomes a kind of fame.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The public-domain canon is not neutral. It is shaped by language, copyright age, volunteer digitization, educational reuse, and adaptation economics.</p>
<p class="art-p">Gutenberg is a bridge dataset: it connects literature, AI training culture, education, film adaptation, and historical memory through the same shelf of reusable texts.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
