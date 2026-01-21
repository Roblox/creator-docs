---
title: Work with parts
description: Explains how to insert and customize parts for your obby.
next: /tutorials/curriculums/building/code-with-assistant
prev: /tutorials/curriculums/building/get-started
---

**Parts** are basic 3D shapes that Roblox provides out-of-the-box for building in the 3D space. In this chapter, let's explore how to insert parts of all shapes and sizes, change their position and rotation for your obby, then anchor them in the air so that they don't fall due to Studio's gravity.

## Insert parts

There are five different part shapes that you can insert from the toolbar to build environments in your experiences: **block**, **sphere**, **cylinder**, **wedge**, and **corner wedge**. While you can join these part shapes together in unique ways to form more complex shapes, this lesson focuses on keeping the shapes as-is for your obby's platforms.

<Grid container spacing={1}>
<Grid item XSmall={4} XLarge={2}>
	<figure>
	<img src="../../../assets/modeling/parts/Basic-Part-Block.png" alt="A single Block part." />
	<figcaption><center>Block</center></figcaption>
	</figure>
</Grid>
<Grid item XSmall={4} XLarge={2}>
	<figure>
	<img src="../../../assets/modeling/parts/Basic-Part-Sphere.png" alt="A single Sphere part." />
	<figcaption><center>Sphere</center></figcaption>
	</figure>
</Grid>
<Grid item XSmall={4} XLarge={2}>
	<figure>
	<img src="../../../assets/modeling/parts/Basic-Part-Cylinder.png" alt="A single Cylinder part." />
	<figcaption><center>Cylinder</center></figcaption>
	</figure>
</Grid>
<Grid item XSmall={4} XLarge={2}>
	<figure>
	<img src="../../../assets/modeling/parts/Basic-Part-Wedge.png" alt="A single Wedge part." />
	<figcaption><center>Wedge</center></figcaption>
	</figure>
</Grid>
<Grid item XSmall={4} XLarge={2}>
	<figure>
	<img src="../../../assets/modeling/parts/Basic-Part-Corner-Wedge.png" alt="A single Corner Wedge part." />
	<figcaption><center>Corner Wedge</center></figcaption>
	</figure>
</Grid>
</Grid>

To insert a part for your first platform:

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> When you insert parts, they appear at the exact center of your camera view. Select the **START** platform, then press <kbd>F</kbd> to focus the camera on this part so your additional platforms insert near the start of the obby.

   <Alert severity="info">
   If you want more control over where the part inserts into the 3D space, use your mouse to zoom in and center your view where you want to insert your part.
   </Alert>

1. In the **Home** or **Model** tab's toolbar, click the small arrow next to the **Part** inserter tool to reveal the dropdown.

   <img src="../../../assets/tutorials/building-lesson/part-picker.png" alt="A close-up view of the part picker." width="800" />

1. From the dropdown menu, select the part shape you want for your first platform. The part displays at the exact center of your camera view.

   <img src="../../../assets/tutorials/building-lesson/insert-2.png" alt="" width="40%" />

1. Using this process, insert additional shape types until you have as many platforms as you want for your obby.

   <img src="../../../assets/tutorials/building-lesson/insert-3.png" alt="" width="40%" />

## Customize course

Now that you have platforms for your obby, it's time to customize their position, size, and rotation to create a jumping puzzle for the start of your obby. To do this, you will use three different object tools:

- **Move** — Changes your object's **position**.
- **Scale** — Changes your object's **size**.
- **Rotate** — Changes your object's **orientation**.

Each of these tools includes visual handles you can use to move, scale, or rotate your object using Studio's coordinate system for the 3D space. When you click and drag one of the handles, the object moves, scales, or rotates, respectively.

<GridContainer numColumns="3">
  <figure>
    <img src="../../../assets/modeling/parts/Transform-Move-SM.png" alt="Move draggers shown on part in 3D viewport." />
    <figcaption>Move tool handles</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/modeling/parts/Transform-Scale-SM.png" alt="Scale draggers shown on part in 3D viewport." />
    <figcaption>Scale tool handles</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/modeling/parts/Transform-Rotate-SM.png" alt="Rotate draggers shown on part in 3D viewport." />
    <figcaption>Rotate tool handles</figcaption>
  </figure>
</GridContainer>

To customize your course for your obby's starting jumping puzzle:

1. Change the **position** of your first platform.
   1. In the viewport, click on the part shape that you want for your first platform.

   1. In the toolbar, select the **Move** tool. A set of handles display around the part.

      <img src="../../../assets/education/general/Move-Tool.png" width="328" alt="Move tool highlighted." />

   1. Click and drag one of the handles until your part is at a good jump distance away from where players join the experience.

      <img src="../../../assets/tutorials/building-lesson/customize-1.png" alt="" width="60%" />

      <Alert severity="info">
      Keep in mind that the jump distance between platforms is important. If you make it too difficult from the start, players may quit instead of continuing to play.
      </Alert>

1. Change the **size** of your first platform.

   1. In the toolbar, select the **Scale** tool. A set of handles display around the part.

      <img src="../../../assets/education/general/Scale-Tool.png" width="328" alt="Scale tool highlighted." />

   1. Click and drag one of the handles until your part is a different size.

      <img src="../../../assets/tutorials/building-lesson/customize-2.png" alt="" width="60%" />

1. Change the **orientation** of your first platform.
   1. In the toolbar, select the **Rotate** tool. A set of handles display around the part.

      <img src="../../../assets/education/general/Rotate-Tool.png" width="328" alt="Rotate tool highlighted." />

   1. Click and drag one of the handles until your part has a different rotation.

      <img src="../../../assets/tutorials/building-lesson/customize-3.png" alt="" width="60%" />

1. Using the following camera controls, check your part's position and orientation from multiple angles to make sure that players would be able to jump to the first platform.

     <table>
     <thead>
       <tr>
         <th>**Action**</th>
         <th>**Control**</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>**Move**</td>
         <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
       </tr>
       <tr>
         <td>**Rotate**</td>
         <td>Hold the right mouse button to rotate around the selected object.</td>
       </tr>
       <tr>
         <td>**Zoom**</td>
         <td>Use your mouse's scroll wheel.</td>
       </tr>
       <tr>
         <td>**Focus**</td>
         <td>Press <kbd>F</kbd> to focus on a the selected object.</td>
       </tr>
     </tbody>
     </table>

   <Alert severity="info">
   If the camera doesn't move, click anywhere in the viewport, then try again.
   </Alert>

   <img src="../../../assets/tutorials/building-lesson/customize-4.png" alt="" width="60%" />

1. Repeat this process for the rest of your platforms.

   <img src="../../../assets/tutorials/building-lesson/customize-5.png" alt="" width="60%" />

## Anchor platforms

If you were to playtest your experience now, all of your new platforms would immediately fall and disappear. This is because the Roblox engine simulates gravity as soon as the experience runs, allowing the physical force to push objects down.

<video controls src="../../../assets/tutorials/building-lesson/anchor-demo.mp4" width="70%"></video>

To make sure your platforms stay at their set position and orientation when the experience runs, you must anchor them within the 3D space using the **Anchor** tool. In addition to preventing gravity from pushing the platforms down, anchoring your platforms ensures they will stay in place when players and other objects bump into them.

To anchor your platforms:

1. While holding the <kbd>Shift</kbd> key, select all of your new parts.
1. In the **Home** or **Model** tab, toggle on **Anchor**.

   <img src="../../../assets/education/general/Anchor-Tool.png" width="800" alt="Anchor tool highlighted." />

Now that you have all of the platforms in place for your obby's jumping puzzle, it's time to add code with AI Assistant to modify part behavior.
