---
title: Play your animation
description: Explains how to export and replace a default character animation with your custom animation.
next: /tutorials/curriculums/animator/test-and-save
prev: /tutorials/curriculums/animator/work-with-the-animation-editor
---

In order to play your animation in your open experience, as well as store it for reuse in other projects, you must publish the animation to the cloud. This process creates a unique animationID for your animation that you can reference in scripts, which is especially important if you want to replace any of Roblox's default character animations.

In this chapter, let's go over how to export your animation by publishing it to Roblox, then swap out the template's default walk animation with your own creation.

## Export new animation

If you were to close Studio right now, you would lose all of your work on your animation because your animation doesn't have an **animationID** that Studio can reference for your projects. To fix this, you must export your animation to Roblox so that Studio can connect the animation to your account.

To export your new animation:

1. In the **Animation Editor**, click on the **&ctdot;** and select **Publish to Roblox**. The **Asset Configuration** window displays.

   <img src="../../../assets/education/build-it-play-it-island-of-move/publish-animations/Publish-Highlight.png" width="60%" />

1. In the **Asset Configuration** window, give your animation a name and description, then click the **Save** button. After a few moments, the window confirms your animation was successfully submitted.

1. Copy your animation's animationID by clicking the icon next to the ID.  A green "_ID Copied!_" text pop-up displays when you have done this step correctly.

   <img src="../../../assets/education/build-it-play-it-island-of-move/publish-animations/publish-copy-id.png" width="50%" />

1. Click the **Close** button.

## Replace default animation

Every player character includes a set of **default animations** that play whenever the character performs specific in-experience actions, such as running, climbing, or jumping. Roblox provides these animations out-of-the-box for every experience without any additional coding effort.

<GridContainer numColumns="3">
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Fall-Animation.mp4" width="100%"></video>
    <figcaption>Default Fall Animation</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Swim-Animation.mp4" width="100%"></video>
    <figcaption>Default Swim Animation</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Climb-Animation.mp4" width="100%"></video>
    <figcaption>Default Climb Animation</figcaption>
  </figure>
</GridContainer>

You can swap out default animations with your own custom animations so that they play for every player that joins your experience. For this lesson, let's swap out the default walking animation with your swim animation so that you can see how it looks with your avatar as soon as you start playing.

To replace the default walking animation with your custom swimming animation:

1. Find the default walk animation.
   1. In the **Explorer** window, go to the search bar, then type **walk**.
   1. In your search results, click on **WalkAnimationID**.

   <img src="../../../assets/education/build-it-play-it-island-of-move/change-the-animation/search-walk-select.png" width="50%" />

   <Alert severity="warning">
   If you don't see the **Explorer** and **Properties** windows, open them from Studio's **Window** menu.
   </Alert>

1. In the **Properties** window, click the **Value** field and paste your animation ID by pressing <kbd>Ctrl</kbd><kbd>V</kbd> or <kbd>⌘</kbd><kbd>V</kbd>, depending on your computer.

   <img src="../../../assets/education/build-it-play-it-island-of-move/change-the-animation/set-animation-value.png" width="50%" />

   <Alert severity="info">
   <AlertTitle>Need to Get the Animation ID?</AlertTitle>
   If your animationID didn't paste into the Value field, you need to get your animation's animationID again. To do this:

   1. Go to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
   1. In the horizontal navigation, select **Development Items**, then click the **Animations** button. All animations you have ever published display here.

      <img src="../../../assets/education/build-it-play-it-island-of-move/change-the-animation/Animations-Button.png" width="100%" />

   1. Select your animation. The animation's **Configure** page displays.
   1. In the left-hand navigation, click the vertical three dots icon, then select **Copy Asset ID** from the contextual menu.

      <img src="../../../assets/education/build-it-play-it-island-of-move/change-the-animation/CopyAssetID.png" width="50%" />

   </Alert>
