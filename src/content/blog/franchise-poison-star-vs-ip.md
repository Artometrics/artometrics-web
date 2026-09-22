---
title: "Franchise Poison: What Star Risk Costs an IP"
slug: franchise-poison-star-vs-ip
author: kyle-mcauliffe
pubDate: 2026-09-22T00:00:00.000Z
description: >-
  Pokémon's $91B and a six-film Leto slate (0.65x–2.04x) show why merchandise-driven IP is insulated from star risk that concentrated vehicles carry alone.
heroImage: /images/content/articles/franchise-poison-star-vs-ip/hero.png
draft: false
tags:
  - arts
  - film
tldr: >-
  This is an editorial synthesis of two published Artometrics datasets plus one small case study. The franchise dataset shows Pokémon earning $91B lifetime across 107 tracked franchises, with merchandise driving 61% of all revenue — a cushion no single actor's box office can match. The horror-movie-profit dataset (median $25,533,818 domestic gross) shows that genre and cast metadata in community-cleaned box-office tables can mislead single-title conclusions. Layered against a small six-film case study of Jared Leto's 2020s slate — worldwide gross ÷ budget ranging 0.65x to 2.04x, with three of six titles below breakeven — the pattern illustrates what concentrated star risk looks like when there is no licensing revenue to absorb it. The personal-conduct angle on Leto belongs to a separate report, "The Protection Threshold"; this one stays on the economics.
keyPoints:
  - "$91B — Pokémon lifetime franchise revenue, the largest of 107 tracked franchises"
  - "61% — Share of all tracked franchise revenue from merchandise, licensing, and retail"
  - "$25,533,818 — Median domestic gross across 3,401 films in the horror-tagged dataset"
  - "0.65x–2.04x — Range of worldwide gross ÷ budget across six 2020s Jared Leto titles"
  - "3 of 6 — Leto-slate titles landing below the 1.0x breakeven multiple"
  - "107 — Franchises tracked, each clearing at least $4B lifetime revenue"
faq:
  - question: Why does merchandise revenue reduce a franchise's exposure to any one person?
    answer: >-
      Across the 107 franchises Artometrics tracked, merchandise, licensing, and retail account for 61% of all revenue — money tied to characters, cards, and toys rather than to a single actor's performance or public standing. Pokémon's $91B lifetime total is built almost entirely on that layer, not box office.
  - question: What does the Jared Leto case study measure?
    answer: >-
      Worldwide gross divided by reported production budget across six of his 2020s film credits: Morbius (2.02x), House of Gucci (2.04x), The Little Things (1.03x), Haunted Mansion (0.79x), Masters of the Universe (0.66x), and Tron: Ares (0.65x). Three of the six clear breakeven; three do not.
  - question: Does this report cover allegations against Jared Leto?
    answer: >-
      No. Personal-conduct questions are covered in a separate Artometrics report, "The Protection Threshold: When Flops End Hollywood's Silence." This report is limited to box-office and franchise-revenue economics.
  - question: Can six films prove that star-fronted vehicles are riskier than IP franchises?
    answer: >-
      No. Six titles are a small, non-random sample and cannot generalize to "all star vehicles." The report treats the slate as an illustration of what concentrated star risk looks like, not as statistical proof of a causal relationship.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">Pokémon earns $91B lifetime, more than Marvel, Star Wars, and Harry Potter combined, and 61% of that comes from merchandise — not from any film, any voice actor, any single person's box office draw. A six-film slate led or co-led by actor Jared Leto in the 2020s tells a different kind of story: worldwide gross against budget ranging from 0.65x to 2.04x, with half the titles landing at or below breakeven. Neither fact is new. Putting them next to each other is the point of this report.</p>
<p class="art-p">This is an editorial synthesis. It combines findings already published in two Artometrics reports — the TidyTuesday media-franchise revenue dataset and the TidyTuesday horror-tagged box-office dataset — with a small, separately compiled case-study dataset of one actor's recent film slate. No new franchise-level data was collected for this piece; the argument is a reading of existing numbers, not a new measurement.</p>
<h2 id="research-question" class="anchored">RESEARCH QUESTION</h2>
<p class="art-p">Does diversifying a franchise's revenue away from any single star's box-office draw — toward merchandise and licensing, the way the top-earning franchises do — measurably reduce that franchise's exposure to "star risk"? And does a small, concentrated, star-fronted film slate show what the absence of that cushion looks like in practice?</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">$91B</span>
    <span class="fact-label">Pokémon lifetime franchise revenue — the largest of 107 tracked franchises</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">107</span>
    <span class="fact-label">Franchises tracked, each clearing at least $4B lifetime revenue</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">61%</span>
    <span class="fact-label">Share of all tracked franchise revenue from merchandise, licensing, and retail</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">$25.53M</span>
    <span class="fact-label">Median domestic gross across 3,401 films in the horror-tagged dataset</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">0.65x–2.04x</span>
    <span class="fact-label">Range of worldwide gross ÷ budget across six 2020s Jared Leto titles</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">3 of 6</span>
    <span class="fact-label">Leto-slate titles landing below the 1.0x breakeven multiple</span>
  </div>
</div>
<h2 id="merchandise-is-the-insulation" class="anchored">Merchandise Is the Insulation IP Franchises Have and Star Vehicles Don't</h2>
<figure class="art-chart">
  <div
    class="art-chart-live"
    data-chart="/data/articles/franchise-poison-star-vs-ip/charts/chart1_revenue_stream_share.plotly.json"
    data-fallback="/images/content/articles/franchise-poison-star-vs-ip/charts/chart1_revenue_stream_share.png"
    data-source="Data: TidyTuesday / Box Office Mojo — ARTOMETRICS"
    role="img"
    aria-label="Merchandise share of revenue across 107 tracked franchises"
  ></div>
  <figcaption class="art-chart-caption">Merchandise, licensing, and retail account for 61% of all revenue across 107 tracked franchises — a stream that does not depend on any one actor's box office weekend.</figcaption>
</figure>
<p class="art-p">Artometrics' franchise-revenue report established that merchandise is not one revenue stream among several — it is the dominant one, at 61% of everything tracked across 107 franchises earning at least $4B lifetime. Pokémon's $91B total, the highest of any tracked property, was built almost entirely on cards, games, and retail rather than any theatrical run. That structure matters for a reason the franchise report did not need to spell out: merchandise revenue attaches to a character, a logo, a mascot. It does not attach to a person's public standing, a lead actor's health, or a film's opening-weekend reviews. Pikachu does not carry reputational risk. Pikachu does not need a publicist.</p>
<p class="art-p">Contrast that with a franchise or vehicle built around one performer's draw. When merchandise, licensing, and games are absent or minor, the entire revenue case rests on box office and, downstream, on home video and streaming licensing tied to that same theatrical result. There is no secondary economy running in parallel the way there is for Pokémon or, per the same report, for Star Wars — the one franchise in that dataset the report specifically flagged as fully diversified across box office, merchandise, home video, and games. A star-fronted film without that diversification is, in revenue-structure terms, closer to a single bet than to a franchise.</p>
<h2 id="what-concentrated-star-risk-looks-like" class="anchored">What Concentrated Star Risk Looks Like: A Six-Film Case Study</h2>
<figure class="art-chart">
  <div
    class="art-chart-live"
    data-chart="/data/articles/franchise-poison-star-vs-ip/charts/chart2_leto_slate_ratios.plotly.json"
    data-fallback="/images/content/articles/franchise-poison-star-vs-ip/charts/chart2_leto_slate_ratios.png"
    data-source="Data: TidyTuesday / Box Office Mojo — ARTOMETRICS"
    role="img"
    aria-label="Six-film Jared Leto slate: worldwide gross divided by reported budget"
  ></div>
  <figcaption class="art-chart-caption">Three of six titles in the case-study slate clear breakeven comfortably; three land at or below 1.0x — a spread with no merchandise layer to soften it.</figcaption>
</figure>
<p class="art-p">The case-study dataset is small and deliberately narrow: six of actor Jared Leto's 2020s film credits, each expressed as worldwide gross divided by reported production budget, using trade-reported budget bands from Box Office Mojo. House of Gucci (2021, ensemble) returned 2.04x on a $75M budget. Morbius (2022, lead) returned 2.02x on $83M. Those two clear breakeven with room. The other four sit closer to the line or under it: The Little Things (2021, lead, released into a pandemic-narrowed theatrical window) landed at 1.03x; Haunted Mansion (2023, ensemble) at 0.79x; Masters of the Universe (2026, supporting) at 0.66x; and Tron: Ares (2025, lead) at 0.65x, on the largest reported budget in the slate at $220M.</p>
<p class="art-p">Read individually, each figure is a data point about one film. Read as a slate, the pattern is a distribution centered near or below 1.0x rather than comfortably above it — half the titles below breakeven, and only two of six clearing 2.0x. That is the shape of concentrated star risk: revenue tied tightly to one theatrical outcome per title, with no licensing or merchandise base underneath it the way Pokémon's $91B or Star Wars' diversified mix has. When a title in this kind of slate underperforms, the studio absorbs the loss directly — there is no secondary revenue stream to blunt it. This is a small, non-random sample, and the report treats it as illustration, not proof; see Limitations below.</p>
<h2 id="why-genre-and-cast-metadata-can-mislead" class="anchored">Why Genre and Cast Metadata Can Mislead Single-Title Conclusions</h2>
<figure class="art-chart">
  <div
    class="art-chart-live"
    data-chart="/data/articles/franchise-poison-star-vs-ip/charts/chart3_scale_comparison.plotly.json"
    data-fallback="/images/content/articles/franchise-poison-star-vs-ip/charts/chart3_scale_comparison.png"
    data-source="Data: TidyTuesday / Box Office Mojo — ARTOMETRICS"
    role="img"
    aria-label="IP-franchise scale vs single-title scale, dollars in millions, log axis"
  ></div>
  <figcaption class="art-chart-caption">Pokémon's $91B lifetime total dwarfs both a median single film ($25.53M domestic) and the largest single budget in the case-study slate ($220M) — different orders of magnitude, not different points on the same curve.</figcaption>
</figure>
<p class="art-p">Artometrics' horror-movie-profit report already demonstrated a caution that applies directly here: community-cleaned genre and metadata tags in box-office tables are unreliable enough to mislead a reader trying to draw conclusions about any single title or person. That report's dataset, nominally tagged "horror," was topped by Star Wars Episode I: The Phantom Menace at $474,544,677 domestic — a science-fiction adventure film, not a horror film, sitting atop a genre-labeled table because of a tagging error in the community-cleaned merge. The median across all 3,401 films in that file was $25,533,818 domestic, spanning 1936–2019.</p>
<p class="art-p">The lesson generalizes beyond genre tags: any table that mixes lead, supporting, and ensemble billing, or that blends pandemic-window releases with ordinary theatrical runs, risks producing headline numbers that look like a verdict on one person when they are really an artifact of how the underlying rows were labeled and merged. The six-film case study above mixes exactly those roles — lead, supporting, and ensemble — and one pandemic-era release. That mix is disclosed, not hidden, because the horror-movie-profit report's central caution is that undisclosed metadata quietly drives conclusions readers think are about content, when they are really about cleaning decisions.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p class="art-p">Six films is a small sample. It cannot generalize to "all star vehicles" or to any actor's career as a whole, and it should not be read as a ranking or grade of any individual film. The gross-to-budget ratios use trade-reported budget bands, which studios do not always disclose precisely or consistently; treat them as order-of-magnitude figures, not audited production accounting. No causal link between reputational risk and box-office softness is established, tested, or claimed in this report — the framework below is an editorial hypothesis about revenue structure, not a measured finding, and is labeled as such. The franchise and horror datasets describe different populations (107 large franchises; 3,401 individual films) and different time windows; combining them illustrates a structural argument, not a single unified statistical model.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p class="art-p">Editorial framework, not measured finding: the evidence assembled here is consistent with the idea that merchandise-driven IP carries structurally less exposure to any one person's performance than a star-fronted vehicle does — Pokémon's $91B and the 61% merchandise share across 107 franchises simply do not route through an individual's box-office weekend the way a lead-actor vehicle's revenue does. The six-film case study is offered as an illustration of what concentrated exposure can look like when that cushion is absent, not as proof that it explains any particular result. The sharper version of the research question, for a future report with a larger sample: does a franchise's merchandise share, measured directly against its box-office share, predict how much a single underperforming title costs the studio that owns it? This report does not answer that. It sharpens it.</p>
<h2 id="dataset-context" class="anchored">DATA AND METHOD</h2>
<p class="art-p">This report combines two previously published Artometrics analyses with one small case-study dataset assembled for this piece. It introduces no new franchise-level or film-level dataset of its own.</p>
<p class="art-p">First, the TidyTuesday 2019 media-franchise revenue dataset (107 franchises, each with at least $4B in lifetime revenue as of mid-2019, spanning 92 years from 1923 to 2015), as analyzed in Artometrics' "franchise" report. Second, the TidyTuesday horror-tagged box-office dataset (3,401 films, 1936–2019, median domestic gross $25,533,818), as analyzed in Artometrics' "horror-movie-profit" report. Both figures are cited here exactly as published in those reports; no recalculation was performed on either source file for this piece.</p>
<p class="art-p">Third, a small case-study dataset — six of Jared Leto's 2020s film credits, each recorded as worldwide gross and reported production budget, with gross ÷ budget calculated as a simple derived ratio. Source: Box Office Mojo and trade-reported budget figures. This is observed box-office data paired with a derived metric (the ratio); it is not drawn from either TidyTuesday file and was not published in a prior Artometrics report. The synthesis connecting all three — the "star risk vs. merchandise insulation" framework — is an editorial reading, not a statistical model fit across the combined data, and is labeled as such throughout this report.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<div class="art-references">
  <div class="art-ref-item">
    Artometrics. <em>Pokémon's $91B Earns More Than Marvel, Star Wars, and Harry Potter Combined</em>.
    <a href="/franchise">artometrics.com/franchise</a>
  </div>
  <div class="art-ref-item">
    Artometrics. <em>Star Wars Led a Horror-Profit Dataset — How Genre Mislabeling Hides the Real Winners</em>.
    <a href="/horror-movie-profit">artometrics.com/horror-movie-profit</a>
  </div>
  <div class="art-ref-item">
    Box Office Mojo. <em>Title-level worldwide gross and trade-reported budget figures</em>, 2021–2026 release years.
  </div>
  <div class="art-ref-item">
    Artometrics. <em>The Protection Threshold: When Flops End Hollywood's Silence</em> — related report covering personal-conduct and industry-response questions not addressed here.
  </div>
</div>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note">
<p class="art-p">
This report is a cross-report synthesis: it cites facts already published in two Artometrics data reports and layers them against a small, separately sourced case-study dataset. It does not re-derive or re-audit the underlying TidyTuesday files, and it does not address personal-conduct questions about any individual named in it — that ground is covered separately in "The Protection Threshold: When Flops End Hollywood's Silence." This piece is limited to box-office and franchise-revenue economics.
</p>
<p class="art-p">
This report was researched, written, and produced in active collaboration with Claude AI (Anthropic), following the same disclosed process used across Artometrics reporting: human editorial judgment directs the research question and framework; execution — analysis, prose, and chart design — is a documented collaboration.
</p>
<p class="art-p">— Artometrics Editorial</p>
</div>
</main>
</div>
