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

<Grid container spacing={3}>
	<Grid item>
		<figure>
    <img src="../assets/studio/align-tool/Icon-Min.png" width="80" />
    <center><figcaption>Min</figcaption></center>
  	</figure>
	</Grid>
	<Grid item>
		<figure>
    <img src="../assets/studio/align-tool/Icon-Center.png" width="80" />
    <center><figcaption>Center</figcaption></center>
  	</figure>
	</Grid>
	<Grid item>
		<figure>
    <img src="../assets/studio/align-tool/Icon-Max.png" width="80" />
    <center><figcaption>Max</figcaption></center>
  	</figure>
	</Grid>
</Grid>

<Tabs>
<TabItem label="Min">
<img src="../assets/studio/align-tool/Mode-Min.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Center">
<img src="../assets/studio/align-tool/Mode-Center.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Max">
<img src="../assets/studio/align-tool/Mode-Max.jpg" width="720" height="405" />
</TabItem>
</Tabs>

## Align In

The **World** or **Local** option specifies which relative coordinates to align on. This is especially useful for aligning parts which don't share the same orientation or rotation.

The **X**, **Y**, and **Z** checkboxes let you select which axes to align on. Note that you can select multiple axes in a single alignment operation.

<Tabs>
<TabItem label="Before Alignment">
<img src="../assets/studio/align-tool/Align-In-Before.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Max | World Z">
<img src="../assets/studio/align-tool/Align-In-World-Z.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Max | Local Z">
<img src="../assets/studio/align-tool/Align-In-Local-Z.jpg" width="720" height="405" />
</TabItem>
</Tabs>

## Relative To

An alignment operation can be relative to either the **Selection Bounds** or the **Active Object**.

### Selection Bounds

**Selection Bounds** aligns the selected objects relative to the bounding box around them.

<Tabs>
<TabItem label="Before Alignment">
<img src="../assets/studio/align-tool/Relative-To-Selection-Bounds-Before.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Min | World X">
<img src="../assets/studio/align-tool/Relative-To-Selection-Bounds-Min-X.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Max | World X">
<img src="../assets/studio/align-tool/Relative-To-Selection-Bounds-Max-X.jpg" width="720" height="405" />
</TabItem>
</Tabs>

### Active Object

**Active Object** aligns the objects relative to the **last selected object**. This object is outlined in orange and it will not move during the operation. While parts are selected, you can switch the active object by clicking on a different object.

<Tabs>
<TabItem label="Before Alignment">
<img src="../assets/studio/align-tool/Relative-To-Active-Object-Before.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Min | World X">
<img src="../assets/studio/align-tool/Relative-To-Active-Object-Min-X.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Max | World X">
<img src="../assets/studio/align-tool/Relative-To-Active-Object-Max-X.jpg" width="720" height="405" />
</TabItem>
</Tabs>
