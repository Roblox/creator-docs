---
title: Create and access millions of assets
description: Learn how to create and sell assets on Roblox.
hideInPageNavigation: true
---

export const sections = [
  {
    description: "Assets are anything you publish to the Roblox cloud, like 3D models with scripts, textures, multimedia files, Studio plugins, and much more. You can reuse assets across all of your creations and share them with the community.",
    buttons: [
      { text: "Learn more about assets", href: "./projects/assets" },
    ],
    content: [
      {
        title: "Create in Studio, other third-party tools, or in experiences",
        description: "Roblox Studio provides drag-and-drop tools and programmatic access to building and modeling with engine primitives such as parts and constraints. You can also import industry standard asset types for 3D modeling, audio, and more directly into Studio. Lastly, you can allow users to create assets directly in your experiences and save them to their own accounts.",
        image: "/assets/getting-started/platform-overview/Everything-You-Need.jpg",
        links: [
          { text: "Roblox Studio", href: "./art/overview-studio" },
          { text: "Third-party", href: "./art/overview-dcc" },
          { text: "In-experience", href: "./projects/assets/in-experience-asset-creation" }
        ]
      },
      {
        title: "Reuse and update with packages",
        description: "Packages are reusable sets of assets that can contain models, scripts, multimedia files, and more. They let you bundle, share, maintain, and update them across everywhere they're used in your projects, automatically.",
        video: "https://www.youtube-nocookie.com/embed/AzKZy2BqIh8?si=psaB0UlA8UvaT8qv",
        links: [
          { text: "Learn more", href: "./projects/assets/packages" },
        ]
      },
      {
        title: "Publish with privacy and moderation included ",
        description: "You can create assets for exclusive use in your projects or share them with the community. Our moderation policies protect your creations from unapproved usage and our users from assets that violate Roblox policies.",
        image: "./assets/landing/assets.png",
        links: [
          { text: "Privacy", href: "./projects/assets/privacy" },
          { text: "Moderation", href: "./projects/assets#asset-moderation" },
          { text: "Manage and publish", href: "/projects/assets/manager" },
        ]
      }
    ]
  }
];

{sections.map((section, index) => (
  <Grid item xs={12} key={index}>
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
        href={button.href}
      >
        {button.text}
      </Button>
    ))}
  </div>
    {section.stats && (
      <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: "center", marginTop: -96, marginBottom: 96 }}>
        <Grid container spacing={4}>
          {section.stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="filled">
                <CardContent>
                  <Typography variant="hero" color="info">{stat.header}</Typography>
                  <Typography component="p" variant="h2">{stat.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    )}
    {section.content.map((section, index) => (
      <Grid container spacing={8} key={index} style={{ marginTop: 24 }}>
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
              {section.buttons &&  section.buttons.map((button, btnIndex) => (
                <Button
                  key={btnIndex}
                  style={{ marginRight: 24, marginBottom:24 }}
                  variant="contained"
                  color="primary"
                  size="large"
                  href={button.href}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          {section.image && (
            <img
              style={{ width: '100%', height: 'auto' }}
              src={section.image}
              alt={section.title}
            />
          )}
          {section.video && (
            <iframe
              style={{ width: '100%', aspectRatio: 16/9, height: 'auto' }}
              src={section.video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </Grid>
      </Grid>
    ))}
  </Grid>
))}
