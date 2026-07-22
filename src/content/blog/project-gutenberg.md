---
title: Which Subjects Dominate the Project Gutenberg Shelf?
slug: project-gutenberg
pubDate: 2026-06-15T00:00:00.000Z
description: Public-domain metadata show which topics crowd the free-library canon.
heroImage: /images/content/articles/project-gutenberg/hero.png
tags:
  - books
draft: false
tldr: Public-domain metadata show which topics crowd the free-library canon.
keyPoints:
  - '100,000 — Records in the working dataset'
  - lcsh — Most common Subject type
faq:
  - question: What does “Public-domain books cluster by subject type” show?
    answer: '100,000 — Records in the working dataset'
  - question: What does “A small set of subjects anchors the catalog” show?
    answer: lcsh — Most common Subject type
  - question: What does “Subject families show the catalog center of gravity” show?
    answer: Public-domain metadata show which topics crowd the free-library canon.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Project Gutenberg is the internet's oldest large-scale experiment in free literature. Its subject catalog — Library of Congress headings and related labels — is a map of which public-domain books volunteers could digitize and classify at scale.</p>
<p class="art-p">A TidyTuesday working extract of <strong>100,000</strong> records shows <strong>lcsh</strong> as the most common subject type, with tens of thousands of rows in that bucket. Subject codes such as <strong>PS</strong> recur thousands of times. The catalog is not every book ever written; it is the reusable shelf that copyright expiry, volunteer labor, and classification systems made easy to share.</p>
<p class="art-p">Reading Gutenberg as a popularity contest misses the point. Reading it as a concentration map of reusable canon is where the data help.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">lcsh</span><span class="fact-label">Most common Subject type</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday Project Gutenberg release from the R for Data Science community. The working file contains 100,000 rows after assembly — subject types, subject labels, and related catalog metadata.</p>
<p class="art-p">Because many fields are categorical, the analysis leans on counts and repetition rather than a single quality score. Charts export as Plotly JSON with PNG fallbacks. Subject headings are librarian infrastructure, not reader reviews.</p>
<h2 id="landscape" class="anchored">Public-domain books cluster by subject type</h2>
<h3 id="landscape-look" class="anchored">Public-domain books cluster by subject type</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/project-gutenberg/charts/chart1_category.png" role="img" aria-label="Public-domain books cluster by subject type"></div>
</figure>
<p class="art-p"><strong>lcsh</strong> dominates with on the order of <strong>69,027</strong> records in the highlighted cut, far ahead of thinner subject-type buckets. The main classification family carries the story; this field does not split into many equal long-tail types.</p>
<p class="art-p">That concentration means most navigational claims about what Gutenberg contains are really claims about how LCSH-style headings organize the digitized shelf.</p>
<h2 id="who-sits-at-the-top" class="anchored">A small set of subjects anchors the catalog</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">A small set of subjects anchors the catalog</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/project-gutenberg/charts/chart2_leaders.png" role="img" aria-label="A small set of subjects anchors the catalog"></div>
</figure>
<p class="art-p"><strong>PS</strong> appears about <strong>4,684</strong> times — among the most recurring subject names in the file. The top dozen account for a visible share of all 100,000 rows even though most subject entities appear only once.</p>
<p class="art-p">American literature codes, fiction labels, and related headings form a reusable core. They are the catalog's gravitational center for teachers, scrapers, and adaptation hunters alike.</p>
<h2 id="category" class="anchored">Subject families show the catalog center of gravity</h2>
<h3 id="category-look" class="anchored">Subject families show the catalog's center of gravity</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/project-gutenberg/charts/chart3_category.png" role="img" aria-label="Subject families show the catalog's center of gravity"></div>
</figure>
<p class="art-p">lcsh is again the largest bucket on the category chart. Subject families show where editorial attention should focus first if the goal is to understand the shelf's center of gravity rather than its exotic edges.</p>
<p class="art-p">The edges still matter for discovery. They do not define the statistical middle of a 100,000-row extract.</p>
<h2 id="frequency" class="anchored">Repeated subjects reveal the reusable canon</h2>
<h3 id="frequency-look" class="anchored">Repeated subjects reveal the reusable canon</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart5_frequency.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/project-gutenberg/charts/chart5_frequency.png" role="img" aria-label="Repeated subjects reveal the reusable canon"></div>
</figure>
<p class="art-p">Most subject entities appear only once; a small head revisits repeatedly. That power-law shape is typical of catalog tables: a reusable canon of headings, and a long inventory of singleton classifications.</p>
<p class="art-p">Repeated subjects are the ones most likely to support classroom packs, themed collections, and machine-learning corpora. Frequency is a reuse forecast as much as a shelf description.</p>
<h2 id="names" class="anchored">Subject labels become the map of the shelf</h2>
<h3 id="names-look" class="anchored">Subject labels become the map of the shelf</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/project-gutenberg/charts/chart_top_names.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/project-gutenberg/charts/chart_top_names.png" role="img" aria-label="Subject labels become the map of the shelf"></div>
</figure>
<p class="art-p">PS and related labels become the map of the shelf when numeric scores are sparse. Frequency leaders reveal franchise depth in literature the way studio logos reveal franchise depth in film.</p>
<p class="art-p">The practical claim for cultural analytics is simple: if you can only afford to study a slice of Gutenberg, the repeated subject head is where coverage of the reusable public-domain canon begins.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and sampling limits apply. Subject headings are not sales, downloads, or reading-time proof.</p>
<p class="art-p">Findings describe structural signals about Project Gutenberg subject metadata — not a complete history of world literature, and not a ranking of artistic merit.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Gutenberg's subject catalog is concentrated: lcsh dominates subject type, a short head of codes such as PS recurs thousands of times, and most labels appear once.</p>
<p class="art-p">The citable lesson is about reusable canon. Public-domain literature becomes infrastructure when classification and digitization make the same subjects easy to find again and again.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
