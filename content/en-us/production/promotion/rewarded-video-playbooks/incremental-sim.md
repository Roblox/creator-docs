---
title: "Rewarded Video Playbook: Incremental Sim"
description: Strategies, benchmarks, and examples for integrating rewarded video ads into incremental simulator experiences.
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
      container-type: inline-size;
      container-name: rvp;
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
      font-size: clamp(28px, 6cqi, 44px) !important;
      font-weight: 600 !important;
      line-height: 1.15 !important;
      letter-spacing: -0.01em;
      margin: 56px 0 0 !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-hero-img {
      width: clamp(110px, 24cqi, 220px);
      height: auto;
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
      container-type: inline-size;
      container-name: rvp-card;
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
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 14px;
      padding: 36px 28px !important;
    }
    .rvp .rvp-metric-num {
      font-size: clamp(40px, 13cqi, 60px) !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      margin: 0 0 6px !important;
      color: var(--rvp-text) !important;
    }
    .rvp .rvp-metric-label { font-size: clamp(17px, 4.6cqi, 21px) !important; font-weight: 600 !important; margin: 0 !important; color: var(--rvp-text) !important; }
    .rvp .rvp-metric-desc {
      max-width: 360px;
      font-size: clamp(16px, 4cqi, 18px) !important;
      line-height: 1.45 !important;
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
    .rvp .rvp-tile-link {
      display: flex;
      width: 100%;
      border-radius: 12px;
      color: inherit !important;
      text-decoration: none !important;
    }
    .rvp .rvp-tile-link span:has(.rvp-card) {
      display: flex !important;
      width: 100%;
      min-width: 0;
    }
    .rvp .rvp-tile-link .rvp-card { border: 1px solid transparent !important; }
    .rvp .rvp-tile-link:hover .rvp-card,
    .rvp .rvp-tile-link:focus-visible .rvp-card { border-color: var(--rvp-blue) !important; }
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
    .rvp .rvp-step-circle {
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
    .rvp .rvp-step-line {
      flex: 1;
      height: 2px;
      background: var(--rvp-stroke);
      margin-left: 6px;
    }
    .rvp .rvp-step-title {
      font-size: 20px !important;
      font-weight: 700 !important;
      color: var(--rvp-blue) !important;
      margin: 0 0 8px !important;
    }
    .rvp .rvp-step-text { font-size: 16px !important; line-height: 1.45 !important; margin: 0 0 16px !important; }
    .rvp .rvp-step-img { width: 100%; aspect-ratio: 2 / 1; object-fit: cover; border-radius: 12px; display: block; }
    .rvp .rvp-step-caption { font-family: monospace; font-size: 12px; margin: 8px 0 0; }
    .rvp .rvp-table-wrap { width: 100%; overflow-x: auto; }
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
    .rvp .rvp-diamond { color: var(--rvp-blue); position: absolute; left: 0; font-size: 11px; top: 4px; }
    @container rvp (max-width: 760px) {
      .rvp .rvp-title { margin-top: 24px !important; }
      .rvp .rvp-section { margin-top: 40px; }
      .rvp .rvp-steps { grid-template-columns: 1fr; gap: 32px; }
      .rvp .rvp-step-line { display: none; }
      .rvp .rvp-step-img { aspect-ratio: auto; }
    }
    @container rvp (max-width: 480px) {
      .rvp .rvp-hero { flex-direction: column-reverse; gap: 8px; }
      .rvp .rvp-title { margin-top: 0 !important; }
      .rvp .rvp-hero-img { width: 140px; margin-top: 0; }
      .rvp .rvp-table th, .rvp .rvp-table td { padding: 12px 8px; font-size: 14px; }
    }
    @container rvp-card (max-width: 260px) {
      .rvp .rvp-vp { flex-direction: column; gap: 10px; }
      .rvp .rvp-card-body { padding: 16px !important; }
    }
  `}</style>

{(() => {
return (<>
<div className="rvp">
<div className="rvp-hero">
<Typography component="div" className="rvp-title">Rewarded Video Playbook: Incremental Sim</Typography>
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Hero.webp" alt="" />
</div>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">What is Rewarded Video?</Typography>
<Typography component="p" className="rvp-lead">Rewarded Video placements are full-screen, horizontal, 6-30 second video ads that users choose to watch in exchange for a reward that you decide.</Typography>
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
<Typography component="h2" className="rvp-h2">Key metrics that drive earnings</Typography>
<Typography component="p" className="rvp-lead">The two metrics that you need to focus on are <strong>opt-in rate</strong> and <strong>daily frequency</strong>.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body rvp-metric">
<div>
<Typography component="p" className="rvp-metric-num">13%+</Typography>
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
<Typography component="p" className="rvp-metric-num">2.8</Typography>
<Typography component="p" className="rvp-metric-label">Frequency</Typography>
</div>
<Typography component="p" className="rvp-metric-desc">How many times each user views your ad per day</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Core Mechanics &amp; Value Proposition</Typography>
<Typography component="p" className="rvp-lead">In incremental games, the player's primary "enemy" is friction (the time between upgrades). Rewarded video should act as a bridge, allowing non-paying players to overcome friction while keeping whales engaged with premium options.</Typography>

</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Top Rewarded Video Strategies for Incremental Sim</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Velocity-Reward.webp" alt="Prompt offering a free speed potion in exchange for watching an ad" loading="lazy" />
<Typography component="p" className="rvp-card-text"><strong>The Velocity Reward:</strong> Traditional speed/multiplier boosts</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Welcome-Back-Earnings.webp" alt="Welcome back prompt offering to double the player's loot by watching an ad" loading="lazy" />
<Typography component="p" className="rvp-card-text"><strong>Welcome Back Earnings:</strong> Doubles the offline earnings rewards upon re-entry.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Resource-Refill.webp" alt="Free refill prompt for an energy meter" loading="lazy" />
<Typography component="p" className="rvp-card-text"><strong>Resource Refill:</strong> Instant refill of energy or stamina meters that limit grinding.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Automation.webp" alt="Prompt offering 10 minutes of auto-click in exchange for watching an ad" loading="lazy" />
<Typography component="p" className="rvp-card-text"><strong>Automation:</strong> Unlock "Auto-Click" or "Auto-Sell" for 10 minutes (great for testing premium features).</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Pro Tips</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Icon-Multi-Placement.png" alt="" />
<Typography component="p" className="rvp-card-text">Multi-placement strategies work the best.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Icon-Clean-UI.png" alt="" />
<Typography component="p" className="rvp-card-text">Clean UI with clear value proposition</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Icon-Balance.png" alt="" />
<Typography component="p" className="rvp-card-text">Balance for player value and economic impact</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Best-in-class examples</Typography>
<Typography component="p" className="rvp-lead">Check out these top-performing Incremental Sims that are already using Rewarded Video effectively.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/15532962292/Sols-RNG" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Sols-Fast-Roll.webp" alt="Quick roll purchase prompt with a free trial option in Sol's RNG" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Sol's Fast Roll</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Automation</Typography>
</CardContent>
</Card>
</a>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/16732694052/Fisch" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Fisch-Luck-Boost.webp" alt="Shop offering a 2x luck boost for watching a video in Fisch" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Fisch Luck Boost</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Velocity Reward</Typography>
</CardContent>
</Card>
</a>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/70906625936847/Gym-Star-Simulator" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Incremental-Gym-Star-Simulator.webp" alt="Free stat boost offer in Gym Star Simulator" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Gym Star Simulator</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Progression Jump</Typography>
</CardContent>
</Card>
</a>
</Grid>
</Grid>
</section>
</div>
</>);
})()}
