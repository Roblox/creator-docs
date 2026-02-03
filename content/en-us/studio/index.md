---
title: Roblox Studio
description: An overview of Roblox Studio, the all-in-one IDE for Roblox creation.
hideInPageNavigation: true
---

export const sections = [
  {
    description: "Roblox Studio is free to use and has everything you need to start publishing creations to hundreds of millions of Roblox users on consoles, desktops, and mobile devices.",
    buttons: [{ text: "Get Studio", href: "/studio/setup" }]
  },
  {
    title: "Build, script, test, and publish",
    description: "Access a robust set of building, scripting, testing, and publishing tools directly in Studio.",
    content: [
      {
        title: "Easy 3D world building",
        description: "Drag and drop objects into your workspace, move and rotate to get things just right, and texture and polish your world to get the right look.",
        image: "./assets/modeling/solid-modeling/Separate-Parts-To-Union.jpg",
        links: [
          { text: "Studio tools", href: "./studio/align-tool" }
        ],
      },
      {
        title: "An intelligent script editor",
        description: "Syntax highlighting, code completion, and inline documentation let you script easily.",
        image: "./assets/landing/scripting.png",
        links: [
          { text: "Script editor", href: "./studio/script-editor" }
        ],
      },
      {
        title: "Device emulation and playtesting",
        description: "Emulate a wide range of screen sizes and form factors to make sure everything looks and feels great before sharing your experience with the world.",
        image: "/assets/getting-started/platform-overview/Rapid-Iteration.png",
        links: [
          { text: "Studio testing modes", href: "./studio/testing-modes" }
        ],
      }
    ]
  },
  {
    title: "Unleash the power of the Roblox engine",
    description: "Roblox Studio comes bundled with the powerful Roblox engine that runs anywhere with endless customization.",
    links: [
      { text: "Engine API", href: "./reference/engine" },
      { text: "Experience Guides", href: "./creation" }
    ],
    content: [
      {
        title: "A standard and flexible data model",
        description: "Data models tell the engine how to render and simulate your experience. Studio can manipulate data models at both edit and runtime, allowing you to create and iterate freely.",
        image: "./assets/landing/datamodel.png",
        links: [
          { text: "Data model", href: "./projects/data-model" }
        ]
      },
      {
        title: "Out-of-the-box primitives and services",
        description: "Construct 3d worlds that closely simulate real life with out-of-the-box primitives like simple 3D objects, physical constraints, and services for lighting, sound, and more. Choose what Roblox provides by default or customize behavior with property overrides and scripting.",
        image: "./assets/modeling/parts/Move-World-Orientation.png",
        links: [
          { text: "See all guides", href: "./creation" }
        ]
      }
    ]
  },
  {
    title: "AI tools to accelerate creation",
    description: "Assistant lets you focus on creativity by using AI to automate mundane tasks, manipulate the data model, generate materials and textures, and more.",
    content: [
      {
        title: "Let Assistant take action",
        description: "Ask questions and get answers, or let Assistant update the data model directly. Assistant can add objects in bulk, modify scripts in place, optimize code, and much more.",
        image: "./assets/assistant/prompt12.png",
        links: [{ text: "Assistant", href: "./assistant/guide#insert-and-modify-scripts" }]
      },
      {
        title: "Generate materials and textures",
        description: "Bring your experiences to life with custom materials and textures for your 3D objects.",
        image: "./assets/studio/texture-generator/Texture-Applied.jpg",
        links: [
          { text: "Material generator", href: "./studio/material-generator" },
          { text: "Texture generator ", href: "./studio/texture-generator" }
        ]
      },
      {
        title: "Rig and cage avatars",
        description: "Import character models and let Studio automatically rig and cage them to support layered clothing.",
        image: "./assets/avatar/avatar-setup/Skin-Tone-Selector.png",
        links: [{ text: "Avatar Setup tool", href: "./art/modeling/avatar-setup/" }]
      }
    ]
  },
  {
    title: "Collaborative at its core",
    description: "Studio lets you collaboratively create in real time, with small or large teams alike.",
    links: [
      { text: "Learn how to scale", href: "./scale" },
      { text: "Learn how to monetize", href: "./monetize" }
    ],
    content: [
      {
        title: "Real-time team creation",
        description: "Build and script collaboratively in Studio. Watch your teammates' creations come to life before your eyes.",
        image: "/assets/studio/collaboration/Collaborative-Session.jpg",
        links: [{ text: "Studio collaboration", href: "./projects/collaboration" }]
      },
      {
        title: "Group-based access",
        description: "Control access to your creations and control how multiple team members work on the same experiences, use the same assets, and share profits.",
        image: "/assets/landing/groups.jpg",
        links: [{ text: "Groups", href: "./projects/groups" }]
      },
      {
        title: "Share and access millions of assets",
        description: "You can create and access millions of freely available models, meshes images, sounds, and videos in the Creator Store.",
        image: "/assets/landing/assets.png",
        links: [{ text: "Assets", href: "./assets" }]
      }
    ]
  }
];

  {sections.map((section, index) => (
    <Grid style={{ marginBottom: 48}} item xs={12} key={index}>
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
      <Grid item xs={12} style={{ textAlign: "center", marginTop: -48, marginBottom: 48 }}>
        <Grid container spacing={4}>
          {section.stats.map((stat, statIndex) => (
            <Grid item xs={12} sm={6} md={4} key={statIndex}>
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
      <Grid container spacing={4}>
        {section.content.map((content, contentIndex) => {
          const mdValue = 12 / section.content.length;
          return (
            <Grid item xs={12} sm={6} md={mdValue} key={contentIndex}>
              <div style={{ marginBottom: 48 }}>
                {content.image && (
                  <img
                    style={{ width: '100%', aspectRatio: 16/9, height: 'auto', objectFit: 'contain' }}
                    src={content.image}
                    alt=""
                  />
                )}
                {content.video && (
                  <iframe  style={{ width: '100%', aspectRatio: 16/9, height: 'auto' }} src={content.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

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
                    href={button.href}
                  >
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
