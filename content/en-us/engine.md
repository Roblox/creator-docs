---
title:
description: Explains how the Roblox engine works
hideInPageNavigation: true
hideBreadcrumbs: true
---

export const sections = [
  {
    title: "The Roblox Engine",
    description: "More than just a gaming engine—create large-scale, 3D immersive experiences that simulate the real world. The engine comes bundled with the Roblox Studio and Roblox app, allowing you to create once and ship on millions of devices.",
    content: [
      {
        image: "/assets/accessories/Layered-Clothing-Banner.jpg",

      }
    ],
    buttons: [
          { text: "Browse APIs", href: "./tutorials/first-experience/" },
          { text: "Learn about Roblox Studio", href: "./tutorials/first-experience/" }
        ]

  },
  {
    title: "Real world simulation, endless customization",
    description: "Roblox handles a lot of rendering and physics simulation for you so you can focus on gameplay, design, and whatever else that's important to your experience. However, you can override the behavior of everything that's simulated, giving you the power to build anything you can imagine.",
    buttons: [],
    content: [
      {
        title: "Digital matter and meshes",
        description: "Add desc",
        image: "/assets/landing/limited-items.png",
        buttons: [
          { text: "Learn more", href: "./tutorials/first-experience/" },
          { text: "Learn more", href: "./tutorials/first-experience/" }
        ]
      },
      {
        title: "Large-scale worlds",
        description: "Add desc.",
        image: "/assets/landing/price-floors.png",
        buttons: [{ text: "Learn more", href: "./tutorials/first-experience/" }]
      },
      {
        title: "Customize when necessary",
        description: "Add desc.",
        image: "/assets/landing/price-floors.png",
        buttons: [{ text: "Learn more", href: "./tutorials/first-experience/" }]
      }
    ]
  },
  {
    title: "Create once, run everywhere",
    description: "We automatically tune and build Roblox for a multitide of devices so all you need to do is focus on creation. ",
    buttons: [],
    content: [ {
        title: "Free creation tools",
        description: "Roblox Studio is the free tool to use to build experience that run in the engine It's also updated weekly, so you can create and build once",
        image: "/assets/landing/limited-items.png",
        buttons: [
          { text: "Learn more", href: "./tutorials/first-experience/" },
          { text: "Learn more", href: "./tutorials/first-experience/" }
        ]
      },
      {
        title: "Updated weekly",
        description: "We are constantly adding features to the engine, every week.",
        image: "/assets/landing/price-floors.png",
        buttons: [{ text: "Learn more", href: "./tutorials/first-experience/" }]
      },
      {
        title: "Millions of devices",
        description: "Roblox runs on a lot of devices thanks to advanced streaming techniques and client and server side optimizations.",
        image: "/assets/landing/price-floors.png",
        buttons: [{ text: "Learn more", href: "./tutorials/first-experience/" }]
      }]
  }
];

<Grid container spacing={2}  marginX="auto" alignItems="center" justifyContent="center">
  {sections.map((section, index) => (
    <Container key={index}>
      <Container style={{ width: "80%", textAlign: "center", marginTop: 48, marginBottom: 24 }}>
        <Typography variant='hero'>{section.title}</Typography>
      </Container>
      <Container style={{ width: "80%", textAlign: "center", marginBottom: 48 }}>
        <p>
          {section.description}
        </p>
        {section.buttons && section.buttons.map((button, btnIndex) => (
          <Button
            key={btnIndex}
            style={{ marginTop: 8, marginRight: 24 }}
            variant="contained"
            color="primary"
            size="large"
            href={button.href}
          >
            {button.text}
          </Button>
        ))}
      </Container>
      {section.stats && (
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: "center", marginTop: -48, marginBottom: 48 }}>
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
      {section.content && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2}>
            {section.content.map((content, contentIndex) => {
              const mdValue = 12 / section.content.length;
              return (
                <Grid item xs={12} sm={6} md={mdValue} key={contentIndex}>
                  <Container style={{ marginBottom: 48 }}>
                    <img
                      style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'cover' }}
                      src={content.image}
                      alt=""
                    />
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
                        style={{ marginRight: 20 }}
                        variant="contained"
                        color="primary"
                        size="large"
                        href={button.href}
                      >
                        {button.text}
                      </Button>
                    ))}
                  </Container>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Container>
  ))}
</Grid>
