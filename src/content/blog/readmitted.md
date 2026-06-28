---
title: "READMITTED: How America's Hospitals Are Failing the 30-Day Standard"
slug: readmitted
pubDate: 2026-04-21
description: "A Data Analysis Of 11,720 Hospital-Condition Pairs Mapping Which States, Conditions, And Ownership Types Pay The Most Under CMS HRRP"
heroImage: /images/content/2026/04/hf_20260421_220509_74ac5ebd-a302-4bbb-b59a-6ef0c431ec9a.png
tags: [power, atlas]
draft: false
---

<style>
.art-p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.05rem;
  line-height: 1.85;
  color: #1C1C1E;
  max-width: 680px;
  margin: 0 auto 1.4rem auto;
  text-align: center;
}
.art-p a { color: #C0392B; text-decoration: none; }
.art-p a:hover { text-decoration: underline; }
.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 24px auto 32px auto;
  max-width: 860px;
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
}
.fact-label {
  display: block;
  font-size: 0.82rem;
  color: #6B6B6B;
  line-height: 1.45;
  font-family: Helvetica, sans-serif;
}
@media (max-width: 700px) {
  .facts-grid { grid-template-columns: 1fr 1fr; }
}
.art-code-block {
  margin: 0.8rem auto 1rem;
  max-width: 860px;
  text-align: center;
}
.art-code-block details { text-align: left; }
.art-code-summary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6B6B6B;
  letter-spacing: 0.5px;
  cursor: pointer;
  list-style: none;
  padding: 8px 16px;
  background: #F2F0EB;
  border: 1px solid #D5D5D5;
  border-radius: 4px;
  margin-top: 0.5rem;
}
.art-code-summary::-webkit-details-marker { display: none; }
.art-code-summary:hover { color: #C0392B; border-color: #C0392B; }
.art-code-pre {
  background: #F2F0EB;
  border: 1px solid #D5D5D5;
  border-left: 3px solid #2C3E6B;
  border-radius: 0 0 4px 4px;
  padding: 1rem 1.2rem;
  font-family: 'DM Mono', 'Courier New', monospace;
  font-size: 0.78rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0 0 0.5rem;
  white-space: pre;
  text-align: left;
}
.art-lang-tag {
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 3px;
}
.art-lang-sql    { background: #2C3E6B; color: #fff; }
.art-lang-python { background: #2E7D32; color: #fff; }
.art-lang-r      { background: #C0392B; color: #fff; }
.art-github-btn {
  display: inline-block;
  margin: 2rem auto 1rem;
  padding: 12px 28px;
  background: #1C1C1E;
  color: #FAFAF8;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 3px;
  transition: background 0.15s;
}
.art-github-btn:hover { background: #C0392B; color: #fff; }
</style>



<div style="margin: 0 0 32px 0;">
  <iframe width="100%" height="180" frameborder="no" scrolling="no" seamless="" src="https://share.transistor.fm/e/3e0aa346"></iframe>
</div>



<p class="art-p">The Hospital Readmissions Reduction Program is a Medicare penalty system that has been running since 2012. The premise is simple: if your patients come back to the hospital within 30 days of discharge at a higher rate than expected given their medical profile, CMS docks your Medicare reimbursements. The penalty caps at 3% of all Medicare payments — not just payments for the specific condition being measured. A hospital with too many heart failure readmissions doesn't just lose heart failure revenue. It loses 3% of everything.</p>

<p class="art-p">The core metric is the Excess Readmission Ratio, or ERR. It is a ratio of predicted readmissions to expected readmissions — where "expected" is risk-adjusted for each patient's age, comorbidities, and discharge history. An ERR of exactly 1.0 means you readmitted exactly as many patients as a hospital of your type and patient mix should. Above 1.0 means more readmissions than expected. Below 1.0 means fewer. What this analysis found: nearly every condition's national average ERR is above 1.0. HRRP has been running for over a decade, and the average American hospital is still readmitting more patients than CMS expects. The penalty hasn't eliminated the problem. It has clarified it.</p>

<figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/HtqbnQp60uc?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="READMITTED: How America's Hospitals Are Failing the 30-Day Standard"></iframe></figure><div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="fast-facts" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">FAST FACTS</span></h2>
                    
                    
                </div>
            </div>
        </div>

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
    <span class="fact-label">hospitals mandated to participate in CMS's TEAM bundled payment model as of January 1, 2026 — where readmission penalties become episode-level accountability</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">NJ</span>
    <span class="fact-label">state with the highest share of penalized hospital-condition pairs at 65.4% — the highest-risk geography in the dataset</span>
  </div>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="dataset-context" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">DATASET CONTEXT</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div style="margin: 32px 0;">
<div class='tableauPlaceholder' id='viz1778055807570' style='position: relative'>
<noscript><a href='__GHOST_URL__/readmitted/'><img alt='HOSPITAL READMISSION PENALTIES' src='https://public.tableau.com/static/images/re/readmitted_dashboard/READMITTED/1_rss.png' style='border: none' /></a></noscript>
<object class='tableauViz' style='display:none;'>
<param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
<param name='embed_code_version' value='3' />
<param name='site_root' value='' />
<param name='name' value='readmitted_dashboard/READMITTED' />
<param name='tabs' value='no' />
<param name='toolbar' value='yes' />
<param name='static_image' value='https://public.tableau.com/static/images/re/readmitted_dashboard/READMITTED/1.png' />
<param name='animate_transition' value='yes' />
<param name='display_static_image' value='yes' />
<param name='display_spinner' value='yes' />
<param name='display_overlay' value='yes' />
<param name='display_count' value='yes' />
<param name='language' value='en-US' />
<param name='filter' value='publish=yes' />
</object>
</div>
<script type='text/javascript'>
var divElement = document.getElementById('viz1778055807570');
var vizElement = divElement.getElementsByTagName('object')[0];
if (divElement.offsetWidth > 800) { vizElement.style.width='100%'; vizElement.style.height=(divElement.offsetWidth*0.75)+'px'; }
else if (divElement.offsetWidth > 500) { vizElement.style.width='100%'; vizElement.style.height=(divElement.offsetWidth*0.75)+'px'; }
else { vizElement.style.width='100%'; vizElement.style.height='1477px'; }
var scriptElement = document.createElement('script');
scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
vizElement.parentNode.insertBefore(scriptElement, vizElement);
</script>
</div>



<p class="art-p">The FY2024 HRRP dataset covers the measurement period July 1, 2021 through June 30, 2024. After removing suppressed rows — hospitals with fewer than 25 discharges for a given condition, which CMS redacts to protect patient privacy — the working dataset contains 11,720 hospital-condition pairs across roughly 2,700 hospitals and 6 conditions. CMS tracks six conditions: Acute Myocardial Infarction (AMI), Heart Failure (HF), Pneumonia, Chronic Obstructive Pulmonary Disease (COPD), Hip & Knee Arthroplasty, and Coronary Artery Bypass Graft (CABG). A hospital can perform flawlessly on five of them and still get penalized because of one.</p>

<p class="art-p">The suppressed rows matter. Small rural hospitals disproportionately fall below the 25-discharge threshold and disappear from the analysis. The hospitals in this dataset skew toward larger, busier facilities. That's not a flaw in the data — it's a feature of how CMS designed the program. But it shapes every finding in this report.</p>

<p class="art-p">An ERR above 1.0 triggers a penalty calculation, but the penalty tier depends on how far above 1.0 you are and the hospital's overall performance relative to its peer group. For this analysis, hospitals are grouped into four tiers: No Penalty (ERR ≤ 1.0), Low (just above), Medium, and High. The High tier — hospitals with the worst readmission performance — is where CMS's new TEAM model comes in. Starting January 1, 2026, 742 hospitals are mandated to participate in TEAM, a bundled payment model that goes further than HRRP by tying entire episodes of care — not just readmissions — to reimbursement. HRRP is where the penalty starts. TEAM is where the stakes get real.</p>

<p class="art-p">The data was pulled live via CMS's open Provider Data Catalog API using Dataset ID 9n3s-kdb3. Ownership data for Chart 3 was joined from a second CMS dataset (xubh-q36u) using facility ID as the key. No local CSVs were used — the analysis is fully reproducible from the R code chunks in this document.</p>

<div style="max-width: 680px; margin: 0 auto 32px auto;">
<details>
<summary><span class="art-lang-tag art-lang-sql">SQL</span> &nbsp;View filtering logic</summary>
<pre class="art-code-pre">-- HRRP READMISSIONS: CLEANING AND PENALTY TIER CLASSIFICATION
SELECT
    facility_name, facility_id, state, measure_name,
    CAST(excess_readmission_ratio AS FLOAT) AS err,
    CASE
        WHEN CAST(excess_readmission_ratio AS FLOAT) &lt;= 1.0   THEN 'No Penalty'
        WHEN CAST(excess_readmission_ratio AS FLOAT) &lt;= 1.005 THEN 'Low'
        WHEN CAST(excess_readmission_ratio AS FLOAT) &lt;= 1.015 THEN 'Medium'
        ELSE 'High'
    END AS penalty_tier
FROM hrrp_readmissions
WHERE excess_readmission_ratio NOT IN ('Too Few Cases', 'N/A', '')
AND excess_readmission_ratio IS NOT NULL
ORDER BY state, facility_name, measure_name;</pre>
</details>
</div>

<div style="max-width: 680px; margin: 0 auto 32px auto;">
<details>
<summary><span class="art-lang-tag art-lang-python">Python</span> &nbsp;View EDA notebook</summary>
<pre class="art-code-pre">import pandas as pd
df = pd.read_csv("readmitted.csv")
df_clean = df[df["Excess Readmission Ratio"].notna()].copy()
df_clean["err"] = pd.to_numeric(df_clean["Excess Readmission Ratio"], errors="coerce")
err_summary = (
    df_clean.groupby("condition")["err"]
    .agg(["mean", "median", "std", "count"])
    .sort_values("mean", ascending=False)
)
print(err_summary.round(6))
pct_penalized = (df_clean["err"] > 1.0).mean() * 100
print(f"\nNational % penalized: {pct_penalized:.1f}%")</pre>
</details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="the-geography-of-failure" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">THE GEOGRAPHY OF FAILURE</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/05/chart1_states_penalized.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/05/chart1_states_penalized.png 600w, /images/content/size/w1000/2026/05/chart1_states_penalized.png 1000w, /images/content/size/w1600/2026/05/chart1_states_penalized.png 1600w, /images/content/size/w2400/2026/05/chart1_states_penalized.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<p class="art-p">Nearly half of all hospital-condition pairs in this dataset carry an excess readmission ratio above 1.0. But that national average hides something important: the penalties are not evenly distributed. New Jersey leads the country at 65.4% — meaning nearly two out of every three hospital-condition pairs in the state are performing worse than CMS models expect. Massachusetts and Mississippi follow close behind. That's the first surprise. New Jersey and Massachusetts are dense, high-volume, well-resourced hospital markets. Mississippi is rural, high-poverty, and chronically under-served. Different systems, different patient populations, same penalty outcome.</p>

<p class="art-p">The rest of the top 20 tells a similar story of geographic contradiction. The South shows up heavily — Georgia, Kentucky, West Virginia, Alabama, Arkansas, Louisiana, Tennessee — which fits the expected narrative around population health disparities and chronic disease burden. But so does Illinois, California, New York, and Pennsylvania. This is not a rural poverty problem with a clean geographic boundary. It's a systems problem that cuts across market type, hospital size, and regional demographics.</p>

<p class="art-p">The chart only shows states above the national average — the 20-odd states that are pulling the number up. But it's worth noting that even the "better-performing" states aren't clean. Below-average doesn't mean penalty-free. It means a smaller share of hospital-condition pairs are exceeding the threshold, not that the problem is solved.</p>

<div style="max-width: 680px; margin: 0 auto 32px auto;">
<details>
<summary><span class="art-lang-tag art-lang-r">R</span> &nbsp;View chart code</summary>
<pre class="art-code-pre">nat_avg &lt;- mean(hrrp_clean$err > 1.0, na.rm = TRUE) * 100

state_pct &lt;- hrrp_clean %>%
  group_by(state) %>%
  summarise(
    pct_penalized = mean(err > 1.0, na.rm = TRUE) * 100,
    n = n(), .groups = "drop"
  ) %>%
  filter(pct_penalized > nat_avg) %>%
  mutate(state = fct_reorder(state, pct_penalized))

ggplot(state_pct, aes(x = pct_penalized, y = state)) +
  geom_col(fill = art_highlight, width = 0.65) +
  geom_vline(xintercept = nat_avg, linetype = "dashed",
             color = art_secondary, linewidth = 1.0) +
  scale_x_continuous(labels = function(x) paste0(x, "%")) +
  labs(
    title   = "Which States Have the Most Penalized Hospitals?",
    x       = "% of Hospital-Condition Pairs with ERR > 1.0",
    y       = NULL,
    caption = "Source: CMS HRRP | — ARTOMETRICS"
  ) +
  theme_artometrics()</pre>
</details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="hip-amp-knee-problem" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">HIP &amp; KNEE PROBLEM</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/05/chart2_err_by_condition.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/05/chart2_err_by_condition.png 600w, /images/content/size/w1000/2026/05/chart2_err_by_condition.png 1000w, /images/content/size/w1600/2026/05/chart2_err_by_condition.png 1600w, /images/content/size/w2400/2026/05/chart2_err_by_condition.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<p class="art-p">All six conditions tracked under HRRP carry an average excess readmission ratio above 1.0. But one stands apart. Hip and knee replacement patients are being readmitted at nearly twice the excess rate of the next closest condition — a gap that looks small in absolute terms but is enormous relative to how tightly the other five cluster. Hip/Knee's average ERR of 1.004 sits well above CABG at 1.0018 and AMI at 1.0018. Those differences are in the fourth decimal place. They are not small.</p>

<p class="art-p">Hip/Knee is elective, scheduled surgery on an aging population with high comorbidity loads. The hospital controls the procedure. It has far less control over what happens at home on day 12 — when a blood clot develops, a fall occurs, or an infection surfaces. CMS has pushed shorter inpatient stays aggressively over the past decade, which moves patients out the door faster and shifts the risk window into a setting hospitals can't monitor.</p>

<p class="art-p">COPD sits at the bottom of this chart at 1.0011 — but that's not a success story. COPD patients are readmitted at high rates in absolute terms. The low ERR means hospitals are performing roughly in line with what CMS expects for that population. CMS's risk model for COPD is calibrated to a sicker baseline. The bar is lower because the patients are harder.</p>

<div style="max-width: 680px; margin: 0 auto 32px auto;">
<details>
<summary><span class="art-lang-tag art-lang-r">R</span> &nbsp;View chart code</summary>
<pre class="art-code-pre">condition_err &lt;- hrrp_clean %>%
  group_by(condition) %>%
  summarise(avg_err = mean(err, na.rm = TRUE), .groups = "drop") %>%
  arrange(desc(avg_err)) %>%
  mutate(condition = fct_reorder(condition, avg_err))

ggplot(condition_err, aes(x = avg_err, y = condition)) +
  geom_segment(aes(x = 1.0, xend = avg_err, yend = condition),
               color = art_muted, linewidth = 0.8) +
  geom_point(color = art_highlight, size = 4) +
  geom_vline(xintercept = 1.0, color = art_dark, linewidth = 0.6) +
  labs(
    title   = "The Hip/Knee Problem: ERR by Condition",
    x       = "Average Excess Readmission Ratio (ERR)",
    y       = NULL,
    caption = "Source: CMS HRRP | — ARTOMETRICS"
  ) +
  theme_artometrics()</pre>
</details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="penalty-by-ownership" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">PENALTY BY OWNERSHIP</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/05/chart3_penalty_by_ownership.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/05/chart3_penalty_by_ownership.png 600w, /images/content/size/w1000/2026/05/chart3_penalty_by_ownership.png 1000w, /images/content/size/w1600/2026/05/chart3_penalty_by_ownership.png 1600w, /images/content/size/w2400/2026/05/chart3_penalty_by_ownership.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<p class="art-p">For-profit hospitals carry a higher share of medium and high penalty tiers than either non-profits or government hospitals. The gap is real — roughly 8 to 10 percentage points more penalized pairs than non-profits — but it's a difference of degree, not kind. All three ownership types are playing the same game. For-profits are just losing it slightly more often.</p>

<p class="art-p">Look at the no-penalty segment across all three bars. Every ownership type has roughly half or more of its hospital-condition pairs performing at or below the CMS expected readmission rate. That's the counterintuitive finding. HRRP gets talked about as a widespread penalty regime — a stick CMS uses to punish underperforming hospitals. But the data says most hospitals, most of the time, are hitting the benchmark. The penalty is concentrated, not universal.</p>

<p class="art-p">Government hospitals sit in the middle — more penalized than non-profits, less than for-profits. That cuts against two assumptions that often get made about public hospitals: that they're protected by stable public funding, or that they're disadvantaged by chronic underfunding. Neither story holds cleanly here. Government hospitals are performing in the middle of the pack, which is its own kind of finding.</p>

<div style="max-width: 680px; margin: 0 auto 32px auto;">
<details>
<summary><span class="art-lang-tag art-lang-r">R</span> &nbsp;View chart code</summary>
<pre class="art-code-pre">hospital_info &lt;- read_csv("https://data.cms.gov/provider-data/sites/default/files/resources/893c372430d9d71a1c52737d01239d47_1770163599/Hospital_General_Information.csv") %>%
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

joined &lt;- hrrp_clean %>%
  inner_join(hospital_info, by = "facility_id")

plot_data &lt;- joined %>%
  filter(!is.na(penalty_tier)) %>%
  mutate(
    penalty_tier    = factor(penalty_tier, levels = c("No Penalty","Low","Medium","High")),
    ownership_group = factor(ownership_group, levels = c("Non-Profit","Government","For-Profit"))
  ) %>%
  count(ownership_group, penalty_tier) %>%
  group_by(ownership_group) %>%
  mutate(pct = n / sum(n)) %>%
  ungroup()

ggplot(plot_data, aes(x = ownership_group, y = pct, fill = penalty_tier)) +
  geom_col(position = "fill", width = 0.6) +
  scale_y_continuous(labels = scales::percent_format(accuracy = 1)) +
  coord_flip() +
  labs(
    title   = "For-Profit Hospitals Carry More Penalty Weight",
    x       = NULL,
    y       = "Share of Hospital-Condition Pairs",
    caption = "Source: CMS HRRP | — ARTOMETRICS"
  ) +
  theme_artometrics()</pre>
</details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="limitation" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">LIMITATION</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">CMS suppresses readmission data for hospitals that fall below 25 discharges per condition per measurement period. That threshold exists to protect statistical reliability, but the effect is systematic — small rural hospitals disappear from this analysis entirely. The hospitals in this dataset skew toward larger, busier facilities. Every finding in this report should be read with that in mind.</p>

<p class="art-p">The ownership classification in Chart 3 is derived from CMS's Hospital General Information dataset, which uses inconsistent labeling across hospital types. Physician-owned facilities, tribal hospitals, and church-affiliated systems don't always map cleanly into three buckets. The Government, Non-Profit, and For-Profit groupings are reasonable approximations — not clean legal categories.</p>

<p class="art-p">The excess readmission ratio compares a hospital's actual readmissions to what CMS's risk model predicts for that hospital's specific patient population. A hospital serving sicker, older, lower-income patients will have a higher expected rate built into its denominator. ERR controls for case mix — but imperfectly. Hospitals in high-poverty, high-comorbidity markets may still face a structural disadvantage that the model doesn't fully account for.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="conclusion" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">CONCLUSION</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">Nearly half of all hospital-condition pairs in this dataset are performing worse than CMS models expect. But the distribution is uneven in ways that matter. The highest-penalty states cut across market type and regional demographics — New Jersey and Massachusetts sit alongside Mississippi and West Virginia. The highest-penalty condition, Hip/Knee replacement, sits nearly 2x above the next closest. And for-profit hospitals carry modestly more penalty exposure than non-profits, though all three ownership types are majority no-penalty.</p>

<p class="art-p">The Hospital Readmissions Reduction Program has been in effect since 2012. The fact that 48.1% of hospital-condition pairs still exceed the 1.0 ERR threshold more than a decade later says something about the limits of financial penalties as a behavior change mechanism. Hospitals have responded — readmission rates have declined since HRRP launched — but the program hasn't solved the problem. It has defined it.</p>

<p class="art-p">CMS's TEAM model, mandatory for 742 hospitals starting January 1, 2026, goes further than HRRP by tying entire episodes of care to reimbursement — not just the readmission event. The hospitals that have struggled under HRRP are the ones most likely to be in scope for TEAM. The data in this report describes the problem TEAM is designed to address. Whether bundled payments succeed where readmission penalties haven't is the next question.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="references" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">REFERENCES</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">Centers for Medicare & Medicaid Services. <em>Hospital Readmissions Reduction Program (HRRP) — FY2025 Supplemental Data</em>. CMS Provider Data Catalog, Dataset ID: 9n3s-kdb3. Retrieved from https://data.cms.gov/provider-data/dataset/9n3s-kdb3</p>

<p class="art-p">Centers for Medicare & Medicaid Services. <em>Hospital General Information</em>. CMS Provider Data Catalog, Dataset ID: xubh-q36u. Retrieved from https://data.cms.gov/provider-data/dataset/xubh-q36u — joined to HRRP data for ownership classification in Chart 3.</p>

<p class="art-p">Centers for Medicare & Medicaid Services. (2024). <em>Transforming Episode Accountability Model (TEAM)</em>. Retrieved from https://www.cms.gov/priorities/innovation/innovation-models/team — mandatory participation effective January 1, 2026 for 742 hospitals.</p>

<p class="art-p">Zuckerman, R.B., Sheingold, S.H., Orav, E.J., Ruhter, J., & Epstein, A.M. (2016). Readmissions, observation, and the Hospital Readmissions Reduction Program. <em>New England Journal of Medicine</em>, 374(16), 1543–1551.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="editors-note" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">EDITOR'S NOTE</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p"><em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. Artometrics was built on the premise that rigorous analysis and honest process are not in conflict. The research questions, editorial instincts, interpretive framing, and brand vision are ours. The execution — every line of R code, every paragraph of analysis, every design decision — was a collaboration. We document this not as a disclaimer but as a description of how we actually work, and as a position: we believe this is what serious data journalism looks like when the tools available are used honestly and at full capacity.</em></p>

<p class="art-p"><em>— Artometrics Editorial</em></p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="thank-you-for-your-time-" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">THANK YOU FOR YOUR TIME :)</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div style="text-align: center; margin: 32px 0;">
  <a href="https://github.com/Artometrics/readmitted" target="_blank" style="display: inline-block; background-color: #C0392B; color: #FFFFFF; font-family: 'DM Sans', sans-serif; font-size: 1.2rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 22px 64px; border-radius: 3px;">VIEW ON GITHUB</a>
</div>