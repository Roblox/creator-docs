---
title: "Rewarded Video Playbook: Tycoons"
description: Strategies, benchmarks, and examples for integrating rewarded video ads into tycoon experiences.
hideInPageNavigation: true
---

  <style>{`
    main h1 { display: none !important; }
    .rvp {
      --rvp-card: var(--color-surface-200);
      --rvp-blue: var(--color-system-emphasis);
      --rvp-text: var(--color-content-emphasis);
      --rvp-text-muted: var(--color-content-default);
      --rvp-stroke: var(--color-stroke-default);
      color: var(--rvp-text);
    }
    .rvp p, .rvp h2, .rvp h3, .rvp li, .rvp td, .rvp th, .rvp span, .rvp div { color: inherit; }
    .rvp strong { color: var(--rvp-text) !important; font-weight: 700; }
    .rvp .rvp-hero {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 24px;
    }
    .rvp .rvp-title {
      font-size: 44px !important;
      font-weight: 600 !important;
      line-height: 1.15 !important;
      letter-spacing: -0.01em;
      margin: 56px 0 0 !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-hero-img {
      width: 220px;
      flex-shrink: 0;
      margin-top: -8px;
      display: block;
    }
    .rvp .rvp-section { margin-top: 56px; }
    .rvp .rvp-section:first-of-type { margin-top: 0; }
    .rvp .rvp-h2 {
      font-size: 30px !important;
      font-weight: 600 !important;
      line-height: 1.2 !important;
      margin: 0 0 12px !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-lead {
      font-size: 18px !important;
      line-height: 1.45 !important;
      margin: 0 0 20px !important;
      max-width: 720px;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-card {
      background: var(--rvp-card) !important;
      color: var(--rvp-text) !important;
      border: none !important;
      border-radius: 12px !important;
      box-shadow: none !important;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .rvp .rvp-card-body { padding: 20px 22px !important; flex: 1; }
    .rvp .rvp-card-title {
      font-size: 17px !important;
      font-weight: 700 !important;
      line-height: 1.3 !important;
      margin: 0 0 8px !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-card-text {
      font-size: 15px !important;
      line-height: 1.45 !important;
      margin: 0 0 10px !important;
      color: var(--rvp-text-muted) !important;
    }
    .rvp .rvp-card-text:last-child { margin-bottom: 0 !important; }
    .rvp .rvp-icon { width: 28px; height: 28px; display: block; margin-bottom: 14px; }
    .rvp .rvp-vp { display: flex; gap: 14px; align-items: flex-start; }
    .rvp .rvp-vp .rvp-icon { margin: 2px 0 0; flex-shrink: 0; }
    .rvp .rvp-metric {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 28px 24px !important;
    }
    .rvp .rvp-metric-num {
      font-size: 46px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      margin: 0 0 6px !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-metric-label { font-size: 15px !important; margin: 0 !important; color: var(--rvp-text) !important; }
    .rvp .rvp-metric-desc {
      font-size: 15px !important;
      line-height: 1.4 !important;
      text-align: center;
      margin: 0 !important;
      color: var(--rvp-text-muted) !important;
    }
    .rvp .rvp-strategy-media {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 6px;
      display: block;
      margin-bottom: 18px;
    }
    .rvp .rvp-tile-media { width: 100%; height: auto; display: block; }
    .rvp .rvp-subhead {
      font-size: 15px !important;
      font-weight: 700 !important;
      margin: 14px 0 4px !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .rvp .rvp-step-num {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
    }
    .rvp .rvp-step-num span {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid var(--rvp-blue);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 17px;
      flex-shrink: 0;
    }
    .rvp .rvp-step-num::after {
      content: '';
      flex: 1;
      height: 2px;
      background: var(--rvp-stroke);
      margin-left: 6px;
    }
    .rvp .rvp-steps > div:last-child .rvp-step-num::after { display: none; }
    .rvp .rvp-step-title {
      font-size: 20px !important;
      font-weight: 700 !important;
      color: var(--rvp-blue) !important;
      margin: 0 0 8px !important;
    }
    .rvp .rvp-step-text { font-size: 16px !important; line-height: 1.45 !important; margin: 0 0 16px !important; }
    .rvp .rvp-step-img { width: 100%; aspect-ratio: 2 / 1; object-fit: cover; border-radius: 12px; display: block; }
    .rvp .rvp-step-caption { font-family: monospace; font-size: 12px; margin: 8px 0 0; }
    .rvp .rvp-table { width: 100%; border-collapse: collapse; margin: 0; height: 100%; }
    .rvp .rvp-table th, .rvp .rvp-table td {
      background: var(--rvp-card);
      border: 2px solid var(--rvp-stroke);
      padding: 18px 12px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
    }
    .rvp .rvp-table th { font-weight: 700; }
    .rvp .rvp-table td.rvp-table-key { background: var(--rvp-blue); color: var(--color-extended-white-100); font-weight: 500; }
    .rvp .rvp-tips-title { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 18px; margin-bottom: 12px; }
    .rvp .rvp-tips-title .rvp-info { font-size: 22px; line-height: 1; font-weight: 400; }
    .rvp .rvp-tips { list-style: none; padding: 0; margin: 0; }
    .rvp .rvp-tips li { position: relative; padding-left: 22px; font-size: 15px; line-height: 1.45; margin-bottom: 8px; }
    .rvp .rvp-tips li::before { content: '◆'; color: var(--rvp-blue); position: absolute; left: 0; font-size: 11px; top: 4px; }
    @media (max-width: 768px) {
      .rvp .rvp-hero-img { width: 120px; }
      .rvp .rvp-title { font-size: 30px !important; margin-top: 24px !important; }
      .rvp .rvp-steps { grid-template-columns: 1fr; }
      .rvp .rvp-step-num::after { display: none; }
    }
  `}</style>

{(() => {
return (<>
<div className="rvp">
<div className="rvp-hero">
<Typography component="div" className="rvp-title">Rewarded Video Playbook: Tycoons</Typography>
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Hero.webp" alt="" />
</div>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">What is Rewarded Video?</Typography>
<Typography component="p" className="rvp-lead">Rewarded video placements are full-screen, horizontal, 6-30 second video ads that users watch in exchange for a reward that you decide.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<div className="rvp-vp">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Icon-Monetize.png" alt="" />
<div>
<Typography component="h3" className="rvp-card-title">Monetize more of your players</Typography>
<Typography component="p" className="rvp-card-text">Reward players and engage new user segments.</Typography>
</div>
</div>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<div className="rvp-vp">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Icon-ARPU.png" alt="" />
<div>
<Typography component="h3" className="rvp-card-title">Low-lift way to increase ARPU</Typography>
<Typography component="p" className="rvp-card-text">Add in Studio and Roblox handles brand demand.</Typography>
</div>
</div>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<div className="rvp-vp">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Icon-Engagement.png" alt="" />
<div>
<Typography component="h3" className="rvp-card-title">Improve player engagement</Typography>
<Typography component="p" className="rvp-card-text">Rewarded Video boosts playtime and engagement</Typography>
</div>
</div>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Top Rewarded Video Strategies for Tycoon Games</Typography>
<Typography component="p" className="rvp-lead">The core gameplay of Tycoons are entirely about efficiency, accumulation, and time management. Players are highly motivated to watch ads if it means accelerating their progress.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Time-Skip.webp" alt="Welcome back prompt offering to double the player's earnings by watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Time Skip</Typography>
<Typography component="p" className="rvp-card-text">When players return to the game, offer them the chance to double their accrued offline earnings by watching an ad. This taps directly into a tycoon player's love for accumulating massive wealth, providing a highly perceived, dynamically scaling reward right at the start of their session.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Progressive-Rewards.webp" alt="Free rewards panel with a sequence of rewards that unlock one after another" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Progressive Rewards</Typography>
<Typography component="p" className="rvp-card-text">A system where users watch a sequence of rewarded videos, with the payout increasing in value or rarity after each consecutive view.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Progression-Accelerators.webp" alt="Watch ad prompt offering 2x cash for 15 minutes" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Progression Accelerators</Typography>
<Typography component="p" className="rvp-card-text">A rewarded video that gives players an immediate injection of cash or a helpful gameplay booster. The goal of this placement is to help players level up or build faster, while giving them a reason to keep playing right now instead of logging off.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Your-Ideas.webp" alt="Roblox avatar surrounded by energy effects" loading="lazy" />
<Typography component="h3" className="rvp-card-title">And the Best Strategy is... Your Ideas!</Typography>
<Typography component="p" className="rvp-card-text">Roblox gives you total control over how you use ads, so the possibilities are endless. This is your chance to get creative. Nobody knows a game's economy and player motivations better than the developer who built it.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Key metrics that drive earnings</Typography>
<Typography component="p" className="rvp-lead">The two metrics that you need to focus on are <strong>opt-in rate</strong> and <strong>daily frequency</strong>.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body rvp-metric">
<div>
<Typography component="p" className="rvp-metric-num">15%+</Typography>
<Typography component="p" className="rvp-metric-label">Opt-In Rate</Typography>
</div>
<Typography component="p" className="rvp-metric-desc">The number of total eligible users who engage with your ad</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body rvp-metric">
<div>
<Typography component="p" className="rvp-metric-num">3+</Typography>
<Typography component="p" className="rvp-metric-label">Frequency</Typography>
</div>
<Typography component="p" className="rvp-metric-desc">How many times each user views your ad per day</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Best-in-class examples</Typography>
<Typography component="p" className="rvp-lead">Check out these top-performing Tycoons that are already using Rewarded Video effectively.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Mansion-Tycoon.webp" alt="Ad rewards panel in Mansion Tycoon" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Mansion Tycoon</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Progression Accelerators</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Raft-Tycoon.webp" alt="Free golden upgrader offer in Raft Tycoon" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Raft Tycoon</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Progression Accelerators</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Grow-a-Garden.webp" alt="Free rewards sequence in Grow a Garden" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Grow a Garden</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> The Progressive Rewards</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Pro Tips</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Icon-Visibility.png" alt="" />
<Typography component="h3" className="rvp-card-title">Visibility is Key</Typography>
<Typography component="p" className="rvp-card-text">Don't make users hunt for freebies. Place the video prompt prominently in high-traffic areas like the home screen, the store, or post-match screens. If it's buried behind three menus, your engagement rates will plummet.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Icon-Balance.png" alt="" />
<Typography component="h3" className="rvp-card-title">Balance Reward Value</Typography>
<Typography component="p" className="rvp-card-text">The reward must be valuable enough that users are willing to trade 30 seconds of their time for it, but not so generous that it cannibalizes your In-Game Purchases or breaks the game economy.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Icon-Test.png" alt="" />
<Typography component="h3" className="rvp-card-title">Test and Iterate</Typography>
<Typography component="p" className="rvp-card-text">The perfect ad setup is rarely found on the first try. Continuously run A/B tests on placement locations, button designs, reward types, and reward amounts to find the highest-converting combination.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Tycoon-Icon-Fresh.png" alt="" />
<Typography component="h3" className="rvp-card-title">Keep it Fresh</Typography>
<Typography component="p" className="rvp-card-text">Make sure to consistently refresh or revisit the ad setup by introducing new reward items or updates to maintain user interest over time.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>
</div>
</>);
})()}
