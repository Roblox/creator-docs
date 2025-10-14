---
title: Creator Hub
description: The place to manage your creations on the web
hideInPageNavigation: true
---

export const sections = [
  {
    description: "You'll often use Creator Hub and Studio together when you're creating, like managing your creations, tracking analytics, requesting monetization payouts, and a host of other creator actions, all on the web.",
    buttons: [
      {
        text: "Go to dashboard", href: "https://create.roblox.com/dashboard/creations"
      }
    ],
    content: [
      {
        title: "Manage experiences, avatar items, and assets",
        description: "The Creator Dashboard lets you manage and access all of your creations in one place.",
        image: "/assets/landing/hub-home.jpg",
        links: [
          { text: "Creations dashboard", href: "https://create.roblox.com/dashboard/creations" }
        ]
      },
      {
        title: "Analyze and scale your creations",
        description: "Access a variety of analytics features to help you chart your creations' growth, track user behavior and retention, and find opportunities for optimization. You can use analytics to understand what actions you can take to grow your experience.",
        image: "./assets/analytics/overview/step3.png",
        links: [
          { text: "Guides", href: "./production/analytics" },
					{ text: "Analytics dashboard", href: "https://create.roblox.com/dashboard/analytics" },
        ]
      },
      {
        title: "Monetize your creations and track your finances",
        description: "You can request a developer exchange payment, track Creator Store transactions, create ad campaigns, sponsor ads, and more.",
        image: "./assets/promotion/search-ads/Ad-Set-Search.png",
        links: [
          { text: "Developer exchange", href: "https://create.roblox.com/dashboard/devex" },
          { text: "Creator transactions", href: "https://create.roblox.com/dashboard/devex" },
          { text: "Ads Manager", href: "https://advertise.roblox.com/landing" },
          { text: "Sponsored Ads", href: "https://www.roblox.com/sponsorships/list" }
        ]
      },
      {
        title: "Access other properties like the Creator Store, Forum, and the Creator Roadmap",
        description: "The Creator Hub gives you quick access to other creator-related properties such as the Creator Store where you can publish, share, and discover assets. In the Forum, you can interact with the rest of the community. Finally, the Creator Roadmap outlines new features that we plan on shipping.",
        image: "./assets/landing/store.jpg",
        links: [
          { text: "Creator Store", href: "https://create.roblox.com/store" },
          { text: "Forum", href: "https://devforum.roblox.com" },
          { text: "Roadmap", href: "https://create.roblox.com/roadmap" }
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
          <img
            style={{ width: '100%', height: 'auto' }}
            src={section.image}
            alt={section.title}
          />
        </Grid>
      </Grid>
    ))}
  </Grid>
))}
