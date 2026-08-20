---
title: Barry's Prison Run
description: See how Barry's Prison Run implements rewarded video ad placements.
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
    .placement-screenshots {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
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
  const placementStyle = { marginBottom: 56 };

  const DetailField = ({ label, value }) => (
    <div className="detail-card">
      <div className="detail-label">{label}</div>
      <div className="detail-value">{value}</div>
    </div>
  );

  const Placement = ({ number, screenshots, location, reward, highlights, href }) => (
    <div style={placementStyle}>
      <div className="placement-screenshots">
        {screenshots.map((shot, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">
            <img className="placement-screenshot" src={shot.src} alt={shot.alt || 'Placement screenshot'} loading="lazy" />
          </a>
        ))}
      </div>
      <div className="detail-grid">
        <DetailField label="Placement location" value={location} />
        <DetailField label="Reward type" value={reward} />
        <DetailField label="Key highlights" value={highlights} />
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 48, marginTop: -48 }}>
        <a className="back-link" href="./index.md"><b>← Back to ad placements</b></a>
        <div style={heroTitleStyle}>Barry's Prison Run</div>
        <span className="placement-badge">HUD</span>
      </div>

      <Placement
        number={1}
        href="https://www.roblox.com/games/8712817601/BARRYS-PRISON-RUN"
        screenshots={[
          { src: "/assets/ads/barrysprisonrun.png", alt: "Barry's Prison Run HUD placement" },
          { src: "/assets/ads/barrysprisonrun2.png", alt: "Barry's Prison Run reward prompt" },
        ]}
        location="HUD"
        reward="Consumable item"
        highlights={<>Grants players immediate access to unique, single-use utility items right from the HUD. These consumables give players a vital, timely advantage to help them complete their current run.</>}
      />
    </div>
  );
  })()}
