---
title: "Rewarded Video Playbook: Shooter"
description: Strategies, benchmarks, and examples for integrating rewarded video ads into shooter experiences.
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
<Typography component="div" className="rvp-title">Rewarded Video Playbook: Shooter</Typography>
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Hero.webp" alt="" />
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
<Typography component="p" className="rvp-metric-num">10%+</Typography>
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
<Typography component="p" className="rvp-lead">In Roblox shooter games, players are driven by competition, mastery, and upgrading their weapons and kits. Rounds are short and intense, and decisions are made in the breaks in between: death screens, lobby, results screen. RV should be added in those natural breaks to give necessary boosts to players between fights, avoiding any interruptions mid-fight.</Typography>

</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Top Rewarded Video Strategies for Shooter Games</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-PreMatch-Boost.webp" alt="Pre-match prompt offering 15 minutes of 2x EXP for watching a short video" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Pre-Match Boost</Typography>
<Typography component="p" className="rvp-card-text">Before a match starts, let players watch an ad to activate a short earnings booster: 2X XP, credits, or keys for their next match. It speeds up progression without touching damage, health, or aim, so lobbies stay fair.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Armory-Currency-Reward.webp" alt="Armory shop with a free currency option next to paid items" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Armory Currency Reward</Typography>
<Typography component="p" className="rvp-card-text">Add a free currency option to your armory or shop alongside paid bundles. Watching an ad earns a small amount of in-game currency toward weapons and skins, a natural way to earn, not an interruption.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Weapon-Trial.webp" alt="Free weapon trial prompt that plays an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Weapon Trial</Typography>
<Typography component="p" className="rvp-card-text">Let players use a premium weapon or skin for one match by watching an ad. "Try before you buy." Lets them learn the item's value, and the trial expires before it can replace a purchase.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-PostMatch-Payout-Boost.webp" alt="Victory screen with an option to double earnings by watching an ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Post-Match Payout Boost</Typography>
<Typography component="p" className="rvp-card-text">Right after a round ends, offer players the chance to double the coins or XP they just earned by watching a short ad. Win or lose, the player is invested in their result.</Typography>
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
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Icon-Never-Interrupt.png" alt="" />
<Typography component="h3" className="rvp-card-title">Never Interrupt A Fight</Typography>
<Typography component="p" className="rvp-card-text">Only prompt at natural breaks: the lobby, death screen, or results screen. If you prompt during a round, pause damage or keep the prompt in a safe zone.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Icon-Fair-Rewards.png" alt="" />
<Typography component="h3" className="rvp-card-title">Keep Rewards Fair and Fixed</Typography>
<Typography component="p" className="rvp-card-text">Rewards should be valuable enough for players to watch ads to unlock them, but should not be tagged to the highest revenue item in your game. Golden rule is to have a balance, so the game progresses with the aid of ads, but does not alter the overall monetization strategy.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<img className="rvp-icon" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Icon-Easy-To-Find.png" alt="" />
<Typography component="h3" className="rvp-card-title">Make It Easy to Find</Typography>
<Typography component="p" className="rvp-card-text">Use a prominent prompt that takes one or two clicks and states exactly what the player gets. Tag each surface with a Placement ID so you can see which one drives the most views.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Best-in-class examples</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/17625359962/RIVALS" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Rivals.webp" alt="Weapon unlock menu with a free trial option in Rivals" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Rivals</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Weapon Trial</Typography>
</CardContent>
</Card>
</a>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<a className="rvp-tile-link" href="https://www.roblox.com/games/17516596118/Hypershot" target="_blank" rel="noopener noreferrer">
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Shooter-Hypershot.webp" alt="Prompt to get a free item after watching an ad in Hypershot" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Hypershot</Typography>
<Typography component="p" className="rvp-card-text"><strong>Strategy:</strong> Pre Match Boost</Typography>
</CardContent>
</Card>
</a>
</Grid>
</Grid>
</section>
</div>
</>);
})()}
