---
title: Import emotes
description: Use the Animation Editor to import and convert animations into emotes.
---

Studio's [Animation Editor](../../animation/editor.md) lets you import animations into your projects. The following instructions detail how to import a `.fbx` file with animation data into Studio, convert it into a `CurveAnimation` object with an asset ID, then use that asset ID in `Class.Animation` objects that you can use in your games, upload to the Marketplace, or share with other creators.

It's important to ensure your emote meets Roblox's [emote specifications](./specifications.md) to use or sell this asset as an avatar-ready emote, otherwise you can encounter errors at different points in the workflow.

## Import into Studio

To import your asset as an animation:

1. If you don't already have a character body with a [standard](../character-bodies/specifications.md#standard-rigs) rigging armature, add one to your project in Studio.

   1. In the **Avatar** tab, click the **Character** button.

      <img src="../../assets/studio/general/Toolbar-Character.png" width="800" alt="Character button highlighted in Studio's toolbar." />

   1. Set **Rig Type** to **R15**.
   1. Set **Body Shape** to either **Masculine** or **Feminine**.
   1. Select an avatar style from the provided options. An avatar character body with a standard rigging armature displays in the viewport.

1. Open the Animation Editor.

   1. In the **Avatar** tab, click the **Clip Editor** button.
   1. Select the character with a standard rigging armature. The Animation Editor updates accordingly.

1. In the **Animation Editor**, select **&ctdot;** > **Import** > **From File** and select your `.fbx` file. Your animation populates in the Animation Editor's timeline.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Import.png" width="80%"/>

## Generate asset ID

To generate an asset ID for your animation, you must first convert your animation data in the timeline into a `CurveAnimation` object. When you save the `CurveAnimation` object, Roblox creates a cloud-based asset ID to represent your emote.

<Alert severity = 'warning'>
The animation data for emotes must be a `Class.CurveAnimation` object instead of a `Class.KeyframeSequence` object.
</Alert>

To convert an existing keyframe sequence to a `CurveAnimation`:

1. In the **Animation Editor**, select the **Curve Editor** button next to the timeline. A confirmation prompt displays.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Curve-Animation-Icon.png" width="80%"/>

1. Press **Confirm** to convert your keyframes into a `CurveAnimation` clip.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Curve-Prompt.png" width="40%" />

1. Back in the **Animation Editor**, select the **&ctdot;** > **Publish to Roblox**. The **Asset Configuration** window displays.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Publish.png" width="80%" />

1. Add a title and description, then click the **Save** button. The **Asset Configuration** window updates with a copyable asset ID.

   <img src="../../assets/avatar/avatar-emotes/Generate-Asset-ID-Success.png" />

## Create an Animation object

To submit an emote to the Marketplace, you must submit an `Class.Animation` object with the `AnimationId` property set to the asset ID of your `CurveAnimation` object.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Explorer.png" />
    <figcaption><center>`Animation` object in the Explorer window.</center></figcaption>

  </figure>
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Properties.png" />
    <figcaption><center>`AnimationId` property in the Properties window.</center></figcaption>
  </figure>
</GridContainer>

To create an `Class.Animation` object you can publish as an emote:

1. In the **Explorer** window, add a new `Animation` object.
1. In the **Properties** window, add the asset ID of your emote animation.

## Upload emote to Marketplace

When you have an `Class.Animation` object with your emote animation asset ID set, you can upload the emote to the Marketplace. This process requires an [upload fee](../../marketplace/marketplace-fees-and-commissions.md#upload-fees) of **80 Robux**.

1. In the **Explorer** window, right-click the `Animation` object and select **Save to Roblox**. The **Asset Configuration** window displays.
1. Configure the following fields:
   1. Add a title and description.
   1. Set the **Content Type** to **Avatar Item**.
   1. Set the **Asset Category** to **Emote**.
1. Click the **Submit** button to upload your asset for moderation.

For more information on the upload and publishing process, see [Publish to Marketplace](../../marketplace/publish-to-marketplace.md#upload-an-asset).
