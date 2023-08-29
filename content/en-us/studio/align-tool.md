---
title: Align Tool
description: The Align Tool lets you align objects or groups of objects along the X, Y, or Z axes.
---

The **Align Tool** lets you align objects or groups of objects along the **X**, **Y**, or **Z** axes. You can access it from the **Model** tab of the toolbar.

<img src="../assets/studio/general/Model-Tab-Align-Tool.png" width="830" alt="Align Tool indicated in Model tab" />

Primary benefits include:

- Aligning the center or edge of multiple objects in one action.
- Aligning entire `Class.Model|Models` or parts within them relative to other parts, all while keeping the model intact.
- Dynamically previewing the point of alignment before confirming.

## Mode

You can set the alignment mode to either **Min**, **Center**, or **Max**.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/align-tool/Icon-Min.png" width="110" />
    <figcaption>Min</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Icon-Center.png" width="110" />
    <figcaption>Center</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Icon-Max.png" width="110" />
    <figcaption>Max</figcaption>
  </figure>
</GridContainer>

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/align-tool/Mode-Min.jpg" />
    <figcaption>Min</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Mode-Center.jpg" />
    <figcaption>Center</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Mode-Max.jpg" />
    <figcaption>Max</figcaption>
  </figure>
</GridContainer>

## Align In

The **World** or **Local** option specifies which relative coordinates to align on. This is especially useful for aligning parts which don't share the same orientation or rotation.

The **X**, **Y**, and **Z** checkboxes let you select which axes to align on. Note that you can select multiple axes in a single alignment operation.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/align-tool/Align-In-Before.jpg" />
    <figcaption>Before Alignment</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Align-In-World-Z.jpg" />
    <figcaption>Max &middot; World Z</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Align-In-Local-Z.jpg" />
    <figcaption>Max &middot; Local Z</figcaption>
  </figure>
</GridContainer>

## Relative To

An alignment operation can be relative to either the **Selection Bounds** or the **Active Object**.

### Selection Bounds

**Selection Bounds** aligns the selected objects relative to the bounding box around them.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/align-tool/Relative-To-Selection-Bounds-Before.jpg" />
    <figcaption>Before Alignment</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Relative-To-Selection-Bounds-Min-X.jpg" />
    <figcaption>Min &middot; World X</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Relative-To-Selection-Bounds-Max-X.jpg" />
    <figcaption>Max &middot; World X</figcaption>
  </figure>
</GridContainer>

### Active Object

**Active Object** aligns the objects relative to the **last selected object**. This object is outlined in orange and it will not move during the operation. While parts are selected, you can switch the active object by clicking on a different object.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/align-tool/Relative-To-Active-Object-Before.jpg" />
    <figcaption>Before Alignment</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Relative-To-Active-Object-Min-X.jpg" />
    <figcaption>Min &middot; World X</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/align-tool/Relative-To-Active-Object-Max-X.jpg" />
    <figcaption>Max &middot; World X</figcaption>
  </figure>
</GridContainer>
