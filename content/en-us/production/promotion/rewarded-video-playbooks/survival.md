---
title: "Rewarded Video Playbook: Survival"
description: Strategies, benchmarks, and economy guardrails for integrating rewarded video ads into survival experiences.
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
<Typography component="div" className="rvp-title">Rewarded Video Playbook: Survival</Typography>
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Hero.webp" alt="" />
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
<Typography component="p" className="rvp-metric-num">2.5+</Typography>
<Typography component="p" className="rvp-metric-label">Frequency</Typography>
</div>
<Typography component="p" className="rvp-metric-desc">How many times each user views your ad per day</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Core Mechanics Framing</Typography>
<Typography component="p" className="rvp-lead">In survival games, the player's primary fear is losing everything: their streak, their run, their progress. Rewarded video should act as a safety net: arriving at the exact moment tension peaks, offering relief that feels earned without removing the stakes that make survival games worth playing.</Typography>

</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Top Rewarded Video Strategies for Survival</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Second-Chance.webp" alt="You died screen with a free revive button" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Second Chance</Typography>
<Typography component="p" className="rvp-card-text">When a player is eliminated, trigger an ad prompt offering an immediate revive or respawn close to where they died. The moment of death is peak emotional investment; players will trade 15 seconds to avoid starting over.</Typography>
<Typography component="p" className="rvp-subhead">Why It Works</Typography>
<Typography component="p" className="rvp-card-text">Loss aversion is at its highest right at the death screen.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-PreRound-PowerUp.webp" alt="Gear up before you go prompt offering an item for watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Pre-Round Power-Up</Typography>
<Typography component="p" className="rvp-card-text">Before a round begins, offer players a temporary item or ability (a shield, a speed boost, a tool) that lasts for that round only. Placed in the pre-round lobby, it catches players when they're calm, ready, and motivated to maximize their run.</Typography>
<Typography component="p" className="rvp-subhead">Why It Works</Typography>
<Typography component="p" className="rvp-card-text">The pre-round moment is low-stress and high-intent. The per-round reset drives repeat ad views naturally every session.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Streak-Saver.webp" alt="Daily streak screen with an option to recover a lost streak by watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Streak Saver</Typography>
<Typography component="p" className="rvp-card-text">When a player dies and has an active win or survival streak, offer them the chance to preserve it by watching an ad. Streaks are a powerful retention mechanic; the threat of losing one is a strong opt-in trigger.</Typography>
<Typography component="p" className="rvp-subhead">Why It Works</Typography>
<Typography component="p" className="rvp-card-text">Players who have built up a streak are far more motivated to protect it than players who haven't. Targets your most engaged users.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Daily-Survival-Kit.webp" alt="Prompt offering 100 coins for watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Daily Survival Kit</Typography>
<Typography component="p" className="rvp-card-text">Offer a daily consumable reward: a booster, a temporary morph, or a small resource pack gated behind a single ad view. Resets every 24 hours to build a daily check-in habit.</Typography>
<Typography component="p" className="rvp-subhead">Why It Works</Typography>
<Typography component="p" className="rvp-card-text">A predictable daily placement builds habitual return visits and steady frequency without disrupting active gameplay.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Protecting the Economy</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Icon-Deterministic.png" alt="" />
<Typography component="h3" className="rvp-card-title">Deterministic Only</Typography>
<Typography component="p" className="rvp-card-text">Per Roblox 2026 standards, no RNG. You cannot reward a "random item." State exactly what the player receives: "Watch to receive [Specific Item]."</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Icon-Consumables.png" alt="" />
<Typography component="h3" className="rvp-card-title">Consumables Only</Typography>
<Typography component="p" className="rvp-card-text">Rewards should be items that are used up and reset, not permanent gear, tools, or stat upgrades. Scarcity is the core loop of survival games; permanent rewards undermine it.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Icon-Daily-Cap.png" alt="" />
<Typography component="h3" className="rvp-card-title">Cap Daily Engagement</Typography>
<Typography component="p" className="rvp-card-text">Keep your economy and reward value in mind when setting how often a player can engage per day. A daily cap prevents farming and keeps rewards feeling special.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Best-in-class examples</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/9872472334/Evade" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Evade.webp" alt="Respawn options on the elimination screen in Evade" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Evade</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Second Chance + Streak Saver</Typography>
</CardContent>
</Card>
</a>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/189707/Natural-Disaster-Survival" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Natural-Disaster-Survival.webp" alt="Pre-round prompt to watch a rewarded ad in Natural Disaster Survival" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Natural Disaster Survival</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Pre-Round Power-Up</Typography>
</CardContent>
</Card>
</a>
</Grid>
<Grid item XSmall={12} Medium={12} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/137826330724902/Scary-Shawarma-Kiosk-the-ANOMALY" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Survival-Scary-Shawarma-Kiosk.webp" alt="Prompt offering 2x cash for watching an ad in Scary Shawarma Kiosk" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Scary Shawarma Kiosk</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Pre-Round Power-Up</Typography>
</CardContent>
</Card>
</a>
</Grid>
</Grid>
</section>
</div>
</>);
})()}
