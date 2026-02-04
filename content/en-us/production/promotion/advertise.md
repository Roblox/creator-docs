---
title: Advertising for creators
description: Grow your player base, increase your earnings, and invest in your growth.
hideInPageNavigation: true
---

export const sections = [
  {
    description: "Advertising on Roblox gives you powerful ways to grow your audience, boost engagement, and increase your earning potential. Built with creator growth and earnings in mind, Roblox's ad system helps you reach players at the right moments, turn discovery into real gameplay, and support long-term monetization as your experience grows. Whether you're launching something new or expanding an established experience, ads are designed to help you connect with the players who are more likely to engage, return, and invest in what you build.",
    column: true
  },
  {
    title: "Grow with ads",
    stats: [
      { header: "150%", description: "lift in impressions for experiences that run ads" },
      { header: "24%", description: "increase in plays" },
      { header: "16%", description: "increase in playtime" }
    ],
    description: "Ads Manager is Roblox's self-service advertising platform, designed to support creators of all sizes as they grow on the platform. By advertising on the Home page and in Search results, you can reach and retain players who are interested in playing your experience.",
    row: true,
    video: "https://www.youtube-nocookie.com/embed/5HcH-9E7USc?si=IDla-YBxiO_E-O0q",
    content: [
      {
        title: "Get your game discovered",
        description: "Whether you've just published an experience or you're ready to take an existing one to the next level, Ads Manager helps you drive awareness, highlight new content, and find new audiences."
      },
      {
        title: "Improved your retention efforts",
        description: "Ads Manager audiences make it easier to reach specific groups of players, including new, recent, and lapsed players. Re-engage players who have already shown interest in your experience and give them a reason to come back and play again."
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
    title: "Start earning with ads",
    row: true,
    video: "https://www.youtube-nocookie.com/embed/-HYByqvW2uc",
    content: [
      {
        title: "Deploy in-game ads",
        description: "Placing ads inside your experience can help increase earnings and diversify monetization by letting you earn from both paying and non-paying players. Simply deploy ads in your experience and let Roblox handle delivery and earnings.",
      },
      {
        description: "Choose between ad formats like Rewarded Videos, which let you offer in-experience rewards to incentivize players to watch click-to-play video ads, Billboards, which display image or video ads, and Portals, which combine an image and an interactive door that teleports players to an advertised experience."
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
    </Grid>
  ))}
