---
title: Get started on Roblox
description: Learn how to get started quickly on Roblox
hideInPageNavigation: true
---

export const statsByline = "* Figures are as of Q4 2024";

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
    title: "",
    description: "Getting started on Roblox is easy, and learning about the ecosystem only takes a few minutes. Better yet, you can start creating and sharing your creations in less than an hour with these resources.",
    content: [
      {
        title: "1. Learn about what you can do",
        description: "This video goes over some of the things you can build on Roblox and the tools you need to do it.",
        video: "https://www.youtube-nocookie.com/embed/vIiVbFiDbBE",
        links: [
          {text: "Watch overview", href: "https://www.youtube.com/watch?v=vIiVbFiDbBE" },
        ]
      },
      {
        title: "2. Get a Roblox account and the app",
        description: "The same Roblox account works for playing and creating. Sign up at roblox.com and download the app for your preferred device.",
        image: "./assets/landing/app.jpg",
        links: [
          {text: "Go to roblox.com", href: "https://www.roblox.com" },
        ]
      },
      {
        title: "3. Customize your avatar and play something",
        description: "The best way to understand Roblox is to use it! Customize your avatar with free or paid items and play a few of the millions of experiences.",
        image: "./assets/landing/avatar-play.jpg",
        links: [
          {text: "Browse avatar items", href: "https://www.roblox.com/catalog" },
          {text: "Browse experiences", href: "https://www.roblox.com/charts" },
        ]
      },
      {
        title: "4. Get Studio and take the tour",
        description: "Roblox Studio is your main creation tool and is supported on Windows and Mac. The onboarding tour gets you acclimated to basic workflows.",
        image: "./assets/landing/get-started/studio.png",
        links: [
          {text: "Roblox Studio setup", href: "./studio/setup" },
        ]
      }
    ]
  },
  {
    title: "Experiences",
    description: "Making an experience can seem intimidating, but we promise it's not too bad! Walk through the tutorial or watch the following videos  to understand a bit more about how experiences work.",
    buttons: [
      { text: "See all docs", href: "./experiences" }
    ],
    content: [
      {
        title: "Create your first experience",
        description: "Create a simple 3D platformer while learning important Roblox building and scripting concepts.",
        image: "./assets/landing/core-experience.png",
        links: [
          { text: "Start creating", href: "./tutorials/curriculums/core/" },
        ]
      },
      {
        title: "Intro to world building",
        description: "Sit back and watch one of our 3D artists show you how to construct 3D worlds in Studio.",
        video: "https://www.youtube-nocookie.com/embed/SgPU84AqpkY",
        links: [
          { text: "Watch livestream", href: "https://youtu.be/SgPU84AqpkY" }

        ]
      },
      {
        title: "Intro to physics",
        description: "The Roblox engine simulates real-life materials, physics, collisions and more. Join one of our product managers for a overview of how the physics simulation works.",
        video: "https://www.youtube-nocookie.com/embed/9mXvhYSv7fc",
        links: [
          { text: "Watch livestream", href: "https://youtu.be/9mXvhYSv7fc" },
          
        ]
      },
    ]
  },
  {
    title: "Avatar items",
    description: "Making avatar items can sometimes be easier than making an experience. You can make a simple 2D t-shirt with an image editor without having to open Studio at all. If you're interested in 3D modeling, use Blender and Studio together to make a basic 3D accessory.",
    buttons: [
      { text: "See all docs", href: "./avatar" }
    ],
    content: [
      {
        title: "Avatar items overview",
        description: "Learn about all the different things you can create and allow users to equip for their avatars.",
        video: "https://www.youtube-nocookie.com/embed/EUDSIUmLjxA",
        links: [{ text: "Watch overview", href: "https://youtu.be/EUDSIUmLjxA" }]
      },
      {
        title: "Create a t-shirt",
        description: "A simple t-shirt is the easiest example of how to create an avatar item.",
        video: "https://www.youtube-nocookie.com/embed/r_unfGZT5Ps",
        links: [
          { text: "Watch how to do it", href: "https://youtu.be/r_unfGZT5Ps" },
          { text: "Guides", href: "./art/classic-clothing" }
        ]
      },
      {
        title: "Create a backpack accessory",
        description: "Learn how to create a backpack, which is an example of a 3D accessory. These accessories are simple, non-animated items that attach to a single point on an avatar's body.",
        video: "https://www.youtube-nocookie.com/embed/Eed29gV0hLA",
        links: [
          { text: "Watch how to do it", href: "https://youtu.be/Eed29gV0hLA" },
          { text: "Guides", href: "./art/accessories" }
        ]
      }
    ]
  },
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
                    style={{ marginBottom: 16, width: '100%', aspectRatio: 16/9, height: 'auto' }}
                    src={content.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                {content.links && content.links.map((link, linkIndex) => (
                  <a href={link.href} key={linkIndex}>
                    <Typography variant='buttonLarge'>{link.text}</Typography><br />
                  </a>
                ))}
                {content.buttons && content.buttons.map((button, btnIndex) => (
                !button.useStudioButton && (
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
                )

                ))}
              </div>
            </Grid>
          );
        })}
      </Grid>
    )}
  </Grid>
))}
