---
title: Rewarded video genre guides
description: Learn how to increase earnings with rewarded video and get inspiration from top games in your genre.
hideInPageNavigation: true
---

Learn how to increase earnings with rewarded video and get inspiration from top games in your genre.

  <style>{`
    .guide-grid {
      width: 100%;
    }
    .guide-card {
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid var(--color-stroke-default);
      background: var(--color-surface-200);
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .guide-card img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
    }
    .guide-card-body {
      padding: 12px 16px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: auto;
    }
    .guide-card-text {
      min-width: 0;
    }
    .guide-pdf-btn {
      background-color: var(--color-system-emphasis) !important;
      color: var(--color-extended-white-100) !important;
      padding: 14px 20px !important;
      min-height: 42px;
    }
  `}</style>

  {(() => {
  const GuideCard = ({ title, src, alt, pdfHref }) => (
    <Card className="guide-card" style={{ width: '100%' }}>
      <img src={src} alt={alt || title} loading="lazy" />
      <div className="guide-card-body">
        <div className="guide-card-text">
          <Typography variant="h6" style={{ marginBottom: 4 }}>
            {title}
          </Typography>
          <Typography component="p" variant="caption" color="secondary" style={{ margin: 0 }}>
            2026 Guide
          </Typography>
        </div>
        <Button href={pdfHref} variant="contained" size="small" className="guide-pdf-btn">
          Open PDF
        </Button>
      </div>
    </Card>
  );

  const guides = [
    {
      title: 'Incremental Sim',
      src: '/assets/ads/sim.png',
      alt: 'Neon bar chart representing incremental simulator genre games.',
      pdfHref: '/assets/ads/IncrementalSim_Playbook.pdf',
    },
    {
      title: 'Obbies',
      src: '/assets/ads/obby.png',
      alt: 'Obby platforms over water in a 3D puzzle platformer scene.',
      pdfHref: '/assets/ads/Obby_Playbook.pdf',
    },
    {
      title: 'RPG Playbook',
      src: '/assets/ads/rpg.png',
      alt: 'Colorful RPG town with blocky characters and houses.',
      pdfHref: '/assets/ads/RPG_Playbook.pdf',
    },
    {
      title: 'Tycoon',
      src: '/assets/ads/tycoon.png',
      alt: 'Tycoon amusement park with rides and buildings.',
      pdfHref: '/assets/ads/Tycoon_Playbook.pdf',
    },
  ];

  return (<>
    <Grid container spacing={1} className="guide-grid" style={{ alignItems: 'stretch', width: '100%' }}>
      {guides.map((guide, i) => (
        <Grid item XSmall={12} Small={6} Medium={4} key={i} style={{ display: 'flex', width: '100%' }}>
          <GuideCard {...guide} />
        </Grid>
      ))}
    </Grid>
  </>);
  })()}
