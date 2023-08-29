---
title: Modeling Project Files and References
description: Download various modeling-related project files and reference files.
---

The following `.fbx`, `.blend`, and `.ma` files project files are available to use as templates or as reference:

<Tabs>
  <TabItem label="Models">
  <table>
<thead>
  <tr>
    <th>Filename</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/MapleLeafTree_S3.zip" download>MapleLeafTree_S3.fbx</a></td>
    <td>A skinned tree model with the soil, branches, and leaves as separate meshes bound to a single armature. This is packaged as a <b>.zip</b> to include UV textures that can be applied with `Class.SurfaceAppearance`. This is an advanced version of the tree model used in the <a href="../../art/modeling/skinning-a-simple-mesh.md">Skinning a Simple Mesh</a> guide.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/shoebot-base-model.fbx" download>Shoebot-Base-Model.fbx</a></td>
    <td>A robot non-player character used in the <a href="https://www.roblox.com/games/7208091524/Beyond-the-Dark-Vistech-Showcase">Beyond The Dark</a> showcase.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/CreatureModel.fbx" download>Creature.fbx</a></td>
    <td>Creature model from the <a href="https://www.roblox.com/games/7208091524/Beyond-the-Dark-Vistech-Showcase">Beyond The Dark</a> showcase. This model is made up of 11 meshes and over 50 bones.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/Lola.fbx" download>Lola.fbx</a></td>
    <td>A skinned R15 character created from the <a href="../../art/modeling/skinning-a-humanoid-model.md">Skinning a Humanoid Model</a> guide. Since this reference model doesn't yet have [inner and outer cage mesh data](../../art/avatar/specifications.md#inner-and-outer-cages), this model can't equip layered clothing or accessories.</td>
  </tr>
  <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/Fish-Person.zip" download>Fish-Person.zip</a></td>
    <td>A rigged and skinned humanoid character model with a full body cage, facial animation rig, and associated PBR texture maps.</td>
  </tr>
    <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/BlockyCharacter.fbx" download>Blocky.fbx</a></td>
    <td>A Blocky character model with an [animateable head](../../art/avatar/facial-animation/index.md) and a full body cage.</td>
  </tr>
    <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/GoblinCharacter.fbx" download>Goblin.fbx</a></td>
    <td>A Goblin character model with an [animateable head](../../art/avatar/facial-animation/index.md) and a full body cage.</td>
  </tr>
    <tr>
    <td><a href="../../assets/accessories/reference-files/Tshirt-model.fbx" download>Tshirt-model.fbx</a></td>
    <td>Uncaged example clothing from [Creating Layered Clothing](../../art/accessories/creating-in-blender.md) ready for caging in a 3D modeling software.</td>
  </tr>
  <tr>
    <td><a href="../../assets/accessories/reference-files/Additional-FBX-assets.zip" download>Additional-FBX-assets.zip</a></td>
    <td>Caged 3D accessory models ready for import into Studio or in a modeling tool.</td>
  </tr>
</tbody>
</table>
  </TabItem>
  <TabItem label="Blender">
  <table>
  <thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.blend" download>Rig_and_Attachments_Template.blend</a></td>
    <td>Starting armature rig template for Blender. Contains an armature with correct R15 naming conventions and attachment points. Use this template for rigging bodies and clothing items.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.blend" download>Clothing_Cage_Template.blend</a></td>
    <td>Starting template for Blender, includes a full-body inner and outer cage mesh for creation of layered clothing. Use this template for caging your clothing accessories.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Body_Cage_Template.blend" download>Body_Cage_Template.blend</a></td>
    <td>Starting template for Blender, includes individual body part cages for each 15 humanoid parts. Use this template for caging your avatar bodies. <br /> <br /> <Alert severity='info'>To save time, edit the full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part meshes. When importing the `.fbx` into Studio, you can remove this helper mesh.</Alert></td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Combined-Template.blend" download>Combined-Template.blend</a></td>
    <td>Template file containing all content from previous templates, includes rig skeleton, body cages, attachment points. Use this template to rig and cage bodies and accessories.</td>
  </tr>
</tbody>
</table>

  </TabItem>
  <TabItem label="Maya">
  <table>
<thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.ma" download>Rig_and_Attachments_Template.ma</a></td>
    <td>Starting armature rig template for Maya. Contains an armature with correct R15 naming conventions and attachment points. Use this template for creating bodies and clothing items.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.ma" download>Clothing_Cage_Template.ma</a></td>
    <td>Starting template for Maya, includes a full-body inner and outer cage mesh for creation of layered clothing. Use this template for caging your clothing accessories.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Body_Cage_Template.ma" download>Body_Cage_Template.ma</a></td>
    <td>Starting template for Maya, includes individual body part cages for each 15 humanoid parts. Use this template for caging your avatar bodies. <br /> <br /> <Alert severity='info'>To save time, edit the full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part meshes. When importing the `.fbx` into Studio, you can remove this helper mesh.</Alert></td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Combined-Template.ma" download>Combined-Template.ma</a></td>
    <td>Template file containing all content from previous templates, includes rig skeleton, body cages, attachment points. Use this template to rig and cage bodies and accessories.</td>
  </tr>

</tbody>
</table>

  </TabItem>
  <TabItem label="General">
  <Alert severity = 'warning'>
  The following `.fbx` files were exported from Maya for use in modeling applications. If you are using Blender or Maya in your workflow, use the specific template files for those programs instead of the following files.
  </Alert>
    <table>
<thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.fbx" download>Rig_and_Attachments_Template.fbx</a></td>
    <td>Starting armature rig template for general modeling software. Contains an armature with correct R15 naming conventions and attachment points. Use this template for creating bodies and clothing items.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Clothing_Cage_Template.fbx" download>Clothing_Cage_Template.fbx</a></td>
    <td>Starting template for general modeling software, includes a full-body inner and outer cage mesh for creation of layered clothing. Use this template for caging your clothing accessories.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Body_Cage_Template.fbx" download>Body_Cage_Template.fbx</a></td>
    <td>Starting template for general modeling software, includes individual body part cages for each 15 humanoid parts. Use this template for caging your avatar bodies. <br /> <br /> <Alert severity='info'>To save time, edit the full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part meshes. When importing the `.fbx` into Studio, you can remove this helper mesh.</Alert></td>
  </tr>

</tbody>
</table>
  </TabItem>
</Tabs>
