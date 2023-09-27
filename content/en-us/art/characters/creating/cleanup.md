---
title: Cleanup
comments:
description: When designing characters in Blender, the character model requires minor adjustments to be Studio-ready.
next: /art/characters/creating/exporting
previous: /art/characters/creating/caging
---

Whenever you are ready to export your model, it's important to clean up your project to ensure that your model is ready to export. This includes a variety of tasks that ensure the customized template model and all of the avatar components can import into Studio successfully.

<Alert severity = 'error'>
Failure to [combine head geometry](#combining-head-geometry) and [remove head bones](#removing-extra-bones) will cause issues with validation, as the character will no longer adhere to the expected R15 geometry and joint hierarchy.
</Alert>

## Combining Head Geometry

At this point, you should also combine the separate head and face objects within the single Head_Geo object. Some templates don't include some face objects, like lashes. To combine the head and face meshes:

1. In the Outliner, hold <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and click following objects, ending with the Head_Geo:

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
   When selecting multiple head objects, make sure that the **Head_Geo** is highlighted as yellow, indicating it as the main object that the others merge into. This correctly preserves the custom properties stored in the head mesh.
   </Alert>

2. While in Object mode, right-click in the Viewport and select **Join**. The objects combine as a single **Head_Geo**.
   <video controls src="../../../assets/art/avatar/basic-creation/Cleanup_01.mp4" width="100%"></video>

## Removing Extra Bones

The helper bones used to help place the head geometries also require removal to validate correctly.

Remove the additional head bones by selecting them and deleting them in edit mode:

1. If required, toggle visibility on your **Armature** object. The bones display in the viewport.
2. In the Outliner, expand the character's armature object and find the **Joints** object that parents the bone structure of the character.

   <img src="../../../assets/art/avatar/basic-creation/Select-Joint-Objects.png" />

3. Expand the Joints hierarchy by holding **shift** and clicking the expansion dropdown.
4. In the viewport, select any bone and switch to **Edit Mode**.
   <img src="../../../assets/art/avatar/basic-creation/Select-Bone-Objects.png" />
5. Under the Head joint, hold **shift** and select all the head children joints except DynamicHead.
6. With the extra head bones selected, right click in the viewport and select **Delete Selected Bones**.
   <video controls src="../../../assets/art/avatar/basic-creation/Cleanup_01-1.mp4" width="100%"></video>

## Verifying Attachment Points

Attachment points are non-rendered objects of your avatar where rigid accessories attach to. Each template includes the required attachments at their expected locations ending with **\_Att**. Before exporting, it's important to verify the attachment position and, if necessary, adjust the location if you made any changes to the shape of your model.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Attachment.png" />  <figcaption>Original template attachment positions</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Attachment.png" /><figcaption>Attachments after adjustment</figcaption></figure>
</GridContainer>

Center attachment points at their respective locations. Each attachment should overlap approximately halfway with the character's mesh.

This tutorial only changes the head of your model, so you only need to adjust the **Hat**, **Hair** and **FaceFront** attachments. To enable visibility and verify your head attachment point:

1. If you haven't already, enable [disabled objects](../../../art/characters/creating/index.md#disabled-objects) in your Outliner.
2. In the Outliner, find the Joints parent object.
3. Hold <kbd>Shift</kbd> and click the **Hide** icon for the Joints object to hide everything.
4. Expand the Joints object and un-hide the Head_Geo and Hat_Att and Hair_Att.
   1. If required, disable **Disable In Viewport** <img src="../../../assets/art/blender-ui/Disabled-Icon.png" style={{marginBottom:"0px;"}}/> next to the \_Att objects.
5. Toggle Visibility for the **Hat_Att**, **Hair_Att**, and **FaceFront_Att**.
6. Verify the placement of the attachments. The goblin's head is shorter than the starting template, so the attachments require minor vertical adjustment.
7. Select the attachments
8. Switch to **Edit** Mode.
9. Using the Grab tool, position the attachments vertically along the y-axis until they are about halfway embedded in the head.
   <video controls muted src="../../../assets/art/avatar/basic-creation/Cleanup_02.mp4" width="100%"></video>

## Final Checks

Depending on the types of customizations you made to your template project or model, the following are additional tasks to look out for when cleaning up your project:

- Ensure that your project doesn't contain additional mesh objects that aren't part of your character model geometry.
- Verify that there isn't additional animation data, such as additional keyframes or saved poses and orientations that are not related to the original facial animation data.
- Double-check that your geometry, rig, and texture adhere to the [avatar technical specifications](../../../art/characters/specifications.md).
