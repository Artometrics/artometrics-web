---
title: "READMITTED: How America's Hospitals Are Failing the 30-Day Standard"
slug: readmitted
pubDate: 2026-04-21
description: "A Data Analysis Of 11,720 Hospital-Condition Pairs Mapping Which States, Conditions, And Ownership Types Pay The Most Under CMS HRRP"
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
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-sql">SQL</span>
    </summary>
    <pre class="art-code-pre" id="cb1-1">-- HRRP READMISSIONS: CLEANING AND PENALTY TIER CLASSIFICATION
-- Mirrors the R cleaning logic in readmitted.qmd
-- Source: CMS Provider Data Catalog, Dataset ID: 9n3s-kdb3

SELECT
    facility_name,
    facility_id,
    state,
    measure_name,
    CAST(excess_readmission_ratio AS FLOAT)     AS err,
    CAST(number_of_discharges AS INT)           AS discharges,
    CAST(predicted_readmission_rate AS FLOAT)   AS predicted_rate,
    CAST(expected_readmission_rate AS FLOAT)    AS expected_rate,
    CASE
        WHEN CAST(excess_readmission_ratio AS FLOAT) <= 1.0   THEN 'No Penalty'
        WHEN CAST(excess_readmission_ratio AS FLOAT) <= 1.005 THEN 'Low'
        WHEN CAST(excess_readmission_ratio AS FLOAT) <= 1.015 THEN 'Medium'
        ELSE 'High'
    END AS penalty_tier
FROM hrrp_readmissions
WHERE
    excess_readmission_ratio NOT IN ('Too Few Cases', 'N/A', '')
    AND excess_readmission_ratio IS NOT NULL
ORDER BY state, facility_name, measure_name;

-- AGGREGATE VIEW: Average ERR by condition and state
SELECT
    measure_name,
    state,
    COUNT(*)                                                AS hospital_count,
    ROUND(AVG(CAST(excess_readmission_ratio AS FLOAT)), 6)  AS avg_err,
    ROUND(SUM(CASE
        WHEN CAST(excess_readmission_ratio AS FLOAT) > 1.0
        THEN 1 ELSE 0
    END) * 100.0 / COUNT(*), 1)                            AS pct_penalized
FROM hrrp_readmissions
WHERE
    excess_readmission_ratio NOT IN ('Too Few Cases', 'N/A', '')
    AND excess_readmission_ratio IS NOT NULL
GROUP BY measure_name, state
ORDER BY avg_err DESC;</pre>
  </details>
</div>
</div>
</div>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-python">PYTHON</span>
    </summary>
    <pre class="art-code-pre" id="cb2-1"># HRRP Artometrics — Python EDA
# Purpose: Dataset pull diagnostics and exploratory checks
# Run before R chart build to validate shape and coverage

import pandas as pd
import numpy as np
import requests

# ── 1. Fetch Metadata and Download URL ──────────────────────────────────────

META_URL = (
    "https://data.cms.gov/provider-data/api/1/metastore/"
    "schemas/dataset/items/9n3s-kdb3?show-reference-ids=false"
)
meta = requests.get(META_URL).json()
download_url = meta["distribution"][0]["data"]["downloadURL"]
print(f"Download URL: {download_url}")

# ── 2. Load and Filter ───────────────────────────────────────────────────────

df = pd.read_csv(download_url, na_values=["N/A", "", " "])
df_clean = df.dropna(subset=["Excess Readmission Ratio"]).copy()

print(f"Raw rows:     {len(df):,}")
print(f"After filter: {len(df_clean):,}")

# ── 3. Condition Coverage ────────────────────────────────────────────────────

condition_map = {
    "READM-30-AMI-HRRP":      "AMI",
    "READM-30-HF-HRRP":       "Heart Failure",
    "READM-30-PN-HRRP":       "Pneumonia",
    "READM-30-COPD-HRRP":     "COPD",
    "READM-30-HIP-KNEE-HRRP": "Hip/Knee",
    "READM-30-CABG-HRRP":     "CABG",
}
df_clean["condition"] = df_clean["Measure Name"].map(condition_map)

print(df_clean["condition"].value_counts())

# ── 4. ERR Summary ───────────────────────────────────────────────────────────

df_clean["err"] = pd.to_numeric(df_clean["Excess Readmission Ratio"], errors="coerce")

err_summary = (
    df_clean.groupby("condition")["err"]
    .agg(["mean", "median", "std", "count"])
    .sort_values("mean", ascending=False)
)
print(err_summary.round(6))

pct_penalized = (df_clean["err"] > 1.0).mean() * 100
print(f"\nNational % penalized: {pct_penalized:.1f}%")

# ── 5. State Summary ─────────────────────────────────────────────────────────

state_pct = (
    df_clean.groupby("State")["err"]
    .apply(lambda x: (x > 1.0).mean() * 100)
    .sort_values(ascending=False)
    .head(10)
)
print("\nTop 10 states by % penalized:")
print(state_pct.round(1))</pre>
  </details>
</div>
</div>
</div>
<h2 id="the-geography-of-failure" class="anchored">THE GEOGRAPHY OF FAILURE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart1_states_penalized.plotly.json" data-fallback="/images/content/articles/readmitted/charts/chart1_states_penalized.png" role="img" aria-label="States Penalized"></div>
  <figcaption class="art-chart-caption">States Penalized</figcaption>
</figure>
</div>
</div>
</div>
<p>Nearly half of all hospital-condition pairs in this dataset carry an excess readmission ratio above 1.0. But that national average hides something important: the penalties are not evenly distributed. New Jersey leads the country at 65.4% — meaning nearly two out of every three hospital-condition pairs in the state are performing worse than CMS models expect. Massachusetts and Mississippi follow close behind. That’s the first surprise. New Jersey and Massachusetts are dense, high-volume, well-resourced hospital markets. Mississippi is rural, high-poverty, and chronically under-served. Different systems, different patient populations, same penalty outcome.</p>
<p>The rest of the top 20 tells a similar story of geographic contradiction. The South shows up heavily — Georgia, Kentucky, West Virginia, Alabama, Arkansas, Louisiana, Tennessee — which fits the expected narrative around population health disparities and chronic disease burden. But so does Illinois, California, New York, and Pennsylvania. This is not a rural poverty problem with a clean geographic boundary. It’s a systems problem that cuts across market type, hospital size, and regional demographics.</p>
<p>The chart only shows states above the national average — the 20-odd states that are pulling the number up. But it’s worth noting that even the “better-performing” states aren’t clean. Below-average doesn’t mean penalty-free. It means a smaller share of hospital-condition pairs are exceeding the threshold, not that the problem is solved.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="cb3-1">nat_avg <- mean(hrrp_clean$err > 1.0, na.rm = TRUE) * 100

state_pct <- hrrp_clean %>%
  group_by(state) %>%
  summarise(
    pct_penalized = mean(err > 1.0, na.rm = TRUE) * 100,
    n = n(),
    .groups = "drop"
  ) %>%
  filter(pct_penalized > nat_avg) %>%
  mutate(state = fct_reorder(state, pct_penalized))

ggplot(state_pct, aes(x = pct_penalized, y = state)) +
  geom_col(fill = art_highlight, width = 0.65) +
  geom_vline(xintercept = nat_avg, linetype = "dashed",
             color = art_secondary, linewidth = 1.0) +
  geom_text(
    aes(label = paste0(round(pct_penalized, 1), "%")),
    hjust = -0.2, size = 2.9, color = art_dark, family = "sans"
  ) +
  scale_x_continuous(
    labels = function(x) paste0(x, "%"),
    expand = expansion(mult = c(0, 0.14))
  ) +
  labs(
    title    = "Which <span style='color:#C0392B;'>States</span> Have the Most Penalized Hospitals?",
    subtitle = "Above-average states only — where more hospital-condition pairs exceed the 1.0 ERR threshold than the national rate",
    x        = "% of Hospital-Condition Pairs with ERR > 1.0",
    y        = NULL,
    caption  = "Source: CMS Hospital Readmissions Reduction Program (HRRP) | — ARTOMETRICS\nDashed line = national average (48.1%)"
  ) +
  theme_artometrics() +
  theme(
    panel.grid.major.y = element_blank(),
    panel.grid.major.x = element_line(color = art_muted, linewidth = 0.3)
  )

ggsave("chart1_states_penalized.png",
       path = "charts", width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>
</div>
</div>
<h2 id="the-condition-nobody-is-solving" class="anchored">THE CONDITION NOBODY IS SOLVING</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart2_err_by_condition.plotly.json" data-fallback="/images/content/articles/readmitted/charts/chart2_err_by_condition.png" role="img" aria-label="Err By Condition"></div>
  <figcaption class="art-chart-caption">Err By Condition</figcaption>
</figure>
</div>
</div>
</div>
<p>All six conditions tracked under HRRP carry an average excess readmission ratio above 1.0. But one stands apart. Hip and knee replacement patients are being readmitted at nearly twice the excess rate of the next closest condition — a gap that looks small in absolute terms but is enormous relative to how tightly the other five cluster. Hip/Knee’s average ERR of 1.004 sits well above CABG at 1.0018 and AMI at 1.0018. Those differences are in the fourth decimal place. They are not small.</p>
<p>Hip/Knee is elective, scheduled surgery on an aging population with high comorbidity loads. The hospital controls the procedure. It has far less control over what happens at home on day 12 — when a blood clot develops, a fall occurs, or an infection surfaces. CMS has pushed shorter inpatient stays aggressively over the past decade, which moves patients out the door faster and shifts the risk window into a setting hospitals can’t monitor.</p>
<p>COPD sits at the bottom of this chart at 1.0011 — but that’s not a success story. COPD patients are readmitted at high rates in absolute terms. The low ERR means hospitals are performing roughly in line with what CMS expects for that population. CMS’s risk model for COPD is calibrated to a sicker baseline. The bar is lower because the patients are harder.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="cb4-1">condition_err <- hrrp_clean %>%
  group_by(condition) %>%
  summarise(
    avg_err = mean(err, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  arrange(desc(avg_err)) %>%
  mutate(condition = fct_reorder(condition, avg_err))

x_min <- floor(min(condition_err$avg_err) * 10000) / 10000 - 0.0005
x_max <- ceiling(max(condition_err$avg_err) * 10000) / 10000 + 0.0005

ggplot(condition_err, aes(x = avg_err, y = condition)) +
  geom_segment(
    aes(x = 1.0, xend = avg_err, yend = condition),
    color = art_muted, linewidth = 0.8
  ) +
  geom_point(color = art_highlight, size = 4) +
  geom_vline(xintercept = 1.0, color = art_dark, linewidth = 0.6) +
  geom_text(
    aes(label = sprintf("%.5f", avg_err)),
    hjust = -0.35, size = 3.2, color = art_dark, family = "sans"
  ) +
  annotate(
    "text", x = 1.00385, y = 5.6,
    label = "Nearly 2× the excess\nof the next condition",
    hjust = 1, vjust = 0.5, size = 2.6, color = art_highlight,
    family = "sans", fontface = "italic"
  ) +
  annotate(
    "text", x = 1.0, y = 6.6,
    label = "ERR = 1.0\n(no excess)", hjust = 0.5, vjust = 0,
    size = 2.8, color = art_mid, family = "sans"
  ) +
  scale_x_continuous(
    limits = c(x_min, x_max + 0.0015),
    labels = function(x) sprintf("%.4f", x),
    expand = expansion(mult = c(0.01, 0.08))
  ) +
  labs(
    title    = "The <span style='color:#C0392B;'>Hip/Knee</span> Problem: Excess Readmission Ratio by Condition",
    subtitle = "All six conditions exceed 1.0 — but the spread is measured in thousandths",
    x        = "Average Excess Readmission Ratio (ERR)",
    y        = NULL,
    caption  = "Source: CMS HRRP | — ARTOMETRICS"
  ) +
  theme_artometrics() +
  theme(
    panel.grid.major.y = element_blank(),
    panel.grid.major.x = element_line(color = art_muted, linewidth = 0.3)
  )

ggsave("chart2_err_by_condition.png",
       path = "charts", width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>
</div>
</div>
<h2 id="ownership-penalty-and-who-pays" class="anchored">OWNERSHIP, PENALTY, AND WHO PAYS</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/readmitted/charts/chart3_penalty_by_ownership.plotly.json" data-fallback="/images/content/articles/readmitted/charts/chart3_penalty_by_ownership.png" role="img" aria-label="Penalty By Ownership"></div>
  <figcaption class="art-chart-caption">Penalty By Ownership</figcaption>
</figure>
</div>
</div>
</div>
<p>For-profit hospitals carry a higher share of medium and high penalty tiers than either non-profits or government hospitals. The gap is real — roughly 8 to 10 percentage points more penalized pairs than non-profits — but it’s a difference of degree, not kind. All three ownership types are playing the same game. For-profits are just losing it slightly more often.</p>
<p>Look at the no-penalty segment across all three bars. Every ownership type has roughly half or more of its hospital-condition pairs performing at or below the CMS expected readmission rate. That’s the counterintuitive finding. HRRP gets talked about as a widespread penalty regime — a stick CMS uses to punish underperforming hospitals. But the data says most hospitals, most of the time, are hitting the benchmark. The penalty is concentrated, not universal.</p>
<p>Government hospitals sit in the middle — more penalized than non-profits, less than for-profits. That cuts against two assumptions that often get made about public hospitals: that they’re protected by stable public funding, or that they’re disadvantaged by chronic underfunding. Neither story holds cleanly here. Government hospitals are performing in the middle of the pack, which is its own kind of finding.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="cb5-1">hospital_info <- read_csv(
  "https://data.cms.gov/provider-data/sites/default/files/resources/893c372430d9d71a1c52737d01239d47_1770163599/Hospital_General_Information.csv"
) %>%
  clean_names() %>%
  select(facility_id, hospital_ownership) %>%
  mutate(
    ownership_group = case_when(
      str_detect(hospital_ownership, regex("government|tribal|district", ignore_case = TRUE)) ~ "Government",
      str_detect(hospital_ownership, regex("non-profit|voluntary|church", ignore_case = TRUE)) ~ "Non-Profit",
      str_detect(hospital_ownership, regex("proprietary|for.profit|physician", ignore_case = TRUE)) ~ "For-Profit",
      TRUE ~ NA_character_
    )
  ) %>%
  filter(!is.na(ownership_group))

joined <- hrrp_clean %>%
  inner_join(hospital_info, by = "facility_id")

tier_order  <- c("No Penalty", "Low", "Medium", "High")
tier_colors <- c(
  "No Penalty" = art_secondary,
  "Low"        = "#7F8FA6",
  "Medium"     = "#E07B54",
  "High"       = art_highlight
)

plot_data <- joined %>%
  filter(!is.na(penalty_tier)) %>%
  mutate(
    penalty_tier    = factor(penalty_tier, levels = tier_order),
    ownership_group = factor(ownership_group,
                             levels = c("Non-Profit", "Government", "For-Profit"))
  ) %>%
  count(ownership_group, penalty_tier) %>%
  group_by(ownership_group) %>%
  mutate(pct = n / sum(n)) %>%
  ungroup()

ggplot(plot_data, aes(x = ownership_group, y = pct, fill = penalty_tier)) +
  geom_col(position = "fill", width = 0.6) +
  scale_y_continuous(labels = scales::percent_format(accuracy = 1)) +
  scale_fill_manual(values = tier_colors, name = "Penalty Tier") +
  coord_flip() +
  labs(
    title    = "<span style='color:#C0392B;'>For-Profit</span> Hospitals Carry More Penalty Weight",
    subtitle = "Penalty tier distribution by hospital ownership type",
    x        = NULL,
    y        = "Share of Hospital-Condition Pairs",
    caption  = "Source: CMS HRRP + CMS Hospital General Information (xubh-q36u) | — ARTOMETRICS"
  ) +
  theme_artometrics() +
  theme(
    panel.grid.major.y = element_blank(),
    panel.grid.major.x = element_line(color = art_muted, linewidth = 0.3),
    legend.position    = "right"
  )

ggsave("chart3_penalty_by_ownership.png",
       path = "charts", width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>
</div>
</div>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>CMS suppresses readmission data for hospitals that fall below 25 discharges per condition per measurement period. That threshold exists to protect statistical reliability, but the effect is systematic — small rural hospitals disappear from this analysis entirely. The hospitals in this dataset skew toward larger, busier facilities. Every finding in this report should be read with that in mind.</p>
<p>The ownership classification in Chart 3 is derived from CMS’s Hospital General Information dataset, which uses inconsistent labeling across hospital types. Physician-owned facilities, tribal hospitals, and church-affiliated systems don’t always map cleanly into three buckets. The Government, Non-Profit, and For-Profit groupings are reasonable approximations — not clean legal categories.</p>
<p>The excess readmission ratio compares a hospital’s actual readmissions to what CMS’s risk model predicts for that hospital’s specific patient population. A hospital serving sicker, older, lower-income patients will have a higher expected rate built into its denominator. ERR controls for case mix — but imperfectly. Hospitals in high-poverty, high-comorbidity markets may still face a structural disadvantage that the model doesn’t fully account for.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Nearly half of all hospital-condition pairs in this dataset are performing worse than CMS models expect. But the distribution is uneven in ways that matter. The highest-penalty states cut across market type and regional demographics — New Jersey and Massachusetts sit alongside Mississippi and West Virginia. The highest-penalty condition, Hip/Knee replacement, sits nearly 2x above the next closest. And for-profit hospitals carry modestly more penalty exposure than non-profits, though all three ownership types are majority no-penalty.</p>
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
