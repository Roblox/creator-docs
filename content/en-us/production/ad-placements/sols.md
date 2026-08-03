---
title: Sols RNG
description: See how Sols RNG implements rewarded video ad placements.
hideInPageNavigation: true
---

  <style>{`
    main h1 { display: none !important; }
    .placement-badge {
      display: inline-block;
      background: var(--color-surface-200);
      border: 1px solid var(--color-stroke-default);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-content-muted);
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
      max-width: 60%;
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
      color: #528BFF;
      text-decoration: none;
      margin-bottom: 24px;
    }
    .back-link:hover {
      color: #a8ccff;
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
      <div style={heroTitleStyle}>Sols RNG</div>
      <span className="placement-badge">HUD</span>
    </div>

    <Placement
      number={1}
      href="https://www.roblox.com/games/15532962292/Sols-RNG"
      src="/assets/ads/sols.png"
      alt="Sols RNG rewarded video placement in the HUD"
      location="HUD"
      reward="Timed buff"
      highlights={<>A HUD-triggered timed buff offering a trial for the premium "quick roll booster." This gives players a fast-paced, high-value taste of accelerated gameplay, driving strong desire for the permanent upgrade.</>}
    />
  </>);
  })()}
