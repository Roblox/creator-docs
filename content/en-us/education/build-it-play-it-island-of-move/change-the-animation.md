---
title: Change the Animation
description: Part of the Roblox Build It, Play It Challenge - Island of Move. Swap the default walk animation with your own.
next: /education/build-it-play-it-island-of-move/invite-friends-to-play
prev: /education/build-it-play-it-island-of-move/exporting-animations
---

The template has a pre-built setting for what animation to use when players run. To change the animation, you'll need to replace the default animation with yours.

## Change the Animation ID

Now that you have the animation ID, you can enter it in your game. Then, Studio will know what animation to play.

1. Make sure on the right of Studio, you see two windows: the **Explorer** and **Properties**.

   <img src="../../assets/education/build-it-play-it-island-of-move/change-the-animation/show-explorer-properties.png" width="100%" />

   <Alert severity="warning">
   <AlertTitle>Don't See the Explorer or Properties?</AlertTitle>
   If you don't see either one, go to the **View** Tab. Then, click both **Explorer** and **Properties**.
   </Alert>

2. On the right side of the screen, find the **Explorer** which lists all of the objects in the game.

3. To find the walk setting, in the **search bar**, type "walk".

   <img src="../../assets/education/build-it-play-it-island-of-move/change-the-animation/search-walk.png" width="50%" />

4. Click on **_WalkAnimationID_**.

   <img src="../../assets/education/build-it-play-it-island-of-move/change-the-animation/search-walk-select.png" width="50%" />

5. Under the Explorer, find the **Properties** window.

6. Click the **Value** field and paste the animation ID by pressing <kbd>Ctrl</kbd> + <kbd>V</kbd> or <kbd>⌘</kbd> + <kbd>V</kbd>.

   <img src="../../assets/education/build-it-play-it-island-of-move/change-the-animation/set-animation-value.png" width="50%" />

   <Alert severity="warning">
   <AlertTitle>Need to Get the Animation ID?</AlertTitle>
   If nothing was pasted, or another line of text was used, you'll need to get the animation ID again.

   1. Open the [Animations](https://www.roblox.com/develop?View=24) section of the **Create** page.
   2. Locate and click an exported animation.
   3. **Copy** its **ID** from the URL in your browser.
      <img src="../../assets/education/build-it-play-it-island-of-move/change-the-animation/exported-animation-web.png" width="100%" />

   </Alert>

## Test and Check

After swapping the animation, play the game to see your creation.

1. Press the **Play** Button.

2. In the game, tap the **Move** button to see the animation play.

   <video controls src="../../assets/education/build-it-play-it-island-of-move/change-the-animation/finished-animation.mp4" width="100%"></video>

   <Alert severity="warning">
   If you make updates to the animation, remember to **Export** it.
   </Alert>

## Troubleshooting Tips

**Issue:** Animation is spotty, skips, or looks glitchy.

- Make sure that the first and last poses are the same. Right-click on the diamond for the first pose and copy it. Then, paste that pose at the end of the timeline.
- Check that the figure stays inside the white grid when selected. If not, it may go through walls or the ground.

**Issue:** Animation isn't the one that you were working on.

- Check that you've published the animation through the Animation Editor.

- Find in the Explorer an object named WalkAnimationID. Make sure its Value is only a number.
