---
title: Box modeling
description: Create your basic rigid accessory model in Blender.
next: /art/accessories/creating-rigid/texturing
prev: /art/accessories/creating-rigid/
---

<img src="../../../assets/art/accessories/creating-rigid/Modeling-Complete.png" alt="A screenshot of blender showing the final 3d shape of a treasure chest in the viewport"/>

**Modeling** is the process of creating and shaping the 3D geometry of an object. **Box modeling** is a fundamental technique in 3D modeling combining basic shapes and steps to create a more complex object.

The following instructions are based off of the [Box Modeling 101 staff article](https://devforum.roblox.com/t/modeling-101-in-blender-box-modeling/2963814). The original article includes additional information, as well as Blender setup instructions, best practices, and advanced modeling examples that are not included in this accessory tutorial.

<Alert severity = 'warning'>
Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../../avatar/rigid-accessories/specifications.md), such as keeping your geometry within a polycount budget, and [policy requirements](../../../marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.
</Alert>

## General shape

<video controls src="../../../assets/art/accessories/creating-rigid/General-Shape.mp4" width="100%"></video>

In a new Blender file, delete everything except the starter cube, then create the basic shape of the treasure chest.

1. In a new project, select all non-cube objects and press <kbd>X</kbd> to delete.
1. Convert the cube into a rectangle.
   1. Select the cube and press <kbd>S</kbd> for scale.
   1. Press <kbd>Y</kbd> to lock scaling to the Y axis.
   1. Drag with the mouse to create a rectangle.
1. Create the top of the treasure chest.
   1. Switch to **Edit** mode, then press <kbd>3</kbd> to switch to face selection.
   1. Select the top face of the box and press <kbd>E</kbd> to activate the **Extrude** tool.
   1. Drag your mouse to extrude the lid. Extend the lid to about half the height of the main body.

## Rounded lid

<video controls src="../../../assets/art/accessories/creating-rigid/Rounded-Lid.mp4" width="100%"></video>

Create the rounded lid shape using segmentation:

1. Press <kbd>2</kbd> to switch to edge selection.
1. Holding <kbd>Shift</kbd>, click the top front and back edges of your chest.
1. With both edges selected, press <kbd>Ctrl</kbd><kbd>B</kbd>/<kbd>⌘</kbd><kbd>B</kbd> to activate the **Bevel** tool.
1. Navigate to the contextual menu at the bottom right, then set the number of segments to `6` and enable **Clamp Overlap**.

### Merge vertices

Sometimes tools like the **Bevel** tool may move vertices very close to each other without merging them. Use the **Merge Vertices** function to ensure that your object shares vertices wherever possible.

1. Press <kbd>1</kbd> to switch to vertex selection, then press <kbd>A</kbd> to select all vertices of your object.
1. Right-click anywhere in the viewport, then select **Merge Vertices by Distance** from the contextual menu.
1. In the pop-up modal, set the distance to `.01`.

## Side insets

<video controls src="../../../assets/art/accessories/creating-rigid/Side-Insets.mp4" width="100%"></video>

Create the left and right insets of your chest:

1. Press <kbd>3</kbd> to switch to face selection.
1. Holding <kbd>Shift</kbd>, click both sides of your shape. This selects both the left and right faces.
1. Press <kbd>I</kbd> to activate the **Inset** tool. Drag the mouse to adjust the amount of inset for the new face to about the size of your bevel segments.
1. With your new insets selected, right-click anywhere in the viewport, then select **Extrude Along Normals** from the contextual menu.
1. Use the mouse to drag and adjust the distance of extrusion into the chest.

## Front insets

Create the front and back insets of your chest by creating new lines and then extruding your faces between those lines.

### Vertical loop cuts

<video controls src="../../../assets/art/accessories/creating-rigid/Vertical-Loop-Cuts.mp4" width="100%"></video>

To create your vertical loop cuts:

1. Press <kbd>2</kbd> to switch to edge selection, then press <kbd>A</kbd> to select the entire chest.
1. Use <kbd>Ctrl</kbd><kbd>R</kbd>/<kbd>⌘</kbd><kbd>R</kbd> to create a loop cut.
1. Using your mouse, hover over the object until the highlighted cut is vertical, then click to confirm.
1. In the contextual menu, set the number of cuts to `2`.
1. With the new lines selected, press <kbd>S</kbd> to scale and <kbd>Y</kbd> to scale within the Y axis.
1. Use the mouse to drag the lines until they nearly reach the edges of your chest, then click to confirm.

### Horizontal loop cuts

<video controls src="../../../assets/art/accessories/creating-rigid/Horizontal-Loop-Cuts.mp4" width="100%"></video>

To create your horizontal loop cuts:

1. Select the chest, and press <kbd>Ctrl</kbd><kbd>R</kbd>/<kbd>⌘</kbd><kbd>R</kbd> to loop cut, then click to confirm a horizontal cut.
1. In the contextual menu, set the number of cuts to `2`.
1. To straighten each line across your object:
   1. Click one of your new lines.
   1. Press <kbd>S</kbd> for scale.
   1. Press <kbd>Z</kbd> to scale within the Z axis.
   1. Press <kbd>0</kbd> to set the scale value to `0` across the Z axis.
   1. Repeat for the other line.
1. Position the top line near the top below the segmentations.
1. Position the bottom line near the bottom.
1. Enable **Magnet Snapping** so the bottom line merges with the existing vertices and lines from the side insets.

### Extrusions

Create the extrusions for the front, top, and back of the chest.

1. Press <kbd>3</kbd> to switch to face selection.
1. Hold <kbd>Alt</kbd>/<kbd>⌥</kbd> and click on your front faces to select the front, top, and back faces.
1. With the faces selected, hold <kbd>Shift</kbd> and click on the metal borders to deselect them. The front and back faces, and the top segmentations, should remain selected.
1. Right-click anywhere in the viewport, then select **Extrude Faces Along Normals** from the contextual menu.
1. Drag the mouse to extrude the faces about the same width as the metal borders.

## Complete border

<video controls src="../../../assets/art/accessories/creating-rigid/Complete-Border.mp4" width="100%"></video>

The chest is almost ready, but is still missing the continuous metal border across the top edge. Remove the existing faces and add new geometry to the treasure chest.

### Delete faces

Delete the faces of the top side metal borders:

1. Starting on any side, hold <kbd>Shift</kbd> and click the three faces of the top metal border.
1. Press <kbd>X</kbd> to delete.
1. Repeat this process for the other side.

### Add faces

Add new faces to the sides that complete the geometry of the treasure chest box.

1. Press <kbd>2</kbd> to switch to edge selection.
1. Starting with any side, hold <kbd>Shift</kbd> and click the two top corner edges of the missing face.
1. Right-click anywhere in the viewport, then select **New Face from Edges** from the contextual menu to create a top face.
1. Repeat steps 2-3 with the bottom corner edges to create a bottom face.
1. On the other side of the chest, repeat steps 2-4 to complete the metal border.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../../assets/art/accessories/creating-rigid/Chest-Modeling-Complete.blend) of this stage of the project for comparison.

This tutorial represents an extremely basic overview of the 3D modeling process. Tools like Blender offer many features, workflows, and techniques to create unique and complex models. Check out Blender's official and community tutorials for additional instructional content.
</Alert>
