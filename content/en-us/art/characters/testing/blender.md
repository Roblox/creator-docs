---
title: Testing in Blender
comments:
description: Verify the important aspects of your character model in Blender before importing into Studio.
next: /art/characters/testing/studio
prev: /art/characters/testing/
---

You can quickly verify many of your components in Blender, allowing you to catch out problems that may cause issues later on. You can use a mix of Blender native tools and Roblox's helper plugins to check for many common issues in your character model.

## Facial Animation Data

Facial animation uses multiple modeling components to work effectively. If using a template, or making changes to a model with existing facial animation data, it's sometimes possible to make a change that affects the saved poses, either in the animation timeline, or in the custom property of the head mesh.

Use the following steps to help verify the integrity of your facial animation data:

1. With the Armature object selected, check the animation frame in the **timeline**:

   1. The timeline typically ranges between **0–330**, though not all templates use the entire range, and there may be gaps between poses.
      <img src="../../../assets/art/avatar/basic-creation/Testing-Animation-Timeline.png" />
   2. The **neutral pose** should be on **frame 0**.
   3. There shouldn't be any keyframe gaps between the frames with animation data.

2. Verify the **Object Properties** > **Custom Properties** panel for the Head_Geo object:
   <img src="../../../assets/art/avatar/basic-creation/Testing-Custom-Properties.png" width = "80%" />

   1. There should be a **RootFaceJoint** attribute set to the name of the first facial animation bone.

      1. This bone should be a child of the **Head** bone, one of the 15 required bones in an avatar's armature.
      2. In templates and some reference models, this bone is commonly named `DynamicHead` and indicates the beginning of the facial animation rig.

   2. There should be about the same number of custom properties as unique animation frames, with each animation pose having its own mapped custom property.
   3. The names for the mapped poses here should match the spelling and capitalization of the [FACS Pose Reference](../../../art/characters/facial-animation/facs-poses-reference.md).

   <video controls src="../../../assets/art/avatar/basic-creation/Testing_01.mp4" width="100%"></video>

<Alert severity = 'error'>
If you discover issues with your face animation data, you may need to repeat the skinning, posing, or mapping processes for your character's head. See [Creating Heads](../../../art/characters/facial-animation/creating-basic-heads.md) for a general overview of the avatar head creation process.

If you are using a template and run into issues, it's possible the facial data was overridden by a saved animation, or the rigging or mapped data was mistakenly deleted. If it's difficult to quickly identify and resolve the issue, it may be quicker to restart your character customization from the original template file.
</Alert>

## Body Skinning

Properly skinning your character models ensures natural joint movements and realistic poses and expressions. There are several ways to verify skinning data, like using Blender's Pose Mode to pose the joints and examine how certain orientations can affect the joint skinning.

Use the following steps in Blender to verify your joint skinning in Pose mode:

1. With the **Armature** object selected, navigate to the **Object Properties** > **Viewport Display** and enable **Show In Front**. This allows you to see and access bones within your character.
2. With the armature selected, and switch to **Pose Mode**.
3. Select all the face bones of your model and press <kbd>H</kbd> to hide. You can reveal these again later with <kbd>Alt</kbd><kbd>H</kbd> (<kbd>⌥</kbd><kbd>H</kbd>) in Pose mode.
4. Select any body bone and press <kbd>R</kbd> to rotate. Verify that your body bones correctly deform and bend the character mesh as expected in natural poses.

   1. While actively rotating a bone, right-click to cancel the rotation and set the bone to its original position.
   2. While actively rotating a bone, you can **click to confirm** the rotation and save the current position. You can combine this to make various poses of your character by changing the rotation of various limbs at once.
   3. If you've saved a rotation, press <kbd>Alt</kbd><kbd>R</kbd> (<kbd>⌥</kbd><kbd>R</kbd>) to clear any rotation in Pose Mode. Make sure to reset your pose whenever you complete testing.

   <video controls src="../../../assets/art/avatar/basic-creation/Testing_02.mp4" width="100%"></video>

You can also run through common poses and movements using Roblox's [Calisthenics tool](../../../art/modeling/calisthenics-tool.md) add-on, which applies several common animations to an avatar armature that you can play back and review in Blender's animation timeline.

<Alert severity = 'warning'>
The [Calisthenics tool](../../../art/modeling/calisthenics-tool.md) adds animations to your timeline to quickly preview body animations. Be careful when saving or exporting your character when using this tool, as it may conflict with saved facial animation data that uses the same timeline.
</Alert>

<video controls src="../../../assets/art/avatar/basic-creation/Testing_03.mp4" width="100%"></video>

<Alert severity = 'error'>
If you discover issues with your skinning, you may need to troubleshoot and reapply rigging and skinning steps to your humanoid. See [Rigging and Skinning](../../../art/modeling/rigging.md) for an overview of the rigging and skinning processes.

If you are using a template, it's possible the skinning data was affected by a destructive modeling change. This may require reskinning, or starting over your character customization from the original template file.
</Alert>

## Technical Specifications

Your avatar components should match the requirements provided in the [avatar specifications](../../../art/characters/specifications.md). When using templates and following appropriate non-destructive modeling practices, most of these components should not be touched, but you should still double-check that each component is compliant with the technical requirements.

<Alert severity = 'success'>
If you are using Roblox character templates and are ready to export into Studio, see [Exporting instructions](../../../art/characters/creating/exporting-textures.md) for specific export instructions for template files.
</Alert>
