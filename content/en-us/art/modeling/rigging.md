---
title: Rigging
description: Rigging is the process of adding an armature to a mesh, allowing it to be animated or posed in Studio.
---

A **rigged mesh** is a mesh with an internal poseable skeleton rig and bone structure. Rigged meshes allow mesh surfaces to rotate and move where internal bones are placed within the model during the modeling process. You can create rigged meshes with third-party software such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). Rigging is required prior to [skinning](../../art/modeling/skinning.md) any meshes to create meshes with flexible joints.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/modeling/skinned-meshes/Transform-Demo-Default.mp4"></video>
    <figcaption>A normal mesh can only rotate on its pivot point.</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/modeling/skinned-meshes/Transform-Demo-Skinned.mp4"></video>
    <figcaption>A rigged mesh (or group of meshes) can have several points of articulation to allow rotation at different points set by the internal bone structure.</figcaption>
  </figure>
</GridContainer>

## Rigs and Bones

The **rig**, or bone structure, within a rigged mesh creates additional posable points for the 3D model in Studio. By rotating or moving the bones of a mesh, the parts of the mesh assigned to those bones can move independently from the rest of the mesh. The assignment of influence between meshes and bones, such as a **LowerLeftArm** bone driving the movement of the **LowerLeftArm** geometry, are set in a third-party application like Blender or Maya. When imported into Studio, Roblox saves this influence assignment data to the `Class.MeshPart` asset data.

Once you successfully [import](../../parts/meshes.md#importing-meshes) a rigged mesh model into Studio, Studio represents this rig structure with `Class.Bone` instances that you can then pose and animate. You can view bones in Studio by toggling **Constraint Details** in the Model tab, or when you are using the [Animation Editor](../../animation/editor.md).

<img src="../../assets/studio/general/Model-Tab-Constraint-Details.png" width="740" alt="Constraint Details toggle indicated in Model tab" />

<Alert severity = "info">
When `Class.Bone` objects are used in animation, they affect the appearance of the parts but don't change the physical shape in cases such as [collision detection](../../workspace/collisions.md).
</Alert>

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/modeling/skinned-meshes/Rig-Constraint-Details.jpg" />
    <figcaption>Constraint Details enabled</figcaption>
  </figure>
  <figure>
    <img src="../../assets/modeling/skinned-meshes/Rig-Bone-Visualization.jpg" />
    <figcaption>When using the Animation Editor</figcaption>
  </figure>
</GridContainer>

## Types of Rigs

Rigged models use a naming convention starting with "R" and ending with the number of individual meshes that make up the model. This is used to quickly identify the type and number of meshes that a model has. Although R6 and R15 models are common, a model can be of varying subjects, sizes and can have any number of individual meshes, such as a R5, R20, or R200.

- **R1** refers a single mesh that is rigged, or associated with an internal skeleton structure. Many models, such as a tree or accessory item, are good candidates to be made into an R1 model. Even humanoid characters, such as NPCs, can be created as R1 models but they will not be able to take full advantage of the animation and humanoid options available for R15 characters.

  See [Rigging a Simple Mesh](../../art/modeling/rigging-a-simple-mesh.md) for instructions on turning a basic mesh into an R1 model in Blender.

- **R15** typically refer to humanoid models used as player or avatar characters. An R15 model is made up of 15 specific meshes that are parented to a single rig. A R15 character model does not have weighted influences specified on its joints and, when the joints are rotated or animated, the meshes will not stretch and deform unless they are [skinned](../../art/modeling/skinning.md) after rigging.

  See [Rigging a Humanoid Model](../../art/modeling/rigging-a-humanoid-model.md) for instructions on turning a character model into an R15 humanoid model in Blender.
