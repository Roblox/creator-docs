---
title: Assistant
description: Overview of Assistant, Roblox's AI helper.
hideInPageNavigation: true
---

export const sections = [
  {
    description: "Assistant is an AI helper that accelerates content creation by helping you get started, supplementing your skills, and assisting with ongoing development.",
    content: [
      {
        title: "Assistant for Studio",
        description: "In Studio, Assistant can act directly on your data model to write scripts, insert and modify objects, and automate repetitive tasks so that you can focus on content creation.",
        image: "/assets/assistant/AssistantStudioExample.png",
        links: [
          { text: "Docs", href: "assistant/guide"}
        ]
      },
      {
        title: "Assistant in the documentation",
        description: "Assistant is available directly from the documentation, in the upper navigation bar.",
        image: "/assets/assistant/AssistantDocumentationSite.png"
      },
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
