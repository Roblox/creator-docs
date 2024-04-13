---
title: Interfaces on Parts
description: The process for creating interactive interfaces on parts.
---

The `Class.SurfaceGui` object lets you display GUI content onto surfaces in the 3D world. They are commonly used to display leaderboards, or to signpost areas in the 3D space. This tutorial shows you how to create an information board about long sword statistics.

![alt text](../../../assets/tutorials/interfaces-on-parts/3D-Finished-Product.png)

## Creating a Surface GUI

1. Create a part named **InfoBoard**.

2. Change the **Size** of the part to **15, 18, 1**.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/interfaces-on-parts/3D-Part-Sized.png" />
     <img src="../../../assets/tutorials/interfaces-on-parts/Property-Part-Sized.png" />
   </GridContainer>

3. Insert a **SurfaceGui** into the part and rename it **InfoSurfaceGui**.

4. Insert a `Class.Frame` into the GUI and name it **BackgroundFrame**. This is the background on which the information will be displayed.

   ![](../../../assets/tutorials/interfaces-on-parts/Explorer-BackgroundFrame.png)

## Adjusting the GUI

### Face

The `Class.SurfaceGui.Face|Face` property determines which face of the part will be used to display the SurfaceGui. The **BackgroundFrame** object will be visible on the surface as a small white square when the correct face is selected.

- Set the **Face** property of **InfoSurfaceGui** to **Front**.

  <GridContainer numColumns="2">
    <img src="../../../assets/tutorials/interfaces-on-parts/3D-Surface-Gui-Init.png" />
    <img src="../../../assets/tutorials/interfaces-on-parts/Property-Face.png" />
  </GridContainer>

<Alert severity="warning">
If the frame isn't visible after selecting the front face, the part may be pointing the wrong way. Try rotating the part or choosing a different face.
</Alert>

### Size

To make the frame cover the entire face, you'll need to adjust its **Size** property.

- Set the **Size** property of **BackgroundFrame** to **1, 0, 1, 0** so that it covers all of the selected face.

  <GridContainer numColumns="2">
    <img src="../../../assets/tutorials/interfaces-on-parts/3D-Full-Frame.png" />
    <img src="../../../assets/tutorials/interfaces-on-parts/Property-Frame-Size.png" />
  </GridContainer>

### Styling

It's often a good idea to add a `Class.UIPadding` constraint to create a gap between the borders of a GUI object and its contents.

1. Insert a **UIPadding** constraint into **InfoSurfaceGui**.

   ![](../../../assets/tutorials/interfaces-on-parts/Property-UIPadding.png)

2. Set the **PaddingBottom**, **PaddingLeft**, **PaddingRight** and **PaddingTop** properties to **0.05, 0** to create a border around the frame.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/interfaces-on-parts/3D-Padding.png" />
     <img src="../../../assets/tutorials/interfaces-on-parts/Property-Padding.png" />
   </GridContainer>

3. Set the **BackgroundTransparency** property of **BackgroundFrame** to **1**.

   ![](../../../assets/tutorials/interfaces-on-parts/Property-Transparency.png)

## Adding Content

You can use the skills learned in the preceding UI tutorials to display information inside of the **BackgroundFrame**. Here is some example content for the frame:

![](../../../assets/tutorials/interfaces-on-parts/3D-Surface-Gui-Content.png)

<table>
    <thead>
        <tr>
            <th>Object</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>1</b></td>
            <td> A `Class.TextLabel` to display the item name with an `Class.ImageLabel` underneath displaying wooden planks.</td>
        </tr>
        <tr>
            <td><b>2</b></td>
            <td>An ImageLabel to display the item image with a gray BackgroundColor3 value. A `Class.UICorner` constraint is used to apply a rounded edge to each corner.</td>
        </tr>
        <tr>
            <td><b>3</b></td>
            <td>A Frame containing three TextLabels positioned with a `Class.UIListLayout` constraint to arrange them in a horizontal sequence, similar to <a href="../../../tutorials/building/ui/creating-a-score-bar.md">Creating a Score Bar</a>.</td>
        </tr>
    </tbody>
</table>

## SurfaceGui Properties

Now you have a completed SurfaceGui, try changing the following properties to see their effects.

### LightInfluence

Because surface GUIs exist in the 3D world, they can be affected by light like any other object. The `Class.SurfaceGui.LightInfluence|LightInfluence` property controls how much the SurfaceGui is influenced by light. The normal value is 1, meaning the GUI space will be lit the same as surrounding objects. If you set it to 0, images inside will remain lit as you designed them. This can be useful if you want to create something like a neon sign which glows bright even if it's in a dark environment.

<video controls loop muted>
  <source src="../../../assets/tutorials/interfaces-on-parts/Video-Light-Influence.mp4" />
</video>

### Adornee

The part on which a SurfaceGui is displayed is determined by the **Adornee** property. If blank, it automatically displays on the parent part. The ability to set `Class.SurfaceGui.Adornee|Adornee` allows for the creation of interactive [buttons](../../../tutorials/building/ui/interactive-buttons.md) when the GUI is not parented to the part. To adorn a SurfaceGui to a part:

1. Drag the SurfaceGui into `Class.StarterGui`.

2. Adorn it to the part by clicking on the Adornee input box and then on the board part.

<video controls loop muted>
  <source src="../../../assets/tutorials/interfaces-on-parts/Video-Adornee.mp4" />
</video>
