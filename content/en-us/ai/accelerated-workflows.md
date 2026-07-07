---
title: AI on Roblox
description: Learn how to accelerate your creation workflows with AI.
hideInPageNavigation: true
---


<style>{`
  main h1 { display: none !important; }
  /* Inline code (<code>) renders as the site's InlineCode at a fixed 16px,
     which looks oversized inside the smaller card/section copy. Scale it to the
     surrounding text instead. 'main .inline-code' outranks the component class. */
  main .inline-code { font-size: 0.9em; }
  .tile-link {
    display: block;
    text-decoration: none;
    color: inherit;
    border-radius: 14px;
    transition: box-shadow 200ms ease;
  }
  .tile-link:hover {
    box-shadow: 0 4px 14px rgba(77,124,255,0.12);
    text-decoration: none;
    color: inherit;
  }
  .media-tile {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .media-tile .yt-tile { border-radius: 16px 16px 0 0; }
  .yt-tile {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
    border-radius: 14px;
    background: var(--color-surface-0);
    border: 1px solid var(--color-stroke-default);
    transition: border-color 180ms ease;
    cursor: pointer;
    font: inherit;
    color: inherit;
    text-align: left;
  }
  .yt-tile:hover { border-color: var(--color-system-emphasis); }
  .yt-tile .yt-thumb {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.95);
    transform: scale(1);
    transition: transform 400ms ease, filter 200ms ease;
  }
  .yt-tile:hover .yt-thumb {
    transform: scale(1.04);
    filter: brightness(0.85);
  }
  .yt-tile .yt-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%);
    pointer-events: none;
  }
  .yt-tile .yt-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(255,255,255,0.95);
    box-shadow: 0 4px 14px rgba(0,0,0,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
  }
  .yt-tile:hover .yt-play {
    transform: translate(-50%, -50%) scale(1.08);
    background: var(--color-system-emphasis);
    box-shadow: 0 8px 28px rgba(77,124,255,0.55);
  }
  .yt-tile .yt-triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 16px solid #0d1530;
    margin-left: 4px;
    transition: border-left-color 200ms ease;
  }
  .yt-tile:hover .yt-triangle { border-left-color: #fff; }
  .yt-tile.yt-tile-plain,
  .yt-tile.yt-tile-plain:hover {
    border-color: var(--color-stroke-default);
  }
  .yt-tile.yt-tile-plain .yt-thumb,
  .yt-tile.yt-tile-plain:hover .yt-thumb {
    transform: none;
    filter: brightness(0.95);
    transition: none;
  }
  .yt-tile.yt-tile-plain .yt-play {
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 180ms ease;
    pointer-events: none;
  }
  .yt-tile.yt-tile-plain:hover .yt-play,
  .yt-tile.yt-tile-plain:focus-visible .yt-play {
    opacity: 1;
    transform: translate(-50%, -50%);
    background: rgba(255,255,255,0.95);
    box-shadow: 0 4px 14px rgba(0,0,0,0.35);
  }
  .yt-tile.yt-tile-plain .yt-triangle,
  .yt-tile.yt-tile-plain:hover .yt-triangle,
  .yt-tile.yt-tile-plain:focus-visible .yt-triangle {
    border-left-color: #0d1530;
    transition: none;
  }
  .yt-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4vh 4vw;
    animation: yt-fade-in 180ms ease;
  }
  .yt-modal-backdrop {
    position: absolute;
    inset: 0;
    background: var(--color-common-scrim);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    cursor: pointer;
    border: 0;
    padding: 0;
  }
  .yt-modal-frame {
    position: relative;
    width: 100%;
    max-width: 1200px;
    aspect-ratio: 16/9;
    border-radius: 14px;
    overflow: hidden;
    background: #000;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,124,255,0.2);
  }
  .yt-modal-frame iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
  .yt-modal-close {
    position: absolute;
    top: -44px;
    right: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    font-size: 20px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 180ms ease;
    padding: 0;
  }
  .yt-modal-close:hover { background: rgba(255,255,255,0.2); }
  @keyframes yt-fade-in { from { opacity: 0; } to { opacity: 1; } }
`}</style>

export const accent = 'var(--color-system-emphasis)';
export const darkSurface = 'var(--color-surface-200)';
export const darkBorder = 'var(--color-stroke-default)';
// Scrim sits over media, so it stays dark in both themes.
export const scrimGradient =
  'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)';
export const tileBg = 'var(--color-surface-0)';
export const overlineStyle = {
  color: accent,
  fontWeight: 700,
  letterSpacing: '0.1em',
};
export const h2Style = { fontSize: 32, fontWeight: 800, marginBottom: 16 };
export const learnMoreText = 'Learn more';

export const openYouTubeModal = (id) => {
  const m = document.getElementById(`yt-modal-${id}`);
  const f = document.getElementById(`yt-iframe-${id}`);
  if (f) {
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  }
  if (m) m.style.display = 'flex';
};
export const closeYouTubeModal = (id) => {
  const m = document.getElementById(`yt-modal-${id}`);
  const f = document.getElementById(`yt-iframe-${id}`);
  if (f) f.src = 'about:blank';
  if (m) m.style.display = 'none';
};

{/* YouTube thumbnails need two things to load in deployed builds:
    1. Host must be img.youtube.com, not i.ytimg.com — the site's CSP img-src
       allowlists img.youtube.com and blocks i.ytimg.com.
    2. RawImg renders a real <img>. A plain <img> in MDX is aliased to the site's
       MarkdownImage, which appends ".webp" to the src when connectsRemoteServer
       is set; that 404s for YouTube (no .jpg.webp). Keep plain <img> for local
       /assets elsewhere, which rely on MarkdownImage's path + .webp handling. */}
export const RawImg = 'img';

export const YouTubeEmbed = ({ id, title = 'YouTube video player', noHover = false }) => (
  <>
    <button
      type="button"
      className={`yt-tile${noHover ? ' yt-tile-plain' : ''}`}
      aria-label={title}
      onClick={() => openYouTubeModal(id)}
    >
      <RawImg
        className="yt-thumb"
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
        loading="lazy"
      />
      <div className="yt-scrim" />
      <div className="yt-play">
        <div className="yt-triangle" />
      </div>
    </button>
    <div
      id={`yt-modal-${id}`}
      className="yt-modal"
      role="dialog"
      aria-label={title}
      aria-modal="true"
      style={{ display: 'none' }}
    >
      <button
        type="button"
        className="yt-modal-backdrop"
        aria-label="Close video"
        onClick={() => closeYouTubeModal(id)}
      />
      <div className="yt-modal-frame">
        <button
          type="button"
          className="yt-modal-close"
          aria-label="Close video"
          onClick={() => closeYouTubeModal(id)}
        >
          ×
        </button>
        <iframe
          id={`yt-iframe-${id}`}
          src="about:blank"
          title={title}
          allow={
            'accelerometer; autoplay; clipboard-write; encrypted-media; ' +
            'gyroscope; picture-in-picture; web-share'
          }
          allowFullScreen
        />
      </div>
    </div>
  </>
);

export const linkCardStyles = {
  default: {
    borderRadius: 12,
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  dark: {
    background: darkSurface,
    border: `1px solid ${darkBorder}`,
    borderRadius: 14,
    height: '100%',
    padding: '20px 22px 24px',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    borderRadius: 16,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    WebkitMaskImage: 'none',
  },
};

{/* Edit landing page copy below. Step detail: **bold** and [links](url). */}

export const LANDING_PAGE_DATA = {
  pageSections: {
    hero: {
      overline: 'AI on Roblox',
      title: 'From ideas to published games, faster than ever',
      description: 'Move faster with tools that help you script, build, and generate assets, while having full control over creative decisions.',
      ctas: [
        {
          label: 'Download Studio',
          href: 'https://www.roblox.com/download/studio',
          rel: 'noopener',
          variant: 'contained',
          color: 'primary',
          size: 'large'
        },
        {
          label: 'See how to create',
          variant: 'outlined',
          size: 'large',
          href: '#watch-and-learn'
        }
      ],
      flows: [
        {
          id: 'harness',
          label: 'Bring your own client',
          steps: [
            {
              num: '1',
              title: 'Enable AI features',
              subtitle: 'Enable MCP and AI features in Studio.',
              detail: `Open **Assistant** → **…** → **Manage MCP Servers** and switch on the **Enable Studio as MCP server** toggle.

Open **File → Beta Features** and turn on the features you want. Features that are generally available are always available by default.`
            },
            {
              num: '2',
              title: 'Connect your client',
              subtitle: 'Let your MCP-enabled tools interact with Studio.',
              detail: 'Point your MCP-aware client at the Studio [MCP server](../studio/mcp.md#connect-your-client). When connected, your client can read the data model, create and run scripts, edit instances, playtest, and more.'
            },
            {
              num: '3',
              title: 'Build your first game',
              subtitle: 'Plan and build your first game using your favorite coding harness.',
              detail: 'Download the starter project that contains LLM-friendly markdown files for context and have your first game ready in minutes.'
            },
            {
              num: '4',
              title: 'Customize your setup',
              subtitle: 'Build with community and professional tools.',
              detail: 'With [Rojo and Git](../projects/external-tools.md), you can build and version control your Roblox projects via the file system. Use [tools](../art/overview-dcc.md) like Blender and other DCC apps to round out your creation workflow.'
            }
          ]
        },
        {
          id: 'studio',
          label: 'Roblox Studio',
          steps: [
            {
              num: '1',
              title: 'Enable AI features',
              subtitle: 'We\'re always adding new beta features, so make sure they\'re enabled.',
              detail: 'Open **File → Beta Features** and turn on the features you want. Features that are generally available are always available by default.'
            },
            {
              num: '2',
              title: 'Prompt the Assistant',
              subtitle: 'Describe what you want in the Assistant panel.',
              detail: 'Tell Assistant to build 3D objects, write and run Luau, generate meshes and materials, and playtest alongside you.'
            },
            {
              num: '3',
              title: 'Build your first game',
              subtitle: 'Learn core concepts and build an obby with the Assistant.',
              detail: 'Our [core curriculum](../tutorials/curriculums/core/index.md) teaches you the basics of building, scripting, and polishing an obby game using the Assistant as your trusted companion.'
            },
            {
              num: '4',
              title: 'Customize your setup',
              subtitle: 'Bring your own API keys to use the model you prefer.',
              detail: 'Open **Assistant** → **…** → **Manage API Keys** to configure your preferred model from Anthropic, OpenAI, or Google.'
            }
          ]
        }
      ]
    },
    creation3d: {
      overline: '3D and AVATAR CREATION',
      title: 'Generate 3D content from a phrase',
      description: 'Turn a text prompt into a wide array of 3D content that you can drop right into Studio.',
      grids: [
        {
          hero: {
            href: '/parts/procedural-models',
            title: 'Procedural models',
            description: 'Generate 3D models that automatically adjust to customizable attributes you define.',
            media: {
              src: '/assets/ai-landing/procedural_model_gen.gif',
              alt: 'Procedural models'
            }
          },
          tiles: [
            {
              title: 'Interactive 3D models',
              description: 'Through text prompts and preset schemas, let your players generate both interactive 3D models in your game, such as vehicles that drive, planes that fly, and weapons that shoot.',
              href: '/parts/model-generation',
              media: {
                src: '/assets/modeling/model-generation/Green-Dragon-Car.jpg'
              }
            },
            {
              title: 'Avatar Auto-Setup',
              description: 'Automatically rigs, cages, and segments 3D models into fully functional, animatable Roblox avatars.',
              href: '/avatar-setup/auto-setup',
              media: {
                src: '/assets/art/resources/Archer-Girl-Preview.png',
                objectPosition: 'top'
              }
            }
          ]
        },
        {
          layout: 'threeUp',
          cards: [
            {
              href: '/assistant/guide#generate-meshes',
              title: 'Mesh generation',
              description: 'Describe what you need in Assistant or with an MCP command and get a textured <code>MeshPart</code>.',
              media: {
                src: '/assets/ai-landing/mesh-gen.jpg',
                alt: 'Mesh generation'
              }
            },
            {
              title: 'Material generator',
              description: 'Seamless, tiling 2D images that can be saved as <code>MaterialVariants</code>, ideal for large surfaces like terrain, floors, and walls.',
              href: '/studio/material-generator',
              media: {
                src: '/assets/ai-landing/material-generator.png'
              }
            },
            {
              title: 'Texture generator',
              description: 'Smart, context-aware textures that understand the geometry of your mesh to apply realistic patterns and wear.',
              href: '/studio/texture-generator',
              media: {
                src: '/assets/ai-landing/texture-gen.png'
              }
            }
          ]
        }
      ]
    },
    naturalLanguage: {
      overline: 'NATURAL LANGUAGE APIs',
      title: 'Process text and speech in real time',
      description: 'Bridge the gap between text and voice, enabling more immersive social interactions and dynamic storytelling.',
      cardColumns: 4,
      cards: [
        {
          title: 'Text-to-speech',
          description: 'Turn written text into spoken audio at runtime with <code>AudioTextToSpeech</code>, whether for narration, UI prompts, or giving your characters a voice.',
          href: '/tutorials/use-case-tutorials/audio/add-text-to-speech'
        },
        {
          title: 'Speech-to-text',
          description: 'Capture what players say through their microphone and turn it into text for voice commands, chat, or captions.',
          href: '/tutorials/use-case-tutorials/audio/speech-to-text'
        },
        {
          title: 'Text generation',
          description: 'Use large language models (LLMs) to power dynamic NPC dialogue. All generated text must be processed through the <code>TextService:FilterStringAsync()</code> method.',
          href: '/reference/engine/classes/TextGenerator'
        }
      ]
    },
    development: {
      overline: 'DEVELOPMENT ASSISTANCE',
      title: 'Develop faster with coding and debugging tools',
      description: 'Keep your momentum while you code. These tools meet you wherever you work, from quick help in the script editor to an agent you can drive from your own editor.',
      cardColumns: 4,
      gridStyle: {
        marginBottom: 56
      },
      cards: [
        {
          title: 'Code Assist',
          description: 'Get real-time code completions with suggestions based on the context of your script and comments.',
          href: '/studio/script-editor',
          media: {
            src: '/assets/studio/script-editor/Code-Assist.mp4',
            objectFit: 'contain'
          },
          isVideo: true
        },
        {
          title: 'Assistant',
          description: 'A conversational partner in Roblox Studio that can run and write code, generate materials, meshes, and models, simulate virtual inputs, and playtest your game.',
          href: '/assistant/guide',
          media: '/assets/ai-landing/assistant-planning-mode.png'
        },
        {
          title: 'Studio MCP server',
          description: 'Connect any MCP client to your open Studio session, then read, edit, and playtest your place from wherever you work.',
          href: '/studio/mcp',
          media: '/assets/ai-landing/mcp-server.png'
        }
      ]
    },
    watchAndLearn: {
      overline: 'Watch and Learn',
      title: 'See how to accelerate your creation workflows',
      description: 'Follow along with resources from the Roblox team that show how to set up AI workflows and recently released features.',
      featureTile: {
        youtubeId: 'v8r1d80DxOY',
        youtubeTitle: 'AI-assisted Studio workflow'
      },
      secondaryTiles: [
        {
          youtubeId: 'XsY8xhluuZM',
          youtubeTitle: 'Feature walkthrough'
        },
        {
          youtubeId: 'ZlXA6QwJrHM',
          youtubeTitle: 'Creator workflow demo'
        }
      ]
    },
    policies: {
      overline: 'Policies and guidelines',
      title: 'We value your safety and privacy',
      description: 'Roblox\'s AI tools are built with creator trust in mind. You remain in control of how your work and data are used, and every generation runs through the same moderation and [Community Standards](https://about.roblox.com/community-standards) that apply to the rest of the platform. Review the guidelines below to understand your responsibilities as a creator and to configure how your assets contribute to model training.',
      cardColumns: 6,
      cardVariant: 'dark',
      cards: [
        {
          title: 'Safety best practices',
          description: 'Generative AI accelerates creation, but you are responsible for the content generated within your games. Follow these guidelines to stay compliant with Roblox Community Standards.',
          href: '/generative-AI'
        },
        {
          title: 'Data and privacy',
          description: 'Roblox is committed to transparency about how creator data is used for AI training. Manage your data sharing preferences on Creator Hub.',
          href: '/ai-data-sharing'
        }
      ]
    }
  }
};

{/* MDX-injected components (Grid, Typography, Link, …) are only in scope inside this IIFE. */}

{(() => {
const flexCol = { display: 'flex', flexDirection: 'column' };
const cardPad = { padding: '20px 22px 24px', flex: 1, ...flexCol };
const mb96 = { marginBottom: 96 };
const mediaSrc = (m) => (typeof m === 'string' ? m : m?.src);
const mediaAlt = (m, fallback) => (typeof m === 'object' && m?.alt) || fallback;
const mediaObjectPosition = (m) =>
  (typeof m === 'object' && m?.objectPosition) || 'center';
const mediaObjectFit = (m) => (typeof m === 'object' && m?.objectFit) || 'cover';
const monoNum = {
  fontFamily: "'Builder Mono', monospace",
  fontSize: 12,
  fontWeight: 700,
  color: accent,
};
const heroTitleStyle = {
  fontSize: 48,
  fontWeight: 800,
  letterSpacing: '-0.03em',
  lineHeight: 1.0,
  margin: '6px 0 20px',
};
const coverImg = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const pageSections = LANDING_PAGE_DATA.pageSections;

// Inline formatting for YAML copy: **bold**, inline code, and [text](href).
// Inline code renders via the site's InlineCode component (the intrinsic <code>
// is aliased to it), so its appearance is controlled by the 'main .inline-code'
// rule in the <style> block above, not here. Two ways to write inline code:
//   - <code>MeshPart</code>   preferred here: the YAML is a `...` template
//                             literal, and <code> needs no escaping.
//   - escaped backticks       a raw backtick ends the template literal, so it
//                             must be written as \` ... \` if you prefer them.
const renderInline = (s, keyPrefix = 'i') => {
  if (s == null) return s;
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|<code>[^<]+<\/code>|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) parts.push(s.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      parts.push(<strong key={`${keyPrefix}-b${i++}`}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      parts.push(<code key={`${keyPrefix}-c${i++}`}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith('<code>')) {
      parts.push(<code key={`${keyPrefix}-c${i++}`}>{tok.slice(6, -7)}</code>);
    } else {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (lm) parts.push(<Link key={`${keyPrefix}-l${i++}`} href={lm[2]}>{lm[1]}</Link>);
    }
    last = m.index + tok.length;
  }
  if (last < s.length) parts.push(s.slice(last));
  return parts.length ? parts : s;
};

const detailFromMd = (text) => {
  if (!text) return null;
  return text.trim().split(/\n\n+/).map((para, pi) => (
    <Typography
      key={pi}
      component="p"
      variant="smallLabel1"
      color="secondary"
      style={{ margin: pi ? '0.75em 0 0' : 0 }}
    >
      {renderInline(para.replace(/\n/g, ' '), `p${pi}`)}
    </Typography>
  ));
};

const setFlowTab = (flows, activeId) => flows.forEach((f) => {
  document.getElementById(`flow-tab-${f.id}`)?.classList.toggle('active', f.id === activeId);
  document.getElementById(`flow-panel-${f.id}`)?.classList.toggle('active', f.id === activeId);
});

const CtaRow = ({ ctas }) => !ctas?.length ? null : (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
    {ctas.map((cta, i) => (
      <Button
        key={i}
        variant={cta.variant || 'contained'}
        color={cta.color || 'primary'}
        size={cta.size || 'large'}
        href={cta.href}
        rel={cta.rel}
        onClick={
          cta.onClick ||
          (cta.youtubeId ? () => openYouTubeModal(cta.youtubeId) : undefined)
        }
      >
        {cta.label}
      </Button>
    ))}
  </div>
);

const heroStepsCss = `
.acc-item {
    background: var(--color-surface-100);
    border-bottom: 1px solid var(--color-stroke-default);
  }
  .acc-item:last-child { border-bottom: 0; }
  .acc-header {
    width: 100%;
    border: 0;
    background: transparent;
    text-align: left;
    padding: 16px 20px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 36px 1fr auto;
    gap: 12px;
    align-items: center;
    font: inherit;
    color: inherit;
  }
  .acc-header:hover { background: var(--color-state-hover); }
  .acc-caret {
    color: var(--color-content-muted);
    font-size: 14px;
    transition: transform 200ms ease, color 200ms ease;
    display: inline-block;
  }
  .acc-item.open .acc-caret { transform: rotate(90deg); color: var(--color-system-emphasis); }
  .acc-panel { max-height: 0; overflow: hidden; transition: max-height 280ms ease; }
  .acc-item.open .acc-panel { max-height: 400px; }
  .acc-panel-inner {
    padding: 0 20px 18px 68px;
    line-height: 1.6;
  }
  .acc-panel-inner a { color: var(--color-content-link); }
  .acc-panel-inner code {
    background: var(--color-shift-300);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Builder Mono', monospace;
    font-size: 12px;
    color: var(--color-content-default);
  }
  .flow-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
  .flow-tab {
    flex: 1;
    border: 1px solid var(--color-stroke-default);
    background: transparent;
    color: var(--color-content-muted);
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .flow-tab:hover { color: var(--color-content-emphasis); border-color: var(--color-stroke-emphasis); }
  .flow-tab.active {
    background: var(--color-action-soft-emphasis-background);
    border-color: var(--color-system-emphasis);
    color: var(--color-content-emphasis);
  }
  .flow-panel { display: none; }
  .flow-panel.active { display: block; }
`;

const heroGridStyle = { padding: '64px 0', marginBottom: 24, marginTop: -96 };
const stepTitleStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--color-content-emphasis)',
  marginBottom: 2,
};
const stepSubtitleStyle = { color: 'var(--color-content-muted)', display: 'block' };

const HeroWithSteps = ({ overline, title, description, ctas, flows }) => (
  <Grid container spacing={6} alignItems="center" style={heroGridStyle}>
    <Grid item XSmall={12} Medium={6}>
      <Typography variant="overline" style={overlineStyle}>{overline}</Typography>
      <div style={heroTitleStyle}>{title}</div>
      <Typography
        component="p"
        variant="largeLabel1"
        color="secondary"
        style={{ marginBottom: 24 }}
      >
        {renderInline(description, 'hs')}
      </Typography>
      <CtaRow ctas={ctas} />
    </Grid>
    <Grid item XSmall={12} Medium={6}>
      <style>{heroStepsCss}</style>
      <div className="flow-tabs">
        {flows.map((flow, i) => (
          <button
            key={flow.id}
            type="button"
            id={`flow-tab-${flow.id}`}
            className={`flow-tab${i === 0 ? ' active' : ''}`}
            onClick={() => setFlowTab(flows, flow.id)}
          >
            {flow.label}
          </button>
        ))}
      </div>
      {flows.map((flow, fi) => (
        <div
          key={flow.id}
          id={`flow-panel-${flow.id}`}
          className={`flow-panel${fi === 0 ? ' active' : ''}`}
        >
          <div style={{ border: `1px solid ${darkBorder}`, borderRadius: 14, overflow: 'hidden' }}>
            {flow.steps.map((step, i) => (
              <div key={i} id={`acc-item-${flow.id}-${i}`} className="acc-item">
                <button
                  type="button"
                  className="acc-header"
                  onClick={(e) =>
                    e.currentTarget.closest('.acc-item')?.classList.toggle('open')
                  }
                >
                  <Typography style={monoNum}>{step.num}</Typography>
                  <div>
                    <Typography component="div" style={stepTitleStyle}>
                      {step.title}
                    </Typography>
                    <Typography component="div" variant="caption" style={stepSubtitleStyle}>
                      {step.subtitle}
                    </Typography>
                  </div>
                  <span className="acc-caret">▸</span>
                </button>
                <div className="acc-panel">
                  <div className="acc-panel-inner">{detailFromMd(step.detail)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Grid>
  </Grid>
);

const SectionHeader = ({ overline, title, description }) => (
  <div style={{ marginBottom: 24 }}>
    <Typography component="p" variant="overline" style={overlineStyle}>{overline}</Typography>
    <Typography component="h2" style={h2Style}>{title}</Typography>
    <Typography component="p" variant="body1" color="secondary">{renderInline(description, 'sh')}</Typography>
  </div>
);

const heroTileStyle = {
  position: 'relative',
  borderRadius: 14,
  overflow: 'hidden',
  width: '100%',
  aspectRatio: '24/9',
  background: tileBg,
};
const heroOverlayStyle = { position: 'absolute', left: 24, right: 24, bottom: 24, zIndex: 2 };
const heroDescStyle = { maxWidth: '70%' };

const HeroSection = ({ title, description, media, href, ctas }) => {
  const src = mediaSrc(media);
  const hasCtas = Boolean(ctas?.length);
  const inner = (
    <div style={heroTileStyle}>
      {src && <img src={src} alt={mediaAlt(media, title)} style={coverImg} />}
      <div style={{ position: 'absolute', inset: 0, background: scrimGradient }} />
      <div style={heroOverlayStyle}>
        {title && (
          <Typography variant="h4" style={{ color: 'var(--color-extended-white-100)' }}>
            {title}
          </Typography>
        )}
        <br/>
        {description && (
          <Typography
            variant="body1"
            style={{
              ...heroDescStyle,
              color: 'var(--color-extended-white-70)',
              marginBottom: hasCtas ? 16 : 0,
            }}
          >
            {description}
          </Typography>
        )}
        <CtaRow ctas={ctas} />
      </div>
    </div>
  );
  const wrap = { marginBottom: 16 };
  if (href && !hasCtas) {
    return (
      <a href={href} className="tile-link" style={wrap}>
        {inner}
      </a>
    );
  }
  return <div style={wrap}>{inner}</div>;
};

const linkCardMediaFill = { flex: 1, minHeight: 0 };
const linkCardMediaBox = { aspectRatio: '16/9' };

const LinkCardMedia = ({ media, isVideo, alt, fill }) => {
  const src = mediaSrc(media);
  const video = isVideo ?? (typeof media === 'object' && media?.isVideo);
  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: mediaObjectFit(media),
    objectPosition: mediaObjectPosition(media),
    display: 'block',
    ...(fill ? { position: 'absolute', inset: 0 } : {}),
  };
  const wrapStyle = {
    width: '100%',
    background: 'var(--color-surface-0)',
    position: 'relative',
    overflow: 'hidden',
    ...(fill ? linkCardMediaFill : linkCardMediaBox),
  };
  return (
    <div style={wrapStyle}>
      {video ? (
        <video src={src} autoPlay loop muted playsInline style={mediaStyle} />
      ) : (
        <img src={src} alt={alt} style={mediaStyle} />
      )}
    </div>
  );
};

const linkCardTitleMb = { marginBottom: 4 };

const LinkCardBody = ({ card, showLearnMore = true, titleVariant = 'h5' }) => (
  <div style={{ ...flexCol, flex: 1, height: '100%' }}>
    <Typography variant={titleVariant} style={linkCardTitleMb}>
      {card.title}
    </Typography>
    <Typography variant="smallLabel1" color="secondary" style={{ flex: 1 }}>
      {renderInline(card.description, 'lc')}
    </Typography>
    {showLearnMore && card.href && (
      <div style={{ marginTop: 'auto', paddingTop: 16 }}>
        <a underline="none" href={card.href}>
          <Button variant="contained" color="secondary" size="large">
            {learnMoreText}
          </Button>
        </a>
      </div>
    )}
  </div>
);

const MediaTile = ({
  href,
  media,
  youtubeId,
  youtubeTitle,
  title,
  description,
  fillCell = false,
  contentHeight = false,
  titleVariant = 'h4',
  noHover = false,
}) => {
  const hasBody = Boolean(title || description);
  const src = mediaSrc(media);
  const ytTitle = youtubeTitle || title || 'YouTube video';
  if (youtubeId && !hasBody && !href) {
    return <YouTubeEmbed id={youtubeId} title={ytTitle} noHover={noHover} />;
  }
  const card = { title, description, href };
  const isVideoMedia = typeof media === 'object' && media?.isVideo;
  const cardInner = (
    <Card
      style={{
        ...linkCardStyles.media,
        ...(fillCell ? { height: '100%', flex: 1, minHeight: 0 } : {}),
      }}
    >
      {youtubeId && (
        <div style={fillCell ? { flex: 1, minHeight: 0, ...flexCol } : undefined}>
          <YouTubeEmbed id={youtubeId} title={ytTitle} noHover={noHover} />
        </div>
      )}
      {!youtubeId && src && (
        <LinkCardMedia
          media={media}
          isVideo={isVideoMedia}
          alt={mediaAlt(media, title)}
          fill={fillCell}
        />
      )}
      {hasBody && (
        <CardContent style={cardPad}>
          <LinkCardBody card={card} showLearnMore={false} titleVariant={titleVariant} />
        </CardContent>
      )}
    </Card>
  );
  const tileStyle = contentHeight
    ? { height: 'auto' }
    : fillCell
      ? {
          height: '100%',
          width: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }
      : undefined;
  if (href) {
    return (
      <a href={href} className="tile-link media-tile" style={tileStyle}>
        {cardInner}
      </a>
    );
  }
  return (
    <div className="media-tile" style={tileStyle}>
      {cardInner}
    </div>
  );
};

const splitGridAlign = (stretch) => ({ alignItems: stretch ? 'stretch' : 'center' });
const featureColStyle = (stretch) => ({
  display: 'flex',
  alignItems: stretch ? 'stretch' : 'center',
  width: '100%',
});

const ThreeUpRow = ({ cards, spacing = 2 }) => (
  <Grid container spacing={spacing} style={{ alignItems: 'stretch' }}>
    {cards.map((tile, i) => (
      <Grid item XSmall={12} Medium={4} key={i} style={{ display: 'flex' }}>
        <MediaTile {...tile} titleVariant="h6" />
      </Grid>
    ))}
  </Grid>
);

const HeroWithTileRow = ({ hero, tiles, spacing = 2 }) => (
  <>
    <HeroSection {...hero} />
    <Grid container spacing={spacing} style={{ alignItems: 'stretch' }}>
      {tiles.map((tile, i) => (
        <Grid item XSmall={12} Small={6} key={i} style={{ display: 'flex' }}>
          <MediaTile {...tile} titleVariant="h6" />
        </Grid>
      ))}
    </Grid>
  </>
);

const SplitFeatureGrid = ({
  feature,
  tiles,
  spacing = 2,
  stretchFeature = false,
  noHover = false,
  stackSecondaryTiles = false,
  featureMedium = 6,
  secondaryMedium = 6,
}) => (
  <Grid container spacing={spacing} style={splitGridAlign(stretchFeature)}>
    <Grid item XSmall={12} Medium={featureMedium} style={featureColStyle(stretchFeature)}>
      <MediaTile
        {...feature}
        fillCell={stretchFeature}
        contentHeight={!stretchFeature}
        noHover={noHover}
      />
    </Grid>
    <Grid item XSmall={12} Medium={secondaryMedium}>
      <Grid container spacing={spacing} style={{ alignItems: 'stretch' }}>
        {tiles.map((tile, i) => (
          <Grid
            item
            XSmall={12}
            Small={stackSecondaryTiles ? 12 : 6}
            key={i}
            style={{ display: 'flex' }}
          >
            <MediaTile {...tile} titleVariant="h6" noHover={noHover} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const LinkCardSection = ({
  overline,
  title,
  description,
  cards,
  cardColumns = 4,
  cardVariant = 'default',
  gridStyle,
}) => (
  <div style={mb96}>
    <SectionHeader overline={overline} title={title} description={description} />
    <Grid container spacing={3} style={{ alignItems: 'stretch', ...gridStyle }}>
      {cards.map((card, i) => {
        const hasMedia = Boolean(card.media);
        const body = <LinkCardBody card={card} />;
        const cardStyle = linkCardStyles[hasMedia ? 'media' : cardVariant];
        return (
          <Grid item XSmall={12} Medium={cardColumns} key={i} style={{ display: 'flex' }}>
            <Card style={cardStyle}>
              {hasMedia && (
                <LinkCardMedia
                  media={card.media}
                  isVideo={card.isVideo}
                  alt={card.title}
                />
              )}
              {hasMedia ? <CardContent style={cardPad}>{body}</CardContent> : body}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  </div>
);

const s = pageSections;
return (<>
  <HeroWithSteps {...s.hero} />
  <div style={{ ...mb96 }} id="watch-and-learn">
    <SectionHeader {...s.watchAndLearn} />
    <SplitFeatureGrid
      feature={s.watchAndLearn.featureTile}
      tiles={s.watchAndLearn.secondaryTiles}
      noHover
      stackSecondaryTiles
      featureMedium={8}
      secondaryMedium={4}
    />
    <div style={{ marginTop: 24 }}>
      <CtaRow
        ctas={[
          {
            label: 'Build with a coding harness',
            href: './build.md',
          },
          {
            label: 'Build with the Assistant in Studio',
            href: '../tutorials/curriculums/core/index.md',
            rel: 'noopener',
            variant: 'outlined',
          },
        ]}
      />
    </div>
  </div>
  <div style={mb96}>
    <SectionHeader {...s.creation3d} />
    {s.creation3d.grids.map((grid, i) => (
      <div key={i} style={{ marginBottom: i < s.creation3d.grids.length - 1 ? 32 : 0 }}>
        {grid.layout === 'threeUp' ? (
          <ThreeUpRow cards={grid.cards} />
        ) : (
          <HeroWithTileRow hero={grid.hero} tiles={grid.tiles} />
        )}
      </div>
    ))}
  </div>
  <LinkCardSection {...s.naturalLanguage} />
  <LinkCardSection {...s.development} />
  <div style={{ ...mb96, marginTop: -48 }}>
    <LinkCardSection {...s.policies} />
  </div>
</>);
})()}
