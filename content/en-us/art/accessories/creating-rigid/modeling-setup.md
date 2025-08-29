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
Whether you are using an existing shape or creating your own 3D object, it's important to consider [technical requirements](../../../art/accessories/specifications.md), such as keeping your geometry within a polycount budget, and [policy requirements](../../../marketplace/marketplace-policy.md), such as ensuring your design does not infringe on other creator's IP both within and outside of the Roblox ecosystem.
</Alert>

## General shape

<video controls src="../../../assets/art/accessories/creating-rigid/General-Shape.mp4" width="100%"></video>

In a new Blender file, delete everything except the starter cube, then create the basic shape of the treasure chest.

1. In a new project, select the non-cube objects and press <kbd>X</kbd> to delete.
2. Select the cube and press <kbd>S</kbd> for scale.
   1. Press <kbd>Y</kbd> to lock scaling to the y-axis.
   2. Drag with the mouse to create a rectangle.
3. Switch to Edit mode (<kbd>Tab</kbd>).
4. Near the Edit mode dropdown, select the Face selection.
5. Select the top face of the box and press <kbd>E</kbd> to extrude.
6. Drag your mouse to extrude the lid. Extend the lid to about half the height of the main body.

## Rounded lid

<video controls src="../../../assets/art/accessories/creating-rigid/Rounded-Lid.mp4" width="100%"></video>
Create the rounded lid shape using segmentation:

1. Near the Edit mode dropdown, select the Line selection.
2. Holding <kbd>Shift</kbd>, click the top front and back lines of your chest.
3. With both lines selected, press <kbd>Ctrl</kbd><kbd>B</kbd>/<kbd>⌘</kbd><kbd>B</kbd> to bevel.
4. In the context menu at the bottom right, set the number of segments to `6` and enable **Clamp Overlap**.

### Merge vertices

Sometimes tools like the **Bevel** tool may move vertices very close to each other without merging them. Use the Merge Vertices function to ensure that your object shares vertices wherever possible.

1. Near the Edit mode dropdown, select the Vertices selection.
2. Press <kbd>A</kbd> to select all vertices.
3. Right-click and select **Merge Vertices by Distance**.
4. In the pop-up modal, set the distance to `.01`.

## Side insets

<video controls src="../../../assets/art/accessories/creating-rigid/Side-Insets.mp4" width="100%"></video>

Create the left and right insets of your chest:

1. Near the Edit mode dropdown, select the Face selection.
2. Hold <kbd>Shift</kbd> and click both sides of your shape. This selects both the left and right faces.
3. Press <kbd>I</kbd> for inset. Drag the mouse to adjust the amount of inset for the new face.
   1. Set the inset about the size of your bevel segmentations.
4. With your new insets selected, right-click and select **Extrude Along Normals**.
5. Use the mouse to drag and adjust the distance of extrusion into the chest.

## Front insets

Create the front and back insets of your chest by creating new lines and then extruding your faces between those lines.

### Vertical loop cuts

<video controls src="../../../assets/art/accessories/creating-rigid/Vertical-Loop-Cuts.mp4" width="100%"></video>

To create your vertical loop cuts:

1. Near the Edit mode dropdown, select the Line selection.
2. Press <kbd>A</kbd> to select the entire chest.
3. Use <kbd>Ctrl</kbd><kbd>R</kbd>/<kbd>⌘</kbd><kbd>R</kbd> to create a loop cut.
4. Using your mouse, hover over the object until the highlighted cut is vertical. Click to confirm.
5. In the context menu, set the number of cuts to `2`.
6. With the new lines selected, press <kbd>S</kbd> to scale and <kbd>Y</kbd> to scale within the y-axis.
7. Use the mouse to drag the lines until they nearly reach the edges of your chest. Click to confirm.

### Horizontal loop cuts

<video controls src="../../../assets/art/accessories/creating-rigid/Horizontal-Loop-Cuts.mp4" width="100%"></video>

To create your horizontal loop cuts:

1. Select the chest, and press <kbd>Ctrl</kbd><kbd>R</kbd>/<kbd>⌘</kbd><kbd>R</kbd> to loop cut.
2. Using the mouse, click to confirm a horizontal cut.
3. Using the context menu, set the number of cuts to `2`.
4. To straighten each line across your object, select the one of your new lines:
   1. Press <kbd>S</kbd> for scale.
   2. Press <kbd>Z</kbd> to scale within the z-axis.
   3. Press <kbd>0</kbd> to set the scale value to `0` across the z-axis.
5. Repeat step 4 with the other line.
6. Position the top line near the top below the segmentations.
7. Position the bottom line near the bottom.
   1. Enable **Magnet Snapping** so the bottom line merges with the existing vertices and lines from the side insets.

### Extrusions

Create the extrusions for the front, top, and back of the chest.

1. Near the Edit mode dropdown, select the Face selection.
2. Hold <kbd>Alt</kbd>/<kbd>⌥</kbd> and click on your front faces to select the front, top, and back faces.
3. With the faces selected, hold <kbd>Shift</kbd> and click on the metal borders to deselect them. The front and back faces, and the top segmentations, should remain selected.
4. Right click and select **Extrude Faces Along Normals**. Drag the mouse to extrude the faces about the same width as the metal borders.

## Complete border

<video controls src="../../../assets/art/accessories/creating-rigid/Complete-Border.mp4" width="100%"></video>

The chest is almost ready, but is still missing the continuous metal border across the top edge. Remove the existing faces and add new geometry to the treasure chest.

### Delete faces

Delete the faces of the top side metal borders:

1. Near the Edit mode dropdown, select the Face selection.
2. Starting on any side, shift click the three faces of the top metal border.
3. Press <kbd>X</kbd> to delete.
4. Repeat steps 2-3 on the other side.

### Add faces

Add new faces to the sides that complete the geometry of the treasure chest box.

1. Near the Edit mode dropdown, select the Line selection.
2. Starting with any side, Hold <kbd>Shift</kbd> and click the two top corner edges of the missing face.
3. Right click and select **New Face from Edges** to create a top face.
4. Repeat steps 2-3 with the bottom corner edges to create a bottom face.
5. On the other side of the chest, repeat steps 2-4 to complete the metal border.

<Alert severity='success'>
You've completed the modeling section of this tutorial. If desired, download a [reference version](../../../assets/art/accessories/creating-rigid/Chest-Modeling-Complete.blend) of this stage of the project for comparison.

This tutorial represents an extremely basic overview of the 3D modeling process. Tools like Blender offer many features, workflows, and techniques to create unique and complex models. Check out Blender's official and community tutorials for additional instructional content.
</Alert>
