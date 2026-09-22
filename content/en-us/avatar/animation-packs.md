---
title: Create and publish animation packs
description: Explains how to prepare, upload, validate, and publish an animation pack on the Marketplace.
---

An **animation pack** is a coordinated set of avatar locomotion clips that controls how a player's character moves across experiences. Each pack replaces the default movement animations for seven core locomotion states.

## Animation pack contents

A complete animation pack covers the following locomotion states:

| State | Required clips     | Clip count | Description                                            |
| ----- | ------------------ | ---------- | ------------------------------------------------------ |
| Idle  | Idle               | 1 or 2     | Standing still with no player input.                   |
| Walk  | Walk               | 1          | Moving at walking speed.                               |
| Run   | Run                | 1          | Moving at running speed.                               |
| Jump  | Jump               | 1          | Launching into the air.                                |
| Fall  | Fall               | 1          | Descending after a jump or from a ledge.               |
| Climb | Climb              | 1          | Ascending a climbable surface.                         |
| Swim  | Swim and Swim Idle | 2          | Moving through water or remaining stationary in water. |

Idle supports up to two clips, and Swim includes both moving and stationary sub-animations, so a complete pack contains eight or nine clips.

Animation packs differ from [emotes](./emotes/index.md). Emotes are social animations that a player triggers, such as gestures or dances. Animation packs replace the locomotion set that plays automatically during movement.

## Requirements and limitations

Animation packs must meet the following requirements:

- All clips must reference a [standard R15 rig](./character-bodies/specifications.md#standard-r15-rigs).
- All clips must be original work authored by the creator. Packs that reuse default Roblox animations fail validation.
- Each clip must be a `Class.CurveAnimation`. The upload process doesn't accept `Class.KeyframeSequence` data.
- Each clip must be 10 seconds or shorter.
- All clips except Jump must loop.
- Every clip in the pack must share the same **Parent model name** so Studio groups them into one parent model.
- Packs must comply with [Marketplace policy](../marketplace/marketplace-policy.md).

You can author clips in Studio or an external tool, but you must complete upload and pack assembly in Studio. Uploads are limited to one pack per day per creator. The upload fee is 80 Robux per pack.

For details on fees, commissions, and current price floors, see [Marketplace fees and commissions](../marketplace/marketplace-fees-and-commissions.md). For the general Marketplace publishing workflow, see [Publish to Marketplace](../marketplace/publish-to-marketplace.md).

## Prepare animation clips

Repeat the following preparation workflow for each of the eight or nine required clips.

### Set up an R15 rig

1. In the **Avatar** tab, click **Character** to open the Rig Builder.
2. Select **R15**, then select **Block Avatar** to insert a base rig into the workspace.
3. In the **Avatar** tab, click **Clip Editor** to open the [Animation Editor](../animation/editor.md).
4. Select the rig in the viewport or the **Explorer** window. The Animation Editor timeline activates.

The resulting clips play on every supported avatar appearance. Authoring on a standard R15 Block Avatar rig provides broad compatibility.

### Import an animation clip

1. In the Animation Editor, click **&ctdot;** next to the rig name, then select **Import** ⟩ **From File**.
2. Select the target `.fbx` file.
3. In the **Import Settings** prompt, select **Imported Rig** as the root pose source.
4. Click **Import**. The animation data populates in the timeline.

### Convert a clip to CurveAnimation

1. On the timeline control bar, click the **Curve Editor** button to the right of the playback controls.
2. Click **Confirm**. The track converts to a `Class.CurveAnimation` clip.
3. Rename the clip in the top-left text field of the Animation Editor, such as `climb`, `fall`, `idle1`, or `jump`.
4. Click **&ctdot;**, then select **Save** to save the clip locally.

<Alert severity="warning">
Converting to a `Class.CurveAnimation` is irreversible, and the clip might not work with some third-party animation plugins. Verify your animation data before converting.
</Alert>

For more information on curve-based editing, see [Curve Editor](../animation/curve-editor.md).

### Configure clip looping

1. In the **Explorer** window, expand `Class.ServerStorage` ⟩ **RBX_ANIMSAVES** ⟩ **[your rig]**.
2. Select the saved animation track.
3. In the **Properties** window, find the **Data** section and enable **Loop**.

All clips except Jump must loop. Jump plays once per action and must not loop.

## Upload animation clips

Repeat the following upload process for each saved clip:

1. In the **Explorer** window, right-click the animation asset and select **Save to Roblox**.
2. Set **Title** to the clip name.
3. Set **Creator** to your account or group.
4. Enable **Set Animation Properties (Optional)**. The dialog expands with additional fields.
5. Complete the animation property fields described in [Configure animation properties](#configure-animation-properties). Although the UI labels this setting as optional, you must complete these fields to assemble the pack correctly.
6. Click **Save**, then wait for the **Successfully submitted** confirmation with the new asset ID.

### Configure animation properties

| Field             | Description                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Animation type    | The matching locomotion category, such as **Climb Animation**, **Walk Animation**, or **Idle Animation**.                                                          |
| Sub animation     | The matching subtype when applicable. For Swim clips, select **Swim** for the moving clip and **Swim Idle** for the stationary clip.                               |
| Parent model name | A shared string for every clip in the pack, such as `my_animation_pack`. Studio uses this string to group all clips into one parent model under `Class.Workspace`. |
| Weight            | Applies to Idle clips only. See [Assign Idle weights](#assign-idle-weights).                                                                                       |

Every clip in the pack must use the same **Parent model name**. If the names don't match, Studio creates separate models and the pack fails validation.

### Assign Idle weights

A pack supports up to two Idle clips. The **Weight** field accepts a positive integer that defines the relative selection weight between the clips. The default weight is `1` when the field is blank.

## Assemble and validate an animation pack

1. In the **Explorer** window under `Class.Workspace`, locate the parent model created from the shared **Parent model name**.
2. Right-click the parent model and select **Save to Roblox**.
3. Set **Title** and **Description** to the public-facing name and details for the pack.
4. Set **Content Type** to **Avatar Item**.
5. Set **Asset Category** to **Avatar Animations**.
6. Review the validation list. Studio displays seven state groups: Fall, Swim, Jump, Walk, Climb, Idle, and Run. Every entry must show **Validation Succeeded**.
7. If any entry shows a failure, correct the issue before continuing. Common causes include mismatched parent model names, missing clips, incorrect looping settings, or clips that aren't `Class.CurveAnimation` objects.
8. Review the displayed transaction details and click **Pay & Submit**.

After submission, follow the confirmation link to the Creator Dashboard to configure Marketplace settings.

A clip fails validation if it does any of the following:

- Moves the root joint too far from its starting position.
- Exceeds the maximum frame-to-frame movement speed.
- Translates a body part more than 1.5 studs from its starting position in any frame.
- Runs longer than 10 seconds.

For the complete list of validation checks and error messages, see [UGC validation system](../marketplace/validation-system.md).

## Publish an animation pack

After Studio submission, the pack enters the moderation queue. Once approved, configure pricing, availability, and other Marketplace settings in the Creator Dashboard. The Marketplace price floor for animation packs is 300 Robux. This is the minimum selling price, not an additional fee.

Group uploads and Limited publishing are supported for animation packs.

For the full publishing workflow, including metadata, pricing, and sale options, see [Publish to Marketplace](../marketplace/publish-to-marketplace.md). For details on fees, commissions, and price ranges, see [Marketplace fees and commissions](../marketplace/marketplace-fees-and-commissions.md).

## Animation pack behavior in experiences

When a player equips an animation pack, the pack applies in any experience whose **Animation Packs** setting is set to **Player Choice**. This is the default setting. Developers can select **Standard R15** or **Standard R6** to override player animation packs with standard platform animations.

For more information on configuring animation and movement settings, see [Avatar Settings](../studio/avatar-settings.md#movement).

## Troubleshooting

| Issue                                                            | Correction                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pack is missing one or more locomotion states during validation. | Verify that you uploaded a clip for every required state and that each clip uses the correct **Animation type** and **Sub animation** values.                                                                                                                 |
| Parent model names don't match.                                  | Every clip in the pack must use the same **Parent model name** string. Re-upload any clip that uses a different name.                                                                                                                                         |
| Clip doesn't loop when expected.                                 | All clips except Jump must have **Loop** enabled in the **Properties** window. Select the saved track under `Class.ServerStorage` ⟩ **RBX_ANIMSAVES** ⟩ **[your rig]**, then enable **Loop**.                                                                 |
| Clip isn't a CurveAnimation.                                     | Convert the clip using the **Curve Editor** button in the Animation Editor before saving. The upload process requires `Class.CurveAnimation` output.                                                                                                          |
| Validation fails with spatial bounds errors.                     | A body part translates more than 1.5 studs from its starting position in a frame, the root joint moves too far from its starting position, or the clip exceeds the maximum frame-to-frame movement speed. Reduce extreme translations and re-export the clip. |
| Validation fails with a duration error.                          | Each clip must be 10 seconds or shorter. Trim the clip in the Animation Editor and re-upload it.                                                                                                                                                              |
| Upload fails with an ownership or moderation error.              | Verify that you own all animation assets or have the correct group permissions. Assets with pending moderation or that belong to another creator can't be included in the pack.                                                                               |
| Group upload fails because of missing permissions.               | Verify that the uploading account has a group role with permission to create assets.                                                                                                                                                                          |
