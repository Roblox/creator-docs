---
title: "Rewarded Video Optimization Playbook"
description: Diagnose weak rewarded video metrics on an experience that already has rewarded video ads implemented, and apply the matching fix.
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
    .rvp .rvp-hero-left { justify-content: flex-start; align-items: center; gap: 32px; margin-bottom: 40px; }
    .rvp .rvp-hero-left .rvp-hero-text { flex: 1; min-width: 0; }
    .rvp .rvp-hero-left .rvp-title { margin: 0 0 14px !important; }
    .rvp .rvp-hero-left .rvp-hero-img { margin: 0; }
    .rvp .rvp-checklist {
      background: var(--rvp-blue);
      color: var(--color-extended-white-100) !important;
      border-radius: 12px;
      padding: 28px 32px;
      display: grid;
      grid-template-columns: minmax(150px, 200px) 1fr;
      gap: 20px 28px;
      align-items: start;
    }
    .rvp .rvp-checklist p, .rvp .rvp-checklist li, .rvp .rvp-checklist span, .rvp .rvp-checklist div {
      color: var(--color-extended-white-100) !important;
    }
    .rvp .rvp-checklist-title {
      font-size: 24px !important;
      font-weight: 600 !important;
      line-height: 1.2 !important;
      margin: 0 !important;
    }
    .rvp .rvp-checklist-icon { width: 24px; height: 24px; object-fit: contain; display: block; margin: 0 0 14px !important; }
    .rvp .rvp-checks { list-style: disc outside !important; padding: 0 0 0 20px !important; margin: 0 !important; }
    .rvp .rvp-checks li {
      display: list-item !important;
      font-size: 16px;
      line-height: 1.45;
      margin: 0 0 10px;
      padding-left: 2px;
    }
    .rvp .rvp-checks li::marker { color: var(--color-extended-white-100); }
    .rvp .rvp-rule {
      font-family: monospace;
      font-size: 12px !important;
      line-height: 1.5 !important;
      margin: 8px 0 0 !important;
      opacity: 0.9;
    }
    .rvp .rvp-journey { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; }
    .rvp .rvp-journey-img { width: 100%; height: auto; border-radius: 16px; display: block; }
    .rvp .rvp-journey-item { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 18px; }
    .rvp .rvp-journey-item:last-child { margin-bottom: 0; }
    .rvp .rvp-journey-num {
      border: 1.5px solid var(--rvp-text);
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      padding: 1px 5px;
      flex-shrink: 0;
      margin-top: 3px;
    }
    .rvp .rvp-journey-title { font-size: 17px !important; font-weight: 700 !important; margin: 0 0 4px !important; }
    .rvp .rvp-journey-text { font-size: 16px !important; line-height: 1.45 !important; margin: 0 !important; color: var(--rvp-text-muted) !important; }
    .rvp .rvp-place-head {
      display: flex !important;
      align-items: center !important;
      gap: 8px;
      line-height: 1.2 !important;
      font-size: 18px !important;
      font-weight: 700 !important;
      margin: 0 0 12px !important;
    }
    .rvp .rvp-place-head img { width: 20px; height: 20px; object-fit: contain; display: block; margin: 0 !important; flex-shrink: 0; }
    .rvp .rvp-place-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      align-items: stretch;
    }
    .rvp .rvp-place-grid .rvp-place-head { align-self: end; margin: 0 0 2px !important; }
    .rvp .rvp-place-grid .rvp-card { height: 100%; }
    .rvp .rvp-place-media { width: 100%; aspect-ratio: 5 / 2; object-fit: cover; border-radius: 4px; display: block; margin-bottom: 14px; }
    .rvp .rvp-poor-title { color: var(--color-system-alert) !important; }
    .rvp .rvp-bench { table-layout: fixed; }
    .rvp .rvp-bench th, .rvp .rvp-bench td { text-align: left; vertical-align: middle; line-height: 1.45; }
    .rvp .rvp-bench td { font-weight: 500; }
    .rvp .rvp-bench td.rvp-table-key { background: var(--rvp-card) !important; color: var(--rvp-text) !important; font-weight: 700; }
    .rvp .rvp-bench .rvp-col-metric { width: 22%; }
    .rvp .rvp-bench .rvp-col-target { width: 16%; }
    .rvp .rvp-cell-label { display: none; }
    @container rvp (max-width: 700px) {
      .rvp .rvp-journey { grid-template-columns: 1fr; }
      .rvp .rvp-place-grid { grid-template-columns: 1fr; }
      .rvp .rvp-place-grid .rvp-good { order: 1; }
      .rvp .rvp-place-grid .rvp-poor { order: 2; }
      .rvp .rvp-place-grid .rvp-poor.rvp-place-head { margin-top: 24px !important; }
    }
    @container rvp (max-width: 600px) {
      .rvp .rvp-hero-left { flex-direction: column; align-items: flex-start; gap: 16px; }
      .rvp .rvp-checklist { grid-template-columns: 1fr; padding: 24px; }
      .rvp .rvp-bench, .rvp .rvp-bench tbody, .rvp .rvp-bench tr, .rvp .rvp-bench td { display: block; width: 100%; }
      .rvp .rvp-bench thead { display: none; }
      .rvp .rvp-bench tr { margin-bottom: 10px; border-radius: 12px; overflow: hidden; }
      .rvp .rvp-bench td { border: none; padding: 10px 16px; }
      .rvp .rvp-bench td.rvp-table-key { padding: 12px 16px; }
      .rvp .rvp-cell-label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--rvp-text-muted); margin-bottom: 2px; }
    }
  `}</style>

{(() => {
return (<>
<div className="rvp">
<div className="rvp-hero rvp-hero-left">
<img className="rvp-hero-img" src="/assets/monetization/rewarded-video-optimization/Optimization-Hero.webp" alt="" />
<div className="rvp-hero-text">
<Typography component="div" className="rvp-title">Rewarded Video Optimization Playbook</Typography>
<Typography component="p" className="rvp-lead">A quick-reference guide for creators who have already integrated rewarded video ads but are seeing low opt-in, low repeat usage, or soft earnings. Diagnose the likely cause behind a weak metric and apply the matching fix.</Typography>
</div>
</div>

<section className="rvp-section">
<div className="rvp-checklist">
<div>
<img className="rvp-checklist-icon" src="/assets/monetization/rewarded-video-optimization/Icon-Checklist.png" alt="" />
<Typography component="h2" className="rvp-checklist-title">Self-Audit Checklist</Typography>
</div>
<div>
<ul className="rvp-checks">
<li>Is your RV prompt visible within the first couple of actions after the triggering moment, not buried in a menu?</li>
<li>Do you offer more than one reward type across the prompt?</li>
<li>Is your frequency cap at least 2-3 prompts per session (or an equivalent daily cap)?</li>
<li>Are your rewards consumable and repeatable rather than one-time durables?</li>
<li>Is your RV integrated within or near the core loop of the game?</li>
</ul>
<Typography component="p" className="rvp-rule">Rule of thumb: diagnose from the metric that's lagging, then apply the matching fix below before testing new creative or ad network changes.</Typography>
</div>
</div>
</section>

<section className="rvp-section">
<div className="rvp-journey">
<img className="rvp-journey-img" src="/assets/monetization/rewarded-video-optimization/user_journey.png" alt="Trails shop with a prompt to watch an ad for 2x egg growth for 5 minutes" loading="lazy" />
<div>
<Typography component="h2" className="rvp-h2">The user journey</Typography>
<div className="rvp-journey-item">
<span className="rvp-journey-num">01</span>
<div>
<Typography component="h3" className="rvp-journey-title">Core loop</Typography>
<Typography component="p" className="rvp-journey-text">Opt-in rewarded video fits at natural pauses, such as after a round, or at a checkpoint. It adds value without breaking flow.</Typography>
</div>
</div>
<div className="rvp-journey-item">
<span className="rvp-journey-num">02</span>
<div>
<Typography component="h3" className="rvp-journey-title">Friction points</Typography>
<Typography component="p" className="rvp-journey-text">When a player is out of currency or stuck, rewarded video keeps them engaged and earns developers revenue from players who don't buy.</Typography>
</div>
</div>
<div className="rvp-journey-item">
<span className="rvp-journey-num">03</span>
<div>
<Typography component="h3" className="rvp-journey-title">Return visits</Typography>
<Typography component="p" className="rvp-journey-text">Daily rewards and events are good moments to offer an opt-in bonus that makes coming back more rewarding.</Typography>
</div>
</div>
</div>
</div>
</section>

<section className="rvp-section">
<div className="rvp-place-grid">
<Typography component="h3" className="rvp-place-head rvp-good"><img src="/assets/monetization/rewarded-video-optimization/Icon-Good-Placement.png" alt="" />Good Placements</Typography>
<Typography component="h3" className="rvp-place-head rvp-poor"><img src="/assets/monetization/rewarded-video-optimization/Icon-Poor-Placement.png" alt="" />Poor Placements</Typography>
<Card className="rvp-card rvp-good">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-place-media" src="/assets/monetization/rewarded-video-optimization/clutch_hud.png" alt="A rewarded video offer shown in the HUD right after a near-death moment" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Clutch HUD button</Typography>
<Typography component="p" className="rvp-card-text">Appears right after a near-death or low-resource moment, offering a clear reward.</Typography>
</CardContent>
</Card>
<Card className="rvp-card rvp-poor">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-place-media" src="/assets/monetization/rewarded-video-optimization/buried_ad.png" alt="An ad button buried in a store submenu" loading="lazy" />
<Typography component="h3" className="rvp-card-title rvp-poor-title">Buried ad button</Typography>
<Typography component="p" className="rvp-card-text">Ad button buried three taps deep in Store &rarr; Boosters &rarr; Ads.</Typography>
</CardContent>
</Card>
<Card className="rvp-card rvp-good">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-place-media" src="/assets/monetization/rewarded-video-optimization/bonus_end.png" alt="A bonus rewarded video revive option on an end-of-level screen" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Bonus end-of-level</Typography>
<Typography component="p" className="rvp-card-text">End-of-level screen offers a bonus RV option alongside standard rewards.</Typography>
</CardContent>
</Card>
<Card className="rvp-card rvp-poor">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-place-media" src="/assets/monetization/rewarded-video-optimization/lack_of_context.png" alt="A generic Watch Ad button with no visible reward" loading="lazy" />
<Typography component="h3" className="rvp-card-title rvp-poor-title">Lack of context</Typography>
<Typography component="p" className="rvp-card-text">Generic "Watch Ad" button with no context or visible reward.</Typography>
</CardContent>
</Card>
<Card className="rvp-card rvp-good">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-place-media" src="/assets/monetization/rewarded-video-optimization/clear_value.png" alt="A rewarded video prompt that shows the reward value before the player opts in" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Clear value proposition</Typography>
<Typography component="p" className="rvp-card-text">Reward value is shown before the player commits to watching.</Typography>
</CardContent>
</Card>
<Card className="rvp-card rvp-poor">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-place-media" src="/assets/monetization/rewarded-video-optimization/no_player_differentiation.png" alt="The same cash offer shown to a player who already has plenty of cash" loading="lazy" />
<Typography component="h3" className="rvp-card-title rvp-poor-title">No player differentiation</Typography>
<Typography component="p" className="rvp-card-text">Same placement shown regardless of whether the player actually needs it.</Typography>
</CardContent>
</Card>
</div>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">RV Health Benchmarks &amp; Fixes</Typography>
<div className="rvp-table-wrap">
<table className="rvp-table rvp-bench">
<colgroup><col className="rvp-col-metric" /><col className="rvp-col-target" /><col /></colgroup>
<thead>
<tr><th>Metric</th><th>Target</th><th>How to Improve</th></tr>
</thead>
<tbody>
<tr><td className="rvp-table-key">Opt-in Rate</td><td><span className="rvp-cell-label">Target</span>10-20%+</td><td><span className="rvp-cell-label">How to improve</span>Surface RV prompts contextually (e.g. HUD notification at a moment of need) instead of burying them in menus.</td></tr>
<tr><td className="rvp-table-key">Frequency</td><td><span className="rvp-cell-label">Target</span>2-4+</td><td><span className="rvp-cell-label">How to improve</span>Loosen caps where possible and offer consumable, repeatable rewards (boosts, currency, extra lives) that encourage re-engagement.</td></tr>
<tr><td className="rvp-table-key">Imp/DAU</td><td><span className="rvp-cell-label">Target</span>0.5+</td><td><span className="rvp-cell-label">How to improve</span>Offer multiple reward options spanning new and existing player needs, and test reward value against perceived cost of watching.</td></tr>
</tbody>
</table>
</div>
</section>
</div>
</>);
})()}
