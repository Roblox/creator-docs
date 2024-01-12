---
title: Introduction to Roblox Studio
description: Explains the process of creating a platformer experience to introduce the basics of Roblox Studio.
---

This tutorial explains the basics of [Roblox Studio](../../studio/setting-up-roblox-studio.md) by building, playtesting, and publishing a simple platformer experience. Follow each section and learn how to:

- Create the foundation of your platformer using one of Studio's bundled templates.
- Navigate around the 3D viewport to see the environment from every angle.
- Create platforms for players to traverse using Studio's primary building blocks.
- Playtest and troubleshoot your experience.
- Make your experience available for everyone on Roblox to play.

## Creating a New Experience

[Roblox Studio](../../studio/setting-up-roblox-studio.md), a free application available on Windows and Mac, is the essential building tool for Roblox experiences.

With Studio open, create a new place by pressing <kbd>Ctrl</kbd><kbd>N</kbd> on Windows or <kbd>⌘</kbd><kbd>N</kbd> on Mac. Alternatively, click the **Baseplate** template under the **All&nbsp;Templates** tab.

<img src="../../assets/getting-started/Baseplate-Template-Icon.png" width="198" alt="Baseplate template button in Roblox Studio" />

The **Baseplate** template consists of a **spawn location** where player characters appear in the world when they enter the experience, as well as a wide open **baseplate** floor.

<img src="../../assets/getting-started/New-Template-With-Spawn-Location.jpg" width="800" alt="New Baseplate template open in Studio, showing the default spawn location" />

## Moving the Camera

With the new place open in Studio, click inside the 3D viewport and use the following keyboard/mouse controls to look around.

<table>
<thead>
  <tr>
    <th>Key/Shortcut</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Moves the camera forward, left, back, or right</td>
  </tr>
  <tr>
    <td><kbd>Q</kbd> <kbd>E</kbd></td>
    <td>Moves the camera down or up</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd></td>
    <td>In combination with any movement key, changes the camera speed</td>
  </tr>
  <tr>
    <td><kbd>F</kbd></td>
    <td>Focuses the camera on a selected part</td>
  </tr>
  <tr>
    <td>**Right Mouse Button**</td>
    <td>When pressed, dragging the mouse moves the camera view around</td>
  </tr>
  <tr>
    <td>**Mouse Scroll Wheel**</td>
    <td>Zooms the camera in or out</td>
  </tr>
	<tr>
    <td>**Middle Mouse Button**</td>
    <td>When pressed, dragging the mouse pans the camera</td>
  </tr>
</tbody>
</table>

## Building Your Experience

When you're comfortable navigating the viewport with the camera, you can begin building your experience by adding platforms of different shapes and colors for players to jump between.

### Inserting Parts

A `Class.Part` is Roblox's primary building block. You can [move](#moving-parts), [resize](#scaling-parts), and [rotate](#rotating-parts) parts, as well as customize their appearance, such as their [color and material](#customizing-colors-and-materials). There are five different part types that you can insert through the **Parts** section of the [Home](../../studio/home-tab.md) or [Model](../../studio/model-tab.md) tabs:

<table>
<thead>
<tr>
<th><center>Block</center></th>
<th><center>Sphere</center></th>
<th><center>Cylinder</center></th>
<th><center>Wedge</center></th>
<th><center>Corner Wedge</center></th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="../../assets/modeling/parts/Basic-Part-Block.png" alt="Block part" /></td>
<td><img src="../../assets/modeling/parts/Basic-Part-Sphere.png" alt="Sphere part" /></td>
<td><img src="../../assets/modeling/parts/Basic-Part-Cylinder.png" alt="Cylinder part" /></td>
<td><img src="../../assets/modeling/parts/Basic-Part-Wedge.png" alt="Wedge part" /></td>
<td><img src="../../assets/modeling/parts/Basic-Part-Corner-Wedge.png" alt="Corner Wedge part" /></td>
</tr>
</tbody>
</table>

To insert a part:

1. In the menu bar, select the [Model](../../studio/model-tab.md) tab.

   <img src="../../assets/studio/general/Toolbar-Model-Tab.png" width="830" alt="Model tab indicated in Studio toolbar" />

2. Under the **Part** button, click the dropdown arrow to reveal the **part type picker** and choose a part type.

   <img src="../../assets/getting-started/Model-Tab-Part-Type-Picker.png" width="826" alt="Part type picker indicated in Model tab" />

3. Click the button to insert a part of the chosen type into the world.

   <img src="../../assets/getting-started/Model-Tab-Insert-Part.png" width="826" alt="Insert part button indicated in Model tab" />

   <img src="../../assets/getting-started/First-Inserted-Part.jpg"   width="800" alt="First block part inserted into place" />

### Selecting Parts

Inserted parts are automatically selected, and you can select parts at any time with the **Select** tool. Hovering over and clicking a part selects it, and you can select multiple parts by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../../assets/studio/general/Model-Tab-Select.png" width="830" alt="Select tool indicated in Model tab" />

### Moving Parts

The new part is the first "platform" that players will jump to from the spawn location, so you should move it further away. By default, parts move incrementally by **studs**, the basic measurement unit in Roblox.

1. With the newly inserted part selected in the 3D viewport, toggle on the **Move** tool.

   <img src="../../assets/studio/general/Model-Tab-Move.png" width="830" alt="Move tool indicated in Model tab" />

1. Click and drag the arrow that's pointing in the direction you want to move the part. Remember that this is the first platform players will jump to, so you should move it just slightly away for an easy first jump.

   <img src="../../assets/getting-started/First-Part-Moved.jpg" width="800" alt="First block part moved away from spawn location" />

1. If you want to adjust the default snapping increment, change the **Move** field value in the **Snap&nbsp;to&nbsp;Grid** section. Alternatively, you can disable move snapping by toggling off the checkbox next to **Move**.

   <img src="../../assets/studio/general/Model-Tab-Transform-Snapping.png" width="830" alt="Transform snapping options indicated in Model tab" />

### Scaling Parts

Similar to [moving](#moving-parts), parts scale along the **X**, **Y**, and **Z** axes. You can make a part larger or smaller by using the **Scale** tool.

1. With the platform part still selected in the 3D viewport, toggle on the **Scale** tool.

   <img src="../../assets/studio/general/Model-Tab-Scale.png" width="830" alt="Scale tool indicated in Model tab" />

1. Click and drag the handles to scale the part up in size, making the platform easier for players to land on from the first jump.

   <img src="../../assets/getting-started/First-Part-Scaled.jpg" width="800" alt="First block part scaled up in size" />

### Rotating Parts

Similar to [moving](#moving-parts) and [scaling](#scaling-parts), parts rotate around the **X**, **Y**, and **Z** axes. By default, parts rotate incrementally by **degrees**.

1. With the platform part still selected in the 3D viewport, toggle on the **Rotate** tool.

   <img src="../../assets/studio/general/Model-Tab-Rotate.png" width="830" alt="Rotate tool indicated in Model tab" />

1. Click and drag a circle to rotate the part in that direction.

   <img src="../../assets/getting-started/First-Part-Rotated.jpg" width="800" alt="First block rotated" />

1. If you want to adjust the default rotation increment, change the **Rotate** field value in the **Snap&nbsp;to&nbsp;Grid** section. Alternatively, you can disable rotation snapping by toggling off the checkbox next to **Rotate**.

   <img src="../../assets/studio/general/Model-Tab-Transform-Snapping.png" width="830" alt="Transform snapping options indicated in Model tab" />

### Customizing Colors and Materials

The fastest way to recolor a part is through the hexagonal **color picker** accessible through the small dropdown arrow under the **Color** button. By default, picking a color applies it to all selected parts. Alternatively, you can apply a chosen color as a painting tool by toggling on **Color&nbsp;Action&nbsp;as&nbsp;Tool** and clicking specific parts in the 3D viewport.

<img src="../../assets/studio/general/Model-Tab-Color-Tools.png" width="770" alt="Color button indicated in Model tab" />

<img src="../../assets/studio/general/Hexagon-Color-Picker.png"
	width="380" />

You can also customize a part's **material** to simulate real-world materials such as wood, glass, or fabric. A part's material affects both its visual appearance **and** its physical traits; for example, the **Concrete** material is heavier than the **Plastic** material, so a concrete brick will have higher density than a plastic brick and sink faster in water.

To apply different materials to parts:

1. Open the **Material Manager**.

   <img src="../../assets/studio/general/Model-Tab-Material-Manager-Trimmed.png" width="826" alt="Material Manager button indicated in Model tab" />

1. In the 3D viewport, select one or more parts.
1. In the **Material Manager** palette, hover your mouse over the desired material (you don't need to select it) and click the **Apply&nbsp;to&nbsp;Selected&nbsp;Parts** button.

   <img src="../../assets/studio/material-manager/Apply-To-Selected-Parts.png" width="700" alt="Apply to Selected Parts button indicated in Material Manager" />

   <img src="../../assets/getting-started/First-Part-Styled.jpg" width="800" alt="First block recolored and with Slate material applied" />

### Completing the Course

Using the skills and tools you've learned so far, build out the course with several more platforms of varying [shapes](#inserting-parts), [sizes](#scaling-parts), [rotations](#rotating-parts), and [colors/materials](#customizing-colors-and-materials).

<img src="../../assets/getting-started/Course-Completed.jpg" width="800" alt="Initial course completed with multiple platforms of varying shapes, sizes, colors, and materials" />

<Alert severity="warning">
As you add more platforms, remember to [move the camera](#moving-the-camera) and view the overall construction from multiple angles. While the gap between two platforms might appear jumpable when viewed from one angle, looking at it from another angle may reveal that a jump between the two platforms is obviously impossible.
</Alert>

### Anchoring Parts

If you [playtest](#playtesting-the-course) the platformer now, you'll notice that gravity pulls each new part down to the baseplate.

<video src="../../assets/getting-started/Course-Gravity.mp4" controls width="90%" alt="Platforms falling by gravity to the baseplate"></video>

Since platforms should remain fixed in space, you'll need to **anchor** each part that you insert into the world.

1. In the 3D viewport, [select](#selecting-parts) each of the platform parts you've inserted into the world.
1. Toggle on the **Anchor** option in the **Parts** section.

   <img src="../../assets/studio/general/Model-Tab-Anchor.png" width="770" alt="Anchored toggle indicated in Model tab" />

### Deleting the Baseplate

If you [playtest](#playtesting-the-course) your experience right now and miss a jump, your character will land safely on the baseplate. To provide a consequence when players miss a jump, you can delete the baseplate, forcing them to restart from the spawn location each time.

1. Access the [Explorer](../../studio/explorer.md) window. If it's not currently open, click **Explorer** from the [View](../../studio/view-tab.md) tab.

   <img src="../../assets/studio/general/View-Tab-Explorer.png" width="876" alt="Explorer toggle button in Studio" />

1. Expand the top-level **Workspace** tree, locate the **Baseplate** object, and select it.

   <img src="../../assets/getting-started/Workspace-Baseplate-Selected.png" width="320" alt="Baseplate selected in Explorer hierarchy" />

1. Press <kbd>Delete</kbd>. The course now floats in an empty sky.

   <img src="../../assets/getting-started/Course-No-Baseplate.jpg" width="800" alt="Baseplate deleted from platformer course" />

## Playtesting the Course

Playtesting is a vital step before [publishing](#publishing-an-experience) any experience because you need to verify that players can reach the final platform. When you playtest your platformer, consider its difficulty and how that might affect the typical player's experience.

To playtest your experience, click the **Play** button (<kbd>F5</kbd>) in the menu bar.

<img src="../../assets/studio/general/Model-Tab-Quick-Access-Play.png" width="770" alt="Play button indicated in Quick Access Toolbar" />

While playtesting, you can use the same controls as a default Roblox experience:

<table>
<thead>
  <tr>
    <th>Control</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Run forward, left, back, or right</td>
  </tr>  
  <tr>
    <td><kbd>Spacebar</kbd></td>
    <td>Jump</td>
  </tr>
  <tr>
    <td>**Right Mouse Button**</td>
    <td>When pressed, dragging the mouse moves the camera view around</td>
  </tr>
  <tr>
    <td>**Mouse Scroll Wheel**</td>
    <td>Zooms the camera in or out</td>
  </tr>
</tbody>
</table>

To stop playtesting, click the **Stop** button (<kbd>Shift</kbd><kbd>F5</kbd>) in the menu bar.

<img src="../../assets/studio/general/Model-Tab-Quick-Access-Stop.png" width="770" alt="Stop button indicated in Quick Access Toolbar" />

## Publishing an Experience

When you're ready to showcase your experience, you can **publish** it to allow other players on Roblox to test it. To publish your experience:

1. In the menu bar, select **File** &rarr; **Publish&nbsp;to&nbsp;Roblox**.
1. In the popup window that opens, fill in the following fields:

   - **Name** &mdash; A name for the new experience.
   - **Description** &mdash; A summary of what a player should expect from the experience.

1. Leave the other fields as their defaults, then click the blue **Create** button near the bottom of the window.
1. Navigate to the [Creator Dashboard](https://create.roblox.com/creations).
1. Hover over the experience's tile, click the **&ctdot;** button, and select **Make Public**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Make-Public.png" width="420" alt="Make Public option from Creator Dashboard" />

1. Hover over the tile again, click the **&ctdot;** button, and select **Copy URL**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Copy-URL.png" width="420" alt="Copy URL option from Creator Dashboard" />

1. Share the copied URL with others via social media or similar, as a direct link to your experience's landing page featuring a **play** button.

   <img src="../../assets/getting-started/Experience-Page-Default.jpg" width="100%" />

<Alert severity="success">
Congratulations on creating your first Roblox experience! To add more features to your platformer and learn more about building immersive experiences on Roblox, check out [tutorials](../../tutorials/index.md).
</Alert>
