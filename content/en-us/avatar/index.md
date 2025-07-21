---
title: Create avatar items
description: Create and upload avatar characters, clothing, and accessories to the Roblox Marketplace.

hideInPageNavigation: true
---

export const sections = [

{
title: "Turn your creativity into virtual assets",
description: "Roblox streamlines the creation process, letting you focus more on building and bringing your ideas to life with powerful, state-of-the-art tools.",
content: [
{
title: "Design a 2D classic shirt",
description: "Use an image editor of your choice and create your first basic 2D cosmetic.",
video: "https://www.youtube-nocookie.com/embed/r_unfGZT5Ps",
links: [
{ text: "Learn more", href: "../art/classic-clothing.md" }
]
},
{
title: "Create a 3D accessory",
description: "Use a 3D modeling tool and Roblox Studio to make a 3D cosmetic.",
video: "https://www.youtube-nocookie.com/embed/Eed29gV0hLA",
links: [
{ text: "Guides and tutorials", href: "../art/accessories.md" },
{ text: "Get Blender", href: "https://www.blender.org" },
{ text: "Get Studio", href: "./studio/setup/" }
]
},
{
title: "Make 3D layered clothing",
description: "Use your 3D modeling skills and Roblox Studio to create clothing that stretches, fits, and layers.",
video:"https://www.youtube-nocookie.com/embed/C-DwGRBHvmE",
links: [
{ text: "Guides and tutorials", href: "../art/accessories/layered-clothing.md" },
{ text: "Get Blender", href: "https://www.blender.org" },
{ text: "Get Studio", href: "./studio/setup/" }
]
},
]
},

{
title: "What's new?",
description: "Check out our latest videos and guides designed to help you create faster — whether you're a complete newbie or a seasoned industry pro!",
buttons: [
{ text: "See all videos", href: "https://www.youtube.com/playlist?list=PLMneGxZNs3ZYZ5cJ1IPeaO1Eyd4ejY1Lz" },
],
content: [
{
title: "Make your own shoes",
description: "Create your first shoes — an advanced type of layered clothing.",
video: "https://www.youtube-nocookie.com/embed/NHgYM78afqc",
},
{
title: "Convert body cages and clothing cages",
description: "Convert a body cage to a clothing cage and back again! Useful for advanced clothing or body creators.",
video: "https://www.youtube-nocookie.com/embed/vATGE-2xhcw",
},
{
title: "Intro to UGC",
description: "Join @ducksareyellow as he asks seasoned professionals how to start creating UGC in a 3-part series",
video: "https://www.youtube-nocookie.com/embed/Zb1BJow0NV4",
links: [
{ text: "Part 2 - Modeling", href: "https://www.youtube-nocookie.com/embed/Zb1BJow0NV4"},
{ text: "Part 3 - Texturing", href: "https://www.youtube-nocookie.com/embed/MlyJD_ix9CE"}]
}
]
},

{
title: "All the tools you need, for free",
description: "Roblox offers the tools and infrastructure to upload your creations to a global marketplace, handling everything from moderation and localization to payment processing.",
content: [
{
title: "Blender",
description: "Check out in-depth guides and tutorials for creating 3D items in Blender, a free and open-sourced modeling program.",
links: [
{ text: "Get Blender", href: "https://www.blender.org" },
{ text: "Learn more", href: "../art/blender.md" }
]
},
{
title: "Roblox Studio",
description: "Use native tools in Roblox Studio to quickly convert your custom models into Roblox-ready accessories. Studio is your portal to getting your 3D assets into the Roblox ecosystem.",
links: [
{ text: "Get Studio", href: "./studio/setup/" },
{ text: "Accessory Fitting Tool", href: "../art/accessories/accessory-fitting-tool.md" },
{ text: "Avatar Setup", href: "./avatar-setup/" }
]
},
{
title: "Creator Hub",
description: "Manage all your uploaded avatar items, set them on sale, review policy, and view analytics in the Creator Hub.",
links: [
{ text: "Go to Creator Hub", href: "https://create.roblox.com/" },
{ text: "Upload and publishing guides", href: "../marketplace/publish-to-marketplace.md" }
]
},
{
title: "Marketplace and beyond",
description: "Create your own home store and a higher share of your commission! Or build experiences that allow others to customize and create avatar items in-game.",
links: [
{ text: "Marketplace policy", href: "../marketplace/marketplace-policy.md" },
{ text: "Create your own home store", href: "../marketplace/homestore.md" },
{ text: "In-experience creation", href: "./in-experience-creation.md" }
]
}
]
},

{
title: "Dive deeper into avatars",
description: "Learn how to create advanced avatar items, explore how the Marketplace operates, and see how Roblox's community policies protect both creators and players.",
buttons: [
],
content: [
{
title: "Fees, commissions, and more",
description: "Understand the fees and commission structure and how to optimize your avatar item revenue.",
image: "../assets/accessories/Layered-Clothing-Banner.jpg",
links: [
{ text: "Fees and Commissions", href: "../marketplace/marketplace-fees-and-commissions.md" },
{ text: "Upload and publish guides", href: "../marketplace/publish-to-marketplace.md" },
{ text: "Marketplace FAQs", href: "../marketplace/frequently-asked-questions.md" }
]
},
{
title: "Marketplace and community policies",
description: "Learn about the policies that help protect you, your creations, and the community.",
image: "../assets/landing/device-family.png",
links: [
{ text: "Marketplace Policy", href: "../marketplace/marketplace-policy.md" },
{ text: "Intellectual Property", href: "../marketplace/intellectual-property.md" },
{ text: "Moderation", href: "../marketplace/moderation.md" }
]
},
{
title: "Create more complex items",
description: "Create even more advanced avatar items, like advanced clothing, bodies, heads, and more.",
video: "https://www.youtube-nocookie.com/embed/NHgYM78afqc",
links: [
{ text: "Clothing guides", href: "../art/accessories/layered-clothing.md" },
{ text: "Character bodies", href: "./art/characters/"},
{ text: "Animateable heads", href: "../art/characters/facial-animation.md" }
]
},
]
},
{
content: [
{
title: "Build your own homestore",
description: "Create and design your own store and benefit from a higher commission split from sales.",
video: "https://www.youtube-nocookie.com/embed/6MPWLQmIKLk",
links: [{ text: "Learn more", href: "../marketplace/homestore.md" }]
},
{
title: "In-experience creation",
description: "Create an experience where players can build their own avatar items. Recommended for advanced developers.",
image: "../assets/landing/scripting.png",
links: [
{ text: "Learn more", href: "./in-experience-creation.md" }
]
},
{

}
]
}
];

<Grid container direction="row" spacing={4} style={{ marginBottom: 48 }}>
<Grid item xs={12} md={5}>

<p>Every Roblox user is represented by an **avatar** — a fully customizable character with cosmetics and accessories that persist across experiences.</p>
<p>Create avatar bodies, items, and clothing using our robust tools and upload them to the [Marketplace](https://www.roblox.com/catalog) where millions of users browse and shop every day.</p>
<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="secondary"
size="large"
href="https://www.youtube.com/watch?v=vIiVbFiDbBE" >
Watch overview
</Button>
<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="secondary"
size="large"
href="https://www.roblox.com/catalog" >
Visit Marketplace
</Button>
</Grid>
<Grid item xs={12} md={7}>
<img
style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'cover' }}
src="../assets/avatar/AvatarSample.png"
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
style={{ width: '100%', aspectRatio: 16/9, height: 'auto', marginBottom: '16px' }}
src={content.video}
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerpolicy="strict-origin-when-cross-origin"
allowfullscreen ></iframe>
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
