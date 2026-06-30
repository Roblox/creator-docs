---
title: Roblox Jumpstart
description: Jumpstart is a program that invests in ambitious creators building novel games that bring a new generation of 18+ players to Roblox. Learn how to apply.
hideInPageNavigation: true
---

<style>{`
  main h1 { display: none !important; }
  .js-hero {
    position: relative;
    width: 100%;
    aspect-ratio: 24/9;
    min-height: 360px;
    border-radius: 16px;
    overflow: hidden;
    background: #000;
    display: flex;
    align-items: center;
  }
  .js-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
    display: block;
  }
  /* Fade the image to solid black on the left so it bleeds behind the copy. */
  .js-hero-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #000 0%, rgba(0,0,0,0.92) 26%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0) 100%);
  }
  .js-hero-content {
    position: relative;
    z-index: 2;
    max-width: 560px;
    padding: clamp(28px, 5%, 64px);
  }
  .js-video {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 14px;
    overflow: hidden;
    background: #000;
    border: 1px solid var(--color-stroke-default);
  }
  .js-video iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
  .js-acc-item {
    background: var(--color-surface-100);
    border-bottom: 1px solid var(--color-stroke-default);
  }
  .js-acc-item:first-child { border-top-left-radius: 14px; border-top-right-radius: 14px; }
  .js-acc-item:last-child { border-bottom: 0; border-bottom-left-radius: 14px; border-bottom-right-radius: 14px; }
  .js-acc-header {
    width: 100%;
    border: 0;
    background: transparent;
    text-align: left;
    padding: 18px 22px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;
    font: inherit;
    color: inherit;
  }
  .js-acc-header:hover { background: var(--color-state-hover); }
  .js-acc-caret {
    color: var(--color-content-muted);
    font-size: 14px;
    transition: transform 200ms ease, color 200ms ease;
    display: inline-block;
  }
  .js-acc-item.open .js-acc-caret { transform: rotate(90deg); color: var(--color-system-emphasis); }
  .js-acc-panel { max-height: 0; overflow: hidden; transition: max-height 280ms ease; }
  .js-acc-item.open .js-acc-panel { max-height: 320px; }
  .js-acc-panel-inner { padding: 0 22px 20px; line-height: 1.6; }
  .js-acc-panel-inner a { color: var(--color-content-link); }
`}</style>

export const accent = 'var(--color-system-emphasis)';
export const darkSurface = 'var(--color-surface-200)';
export const darkBorder = 'var(--color-stroke-default)';
export const APPLY_URL = 'https://survey.roblox.com/jfe/form/SV_a5fvz9Y4204yfMa';
export const overlineStyle = { color: accent, fontWeight: 700, letterSpacing: '0.1em' };
export const h2Style = { fontSize: 32, fontWeight: 800, marginBottom: 8 };
// Blue (system-emphasis) CTA button, matching the AI page's accent treatment.
export const blueBtn = { backgroundColor: accent, color: 'var(--color-extended-white-100)' };
// Icon height tuned to sit level with the card h5 titles.
export const titleIconSize = 22;

{/* Material Symbols icon paths (24x24), embedded inline so no external font or
    new component is needed: school = guidance, campaign = promotion, groups = community. */}
export const ICON_PATHS = {
  guidance: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  promotion: 'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',
  community: 'M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73L18 18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85C21.93 14.21 20.99 14 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  // how-it-works step icons: edit_document (apply), search (review); grow reuses `community`
  apply: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  review: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  // proof-bar stat icons: groups (dau), payments (paid), attach_money (earnings), autorenew (rolling)
  paid: 'M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z',
  earnings: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
  rolling: 'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z',
};

{/* All editable copy lives here, top to bottom. */}
export const DATA = {
  hero: {
    overline: 'ROBLOX JUMPSTART',
    title: 'Bring your game idea to Roblox',
    description:
      'Jumpstart is a program that invests in ambitious creators from our community as they build novel games that bring a new generation of 18+ players to Roblox.',
    cta: { label: 'Apply now', href: APPLY_URL },
    image: '/assets/developer-jumpstart/landing/hero.webp',
  },
  stats: [
    { icon: 'community', value: '144M', label: 'daily active users', caption: 'Roblox platform average' },
    { icon: 'paid', value: '$1.5B', label: 'paid to creators', caption: 'In the last 12 months' },
    { icon: 'earnings', value: '$7M', label: 'avg per top-100 creator', caption: 'In the last 12 months' },
    { icon: 'rolling', value: 'Rolling', label: 'applications', caption: 'Apply anytime' },
  ],
  whyApply: {
    title: 'Why apply to Jumpstart?',
    cards: [
      { icon: 'guidance', title: 'Guidance from Roblox experts', body: 'Get guidance from experienced teams across design, engineering, growth, and more.' },
      { icon: 'promotion', title: 'Promotion & marketing', body: "We'll help more players find your game through our platform and channels." },
      { icon: 'community', title: 'Build with fellow game devs', body: 'Connect with a network of creators building the future of Roblox together.' },
    ],
  },
  // Video shown to the left of the "Is Jumpstart right for you?" content.
  video: { youtubeId: 'p1YKvhpF4NY', title: 'Roblox Jumpstart' },
  fit: {
    title: 'Is Jumpstart right for you?',
    intro: 'Jumpstart is designed for creators who are ready to take their game to the next level, and more.',
    items: [
      "You're committed to launching and growing on Roblox",
      'You have a clear vision and unique gameplay',
      "You're ready to collaborate and iterate",
    ],
  },
  lookingFor: {
    title: "What we're looking for",
    columns: [
      { title: 'Genres', body: 'Fresh takes on RPG, shooter, strategy, sports, or other genres 18+ players love.', image: '/assets/developer-jumpstart/landing/looking-for-genres.webp' },
      { title: 'Gameplay', body: 'Engaging core loops, replayability, and meaningful progression.', image: '/assets/developer-jumpstart/landing/looking-for-gameplay.webp' },
      { title: 'Visual style', body: "Polished, expressive visuals that match your game's vision.", image: '/assets/developer-jumpstart/landing/looking-for-visual-style.webp' },
    ],
  },
  how: {
    title: 'How Jumpstart works',
    steps: [
      { icon: 'apply', title: 'Apply', body: 'Tell us about your game and your goals.' },
      { icon: 'review', title: 'Review', body: 'Our team reviews your application and may reach out.' },
      { icon: 'community', title: 'Grow together', body: 'Accepted creators receive support to build, launch, and scale on Roblox.' },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'What kinds of games are you looking for?', a: "Genre, gameplay, and visual style are common factors in a player's decision to try a new experience, especially for 18+ players. Entrance into Jumpstart hinges on innovation in these areas.\n\n• Genres: RPG, strategy, and shooter games are heavily underrepresented despite strong demand from older age groups. We're seeking bold games in these core genres, plus unexpected genre mash-ups and projects that blend traditional mechanics with Roblox's avatars, social features, and cross-platform support.\n• Gameplay: Deep game mechanics, metagame systems, and skillful challenges keep players coming back. We're looking for creators who seamlessly blend depth with Roblox's intuitive nature, massive multiplayer scale, and emergent social dynamics to craft highly replayable, memorable experiences and moments players can't find anywhere else.\n• Visual style: We're looking for games that push aesthetic boundaries and make players think \"Wait, that's Roblox?\" We're looking for teams innovating with hyper-realistic 3D assets, stylized 2.5D sprites, high-fidelity avatars, or any other technique that brings their vision to life in ways that are entirely new to Roblox." },
      { q: 'Do I need prior Roblox experience?', a: "No. You don't need to have shipped on Roblox before; Jumpstart is specifically designed to help early-stage teams learn the platform and launch their first high-quality Roblox game." },
      { q: 'Is this cash funding or a salary?', a: 'No. Jumpstart support is primarily in-kind: guidance, Robux-based operational support, and visibility tools—not a salary or traditional publishing deal.' },
      { q: "Who's eligible to apply?", a: "Off-platform studios, new Roblox creators, and small teams from around the world can apply, as long as at least one team member is 18+. Full eligibility details will be listed on the application form. Participants should have English language skills sufficient to communicate and participate in program activities, including check-ins, milestone reviews, and cohort events. This ensures effective collaboration with Roblox staff and other participants." },
      { q: "What if I'm already part of an experienced or full-time team?", a: "If you've already shipped games or have a more mature Roblox project, you may be a better fit for the Roblox Incubator Program, which is a longer, milestone-driven track for teams ready to scale a promising title." },
      { q: 'What happens after Jumpstart?', a: 'If your game shows strong potential, Roblox can connect you with follow-on programs and resources—including potential Incubator consideration—to keep building momentum after launch.' },
    ],
  },
  closing: {
    title: '144 million players are waiting to play your game',
    description: 'Join Jumpstart and build the next great experience on Roblox.',
    cta: { label: 'Apply to Jumpstart', href: APPLY_URL },
    image: '/assets/developer-jumpstart/landing/closing-banner.webp',
  },
};

{/* MDX-injected components (Grid, Typography, Button, Card, CardContent, Link)
    are only in scope inside this IIFE. */}

{(() => {
const mb = (n) => ({ marginBottom: n });
const flexCol = { display: 'flex', flexDirection: 'column' };

const Icon = ({ path, size = 28, color = accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d={path} />
  </svg>
);

const SectionHeader = ({ overline, title, description }) => (
  <div style={{ marginBottom: 24 }}>
    {overline && <Typography component="p" variant="overline" style={overlineStyle}>{overline}</Typography>}
    <Typography component="h2" style={h2Style}>{title}</Typography>
    {description && <Typography component="p" variant="body1" color="secondary">{description}</Typography>}
  </div>
);

{/* Hero: full-width image that fades to black on the left so the copy bleeds over it. */}
const Hero = ({ overline, title, description, cta, image }) => (
  <div className="js-hero" style={{ marginBottom: 56, marginTop: 8 }}>
    <img className="js-hero-img" src={image} alt="" />
    <div className="js-hero-fade" />
    <div className="js-hero-content">
      <Typography component="p" variant="overline" style={overlineStyle}>{overline}</Typography>
      <Typography component="div" style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, margin: '6px 0 16px', color: 'var(--color-extended-white-100)' }}>{title}</Typography>
      <Typography component="p" variant="largeLabel1" style={{ marginBottom: 24, maxWidth: 480, color: 'var(--color-extended-white-70)' }}>{description}</Typography>
      <Button variant="contained" size="large" href={cta.href} rel="noopener" style={blueBtn}>{cta.label}</Button>
    </div>
  </div>
);

{/* Proof bar */}
const StatBar = ({ stats }) => (
  <Grid container spacing={3} style={{ ...mb(72), alignItems: 'stretch' }}>
    {stats.map((s, i) => (
      <Grid item XSmall={6} Medium={3} key={i} style={{ display: 'flex' }}>
        <Card style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, padding: '22px 24px', width: '100%', ...flexCol, gap: 4 }}>
          <div style={{ marginBottom: 8 }}><Icon path={ICON_PATHS[s.icon]} size={26} /></div>
          <Typography style={{ fontSize: 34, fontWeight: 800, color: 'var(--color-content-emphasis)', lineHeight: 1.1 }}>{s.value}</Typography>
          <Typography variant="smallLabel1" style={{ color: 'var(--color-content-default)', fontWeight: 600 }}>{s.label}</Typography>
          <Typography variant="caption" style={{ color: 'var(--color-content-muted)' }}>{s.caption}</Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
);

{/* Why apply (icon cards) */}
const WhyApply = ({ title, cards }) => (
  <div style={mb(72)}>
    <SectionHeader title={title} />
    <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
      {cards.map((c, i) => (
        <Grid item XSmall={12} Medium={4} key={i} style={{ display: 'flex' }}>
          <Card style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, padding: '24px 24px 28px', width: '100%', ...flexCol, gap: 10 }}>
            <Icon path={ICON_PATHS[c.icon]} size={titleIconSize} />
            <Typography variant="h5" style={{ marginTop: 4 }}>{c.title}</Typography>
            <Typography variant="smallLabel1" color="secondary">{c.body}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

{/* "Is Jumpstart right for you?" on the left, video on the right. */}
const VideoFit = ({ video, fit }) => (
  <div style={mb(72)}>
    <Grid container spacing={6} alignItems="center">
      <Grid item XSmall={12} Medium={6}>
        <Typography component="h2" style={h2Style}>{fit.title}</Typography>
        <Typography component="p" variant="body1" color="secondary" style={{ marginBottom: 20 }}>{fit.intro}</Typography>
        <div style={{ ...flexCol, gap: 14 }}>
          {fit.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}><Icon path={ICON_PATHS.check} size={22} /></span>
              <Typography variant="largeLabel1">{it}</Typography>
            </div>
          ))}
        </div>
      </Grid>
      <Grid item XSmall={12} Medium={6}>
        <div className="js-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Grid>
    </Grid>
  </div>
);

{/* What we're looking for (image columns) */}
const LookingFor = ({ title, columns }) => (
  <div style={mb(72)}>
    <SectionHeader title={title} />
    <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
      {columns.map((c, i) => (
        <Grid item XSmall={12} Medium={4} key={i} style={{ display: 'flex' }}>
          <Card style={{ borderRadius: 16, overflow: 'hidden', width: '100%', ...flexCol }}>
            <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--color-surface-0)' }}>
              <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <CardContent style={{ padding: '18px 20px 22px', flex: 1, ...flexCol, gap: 6 }}>
              <Typography variant="h5">{c.title}</Typography>
              <Typography variant="smallLabel1" color="secondary">{c.body}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

{/* How Jumpstart works (numbered steps) */}
const HowItWorks = ({ title, steps }) => (
  <div style={mb(72)}>
    <SectionHeader title={title} />
    <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
      {steps.map((s, i) => (
        <Grid item XSmall={12} Medium={4} key={i} style={{ display: 'flex' }}>
          <Card style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, padding: '24px 24px 28px', width: '100%', ...flexCol, gap: 10 }}>
            <Icon path={ICON_PATHS[s.icon]} size={titleIconSize} />
            <Typography variant="h5" style={{ marginTop: 4 }}>{s.title}</Typography>
            <Typography variant="smallLabel1" color="secondary">{s.body}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

{/* FAQ accordion. Answers support inline [text](href) links. */}
const renderAnswer = (s) => {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const out = [];
  let last = 0, m, i = 0;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(s.slice(last, m.index));
    out.push(<Link key={`l${i++}`} href={m[2]}>{m[1]}</Link>);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out.length ? out : s;
};

const FAQ = ({ title, items }) => (
  <div style={mb(72)}>
    <SectionHeader title={title} />
    <div style={{ border: `1px solid ${darkBorder}`, borderRadius: 14, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <div key={i} className="js-acc-item">
          <button type="button" className="js-acc-header" onClick={(e) => e.currentTarget.closest('.js-acc-item')?.classList.toggle('open')}>
            <Typography component="span" variant="largeLabel1" style={{ fontWeight: 600 }}>{item.q}</Typography>
            <span className="js-acc-caret">▸</span>
          </button>
          <div className="js-acc-panel">
            <div className="js-acc-panel-inner">
              <Typography component="p" variant="smallLabel1" color="secondary">{renderAnswer(item.a)}</Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

{/* Closing CTA banner: mirrors the hero. Image fades to black on the left, copy on the left. */}
const Closing = ({ title, description, cta, image }) => (
  <div className="js-hero" style={{ aspectRatio: '26/9', minHeight: 300, marginBottom: 16 }}>
    <img className="js-hero-img" src={image} alt="" style={{ objectPosition: 'center 20%', transform: 'translateX(14%)' }} />
    <div className="js-hero-fade" />
    <div className="js-hero-content">
      <Typography component="h2" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: 'var(--color-extended-white-100)', marginBottom: 10, maxWidth: 520 }}>{title}</Typography>
      <Typography component="p" variant="largeLabel1" style={{ color: 'var(--color-extended-white-70)', marginBottom: 22, maxWidth: 440 }}>{description}</Typography>
      <Button variant="contained" size="large" href={cta.href} rel="noopener" style={blueBtn}>{cta.label}</Button>
    </div>
  </div>
);

return (<>
  <Hero {...DATA.hero} />
  <StatBar stats={DATA.stats} />
  <WhyApply {...DATA.whyApply} />
  <VideoFit video={DATA.video} fit={DATA.fit} />
  <LookingFor {...DATA.lookingFor} />
  <HowItWorks {...DATA.how} />
  <FAQ {...DATA.faq} />
  <Closing {...DATA.closing} />
</>);
})()}
