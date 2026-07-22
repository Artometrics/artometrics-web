---
title: Mapping the Public-Domain Canon Through Project Gutenberg
slug: project-gutenberg-public-domain-canon-map
pubDate: 2026-07-01T00:00:00.000Z
description: 'Gutenberg metadata charts language gravity, era effects, and author memory.'
heroImage: /images/content/articles/project-gutenberg-public-domain-canon-map/hero.png
tags:
  - books
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">Project Gutenberg is one of the internet's great cultural datasets: a public-domain library whose metadata can show which books remain available, searchable, teachable, and reusable.</p>
<p class="art-p">This report asks what the public-domain canon looks like as data. The answer is not merely literature. It is language, copyright, digitization, education, and remix culture.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">75K+</span><span class="fact-label">Approximate scale of Project Gutenberg ebooks in public-facing summaries</span></div>
  <div class="fact-box"><span class="fact-number">Weekly</span><span class="fact-label">CSV catalog update cadence noted in Gutenberg tooling docs</span></div>
  <div class="fact-box"><span class="fact-number">Daily</span><span class="fact-label">RDF catalog update cadence noted by Gutenberg</span></div>
  <div class="fact-box"><span class="fact-number">8</span><span class="fact-label">Languages compared in the first chart</span></div>
  <div class="fact-box"><span class="fact-number">10</span><span class="fact-label">Authors used as anchors</span></div>
  <div class="fact-box"><span class="fact-number">5</span><span class="fact-label">Charts in this report</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p class="art-p">Project Gutenberg provides machine-readable metadata in RDF/XML, MARC, and CSV formats. Official pages recommend using the metadata feeds rather than crawling the website.</p>
<p class="art-p">A scaled version of this report should ingest the weekly CSV or RDF catalog, normalize subjects/languages/authors, and join to adaptation, school syllabus, and Wikidata signals.</p>
<p class="art-p"><strong>Reader path:</strong> if you are new to the topic, treat each chart as a guided tour of one question: who leads, how concentrated the field is, what changes over time, and where the outliers sit. If you already know the domain, use the same charts as a challenge: check whether the metric is the right proxy, whether the source omits an important population, and whether the headline survives the limitations section.</p>
<h2 id="language-gravity" class="anchored">LANGUAGE GRAVITY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart1_language_gravity.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="English dominates the accessible public-domain shelf"></div>
</figure>
<p class="art-p">Project Gutenberg is not just a library. It is a map of what digitized public-domain culture looks like when volunteer labor, copyright timelines, language, and reader demand overlap.</p>
<p class="art-p">The first signature is language gravity. English-language texts become the easiest canon to access, search, remix, and teach.</p>
<h2 id="era-machine" class="anchored">ERA MACHINE</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart2_era_subject_stack.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="The 19th century becomes the public-domain literary core"></div>
</figure>
<p class="art-p">Copyright law turns time into a cultural filter. The works that are old enough, popular enough, and legible enough become the available past.</p>
<p class="art-p">That makes Gutenberg a powerful meso dataset: not every book ever written, but the books most ready to be reactivated.</p>
<h2 id="author-memory" class="anchored">AUTHOR MEMORY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart3_author_availability_memory.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Digital availability and cultural memory reinforce each other"></div>
</figure>
<p class="art-p">Authors become infrastructure when their works are everywhere: in classrooms, editions, audiobooks, adaptations, quote databases, and training corpora.</p>
<p class="art-p">That is why public domain matters to AI culture too. Availability shapes what machines and people can easily learn from.</p>
<h2 id="adaptation" class="anchored">ADAPTATION POWER</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart4_subject_adaptation_power.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Adventure, childhood, and gothic subjects adapt especially well"></div>
</figure>
<p class="art-p">Some subjects move cleanly across medium. Adventure becomes film; childhood becomes brand memory; gothic becomes horror grammar.</p>
<p class="art-p">The public-domain market is therefore not dead literature. It is reusable cultural material.</p>
<h2 id="canon-remix" class="anchored">CANON AND REMIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg-public-domain-canon-map/charts/chart5_classroom_vs_reuse.plotly.json" data-source="Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS" role="img" aria-label="Some books become curriculum while others become remix engines"></div>
</figure>
<p class="art-p">Pride and Prejudice is classroom canon and adaptation engine. Sherlock Holmes, Dracula, and Frankenstein are more like cultural APIs: infinitely callable characters and structures.</p>
<p class="art-p">That is the Artometrics claim: the most powerful books are not only read. They are reused.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p class="art-p">The public-domain canon is not neutral. It is shaped by language, copyright age, volunteer digitization, educational reuse, and adaptation economics.</p>
<p class="art-p">For Artometrics, Gutenberg is a bridge dataset: it connects literature, AI training culture, education, film adaptation, and historical memory.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Project Gutenberg. <em>Offline Catalogs</em> and machine-readable metadata documentation.</p>
<p>Project Gutenberg feeds: RDF/XML and CSV catalog files.</p>
<p>gutenbergtools/catalog_tools. Notes on Project Gutenberg catalog CSV and RDF updates.</p>
<p>Library of Congress subject logic and Wikidata work/author metadata for future joins.</p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p>Chart values are editorial indices designed from Project Gutenberg source fields and public canon/adaptation signals. A production pass should ingest the official catalog directly.</p></div>
</main>
</div>
