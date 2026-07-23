---
title: Which Hospitals Still Fail the 30-Day Readmission Standard?
slug: readmitted
pubDate: 2026-04-21T00:00:00.000Z
description: >-
  CMS HRRP data show where states, conditions, and ownership types exceed
  benchmarks.
heroImage: /images/content/articles/readmitted/hero.jpg
draft: false
tags:
  - science
  - medicine
tldr: >-
  The Hospital Readmissions Reduction Program is a Medicare penalty system that
  has been running since 2012. The premise is simple: if your patients come back
  to the hospital within 30 days of discharge at a higher rate than expected
  given their medical profile, CMS docks your Medicare reimbursements.
keyPoints:
  - >-
    48.1% — of HRRP-eligible hospital-condition pairs carried an excess
    readmission ratio above 1.0 — more readmissions than CMS models predict
  - >-
    6 — conditions tracked under HRRP — AMI, Heart Failure, Pneumonia, COPD,
    Hip/Knee, and CABG
  - >-
    1.0018 — average excess readmission ratio nationally — the average hospital
    readmits slightly more patients than CMS models expect
  - >-
    1.00485 — Hip/Knee average ERR — the highest of the six conditions, nearly
    2× the excess of the next closest track
  - >-
    742 — hospitals mandated to participate in CMS&#39;s TEAM bundled payment
    model as of January 1, 2026 — where readmission penalties become
    episode-level accountability
  - >-
    65.4% — New Jersey&#39;s share of penalized hospital-condition pairs — the
    highest-risk geography in the working dataset
faq:
  - question: What does the data show about The Geography of Failure?
    answer: >-
      Key figure: 48.1% — of HRRP-eligible hospital-condition pairs carried an
      excess readmission ratio above 1.0 — more readmissions than CMS models
      predict. The FY2025 HRRP supplemental extract covers the measurement
      window used for CMS’s published excess readmission ratios. After removing
      suppressed rows — hospitals with fewer than…
  - question: What does the data show about The Condition Nobody Is Solving?
    answer: >-
      Key figure: 6 — conditions tracked under HRRP — AMI, Heart Failure,
      Pneumonia, COPD, Hip/Knee, and CABG. The FY2025 HRRP supplemental extract
      covers the measurement window used for CMS’s published excess readmission
      ratios. After removing suppressed rows — hospitals with fewer than…
  - question: 'What does the data show about Ownership, Penalty, and Who Pays?'
    answer: >-
      Key figure: 1.0018 — average excess readmission ratio nationally — the
      average hospital readmits slightly more patients than CMS models expect.
      The FY2025 HRRP supplemental extract covers the measurement window used
      for CMS’s published excess readmission ratios. After removing suppressed
      rows — hospitals with fewer than…
  - question: What this file cannot tell you?
    answer: >-
      Key figure: 1.00485 — Hip/Knee average ERR — the highest of the six
      conditions, nearly 2× the excess of the next closest track. The FY2025
      HRRP supplemental extract covers the measurement window used for CMS’s
      published excess readmission ratios. After removing suppressed rows —
      hospitals with fewer than…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">The Hospital Readmissions Reduction Program is a Medicare penalty system that has been running since 2012. The premise is simple: if your patients come back to the hospital within 30 days of discharge at a higher rate than expected given their medical profile, CMS docks your Medicare reimbursements. The penalty caps at 3% of all Medicare payments — not just payments for the specific condition being measured. A hospital with too many heart failure readmissions doesn’t just lose heart failure revenue. It loses 3% of everything.</p>
<p class="art-p">The core metric is the Excess Readmission Ratio, or ERR. It is a ratio of predicted readmissions to expected readmissions — where “expected” is risk-adjusted for each patient’s age, comorbidities, and discharge history. An ERR of exactly 1.0 means you readmitted exactly as many patients as a hospital of your type and patient mix should. Above 1.0 means more readmissions than expected. Below 1.0 means fewer. What this analysis found: nearly every condition’s national average ERR is above 1.0. HRRP has been running for over a decade, and the average American hospital is still readmitting more patients than CMS expects. The penalty hasn’t eliminated the problem. It has clarified it.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">48.1%</span>
    <span class="fact-label">of HRRP-eligible hospital-condition pairs carried an excess readmission ratio above 1.0 — more readmissions than CMS models predict</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">6</span>
    <span class="fact-label">conditions tracked under HRRP — AMI, Heart Failure, Pneumonia, COPD, Hip/Knee, and CABG</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">1.0018</span>
    <span class="fact-label">average excess readmission ratio nationally — the average hospital readmits slightly more patients than CMS models expect</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">1.00485</span>
    <span class="fact-label">Hip/Knee average ERR — the highest of the six conditions, nearly 2× the excess of the next closest track</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">742</span>
    <span class="fact-label">hospitals mandated to participate in CMS&#39;s TEAM bundled payment model as of January 1, 2026 — where readmission penalties become episode-level accountability</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">65.4%</span>
    <span class="fact-label">New Jersey&#39;s share of penalized hospital-condition pairs — the highest-risk geography in the working dataset</span>
  </div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The FY2025 HRRP supplemental extract covers the measurement window used for CMS’s published excess readmission ratios. After removing suppressed rows — hospitals with fewer than 25 discharges for a given condition, which CMS redacts to protect patient privacy — the working dataset contains 11,720 hospital-condition pairs across roughly 2,700 hospitals and six conditions: Acute Myocardial Infarction (AMI), Heart Failure, Pneumonia, Chronic Obstructive Pulmonary Disease (COPD), Hip &amp; Knee Arthroplasty, and Coronary Artery Bypass Graft (CABG). A hospital can perform well on five tracks and still take a hit on one.</p>
<p class="art-p">The suppressed rows matter. Small rural hospitals disproportionately fall below the 25-discharge threshold and disappear from the analysis. The hospitals in this dataset skew toward larger, busier facilities. That is not a flaw in the extract — it is a feature of how CMS designed the program — but it shapes every finding below.</p>
<p class="art-p">An ERR above 1.0 feeds a penalty calculation; the tier depends on how far above 1.0 a hospital sits relative to peers. For this piece, pairs are grouped into four tiers: No Penalty (ERR ≤ 1.0), Low, Medium, and High. Charts are rendered in R from the working CSVs in this monorepo ( articles/readmitted/data/ ), with PNG and interactive Plotly JSON exported side by side. Ownership labels for Chart 3 were joined from CMS Hospital General Information (dataset xubh-q36u ) and stored offline so the analysis does not depend on a live CMS download at render time.</p>
<h2 id="the-geography-of-failure" class="anchored">The Geography of Failure</h2>
<h3 id="the-geography-of-failure-look" class="anchored">States above the national average for penalized hospital-condition pairs — New Jersey leads at 65.4%</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart1_states_penalized.plotly.json" data-source="Data: CMS HRRP FY2025 supplemental (9n3s-kdb3) — ARTOMETRICS" data-fallback="/images/content/articles/readmitted/charts/chart1_states_penalized.png" role="img" aria-label="States above the national average for penalized hospital-condition pairs — New Jersey leads at 65.4%"></div>
  <figcaption class="art-chart-caption">Above the 48.1% national line, New Jersey leads at 65.4% — and high-resource markets sit beside high-poverty ones</figcaption>
</figure>
<p class="art-p">Nearly half of all hospital-condition pairs in this dataset carry an excess readmission ratio above 1.0. That national average hides the real story: the penalties are not evenly distributed.</p>
<p class="art-p">New Jersey leads the country at 65.4% — nearly two of every three hospital-condition pairs in the state perform worse than CMS models expect. Massachusetts ( 62.5% ) and Mississippi ( 61.1% ) follow. New Jersey hosts high-revenue systems such as Hackensack Meridian and RWJBarnabas; Massachusetts concentrates academic medical power around Mass General Brigham; Mississippi is rural, high-poverty, and chronically under-served. Different systems, different patient mixes, same penalty outcome.</p>
<p class="art-p">Georgia, Kentucky, West Virginia, Alabama, and Louisiana cluster high — which fits the familiar population-health narrative. So do Illinois, California, New York, and Pennsylvania. This is not a rural-poverty map with a clean boundary. High-resource markets do not immunize a system.</p>
<p class="art-p">Chart 1 shows only states above the national average — the cohort pulling the 48.1% mean up. Even below-average states are not clean. “Below average” means a smaller share of pairs exceed ERR 1.0, not zero penalties.</p>

<h2 id="the-condition-nobody-is-solving" class="anchored">The Condition Nobody Is Solving</h2>
<h3 id="the-condition-nobody-is-solving-look" class="anchored">Average excess readmission ratio by HRRP condition — Hip/Knee leads at 1.00485</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart2_err_by_condition.plotly.json" data-source="Data: CMS HRRP FY2025 supplemental (9n3s-kdb3) — ARTOMETRICS" data-fallback="/images/content/articles/readmitted/charts/chart2_err_by_condition.png" role="img" aria-label="Average excess readmission ratio by HRRP condition — Hip/Knee leads at 1.00485"></div>
  <figcaption class="art-chart-caption">All six conditions average above ERR 1.0; Hip/Knee sits at 1.00485 — nearly twice the excess of the next track</figcaption>
</figure>
<p class="art-p">All six conditions tracked under HRRP carry an average excess readmission ratio above 1.0. One stands apart.</p>
<p class="art-p">Every tracked condition still averages above 1.0. The national mean ERR is 1.0018 . Readmission rates have declined since 2012, but the program has not eliminated excess returns — it has measured them.</p>
<p class="art-p">Hip and knee replacement patients are readmitted at nearly twice the excess rate of the next closest condition. Hip/Knee’s average ERR of 1.00485 sits above COPD ( 1.00271 ), Heart Failure ( 1.00254 ), AMI ( 1.00212 ), Pneumonia ( 1.00198 ), and CABG ( 1.00187 ). The gaps live in the fourth decimal place — and still matter when multiplied across roughly 1.3 million U.S. joint replacements a year. Elective joint surgery shifts the danger window into post-discharge days hospitals cannot monitor as stays shorten.</p>
<p class="art-p">COPD sits near the bottom of this chart, but that is not a success story. COPD patients return at high rates in absolute terms. The lower ERR means CMS’s risk model expects a sicker baseline. The bar is lower because the patients are harder — not because outcomes are better.</p>

<h2 id="ownership-penalty-and-who-pays" class="anchored">Ownership, Penalty, and Who Pays</h2>
<h3 id="ownership-penalty-and-who-pays-look" class="anchored">Penalty tier distribution by hospital ownership — for-profits carry more high-tier weight</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart3_penalty_by_ownership.plotly.json" data-source="Data: CMS HRRP + Hospital General Information (xubh-q36u) — ARTOMETRICS" data-fallback="/images/content/articles/readmitted/charts/chart3_penalty_by_ownership.png" role="img" aria-label="Penalty tier distribution by hospital ownership — for-profits carry more high-tier weight"></div>
  <figcaption class="art-chart-caption">For-profit hospitals carry more medium and high penalty weight; every ownership type still has a majority in the no-penalty band</figcaption>
</figure>
<p class="art-p">For-profit hospitals carry a higher share of medium and high penalty tiers than either non-profits or government hospitals. The policy debate often oversimplifies who is actually paying.</p>
<p class="art-p">Every ownership type has roughly half or more of its hospital-condition pairs at or below the CMS expected readmission rate. HRRP is often described as a blanket stick. The data says the stick is concentrated — closer to an audit sampling than a universal fine. Systems such as HCA, Tenet, and Steward sit in the for-profit column; that does not mean every for-profit campus is High-tier.</p>
<p class="art-p">The gap is real — on the order of 8 to 10 percentage points more penalized pairs than non-profits — but it is a difference of degree, not kind. All three ownership types are playing the same game. For-profits lose it slightly more often.</p>
<p class="art-p">Government-owned facilities land between non-profit and for-profit. Neither the safety-net excuse nor the public-accountability story fits cleanly. County systems operate under political oversight that can slow discharge innovation; middle-of-pack performance is its own finding.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">CMS suppresses readmission data for hospitals that fall below 25 discharges per condition per measurement period. That threshold protects statistical reliability, but the effect is systematic — small rural hospitals disappear from this analysis. The hospitals remaining skew toward larger, busier facilities.</p>
<p class="art-p">Ownership classification for Chart 3 comes from CMS Hospital General Information, which uses inconsistent labeling across hospital types. Physician-owned facilities, tribal hospitals, and church-affiliated systems do not always map cleanly into three buckets. The Government, Non-Profit, and For-Profit groupings are reasonable approximations — not clean legal categories.</p>
<p class="art-p">ERR compares actual readmissions to what CMS’s risk model predicts for a hospital’s patient mix. Case-mix adjustment is imperfect. Hospitals in high-poverty, high-comorbidity markets may still face structural disadvantage the model does not fully absorb. Observation-status shifts after the ACA (documented by Zuckerman et al., 2016) also mean some returns never appear as inpatient readmissions.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Nearly half of all hospital-condition pairs still exceed CMS’s expected readmission rate — but the distribution is uneven. The highest-penalty states cut across market type and regional demographics. Hip/Knee replacement sits nearly 2× above the next closest condition on excess readmissions. For-profit hospitals carry modestly more penalty exposure than non-profits, though all three ownership types remain majority no-penalty.</p>
<p class="art-p">HRRP has been in effect since 2012. That 48.1% of pairs still clear the 1.0 ERR threshold more than a decade later says something about the limits of financial penalties as a behavior-change mechanism. Hospitals have responded — rates have declined — but the program has defined the problem more than it has solved it.</p>
<p class="art-p">CMS’s TEAM model, mandatory for 742 hospitals starting January 1, 2026, goes further by tying entire episodes of care to reimbursement. The hospitals that struggled under HRRP are the ones most likely to feel TEAM. This report describes the problem TEAM is designed to address. Whether bundled payments succeed where readmission penalties have not is the next question.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p class="art-p">
Centers for Medicare &amp; Medicaid Services. <em>Hospital Readmissions Reduction Program (HRRP) — FY2025 Supplemental Data</em>. CMS Provider Data Catalog, Dataset ID: 9n3s-kdb3. <a href="https://data.cms.gov/provider-data/dataset/9n3s-kdb3" target="_blank" rel="noopener noreferrer">https://data.cms.gov/provider-data/dataset/9n3s-kdb3</a>
</p>
<p class="art-p">
Centers for Medicare &amp; Medicaid Services. <em>Hospital General Information</em>. CMS Provider Data Catalog, Dataset ID: xubh-q36u. <a href="https://data.cms.gov/provider-data/dataset/xubh-q36u" target="_blank" rel="noopener noreferrer">https://data.cms.gov/provider-data/dataset/xubh-q36u</a> — joined to HRRP data for ownership classification in Chart 3.
</p>
<p class="art-p">
Centers for Medicare &amp; Medicaid Services. (2024). <em>Transforming Episode Accountability Model (TEAM)</em>. <a href="https://www.cms.gov/priorities/innovation/innovation-models/team" target="_blank" rel="noopener noreferrer">https://www.cms.gov/priorities/innovation/innovation-models/team</a> — mandatory participation effective January 1, 2026 for 742 hospitals.
</p>
<p class="art-p">
Medicare Payment Advisory Commission. (2024). <em>Report to the Congress: Medicare Payment Policy</em>, Chapter 9 (hospital inpatient and outpatient services; readmissions discussion). <a href="https://www.medpac.gov" target="_blank" rel="noopener noreferrer">https://www.medpac.gov</a>
</p>
<p class="art-p">
Zuckerman, R.B., Sheingold, S.H., Orav, E.J., Ruhter, J., &amp; Epstein, A.M. (2016). Readmissions, observation, and the Hospital Readmissions Reduction Program. <em>New England Journal of Medicine</em>, 374(16), 1543–1551. <a href="https://doi.org/10.1056/NEJMsa1513024" target="_blank" rel="noopener noreferrer">https://doi.org/10.1056/NEJMsa1513024</a>
</p>
<p class="art-p">
Krumholz, H.M., et al. (2017). Relationship between hospital readmission and mortality rates for patients hospitalized with acute myocardial infarction, heart failure, or pneumonia. <em>JAMA</em>, 318(3), 270–278. Background on readmission–mortality tradeoffs under quality measurement.
</p>

<h2 id="files" class="anchored">Files</h2>

<p class="art-p">Download the working datasets and chart exports used in this report. All files are hosted on this site — no external repo required.</p>
<div class="art-files">
  <h3 class="art-files__heading">Datasets</h3>
  <ul class="art-files__list">
    <li><a class="art-files__link" download href="/data/articles/readmitted/data/hrrp_state_summary.csv">hrrp_state_summary.csv</a> — state-level penalty share and average ERR</li>
    <li><a class="art-files__link" download href="/data/articles/readmitted/data/hrrp_condition_err.csv">hrrp_condition_err.csv</a> — average ERR by HRRP condition</li>
    <li><a class="art-files__link" download href="/data/articles/readmitted/data/hrrp_ownership_condition.csv">hrrp_ownership_condition.csv</a> — ownership × condition × penalty tier counts</li>
  </ul>
  <h3 class="art-files__heading">Charts (PNG)</h3>
  <ul class="art-files__list">
    <li><a class="art-files__link" download href="/images/content/articles/readmitted/charts/chart1_states_penalized.png">chart1_states_penalized.png</a></li>
    <li><a class="art-files__link" download href="/images/content/articles/readmitted/charts/chart2_err_by_condition.png">chart2_err_by_condition.png</a></li>
    <li><a class="art-files__link" download href="/images/content/articles/readmitted/charts/chart3_penalty_by_ownership.png">chart3_penalty_by_ownership.png</a></li>
  </ul>
  <h3 class="art-files__heading">Charts (Plotly JSON)</h3>
  <ul class="art-files__list">
    <li><a class="art-files__link" download href="/data/articles/readmitted/charts/chart1_states_penalized.plotly.json">chart1_states_penalized.plotly.json</a></li>
    <li><a class="art-files__link" download href="/data/articles/readmitted/charts/chart2_err_by_condition.plotly.json">chart2_err_by_condition.plotly.json</a></li>
    <li><a class="art-files__link" download href="/data/articles/readmitted/charts/chart3_penalty_by_ownership.plotly.json">chart3_penalty_by_ownership.plotly.json</a></li>
  </ul>
</div>

<h2 id="editor-s-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p class="art-p">
<em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. Charts are exported from R in this monorepo (<code>articles/readmitted/</code>). Artometrics was built on the premise that rigorous analysis and honest process are not in conflict. The research questions, editorial instincts, interpretive framing, and brand vision are ours. We document this not as a disclaimer but as a description of how we actually work.</em>
</p>
<p class="art-p">
<em>— Artometrics Editorial</em>
</p></div>

</main>
</div>

</main>
</div>
