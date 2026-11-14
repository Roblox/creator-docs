---
title: Bring Your Existing Game to Roblox
description: "We're working with a limited number of developers with games on mobile, PC, or console. Learn how to apply."
template: landing-page
hideInPageNavigation: true
---

<style>{`
  main h1 { display: none !important; }
  .cv-hero {
    position: relative;
    border-radius: 16px;
    padding: clamp(32px, 6vw, 64px);
    border: 1px solid var(--color-stroke-default);
    overflow: hidden;
    background: #000;
  }
  .cv-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .cv-hero-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(14,16,20,0.82) 0%, rgba(14,16,20,0.6) 100%);
  }
  .cv-hero-content { position: relative; z-index: 2; }
  .cv-hero-content * { color: var(--color-extended-white-100); }
  .cv-why-card-img {
    width: 100%;
    height: 142px;
    object-fit: cover;
    border-radius: 14px 14px 0 0;
    display: block;
  }
  .cv-how-img {
    width: 100%;
    border-radius: 14px;
    object-fit: cover;
    display: block;
  }
  .cv-acc-item {
    background: var(--color-surface-100);
    border-bottom: 1px solid var(--color-stroke-default);
  }
  .cv-acc-item:first-child { border-top-left-radius: 14px; border-top-right-radius: 14px; }
  .cv-acc-item:last-child { border-bottom: 0; border-bottom-left-radius: 14px; border-bottom-right-radius: 14px; }
  .cv-acc-header {
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
  .cv-acc-header:hover { background: var(--color-state-hover); }
  .cv-acc-caret {
    color: var(--color-content-muted);
    font-size: 14px;
    transition: transform 200ms ease, color 200ms ease;
    display: inline-block;
  }
  .cv-acc-item.open .cv-acc-caret { transform: rotate(90deg); color: var(--color-system-emphasis); }
  .cv-acc-panel { max-height: 0; overflow: hidden; transition: max-height 280ms ease; }
  .cv-acc-item.open .cv-acc-panel { max-height: 900px; }
  .cv-acc-panel-inner { padding: 0 22px 20px; line-height: 1.6; }
  .cv-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
  .cv-grid-how {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 40px;
    align-items: center;
  }
  .cv-grid-apply {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: 48px;
    align-items: center;
  }
  .cv-apply-checklist {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 24px;
  }
  .cv-item-icon-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  @media (max-width: 744px) {
    .cv-grid-3,
    .cv-grid-how,
    .cv-grid-apply,
    .cv-apply-checklist {
      grid-template-columns: 1fr;
    }
  }
`}</style>

export const accent = 'var(--color-system-emphasis)';
export const darkSurface = 'var(--color-surface-200)';
export const darkBorder = 'var(--color-stroke-default)';
export const APPLY_URL = `https://survey.roblox.com/jfe/form/SV_eUNlsH28ASCx4gu`;
export const overlineStyle = { color: accent, fontWeight: 700, letterSpacing: '0.1em' };
export const h2Style = { fontSize: 32, fontWeight: 800, marginBottom: 8 };
export const blueBtn = { backgroundColor: accent, color: 'var(--color-extended-white-100)' };

{/* Material Symbols icon paths (24x24), used only as per-line-item markers in What You Get
and Who Should Apply (no section uses a card-level or title-level icon). */}
export const ICON_PATHS = {
social: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
pipeline: 'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z',
ownership: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.18 14.18L7.3 11.67l1.41-1.41 2.11 2.11 5.47-5.47 1.41 1.41-6.88 6.87z',
nocost: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
};

{/* All editable copy lives here, top to bottom. Source: "Option B - More Designed" copy doc. */}
export const DATA = {
hero: {
overline: 'ROBLOX CREATOR PROGRAMS',
title: 'Bring your existing game to Roblox',
description:
"We're working with a limited number of developers with games on mobile, PC, or console. If selected, our team will work with you to convert your game to Roblox at no cost, and you keep ownership of your game.",
cta: { label: 'Apply', href: APPLY_URL },
image: '../assets/creator-programs/convert/header-option-a.jpg',
},
stats: [
{ value: '138M', label: 'daily active users\*' },
{ value: '$1.6B', label: 'earned by creators in the last 12 months\*\*' },
{ value: '$10M', label: 'avg earned per top-100 creators in the last 12 months\*\*' },
],
footnote: "\*Q3 2026 \*\*Reflects the 12 months ended September 30, 2026 Our creator ecosystem includes many hobbyists. Of the millions of creators monetizing on Roblox, over 45,000 are part of our Devex program, with the median creator receiving over $1,500 USD during the twelve months ended September 30, 2026.",
whyApply: {
title: 'Why Bring Your Game to Roblox',
cards: [
{ image: '../assets/creator-programs/convert/why-global-audience.jpg', title: 'A large, global audience', body: 'Get your game in front of players in more than 180 countries, many of whom may never have found it on another store.' },
{ image: '../assets/creator-programs/convert/why-social-by-default.jpg', title: 'Social by default', body: 'On Roblox, people find games through their friends and play together. Depending on the game, players can play as its characters or as their own avatar.' },
{ image: '../assets/creator-programs/convert/why-scale-without-overhead.jpg', title: 'Scale without the overhead', body: 'One version of your game on the Roblox app unlocks phone, PC, and console. Roblox runs the servers, matchmaking, and payments.' },
],
},
how: {
title: 'How It Works',
intro: "Rebuilding a game for a new engine is expensive. We're building AI-assisted tools to help convert an existing game's source code and assets into a Roblox version, and we want to work directly with the developers who own those games.",
image: { src: '../assets/creator-programs/convert/how-it-works-studio-environment.jpg', alt: 'Developers working in a studio environment' },
steps: [
{ n: '01', title: 'Apply', body: 'Tell us about your game and share its store link.' },
{ n: '02', title: 'Selection', body: "We're starting with a small number of games across a range of genres and styles, and we'll email the teams we select." },
{ n: '03', title: 'Sign and share', body: "Sign the agreement, then share your source code and assets. Please be sure to omit third-party components that can't be licensed." },
{ n: '04', title: 'We work on your game', body: 'Our team works with you to convert your game every step of the way.' },
],
},
whatYouGet: {
title: 'What You Get',
intro: 'This program is for developers who want to work with us, from independent teams to established studios.',
cards: [
{ title: 'We handle the conversion work', body: 'No rewriting your game in a new engine or language.', items: [
{ icon: 'pipeline', text: 'An AI-assisted pipeline, run by Roblox, works to convert the content you provide' },
{ icon: 'social', text: 'You work directly with the Roblox team building these tools' },
] },
{ title: 'Your game stays yours', body: 'Clear terms on who owns what.', items: [
{ icon: 'ownership', text: 'You keep ownership of your game and its IP' },
{ icon: 'check', text: 'Nothing is published to Roblox unless you choose to publish it.' },
] },
{ title: 'No cost', body: 'Free to apply and take part.', items: [
{ icon: 'nocost', text: 'No fee to apply' },
{ icon: 'check', text: 'No payment in either direction under the agreement' },
] },
],
},
whoShouldApply: {
title: 'Who Should Apply',
intro: 'Your game is a good fit if you:',
items: [
'Released a game on the Apple App Store, Google Play Store, Steam, or console stores',
'Hold the appropriate rights to license and publish it',
'Have access to its full source code and assets',
'Are 18+ and authorized to sign for the game',
],
apply: {
cta: { label: 'Apply now', href: APPLY_URL },
disclaimer: "Submitting an application doesn't create an agreement. If yours is a good fit, we'll reach out by email.",
},
},
faq: {
title: 'General FAQ',
items: [
{ q: 'Does it cost anything?', a: "No. There's no payment in either direction." },
{ q: 'Who owns the game and the Roblox version?', a: 'You keep ownership of your game and its IP, and you own any Roblox version delivered to you.' },
{ q: 'Will my game be used to train AI models?', a: "No. Roblox may use AI-assisted tools within our environment to work with your code, but the code and assets you provide won't be used to train or fine-tune AI models." },
{ q: 'Do I have to publish my game on Roblox?', a: 'No. Nothing is published to Roblox unless you choose to publish it.' },
{ q: "Can I apply with a game I don't own?", a: "No. You need to hold the appropriate rights and have access to the game's full source code to apply." },
{ q: "If I'm selected, is a Roblox version guaranteed?", a: "No. We're starting with a small number of games, and some games may not convert successfully." },
{ q: 'When will I hear back?', a: "We'll email the teams we select. You don't need to do anything else after you apply." },
],
},
};

{/* MDX-injected components (Grid, Typography, Button, Card, CardContent) are only in scope inside this IIFE. */}

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

{/* Hero: photo background from the landing-page asset set, with a dark gradient scrim for text contrast. */}
const Hero = ({ overline, title, description, cta, image }) => (
<div className="cv-hero" style={{ ...mb(56), marginTop: 8 }}>
<img className="cv-hero-img" src={image} alt="" />
<div className="cv-hero-scrim" />
<div className="cv-hero-content">
<Typography component="p" variant="overline" style={overlineStyle}>{overline}</Typography>
<Typography component="div" style={{ fontSize: 'clamp(30px, 4.6vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '6px 0 16px', maxWidth: 760 }}>{title}</Typography>
<Typography component="p" variant="largeLabel1" style={{ marginBottom: 24, maxWidth: 640, color: 'var(--color-extended-white-100)', opacity: 0.85 }}>{description}</Typography>
<Button variant="contained" size="large" href={cta.href} rel="noopener" style={blueBtn}>{cta.label}</Button>
</div>
</div>
);

{/* Launch at Global Scale: three big-number stat tiles. */}
const StatBar = ({ stats }) => (
<div style={mb(72)}>
<Typography component="h2" style={{ ...h2Style, marginBottom: 24 }}>Launch at Global Scale</Typography>
<div className="cv-grid-3">
{stats.map((s, i) => (
<Card key={i} style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, padding: '22px 24px', width: '100%', ...flexCol, gap: 6 }}>
<Typography style={{ fontSize: 40, fontWeight: 800, color: 'var(--color-content-emphasis)', lineHeight: 1 }}>{s.value}</Typography>
<Typography variant="smallLabel1" style={{ color: 'var(--color-content-default)', fontWeight: 600 }}>{s.label}</Typography>
</Card>
))}
</div>
</div>
);

const WhyApply = ({ title, cards }) => (
<div style={mb(72)}>
<SectionHeader title={title} />
<div className="cv-grid-3">
{cards.map((c, i) => (
<Card key={i} style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, overflow: 'hidden', width: '100%', ...flexCol }}>
{c.image && <img className="cv-why-card-img" src={c.image} alt="" />}
<div style={{ padding: '20px 24px 28px', ...flexCol, gap: 10 }}>
<Typography variant="h5">{c.title}</Typography>
<Typography variant="smallLabel1" color="secondary">{c.body}</Typography>
</div>
</Card>
))}
</div>
</div>
);

{/* How It Works: a framed studio photo beside a vertical numbered step list with a left-edge rule. */}
const HowItWorks = ({ title, intro, image, steps }) => (
<div style={mb(72)}>
<SectionHeader title={title} description={intro} />
<div className="cv-grid-how">
<div>
{image && (
<div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${darkBorder}` }}>
<img className="cv-how-img" src={image.src} alt={image.alt} style={{ borderRadius: 0 }} />
</div>
)}
</div>
<div style={{ borderLeft: `1px solid ${darkBorder}`, ...flexCol, gap: 28 }}>
{steps.map((s, i) => (
<div key={i} style={{ paddingLeft: 24 }}>
<Typography component="p" style={{ fontSize: 17 }}>
<Typography component="span" style={{ color: 'var(--color-content-muted)', fontWeight: 600 }}>{s.n}</Typography>
{' '}
<Typography component="span" style={{ fontWeight: 700 }}>{s.title}</Typography>
</Typography>
<Typography component="p" variant="smallLabel1" color="secondary" style={{ marginTop: 4 }}>{s.body}</Typography>
</div>
))}
</div>
</div>
</div>
);

{/* What You Get: three cards, each with a sub-bullet list. */}
const WhatYouGet = ({ title, intro, cards }) => (
<div style={mb(72)}>
<SectionHeader title={title} description={intro} />
<div className="cv-grid-3">
{cards.map((c, i) => (
<Card key={i} style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, padding: '24px 24px 28px', width: '100%', ...flexCol, gap: 10 }}>
<Typography variant="h5">{c.title}</Typography>
<Typography variant="smallLabel1" color="secondary">{c.body}</Typography>
<div style={{ marginTop: 4, ...flexCol, gap: 10 }}>
{c.items.map((it, ii) => (
<div key={ii} className="cv-item-icon-row">
<span style={{ flexShrink: 0, marginTop: 1 }}><Icon path={ICON_PATHS[it.icon]} size={18} /></span>
<Typography component="span" variant="smallLabel1" color="secondary">{it.text}</Typography>
</div>
))}
</div>
</Card>
))}
</div>
</div>
);

{/* Who Should Apply: eligibility checklist on the left, apply card on the right. */}
const WhoShouldApply = ({ title, intro, items, apply }) => (
<div style={mb(72)}>
<Typography component="h2" style={h2Style}>{title}</Typography>
<Card style={{ background: darkSurface, border: `1px solid ${darkBorder}`, borderRadius: 14, padding: 28 }}>
<div className="cv-grid-apply">
<div>
<Typography component="p" variant="largeLabel1" style={{ marginBottom: 16, fontWeight: 600 }}>{intro}</Typography>
<div className="cv-apply-checklist">
{items.map((it, i) => (
<div key={i} className="cv-item-icon-row">
<span style={{ flexShrink: 0, marginTop: 1 }}><Icon path={ICON_PATHS.check} size={20} /></span>
<Typography variant="smallLabel1">{it}</Typography>
</div>
))}
</div>
</div>
<div style={{ ...flexCol, gap: 10 }}>
<Button variant="contained" size="large" href={apply.cta.href} rel="noopener" style={blueBtn}>{apply.cta.label}</Button>
<Typography variant="caption" color="secondary">{apply.disclaimer}</Typography>
</div>
</div>
</Card>
</div>
);

const FAQ = ({ title, items }) => (
<div style={mb(16)}>
<SectionHeader title={title} />
<div style={{ border: `1px solid ${darkBorder}`, borderRadius: 14, overflow: 'hidden' }}>
{items.map((item, i) => (
<div key={i} className="cv-acc-item">
<button type="button" className="cv-acc-header" onClick={(e) => e.currentTarget.closest('.cv-acc-item')?.classList.toggle('open')}>
<Typography component="span" variant="largeLabel1" style={{ fontWeight: 600 }}>{item.q}</Typography>
<span className="cv-acc-caret">▸</span>
</button>
<div className="cv-acc-panel">
<div className="cv-acc-panel-inner">
<Typography component="p" variant="smallLabel1" color="secondary">{item.a}</Typography>
</div>
</div>
</div>
))}
</div>
</div>
);

const Footnote = ({ text }) => (
<Typography component="p" variant="caption" color="secondary" style={{ marginTop: 40 }}>{text}</Typography>
);

return (<>
<Hero {...DATA.hero} />
<StatBar stats={DATA.stats} />
<WhyApply {...DATA.whyApply} />
<HowItWorks {...DATA.how} />
<WhatYouGet {...DATA.whatYouGet} />
<WhoShouldApply {...DATA.whoShouldApply} />
<FAQ {...DATA.faq} />
<Footnote text={DATA.footnote} />
</>);
})()}
