---
title: Create engaging experiences
prev: /education/build-it-play-it-mansion-of-wonder/experienced-landing-page
next: /education/build-it-play-it-mansion-of-wonder/connect-the-beam
description: Start learning how to add a tutorial using beam effects in Roblox Studio as part of the Build It Play It Mansion of Wonder. You can add these to your own game, or use a provided template.
---

Before starting, think about your past experiences opening a new game or smartphone app. In bad experiences, like trying to use a confusing app, you might have given up and closed it. Or maybe a game had too much information up front that was hard to remember.

In order to build good experiences, creators must engage and inform new users at the same time. There's an entire career devoted to studying this. **User experience (UX)** designers are people who take time to make sure that users can figure out where to go and how to accomplish goals without feeling frustrated.

For instance, these two pictures compare the impact user experience can have to someone's first impression of a game.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/ux-example-good.jpeg" />
    <figcaption>Accessible UX</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/ux-example-bad.jpeg" />
    <figcaption>Overwhelming UX</figcaption>
  </figure>
</GridContainer>

## Project setup

This course will walk through designing a guided tutorial using a starter template. Alternatively, you can use your own project since the finished tutorial system can be applied to any experience.

<img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/template-overview.jpeg" width="100%" />

The starter place for this series includes parts of an amusement park themed game where players collect tickets for a prize. New players will be directed to booths to collect their tickets.

### Open the template

Time to open Roblox Studio! Click the following button to open the **Boardwalk** template.

<UseStudioButton variant="" buttonTextTranslationKey="Action.EditInStudio" placeId="6763393969" universeId="2563173896" />

A new instance of Studio will open with the map. The first thing you'll see is a TestPlayer object that will simulate a player.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/open-template.jpg" />

### Use your own project

If using your own project, use the main actions your players will do during the experience. For instance, in a farming game, have players collect wheat to sell at a shop booth.

Additionally, we recommend the following:

1. **Import Files** - Import the [Boardwalk Starter Objects](https://www.roblox.com/library/6777983114/Boardwalk-Starter-Objects) into the project's Workspace using the Inventory. This includes ticket booths with ProximityPrompts and a TestPlayer.

2. **Follow the Course and Adapt** - When finished, replace the premade models with your own. Keep in mind, you may need to rename some variable references in scripts.

## The template

The place includes two interactive booths with `Class.ProximityPrompt|ProximityPrompts`, which are objects that run scripts when players interact with something in the template. During the tutorial, players will interact with each booth to collect tickets and advance the tutorial. Note that all parts but the booth and test player are locked.

## Beams and attachments

To guide players to booths for tickets, you'll create a path using beams like in the video below.

<video controls src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/beam-example.mp4" width="100%" ></video>

**Beams** are objects also used for effects like lasers or force fields. This object draws a texture between two points with customizable properties like speed, width, and curve size.

To display the beam, **attachments** are needed to set the beam's start and end points. You'll insert one attachment into the player and the other attachment into the goal object.

1. In the **Explorer** window, find **TestPlayer** and add an **attachment** named **PlayerAttachment**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/create-player-attachment.png" width="40%" />

2. Under **TestPlayer**, add a **Beam** named **TutorialBeam**. Keep in mind, the beam won't be visible until its start and end points are set later on.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/create-beam.png" width="40%" />

3. Find the **TutorialGoals** folder and **expand** it. Under both **InteractionPart** objects, add an attachment named **GoalAttachment**.

   <img src="../../assets/education/build-it-play-it-mansion-of-wonder/creating-engaging-experiences/create-goal-attachments.png" width="40%" />
