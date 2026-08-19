---
title: Discover ad placements
description: See how other games have implemented Rewarded Video for inspiration.
hideInPageNavigation: true
---

See how other games have implemented rewarded video for inspiration.

  <style>{`
    .placement-card {
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid var(--color-stroke-default);
      background: var(--color-surface-0);
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .placement-card img {
      width: 100%;
      max-height: 450px;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
    }
    .placement-card-body {
      padding: 12px 16px 16px;
    }
  `}</style>

  {(() => {
  const sectionStyle = { marginBottom: 64 };

  const PlacementCard = ({ title, placement, src, alt, href }) => {
    const card = (
      <Card className="placement-card">
        <img src={src} alt={alt || title} loading="lazy" />
        <div className="placement-card-body">
          <Typography variant="h6" style={{ marginBottom: 4 }}>
            {title}
          </Typography>
          <Typography component="p" variant="caption" color="secondary" style={{ margin: 0 }}>
            {placement}
          </Typography>
        </div>
      </Card>
    );
    if (href) {
      return <a href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flex: 1 }}>{card}</a>;
    }
    return card;
  };

  const PlacementSection = ({ label, children }) => (
    <div style={sectionStyle}>
      <Typography component="h2" style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        {label}
      </Typography>
      {children}
    </div>
  );

  const placements = {
    inMenu: [
      { title: 'Adopt Me', placement: 'In Menu', src: '/assets/ads/adoptme.webp', href: './adoptme.md' },
    ],
    hud: [
      { title: 'Barry\'s Prison Run', placement: 'HUD', src: '/assets/ads/barrysprisonrun.webp', href: './barrysprisonrun.md' },
      { title: 'Brookhaven', placement: 'HUD', src: '/assets/ads/brookhaven.webp', href: './brookhaven.md' },
      { title: 'Grow a Garden', placement: 'HUD', src: '/assets/ads/growagarden.webp', href: './growagarden.md' },
      { title: 'Sols RNG', placement: 'HUD', src: '/assets/ads/sols.webp', href: './sols.md' },
    ],
    inShop: [
      { title: 'Blue Lock Rivals', placement: 'In Shop', src: '/assets/ads/bluelock.webp', href: './bluelock.md' },
    ],
    popup: [
      { title: 'Evade', placement: 'Pop-up', src: '/assets/ads/evade.webp', href: './evade.md' },
      { title: '+1 Speed Keyboard Escape', placement: 'Pop-up', src: '/assets/ads/1speed.webp', href: './1speed.md' },
    ],
    inWorld: [
      { title: 'RIVALS', placement: 'In World', src: '/assets/ads/rivals.webp', href: './rivals.md' },
    ],
  };

  const renderSection = (label, cards) => (
    <PlacementSection label={label}>
      <Grid container spacing={2} style={{ alignItems: 'stretch' }}>
        {cards.map((card, i) => (
          <Grid item XSmall={12} Small={6} Medium={4} key={i} style={{ display: 'flex' }}>
            <PlacementCard {...card} />
          </Grid>
        ))}
      </Grid>
    </PlacementSection>
  );

  return (<>
    {renderSection('In menu', placements.inMenu)}
    {renderSection('HUD', placements.hud)}
    {renderSection('In shop', placements.inShop)}
    {renderSection('Pop-up', placements.popup)}
    {renderSection('In world', placements.inWorld)}
  </>);
  })()}
