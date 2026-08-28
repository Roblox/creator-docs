---
title: Remove extra bones
description: When creating characters in Blender, you must remove the extra head bones included in the template.
next: /art/characters/creating/verify-attachments
prev: /art/characters/creating/combine-head-geometry
---

The helper bones used to help place the head geometries also require removal to validate correctly. While these extra bones do not include any skinning data, do not delete any of the facial animation bones parented within DynamicHead, as these include important skinning data that drives facial animation.

<Alert severity = 'error'>
Failure to [combine head geometry](../../characters/creating/combine-head-geometry.md) and remove head bones will cause issues with validation, as the character will no longer adhere to the standard [geometry](../../../avatar/character-bodies/specifications.md#body-parts) and [joint hierarchy](../../../avatar/character-bodies/specifications.md#rigging).
</Alert>

Remove the additional head bones by selecting them and deleting them in edit mode:

1. If required for your template, toggle visibility on your **Armature** object. The bones display in the viewport.
1. In the Outliner, expand the character's armature object and find the **Joints** object that parents the bone structure of the character.

   <img src="../../../assets/art/avatar/basic-creation/Select-Joint-Objects.png" />

1. Expand the **Joints** object's hierarchy by holding <kbd>Shift</kbd> and clicking the expansion dropdown.
1. In the viewport, select any bone and switch to **Edit** mode.
1. Under the `Head` joint, hold <kbd>Shift</kbd> and select all the head child joints except `DynamicHead`.

   <img src="../../../assets/art/avatar/basic-creation/Select-Bone-Objects.png" />

1. With the extra head bones selected, right-click in the viewport and select **Delete Selected Bones** from the contextual menu.

   <video controls src="../../../assets/art/avatar/basic-creation/Cleanup_01-1.mp4" width="100%"></video>
