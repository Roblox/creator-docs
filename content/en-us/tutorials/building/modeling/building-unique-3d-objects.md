---
title: Building Unique 3D Objects
description: The process for creating unique 3D objects using basic parts.
next: /tutorials/building/modeling/applying-surface-images
---

In [Introduction to Roblox Studio](../../../tutorials/first-experience/index.md), you learned how to create basic parts like blocks, spheres, and cylinders. These can be grouped together to create more complex models, but some objects cannot be effectively built in that way, particularly those with "hollow" regions.

<GridContainer numColumns="3">
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Bowl-Final.jpg" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Half-Pipe-Final.jpg" />
</GridContainer>

To construct these types of objects in Roblox, you'll use **Solid Modeling** tools.

## Basic Concepts

Solid modeling essentially uses two processes — Union and Negate — to creatively form complex models.

### Union

The **Union** tool fuses multiple parts together to form one single part.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/building-unique-3d-objects/Union-Example-A.png" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Union-Example-B.png" />
</GridContainer>

### Negate

The **Negate** tool removes one part's geometric shape from another part to create hollow regions.

<GridContainer numColumns="2">
  <img src="../../../assets/tutorials/building-unique-3d-objects/Negate-Example-A.png" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Negate-Example-B.png" />
</GridContainer>

## Building an Arch

An arch is a common structural element that is easily built using solid modeling tools.

<img src="../../../assets/tutorials/building-unique-3d-objects/Castle-Arch-Windows.jpg" width="100%" />

### Create Parts

A basic arch requires three parts to assemble.

1. Insert a **Block** part and scale it up to approximately the size of a door frame.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/building-unique-3d-objects/Create-Parts-1.jpg" />
     <img src="../../../assets/tutorials/building-unique-3d-objects/Create-Block.png" width="60%" />
   </GridContainer>

2. Insert a **Cylinder** part and scale/rotate it to intersect the center of the block. Make sure this cylinder extends completely through the block.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/building-unique-3d-objects/Create-Parts-2.jpg" />
     <img src="../../../assets/tutorials/building-unique-3d-objects/Create-Cylinder.png" width="60%" />
   </GridContainer>

    <Alert severity="info">
    If the cylinder is blocked from moving through and intersecting the block, make sure that the <b>Collisions</b> checkbox is <b>off</b>.
    <img src="../../../assets/tutorials/shared/interface/Disable-Collisions.png" width="60%" />
    </Alert>

3. Insert another **Block** part and place it beneath the cylinder. It should be about the same width as the cylinder and its top surface should line up roughly with the vertical center of the cylinder.

<img src="../../../assets/tutorials/building-unique-3d-objects/Create-Parts-3.jpg" width="80%" />

### Negate Hollow Regions

To "remove" regions that should be hollow, you'll need to designate the negate parts and then union all pieces together.

1. Select both the cylinder and the smaller block.
2. From the **Model** tab, click the **Negate** button. This will turn the parts translucent and red.

<img src="../../../assets/tutorials/building-unique-3d-objects/Model-Negate-Button.png" width="80%" />

<img src="../../../assets/tutorials/building-unique-3d-objects/Negate-Parts.jpg" width="80%" />

The new surface created by the negated region will use the color of the negated part. If you want to change that surface's color, change the color of the inner block and cylinder **before** clicking **Negate**.

### Union All Parts

To complete the arch, finalize the colors and materials of the arch and then **Union** all three parts together.

1. Select all three parts.
2. From the **Model** tab, click the **Union** button. This will "remove" the two negated parts, leaving an open path for players to walk through the arch.

<img src="../../../assets/tutorials/building-unique-3d-objects/Model-Union-Button.png" width="80%" />

<img src="../../../assets/tutorials/building-unique-3d-objects/Arch-Final.jpg" width="80%" />

The arch is complete! As a unioned model, it becomes one single object in the workspace, versus a grouped model of multiple parts:

<img src="../../../assets/tutorials/building-unique-3d-objects/Union-Workspace.png" width="80%" />

<Alert severity="info">

Once unioned, parts cannot be individually moved or appearances changed. If you need to make edits, select the unioned model and click <b>Separate</b>. When finished, <b>Union</b> the model back together.
<img src="../../../assets/tutorials/building-unique-3d-objects/Model-Separate-Button.png" width="80%" />

</Alert>

## Further Examples

### Bowl

<GridContainer numColumns="3">
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Bowl-1.jpg" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Bowl-2.jpg" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Bowl-Final.jpg" />
</GridContainer>

### Half Pipe

<GridContainer numColumns="3">
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Half-Pipe-1.jpg" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Half-Pipe-2.jpg" />
  <img src="../../../assets/tutorials/building-unique-3d-objects/Model-Half-Pipe-Final.jpg" />
</GridContainer>
