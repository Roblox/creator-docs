---
title: Combining Head Geometry
description: When creating characters in Blender, you must combine the head geometry to a single object.
next: /art/characters/creating/removing-extra-bones
prev: /art/characters/creating/caging
---

Whenever you are ready to export your model, it's important to clean up your project to ensure that your model is ready to export. This includes the following tasks that ensure the customized template model and all of the avatar components can import into Studio successfully:

- Combining extra head geometry
- Removing extra head bones
- Verifying attachment points
- Final technical checks

<Alert severity = 'error'>
Failure to combine head geometry and [remove head bones](../../characters/creating/removing-extra-bones.md) will cause issues with validation, as the character will no longer adhere to the expected R15 geometry and joint hierarchy.
</Alert>

## Combining Head Geometry

At this point, you should also combine the separate head and face objects within the single Head_Geo object. Some templates don't include some face objects, like lashes. To combine the head and face meshes:

1. In the Outliner, hold <kbd>Ctrl</kbd>/<kbd>⌘</kbd> and click following objects, ending with the Head_Geo:

   1. UpperTeeth_Geo
   2. LowerTeeth_Geo
   3. Tongue_Geo
   4. RightLash_Geo
   5. RightEye_Geo
   6. LeftLash_Geo
   7. LeftEye_Geo
   8. Head_Geo

   <img src="../../../assets/art/avatar/basic-creation/Template-Face-Objects.png" />

   <Alert severity = 'error'>
   When selecting multiple head objects, make sure that the **Head_Geo** is highlighted as yellow, indicating it as the main object that the others merge into. This correctly preserves the custom properties stored in the head mesh. You can achieve this by selecting the head last in the Outliner.
   </Alert>

2. While in Object mode, right-click in the Viewport and select **Join**. The objects combine as a single **Head_Geo**.
   <video controls src="../../../assets/art/avatar/basic-creation/Cleanup_01.mp4" width="100%"></video>
