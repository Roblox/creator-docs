---
title: "Rewarded Video Playbook: Sports"
description: Strategies, benchmarks, and examples for integrating rewarded video ads into sports experiences.
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
<Typography component="div" className="rvp-title">Rewarded Video Playbook: Sports</Typography>
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Hero.webp" alt="" />
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
<Typography component="h2" className="rvp-h2">Core Mechanics Framing</Typography>
<Typography component="p" className="rvp-lead">In sports games, players are driven by competition, progression, and the desire to win. Every match is a high-stakes moment, and every loss is a motivation. Rewarded video should act as the edge a player reaches for right before a match, or the lifeline they grab right after a loss, never a distraction from the action.</Typography>

</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Top Rewarded Video Strategies for Sports</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-PostMatch-Earnings-Boost.webp" alt="You won screen with an option to double the player's cash by watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Post-Match Earnings Boost</Typography>
<Typography component="p" className="rvp-card-text">Right after a match ends, offer players the chance to double the coins or XP they just earned by watching a short ad. Triggers at peak engagement: win or lose, the player is invested in their result.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Currency-Reward.webp" alt="Store with a free currency option next to paid bundles" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Currency Reward</Typography>
<Typography component="p" className="rvp-card-text">Embed a free currency option directly in your store or HUD alongside paid coin or token bundles. Watching an ad earns a small amount of in-game currency, making the ad feel like a natural way to earn, not an interruption.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Rematch-Rescue.webp" alt="You lost screen with a rematch button that plays an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Rematch Rescue</Typography>
<Typography component="p" className="rvp-card-text">Trigger an ad prompt on the loss screen, giving players the chance to instantly re-enter a match or round instead of waiting. Taps directly into loss aversion, the moment a player is most motivated to act.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-PreGame-Edge.webp" alt="New match screen offering bonus gems for watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">The Pre-Game Edge</Typography>
<Typography component="p" className="rvp-card-text">Offer a short-duration boost (speed, stamina, or power) that players activate by watching an ad before a match. The boost lasts for that session only, keeping competitive balance intact.</Typography>
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
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Icon-Visibility.png" alt="" />
<Typography component="h3" className="rvp-card-title">Visibility is Key</Typography>
<Typography component="p" className="rvp-card-text">Place ad prompts in high-traffic surfaces like your HUD, pre-match lobby, and loss screen. Buried placements kill engagement rates.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Icon-Repeat-Engagement.png" alt="" />
<Typography component="h3" className="rvp-card-title">Make Rewards Draw Repeat Engagement</Typography>
<Typography component="p" className="rvp-card-text">Boosts should last one match or one session only. Permanent rewards create pay-to-win perception and damage competitive balance.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Icon-Timing.png" alt="" />
<Typography component="h3" className="rvp-card-title">Time It Right</Typography>
<Typography component="p" className="rvp-card-text">The best ad triggers are emotional moments: right before a match (anticipation), right after a loss (frustration), or right after a win (reward). Contextual timing drives opt-in rates far higher than a static button.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Best-in-class examples</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-NFL-Universe-Football.webp" alt="Pack store with a watch ad option in NFL Universe Football" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">NFL Universe Football</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Currency Reward</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Sports-Blue-Lock-Rivals.webp" alt="Shop rewards tab with watch ad options in Blue Lock Rivals" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Blue Lock Rivals</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Currency Reward + Progressive Unlock</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>
</div>
</>);
})()}
