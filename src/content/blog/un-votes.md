---
title: Which UN Votes Split the Chamber Most Sharply?
slug: un-votes
pubDate: 2026-06-15T00:00:00.000Z
description: Voting records identify resolutions that divided member states.
heroImage: /images/content/articles/un-votes/hero.png
draft: false
tags:
  - civics
  - politics
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
<h2 id="research-question" class="anchored">Research question</h2>
<p class="art-p">What does a 100,000-row extract of United Nations roll-call votes reveal before any ideological coalition model is fitted? This report asks how vote categories are distributed, which member-state names recur most often, and whether country-code metadata confirms or complicates the entity picture.</p>
<p class="art-p">The question is intentionally descriptive. A yes-heavy table does not mean the General Assembly lacks conflict; it means this sample’s recorded positions are concentrated in one category. The analysis therefore starts with vote mass and country recurrence before moving toward more interpretive claims about alignment.</p>
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
<p class="art-p">The United Nations General Assembly often votes on resolutions that have already passed through committees, negotiations, amendments, and diplomatic bargaining. A large yes category can therefore reflect agenda-setting and consensus-building before the roll call, not an absence of disagreement in world politics. The public vote is the final visible record of a process that began earlier.</p>
<p class="art-p">UN voting scholars usually move beyond raw categories into ideal-point models, affinity scores, or issue-area subsets because the meaning of a yes vote depends on the resolution. A yes on decolonization, a yes on nuclear disarmament, and a yes on a budgetary item are all affirmative votes, but they do not carry the same geopolitical signal.</p>

<h2 id="brazil-appears-most-often-among-country-names" class="anchored">Brazil appears most often among country names</h2>
<h3 id="brazil-appears-most-often-among-country-names-look" class="anchored">Brazil appears most often in this extract</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart2_leaders.png" role="img" aria-label="Brazil appears most often in this extract"></div>
</figure>
<p class="art-p">Brazil appears 747 times — the most recurring country name in the file. The top dozen countries account for a visible share of all 100,000 rows, which is what a recurring-member chart is for: showing who is densely present in the extract.</p>
<p class="art-p">High appearance counts can reflect coverage, membership longevity, or how the sample was built. They are presence metrics, not win rates.</p>
<p class="art-p">Brazil is a useful leader because it has been a United Nations member since 1945 and is a frequent actor in General Assembly voting records. The country’s foreign-policy tradition includes visible positions on development, non-intervention, South-South cooperation, and Security Council reform. But the 747 appearances shown here are still a row-count fact, not a claim that Brazil is uniquely influential in every issue area.</p>
<p class="art-p">Country recurrence is also shaped by institutional continuity. Newer UN members, dissolved states, renamed states, and countries with interrupted or transformed membership histories will appear differently from long-standing members. The Soviet Union/Russia, Yugoslavia/successor states, Czechoslovakia/Czechia and Slovakia, and country-name standardization issues are exactly why entity handling matters in UN vote data.</p>

<h2 id="vote-categories-restate-the-file-s-center-of-gravity" class="anchored">Vote categories restate the file’s center of gravity</h2>
<h3 id="vote-categories-restate-the-file-s-center-of-gravity-look" class="anchored">Vote categories reveal the file's center of gravity</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart3_category.png" role="img" aria-label="Vote categories reveal the file's center of gravity"></div>
</figure>
<p class="art-p">Yes is again the largest bucket with 79,663 records when vote categories are plotted as a bar landscape. Repeating the category cut is useful: it confirms that the headline frequency is not an artifact of a single chart type.</p>
<p class="art-p">Category concentration shows where editorial attention should start — with the yes majority — while still leaving room to inspect the smaller no and abstain bands.</p>
<p class="art-p">Abstentions deserve special caution because they can mean several things: neutrality, strategic ambiguity, alliance pressure, domestic constraint, protest against wording, or unwillingness to oppose a popular resolution directly. In Cold War voting studies, abstention is often treated as analytically distinct from both yes and no because it can carry diplomatic information without joining either pole.</p>
<p class="art-p">No votes are smaller in this extract, but they are often more diagnostic. A rare no can identify a strongly contested resolution, a bloc split, or a state protecting a core interest. The category chart therefore gives the denominator; substantive research still needs resolution identifiers and issue tags to interpret the minority categories.</p>

<h2 id="country-appearances-follow-a-long-tail-pattern" class="anchored">Country appearances follow a long-tail pattern</h2>
<h3 id="country-appearances-follow-a-long-tail-pattern-look" class="anchored">Country appearances follow a long-tail pattern</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart5_frequency.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart5_frequency.png" role="img" aria-label="Country appearances follow a long-tail pattern"></div>
</figure>
<p class="art-p">Most country entities appear only once in the frequency view; a small head revisits repeatedly. That power-law shape is typical of catalog-style international tables: a few members are densely observed, many are sparse.</p>
<p class="art-p">Long tails warn against over-reading rare countries as if they had the same sample depth as Brazil-scale recurrence.</p>
<p class="art-p">The long tail can reflect countries that entered the United Nations later, states that changed names, country labels split across historical entities, or sample construction that does not preserve every roll call for every member equally. Tuvalu, South Sudan, Czechia, and North Macedonia do not have the same historical runway as Brazil, India, France, or the United States.</p>
<p class="art-p">For comparative work, this means country-level rates need exposure denominators. A country observed 747 times can sustain a more stable voting-profile estimate than a country observed only a handful of times. Presence depth is a statistical precondition for diplomatic interpretation.</p>

<h2 id="country-codes-add-a-second-identity-layer" class="anchored">Country codes add a second identity layer</h2>
<h3 id="country-codes-add-a-second-identity-layer-look" class="anchored">Country codes add metadata rather than a new thesis</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/un-votes/charts/chart_extra_mix.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/un-votes/charts/chart_extra_mix.png" role="img" aria-label="Country codes add metadata rather than a new thesis"></div>
</figure>
<p class="art-p">BR is the most repeated country code in the extract — the code-level echo of Brazil’s name-level lead. Secondary dimensions like codes add join keys and metadata when the primary table has no numeric score column.</p>
<p class="art-p">Read codes as infrastructure for linking, not as a rival thesis to the vote-share story. They confirm entity identity across the 100,000-row sample.</p>
<p class="art-p">Country codes matter because names are historically unstable. “Congo,” “Democratic Republic of the Congo,” “Congo, Democratic Republic,” “Russia,” “Russian Federation,” and former state names can fracture a table if the join key is text alone. Codes make it possible to connect UN votes to region, income group, alliance, population, or trade data without hand-cleaning every label.</p>
<p class="art-p">The BR code leading alongside Brazil’s name indicates that the entity layer is internally coherent for the top case. That does not guarantee the whole file is perfectly standardized, but it shows why the extra chart exists: metadata fields are the connective tissue that allow UN voting records to become analyzable political data.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not the full UN voting API. Missing values, country-name variants, and week-of-export coverage limits apply. A 100,000-row extract may be a sample or a capped export rather than every roll call ever taken.</p>
<p class="art-p">Findings describe this UN votes file — structural signals about vote categories and country recurrence — not a complete theory of international coalitions.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">In this extract, yes is the majority language of recorded votes (79,663 of 100,000), Brazil is the most recurring country name (747 appearances), and BR leads among country codes.</p>
<p class="art-p">The long tail of country appearances means presence is uneven. Start with the yes majority and the dense head of member recurrence; treat sparse countries as thin evidence until coverage is checked.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: UN Votes</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-23/unvotes.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-23/unvotes.csv</a></p>
<p>Data Science Learning Community. (2021). <em>TidyTuesday UN Votes source folder</em>. <a href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-23" target="_blank" rel="noopener noreferrer">https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-23</a></p>
<p>Erik Voeten. <em>United Nations General Assembly Voting Data</em>. Harvard Dataverse. <a href="https://doi.org/10.7910/DVN/LEJUQZ" target="_blank" rel="noopener noreferrer">https://doi.org/10.7910/DVN/LEJUQZ</a></p>
<p>Bailey, M. A., Strezhnev, A., &amp; Voeten, E. (2017). Estimating dynamic state preferences from United Nations voting data. <em>Journal of Conflict Resolution</em>, 61(2), 430–456. <a href="https://doi.org/10.1177/0022002715595700" target="_blank" rel="noopener noreferrer">https://doi.org/10.1177/0022002715595700</a></p>
<p>United Nations Digital Library. <em>Voting data and General Assembly records</em>. <a href="https://digitallibrary.un.org/" target="_blank" rel="noopener noreferrer">https://digitallibrary.un.org/</a></p>
<p>United Nations. <em>Member States</em>. <a href="https://www.un.org/en/about-us/member-states" target="_blank" rel="noopener noreferrer">https://www.un.org/en/about-us/member-states</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-23" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
