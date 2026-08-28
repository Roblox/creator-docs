---
title: Combine head geometry
description: When creating characters in Blender, you must combine the head geometry to a single object.
next: /art/characters/creating/remove-extra-bones
prev: /art/characters/creating/caging
---

Whenever you are ready to export your model, it's important to clean up your project to ensure that your model is ready to export. This includes the following tasks that ensure the customized template model and all of the avatar components can import into Studio successfully:

- Combining extra head geometry
- Removing extra head bones
- Verifying attachment points
- Final technical checks

<Alert severity = 'error'>
Failure to combine head geometry and [remove head bones](../../characters/creating/remove-extra-bones.md) will cause issues with validation, as the character will no longer adhere to the expected standard [geometry](../../../avatar/character-bodies/specifications.md#body-parts) and [joint hierarchy](../../../avatar/character-bodies/specifications.md#rigging).
</Alert>

## Combine head geometry

At this point, you should also combine the separate head and face objects within the single `Head_Geo` object. Some templates don't include some face objects, like lashes. To combine the head and face meshes:

1. In the Outliner, hold <kbd>Ctrl</kbd>/<kbd>⌘</kbd> and click the following objects, ending with the `Head_Geo`:

   - `UpperTeeth_Geo`
   - `LowerTeeth_Geo`
   - `Tongue_Geo`
   - `RightLash_Geo`
   - `RightEye_Geo`
   - `LeftLash_Geo`
   - `LeftEye_Geo`
   - `Head_Geo`

   <img src="../../../assets/art/avatar/basic-creation/Template-Face-Objects.png" />

   <Alert severity = 'error'>
   When selecting multiple head objects, make sure that the `Head_Geo` is highlighted as yellow, indicating it as the main object that the others merge into. This correctly preserves the custom properties stored in the head mesh. You can achieve this by selecting the head last in the Outliner.
   </Alert>

1. While in **Object** mode, right-click in the viewport and select **Join** from the contextual menu. The objects combine as a single `Head_Geo` object.

   <video controls src="../../../assets/art/avatar/basic-creation/Cleanup_01.mp4" width="100%"></video>
