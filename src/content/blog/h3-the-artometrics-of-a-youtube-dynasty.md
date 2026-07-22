---
title: How H3 Built a YouTube Network Beyond One Channel
slug: h3-the-artometrics-of-a-youtube-dynasty
pubDate: 2026-04-14T00:00:00.000Z
description: 'Since 2011, Ethan and Hila Klein scaled channels, a podcast, and a brand.'
heroImage: /images/content/2026/04/IMG_4164.webp
tags:
  - culture
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Ethan Klein built one of YouTube’s most documented creator empires from a single channel and a lawsuit. H3h3Productions launched in 2011 as a reaction-commentary format, spent years as a meme factory, and then pivoted — twice — into something far more complicated. The H3 Podcast debuted in 2017. The Frenemies co-host era with Trisha Paytas ran for nine months in 2020–2021 and produced the highest viewership the show has ever seen. The Leftovers political co-host era with Hasan Piker ran until October 2023, when a public dispute over the Israel-Palestine conflict ended it. What remained after that is what this piece analyzes: 1,638 videos across four channels, 680 podcast episodes, and three years of Reddit post data from the fan and critic communities that formed around the brand.</p>
<p class="art-p">This is not a hit piece and it is not a fan report. It is a data report. The numbers are what they are.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">3.24B</span>
    <span class="fact-label">Total views across all four H3 channels, 2013–2026 — enough to give every person on Earth nearly half a view</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">1,638</span>
    <span class="fact-label">Videos analyzed after filtering Shorts and zero-view uploads from the original 1,876-video pull</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">4.5×</span>
    <span class="fact-label">How much harder h3h3Productions hits per video vs. the H3 Podcast — 4.78M median vs. 1.05M</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">9 months</span>
    <span class="fact-label">The entire Frenemies Era — the most-watched stretch in H3 Podcast history, Sep 2020 to Jun 2021</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">680</span>
    <span class="fact-label">H3 Podcast episodes analyzed via Podchaser API — median runtime grew from 42 minutes in 2017 to 220+ by 2024</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">353</span>
    <span class="fact-label">r/h3snark indexed activity at its April 2025 peak — 3.5× its own average, triggered by the iDubbbz Content Cop</span>
  </div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The H3 ecosystem is not a single channel — it is a network. h3h3Productions launched in 2011 as a reaction-and-commentary channel built around the Fair Use legal fight that briefly made Ethan Klein a cause célèbre in YouTube creator circles. The H3 Podcast launched in 2017 as a separate channel and quickly became the brand’s primary vehicle. Hila Klein’s channel documents the Teddy Fresh clothing brand. The Ethan Klein channel captures solo content and live streams. Looking at all four: 1,638 videos after filtering Shorts and zero-view uploads from the original 1,876-video pull via the YouTube Data API v3.</p>
<p class="art-p">H3’s trajectory cannot be understood without the era framework. The podcast’s baseline (2017–2020) established the format: long-form conversation between Ethan and Hila, irregular cadence, modest but loyal viewership. The Frenemies Era (September 2020 – June 2021) is the single most-watched stretch in H3 Podcast history — nine months in which Ethan co-hosted with Trisha Paytas, generating a level of weekly engagement the show has never approached since. The Leftovers Era (September 2021 – October 2023) brought a political co-host in Hasan Piker, a different kind of audience, and a deeper ideological identity for the brand. When Leftovers ended over disagreements about the Israel-Palestine conflict, H3 entered its current post-format phase: fewer episodes, longer runtimes, a shrinking but committed core audience.</p>
<p class="art-p">The core dataset was built from scratch using the YouTube Data API v3, stored at github.com/Artometrics/h3 . Podcast episode metadata comes from the Podchaser API (680 episodes, April 2026 pull). Reddit post data was pulled from the Arctic Shift Reddit archive, covering r/h3h3productions (749,974 posts, 2014–2026) and r/h3snark (25,766 posts, April 2023–2026) — the fan sub and the critic sub, both active during the most contentious period in the brand’s history.</p>
<h2 id="the-era-timeline" class="anchored">The Era Timeline</h2>
<h3 id="the-era-timeline-look" class="anchored">Era Timeline</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart1_era_timeline.plotly.json" data-fallback="/images/content/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart1_era_timeline.png" role="img" aria-label="Era Timeline"></div>
</figure>
<p class="art-p">The shape of this chart tells you almost everything you need to know about the H3 Podcast’s commercial arc. From 2017 to mid-2020, the show built a reliable if unspectacular baseline — a few million views per month, loyal audience, consistent output. Then Trisha Paytas joined as co-host in September 2020 and the graph becomes a different document. Monthly views tripled within weeks. The peak months of the Frenemies Era outperformed the entire preceding three years of the podcast, and the show did it in nine months.</p>
<p class="art-p">When Frenemies ended in June 2021 — abruptly, on-camera, mid-episode — views dropped back toward baseline within a single month. Leftovers launched that September and added a new audience (Hasan Piker’s political fanbase), generating a secondary bump visible in the 2022 data. But it never approached Frenemies numbers. After Leftovers ended in October 2023, the chart enters its current phase: a slow, grinding decline with no structural catalyst in sight. The mountain is the story. Everything else is the aftermath.</p>
<p class="art-p">Even at its post-2023 lows, the H3 Podcast pulls millions of monthly views. The brand did not collapse — it contracted to its core. The audience that remains watches longer episodes with more commitment than the casual Frenemies-era viewer. The cliff looks dramatic on the chart because Frenemies was genuinely anomalous. The current numbers are not a failure; they are what a major podcast looks like without a viral co-host dynamic driving weekly drama.</p>

<h2 id="the-duration-drift" class="anchored">The Duration Drift</h2>
<h3 id="the-duration-drift-look" class="anchored">Duration Drift</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart2_duration_drift.plotly.json" data-fallback="/images/content/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart2_duration_drift.png" role="img" aria-label="Duration Drift"></div>
</figure>
<p class="art-p">When H3 launched the podcast in 2017, the median episode ran 42 minutes . That’s a commute. By 2024, the median had crossed 220 minutes — longer than most feature films. The chart shows this wasn’t a sudden format change; it was a slow, continuous drift upward that compounded year over year until a new normal was established. No single episode caused it. No announcement reset it. The show just kept going longer, and the audience kept watching.</p>
<p class="art-p">The clearest structural break in the duration data isn’t a spike — it’s a floor shift. Before 2022, monthly medians regularly dipped below 120 minutes. After 2022, they never did. The show locked into 3-hour-plus territory and stayed there. Leftovers (2021) normalized the extended format; by the time it ended (2023), the audience had been conditioned to expect marathon sessions as the default. That conditioning didn’t reverse when Leftovers ended.</p>
<p class="art-p">In 2024, H3 published far fewer episodes than in prior years — but duration hit its all-time high, with months regularly clearing 220–240 minutes . The show was publishing less but asking more from the audience that stayed. Each episode became a larger commitment, not a smaller one. The fans who remained weren’t casual — they were in for 4 hours at a time. Whether that is sustainable is a different question. The data just shows it happened.</p>

<h2 id="the-fan-vs-critic-divide" class="anchored">The Fan Vs. Critic Divide</h2>
<h3 id="the-fan-vs-critic-divide-look" class="anchored">Reddit Activity</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart3_reddit_activity.plotly.json" data-fallback="/images/content/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart3_reddit_activity.png" role="img" aria-label="Reddit Activity"></div>
</figure>
<p class="art-p">The indexed chart removes the raw scale difference between subreddits and asks a cleaner question: when did each community spike relative to its own normal? The answer is almost never at the same time. When the iDubbbz Content Cop dropped on April 16, 2025 — the first Content Cop in years, explicitly targeting the H3 brand — r/h3snark hit its all-time peak at more than 3.5× its own average . The fan sub barely registered the same event. The two communities were watching completely different shows.</p>
<p class="art-p">The cliff in the snark data after May 2025 isn’t a controversy dying down — it’s a subreddit going dark. After Klein issued copyright claims against r/h3snark moderators and threatened legal action, the sub announced an indefinite hiatus. The index collapsed to near zero within weeks. The fan sub, meanwhile, continued its slow decline — below its own average but still functional. The snark community didn’t fade. It was shut down. That distinction matters: one line represents organic audience erosion, the other represents a legal intervention.</p>
<p class="art-p">The blue line tells its own quieter story. The fan sub never spikes the way snark does — no single event moves it dramatically above baseline. But the trend is unmistakably downward. The community isn’t in crisis; it’s in slow erosion. Fewer new things to discuss, fewer viral moments to dissect, fewer reasons to post. The legal drama — the Content Cop, the streamer lawsuits — barely registered. Whatever drives fan engagement on r/h3h3productions, it isn’t courtroom news.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">The YouTube data captures view counts as of the April 2026 pull — not at time of publication. Older videos have had years to accumulate views through algorithmic recommendations and search, which means early h3h3Productions videos are systematically over-represented in lifetime view totals relative to their original performance. The era-based analysis on the H3 Podcast channel is less affected because the comparison is within-channel across time.</p>
<p class="art-p">The Arctic Shift Reddit archive is comprehensive but not guaranteed complete. Deleted posts, removed comments, and accounts banned before archival are absent from the dataset. The r/h3snark data begins in April 2023 — the sub’s founding — so pre-2023 critical community activity is unrepresented. Any conclusions about the fan-vs-critic dynamic are bounded by that window.</p>
<p class="art-p">Episode duration data from Podchaser is self-reported by the show and may include inconsistencies for older episodes, live streams published as podcast episodes, and bonus or clip content. Episodes with missing duration values were excluded from Chart 2 analysis. Chart 3 indexes each subreddit to its own average across the Apr 2023–Mar 2026 window. A subreddit with low activity in early months will show inflated index values in later high-activity periods — the r/h3snark baseline is built on its full available history, which starts at launch and may slightly inflate peak readings relative to a steadier baseline.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The H3 data tells a story about what happens when a creator brand builds its peak moment around someone else. The Frenemies Era was genuinely anomalous — nine months of co-host-driven drama that tripled the podcast’s monthly viewership and created a ceiling the show has never approached since. The chart is unambiguous about this. The current audience is not a collapse; it is a correction back to what the brand can sustain on its own terms.</p>
<p class="art-p">The duration data adds a different dimension. The show that emerged from the Frenemies aftermath is structurally different from the one that preceded it — longer, less frequent, more demanding. Whether that format is a creative choice or a symptom of a contracting audience is a question the data cannot answer. Both explanations fit the numbers.</p>
<p class="art-p">The Reddit chart is the most structurally interesting of the three. It documents not just audience behavior but audience management: a creator using legal tools to suppress a critic community. The snark subreddit’s cliff is not organic. It is the result of a deliberate intervention. The fan sub’s slower decline runs in parallel and suggests the underlying engagement problem would exist regardless. Two different communities, two different trajectories, one brand caught between them.</p>
<h2 id="sources" class="anchored">Sources</h2>

<div class="art-references">
  <div class="art-ref-item">
    YouTube Data API v3. Google.
    <a href="https://developers.google.com/youtube/v3" target="_blank">
      https://developers.google.com/youtube/v3
    </a>
  </div>
  <div class="art-ref-item">
    Artometrics Original Dataset (April 2026). <em>H3 Podcast YouTube
    Network, 2013–2026</em>. Compiled via YouTube Data API v3.
    <a href="https://github.com/Artometrics/h3" target="_blank">
      https://github.com/Artometrics/h3
    </a>
  </div>
  <div class="art-ref-item">
    Podchaser. (2026). <em>H3 Podcast episode data, 2017–2026</em>.
    Retrieved via Podchaser API v1.
    <a href="https://api.podchaser.com" target="_blank">
      https://api.podchaser.com
    </a>
  </div>
  <div class="art-ref-item">
    Arctic Shift Reddit Archive. (2026). <em>r/h3h3productions and
    r/h3snark post data</em>. Retrieved April 2026.
    <a href="https://arctic-shift.photon-reddit.com" target="_blank">
      https://arctic-shift.photon-reddit.com
    </a>
  </div>
  <div class="art-ref-item">
    Wikimedia Foundation. (2026). <em>Wikipedia pageview statistics</em>.
    Retrieved via Wikimedia REST API.
    <a href="https://wikimedia.org/api/rest_v1/" target="_blank">
      https://wikimedia.org/api/rest_v1/
    </a>
  </div>
  <div class="art-ref-item">
    Google Trends. (2026). <em>Search interest data: h3h3, ethan klein,
    frenemies, teddy fresh</em>. Retrieved via gtrendsR v1.5.2.
    <a href="https://trends.google.com" target="_blank">
      https://trends.google.com
    </a>
  </div>
</div>

<h2 id="editor-s-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p class="art-p">
This report was researched, written, designed, and produced in active
collaboration with Claude AI (Anthropic). The data pipeline, statistical
analysis, chart design, written analysis, narrative structure, and visual
styling were all developed through a directed partnership between human
editorial judgment and AI execution.
</p>
<p class="art-p">
Artometrics was built on the premise that rigorous analysis and honest
process are not in conflict. The research questions, editorial instincts,
interpretive framing, and brand vision are ours. The execution — every
line of R code, every paragraph of analysis, every design decision — was
a collaboration. We document this not as a disclaimer but as a
description of how we actually work, and as a position: we believe this
is what serious data journalism looks like when the tools available are
used honestly and at full capacity.
</p>
<p class="art-p">— Artometrics Editorial</p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/h3" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>

</main>
</div>
