---
title: Create games with Build
description: Turn your game ideas into playable Roblox games using AI, right from your phone.
---

<Grid container spacing={4} style={{ paddingTop: 24 }}>
  <Grid item xs={12} md={4}>
    <div>
      <p>**Build** is a mobile-first AI game creation tool that turns your ideas into playable, publishable Roblox games. Just describe what you want, and Build creates it in real time. No coding or game development experience needed.</p>
      <Button style={{ marginBottom: 36 }} variant="contained" color="primary" href="#how-build-works">Get started</Button>
    </div>
  </Grid>
  <Grid item xs={12} md={8}>
    <iframe style={{ width: '100%', aspectRatio: '16/9' }} src="https://www.youtube-nocookie.com/embed/dVmnD5pn3QI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  </Grid>
</Grid>

<Grid style={{ paddingBottom: 48 }} item xs={12}>
  <Typography variant='h1' id='how-build-works'>How Build works</Typography>
    <div style={{ marginTop: 16, marginBottom: 48 }}>
      <p>Build handles everything from gameplay and characters to environments, sound, and achievements. You describe what you want, play what it creates, and keep refining until it feels right.</p>
    </div>
    <Grid container spacing={8} alignItems="flex-start" style={{ marginBottom: 48 }}>
      <Grid item xs={12} md={6}>
        <div>
          <h3>Describe your game</h3>
          <p>Open the **Build** tab in the Roblox mobile app and type what you want to make. The more detail you give, the better the result.</p>
          <div style={{ marginTop: 24 }}>
            <p>**Use natural language**<br/>Write the way you'd explain your game to a friend. For example: "A clicker game where I collect coins and buy speed upgrades" or "A side-scroller where I dodge obstacles and collect power-ups."<br/><br/>**The AI builds it in real time**<br/>After you send your description, Build generates a playable game across multiple dimensions: gameplay mechanics, characters, environment, style, sound, and achievements.<br/><br/>**Keep refining**<br/>Every message you send is a new instruction. Say things like "make the coins bigger," "add a timer," or "slow the enemies down." Keep going until the game feels right.</p>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ width: '65%', margin: '0 auto' }}>
          <img style={{ width: '100%', height: 'auto', display: 'block' }} src="../assets/build/Build-Prompt.png" alt="" />
          <Typography variant='caption1' style={{ textAlign: 'center', display: 'block' }}><i>Describe your game in natural language</i></Typography>
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={8} alignItems="flex-start" style={{ marginBottom: 48 }}>
      <Grid item xs={12} md={6}>
        <div>
          <h3>Playtest and share</h3>
          <Alert severity="warning">Playtesting is coming soon and is not yet available in Build.</Alert>
          <p>Try your game as you build it, and share it with friends for feedback before you publish.</p>
          <div style={{ marginTop: 24 }}>
            <p>**Playtest instantly**<br/>Tap Playtest to try your game at any point. If something doesn't feel right, describe the change in the chat and Build updates the game.<br/><br/>**Share with friends**<br/>Before you publish, you can share your game privately with up to 10 friends using a playtest link. Playtesters need a Roblox account and must be aged 9 or older.<br/><br/>**Iterate as much as you want**<br/>There's no limit to how many times you can refine your game. Keep playtesting and describing changes until you're happy with the result.</p>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ width: '65%', margin: '0 auto' }}>
          <img style={{ width: '100%', height: 'auto', display: 'block' }} src="../assets/build/Build-Playtest.png" alt="" />
          <Typography variant='caption1' style={{ textAlign: 'center', display: 'block' }}><i>Playtest your game right from your phone</i></Typography>
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={8} alignItems="flex-start">
      <Grid item xs={12} md={6}>
        <div>
          <h3>Publish to millions</h3>
          <p>When your game is ready, publish it to the Roblox platform with a single tap.</p>
          <div style={{ marginTop: 24, marginBottom: 48 }}>
            <p>**One-tap publishing**<br/>Tap Publish and your game runs a quick safety check, then goes live on your profile. No approval process, no waiting.<br/><br/>**Real distribution**<br/>Your game is published to the same platform that hosts millions of Roblox games. It's not a demo or a prototype. It's a real game that other people can find and play.<br/><br/>**Keep improving after launch**<br/>After publishing, keep making changes inside the Build chat to continue updating your game. Your game stays live while you iterate.</p>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ width: '65%', margin: '0 auto' }}>
          <img style={{ width: '100%', height: 'auto', display: 'block' }} src="../assets/build/Build-Share.png" alt="" />
          <Typography variant='caption1' style={{ textAlign: 'center', display: 'block' }}><i>Publish to the Roblox platform</i></Typography>
        </div>
      </Grid>
    </Grid>
</Grid>

<Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant='h1'>What you can make</Typography>
      <p style={{ marginTop: 24 }}>Build currently focuses on 2D and 2.5D games. It works best with simpler game types, and more genres are coming in future updates.</p>
    </Grid>
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant='buttonLarge'>Clicker games</Typography><br />
          <Typography variant='body1'>Tap to earn, buy upgrades, and watch numbers grow. Simple mechanics that are satisfying to play and easy to expand.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant='buttonLarge'>Arcade games</Typography><br />
          <Typography variant='body1'>Fast-paced action with simple controls. Dodge obstacles, collect items, and compete for high scores.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant='buttonLarge'>Collect-and-score</Typography><br />
          <Typography variant='body1'>Gather items, earn points, and unlock rewards. A versatile format that works for many different themes.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant='buttonLarge'>Side-scrollers</Typography><br />
          <Typography variant='body1'>Run, jump, and navigate through levels. Build platformers, runners, and scrolling adventures.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant='buttonLarge'>Puzzle games</Typography><br />
          <Typography variant='body1'>Challenge players with logic, timing, or pattern-matching. Great for short play sessions.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flex: 1 }}>
          <Typography variant='buttonLarge'>More coming soon</Typography><br />
          <Typography variant='body1'>Build is expanding to support more game types and dimensions in future updates, including 3D.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} style={{ marginTop: 24, marginBottom: 48 }}>
      <p>The best results come from clear, specific descriptions. Tell Build how the game plays, what the player does, and what it looks like. You can always refine after the first generation.</p>
    </Grid>
</Grid>

<Grid style={{ paddingBottom: 48 }} item xs={12}>
  <Typography variant='h1'>Prompts and credits</Typography>
  <Grid container spacing={4}>
  <Grid item xs={12} md={6}>
  <div style={{ marginTop: 24 }}>
  <p>Every message you send to Build counts as one prompt, including follow-up changes. You get a set number of free prompts each day, and they reset daily.</p>
  <p>When your free prompts run out, you can buy more credits using Robux directly in Build. If you run out while a game is still being generated, that generation finishes fully before you're asked to buy more, so nothing you're working on is lost.</p>
  <p>Purchased credits do not expire.</p>
  </div>
  </Grid>
  <Grid item xs={12} md={6}>
  <Card variant="filled">
  <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography component="p" variant="h1">Free daily prompts</Typography>
  <Typography component="p" variant="h1" color="info">+</Typography>
  <Typography component="p" variant="h1">Buy more with Robux</Typography>
  </CardContent>
  </Card>
  </Grid>
  </Grid>
</Grid>

<Grid style={{ paddingBottom: 48 }} item xs={12}>
  <Typography variant='h1'>Tips for better results</Typography>
  <div style={{ marginTop: 24 }}>
    <div style={{ marginBottom: 48 }}>
      <h3>Be specific about gameplay</h3>
      <p>Instead of "make a fun game," try "a clicker game where I tap cookies, earn coins, and buy upgrades like faster clicking and auto-clickers." The more detail you give about how the game plays, what the player does, and what it looks like, the closer Build gets to what you have in mind on the first try.</p>
    </div>
    <div style={{ marginBottom: 48 }}>
      <h3>Refine with follow-ups</h3>
      <p>You don't need to get everything right in one prompt. Start with the basics, playtest, then describe what you want to change. "Make the enemies faster," "add a health bar," or "change the background to a forest" all work. Think of it like a conversation, not a single request.</p>
    </div>
    <div style={{ marginBottom: 48 }}>
      <h3>Playtest often</h3>
      <p>Tap Playtest after every few changes. It's easier to catch something that feels off early than to untangle multiple changes at once. If something doesn't work, describe what you expected to happen and what actually happened, and Build will adjust.</p>
    </div>
  </div>
</Grid>

<Grid style={{ marginBottom: 8 }} item xs={12}>
<Typography variant='h1'>Frequently asked questions</Typography>

<Grid style={{ marginBottom: 8 }} item xs={12}>
  <div style={{ marginTop: 24 }}>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>Who can use Build?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>Build is for users aged 9 and older who have completed an age check on their account, in regions where Build is available. Build is rolling out gradually, starting with New Zealand. If you don't see the Build tab, it may not have reached your region yet.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>How much does it cost?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>You get a set number of free prompts every day, and they reset daily. A prompt is each message you send to Build, including follow-up changes. If you'd like to keep creating after your free prompts run out, you can buy more credits using Robux directly in Build. Purchased credits do not expire.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>What kinds of games can I make?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>Build currently focuses on 2D and 2.5D games. It works best with simpler game types like clickers, arcade games, collect-and-score games, and side-scrollers. More game types are coming in future updates.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>My game didn't turn out the way I wanted. What can I do?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>Add more detail and try again. Be specific about how the game looks and plays, then describe what you want to change in the chat. For example: "make the coins bigger" or "add a timer." You can keep refining as many times as you like within your daily prompts.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>Build stopped before my game was finished. What should I do?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>Type "please continue" in the chat and Build will usually pick up where it left off. If that doesn't work, close and reopen the app, then try again.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>Why won't Build make the game I described?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>All Build games must follow Roblox's <a href="https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards">Community Standards</a>, so some
  requests can't be created due to content rules, your account's age setting, or copyright/IP restrictions. Build will usually suggest an alternative. Try rephrasing your idea to be more original, then send it again.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>Why is my game only available to older players?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>All Build games are set for players aged 16 and older by default. This is automatic and expected. If you'd like younger players to be able to play your game, you can apply through the Roblox Select process, which includes a content review.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>What happens if I edit my Build game in Roblox Studio?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>Editing your game in Roblox Studio permanently turns it into a standard Studio game and removes its Build status. This cannot be undone for that version. To keep your game as a Build game, make all changes in the Build chat. Your prompt history is saved, so you can recreate the game quickly if needed.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>Can I build with a friend?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>Each Build game has one creator. You can't create or edit Build games with other users. If you want friends to try the game before you publish, you can share it with up to 10 friends using a private playtest link.</p>
  </AccordionDetails>
  </BaseAccordion>
  <BaseAccordion>
  <AccordionSummary>
  <Typography variant='buttonLarge'>I was charged Robux but my game didn't generate. What can I do?</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <p>First, check your creations: if a game was still generating when this happened, it usually finishes and appears there. If the game truly didn't generate, contact <a href="https://en.help.roblox.com">Roblox Support</a> with your username, the date and time, and any error message you saw.</p>
  </AccordionDetails>
  </BaseAccordion>
  </div>
</Grid>
</Grid>
