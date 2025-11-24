---
title: Use Iconic IP on Roblox
description: Learn how to scale on Roblox.
hideInPageNavigation: true
---

export const sections = [
{
verticalLayout: true,
content: [
{
description: "One of the most significant ways for creators to expand their reach is to tap into the established fanbases of beloved global IP. We've seen major success when creators and IP holders partner, and we are building an ecosystem that supports licensing for rights holders at scale across Roblox. Our vision is to empower all creators to easily partner with the franchises they love and bring the franchises' licensed IP into their experiences.",
video: "https://www.youtube-nocookie.com/embed/4zoH0Qqq3BE?rel=0&loop=1",
}
]
},
{
horizontalLayout: true,
content: [
{
title: "Apply to partner with an IP owner today",
verticalLayout: true,
description: "Applying for licensable IP is simple – find your desired IP in the Licenses catalog, click Apply for License, select an experience for your application, review terms and content standards, include your pitch, and submit. You'll be notified on Creator Hub once the IP holder reviews your application.",
buttons: [
{ text: "Apply to partner", href: "./ip-licensing/creators" }
]
},
{
title: "Register your IP",
verticalLayout: true,
description: "For eligible IP holders and brands, the License Manager provides powerful self-serve tools to efficiently license your IP to Roblox's massive and engaged audience. You will need to provide the necessary proof of ownership, and a letter of authorization to offer licensed use of your IP.",
buttons: [
{ text: "Register IP", href: "./ip-licensing/get-started" }
],
content: []
},

]
},
{
verticalLayout2: true,
title: "Meet our founding partners",
image: "/assets/ip-licensing/logo-dark.png",
content: [
{
title: "For creators: unleash your creations",
description: "Creating experiences using popular IP can make your content more recognizable and exciting for users! It's a fantastic opportunity to reach new audiences who already know and love certain characters, settings, and storylines.",
image: "/assets/ip-licensing/BlueLock.png",
links: [
{ text: "Explore catalog", href: "https://create.roblox.com/explore/licenses" }
]
},
{
title: "For IP holders: new IP management tools",
description: "License Manager offers IP holders complete IP management, including registration, adding licenses to the central Licenses catalog, proactive IP usage scanning, and oversight of licensed IP.",
links: [
{ text: "License Manager", href: "./ip-licensing/license-manager" },
]
}
]
},
{
title: "Latest announcements",
horizontalLayout: true,
content: [
{
title: "New Lionsgate IPs added to the Licenses catalog",
description: "Lionsgate has expanded its offerings with three newly licensable properties as previously announced at RDC this year: The Strangers: Chapters 1 & 2, The Blair Witch franchise, and Fall (2022).",
image: "/assets/ip-licensing/Fall.png",
links: [
{ text: "Read", href: "https://devforum.roblox.com/t/new-lionsgate-ips-arrive-in-the-licenses-catalog-%E2%80%93-plus-the-new-pitch-feature/4008864" }
]
},
{
title: "Kodansha IPs now available",
description: "During RDC 2025, Roblox CEO Dave Baszucki and Kodansha CEO Yoshinobu Noma announced major additions to our Licenses catalog including Kodansha's Blue Lock and That Time I Got Reincarnated as a Slime.",
video: "https://www.youtube-nocookie.com/embed/PVlCHE9pc50?si=VHpSJVeXiqTJFb-k&start=2373?rel=0&loop=1",
links: [
{ text: "Read", href: "https://corp.roblox.com/newsroom/2025/09/roblox-rdc-2025" }
]
},
{
title: "Roblox Launches New Licensing Platform",
description: "With our new licensing platform, including the Roblox License Manager and Licenses catalog, rights holders of creative works can partner with creators to reach a large and engaged audience. With this launch, creators can build experiences with popular IP.",
image: "/assets/ip-licensing/LicensesPage.png",
links: [
{ text: "Read", href: "https://corp.roblox.com/newsroom/2025/07/roblox-launches-new-licensing-platform-for-experiences" }
]
},
{
title: "The Evolution of IP on Roblox",
description: "Learn how intellectual property works on Roblox, our vision for easier IP-based creations, and the innovative technologies that make it all possible.",
video: "https://www.youtube-nocookie.com/embed/2HotST5mF3A?rel=0&loop=1",
links: [
{ text: "Read", href: "https://corp.roblox.com/newsroom/2025/09/roblox-rdc-2025" }
]
}
]
}
];

{sections.map((section, index) => (
section.verticalLayout ? (
<Grid style={{ marginBottom: 0 }} item xs={12} key={index}>
{section.title && (
<Typography variant='h1'>{section.title}</Typography>
)}
{section.description && (

<div style={{ marginTop: 16, marginBottom: 48 }}>
<p>{section.description}</p>
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
)}
{section.content && section.content.map((section, index) => (
<Grid container spacing={8} key={index} >
<Grid item xs={12} md={5}>
<div>
<h2>{section.title}</h2>
<p>{section.description}</p>
<div style={{ marginTop: 24, marginBottom: 48 }}>
{section.links && section.links.map((link, linkIndex) => (
<a href={link.href} key={linkIndex}>
<Typography variant='buttonLarge'>{link.text}</Typography><br />
</a>
))}
{section.buttons && section.buttons.map((button, btnIndex) => (
<Button
key={btnIndex}
style={{ marginRight: 24, marginBottom:24 }}
variant="contained"
color="primary"
size="large"
href={button.href} >
{button.text}
</Button>
))}
</div>
</div>
</Grid>
<Grid item xs={12} md={7}>

{section.image && (
<img
style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'contain' }}
src={section.image}
alt=""
/>
)}
{section.video && (

<iframe
style={{ marginTop: 20, width: '100%', aspectRatio: 16/9, height: 'auto' }}
src={section.video}
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerPolicy="strict-origin-when-cross-origin"
allowFullScreen ></iframe>
)}
</Grid>
</Grid>
))}

</Grid>

) : section.horizontalLayout ? (
<Grid style={{ marginBottom: 96}} item xs={12} key={index}>
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

{section.image && (
<Grid item xs={12}>
<img
style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
src={section.image}
alt=""
/>
</Grid>
)}
{section.content && (
<Grid container spacing={4}>
{section.content.map((content, contentIndex) => {
const mdValue = 12 / section.content.length;
return (
<Grid item xs={12}  md={6} key={contentIndex}>

<div style={{ marginBottom: 48 }}>
{content.image && (
<img
style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'contain' }}
src={content.image}
alt=""
/>
)}
{content.video && (
<iframe
style={{ marginBottom: 16, width: '100%', aspectRatio: 16/9, height: 'auto' }}
src={content.video}
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerPolicy="strict-origin-when-cross-origin"
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

) : section.verticalLayout2 ? (

<Grid style={{ marginBottom: 96 }} item xs={12} key={index}>
{section.title && (
<Typography variant='h1'>{section.title}</Typography>
)}
{section.description && (

<div style={{ marginTop: 24, marginBottom: 48 }}>
<p>{section.description}</p>
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
)}
{section.image && (

<img
style={{ width: '100%', height: 'auto', marginBottom: 48, marginTop: 48,  objectFit: 'contain' }}
src={section.image}
alt=""
/>

)}

<Grid container spacing={8} key={index} >
<Grid item xs={12} md={5}>
{section.content && section.content.map((section, index) => (
<div>
<h2>{section.title}</h2>
<p>{section.description}</p>
<div style={{ marginTop: 24, marginBottom: 48 }}>
{section.links && section.links.map((link, linkIndex) => (
<a href={link.href} key={linkIndex}>
<Typography variant='buttonLarge'>{link.text}</Typography><br />
</a>
))}
{section.buttons && section.buttons.map((button, btnIndex) => (
<Button
key={btnIndex}
style={{ marginRight: 24, marginBottom:24 }}
variant="contained"
color="primary"
size="large"
href={button.href} >
{button.text}
</Button>
))}
</div>
</div>
))}
</Grid>

<Grid item xs={12} md={7}>
  {section.content && section.content.map((content, idx) => (
    <div key={idx} style={{ marginBottom: 24 }}>
      {content.image && (
        <img
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          src={content.image}
          alt={content.title || ''}
        />
      )}
      {content.video && (
        <iframe
          style={{ width: '100%', aspectRatio: 16/9, height: 'auto' }}
          src={content.video}
          title={content.title || 'YouTube video player'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  ))}
</Grid>
</Grid>
</Grid>

) : null
))}
