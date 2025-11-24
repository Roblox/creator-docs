---
title: Reach a massive global audience
description: Learn how to scale on Roblox.
hideInPageNavigation: true
---

export const sections = [
  {
    description: "Our efficient discovery capabilities offer a massive opportunity to find the right audience and acquire new users. We also provide a robust analytics suite of tools to measure and gain insights on your experience's performance. This allows you to adjust content strategies and rapidly iterate to get your desired outcome.",
    content: [
      {
        title: "Discovery for millions of users on a variety of devices and form factors",
        description: "Roblox works out of the box on PlayStation, Xbox, Android, iOS, PC, Mac, and Oculus. You get one-click publish and discovery that reaches hundreds of millions of users on a vast social network.",
        image: "/assets/landing/device-family.png",
        links: [
          { text: "Discovery", href: "./discovery" },
          { text: "Roblox user base", href: "./production/roblox-user-base" }
        ]
      },
      {
        title: "Global and localized",
        description: "Users from all over the world can interact on our platform, enabled by our robust localization tools, letting you take advantage of automatic text and chat translation or custom translations provided by you.",
        image: "/assets/landing/chat-translation.jpg",
        links: [
          { text: "Localization", href: "./production/localization" }
        ]
      }
    ]
  },
  {
    title: "Analyze and grow your creations",
    description: "Roblox offers a variety of analytics features to help you chart growth, track user behavior and retention, and find opportunities for optimization. You can use analytics to understand what actions you can take to grow your creations.",
    content: [
      {
        title: "View metrics and performance",
        description: "Measure and gain insight into your experience's performance to adjust content strategies. View dashboards on retention, engagement, acquisition, and monetization.",
        image: "/assets/analytics/analytics-dashboard/Explore-Mode-Preview.png",
        links: [
          { text: "Core metrics", href: "./production/analytics/analytics-dashboard" },
          { text: "Performance", href: "./production/analytics/performance" }
        ]
      },
      {
        title: "Create and track events",
        description: "Add event tracking to your experiences and visualize monetization and usage patterns.",
        image: "/assets/analytics/event-types/Overview-Economy-Funnels.png",
        links: [
          { text: "Events", href: "./production/analytics/event-types" }
        ]
      },
      {
        title: "Grow your experiences with great design",
        description: "Learn how successful experiences design their core game loops, UI and UX, monetization, and more.",
        image: "./assets/game-design/introduction-to-quest-design/quest-design-7.png",
        links: [
          { text: "Design", href: "./production/game-design" }
        ]
      }
    ]
  }
];

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
        href={button.href}
      >
        {button.text}
      </Button>
    ))}
  </div>
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
