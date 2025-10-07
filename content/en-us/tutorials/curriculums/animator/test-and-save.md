---
title: Test and save
description: Explains how to playtest and save your fitness experience.
next: /tutorials/curriculums/animator/next-steps
prev: /tutorials/curriculums/animator/play-your-animation
---

Now that your poses are complete and set up to play as your character's run animation, it's time to playtest your experience to verify that the animation plays properly, then publish your work to Roblox so that you can save your progress.

## Playtest your animation

It's important to playtest your experience often to ensure that your animation plays exactly the way you want it to play for your players. Studio offers several playtest options:

- **Test** – Starts the playtest by inserting your avatar at a spawn location.
- **Test Here** – Starts the playtest by inserting your avatar in front of the camera's current position.
- **Run** – Starts the playtest without inserting your avatar. Instead, the playtest begins at the current camera position and you can navigate around using the camera controls.

While all options are useful at different times, it's important to use a playtest option that inserts your avatar so that you can see your animation play.

To playtest your animation:

1. In the top-left corner of Studio, verify that your playtest is set to either **Test** or **Test Here**, then click the **Play** button. Studio enters playtest mode.

   <img src="../../../assets/education/general/play-button.png" width="360" />

1. Use the <kbd>WASD</kbd> keys to walk around and see the animation play.

   <video controls src="../../../assets/education/build-it-play-it-island-of-move/change-the-animation/finished-animation.mp4" width="70%"></video>

   <Alert severity="warning">
   If you make updates to the animation, remember to **Save** it in the **Animation Editor**.
   </Alert>

1. When you're done, return to the top-left corner of Studio, then click the **Stop** button. Studio exits playtest mode.

   <img src="../../../assets/education/general/stop-button.png" width="360" />

If you're running into any issues with your animation, check out the following troubleshooting tips:

**Issue:** Animation is spotty, skips, or looks glitchy.

- Make sure that the first and last poses are the same. If they aren't, right-click on the diamond for the first pose and copy it, then paste that pose at the end of the timeline.
- Check that the figure stays inside the white grid when you select it. If not, it may go through walls or the ground when the animation plays.

**Issue:** Animation isn't the one that you were working on.

- Check that you've published the animation through the **Animation Editor**.
- In the **Explorer** window, find an object named **WalkAnimationID**, then make sure its `Value` property is only a number.

## Publish to Roblox

You have access to your animation ID for other projects, but if you were to close Studio now, you would lose every edit you made to your experience. For this reason, it's important to publish your work to Roblox often to save your work and connect the experience to your account.

<Alert severity="info">
It's recommended to publish to Roblox every ten minutes or after making a big change.
</Alert>

1. In the top-left corner of your computer, click **File** → **Publish to Roblox** to open the publishing window.

1. In the **Publish Game** window,

   1. In the **Name** field, provide a name for your experience.
   1. <Chip label="OPTIONAL" size="small" variant="outlined" /> In the **Description** field, provide a summary of what a player can expect from the experience.
   1. In the **Devices** section, enable every device you want players to use to access your experience. Because this experience allows players to use mobile devices with accelerometers as a way to move characters, it's recommended to at least enable phones.
   1. At the bottom-right of the window, click the **Create** button.

Now that your experience is published and connected to your account, you can edit it from any computer!

<Alert severity="info">
<AlertTitle>Saving after publishing</AlertTitle>
Next time you want to save your work, just go to **File** → **Publish to Roblox** or use the hotkey combo (<kbd>Alt</kbd><kbd>P</kbd>/<kbd>⌥</kbd><kbd>P</kbd>).
</Alert>
