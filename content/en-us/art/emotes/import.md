---
title: Import and configure animations
description: Use the 3D Importer to add third-party models to Studio before testing, using, or uploading the character model.
---

Use the following steps to import and configure the animation for publishing emotes:

1. [Import](#import-into-animation-editor) the animation into Studio.
2. [Convert](#convert-to-curveanimation) the animation to a `CurveAnimation`.
3. [Generate an asset ID](#generate-asset-id) from your animation data.
4. [Create an Animation object](#create-an-animation-object) using the asset ID
5. [Upload](#upload-and-publish-an-emote) the animation as an avatar emote.

## Import into Animation Editor

If your animation data is saved to a `.fbx` file and your animation meets the emote [technical specifications](./specifications.md), use the **Animation Editor** to import your animation. If your animation is already in Studio, skip this step.
<br />
To import your animation in Studio:

1. If you don't already have a rigged R15 character in your workspace, add one by selecting **Avatar** > **Character**.
2. Select **Avatar** > **Animation** to open the **Animation Editor**.
3. With editor open, select the rigged character in the 3D viewport.
4. In the **Animation Editor**, select **&ctdot;** > **Import** > **From FBX Animation** and select your `.fbx` file.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Import.png" />

5. Verify your animation populates and correctly animates on the target rig.
6. Follow steps to [convert to CurveAnimation](#convert-to-curveanimation).

## Convert to CurveAnimation

To generate an asset ID for your animation, use the **Animation Editor** to convert the animation to a `CurveAnimation` and save the animation to Roblox to generate an asset ID.

<Alert severity = 'warning'>
The animation data for emotes must be a `CurveAnimation` clip.
</Alert>

To convert an existing keyframe sequence to a `CurveAnimation`:

1. In the **Animation Editor**, select the **Curve Editor** button next to the timeline. A confirmation prompt displays.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Curve-Animation-Icon.png" />

2. Press **Confirm** to convert your keyframes into a `CurveAnimation` clip.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Curve-Prompt.png" />

## Generate Asset ID

To create an asset ID of the `CurveAnimation`:

1. In the **Animation Editor**, select the **&ctdot;** > **Publish to Roblox**.

   <img src="../../assets/avatar/avatar-emotes/Animation-Editor-Publish.png" />

2. Add a title and description and save the animation.
3. After processing, you should see a successful upload and an asset ID to copy.

   <img src="../../assets/avatar/avatar-emotes/Generate-Asset-ID-Success.png" />

## Create an Animation object

To submit an emote to the Marketplace, you must submit an `Class.Animation` object with the `AnimationId` property set to the asset ID of your `CurveAnimation`.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Explorer.png" />
    <figcaption><center>`Animation` object in the Explorer.</center></figcaption>

  </figure>
  <figure>
    <img src="../../assets/avatar/avatar-emotes/Animation-Properties.png" />
    <figcaption><center>`AnimationId` property in the Properties window.</center></figcaption>
  </figure>
</GridContainer>

To create an `Class.Animation` object you can publish as an emote:

1. In the **Explorer**, add a new `Animation` object.
2. In the **Properties** window, add the asset ID of the emote animation.

## Upload and publish an emote

When you have an `Class.Animation` with your emote animation asset ID set, you can upload the emote to the Marketplace. This process requires an [upload fee](../../marketplace/marketplace-fees-and-commissions.md#upload-fees).

1. Right-click the `Animation` object and select **Save to Roblox**.
2. In the upload window, set the following fields:
   1. Add a title and description.
   2. Set the **Content Type** to **Avatar Item**.
   3. Set the **Asset Category** to **Emotes**.
3. Press Submit to upload your asset for moderation.

For more information on the upload and publishing process, see [publishing Marketplace items](../../marketplace/publish-to-marketplace.md#upload-an-asset).
