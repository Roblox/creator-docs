---
title: Curriculum Paths
description: An overview of creation curriculum paths covering topics like modeling, scripting, and gameplay logic.
hideInPageNavigation: true
hideBreadcrumbs: true
---

**Curriculum paths** provide a comprehensive overview of the various skills you need for different game development areas after you familiarize yourself with Studio's core functionality. Each curriculum path provides:

- Conceptual information about the game development area and how it applies to Studio.
- Step-by-step implementation instruction to complete each game design process.
- A working sample for each section of the tutorial so that you can track your progress.

If you prefer to learn Studio features through short lessons, you can explore [use case tutorials](index.md) that focus on recreating common game design components like [score bars](../tutorials/building/ui/creating-a-score-bar.md), [modular cities](../tutorials/3D-art/assembling-modular-environments.md), and [health pickups](../tutorials/scripting/intermediate-scripting/creating-a-health-pickup.md).

<br /> <br />

<BaseAccordion>
<AccordionSummary>
<Typography variant="h4">Prerequisites</Typography>

</AccordionSummary>
<AccordionDetails>

<Typography variant="body2" color="textSecondary" component="p">
If you've never used Roblox Studio or coded before, start here before following any of the curriculum paths.
</Typography>

- [Setting up Roblox Studio](../studio/setting-up-roblox-studio.md) - Install
  and configure Roblox Studio.
- [Create Your First Experience](first-experience/index.md) - Build a simple experience.
- [Coding Fundamentals](../tutorials/fundamentals/coding-1/coding-fundamentals.md) - Learn the basics of programming with Lua.

</AccordionDetails>
</BaseAccordion>

<br /> <br />

<Card>

<CardContent>

<h2 style={{marginBottom: 12}}>Core</h2>

<Typography variant="body2" color="textSecondary" component="p">
Start here for a comprehensive introduction to creating in Studio! It covers
everything you need to know about creating a simple, but polished experience from scratch.
</Typography>

<>
<Grid
    alignItems="stretch"
    container
    direction="row">

<Grid item md={6} xs={12}
    direction="column"  >

<div class="container"
style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
<iframe src="https://www.youtube-nocookie.com/embed/zi0hIuPDyWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen  style={{position: "absolute", top: 0, left: 0, width: "90%", height: "90%"}}></iframe>
</div>

</Grid>

<Grid item md={6} xs={12} direction='column'>

<>
<Stepper activeStep={3} orientation="vertical">

<Step style={{marginTop: -36}}>
<StepLabel optional="Create the basic structure of the world with in-Studio assets.">

<h5 style={{marginTop: 36}}>Build</h5>
</StepLabel>

</Step>

<Step style={{marginTop: -36}}>
<StepLabel
 optional="Create the gameplay for the experience using Luau scripts.">

<h5 style={{marginTop: 36}}>Script</h5>
</StepLabel>
</Step>
<Step style={{marginTop: -36}}>
<StepLabel optional="Add lighting, visual effects, and high-quality 3D assets." >
<h5 style={{marginTop: 36}}>Polish</h5>
</StepLabel>
</Step>
</Stepper>
</>

</Grid>

</Grid>
</>

<a href="core/index.md">
  <Button
    variant="contained"
    size="large">
  Start Creating
  </Button>
</a>
</CardContent>

</Card>

<br /> <br />

<Card>

<CardContent>

<h2 style={{marginBottom: 12}}>Environmental Art</h2>

<Typography variant="body2" color="textSecondary" component="p">
Learn the foundational skills you need to become an environmental artist.
</Typography>

<>
<Grid
    alignItems="stretch"
    container
    direction="row">

<Grid item md={6} xs={12}
    direction="column"  >

<div class="container"
style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
<iframe src="https://www.youtube-nocookie.com/embed/nwShvDmFHWc?si=2gk0n6cb9uq-48Ni" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen  style={{position: "absolute", top: 0, left: 0, width: "90%", height: "90%"}}></iframe>
</div>

</Grid>

<Grid item md={6} xs={12} direction='column'>

<>
<Stepper activeStep={3} orientation="vertical">

<Step style={{marginTop: -36}}>
<StepLabel optional="Create a plan for your environment and necessary assets.">

<h5 style={{marginTop: 36}}>Plan</h5>
</StepLabel>

</Step>

<Step style={{marginTop: -36}}>
<StepLabel
 optional="Assemble and apply your asset library to the 3D space to bring your world to life.">

<h5 style={{marginTop: 36}}>Construct</h5>
</StepLabel>
</Step>
<Step style={{marginTop: -36}}>
<StepLabel optional="Configure your assets and Studio settings to keep your frame rate and performance levels high." >
<h5 style={{marginTop: 36}}>Optimize</h5>
</StepLabel>
</Step>
</Stepper>
</>

</Grid>

</Grid>
</>

<a href="environmental-art/index.md">
  <Button
    variant="contained"
    size="large">
  Start Creating
  </Button>
</a>
</CardContent>

</Card>

<br /> <br />

<Card>

<CardContent>

<h2 style={{marginBottom: 12}}>Gameplay Scripting - Part 1</h2>

<Typography variant="body2" color="textSecondary" component="p">
Learn the programming skills you need to introduce gameplay to the laser tag environment.
</Typography>

<>
<Grid
    alignItems="stretch"
    container
    direction="row">

<Grid item md={6} xs={12}
    direction="column"  >

<div class="container"
style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
<iframe src="https://www.youtube-nocookie.com/embed/eqQyFL7KnmA?si=yVlqGzUvTnblj_c4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen  style={{position: "absolute", top: 0, left: 0, width: "90%", height: "90%"}}></iframe>
</div>

</Grid>

<Grid item md={6} xs={12} direction='column'>

<>
<Stepper activeStep={3} orientation="vertical">

<Step style={{marginTop: -36}}>
<StepLabel optional="Spawn players into the environment, and respawn them once their health reaches zero.">

<h5 style={{marginTop: 36}}>Spawn</h5>
</StepLabel>

</Step>

<Step style={{marginTop: -36}}>
<StepLabel optional="Create a blast mechanic that is both accurate in the 3D space and satisfying to players.">

<h5 style={{marginTop: 36}}>Blast</h5>
</StepLabel>
</Step>
<Step style={{marginTop: -36}}>
<StepLabel optional="Implement laser detecting behavior that handles blast direction, verifies collision, and reduces player health." >

<h5 style={{marginTop: 36}}>Detect</h5>
</StepLabel>
</Step>
</Stepper>
</>

</Grid>

</Grid>
</>

<a href="gameplay-scripting/index.md">
  <Button
    variant="contained"
    size="large">
  Start Creating
  </Button>
</a>
</CardContent>

</Card>
