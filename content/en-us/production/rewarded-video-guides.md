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
    .guide-card-link {
      display: flex;
      width: 100%;
      color: inherit !important;
      text-decoration: none !important;
    }
    .guide-card-link:hover .guide-card,
    .guide-card-link:focus-visible .guide-card {
      border-color: var(--color-system-emphasis);
    }
  `}</style>

{(() => {
const GuideCard = ({ title, src, alt, href }) => (
<a className="guide-card-link" href={href}>
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
</div>
</Card>
</a>
);

const guides = [
{
title: 'Incremental Sim',
src: '/assets/ads/sim.png',
alt: 'Neon bar chart representing incremental simulator genre games.',
href: '/production/promotion/rewarded-video-playbooks/incremental-sim',
},
{
title: 'Obbies',
src: '/assets/ads/obby.png',
alt: 'Obby platforms over water in a 3D puzzle platformer scene.',
href: '/production/promotion/rewarded-video-playbooks/obby',
},
{
title: 'RPG',
src: '/assets/ads/rpg.png',
alt: 'Colorful RPG town with blocky characters and houses.',
href: '/production/promotion/rewarded-video-playbooks/rpg',
},
{
title: 'Tycoon',
src: '/assets/ads/tycoon.png',
alt: 'Tycoon amusement park with rides and buildings.',
href: '/production/promotion/rewarded-video-playbooks/tycoon',
},
{
title: 'Sports',
src: '/assets/ads/sports.png',
alt: 'Characters watching a football game in a sports genre experience.',
href: '/production/promotion/rewarded-video-playbooks/sports',
},
{
title: 'Survival',
src: '/assets/ads/survival.png',
alt: 'Survival genre experience thumbnail.',
href: '/production/promotion/rewarded-video-playbooks/survival',
},
{
title: 'Shooter',
src: '/assets/ads/shooter.png',
alt: 'Shooter genre experience thumbnail.',
href: '/production/promotion/rewarded-video-playbooks/shooter',
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
