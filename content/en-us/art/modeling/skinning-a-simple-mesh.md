---
title: Skinning a Simple Mesh
description: Explains the process for skinning a basic model in Blender.
---

A skinned mesh is a rigged mesh that bends and flexes naturally when the internal skeleton rig is posed or animated. You can create a skinned mesh using a third party modeling tool such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). Skinning must be completed after the model is [rigged](./rigging.md).

This guide covers the process for rigging and then skinning a simple tree model in Blender with 3 bones. For basics on rigging, see [Rigging A Simple Mesh](./rigging-a-simple-mesh.md) before continuing this guide.

To skin a simple mesh, you need to:

- [Set up Blender](#setting-up-blender) to Studio's relative scene units before importing a model.
- [Create, size, and position bones](#positioning-bones) inside of an armature.
- [Parent a mesh to an armature](#parenting-armature) to bind the skeleton rig to the mesh object.
- [Weight paint](#weight-painting) the mesh to assign which parts of the mesh will move with which bone.

<Alert severity="info">
This guide uses a downloadable [example tree model](../../assets/modeling/skinned-meshes/MapleLeafTree.fbx) and [Blender version 3.0](https://www.blender.org/download/releases/3-0/). If you are
using another version of Blender, there may be minor differences in UI and
settings.
</Alert>

## Setting Up Blender

To start the process of creating a skinned mesh, first set up the following in your Blender project:

- Set [scene unit and unit scale properties](#adjusting-scene-and-scale) to Studio's proportions.
- [Import the model into Blender](#importing-a-model) using Blender's file importer.

### Adjusting Scene and Scale

When setting up Blender projects for Roblox Studio import, modify Blender's default **scene units** and **unit scale** properties to ensure they closely align with Studio's scale.

To modify Blender's scene and scale units in a new project:

1. Open a new **General** project in Blender.
2. Select the default shape, camera, and lights, then press <kbd>Delete</kbd>.
3. In the left-hand navigation of the **Properties Editor**, navigate to **Scene Properties**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Scene-Units-Icon.png" width="222" />

4. In the **Units** section, change the **Unit Scale** to **0.01** and the **Length** to **Centimeters**.

   <img src="../../assets/modeling/skinned-meshes/Blender-Scene-Units-Settings.png" width="222" />

### Importing a Model

For this guide, you'll import a [maple tree model](../../assets/modeling/skinned-meshes/MapleLeafTree.fbx) into Blender as your mesh object.

To import a model into Blender:

1. In the topbar, click **File**. A pop-up menu displays.
2. Select **Import**, then the file format of the model you're importing. For this example, select **FBX (.fbx)** and the `.fbx` reference model. The model displays on the 3D viewport.

   <img alt="Viewport Display Settings"
   src="../../assets/modeling/skinned-meshes/Import-Model.jpg" width="800" />

## Creating a Bone Structure

Now that your model is within Blender, add an armature and **bones** to your mesh object. An **armature** is a skeleton-like rigging object that acts as a container for bones, while **bones** are objects that control the movement and deformation of the group of vertices, or **vertex group**, that surround the bone.

### Adding an Armature

An armature is a structure required to add bones to your mesh. After you add in an armature, you can create and reposition any number of bones inside of your mesh object.

To add an armature:

1. At the top of the 3D viewport, select **Add** &rarr; **Armature**.

   <video controls src="../../assets/modeling/skinned-meshes/Adding-Armature.mp4" width="80%"></video>

2. For better visualization of the bones, in the left-hand navigation of the **Properties Editor**, navigate to **Armature Object Properties**.

3. In the **Viewport Display** section, navigate to the **Show** property, then enable **In&nbsp;Front**.

   <img src="../../assets/modeling/skinned-meshes/Bone-Visualization.png" width="451" />

   <video controls src="../../assets/modeling/skinned-meshes/Bone-In-Front.mp4"
   width="80%"></video>

### Positioning Bones

When you add an armature to your project, Blender also adds one bone to the armature at a default position and scale. You can rotate and scale the bone to more accurately represent the internal structure of your mesh object.

To reposition the bone:

1. Click on the **bone object** to highlight it.
2. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Edit Mode**.
3. Click on the **top of the bone** and press <kbd>G</kbd>. The top of the bone moves with your cursor.
4. Pull this bone to align with the interior center of the model, then click to set the bone's position.

   <video controls
   src="../../assets/modeling/skinned-meshes/Position-First-Bone.mp4"
   width="80%"></video>

5. Press and hold your mouse's scroll wheel to move the camera around the mesh object to see different views and angles to ensure that the bone is centered within the mesh object.

### Adding Additional Bones

In this guide, you need 3 bones within your mesh so the tree can move and rotate at three points.

To add additional bones into the armature:

1. While still in **Edit Mode**, click on the tip of the bone.
2. Press <kbd>E</kbd> and drag your mouse upward. This extends an additional bone out of the original root bone.

   <video controls
   src="../../assets/modeling/skinned-meshes/Extrude-Second-Bone.mp4"
   width="80%"></video>

3. Repeat this process for the second bone.

   <video controls
   src="../../assets/modeling/skinned-meshes/Extrude-Last-Bone.mp4"
   width="80%"></video>

4. Press and hold your mouse's scroll wheel to move the camera around the mesh object to see different views and angles to ensure that the bones are within the mesh object. [Reposition the bones](#positioning-bones) as necessary.
5. In the Outliner, expand the **Armature** object. The armature's bone hierarchy displays.
6. In the Outliner, double-click and **rename** each bone. Bone object names remain the same when you import the mesh object into Studio.

   <video controls src="../../assets/modeling/skinned-meshes/Renaming-Bones.mp4"
   width="80%"></video>

## Parenting Armature

After the bone structure is created and positioned, you need to connect the armature to the mesh object by parenting the armature to the mesh object.

This guide uses Blender's **Automatic Weights** function when you are parenting an armature, as it automatically adds weights and influences to your mesh. This can save you time during the [weight painting](#weight-painting) process.

To parent an armature to a mesh:

1. At the top of the 3D viewport, click on the Mode dropdown, then switch back to **Object Mode**.
2. Press <kbd>Alt</kbd><kbd>A</kbd> (Windows) or <kbd>⌥</kbd><kbd>A</kbd> (Mac) to deselect every object.
3. Hold <kbd>shift</kbd> and select the **mesh object** and then the **armature**. The selection order is important.
4. In the viewport, right-click on the **mesh object**. A pop-up menu displays.
5. Select **Parent**, then **With Automatic Weights**.

   <video controls
   src="../../assets/modeling/skinned-meshes/Parenting-Armature.mp4"
   width="80%"></video>

## Weight Painting

With your armature connected to the mesh object, you can use the process of **weight painting** to change the amount of influence (weight) the bones will have on specific vertices to allow for more natural movement and flexibility.

Blender represents weight strength with a [blue to red gradient](https://docs.blender.org/manual/en/latest/sculpt_paint/weight_paint/introduction.html#the-weighting-color-code), where **blue** represents a value of **0** and **red** represents a fully influenced value of **1**. Vertices on a mesh object that are painted red will be fully influenced by that specific bone's rotation while vertices that are yellow or green will be partially influenced by the bone's rotation.

You can quickly assign influence with the [Brush tool](https://docs.blender.org/manual/en/latest/sculpt_paint/weight_paint/tools.html) in Blender's **Weight Paint** mode using the **Draw**, **Add**, or **Subtract** brush tools. For each brush, you can set the influence weight and radius in the **Tools** setting to the right of the **Viewport**.

<img src="../../assets/modeling/skinned-meshes/Brush-Settings.png" width="107" />

To optimize the painting process, [set up visualization and brush settings](#setup) before [painting influences](#painting-influence) to the mesh.

### Setup

When assigning influences for complex models, you can configure the following Blender settings to optimize the Weight Painting process.

#### Bone Visualization

By default, Blender displays bone objects as octahedral shapes. This original shape is useful when positioning bones within the rig but can get in the way while painting. To help visualize the weight painting process, change your bone visualization to sticks.

To update the visualization of your bones:

1. In **Object Mode**, select the **Armature**.
2. In the left-hand navigation of the **Properties Editor**, navigate to **Object Data Properties**.
3. Change the **Display As** value to **Stick**.

   <video controls
   src="../../assets/modeling/skinned-meshes/Stick-Visualization.mp4"
   width="80%"></video>

#### Auto Normalize

The [**Auto Normalize**](https://docs.blender.org/manual/en/latest/sculpt_paint/weight_paint/tool_settings/options.html) setting forces the influence on your vertices to equal one. This makes weight painting more efficient by ensuring that each vertex in your character is fully influenced by at least one bone. In this guide, Auto Normalize allows you to first apply full influence to the entire mesh quickly and then make minor adjustments with each bone.

To enable Auto Normalize:

1. In **Object Mode**, select the **Armature**.
2. Hold <kbd>shift</kbd> and select the **mesh object**.
3. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Weight Paint** mode.

   <Alert severity="info">
    You must select the appropriate object to access specific modes, such as selecting a mesh object to access **Weight Paint** mode. If you are unfamiliar with switching to different modes, refer to <a href ="https://docs.blender.org/manual/en/latest/editors/3dview/modes.html">Object Modes</a>.
   </Alert>

4. On the right side of the viewport, click the **Tool** tab.
5. Under the **Options** section, enable **Auto Normalize**.

   <video controls
   src="../../assets/modeling/skinned-meshes/Enabling-Autonormalize.mp4"
   width="80%"></video>

#### Projected Brush

A projected brush allows you to easily apply influence through a mesh, instead of just the surface. This is useful when painting influences on meshes that may be geometrically layered, such as the foliage of the tree.

To set up a projected brush:

1. In **Object Mode**, select the **Armature**.
2. Hold <kbd>shift</kbd> and select the **mesh object**.
3. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Weight Paint** mode.
4. On the right side of the viewport, click the **Tool** tab.
5. Expand the **Advanced** section, then uncheck **Front Faces Only**.
6. Expand the **Falloff** section, then select **Projected**.

   <video controls
   src="../../assets/modeling/skinned-meshes/Setting-Projected-Brush.mp4"
   width="80%"></video>

### Painting Influence

With the [projected brush](#projected-brush) set up, you can now begin applying influence to the tree. Take advantage of the [Auto Normalize](#auto-normalize) setting by painting full red influence to the entire tree to the bottom bone and then assigning a partial influence on the middle and top bones.

#### Bottom Bone

The bottom bone should fully influence the movement of the entire tree starting from the trunk.

To start painting influence to the bottom bone:

1. In **Object Mode**, hold <kbd>shift</kbd>, select the bones and then the mesh object.
2. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Weight Paint** mode.
3. Hold <kbd>shift</kbd> and click on the bottom bone.
4. Use the brush tools to paint a red area of influence from the base of the bone and the rest of the tree.

   <video controls
      src="../../assets/modeling/skinned-meshes/Paint-Bottom-Bone.mp4"
      width="80%"></video>

   <Alert severity="info">
   You can adjust the radius of the brush in the <b>Tool</b> tab, or by holding <KeyboardInput>F</KeyboardInput> and dragging your mouse to change the size.
   </Alert>

5. With the bone highlighted, test that the bone is influencing the entire model by pressing <kbd>R</kbd> and rotating the mouse. Paint any vertices that are not influenced correctly to apply influence to them.

   <video controls
   src="../../assets/modeling/skinned-meshes/Test-Bottom-Bone.mp4"
   width="80%"></video>

#### Middle Bone

The middle bone represents most of the foliage above the bottom bone. For a more subtle effect, apply a 50% influence (green) from the middle bone upwards.

To paint influence to the middle bone:

1. In **Weight Paint** mode, press <kbd>Alt</kbd><kbd>A</kbd> (Windows) or <kbd>⌥</kbd><kbd>A</kbd> (Mac) to deselect the current bone object.
2. Hold <kbd>shift</kbd> and <kbd>click</kbd> on the middle bone.
3. On the right side of the viewport, click the **Tool** tab.
4. Change the **Weight** value to **.5**.
5. Starting from the area at the middle bone, paint the middle and top area of the tree.
6. Press <kbd>R</kbd> to rotate the bone and test the influence at different angles.

   <video controls
   src="../../assets/modeling/skinned-meshes/Paint-Middle-Bone.mp4"
   width="80%"></video>

#### Top Bone

The top bone should influence the top leaf area above the middle bone. Paint this top area using 25% influence (teal) for a more natural effect.

To paint influence to the top bone:

1. In **Weight Paint** mode, press <kbd>Alt</kbd><kbd>A</kbd> (Windows) or <kbd>⌥</kbd><kbd>A</kbd> (Mac) to deselect the current bone object.
2. Hold <kbd>shift</kbd> and click on the top bone.
3. On the right side of the viewport, click the **Tool** tab.
4. Change the **Weight** value to **0.25**.
5. Starting from the area at the top bone, paint the top area of the tree.
6. Press <kbd>R</kbd> to rotate the bone and test the influence at different angles.

   <video controls
   src="../../assets/modeling/skinned-meshes/Paint-Top-Bone.mp4"
   width="80%"></video>

After weight painting each bone, each section of this tree should now be influenced by the bottom, middle, or top bones. The bottom bone fully controls the trunk of the tree while the middle and top bones have a reduced influence on the branches and leaves.

<video controls
  src="../../assets/modeling/skinned-meshes/Test-Bones.mp4"
  width="80%"></video>

### Testing

It is important to constantly test the influences of your bone **throughout** the weight painting process.

Blender allows you to test and pose bones **while** painting if both the armature and mesh are selected in Object Mode **before** switching to Weight Paint mode. This hybrid pose and weight paint functionality doesn't work unless you select both armature and mesh before entering Weight Paint mode.

To test your weight painting:

1. In **Object Mode**, select the **Armature**.
2. Hold <kbd>shift</kbd> and select the **mesh object**.
3. At the top of the 3D viewport, click on the Mode dropdown, then switch to **Weight Paint** mode.
4. Hold <kbd>shift</kbd> and click the bone you want to test, then press <kbd>R</kbd> to test the rotation.
5. Press <kbd>Alt</kbd><kbd>A</kbd> (<kbd>⌥</kbd><kbd>A</kbd>) to deselect the current bone, then reselect and test another bone.

   <video controls loop muted
      src="../../assets/modeling/skinned-meshes/Weight-Painting-Example-Gradient.mp4"
      width="80%"></video>

<Alert severity="info">
   To reset the rotation of a selected bone to neutral, press <KeyboardInput>Alt</KeyboardInput>+<KeyboardInput>R</KeyboardInput>. While rotating, you can also press your mouse's scroll wheel to change the axes of your rotation. It is recommended to prioritize testing positions you expect to use in your animations and poses in Studio.
</Alert>

Your S1 tree model is now a skinned mesh and is ready for [export](../../art/modeling/export-requirements.md) for Studio. The <a href="../../assets/modeling/skinned-meshes/MapleTreeS1.blend" download>Blender project file</a> and [final export](../../assets/modeling/skinned-meshes/MapleLeafTree.fbx) (`.fbx`) are available for reference.
