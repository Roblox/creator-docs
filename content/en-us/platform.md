---
title: The social 3D creation platform
description: Explains the things you can create on Roblox.
hideInPageNavigation: true
---

export const statsByline = "\* Figures are as of Q4 2024";

export const scaleStats = [
{ header: "85.3M", description: "Daily active users" },
{ header: "18.9M", description: "Monthly unique payers" },
{ header: "18.7B", description: "Quarterly hours engaged" },
{ header: "750M", description: "Yearly creator earnings" },
{ header: "18.9M", description: "DevX" },
{ header: "18.7B", description: "xyz" },
];

export const sections = [

{
title: "All the tools you need, for free",
description: "Roblox simplifies creation by providing free tools, hosting, and infrastructure that power automatic, synchronous real-time gameplay as well as covering storage, localization, and payment processing.",
content: [
{
title: "Roblox Studio",
description: "The all-in-one IDE with generative AI technology for building, scripting, testing, and publishing Roblox experiences.",
links: [
{ text: "Get Studio", href: "./studio/setup" },
{ text: "Learn more", href: "./studio" }
]
},
{
title: "Roblox Engine",
description: "An advanced 3D engine with access to robust data storage, physics simulation, and standard primitives to build anything you can imagine.",
links: [
{ text: "API reference", href: "./reference/engine" },
{ text: "Guides", href: "./creation" }
]
},
{
title: "Open Cloud",
description: "A set of web-based APIs that let you build tools and apps to access your creations.",
links: [
{ text: "API reference", href: "./cloud/" },
{ text: "Guides", href: "./cloud/guides/" }
]
},
{
title: "Creator Hub",
description: "Manage your creations, view analytics, track earnings, and connect with the community, all from your web browser.",
links: [
{ text: "Go to Creator Hub", href: "https://create.roblox.com/" }
]
}
]
},
{
title: "Large, multiplayer experiences on any device",
description: "Experiences are the 3D worlds you create, including games, communication or learning environments, visual showcases, concerts, real life simulations, and more.",
buttons: [
{ text: "Get started", href: "./experiences" },
{ text: "Engine API", href: "./reference/engine/" }
],
content: [
{
title: "Simulated by default",
description: "Construct 3D worlds that closely simulate real life with out-of-the-box objects and services. The Roblox engine provides default behavior and logic that do the heavy lifting.",
image: "./assets/landing/engine-simulation.gif"
},
{
title: "Infinitely customizable",
description: "Almost everything in Roblox is customizable and dynamic, letting you override default properties in the engine at build time or with scripts at runtime.",
image: "/assets/landing/scripting-animation.gif"
},
{
title: "Intelligent client streaming",
description: "The Roblox engine adjusts how it delivers your experiences to clients based on available resources, so anything you create runs on all devices automatically.",
image: "./assets/scripting/client-server/Remote-Flow-Server-All-Clients.png"
},
]
},
{
title: "Expressive avatars for everyone",
description: "Avatars persist across all Roblox experiences by default, allowing users to create unique characters and outfits to take with them wherever they go. Create anything from clothing, accessories, animations, and even complete characters.",
buttons: [
{ text: "Get started", href: "./avatar" },
{ text: "3D art resources", href: "./art" },
],
content: [
{
title: "Fully customizable characters",
description: "Create full characters or individual body parts that users can equip.",
image: "/assets/modeling/meshes/Modeling-Requirements-Caps.png",
links: [{ text: "Avatar characters", href: "./art/characters" }]
},
{
title: "Expressive body and face animations",
description: "Animations let avatars move with their body and face.",
image: "/assets/avatar/dynamic-heads/animating-dynamic-heads/Overview.png",
links: [
{ text: "Facial animation", href: "./art/characters/facial-animation" },
{ text: "Character animation", href: "./tutorials/use-case-tutorials/animation/create-an-animation" }
]
},
{
title: "Layered clothing",
description: "Clothing can layer on top of each other on a multitude of different body shapes and types.",
image: "/assets/art/accessories/creating/Exporting-Clothing-in-Studio-Highlight.png",
links: [
{ text: "Guides", href: "./art/accessories/layered-clothing" },
{ text: "Tutorial", href: "./art/accessories/creating" }
]
}
]
},
{
title: "Cloud-based asset management",
description: "From 3D models to audio to plugins, create and share assets with the rest of the creator community to accelerate their productivity.",
buttons: [
{ text: "Learn more", href: "./assets" },
{ text: "Go to Creator Store", href: "https://create.roblox.com/store" }
],
content: [
{
title: "Publish and share",
description: "From 3D models to audio to plugins, create and share assets with the rest of the creator community to accelerate their productivity.",
image: "./assets/landing/assets.png",
links: [{ text: "Guides", href: "./projects/assets" }]
},
{
title: "Sell plugins",
description: " The Creator Store lets you publish and sell plugins that increase Studio's functionality and feature set.",
image: "./assets/landing/plugins.jpg",
links: [
{ text: "Create and sell plugins", href: "./studio/plugins" }
]
},
{
title: "Import assets",
description: "Import assets from other digital creation apps for 3D art, images, audio, and video.",
image: "./assets/landing/blender-logo.png",
links: [
{ text: "Third-party tools support", href: "./art/overview-dcc" }
]
}
]
},
{
title: "Extensive scale and monetization",
description: "Reach a massive, global audience of hundreds of millions of users across 180 countries with efficient discovery and user acquisition.",
buttons: [
{ text: "Learn how to scale", href: "./scale" },
{ text: "Learn how to monetize", href: "./monetize" }
],
content: [
{
title: "Reach hundreds of millions instantly",
description: "Deploy globally in seconds across major platforms — from mobile to console to desktop to VR — and in multiple languages.",
image: "/assets/landing/device-family.png"
},
{
title: "Analyze and grow your creations",
description: "Measure and gain insights on your experience's performance with a robust set of analytics tools. Adjust content strategies and rapidly iterate to get your desired outcome.",
image: "/assets/analytics/overview/watchlist.png"
},
{
title: "Monetize with a variety of strategies",
description: "Earn money in many ways, including in-experience purchases, ads, as well as selling avatar items or creator plugins.",
image: "./assets/landing/in-exp-monetization.jpg"
}
]
}
];

<Grid container direction="row" spacing={4} style={{ marginBottom: 48 }}>
<Grid item xs={12} md={5}>
<p>Roblox lets you create anything you can imagine with a comprehensive set of powerful 3D collaborative creation tools.</p>
<p>Our platform provides you with unparalleled opportunities to create content from simple avatar items to immersive, multiplayer experiences.</p>
<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="secondary"
size="large"
href="https://www.youtube.com/watch?v=vIiVbFiDbBE" >
Watch overview
</Button>
</Grid>
<Grid item xs={12} md={7}>
<img
style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'cover' }}
src="./assets/getting-started/platform-overview/Everything-You-Need.jpg"
alt=""
/>
</Grid>
</Grid>

{sections.map((section, index) => (
<Grid style={{ marginBottom: 48 }} item xs={12} key={index}>
{section.title && (
<Typography variant='h1'>{section.title}</Typography>
)}
<div style={{ marginTop: 16, marginBottom: 48 }}>
{section.description && (
<p>{section.description}</p>
)}
{section.buttons && section.buttons.map((button, btnIndex) => (
<Button
key={btnIndex}
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="secondary"
size="large"
href={button.href} >
{button.text}
</Button>
))}
</div>
{section.content && (
<Grid container spacing={4}>
{section.content.map((content, contentIndex) => {
const mdValue = 12 / section.content.length;
return (
<Grid item xs={12} sm={6} md={mdValue} key={contentIndex}>
<div style={{ marginBottom: 48 }}>
{content.image && (
<img
style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'cover' }}
src={content.image}
alt=""
/>
)}
{content.video && (
<iframe
style={{ width: '100%', aspectRatio: 16/9, height: 'auto' }}
src={content.video}
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerpolicy="strict-origin-when-cross-origin"
allowFullScreen ></iframe>
)}
<h3>{content.title}</h3>
<p>{content.description}</p>
{content.links && content.links.map((link, linkIndex) => (
<a href={link.href} key={linkIndex}>
<Typography variant='buttonLarge'>{link.text}</Typography><br />
</a>
))}
{content.buttons && content.buttons.map((button, btnIndex) => (
<Button
key={btnIndex}
style={{ marginTop: 16, marginRight: 24 }}
variant="contained"
color="secondary"
size="large"
href={button.href} >
{button.text}
</Button>
))}
</div>
</Grid>
);
})}
</Grid>
)}
</Grid>
))}
