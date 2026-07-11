---
title: "READMITTED: How America's Hospitals Are Failing the 30-Day Standard"
slug: readmitted
pubDate: 2026-04-21
description: "11,720 hospital-condition pairs under CMS HRRP: which states, conditions, and ownership types still exceed the 30-day readmission benchmark — and what that means for TEAM in 2026"
heroImage: /images/content/2026/04/hf_20260421_220509_74ac5ebd-a302-4bbb-b59a-6ef0c431ec9a.png
tags: [power, atlas]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>

  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#the-geography-of-failure" id="toc-the-geography-of-failure">THE GEOGRAPHY OF FAILURE</a></li>
  <li><a href="#the-condition-nobody-is-solving" id="toc-the-condition-nobody-is-solving">THE CONDITION NOBODY IS SOLVING</a></li>
  <li><a href="#ownership-penalty-and-who-pays" id="toc-ownership-penalty-and-who-pays">OWNERSHIP, PENALTY, AND WHO PAYS</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR’S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p>The Hospital Readmissions Reduction Program is a Medicare penalty system that has been running since 2012. The premise is simple: if your patients come back to the hospital within 30 days of discharge at a higher rate than expected given their medical profile, CMS docks your Medicare reimbursements. The penalty caps at 3% of all Medicare payments — not just payments for the specific condition being measured. A hospital with too many heart failure readmissions doesn’t just lose heart failure revenue. It loses 3% of everything.</p>
<p>The core metric is the Excess Readmission Ratio, or ERR. It is a ratio of predicted readmissions to expected readmissions — where “expected” is risk-adjusted for each patient’s age, comorbidities, and discharge history. An ERR of exactly 1.0 means you readmitted exactly as many patients as a hospital of your type and patient mix should. Above 1.0 means more readmissions than expected. Below 1.0 means fewer. What this analysis found: nearly every condition’s national average ERR is above 1.0. HRRP has been running for over a decade, and the average American hospital is still readmitting more patients than CMS expects. The penalty hasn’t eliminated the problem. It has clarified it.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<style>
.facts-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
margin: 24px 0 32px 0;
}
.fact-box {
background: #F2F0EB;
border-left: 4px solid #C0392B;
padding: 18px 20px;
border-radius: 2px;
text-align: left;
}
.fact-number {
display: block;
font-size: 1.75rem;
font-weight: 700;
color: #C0392B;
line-height: 1.1;
margin-bottom: 6px;
font-family: Helvetica, sans-serif;
text-align: left;
}
.fact-label {
display: block;
font-size: 0.82rem;
color: #6B6B6B;
line-height: 1.45;
font-family: Helvetica, sans-serif;
text-align: left;
max-width: none;
margin: 0;
}
@media (max-width: 700px) {
.facts-grid { grid-template-columns: 1fr 1fr; }
}
</style>

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
    <span class="fact-number">Hip/Knee</span>
    <span class="fact-label">the highest-ERR condition on average (1.004) — joint replacement patients are the hardest readmission problem for hospitals to control</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">742</span>
    <span class="fact-label">hospitals mandated to participate in CMS&#39;s TEAM bundled payment model as of January 1, 2026 — where readmission penalties become episode-level accountability</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">NJ</span>
    <span class="fact-label">state with the highest share of penalized hospital-condition pairs at 65.4% — the highest-risk geography in the dataset</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The FY2024 HRRP dataset covers the measurement period July 1, 2021 through June 30, 2024. After removing suppressed rows — hospitals with fewer than 25 discharges for a given condition, which CMS redacts to protect patient privacy — the working dataset contains 11,720 hospital-condition pairs across roughly 2,700 hospitals and 6 conditions. CMS tracks six conditions: Acute Myocardial Infarction (AMI), Heart Failure (HF), Pneumonia, Chronic Obstructive Pulmonary Disease (COPD), Hip &amp; Knee Arthroplasty, and Coronary Artery Bypass Graft (CABG). A hospital can perform flawlessly on five of them and still get penalized because of one.</p>
<p>The suppressed rows matter. Small rural hospitals disproportionately fall below the 25-discharge threshold and disappear from the analysis. The hospitals in this dataset skew toward larger, busier facilities. That’s not a flaw in the data — it’s a feature of how CMS designed the program. But it shapes every finding in this report.</p>
<p>An ERR above 1.0 triggers a penalty calculation, but the penalty tier depends on how far above 1.0 you are and the hospital’s overall performance relative to its peer group. For this analysis, hospitals are grouped into four tiers: No Penalty (ERR ≤ 1.0), Low (just above), Medium, and High. The High tier — hospitals with the worst readmission performance — is where CMS’s new TEAM model comes in. Starting January 1, 2026, 742 hospitals are mandated to participate in TEAM, a bundled payment model that goes further than HRRP by tying entire episodes of care — not just readmissions — to reimbursement. HRRP is where the penalty starts. TEAM is where the stakes get real.</p>
<p>The data was pulled live via CMS’s open Provider Data Catalog API using Dataset ID 9n3s-kdb3. Ownership data for Chart 3 was joined from a second CMS dataset (xubh-q36u) using facility ID as the key. No local CSVs were used — the analysis is fully reproducible from the R code chunks in this document.</p>

<h2 id="the-geography-of-failure" class="anchored">THE GEOGRAPHY OF FAILURE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart1_states_penalized.plotly.json" data-fallback="/images/content/articles/readmitted/charts/chart1_states_penalized.png" role="img" aria-label="States Penalized"></div>
</figure>
</div>
</div>
</div>
<p>Nearly half of all hospital-condition pairs in this dataset carry an excess readmission ratio above 1.0. The map of where those pairs cluster breaks three assumptions people bring to HRRP.</p>
<div class="art-myth-grid">
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 1</p>
    <p class="art-myth-card__myth">Readmission penalties are mainly a Southern, rural poverty story — under-resourced hospitals in chronically sick regions.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> New Jersey leads at 65.4%, with Massachusetts and Mississippi close behind. Georgia, Kentucky, and West Virginia show up — but so do Illinois, California, New York, and Pennsylvania. Dense academic markets and rural high-poverty states land in the same penalty bucket.</p>
  </article>
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 2</p>
    <p class="art-myth-card__myth">If your state sits below the national average, your hospitals have largely solved the readmission problem.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> Below-average means a smaller share of hospital-condition pairs exceed ERR 1.0 — not zero penalties. Even better-performing states still have hospitals losing Medicare revenue on readmissions.</p>
  </article>
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 3</p>
    <p class="art-myth-card__myth">The 48.1% national penalized rate means CMS is punishing hospitals everywhere at roughly the same intensity.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> The chart shows only states above the national average — roughly 20 states pulling the mean up. Penalty exposure is concentrated geographically, not evenly distributed.</p>
  </article>
</div>

<h2 id="the-condition-nobody-is-solving" class="anchored">THE CONDITION NOBODY IS SOLVING</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart2_err_by_condition.plotly.json" data-fallback="/images/content/articles/readmitted/charts/chart2_err_by_condition.png" role="img" aria-label="Err By Condition"></div>
</figure>
</div>
</div>
</div>
<p>All six conditions tracked under HRRP still average above ERR 1.0. The differences are measured in thousandths — which makes three common assumptions easy to miss.</p>
<div class="art-myth-grid">
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 1</p>
    <p class="art-myth-card__myth">Twelve years of HRRP penalties have pushed hospitals broadly back to — or below — CMS’s expected readmission rates.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> Every tracked condition still averages above 1.0. The national mean ERR is 1.0018. HRRP has clarified the problem more than it has eliminated it.</p>
  </article>
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 2</p>
    <p class="art-myth-card__myth">COPD’s position at the bottom of the chart means hospitals are finally controlling readmissions for the sickest respiratory patients.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> COPD’s average ERR is 1.0011 — still above benchmark. The low rank reflects CMS’s risk model, which expects a sicker baseline. The bar is lower because the patients are harder, not because outcomes are better.</p>
  </article>
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 3</p>
    <p class="art-myth-card__myth">Readmission risk is spread evenly across the six HRRP conditions.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> Hip/Knee replacement averages 1.004 — nearly double the excess gap versus CABG and AMI at 1.0018. Elective joint surgery shifts the danger window to post-discharge days hospitals cannot monitor, especially as stays shorten.</p>
  </article>
</div>

<h2 id="ownership-penalty-and-who-pays" class="anchored">OWNERSHIP, PENALTY, AND WHO PAYS</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart3_penalty_by_ownership.plotly.json" data-fallback="/images/content/articles/readmitted/charts/chart3_penalty_by_ownership.png" role="img" aria-label="Penalty By Ownership"></div>
</figure>
</div>
</div>
</div>
<p>Ownership type shapes penalty exposure — but policy debates often oversimplify who is actually paying.</p>
<div class="art-myth-grid">
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 1</p>
    <p class="art-myth-card__myth">HRRP is a blanket penalty regime — most hospital-condition pairs are losing money on readmissions most of the time.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> Across non-profit, government, and for-profit ownership, roughly half or more of hospital-condition pairs sit in the no-penalty tier. The stick is real, but concentrated — not universal.</p>
  </article>
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 2</p>
    <p class="art-myth-card__myth">For-profit hospitals are uniquely failing on readmissions while non-profits have the model figured out.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> For-profits carry about 8–10 percentage points more medium and high-tier exposure than non-profits. That is a difference of degree, not kind — all three ownership types are playing the same game.</p>
  </article>
  <article class="art-myth-card">
    <p class="art-myth-card__index">MYTH 3</p>
    <p class="art-myth-card__myth">Government hospitals are either shielded by public funding or doomed by chronic underinvestment.</p>
    <p class="art-myth-card__reality"><strong>What the data shows:</strong> Government-owned facilities land in the middle — more penalized than non-profits, less than for-profits. Neither protection nor collapse story fits cleanly.</p>
  </article>
</div>

<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>CMS suppresses readmission data for hospitals that fall below 25 discharges per condition per measurement period. That threshold exists to protect statistical reliability, but the effect is systematic — small rural hospitals disappear from this analysis entirely. The hospitals in this dataset skew toward larger, busier facilities. Every finding in this report should be read with that in mind.</p>
<p>The ownership classification in Chart 3 is derived from CMS’s Hospital General Information dataset, which uses inconsistent labeling across hospital types. Physician-owned facilities, tribal hospitals, and church-affiliated systems don’t always map cleanly into three buckets. The Government, Non-Profit, and For-Profit groupings are reasonable approximations — not clean legal categories.</p>
<p>The excess readmission ratio compares a hospital’s actual readmissions to what CMS’s risk model predicts for that hospital’s specific patient population. A hospital serving sicker, older, lower-income patients will have a higher expected rate built into its denominator. ERR controls for case mix — but imperfectly. Hospitals in high-poverty, high-comorbidity markets may still face a structural disadvantage that the model doesn’t fully account for.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Nearly half of all hospital-condition pairs in this dataset are performing worse than CMS models expect — but the distribution is uneven in ways the myth-by-myth breakdown above makes visible. The highest-penalty states cut across market type and regional demographics. Hip/Knee replacement sits nearly 2× above the next closest condition on excess readmissions. For-profit hospitals carry modestly more penalty exposure than non-profits, though all three ownership types are majority no-penalty.</p>
<p>The Hospital Readmissions Reduction Program has been in effect since 2012. The fact that 48.1% of hospital-condition pairs still exceed the 1.0 ERR threshold more than a decade later says something about the limits of financial penalties as a behavior change mechanism. Hospitals have responded — readmission rates have declined since HRRP launched — but the program hasn’t solved the problem. It has defined it.</p>
<p>CMS’s TEAM model, mandatory for 742 hospitals starting January 1, 2026, goes further than HRRP by tying entire episodes of care to reimbursement — not just the readmission event. The hospitals that have struggled under HRRP are the ones most likely to be in scope for TEAM. The data in this report describes the problem TEAM is designed to address. Whether bundled payments succeed where readmission penalties haven’t is the next question.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p class="art-p">
Centers for Medicare &amp; Medicaid Services. <em>Hospital Readmissions Reduction Program (HRRP) — FY2025 Supplemental Data</em>. CMS Provider Data Catalog, Dataset ID: 9n3s-kdb3. Retrieved from https://data.cms.gov/provider-data/dataset/9n3s-kdb3
</p>
<p class="art-p">
Centers for Medicare &amp; Medicaid Services. <em>Hospital General Information</em>. CMS Provider Data Catalog, Dataset ID: xubh-q36u. Retrieved from https://data.cms.gov/provider-data/dataset/xubh-q36u — joined to HRRP data for ownership classification in Chart 3.
</p>
<p class="art-p">
Centers for Medicare &amp; Medicaid Services. (2024). <em>Transforming Episode Accountability Model (TEAM)</em>. Retrieved from https://www.cms.gov/priorities/innovation/innovation-models/team — mandatory participation effective January 1, 2026 for 742 hospitals.
</p>
<p class="art-p">
Zuckerman, R.B., Sheingold, S.H., Orav, E.J., Ruhter, J., &amp; Epstein, A.M. (2016). Readmissions, observation, and the Hospital Readmissions Reduction Program. <em>New England Journal of Medicine</em>, 374(16), 1543–1551. — background on HRRP effectiveness and readmission trends post-2012.
</p>
<h2 id="editors-note" class="anchored">EDITOR’S NOTE</h2><div class="art-editorial-note"><p class="art-p">
<em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. Artometrics was built on the premise that rigorous analysis and honest process are not in conflict. The research questions, editorial instincts, interpretive framing, and brand vision are ours. The execution — every line of R code, every paragraph of analysis, every design decision — was a collaboration. We document this not as a disclaimer but as a description of how we actually work, and as a position: we believe this is what serious data journalism looks like when the tools available are used honestly and at full capacity.</em>
</p>
<p class="art-p">
<em>— Artometrics Editorial</em>
</p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/readmitted" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
