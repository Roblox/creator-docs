---
title: Grow a Garden
description: See how Grow a Garden implements rewarded video ad placements.
hideInPageNavigation: true
---

  <style>{`
    main h1 { display: none !important; }
    .placement-badge {
      display: inline-block;
      background: var(--color-system-emphasis);
      border: none;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-extended-white-100);
    }
    .placement-screenshot {
      width: 100%;
      border-radius: 14px;
      border: 1px solid var(--color-stroke-default);
      display: block;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    .detail-grid > div:last-child {
      grid-column: 1 / -1;
    }
    .detail-card {
      background: var(--color-surface-200);
      border-radius: 12px;
      padding: 20px 24px;
    }
    .detail-label {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 6px;
      color: var(--color-content-emphasis);
    }
    .detail-value {
      font-size: 15px;
      color: var(--color-content-muted);
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-system-emphasis);
      text-decoration: none;
      margin-bottom: 24px;
    }
    .back-link:hover {
      color: var(--color-system-emphasis);
      text-decoration: none;
    }
  `}</style>

  {(() => {
  const heroTitleStyle = {
    fontSize: 48,
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.0,
    margin: '6px 0 12px',
  };
  const sectionTitleStyle = {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 16,
  };
  const placementStyle = { marginBottom: 56 };
  
  const DetailField = ({ label, value }) => (
    <div className="detail-card">
      <div className="detail-label">{label}</div>
      <div className="detail-value">{value}</div>
    </div>
  );

  const Placement = ({ number, src, alt, location, reward, rewardType, highlights, href }) => (
    <div style={placementStyle}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', maxWidth: '60%' }}>
        <img className="placement-screenshot" src={src} alt={alt || 'Placement screenshot'} loading="lazy" />
      </a>
      <div className="detail-grid">
        <DetailField label="Placement location" value={location} />
        <DetailField label="Reward type" value={reward} />
        <DetailField label="Key highlights" value={highlights} />
      </div>
    </div>
  );

  return (<>
    <div style={{ marginBottom: 48, marginTop: -48 }}>
      <a className="back-link" href="./index.md"><b>← Back to ad placements</b></a>
      <div style={heroTitleStyle}>Grow a Garden</div>
      <span className="placement-badge">HUD</span>
    </div>

    <Placement
      number={1}
      href="https://www.roblox.com/games/126884695634066/Grow-a-Garden"
      src="/assets/ads/growagarden.png"
      alt="Grow a Garden rewarded video placement in the HUD"
      location="HUD"
      reward="Consumable item"
      highlights={<>A progressive HUD reward system offering utility items that directly accelerate a player's garden growth. By scaling the rewards, it incentivizes repeated engagement to help players speed up their progression.</>}
    />
  </>);
  })()}
