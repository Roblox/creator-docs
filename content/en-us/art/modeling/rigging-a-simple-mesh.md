---
title: Rigging a Simple Mesh
description: Explains the process for rigging a basic model in Blender.
---

You can create a **rigged mesh** using a third party modeling tool such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). You should rig a model after designing it, but prior to [exporting](../../art/modeling/export-requirements.md).

To rig a simple model in Blender:

- [Set up Blender](#setting-up-blender) to Studio's relative scene units before importing a model to rig.
- [Create and reposition bones](#creating-a-bone-structure) within the mesh object.
- [Parent the mesh to the armature](#parenting-armature) to bind the bone armature to the mesh object.
- [Assign vertices to specific bones](#assigning-vertices-to-bones) to define which parts of the mesh is driven by which bones.
- [Test your rigged mesh](#testing) to ensure that the bones are properly positioned and influenced within the mesh.

<Alert severity="info">
  This guide uses a downloadable [example robot model](../../assets/modeling/meshes/reference-files/shoebot-base-model.fbx) and [Blender version 3.0](https://www.blender.org/download/releases/3-0/). If you are using another version of Blender, there may be minor differences in UI and settings.
  </Alert>

## Setting up Blender

To start the process of creating a rigged mesh, first set up the following in your Blender project:

- Set up Blender's [scene unit and unit scale properties](#set-scene-and-scale) to Studio's proportions.
- [Import the model into Blender](#importing-a-model) using Blender's file importer.

### Set Scene and Scale

When setting up Blender projects for Roblox Studio to import, you should modify Blender's default **scene units** and **unit scale** properties to ensure they closely align with Studio's scale.

To start a new Blender project and set scene unit properties:

1. Open a new **General** project in Blender.
2. Select the default shape, camera, and lights, then press <kbd>Delete</kbd>.
3. In the left-hand navigation of the **Properties Editor**, navigate to **Scene Properties**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Scene-Units-Icon.png" width="320" />

4. In the **Units** section, change the **Unit Scale** to **0.01** and the **Length** to **Centimeters**.

   <video controls src="../../assets/modeling/meshes/rigging-simple/1-setting-up-blender.mp4" width="80%"></video>

### Importing a Model

For this example, import a [robot model](../../assets/modeling/meshes/reference-files/shoebot-base-model.fbx) into Blender as your mesh object.

To import an existing `.fbx` model:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Import**, then the file format of the model you're importing. For this example, select **FBX (.fbx)** and the `.fbx` reference model. The model displays on the 3D viewport.

   <img alt="Imported Model"
   src="../../assets/modeling/meshes/rigging-simple/rigging-r1-imported.png" width="80%" />

## Creating a Bone Structure

Now that your model is within Blender, you must add an **armature** and **bones** to your mesh object. An **armature** is a skeleton-like rigging object that acts as a container for bones, while **bones** are objects that control the movement and deformation of the group of vertices, or **vertex group**, that surround the bone.

### Adding an Armature

An armature is a structure required to add bones to your mesh. After you add in an armature, you can create and reposition any number of bones inside of your mesh object.

To add an armature:

1. At the top of the 3D viewport, select **Add** &rarr; **Armature**.

2. For better visualization of the bones, in the left-hand navigation of the **Properties Editor**, navigate to **Armature Object Properties**.

3. In the **Viewport Display** section, navigate to the **Show** property, then enable **In&nbsp;Front**.

   <video controls src="../../assets/modeling/meshes/rigging-simple/2-adding-armature.mp4" width="80%"></video>

### Adding and Positioning Bones

When you add an armature to your project, Blender automatically adds one bone to the armature at a default position and scale which will act as the root bone.

To add and position two additional bones:

1. Click on the **bone** to highlight it.
2. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Edit Mode**.
3. In the Viewport, click **Add** &rarr; **Single Bone**. Perform this step twice.

   <video controls src="../../assets/modeling/meshes/rigging-simple/3.1-positioning-bones.mp4" width="80%"></video>

4. In the Viewport or Outliner, click on **a newly created bone** to highlight it.
5. Press <kbd>G</kbd> and use your mouse to drag the bone onto the **right arm**.
6. Click on the second bone and press <kbd>G</kbd> to drag the bone on the **left arm**.
   <video controls src="../../assets/modeling/meshes/rigging-simple/3.2-positioning-bones.mp4" width="80%"></video>

7. Click on the top of the **right bone** so that the tip is highlighted. Press <kbd>G</kbd> to drag and orient the bone horizontally toward the right.
8. Click on the top of the **left bone** so that the tip is highlighted. Press <kbd>G</kbd> to drag and orient the bone horizontally toward the left.

   <video controls src="../../assets/modeling/meshes/rigging-simple/3.3-positioning-bones.mp4" width="80%"></video>

9. In the Outliner, double-click and **rename** your bones so they can be easily referenced later.

   <video controls src="../../assets/modeling/meshes/rigging-simple/4-rename-bones.mp4" width="80%"></video>

## Parenting Armature

After you create and position the bone structure, you need to connect the armature to the mesh object by parenting the armature to the mesh object.

In this guide, you should also use Blender's **Automatic Weights** function when you are parenting an armature, as it automatically adds weights and influences to your mesh.

To parent an armature to a mesh:

1. At the top of the 3D viewport, click on the Mode dropdown, then switch back to **Object Mode**.
2. Press <kbd>Alt</kbd><kbd>A</kbd> (Windows) or <kbd>⌥</kbd><kbd>A</kbd> (Mac) to deselect every object.
3. Hold <kbd>Shift</kbd> and select the **mesh object** and then the **armature**. The selection order is important.
4. In the **Viewport**, right-click on the mesh object. A pop-up menu displays.
5. Select **Parent**, then **With Automatic Weights**.

   <video controls src="../../assets/modeling/meshes/rigging-simple/5-parenting-armature.mp4" width="80%"></video>

## Assigning Vertices to Bones

With your armature connected to the mesh object, you can now assign the mesh vertices of your limbs to be fully influenced by their corresponding
bones. As a rigid model, each limb will completely bend and articulate when the bones are rotated, which is ideal for a non-organic character like a robot.

To assign bone influence to the left and right arms:

1. In Object Mode, select the **robot mesh object**.
2. In the Mode dropdown, switch to **Edit Mode**.
3. At the top-right of the Viewport, switch to **X-Ray** view using the Material Preview options.

   <video controls src="../../assets/modeling/meshes/rigging-simple/6.1-assigning-vertices.mp4" width="80%"></video>

4. Drag and select the vertices you want to move with the right bone.
5. Navigate to the **Object Properties panel**.
6. In the **Vertex Group** section, select the name of the bone you want to assign and click **Assign**.
7. **Repeat steps 4-6** for the other bone and arm vertices.

   <video controls src="../../assets/modeling/meshes/rigging-simple/6.2-assigning-vertices.mp4" width="80%"></video>

8. Drag and select the rest of the vertices in the center of the robot.
9. Navigate to the **Object Properties panel**.
10. In the Vertex Group section, select the **Middle bone** and click **Assign**.

    <video controls src="../../assets/modeling/meshes/rigging-simple/6.3-assigning-vertices.mp4" width="80%"></video>

## Testing

You can test your rig in different poses in Pose mode. It's important to test your rigs after applying or changing influences before exporting.

To test your applied influences:

1. In **Object Mode**, select any part of your model.
2. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Pose** mode.
3. Hold <kbd>Shift</kbd> and click the bone you want to test to highlight it, then press <kbd>R</kbd> to test the rotation.
4. Press <kbd>Alt</kbd><kbd>A</kbd> (<kbd>⌥</kbd><kbd>A</kbd>) to deselect the current bone, then reselect and test another bone.

   <video controls src="../../assets/modeling/meshes/rigging-simple/7-testing.mp4" width="80%"></video>

<Alert severity="info">
   To reset the rotation of a selected bone to neutral, press <KeyboardInput>Alt</KeyboardInput>+<KeyboardInput>R</KeyboardInput>. While rotating, you can also press your mouse's scroll wheel to change the axes of your rotation.
</Alert>

The robot model is now a rigged mesh and ready to [export](../../art/modeling/export-requirements.md) to Studio. For reference, you can download the [final export](../../assets/modeling/meshes/reference-files/shoebot-rigged-model.fbx) (`.fbx`) of the model rigged in this guide.
