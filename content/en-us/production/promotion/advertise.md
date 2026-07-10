---
title: Advertising for creators
description: Grow your player base, increase your earnings, and invest in your growth.
hideInPageNavigation: true
---

export const sections = [
  {
    description: "Advertising on Roblox gives you powerful ways to grow your audience, boost engagement, and increase your earning potential. Built with creator growth and earnings in mind, Roblox's ad system helps you reach players at the right moments, turn discovery into real gameplay, and support long-term monetization as your game grows. Whether you're launching something new or expanding an established game, ads are designed to help you connect with the players who are more likely to engage, return, and invest in what you build.",
    column: true
  },
  {
    title: "Grow with ads",
    stats: [
      { header: "150%", description: "lift in impressions for games that run ads" },
      { header: "24%", description: "increase in plays" },
      { header: "16%", description: "increase in playtime" }
    ],
    description: "Ads Manager is Roblox's self-service advertising platform, designed to support creators of all sizes as they grow on the platform. By advertising on the Home page and in Search results, you can reach and retain players who are interested in playing your game.",
    row: true,
    video: "https://www.youtube-nocookie.com/embed/5HcH-9E7USc?si=IDla-YBxiO_E-O0q",
    content: [
      {
        title: "Get your game discovered",
        description: "Whether you've just published a game or you're ready to take an existing one to the next level, Ads Manager helps you drive awareness, highlight new content, and find new audiences."
      },
      {
        title: "Improved your retention efforts",
        description: "Ads Manager audiences make it easier to reach specific groups of players, including new, recent, and lapsed players. Re-engage players who have already shown interest in your game and give them a reason to come back and play again."
      },
      {
        title: "Control your growth",
        description: "Unlike organic discovery, you're in control of the ads you run. With Ads Manager, you can ramp traffic up or down to test new features, support live updates, or scale quickly when you're ready to grow. You can also run always-on campaigns to continuously optimize your user funnel. This flexibility helps you experiment, iterate, and respond to player behavior in real time."
      },
      {
        links: [
          { text: "Ads Manager", href: "./production/promotion/ads-manager" }
        ]
      }
    ]
  },
  {
    title: "Success story",
    description: "Creators across the platform are using Ads Manager to grow, sustain, and scale their audiences. Here's how one top-100 game turned advertising into a core discovery channel.",
    successStory: true,
    storyTitle: "Precision control: How Hypershot sustains top-tier rankings",
    paragraphs: [
      "Creating a great game will naturally help drive organic plays, but organic reach is just one piece of the puzzle. Hypershot, a top 100 game on Roblox, is a clear example of how creators can use Ads Manager to help drive consistent growth and visibility, even at the highest levels of success.",
      "Beyond mere volume, ads provide a way to quickly test and scale winning creatives to capture more plays. By scaling from 10 to 25 unique creatives, the Hypershot team identified and validated high-performing visual concepts that optimized their clickthrough rate for maximized impressions, while simultaneously pausing weaker-performing assets. This proactive strategy helped ensure a steady flow of players into the game, leveraging their strong monetization funnel.",
      <>Today, Sponsored Ads are a key discovery channel for Hypershot, <strong>accounting for up to 10% of plays</strong>. By strategically deploying "Plays" campaigns targeting All Players and Recent Players, Hypershot demonstrates that Ads Manager is a vital tool for sustaining and protecting a game's position at the top of the charts.</>
    ],
    images: [
      { src: "../../assets/promotion/ads-manager/Hypershot1.webp", alt: "Hypershot creative featuring a sniper character" },
      { src: "../../assets/promotion/ads-manager/Kawaii.webp", alt: "Hypershot pink Kawaii-style weapon skin creative" },
      { src: "../../assets/promotion/ads-manager/ShotAt.webp", alt: "Hypershot creative showing a first-person sniper exchange" },
      { src: "../../assets/promotion/ads-manager/DragonNew.webp" , alt: "Hypershot creative featuring a flaming dragon weapon skin" }
    ],
    testimonial: {
      quote: "I love that the Ads Manager's algorithm automatically targets relevant players, which drives meaningful engagement. On top of that, the ability to customize a specific audience gives me the precision I need to reach exactly who I want, making every ad dollar go further.",
      author: "PhoenixSigns",
      role: "CEO, Frosted Studio"
    }
  },
  {
    title: "Start earning with ads",
    row: true,
    video: "https://www.youtube-nocookie.com/embed/-HYByqvW2uc",
    content: [
      {
        title: "Deploy in-game ads",
        description: "Placing ads inside your game can help increase earnings and diversify monetization by letting you earn from both paying and non-paying players. Simply deploy ads in your game and let Roblox handle delivery and earnings.",
      },
      {
        description: "Choose between ad formats like Rewarded Videos, which let you offer in-game rewards to incentivize players to watch click-to-play video ads, Billboards, which display image or video ads, and Portals, which combine an image and an interactive door that teleports players to an advertised game."
      },
      {
        links: [
          { text: "Rewarded Video", href: "./production/promotion/rewarded-video-ads" },
          { text: "Billboards", href: "./production/monetization/immersive-ads#billboards" },
          { text: "Portals", href: "./production/monetization/immersive-ads#portal-ads" }
        ]
      }
    ]
  }
];

  {sections.map((section, index) => (
    <Grid style={{ paddingBottom: 24 }} item xs={12} key={index}>
      {section.title && (
        <Typography variant='h1'>{section.title}</Typography>
      )}
    <div style={{ marginTop: 16, marginBottom: 36 }}>
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
      <Grid item xs={12} style={{ textAlign: "center", marginBottom: 48 }}>
        <Grid container spacing={4}>
          {section.stats.map((stat, statIndex) => (
            <Grid item xs={6} sm={4} md={4} key={statIndex}>
              <Card variant="filled">
                <CardContent>
                  <Typography component="p" variant="h1" color="info">{stat.header}</Typography>
                  <Typography  component="p"  variant="h3">{stat.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      )}
      { section.row && section.content && (
      <Grid container spacing={8} key={index}>
        <Grid item xs={12} md={5}>
          { section.content.map((section, index) => (
          <div>
            <h3>{section.title}</h3>
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
          ))}
        </Grid>
        <Grid item xs={12} md={7}>
          <iframe
            style={{ marginTop: 20, width: '100%', aspectRatio: 16/9, height: 'auto' }}
            src={section.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen >
          </iframe>
        </Grid>
      </Grid>
      )}
      { section.successStory && (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {section.images.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image.src}
                alt={image.alt}
                style={{ width: '100%', aspectRatio: 16/9, minWidth: 0, objectFit: 'cover', display: 'block', borderRadius: 8 }}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <h3 style={{ marginTop: 0 }}>{section.storyTitle}</h3>
          {section.paragraphs && section.paragraphs.map((paragraph, pIndex) => (
            <p key={pIndex}>{paragraph}</p>
          ))}
          {section.testimonial && (
            <Card variant="filled" style={{ marginTop: 24 }}>
              <CardContent>
                <Typography component="p" style={{ fontStyle: 'italic' }}>
                  {section.testimonial.quote}
                </Typography>
                <Typography component="p" style={{ marginTop: 12, fontWeight: 'bold' }}>
                  &mdash; {section.testimonial.author}, {section.testimonial.role}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      )}
    </Grid>
  ))}
