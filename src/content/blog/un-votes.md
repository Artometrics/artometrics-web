---
title: Which UN Votes Split the Chamber Most Sharply?
slug: un-votes
pubDate: 2026-06-15T00:00:00.000Z
description: Voting records identify resolutions that divided member states.
heroImage: /images/content/articles/un-votes/hero.png
tags:
  - business
draft: false
tldr: >-
  United Nations roll-call votes are a diplomacy archive written as a
  contingency table. This working extract holds 100,000 records. The most common
  vote value is yes — not a moral claim, a frequency claim. The charts ask where
  that yes-mass concentrates, which countries appear most often, and how
  long-tailed country participation becomes.
keyPoints:
  - '100,000 — Records in the working dataset'
  - yes — Most common Vote
faq:
  - question: What does the data show about Yes votes dominate the sampled UN record?
    answer: >-
      Key figure: 100,000 — Records in the working dataset. The source is the
      TidyTuesday release from 2021-03-23 (R for Data Science community). The
      working file contains 100,000 rows and 4 columns after merging available
      tables in the…
  - question: >-
      What does the data show about Brazil appears most often among country
      names?
    answer: >-
      Key figure: yes — Most common Vote. The source is the TidyTuesday release
      from 2021-03-23 (R for Data Science community). The working file contains
      100,000 rows and 4 columns after merging available tables in the…
  - question: >-
      What does the data show about Vote categories restate the file’s center of
      gravity?
    answer: >-
      The source is the TidyTuesday release from 2021-03-23 (R for Data Science
      community). The working file contains 100,000 rows and 4 columns after
      merging available tables in the week folder. Vote is the primary
      categorical field; country and country code…
  - question: >-
      What does the data show about Country appearances follow a long-tail
      pattern?
    answer: >-
      The source is the TidyTuesday release from 2021-03-23 (R for Data Science
      community). The working file contains 100,000 rows and 4 columns after
      merging available tables in the week folder. Vote is the primary
      categorical field; country and country code…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">United Nations roll-call votes are a diplomacy archive written as a contingency table. This working extract holds 100,000 records. The most common vote value is yes — not a moral claim, a frequency claim. The charts ask where that yes-mass concentrates, which countries appear most often, and how long-tailed country participation becomes.</p>
<p class="art-p">Voting records identify resolutions that divided member states, but the first job of this file is simpler: map the landscape of yes, no, and abstain, then see which member names and country codes recur in a 100,000-row slice of UN voting history.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">100,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">yes</span><span class="fact-label">Most common Vote</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-03-23 (R for Data Science community). The working file contains 100,000 rows and 4 columns after merging available tables in the week folder. Vote is the primary categorical field; country and country code provide entity axes; frequency charts summarize repetition.</p>
<p class="art-p">There is no single numeric “score” column driving a median leaderboard here. The analysis is categorical: counts, shares, and recurrence. Index-style fields stay out of metric selection.</p>

<h2 id="yes-votes-dominate-the-sampled-un-record" class="anchored">Yes votes dominate the sampled UN record</h2>
<h3 id="yes-votes-dominate-the-sampled-un-record-look" class="anchored">Yes votes dominate the sampled UN record</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart1_category.png" role="img" aria-label="Yes votes dominate the sampled UN record"></div>
</figure>
<p class="art-p">Yes dominates with 79,663 records. In a 100,000-row extract, that is the center of gravity: most recorded positions in this slice are affirmative. Abstain and no exist, but they do not match yes for volume.</p>
<p class="art-p">Dominance here is a frequency fact about the file, not proof that the General Assembly always agrees. It tells you where the mass of the table sits before any conflict analysis begins.</p>

<h2 id="brazil-appears-most-often-among-country-names" class="anchored">Brazil appears most often among country names</h2>
<h3 id="brazil-appears-most-often-among-country-names-look" class="anchored">Brazil appears most often in this extract</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart2_leaders.png" role="img" aria-label="Brazil appears most often in this extract"></div>
</figure>
<p class="art-p">Brazil appears 747 times — the most recurring country name in the file. The top dozen countries account for a visible share of all 100,000 rows, which is what a recurring-member chart is for: showing who is densely present in the extract.</p>
<p class="art-p">High appearance counts can reflect coverage, membership longevity, or how the sample was built. They are presence metrics, not win rates.</p>

<h2 id="vote-categories-restate-the-file-s-center-of-gravity" class="anchored">Vote categories restate the file’s center of gravity</h2>
<h3 id="vote-categories-restate-the-file-s-center-of-gravity-look" class="anchored">Vote categories reveal the file's center of gravity</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart3_category.png" role="img" aria-label="Vote categories reveal the file's center of gravity"></div>
</figure>
<p class="art-p">Yes is again the largest bucket with 79,663 records when vote categories are plotted as a bar landscape. Repeating the category cut is useful: it confirms that the headline frequency is not an artifact of a single chart type.</p>
<p class="art-p">Category concentration shows where editorial attention should start — with the yes majority — while still leaving room to inspect the smaller no and abstain bands.</p>

<h2 id="country-appearances-follow-a-long-tail-pattern" class="anchored">Country appearances follow a long-tail pattern</h2>
<h3 id="country-appearances-follow-a-long-tail-pattern-look" class="anchored">Country appearances follow a long-tail pattern</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart5_frequency.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart5_frequency.png" role="img" aria-label="Country appearances follow a long-tail pattern"></div>
</figure>
<p class="art-p">Most country entities appear only once in the frequency view; a small head revisits repeatedly. That power-law shape is typical of catalog-style international tables: a few members are densely observed, many are sparse.</p>
<p class="art-p">Long tails warn against over-reading rare countries as if they had the same sample depth as Brazil-scale recurrence.</p>

<h2 id="country-codes-add-a-second-identity-layer" class="anchored">Country codes add a second identity layer</h2>
<h3 id="country-codes-add-a-second-identity-layer-look" class="anchored">Country codes add metadata rather than a new thesis</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart_extra_mix.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart_extra_mix.png" role="img" aria-label="Country codes add metadata rather than a new thesis"></div>
</figure>
<p class="art-p">BR is the most repeated country code in the extract — the code-level echo of Brazil’s name-level lead. Secondary dimensions like codes add join keys and metadata when the primary table has no numeric score column.</p>
<p class="art-p">Read codes as infrastructure for linking, not as a rival thesis to the vote-share story. They confirm entity identity across the 100,000-row sample.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not the full UN voting API. Missing values, country-name variants, and week-of-export coverage limits apply. A 100,000-row extract may be a sample or a capped export rather than every roll call ever taken.</p>
<p class="art-p">Findings describe this UN votes file — structural signals about vote categories and country recurrence — not a complete theory of international coalitions.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">In this extract, yes is the majority language of recorded votes (79,663 of 100,000), Brazil is the most recurring country name (747 appearances), and BR leads among country codes.</p>
<p class="art-p">The long tail of country appearances means presence is uneven. Start with the yes majority and the dense head of member recurrence; treat sparse countries as thin evidence until coverage is checked.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: UN Votes</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-23/unvotes.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-23/unvotes.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-23" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
