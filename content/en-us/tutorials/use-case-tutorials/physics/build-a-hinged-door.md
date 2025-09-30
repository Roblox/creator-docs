---
title: Build a hinged door
description: The process for creating a door using a HingeConstraint.
---

Roblox's physics system allows you to construct moving mechanisms like doors, rotating platforms, and even vehicles using **constraints**. For instance, a swinging door can be built using the `Class.HingeConstraint`.

<video controls loop muted>
   <source src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_finalExample.mp4" />
</video>

## Door setup

Start by creating parts for the door and its attachments. **Attachments** are where one object can connect to another. These attachments will later be used to connect the door to its frame with a hinge.

1. Create two parts with names like **Door** and **DoorFrame**.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints-showDoorCreated.jpg)

2. Select **DoorFrame**. In the **Properties** window, enable **Anchored** so it won't move.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_selectAnchored.png)

3. In the **Explorer**, hover over **DoorFrame** and add a new **Attachment**. Repeat the same to add an attachment to the **Door**.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_attachmentsCreated.png)

4. Rename the attachments to indicate what they're attached to, such as **DoorAttachment** and **FrameAttachment**.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_attachmentsRenamed.png)

## Move the attachments

New attachments are created in the center of a part. So they can work with the door, the two attachments need to be moved to face each other.

1. To view constraints and attachments, toggle on **Show Constraint Details** from Studio's **View** menu.
2. In the **Explorer**, select **FrameAttachment**.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_selectFrameAttachment.png)

3. Press <kbd>F</kbd> to focus on the attachment and zoom in if needed. Then, use the **Move** tool to position the attachment on the surface of the door frame, facing the door.

   <video controls loop muted>
      <source src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_showMoveAttachment.mp4" />
   </video>

    <Alert severity="info">

   It's best to position attachments so they're precisely aligned with one another. In this case, misaligned attachments may cause the door to swing incorrectly.

   For precise positioning, use <b>Snap to Grid</b> with increments appropriate for the size of the part. Alternatively, edit the attachment's position in the **Properties** window.

    </Alert>

4. Repeat the same to move **DoorAttachment**. Your attachments should be positioned on the surface facing their counterpart.

<figure>
<img src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_showAttachementsMoved.jpg" />
<figcaption><b>Left</b>: FrameAttachment / <b>Right</b>: DoorAttachment</figcaption>
</figure>

## Rotate the attachments

The orientation of an attachment affects how a constraint can move. For the door, both attachments must be rotated so the hinge swings left and right, like those on a standard door.

1. On the door frame, hover over **FrameAttachment**. Notice the **yellow arrow**. This arrow, the **axis**, determines the hinge's rotation.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_showAttachmentAxis.jpg)

    <Alert severity="info">
    Depending on the <b>DoorFrame</b> object, the axis may point in a different direction. For instance, a hinge added to the attachment shown above would pivot around the yellow arrow, like in the video below.

   <video controls loop muted>
      <source src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_doorSwingingWrong.mp4" />
   </video>
   </Alert>

2. For accurate rotation, turn on rotation snapping in Studio's toolbar by checking **Rotate** and setting the value to `90`.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_snapRotate.png)

3. Use the **Rotate** tool to orient **both** yellow attachments to point **upwards**. If your axes are already vertical, no action is needed.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_primaryAxis.jpg)

## Add the constraint

Remember, constraints are a way of connecting two attachments to move in a specific way. This door will use a `Class.HingeConstraint`, a common constraint that rotates objects along the axes of two attachments.

1. Under **DoorFrame**, create a new **HingeConstraint**.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_showCreateHingeConstraint.png)

2. In the constraint's properties, find **Attachment0**. Click the empty box right of the property and then, in the **Explorer**, click **DoorAttachment**.

   <video controls muted>
      <source src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_selectAttachment0.mp4" />
   </video>

3. Repeat the same process by connecting **Attachment1** to **FrameAttachment**. The properties should appear as below.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_attachmentsConnected.png)

4. Test the project by walking into the door with your character.

   <video controls loop muted>
      <source src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_finalDoor.mp4" />
   </video>

   <Alert severity="warning">

   You may encounter the following issues when testing:

   **Parts not moving:**

   - Make sure that your door is not anchored.
   - Make sure that the door's motion isn't blocked by terrain or nearby parts.

   **Door not swinging as expected:**

   - Ensure the axis of each attachment is pointed up (see [Rotating Attachments](#rotate-the-attachments)).

   </Alert>

## Adjust the door

The door is currently able to swing past the door frame. This can be fixed by adjusting the hinge **limits**.

1. In the properties for **HingeConstraint**, find and toggle **LimitsEnabled**. When active, you can set the rotation limits of the hinge.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_limitsEnabled.png)

1. To make sure this is oriented correctly, select **DoorAttachment** and use the rotate tool so the orange arrow points **towards** the door frame, like below.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_secondaryAxisArrow.png)

    <Alert severity="warning">

   Remember that the yellow axis arrows affect the pivot of the hinge. Limits are affected by the orange axis arrows.

    </Alert>

1. Under the **Limits** section of the properties, both LowerAngle and UpperAngle to -90 and 90, respectively. This creates a range of motion like the image on the left.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_limitAnglesV2.jpg" />
     <img src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_showLimitsSet.png" />
   </GridContainer>

1. Test the door and notice that the hinge is now limited.

   <video controls loop muted>
      <source src="../../../assets/tutorials/building-a-hinged-door/introToConstraints_finalDoor_WithLimits.mp4" />
   </video>

   <Alert severity="warning">

   If the door limits don't work as expected, it's possible that the orange axis on an attachment isn't correctly aligned. Select DoorAttachment, and make sure that a green plane with an arc points **towards** the door frame, as in the image below.

   ![alt](../../../assets/tutorials/building-a-hinged-door/introToConstraints_showAxisArc.jpg)

   </Alert>

With the door complete, take some time to explore using hinge constraints in different situations, such as a trap door or a swinging axe trap.
