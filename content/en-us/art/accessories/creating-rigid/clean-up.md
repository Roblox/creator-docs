---
title: Project Cleanup
description: Clean up your project before exporting your rigid accessories from Blender.
prev: /art/accessories/creating-rigid/texturing
next: /art/accessories/creating-rigid/exporting
---

After modeling and texturing your asset, you can begin the process of **exporting** your Blender project as a `.fbx`. The start of this process includes cleaning up your project, which can involve deleting or removing any extra objects, such as lights, cameras, or mannequin meshes, to ensure you only export the accessory mesh, and applying any modifiers to your mesh object.

An often forgotten cleanup step involves **applying your transformations**, also known as **freezing your transforms**, by setting your orientation, rotation, and scale deltas to zero. Failure to apply any transformations can result in unexpected behavior and orientation when importing the mesh in Studio.

To freeze your transforms:

1. In Object mode, select your mesh object.
2. Navigate to **Object** > **Apply** > **All Transforms**.

   <img src="../../../assets/art/accessories/creating-rigid/Blender-Apply-Transforms.png" />
