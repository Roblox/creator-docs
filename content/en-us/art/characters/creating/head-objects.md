---
title: Template head structure
description: Each Roblox avatar template contains modular separate pieces that must later be combined or removed.
next: /art/characters/creating/blender-configurations
prev: /art/characters/creating/template-files
---

In each template file, each avatar body includes extra head mesh objects and face armature bones. Separating these objects within the templates allow you to make easier changes to each of these separate objects, as demonstrated during the texturing step.

To avoid validation errors, you must [join](../../../art/characters/creating/combine-head-geometry.md) and [remove](../../../art/characters/creating/remove-extra-bones.md) these extra objects during the cleanup process prior to exporting.

The extra head mesh objects are the following:
<GridContainer numColumns="2">

  <figure>
   - Head_Geo
   - UpperTeeth_Geo
   - LowerTeeth_Geo
   - Tongue_Geo
   - RightLash_Geo
   - RightEye_Geo
   - LeftLash_Geo
   - LeftEye_Geo
</figure>

  <figure><img
  alt="Head-Related Meshes"
  src="../../../assets/art/blender-ui/Face-Objects.png"
  width="800" /><figcaption>Extra head-related meshes in Blender's Outliner</figcaption></figure>
</GridContainer>

<p />

The extra head bone children are the following and may differ between templates:

<GridContainer numColumns="2">

  <figure>
   - Tongue
   - LowerTeeth
   - UpperTeeth
   - LeftEye
   - RightEye
</figure>

  <figure><img
  alt="Head-Related Meshes"
  src="../../../assets/art/blender-ui/Face-Bones.png"
  width="800" /><figcaption>Extra head-related bones in Blender's Outliner</figcaption></figure>
</GridContainer>

While these extra objects exist to aid the creation and modification process, leaving them in your project on final export will cause validation issues when uploading these assets to the Marketplace.
