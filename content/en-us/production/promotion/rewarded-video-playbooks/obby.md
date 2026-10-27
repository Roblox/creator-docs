---
title: "Rewarded Video Playbook: Obbies"
description: Placement strategies, benchmarks, and examples for integrating rewarded video ads into obby experiences.
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
<Typography component="div" className="rvp-title">Rewarded Video Playbook: Obbies</Typography>
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-ads/playbooks/Obby-Hero.webp" alt="" />
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
<Typography component="h2" className="rvp-h2">The player journey: where to place Rewarded Video</Typography>
<Typography component="p" className="rvp-lead">Placement is key to maximizing your earnings. As you consider the player journey, here are some ways you could best integrate Rewarded Video in your obby.</Typography>
<div className="rvp-steps">
<div>
<div className="rvp-step-num"><span>01</span></div>
<Typography component="h3" className="rvp-step-title">First view</Typography>
<Typography component="p" className="rvp-step-text">When players first spawn in, offer rewards like timed buffs or additional daily login bonuses.</Typography>
<img className="rvp-step-img" src="/assets/monetization/rewarded-video-ads/playbooks/Obby-First-View.webp" alt="Watch ad prompt offering bonus points in Free UGC Obby" loading="lazy" />
<p className="rvp-step-caption">Free UGC Obby</p>
</div>
<div>
<div className="rvp-step-num"><span>02</span></div>
<Typography component="h3" className="rvp-step-title">Invest &amp; progress</Typography>
<Typography component="p" className="rvp-step-text">Use Rewarded Video to offer free currency or trials to high-value items during the session.</Typography>
<img className="rvp-step-img" src="/assets/monetization/rewarded-video-ads/playbooks/Obby-Invest-and-Progress.webp" alt="Free item prompt with a watch ad button in Escape Papa Pizzas Pizzeria" loading="lazy" />
<p className="rvp-step-caption">Escape Papa Pizzas Pizzeria</p>
</div>
<div>
<div className="rvp-step-num"><span>03</span></div>
<Typography component="h3" className="rvp-step-title">Post-failure second chance</Typography>
<Typography component="p" className="rvp-step-text">Maximize conversion by appealing to players' desire to preserve their current progress.</Typography>
<img className="rvp-step-img" src="/assets/monetization/rewarded-video-ads/playbooks/Obby-Second-Chance.webp" alt="Prompt asking the player to watch an ad to earn a free revive in Ninja Challenge" loading="lazy" />
<p className="rvp-step-caption">Ninja Challenge</p>
</div>
</div>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Key metrics that drive earnings</Typography>
<Typography component="p" className="rvp-lead">The two metrics you need to focus on are <strong>opt-in rate</strong> (the number of total eligible users who engage with your ad) and <strong>daily frequency</strong> (how many times each user views your ad).</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<table className="rvp-table">
<thead>
<tr><th>Metric</th><th>Genre Average</th><th>Best-in-Class</th></tr>
</thead>
<tbody>
<tr><td className="rvp-table-key">Opt-in Rate (DUV/DAU)</td><td>15%-25%</td><td>30%+</td></tr>
<tr><td className="rvp-table-key">Daily Frequency per User</td><td>3</td><td>4+</td></tr>
</tbody>
</table>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<div className="rvp-tips-title"><span className="rvp-info" aria-hidden="true">&#9432;</span>TIPS</div>
<ul className="rvp-tips">
<li>Make the prompt visible when the game starts or when a round ends.</li>
<li>Ensure users know what they're getting. Don't just make a prompt that says "ad."</li>
<li>Provide multiple points of engagement or stacked rewards to increase frequency per user.</li>
</ul>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Best-in-class examples</Typography>
<Typography component="p" className="rvp-lead">Check out these top-performing obbies that are already using Rewarded Video effectively.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Obby-Escape-the-Carnival-of-Terror.webp" alt="Free item prompt with a watch ad button in Escape the Carnival of Terror Obby" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Escape the Carnival of Terror Obby</Typography>
<Typography component="p" className="rvp-card-text">Opt-in Rate: 27%<br />Frequency: 3.9</Typography>
<Typography component="p" className="rvp-card-text">Upon failure, players can watch a video to claim a random item that's good for one life.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-tile-media" src="/assets/monetization/rewarded-video-ads/playbooks/Obby-Glide-Tower.webp" alt="Teleport back to checkpoint prompt with a watch ads option in Glide Tower" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Glide Tower</Typography>
<Typography component="p" className="rvp-card-text">Opt-in Rate: 47%<br />Frequency: 2.3</Typography>
<Typography component="p" className="rvp-card-text">After a failed attempt, players can watch an ad to respawn at a previous checkpoint.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>
</div>
</>);
})()}
