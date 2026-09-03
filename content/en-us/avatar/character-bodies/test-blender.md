---
title: Blender tests for character bodies
description: Verify the important aspects of your character model in Blender before importing into Studio.
---

It's important to periodically test your character bodies in Blender so that you can catch issues before they become larger problems when you import your characters into Studio. As you iterate on various character components, perform the following Blender tests regularly and review any areas of concern.

## Technical specifications

Your character body components for your avatar must follow the requirements in Roblox's [character body specifications](./specifications.md). When using templates and following appropriate non-destructive modeling practices, most of these components should not be touched, but you should still double-check that each component is compliant with the technical requirements before importing your work into Studio, including but not limited to:

- Body scale requirements
- Triangle budgets
- Body part naming and visibility
- Rigging and skinning data
- Attachment naming and positioning
- Outer cage naming and positioning

## Facial animation data

Facial animation uses multiple modeling components to work effectively. If you're using a [template](../resources.md#templates) or otherwise making changes to a model with existing facial animation data, it's possible to accidentally make an update that affects the saved poses, either in the animation timeline or in the custom properties of your character's `Head_Geo` mesh.

The following steps can help you verify the integrity of your facial animation data:

1. With the **Armature** object selected, review your animation frames in the **timeline**:

   - The timeline typically ranges between `0`–`330`, though not all templates use the entire range, and there may be gaps between poses.

      <img src="../../assets/art/avatar/basic-creation/Testing-Animation-Timeline.png" />

   - Check that the character's **neutral pose** is on **frame 0**.
   - Remove any keyframe gaps between the frames with animation data.

1. Review the **Object Properties** > **Custom Properties** panel for the `Head_Geo` object:

   <img src="../../assets/art/avatar/basic-creation/Testing-Custom-Properties.png" width = "60%" />

   - Check that the **RootFaceJoint** attribute is set to the name of the first facial animation bone.

      - Ensure that this bone is a child of the **Head** bone, one of the [15 required bones](./specifications.md#rigging) in an avatar's rigging armature.
      - In templates and some reference models, this bone is commonly named `DynamicHead`, and it indicates the beginning of the facial animation rig.

   - Check that there is the same number of custom properties as unique animation frames, with each animation pose having its own mapped custom property.
   - Check that the names for the mapped poses here match the spelling and capitalization of the [FACS pose reference](../dynamic-heads/facs-poses-reference.md).

   <video controls src="../../assets/art/avatar/basic-creation/Testing_01.mp4" width="100%"></video>

<Alert severity = 'error'>
If you discover issues with your face animation data, you may need to repeat the skinning, posing, or mapping processes for your character's head. For a general overview of the avatar head creation process, see [Creating heads](../../art/characters/facial-animation/create-basic-heads.md).

If you are using a template and run into issues, it's possible the facial data was overridden by a saved animation, or the rigging or mapped data was mistakenly deleted. If it's difficult to quickly identify and resolve the issue, it may be quicker to restart your character customization from the original template file.
</Alert>

## Skinning data

Properly skinning your character models ensures natural joint movements and realistic poses and expressions. There are several ways to verify skinning data, such as using Blender's Pose mode to pose your character's joints and examine how certain orientations can affect its joint skinning.

The following steps can help you verify the quality of your skinning data:

1. With the **Armature** object selected, navigate to **Object Properties** > **Viewport Display**, then enable **Show In Front**. This allows you to see and access bones within your character.
1. Switch to **Pose** mode, then select all the face bones of your model and press <kbd>H</kbd> to hide them. You can reveal these again later with <kbd>Alt</kbd><kbd>H</kbd> (<kbd>⌥</kbd><kbd>H</kbd>) in Pose mode.
1. Select any body bone and press <kbd>R</kbd> to rotate. Verify that your body bones correctly deform and bend the character mesh as expected in natural poses.

   1. While actively rotating a bone, right-click to cancel the rotation and set the bone to its original position.
   1. While actively rotating a bone, you can **click to confirm** the rotation and save the current position. You can make various poses of your character by changing the rotation of various limbs at once.
   1. If you've saved a rotation, press <kbd>Alt</kbd><kbd>R</kbd> (<kbd>⌥</kbd><kbd>R</kbd>) to clear any rotation in Pose Mode. Make sure to reset your pose whenever you complete testing.

   <video controls src="../../assets/art/avatar/basic-creation/Testing_02.mp4" width="100%"></video>

You can also run through common poses and movements using Roblox's [Calisthenics Tool](../../art/modeling/calisthenics-tool.md) add-on, which applies several common animations to an avatar armature that you can play back and review in Blender's animation timeline.

<Alert severity = 'warning'>
The [Calisthenics Tool](../../art/modeling/calisthenics-tool.md) adds animations to your timeline to quickly preview body animations. Be careful when saving or exporting your character when using this tool, as it may conflict with saved facial animation data that uses the same timeline.
</Alert>

<video controls src="../../assets/art/avatar/basic-creation/Testing_03.mp4" width="100%"></video>

<Alert severity = 'error'>
If you discover issues with your skinning, you may need to troubleshoot and reapply rigging and skinning steps to your humanoid. For an overview of the rigging and skinning processes, see [Rigging and skinning](../../art/modeling/rigging.md).

If you are using a template, it's possible the skinning data was affected by a destructive modeling change. This may require reskinning or starting over your character customization from the original template file.
</Alert>
