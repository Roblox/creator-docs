---
title: Verifying Attachment Placement
description: When creating characters in Blender, the character model requires minor attachment adjustments to be Studio-ready.
next: /art/characters/creating/final-checks
prev: /art/characters/creating/removing-extra-bones
---

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
   1. If required, disable **Disable In Viewport** <img src="../../../assets/art/blender-ui/Disabled-Icon.png" style={{marginBottom:"0px;"}} width="20px"/> next to the \_Att objects.
5. Toggle Visibility for the **Hat_Att**, **Hair_Att**, and **FaceFront_Att**.
6. Verify the placement of the attachments. The goblin's head is shorter than the starting template, so the attachments require minor vertical adjustment.
7. Select the attachments
8. Switch to **Edit** Mode.
9. Using the Grab tool, position the attachments vertically along the y-axis until they are about halfway embedded in the head.
   <video controls muted src="../../../assets/art/avatar/basic-creation/Cleanup_02.mp4" width="100%"></video>
