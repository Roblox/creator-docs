---
title: Export and Import Animations
description: Part of the Roblox Build It, Play It Challenge - Island of Move. Export animations to share with other developers.
prev: /education/build-it-play-it-island-of-move/go-beyond-the-challenge
---

<img src="../../assets/education/build-it-play-it-island-of-move/sharing-animations/hero-banner.png" width="100%" />

Share animations with connections and fellow developers by exporting and importing them through Studio.

<Alert severity="info">
<AlertTitle>Animation Permission Changes</AlertTitle>
You can now share animations with connections, groups, and experiences without re-uploading them. For more information, see [Asset privacy](../../projects/assets/privacy.md).
</Alert>

## Export animations

Make sure to save your animation before exporting it.

1. In **Explorer**, expand the rig that you were animating with. It's likely that rig is named **_Dummy_**.

   <img src="../../assets/education/build-it-play-it-island-of-move/sharing-animations/select-animation-saves.png" width="50%" />

2. Expand **_AnimSaves_**. Then, find the name of the animation to share.

   <img src="../../assets/education/build-it-play-it-island-of-move/sharing-animations/select-animation.png" width="50%" />

3. Right-click the animation name and select **Save to File**. This saves the animation as an `.RBXM` file on your computer, which can be shared. You can export more than one animation at a time.

## Import animations

Animations saved in an `.RBXM` file can be imported into different rigs by yourself or by friends in any Roblox file.

1. Select the rig you want to use. In the **Explorer**, select **_AnimSaves_**.

   <Alert severity="warning">
   <AlertTitle>Check The Rig Has Previous Animations</AlertTitle>
   If the rig doesn't have any previous animations, it won't have an AnimSaves folder. To make that folder, in the rig, create and save a new animation. Saving an animation automatically creates the needed folder.
   </Alert>

2. Right-click on **_AnimSaves_** and select **Insert From File**. Then, pick the `.RBXM` file with the exported animation.

3. To load the animation, in the Animation Editor (see the Plugins tab), click on **&ctdot;**.

   <img src="../../assets/education/build-it-play-it-island-of-move/sharing-animations/click-options.png" width="50%" />

   Next, in the drop-down menu, go to **Load** and select the name of the `.RBXM` file just imported.

### Troubleshooting tips

**Issue**: Animation Not Loading
In the original `.RBXM` file, make sure there is a saved `Class.KeyframeSequence` object.

<img src="../../assets/education/build-it-play-it-island-of-move/sharing-animations/animation-keyframe.png" width="50%" />

If only a `Class.Keyframe` object was imported, try re-exporting the original animation and importing again. Make sure to export the named `Class.KeyframeSequence` and not just a keyframe object.
