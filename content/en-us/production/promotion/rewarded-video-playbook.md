---
title: 'Rewarded Video Playbook'
description: Learn the best practices, reward strategy, and safety settings that help rewarded video ads perform well in your game.
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
    .rvp .rvp-hero-mock { width: clamp(180px, 42cqi, 400px); height: auto; flex-shrink: 0; display: block; border-radius: 16px; border: 3px solid var(--rvp-blue); }
    .rvp .rvp-quote {
      font-family: monospace;
      font-size: 13px !important;
      line-height: 1.5 !important;
      margin: 14px 0 0 !important;
      color: var(--rvp-text-muted) !important;
    }
    .rvp .rvp-rewards { display: grid; grid-template-columns: 1fr minmax(140px, 260px); gap: 28px; align-items: center; }
    .rvp .rvp-rewards-img { width: 100%; height: auto; display: block; }
    .rvp .rvp-chart-title { font-size: 17px !important; font-weight: 700 !important; text-align: center; margin: 0 0 18px !important; }
    .rvp .rvp-bars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; align-items: end; height: 180px; }
    .rvp .rvp-bar-col { display: flex; flex-direction: column; justify-content: flex-end; height: 100%; }
    .rvp .rvp-bar {
      background: var(--rvp-blue);
      color: var(--color-extended-white-100) !important;
      border-radius: 6px 6px 0 0;
      font-weight: 700;
      font-size: 15px;
      text-align: center;
      padding-top: 10px;
    }
    .rvp .rvp-bar-labels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 8px; }
    .rvp .rvp-bar-label { font-size: 13px; line-height: 1.35; text-align: center; color: var(--rvp-text-muted) !important; }
    .rvp .rvp-source { font-family: monospace; font-size: 11px !important; line-height: 1.5 !important; margin: 16px 0 0 !important; color: var(--rvp-text-muted) !important; }
    .rvp .rvp-safe { background: var(--rvp-blue) !important; }
    .rvp .rvp-safe p, .rvp .rvp-safe h3 { color: var(--color-extended-white-100) !important; }
    .rvp .rvp-type-media { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
    .rvp .rvp-estimate-path { font-size: 16px !important; margin: 0 0 16px !important; }
    .rvp .rvp-estimate-img { width: 100%; height: auto; border-radius: 12px; display: block; }
    @container rvp (max-width: 700px) {
      .rvp .rvp-rewards { grid-template-columns: 1fr; }
      .rvp .rvp-rewards-img { max-width: 200px; margin: 0 auto; }
    }
    @container rvp (max-width: 600px) {
      .rvp .rvp-hero { flex-direction: column-reverse; align-items: flex-start; }
      .rvp .rvp-hero-mock { width: 100%; }
    }
  `}</style>

{(() => {
return (<>

<div className="rvp">
<div className="rvp-hero">
<Typography component="div" className="rvp-title">Rewarded Video Playbook</Typography>
<img className="rvp-hero-mock" src="/assets/monetization/rewarded-video-playbook/phone-mock.png" alt="Prompt offering the player an extra life for watching an ad, with Watch and No thanks buttons" />
</div>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">What is Rewarded Video?</Typography>
<Typography component="p" className="rvp-lead">A rewarded video is a full-screen ad that lasts 6 to 30 seconds and rewards the user with an item. Rewarded ads are a win for users, creators, and advertisers.</Typography>
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
<Typography component="h3" className="rvp-card-title">Easy way to increase earnings</Typography>
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
<Typography component="p" className="rvp-card-text">Rewarded Video can help boost engagement.</Typography>
</div>
</div>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Seamless integration drives engagement</Typography>
<Typography component="p" className="rvp-lead">Here are four best practices to ensure your rewarded video performs.</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-playbook/opt-in-ad.png" alt="A player choosing whether to watch a rewarded video ad" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Opt-in ads</Typography>
<Typography component="p" className="rvp-card-text">Present the reward first, followed by the option to opt in, skip, or pay.</Typography>
<Typography component="p" className="rvp-quote">"I'm opting in because I want the reward and that makes the experience feel more fair and less intrusive."</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-playbook/moments-of-need.png" alt="A rewarded video offer at a natural break point in gameplay" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Moments of need</Typography>
<Typography component="p" className="rvp-card-text">Place rewarded ads at natural break points, such as post-defeat, end-of-level, and wait screens.</Typography>
<Typography component="p" className="rvp-quote">"Appearing right after you lose a level or when you're out of lives feels helpful instead of forced."</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-playbook/respect-the-player.png" alt="A rewarded video billboard in an experience" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Respect the player</Typography>
<Typography component="p" className="rvp-card-text">Target 15 to 30 seconds for in-game rewarded video, and longer for interactive or playable ads.</Typography>
<Typography component="p" className="rvp-quote">"Long ads are boring. Nobody wants to watch a 2 minute ad on their phone when playing a game."</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<CardMedia component="img" className="rvp-strategy-media" src="/assets/monetization/rewarded-video-playbook/interactivity.png" alt="An interactive branded space inside an experience" loading="lazy" />
<Typography component="h3" className="rvp-card-title">Interactivity</Typography>
<Typography component="p" className="rvp-card-text">Where possible, invest in interactive elements to better meet the needs of the Roblox audience.</Typography>
<Typography component="p" className="rvp-quote">"I also like that it's interactive, so I'm not just sitting there watching, I feel more involved and less distracted."</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section" id="choose-rewards">
<div className="rvp-rewards">
<div>
<Typography component="h2" className="rvp-h2">Choosing rewards</Typography>
<Typography component="p" className="rvp-lead">Offer meaningful rewards, such as boosters, in-game currency, extra lives, and temporary privileges.</Typography>
<Card className="rvp-card">
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-chart-title">Preferred rewards</Typography>
<div className="rvp-bars" role="img" aria-label="Preferred rewards: gameplay progression 81%, cosmetic and self-expression 48%, access and premium unlocks 22%">
<div className="rvp-bar-col"><div className="rvp-bar" style={{ height: '81%' }}>81%</div></div>
<div className="rvp-bar-col"><div className="rvp-bar" style={{ height: '48%' }}>48%</div></div>
<div className="rvp-bar-col"><div className="rvp-bar" style={{ height: '22%' }}>22%</div></div>
</div>
<div className="rvp-bar-labels" aria-hidden="true">
<span className="rvp-bar-label">Gameplay progression</span>
<span className="rvp-bar-label">Cosmetic &amp; self-expression</span>
<span className="rvp-bar-label">Access &amp; premium unlocks</span>
</div>
<Typography component="p" className="rvp-source">Source: Roblox Rewarded Ads Research, February 2026 (RBX4). "Which type of rewards do you most prefer for watching ads in Roblox?" Roblox users, n=423.</Typography>
</CardContent>
</Card>
</div>
<img className="rvp-rewards-img" src="/assets/monetization/rewarded-video-playbook/rewards.png" alt="" loading="lazy" />
</div>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Rewarded Video settings to make it safe</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card rvp-safe">
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Protect spenders</Typography>
<Typography component="p" className="rvp-card-text">Hide rewarded video from users likely to purchase, which protects purchase revenue. See <a href="./rewarded-video-ads.md#exclude-likely-spenders">Exclude likely spenders</a>.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={6} style={{ display: 'flex' }}>
<Card className="rvp-card rvp-safe">
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Test</Typography>
<Typography component="p" className="rvp-card-text">Use creator experimentation to measure impacts to key game metrics. See <a href="./rewarded-video-ads.md#de-risk-your-implementation-with-experiments">De-risk your implementation with experiments</a>.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Types of Rewarded Video</Typography>
<Grid container spacing={1} style={{ alignItems: 'stretch' }}>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-type-media" src="/assets/monetization/rewarded-video-playbook/join-with-reward.png" alt="A Join with reward prompt on an experience details page" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Join with Reward</Typography>
<Typography component="p" className="rvp-card-text">An ad placement feature that lets players get a reward before they enter the experience.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-type-media" src="/assets/monetization/rewarded-video-playbook/rewarded-video-billboard.png" alt="A rewarded video billboard offering free items" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">Rewarded Video Billboard</Typography>
<Typography component="p" className="rvp-card-text">Easy-to-integrate templates that you drag and drop into your game.</Typography>
</CardContent>
</Card>
</Grid>
<Grid item XSmall={12} Medium={4} style={{ display: 'flex' }}>
<Card className="rvp-card">
<CardMedia component="img" className="rvp-type-media" src="/assets/monetization/rewarded-video-playbook/in-game-rv.png" alt="A free item offer with a watch ad button in an experience HUD" loading="lazy" />
<CardContent className="rvp-card-body">
<Typography component="h3" className="rvp-card-title">In-game Rewarded Video</Typography>
<Typography component="p" className="rvp-card-text">A rewarded video option that lives within the core game loop, using the HUD or in-game menus.</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</section>

<section className="rvp-section">
<Typography component="h2" className="rvp-h2">Estimate your earnings</Typography>
<Typography component="p" className="rvp-estimate-path">In Creator Hub, go to <strong>Ads</strong> &rarr; <strong>Eligibility</strong>. For details, see <a href="./rewarded-video-ads.md#estimate-potential-earnings">Estimate potential earnings</a>.</Typography>
<img className="rvp-estimate-img" src="/assets/monetization/rewarded-video-playbook/estimate.png" alt="The Eligibility tab in Creator Hub showing weekly potential rewarded video ads earnings" loading="lazy" />
</section>

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
<Typography component="p" className="rvp-rule">Rule of thumb: diagnose from the metric that's lagging, then apply the matching fix from the <a href="./rewarded-video-optimization.md">optimization playbook</a> before testing new creative or ad network changes.</Typography>
</div>
</div>
</section>
</div>
</>);
})()}
